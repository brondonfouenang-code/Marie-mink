# Déploiement sur un VPS

Installation en une commande sur un serveur Ubuntu ou Debian.

## La commande

Sur le VPS de ton ami, en root :

```bash
sudo bash deploy/install.sh --domain marieminks.co.uk --email ton@email.fr
```

Le script affiche à la fin l'URL du site et ton mot de passe.

## Ce que fait le script, dans cet ordre

L'ordre n'est pas un détail : il est ce qui empêche quelqu'un de voler ton tableau de bord.

1. **Vérifie l'environnement** — installe Node.js 20 si besoin (le site utilise `fetch()`, disponible à partir de Node 18)
2. **Crée l'utilisateur `marieminks`** — sans shell et sans mot de passe, il ne peut pas se connecter
3. **Copie le site** dans `/srv/marieminks`, en préservant `data/` lors des mises à jour
4. **Écrit la configuration** dans `/etc/marieminks/marieminks.env`, lisible uniquement par root et le service
5. **Démarre le service** — c'est là que le compte administrateur est créé
6. **Retire le mot de passe de la configuration** et purge les journaux
7. **Ouvre le pare-feu** — SSH et HTTP(S) uniquement
8. **Configure Nginx** et obtient le certificat HTTPS automatiquement
9. **Vérifie** que tout répond, et affiche le mot de passe une dernière fois

Le compte est donc créé **avant** que le site ne soit accessible depuis Internet. Aucun visiteur ne peut arriver le premier.

## Après l'installation

Le script te dit que `data/admin.json` existe : `/api/setup` est désormais fermé. Un visiteur qui tombe sur `/admin.html` verra uniquement le formulaire de connexion, pas celui de création.

Deux points à faire toi-même, que le script ne peut pas faire à ta place :

**L'email du compte est vide.** La récupération de mot de passe ne marchera pas tant qu'il est vide. Va dans le tableau de bord, section Sécurité, et renseigne `marieminks6@gmail.com`.

**Note le mot de passe.** Il n'est stocké nulle part après l'installation. Le seul moyen de le retrouver est de le changer depuis l'admin.

## Le piège que le script évite

`ADMIN_PASSWORD` impose son mot de passe **à chaque démarrage**. Si tu la laissais dans le fichier de configuration, un mot de passe choisi depuis l'admin serait silencieusement annulé au prochain redémarrage.

C'est pour ça que le script la retire après la première création du compte. Si un jour tu dois réinitialiser un mot de passe oublié, ne remets surtout pas cette variable : utilise plutôt

```bash
sudo -u marieminks bash -c 'cd /srv/marieminks && node server.js --reset-password'
```

puis rends-toi à `https://ton-domaine/admin.html` et connecte-toi avec le mot de passe affiché.

## Mises à jour

```bash
rsync -a --exclude 'data/' --exclude '.git' ./ ton-ami@vps:/srv/marieminks-temp/
ssh ton-ami@vps 'sudo rsync -a --exclude "data/" /srv/marieminks-temp/ /srv/marieminks/ && sudo systemctl restart marieminks'
```

Le dossier `data/` est toujours exclu : il contient le compte administrateur, les commandes reçues et les messages.

## Commandes utiles

```bash
sudo systemctl status marieminks        # état du service
sudo systemctl restart marieminks       # redémarrer
sudo journalctl -u marieminks -f        # journaux en direct
sudo journalctl -u marieminks -n 50     # les 50 dernières lignes
sudo certbot renew --dry-run            # tester le renouvellement HTTPS
```

## Sécurité en place

Le service tourne sous un utilisateur dédié, pas en root. Le noyau lui refuse l'accès à tout sauf `data/` (`ProtectSystem=strict`), et sa mémoire est plafonnée à 300 Mo.

Nginx pose les en-têtes de sécurité, bloque `/data/`, `/deploy/`, `.git`, `server.js` et `package.json`, et interdit l'indexation de `/admin.html`.

Le serveur Node reste sur `127.0.0.1` : seul Nginx lui parle. Le port 8000 n'est jamais visible depuis Internet.

## Si quelque chose échoue

**Le certificat HTTPS échoue** — presque toujours un problème DNS. Le domaine doit pointer vers l'IP du VPS *avant* de lancer le script. Reprise :

```bash
sudo certbot --nginx -d marieminks.co.uk
```

**Le service ne démarre pas**

```bash
sudo journalctl -u marieminks -n 40 --no-pager
```

**Le site est accessible en HTTP mais le cookie n'est pas marqué `Secure`**

L'attribut dépend de `X-Forwarded-Proto`. Vérifie que cette ligne est présente dans la configuration Nginx du site :

```nginx
proxy_set_header X-Forwarded-Proto $scheme;
```

Elle est déjà dans le fichier fourni. Si tu as écrit ta propre configuration Nginx, ajoute-la.