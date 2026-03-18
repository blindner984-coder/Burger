const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const menuPath = path.join(__dirname, "..", "data", "menu.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

function loadMenu() {
  const raw = fs.readFileSync(menuPath, "utf-8");
  return JSON.parse(raw);
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "burger-api" });
});

app.get("/api/menu", (_req, res) => {
  try {
    const menu = loadMenu();
    res.json(menu);
  } catch (error) {
    res.status(500).json({
      error: "Could not load menu",
      details: error.message
    });
  }
});

app.post("/api/order", (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Order must contain at least one item" });
  }

  try {
    const menu = loadMenu();
    const byId = new Map(menu.map((item) => [item.id, item]));

    let total = 0;
    const normalizedItems = [];

    for (const orderItem of items) {
      const qty = Number(orderItem.qty || 1);
      const menuItem = byId.get(orderItem.id);

      if (!menuItem) {
        return res.status(400).json({ error: `Unknown item id: ${orderItem.id}` });
      }

      if (!Number.isFinite(qty) || qty < 1 || !Number.isInteger(qty)) {
        return res.status(400).json({ error: `Invalid quantity for item id: ${orderItem.id}` });
      }

      const lineTotal = menuItem.price * qty;
      total += lineTotal;

      normalizedItems.push({
        id: menuItem.id,
        name: menuItem.name,
        qty,
        price: menuItem.price,
        lineTotal: Number(lineTotal.toFixed(2))
      });
    }

    return res.status(201).json({
      orderId: `ord_${Date.now()}`,
      items: normalizedItems,
      total: Number(total.toFixed(2)),
      currency: "EUR"
    });
  } catch (error) {
    return res.status(500).json({
      error: "Could not process order",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Burger app running at http://localhost:${PORT}`);
});
