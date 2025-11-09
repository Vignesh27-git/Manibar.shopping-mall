// ==========================
// CART FUNCTIONALITY
// ==========================

// Initialize cart as an empty array
let cart = [];

// Update cart count beside icon
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) cartCountElement.innerText = cart.length;
}

// Add item to cart
function addToCart(name, price, image) {
    price = parseFloat(price);
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }

    updateCartCount();
    alert(`${name} added to cart!`);
}

// Increase or decrease quantity
function updateItemQuantity(name, operation) {
    const item = cart.find(product => product.name === name);
    if (!item) return;

    if (operation === 'increase') item.quantity++;
    if (operation === 'decrease') {
        item.quantity--;
        if (item.quantity <= 0) cart = cart.filter(p => p.name !== name);
    }

    displayCart();
    updateCartCount();
}

// Remove product from cart
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    displayCart();
    updateCartCount();
}

// Open Cart Modal
function openCart() {
    displayCart();
    document.getElementById('cart-modal').style.display = 'block';
}

// Close Cart Modal
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Show cart items in modal
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = 'Total: ₹0';
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item-container">
                <img src="${item.image}" class="cart-item-image">
                <div>
                    <p><strong>${item.name}</strong></p>
                    <p>₹${item.price}</p>
                </div>
                <div class="cart-controls">
                    <button class="quantity-btn" onclick="updateItemQuantity('${item.name}', 'decrease')">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateItemQuantity('${item.name}', 'increase')">+</button>
                    <button class="remove-btn" onclick="removeItem('${item.name}')">x</button>
                </div>
            </div>
        `;

        cartItems.appendChild(li);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: ₹${totalPrice}`;
}

// Attach Add-to-Cart Buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        addToCart(
            button.getAttribute('data-name'),
            button.getAttribute('data-price'),
            button.getAttribute('data-image')
        );
    });
});

// Open Cart Icon
document.querySelector('.cart').addEventListener('click', openCart);


// ==========================
// SLIDESHOW FUNCTIONALITY
// ==========================
let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.display = 'none';
        if (dots[i]) dots[i].classList.remove('active-dot');
    });

    slides[slideIndex].style.display = 'block';
    if (dots[slideIndex]) dots[slideIndex].classList.add('active-dot');
}

setInterval(() => plusSlides(1), 5000);


// ==========================
// DRAWER MENU FUNCTIONALITY
// ==========================
const menuBtn = document.getElementById('menu-btn');
const drawerMenu = document.getElementById('drawer-menu');
const drawerOverlay = document.getElementById('drawer-overlay');

menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    drawerMenu.classList.add("open");
    drawerOverlay.classList.add("show");
});

drawerOverlay.addEventListener('click', () => {
    drawerMenu.classList.remove("open");
    drawerOverlay.classList.remove("show");
});
