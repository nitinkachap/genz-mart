// Render products grid
function renderProducts(filterCategory = 'all') {
    const grid = document.getElementById('productsGrid');
    
    const filtered = filterCategory === 'all' 
        ? products 
        : products.filter(p => p.category === filterCategory);
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card glass" data-id="${product.id}">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <i class="fas fa-star" style="color: #F59E0B; font-size: 0.8rem;"></i>
                    <span>${product.rating} ★</span>
                    <span style="color: #64748B;">(${product.reviews})</span>
                </div>
                <div class="price-row">
                    <span class="price">₹${product.price.toFixed(2)}</span>
                </div>
                <button class="btn-add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-bag"></i> ADD TO CART
                </button>
            </div>
        </div>
    `).join('');
    
    // Attach event listeners to new buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

// Category filter logic
function initFilters() {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const category = chip.dataset.category;
            renderProducts(category);
        });
    });
}

// Cart sidebar logic
function initCartSidebar() {
    const cartIcon = document.getElementById('cartIcon');
    const overlay = document.getElementById('cartOverlay');
    const closeBtn = document.getElementById('closeCartBtn');
    
    cartIcon.addEventListener('click', () => {
        overlay.classList.add('open');
    });
    
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('open');
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('open');
        }
    });
}

// Shop now button
function initShopNow() {
    const shopBtn = document.getElementById('shopNowBtn');
    if (shopBtn) {
        shopBtn.addEventListener('click', () => {
            document.querySelector('.products-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts();
    initFilters();
    initCartSidebar();
    initShopNow();
    
    // Add CSS for product card styles that weren't in main.css
    const style = document.createElement('style');
    style.textContent = `
        .product-card {
            padding: 1rem;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .product-info {
            margin-top: 1rem;
        }
        .product-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.3rem;
        }
        .product-rating {
            font-size: 0.8rem;
            color: #94A3B8;
            margin-bottom: 0.5rem;
        }
        .price-row {
            margin: 0.8rem 0;
        }
        .price {
            font-size: 1.3rem;
            font-weight: 700;
            color: #F59E0B;
        }
        .btn-add-to-cart {
            width: 100%;
            padding: 0.7rem;
            border-radius: 2rem;
            background: rgba(139, 92, 246, 0.2);
            border: 1px solid rgba(139, 92, 246, 0.4);
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .btn-add-to-cart:hover {
            background: #8B5CF6;
            transform: scale(0.98);
        }
    `;
    document.head.appendChild(style);
});