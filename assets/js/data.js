/* ==========================================================================
   CATALOGUE — données importées du site Shopify en ligne (marieminks.co.uk).
   103 produits et 9 collections, avec leurs vraies photos dans /images/.
   Chaque produit attend /images/<slug>-1.jpg (ou .png) : c'est le fichier
   pour le 1er visuel. S'il manque, un placeholder s'affiche automatiquement.

   Les produits sont modifiables depuis /admin.html : l'écriture est enregistrée
   dans data/products.json, et ce bloc est alors régénéré automatiquement.
   ========================================================================== */

const COLLECTIONS = [
  {
    "slug": "luxury-mink-coats",
    "title": "Luxury Mink Coats",
    "image": "collection-luxury-mink-coats",
    "menu": "top",
    "description": "Mink Fur Coats, Jackets & Vests.\n\nA Mink Fur garments designed to make you look classy and sophisticated during the day, and luxurious and eye-catching during the night. \nA fashion essential, unique for its warmth, comfort, and softness, and made iconic from centuries of use, Mink Fur is the undefeated material for making luxury fur coats, beautiful parkers, and elegant jackets. \nOriginally favoured by European Royalty, mink fur has only grown in popularity over recent decades, with iconic movie stars like Elizabeth Taylor and Marilyn Monroe sporting iconic mink coats and stoles, and the material is still favoured by high end fashion companies today when in comes to women’s real fur coats."
  },
  {
    "slug": "mink-pieces",
    "title": "Mink Pieces",
    "image": "hooded-bomber-mink-fur-jacket-copy-1",
    "menu": "top",
    "description": ""
  },
  {
    "slug": "fox-fur-ladies",
    "title": "Fox Fur Ladies",
    "image": "collection-fox-fur-ladies",
    "menu": "top",
    "description": "Ladies Fox Fur Coats/Jackets"
  },
  {
    "slug": "childrens-mink-coats-jackets",
    "title": "Childrens Mink Coats/Jackets",
    "image": "collection-childrens-mink-coats-jackets",
    "menu": "kids",
    "description": ""
  },
  {
    "slug": "kids-fox-fur-coats-jackets",
    "title": "Kids Fox Fur Coats/Jackets",
    "image": "collection-kids-fox-fur-coats-jackets",
    "menu": "kids",
    "description": ""
  },
  {
    "slug": "new-baby-collection",
    "title": "New Baby Collection",
    "image": "collection-new-baby-collection",
    "menu": "kids",
    "description": ""
  },
  {
    "slug": "fur-accessories",
    "title": "Fur Accessories",
    "image": "collection-fur-accessories",
    "menu": "main",
    "description": ""
  },
  {
    "slug": "gift-vouchers",
    "title": "Gift Vouchers",
    "image": "250-gift-voucher-1",
    "menu": "main",
    "description": ""
  },
  {
    "slug": "embroidery-service-for-your-mink-coat",
    "title": "Embroidery Service For Your Mink Coat",
    "image": "collection-embroidery-service-for-your-mink-coat",
    "menu": "main",
    "description": ""
  }
]
;
;
;

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
    "slug": "hooded-bomber-mink-fur-jacket-silver-blue",
    "title": "Hooded Bomber Mink Fur Jacket -Silver Blue",
    "vendor": "Marie Minks",
    "price": 600,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [],
    "colors": [],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Real mink fur bomber jacket Zip closure.",
    "description": "Real mink fur bomber jacket\nZip closure.\nFront closure.\nWith hood.\nAvailable In Many Colours.\nMade From Mink Pieces\nLength 55 cm.\nHigh-quality craftsmanship.\nExceptional tailoring.\nMade in Greece.",
    "features": [
      "Real mink fur bomber jacket",
      "Zip closure.",
      "Front closure.",
      "With hood.",
      "Available In Many Colours.",
      "Made From Mink Pieces",
      "Length 55 cm.",
      "High-quality craftsmanship.",
      "Exceptional tailoring.",
      "Made in Greece."
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "fox-fur-shawl-longer-length",
    "title": "Fox Fur Shawl Longer Length",
    "vendor": "Marie Minks",
    "price": 450,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "fox-fur-shawl-longer-length-1"
    ],
    "colors": [
      {
        "name": "Cream"
      },
      {
        "name": "Custom Made"
      }
    ],
    "sizes": [],
    "short": "Real fox fur shawl Real fox fur shawl which can be made in almost all colours creating a charming and unique style.",
    "description": "Real fox fur shawl\nReal fox fur shawl which can be made in almost all colours creating a charming and unique style.\nCan be made in all colours",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "untitled-jun18_00-09-50",
    "title": "The Bridgey Blazer",
    "vendor": "Marie Minks",
    "price": 280,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "untitled-jun18_00-09-50-1",
      "untitled-jun18_00-09-50-2"
    ],
    "colors": [
      {
        "name": "Black"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Beige"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14"
    ],
    "short": "Elevate your wardrobe with timeless elegance.",
    "description": "Elevate your wardrobe with timeless elegance. Our Luxe Fox Blazer is crafted from premium wool with a flattering tailored silhouette, finished with a statement genuine fox fur collar and matching fox fur cuffs. Featuring luxurious gold button detailing and a sophisticated peplum shape, this piece combines classic style with modern glamour.\n \nDesigned to take you effortlessly from day to evening, it’s the perfect statement jacket for those who appreciate exceptional quality and luxurious craftsmanship.\n \n✨ Premium wool blend\n ✨ Genuine fox fur collar & cuffs\n ✨ Elegant double-breasted gold button fastening\n ✨ Flattering peplum silhouette\n ✨ Available in White, Beige, Navy and Black\n ✨ Sizes XS–XL\n ✨ Designed for timeless luxury\n \nA wardrobe investment you’ll reach for season after season. 🤍",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller",
      "exclusive"
    ]
  },
  {
    "slug": "untitled-aug15_13-48-44",
    "title": "Mink Gilet",
    "vendor": "Marie Minks",
    "price": 900,
    "compareAt": null,
    "badge": "exclusive",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "untitled-aug15_13-48-44-1",
      "untitled-aug15_13-48-44-2"
    ],
    "colors": [
      {
        "name": "Brown"
      },
      {
        "name": "Black"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Grey"
      },
      {
        "name": "Custom colour"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "The Mink Gilet is a full-skin garment tailored for women, available in all sizes and standard colors.",
    "description": "The Mink Gilet is a full-skin garment tailored for women, available in all sizes and standard colors. Measuring 28 inches in length, it offers consistent fit and coverage suitable for various body types. The natural mink skin provides durability and a refined texture.",
    "features": [],
    "specs": {},
    "badges": [
      "exclusive"
    ]
  },
  {
    "slug": "kingc-furs-kids-teddy-bears",
    "title": "Marie Minks Kids Teddy Bears",
    "vendor": "Marie Minks",
    "price": 300,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "fur-accessories",
      "new-baby-collection"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "kingc-furs-kids-teddy-bears-1",
      "kingc-furs-kids-teddy-bears-2",
      "kingc-furs-kids-teddy-bears-3",
      "kingc-furs-kids-teddy-bears-4",
      "kingc-furs-kids-teddy-bears-5"
    ],
    "colors": [
      {
        "name": "Cream"
      },
      {
        "name": "Grey"
      }
    ],
    "sizes": [],
    "short": "Marie Minks Luxury Fur Teddy Bear 🧸 Introducing our beautiful Marie Minks Luxury Fur Teddy Bear — a truly special piece designed to be treasured.",
    "description": "Marie Minks Luxury Fur Teddy Bear 🧸\nIntroducing our beautiful Marie Minks Luxury Fur Teddy Bear — a truly special piece designed to be treasured.\nMade from luxuriously soft real fur and finished with our signature red Marie Minks ribbon, each teddy has a beautifully plush, premium finish.\nAvailable in:\n 🤍 Snow White\n 🩶 Silver Grey\nPerfect as a luxury gift, keepsake or beautiful statement piece for the home.\n✨ Real Fur\n ✨ Signature Marie Minks Ribbon\n ✨ Super Soft & Luxurious\n ✨ Available in Two Colours\n ✨ Limited Availability\nPlease note: This is a luxury decorative item and is not intended to be used as a children’s toy.",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller",
      "exclusive"
    ]
  },
  {
    "slug": "hooded-bomber-mink-fur-jacket-copy",
    "title": "Hooded Bomber Mink Fur Jacket - Charcoal Grey",
    "vendor": "Marie Minks",
    "price": 600,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "hooded-bomber-mink-fur-jacket-copy-1",
      "hooded-bomber-mink-fur-jacket-copy-2",
      "hooded-bomber-mink-fur-jacket-copy-3"
    ],
    "colors": [],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Real mink fur bomber jacket Zip closure.",
    "description": "Real mink fur bomber jacket\nZip closure.\nFront closure.\nWith hood.\nAvailable In Many Colours.\nMade From Mink Pieces\nLength 55 cm.\nHigh-quality craftsmanship.\nExceptional tailoring.\nMade in Greece.",
    "features": [
      "Real mink fur bomber jacket",
      "Zip closure.",
      "Front closure.",
      "With hood.",
      "Available In Many Colours.",
      "Made From Mink Pieces",
      "Length 55 cm.",
      "High-quality craftsmanship.",
      "Exceptional tailoring.",
      "Made in Greece."
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "real-mink-fur-scrunchies",
    "title": "Real Mink Fur Scrunchies",
    "vendor": "Marie Minks",
    "price": 10,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "childrens-mink-coats-jackets",
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "real-mink-fur-scrunchies-1",
      "real-mink-fur-scrunchies-2",
      "real-mink-fur-scrunchies-3",
      "real-mink-fur-scrunchies-4",
      "real-mink-fur-scrunchies-5",
      "real-mink-fur-scrunchies-6",
      "real-mink-fur-scrunchies-7",
      "real-mink-fur-scrunchies-8",
      "real-mink-fur-scrunchies-9",
      "real-mink-fur-scrunchies-11",
      "real-mink-fur-scrunchies-12",
      "real-mink-fur-scrunchies-13",
      "real-mink-fur-scrunchies-14"
    ],
    "colors": [
      {
        "name": "Red"
      },
      {
        "name": "Fushia pink"
      },
      {
        "name": "Light blue"
      },
      {
        "name": "Royal blue"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Lilac"
      },
      {
        "name": "Black"
      },
      {
        "name": "Pastel Brown"
      },
      {
        "name": "Beige"
      },
      {
        "name": "White"
      },
      {
        "name": "Dark Brown"
      },
      {
        "name": "Two toned brown"
      },
      {
        "name": "Grey"
      },
      {
        "name": "Petrol blue"
      }
    ],
    "sizes": [],
    "short": "Add a little luxury to your everyday look with our Real Mink Fur Scrunchies 🤍 Made with genuine mink fur, these gorgeous fluffy scrunchies are available in a beautiful selection of colours — perfect",
    "description": "Add a little luxury to your everyday look with our Real Mink Fur Scrunchies 🤍\nMade with genuine mink fur, these gorgeous fluffy scrunchies are available in a beautiful selection of colours — perfect for matching with your favourite coat or outfit.\n✨ 100% Real Mink Fur\n ✨ Only £10 each\n ✨ Multiple colours available\n ✨ Soft, fluffy & luxurious\n ✨ Perfect for adults & children\n ✨ Gorgeous little gift idea\nChoose your favourite colour from the options above.\nPlease note: As real fur is a natural product, slight variations in colour and texture may occur, making each piece unique.",
    "features": [],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "luxury-girls-fox-fur-puffer-coat-preorder-will-take-2-weeks",
    "title": "Luxury Girls’ Fox Fur Puffer Coat (PREORDER WILL TAKE 2 WEEKS",
    "vendor": "Marie Minks",
    "price": 225,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "kids-fox-fur-coats-jackets",
      "new-baby-collection"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "luxury-girls-fox-fur-puffer-coat-preorder-will-take-2-weeks-1",
      "luxury-girls-fox-fur-puffer-coat-preorder-will-take-2-weeks-2"
    ],
    "colors": [
      {
        "name": "Navy"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Cream"
      }
    ],
    "sizes": [
      "1 years",
      "2 years",
      "3 years",
      "4 years",
      "5 years",
      "6 years",
      "12 Years",
      "7-8Y",
      "8-9 years",
      "9-10 years",
      "11-12 years"
    ],
    "short": "A lightweight padded puffer for girls, finished with a genuine detachable fox fur trim.",
    "description": "A lightweight padded puffer for girls, finished with a genuine detachable fox fur trim. The fur comes off, so it wears as an everyday coat on the school run and as something better when it needs to be.\nDetachable real fox fur trim\nLightweight padded outer\nAges 1 to 12\nNavy, beige or cream\nNew for this year, and made to order in around two weeks.\nCut and sewn in our own factory in Greece, not bought in. Made to order, so it is made for your child rather than pulled off a shelf.\nIf the colour you want is not in the list, leave a note at the cart and we will make it.\nKlarna and Clearpay are available at the checkout if you would rather spread it.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "Detachable real fox fur trim",
      "Lightweight padded outer",
      "Ages 1 to 12",
      "Navy, beige or cream"
    ],
    "specs": {},
    "badges": [
      "best-seller",
      "exclusive"
    ]
  },
  {
    "slug": "pearl-naomi-luxury-mink-fur-coat",
    "title": "PEARL “NAOMI” LUXURY MINK FUR COAT",
    "vendor": "Marie Minks",
    "price": 1500,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "pearl-naomi-luxury-mink-fur-coat-1",
      "pearl-naomi-luxury-mink-fur-coat-2",
      "pearl-naomi-luxury-mink-fur-coat-3"
    ],
    "colors": [],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14"
    ],
    "short": "DETAILS 100% Real Mink fur jacket Concealed side pockets.",
    "description": "DETAILS\n100% Real Mink fur jacket\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nLength 85cm.\nMade of female Saga mink fur pelts.\n \nAvailable in different sizes, colours and lengths.\nA Timeless Classic 🥰\n \nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is stranded and is available in all colours, lengths, sizes and with or without a hood.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink fur jacket",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Length 85cm.",
      "Made of female Saga mink fur pelts."
    ],
    "specs": {},
    "badges": [
      "best-seller"
    ]
  },
  {
    "slug": "kingc-signature-luxe-puffer-coat",
    "title": "Kingc Signature Luxe Puffer Coat",
    "vendor": "Marie Minks",
    "price": 350,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "fox-fur-ladies"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "kingc-signature-luxe-puffer-coat-1",
      "kingc-signature-luxe-puffer-coat-2",
      "kingc-signature-luxe-puffer-coat-3",
      "kingc-signature-luxe-puffer-coat-4",
      "kingc-signature-luxe-puffer-coat-5",
      "kingc-signature-luxe-puffer-coat-6",
      "kingc-signature-luxe-puffer-coat-7",
      "kingc-signature-luxe-puffer-coat-8",
      "kingc-signature-luxe-puffer-coat-9",
      "kingc-signature-luxe-puffer-coat-10",
      "kingc-signature-luxe-puffer-coat-11",
      "kingc-signature-luxe-puffer-coat-12",
      "kingc-signature-luxe-puffer-coat-13",
      "kingc-signature-luxe-puffer-coat-14"
    ],
    "colors": [
      {
        "name": "White"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Black"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14"
    ],
    "short": "Elevate your winter wardrobe with the Kingc Signature Luxe Puffer Coat – where luxury meets everyday elegance.",
    "description": "Elevate your winter wardrobe with the Kingc Signature Luxe Puffer Coat – where luxury meets everyday elegance.\nDesigned with a beautifully tailored silhouette, this statement piece features our signature waist-cinching belt, premium gold hardware, and an oversized detachable natural fur hood for the ultimate luxury finish. The flattering fitted shape creates a feminine look while still providing exceptional warmth and comfort.\nCrafted from high-quality materials and filled for superior insulation, this coat is designed to keep you warm through the coldest months without compromising on style.\n \nFeatures:\n • Oversized detachable natural fur hood\n • Signature Kingc gold buckle belt\n • Premium gold zip fastening and hardware\n • Flattering tailored fit\n • Side zip pockets\n • Lightweight yet exceptionally warm\n • Available in Black, White & Navy\n • Exclusive Marie Minks design\n \nStandard Sizes\n \nWhether you’re dressing for a day in the city or a winter event, the Kingc Signature Luxe Puffer Coat offers timeless elegance with a luxury finish",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller",
      "exclusive"
    ]
  },
  {
    "slug": "the-original-kingc-furs-peplum-bomber™-pattern-mink",
    "title": "The Original Marie Minks Peplum Bomber™ Pattern Mink",
    "vendor": "Marie Minks",
    "price": 675,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-1",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-2",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-3",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-4",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-5",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-6",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-7",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-8",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-9",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-10",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-11",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-12",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-13",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-14",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-15",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-16",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-17",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-18",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-19",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-20",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-21",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-22",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-23",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-24",
      "the-original-kingc-furs-peplum-bomber™-pattern-mink-25"
    ],
    "colors": [
      {
        "name": "Beige"
      },
      {
        "name": "Black"
      },
      {
        "name": "Grey"
      },
      {
        "name": "Custom Colour"
      },
      {
        "name": "ICE"
      },
      {
        "name": "Dark Brown"
      },
      {
        "name": "Pastel Brown"
      },
      {
        "name": "Medium brown"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "The same signature peplum bomber, made in pattern mink - our mink pieces worked into a repeating pattern rather than cut from full skins.",
    "description": "The same signature peplum bomber, made in pattern mink - our mink pieces worked into a repeating pattern rather than cut from full skins. Same peplum cut, same collar.\n100% real mink, pattern mink pieces\nPeplum cut, fitted at the waist\nStatement collar\nMade in a range of colours\nTrademarked and exclusive to Marie Minks. The full skin version is The Original Marie Minks Peplum Bomber.\nMade to order in our own factory, usually 10 to 14 days. If you want a colour or a length that is not listed, leave a note at the cart and we will make it.\nPayment plans available - pay in 3 instalments, or spread it over 6 months.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "100% real mink, pattern mink pieces",
      "Peplum cut, fitted at the waist",
      "Statement collar",
      "Made in a range of colours"
    ],
    "specs": {},
    "badges": [
      "best-seller",
      "exclusive"
    ]
  },
  {
    "slug": "the-original-kingc-furs-peplum-bomber™",
    "title": "The Original Marie Minks Peplum Bomber™",
    "vendor": "Marie Minks",
    "price": 895,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-original-kingc-furs-peplum-bomber™-1",
      "the-original-kingc-furs-peplum-bomber™-2",
      "the-original-kingc-furs-peplum-bomber™-3",
      "the-original-kingc-furs-peplum-bomber™-4",
      "the-original-kingc-furs-peplum-bomber™-5",
      "the-original-kingc-furs-peplum-bomber™-6",
      "the-original-kingc-furs-peplum-bomber™-7",
      "the-original-kingc-furs-peplum-bomber™-8",
      "the-original-kingc-furs-peplum-bomber™-9",
      "the-original-kingc-furs-peplum-bomber™-10",
      "the-original-kingc-furs-peplum-bomber™-11",
      "the-original-kingc-furs-peplum-bomber™-12",
      "the-original-kingc-furs-peplum-bomber™-13",
      "the-original-kingc-furs-peplum-bomber™-14",
      "the-original-kingc-furs-peplum-bomber™-15",
      "the-original-kingc-furs-peplum-bomber™-16"
    ],
    "colors": [
      {
        "name": "Beige"
      },
      {
        "name": "Sable"
      },
      {
        "name": "Brown"
      },
      {
        "name": "Black"
      },
      {
        "name": "Grey"
      },
      {
        "name": "Custom Colour"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Our signature peplum bomber, in full skin mink.",
    "description": "Our signature peplum bomber, in full skin mink. Tailored in at the waist and flared below it, so it holds a shape a straight bomber cannot. The collar is the piece that makes it.\n100% real mink, full skin\nPeplum cut, fitted at the waist\nStatement collar\nMade in a range of colours\nTrademarked and exclusive to Marie Minks. The same bomber is also made in pattern mink, which is the pieces version.\nMade to order in our own factory, usually 10 to 14 days. If you want a colour or a length that is not listed, leave a note at the cart and we will make it.\nPayment plans available - pay in 3 instalments, or spread it over 6 months.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "100% real mink, full skin",
      "Peplum cut, fitted at the waist",
      "Statement collar",
      "Made in a range of colours"
    ],
    "specs": {},
    "badges": [
      "best-seller",
      "exclusive"
    ]
  },
  {
    "slug": "fox-fur-sliders-1",
    "title": "Fox Fur Sliders",
    "vendor": "Marie Minks",
    "price": 50,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fox-fur-ladies",
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "fox-fur-sliders-1-1"
    ],
    "colors": [
      {
        "name": "Black"
      },
      {
        "name": "White"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Dusty Pink"
      }
    ],
    "sizes": [
      "3",
      "4",
      "5",
      "6"
    ],
    "short": "Luxury in every detail ✨ Perfect For The Summer Our luxury fur sliders are now available in: 🖤 Black 🤍 White 🤎 Cream 🩷 Blush Pink The perfect finishing touch to your Marie Minks collection.",
    "description": "Luxury in every detail ✨ Perfect For The Summer\nOur luxury fur sliders are now available in:\n🖤 Black\n🤍 White\n🤎 Cream\n🩷 Blush Pink\nThe perfect finishing touch to your Marie Minks collection.\nSoft • Elegant • Timeless\nwww.Marie Minks.co.uk",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "the-monaco-full-length-fox-coat-ivory-white",
    "title": "The Monaco Full Length Fox Coat – Ivory White",
    "vendor": "Marie Minks",
    "price": 1250,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "fox-fur-ladies"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-monaco-full-length-fox-coat-ivory-white-1",
      "the-monaco-full-length-fox-coat-ivory-white-2"
    ],
    "colors": [
      {
        "name": "White"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Black"
      },
      {
        "name": "Red"
      },
      {
        "name": "Light pink"
      },
      {
        "name": "Cerise"
      },
      {
        "name": "Light blue"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Introducing The Monaco — a breathtaking full length luxury fox fur coat designed for women who were never meant to blend in.",
    "description": "Introducing The Monaco — a breathtaking full length luxury fox fur coat designed for women who were never meant to blend in.\n \nCrafted with exceptional fullness and softness, this statement piece combines timeless elegance with modern glamour. Featuring a dramatic oversized collar, rich horizontal detailing, and a flawless full-length silhouette, The Monaco is designed to turn heads from every angle.\n \nMade for luxury lovers, winter events, designer fashion moments, and unforgettable entrances, this coat is more than outerwear — it’s an experience.\n \nWhether styled for evenings, luxury travel, special occasions, or elevated everyday wear, The Monaco brings effortless sophistication and undeniable presence.\n \n✨ Ultra full luxury fox fur\n ✨ Elegant full-length design\n ✨ Oversized statement collar\n ✨ Exceptional softness & craftsmanship\n ✨ Designed to stand out\n \nKingc Furs\n A Timeless Collection 🤍",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller"
    ]
  },
  {
    "slug": "girls-bomber-jacket-kids-pattern-mink",
    "title": "Girls Bomber Jacket -Kids Pattern Mink",
    "vendor": "Marie Minks",
    "price": 450,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "childrens-mink-coats-jackets",
      "kids-fox-fur-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "girls-bomber-jacket-kids-pattern-mink-1",
      "girls-bomber-jacket-kids-pattern-mink-2",
      "girls-bomber-jacket-kids-pattern-mink-3",
      "girls-bomber-jacket-kids-pattern-mink-4",
      "girls-bomber-jacket-kids-pattern-mink-5"
    ],
    "colors": [
      {
        "name": "Dark Brown"
      },
      {
        "name": "Custom Colour"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Grey"
      }
    ],
    "sizes": [
      "1-2Y",
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "6-7Y",
      "7-8Y",
      "8-9Y",
      "9-10Y",
      "11-12Y"
    ],
    "short": "Girls Mink Bomber Made From Pattern Female Mink With Fox Trimming On The Hood Those Are Good For Sizes Has A Drawstring At The Bottom Of The Coat To Pull I Detachable Hood We Can Make In Every Colour",
    "description": "Girls Mink Bomber \nMade From Pattern Female Mink With Fox Trimming On The Hood\nThose Are Good For Sizes Has A Drawstring At The Bottom Of The Coat To Pull I\nDetachable Hood\nWe Can Make In Every Colour\n Those Take 2-3 Weeks",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller"
    ]
  },
  {
    "slug": "white-mink-fox-fur-hooded-coat",
    "title": "White Mink & Fox Fur Hooded Coat",
    "vendor": "Marie Minks",
    "price": 950,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "white-mink-fox-fur-hooded-coat-1",
      "white-mink-fox-fur-hooded-coat-2",
      "white-mink-fox-fur-hooded-coat-3",
      "white-mink-fox-fur-hooded-coat-4",
      "white-mink-fox-fur-hooded-coat-5",
      "white-mink-fox-fur-hooded-coat-6",
      "white-mink-fox-fur-hooded-coat-7",
      "white-mink-fox-fur-hooded-coat-8",
      "white-mink-fox-fur-hooded-coat-9"
    ],
    "colors": [],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "An extraordinary statement in luxury outerwear, this exquisite coat is crafted from the finest white mink fur, adorned with sumptuous fox fur trim that frames the oversized hood, cuffs, and scalloped hem in breathtaking fashion.",
    "description": "An extraordinary statement in luxury outerwear, this exquisite coat is crafted from the finest white mink fur, adorned with sumptuous fox fur trim that frames the oversized hood, cuffs, and scalloped hem in breathtaking fashion. Designed for the woman who commands attention without effort, every detail speaks to uncompromising quality and timeless elegance.\nThe coat features a beautifully structured silhouette, cinched at the waist with a matching belt to accentuate the figure, while the generous hood envelops you in cloud-like warmth. The signature scalloped hem and voluminous fox fur cuffs elevate this piece beyond outerwear — it is wearable art.\nFeatures:\nPremium white mink fur body with tonal stripe detailing\nOversized fox fur hood — dramatic and deeply luxurious\nMatching fox fur cuffs for a refined, opulent finish\nScalloped fox fur hem — a signature couture touch\nMatching self-tie belt to define the waist\nFully lined interior for exceptional comfort\nAvailable in sizes 6–16\nA piece to be treasured for a lifetime. Each coat is a testament to the artistry and heritage of fine fur craftsmanship.",
    "features": [
      "Premium white mink fur body with tonal stripe detailing",
      "Oversized fox fur hood — dramatic and deeply luxurious",
      "Matching fox fur cuffs for a refined, opulent finish",
      "Scalloped fox fur hem — a signature couture touch",
      "Matching self-tie belt to define the waist",
      "Fully lined interior for exceptional comfort",
      "Available in sizes 6–16"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "ella-coat-black-copy",
    "title": "Ella Coat - Medium Brown",
    "vendor": "ladies mink Jacket",
    "price": 850,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "ella-coat-black-copy-1",
      "ella-coat-black-copy-2",
      "ella-coat-black-copy-3",
      "ella-coat-black-copy-4",
      "ella-coat-black-copy-5",
      "ella-coat-black-copy-6",
      "ella-coat-black-copy-7",
      "ella-coat-black-copy-8",
      "ella-coat-black-copy-9"
    ],
    "colors": [
      {
        "name": "Medium Brown"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Beautiful Mink Coat Made From Pattern Mink This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "Beautiful Mink Coat Made From Pattern Mink\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood.\nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option\nTHIS COAT IS INSTOCK AND READY TO POST",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller",
      "sale"
    ]
  },
  {
    "slug": "the-valentina-mink-coat",
    "title": "The Valentina Mink Coat",
    "vendor": "Marie Minks",
    "price": 750,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-valentina-mink-coat-1",
      "the-valentina-mink-coat-2",
      "the-valentina-mink-coat-3",
      "the-valentina-mink-coat-4",
      "the-valentina-mink-coat-5"
    ],
    "colors": [
      {
        "name": "Brown"
      },
      {
        "name": "Mahogany"
      },
      {
        "name": "Black"
      },
      {
        "name": "Custom Colour"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16",
      "Plus size"
    ],
    "short": "A true statement of elegance, The Valentina Mink Coat is crafted from the finest real mink to deliver timeless luxury and warmth.",
    "description": "A true statement of elegance, The Valentina Mink Coat is crafted from the finest real mink to deliver timeless luxury and warmth.\nDesigned with an oversized, fox collar and a beautifully belted waist, this piece creates a flattering, feminine silhouette while maintaining a soft and lightweight feel. The rich natural tones and full texture give it a refined, high-end finish that stands out effortlessly.\nWhether styled for everyday wear or special occasions, The Valentina Mink Coat brings sophistication and confidence to every look.\n100% real mink fur\nOversized statement collar\nAdjustable waist belt for a tailored fit\nSoft, warm, and lightweight\nTimeless investment piece\nCan be customised in all colours",
    "features": [
      "100% real mink fur",
      "Oversized statement collar",
      "Adjustable waist belt for a tailored fit",
      "Soft, warm, and lightweight",
      "Timeless investment piece"
    ],
    "specs": {},
    "badges": [
      "best-seller",
      "sale"
    ]
  },
  {
    "slug": "hooded-bomber-mink-fur-jacket-3",
    "title": "Bomber Jacket in Mink Pieces - White Fox Hood",
    "vendor": "Marie Minks",
    "price": 575,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "hooded-bomber-mink-fur-jacket-3-1",
      "hooded-bomber-mink-fur-jacket-3-2",
      "hooded-bomber-mink-fur-jacket-3-3",
      "hooded-bomber-mink-fur-jacket-3-4",
      "hooded-bomber-mink-fur-jacket-3-5",
      "hooded-bomber-mink-fur-jacket-3-6"
    ],
    "colors": [],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Made from mink pieces in a soft grey, with a full white fox hood that frames the whole face.",
    "description": "Made from mink pieces in a soft grey, with a full white fox hood that frames the whole face. It is the warmest of the bombers to wear and the most striking of them to look at.\nReal mink, made from mink pieces\nFull white fox hood\nZip front\nLength 55cm\nCut and sewn in our own factory in Greece\nCan be made in other colours - leave a note at the cart or message us before you order.",
    "features": [
      "Real mink, made from mink pieces",
      "Full white fox hood",
      "Zip front",
      "Length 55cm",
      "Cut and sewn in our own factory in Greece"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "the-pink-cross-signature-coat",
    "title": "The Pink Cross Signature Coat",
    "vendor": "Marie Minks",
    "price": 575,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-pink-cross-signature-coat-1",
      "the-pink-cross-signature-coat-2",
      "the-pink-cross-signature-coat-3",
      "the-pink-cross-signature-coat-4",
      "the-pink-cross-signature-coat-5",
      "the-pink-cross-signature-coat-6",
      "the-pink-cross-signature-coat-7"
    ],
    "colors": [],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Turn heads in every season with our Pink Cross Statement Coat — where bold colour meets luxury design.",
    "description": "Turn heads in every season with our Pink Cross Statement Coat — where bold colour meets luxury design. Featuring a striking black cross pattern set against vibrant pink, this piece is designed to stand out effortlessly.\nWhile crafted for warmth, its fresh, eye-catching colour palette makes it the perfect statement beyond winter — ideal for cooler spring days and crisp summer evenings.\nDesigned to be seen, worn, and remembered — this is not just a coat, it’s a statement.",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller"
    ]
  },
  {
    "slug": "the-gypsy-cob-luxury-fur-keepsake-limited-edition-pre-order-takes-2-weeks",
    "title": "“The Gypsy Cob” Luxury Fur Keepsake – Limited Edition - Pre-Order Takes 2 Weeks",
    "vendor": "Marie Minks",
    "price": 150,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-gypsy-cob-luxury-fur-keepsake-limited-edition-pre-order-takes-2-weeks-1",
      "the-gypsy-cob-luxury-fur-keepsake-limited-edition-pre-order-takes-2-weeks-2"
    ],
    "colors": [],
    "sizes": [
      "36cm X 36cm"
    ],
    "short": "Limited production piece.",
    "description": "Limited production piece.\n A piece inspired by heritage, tradition and luxury craftsmanship.\nOur Marie Minks Heritage Keepsake Horse is finished with genuine fur detailing and handcrafted with exceptional attention to detail in our workshop.\nThis is not a toy — it is a statement keepsake designed for nurseries, collectors and those who appreciate meaningful luxury pieces.\nExtremely limited availability.\nPre-order now. \nThis piece contains genuine fur detailing and is designed as a keepsake display item.\n \nMade With 100% Real Leather 100% Fox Fur",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller",
      "exclusive"
    ]
  },
  {
    "slug": "kingc-furs-luxury-fur-keepsake-limited-edition-pre-order-takes-2-weeks",
    "title": "Marie Minks Luxury Fur Keepsake – Limited Edition - Pre-Order Takes 2 Weeks",
    "vendor": "Marie Minks",
    "price": 100,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "kingc-furs-luxury-fur-keepsake-limited-edition-pre-order-takes-2-weeks-1",
      "kingc-furs-luxury-fur-keepsake-limited-edition-pre-order-takes-2-weeks-2"
    ],
    "colors": [],
    "sizes": [
      "Small",
      "Large"
    ],
    "short": "PREORDER ITEM – Dispatch expected within approximately 2–3 weeks.",
    "description": "PREORDER ITEM – Dispatch expected within approximately 2–3 weeks.\nLimited production piece.\n \nA piece inspired by heritage, tradition and luxury craftsmanship.\nOur Marie Minks Heritage Keepsake Horse is finished with genuine fur detailing and handcrafted with exceptional attention to detail in our workshop.\nThis is not a toy — it is a statement keepsake designed for nurseries, collectors and those who appreciate meaningful luxury pieces.\nExtremely limited availability.\nPre-order now. Those Take 2 Weeks \nThis piece contains genuine fur detailing and is designed as a keepsake display item.",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller",
      "exclusive"
    ]
  },
  {
    "slug": "the-regal-mink-coat-signature-kingc-furs-collection",
    "title": "The Regal Mink Coat – Signature Marie Minks Collection",
    "vendor": "Marie Minks",
    "price": 2350,
    "compareAt": null,
    "badge": null,
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-regal-mink-coat-signature-kingc-furs-collection-1",
      "the-regal-mink-coat-signature-kingc-furs-collection-2",
      "the-regal-mink-coat-signature-kingc-furs-collection-3",
      "the-regal-mink-coat-signature-kingc-furs-collection-4",
      "the-regal-mink-coat-signature-kingc-furs-collection-5",
      "the-regal-mink-coat-signature-kingc-furs-collection-6",
      "the-regal-mink-coat-signature-kingc-furs-collection-7",
      "the-regal-mink-coat-signature-kingc-furs-collection-8",
      "the-regal-mink-coat-signature-kingc-furs-collection-9",
      "the-regal-mink-coat-signature-kingc-furs-collection-10",
      "the-regal-mink-coat-signature-kingc-furs-collection-11",
      "the-regal-mink-coat-signature-kingc-furs-collection-12",
      "the-regal-mink-coat-signature-kingc-furs-collection-13",
      "the-regal-mink-coat-signature-kingc-furs-collection-14"
    ],
    "colors": [
      {
        "name": "Medium brown"
      },
      {
        "name": "Dark brown"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Introducing our latest statement mink coat — where timeless luxury meets modern elegance.",
    "description": "Introducing our latest statement mink coat — where timeless luxury meets modern elegance.\n \nCrafted from premium quality mink fur, this stunning piece is designed to turn heads while delivering exceptional warmth and softness. The flattering belted silhouette enhances shape while the full flowing cut creates that unmistakable luxury presence Marie Minks is known for.\n \nWhether styled casually with boots or dressed up for an event, this coat brings effortless glamour to any look.\n \n✔ Premium full mink fur\n✔ Ultra-soft, warm & breathable\n✔ Elegant belted fit for a flattering shape\n✔ Dramatic flowing back design\n✔ Available in multiple colours on request\n✔ Ready to ship\n \nThis is not just a coat — it’s an investment piece you’ll treasure for years.\n \nMessage us anytime for sizing, colour options, or personalised orders.",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "luxury-mink-scarf-new-to-kingc-furs",
    "title": "Luxury Mink Scarf – New to Marie Minks With Matching Headband",
    "vendor": "Marie Minks",
    "price": 200,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "luxury-mink-scarf-new-to-kingc-furs-1",
      "luxury-mink-scarf-new-to-kingc-furs-2",
      "luxury-mink-scarf-new-to-kingc-furs-3",
      "luxury-mink-scarf-new-to-kingc-furs-4"
    ],
    "colors": [
      {
        "name": "Pastel Brown"
      },
      {
        "name": "Mahogany"
      },
      {
        "name": "Black"
      },
      {
        "name": "Custom Colour"
      }
    ],
    "sizes": [],
    "short": "Luxury Mink Scarf – New to Marie Minks Introducing our newest Marie Minks luxury mink scarf — a refined statement accessory designed for timeless elegance, warmth and effortless sophistication.",
    "description": "Luxury Mink Scarf – New to Marie Minks\nIntroducing our newest Marie Minks luxury mink scarf — a refined statement accessory designed for timeless elegance, warmth and effortless sophistication. Crafted from ultra-soft genuine mink fur, this piece brings understated luxury to both everyday styling and special occasions.\n \nBeautifully lightweight yet exceptionally warm, it pairs perfectly with our signature Marie Minks coats or elevates even the simplest outfit with a polished, high-end finish.\n \nAvailable in additional colours on request.\nWe can create bespoke shades to complement your coat, wardrobe or personal style — simply contact us to discuss custom options.\n \nProduct Details:\n✔ Genuine luxury mink fur scarf\n✔ Soft, lightweight and naturally warm\n✔ Classic timeless design\n✔ Custom colour options available\n✔ Limited production pieces\n \nThis is true luxury — designed to last, never mass produced, and once sold out, availability isn’t guaranteed.",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller"
    ]
  },
  {
    "slug": "hooded-bomber-mink-fur-jacket-with-fox-cuffs-1",
    "title": "Hooded Bomber Mink Fur Jacket With Fox Cuffs",
    "vendor": "Marie Minks",
    "price": 850,
    "compareAt": null,
    "badge": null,
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "hooded-bomber-mink-fur-jacket-with-fox-cuffs-1-1",
      "hooded-bomber-mink-fur-jacket-with-fox-cuffs-1-2",
      "hooded-bomber-mink-fur-jacket-with-fox-cuffs-1-3",
      "hooded-bomber-mink-fur-jacket-with-fox-cuffs-1-4",
      "hooded-bomber-mink-fur-jacket-with-fox-cuffs-1-5",
      "hooded-bomber-mink-fur-jacket-with-fox-cuffs-1-6",
      "hooded-bomber-mink-fur-jacket-with-fox-cuffs-1-7",
      "hooded-bomber-mink-fur-jacket-with-fox-cuffs-1-8"
    ],
    "colors": [
      {
        "name": "Grey"
      },
      {
        "name": "Purple"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Red"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Blue"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Black"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "White"
      },
      {
        "name": "Custom Made"
      },
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Indulge in timeless luxury with this exquisite mink bomber jacket, handcrafted for elegance, warmth, and statement style.",
    "description": "Indulge in timeless luxury with this exquisite mink bomber jacket, handcrafted for elegance, warmth, and statement style. Designed with a beautifully sculpted, feminine fit, this piece features a full, plush fox fur collar and oversized fox fur cuffs, creating a striking silhouette that instantly elevates any outfit.\n \nMade from premium, high-grade mink fur, the jacket offers exceptional softness, natural shine, and superior insulation. The front zip fastening allows for effortless wear, while the cinched waist enhances shape and flatters the figure. Perfect for both day and evening wear, this jacket blends classic glamour with modern sophistication.\n \nA true investment piece for women who appreciate quality, craftsmanship, and unmistakable luxury.\n \n✨ Premium real mink fur\n✨ Full fox fur collar & cuffs\n✨ Flattering fitted design\n✨ Front zip fastening\n✨ Ultra-soft, warm & lightweight\n✨ Designed for luxury winter wear",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "the-royale-mink-coat",
    "title": "The Royale Mink Coat",
    "vendor": "Marie Minks",
    "price": 1550,
    "compareAt": null,
    "badge": null,
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-royale-mink-coat-1",
      "the-royale-mink-coat-2",
      "the-royale-mink-coat-3",
      "the-royale-mink-coat-4",
      "the-royale-mink-coat-5",
      "the-royale-mink-coat-6",
      "the-royale-mink-coat-7",
      "the-royale-mink-coat-8"
    ],
    "colors": [
      {
        "name": "Brown"
      },
      {
        "name": "Custom Colour"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "A statement of elegance and power.",
    "description": "A statement of elegance and power.\nThis luxury mink coat is handcrafted from premium mink, featuring a soft statement collar, beautifully sculpted flared shape, and a matching mink belt to define the waist.\nDesigned to be both feminine and flattering, this piece combines warmth, comfort, and unmistakable luxury. The flow of the skirt, rich colour, and expert craftsmanship make this coat a true investment piece.\n \n✔ Premium quality mink\n✔ Luxury soft collar\n✔ Flared, feminine silhouette\n✔ Matching mink belt\n✔ Handcrafted finish\n✔ Limited availability\n \nPart of our New Collection — First Drop.",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "light-blue-baby-suit-in-mink",
    "title": "Light Blue Baby Suit In Mink",
    "vendor": "Marie Minks",
    "price": 650,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "light-blue-baby-suit-in-mink-1",
      "light-blue-baby-suit-in-mink-2"
    ],
    "colors": [],
    "sizes": [
      "3 Months",
      "6 Months"
    ],
    "short": "Kids Baby Suit Made From Full Skin Female Mink",
    "description": "Kids Baby Suit Made From Full Skin Female Mink",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "naomi-kids-coat",
    "title": "Naomi Kids Coat",
    "vendor": "Marie Minks",
    "price": 1000,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "naomi-kids-coat-1",
      "naomi-kids-coat-2"
    ],
    "colors": [
      {
        "name": "Grey"
      },
      {
        "name": "Beige"
      },
      {
        "name": "White"
      },
      {
        "name": "Black"
      },
      {
        "name": "Dark Brown"
      },
      {
        "name": "Light Blue"
      },
      {
        "name": "Navy Blue"
      },
      {
        "name": "Red"
      }
    ],
    "sizes": [
      "1 Years",
      "2 Years",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "short": "The Naomi Kids Coat boasts a luxurious full skin female mink construction with a fox fur collar hood and cuffs.",
    "description": "The Naomi Kids Coat boasts a luxurious full skin female mink construction with a fox fur collar hood and cuffs. Stay warm and stylish all winter long with this high-quality, expertly crafted coat. Perfect for any fashion-forward individual looking for a timeless and elegant outerwear piece.",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "rossa-kids",
    "title": "Rossa Kids",
    "vendor": "Marie Minks",
    "price": 1000,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "rossa-kids-1",
      "rossa-kids-2"
    ],
    "colors": [],
    "sizes": [
      "1",
      "2"
    ],
    "short": "Experience unparalleled comfort and luxury with Rossa Kids.",
    "description": "Experience unparalleled comfort and luxury with Rossa Kids. Made from full skin female mink in a stylish grey rossa design, this product provides amazing softness and warmth for your child. Give your little one a touch of sophistication with Rossa Kids.",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "bomber-with-detachable-hood",
    "title": "Bomber with Detachable Hood",
    "vendor": "Marie Minks",
    "price": 650,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "bomber-with-detachable-hood-1",
      "bomber-with-detachable-hood-2",
      "bomber-with-detachable-hood-3"
    ],
    "colors": [],
    "sizes": [
      "10"
    ],
    "short": "Stay stylish and comfortable in any weather with this sapphire bomber jacket.",
    "description": "Stay stylish and comfortable in any weather with this sapphire bomber jacket. Featuring a detachable hood, you can easily adapt to changing temperature and keep your look fresh. Expertly crafted with high-quality materials, this jacket offers both functionality and fashion.",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "black-bomber",
    "title": "Black Bomber",
    "vendor": "Marie Minks",
    "price": 575,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [],
    "colors": [],
    "sizes": [
      "10"
    ],
    "short": "This black ladies bomber features a luxurious silver fox trimming on the hood, adding a touch of elegance and sophistication to your outerwear.",
    "description": "This black ladies bomber features a luxurious silver fox trimming on the hood, adding a touch of elegance and sophistication to your outerwear. The soft and warm fur will keep you cozy during the colder months, making this a stylish and practical jacket.",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "jersey-model",
    "title": "Jersey Model",
    "vendor": "Marie Minks",
    "price": 1250,
    "compareAt": null,
    "badge": null,
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "jersey-model-1"
    ],
    "colors": [
      {
        "name": "Pastel"
      }
    ],
    "sizes": [
      "8",
      "10"
    ],
    "short": "This expertly-crafted Jersey Model is created from full skin female mink and features a stylish swirl bottom for a length of 32 inches.",
    "description": "This expertly-crafted Jersey Model is created from full skin female mink and features a stylish swirl bottom for a length of 32 inches. The frilled collar adds a touch of elegance to this luxurious garment. Feel and look your best with this sophisticated design.",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "annabelle-style",
    "title": "Annabelle Style",
    "vendor": "Marie Minks",
    "price": 575,
    "compareAt": null,
    "badge": null,
    "collections": [],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "annabelle-style-1"
    ],
    "colors": [
      {
        "name": "Beige"
      },
      {
        "name": "Ice"
      }
    ],
    "sizes": [
      "8",
      "12"
    ],
    "short": "",
    "description": "",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "baby-suit-in-mink",
    "title": "Baby Suit In Mink",
    "vendor": "Marie Minks",
    "price": 500,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "baby-suit-in-mink-1"
    ],
    "colors": [],
    "sizes": [
      "3 Months",
      "6 Months"
    ],
    "short": "Kids Baby Suit Made From Full Skin Female Mink",
    "description": "Kids Baby Suit Made From Full Skin Female Mink",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "full-skin-female-mink-with-no-hood",
    "title": "Belissamo Coat",
    "vendor": "Marie Minks",
    "price": 1500,
    "compareAt": null,
    "badge": null,
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [],
    "colors": [],
    "sizes": [
      "10"
    ],
    "short": "Colour Sable Big Collar",
    "description": "Colour Sable\nBig Collar",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "girls-bomber-jacket-kids",
    "title": "Girls Bomber Jacket -Kids",
    "vendor": "Marie Minks",
    "price": 600,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets",
      "kids-fox-fur-coats-jackets",
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "girls-bomber-jacket-kids-1",
      "girls-bomber-jacket-kids-2"
    ],
    "colors": [
      {
        "name": "Dark Brown"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Black"
      },
      {
        "name": "Custom Colour"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Beige"
      },
      {
        "name": "White"
      }
    ],
    "sizes": [
      "1-2Y",
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "6-7Y",
      "7-8Y",
      "8-9Y",
      "9-10Y",
      "11-12Y"
    ],
    "short": "Girls Mink Bomber Made From Full Skin Female Mink With Fox Trimming On The Hood Those Are Good For Sizes Has A Drawstring At The Bottom Of The Coat To Pull In We Can Make In Every Colour Those Take 2-",
    "description": "Girls Mink Bomber \nMade From Full Skin Female Mink With Fox Trimming On The Hood\nThose Are Good For Sizes Has A Drawstring At The Bottom Of The Coat To Pull In\nWe Can Make In Every Colour\n Those Take 2-3 Weeks",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "fur-bunny-made-to-order",
    "title": "Fur Bunny (Made To Order)",
    "vendor": "Marie Minks",
    "price": 350,
    "compareAt": null,
    "badge": null,
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "fur-bunny-made-to-order-1",
      "fur-bunny-made-to-order-2",
      "fur-bunny-made-to-order-3"
    ],
    "colors": [
      {
        "name": "Brown"
      },
      {
        "name": "Red"
      },
      {
        "name": "White"
      },
      {
        "name": "Light blue"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Blue"
      },
      {
        "name": "Black"
      },
      {
        "name": "Custom Colour"
      }
    ],
    "sizes": [],
    "short": "Real Fur Bunny Made From Saga Fox Fur Those Take 3 Weeks Once Ordered",
    "description": "Real Fur Bunny Made From Saga Fox Fur\nThose Take 3 Weeks Once Ordered",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "mink-baby-s-snowsuits",
    "title": "Mink Baby’s Snowsuits",
    "vendor": "Marie Minks",
    "price": 600,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "new-baby-collection"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "mink-baby-s-snowsuits-1",
      "mink-baby-s-snowsuits-2",
      "mink-baby-s-snowsuits-3",
      "mink-baby-s-snowsuits-4",
      "mink-baby-s-snowsuits-5",
      "mink-baby-s-snowsuits-6",
      "mink-baby-s-snowsuits-7",
      "mink-baby-s-snowsuits-8",
      "mink-baby-s-snowsuits-9",
      "mink-baby-s-snowsuits-10"
    ],
    "colors": [
      {
        "name": "Light blue"
      },
      {
        "name": "Custom Colour"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Purple"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Red"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Green"
      },
      {
        "name": "Navy"
      }
    ],
    "sizes": [
      "1 years",
      "2 years",
      "3 years",
      "6 Months",
      "9 Months",
      "Newborn"
    ],
    "short": "Baby suit made from 100% full skin female mink, those are custom made we can do many colours and all sizes This Item Is Made To Order Can Take 5/7 Days",
    "description": "Baby suit made from 100% full skin female mink, those are custom made we can do many colours and all sizes \nThis Item Is Made To Order Can Take 5/7 Days",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller"
    ]
  },
  {
    "slug": "baby-s-snowsuits",
    "title": "Baby’s Snowsuits",
    "vendor": "Marie Minks",
    "price": 280,
    "compareAt": null,
    "badge": null,
    "collections": [
      "new-baby-collection"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "baby-s-snowsuits-1"
    ],
    "colors": [
      {
        "name": "Light blue"
      },
      {
        "name": "Custom Colour"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Purple"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Red"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Green"
      },
      {
        "name": "Navy"
      }
    ],
    "sizes": [
      "1 years",
      "2 years",
      "3 years",
      "4 years",
      "6 Months",
      "9 Months",
      "Newborn"
    ],
    "short": "A padded snowsuit for a baby, with a real fox fur hood trim and fox fur pom poms.",
    "description": "A padded snowsuit for a baby, with a real fox fur hood trim and fox fur pom poms. Newborn up to four years, in ten colours.\nReal fox fur hood trim and pom poms\nNewborn, 6 and 9 months, then 1 to 4 years\nTen colours, or any colour on request\nMade to order and usually ready in five to seven days, quicker than our coats.\nCut and sewn in our own factory in Greece, not bought in. Made to order, so it is made for your child rather than pulled off a shelf.\nIf the colour you want is not in the list, leave a note at the cart and we will make it.\nKlarna and Clearpay are available at the checkout if you would rather spread it.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "Real fox fur hood trim and pom poms",
      "Newborn, 6 and 9 months, then 1 to 4 years",
      "Ten colours, or any colour on request"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "baby-mink-blankets",
    "title": "Baby Mink Blankets",
    "vendor": "Marie Minks",
    "price": 450,
    "compareAt": null,
    "badge": null,
    "collections": [
      "new-baby-collection"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "baby-mink-blankets-1",
      "baby-mink-blankets-2",
      "baby-mink-blankets-3"
    ],
    "colors": [
      {
        "name": "Pink"
      },
      {
        "name": "Dark Brown"
      },
      {
        "name": "Light blue"
      },
      {
        "name": "Custom Colour"
      },
      {
        "name": "Purple"
      },
      {
        "name": "Grey"
      },
      {
        "name": "Pearl"
      }
    ],
    "sizes": [],
    "short": "Real Mink blanket Measurements: 80 x 80 cm.",
    "description": "Real Mink blanket \nMeasurements: 80 x 80 cm.\nMade in Europe using Saga Mink\nComposition 100% Mink Fur\nThose Can Be Made To Order In Different Colours and Sizes\nFor Custom Colours Please leave in notes",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "boys-bomber-jacket-kids",
    "title": "Boys Bomber Jacket -Kids",
    "vendor": "Marie Minks",
    "price": 600,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "childrens-mink-coats-jackets",
      "kids-fox-fur-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "boys-bomber-jacket-kids-1",
      "boys-bomber-jacket-kids-2",
      "boys-bomber-jacket-kids-3",
      "boys-bomber-jacket-kids-4",
      "boys-bomber-jacket-kids-5",
      "boys-bomber-jacket-kids-6"
    ],
    "colors": [
      {
        "name": "Dark Brown"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Black"
      },
      {
        "name": "Custom Colour"
      }
    ],
    "sizes": [
      "1-2Y",
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "6-7Y",
      "7-8Y",
      "8-9Y",
      "9-10Y"
    ],
    "short": "Boys Mink Bomber Made From Full Skin Female Mink With Fox Trimming On The Hood Those Are Good For Sizes Has A Drawstring At The Bottom Of The Coat To Pull In We Can Make In Every Colour",
    "description": "Boys Mink Bomber \nMade From Full Skin Female Mink With Fox Trimming On The Hood\nThose Are Good For Sizes Has A Drawstring At The Bottom Of The Coat To Pull In\nWe Can Make In Every Colour",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller"
    ]
  },
  {
    "slug": "real-mink-handbags",
    "title": "Mink Top Handle Bag",
    "vendor": "Marie Minks",
    "price": 200,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "real-mink-handbags-1",
      "real-mink-handbags-2",
      "real-mink-handbags-3",
      "real-mink-handbags-4",
      "real-mink-handbags-5",
      "real-mink-handbags-6"
    ],
    "colors": [
      {
        "name": "Black"
      },
      {
        "name": "Brown"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Light Blue"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Sapphire"
      },
      {
        "name": "Custom Colour (Leave In Notes)"
      }
    ],
    "sizes": [],
    "short": "A structured top handle bag in full skin female mink, with a rounded mink handle and a tan leather strap across the front finished with a gold clasp.",
    "description": "A structured top handle bag in full skin female mink, with a rounded mink handle and a tan leather strap across the front finished with a gold clasp.\nFull skin female mink\nReal leather strap and gold hardware\nRounded mink top handle\nMade in any colour to match your coat\nPictured in cream, black, grey and pale pink. It can be made in the same colour as any coat you own, so the two are a set.\nMade to order in our own factory, usually 10 to 14 days. If you want a colour or a length that is not listed, leave a note at the cart and we will make it.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "Full skin female mink",
      "Real leather strap and gold hardware",
      "Rounded mink top handle",
      "Made in any colour to match your coat"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "kids-rossa-style-copy",
    "title": "Kids Rossa Style",
    "vendor": "Marie Minks",
    "price": 1000,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "kids-rossa-style-copy-1",
      "kids-rossa-style-copy-2",
      "kids-rossa-style-copy-3"
    ],
    "colors": [
      {
        "name": "Gray"
      },
      {
        "name": "White"
      },
      {
        "name": "Red"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Custom Colour"
      }
    ],
    "sizes": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "short": "Made From Full Skin Female Mink We Can Make All Colours All Sizes We Also Can Add Initals Free Of Charge",
    "description": "Made From Full Skin Female Mink \nWe Can Make All Colours All Sizes\nWe Also Can Add Initals Free Of Charge",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "kids-mink-fur-headbands-with-bow",
    "title": "Kids Mink Fur Bow Headbands",
    "vendor": "Marie Minks",
    "price": 65,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "kids-mink-fur-headbands-with-bow-1",
      "kids-mink-fur-headbands-with-bow-2",
      "kids-mink-fur-headbands-with-bow-3",
      "kids-mink-fur-headbands-with-bow-4"
    ],
    "colors": [
      {
        "name": "Black"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "White"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Blue"
      },
      {
        "name": "Gray"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Green"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Red"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Custom Made"
      }
    ],
    "sizes": [],
    "short": "New and Exclusive Marie Minks Bow Headbands Our 100% mink fur headbands are the perfect finishing touch to any outfit.",
    "description": "New and Exclusive Marie Minks Bow Headbands\nOur 100% mink fur headbands are the perfect finishing touch to any outfit. They are timeless and never go out of fashion, making them a sustainable choice for a timeless accessory. Get your mink fur headband today for a luxurious and comfortable finishing touch! The absolute essential gift!\n \nFeatures:\nComfy inner lining\nThick and luxurious\nGenuine Ranch Raised mink fur , Soft And Silky\nDry clean and professional fur clean only\n One size fits all!\nHandmade item: Once you place your order, your selected piece will be made and shipped within 1-10 working days.",
    "features": [
      "Comfy inner lining",
      "Thick and luxurious",
      "Genuine Ranch Raised mink fur , Soft And Silky",
      "Dry clean and professional fur clean only"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "hooded-bomber-mink-fur-jacket-2",
    "title": "Bomber Jacket in Mink Pieces - Fox Trimmed Hood",
    "vendor": "Marie Minks",
    "price": 575,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "hooded-bomber-mink-fur-jacket-2-1",
      "hooded-bomber-mink-fur-jacket-2-2",
      "hooded-bomber-mink-fur-jacket-2-3",
      "hooded-bomber-mink-fur-jacket-2-4",
      "hooded-bomber-mink-fur-jacket-2-5",
      "hooded-bomber-mink-fur-jacket-2-6",
      "hooded-bomber-mink-fur-jacket-2-7",
      "hooded-bomber-mink-fur-jacket-2-8"
    ],
    "colors": [
      {
        "name": "Black"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "Dark Brown"
      },
      {
        "name": "Pastel with pastel fox"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Made from mink pieces rather than full skins, which is what brings the price down without changing how it wears.",
    "description": "Made from mink pieces rather than full skins, which is what brings the price down without changing how it wears. The hood is trimmed in fox. Shown here in brown with a tan fox trim; also made in black, pastel and dark brown.\nReal mink, made from mink pieces\nFox trimmed hood\nZip front\nLength 55cm\nCut and sewn in our own factory in Greece\nThese are in high demand, so allow 2 to 3 weeks from the order date for yours to be made and sent.",
    "features": [
      "Real mink, made from mink pieces",
      "Fox trimmed hood",
      "Zip front",
      "Length 55cm",
      "Cut and sewn in our own factory in Greece"
    ],
    "specs": {},
    "badges": [
      "best-seller",
      "sale"
    ]
  },
  {
    "slug": "hooded-bomber-mink-fur-jacket-1",
    "title": "Hooded Bomber Mink Jacket - Full Mink Hood",
    "vendor": "Marie Minks",
    "price": 850,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "hooded-bomber-mink-fur-jacket-1-1",
      "hooded-bomber-mink-fur-jacket-1-2"
    ],
    "colors": [
      {
        "name": "Grey"
      },
      {
        "name": "Purple"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Red"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Blue"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Black"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "White"
      },
      {
        "name": "Custom Made"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "The same short bomber shape, but the hood is mink all the way round rather than trimmed in fox.",
    "description": "The same short bomber shape, but the hood is mink all the way round rather than trimmed in fox. It is a quieter, more tailored look, and it takes more pelts to make - which is why it costs more than the fox-collared one.\n100% real mink, full skin\nMink hood, no fox\nZip front, side pockets\nLength 55cm\nCut and sewn in our own factory in Greece\nPelts certified by the European fur auctions. Can be made in any colour - leave a note at the cart or message us before you order.",
    "features": [
      "100% real mink, full skin",
      "Mink hood, no fox",
      "Zip front, side pockets",
      "Length 55cm",
      "Cut and sewn in our own factory in Greece"
    ],
    "specs": {},
    "badges": [
      "best-seller"
    ]
  },
  {
    "slug": "fox-fur-shawl",
    "title": "Fox Fur Shawl",
    "vendor": "Marie Minks",
    "price": 250,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "fox-fur-shawl-1",
      "fox-fur-shawl-2",
      "fox-fur-shawl-3",
      "fox-fur-shawl-4"
    ],
    "colors": [
      {
        "name": "Cream"
      },
      {
        "name": "Custom Made"
      }
    ],
    "sizes": [],
    "short": "Real fox fur shawl Real fox fur shawl which can be made in almost all colours creating a charming and unique style.",
    "description": "Real fox fur shawl\nReal fox fur shawl which can be made in almost all colours creating a charming and unique style.",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "fox-fur-headbands",
    "title": "Fox Fur Headbands",
    "vendor": "Marie Minks",
    "price": 60,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "fox-fur-headbands-1",
      "fox-fur-headbands-2"
    ],
    "colors": [],
    "sizes": [
      "Childs",
      "Adults"
    ],
    "short": "A stunning fox fur headband made with genuine fox fur.",
    "description": "A stunning fox fur headband made with genuine fox fur. Warm and soft and of supreme quality, adds style to any outfit in the town or country.\nFox Fur Headband in Black\nGenuine Fox fur\nWarm and Soft\nExpandable \nPlease Leave Colour In Notes When Ordering.\nThank You",
    "features": [
      "Fox Fur Headband in Black",
      "Genuine Fox fur",
      "Warm and Soft",
      "Expandable"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "new-style-2-in-1-fox-fur-crop-coat-pink",
    "title": "New Style 2 in 1 Fox Fur Crop Coat - Pink",
    "vendor": "Marie Minks",
    "price": 350,
    "compareAt": null,
    "badge": "exclusive",
    "collections": [
      "fox-fur-ladies"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "new-style-2-in-1-fox-fur-crop-coat-pink-1"
    ],
    "colors": [],
    "sizes": [
      "6/8",
      "8/10",
      "10/12",
      "12/14",
      "14/16"
    ],
    "short": "New Style Hooded 2 in 1 Fox Fur Coat, This Coat Has 5 Rows Of Real Fox Fur, Hood and Sleeves Is Detachable 100% Real Fox Fur Coat Can Be Customised To Any Colour Exclusive To Marie Minks",
    "description": "New Style Hooded 2 in 1 Fox Fur Coat, This Coat Has 5 Rows Of Real Fox Fur, Hood and Sleeves Is Detachable\n100% Real Fox Fur\nCoat Can Be Customised To Any Colour\nExclusive To Marie Minks",
    "features": [],
    "specs": {},
    "badges": [
      "exclusive"
    ]
  },
  {
    "slug": "new-style-2-in-1-fox-fur-crop-coat-grey-1",
    "title": "New Style 2 in 1 Fox Fur Crop Coat - Brown",
    "vendor": "Marie Minks",
    "price": 350,
    "compareAt": null,
    "badge": "exclusive",
    "collections": [
      "fox-fur-ladies"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "new-style-2-in-1-fox-fur-crop-coat-grey-1-1",
      "new-style-2-in-1-fox-fur-crop-coat-grey-1-2",
      "new-style-2-in-1-fox-fur-crop-coat-grey-1-3",
      "new-style-2-in-1-fox-fur-crop-coat-grey-1-4",
      "new-style-2-in-1-fox-fur-crop-coat-grey-1-5",
      "new-style-2-in-1-fox-fur-crop-coat-grey-1-6",
      "new-style-2-in-1-fox-fur-crop-coat-grey-1-7",
      "new-style-2-in-1-fox-fur-crop-coat-grey-1-8"
    ],
    "colors": [
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "6/8",
      "8/10",
      "10/12",
      "12/14",
      "14/16"
    ],
    "short": "New Style Hooded 2 in 1 Fox Fur Coat, This Coat Has 5 Rows Of Real Fox Fur, Hood and Sleeves Is Detachable 100% Real Fox Fur Coat Can Be Customised To Any Colour Exclusive To Marie Minks",
    "description": "New Style Hooded 2 in 1 Fox Fur Coat, This Coat Has 5 Rows Of Real Fox Fur, Hood and Sleeves Is Detachable\n100% Real Fox Fur\nCoat Can Be Customised To Any Colour\nExclusive To Marie Minks",
    "features": [],
    "specs": {},
    "badges": [
      "exclusive"
    ]
  },
  {
    "slug": "new-style-2-in-1-fox-fur-crop-coat-grey-2",
    "title": "New Style 2 in 1 Fox Fur Crop Coat - Beige",
    "vendor": "Marie Minks",
    "price": 350,
    "compareAt": null,
    "badge": "exclusive",
    "collections": [
      "fox-fur-ladies"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "new-style-2-in-1-fox-fur-crop-coat-grey-2-1",
      "new-style-2-in-1-fox-fur-crop-coat-grey-2-2",
      "new-style-2-in-1-fox-fur-crop-coat-grey-2-3",
      "new-style-2-in-1-fox-fur-crop-coat-grey-2-4"
    ],
    "colors": [
      {
        "name": "Beige"
      }
    ],
    "sizes": [
      "6/8",
      "8/10",
      "10/12",
      "12/14",
      "14/16"
    ],
    "short": "New Style Hooded 2 in 1 Fox Fur Coat, This Coat Has 5 Rows Of Real Fox Fur, Hood and Sleeves Is Detachable 100% Real Fox Fur Coat Can Be Customised To Any Colour Exclusive To Marie Minks",
    "description": "New Style Hooded 2 in 1 Fox Fur Coat, This Coat Has 5 Rows Of Real Fox Fur, Hood and Sleeves Is Detachable\n100% Real Fox Fur\nCoat Can Be Customised To Any Colour\nExclusive To Marie Minks",
    "features": [],
    "specs": {},
    "badges": [
      "exclusive"
    ]
  },
  {
    "slug": "suzy-luxury-mink-fur-coat",
    "title": "“Suzy” LUXURY MINK FUR COAT",
    "vendor": "Marie Minks",
    "price": 1500,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "suzy-luxury-mink-fur-coat-1",
      "suzy-luxury-mink-fur-coat-2",
      "suzy-luxury-mink-fur-coat-3",
      "suzy-luxury-mink-fur-coat-4",
      "suzy-luxury-mink-fur-coat-5",
      "suzy-luxury-mink-fur-coat-6",
      "suzy-luxury-mink-fur-coat-7",
      "suzy-luxury-mink-fur-coat-8",
      "suzy-luxury-mink-fur-coat-9",
      "suzy-luxury-mink-fur-coat-10",
      "suzy-luxury-mink-fur-coat-11",
      "suzy-luxury-mink-fur-coat-12"
    ],
    "colors": [
      {
        "name": "Grey"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Palomino"
      },
      {
        "name": "Silver"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "DETAILS 100% Real Mink fur jacket Concealed side pockets.",
    "description": "DETAILS\n100% Real Mink fur jacket\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nLength 85cm.\nMade of female Saga mink fur pelts.\nAvailable in different sizes, colours and lengths.\nA Timeless Classic 🥰\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is stranded and is available in all colours, lengths, sizes and with or without a hood.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink fur jacket",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Length 85cm.",
      "Made of female Saga mink fur pelts."
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "untitled-mar25_19-09",
    "title": "Mink Chain Shoulder Bag",
    "vendor": "Marie Minks",
    "price": 200,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "untitled-mar25_19-09-1",
      "untitled-mar25_19-09-2",
      "untitled-mar25_19-09-3",
      "untitled-mar25_19-09-4",
      "untitled-mar25_19-09-5",
      "untitled-mar25_19-09-6"
    ],
    "colors": [
      {
        "name": "Black"
      },
      {
        "name": "Brown"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Light Blue"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Sapphire"
      },
      {
        "name": "Custom Colour (Leave In Notes)"
      }
    ],
    "sizes": [],
    "short": "A soft flap-front shoulder bag in full skin female mink, with a gold turn-lock clasp and a gold chain strap.",
    "description": "A soft flap-front shoulder bag in full skin female mink, with a gold turn-lock clasp and a gold chain strap.\nFull skin female mink\nGold chain shoulder strap\nTurn-lock front fastening\nMade in any colour to match your coat\nPictured in honey, cream and black. Smaller and softer than the top handle bag - this is the evening one.\nMade to order in our own factory, usually 10 to 14 days. If you want a colour or a length that is not listed, leave a note at the cart and we will make it.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "Full skin female mink",
      "Gold chain shoulder strap",
      "Turn-lock front fastening",
      "Made in any colour to match your coat"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "ella-coat-brown",
    "title": "Ella Coat - Brown",
    "vendor": "ladies mink Jacket",
    "price": 850,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "ella-coat-brown-1",
      "ella-coat-brown-2"
    ],
    "colors": [
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Beautiful Mink Coat Made From Mink Pieces This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "Beautiful Mink Coat Made From Mink Pieces\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood.\nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option\n \n THIS COAT IS MADE TO ORDER IT TAKES 10 DAYS",
    "features": [],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "jersey-patterned-mink-fur-coat",
    "title": "“JERSEY” PATTERNED MINK FUR COAT",
    "vendor": "Marie Minks",
    "price": 750,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "jersey-patterned-mink-fur-coat-1",
      "jersey-patterned-mink-fur-coat-2",
      "jersey-patterned-mink-fur-coat-3",
      "jersey-patterned-mink-fur-coat-4",
      "jersey-patterned-mink-fur-coat-5",
      "jersey-patterned-mink-fur-coat-6",
      "jersey-patterned-mink-fur-coat-7",
      "jersey-patterned-mink-fur-coat-8"
    ],
    "colors": [
      {
        "name": "Grey"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Brown"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Black"
      },
      {
        "name": "Custom"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "DETAILS 100% Real Mink fur jacket Concealed side pockets.",
    "description": "DETAILS\n100% Real Mink fur jacket\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nLength 80cm.\nMade of female Saga mink fur pelts.\nAvailable in different sizes, colours and lengths.\nA Timeless Classic 🥰\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is stranded and is available in all colours, lengths, sizes and with or without a hood.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink fur jacket",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Length 80cm.",
      "Made of female Saga mink fur pelts."
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "annabelle-coat-in-brown",
    "title": "Annabelle Coat In Brown",
    "vendor": "Marie Minks",
    "price": 575,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "annabelle-coat-in-brown-1",
      "annabelle-coat-in-brown-2",
      "annabelle-coat-in-brown-3",
      "annabelle-coat-in-brown-4"
    ],
    "colors": [
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Loving This Style It’s Made From Brown Pattern Mink True To Size Can Take 10 Days For Delivery As It’s Made To Order",
    "description": "Loving This Style It’s Made From Brown Pattern Mink \nTrue To Size\nCan Take 10 Days For Delivery As It’s Made To Order",
    "features": [],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "embroidery-for-your-mink-coat",
    "title": "Embroidery For Your Mink Coat",
    "vendor": "Marie Minks",
    "price": 50,
    "compareAt": null,
    "badge": null,
    "collections": [
      "embroidery-service-for-your-mink-coat"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "embroidery-for-your-mink-coat-1"
    ],
    "colors": [],
    "sizes": [],
    "short": "We Can Now Add Your Initals Inside Your Coat ALL YOU NEED TO DO IS POST YOUR COAT BACK WE WILL DO INITALS AND POST IT BACK TO YOU ONCE PURCHASED I WILL SEND YOU AN EMAIL WITH DETAILS ON POSTAGE 7 Day",
    "description": "We Can Now Add Your Initals Inside Your Coat\nALL YOU NEED TO DO IS POST YOUR COAT BACK WE WILL DO INITALS AND POST IT BACK TO YOU\nONCE PURCHASED I WILL SEND YOU AN EMAIL WITH DETAILS ON POSTAGE\n7 Day Turnaround",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "copy-rosa-luxury-mink-fur-coat",
    "title": "“JERSEY” LUXURY MINK FUR COAT",
    "vendor": "Marie Minks",
    "price": 1250,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "copy-rosa-luxury-mink-fur-coat-1",
      "copy-rosa-luxury-mink-fur-coat-2",
      "copy-rosa-luxury-mink-fur-coat-3",
      "copy-rosa-luxury-mink-fur-coat-4",
      "copy-rosa-luxury-mink-fur-coat-5",
      "copy-rosa-luxury-mink-fur-coat-6",
      "copy-rosa-luxury-mink-fur-coat-7",
      "copy-rosa-luxury-mink-fur-coat-8",
      "copy-rosa-luxury-mink-fur-coat-9",
      "copy-rosa-luxury-mink-fur-coat-10",
      "copy-rosa-luxury-mink-fur-coat-11",
      "copy-rosa-luxury-mink-fur-coat-12",
      "copy-rosa-luxury-mink-fur-coat-13",
      "copy-rosa-luxury-mink-fur-coat-14",
      "copy-rosa-luxury-mink-fur-coat-15",
      "copy-rosa-luxury-mink-fur-coat-16",
      "copy-rosa-luxury-mink-fur-coat-17",
      "copy-rosa-luxury-mink-fur-coat-18",
      "copy-rosa-luxury-mink-fur-coat-19",
      "copy-rosa-luxury-mink-fur-coat-20",
      "copy-rosa-luxury-mink-fur-coat-21",
      "copy-rosa-luxury-mink-fur-coat-22",
      "copy-rosa-luxury-mink-fur-coat-23",
      "copy-rosa-luxury-mink-fur-coat-24",
      "copy-rosa-luxury-mink-fur-coat-25",
      "copy-rosa-luxury-mink-fur-coat-26",
      "copy-rosa-luxury-mink-fur-coat-27",
      "copy-rosa-luxury-mink-fur-coat-28",
      "copy-rosa-luxury-mink-fur-coat-29",
      "copy-rosa-luxury-mink-fur-coat-30",
      "copy-rosa-luxury-mink-fur-coat-31",
      "copy-rosa-luxury-mink-fur-coat-32",
      "copy-rosa-luxury-mink-fur-coat-33",
      "copy-rosa-luxury-mink-fur-coat-34",
      "copy-rosa-luxury-mink-fur-coat-35",
      "copy-rosa-luxury-mink-fur-coat-36",
      "copy-rosa-luxury-mink-fur-coat-37",
      "copy-rosa-luxury-mink-fur-coat-38"
    ],
    "colors": [
      {
        "name": "Grey"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Palomino"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "DETAILS 100% Real Mink fur jacket Concealed side pockets.",
    "description": "DETAILS\n100% Real Mink fur jacket\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nLength 80cm.\nMade of female Saga mink fur pelts.\nAvailable in different sizes, colours and lengths.\nA Timeless Classic 🥰\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is stranded and is available in all colours, lengths, sizes and with or without a hood.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option. This coat is specifically made for you please be sure on the size as it takes 2 weeks to be made.",
    "features": [
      "100% Real Mink fur jacket",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Length 80cm.",
      "Made of female Saga mink fur pelts."
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "250-gift-voucher",
    "title": "£250 Gift Voucher",
    "vendor": "Marie Minks",
    "price": 250,
    "compareAt": null,
    "badge": null,
    "collections": [
      "gift-vouchers"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "250-gift-voucher-1"
    ],
    "colors": [],
    "sizes": [],
    "short": "£250 covers the fox fur shawl, a kids fox fur gilet, or the women's fox fur trim jacket.",
    "description": "£250 covers the fox fur shawl, a kids fox fur gilet, or the women's fox fur trim jacket. Also a sensible amount towards a coat.\nWorth £250 to spend on anything we make\nNo expiry\nCan be part-used across more than one order\nSent as a code by email, or we can post it in a Marie Minks card if you would rather hand it over. Tell us at the cart which you want.\nNo expiry date. It can be used on anything in the shop, including sale pieces, and it can be split across more than one order.",
    "features": [
      "Worth £250 to spend on anything we make",
      "No expiry",
      "Can be part-used across more than one order"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "ella-coat-black",
    "title": "Ella Coat - Black",
    "vendor": "ladies mink Jacket",
    "price": 850,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "ella-coat-black-1",
      "ella-coat-black-2",
      "ella-coat-black-3",
      "ella-coat-black-4",
      "ella-coat-black-5",
      "ella-coat-black-6",
      "ella-coat-black-7",
      "ella-coat-black-8",
      "ella-coat-black-9",
      "ella-coat-black-10",
      "ella-coat-black-11"
    ],
    "colors": [
      {
        "name": "Black"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Beautiful Mink Coat Made From Mink Pieces This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "Beautiful Mink Coat Made From Mink Pieces\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood.\nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option\n \nTHIS COAT IS INSTOCK AND READY TO POST",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller",
      "sale"
    ]
  },
  {
    "slug": "the-barbie-coat-childs-mink-jacket",
    "title": "“The Barbie Coat” Childs Mink Jacket",
    "vendor": "Marie Minks",
    "price": 650,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-barbie-coat-childs-mink-jacket-1",
      "the-barbie-coat-childs-mink-jacket-2",
      "the-barbie-coat-childs-mink-jacket-3",
      "the-barbie-coat-childs-mink-jacket-4",
      "the-barbie-coat-childs-mink-jacket-5",
      "the-barbie-coat-childs-mink-jacket-6",
      "the-barbie-coat-childs-mink-jacket-7",
      "the-barbie-coat-childs-mink-jacket-8",
      "the-barbie-coat-childs-mink-jacket-9",
      "the-barbie-coat-childs-mink-jacket-10",
      "the-barbie-coat-childs-mink-jacket-11",
      "the-barbie-coat-childs-mink-jacket-12",
      "the-barbie-coat-childs-mink-jacket-13"
    ],
    "colors": [
      {
        "name": "Palomino"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Red"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Brown"
      },
      {
        "name": "Other ( Leave In Notes )"
      }
    ],
    "sizes": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "short": "Stand Out From The Crowd With This Beautiful Mink Coat Made From Mink Pieces, 100% Real Mink Concealed side pockets.",
    "description": "Stand Out From The Crowd With This Beautiful Mink Coat Made From Mink Pieces, \n100% Real Mink\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nMade of female Saga mink piece\nAvailable in different sizes, colours and lengths.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Made of female Saga mink piece"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "1000-gift-voucher",
    "title": "£1000 Gift Voucher",
    "vendor": "Marie Minks",
    "price": 1000,
    "compareAt": null,
    "badge": null,
    "collections": [
      "gift-vouchers"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "1000-gift-voucher-1"
    ],
    "colors": [],
    "sizes": [],
    "short": "£1000 buys most coats in the shop outright, including the mink pieces coats and the peplum bombers.",
    "description": "£1000 buys most coats in the shop outright, including the mink pieces coats and the peplum bombers. This is the voucher for a milestone birthday or an anniversary.\nWorth £1000 to spend on anything we make\nNo expiry\nCan be part-used across more than one order\nSent as a code by email, or we can post it in a Marie Minks card if you would rather hand it over. Tell us at the cart which you want.\nNo expiry date. It can be used on anything in the shop, including sale pieces, and it can be split across more than one order.",
    "features": [
      "Worth £1000 to spend on anything we make",
      "No expiry",
      "Can be part-used across more than one order"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "400-gift-voucher",
    "title": "£400 Gift Voucher",
    "vendor": "Marie Minks",
    "price": 400,
    "compareAt": null,
    "badge": null,
    "collections": [
      "gift-vouchers"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "400-gift-voucher-1"
    ],
    "colors": [],
    "sizes": [],
    "short": "£400 covers the fox fur gilet or a baby mink blanket, and makes a real dent in any of the coats.",
    "description": "£400 covers the fox fur gilet or a baby mink blanket, and makes a real dent in any of the coats.\nWorth £400 to spend on anything we make\nNo expiry\nCan be part-used across more than one order\nSent as a code by email, or we can post it in a Marie Minks card if you would rather hand it over. Tell us at the cart which you want.\nNo expiry date. It can be used on anything in the shop, including sale pieces, and it can be split across more than one order.",
    "features": [
      "Worth £400 to spend on anything we make",
      "No expiry",
      "Can be part-used across more than one order"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "300-gift-vouchers",
    "title": "£300 Gift Vouchers",
    "vendor": "Marie Minks",
    "price": 300,
    "compareAt": null,
    "badge": null,
    "collections": [
      "gift-vouchers"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "300-gift-vouchers-1"
    ],
    "colors": [],
    "sizes": [],
    "short": "£300 buys a 5 row fox fur coat outright, or the limited edition fox fur.",
    "description": "£300 buys a 5 row fox fur coat outright, or the limited edition fox fur. A proper gift rather than a token.\nWorth £300 to spend on anything we make\nNo expiry\nCan be part-used across more than one order\nSent as a code by email, or we can post it in a Marie Minks card if you would rather hand it over. Tell us at the cart which you want.\nNo expiry date. It can be used on anything in the shop, including sale pieces, and it can be split across more than one order.",
    "features": [
      "Worth £300 to spend on anything we make",
      "No expiry",
      "Can be part-used across more than one order"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "200-gift-vouchers",
    "title": "£200 Gift Voucher",
    "vendor": "Marie Minks",
    "price": 200,
    "compareAt": null,
    "badge": null,
    "collections": [
      "gift-vouchers"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "200-gift-vouchers-1"
    ],
    "colors": [],
    "sizes": [],
    "short": "£200 buys the mink scarf with its matching headband, one of the mink handbags, or the fox fur down coat outright.",
    "description": "£200 buys the mink scarf with its matching headband, one of the mink handbags, or the fox fur down coat outright. Enough to be a whole present rather than a contribution.\nWorth £200 to spend on anything we make\nNo expiry\nCan be part-used across more than one order\nSent as a code by email, or we can post it in a Marie Minks card if you would rather hand it over. Tell us at the cart which you want.\nNo expiry date. It can be used on anything in the shop, including sale pieces, and it can be split across more than one order.",
    "features": [
      "Worth £200 to spend on anything we make",
      "No expiry",
      "Can be part-used across more than one order"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "100-gift-voucher",
    "title": "£100 Gift Voucher",
    "vendor": "Marie Minks",
    "price": 100,
    "compareAt": null,
    "badge": null,
    "collections": [
      "gift-vouchers"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "100-gift-voucher-1"
    ],
    "colors": [],
    "sizes": [],
    "short": "A £100 voucher covers our fur headbands, scrunchies or a keepsake, or takes £100 off a coat.",
    "description": "A £100 voucher covers our fur headbands, scrunchies or a keepsake, or takes £100 off a coat. A good size for a first gift when you are not sure of her taste.\nWorth £100 to spend on anything we make\nNo expiry\nCan be part-used across more than one order\nSent as a code by email, or we can post it in a Marie Minks card if you would rather hand it over. Tell us at the cart which you want.\nNo expiry date. It can be used on anything in the shop, including sale pieces, and it can be split across more than one order.",
    "features": [
      "Worth £100 to spend on anything we make",
      "No expiry",
      "Can be part-used across more than one order"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "gift-vouchers",
    "title": "Gift Vouchers",
    "vendor": "Marie Minks",
    "price": 500,
    "compareAt": null,
    "badge": null,
    "collections": [
      "gift-vouchers"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "gift-vouchers-1"
    ],
    "colors": [],
    "sizes": [],
    "short": "£500 buys a good many of the children's pieces outright and takes a serious chunk off a full skin coat.",
    "description": "£500 buys a good many of the children's pieces outright and takes a serious chunk off a full skin coat. This is the one people choose when they want the gift to be the coat.\nWorth £500 to spend on anything we make\nNo expiry\nCan be part-used across more than one order\nSent as a code by email, or we can post it in a Marie Minks card if you would rather hand it over. Tell us at the cart which you want.\nNo expiry date. It can be used on anything in the shop, including sale pieces, and it can be split across more than one order.",
    "features": [
      "Worth £500 to spend on anything we make",
      "No expiry",
      "Can be part-used across more than one order"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "anne-style-mink-fur-coat",
    "title": "ANNE STYLE MINK FUR COAT",
    "vendor": "Marie Minks",
    "price": 750,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "anne-style-mink-fur-coat-1",
      "anne-style-mink-fur-coat-2",
      "anne-style-mink-fur-coat-3"
    ],
    "colors": [
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "The Anne Style is the same cut as our Bella coat, made from mink pieces rather than full skins.",
    "description": "The Anne Style is the same cut as our Bella coat, made from mink pieces rather than full skins. Same shape, same big collar, same drawstring waist — a different way to buy it.\n100% real mink, made from mink pieces\nBig collar, no hood\nFluted bottom with a drawstring at the waist\nConcealed side pockets, hook and eye front closure\n31 inches in length, other lengths made to order\nMade in any colour\nMink pieces are worked from the offcuts of the full skins, so you get the same fur and the same shape for less. The full skin version of this coat is the Bella at £1,250, and the hooded full skin version is the Rosa.\nMade to order in our own factory, usually 10 to 14 days. If you want a colour or a length that is not listed, leave a note at the cart and we will make it.\nPayment plans available - pay in 3 instalments, or spread it over 6 months.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "100% real mink, made from mink pieces",
      "Big collar, no hood",
      "Fluted bottom with a drawstring at the waist",
      "Concealed side pockets, hook and eye front closure",
      "31 inches in length, other lengths made to order",
      "Made in any colour"
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "copy-barbie-mink-coat-in-chocolate-brown-kids",
    "title": "Barbie Mink Coat In BLACK",
    "vendor": "Marie Minks",
    "price": 550,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "copy-barbie-mink-coat-in-chocolate-brown-kids-1",
      "copy-barbie-mink-coat-in-chocolate-brown-kids-2"
    ],
    "colors": [
      {
        "name": "Black"
      }
    ],
    "sizes": [
      "1 years",
      "2 years",
      "3 years",
      "4 years",
      "5 years",
      "6 years",
      "7 years",
      "8 years",
      "9 years",
      "10 years"
    ],
    "short": "Stand Out From The Crowd With This Beautiful Mink Coat Made From Mink Pieces.",
    "description": "Stand Out From The Crowd With This Beautiful Mink Coat Made From Mink Pieces. \n100% Real Mink\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nMade of female Saga mink pieces.\nAvailable in different sizes, colours and lengths.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Made of female Saga mink pieces."
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "elena-style",
    "title": "Elena Style",
    "vendor": "Marie Minks",
    "price": 850,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "elena-style-1",
      "elena-style-2",
      "elena-style-3"
    ],
    "colors": [
      {
        "name": "Grey"
      }
    ],
    "sizes": [
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "A soft, easy coat in mink pieces, cut straight and true to size.",
    "description": "A soft, easy coat in mink pieces, cut straight and true to size. One of the simpler shapes in the range and one of the most wearable.\n100% real mink, made from mink pieces\nTrue to size\nMade in a range of colours\nMade to order in our own factory, usually 10 to 14 days. If you want a colour or a length that is not listed, leave a note at the cart and we will make it.\nPayment plans available - pay in 3 instalments, or spread it over 6 months.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "100% real mink, made from mink pieces",
      "True to size",
      "Made in a range of colours"
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "the-barbie-coat-grey",
    "title": "The Barbie Coat - GREY",
    "vendor": "ladies mink Jacket",
    "price": 850,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-barbie-coat-grey-1",
      "the-barbie-coat-grey-2",
      "the-barbie-coat-grey-3",
      "the-barbie-coat-grey-4",
      "the-barbie-coat-grey-5"
    ],
    "colors": [
      {
        "name": "Grey"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Beautiful Mink Coat Made From Mink Pieces This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "Beautiful Mink Coat Made From Mink Pieces\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood.\nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option\n \n THIS COAT IS MADE TO ORDER IT TAKES 10-14 DAYS",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "the-barbie-coat-pastel",
    "title": "The Barbie Coat - PASTEL",
    "vendor": "ladies mink Jacket",
    "price": 850,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-barbie-coat-pastel-1",
      "the-barbie-coat-pastel-2",
      "the-barbie-coat-pastel-3"
    ],
    "colors": [
      {
        "name": "Pastel"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Beautiful Mink Coat Made From Mink Pieces This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "Beautiful Mink Coat Made From Mink Pieces\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood.\nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option\n \n THIS COAT IS MADE TO ORDER IT TAKES 10 DAYS",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller",
      "sale"
    ]
  },
  {
    "slug": "the-barbie-coat-black-1",
    "title": "The Barbie Coat - Black",
    "vendor": "ladies mink Jacket",
    "price": 750,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-barbie-coat-black-1-1",
      "the-barbie-coat-black-1-2",
      "the-barbie-coat-black-1-3",
      "the-barbie-coat-black-1-4",
      "the-barbie-coat-black-1-5",
      "the-barbie-coat-black-1-6"
    ],
    "colors": [
      {
        "name": "Black"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Beautiful Mink Coat Made From Mink Pieces This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "Beautiful Mink Coat Made From Mink Pieces\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood.\nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option\n \n THIS COAT IS MADE TO ORDER IT TAKES 10 DAYS",
    "features": [],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "annabelle-style-with-a-hood-brown",
    "title": "Annabelle Style With A Hood - BROWN",
    "vendor": "Marie Minks",
    "price": 575,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "annabelle-style-with-a-hood-brown-1",
      "annabelle-style-with-a-hood-brown-2"
    ],
    "colors": [
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16",
      "Plus size"
    ],
    "short": "Loving This Style It’s Made From Brown Mink Pieces Absolute Bargain This Is A Custom Made Coat It Takes 10-14Days For Delivery True To Size",
    "description": "Loving This Style It’s Made From Brown Mink Pieces\nAbsolute Bargain\nThis Is A Custom Made Coat It Takes 10-14Days For Delivery\nTrue To Size",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller",
      "sale"
    ]
  },
  {
    "slug": "annabelle-coat",
    "title": "Annabelle Coat",
    "vendor": "Marie Minks",
    "price": 750,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "annabelle-coat-1",
      "annabelle-coat-2",
      "annabelle-coat-3",
      "annabelle-coat-4"
    ],
    "colors": [
      {
        "name": "Cream"
      }
    ],
    "sizes": [
      "8",
      "10",
      "12"
    ],
    "short": "Loving This Style It’s Made From Cream Pattern Mink True To Size Instock For Immediate Despatch",
    "description": "Loving This Style It’s Made From Cream Pattern Mink \nTrue To Size\nInstock For Immediate Despatch",
    "features": [],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "the-barbie-coat-2",
    "title": "The Barbie Coat - Medium Brown",
    "vendor": "ladies mink Jacket",
    "price": 750,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-barbie-coat-2-1",
      "the-barbie-coat-2-2",
      "the-barbie-coat-2-3",
      "the-barbie-coat-2-4",
      "the-barbie-coat-2-5"
    ],
    "colors": [
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Beautiful Mink Coat Made From Mink Pieces This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "Beautiful Mink Coat Made From Mink Pieces\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood.\nThis Coat Can Also Be Made In Kids\nReal mink fur made from mink pieces.\nFront closure.\nWith hood..\nLength 31 inches.\nHigh-quality craftsmanship.\nExceptional tailoring.\nMade in Greece.\nReal colors may vary slightly from the color on your screen. Check this product on several screens to have a better view.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option\n \n THIS COAT IS MADE TO ORDER IT TAKES 10-14 DAYS",
    "features": [
      "Real mink fur made from mink pieces.",
      "Front closure.",
      "With hood..",
      "Length 31 inches.",
      "High-quality craftsmanship.",
      "Exceptional tailoring.",
      "Made in Greece.",
      "Real colors may vary slightly from the color on your screen. Check this product on several screens to have a better view."
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "hooded-bomber-mink-fur-jacket",
    "title": "Hooded Bomber Mink Jacket - Fox Collar",
    "vendor": "Marie Minks",
    "price": 800,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "hooded-bomber-mink-fur-jacket-1",
      "hooded-bomber-mink-fur-jacket-2",
      "hooded-bomber-mink-fur-jacket-3",
      "hooded-bomber-mink-fur-jacket-4",
      "hooded-bomber-mink-fur-jacket-5",
      "hooded-bomber-mink-fur-jacket-6",
      "hooded-bomber-mink-fur-jacket-7",
      "hooded-bomber-mink-fur-jacket-8",
      "hooded-bomber-mink-fur-jacket-9",
      "hooded-bomber-mink-fur-jacket-10",
      "hooded-bomber-mink-fur-jacket-11",
      "hooded-bomber-mink-fur-jacket-12",
      "hooded-bomber-mink-fur-jacket-13",
      "hooded-bomber-mink-fur-jacket-14",
      "hooded-bomber-mink-fur-jacket-15",
      "hooded-bomber-mink-fur-jacket-16"
    ],
    "colors": [
      {
        "name": "Grey"
      },
      {
        "name": "Purple"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Red"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Blue"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Black"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "White"
      },
      {
        "name": "Custom Made"
      },
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "A short mink bomber with a deep fox fur shawl collar that sits up around the face.",
    "description": "A short mink bomber with a deep fox fur shawl collar that sits up around the face. The body is full-skin mink, smooth and light; the collar and hood are long-haired fox, so the two textures sit against each other.\n100% real mink, full skin\nFox fur collar and hood\nZip front, side pockets\nLength 55cm\nCut and sewn in our own factory in Greece\nPelts certified by the European fur auctions. Can be made in any colour - leave a note at the cart or message us before you order.",
    "features": [
      "100% real mink, full skin",
      "Fox fur collar and hood",
      "Zip front, side pockets",
      "Length 55cm",
      "Cut and sewn in our own factory in Greece"
    ],
    "specs": {},
    "badges": [
      "best-seller"
    ]
  },
  {
    "slug": "new-for-2025-mink-and-fox-fur-child-s-coat",
    "title": "New For 2025 Mink and Fox Fur Child’s Coat",
    "vendor": "Marie Minks",
    "price": 1000,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "new-for-2025-mink-and-fox-fur-child-s-coat-1",
      "new-for-2025-mink-and-fox-fur-child-s-coat-2",
      "new-for-2025-mink-and-fox-fur-child-s-coat-3"
    ],
    "colors": [
      {
        "name": "Pink"
      },
      {
        "name": "Red"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Grey"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Blue"
      },
      {
        "name": "Black"
      },
      {
        "name": "Purple"
      },
      {
        "name": "Pastel"
      }
    ],
    "sizes": [
      "1-2Y",
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "6-7Y",
      "7-8Y",
      "8-9Y",
      "9-10Y",
      "10-11Y",
      "11-12Y"
    ],
    "short": "New For 2025 Mink and Fox Fur Made From Real Mink Fur With A Fox Collar, Cuffs and Trim 100% Real Mink fur jacket Concealed side pockets.",
    "description": "New For 2025 Mink and Fox Fur\nMade From Real Mink Fur With A Fox Collar, Cuffs and Trim\n100% Real Mink fur jacket\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nAvailable in different sizes, colours and lengths.\nA Timeless Classic 🥰\n. The coat is made from full skin female mink and is available in all colours, lengths, sizes and with or without a hood.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink fur jacket",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Available in different sizes, colours and lengths."
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "half-price",
    "title": "Annabelle Style With A Hood",
    "vendor": "Marie Minks",
    "price": 575,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "half-price-1",
      "half-price-2"
    ],
    "colors": [
      {
        "name": "Black"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Loving This Style It’s Made From Black Mink Pieces Absolute Bargain This Takes 10-14 Day For Delivery True To Size",
    "description": "Loving This Style It’s Made From Black Mink Pieces\nAbsolute Bargain\nThis Takes 10-14 Day For Delivery\n \nTrue To Size",
    "features": [],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "kingc-furs-exclusive-style-1",
    "title": "Marie Minks Exclusive Style",
    "vendor": "Marie Minks",
    "price": 1050,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "kingc-furs-exclusive-style-1-1",
      "kingc-furs-exclusive-style-1-2",
      "kingc-furs-exclusive-style-1-3",
      "kingc-furs-exclusive-style-1-4",
      "kingc-furs-exclusive-style-1-5",
      "kingc-furs-exclusive-style-1-6",
      "kingc-furs-exclusive-style-1-7",
      "kingc-furs-exclusive-style-1-8"
    ],
    "colors": [
      {
        "name": "Pearl"
      },
      {
        "name": "Custom Made"
      },
      {
        "name": "Gray"
      },
      {
        "name": "Blue"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Red"
      },
      {
        "name": "Black"
      },
      {
        "name": "Pastel"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16",
      "Custom Size"
    ],
    "short": "This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "This elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood. This is our latest style for 2024\nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "classic-luxury-mink-fur-coat",
    "title": "CLASSIC LUXURY MINK FUR COAT",
    "vendor": "Marie Minks",
    "price": 1250,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "classic-luxury-mink-fur-coat-1",
      "classic-luxury-mink-fur-coat-2",
      "classic-luxury-mink-fur-coat-3",
      "classic-luxury-mink-fur-coat-4",
      "classic-luxury-mink-fur-coat-5",
      "classic-luxury-mink-fur-coat-6",
      "classic-luxury-mink-fur-coat-7"
    ],
    "colors": [
      {
        "name": "Cream"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "DETAILS 100% Real Mink fur jacket Concealed side pockets.",
    "description": "DETAILS\n100% Real Mink fur jacket\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nLength 85cm.\nMade of female Saga mink fur pelts.\nAvailable in different sizes, colours and lengths.\nA Timeless Classic 🥰\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is stranded and is available in all colours, lengths, sizes and with or without a hood.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink fur jacket",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Length 85cm.",
      "Made of female Saga mink fur pelts."
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "kingc-furs-exclusive-kids-peplum-jackets",
    "title": "Marie Minks Exclusive Kids Peplum Jackets",
    "vendor": "Marie Minks",
    "price": 250,
    "compareAt": null,
    "badge": null,
    "collections": [
      "kids-fox-fur-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "kingc-furs-exclusive-kids-peplum-jackets-1",
      "kingc-furs-exclusive-kids-peplum-jackets-2",
      "kingc-furs-exclusive-kids-peplum-jackets-3",
      "kingc-furs-exclusive-kids-peplum-jackets-4",
      "kingc-furs-exclusive-kids-peplum-jackets-5",
      "kingc-furs-exclusive-kids-peplum-jackets-6",
      "kingc-furs-exclusive-kids-peplum-jackets-7",
      "kingc-furs-exclusive-kids-peplum-jackets-8",
      "kingc-furs-exclusive-kids-peplum-jackets-9",
      "kingc-furs-exclusive-kids-peplum-jackets-10",
      "kingc-furs-exclusive-kids-peplum-jackets-11",
      "kingc-furs-exclusive-kids-peplum-jackets-12",
      "kingc-furs-exclusive-kids-peplum-jackets-13",
      "kingc-furs-exclusive-kids-peplum-jackets-14",
      "kingc-furs-exclusive-kids-peplum-jackets-15"
    ],
    "colors": [
      {
        "name": "Navy"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Red"
      },
      {
        "name": "Light Blue"
      },
      {
        "name": "Metallic Silver"
      },
      {
        "name": "Maroon"
      },
      {
        "name": "Royal Blue"
      }
    ],
    "sizes": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "short": "Our own peplum jacket cut down for children — the same flared shape as the grown up one, with a real fox fur trim on the hood and fox fur pom poms.",
    "description": "Our own peplum jacket cut down for children — the same flared shape as the grown up one, with a real fox fur trim on the hood and fox fur pom poms.\nReal fox fur hood trim and pom poms\nPeplum cut, fitted then flared\nAges 1 to 12, in eight colours\nExclusive to Marie Minks\nThe sizing is generous — a 1 year will fit a bigger baby, so if your child is between sizes take the smaller one.\nCut and sewn in our own factory in Greece, not bought in. Made to order, so it is made for your child rather than pulled off a shelf.\nIf the colour you want is not in the list, leave a note at the cart and we will make it.\nKlarna and Clearpay are available at the checkout if you would rather spread it.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "Real fox fur hood trim and pom poms",
      "Peplum cut, fitted then flared",
      "Ages 1 to 12, in eight colours",
      "Exclusive to Marie Minks"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "the-barbie-coat",
    "title": "The Barbie Coat",
    "vendor": "ladies mink Jacket",
    "price": 850,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-barbie-coat-1",
      "the-barbie-coat-2",
      "the-barbie-coat-3",
      "the-barbie-coat-4",
      "the-barbie-coat-5",
      "the-barbie-coat-6",
      "the-barbie-coat-7"
    ],
    "colors": [
      {
        "name": "Red"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Blue"
      },
      {
        "name": "Grey"
      },
      {
        "name": "Custom Colour"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16",
      "Plus Size"
    ],
    "short": "Beautiful Mink Coat Made From Mink Pieces This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "Beautiful Mink Coat Made From Mink Pieces\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood.\nStandard Length Is 31inches We Can Make Longer On Request\nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option\n \nBEIGE IS TAKEN 2/3 WEEKS",
    "features": [],
    "specs": {},
    "badges": [
      "best-seller"
    ]
  },
  {
    "slug": "mink-fur-headbands",
    "title": "Mink Fur Headbands",
    "vendor": "Marie Minks",
    "price": 50,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fur-accessories"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "mink-fur-headbands-1",
      "mink-fur-headbands-2",
      "mink-fur-headbands-3",
      "mink-fur-headbands-4"
    ],
    "colors": [
      {
        "name": "Black"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "White"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Blue"
      },
      {
        "name": "Gray"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Green"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Red"
      },
      {
        "name": "Silver"
      },
      {
        "name": "Custom Made"
      }
    ],
    "sizes": [],
    "short": "Our 100% mink fur headbands are the perfect finishing touch to any outfit.",
    "description": "Our 100% mink fur headbands are the perfect finishing touch to any outfit. They are timeless and never go out of fashion, making them a sustainable choice for a timeless accessory. Get your mink fur headband today for a luxurious and comfortable finishing touch! The absolute essential gift!\n \nFeatures:\nComfy inner lining\nThick and luxurious\nGenuine Ranch Raised mink fur , Soft And Silky\nDry clean and professional fur clean only\n One size fits all!\nHandmade item: Once you place your order, your selected piece will be made and shipped within 1-10 working days.",
    "features": [
      "Comfy inner lining",
      "Thick and luxurious",
      "Genuine Ranch Raised mink fur , Soft And Silky",
      "Dry clean and professional fur clean only"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "bella-luxury-mink-fur-coat",
    "title": "“BELLA” LUXURY MINK FUR COAT",
    "vendor": "Marie Minks",
    "price": 1250,
    "compareAt": null,
    "badge": null,
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "bella-luxury-mink-fur-coat-1",
      "bella-luxury-mink-fur-coat-2",
      "bella-luxury-mink-fur-coat-3",
      "bella-luxury-mink-fur-coat-4",
      "bella-luxury-mink-fur-coat-5",
      "bella-luxury-mink-fur-coat-6"
    ],
    "colors": [
      {
        "name": "Brown"
      },
      {
        "name": "Grey"
      },
      {
        "name": "Black"
      },
      {
        "name": "White"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Cream"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "The Bella is our full skin mink coat.",
    "description": "The Bella is our full skin mink coat. It is cut from whole female Saga mink pelts rather than from pieces, which is what puts it at the top of the range — the fur runs unbroken down the coat, and it hangs and moves differently because of it.\n100% real mink, full skin female Saga pelts\nBig collar, no hood\nFluted bottom with a drawstring at the waist\nConcealed side pockets, hook and eye front closure\n31 inches in length, other lengths made to order\nMade in any colour\nThis is the collar version, which is why it is £300 less than the Rosa — the same full skin mink, made with a hood. If you like this shape but not the price, the Anne Style is the same cut again made from mink pieces.\nMade to order in our own factory, usually 10 to 14 days. If you want a colour or a length that is not listed, leave a note at the cart and we will make it.\nPayment plans available - pay in 3 instalments, or spread it over 6 months.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "100% real mink, full skin female Saga pelts",
      "Big collar, no hood",
      "Fluted bottom with a drawstring at the waist",
      "Concealed side pockets, hook and eye front closure",
      "31 inches in length, other lengths made to order",
      "Made in any colour"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "the-barbie-coat-in-red",
    "title": "The “Barbie” Coat - Red",
    "vendor": "ladies mink Jacket",
    "price": 850,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-barbie-coat-in-red-1",
      "the-barbie-coat-in-red-2",
      "the-barbie-coat-in-red-3"
    ],
    "colors": [],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16",
      "Plus Size"
    ],
    "short": "Beautiful Mink Coat Made From Mink Pieces This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "Beautiful Mink Coat Made From Mink Pieces\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood.\nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "kids-mink-coat",
    "title": "Barbie Mink Coat In Chocolate Brown Kids",
    "vendor": "Marie Minks",
    "price": 550,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "kids-mink-coat-1"
    ],
    "colors": [
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "1 years",
      "2 years",
      "3 years",
      "4 years",
      "5 years",
      "6 years",
      "7 years",
      "8 years",
      "9 years",
      "10 years"
    ],
    "short": "Stand Out From The Crowd With This Beautiful Mink Coat Made From Mink Pieces.",
    "description": "Stand Out From The Crowd With This Beautiful Mink Coat Made From Mink Pieces. \n100% Real Mink\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nMade of female Saga mink pieces.\nAvailable in different sizes, colours and lengths.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Made of female Saga mink pieces."
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "fox-fur-gilet-1",
    "title": "Fox Fur Gilet",
    "vendor": "Marie Minks",
    "price": 400,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fox-fur-ladies"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "fox-fur-gilet-1-1",
      "fox-fur-gilet-1-2",
      "fox-fur-gilet-1-3"
    ],
    "colors": [
      {
        "name": "Beige"
      },
      {
        "name": "Navy"
      },
      {
        "name": "Brown"
      },
      {
        "name": "Pink"
      },
      {
        "name": "Red"
      },
      {
        "name": "Ivory"
      },
      {
        "name": "Black"
      }
    ],
    "sizes": [
      "XS - (4-6)",
      "S - (8-10)",
      "Made to measure (please select this size and then mail me measurements along with order number).",
      "M - (10-12)",
      "L - (12-14)",
      "XL - (14-16)"
    ],
    "short": "Lend unprecedented sophistication to your new-season outerwear courtesy of this multi-textured leather and fox fur gilet from Marie Minks.",
    "description": "Lend unprecedented sophistication to your new-season outerwear courtesy of this multi-textured leather and fox fur gilet from Marie Minks. Enveloping the cosy silhouette is cascading rows of plush fox fur and full nappa leather lining - a lavish touch that adds subtle texture when layering for a decidedly indulgent feel, keeping its wearer warm and stylish on cooler days.\n \nMaterial 1: 100% Premium Fox Fur\nMaterial 2: Fur lined with soft Lambs Leather to give a non-bulky shape\n6 fox fur horizontal panels \nInternally Satin lining\nCentre zip closure\n2 side entry pockets\nTHIS ITEM IS PREORDER IT CAN TAKE 1-2 WEEKS",
    "features": [
      "Material 1: 100% Premium Fox Fur",
      "Material 2: Fur lined with soft Lambs Leather to give a non-bulky shape",
      "6 fox fur horizontal panels",
      "Internally Satin lining",
      "Centre zip closure",
      "2 side entry pockets"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "horizontal-layered-mink-fur-jacket",
    "title": "HORIZONTAL LAYERED MINK FUR JACKET",
    "vendor": "Marie Minks",
    "price": 1350,
    "compareAt": null,
    "badge": null,
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "horizontal-layered-mink-fur-jacket-1",
      "horizontal-layered-mink-fur-jacket-2"
    ],
    "colors": [
      {
        "name": "Beige"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Grey"
      },
      {
        "name": "Black"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16",
      "Plus size"
    ],
    "short": "Lightweight and modern.",
    "description": "Lightweight and modern. Coat is made in horizontal bands and A drawstring at the waist to show off that waist 😍 A classic shape that'll never age 😘\nMade from Female mink.\nAvailable in different sizes, colours and lengths\nA Timeless Classic 🥰🥰",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "red-childs-minks",
    "title": "‘Sophia’ Mink Coat In Kids",
    "vendor": "Marie Minks",
    "price": 800,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "red-childs-minks-1"
    ],
    "colors": [],
    "sizes": [
      "1 years",
      "2 years",
      "3 Years",
      "4 years",
      "5 years",
      "6 years"
    ],
    "short": "Stand Out From The Crowd With This Beautiful Mink Coat Made From Mink Pieces, 100% Real Mink Concealed side pockets.",
    "description": "Stand Out From The Crowd With This Beautiful Mink Coat Made From Mink Pieces, \n100% Real Mink\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nMade of female Saga mink pieces.\nAvailable in different sizes, colours and lengths.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Made of female Saga mink pieces."
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "limited-edition-kingc-furs-fox-fur-coat-in-grey",
    "title": "Limited Edition Marie Minks Fox Fur Coat In Grey",
    "vendor": "Marie Minks",
    "price": 300,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fox-fur-ladies"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "limited-edition-kingc-furs-fox-fur-coat-in-grey-1",
      "limited-edition-kingc-furs-fox-fur-coat-in-grey-2"
    ],
    "colors": [],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "short": "Exuding style and sophistication exclusively available only at Marie Minks.",
    "description": "Exuding style and sophistication exclusively available only at Marie Minks. This new 2022 swoon-worthy full Fox Fur pelted coat will instantly elevate your look and most definitely be a luxurious addition to your outerwear collection this coming season. \nWear this elegant investment draped over the shoulders as a layer over evening wear for an opulent approach or pair well with a slim knit and jeans helping you brace the cold weather in style. \nMaterial 1: 100% Premium Fox Fur\nMaterial 2: Fur lined with soft Lambs Leather\nHook & Eye Fastener\nSide slit pockets\nLining: Internally Lined\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "rosa-luxury-mink-fur-coat-in-black",
    "title": "“ROSA” LUXURY MINK FUR COAT IN BLACK",
    "vendor": "Marie Minks",
    "price": 1550,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "rosa-luxury-mink-fur-coat-in-black-1",
      "rosa-luxury-mink-fur-coat-in-black-2"
    ],
    "colors": [
      {
        "name": "Black"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "DETAILS 100% Real Mink fur jacket Concealed side pockets.",
    "description": "DETAILS\n100% Real Mink fur jacket\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nLength 85cm.\nMade of female Saga mink fur pelts.\n \nAvailable in different sizes, colours and lengths.\nA Timeless Classic 🥰\n \nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is stranded and is available in all colours, lengths, sizes and with or without a hood.\n \nORDER YOUR ONE OF A KIND COAT\nWe are delighted to offer bespoke options in design and colour. Please contact us to get a quote if you would like this item customized for you personally.",
    "features": [
      "100% Real Mink fur jacket",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Length 85cm.",
      "Made of female Saga mink fur pelts."
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "5-row-fox-fur-luxury-coat",
    "title": "5 Row Fox Fur Luxury Coat",
    "vendor": "Marie Minks",
    "price": 300,
    "compareAt": null,
    "badge": null,
    "collections": [
      "fox-fur-ladies"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "5-row-fox-fur-luxury-coat-1",
      "5-row-fox-fur-luxury-coat-2",
      "5-row-fox-fur-luxury-coat-3",
      "5-row-fox-fur-luxury-coat-4",
      "5-row-fox-fur-luxury-coat-5",
      "5-row-fox-fur-luxury-coat-6",
      "5-row-fox-fur-luxury-coat-7",
      "5-row-fox-fur-luxury-coat-8",
      "5-row-fox-fur-luxury-coat-9",
      "5-row-fox-fur-luxury-coat-10",
      "5-row-fox-fur-luxury-coat-11",
      "5-row-fox-fur-luxury-coat-12",
      "5-row-fox-fur-luxury-coat-13"
    ],
    "colors": [
      {
        "name": "Blue"
      },
      {
        "name": "Beige"
      },
      {
        "name": "Pink"
      },
      {
        "name": "White"
      },
      {
        "name": "Grey"
      },
      {
        "name": "Black"
      }
    ],
    "sizes": [
      "Xs",
      "S",
      "M",
      "L",
      "XL"
    ],
    "short": "Exuding style and sophistication exclusively available only at Marie Minks.",
    "description": "Exuding style and sophistication exclusively available only at Marie Minks. This new 2022 swoon-worthy full Fox Fur pelted coat will instantly elevate your look and most definitely be a luxurious addition to your outerwear collection this coming season. \nWear this elegant investment draped over the shoulders as a layer over evening wear for an opulent approach or pair well with a slim knit and jeans helping you brace the cold weather in style. \nMaterial 1: 100% Premium Fox Fur\nMaterial 2: Fur lined with soft Lambs Leather\nHook & Eye Fastener\nSide slit pockets\nLining: Internally Lined\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "childs-fox-fur-5-row-coats-1",
    "title": "Childs Fox Fur 5 Row Coats",
    "vendor": "Marie Minks",
    "price": 350,
    "compareAt": null,
    "badge": null,
    "collections": [
      "kids-fox-fur-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "childs-fox-fur-5-row-coats-1-1",
      "childs-fox-fur-5-row-coats-1-2",
      "childs-fox-fur-5-row-coats-1-3"
    ],
    "colors": [
      {
        "name": "Cerise pink"
      },
      {
        "name": "Red"
      },
      {
        "name": "Light pink"
      },
      {
        "name": "Royal blue"
      },
      {
        "name": "Beige"
      },
      {
        "name": "White"
      }
    ],
    "sizes": [
      "1-2",
      "3-4",
      "5-6",
      "7-8",
      "9-10"
    ],
    "short": "A child's coat in 100% real fox fur, built in five rows of pelt down the body.",
    "description": "A child's coat in 100% real fox fur, built in five rows of pelt down the body. Worked in the vertical style with a hook and eye fastening.\n100% real fox fur, five rows\nVertical style\nHook and eye fastening\nSix colours\nDry clean only\nThe sizing is generous on these, so take the smaller size if your child is between two.\nCut and sewn in our own factory in Greece, not bought in. Made to order, so it is made for your child rather than pulled off a shelf.\nIf the colour you want is not in the list, leave a note at the cart and we will make it.\nKlarna and Clearpay are available at the checkout if you would rather spread it.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "100% real fox fur, five rows",
      "Vertical style",
      "Hook and eye fastening",
      "Six colours",
      "Dry clean only"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "the-ella-coat",
    "title": "The Ella Coat",
    "vendor": "Marie Minks",
    "price": 1250,
    "compareAt": null,
    "badge": null,
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-ella-coat-1",
      "the-ella-coat-2",
      "the-ella-coat-3",
      "the-ella-coat-4"
    ],
    "colors": [
      {
        "name": "Red"
      },
      {
        "name": "Palomino"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Beautiful Mink Coat Made From Mink Pieces And Fox Fur.",
    "description": "Beautiful Mink Coat Made From Mink Pieces And Fox Fur.\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood. It has a fox fur hood and cuffs. \nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option",
    "features": [],
    "specs": {},
    "badges": []
  },
  {
    "slug": "military-special",
    "title": "Military Style Mink Coat",
    "vendor": "Marie Minks",
    "price": 1250,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "military-special-1",
      "military-special-2",
      "military-special-3"
    ],
    "colors": [],
    "sizes": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "short": "Stand Out From The Crowd In This Beautiful Mink Jacket, It Has Gold Buttons To The Front, Shoulders and Cuffs To Give That Military Look.",
    "description": "Stand Out From The Crowd In This Beautiful Mink Jacket, It Has Gold Buttons To The Front, Shoulders and Cuffs To Give That Military Look. \n100% Real Mink fur jacket\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours. \nMade of female Saga mink fur pelts.\nBroach Can Be Added On As A Custom Order ❤️\nAvailable in different sizes, colours and lengths.\nA Timeless Classic 🥰\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is stranded and is available in all colours, lengths, sizes and with or without a hood.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink fur jacket",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Made of female Saga mink fur pelts."
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "the-barbie-coat-1",
    "title": "The Barbie Coat - Brown",
    "vendor": "ladies mink Jacket",
    "price": 750,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "mink-pieces"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "the-barbie-coat-1-1",
      "the-barbie-coat-1-2",
      "the-barbie-coat-1-3",
      "the-barbie-coat-1-4"
    ],
    "colors": [
      {
        "name": "Brown"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "Beautiful Mink Coat Made From Mink Pieces This elegant and chic coat has a fluted bottom and a drawstring at the waist.",
    "description": "Beautiful Mink Coat Made From Mink Pieces\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is made from the finest saga mink pieces and is available in all colours, lengths, sizes and with or without a hood.\nThis Coat Can Also Be Made In Kids\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option\n \n THIS COAT IS MADE TO ORDER IT TAKES 10 DAYS",
    "features": [],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "pearl-luxury-mink-fur-coat",
    "title": "“PEARL” LUXURY MINK FUR COAT",
    "vendor": "Marie Minks",
    "price": 1450,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "pearl-luxury-mink-fur-coat-1",
      "pearl-luxury-mink-fur-coat-2",
      "pearl-luxury-mink-fur-coat-3"
    ],
    "colors": [
      {
        "name": "Pearl"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "DETAILS 100% Real Mink fur jacket Concealed side pockets.",
    "description": "DETAILS\n100% Real Mink fur jacket\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nLength 85cm.\nMade of female Saga mink fur pelts.\nAvailable in different sizes, colours and lengths.\nA Timeless Classic 🥰\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is stranded and is available in all colours, lengths, sizes and with or without a hood.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink fur jacket",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Length 85cm.",
      "Made of female Saga mink fur pelts."
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  },
  {
    "slug": "fox-fur-down-coat",
    "title": "Fox Fur Down Coat",
    "vendor": "Marie Minks",
    "price": 250,
    "compareAt": null,
    "badge": null,
    "collections": [
      "kids-fox-fur-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "fox-fur-down-coat-1",
      "fox-fur-down-coat-2",
      "fox-fur-down-coat-3",
      "fox-fur-down-coat-4"
    ],
    "colors": [
      {
        "name": "Red"
      },
      {
        "name": "Camel"
      },
      {
        "name": "Custom Colour"
      }
    ],
    "sizes": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "short": "A padded winter coat for children, trimmed in real fox fur.",
    "description": "A padded winter coat for children, trimmed in real fox fur. Fox fur around the hood with fox fur pom poms, and an elastic belt with a crystal buckle at the waist. The hood and sleeves detach.\nReal fox fur hood trim and pom poms\nDetachable hood and sleeves\nElastic belt with a crystal buckle\nAges 1 to 12\nRed, camel, or any colour on request\nCut and sewn in our own factory in Greece, not bought in. Made to order, so it is made for your child rather than pulled off a shelf.\nIf the colour you want is not in the list, leave a note at the cart and we will make it.\nKlarna and Clearpay are available at the checkout if you would rather spread it.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "Real fox fur hood trim and pom poms",
      "Detachable hood and sleeves",
      "Elastic belt with a crystal buckle",
      "Ages 1 to 12",
      "Red, camel, or any colour on request"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "military-special-childs-mink-jacket",
    "title": "“Military Special” Childs Mink Jacket",
    "vendor": "Marie Minks",
    "price": 850,
    "compareAt": null,
    "badge": null,
    "collections": [
      "childrens-mink-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "military-special-childs-mink-jacket-1",
      "military-special-childs-mink-jacket-2",
      "military-special-childs-mink-jacket-3",
      "military-special-childs-mink-jacket-4",
      "military-special-childs-mink-jacket-5"
    ],
    "colors": [],
    "sizes": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "short": "Stand Out From The Crowd With This Beautiful Mink Coat Made From Mink Pieces, 100% Real Mink Concealed side pockets.",
    "description": "Stand Out From The Crowd With This Beautiful Mink Coat Made From Mink Pieces, \n100% Real Mink\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nMade of female Saga mink pieces.\nAvailable in different sizes, colours and lengths.\nMink Beret with Fox Fur Pom Pom is also available to order to match this coat.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Made of female Saga mink pieces."
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "luxury-mink-fur-coat-1",
    "title": "“ROSA” LUXURY MINK FUR COAT",
    "vendor": "Marie Minks",
    "price": 1550,
    "compareAt": null,
    "badge": "best-seller",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "luxury-mink-fur-coat-1-1",
      "luxury-mink-fur-coat-1-2",
      "luxury-mink-fur-coat-1-3",
      "luxury-mink-fur-coat-1-4",
      "luxury-mink-fur-coat-1-5",
      "luxury-mink-fur-coat-1-6",
      "luxury-mink-fur-coat-1-7",
      "luxury-mink-fur-coat-1-8",
      "luxury-mink-fur-coat-1-9",
      "luxury-mink-fur-coat-1-10",
      "luxury-mink-fur-coat-1-11",
      "luxury-mink-fur-coat-1-12",
      "luxury-mink-fur-coat-1-13"
    ],
    "colors": [
      {
        "name": "Grey"
      },
      {
        "name": "Pastel"
      },
      {
        "name": "Palomino"
      },
      {
        "name": "Silver"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "DETAILS 100% Real Mink fur jacket Concealed side pockets.",
    "description": "DETAILS\n100% Real Mink fur jacket\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nDrawstring at the waist.\nIt can be made in all colours.\nLength 85cm.\nMade of female Saga mink fur pelts.\nAvailable in different sizes, colours and lengths.\nA Timeless Classic 🥰\nThis elegant and chic coat has a fluted bottom and a drawstring at the waist. The coat is stranded and is available in all colours, lengths, sizes and with or without a hood.\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "100% Real Mink fur jacket",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Drawstring at the waist.",
      "It can be made in all colours.",
      "Length 85cm.",
      "Made of female Saga mink fur pelts."
    ],
    "specs": {},
    "badges": [
      "best-seller",
      "sale"
    ]
  },
  {
    "slug": "kids-fox-fur-gilet",
    "title": "Kids Fox Fur Gilet",
    "vendor": "Marie Minks",
    "price": 300,
    "compareAt": null,
    "badge": null,
    "collections": [
      "kids-fox-fur-coats-jackets"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "kids-fox-fur-gilet-1",
      "kids-fox-fur-gilet-2",
      "kids-fox-fur-gilet-3",
      "kids-fox-fur-gilet-4"
    ],
    "colors": [
      {
        "name": "Beige"
      },
      {
        "name": "Red"
      },
      {
        "name": "Cream"
      },
      {
        "name": "Light Pink"
      },
      {
        "name": "Light Blue"
      },
      {
        "name": "Black"
      }
    ],
    "sizes": [
      "1/2",
      "3/4",
      "5/6",
      "7/8",
      "9/10"
    ],
    "short": "A child's gilet in 100% real fox fur, worked in the vertical style so the fur falls in long lines down the body.",
    "description": "A child's gilet in 100% real fox fur, worked in the vertical style so the fur falls in long lines down the body. Hook and eye fastening, no zip to catch.\n100% real fox fur\nVertical style\nHook and eye fastening\nTrue to size\nDry clean only\nCut and sewn in our own factory in Greece, not bought in. Made to order, so it is made for your child rather than pulled off a shelf.\nIf the colour you want is not in the list, leave a note at the cart and we will make it.\nKlarna and Clearpay are available at the checkout if you would rather spread it.\nEvery order leaves in the Marie Minks red box with its matching carrier, tracked and signed for.",
    "features": [
      "100% real fox fur",
      "Vertical style",
      "Hook and eye fastening",
      "True to size",
      "Dry clean only"
    ],
    "specs": {},
    "badges": []
  },
  {
    "slug": "luxury-mink-fur-coat-with-fox-hood",
    "title": "THE NAOMI MINK FUR COAT WITH FOX HOOD",
    "vendor": "Marie Minks",
    "price": 1450,
    "compareAt": null,
    "badge": "sale",
    "collections": [
      "luxury-mink-coats"
    ],
    "stock": "in",
    "rating": null,
    "reviews": null,
    "images": [
      "luxury-mink-fur-coat-with-fox-hood-1",
      "luxury-mink-fur-coat-with-fox-hood-2",
      "luxury-mink-fur-coat-with-fox-hood-3",
      "luxury-mink-fur-coat-with-fox-hood-4",
      "luxury-mink-fur-coat-with-fox-hood-5",
      "luxury-mink-fur-coat-with-fox-hood-6",
      "luxury-mink-fur-coat-with-fox-hood-7",
      "luxury-mink-fur-coat-with-fox-hood-8",
      "luxury-mink-fur-coat-with-fox-hood-9",
      "luxury-mink-fur-coat-with-fox-hood-10",
      "luxury-mink-fur-coat-with-fox-hood-11",
      "luxury-mink-fur-coat-with-fox-hood-12",
      "luxury-mink-fur-coat-with-fox-hood-13",
      "luxury-mink-fur-coat-with-fox-hood-14",
      "luxury-mink-fur-coat-with-fox-hood-15",
      "luxury-mink-fur-coat-with-fox-hood-16",
      "luxury-mink-fur-coat-with-fox-hood-17",
      "luxury-mink-fur-coat-with-fox-hood-18",
      "luxury-mink-fur-coat-with-fox-hood-19",
      "luxury-mink-fur-coat-with-fox-hood-20",
      "luxury-mink-fur-coat-with-fox-hood-21"
    ],
    "colors": [
      {
        "name": "Grey"
      },
      {
        "name": "Electric Blue"
      },
      {
        "name": "Beige"
      },
      {
        "name": "White"
      },
      {
        "name": "Sable"
      },
      {
        "name": "Black"
      },
      {
        "name": "Dark Brown"
      },
      {
        "name": "Light Blue"
      },
      {
        "name": "Navy Blue"
      },
      {
        "name": "Red"
      }
    ],
    "sizes": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "short": "DETAILS Mink fur jacket with fox hood and cuffs.",
    "description": "DETAILS\nMink fur jacket with fox hood and cuffs.\nConcealed side pockets.\nHook and eye closure.\nFront closure.\nHorizontal layered design.\nIt can be made in all colours.\nLength 85cm.\nMade of female Saga mink fur pelts.\nAvailable in different sizes, colours and lengths\nA Timeless Classic 🥰🥰\nPlease leave a note at the cart for custom orders or for another colour which isn't available as an option.",
    "features": [
      "Mink fur jacket with fox hood and cuffs.",
      "Concealed side pockets.",
      "Hook and eye closure.",
      "Front closure.",
      "Horizontal layered design.",
      "It can be made in all colours.",
      "Length 85cm.",
      "Made of female Saga mink fur pelts."
    ],
    "specs": {},
    "badges": [
      "sale"
    ]
  }
]
;
;
;
;
;
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
  "Made to order · up to 15 days production",
  "Price match on the same quality furs · <a href=\"tel:+447723143962\">WhatsApp +44 7723 143962</a>",
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