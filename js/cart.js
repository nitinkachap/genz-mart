// Cart System
let cart = [];

// Load cart from localStorage
function loadCart() {
    const saved = localStorage.getItem('genzCart');
    if (saved) {
        cart = JSON.parse(saved);
    }
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('genzCart', JSON.stringify(cart));
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showToast(`✨ ${product.name} added to cart`);
    animateCartIcon();
}

// Update quantity
function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }
    saveCart();
    updateCartUI();
}

// Remove item
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showToast(`❌ Item removed`);
}

// Get cart total
function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Get total items count
function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Update all cart UI
function updateCartUI() {
    // Update cart count badge
    const count = getCartCount();
    document.getElementById('cartCount').textContent = count;
    
    // Update cart items list
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">🛍️ Your cart is empty<br>Add some heat!</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total price
    document.getElementById('cartTotalPrice').textContent = `$${getCartTotal().toFixed(2)}`;
}

// Animate cart icon
function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.classList.add('cart-bump');
    setTimeout(() => cartIcon.classList.remove('cart-bump'), 300);
}

// Show toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}