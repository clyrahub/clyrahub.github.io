(function () {
  "use strict";

  const cfg = CLYRA_CONFIG;
  const items = PRODUCTS;

  const $ = (id) => document.getElementById(id);
  const grid = $("grid"), chips = $("chips"), search = $("search"), sort = $("sort");
  const count = $("count"), empty = $("empty"), modal = $("modal");

  let activeCat = "All";

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const money = (n) => cfg.currency + Number(n).toLocaleString("en-IN");

  // Link that opens straight to one item (works on GitHub Pages)
  const itemLink = (p) => location.origin + location.pathname + "#" + p.id;

  function waLink(p) {
    const msg = cfg.messageTemplate
      .replace("{name}", p.name)
      .replace("{price}", money(p.price))
      .replace("{category}", p.category)
      .replace("{link}", itemLink(p));
    return "https://wa.me/" + cfg.whatsappNumber + "?text=" + encodeURIComponent(msg);
  }

  function generalWaLink() {
    return "https://wa.me/" + cfg.whatsappNumber + "?text=" + encodeURIComponent("Hi Clyra! 👋 I have a question.");
  }

  // Image with a pretty fallback if the photo is missing
  function imgHTML(src, p, cls) {
    const letter = esc(p.name.charAt(0).toUpperCase());
    if (!src) return `<div class="ph ${cls || ""}">${letter}</div>`;
    return `<img src="${esc(src)}" alt="${esc(p.name)}" loading="lazy" class="${cls || ""}"
      onerror="this.outerHTML='<div class=&quot;ph&quot;>${letter}</div>'" />`;
  }

  /* ---------- categories ---------- */
  function renderChips() {
    const cats = ["All", ...new Set(items.map((p) => p.category))];
    chips.innerHTML = cats
      .map((c) => `<button class="chip ${c === activeCat ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
      .join("");
  }

  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    activeCat = b.dataset.cat;
    renderChips();
    renderGrid();
  });

  /* ---------- grid ---------- */
  function filtered() {
    const q = search.value.trim().toLowerCase();
    let list = items.filter(
      (p) =>
        (activeCat === "All" || p.category === activeCat) &&
        (!q || (p.name + " " + p.category + " " + (p.description || "")).toLowerCase().includes(q))
    );
    if (sort.value === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort.value === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }

  function renderGrid() {
    const list = filtered();
    count.textContent = list.length + (list.length === 1 ? " item" : " items");
    empty.hidden = list.length > 0;

    grid.innerHTML = list
      .map(
        (p) => `
      <article class="card ${p.soldOut ? "is-sold" : ""}" data-id="${esc(p.id)}" tabindex="0">
        <div class="card-img">
          ${imgHTML(p.images && p.images[0], p)}
          ${p.isNew && !p.soldOut ? '<span class="badge">New</span>' : ""}
          ${p.soldOut ? '<span class="badge sold">Sold out</span>' : ""}
        </div>
        <div class="card-body">
          <span class="card-cat">${esc(p.category)}</span>
          <h3 class="card-name">${esc(p.name)}</h3>
          <span class="card-price">${money(p.price)}</span>
          ${
            p.soldOut
              ? '<span class="card-btn disabled">Sold out</span>'
              : `<a class="card-btn" href="${waLink(p)}" target="_blank" rel="noopener" data-wa>Order on WhatsApp</a>`
          }
        </div>
      </article>`
      )
      .join("");
  }

  grid.addEventListener("click", (e) => {
    if (e.target.closest("[data-wa]")) return; // let the WhatsApp link work
    const card = e.target.closest(".card");
    if (card) openModal(card.dataset.id);
  });
  grid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.classList.contains("card")) openModal(e.target.dataset.id);
  });

  search.addEventListener("input", renderGrid);
  sort.addEventListener("change", renderGrid);

  /* ---------- modal ---------- */
  function showImage(p, idx) {
    $("mMain").innerHTML = imgHTML(p.images && p.images[idx], p);
    [...$("mThumbs").children].forEach((t, i) => t.classList.toggle("active", i === idx));
  }

  function openModal(id, fromHash) {
    const p = items.find((x) => x.id === id);
    if (!p) return;

    $("mCat").textContent = p.category;
    $("mName").textContent = p.name;
    $("mPrice").textContent = money(p.price);
    $("mDesc").textContent = p.description || "";

    const imgs = p.images && p.images.length ? p.images : [""];
    $("mThumbs").innerHTML = imgs.length > 1 ? imgs.map((src) => imgHTML(src, p)).join("") : "";
    [...$("mThumbs").children].forEach((t, i) => t.addEventListener("click", () => showImage(p, i)));
    showImage(p, 0);

    const wa = $("mWa");
    if (p.soldOut) {
      wa.classList.add("disabled");
      wa.removeAttribute("href");
      $("mWaText").textContent = "Sold out";
    } else {
      wa.classList.remove("disabled");
      wa.href = waLink(p);
      $("mWaText").textContent = "Order on WhatsApp";
    }

    $("mCopy").textContent = "Copy item link";
    $("mCopy").onclick = () => {
      const done = () => ($("mCopy").textContent = "Link copied ✓");
      if (navigator.clipboard) navigator.clipboard.writeText(itemLink(p)).then(done);
      else done();
    };

    modal.hidden = false;
    document.body.classList.add("lock");
    if (!fromHash) history.replaceState(null, "", "#" + p.id);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("lock");
    history.replaceState(null, "", location.pathname + location.search);
  }

  modal.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // Open an item directly from a shared link like  .../#rose-pearl-earrings
  function checkHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && items.some((p) => p.id === id)) openModal(id, true);
  }
  window.addEventListener("hashchange", () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (items.some((p) => p.id === id)) openModal(id, true);
  });

  /* ---------- init ---------- */
  $("topWa").href = generalWaLink();
  $("footWa").href = generalWaLink();
  if (cfg.instagram) {
    $("footIg").href = cfg.instagram;
    $("footIg").hidden = false;
  }
  $("year").textContent = new Date().getFullYear();

  renderChips();
  renderGrid();
  checkHash();
})();
