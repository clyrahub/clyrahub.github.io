# Clyra – Jewellery Website

A simple, fast jewellery catalogue. Customers browse, tap **Order on WhatsApp**, and the chat opens with the item's name, price, category and link already filled in. No login, no server, no database.



## Adding a product

1. Put the photo in the `images/` folder (square photos look best, under ~300 KB).
2. Open `products.js`, copy one product block, paste it at the end of the list, and edit it:

```js
{
  id: "my-new-item",            // unique, lowercase, dashes only
  name: "Pearl Hoop Earrings",
  price: 220,
  category: "Earrings",         // new category names appear automatically
  description: "Short description here.",
  images: ["images/pearl-hoops.jpg", "images/pearl-hoops-2.jpg"],
  isNew: true,                  // shows a "New" badge
  soldOut: false,               // true = shows "Sold out", button disabled
},
```

## Removing / editing a product

- **Remove:** delete the whole `{ ... },` block.
- **Mark sold out:** change `soldOut: false` to `soldOut: true`.
- **Change price:** edit the `price` number.

Photos missing? The site shows a pretty placeholder with the first letter, so nothing breaks.



## Files

| File | Purpose |
|------|---------|
| `products.js` | Your settings and all products (edit this) |
| `images/` | Product photos |
| `index.html` | Page structure |
| `style.css` | Colours and layout |
| `app.js` | Site logic (no need to touch) |
