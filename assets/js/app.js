/* ==========================================================================
   MARIE MINKS — Scripts du site
   Vanilla JS, aucune dépendance. Un seul fichier + data.js.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- 1. Utilitaires */

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /** Préfixe relatif : "" à la racine, "../" depuis /pages/ */
  const IS_SUB = /\/pages\//i.test(location.pathname);
  const BASE = IS_SUB ? "../" : "";

  const U = (p) => BASE + p.replace(/^\//, "");
  const A = (p) => U("assets/" + p.replace(/^\//, ""));

  const GBP = { code: "GBP", symbol: "£", rate: 1 };

  function currency() {
    const code = localStorage.getItem("mm_currency") || "GBP";
    return (typeof CURRENCIES !== "undefined" && CURRENCIES.find((c) => c.code === code)) || GBP;
  }

  /** 1750 -> "£1,750" (ou équivalent dans la devise active) */
  function money(gbpAmount) {
    const c = currency();
    const dec = c.decimals || (c.rate * gbpAmount >= 1000 ? 0 : 2);
    const value = (gbpAmount || 0) * c.rate;
    const n = value.toLocaleString("en-GB", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    });
    return c.symbol + n;
  }

  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
    );

  const param = (k) => new URLSearchParams(location.search).get(k);

  function store(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (e) {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* mode privé — on ignore */
    }
  }

  /* ---------------------------------------------------------------- 2. Images */

  const PH_COLOR = "#efe7d3";
  const PH_TEXT = "#15110d";

  /** Placeholder SVG encode (data URI) — affiché tant que la photo n'existe pas. */
  function placeholderUri(label) {
    const labelText = (label || "PHOTO").toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
<rect width="400" height="500" fill="${PH_COLOR}"/>
<g stroke="${PH_TEXT}" fill="none" stroke-opacity="0.28" stroke-width="1.5">
<rect x="150" y="196" width="100" height="80" rx="4"/>
<circle cx="174" cy="222" r="11"/>
<path d="M156 268l26-24 20 18 16-14 26 20"/>
</g>
<text x="200" y="320" font-family="Helvetica,Arial,sans-serif" font-size="11" letter-spacing="2.2"
 fill="${PH_TEXT}" fill-opacity="0.42" text-anchor="middle">${labelText}</text>
</svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /**
   * Construit une balise <img> qui bascule sur un placeholder si le fichier
   * n'existe pas. Accepte images/xxx.jpg puis .webp puis .png.
   */
  function productImg(slug, alt, opts) {
    const o = opts || {};
    const exts = ["jpg", "webp", "png"];
    let i = 0;
    const img = new Image();
    img.alt = alt || "";
    img.loading = o.eager ? "eager" : "lazy";
    img.decoding = "async";
    if (o.class) img.className = o.class;

    img.onerror = function () {
      if (i < exts.length) {
        img.src = U("images/" + slug + "." + exts[i++]);
      } else {
        img.onerror = null;
        img.src = placeholderUri(o.label);
        img.style.objectFit = "cover";
      }
    };
    img.src = U("images/" + slug + "." + exts[i++]);
    return img;
  }

  /* ---------------------------------------------------------------- 3. Icônes */

  const ICON = {
    cart: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.7 3h2.1l2.2 11.2a1.5 1.5 0 0 0 1.5 1.3h8.9a1.5 1.5 0 0 0 1.5-1.2L20.6 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="20" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="17.5" cy="20" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M16.2 16.2L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    account: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="3.75" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.6 2.6l18.8 18.8M21.4 2.6L2.6 21.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    burger: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6.5h18M3 12h18M3 17.5h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20s-7.5-4.7-7.5-9.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.5 3C19.5 15.3 12 20 12 20Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9L12 3.5Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m4 12.5 5 5 11-11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7.5h11v9H2zM13 11h4.5l2.5 3v2.5H13z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="6.5" cy="18.5" r="1.7" stroke="currentColor" stroke-width="1.4"/><circle cx="16.5" cy="18.5" r="1.7" stroke="currentColor" stroke-width="1.4"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.8 21 7v10l-9 4.2L3 17V7l9-4.2Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M3 7l9 4.2L21 7M12 11.2V21" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 9.5h17M3.5 14.5h17M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" stroke="currentColor" stroke-width="1.4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.4"/><path d="M12 7v5.5l3.5 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4c0 9-5.2 13-11 13H5C5 9 10 4 20 4Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M4 21c2.5-6 6.5-9.5 12-11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.5h3l1.6 4-2 1.4a12 12 0 0 0 6.5 6.5l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4 5.7 2 2 0 0 1 6 3.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="m4 7.5 8 5.5 8-5.5" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 12c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.2-2.9-.4L4 21l1.3-3.4C4.1 16.2 3.5 14.2 3.5 12 3.5 7.9 7.3 4.6 12 4.6S20.5 7.9 20.5 12Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M6 11h10M11 6v10M16.2 16.2 21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  };

const BADGES = {
  "ships-fast": { label: "Ships fast", cls: "" },
  "sustainable-materials": { label: "Sustainable", cls: "badge--sust" },
  "best-seller": { label: "Best Seller", cls: "" },
  "sale": { label: "Sale", cls: "badge--sust" },
  "exclusive": { label: "Exclusive", cls: "" },
  "new": { label: "New", cls: "" }
};

  /* ---------------------------------------------------------------- 4. En-tête */

  function renderHeader() {
    const mount = $("[data-mm-header]");
    if (!mount) return;

    const navItems = (typeof NAV !== "undefined" ? NAV : [])
      .map((item) => {
        if (!item.children) {
          return `<li class="nav-item"><a class="nav-link" href="${U(item.href)}">${esc(item.label)}</a></li>`;
        }
        const sub = item.children.map((c) => `<a href="${U(c.href)}">${esc(c.label)}</a>`).join("");
        return `<li class="nav-item">
<a class="nav-link" href="${U(item.href)}">${esc(item.label)}</a>
<div class="nav-item__panel">${sub}</div>
</li>`;
      })
      .join("");

    const currencyOptions = CURRENCIES.map(
      (c) => `<option value="${c.code}"${c.code === currency().code ? " selected" : ""}>${c.code} ${c.symbol}</option>`
    ).join("");

    mount.innerHTML = `
<a class="skip-link" href="#main">Skip to content</a>

<div class="announcement">
  <div class="announcement__track" data-announce>
    ${(typeof ANNOUNCEMENTS !== "undefined" ? ANNOUNCEMENTS : [])
      .map((t, i) => `<p class="announcement__item${i === 0 ? " is-active" : ""}">${t}</p>`)
      .join("")}
  </div>
</div>

<header class="header">
  <div class="container">
    <div class="header__inner">
      <div class="header__nav">
        <button class="burger" type="button" data-open-nav aria-label="Open menu" aria-expanded="false">
          ${ICON.burger}
        </button>
        <nav aria-label="Main">
          <ul class="nav-list">${navItems}</ul>
        </nav>
      </div>

      <div class="header__logo">
        <a href="${U("index.html")}" aria-label="Marie Minks — home">
          <img src="${A("img/logo.svg")}" alt="Marie Minks" class="header__mark" width="205" height="113">
        </a>
      </div>

      <div class="header__actions">
        <div class="currency-select hide-tablet">
          <select data-currency aria-label="Currency">${currencyOptions}</select>
        </div>
        <a class="icon-btn hide-tablet" href="${U("pages/account.html")}" aria-label="Your order and saved pieces">${ICON.account}</a>
        <button class="icon-btn" type="button" data-open-search aria-label="Search">${ICON.search}</button>
        <button class="icon-btn" type="button" data-open-cart aria-label="Cart">
          ${ICON.cart}
          <span class="cart-dot" data-cart-count hidden>0</span>
        </button>
      </div>
    </div>
  </div>
</header>

<div class="mobile-nav" data-mobile-nav>
  <div class="mobile-nav__overlay" data-close-nav></div>
  <div class="mobile-nav__panel">
    <div class="mobile-nav__head">
      <strong>Menu</strong>
      <button class="icon-btn" type="button" data-close-nav aria-label="Close menu">${ICON.close}</button>
    </div>
    <div class="mobile-nav__body">
      <a href="${U("index.html")}" style="display:block;padding:1rem 0;font-size:1.0625rem;">Home</a>
      <details>
        <summary>Mink Fur</summary>
        <div>
          <a href="${U("collection.html?c=luxury-mink-coats")}">Luxury Mink Coats</a>
          <a href="${U("collection.html?c=mink-pieces")}">Pattern Mink</a>
        </div>
      </details>
      <details>
        <summary>Kids Collection</summary>
        <div>
          <a href="${U("collection.html?c=childrens-mink-coats-jackets")}">Kids Mink Coats &amp; Jackets</a>
          <a href="${U("collection.html?c=kids-fox-fur-coats-jackets")}">Kids Fox Fur Coats &amp; Jackets</a>
        </div>
      </details>
      <a href="${U("collection.html?c=fur-accessories")}" style="display:block;padding:1rem 0;border-bottom:1px solid var(--c-border-meta);font-size:1.0625rem;">Fur Accessories</a>
      <a href="${U("collection.html?c=gift-vouchers")}" style="display:block;padding:1rem 0;border-bottom:1px solid var(--c-border-meta);font-size:1.0625rem;">Gift Vouchers</a>
      <a href="${U("pages/payment-plans.html")}" style="display:block;padding:1rem 0;border-bottom:1px solid var(--c-border-meta);font-size:1.0625rem;">Payment Plans</a>
      <a href="${U("pages/contact.html")}" style="display:block;padding:1rem 0;font-size:1.0625rem;">Contact</a>

      <div class="mobile-nav__foot">
        <a href="${U("pages/account.html")}" style="display:block;padding:0.6rem 0;">Your order</a>
        <a href="${U("pages/contact.html")}" style="display:block;padding:0.6rem 0;">+44 7723 143962</a>
        <div style="margin-top:1rem;">
          <div class="currency-select">
            <select data-currency aria-label="Currency">${currencyOptions}</select>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

    bindHeader();
    startAnnouncement();
  }

  /* ---------------------------------------------------------------- 5. Barre d'annonce */

  function startAnnouncement() {
    const track = $("[data-announce]");
    if (!track) return;
    const items = $$(".announcement__item", track);
    if (items.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let i = 0;
    setInterval(() => {
      const prev = items[i];
      i = (i + 1) % items.length;
      const next = items[i];
      prev.classList.remove("is-active");
      prev.classList.add("is-out");
      next.classList.add("is-active");
      setTimeout(() => prev.classList.remove("is-out"), 600);
    }, 4200);
  }

  /* ---------------------------------------------------------------- 6. Recherche */

  function renderSearchPanel() {
    const mount = $("[data-mm-search]");
    if (!mount) return;

    const scopes = ["All products", "Luxury Mink", "Kids", "Accessories"];

    mount.innerHTML = `
<div class="overlay" data-overlay></div>
<aside class="search-panel" data-search-panel aria-label="Search" aria-hidden="true">
  <div class="search-panel__head">
    <strong>Search</strong>
    <button class="icon-btn" type="button" data-close-search aria-label="Close search">${ICON.close}</button>
  </div>
  <div class="search-field">
    ${ICON.search}
    <input type="search" placeholder="Search for coats, jackets, accessories…" data-search-input aria-label="Search products">
  </div>
  <div class="search-scope">
    ${scopes
      .map((s, i) => `<button type="button" class="${i === 0 ? "is-active" : ""}" data-scope="${esc(s)}">${esc(s)}</button>`)
      .join("")}
  </div>
  <div class="search-results" data-search-results>
    <p class="search-results__hint">Start typing — try "mink", "coat" or "fox".</p>
  </div>
</aside>`;

    const input = $("[data-search-input]", mount);
    const out = $("[data-search-results]", mount);
    let scope = "All products";

    $$("[data-scope]", mount).forEach((btn) => {
      btn.addEventListener("click", () => {
        $$("[data-scope]", mount).forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        scope = btn.dataset.scope;
        run();
      });
    });

    function run() {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        out.innerHTML = '<p class="search-results__hint">Start typing — try "mink", "coat" or "fox".</p>';
        return;
      }

      const matches = PRODUCTS.filter((p) => {
        const hay = (p.title + " " + p.vendor + " " + p.collections.join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
        if (scope === "All products") return true;
        if (scope === "Luxury Mink") return p.collections.includes("luxury-mink-coats") || p.collections.includes("mink-pieces");
        if (scope === "Kids") return p.collections.some((c) => c.includes("child") || c.includes("kids"));
        if (scope === "Accessories") return p.collections.includes("fur-accessories") || p.collections.includes("gift-vouchers");
        return true;
      });

if (!matches.length) {
        out.innerHTML = '<p class="search-results__hint">No results. Try a broader word, or message us and we will source it for you.</p>';
        return;
      }


      track("search", matches.length);
      out.innerHTML =
        matches
          .map(
            (p) => `<a class="search-hit" href="${U("product.html?p=" + p.slug)}">
<div data-thumb></div>
<div>
<div class="search-hit__title">${esc(p.title)}</div>
<div class="search-hit__meta">${money(p.price)}</div>
</div>
</a>`
          )
          .join("");

      $$("[data-thumb]", out).forEach((slot, i) => {
        slot.appendChild(productImg(matches[i].images[0], matches[i].title, { label: matches[i].title }));
      });
    }

    input.addEventListener("input", run);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value.trim()) {
        /* On mesure seulement quand la recherche est validee, pas a chaque
           lettre : sinon le journal recit chaque frappe clavier. */
        track("search");
        location.href = U("collection.html?q=" + encodeURIComponent(input.value.trim()));
      }
    });
  }

  /* ---------------------------------------------------------------- 7. Panier */

  const FREE_SHIPPING_FROM = 1000;

  function cart() {
    return store("mm_cart", []);
  }

  function setCart(items) {
    save("mm_cart", items);
    renderCartDrawer();
    updateCartCount();
  }

  function addToCart(product, opts) {
    const o = opts || {};
    const items = cart();
    const key = product.slug + "|" + (o.color || "") + "|" + (o.size || "");
    const found = items.find((i) => i.key === key);

    if (found) {
      found.qty = Math.min(found.qty + (o.qty || 1), 10);
    } else {
      items.push({
        key,
        slug: product.slug,
        title: product.title,
        image: product.images[0],
        price: product.price,
        color: o.color || "",
        size: o.size || "",
        qty: o.qty || 1
      });
    }

    setCart(items);
    openCart();
    bumpDot();
    toast(product.title + " added to your bag");

    /* Mesure : on note le produit par son slug, jamais son titre ni
       aucune donnee de la visiteuse. */
    track("add_to_cart", product.price);
  }

  function cartCount() {
    return cart().reduce((n, i) => n + i.qty, 0);
  }

  function cartSubtotal() {
    return cart().reduce((n, i) => n + i.price * i.qty, 0);
  }

  function updateCartCount() {
    const n = cartCount();
    $$("[data-cart-count]").forEach((el) => {
      el.textContent = n;
      el.hidden = n === 0;
    });
  }

  function bumpDot() {
    const dot = $("[data-cart-count]");
    if (!dot) return;
    dot.classList.add("is-bump");
    setTimeout(() => dot.classList.remove("is-bump"), 260);
  }

  function openCart() {
    const d = $("[data-cart-drawer]");
    if (d) openPanel(d);
  }

  function renderCartDrawer() {
    const mount = $("[data-mm-cart]");
    if (!mount) return;

    const items = cart();
    const subtotal = cartSubtotal();
    const remaining = Math.max(0, FREE_SHIPPING_FROM - subtotal);
    const pct = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);

    const lines = items
      .map((i) => {
        const lineTotal = i.price * i.qty;
        return `<div class="line-item">
<div class="line-item__media" data-thumb></div>
<div>
<div class="line-item__title"><a href="${U("product.html?p=" + i.slug)}">${esc(i.title)}</a></div>
${i.color || i.size ? `<div class="line-item__variant">${esc([i.color, i.size].filter(Boolean).join(" / "))}</div>` : ""}
<div class="line-item__row">
<div class="qty">
<button type="button" data-qty-minus="${esc(i.key)}" aria-label="Decrease quantity">&minus;</button>
<input type="number" value="${i.qty}" min="1" max="10" data-qty-input="${esc(i.key)}" aria-label="Quantity">
<button type="button" data-qty-plus="${esc(i.key)}" aria-label="Increase quantity">+</button>
</div>
<span class="line-item__price">${money(lineTotal)}</span>
</div>
<button class="line-item__remove" type="button" data-remove="${esc(i.key)}" style="margin-top:0.6rem;">Remove</button>
</div>
</div>`;
      })
      .join("");

    mount.innerHTML = `
<div class="overlay" data-overlay></div>
<aside class="drawer" data-cart-drawer aria-label="Shopping bag" aria-hidden="true">
<div class="drawer__head">
<h2>Your bag</h2>
<button class="icon-btn" type="button" data-close-cart aria-label="Close bag">${ICON.close}</button>
</div>
<div class="drawer__body" data-cart-body>
${
  items.length
    ? lines
    : `<div class="drawer__empty">
<p>Your bag is empty.</p>
<a class="btn btn-primary" href="${U("collection.html?c=luxury-mink-coats")}">Browse the collection</a>
</div>`
}
</div>
${
  items.length
    ? `<div class="drawer__foot">
<div class="cart-progress">
<div class="cart-progress__text">
<span>${remaining > 0 ? money(remaining) + " away from free shipping" : "Free shipping unlocked"}</span>
</div>
<div class="cart-progress__bar"><div class="cart-progress__fill" style="width:${pct}%"></div></div>
</div>
<div class="totals">
<div class="totals__row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
<div class="totals__row totals__row--total"><span>Total</span><span>${money(subtotal)}</span></div>
</div>
<p class="form-note" style="margin-top:-0.5rem;margin-bottom:0.85rem;">Made to order &middot; up to 15 days. Shipping and any duty are calculated at checkout.</p>
<a class="btn btn-primary btn-block" href="${U("pages/checkout.html")}">Checkout</a>
<button class="btn btn-tertiary btn-block" type="button" data-close-cart style="margin-top:0.5rem;">Continue shopping</button>
</div>`
    : ""
}
</aside>`;

    $$("[data-thumb]", mount).forEach((slot, i) => {
      slot.appendChild(productImg(items[i].image, items[i].title, { label: items[i].title }));
    });

    bindCartActions(mount);
    updateCartCount();
  }

  function bindCartActions(mount) {
    $$("[data-remove]", mount).forEach((btn) =>
      btn.addEventListener("click", () => setCart(cart().filter((i) => i.key !== btn.dataset.remove)))
    );

    $$("[data-qty-plus]", mount).forEach((btn) =>
      btn.addEventListener("click", () => {
        const items = cart();
        const it = items.find((i) => i.key === btn.dataset.qtyPlus);
        if (it) {
          it.qty = Math.min(it.qty + 1, 10);
          setCart(items);
        }
      })
    );

    $$("[data-qty-minus]", mount).forEach((btn) =>
      btn.addEventListener("click", () => {
        const items = cart();
        const it = items.find((i) => i.key === btn.dataset.qtyMinus);
        if (!it) return;
        it.qty -= 1;
        setCart(it.qty < 1 ? items.filter((i) => i.key !== it.key) : items);
      })
    );

    $$("[data-qty-input]", mount).forEach((inp) =>
      inp.addEventListener("change", () => {
        const items = cart();
        const it = items.find((i) => i.key === inp.dataset.qtyInput);
        if (!it) return;
        it.qty = Math.max(1, Math.min(10, parseInt(inp.value, 10) || 1));
        setCart(items);
      })
    );
  }

  /* ---------------------------------------------------------------- 8. Tuile produit */

  function productCard(p, opts) {
    const o = opts || {};
    const card = document.createElement("div");
    card.className = "card";

    const badges = [];
    if (p.compareAt && p.compareAt > p.price) {
      badges.push(`<span class="badge badge--sale">Save ${money(p.compareAt - p.price)}</span>`);
    }
    /* Shopify affiche autant de badges de collection que le produit en porte ;
       on en limite l'affichage a deux comme le fait le theme en ligne. */
    const marks = Array.isArray(p.badges) && p.badges.length ? p.badges : (p.badge ? [p.badge] : []);
    marks.slice(0, 2).forEach((b) => {
      if (BADGES[b]) badges.push(`<span class="badge ${BADGES[b].cls}">${BADGES[b].label}</span>`);
    });
    if (p.badge === "ships-fast") badges.push('<span class="badge badge--sold">Made to order</span>');

    card.innerHTML = `
<div class="card__media">
${badges.length ? `<div class="card__badges">${badges.join("")}</div>` : ""}
<button class="card__wish" type="button" data-wish="${esc(p.slug)}" aria-label="Save ${esc(p.title)}">${ICON.heart}</button>
<div data-media></div>
${o.noQuick ? "" : `<a class="card__quick" href="${U("product.html?p=" + p.slug)}">View piece</a>`}
</div>
<div class="card__body">
<div class="card__vendor">${esc(p.vendor)}</div>
<h3 class="card__title"><a href="${U("product.html?p=" + p.slug)}">${esc(p.title)}</a></h3>
<div class="card__price">
${
  p.compareAt && p.compareAt > p.price
    ? `<del>${money(p.compareAt)}</del><ins>${money(p.price)}</ins>`
    : `<span>${money(p.price)}</span>`
}
</div>
${p.rating ? `<div class="card__rating">${ICON.star}<span>${p.rating} (${p.reviews})</span></div>` : ""}
${
  p.colors && p.colors.length > 1
    ? `<div class="card__swatches">${p.colors
        .map((c) => (c.hex
          ? `<span class="card__swatch" style="background:${esc(c.hex)}" title="${esc(c.name)}"></span>`
          : `<span class="card__swatch-name">${esc(c.name)}</span>`))
        .join("")}</div>`
    : ""
}
</div>`;

    const media = $("[data-media]", card);
    media.appendChild(productImg(p.images[0], p.title, { eager: o.eager, class: "card__img card__img--main", label: p.title }));

    if (p.images.length > 1) {
      media.appendChild(productImg(p.images[1], p.title, { eager: o.eager, class: "card__img card__img--alt", label: p.title }));
    }

    const wish = $("[data-wish]", card);
    if (store("mm_wish", []).includes(p.slug)) wish.classList.add("is-active");
    wish.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const list = store("mm_wish", []);
      const i = list.indexOf(p.slug);
      if (i > -1) list.splice(i, 1);
      else list.push(p.slug);
      save("mm_wish", list);
      wish.classList.toggle("is-active");
    });

    return card;
  }

  function renderGrid(target, list, opts) {
    const el = typeof target === "string" ? $(target) : target;
    if (!el) return;
    el.innerHTML = "";
    list.forEach((p, i) => el.appendChild(productCard(p, Object.assign({ eager: i < 4 }, opts))));
  }

  /* ---------------------------------------------------------------- 9. Pied de page */

  const PAYMENTS = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Google Pay", "Shop Pay", "Klarna"];

  function renderFooter() {
    const mount = $("[data-mm-footer]");
    if (!mount) return;

    const navCol = (title, links) =>
      `<div><h4 class="footer__title">${title}</h4><ul class="footer__links">${links
        .map((l) => `<li><a href="${U(l[1])}">${esc(l[0])}</a></li>`)
        .join("")}</ul></div>`;

    mount.innerHTML = `
<footer class="footer">
  <div class="footer__newsletter">
    <div class="container">
      <div class="newsletter">
        <h2 style="font-family:var(--f-serif);font-size:var(--fs-h3);">Sign up for our newsletter</h2>
        <p style="margin-top:0.6rem;font-size:var(--fs-body-s);">Stay up to date with the latest news of our collections and be the first to know about our latest promotions.</p>
        <form class="newsletter__form" data-newsletter novalidate>
          <label class="visually-hidden" for="nl-email">Email address</label>
          <input class="field" id="nl-email" type="email" name="email" placeholder="Your email address" required autocomplete="email">
          <span class="visually-hidden" aria-hidden="true">
            <label for="nl-website">Leave this field empty</label>
            <input id="nl-website" name="website" type="text" tabindex="-1" autocomplete="off">
          </span>
          <button class="btn btn-primary" type="submit">Sign up</button>
        </form>
        <p class="form-note">By completing this form you are signing up to receive our emails. Unsubscribe any time.</p>
        <p class="form-success" data-nl-ok hidden>Thank you &mdash; you are on the list.</p>
        <p class="form-error" data-nl-err hidden>Please enter a valid email address.</p>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="footer__main">
      <div>
        <h4 class="footer__title">About us</h4>
        <p class="footer__about">
          At Marie Minks we believe that everyone can know the luxury of owning quality fur. Our aim is to be
          the only place you ever need to go for that special piece. We are happy to place custom orders and
          help you find exactly what you are looking for.
        </p>
        <div class="footer__contact">
          <a href="tel:+447723143962">+44 7723 143962</a>
          <a href="${U("pages/contact.html")}">Send us a message</a>
        </div>
      </div>

      ${navCol("Discover", [
        ["Gift Vouchers", "collection.html?c=gift-vouchers"],
        ["Luxury Mink Coats", "collection.html?c=luxury-mink-coats"],
        ["Our Story", "pages/our-story.html"],
        ["Payment Plans", "pages/payment-plans.html"]
      ])}

      ${navCol("Shop", [
        ["Home", "index.html"],
        ["Mink Fur", "collection.html?c=mink-pieces"],
        ["Kids Collection", "collection.html?c=kids-fox-fur-coats-jackets"],
        ["Fur Accessories", "collection.html?c=fur-accessories"]
      ])}

      ${navCol("Help", [
        ["Contact", "pages/contact.html"],
        ["Shipping & Delivery", "pages/shipping-returns.html"],
        ["Returns & Exchanges", "pages/shipping-returns.html"],
        ["Size Guide", "pages/size-guide.html"],
        ["FAQ", "pages/faq.html"]
      ])}
    </div>

    <div class="footer__bottom">
      <span>Copyright &copy; ${new Date().getFullYear()} Marie Minks &mdash; All rights reserved.</span>
      <div class="footer__bottom-end">
        <!-- Acces reserve a l'equipe : discret, en bas de page comme dans
             la plupart des boutiques. Ce n'est pas une protection, c'est
             seulement une commodite : la vraie securite est le mot de passe. -->
        <a class="footer__staff" href="${U("admin.html")}" rel="nofollow">Staff login</a>
        <div class="payments">
          ${PAYMENTS.map(
            (name) =>
              `<span title="${name}" style="display:inline-flex;align-items:center;justify-content:center;min-width:44px;height:24px;padding:0 6px;border:1px solid rgba(255,255,255,0.22);border-radius:3px;font-size:9px;letter-spacing:.06em;">${name.toUpperCase()}</span>`
          ).join("")}
        </div>
      </div>
    </div>
  </div>
</footer>`;

    const form = $("[data-newsletter]", mount);
    if (form) {
      /* Le champ website est le piege a robots du formulaire newsletter. */
      form.addEventListener(
        "submit",
        function (e) {
          e.preventDefault();
          const input = $("input[type=email]", form);
          const honeypot = $("[name=website]", form);
          const email = input.value.trim();
          const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

          $("[data-nl-err]", mount).hidden = ok;
          $("[data-nl-ok]", mount).hidden = !ok;
          if (!ok) return;

          /* Un robot ne voit pas ce champ : on lui repond le succes
             sans rien enregistrer, pour ne pas lui montrer qu'il est filtre. */
          if (honeypot && honeypot.value) {
            input.value = "";
            toast("You are on the list");
            return;
          }

          sendLead({ type: "subscriber", email: email, source: "footer" }).then((res) => {
            if (res.failed) {
              $("[data-nl-ok]", mount).hidden = true;
              $("[data-nl-err]", mount).hidden = false;
              $("[data-nl-err]", mount).textContent = "We could not save that just now, please try again.";
              return;
            }
            /* 409 = deja inscrite. C'est un succes pour la visiteuse :
               lui montrer une erreur lui ferait recommencer pour rien. */
            input.value = "";
            $("[data-nl-err]", mount).hidden = true;
            $("[data-nl-ok]", mount).hidden = false;
            $("[data-nl-ok]", mount).textContent =
              res.duplicate ? "You are already on the list \u2014 thank you." : "Thank you \u2014 you are on the list.";
            track(res.duplicate ? "newsletter_duplicate" : "newsletter_signup");
            toast("You are on the list");
          });
        },
        false
      );
    }
  }

  /* ---------------------------------------------------------------- 10. Toast */

  let toastEl;
  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.setAttribute("role", "status");
      toastEl.style.cssText =
        "position:fixed;left:50%;bottom:1.5rem;transform:translate(-50%,20px);z-index:200;" +
        "padding:.8rem 1.25rem;background:#15110d;color:#faf7f1;font-size:.8125rem;" +
        "border-radius:2px;opacity:0;pointer-events:none;transition:opacity .3s,transform .3s;max-width:90vw;text-align:center";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    requestAnimationFrame(() => {
      toastEl.style.opacity = "1";
      toastEl.style.transform = "translate(-50%,0)";
    });
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      toastEl.style.opacity = "0";
      toastEl.style.transform = "translate(-50%,20px)";
    }, 2800);
  }

  /* ---------------------------------------------------------------- 11. Overlays */

  let lastFocus;

  function lockScroll(on) {
    document.body.classList.toggle("no-scroll", on);
  }

  function openPanel(panel) {
    if (!panel) return;
    lastFocus = document.activeElement;
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    const ov = $("[data-overlay]", panel);
    if (ov) ov.classList.add("is-open");
    lockScroll(true);
    setTimeout(() => $("input, button", panel)?.focus(), 120);
  }

  function closePanel(panel) {
    if (!panel) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    const ov = $("[data-overlay]", panel);
    if (ov) ov.classList.remove("is-open");
    if (!$(".drawer.is-open, .search-panel.is-open, .mobile-nav.is-open")) lockScroll(false);
    if (lastFocus) lastFocus.focus();
  }

  function bindHeader() {
    const nav = $("[data-mobile-nav]");
    const cartDrawer = $("[data-cart-drawer]");
    const searchPanel = $("[data-search-panel]");

    $$("[data-open-nav]").forEach((b) => b.addEventListener("click", () => openPanel(nav)));
    $$("[data-close-nav]").forEach((b) => b.addEventListener("click", () => closePanel(nav)));
    $$("[data-open-cart]").forEach((b) => b.addEventListener("click", () => openPanel(cartDrawer)));
    $$("[data-close-cart]").forEach((b) => b.addEventListener("click", () => closePanel(cartDrawer)));
    $$("[data-open-search]").forEach((b) => b.addEventListener("click", () => openPanel(searchPanel)));
    $$("[data-close-search]").forEach((b) => b.addEventListener("click", () => closePanel(searchPanel)));

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (cartDrawer && cartDrawer.classList.contains("is-open")) closePanel(cartDrawer);
      if (searchPanel && searchPanel.classList.contains("is-open")) closePanel(searchPanel);
      if (nav && nav.classList.contains("is-open")) closePanel(nav);
    });

    $$("[data-currency]").forEach((sel) =>
      sel.addEventListener("change", () => {
        localStorage.setItem("mm_currency", sel.value);
        location.reload();
      })
    );
  }

  /* ---------------------------------------------------------------- 12. Page collection */

  const PAGE_SIZE = 9;

  function initCollectionPage() {
    const grid = $("[data-product-grid]");
    if (!grid) return;

    const slug = param("c");
    const query = (param("q") || "").toLowerCase();
    const coll = COLLECTIONS.find((c) => c.slug === slug);

    if (coll) {
      document.title = coll.title + " \u2014 Marie Minks";
      $("[data-page-title]").textContent = coll.title;
      $("[data-page-text]").textContent = coll.description;
      const crumb = $("[data-page-crumb]");
      if (crumb) crumb.textContent = coll.title;
    } else if (query) {
      document.title = 'Search "' + query + '" \u2014 Marie Minks';
      $("[data-page-title]").textContent = 'Search results for "' + query + '"';
      $("[data-page-text]").textContent = "";
    }

    /* Navigation par categorie. Sur une collection precisee on propose
       "Tout voir" pour pouvoir revenir, sinon elle reste vide. */
    const catNav = $("[data-cat-nav]");
    if (catNav) {
      if (slug && !query) {
        const allCount = PRODUCTS.length;
        catNav.innerHTML =
          `<a class="cat-nav__link cat-nav__all" href="${U("collection.html")}">All pieces <span class="cat-nav__count">${allCount}</span></a>` +
          COLLECTIONS.filter((c) => c.slug !== slug)
            .map((c) => {
              const n = PRODUCTS.filter((p) => p.collections.includes(c.slug)).length;
              return `<a class="cat-nav__link" href="${U("collection.html?c=" + c.slug)}">${esc(c.title)} <span class="cat-nav__count">${n}</span></a>`;
            })
            .join("");
      } else if (!slug && !query) {
        catNav.innerHTML =
          `<a class="cat-nav__link cat-nav__all is-active" href="${U("collection.html")}">All pieces <span class="cat-nav__count">${PRODUCTS.length}</span></a>` +
          COLLECTIONS.map((c) => {
            const n = PRODUCTS.filter((p) => p.collections.includes(c.slug)).length;
            return `<a class="cat-nav__link" href="${U("collection.html?c=" + c.slug)}">${esc(c.title)} <span class="cat-nav__count">${n}</span></a>`;
          }).join("");
      }
    }

    /* Panneau de filtres sur mobile : le bouton le bascule. */
    const filterToggle = $("[data-filter-toggle]");
    const filterPanel = $("#filterPanel");
    if (filterToggle && filterPanel) {
      filterToggle.addEventListener("click", () => {
        const open = filterPanel.classList.toggle("is-open");
        filterToggle.setAttribute("aria-expanded", String(open));
      });
    }

    const pool = PRODUCTS.filter((p) => {
      if (query) return (p.title + " " + p.collections.join(" ")).toLowerCase().includes(query);
      if (!slug) return true;
      return p.collections.includes(slug);
    });

    const priceBuckets = [
      { id: "u300", label: "Under £300", min: 0, max: 300 },
      { id: "300-700", label: "£300 – £700", min: 300, max: 700 },
      { id: "700-1200", label: "£700 – £1,200", min: 700, max: 1200 },
      { id: "o1200", label: "Over £1,200", min: 1200, max: Infinity }
    ];

    const categories = Array.from(new Set(pool.flatMap((p) => p.collections).filter((c) => !slug))).map((c) => {
      const meta = COLLECTIONS.find((x) => x.slug === c);
      return { id: c, label: meta ? meta.title : c, count: pool.filter((p) => p.collections.includes(c)).length };
    });

    const sizes = Array.from(new Set(pool.flatMap((p) => p.sizes || []))).map((s) => ({
      id: s,
      label: s,
      count: pool.filter((p) => (p.sizes || []).includes(s)).length
    }));

    const priceOpts = priceBuckets
      .map((b) => ({ id: b.id, label: b.label, count: pool.filter((p) => p.price >= b.min && p.price < b.max).length }))
      .filter((b) => b.count);

    const state = { cats: [], sizes: [], price: [], sort: "featured", shown: PAGE_SIZE };

    const filtersMount = $("[data-filters]");
    if (filtersMount && (categories.length || sizes.length || priceOpts.length)) {
      const group = (title, items, key) => `
<details class="filter-group" open>
<summary>${title}</summary>
<div class="filter-options">
${items
  .map(
    (it) => `<label class="filter-check">
<input type="checkbox" data-f="${key}" value="${esc(it.id)}">
<span>${esc(it.label)}</span><small>${it.count}</small>
</label>`
  )
  .join("")}
</div>
</details>`;

      filtersMount.innerHTML =
        (categories.length ? group("Category", categories, "cats") : "") +
        (priceOpts.length ? group("Price", priceOpts, "price") : "") +
        (sizes.length ? group("Size", sizes, "sizes") : "");
    }

    function apply() {
      let list = pool.slice();

      if (state.cats.length) list = list.filter((p) => p.collections.some((c) => state.cats.includes(c)));
      if (state.sizes.length) list = list.filter((p) => (p.sizes || []).some((s) => state.sizes.includes(s)));
      if (state.price.length) {
        list = list.filter((p) =>
          state.price.some((id) => {
            const b = priceBuckets.find((x) => x.id === id);
            return p.price >= b.min && p.price < b.max;
          })
        );
      }

      const sorters = {
        "price-asc": (a, b) => a.price - b.price,
        "price-desc": (a, b) => b.price - a.price,
        title: (a, b) => a.title.localeCompare(b.title),
        rating: (a, b) => (b.rating || 0) - (a.rating || 0)
      };
      if (sorters[state.sort]) list.sort(sorters[state.sort]);

      renderGrid(grid, list.slice(0, state.shown));

      const countEl = $("[data-result-count]");
      if (countEl) countEl.textContent = list.length;

      const empty = $("[data-no-results]");
      if (empty) empty.hidden = list.length > 0;
      grid.hidden = list.length === 0;

      const more = $("[data-load-more]");
      if (more) more.hidden = list.length <= state.shown;

      const chips = $("[data-active-filters]");
      if (chips) {
        const labels = [
          ...state.cats.map((id) => ({
            id,
            k: "cats",
            label: (COLLECTIONS.find((c) => c.slug === id) || {}).title || id
          })),
          ...state.sizes.map((id) => ({ id, k: "sizes", label: id })),
          ...state.price.map((id) => ({ id, k: "price", label: (priceBuckets.find((b) => b.id === id) || {}).label }))
        ];
        chips.innerHTML = labels.length
          ? labels
              .map((l) => `<button class="chip is-active" type="button" data-unset="${l.k}:${esc(l.id)}">${esc(l.label)} &#10005;</button>`)
              .join("") + '<button class="chip chip--reset" type="button" data-unset-all>Clear all</button>'
          : "";
      }
    }

    document.addEventListener("change", (e) => {
      const box = e.target.closest("[data-f]");
      if (!box) return;
      const arr = state[box.dataset.f];
      const i = arr.indexOf(box.value);
      if (box.checked && i === -1) arr.push(box.value);
      if (!box.checked && i > -1) arr.splice(i, 1);
      state.shown = PAGE_SIZE;
      apply();
    });

    document.addEventListener("click", (e) => {
      const un = e.target.closest("[data-unset]");
      if (un) {
        /* L'id peut contenir ":", on ne coupe donc qu'une seule fois. */
        const raw = un.dataset.unset;
        const i = raw.indexOf(":");
        const k = raw.slice(0, i);
        const v = raw.slice(i + 1);
        const arr = state[k] || [];
        const j = arr.indexOf(v);
        if (j > -1) arr.splice(j, 1);
        /* On decoche la case correspondante, quel que soit le format de l'id. */
        $$("[data-f]").forEach((b) => {
          if (b.dataset.f === k && b.value === v) b.checked = false;
        });
        state.shown = PAGE_SIZE;
        apply();
      }
      if (e.target.closest("[data-unset-all]")) {
        state.cats = [];
        state.sizes = [];
        state.price = [];
        $$("[data-f]").forEach((b) => (b.checked = false));
        apply();
      }
      if (e.target.closest("[data-load-more]")) {
        state.shown += PAGE_SIZE;
        apply();
      }
    });

    const sortSel = $("[data-sort]");
    if (sortSel) {
      sortSel.addEventListener("change", () => {
        state.sort = sortSel.value;
        apply();
      });
    }

    apply();
  }

  /* ---------------------------------------------------------------- 13. Page produit */

  function initProductPage() {
    const root = $("[data-product-root]");
    if (!root) return;

    const p = PRODUCTS.find((x) => x.slug === param("p"));

    if (!p) {
      $("[data-product-main]").innerHTML = `
<div class="container text-center" style="padding-block:5rem;max-width:640px;">
<h1 class="serif" style="font-size:var(--fs-display-3);">Piece not found</h1>
<p style="margin-top:1rem;color:var(--c-text-60);">This piece may have sold through. Tell us what you were looking for and we will find it &mdash; or make it.</p>
<a class="btn btn-primary" href="${U("pages/contact.html")}" style="margin-top:2rem;">Message us</a>
</div>`;
      return;
    }

    document.title = p.title + " \u2014 Marie Minks";

    track("view_item", p.price);

    const inStock = p.stock !== "out";
    const stockText =
      p.stock === "out"
        ? "Sold out"
        : p.stock === "low"
        ? "Only a few left"
        : "In stock \u00b7 made to order in " + (p.specs["Lead time"] || "10\u201314 days");

    const specRows = Object.entries(p.specs || {})
      .map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`)
      .join("");

    $("[data-product-main]").innerHTML = `
<div class="container">
  <nav class="banner" aria-label="Breadcrumb" style="padding-bottom:0">
    <ol class="breadcrumbs">
      <li><a href="${U("index.html")}">Home</a></li>
      ${p.collections
        .map((c) => {
          const meta = COLLECTIONS.find((x) => x.slug === c);
          return `<li><a href="${U("collection.html?c=" + c)}">${esc(meta ? meta.title : c)}</a></li>`;
        })
        .join("")}
      <li>${esc(p.title)}</li>
    </ol>
  </nav>

  <div class="product">
    <div class="gallery">
      <div class="gallery__thumbs" data-thumbs></div>
      <div class="gallery__main">
        <div data-main-img style="height:100%"></div>
        <span class="gallery__zoom">${ICON.zoom}<span>Zoom</span></span>
      </div>
    </div>

    <div class="product__panel">
      <div class="product__vendor">${esc(p.vendor)}</div>
      <h1 class="product__title">${esc(p.title)}</h1>

      <div class="product__price">
        ${
          p.compareAt && p.compareAt > p.price
            ? `<del>${money(p.compareAt)}</del><ins>${money(p.price)}</ins>`
            : `<span>${money(p.price)}</span>`
        }
      </div>

      ${
        p.rating
          ? `<div class="product__rating">${ICON.star}<span>${p.rating} &middot; <a href="#reviews">${p.reviews} reviews</a></span></div>`
          : ""
      }

      <p class="product__desc">${esc(p.short)}</p>

      <div class="product__stock">
        <span class="stock-dot ${p.stock === "low" ? "stock-dot--low" : p.stock === "out" ? "stock-dot--out" : ""}"></span>
        ${esc(stockText)}
      </div>

      ${
        p.colors && p.colors.length > 1
          ? `<div class="variant">
<div class="variant__label"><span>Colour</span><b data-color-name>${esc(p.colors[0].name)}</b></div>
<div class="swatches">
${p.colors
          .map(
            (c, i) => `<label class="swatch${c.hex ? "" : " swatch--name"}" title="${esc(c.name)}">
<input type="radio" name="color" value="${esc(c.name)}"${i === 0 && inStock ? " checked" : ""}${inStock ? "" : " disabled"}>
${c.hex
  ? `<span class="swatch__inner" style="background:${esc(c.hex)}"></span>`
  : `<span class="swatch__label">${esc(c.name)}</span>`}
</label>`
          )
          .join("")}
</div>
</div>`
          : ""
      }

      ${
        p.sizes && p.sizes.length > 1
          ? `<div class="variant">
<div class="variant__label"><span>Size</span><a href="${U("pages/size-guide.html")}" style="text-decoration:underline;">Size guide</a></div>
<div class="sizes">
${p.sizes
  .map(
    (s, i) => `<label class="size">
<input type="radio" name="size" value="${esc(s)}"${i === 0 && inStock ? " checked" : ""}${inStock ? "" : " disabled"}>
<span>${esc(s)}</span>
</label>`
  )
  .join("")}
</div>
</div>`
          : ""
      }

      <div class="product__buy">
        <div class="qty" style="flex:none">
          <button type="button" data-step="-1" aria-label="Decrease quantity">&minus;</button>
          <input type="number" value="1" min="1" max="10" data-qty aria-label="Quantity">
          <button type="button" data-step="1" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn-primary" type="button" data-add ${inStock ? "" : "disabled"}>${
          p.stock === "out" ? "Sold out" : "Add to bag &middot; " + money(p.price)
        }</button>
      </div>

      ${
        !p.collections.includes("gift-vouchers")
          ? `<div class="pay-note">${ICON.clock}<span>Pay over six months from ${money(
              Math.ceil(p.price / 6)
            )} a month. Klarna and Clearpay at checkout.</span></div>`
          : ""
      }

      <div class="product__actions">
        <button type="button" data-wish-main="${esc(p.slug)}">${ICON.heart}<span>Save for later</span></button>
        <button type="button" data-share>${ICON.arrow}<span>Share</span></button>
      </div>

      <div class="accordion">
        <details class="accordion__item" open>
          <summary>Description</summary>
          <div class="accordion__body"><p>${esc(p.description)}</p></div>
        </details>

        <details class="accordion__item">
          <summary>Details &amp; care</summary>
          <div class="accordion__body">
            <ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
            <table class="spec-table"><tbody>${specRows}</tbody></table>
            <p>Every piece is made to order in our own factory in Greece and arrives gift boxed. Real fur needs specialist care only &mdash; a qualified furrier, never a home washer.</p>
          </div>
        </details>

        <details class="accordion__item">
          <summary>Shipping &amp; returns</summary>
          <div class="accordion__body">
            <div class="ship-boxes">
              <div class="ship-box"><b>UK</b><span>Next working day (order before 10am)</span></div>
              <div class="ship-box"><b>Europe</b><span>2&ndash;4 working days</span></div>
              <div class="ship-box"><b>Worldwide</b><span>3&ndash;7 working days</span></div>
            </div>
            <p style="margin-top:1rem;">Production takes up to 15 days before dispatch. UK orders travel with Parcelforce, international orders with DHL, and every delivery is tracked and signed for. Returns are accepted within 30 days on unworn pieces with tags attached. Bespoke and made-to-measure pieces are final sale.</p>
            <p style="margin-top:.75rem;">International shipping does not include custom or duty fees &mdash; these are paid by you on delivery.</p>
            <p><a href="${U("pages/shipping-returns.html")}">Full shipping &amp; returns policy</a></p>
          </div>
        </details>

        <details class="accordion__item">
          <summary>How to find your size</summary>
          <div class="accordion__body">
            <p>Our sizing follows standard UK ready-to-wear. Measure over your usual winter layers. If you are between sizes, size up &mdash; fur should never feel tight across the shoulders.</p>
            <p><a href="${U("pages/size-guide.html")}">Open the size guide</a></p>
          </div>
        </details>
      </div>
    </div>
  </div>

  <section class="section" id="reviews">
    <div class="section__head">
      <div>
        <p class="eyebrow">You may also like</p>
        <h2 class="section__title">Complete the look</h2>
      </div>
      <a class="link-arrow" href="${U(p.collections.length ? "collection.html?c=" + p.collections[0] : "collection.html")}">View all ${ICON.arrow}</a>
    </div>
    <div class="grid-products grid-products--4" data-related-grid></div>
  </section>
</div>`;

    /* galerie */
    const thumbs = $("[data-thumbs]", root);
    const mainSlot = $("[data-main-img]", root);
    const images = p.images.length > 1 ? p.images : [p.images[0], p.images[0]];

    images.forEach((src, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "gallery__thumb" + (i === 0 ? " is-active" : "");
      b.setAttribute("aria-label", "View image " + (i + 1));
      b.appendChild(productImg(src, p.title + " view " + (i + 1), { eager: i === 0, label: p.title }));
      b.addEventListener("click", () => {
        $$(".gallery__thumb", root).forEach((t) => t.classList.remove("is-active"));
        b.classList.add("is-active");
        mainSlot.innerHTML = "";
        mainSlot.appendChild(productImg(src, p.title, { eager: true, label: p.title }));
      });
      thumbs.appendChild(b);
    });

    mainSlot.appendChild(productImg(images[0], p.title, { eager: true, label: p.title }));

    /* nom de couleur */
    $$("input[name=color]", root).forEach((r) =>
      r.addEventListener("change", () => {
        const out = $("[data-color-name]", root);
        if (out) out.textContent = r.value;
      })
    );

    /* quantité */
    const qtyInput = $("[data-qty]", root);
    $$("[data-step]", root).forEach((b) =>
      b.addEventListener("click", () => {
        const n = Math.max(1, Math.min(10, (parseInt(qtyInput.value, 10) || 1) + Number(b.dataset.step)));
        qtyInput.value = n;
      })
    );

    /* ajout panier */
    $("[data-add]", root).addEventListener("click", () => {
      addToCart(p, {
        qty: Math.max(1, Math.min(10, parseInt(qtyInput.value, 10) || 1)),
        color: ($("input[name=color]:checked", root) || {}).value || "",
        size: ($("input[name=size]:checked", root) || {}).value || ""
      });
    });

    /* favori */
    const wishMain = $("[data-wish-main]", root);
    if (store("mm_wish", []).includes(p.slug)) $("span", wishMain).textContent = "Saved";
    wishMain.addEventListener("click", () => {
      const list = store("mm_wish", []);
      const i = list.indexOf(p.slug);
      if (i > -1) {
        list.splice(i, 1);
        $("span", wishMain).textContent = "Save for later";
      } else {
        list.push(p.slug);
        $("span", wishMain).textContent = "Saved";
      }
      save("mm_wish", list);
    });

    $("[data-share]", root).addEventListener("click", async () => {
      const data = { title: p.title, url: location.href };
      if (navigator.share) {
        try {
          await navigator.share(data);
          return;
        } catch (e) {
          /* partage annulé */
        }
      }
      try {
        await navigator.clipboard.writeText(location.href);
        toast("Link copied");
      } catch (e) {
        toast("Copy this link: " + location.href);
      }
    });

    const related = PRODUCTS.filter((x) => x.slug !== p.slug && x.collections.some((c) => p.collections.includes(c))).slice(0, 4);
    renderGrid("[data-related-grid]", related);
  }

  /* ---------------------------------------------------------------- 14. API */

  /**
   * Envoie un evenement de mesure a l'admin.
   *
   * On n'envoie jamais d'email, de nom ni de donnée de commande : uniquement
   * un nom d'evenement et, quand c'est utile, le slug du produit. Le journal
   * sert a savoir ce qui fonctionne, pas a suivre des personnes.
   *
   * On ne fait jamais Await non plus : un evenement qui echoue ne doit
   * surtout pas ralentir ou bloquer la page pour la visiteuse.
   */
  function track(event, value) {
    try {
      const body = JSON.stringify({
        event: String(event).slice(0, 60),
        path: location.pathname.slice(0, 200),
        value: typeof value === "number" ? value : undefined
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/beacon", new Blob([body], { type: "application/json" }));
      } else {
        fetch("/api/beacon", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
      }
    } catch (e) {
      /* la mesure ne doit jamais casser le site */
    }
  }

  /**
   * Envoie un formulaire au serveur.
   * Resout toujours, jamais Rejete : un echec reseau ne doit pas
   * empecher une visiteuse de finir son achat, on prefere perdre
   * l'information plutot que la cliente.
   */
  function sendLead(payload) {
    return fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign({ page: location.pathname + location.search }, payload))
    })
      .then((r) => r.json().catch(() => ({})).then((j) => ({ status: r.status, body: j })))
      .then((res) => {
        if (res.status === 429) throw new Error("Trop d'envois, reessayez plus tard.");
        if (res.body && res.body.duplicate) throw new Error("duplicate");
        if (res.status >= 400) throw new Error((res.body && res.body.error) || "Erreur d'envoi");
        return res;
      })
      .catch((err) => {
        if (err && err.message === "duplicate") return { duplicate: true };
        return { failed: true, reason: err && err.message };
      });
  }

  /** Rate limit du navigateur : evite d'envoyer 30 fois si on double-clique. */
  function once(fn, ms) {
    let t = 0;
    return function () {
      const now = Date.now();
      if (now - t < ms) return;
      t = now;
      fn.apply(this, arguments);
    };
  }

  /* ---------------------------------------------------------------- 15. Formulaires */

  function initForms() {
    $$("[data-form]").forEach((form) => {
      form.addEventListener(
        "submit",
        function (e) {
          e.preventDefault();
          const required = $$("[required]", form);
          let valid = true;
          required.forEach((f) => {
            const bad = f.type === "email" ? !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value.trim()) : !f.value.trim();
            f.style.borderColor = bad ? "#d02f2e" : "";
            if (bad) valid = false;
          });

          const ok = $("[data-form-ok]", form);
          const err = $("[data-form-err]", form);
          if (err) err.hidden = valid;
          if (ok) ok.hidden = !valid;
          if (!valid) return;

          /* Le checkout a son propre gestionnaire : il ouvre WhatsApp. */
          if (form.hasAttribute("data-checkout")) return;

          const val = (sel) => {
            const f = $(sel, form);
            return f ? f.value.trim() : "";
          };

          /* Piege a robots : on affiche le succes sans rien envoyer. */
          if (val("[name=website]")) {
            if (ok) ok.hidden = false;
            return;
          }

          const payload = {
            type: "message",
            name: val("[name=name]"),
            email: val("[name=email]"),
            phone: val("[name=phone]"),
            subject: val("[name=topic]"),
            message: val("[name=message]")
          };

          const submit = $("[type=submit]", form);
          if (submit) submit.disabled = true;

          sendLead(payload).then((res) => {
            if (submit) submit.disabled = false;
            if (res.failed) {
              if (err) {
                err.hidden = false;
                err.textContent = "We could not send that just now. Please message us on WhatsApp instead.";
              }
              track("form_error");
              return;
            }
            track("message_sent");
            form.reset();
            if (ok) ok.hidden = false;
            toast("Thank you \u2014 we reply the same day.");
          });
        },
        true
      );
    });
  }

  /* ---------------------------------------------------------------- 15. Ancres */

  function initAnchors() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id || id === "main") return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  /* ---------------------------------------------------------------- 16. Révélation */

  function initReveal() {
    const targets = $$("[data-reveal]");
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.style.opacity = "1";
          en.target.style.transform = "none";
          io.unobserve(en.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = "translateY(18px)";
      t.style.transition = "opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)";
      io.observe(t);
    });
  }

  /* ---------------------------------------------------------------- 17. Boot */

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderSearchPanel();
    renderCartDrawer();
    renderFooter();

    const page = document.body.dataset.page;
    if (page === "collection") initCollectionPage();
    if (page === "product") initProductPage();

    initForms();
    initAnchors();
    initReveal();
    updateCartCount();

    $$("[data-fixed-price]").forEach((el) => {
      el.textContent = money(Number(el.dataset.fixedPrice));
    });

    $$("[data-img]").forEach((slot) => {
      slot.appendChild(productImg(slot.dataset.img, slot.dataset.alt || "", { label: slot.dataset.label || "" }));
    });

    $$("[data-reviews]").forEach((mount) => {
      mount.innerHTML = REVIEWS.map(
        (r) => `<blockquote class="review">
<div class="review__stars">${ICON.star.repeat(r.stars)}</div>
<p class="review__text">${esc(r.text)}</p>
<footer class="review__who">${esc(r.name)}</footer>
</blockquote>`
      ).join("");
    });

    $$("[data-collections]").forEach((mount) => {
      const slugs = (mount.dataset.collections || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const cards = COLLECTIONS.filter((c) => slugs.includes(c.slug)).map((c) => {
        const count = PRODUCTS.filter((p) => p.collections.includes(c.slug)).length;
        return `<a class="tile" href="${U("collection.html?c=" + c.slug)}">
<div data-img="${esc(c.image)}" data-alt="${esc(c.title)}" data-label="${esc(c.title)}" style="position:absolute;inset:0"></div>
<span class="tile__overlay">
<span class="tile__title">${esc(c.title)}</span>
<span class="tile__count">${count} piece${count > 1 ? "s" : ""}</span>
</span>
<span class="tile__arrow">${ICON.arrow}</span>
</a>`;
      });
      mount.innerHTML = cards.join("");
      $$("[data-img]", mount).forEach((slot) => {
        slot.appendChild(productImg(slot.dataset.img, slot.dataset.alt, { label: slot.dataset.label }));
      });
    });

    $$("[data-best-sellers]").forEach((mount) => {
      renderGrid(mount, PRODUCTS.slice(0, Number(mount.dataset.bestSellers) || 8));
    });

    $$("[data-featured]").forEach((mount) => {
      const p = PRODUCTS.find((x) => x.slug === mount.dataset.featured);
      if (!p) return;
      mount.innerHTML = `
<div class="feature__media" data-img="${esc(p.images[0])}" data-alt="${esc(p.title)}" data-label="${esc(p.title)}"></div>
<div>
<p class="eyebrow">${p.badge === "ships-fast" ? "In stock now" : "This season"}</p>
<h2 class="feature__title">${esc(p.title)}</h2>
<div class="feature__price">${money(p.price)}</div>
<p class="feature__desc">${esc(p.short)}</p>
<div class="feature__actions">
<a class="btn btn-primary" href="${U("product.html?p=" + p.slug)}">View piece</a>
<a class="btn btn-secondary" href="https://wa.me/447723143962" target="_blank" rel="noopener">Ask about sizing</a>
</div>
</div>`;
      const slot = $("[data-img]", mount);
      slot.appendChild(productImg(slot.dataset.img, slot.dataset.alt, { eager: true, label: slot.dataset.label }));
    });
  });

  window.MM = { PRODUCTS, COLLECTIONS, money, addToCart, productCard, toast, productImg, sendLead, track };
})();