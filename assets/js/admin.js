/* ==========================================================================
   ADMIN — logique du tableau de bord
   Aucune dependance. Utilise uniquement les API de /server.js
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- Etat */

  const S = {
    products: [],
    images: { expected: [], orphans: [] },
    leads: { orders: [], messages: [], subscribers: [] },
    stats: null,
    seo: { overrides: {}, audit: { issues: [], score: 0, checked: 0 } },
    log: [],
    editing: null,
    photoFilter: "all",
    seoLevel: "all",
    days: 30
  };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  /* ------------------------------------------------------------ Utilitaires */

  const money = (n) =>
    "GBP " + Number(n || 0).toLocaleString("fr-FR", { maximumFractionDigits: 0 });

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Une photo produit peut etre en .jpg, .webp ou .png : on essaie dans
     l'ordre, comme le fait la vitrine. Sans photo, on garde la vignette vide. */
  function thumbImg(base, alt) {
    if (!base) return '<div class="prod__thumb"></div>';
    return (
      '<img class="prod__thumb" alt="' + esc(alt || "") + '" loading="lazy"' +
      ' src="/images/' + esc(base) + '.jpg" data-ext="0"' +
      ' onerror="var e=[&quot;webp&quot;,&quot;png&quot;],i=+this.dataset.ext;' +
      "if(i<e.length){this.dataset.ext=i+1;" +
      "this.src=this.src.replace(/\\.[a-z0-9]+$/,'.'+e[i]);}" +
      'else{this.style.visibility=&quot;hidden&quot;}">'
    );
  }

  function when(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    const diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 60) return "a l'instant";
    if (diff < 3600) return "il y a " + Math.floor(diff / 60) + " min";
    if (diff < 86400) return "il y a " + Math.floor(diff / 3600) + " h";
    if (diff < 604800) return "il y a " + Math.floor(diff / 86400) + " j";
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "2-digit" });
  }

  function shortPath(path) {
    if (path === "/") return "Accueil";
    const clean = path.split("?")[0].replace(/^\/pages\//, "").replace(/\.html$/, "");
    const slug = path.split("=")[1];
    if (slug && path.includes("product.html")) return "Produit " + slug;
    if (slug && path.includes("collection.html")) return "Collection " + slug;
    return clean.replace(/-/g, " ") || path;
  }

  function clockOf(t) {
    const d = new Date(t || Date.now());
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }

  const lines = (value) =>
    String(value || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  const toLines = (arr) => (arr || []).join("\n");

  /* --------------------------------------------------------------- Reseau */

  async function api(path, options) {
    const opts = Object.assign({ credentials: "same-origin" }, options || {});
    if (opts.json !== undefined) {
      opts.method = opts.method || "POST";
      opts.headers = Object.assign({ "Content-Type": "application/json" }, opts.headers || {});
      opts.body = JSON.stringify(opts.json);
    }

    const res = await fetch("/api" + path, opts);
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = { ok: false, error: text.slice(0, 200) };
    }

    if (res.status === 401) {
      showGate();
      throw new Error("Session expiree");
    }
    if (!res.ok) throw new Error((data && data.error) || "Erreur " + res.status);
    return data;
  }

  /* --------------------------------------------------------------- Toast */

  let toastTimer;
  function toast(message, isError) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.toggle("is-err", !!isError);
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 3600);
  }

  /* ------------------------------------------------------------ Connexion */

const setupForm = $("#setupForm");
const loginForm = $("#loginForm");
const forgotForm = $("#forgotForm");
const resetForm = $("#resetForm");

/** Jeton de recuperation lu dans l'URL, conserve pour l'envoi du formulaire. */
let RESET_TOKEN = "";

/** Les quatre formulaires de la porte, dans l'ordre d'affichage. */
const GATE_FORMS = [setupForm, loginForm, forgotForm, resetForm];

function showGate() {
  $("#gate").hidden = false;
  $("#app").hidden = true;
  /* On repart d'un etat propre : tous les formulaires sont masques puis
     gateMode() n'affiche que celui qui convient. Sans cela, apres une
     creation ou une deconnexion, le formulaire de creation resterait
     affiche et laisserait croire qu'on peut creer un second compte. */
  GATE_FORMS.forEach((f) => (f.hidden = true));
  ["loginErr", "setupErr", "forgotErr", "resetErr"].forEach((id) => ($("#" + id).hidden = true));
  setTimeout(() => $("#pw") && $("#pw").focus(), 30);
}

function showApp() {
  $("#gate").hidden = true;
  $("#app").hidden = false;
  /* Les formulaires disparaissent avec la porte. On les masque quand
     meme : sinon la creation resterait cochee dans la page et resurgirait
     a la prochaine deconnexion. */
  GATE_FORMS.forEach((f) => (f.hidden = true));
}

/** N'affiche que le formulaire demande, tous les autres etant masques. */
function showOnly(form, focusId) {
  GATE_FORMS.forEach((f) => (f.hidden = f !== form));
  if (focusId) setTimeout(() => { const el = $("#" + focusId); if (el) el.focus(); }, 30);
}

/* -------------------------------------------------------- Mise en route */

/**
 * Tant qu'aucun administrateur n'existe, on propose la creation du compte.
 * Le serveur refuse ensuite toute creation : cette porte se ferme pour de bon.
 */
async function gateMode() {
  /* Un lien de recuperation peut etre arrive dans l'URL : dans ce cas on
     montre le formulaire de nouveau mot de passe, quelle que soit la
     situation du compte. */
  const token = new URLSearchParams(location.search).get("reset");
  if (token) {
    RESET_TOKEN = token;
    showOnly(resetForm, "rs_pw");
    return false;
  }

  let needsSetup = false;
  try {
    const r = await api("/setup/status");
    needsSetup = !!r.needsSetup;
  } catch (e) {
    /* Si le statut est indisponible, on ne montre pas la creation : on
       propose la connexion, ce qui echouera proprement si besoin. */
    needsSetup = false;
  }

  if (needsSetup) showOnly(setupForm, "su_email");
  else showOnly(loginForm, "pw");

  return needsSetup;
}

setupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = $("#setupBtn");
  const err = $("#setupErr");
  err.hidden = true;

  const email = $("#su_email").value.trim();
  const pw = $("#su_pw").value;
  const pw2 = $("#su_pw2").value;

  const fail = (msg) => {
    err.textContent = msg;
    err.hidden = false;
  };

  /* Meme regle que celle du serveur, pour ne pas envoyer une requete
     qu'il refusera. */
  if (!email) return fail("Renseigne ton email.");
  if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email)) return fail("Adresse email invalide.");
  if (pw.length < 10) return fail("Le mot de passe doit faire au moins 10 caracteres.");
  if (pw !== pw2) return fail("Les deux mots de passe ne correspondent pas.");

  btn.disabled = true;
  btn.textContent = "Creation…";

  try {
    await api("/setup", { method: "POST", json: { email, password: pw } });
    $("#su_email").value = "";
    $("#su_pw").value = "";
    $("#su_pw2").value = "";
    showApp();
    await loadAll();
    toast("Compte cree — bienvenue");
  } catch (ex) {
    fail(ex.message);
    /* Si le serveur dit qu'un administrateur existe deja, on repasse
       en mode connexion plutot que de laisser un message sans issue. */
    if (/existe deja/i.test(ex.message)) await gateMode();
  } finally {
    btn.disabled = false;
    btn.textContent = "Creer mon compte";
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = $("#loginBtn");
  const err = $("#loginErr");
  err.hidden = true;
  btn.disabled = true;
  btn.textContent = "Connexion…";

  try {
    await api("/login", { json: { password: $("#pw").value } });
    $("#pw").value = "";
    showApp();
    await loadAll();
    toast("Connecte");
  } catch (ex) {
    err.textContent = ex.message;
    err.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = "Se connecter";
  }
});

/* --- Mot de passe oublie ------------------------------------------------ */

$("#forgotBtn").addEventListener("click", () => {
  /* L'email n'est pas pre-rempli : le serveur ne le revele jamais, sinon
     n'importe quel visiteur pourrait apprendre quelle adresse possede le
     compte. On demande a l'admin de le saisir une fois. */
  $("#fg_email").value = "";
  showOnly(forgotForm, "fg_email");
});

$("#forgotBack").addEventListener("click", async () => {
  await gateMode();
});

forgotForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = $("#forgotBtn2");
  const err = $("#forgotErr");
  err.hidden = true;
  const email = $("#fg_email").value.trim();

  if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email)) {
    err.textContent = "Adresse email invalide.";
    err.hidden = false;
    return;
  }

  btn.disabled = true;
  btn.textContent = "Envoi…";

  try {
    await api("/setup/forgot", { method: "POST", json: { email } });
    /* Message identique que l'email existe ou non : cette page ne doit pas
       permettre de deviner quelle adresse possede le compte. */
    $("#fg_email").value = "";
    showOnly(loginForm, "pw");
    toast("Si un compte existe, le lien est parti");
  } catch (ex) {
    err.textContent = ex.message;
    err.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = "Envoyer le lien";
  }
});

resetForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = $("#resetBtn");
  const err = $("#resetErr");
  err.hidden = true;
  const pw = $("#rs_pw").value;
  const pw2 = $("#rs_pw2").value;

  const fail = (msg) => {
    err.textContent = msg;
    err.hidden = false;
  };

  if (!RESET_TOKEN) return fail("Ce lien est invalide ou a expire.");
  if (pw.length < 10) return fail("Le mot de passe doit faire au moins 10 caracteres.");
  if (pw !== pw2) return fail("Les deux mots de passe ne correspondent pas.");

  btn.disabled = true;
  btn.textContent = "Enregistrement…";

  try {
    await api("/setup/reset", { method: "POST", json: { token: RESET_TOKEN, password: pw } });
    /* On retire le jeton de l'URL : il ne doit pas rester dans l'historique
       du navigateur, ni permettre un simple rafraichissement. */
    RESET_TOKEN = "";
    history.replaceState(null, "", location.pathname);
    $("#rs_pw").value = "";
    $("#rs_pw2").value = "";
    showApp();
    await loadAll();
    toast("Mot de passe change — connecte");
  } catch (ex) {
    fail(ex.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "Enregistrer et me connecter";
  }
});

$("#logoutBtn").addEventListener("click", async () => {
  try {
    await api("/logout", { method: "POST" });
  } catch (e) {
    /* on deconnecte quand meme */
  }
  showGate();
  /* showGate masque tous les formulaires : il faut redemander au serveur
     lequel proposer. Ici un compte existe toujours, donc c'est la
     connexion, mais on ne suppose pas. */
  await gateMode();
  toast("Deconnecte");
});

  /* ------------------------------------------------------------ Navigation */

  const TITLES = {
    dashboard: ["Tableau de bord", "Vue d'ensemble de l'activite"],
    performance: ["Performance", "Visites, provenances et comportement"],
    photos: ["Photos", "Ajouter et organiser les visuels du site"],
    products: ["Produits", "Gérer le catalogue"],
    seo: ["SEO", "Referencement et audit technique"],
    orders: ["Commandes", "Achats enregistres"],
    messages: ["Messages", "Demandes des clientes"],
    subscribers: ["Newsletter", "Inscriptions au pied de page"],
    log: ["Journal", "Activite recente du site"],
    security: ["Securite", "Mot de passe et acces"]
  };

  let current = "dashboard";

  function go(view) {
    current = view;
    $$(".view").forEach((v) => v.classList.toggle("is-active", v.dataset.view === view));
    $$(".side__link").forEach((b) => b.classList.toggle("is-active", b.dataset.nav === view));
    const title = TITLES[view] || TITLES.dashboard;
    $("#viewTitle").textContent = title[0];
    $("#viewSub").textContent = title[1];
    closeMenu();
    window.scrollTo(0, 0);
    if (view === "performance") loadStats();
    if (view === "log") loadLog();
    if (view === "seo") loadSeo();
  }

  $$(".side__link").forEach((b) =>
    b.addEventListener("click", () => go(b.dataset.nav))
  );

  /* Menu mobile */
  const openMenu = () => {
    $("#side").classList.add("is-open");
    $("#scrim").classList.add("is-on");
  };
  const closeMenu = () => {
    $("#side").classList.remove("is-open");
    $("#scrim").classList.remove("is-on");
  };
  $("#menuBtn").addEventListener("click", openMenu);
  $("#scrim").addEventListener("click", closeMenu);

  /* ------------------------------------------------------------ Chargement */

  async function loadAll() {
    try {
      const [products, images, leads, stats, seo] = await Promise.all([
        api("/products"),
        api("/images"),
        api("/leads"),
        api("/stats?days=30"),
        api("/seo")
      ]);

      S.products = products.products || [];
      S.images = images;
      S.leads = leads;
      S.stats = stats;
      S.seo = seo;

      renderBadges();
      renderDashboard();
      renderPhotos();
      renderProducts();
      renderSeo();
      renderPerformance();
      renderLeads();
      renderTodo();
    } catch (e) {
      if (e.message !== "Session expiree") toast(e.message, true);
    }
  }

  async function loadStats() {
    try {
      S.stats = await api("/stats?days=" + S.days);
      renderPerformance();
    } catch (e) {
      /* ignore */
    }
  }

  async function loadLog() {
    try {
      const data = await api("/log");
      S.log = data.rows || [];
      renderLog();
    } catch (e) {
      /* ignore */
    }
  }

  async function loadSeo() {
    try {
      S.seo = await api("/seo");
      renderSeo();
    } catch (e) {
      /* ignore */
    }
  }

  $("#refreshBtn").addEventListener("click", () => {
    loadAll();
    loadLog();
    toast("Donnees actualisees");
  });

  /* --------------------------------------------------------------- Badges */

  function renderBadges() {
    const missing = S.images.expected.filter((e) => !e.present).length;
    const unread =
      S.leads.messages.filter((m) => !m.read).length +
      S.leads.orders.filter((o) => !o.read).length;

    setPill("#prodCount", S.products.length);
    setPill("#photoCount", missing);
    setPill("#orderCount", S.leads.orders.length);
    setPill("#msgCount", S.leads.messages.length + unread * 0);
    setPill("#subCount", S.leads.subscribers.length);
    setPill("#seoScore", S.seo.audit.score);
  }

  function setPill(sel, value) {
    const el = $(sel);
    if (!el) return;
    if (value) {
      el.textContent = value;
      el.hidden = false;
    } else {
      el.textContent = "0";
      el.hidden = false;
    }
  }

  /* ----------------------------------------------------------- Dashboard */

  function renderDashboard() {
    const orders = S.leads.orders;
    const revenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

    $("#kpiOrders").textContent = orders.length;
    $("#kpiRevenue").textContent = orders.length
      ? money(revenue) + " de chiffre d'affaires simule"
      : "aucune commande";
    $("#kpiMessages").textContent = S.leads.messages.length;
    $("#kpiUnread").textContent = S.leads.messages.filter((m) => !m.read).length;
    $("#kpiSubs").textContent = S.leads.subscribers.length;

    const weekAgo = Date.now() - 7 * 86400000;
    const newSubs = S.leads.subscribers.filter((s) => new Date(s.received).getTime() > weekAgo).length;
    $("#kpiNewSubs").textContent = newSubs + " sur 7 jours";

    $("#kpiViews").textContent = S.stats.total;
    $("#kpiSessions").textContent = S.stats.sessions + " sessions, " + S.stats.uniques + " uniques";

    const missing = S.images.expected.filter((e) => !e.present).length;
    $("#kpiMissing").textContent = missing;
    $("#kpiMissingSub").textContent = S.images.expected.length + " attendues au total";

    $("#kpiSeo").textContent = S.seo.audit.score;
    $("#kpiSeoSub").textContent = S.seo.audit.issues.filter((i) => i.level === "error").length + " erreurs";

    /* Dernieres commandes */
    $("#dashOrders").innerHTML = orders.length
      ? orders
          .slice(0, 5)
          .map((o) => orderRow(o))
          .join("")
      : '<div class="empty">Aucune commande pour le moment.</div>';

    /* Derniers messages */
    $("#dashMsgs").innerHTML = S.leads.messages.length
      ? S.leads.messages
          .slice(0, 5)
          .map((m) => {
            const label = m.topic ? ' <span class="tag tag--mute">' + esc(m.topic) + "</span>" : "";
            return (
              '<div class="lead' + (m.read ? "" : " is-new") + '">' +
              '<div class="lead__top"><div><span class="lead__name">' + esc(m.name || "Sans nom") + "</span> " +
              label + '</div><span class="dim nowrap">' + when(m.received) + "</span></div>" +
              '<a class="lead__mail" href="mailto:' + esc(m.email) + '">' + esc(m.email) + "</a>" +
              '<div class="lead__body">' + esc(String(m.message || "").slice(0, 160)) + "</div></div>"
            );
          })
          .join("")
      : '<div class="empty">Aucun message pour le moment.</div>';
  }

  function orderRow(o) {
    const items = (o.items || [])
      .map((i) => "<div><span>" + esc(i.title) + " × " + esc(i.qty || 1) + "</span><span>" + money(i.price) + "</span></div>")
      .join("");
    return (
      '<div class="lead' + (o.read ? "" : " is-new") + '">' +
      '<div class="lead__top"><div><span class="lead__name">' + esc(o.ref || "Commande") + "</span> " +
      '<span class="tag tag--ok">' + money(o.total) + "</span></div>" +
      '<span class="dim nowrap">' + when(o.received) + "</span></div>" +
      '<a class="lead__mail" href="mailto:' + esc(o.email) + '">' + esc(o.email) +
      (o.name ? " · " + esc(o.name) : "") + "</a>" +
      '<div class="lead__items">' + items + "</div></div>"
    );
  }

  /* --------------------------------------------------------------- Todo */

  function renderTodo() {
    const items = [];
    const missing = S.images.expected.filter((e) => !e.present);

    if (missing.length) {
      items.push({
        level: "error",
        text: "Envoyer " + missing.length + " photo(s) manquante(s) — sans image, pas de fiche Google Shopping.",
        btn: 'data-go="photos"',
        label: "Ouvrir Photos"
      });
    }
    const noSize = S.products.filter((p) => !p.sizes || !p.sizes.length).length;
    if (noSize) {
      items.push({
        level: "warn",
        text: noSize + " produit(s) sans tailles : ajoute-les pour activer le schema Offer.",
        btn: 'data-go="products"',
        label: "Corriger"
      });
    }
    const short = S.products.filter((p) => !p.short || p.short.length < 70).length;
    if (short) {
      items.push({
        level: "warn",
        text: short + " produit(s) avec une meta description trop courte.",
        btn: 'data-go="seo"',
        label: "Voir le SEO"
      });
    }
    if (S.products.some((p) => !p.description || p.description.length < 80)) {
      items.push({
        level: "info",
        text: "Des descriptions produits sont trop courtes pour le referencement naturel.",
        btn: 'data-go="products"',
        label: "Voir Produits"
      });
    }
    if (S.leads.messages.some((m) => !m.read)) {
      items.push({
        level: "info",
        text: S.leads.messages.filter((m) => !m.read).length + " message(s) non lu(s) attendent une reponse.",
        btn: 'data-go="messages"',
        label: "Lire"
      });
    }

    const el = $("#todoList");
    if (!items.length) {
      el.innerHTML = '<p style="color:var(--muted);font-size:.875rem">Rien a signaler — le site est complet sur ces points.</p>';
      return;
    }

    el.innerHTML = items
      .map(
        (i) =>
          '<div class="lead"><div class="lead__top"><div>' +
          '<span class="tag tag--' + (i.level === "error" ? "err" : i.level === "warn" ? "warn" : "info") + '">' +
          (i.level === "error" ? "Bloquant" : i.level === "warn" ? "Important" : "Conseil") +
          "</span> " +
          '<span style="margin-left:.4rem">' + esc(i.text) + "</span></div>" +
          '<button class="btn btn--sm" ' + i.btn + ">" + esc(i.label) + "</button></div></div>"
      )
      .join("");

    $$("[data-go]", el).forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
  }

  /* --------------------------------------------------------- Performance */

  function renderPerformance() {
    const st = S.stats;
    if (!st) return;

    $("#pTotal").textContent = st.total;
    $("#pSessions").textContent = st.sessions;
    $("#pDepth").textContent = st.sessions ? (st.total / st.sessions).toFixed(1) : "0.0";
    $("#pEvents").textContent = st.events.reduce((sum, e) => sum + e.n, 0);

    /* Graphique */
    const max = Math.max(1, ...st.chart.map((d) => d.n));
    const today = new Date().toISOString().slice(0, 10);
    $("#chart").innerHTML = st.chart
      .map(
        (d) =>
          '<div class="chart__col' + (d.day === today ? " is-today" : "") +
          '" title="' + d.day + " : " + d.n + ' vue(s)">' +
          '<div class="chart__bar" style="height:' + Math.max(2, Math.round((d.n / max) * 100)) + '%"></div></div>'
      )
      .join("");

    if (st.chart.length) {
      $("#chartFrom").textContent = st.chart[0].day;
      $("#chartTo").textContent = st.chart[st.chart.length - 1].day;
    }

    renderBars("#topPages", st.topPages, shortPath);
    renderBars("#referrers", st.referrers, (k) => hostOf(k));
    renderBars("#devices", st.devices, (k) => k);
    renderBars("#countries", st.countries, (k) => (k || "").toUpperCase());
    renderBars("#events", st.events, (k) => EVENT_LABELS[k] || k);
  }

  const EVENT_LABELS = {
    "add-to-cart": "Ajouts au panier",
    "begin-checkout": "Début de commande",
    "purchase": "Commande terminée",
    "newsletter-signup": "Inscription newsletter",
    "contact-sent": "Message envoyé",
    "search": "Recherche",
    "filter": "Filtre utilisé",
    "size-selected": "Taille choisie"
  };

  function hostOf(url) {
    if (!url || url === "null") return "Direct";
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (e) {
      return url.slice(0, 40);
    }
  }

  function renderBars(sel, list, labelFn) {
    const el = $(sel);
    if (!el) return;
    if (!list || !list.length) {
      el.innerHTML = '<div class="empty">Aucune donnee sur cette periode.</div>';
      return;
    }
    const max = Math.max(1, ...list.map((i) => i.n));
    el.innerHTML =
      '<div class="bars">' +
      list
        .map(
          (i) =>
            '<div class="bar-row"><div class="bar-row__label" title="' + esc(labelFn(i.key)) + '">' +
            esc(labelFn(i.key)) + "</div>" +
            '<div class="bar-row__track"><div class="bar-row__fill" style="width:' +
            Math.max(3, Math.round((i.n / max) * 100)) + '%"></div></div>' +
            '<div class="bar-row__n">' + i.n + "</div></div>"
        )
        .join("") +
      "</div>";
  }

  $$("#rangeFilter .filter-chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      $$("#rangeFilter .filter-chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      S.days = Number(chip.dataset.days);
      loadStats();
    })
  );

  /* --------------------------------------------------------------- Photos */

  function renderPhotos() {
    const grid = $("#photoGrid");
    let cards = [];

    if (S.photoFilter === "orphan") {
      cards = S.images.orphans.map((o) => orphanCard(o));
    } else if (S.photoFilter === "all") {
      cards = S.images.expected.map((e) => expectedCard(e));
    } else {
      cards = S.images.expected.filter((e) => e.kind === S.photoFilter).map((e) => expectedCard(e));
    }

    grid.innerHTML = cards.length ? cards.join("") : '<div class="empty">Rien dans cette categorie.</div>';
    wirePhotoCards(grid);
  }

  function expectedCard(e) {
    const img = e.present
      ? '<img src="/images/' + esc(e.actual || e.file) + '" alt="' + esc(e.label) + '" loading="lazy">'
      : '<div class="photo__missing"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
        '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' +
        '<path d="M21 15l-5-5L5 21"/></svg><div>Aucune photo</div></div>';

    return (
      '<div class="photo" data-base="' + esc(e.base) + '">' +
      '<div class="photo__frame">' + img +
      '<div class="progress" hidden><div class="progress__fill"></div></div></div>' +
      '<div class="photo__body">' +
      '<div class="photo__name">' + esc(e.file) + "</div>" +
      '<div class="photo__owner">' + esc(e.label) + " · " + esc(e.kind) + "</div>" +
      '<div class="photo__foot">' +
      (e.present
        ? '<button class="btn btn--sm" data-act="view" data-file="' + esc(e.actual || e.file) + '">Voir</button>' +
          '<button class="btn btn--sm btn--danger" data-act="del" data-file="' + esc(e.actual || e.file) + '">Supprimer</button>'
        : '<button class="btn btn--sm btn--primary" data-act="pick" data-file="' + esc(e.file) + '">Envoyer</button>') +
      "</div></div></div>"
    );
  }

  function orphanCard(o) {
    return (
      '<div class="photo" data-file="' + esc(o.file) + '">' +
      '<div class="photo__frame"><img src="/images/' + esc(o.file) + '" alt="" loading="lazy"></div>' +
      '<div class="photo__body">' +
      '<div class="photo__name">' + esc(o.file) + "</div>" +
      '<div class="photo__owner">Non utilisee · ' + Math.round(o.size / 1024) + " Ko</div>" +
      '<div class="photo__foot">' +
      '<button class="btn btn--sm" data-act="view" data-file="' + esc(o.file) + '">Voir</button>' +
      '<button class="btn btn--sm btn--danger" data-act="del" data-file="' + esc(o.file) + '">Supprimer</button>' +
      "</div></div></div>"
    );
  }

  function wirePhotoCards(root) {
    $$('[data-act="del"]', root).forEach((b) =>
      b.addEventListener("click", async () => {
        if (!confirm("Supprimer " + b.dataset.file + " ? Cette action est irreversible.")) return;
        try {
          await api("/image?name=" + encodeURIComponent(b.dataset.file), { method: "DELETE" });
          toast("Photo supprimee");
          S.images = await api("/images");
          renderPhotos();
          renderBadges();
          renderTodo();
        } catch (e) {
          toast(e.message, true);
        }
      })
    );

    $$('[data-act="view"]', root).forEach((b) =>
      b.addEventListener("click", () => window.open("/images/" + b.dataset.file, "_blank", "noopener"))
    );

    $$('[data-act="pick"]', root).forEach((b) =>
      b.addEventListener("click", () => {
        const input = $("#fileInput");
        input.dataset.target = b.dataset.file;
        input.multiple = false;
        input.value = "";
        input.click();
      })
    );
  }

  $$("#photoFilter .filter-chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      $$("#photoFilter .filter-chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      S.photoFilter = chip.dataset.kind;
      renderPhotos();
    })
  );

  /* --- Depot de fichiers --- */

  const drop = $("#drop");
  const fileInput = $("#fileInput");

  drop.addEventListener("click", () => {
    fileInput.dataset.target = "";
    fileInput.multiple = true;
    fileInput.value = "";
    fileInput.click();
  });
  drop.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      drop.click();
    }
  });

  ["dragenter", "dragover"].forEach((ev) =>
    drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.add("is-over");
    })
  );
  ["dragleave", "drop"].forEach((ev) =>
    drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.remove("is-over");
    })
  );

  drop.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files && files.length) uploadAll(Array.prototype.slice.call(files), "");
  });

  fileInput.addEventListener("change", () => {
    const files = Array.prototype.slice.call(fileInput.value ? fileInput.files : []);
    const target = fileInput.dataset.target || "";
    if (files.length) uploadAll(files, target);
    fileInput.dataset.target = "";
  });

  async function uploadAll(files, targetName) {
    const list = $("#uploadList");

    /* Si une seule photo est envoyee vers une emplacement precis, on respecte le nom attendu */
    const renamed = targetName && files.length === 1 ? files : null;

    const done = [];
    const failed = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const name = renamed ? targetName : file.name;
      const row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML =
        '<div class="bar-row__label" title="' + esc(name) + '">' + esc(name) + "</div>" +
        '<div class="bar-row__track"><div class="bar-row__fill" style="width:0"></div></div>' +
        '<div class="bar-row__n">0%</div>';
      list.prepend(row);
      const fill = $(".bar-row__fill", row);
      const num = $(".bar-row__n", row);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          credentials: "same-origin",
          headers: { "X-Filename": name },
          body: file
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data.ok) throw new Error(data.error || "Erreur " + res.status);

        fill.style.width = "100%";
        fill.style.background = "var(--ok)";
        num.textContent = Math.round(file.size / 1024) + " Ko";
        done.push(name);
      } catch (ex) {
        fill.style.width = "100%";
        fill.style.background = "var(--err)";
        num.textContent = "echec";
        row.title = ex.message;
        failed.push(name + " (" + ex.message + ")");
      }
    }

    if (done.length) toast(done.length + " photo(s) televisee(s)");
    if (failed.length) toast(failed.length + " echec(s) : " + failed[0], true);

    S.images = await api("/images");
    renderPhotos();
    renderBadges();
    renderSeo();
    renderTodo();
  }

  /* ------------------------------------------------------------- Produits */

  function renderProducts() {
    const q = ($("#prodSearch").value || "").toLowerCase().trim();
    const list = S.products.filter(
      (p) => !q || (p.title || "").toLowerCase().includes(q) || (p.slug || "").toLowerCase().includes(q)
    );

    const el = $("#prodList");
    if (!list.length) {
      el.innerHTML = '<div class="empty">Aucun produit ne correspond.</div>';
      return;
    }

    el.innerHTML = list
      .map((p) => {
        const idx = S.products.indexOf(p);
        const thumb = (p.images || [])[0];
        const img = thumbImg(thumb, p.title);
        const stock =
          p.stock === "out"
            ? '<span class="tag tag--err">Rupture</span>'
            : p.stock === "low"
            ? '<span class="tag tag--warn">Stock faible</span>'
            : '<span class="tag tag--ok">En stock</span>';

        return (
          '<div class="prod">' + img +
          '<div><div class="prod__name">' + esc(p.title) + " " + stock + "</div>" +
          '<div class="prod__meta">' + (p.slug ? esc(p.slug) : '<span style="color:#f0a9a2">slug manquant</span>') +
          " · " + (p.collections || []).join(", ") + "</div></div>" +
          '<div style="display:flex;align-items:center;gap:.75rem">' +
          '<div class="prod__price">' + money(p.price) + "</div>" +
          '<div class="prod__acts">' +
          '<button class="btn btn--sm" data-idx="' + idx + '">Modifier</button>' +
          '<button class="btn btn--sm btn--danger" data-dup="' + idx + '" title="Dupliquer">⧉</button>' +
          '<button class="btn btn--sm btn--danger" data-del="' + idx + '" title="Supprimer">✕</button>' +
          "</div></div></div>"
        );
      })
      .join("");

    $$("[data-idx]", el).forEach((b) =>
      b.addEventListener("click", () => openEditor(S.products[Number(b.dataset.idx)]))
    );
    $$("[data-dup]", el).forEach((b) =>
      b.addEventListener("click", () => duplicate(S.products[Number(b.dataset.dup)]))
    );
    $$("[data-del]", el).forEach((b) =>
      b.addEventListener("click", () => removeProduct(S.products[Number(b.dataset.del)]))
    );
  }

  $("#prodSearch").addEventListener("input", renderProducts);

  function duplicate(src) {
    if (!src || !src.slug) {
      toast("Enregistre le produit avant de le dupliquer.", true);
      return;
    }
    const copy = JSON.parse(JSON.stringify(src));
    let candidate = src.slug + "-copie";
    let k = 2;
    while (S.products.some((p) => p.slug === candidate)) {
      candidate = src.slug + "-copie-" + k;
      k++;
    }
    copy.slug = candidate;
    copy.title = src.title + " (copie)";
    S.products.push(copy);
    renderProducts();
    toast("Copie ajoutee : " + copy.slug + " — pense a enregistrer.");
  }

  function removeProduct(product) {
    if (!product) return;
    if (!confirm('Supprimer "' + product.title + '" du catalogue ?')) return;
    const idx = S.products.indexOf(product);
    if (idx < 0) return;
    S.products.splice(idx, 1);
    if (S.editingRef === product) closeEditor();
    renderProducts();
    toast("Produit retire — clique « Enregistrer » pour appliquer.");
  }

  $("#addProdBtn").addEventListener("click", () => {
    const blank = {
      slug: "",
      title: "Nouveau produit",
      vendor: "Marie Minks",
      price: 0,
      compareAt: null,
      badge: "new",
      collections: [],
      stock: "in",
      rating: 5,
      reviews: 0,
      images: [],
      colors: [],
      sizes: [],
      short: "",
      description: "",
      features: [],
      specs: {}
    };
    S.products.push(blank);
    renderProducts();
    openEditor(blank);
  });

  /* --- Editeur --- */

  function openEditor(product) {
    if (!product) return;
    S.editingRef = product;

    $("#ed_title").value = product.title || "";
    $("#ed_slug").value = product.slug || "";
    $("#ed_price").value = product.price || 0;
    $("#ed_compareAt").value = product.compareAt || "";
    $("#ed_stock").value = product.stock || "in";
    $("#ed_badge").value = product.badge || "";
    $("#ed_rating").value = product.rating || "";
    $("#ed_reviews").value = product.reviews || "";
    $("#ed_short").value = product.short || "";
    $("#ed_description").value = product.description || "";
    $("#ed_collections").value = toLines(product.collections);
    $("#ed_images").value = toLines(product.images);
    $("#ed_sizes").value = toLines(product.sizes);
    $("#ed_features").value = toLines(product.features);
    $("#ed_specs").value = Object.entries(product.specs || {})
      .map(([k, v]) => k + ": " + v)
      .join("\n");

    $("#edTitle").textContent = product.title || "Nouveau produit";
    $("#editor").hidden = false;
    countShort();
    $("#editor").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeEditor() {
    S.editing = null;
    S.editingRef = null;
    $("#editor").hidden = true;
  }

  $("#closeEditor").addEventListener("click", closeEditor);

  function countShort() {
    const n = $("#ed_short").value.length;
    const el = $("#ed_shortCount");
    el.textContent = n + " / 165";
    el.classList.toggle("is-over", n > 165 || (n > 0 && n < 70));
  }
  $("#ed_short").addEventListener("input", countShort);

  /* On garde une reference directe vers l'objet edite : le slug peut
     changer pendant la saisie, et un produit nouveau n'a pas encore de slug. */
  const edited = () => S.editingRef;

  const TEXT_FIELDS = [
    ["#ed_title", "title"],
    ["#ed_slug", "slug"],
    ["#ed_description", "description"],
    ["#ed_stock", "stock"],
    ["#ed_badge", "badge"],
    ["#ed_short", "short"]
  ];

  TEXT_FIELDS.forEach(([sel, key]) =>
    $(sel).addEventListener("input", () => {
      if (edited()) edited()[key] = $(sel).value;
    })
  );

  const NUMERIC = [
    ["#ed_price", "price"],
    ["#ed_compareAt", "compareAt"],
    ["#ed_rating", "rating"],
    ["#ed_reviews", "reviews"]
  ];
  NUMERIC.forEach(([sel, key]) =>
    $(sel).addEventListener("input", () => {
      const p = edited();
      if (!p) return;
      const v = $(sel).value;
      p[key] = v === "" ? (key === "compareAt" ? null : 0) : Number(v);
    })
  );

  const LIST_FIELDS = [
    ["#ed_collections", "collections"],
    ["#ed_images", "images"],
    ["#ed_sizes", "sizes"],
    ["#ed_features", "features"]
  ];
  LIST_FIELDS.forEach(([sel, key]) =>
    $(sel).addEventListener("input", () => {
      if (edited()) edited()[key] = lines($(sel).value);
    })
  );

  $("#ed_specs").addEventListener("input", () => {
    const p = edited();
    if (!p) return;
    const specs = {};
    lines($("#ed_specs").value).forEach((line) => {
      const i = line.indexOf(":");
      if (i > 0) specs[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    });
    p.specs = specs;
  });

  /* --- Enregistrement --- */

  $("#saveProdBtn").addEventListener("click", async () => {
    const btn = $("#saveProdBtn");
    const invalid = S.products.filter((p) => !p.slug || !p.title);
    if (invalid.length) {
      toast(invalid.length + " produit(s) sans titre ou sans slug", true);
      return;
    }
    const dupes = S.products.map((p) => p.slug).filter((s, i, a) => a.indexOf(s) !== i);
    if (dupes.length) {
      toast("Slug en double : " + dupes[0], true);
      return;
    }

    btn.disabled = true;
    btn.textContent = "Enregistrement…";
    try {
      const res = await api("/products", { method: "PUT", json: { products: S.products } });
      S.products = await api("/products").then((r) => r.products);
      renderProducts();
      renderBadges();
      renderSeo();
      renderTodo();
      toast(res.count + " produits enregistres — data.js regenere.");
    } catch (e) {
      toast(e.message, true);
    } finally {
      btn.disabled = false;
      btn.textContent = "Enregistrer";
    }
  });

  $("#exportProdBtn").addEventListener("click", () => {
    window.location.href = "/api/export?what=products";
  });

  /* ------------------------------------------------------------------ SEO */

  function renderSeo() {
    const audit = S.seo.audit;

    const ring = $("#seoRing");
    ring.textContent = audit.score;
    ring.className = "score__ring " + (audit.score >= 80 ? "is-good" : audit.score >= 50 ? "is-mid" : "is-bad");

    const errors = audit.issues.filter((i) => i.level === "error").length;
    const warns = audit.issues.filter((i) => i.level === "warn").length;

    $("#seoHeadline").textContent =
      errors === 0 && warns === 0
        ? "Aucun probleme detecte"
        : errors + " erreur(s), " + warns + " avertissement(s)";
    $("#seoDetail").textContent = audit.checked + " pages analysees (produits et collections).";

    const LEVELS = { error: "err", warn: "warn", info: "info" };
    const LABEL = { error: "Bloquant", warn: "Important", info: "Conseil" };

    const list = audit.issues.filter((i) => S.seoLevel === "all" || i.level === S.seoLevel);
    const el = $("#seoIssues");

    if (!list.length) {
      el.innerHTML = '<div class="empty">Rien dans cette categorie.</div>';
    } else {
      el.innerHTML = list
        .map(
          (i) =>
            '<div class="lead"><div class="lead__top"><div>' +
            '<span class="tag tag--' + LEVELS[i.level] + '">' + LABEL[i.level] + "</span> " +
            '<span style="margin-left:.4rem">' + esc(i.msg) + "</span>" +
            '<div class="dim" style="font-size:.75rem;margin-top:.2rem">' + esc(i.page) + "</div>" +
            "</div></div></div>"
        )
        .join("");
    }

    /* Overrides */
    const keys = Object.keys(S.seo.overrides);
    $("#seoOverrides").innerHTML = keys.length
      ? keys
          .map((k) => {
            const o = S.seo.overrides[k];
            return (
              '<div class="lead"><div class="lead__top"><div>' +
              '<div class="lead__name">' + esc(k.replace(/:/g, " › ")) + "</div>" +
              '<div class="lead__body">' + esc(o.title || "(pas de titre)") + "</div>" +
              '<div class="lead__body">' + esc(o.description || "(pas de description)") + "</div>" +
              "</div>" +
              '<button class="btn btn--sm btn--danger" data-seo-del="' + esc(k) + '">Retirer</button>' +
              "</div></div>"
            );
          })
          .join("")
      : '<div class="empty">Aucun titre personnalise. Les titres par defaut sont utilises.</div>';

    $$("[data-seo-del]").forEach((b) =>
      b.addEventListener("click", async () => {
        delete S.seo.overrides[b.dataset.seoDel];
        await api("/seo", { method: "PUT", json: { overrides: S.seo.overrides } });
        toast("Override retire");
        loadSeo();
      })
    );
  }

  $$("#seoFilter .filter-chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      $$("#seoFilter .filter-chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      S.seoLevel = chip.dataset.level;
      renderSeo();
    })
  );

  $("#auditBtn").addEventListener("click", () => {
    loadSeo();
    toast("Audit relance");
  });

  /* ---------------------------------------------------------------- Leads */

  function renderLeads() {
    $("#ordersList").innerHTML = S.leads.orders.length
      ? S.leads.orders.map((o) => orderRow(o) + leadActions("order", o)).join("")
      : '<div class="empty">Aucune commande enregistree.</div>';

    $("#messagesList").innerHTML = S.leads.messages.length
      ? S.leads.messages
          .map(
            (m) =>
              '<div class="lead' + (m.read ? "" : " is-new") + '">' +
              '<div class="lead__top"><div>' +
              '<span class="lead__name">' + esc(m.name || "Sans nom") + "</span> " +
              (m.topic ? '<span class="tag tag--mute">' + esc(m.topic) + "</span>" : "") +
              "</div><span class=\"dim nowrap\">" + when(m.received) + "</span></div>" +
              '<a class="lead__mail" href="mailto:' + esc(m.email) + '">' + esc(m.email) + "</a>" +
              '<div class="lead__body">' + esc(m.message || "") + "</div>" +
              leadActions("message", m) +
              "</div>"
          )
          .join("")
      : '<div class="empty">Aucun message recu.</div>';

    $("#subsList").innerHTML = S.leads.subscribers.length
      ? '<table><thead><tr><th>Email</th><th>Origine</th><th>Recu</th><th></th></tr></thead><tbody>' +
        S.leads.subscribers
          .map(
            (s) =>
              "<tr><td class=\"mono\"><a href=\"mailto:" + esc(s.email) + '" style="color:#8fc9dc">' +
              esc(s.email) + "</a></td><td>" + esc(s.source || "footer") + "</td>" +
              '<td class="dim nowrap">' + when(s.received) + "</td><td>" +
              '<button class="btn btn--sm" data-copy="' + esc(s.email) + '">Copier</button></td></tr>'
          )
          .join("") +
        "</tbody></table>"
      : '<div class="empty">Aucun abonne pour l\'instant.</div>';

    $$("[data-read]").forEach((b) =>
      b.addEventListener("click", async () => {
        await api("/leads/read", { json: { type: b.dataset.type, id: b.dataset.id } });
        S.leads = await api("/leads");
        renderLeads();
        renderDashboard();
        renderBadges();
      })
    );

    $$("[data-copy]").forEach((b) =>
      b.addEventListener("click", () => {
        navigator.clipboard.writeText(b.dataset.copy).then(
          () => toast("Email copie"),
          () => toast("Copie impossible", true)
        );
      })
    );
  }

  function leadActions(type, item) {
    const reply =
      type === "order"
        ? ""
        : '<a class="btn btn--sm" href="mailto:' + esc(item.email) + "?subject=" +
          encodeURIComponent("Votre demande — Marie Minks") + '">Repondre</a>';
    const mark = item.read
      ? ""
      : '<button class="btn btn--sm" data-read data-type="' + type + '" data-id="' + esc(item.id) + '">Marquer lu</button>';
    return (
      '<div class="photo__foot" style="margin-top:.75rem;padding-top:0">' +
      reply + mark +
      '<span class="dim" style="font-size:.6875rem;margin-left:auto;align-self:center">' +
      esc(new Date(item.received).toLocaleString("fr-FR")) + "</span></div>"
    );
  }

  $("#exportLeadBtn").addEventListener("click", () => (window.location.href = "/api/export?what=leads"));
  $("#exportMsgBtn").addEventListener("click", () => (window.location.href = "/api/export?what=leads"));
  $("#exportSubBtn").addEventListener("click", () => (window.location.href = "/api/export?what=leads"));

  /* ------------------------------------------------------- Mot de passe */

  function pwStatus(text, isError) {
    const el = $("#pwMsg");
    el.innerHTML = text;
    el.style.color = isError ? "#f0a9a2" : "#86d199";
  }

  $("#pw_next").addEventListener("input", () => {
    const n = $("#pw_next").value.length;
    const el = $("#pwLen");
    el.textContent = n + " caractere" + (n > 1 ? "s" : "");
    el.style.color = n > 0 && n < 8 ? "#e8c176" : "";
  });

  $("#pwSubmit").addEventListener("click", async () => {
    const current = $("#pw_current").value;
    const next = $("#pw_next").value;
    const confirm = $("#pw_confirm").value;

    if (!current) return pwStatus("Saisis ton mot de passe actuel.", true);
    if (next.length < 10) return pwStatus("Le nouveau mot de passe doit faire au moins 10 caracteres.", true);
    if (next !== confirm) return pwStatus("Les deux nouveaux mots de passe ne correspondent pas.", true);
    if (next === current) return pwStatus("Le nouveau mot de passe est identique a l'ancien.", true);

    const btn = $("#pwSubmit");
    btn.disabled = true;
    btn.textContent = "Mise a jour…";

    try {
      await api("/password", { method: "PUT", json: { current, next } });
      $("#pw_current").value = "";
      $("#pw_next").value = "";
      $("#pw_confirm").value = "";
      $("#pwLen").textContent = "0 caractere";
      pwStatus("Mot de passe mis a jour. Note-le quelque part.");
      toast("Mot de passe change");
    } catch (e) {
      pwStatus(e.message, true);
    } finally {
      btn.disabled = false;
      btn.textContent = "Mettre a jour";
    }
  });

  /* ----------------------------------------------------------------- Log */

  function renderLog() {
    const el = $("#logList");
    if (!S.log.length) {
      el.innerHTML = '<div class="empty">Journal vide.</div>';
      return;
    }
    const LABELS = {
      page: "visite",
      beacon: "evenement",
      "login-ok": "connexion",
      "login-fail": "echec connexion",
      admin: "admin"
    };
    el.innerHTML = S.log
      .map((r) => {
        let what = "";
        if (r.kind === "page") what = shortPath(r.path) + (r.referrer ? "  ← " + hostOf(r.referrer) : "");
        else if (r.kind === "beacon") what = (EVENT_LABELS[r.event] || r.event) + (r.path ? " · " + shortPath(r.path) : "");
        else if (r.kind === "admin") what = (r.action || "") + " " + (r.file || r.n || "");
        else what = r.ip || "";

        return (
          '<div class="log__row"><span class="log__t">' + clockOf(r.t) + "</span>" +
          '<span class="log__kind log__kind--' + esc(r.kind) + '">' + esc(LABELS[r.kind] || r.kind) + "</span>" +
          "<span>" + esc(what) + "</span>" +
          '<span class="dim">' + esc(r.device || "") + "</span></div>"
        );
      })
      .join("");
  }

  /* ---------------------------------------------------------------- Boot */

  (async function boot() {
    try {
      const session = await api("/session");
      if (session.authed) {
        showApp();
        await loadAll();
      } else {
        showGate();
        /* On demande au serveur s'il reste un compte a creer. */
        await gateMode();
      }
    } catch (e) {
      showGate();
      await gateMode();
    }
  })();
})();
