const products = [
  {
    id: 1,
    name: "Barcelona Jersey",
    price: 49.99,
    image: "https://m.media-amazon.com/images/I/61yZC9IvZWL._AC_UL1500_.jpg"
  },
  {
    id: 2,
    name: "V-Bucks 2800",
    price: 19.99,
    image: "https://cdn2.unrealengine.com/fortnite-v-bucks-2800-1920x1080-d3cbbf69cc9f.jpg"
  }
];

let cart = [];

function renderProducts() {
  const list = document.getElementById("productList");
  products.forEach(p => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    list.appendChild(item);
  });
}

function addToCart(id) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("totalPrice");
  const count = document.getElementById("cartCount");
  cartItems.innerHTML = "";
  let totalPrice = 0;
  let totalCount = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.qty;
    totalCount += item.qty;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      ${item.name} - $${(item.price * item.qty).toFixed(2)}
      <div>
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <input type="number" min="1" value="${item.qty}" onchange="setQty(${item.id}, this.value)" />
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button onclick="removeItem(${item.id})">🗑️</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  total.textContent = totalPrice.toFixed(2);
  count.textContent = totalCount;
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeItem(id);
  updateCart();
}

function setQty(id, qty) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = parseInt(qty) || 1;
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

function closeCart() {
  document.getElementById("cart").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
}

document.getElementById("cartBtn").onclick = () => {
  document.getElementById("cart").classList.remove("hidden");
  document.getElementById("overlay").classList.remove("hidden");
};

window.onload = renderProducts;
