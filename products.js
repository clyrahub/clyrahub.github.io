/* =====================================================
   CLYRA – STORE SETTINGS & PRODUCTS
   ===================================================== */

const CLYRA_CONFIG = {
   
  whatsappNumber: "919074847819",

  instagram: "",

  currency: "₹",

  // Message customers send. {name} {price} {category} {link} are filled in automatically
  messageTemplate:
    "Hi Clyra! 👋 I'm interested in this item:\n\n" +
    "*{name}*\nPrice: {price}\nCategory: {category}\n\n" +
    "Link: {link}\n\nIs it available?",
};


const PRODUCTS = [
  {
    id: "rose-pearl-earrings",
    name: "Rose Pearl Drop Earrings",
    price: 249,
    category: "Earrings",
    description: "Lightweight pearl drops with a soft rose finish. Perfect for daily wear and parties.",
    images: ["images/Drop earrings.jpg"],
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
    images: ["images/Butterfly Charm Bracelet.jpg"],
    isNew: false,
    soldOut: false,
  },
  {
    id: "silver-anklet",
    name: "Silver Beaded Anklet",
    price: 149,
    category: "Anklets",
    description: "Light and comfy beaded anklet with a tiny bell.",
    images: ["images/Silver Beaded Anklet.jpg"],
    isNew: false,
    soldOut: true,
  },
  {
    id: "pearl-hair-clip",
    name: "Pearl Hair Clip Set (3 pcs)",
    price: 199,
    category: "Hair Accessories",
    description: "Set of three pearl clips in different sizes. Great for everyday hairstyles.",
    images: ["images/Pearl Hair Clip Set (3 pcs).jpg"],
    isNew: true,
    soldOut: false,
  },
];
