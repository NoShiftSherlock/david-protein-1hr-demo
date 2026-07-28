/* David × Vesper Commerce — 1-hour delivery mockup interactions */

// ---------- Product catalog (homepage grid) ----------
const PRODUCTS = [
  { line:"Gold",   name:"Chocolate Chip Cookie Dough", img:"assets/bar-cccd.png",       cal:150, protein:"28g", sugar:"0g", price:"$39.00", status:"Best seller", rating:"4.7 · 1,913" },
  { line:"Bronze", name:"Cookie Dough Caramel Chocolate", img:"assets/bar-bronze-cd.png", cal:150, protein:"20g", sugar:"0g", price:"$39.00", status:"Best seller", rating:"4.3 · 773" },
  { line:"Gold",   name:"Blueberry Pie", img:"assets/bar-blueberry.png",                 cal:150, protein:"28g", sugar:"0g", price:"$39.00", status:"Back in stock", rating:"4.7 · 1,400" },
  { line:"Gold",   name:"Peanut Butter Chocolate Chunk", img:"assets/bar-pbcc.png",      cal:150, protein:"28g", sugar:"0g", price:"$39.00", status:"", rating:"4.6 · 1,618" },
  { line:"Bronze", name:"Peanut Butter Chocolate", img:"assets/bar-bronze-pb.png",       cal:150, protein:"20g", sugar:"0g", price:"$39.00", status:"", rating:"4.4 · 891" },
  { line:"Bronze", name:"Double Chocolate", img:"assets/bar-double-choc.png",            cal:150, protein:"20g", sugar:"0g", price:"$39.00", status:"", rating:"4.5 · 847" },
  { line:"Gold",   name:"Fudge Brownie", img:"assets/bar-fudge.png",                     cal:150, protein:"28g", sugar:"0g", price:"$39.00", status:"", rating:"4.6 · 612" },
  { line:"Gold",   name:"Salted Peanut Butter", img:"assets/bar-salted-pb.png",          cal:150, protein:"28g", sugar:"0g", price:"$39.00", status:"", rating:"4.5 · 540" },
  { line:"Cod",    name:"Wild Caught Atlantic Cod", img:"assets/bar-cod.png",            cal:70,  protein:"18g", sugar:"0g", price:"$39.00", status:"New", rating:"4.9 · 17" },
];

function cardHTML(p) {
  const lineClass = p.line.toLowerCase() === "bronze" ? "bronze" : (p.line.toLowerCase()==="cod" ? "gold" : "gold");
  const statusTag = p.status ? `<span class="tag status">${p.status}</span>` : "";
  return `
  <a class="card" href="product.html">
    <div class="thumb">
      <div class="badges">
        <span class="tag line ${lineClass}"><span class="dot"></span> ${p.line}</span>
        ${statusTag}
        <span class="tag onehr">⚡ 1-hr</span>
      </div>
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
    </div>
    <div class="body">
      <div class="line-label">${p.line}</div>
      <h3>${p.name}</h3>
      <div class="stats"><span><b>${p.cal}</b> cal</span><span><b>${p.protein}</b> protein</span><span><b>${p.sugar}</b> sugar</span></div>
      <div class="rating">★ ${p.rating} reviews</div>
      <div class="foot">
        <span class="price">${p.price}</span>
        <button class="add" onclick="event.preventDefault();addToCart()">Add</button>
      </div>
    </div>
  </a>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("prodGrid");
  if (grid) grid.innerHTML = PRODUCTS.map(cardHTML).join("");
  // restore cart count
  const c = sessionStorage.getItem("cartCount");
  if (c) setCartCount(parseInt(c, 10));
});

// ---------- Cart ----------
function setCartCount(n) {
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = n);
  sessionStorage.setItem("cartCount", n);
}
function addToCart() {
  const el = document.querySelector(".cart-count");
  const n = (el ? parseInt(el.textContent, 10) : 0) + 1;
  setCartCount(n);
  toast("Added to cart · eligible for 1-hour delivery ⚡");
}

// ---------- Homepage address availability ----------
function checkAvailability() {
  const box = document.getElementById("availResult");
  if (box) box.classList.add("show");
}

// ---------- PDP: purchase modes ----------
function setMode(mode) {
  document.querySelectorAll(".buy-mode").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  const isOneHr = mode === "onehr";
  const mod = document.getElementById("onehrModule");
  const stdBenefits = document.getElementById("stdBenefits");
  const stdBuyRow = document.getElementById("stdBuyRow");
  if (mod) mod.style.display = isOneHr ? "block" : "none";
  if (stdBenefits) stdBenefits.style.display = isOneHr ? "none" : "grid";
  if (stdBuyRow) stdBuyRow.style.display = isOneHr ? "none" : "flex";
  const addBtn = document.getElementById("addBtn");
  if (addBtn && !isOneHr) {
    addBtn.textContent = mode === "subscribe" ? "Subscribe — $35.10" : "Add to cart — $39.00";
  }
}
function pdpCheck() {
  const a = document.getElementById("pdpAvail");
  if (a) a.style.display = "block";
}
let q = 1;
function qty(d) {
  q = Math.max(1, q + d);
  const el = document.getElementById("qtyVal");
  if (el) el.textContent = q;
}

// ---------- Checkout: shipping method ----------
function pickShip(el) {
  document.querySelectorAll(".ship-opt").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
  const cost = parseFloat(el.dataset.cost);
  const subtotal = 27.98, tax = 2.48;
  const total = subtotal + cost + tax;
  const shipEl = document.getElementById("coShip");
  const totalEl = document.getElementById("coTotal");
  const label = el.querySelector(".n").textContent.includes("Standard") ? "Standard shipping" : "One-hour delivery";
  if (shipEl) { shipEl.textContent = "$" + cost.toFixed(2); shipEl.previousElementSibling.textContent = label; }
  if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
}
function placeOrder() {
  toast("Order placed ⚡ Routing to nearest store — arriving in ~52 min");
}

// ---------- tiny toast ----------
function toast(msg) {
  let t = document.getElementById("__toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "__toast";
    t.style.cssText = "position:fixed;left:50%;bottom:70px;transform:translateX(-50%);background:#0a0a0a;color:#fff;padding:13px 22px;border-radius:999px;font-family:'Space Mono',monospace;font-size:13px;z-index:200;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:opacity .25s ease;";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  clearTimeout(t._h);
  t._h = setTimeout(() => { t.style.opacity = "0"; }, 2600);
}
