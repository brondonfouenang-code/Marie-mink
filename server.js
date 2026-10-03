/* ==========================================================================
   SERVEUR — Marie Minks
   Node.js pur, AUCUNE dépendance à installer.
     node server.js            -> http://localhost:8000
     PORT=3000 node server.js

   Fournit :
     - le site statique
     - /admin.html  (connexion, photos, produits, données, stats, SEO)
     - /api/*       (toutes les routes sont protegees par cookie de session)
     - /sitemap.xml et /robots.txt generes
   ========================================================================== */

"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const url = require("url");

/* ---------------------------------------------------------------- Config */

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const IMAGES_DIR = path.join(ROOT, "images");
const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST || "127.0.0.1";

/* Dossiers servis par le serveur statique (liste blanche) */
const SERVE_DIRS = ["assets", "images", "pages"];

/* Fichiers servis a la racine : uniquement les pages du site.
   Tout le reste (server.js, package.json...) reste inaccessible. */
const SERVE_ROOT_FILES = ["index.html", "collection.html", "product.html", "admin.html"];

const MAX_UPLOAD = 12 * 1024 * 1024; // 12 Mo par image
const ALLOWED_IMAGE_EXT = [".jpg", ".jpeg", ".webp", ".png", ".avif", ".gif"];
const SESSION_TTL = 1000 * 60 * 60 * 12; // 12 h

/* Fichiers de donnee que l'admin peut remplacer par son contenu actuel.
   A !" existe-t-il deja, c'est la source de verite. */
const REGENERABLE = ["products.json"];

/* ---------------------------------------------------------------- Fichiers */

function ensureDirs() {
  for (const d of [DATA_DIR, IMAGES_DIR]) {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  }
}

function readJSON(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return fallback;
  }
}

/** Ecriture atomique : on ecrit dans un .tmp puis on renomme. */
function writeJSON(file, value) {
  ensureDirs();
  const tmp = file + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2), "utf8");
  fs.renameSync(tmp, file);
}

function appendLine(file, value) {
  ensureDirs();
  fs.appendFileSync(file, JSON.stringify(value) + "\n", "utf8");
}

function readLines(file, max) {
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8").trim();
  if (!raw) return [];
  const lines = raw.split("\n");
  return max ? lines.slice(-max) : lines;
}

/* ---------------------------------------------------------------- Mots de passe */

function hashPassword(password, salt) {
  return crypto.scryptSync(String(password), salt, 64).toString("hex");
}

const box = (title, lines) => {
  const width = 46;
  const pad = (s) => s + " ".repeat(Math.max(0, width - s.length));
  console.log("\n  ┌" + "─".repeat(width + 2) + "┐");
  console.log("  │ " + pad(title) + " │");
  lines.forEach((l) => console.log("  │ " + pad(l) + " │"));
  console.log("  └" + "─".repeat(width + 2) + "┘\n");
};

function newPassword() {
  return process.env.ADMIN_PASSWORD || crypto.randomBytes(9).toString("base64url");
}

function loadAdmin() {
  const file = path.join(DATA_DIR, "admin.json");

  /* SETUP_MANAGED=1 : le compte est cree depuis le site, pas dans la console.
     On ne fabrique alors aucun mot de passe aleatoire, pour ne pas ecrire
     de secret inutile dans la console. */
  const viaSite = process.env.SETUP_MANAGED === "1";

  if (!fs.existsSync(file) && !viaSite) {
    const salt = crypto.randomBytes(16).toString("hex");
    const plain = newPassword();
    writeJSON(file, { salt, hash: hashPassword(plain, salt), created: new Date().toISOString() });
    box("COMPTE ADMIN CREE", [
      "Mot de passe : " + plain,
      "",
      "Garde-le. Pour le changer plus tard :",
      "  node server.js --reset-password"
    ]);
  }

  const record = readJSON(file, null);
  record.plainForced = !!process.env.ADMIN_PASSWORD;
  return record;
}

/** L'administrateur a-t-il deja ete cree ? */
function adminExists() {
  return fs.existsSync(path.join(DATA_DIR, "admin.json"));
}

/**
 * Cree le compte administrateur. Possible UNIQUEMENT si aucun n'existe :
 * c'est la seule porte d'entree, donc le premier arrive sur le serveur
 * peut s'approprier l'admin. D'ou la precaution : la creation est desactivee
 * des que le fichier existe, et la creation automatique dans la console est
 * coupee avec SETUP_MANAGED=1.
 */
function createAdmin(password) {
  const file = path.join(DATA_DIR, "admin.json");
  if (fs.existsSync(file)) return { ok: false, error: "Un administrateur existe deja" };

  const salt = crypto.randomBytes(16).toString("hex");
  writeJSON(file, {
    salt,
    hash: hashPassword(password, salt),
    created: new Date().toISOString()
  });
  return { ok: true };
}

/** node server.js --reset-password : affiche un nouveau mot de passe. */
function resetAdminPassword() {
  const file = path.join(DATA_DIR, "admin.json");
  const previous = readJSON(file, {});
  const salt = crypto.randomBytes(16).toString("hex");
  const plain = newPassword();
  writeJSON(file, { salt, hash: hashPassword(plain, salt), created: previous.created || new Date().toISOString() });
  box("MOT DE PASSE REINITIALISE", [
    "Mot de passe : " + plain,
    "",
    "L'ancien mot de passe ne fonctionne plus.",
    "Change-le depuis l'admin : section Securite."
  ]);
  return plain;
}

let ADMIN = null;
const SECRET_FILE = path.join(DATA_DIR, "session.key");

function loadSecret() {
  ensureDirs();
  if (fs.existsSync(SECRET_FILE)) return fs.readFileSync(SECRET_FILE, "utf8").trim();
  const key = crypto.randomBytes(32).toString("hex");
  fs.writeFileSync(SECRET_FILE, key, "utf8");
  return key;
}

let SECRET = "";

function verifyPassword(password) {
  const candidate = Buffer.from(hashPassword(password, ADMIN.salt), "hex");
  const known = Buffer.from(ADMIN.hash, "hex");
  if (candidate.length !== known.length) return false;
  return crypto.timingSafeEqual(candidate, known);
}

/* ---------------------------------------------------------------- Sessions */

function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return body + "." + mac;
}

function readToken(token) {
  if (!token || !token.includes(".")) return null;
  const [body, mac] = token.split(".");
  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  if (mac.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch (e) {
    return null;
  }
}

function parseCookies(req) {
  const out = {};
  const raw = req.headers.cookie;
  if (!raw) return out;
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

/** Une empreinte du hash du mot de passe. Changer le mot de passe invalide
    donc toutes les sessions deja ouvertes. */
function sessionStamp() {
  return crypto.createHash("sha256").update(ADMIN.hash).digest("hex").slice(0, 16);
}

function isAuthed(req) {
  const session = readToken(parseCookies(req).mm_session);
  return !!(session && session.exp > Date.now() && session.stamp === sessionStamp());
}

/* ---------------------------------------------------------------- Utilitaires HTTP */

function send(res, status, body, headers) {
  const h = Object.assign(
    { "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" },
    headers || {}
  );
  const payload = Buffer.isBuffer(body) ? body : Buffer.from(String(body), "utf8");
  h["Content-Length"] = payload.length;
  res.writeHead(status, h);
  res.end(payload);
}

function json(res, status, value) {
  send(res, status, JSON.stringify(value), { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
}

function text(res, status, value, type) {
  send(res, status, value, { "Content-Type": (type || "text/plain") + "; charset=utf-8" });
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error("PAYLOAD_TOO_LARGE"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function readJSONBody(req, limit) {
  const raw = await readBody(req, limit || 2 * 1024 * 1024);
  if (!raw.length) return {};
  try {
    return JSON.parse(raw.toString("utf8"));
  } catch (e) {
    return null;
  }
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".png": "image/png",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf"
};

/* ---------------------------------------------------------------- Produits
   Source de verite : data/products.json
   Sortie navigateur : assets/js/data.js (regenere a chaque modification)     */

const DATA_JS = path.join(ROOT, "assets", "js", "data.js");
const PRODUCTS_JSON = path.join(DATA_DIR, "products.json");

/**
 * Remplace le bloc "const NOM = [ ... ];" d'un fichier JS.
 *
 * On travaille par lignes plutot qu'en scannant les caracteres : une chaine
 * contenant une apostrophe ("Luxury Girls' Fox") casse tout scanner qui
 * suppose que les apostrophes delimitent toujours une chaine.
 *
 * @param {string} source  contenu du fichier
 * @param {string} name    nom de la constante
 * @param {string} json    tableau deja serialise en JSON
 * @returns {string|null}   nouveau contenu, ou null si le bloc est introuvable
 */
function replaceArrayLiteral(source, name, json) {
  const found = findLiteral(source, name);
  if (!found) return null;

  /* On colle le JSON tel quel : du JSON valide est du JS valide.
     Le ";" final est seul sur sa ligne, ce qui rend le bloc reperable. */
  const block = ["const " + name + " ="].concat(json.split("\n")).concat([";"]);

  return found.before.concat(block).concat(found.after).join("\n");
}

/**
 * Localise le bloc "const NOM = [ ... ]" d'un fichier JS et le découpe.
 *
 * On travaille par lignes et non caractère par caractère : une chaîne
 * contenant une apostrophe ("Luxury Girls' Fox") désoriente tout scanner
 * qui suppose que les apostrophes ouvrent toujours une chaîne.
 *
 * Deux écritures sont acceptées, car elles coexistent dans data.js :
 *   "const X = ["  …  "];"      (style d'origine)
 *   "const X ="    …  "]"  ";"  (style généré)
 *
 * @returns {{start:number,end:number,before:string[],after:string[]}|null}
 */
function findLiteral(source, name) {
  const lines = source.split("\n");
  const start = lines.findIndex((l) => l.trim().startsWith("const " + name + " ="));
  if (start < 0) return null;

  /* Si le "[" est sur la ligne de déclaration, il fait partie du bloc. */
  const inlineOpen = lines[start].includes("[");

  /* Cas particulier : tout tient sur une seule ligne, "const X = [];".
     Il n'y a rien à chercher plus loin. */
  if (inlineOpen && /\];?\s*$/.test(lines[start])) {
    return { start, end: start, before: lines.slice(0, start), after: lines.slice(start + 1), inlineOpen };
  }

  let end = -1;
  for (let i = start + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t === "];" || t === "]") {
      end = i;
      /* Style généré : le "]" est suivi d'un ";" seul sur sa ligne.
         Les deux font partie du bloc, sinon le ";" se dupliquerait
         a chaque réécriture. */
      if (t === "]" && i + 1 < lines.length && lines[i + 1].trim() === ";") end = i + 1;
      break;
    }
    if (t === ";") { end = i; break; }
  }
  if (end < 0) return null;

  /* Un ";" seul sur sa ligne est la ponctuation de fin du bloc généré :
     elle n'appartient pas au littéral. */
  const literalEnd = lines[end].trim() === ";" ? end - 1 : end;

  return {
    start,
    end: literalEnd,
    before: lines.slice(0, start),
    after: lines.slice(end + 1),
    inlineOpen
  };
}

/**
 * Extrait un tableau littéral JS sans l'évaluer.
 * @returns {string|null} le littéral seul, prêt pour new Function()
 */
function readArrayLiteral(source, name) {
  const found = findLiteral(source, name);
  if (!found) return null;

  const lines = source.split("\n");
  const head = found.inlineOpen ? lines[found.start] : "";

  /* Retirer "const X = [" pour ne garder que le tableau. */
  const open = head.slice(head.indexOf("["));
  const rest = lines.slice(found.start + 1, found.end + 1);

  const literal = (open + "\n" + rest.join("\n"))
    .replace(/^\s*/, "")
    .replace(/;?\s*$/, "");

  return literal || null;
}

/** Evalue un tableau litteral en toute securite (contenu local, non fiable). */
function evalArrayLiteral(source, name) {
  const literal = readArrayLiteral(source, name);
  if (!literal) return null;
  try {
    return new Function("return " + literal)();
  } catch (e) {
    return null;
  }
}

function getProducts() {
  const saved = readJSON(PRODUCTS_JSON, null);
  if (saved) return saved;

  const products = evalArrayLiteral(fs.readFileSync(DATA_JS, "utf8"), "PRODUCTS") || [];
  writeJSON(PRODUCTS_JSON, products);
  return products;
}

/**
 * Ecrit les produits dans data/products.json ET regenere le bloc PRODUCTS
 * de data.js. Renvoie false si le bloc n'a pas pu etre trouve : dans ce cas
 * products.json reste ecrit, mais le navigateur ne verrait pas la mise a jour.
 */
function saveProducts(products) {
  if (!Array.isArray(products)) return false;
  const clean = products.filter((p) => p && typeof p === "object" && p.slug && p.title);
  writeJSON(PRODUCTS_JSON, clean);

  const src = fs.readFileSync(DATA_JS, "utf8");
  const updated = replaceArrayLiteral(src, "PRODUCTS", JSON.stringify(clean, null, 2));

  if (!updated) {
    console.error("ATTENTION : bloc PRODUCTS introuvable dans data.js, fichier non regenere.");
    return false;
  }

  const tmp = DATA_JS + ".tmp";
  fs.writeFileSync(tmp, updated, "utf8");
  fs.renameSync(tmp, DATA_JS);
  return true;
}

/** Nom de fichier image attendu par chaque produit / collection. */
function expectedImages() {
  const out = [];
  const products = getProducts();
  products.forEach((p) => {
    (p.images || []).forEach((img) => out.push({ file: img + ".jpg", owner: p.slug, label: p.title, kind: "produit" }));
  });

  const collections = getCollections();
  collections.forEach((c) => {
    if (c.image) out.push({ file: c.image + ".jpg", owner: c.slug, label: c.title, kind: "collection" });
  });

  out.push({ file: "hero-winter.jpg", owner: "home", label: "Bandeau d'accueil", kind: "page" });
  out.push({ file: "packaging.jpg", owner: "home", label: "Emballage", kind: "page" });
  return out;
}

function listImages() {
  let files = [];
  try {
    files = fs.readdirSync(IMAGES_DIR);
  } catch (e) {
    files = [];
  }

  const expected = expectedImages().map((e) => {
    const hit = files.find((f) => f.toLowerCase() === e.file.toLowerCase());
    return {
      file: e.file,
      base: e.file.replace(/\.[^.]+$/, ""),
      owner: e.owner,
      label: e.label,
      kind: e.kind,
      present: !!hit,
      actual: hit || null
    };
  });

  const expectedBases = new Set(expected.map((e) => e.base.toLowerCase()));
  const orphans = files
    .filter((f) => ALLOWED_IMAGE_EXT.includes(path.extname(f).toLowerCase()))
    .filter((f) => !expectedBases.has(f.replace(/\.[^.]+$/, "").toLowerCase()))
    .map((f) => ({ file: f, size: fs.statSync(path.join(IMAGES_DIR, f)).size }));

  return { expected, orphans };
}

/* ---------------------------------------------------------------- SEO */

const SEO_FILE = () => path.join(DATA_DIR, "seo.json");
const SITE_URL = (process.env.SITE_URL || "https://www.marieminks.co.uk").replace(/\/$/, "");

function getSeo() {
  return readJSON(SEO_FILE(), {});
}

/**
 * Empreinte courte de l'etat SEO + produits. Utilisee dans l'ETag pour que
 * changer un titre depuis l'admin invalide le cache des robots.
 */
let seoStampCache = { key: "", value: "0" };
function jsonMd5() {
  const key = [seoStamp(), String(fs.existsSync(PRODUCTS_JSON) ? fs.statSync(PRODUCTS_JSON).mtimeMs : 0)].join("|");
  if (seoStampCache.key === key) return seoStampCache.value;
  seoStampCache = { key, value: crypto.createHash("md5").update(key).digest("hex").slice(0, 10) };
  return seoStampCache.value;
}
function seoStamp() {
  try {
    return String(fs.statSync(SEO_FILE()).mtimeMs);
  } catch (e) {
    return "0";
  }
}

/** Les collections vivent dans data.js, les produits dans products.json. */
function getCollections() {
  return evalArrayLiteral(fs.readFileSync(DATA_JS, "utf8"), "COLLECTIONS") || [];
}

function buildSitemap() {
  const products = getProducts();
  const collections = getCollections();
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: "/", priority: "1.0", changefreq: "daily" },
    { loc: "/collection.html", priority: "0.9", changefreq: "daily" },
    { loc: "/pages/our-story.html", priority: "0.6", changefreq: "monthly" },
    { loc: "/pages/contact.html", priority: "0.6", changefreq: "monthly" },
    { loc: "/pages/faq.html", priority: "0.5", changefreq: "monthly" },
    { loc: "/pages/shipping-returns.html", priority: "0.4", changefreq: "monthly" },
    { loc: "/pages/size-guide.html", priority: "0.4", changefreq: "monthly" },
    { loc: "/pages/payment-plans.html", priority: "0.6", changefreq: "monthly" },
    { loc: "/pages/account.html", priority: "0.4", changefreq: "monthly" }
  ];

  collections.forEach((c) =>
    urls.push({ loc: "/collection.html?c=" + c.slug, priority: "0.8", changefreq: "daily" })
  );
  products.forEach((p) =>
    urls.push({ loc: "/product.html?p=" + p.slug, priority: "0.8", changefreq: "weekly" })
  );

  const body = urls
    .map(
      (u) =>
        "  <url>\n    <loc>" +
        SITE_URL +
        u.loc.replace(/&/g, "&amp;") +
        "</loc>\n    <lastmod>" +
        today +
        "</lastmod>\n    <changefreq>" +
        u.changefreq +
        "</changefreq>\n    <priority>" +
        u.priority +
        "</priority>\n  </url>"
    )
    .join("\n");

  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + body + "\n</urlset>\n";
}

function seoAudit() {
  const issues = [];
  const products = getProducts();
  const collections = getCollections();
  const seo = getSeo();

  products.forEach((p) => {
    const meta = seo["product:" + p.slug] || {};
    const title = meta.title || p.title + " | Marie Minks";
    const desc = meta.description || p.short || "";

    if (title.length > 65) issues.push({ level: "warn", page: p.title, msg: "Titre trop long (" + title.length + " car.)" });
    if (title.length < 25) issues.push({ level: "warn", page: p.title, msg: "Titre trop court (" + title.length + " car.)" });
    if (!desc) issues.push({ level: "error", page: p.title, msg: "Pas de meta description" });
    else if (desc.length < 70) issues.push({ level: "warn", page: p.title, msg: "Description courte (" + desc.length + " car.)" });
    else if (desc.length > 165) issues.push({ level: "warn", page: p.title, msg: "Description longue (" + desc.length + " car.)" });

    (p.images || []).forEach((img) => {
      if (!fs.existsSync(path.join(IMAGES_DIR, img + ".jpg")) &&
          !fs.existsSync(path.join(IMAGES_DIR, img + ".webp")) &&
          !fs.existsSync(path.join(IMAGES_DIR, img + ".png"))) {
        issues.push({ level: "error", page: p.title, msg: "Photo manquante : " + img + ".jpg (pas de rich snippet Google)" });
      }
    });

    if (!p.description || p.description.length < 80) {
      issues.push({ level: "warn", page: p.title, msg: "Description produit trop courte pour le SEO" });
    }
    if (!p.sizes || !p.sizes.length) {
      issues.push({ level: "info", page: p.title, msg: "Aucune taille : Google ne peut pas proposer de schema Offer" });
    }
  });

  collections.forEach((c) => {
    if (!c.description || c.description.length < 70) {
      issues.push({ level: "warn", page: c.title, msg: "Description de collection trop courte" });
    }
  });

  const errors = issues.filter((i) => i.level === "error").length;
  return {
    issues,
    score: Math.max(0, Math.round(100 - errors * 8 - issues.filter((i) => i.level === "warn").length * 2)),
    checked: products.length + collections.length
  };
}

/* --- Injection SEO dans le HTML ----------------------------------------- */

const STATIC_PAGES = {
  "/pages/our-story.html": {
    title: "Our Story — Marie Minks",
    desc: "Saga Furs top lot mink, cut and sewn to order in our own factory in Greece. Meet the maison behind every Marie Minks piece."
  },
  "/pages/contact.html": {
    title: "Contact — Marie Minks",
    desc: "Message the Marie Minks team about sizing, sourcing a piece, or an existing order. We reply personally, usually the same day."
  },
  "/pages/faq.html": {
    title: "FAQ — Marie Minks",
    desc: "Answers on mink care, sizing, made-to-order lead times, shipping to the UK and EU, and how to spot quality in real fur."
  },
  "/pages/shipping-returns.html": {
    title: "Shipping & Returns — Marie Minks",
    desc: "How your order travels from our factory in Greece, delivery times across the UK and EU, and our returns policy."
  },
  "/pages/size-guide.html": {
    title: "Size Guide — Marie Minks",
    desc: "UK and EU measurements for mink coats, jackets and accessories, plus how to measure a coat that already fits you well."
  },
  "/pages/payment-plans.html": {
    title: "Payment Options — Marie Minks",
    desc: "Pay by card, bank transfer, or in interest free instalments. All payments are handled over an encrypted connection."
  },
  "/pages/checkout.html": {
    title: "Checkout — Marie Minks",
    desc: "Complete your Marie Minks order. We confirm every order personally before anything is made."
  },
  "/pages/account.html": {
    title: "Your Order & Saved Pieces — Marie Minks",
    desc: "Check on a Marie Minks order using your MM- reference, or message us on WhatsApp. No account needed."
  }
};

/** Chemin canonique : query string retiree, elle ne fait pas partie de l'URL. */
function canonicalFor(rel) {
  return SITE_URL + rel;
}

function imageUrl(img) {
  return SITE_URL + "/images/" + img + ".jpg";
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** JSON-LD doit echapper les < et & pour ne pas casser la balise script. */
function jsonLd(obj) {
  return JSON.stringify(obj, null, 2)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/**
 * Remplace le <head> SEO existant par celui qu'on calcule.
 *
 * Important : on retire les balises description / canonical / og / robots
 * deja presentes dans le fichier. Si on les laissait, Google lirait la
 * premiere occurrence, donc celle du fichier, et les reglages de l'admin
 * seraient ignores sans aucun signe visible.
 */
const STALE_HEAD_TAGS =
  /<meta\s+(?:name\s*=\s*["'](?:description|robots|keywords)["']|property\s*=\s*["'](?:og:[^"']*|twitter:[^"']*)["'])[^>]*>/gi;
const STALE_LINK_TAGS = /<link\s+rel\s*=\s*["']canonical["'][^>]*>/gi;
const STALE_LD = /<script\s+type\s*=\s*["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi;

function injectHead(html, headHtml) {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(STALE_HEAD_TAGS, "")
    .replace(STALE_LINK_TAGS, "")
    .replace(STALE_LD, "");

  /* Reindente : on a retire des lignes, on ne veut pas laisser un trou. */
  out = out.replace(/\n{3,}/g, "\n\n");

  const marker = "<!-- mm-seo -->";
  if (out.includes(marker)) return out.replace(marker, headHtml);
  if (!/<\/head>/i.test(out)) return html;
  return out.replace(/<\/head>/i, headHtml + "\n</head>");
}

/** Construit le <head> complet (meta + JSON-LD) pour une page donnee. */
function renderSeoHead(rel, query) {
  const seo = getSeo();
  const collections = getCollections();
  const org = {
    "@type": "Organization",
    "@id": SITE_URL + "/#organization",
    name: "Marie Minks",
    url: SITE_URL + "/",
    logo: SITE_URL + "/assets/img/logo.svg",
    description: "Luxury mink coats and fur, cut and sewn to order in our own factory in Greece.",
    sameAs: ["https://wa.me/447386156525"],
    address: { "@type": "PostalAddress", addressCountry: "GR" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+30",
      contactType: "customer service",
      availableLanguage: ["English"]
    }
  };

  const parts = [];
  let title, desc, canonical, ogType = "website", ld = [], ogImage = SITE_URL + "/assets/img/logo.svg";
  let noindex = false;

  if (rel === "/" || rel === "/index.html") {
    const meta = seo["page:home"] || {};
    title = meta.title || "Marie Minks — Luxury Mink Coats & Fur, Made to Order in Greece";
    desc = meta.description ||
      "Saga Furs top lot mink, cut and sewn to order in our own factory in Greece. Luxury mink coats, pattern mink, kids fur and accessories.";    canonical = canonicalFor("/");
    ld = [
      org,
      {
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        url: SITE_URL + "/",
        name: "Marie Minks",
        publisher: { "@id": SITE_URL + "/#organization" },
        inLanguage: "en"
      }
    ];
  } else if (rel === "/collection.html") {
    const slug = query.c || "";
    const coll = collections.find((c) => c.slug === slug);
    if (coll) {
      const meta = seo["collection:" + slug] || {};
      title = meta.title || coll.title + " | Marie Minks";
      desc = meta.description || coll.description || "";
      canonical = canonicalFor("/collection.html?c=" + slug);
      ogImage = SITE_URL + "/images/" + coll.image + ".jpg";
      const items = getProducts().filter((p) => p.collections.includes(slug));
      ld = [
        org,
        {
          "@type": "CollectionPage",
          "@id": SITE_URL + "/collection.html?c=" + slug + "#webpage",
          url: SITE_URL + "/collection.html?c=" + slug,
          name: coll.title,
          description: desc,
          isPartOf: { "@id": SITE_URL + "/#website" },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: items.length,
            itemListElement: items.slice(0, 24).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: SITE_URL + "/product.html?p=" + p.slug,
              name: p.title
            }))
          }
        }
      ];
    } else {
      title = "Shop All Luxury Mink & Fur | Marie Minks";
      desc = "Browse the full Marie Minks collection: luxury mink coats, pattern mink, kids fur, accessories and gift vouchers.";
      canonical = canonicalFor("/collection.html");
      ld = [
        org,
        {
          "@type": "CollectionPage",
          url: SITE_URL + "/collection.html",
          name: "Shop all",
          isPartOf: { "@id": SITE_URL + "/#website" }
        }
      ];
    }
  } else if (rel === "/product.html") {
    const slug = query.p || "";
    const p = getProducts().find((x) => x.slug === slug);
    if (!p) {
      /* Slug inconnu : page vide cote SEO, on ne pretend pas qu'elle existe. */
      title = "Piece not found — Marie Minks";
      desc = "This piece is no longer available. Browse the current Marie Minks collection instead.";
      canonical = canonicalFor("/collection.html");
      noindex = true;
    } else {
      const meta = seo["product:" + slug] || {};
      title = meta.title || p.title + " | Marie Minks";
      desc = meta.description || p.short || "";
      canonical = canonicalFor("/product.html?p=" + slug);
      ogType = "product";
      const hasPhoto = (p.images || []).some(
        (img) => fs.existsSync(path.join(IMAGES_DIR, img + ".jpg"))
      );
      ogImage = (p.images || []).length
        ? imageUrl((p.images || [])[0])
        : SITE_URL + "/assets/img/logo.svg";

      const variants = (p.sizes || []).map((size) => ({
        "@type": "Offer",
        sku: p.slug + "-" + String(size).replace(/\s+/g, "-").toLowerCase(),
        name: size,
        priceCurrency: "GBP",
        price: p.price.toFixed(2),
        availability: p.stock === "out"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
        url: SITE_URL + "/product.html?p=" + p.slug
      }));

      const productLd = {
        "@type": "Product",
        "@id": SITE_URL + "/product.html?p=" + slug + "#product",
        name: p.title,
        description: p.short || "",
        sku: p.slug,
        brand: { "@type": "Brand", name: p.vendor || "Marie Minks" },
        category: (p.collections || [])
          .map((c) => (collections.find((x) => x.slug === c) || {}).title)
          .filter(Boolean)
          .join(", ") || undefined,
        color: (p.colors || []).map((c) => c.name).join(", ") || undefined,
        material: (p.specs || {})["Fur type"] || undefined,
        /* Sans vraie photo, on n'omet pas le champ image plutot que de
           pointer vers le logo : Google n'accordera pas de resultat enrichi,
           ce qui est preferable a une image trompeuse. */
        image: hasPhoto && (p.images || []).length ? (p.images || []).map(imageUrl) : undefined,
        aggregateRating:
          p.rating && p.reviews
            ? {
                "@type": "AggregateRating",
                ratingValue: p.rating,
                reviewCount: p.reviews,
                bestRating: 5,
                worstRating: 1
              }
            : undefined,
        offers: variants.length
          ? { "@type": "AggregateOffer", priceCurrency: "GBP", lowPrice: p.price.toFixed(2), highPrice: p.price.toFixed(2), offerCount: variants.length, offers: variants }
          : { "@type": "Offer", priceCurrency: "GBP", price: p.price.toFixed(2), availability: "https://schema.org/InStock", url: SITE_URL + "/product.html?p=" + slug }
      };
      ld = [org, productLd];
    }
  } else {
    const meta = seo["page:" + rel] || {};
    const base = STATIC_PAGES[rel];
    title = meta.title || (base && base.title) || "Marie Minks";
    desc = meta.description || (base && base.desc) || "";
    canonical = canonicalFor(rel);
    ld = [
      org,
      {
        "@type": "WebPage",
        "@id": SITE_URL + rel + "#webpage",
        url: SITE_URL + rel,
        name: title,
        description: desc,
        isPartOf: { "@id": SITE_URL + "/#website" },
        inLanguage: "en"
      }
    ];
    /* Les pages de service n'apportent rien au référencement. */
    if (rel === "/pages/checkout.html") noindex = true;
  }

  if (!desc) desc = "Marie Minks — luxury mink coats and fur, made to order in Greece.";

  parts.push("<title>" + esc(title) + "</title>");
  parts.push('<meta name="description" content="' + esc(desc) + '">');
  parts.push('<link rel="canonical" href="' + esc(canonical) + '">');
  if (noindex) parts.push('<meta name="robots" content="noindex,nofollow">');

  parts.push('<meta property="og:site_name" content="Marie Minks">');
  parts.push('<meta property="og:type" content="' + ogType + '">');
  parts.push('<meta property="og:title" content="' + esc(title) + '">');
  parts.push('<meta property="og:description" content="' + esc(desc) + '">');
  parts.push('<meta property="og:url" content="' + esc(canonical) + '">');
  parts.push('<meta property="og:image" content="' + esc(ogImage) + '">');
  parts.push('<meta property="og:locale" content="en_GB">');
  parts.push('<meta name="twitter:card" content="summary_large_image">');
  parts.push('<meta name="twitter:title" content="' + esc(title) + '">');
  parts.push('<meta name="twitter:description" content="' + esc(desc) + '">');
  parts.push('<meta name="twitter:image" content="' + esc(ogImage) + '">');

  if (ld.length) {
    const graph = ld.length === 1 ? ld[0] : { "@context": "https://schema.org", "@graph": ld };
    parts.push('<script type="application/ld+json">' + jsonLd(graph) + "</script>");
  }

  return parts.join("\n");
}

/* ---------------------------------------------------------------- Statistiques */

const TRAFFIC_LOG = () => path.join(DATA_DIR, "traffic.jsonl");

function guessDevice(ua) {
  if (!ua) return "inconnu";
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "tablette";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "ordinateur";
}

function guessCountry(acceptLanguage) {
  if (!acceptLanguage) return null;
  const m = acceptLanguage.match(/[-_]([A-Z]{2})\b/);
  return m ? m[1].toLowerCase() : null;
}

/**
 * Adresse du client. On ne lit X-Forwarded-For que si le serveur est
 * explicitement declare derriere un proxy : sinon n'importe qui peut
 * nous envoyer un faux en-tete pour contourner les limites.
 */
function clientIp(req) {
  if (process.env.TRUST_PROXY === "1") {
    const fwd = req.headers["x-forwarded-for"];
    if (fwd) return String(fwd).split(",")[0].trim();
  }
  return (req.socket && req.socket.remoteAddress) || "inconnu";
}

/* Limiteur generique : un compteur par (action, IP). Volontairement en
   memoire, ce site tourne sur une seule machine. */
const RATE = Object.create(null);

function tooMany(action, ip, max, windowMs) {
  const key = action + "|" + ip;
  const now = Date.now();
  const hit = RATE[key];
  if (!hit || now > hit.until) {
    RATE[key] = { n: 1, until: now + windowMs };
    /* Nettoyage.periodique pour ne pas garder une entree par IP pour rien. */
    if (Object.keys(RATE).length > 5000) {
      Object.keys(RATE).forEach((k) => {
        if (RATE[k].until < now) delete RATE[k];
      });
    }
    return false;
  }
  hit.n++;
  return hit.n > max;
}

/** Identifiant de visiteur, pose par le serveur lui-meme en cookie mm_sid. */
function visitorSid(req) {
  const sid = parseCookies(req).mm_sid;
  return sid && /^[a-f0-9]{8,64}$/.test(sid) ? sid : null;
}

function logTraffic(entry) {
  appendLine(TRAFFIC_LOG(), entry);
  const lines = fs.readFileSync(TRAFFIC_LOG(), "utf8").split("\n");
  if (lines.length > 20000) {
    fs.writeFileSync(TRAFFIC_LOG(), lines.slice(-12000).join("\n"), "utf8");
  }
}

function getStats(days) {
  const since = Date.now() - days * 86400000;
  const rows = readLines(TRAFFIC_LOG()).map((l) => {
    try { return JSON.parse(l); } catch (e) { return null; }
  }).filter((r) => r && r.t > since);

  const views = {};
  const referrers = {};
  const devices = {};
  const countries = {};
  const events = {};
  const daysOut = {};
  let sessions = 0;

  for (let d = 0; d < days; d++) {
    const key = new Date(Date.now() - d * 86400000).toISOString().slice(0, 10);
    daysOut[key] = 0;
  }

  rows.forEach((r) => {
    if (r.kind === "beacon") {
      events[r.event] = (events[r.event] || 0) + 1;
      return;
    }
    views[r.path] = (views[r.path] || 0) + 1;
    devices[r.device] = (devices[r.device] || 0) + 1;
    if (r.referrer) referrers[r.referrer] = (referrers[r.referrer] || 0) + 1;
    if (r.country) countries[r.country] = (countries[r.country] || 0) + 1;
    if (r.day) daysOut[r.day] = (daysOut[r.day] || 0) + 1;
    if (!r.sid || !sessionsSeen.has(r.sid)) {
      sessionsSeen.add(r.sid);
      sessions++;
    }
  });

  const top = (obj, n) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([k, v]) => ({ key: k, n: v }));

  return {
    days,
    total: rows.filter((r) => r.kind !== "beacon").length,
    sessions,
    uniques: sessionsSeen.size,
    chart: Object.entries(daysOut).sort().map(([k, v]) => ({ day: k, n: v })),
    topPages: top(views, 12),
    referrers: top(referrers, 10),
    devices: top(devices, 5),
    countries: top(countries, 10),
    events: top(events, 10)
  };
}

const sessionsSeen = new Set();

/* ---------------------------------------------------------------- Leads */

const LEADS = {
  messages: () => path.join(DATA_DIR, "messages.json"),
  subscribers: () => path.join(DATA_DIR, "subscribers.json"),
  orders: () => path.join(DATA_DIR, "orders.json")
};

function pushLead(kind, payload) {
  const file = kind === "message" ? LEADS.messages() : kind === "subscriber" ? LEADS.subscribers() : LEADS.orders();
  const list = readJSON(file, []);
  list.push(Object.assign({ id: crypto.randomUUID(), received: new Date().toISOString(), read: false }, payload));
  writeJSON(file, list);
  return list.length;
}

function getLeads() {
  return {
    messages: readJSON(LEADS.messages(), []).slice().reverse(),
    subscribers: readJSON(LEADS.subscribers(), []).slice().reverse(),
    orders: readJSON(LEADS.orders(), []).slice().reverse()
  };
}

/* ---------------------------------------------------------------- API */

/* Compteur d'echecs de connexion par IP (module scope : sinon il serait
   recree a chaque requete et ne compterait jamais rien). */
const LOGIN_TRIES = Object.create(null);
const LOCKOUT_AFTER = 8;
const LOCKOUT_MS = 15 * 60 * 1000;

async function handleApi(req, res, pathname) {
  const route = pathname.slice(5); // sans "/api/"

  /* --- Connexion (non protegee) --- */
  if (route === "login" && req.method === "POST") {
    const ip = req.socket.remoteAddress || "?";
    const now = Date.now();

    /* Anti-brenteforce : 8 echecs en 15 min = blocage temporaire */
    if (!LOGIN_TRIES[ip]) LOGIN_TRIES[ip] = { n: 0, until: 0 };
    if (LOGIN_TRIES[ip].until > now) {
      const wait = Math.ceil((LOGIN_TRIES[ip].until - now) / 1000);
      json(res, 429, { ok: false, error: "Trop de tentatives. Reessaye dans " + wait + " s." });
      return true;
    }

    const body = await readJSONBody(req);
    if (!body || !body.password || !verifyPassword(body.password)) {
      LOGIN_TRIES[ip].n++;
      if (LOGIN_TRIES[ip].n >= LOCKOUT_AFTER) {
        LOGIN_TRIES[ip].until = now + LOCKOUT_MS;
        LOGIN_TRIES[ip].n = 0;
        logTraffic({ t: now, kind: "login-fail", ip, locked: true });
      }
      json(res, 401, { ok: false, error: "Mot de passe incorrect" });
      logTraffic({ t: now, kind: "login-fail", ip });
      return true;
    }

    delete LOGIN_TRIES[ip];
    const token = signToken({ exp: Date.now() + SESSION_TTL, stamp: sessionStamp() });
    logTraffic({ t: now, kind: "login-ok", ip });
    send(res, 200, JSON.stringify({ ok: true }), {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Set-Cookie":
        "mm_session=" + token + "; HttpOnly; Path=/; SameSite=Strict; Max-Age=" + Math.floor(SESSION_TTL / 1000)
    });
    return true;
  }

  if (route === "session" && req.method === "GET") {
    json(res, 200, { authed: isAuthed(req), site: SITE_URL });
    return true;
  }

  /* --- Mise en route : la creation du compte administrateur ---------------
     Publie, mais fermé dès qu'un administrateur existe. --- */
  if (route === "setup/status" && req.method === "GET") {
    json(res, 200, { needsSetup: !adminExists() });
    return true;
  }

  if (route === "setup" && req.method === "POST") {
    const ip = clientIp(req);
    /* 5 essais de creation par heure : la creation ne se fait qu'une fois,
       au premier lancement. Au-delà on ne pourra plus créer de compte. */
    if (tooMany("setup", ip, 5, 60 * 60 * 1000)) {
      json(res, 429, { ok: false, error: "Trop de tentatives, reessayez plus tard." });
      return true;
    }

    /* Un administrateur existe deja : plus rien a creer. */
    if (adminExists()) {
      json(res, 409, { ok: false, error: "Un administrateur existe deja." });
      return true;
    }

    const body = await readJSONBody(req, 8 * 1024);
    const pw = body && typeof body.password === "string" ? body.password : "";

    /* 10 caracteres minimum : en dessous, une adresse IP peut etre forcee
       meme si le blocage anti-brenteforce est deja en place. */
    if (pw.length < 10) {
      json(res, 400, { ok: false, error: "Le mot de passe doit faire au moins 10 caracteres." });
      return true;
    }
    if (pw.length > 200) {
      json(res, 400, { ok: false, error: "Mot de passe trop long." });
      return true;
    }

    const made = createAdmin(pw);
    if (!made.ok) {
      json(res, 409, { ok: false, error: made.error });
      return true;
    }

    /* On ouvre directement la session : l'admin vient de se connecter
       avec ce qu'il vient de taper, inutile de le redemander. */
    ADMIN = loadAdminNoCreate();
    const token = signToken({ exp: Date.now() + SESSION_TTL, stamp: sessionStamp() });
    res.setHeader("Set-Cookie", SESSION_COOKIE + "=" + token + "; Path=/; HttpOnly; SameSite=Lax; Max-Age=" + Math.floor(SESSION_TTL / 1000));
    json(res, 200, { ok: true });
    return true;
  }

  /* --- Beacon : public, le site public doit pouvoir mesurer ses evenements --- */
  if (route === "beacon" && req.method === "POST") {
    const ip = clientIp(req);
    if (tooMany("beacon", ip, 60, 60 * 1000)) {
      json(res, 429, { ok: false, error: "Trop d'evenements, ralentis" });
      return true;
    }
    const body = await readJSONBody(req, 8 * 1024);
    if (body && body.event) {
      /* Aucune donnee client n'est acceptee ici : nom d'evenement et produit
         uniquement. Le journal sert a mesurer, pas a suivre des personnes. */
      logTraffic({
        t: Date.now(),
        kind: "beacon",
        event: String(body.event).slice(0, 60),
        path: String(body.path || "").slice(0, 200),
        value: typeof body.value === "number" ? body.value : undefined
      });
    }
    json(res, 200, { ok: true });
    return true;
  }

  /* --- Lead : public, c'est le site public qui envoie les formulaires.
         Il est donc place AVANT le controle de session. --- */
  if (route === "lead" && req.method === "POST") {
    const ip = clientIp(req);
    /* 20 envois par heure et par IP : assez pour une vraie cliente qui
       se trompe, pas assez pour remplir le fichier de commandes. */
    if (tooMany("lead", ip, 20, 60 * 60 * 1000)) {
      json(res, 429, { ok: false, error: "Trop d'envois, reessayez plus tard" });
      return true;
    }

    const body = await readJSONBody(req, 64 * 1024);
    if (!body || !body.type) {
      json(res, 400, { ok: false, error: "Type manquant" });
      return true;
    }

    /* Piege a robots : un champ cache que seuls les robots remplissent.
       On repond OK sans rien enregistrer pour ne pas les avertir. */
    if (body.website) {
      json(res, 200, { ok: true });
      return true;
    }

    const emailOk = (s) => typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

    if (body.type === "subscriber") {
      if (!emailOk(body.email)) {
        json(res, 400, { ok: false, error: "Email invalide" });
        return true;
      }
      const mail = body.email.trim().slice(0, 160);
      const list = readJSON(LEADS.subscribers(), []);
      if (list.some((s) => (s.email || "").toLowerCase() === mail.toLowerCase())) {
        /* 409 : deja inscrit. Le site public traite ce cas comme un succes,
           une personne legitimately inscrite ne doit pas voir une erreur. */
        json(res, 409, { ok: false, duplicate: true, error: "Cet email est deja inscrit" });
        return true;
      }
      pushLead("subscriber", {
        email: mail,
        source: String(body.source || "footer").slice(0, 40),
        sid: body.sid || visitorSid(req)
      });
    } else if (body.type === "message") {
      if (!emailOk(body.email) || typeof body.message !== "string" || !body.message.trim()) {
        json(res, 400, { ok: false, error: "Email et message requis" });
        return true;
      }
      pushLead("message", {
        email: body.email.trim().slice(0, 160),
        name: String(body.name || "").slice(0, 80),
        subject: String(body.subject || "").slice(0, 120),
        message: body.message.trim().slice(0, 4000),
        page: String(body.page || "").slice(0, 200),
        sid: body.sid || visitorSid(req)
      });
    } else if (body.type === "order") {
      if (!emailOk(body.email) || !Array.isArray(body.items) || !body.items.length) {
        json(res, 400, { ok: false, error: "Commande incomplete" });
        return true;
      }
      const items = body.items.slice(0, 40).map((it) => ({
        title: String((it && it.title) || "").slice(0, 160),
        slug: String((it && it.slug) || "").slice(0, 160),
        size: String((it && it.size) || "").slice(0, 40),
        qty: Math.min(20, Math.max(1, Number((it && it.qty) || 1) || 1))
      }));
      /* Le total est recalcule ici : on ne fait jamais confiance au prix
         envoye par le navigateur. */
      const total = items.reduce((sum, it) => {
        const prod = getProducts().find((p) => p.slug === it.slug);
        return sum + (prod ? prod.price : 0) * it.qty;
      }, 0);
      pushLead("order", {
        ref: "MM-" + Date.now().toString(36).toUpperCase().slice(-6),
        email: body.email.trim().slice(0, 160),
        name: String(body.name || "").slice(0, 80),
        phone: String(body.phone || "").slice(0, 40),
        address: String(body.address || "").slice(0, 600),
        items,
        total,
        currency: "GBP",
        plan: String(body.plan || "").slice(0, 120),
        note: String(body.note || "").slice(0, 600),
        page: String(body.page || "").slice(0, 200),
        sid: body.sid || visitorSid(req)
      });
    } else {
      json(res, 400, { ok: false, error: "Type inconnu" });
      return true;
    }
    json(res, 200, { ok: true });
    return true;
  }

  /* --- Le reste exige une session --- */
  if (!isAuthed(req)) {
    json(res, 401, { ok: false, error: "Non connecte" });
    return true;
  }

  if (route === "logout" && req.method === "POST") {
    send(res, 200, JSON.stringify({ ok: true }), {
      "Content-Type": "application/json",
      "Set-Cookie": "mm_session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0"
    });
    return true;
  }

  if (route === "password" && req.method === "PUT") {
    const body = await readJSONBody(req);
    if (!body || !body.current || !verifyPassword(body.current)) {
      json(res, 400, { ok: false, error: "Mot de passe actuel incorrect" });
      return true;
    }
    if (!body.next || String(body.next).length < 8) {
      json(res, 400, { ok: false, error: "Le nouveau mot de passe doit faire au moins 8 caracteres" });
      return true;
    }
    const salt = crypto.randomBytes(16).toString("hex");
    writeJSON(path.join(DATA_DIR, "admin.json"), {
      salt,
      hash: hashPassword(body.next, salt),
      created: ADMIN.created
    });
    ADMIN = loadAdminNoCreate();

    /* La session courante est re-emise avec la nouvelle empreinte,
       les autres sessions ouvertes deviennent invalides. */
    const token = signToken({ exp: Date.now() + SESSION_TTL, stamp: sessionStamp() });
    logTraffic({ t: Date.now(), kind: "admin", action: "password-changed", ip: req.socket.remoteAddress });
    send(res, 200, JSON.stringify({ ok: true }), {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie":
        "mm_session=" + token + "; HttpOnly; Path=/; SameSite=Strict; Max-Age=" + Math.floor(SESSION_TTL / 1000)
    });
    return true;
  }

  /* --- Produits --- */
  if (route === "products" && req.method === "GET") {
    json(res, 200, { products: getProducts() });
    return true;
  }

  if (route === "products" && req.method === "PUT") {
    const body = await readJSONBody(req, 8 * 1024 * 1024);
    if (!body || !Array.isArray(body.products)) {
      json(res, 400, { ok: false, error: "Liste de produits invalide" });
      return true;
    }

    const valid = body.products.filter(
      (p) => p && typeof p === "object" && p.slug && p.title
    );

    /* Sauvegarde atomique : si la regeneration de data.js echoue,
       products.json ne doit pas non plus rester ecrit, sinon le fichier
       de donnees et le fichier envoye au navigateur divergent. */
    const backup = fs.existsSync(PRODUCTS_JSON)
      ? fs.readFileSync(PRODUCTS_JSON, "utf8")
      : null;
    const dataJsBefore = fs.readFileSync(DATA_JS, "utf8");

    if (!saveProducts(valid)) {
      if (backup === null) fs.unlinkSync(PRODUCTS_JSON);
      else fs.writeFileSync(PRODUCTS_JSON, backup, "utf8");
      json(res, 500, {
        ok: false,
        error: "Echec de la regeneration de assets/js/data.js. Aucune modification enregistree."
      });
      return true;
    }

    /* Verification : le fichier regenere doit contenir exactement les memes produits. */
    const written = evalArrayLiteral(fs.readFileSync(DATA_JS, "utf8"), "PRODUCTS");
    if (!written || written.length !== valid.length) {
      fs.writeFileSync(DATA_JS, dataJsBefore, "utf8");
      if (backup === null) fs.unlinkSync(PRODUCTS_JSON);
      else fs.writeFileSync(PRODUCTS_JSON, backup, "utf8");
      json(res, 500, {
        ok: false,
        error: "Le fichier data.js regenere ne correspond pas aux produits envoyes."
      });
      return true;
    }

    logTraffic({ t: Date.now(), kind: "admin", action: "products-saved", n: valid.length });
    json(res, 200, { ok: true, count: valid.length });
    return true;
  }

  /* --- Images --- */
  if (route === "images" && req.method === "GET") {
    json(res, 200, listImages());
    return true;
  }

  if (route === "upload" && req.method === "POST") {
    const raw = (req.headers["x-filename"] || "").toString();
    const name = path.basename(raw).replace(/[^A-Za-z0-9._-]/g, "-");
    if (!name) {
      json(res, 400, { ok: false, error: "Nom de fichier manquant (header X-Filename)" });
      return true;
    }
    const ext = path.extname(name).toLowerCase();
    if (!ALLOWED_IMAGE_EXT.includes(ext)) {
      json(res, 400, { ok: false, error: "Format non autorise. Attendu : " + ALLOWED_IMAGE_EXT.join(", ") });
      return true;
    }
    let buf;
    try {
      buf = await readBody(req, MAX_UPLOAD);
    } catch (e) {
      json(res, 413, { ok: false, error: "Fichier trop lourd (max 12 Mo)" });
      return true;
    }
    if (!buf.length) {
      json(res, 400, { ok: false, error: "Fichier vide" });
      return true;
    }
    const target = path.join(IMAGES_DIR, name);
    if (path.dirname(path.resolve(target)) !== path.resolve(IMAGES_DIR)) {
      json(res, 400, { ok: false, error: "Chemin invalide" });
      return true;
    }
    fs.writeFileSync(target, buf);
    logTraffic({ t: Date.now(), kind: "admin", action: "upload", file: name, size: buf.length });
    json(res, 200, { ok: true, file: name, size: buf.length, url: "/images/" + name });
    return true;
  }

  if (route === "image" && req.method === "DELETE") {
    const name = path.basename((url.parse(req.url, true).query.name || "").toString());
    const ext = path.extname(name).toLowerCase();
    if (!name || !ALLOWED_IMAGE_EXT.includes(ext)) {
      json(res, 400, { ok: false, error: "Nom invalide" });
      return true;
    }
    const target = path.join(IMAGES_DIR, name);
    if (!fs.existsSync(target)) {
      json(res, 404, { ok: false, error: "Fichier absent" });
      return true;
    }
    fs.unlinkSync(target);
    logTraffic({ t: Date.now(), kind: "admin", action: "delete", file: name });
    json(res, 200, { ok: true });
    return true;
  }

  /* --- Leads --- */
  if (route === "leads" && req.method === "GET") {
    json(res, 200, getLeads());
    return true;
  }

  if (route === "leads/read" && req.method === "POST") {
    const body = await readJSONBody(req);
    const map = { message: LEADS.messages(), subscriber: LEADS.subscribers(), order: LEADS.orders() };
    const file = map[body && body.type];
    if (!file) {
      json(res, 400, { ok: false, error: "Type inconnu" });
      return true;
    }
    const list = readJSON(file, []);
    const found = list.find((x) => x.id === (body.id || ""));
    if (found) found.read = true;
    writeJSON(file, list);
    json(res, 200, { ok: true });
    return true;
  }

  /* --- Export --- */
  if (route === "export" && req.method === "GET") {
    const which = url.parse(req.url, true).query.what || "products";
    const payload =
      which === "leads" ? getLeads() : which === "stats" ? getStats(30) : { products: getProducts(), seo: getSeo() };
    send(res, 200, JSON.stringify(payload, null, 2), {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": "attachment; filename=\"" + which + "-export.json\""
    });
    return true;
  }

  /* --- Stats --- */
  if (route === "stats" && req.method === "GET") {
    const days = Math.min(365, Math.max(1, Number(url.parse(req.url, true).query.days) || 30));
    sessionsSeen.clear();
    json(res, 200, getStats(days));
    return true;
  }

  if (route === "log" && req.method === "GET") {
    const rows = readLines(TRAFFIC_LOG(), 400).map((l) => {
      try { return JSON.parse(l); } catch (e) { return null; }
    }).filter(Boolean).reverse();
    json(res, 200, { rows });
    return true;
  }

  /* --- SEO --- */
  if (route === "seo" && req.method === "GET") {
    json(res, 200, { overrides: getSeo(), audit: seoAudit() });
    return true;
  }

  if (route === "seo" && req.method === "PUT") {
    const body = await readJSONBody(req);
    if (!body || typeof body.overrides !== "object") {
      json(res, 400, { ok: false, error: "Donnees invalides" });
      return true;
    }
    writeJSON(SEO_FILE(), body.overrides);
    json(res, 200, { ok: true });
    return true;
  }

  if (route === "seo/audit" && req.method === "GET") {
    json(res, 200, seoAudit());
    return true;
  }

  json(res, 404, { ok: false, error: "Route inconnue : " + route });
  return true;
}

/** Recharge admin.json apres un changement de mot de passe. */
function loadAdminNoCreate() {
  const record = readJSON(path.join(DATA_DIR, "admin.json"), null);
  return record;
}

/* ---------------------------------------------------------------- Statique */

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel.endsWith("/")) rel += "index.html";

  const target = path.resolve(ROOT, "." + rel);
  const relative = path.relative(ROOT, target);

  /* Liste blanche : "" = racine (uniquement les pages), sinon un dossier autorise */
  const top = relative.includes(path.sep) ? relative.split(path.sep)[0] : "";
  const allowed = top === "" ? SERVE_ROOT_FILES.includes(relative) : SERVE_DIRS.includes(top);

  if (!allowed) {
    text(res, 403, "403 - Acces refuse");
    return;
  }

  fs.stat(target, (err, stat) => {
    if (err || !stat.isFile()) {
      text(res, 404, "404 - " + rel);
      return;
    }

    const ext = path.extname(target).toLowerCase();
    const etag = '"' + stat.size.toString(16) + "-" + stat.mtimeMs.toString(16) + '"';

    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, { ETag: etag });
      res.end();
      return;
    }

    const isAdmin = top === "" && rel === "/admin.html";

    /* Les pages publiques recoivent leurs balises SEO et leur JSON-LD
       injectes par le serveur, pour que Google les lise sans executer
       de JavaScript. admin.html est exclu : il ne doit jamais etre indexe. */
    if (ext === ".html" && !isAdmin) {
      let html;
      try {
        html = fs.readFileSync(target, "utf8");
      } catch (e) {
        text(res, 500, "500 - lecture impossible");
        return;
      }
      const query = url.parse(req.url, true).query || {};
      const out = injectHead(html, renderSeoHead(rel, query));
      const buf = Buffer.from(out, "utf8");

      /* Un slug inconnu doit repondre 404, pas 200 : sinon Google
         l'indexe quand meme et il considere la page comme un "soft 404". */
      let status = 200;
      let noCache = "no-cache";
      if (rel === "/product.html" && query.p && !getProducts().some((x) => x.slug === query.p)) {
        status = 404;
        noCache = "no-store";
      }

      res.writeHead(status, {
        "Content-Type": MIME[ext],
        "Content-Length": buf.length,
        /* L'ETag porte sur le fichier source : si la config SEO change,
           le ETag doit changer aussi, sinon Google gardera son cache. */
        ETag: '"' + stat.size.toString(16) + "-" + stat.mtimeMs.toString(16) + "-seo" + jsonMd5(),
        "Cache-Control": noCache,
        "X-Content-Type-Options": "nosniff"
      });
      res.end(buf);
      return;
    }

    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Content-Length": stat.size,
      "ETag": etag,
      "Cache-Control": ext === ".html" ? "no-cache" : isAdmin ? "no-store" : "public, max-age=3600",
      "X-Content-Type-Options": "nosniff"
    });
    fs.createReadStream(target).pipe(res);
  });
}

/* ---------------------------------------------------------------- Serveur */

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  /* Journal de trafic (pages seulement, pas les assets) */
  if (req.method === "GET" && !pathname.startsWith("/assets/") && !pathname.startsWith("/api/") &&
      !/\.(jpg|jpeg|webp|png|avif|gif|svg|ico|css|js|woff2?|xml|txt)$/i.test(pathname)) {
    const cookies = parseCookies(req);
    let sid = cookies.mm_sid;
    let isNewVisitor = false;

    if (!sid || !/^[a-f0-9]{8,64}$/.test(sid)) {
      sid = crypto.randomBytes(8).toString("hex");
      isNewVisitor = true;
      res.setHeader(
        "Set-Cookie",
        "mm_sid=" + sid + "; Path=/; SameSite=Lax; Max-Age=" + 60 * 60 * 24 * 30
      );
    }

    logTraffic({
      t: Date.now(),
      day: new Date().toISOString().slice(0, 10),
      kind: "page",
      path: pathname,
      referrer: (req.headers.referer || "").slice(0, 200) || null,
      device: guessDevice(req.headers["user-agent"]),
      country: guessCountry(req.headers["accept-language"]),
      ua: (req.headers["user-agent"] || "").slice(0, 160),
      newVisitor: isNewVisitor,
      sid
    });
  }

  try {
    if (pathname === "/sitemap.xml") {
      text(res, 200, buildSitemap(), "application/xml");
      return;
    }

    if (pathname === "/robots.txt") {
      text(
        res,
        200,
        "User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /api/\n\nSitemap: " + SITE_URL + "/sitemap.xml\n"
      );
      return;
    }

    if (pathname.startsWith("/api/")) {
      await handleApi(req, res, pathname);
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      text(res, 405, "405 - Methode non autorisee");
      return;
    }

    serveStatic(req, res, pathname);
  } catch (e) {
    console.error("Erreur serveur :", e.message);
    if (!res.headersSent) text(res, 500, "500 - " + e.message);
  }
});

/* ---------------------------------------------------------------- Demarrage */

const ARGS = process.argv.slice(2);
const WANTS_RESET = ARGS.includes("--reset-password") || ARGS.includes("--reset") || ARGS.includes("-r");

ensureDirs();
SECRET = loadSecret();

if (WANTS_RESET) {
  /* On reinitialise puis on quitte : inutile de demarrer un serveur. */
  resetAdminPassword();
  process.exit(0);
}

ADMIN = loadAdmin();
getProducts(); // initialise data/products.json au premier lancement

server.listen(PORT, HOST, () => {
  console.log("\n  Marie Minks — serveur demarre");
  console.log("  -----------------------------------------------");
  console.log("  Site    : http://" + HOST + ":" + PORT + "/");
  console.log("  Admin   : http://" + HOST + ":" + PORT + "/admin.html");
  console.log("  Sitemap : http://" + HOST + ":" + PORT + "/sitemap.xml");
  console.log("  Donnees : " + DATA_DIR);
  console.log("  -----------------------------------------------");
  console.log("  Mot de passe oublie ? node server.js --reset-password");
  console.log("  -----------------------------------------------\n");
});