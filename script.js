const products = [
  { id: 1, name: "Wireless Headphones", price: 1999, image: "images/product-1.png" },
  { id: 2, name: "Smart Watch", price: 2999, image: "images/product-2.webp" },
  { id: 3, name: "Bluetooth Speaker", price: 1499, image: "images/product-3.webp" },
  { id: 4, name: "Laptop Stand", price: 799, image: "images/product-4.webp" },
  { id: 5, name: "USB-C Hub", price: 999, image: "images/product-5.png" },
  { id: 6, name: "Gaming Mouse", price: 1299, image: "images/product-6.jpg" },
  { id: 7, name: "Mechanical Keyboard", price: 2499, image: "images/product-7.webp" },
  { id: 8, name: "Noise Cancelling Earbuds", price: 3499, image: "images/product-8.jpeg" },
  { id: 9, name: "Portable SSD 500GB", price: 3999, image: "images/product-9.webp" },
  { id: 10, name: "Smart Home Plug", price: 899, image: "images/product-10.webp" }
];



// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(productId) {
  let cart = getCart();
  const item = cart.find(product => product.id === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  showModal("✅ Product added to cart!");



}

// Render products if product-list section exists
function renderProducts(filterText = "") {
  const productList = document.querySelector(".product-list");
  if (!productList) return;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    productList.innerHTML = "<p style='text-align:center;'>No products found.</p>";
    return;
  }

  productList.innerHTML = filteredProducts.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}


// Call render
renderProducts();
// Initial render
renderProducts();

// Listen for search input
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    renderProducts(searchInput.value);
  });
}
function showModal(message) {
  // Remove any existing modal
  const existing = document.getElementById("custom-modal");
  if (existing) existing.remove();

  // Create modal structure
  const modal = document.createElement("div");
  modal.id = "custom-modal";
  modal.innerHTML = `
    <div class="modal-content animated">
      <span class="close-btn" id="closeModal">&times;</span>
      <p>${message}</p>
      <button id="okBtn">OK</button>
    </div>
  `;
  document.body.appendChild(modal);

  // Disable background scroll
  document.body.style.overflow = "hidden";

  // Close on button click or after 3s
  document.getElementById("closeModal").onclick = closeModal;
  document.getElementById("okBtn").onclick = closeModal;

  function closeModal() {
    modal.classList.remove("animated");
    modal.classList.add("fade-out");
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = "auto"; // restore scroll
    }, 300);
  }

  // Auto close after 3s if user doesn’t interact
  setTimeout(() => closeModal(), 3000);
}


