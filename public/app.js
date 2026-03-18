const menuContainer = document.getElementById("menu");
const orderForm = document.getElementById("order-form");
const result = document.getElementById("result");

async function loadMenu() {
  try {
    const response = await fetch("/api/menu");
    if (!response.ok) {
      throw new Error(`Menu request failed with status ${response.status}`);
    }

    const menu = await response.json();
    menuContainer.innerHTML = "";

    for (const item of menu) {
      const card = document.createElement("article");
      card.className = "menu-card";
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>ID:</strong> ${item.id}</p>
        <p class="price">${item.price.toFixed(2)} EUR</p>
      `;
      menuContainer.appendChild(card);
    }
  } catch (error) {
    result.textContent = `Fehler beim Laden des Menues: ${error.message}`;
  }
}

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = document.getElementById("item-id").value.trim();
  const qty = Number(document.getElementById("item-qty").value);

  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: [{ id, qty }]
      })
    });

    const payload = await response.json();
    result.textContent = JSON.stringify(payload, null, 2);
  } catch (error) {
    result.textContent = `Bestellung fehlgeschlagen: ${error.message}`;
  }
});

loadMenu();
