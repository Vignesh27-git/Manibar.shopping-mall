// Initialize cart as an empty array
let cart = [];

// Function to update the cart count display
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}

// Function to add an item to the cart
function addToCart(name, price, image) {
    price = parseFloat(price); // Ensure price is a number
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
        cart.push({ name, price, quantity: 1, image }); // Add new item, including the image URL
    }
    alert(`${name} has been added to the cart!`);
    updateCartCount(); // Update cart count display
}

// Function to update the cart count and total price dynamically
function updateCart() {
  updateCartCount();
  displayCart();
}

// Function to increase or decrease item quantity
function updateItemQuantity(name, operation) {
  const item = cart.find(product => product.name === name);
  if (item) {
      if (operation === 'increase') {
          item.quantity += 1;
      } else if (operation === 'decrease') {
          item.quantity -= 1;
          if (item.quantity <= 0) {
              // Remove item from the cart if quantity becomes 0
              cart = cart.filter(product => product.name !== name);
          }
      }
  }
  updateCart(); // Re-render the cart modal
}


// Function to display cart items in the cart modal
function displayCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Clear existing items
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = '';
    } else {
        // Display each item in the cart
        let totalPrice = 0;
        cart.forEach(item => {
            const li = document.createElement('li');

            // Create a container for the item
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('cart-item-container');

            // Add product image
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.classList.add('cart-item-image');
            itemContainer.appendChild(img);

            // Add product details (name, price, quantity)
            const details = document.createElement('div');
            details.innerHTML = `
                <p><strong>${item.name}</strong></p>
                <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
            `;
            itemContainer.appendChild(details);

            // Append the container to the list item
            li.appendChild(itemContainer);
            cartItems.appendChild(li);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: ₹${totalPrice.toFixed(2)}`;
    }

    cartModal.style.display = 'block'; // Show the cart modal
}

// Function to open the cart
function openCart() {
    displayCart();
}

// Function to close the cart
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Attach event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        const productImage = button.getAttribute('data-image'); // Get the image URL
        addToCart(productName, productPrice, productImage);
    });
});

// Open the cart when the cart icon is clicked
document.querySelector('.cart').addEventListener('click', openCart);

// ==========================
// SLIDESHOW FUNCTIONALITY
// ==========================

let slideIndex = 0;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Function to show slides
function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return; // Prevent errors if no slides exist

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.display = 'none';
        if (dots[i]) dots[i].classList.remove('active-dot');
    });

    slides[slideIndex].style.display = 'block';
    if (dots[slideIndex]) dots[slideIndex].classList.add('active-dot');
}

// Auto-play slides every 5 seconds
setInterval(() => plusSlides(1), 5000);

// ==========================
// CATEGORY FILTER FUNCTIONALITY
// ==========================

// Function to filter products by category
function showCategory(category) {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        product.style.display = productCategory === category ? 'block' : 'none';
    });
}

// Attach event listeners to category links
document.querySelectorAll('a[data-category]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); // Prevent page reload
        const category = event.target.getAttribute('data-category');
        showCategory(category);
    });
});

// Optionally, show a default category on page load
showCategory('menswear');
