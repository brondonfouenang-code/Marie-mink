#!/usr/bin/env bash
#
# Installation de Marie Minks sur un VPS (Ubuntu / Debian).
#
# Ce script fait tout dans le bon ordre, et dans un ordre qui compte :
# le compte administrateur est cree AVANT que le site ne soit accessible
# depuis Internet. Sinon, un visiteur pourrait arriver le premier et
# s'approprier le tableau de bord.
#
# A executer en root :
#   sudo bash deploy/install.sh --domain marieminks.co.uk
#
# Options :
#   --domain   nom de domaine public (obligatoire)
#   --email    email administrateur du certificat (celui de ton ami)
#   --key      fichier ou se trouve le projet, si ce script y est lance
#   --no-tls   ne pas installer de certificat (derniere option)

set -euo pipefail

DOMAIN=""
EMAIL=""
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DO_TLS=1

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain) DOMAIN="${2:-}"; shift 2 ;;
    --email)  EMAIL="${2:-}";  shift 2 ;;
    --src)    SRC_DIR="${2:-}"; shift 2 ;;
    --no-tls) DO_TLS=0; shift ;;
    *) echo "Option inconnue : $1"; exit 1 ;;
  esac
done

if [[ -z "$DOMAIN" ]]; then
  echo "Usage : sudo bash install.sh --domain votre-domaine.fr --email vous@exemple.fr"
  exit 1
fi
if [[ $EUID -ne 0 ]]; then
  echo "Ce script doit etre lance avec sudo."
  exit 1
fi

say()  { printf '\n\033[1;33m==> %s\033[0m\n' "$1"; }
warn() { printf '\033[1;31m!!! %s\033[0m\n' "$1"; }
ok()   { printf '\033[1;32m  %s\033[0m\n' "$1"; }

APP_USER="marieminks"
APP_DIR="/srv/marieminks"
CONF_DIR="/etc/marieminks"

# ============================================================ 1. Dependances
say "Verification de l'environnement"

if [[ ! -f /etc/os-release ]] || ! grep -qiE 'debian|ubuntu' /etc/os-release; then
  warn "Distribution non reconnue. Ce script vise Debian et Ubuntu."
  read -r -p "Continuer quand meme ? [y/N] " a; [[ "$a" == "y" ]] || exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl ca-certificates nginx rsync unzip git >/dev/null

# --- Node.js ---------------------------------------------------------------
# Le site utilise fetch() et crypto.randomUUID(), disponibles a partir de
# Node 18. On installe la version 20 (meme branche que votre machine).
if ! command -v node >/dev/null || [[ "$(node -v | tr -d 'v' | cut -d. -f1)" -lt 18 ]]; then
  ok "Installation de Node.js 20"
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1
  apt-get install -y -qq nodejs >/dev/null
fi
ok "Node $(node -v)"

# ======================================================= 2. Utilisateur
say "Creation de l'utilisateur $APP_USER"

if ! id "$APP_USER" >/dev/null 2>&1; then
  useradd --system --home "$APP_DIR" --shell /usr/sbin/nologin "$APP_USER"
  ok "Utilisateur cree, sans shell ni mot de passe (il ne peut pas se connecter)"
else
  ok "Utilisateur deja present"
fi

# ======================================================= 3. Fichiers
say "Installation du site dans $APP_DIR"

[[ -d "$SRC_DIR" ]] || { warn "Dossier introuvable : $SRC_DIR"; exit 1; }
[[ -f "$SRC_DIR/server.js" ]] || { warn "server.js absent de $SRC_DIR"; exit 1; }

# Premier deploiement : copie complete.
if [[ ! -f "$APP_DIR/server.js" ]]; then
  mkdir -p "$APP_DIR"
  rsync -a --exclude 'data/' --exclude 'node_modules/' --exclude '.git/' \
        "$SRC_DIR"/ "$APP_DIR"/
  ok "Site copie"
else
  # Mises a jour : on ne touche pas au dossier data/, qui contient le
  # compte administrateur, les commandes et les messages recus.
  warn "Mise a jour : data/ sera conserve"
  rsync -a --exclude 'data/' --exclude 'node_modules/' --exclude '.git/' \
        "$SRC_DIR"/ "$APP_DIR"/
fi

mkdir -p "$APP_DIR/data"

# Les secrets (compte admin, session) doivent appartenir au service seul.
chown -R "$APP_USER:$APP_USER" "$APP_DIR"
chmod 750 "$APP_DIR/data"
chmod 640 "$APP_DIR/data"/*.json 2>/dev/null || true

# ======================================================= 4. Configuration
say "Ecriture de la configuration"

mkdir -p "$CONF_DIR"
ENV_FILE="$CONF_DIR/marieminks.env"

# Un mot de passe solide, genere ici. Il ne sera affiche qu'une fois, puis
# retire : le garder en place-ecraserait tout changement ulterieur.
GENERATED_PW="$(node -e "console.log(require('crypto').randomBytes(15).toString('base64url'))")"

cat > "$ENV_FILE" <<EOF
# Genere par deploy/install.sh
HOST=127.0.0.1
PORT=8000
SITE_URL=https://$DOMAIN

# Mot de passe de premiere creation. Retire automatiquement apres
# le premier demarrage : ne pas le laisser en place, il ecraserait
# tout changement de mot de passe fait depuis l'admin.
ADMIN_PASSWORD=$GENERATED_PW
EOF

chown root:"$APP_USER" "$ENV_FILE"
chmod 640 "$ENV_FILE"
ok "Configuration ecrite, lisible uniquement par root et le service"

# ======================================================= 5. Service
say "Installation du service systemd"

cp "$SRC_DIR/deploy/marieminks.service" /etc/systemd/system/marieminks.service
systemctl daemon-reload
systemctl enable marieminks >/dev/null
ok "Service installe et active au demarrage"

# --- Demarrage : c'est ici que le compte administrateur est cree ---------
say "Premier demarrage : creation du compte administrateur"

systemctl restart marieminks
sleep 3

if ! systemctl is-active --quiet marieminks; then
  warn "Le service n'a pas demarre. Journaux :"
  journalctl -u marieminks -n 40 --no-pager
  exit 1
fi

if [[ ! -f "$APP_DIR/data/admin.json" ]]; then
  warn "Le compte administrateur n'a pas ete cree. Journaux :"
  journalctl -u marieminks -n 40 --no-pager
  exit 1
fi
ok "Compte administrateur cree"

# ======================================================= 6. Retrait du secret
say "Retrait du mot de passe de la configuration"

# Le compte existe desormais dans data/admin.json. Laisser ADMIN_PASSWORD
# dans le fichier ferait qu'il ecraserait le mot de passe a chaque
# redemarrage, annulant silencieusement tout changement depuis l'admin.
sed -i 's/^ADMIN_PASSWORD=.*/ADMIN_PASSWORD=/' "$ENV_FILE"

# On enleve aussi le mot de passe des journaux systemd : il y serait
# reste indefiniment, lisible par quiconque peut lire les journaux.
journalctl -u marieminks --rotate >/dev/null 2>&1 || true
journalctl -u marieminks --vacuum-time=1s >/dev/null 2>&1 || true

systemctl restart marieminks
sleep 2
systemctl is-active --quiet marieminks || { warn "Le service ne redemarre pas"; journalctl -u marieminks -n 30 --no-pager; exit 1; }
ok "Configuration nettoyee, le mot de passe n'est plus stocke nulle part"

# ======================================================= 7. Pare-feu
say "Ouverture des ports necessaires"

if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH >/dev/null 2>&1 || true
  ufw allow 'Nginx Full' >/dev/null 2>&1 || true
  ufw --force enable >/dev/null 2>&1 || true
  ok "Pare-feu actif : SSH et HTTP(S) ouverts, tout le reste ferme"
else
  ok "ufw absent : pensez a verifier le pare-feu du fournisseur"
fi

# Le port 8000 reste accessible seulement en local : c'est le reverse
# proxy qui parle au monde exterieur.

# ======================================================= 8. Nginx
say "Configuration de Nginx"

if [[ -f /etc/nginx/sites-available/marieminks ]]; then
  warn "Une configuration Nginx existe deja : elle sera remplacee"
fi
cp "$SRC_DIR/deploy/nginx-marieminks.conf" /etc/nginx/sites-available/marieminks
ln -sf /etc/nginx/sites-available/marieminks /etc/nginx/sites-enabled/marieminks
rm -f /etc/nginx/sites-enabled/default

# --- Certificat ----------------------------------------------------------
if [[ $DO_TLS -eq 1 ]]; then
  if [[ -z "$EMAIL" ]]; then
    EMAIL="admin@$DOMAIN"
  fi
  ok "Demande du certificat HTTPS pour $DOMAIN"
  apt-get install -y -qq certbot python3-certbot-nginx >/dev/null

  if certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos \
             -m "$EMAIL" --redirect >/dev/null 2>&1; then
    ok "Certificat obtenu, HTTPS actif"
    # Une fois le certificat en place, on peut activer HSTS.
    sed -i '/# --- Redirection HTTP vers HTTPS/,/^# }$/ s/^# / /' \
        /etc/nginx/sites-available/marieminks
    ok "Redirection HTTP vers HTTPS active"
  else
    warn "Le certificat n'a pas pu etre obtenu."
    warn "Verifiez que $DNS pointe bien vers ce serveur, puis reessayez :"
    warn "  sudo certbot --nginx -d $DOMAIN"
    warn "Le site fonctionne en HTTP pour l'instant."
  fi
else
  ok "Certificat ignore (--no-tls)"
fi

nginx -t >/dev/null 2>&1 && systemctl reload nginx && ok "Nginx recharge" || warn "Nginx a refuse la configuration"

# =========================================================== 9. Verification
say "Verification finale"

sleep 2
LOCAL_CODE="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:8000/" || echo 000)"
PUBLIC_CODE="$(curl -s -o /dev/null -w '%{http_code}' "http://$DOMAIN/" || echo 000)"

printf '  service local      : HTTP %s\n' "$LOCAL_CODE"
printf '  site public        : HTTP %s\n' "$PUBLIC_CODE"
printf '  tableau de bord    : HTTP %s\n' "$(curl -s -o /dev/null -w '%{http_code}' "http://$DOMAIN/admin.html" || echo 000)"

if [[ "$LOCAL_CODE" != "200" ]]; then
  warn "Le service local ne repond pas correctement."
  warn "Journaux : journalctl -u marieminks -n 40 --no-pager"
  exit 1
fi

# ========================================================== 10. Bilan
PW_URL="https://$DOMAIN/admin.html"

cat <<BILAN

$(printf '\033[1;32m')========================================================$(printf '\033[0m')
  $(printf '\033[1;32m')Marie Minks est installe.$(printf '\033[0m')
$(printf '\033[1;32m')========================================================$(printf '\033[0m')

  Site public     https://$DOMAIN

  Tableau de bord https://$DOMAIN/admin.html
  Mot de passe    $GENERATED_PW
  Email           non renseigne (la creation a ete faite par le script)

  $(printf '\033[1;33m')Ce mot de passe n'est plus stocke nulle part.$(printf '\033[0m')
  Notez-le : c'est la seule occasion de le voir.
  Pour le changer plus tard, section Securite du tableau de bord.

  $(printf '\033[1;33m')L'email du compte est vide.$(printf '\033[0m')
  Sans email, la recuperation de mot de passe ne fonctionnera pas.
  Renseignez-le depuis le tableau de bord, section Securite.

  $(printf '\033[1;33m')Le lien de creation est desactive.$(printf '\033[0m')
  Le compte existe, donc /api/setup refuse toute nouvelle creation :
  aucun visiteur ne peut s'approprier le tableau de bord.

  Commandes utiles :
    sudo systemctl status marieminks      etat du service
    sudo systemctl restart marieminks     redemarrer
    sudo journalctl -u marieminks -f      journaux en direct
    sudo certbot renew --dry-run          tester le renouvellement HTTPS

BILAN