/* =====================================================
   CLYRA – STORE SETTINGS & PRODUCTS
   This is the ONLY file you need to edit to manage the shop.
   ===================================================== */

const CLYRA_CONFIG = {
  // Your WhatsApp number: country code + number, NO "+", spaces or dashes.
  // Example for India: 919876543210
  whatsappNumber: "919074847819",

  // Optional: put your Instagram link, or leave "" to hide it
  instagram: "https://instagram.com",

  currency: "₹",

  // Message customers send. {name} {price} {category} {link} are filled in automatically
  messageTemplate:
    "Hi Clyra! 👋 I'm interested in this item:\n\n" +
    "*{name}*\nPrice: {price}\nCategory: {category}\n\n" +
    "Link: {link}\n\nIs it available?",
};

/* -----------------------------------------------------
   HOW TO ADD A PRODUCT
   1. Put the photo(s) in the "images" folder
   2. Copy one block below, paste it at the end of the list, and change the details
   3. "id" must be unique, lowercase, no spaces (use dashes)
   - soldOut: true  -> shows a "Sold out" badge, order button disabled
   - isNew: true    -> shows a "New" badge
   HOW TO REMOVE: delete the whole { ... }, block.
   ----------------------------------------------------- */

const PRODUCTS = [
  {
    id: "rose-pearl-earrings",
    name: "Rose Pearl Drop Earrings",
    price: 249,
    category: "Earrings",
    description: "Lightweight pearl drops with a soft rose finish. Perfect for daily wear and parties.",
    images: ["images/rose-pearl-earrings.jpg"],
    isNew: true,
    soldOut: false,
  },
  {
    id: "moon-star-necklace",
    name: "Moon & Star Necklace",
    price: 399,
    category: "Necklaces",
    description: "Dainty chain with a crescent moon and star pendant. Skin-friendly and tarnish resistant.",
    images: ["images/Moon star necklace.jpg"],
    isNew: true,
    soldOut: false,
  },
  {
    id: "twisted-gold-ring",
    name: "Twisted Gold-Tone Ring",
    price: 179,
    category: "Rings",
    description: "Adjustable twisted band ring that fits most sizes.",
    images: ["images/Twisted Gold-Tone Ring.jpg"],
    isNew: false,
    soldOut: false,
  },
  {
    id: "charm-bracelet",
    name: "Butterfly Charm Bracelet",
    price: 299,
    category: "Bracelets",
    description: "Delicate bracelet with tiny butterfly charms and an adjustable clasp.",
    images: ["images/charm-bracelet.jpg"],
    isNew: false,
    soldOut: false,
  },
  {
    id: "silver-anklet",
    name: "Silver Beaded Anklet",
    price: 149,
    category: "Anklets",
    description: "Light and comfy beaded anklet with a tiny bell.",
    images: ["images/silver-anklet.jpg"],
    isNew: false,
    soldOut: true,
  },
  {
    id: "pearl-hair-clip",
    name: "Pearl Hair Clip Set (3 pcs)",
    price: 199,
    category: "Hair Accessories",
    description: "Set of three pearl clips in different sizes. Great for everyday hairstyles.",
    images: ["images/pearl-hair-clip.jpg"],
    isNew: true,
    soldOut: false,
  },
];
