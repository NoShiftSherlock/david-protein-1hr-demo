# David × Vesper Commerce — 1-Hour Delivery Mockup

A concept/demo site showing how **one-hour delivery** (powered by GoPuff + DoorDash, acting as a delivery 3PL) could work **natively inside davidprotein.com**.

Built by AccelPay / Vesper Commerce for a sales conversation with David Protein.

## Pages
- **index.html** — Homepage. David's real look & feel + a signature "Need it now? Get David in under an hour" band with a live address check, a customer-facing "How it works", and ⚡ 1-hr tags across the product grid.
- **product.html** — Product detail page (Chocolate Chip Cookie Dough) with a third purchase option — **⚡ 1-Hour Delivery** — that reveals an address check and delivery-only small formats (single bar / 4-pack).
- **checkout.html** — Shopify-style checkout with the delivery-method selector (1-Hour Delivery via DoorDash/GoPuff selected by default vs. Standard shipping) and the "order stays in your Shopify OMS" reassurance.

## Design notes
- Replicates David's design system: **Instrument Serif** display + **Inter** body (Suisse substitute), black/white palette, pill buttons, off-white product panels, and their nav/footer.
- Product photography and logos are David's own assets (in `assets/`) for demo fidelity.
- 1-hour delivery components (GoPuff/DoorDash chips, address module, delivery method) are the AccelPay additions — kept in David's native style so they read as "already part of the site."

## Disclaimer
This is a **non-commercial sales mockup**, not affiliated with or endorsed by David Protein, GoPuff, or DoorDash. All David trademarks and imagery belong to David Protein. A small "Vesper Commerce demo" ribbon is shown on each page.

## Run locally
Just open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```
