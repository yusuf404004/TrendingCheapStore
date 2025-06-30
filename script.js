let cart = [];
let allProducts = [];

async function loadProducts() {
  const res = await fetch('products.json');
  const products = await res.json();
  allProducts = products;
  displayProducts(products);
}

function displayProducts(products) {
  const list = document.getElementById('productList');
  list.innerHTML = '';
  products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'product';
    item.innerHTML = `
      <img src="${product.img}" alt="${product.name}" width="100%">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    list.appendChild(item);
  });
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const total = document.getElementById('totalPrice');
  cartItems.innerHTML = '';
  let totalPrice = 0;

  cart.forEach(item => {
    const product = allProducts.find(p => p.id === item.id);
    totalPrice += product.price * item.qty;
    const li = document.createElement('li');
    li.textContent = `${product.name} x${item.qty} - $${product.price * item.qty}`;
    cartItems.appendChild(li);
  });

  total.textContent = totalPrice.toFixed(2);
}

function filterProducts(category) {
  if (category === 'all') {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

document.getElementById('menuBtn').onclick = () => {
  document.getElementById('sidebar').classList.toggle('hidden');
};

document.getElementById('cartBtn').onclick = () => {
  document.getElementById('cart').classList.toggle('hidden');
};

window.onload = loadProducts;
