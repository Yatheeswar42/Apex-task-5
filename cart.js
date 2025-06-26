const products = [
  { id: 1, name: "Wireless Headphones", price: 1999, image: "../images/product-1.png" },
  { id: 2, name: "Smart Watch", price: 2999, image: "../images/product-2.webp" },
  { id: 3, name: "Bluetooth Speaker", price: 1499, image: "../images/product-3.webp" },
  { id: 4, name: "Laptop Stand", price: 799, image: "../images/product-4.webp" },
  { id: 5, name: "USB-C Hub", price: 999, image: "../images/product-5.png" },
  { id: 6, name: "Gaming Mouse", price: 1299, image: "../images/product-6.jpg" },
  { id: 7, name: "Mechanical Keyboard", price: 2499, image: "../images/product-7.webp" },
  { id: 8, name: "Noise Cancelling Earbuds", price: 3499, image: "../images/product-8.jpeg" },
  { id: 9, name: "Portable SSD 500GB", price: 3999, image: "../images/product-9.webp" },
  { id: 10, name: "Smart Home Plug", price: 899, image: "../images/product-10.webp" }
];




// Utility functions
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render cart items
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cart = getCart();
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "0";
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return ""; // Avoid error if product not found
    const itemTotal = product.price * item.quantity;
    total += itemTotal;
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" />
        <div class="cart-details">
          <h3>${product.name}</h3>
          <p>Total: ₹${itemTotal}</p>

          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
          <button onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById("cart-total").textContent = total;
}

function updateQuantity(id, qty) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity = parseInt(qty);
    saveCart(cart);
    renderCart();
  }
}

function removeItem(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
}

// Initial render
renderCart();
