/* ==========================================================================
   CATALOGUE DE PRODUITS — données de démonstration
   Remplace / ajoute tes vraies fiches produit ici.
   Chaque image attend un fichier dans /images/<slug>.jpg (ou .webp)
   Exemple : slug "valentina-mink-coat" -> images/valentina-mink-coat.jpg
   Si le fichier n'existe pas, un placeholder s'affiche automatiquement.
   ========================================================================== */

const COLLECTIONS = [
  {
    slug: "luxury-mink-coats",
    title: "Luxury Mink Coats",
    image: "collection-luxury-mink-coats",
    menu: "top",
    description:
      "Full-length coats in Saga Furs top lot mink, cut and sewn to order in our own factory. Each pelt is selected by hand before it ever reaches the cutting table."
  },
  {
    slug: "mink-pieces",
    title: "Mink Pieces",
    image: "collection-mink-pieces",
    menu: "top",
    description:
      "Pattern mink built from pieced pelts — the same technique the maison has used since the fifties. Warm, light and unmistakably luxury without the weight of a full coat."
  },
  {
    slug: "fox-fur-ladies",
    title: "Fox Fur Ladies",
    image: "collection-fox-fur-ladies",
    menu: "top",
    description:
      "Dyed fox in autumn golds, silvers and blacks. Exceptionally soft, feather light, and the easiest way into real fur."
  },
  {
    slug: "childrens-mink-coats-jackets",
    title: "Childrens Mink Coats & Jackets",
    image: "collection-childrens-mink",
    menu: "kids",
    description:
      "The same top lot pelts as the adult collection, sized for children. Built to be handed down, not thrown out."
  },
  {
    slug: "kids-fox-fur-coats-jackets",
    title: "Kids Fox Fur Coats & Jackets",
    image: "collection-kids-fox",
    menu: "kids",
    description:
      "Soft dyed fox for the little ones. Light enough for a school run, warm enough for the frost."
  },
  {
    slug: "fur-accessories",
    title: "Fur Accessories",
    image: "collection-fur-accessories",
    menu: "main",
    description:
      "Hats, stoles, collars and trims. The fastest way to own a piece of Marie Minks."
  },
  {
    slug: "gift-vouchers",
    title: "Gift Vouchers",
    image: "collection-gift-vouchers",
    menu: "main",
    description:
      "Delivered by email or in our signature red box. Redeemable against any piece, any size."
  }
];

/* --- Devises / Markets -------------------------------------------------- */
const CURRENCIES = [
  { code: "GBP", symbol: "£", rate: 1, label: "United Kingdom" },
  { code: "EUR", symbol: "€", rate: 1.16, label: "Eurozone" },
  { code: "USD", symbol: "$", rate: 1.27, label: "United States" },
  { code: "AUD", symbol: "$", rate: 1.93, label: "Australia" },
  { code: "CAD", symbol: "$", rate: 1.74, label: "Canada" },
  { code: "JPY", symbol: "¥", rate: 194, label: "Japan", decimals: 0 },
  { code: "CHF", symbol: "CHF", rate: 1.10, label: "Switzerland" },
  { code: "AED", symbol: "AED", rate: 4.67, label: "United Arab Emirates" },
  { code: "SEK", symbol: "kr", rate: 13.4, label: "Sweden" },
  { code: "NOK", symbol: "kr", rate: 14.2, label: "Norway" },
  { code: "DKK", symbol: "kr", rate: 8.9, label: "Denmark" },
  { code: "PLN", symbol: "zł", rate: 5.1, label: "Poland" },
  { code: "CZK", symbol: "Kč", rate: 30.5, label: "Czechia" },
  { code: "INR", symbol: "₹", rate: 106, label: "India" },
  { code: "SGD", symbol: "$", rate: 1.70, label: "Singapore" },
  { code: "HKD", symbol: "$", rate: 9.9, label: "Hong Kong" }
];

/* --- Produits ----------------------------------------------------------- */
const PRODUCTS =
[
  {
    "slug": "valentina-mink-coat",
    "title": "The Valentina Mink Coat",
    "vendor": "Marie Minks",
    "price": 1750,
    "compareAt": null,
    "badge": "ships-fast",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": 4.9,
    "reviews": 37,
    "images": [
      "valentina-mink-coat"
    ],
    "colors": [
      {
        "name": "Ivory",
        "hex": "#EFE6D8"
      },
      {
        "name": "Chocolate",
        "hex": "#4A342A"
      },
      {
        "name": "Jet Black",
        "hex": "#1C1A18"
      }
    ],
    "sizes": [
      "UK 6",
      "UK 8",
      "UK 10",
      "UK 12",
      "UK 14",
      "UK 16"
    ],
    "short": "Full-length, belted, and cut from a single Saga Furs top lot pelt run. Our signature winter coat.",
    "description": "The Valentina is the coat we are known for. A full-length silhouette in dense top lot mink, napped and finished by hand so the light moves across the surface rather than sitting flat on it. The belt is cut from matching fur so nothing breaks the line, and the whole piece is made to order — which is why it takes ten to fourteen days before it leaves Greece.",
    "features": [
      "Saga Furs Top Lot, 2025 auction winners",
      "Hand-napped for a moving, light-absorbing finish",
      "Fur-covered belt, cut from the matching pelt",
      "Silk-blend lining with a monogrammed interior",
      "Made to order in our own factory in Greece"
    ],
    "specs": {
      "Length": "110 cm (size 10)",
      "Fur type": "Mink, natural and dyed",
      "Lining": "100% silk",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "hooded-bomber-mink-fur-jacket-3",
    "title": "Bomber Jacket in Mink Pieces — White Fox Hood",
    "vendor": "Marie Minks",
    "price": 575,
    "compareAt": 690,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": 4.8,
    "reviews": 64,
    "images": [
      "hooded-bomber-mink-fur-jacket-3"
    ],
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#1C1A18"
      },
      {
        "name": "Ivory",
        "hex": "#EFE6D8"
      },
      {
        "name": "Warm Brown",
        "hex": "#5C4436"
      }
    ],
    "sizes": [
      "UK 6",
      "UK 8",
      "UK 10",
      "UK 12"
    ],
    "short": "A cropped bomber in pieced mink with a contrast white fox hood. Our most requested jacket.",
    "description": "Pattern mink pieced across the body for movement, finished with a hood in bleached white fox that lifts the whole silhouette off the shoulders. Ribbed cuffs, a two-way zip and a light enough body to wear from October straight through March.",
    "features": [
      "Pieced pattern mink body",
      "Bleached white fox hood and trim",
      "Two-way zip, ribbed cuffs and hem",
      "Quilted satin lining",
      "Made to order in Greece"
    ],
    "specs": {
      "Length": "62 cm",
      "Fur type": "Mink with white fox hood",
      "Lining": "Quilted satin",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "pearl-naomi-luxury-mink-fur-coat",
    "title": "Pearl — “Naomi” Luxury Mink Fur Coat",
    "vendor": "Marie Minks",
    "price": 1500,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": 5,
    "reviews": 18,
    "images": [
      "pearl-naomi-luxury-mink-fur-coat"
    ],
    "colors": [
      {
        "name": "Pearl",
        "hex": "#F3EDE2"
      },
      {
        "name": "Smoke",
        "hex": "#9A9186"
      },
      {
        "name": "Jet Black",
        "hex": "#1C1A18"
      }
    ],
    "sizes": [
      "UK 6",
      "UK 8",
      "UK 10",
      "UK 12",
      "UK 14"
    ],
    "short": "A pale, luminous full-length coat in pearl mink. The one that gets asked about most.",
    "description": "A very pale mink, almost silver in daylight, which is why we named it Pearl. Full length with a soft shawl collar and no hardware at all — the coat does the work on its own. Only the palest pelts from the lot are used for this one.",
    "features": [
      "Rare pale pearl mink, top lot only",
      "Shawl collar, no visible hardware",
      "Full length with a slight flare",
      "Silk lining, hand-finished seams",
      "Made to order in Greece"
    ],
    "specs": {
      "Length": "115 cm (size 10)",
      "Fur type": "Mink, pearl",
      "Lining": "100% silk",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "the-original-marie-minks-peplum-bomber",
    "title": "The Original Marie Minks Peplum Bomber™ — Pattern Mink",
    "vendor": "Marie Minks",
    "price": 675,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": 4.9,
    "reviews": 92,
    "images": [
      "the-original-marie-minks-peplum-bomber"
    ],
    "colors": [
      {
        "name": "Warm Brown",
        "hex": "#5C4436"
      },
      {
        "name": "Jet Black",
        "hex": "#1C1A18"
      }
    ],
    "sizes": [
      "UK 6",
      "UK 8",
      "UK 10",
      "UK 12",
      "UK 14"
    ],
    "short": "The piece that built the name. Pieced pattern mink, nipped waist, flared peplum.",
    "description": "The original. A fitted bomber in pieced mink with a nipped waist and a soft peplum that flares at the hip. This is the silhouette people ask for by name, and it is the reason the brand exists. Made to order, one at a time.",
    "features": [
      "Signature peplum silhouette",
      "Pieced pattern mink throughout",
      "Beaded stretch back for a close fit",
      "Cropped length with a full zip",
      "Made to order in Greece"
    ],
    "specs": {
      "Length": "58 cm",
      "Fur type": "Pattern mink",
      "Lining": "Satin",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "untitled-jun18-bridgey-blazer",
    "title": "The Bridgey Blazer",
    "vendor": "Marie Minks",
    "price": 280,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "low",
    "rating": 4.7,
    "reviews": 41,
    "images": [
      "untitled-jun18-bridgey-blazer"
    ],
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#1C1A18"
      },
      {
        "name": "Ivory",
        "hex": "#EFE6D8"
      }
    ],
    "sizes": [
      "UK 6",
      "UK 8",
      "UK 10",
      "UK 12",
      "UK 14"
    ],
    "short": "A tailored fur blazer with a notched lapel. Sharp enough to wear over a dress.",
    "description": "The piece people wore the most before they bought a coat. A proper tailored shape in pattern mink, notched lapel, single button. It reads as tailoring rather than costume, which is exactly the point.",
    "features": [
      "Tailored notched lapel",
      "Single-button closure",
      "Pattern mink body and facing",
      "Fully lined, with a clean interior seam",
      "Made to order in Greece"
    ],
    "specs": {
      "Length": "66 cm",
      "Fur type": "Pattern mink",
      "Lining": "100% satin",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "mm-signature-luxe-puffer-coat",
    "title": "MM Signature Luxe Puffer Coat",
    "vendor": "Marie Minks",
    "price": 350,
    "compareAt": null,
    "badge": "new",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": 4.6,
    "reviews": 12,
    "images": [
      "mm-signature-luxe-puffer-coat"
    ],
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#1C1A18"
      },
      {
        "name": "Cream",
        "hex": "#F1EADC"
      }
    ],
    "sizes": [
      "UK 6",
      "UK 8",
      "UK 10",
      "UK 12"
    ],
    "short": "Quilted fur puffer with real down fill. Warm enough for a hard winter, sharp enough for town.",
    "description": "A puffer built the way a down coat is built — baffles, real down fill, a storm hood — but in pattern mink throughout. It solves the one thing real fur traditionally does not: genuinely cold weather.",
    "features": [
      "Quilted pattern mink with genuine down fill",
      "Storm hood and ribbed storm cuffs",
      "Two-way zip with a leather pull",
      "Water-repellent finish",
      "Made to order in Greece"
    ],
    "specs": {
      "Length": "84 cm",
      "Fur type": "Pattern mink, down filled",
      "Lining": "Quilted satin",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "marie-minks-kids-teddy-bears",
    "title": "Marie Minks Kids Teddy Bears",
    "vendor": "Marie Minks",
    "price": 300,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": 5,
    "reviews": 26,
    "images": [
      "marie-minks-kids-teddy-bears"
    ],
    "colors": [
      {
        "name": "Natural",
        "hex": "#C8A882"
      },
      {
        "name": "Chestnut",
        "hex": "#6B4A34"
      },
      {
        "name": "Snow",
        "hex": "#F2EDE2"
      }
    ],
    "sizes": [
      "60 cm",
      "85 cm",
      "110 cm"
    ],
    "short": "Hand-finished bears in real mink offcuts. Made to order, so yours is genuinely one of one.",
    "description": "Cut from genuine mink offcuts left over from the coats, which means every bear is slightly different. Hand-finished, fully lined, and stitched in Greece. Many people order them as a set and keep one for the child and one for themselves.",
    "features": [
      "Genuine mink, made from coat offcuts",
      "Hand-finished with glass eyes",
      "Fully lined in soft plush",
      "Available in three sizes",
      "Each bear is unique"
    ],
    "specs": {
      "Sizes": "60 / 85 / 110 cm",
      "Fur type": "Mink",
      "Filling": "Soft plush and recycled fibre",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Spot clean only"
    }
  },
  {
    "slug": "luxury-girls-fox-fur-puffer-coat",
    "title": "Luxury Girls' Fox Fur Puffer Coat",
    "vendor": "Marie Minks",
    "price": 225,
    "compareAt": null,
    "badge": "ships-fast",
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": 4.8,
    "reviews": 33,
    "images": [
      "luxury-girls-fox-fur-puffer-coat"
    ],
    "colors": [
      {
        "name": "Blonde",
        "hex": "#D9C39C"
      },
      {
        "name": "Silver",
        "hex": "#C4C6C4"
      },
      {
        "name": "Black",
        "hex": "#1C1A18"
      }
    ],
    "sizes": [
      "Age 3-4",
      "Age 5-6",
      "Age 7-8",
      "Age 9-10"
    ],
    "short": "Dyed fox puffer for girls. Light, warm and cut to be handed down.",
    "description": "Real dyed fox, quilted into a puffer with a down fill so it actually holds heat. Cut generously so it layers over a coat and still fits at the end of a winter, which is the whole point of buying children's fur.",
    "features": [
      "Dyed fox, top lot",
      "Down-filled quilted construction",
      "Generous cut for layering",
      "Detachable hood",
      "Made to order in Greece"
    ],
    "specs": {
      "Fur type": "Dyed fox",
      "Lining": "Quilted satin",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "kids-reindeer-fur-parka",
    "title": "Kids Reindeer Fur Parka",
    "vendor": "Marie Minks",
    "price": 395,
    "compareAt": 450,
    "badge": "sale",
    "collections": [
      "kids-fox-fur-coats-jackets"
    ],
    "stock": "in",
    "rating": 4.8,
    "reviews": 29,
    "images": [
      "kids-reindeer-fur-parka"
    ],
    "colors": [
      {
        "name": "Natural",
        "hex": "#B98B5E"
      },
      {
        "name": "Dark Brown",
        "hex": "#4A342A"
      }
    ],
    "sizes": [
      "Age 3-4",
      "Age 5-6",
      "Age 7-8",
      "Age 9-10"
    ],
    "short": "Reindeer fur trim with a quilted body. The warmest thing we make for a child.",
    "description": "A proper winter parka: quilted body for insulation, real reindeer fur at the hood, cuffs and hem. Reindeer is naturally water resistant and far softer than it looks, which is why it is the trim we trust on a children's coat.",
    "features": [
      "Real reindeer fur trim — hood, cuffs, hem",
      "Quilted insulated body",
      "Snow-proof cuffs",
      "Internal name tape",
      "Made to order in Greece"
    ],
    "specs": {
      "Fur type": "Reindeer with quilted body",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "fox-stole-two-tone",
    "title": "Two-Tone Fox Stole",
    "vendor": "Marie Minks",
    "price": 210,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": 4.7,
    "reviews": 51,
    "images": [
      "fox-stole-two-tone"
    ],
    "colors": [
      {
        "name": "Blonde & White",
        "hex": "#E3D6BE"
      },
      {
        "name": "Black & Silver",
        "hex": "#B9B9B6"
      }
    ],
    "sizes": [
      "One size"
    ],
    "short": "The quickest route to real fur. Two-tone fox, 180 cm, works over a coat or on its own.",
    "description": "A long fox stole in two tones, finished with a hand-knotted fringe. It is the easiest first piece to buy and the easiest to wear — over a coat, over a dinner dress, over a coat again.",
    "features": [
      "Two-tone dyed fox, 180 cm length",
      "Hand-knotted fringe",
      "Satin backing with a neck strap",
      "One size, fits all",
      "Made to order in Greece"
    ],
    "specs": {
      "Length": "180 cm",
      "Fur type": "Dyed fox",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "mink-trim-aviator-hats",
    "title": "Mink Trim Aviator Hats",
    "vendor": "Marie Minks",
    "price": 145,
    "compareAt": null,
    "badge": "ships-fast",
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": 4.9,
    "reviews": 87,
    "images": [
      "mink-trim-aviator-hats"
    ],
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#1C1A18"
      },
      {
        "name": "Warm Brown",
        "hex": "#5C4436"
      },
      {
        "name": "Pearl",
        "hex": "#F3EDE2"
      }
    ],
    "sizes": [
      "S/M",
      "L/XL"
    ],
    "short": "Shearling aviator hat with a real mink trim. The most repurchased accessory we sell.",
    "description": "Merino shearling with a full mink trim around the face and a soft lining inside the band. Warm enough to be the only thing on your head in January, and it fits over a winter hat if you need the extra layer.",
    "features": [
      "Real mink trim",
      "Merino shearling body and lining",
      "Adjustable band with a buckle",
      "Two sizes",
      "Made to order in Greece"
    ],
    "specs": {
      "Fur type": "Mink trim, shearling",
      "Sizes": "S/M and L/XL",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "wide-belt-cape-mink",
    "title": "Wide Belt Cape in Mink",
    "vendor": "Marie Minks",
    "price": 890,
    "compareAt": null,
    "badge": "sustainable-materials",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": 4.9,
    "reviews": 22,
    "images": [
      "wide-belt-cape-mink"
    ],
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#1C1A18"
      },
      {
        "name": "Ivory",
        "hex": "#EFE6D8"
      }
    ],
    "sizes": [
      "One size"
    ],
    "short": "A full cape in pieced mink with a wide fur belt. Drapes properly, works over a gown.",
    "description": "A proper cape — wide enough at the hem to actually cover a gown — in pieced mink, closed with a wide matching belt. The most versatile formal piece we make, and the one most often bought to wear to a wedding.",
    "features": [
      "Full cape in pieced mink",
      "Wide matching fur belt",
      "Falls to mid-calf",
      "Lined throughout",
      "Made to order in Greece"
    ],
    "specs": {
      "Length": "90 cm from shoulder",
      "Fur type": "Pattern mink",
      "Origin": "Made in Greece",
      "Lead time": "10–14 days",
      "Care": "Specialist fur clean only"
    }
  },
  {
    "slug": "gift-voucher-250",
    "title": "£250 Gift Voucher",
    "vendor": "Marie Minks",
    "price": 250,
    "compareAt": null,
    "badge": null,
    "collections": [
      "gift-vouchers"
    ],
    "stock": "in",
    "rating": 5,
    "reviews": 15,
    "images": [
      "gift-voucher-250"
    ],
    "colors": [
      {
        "name": "Red Box",
        "hex": "#9E1B24"
      }
    ],
    "sizes": [
      "Digital",
      "Printed"
    ],
    "short": "Delivered by email instantly, or boxed in our signature red with a handwritten note.",
    "description": "Redeemable against any piece in the collection, any size, with no minimum and no expiry. Emailed within seconds, or sent in the signature red box with your message written out by hand.",
    "features": [
      "Redeemable against any piece and any size",
      "No minimum spend, no expiry",
      "Emailed instantly or sent in the signature red box",
      "Handwritten message card available",
      "Can be split across several orders"
    ],
    "specs": {
      "Value": "£250",
      "Delivery": "Instant by email, or boxed",
      "Origin": "Delivered worldwide",
      "Lead time": "Immediate",
      "Expiry": "No expiry date"
    }
  }
]
;

/* --- Témoignages -------------------------------------------------------- */
const REVIEWS = [
  {
    name: "Sabrina C.",
    stars: 5,
    text: "Your stuff is the best quality. I got a cape off you about 4 years ago and it's still like new — and a coat the other day."
  },
  {
    name: "Geraldine W.",
    stars: 5,
    text: "We bought our daughter's one 2 years ago this Christmas and it's still like new."
  },
  {
    name: "Natalie Ann M.",
    stars: 5,
    text: "You would definitely know they're real. I had cheap fur jackets — not like the one I just bought from you."
  },
  {
    name: "Patrick K.",
    stars: 5,
    text: "I bought last year and would definitely recommend you, and buy off you again."
  },
  {
    name: "Tommy & Helen McG.",
    stars: 5,
    text: "Very happy with my order when I received it. Definitely will be buying again."
  },
  {
    name: "Zoe H.",
    stars: 5,
    text: "Bought loads off you. Lovely seller."
  }
];

/* --- Barre d'annonce --------------------------------------------------- */
const ANNOUNCEMENTS = [
  "Made to order · 10–14 days production",
  "Price match on the same quality furs · <a href=\"tel:+447386156525\">WhatsApp +44 7386 156525</a>",
  "Every piece gift boxed · never a poly bag",
  "Pay over six months · Klarna & Clearpay at checkout"
];

/* --- Menu -------------------------------------------------------------- */
const NAV = [
  { label: "Mink Fur", href: "collection.html?c=mink-pieces", children: [
    { label: "Luxury Mink Coats", href: "collection.html?c=luxury-mink-coats" },
    { label: "Pattern Mink", href: "collection.html?c=mink-pieces" }
  ]},
  { label: "Kids Collection", href: "collection.html?c=kids-fox-fur-coats-jackets", children: [
    { label: "Kids Mink Coats & Jackets", href: "collection.html?c=childrens-mink-coats-jackets" },
    { label: "Kids Fox Fur Coats & Jackets", href: "collection.html?c=kids-fox-fur-coats-jackets" }
  ]},
  { label: "Fur Accessories", href: "collection.html?c=fur-accessories" },
  { label: "Gift Vouchers", href: "collection.html?c=gift-vouchers" },
  { label: "Payment Plans", href: "pages/payment-plans.html" },
  { label: "Contact", href: "pages/contact.html" }
];