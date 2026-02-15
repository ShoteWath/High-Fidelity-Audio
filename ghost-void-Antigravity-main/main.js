import { products } from './products.js';

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isVisible = mobileMenu.style.transform === 'translateY(0%)';
    mobileMenu.style.transform = isVisible ? 'translateY(-100%)' : 'translateY(0%)';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// Render Product List (Home Page)
const productListParams = document.getElementById('product-list');
if (productListParams) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('glass-panel');
        productCard.style.padding = '2rem';
        productCard.style.display = 'flex';
        productCard.style.flexDirection = 'column';
        productCard.style.gap = '1rem';

        productCard.innerHTML = `
            <div style="background: linear-gradient(135deg, #111, #222); height: 250px; border-radius: 8px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                 <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;">
            </div>
            <h3 style="font-size: 1.5rem;">${product.name}</h3>
            <div style="font-size: 1.2rem; font-weight: 700; color: var(--primary-color);">$${product.price.toFixed(2)}</div>
            <p style="color: var(--text-secondary); flex-grow: 1;">${product.description.substring(0, 80)}...</p>
            <a href="product.html?id=${product.id}" class="btn btn-primary" style="text-align: center; text-decoration: none;">View Details</a>
        `;
        productListParams.appendChild(productCard);
    });
}

// Render Product Details (Product Page)
const productDetailContainer = document.getElementById('product-detail-container');
if (productDetailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = products.find(p => p.id === productId);

    if (product) {
        document.title = `${product.name} - NeonTech`;
        productDetailContainer.innerHTML = `
            <div class="product-image"
                style="background: linear-gradient(135deg, #111, #222); height: 500px; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="product-info">
                <h1 style="font-size: 3rem; margin-bottom: 1rem; line-height: 1.1;">${product.name}</h1>
                <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color); margin-bottom: 2rem;">
                    $${product.price.toFixed(2)}</div>
                <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">
                    ${product.description}
                </p>
                
                <h3 style="margin-bottom: 1rem;">Key Features</h3>
                <ul style="list-style: none; margin-bottom: 2rem;">
                    ${product.features.map(feature => `
                        <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--primary-color);">✓</span> ${feature}
                        </li>
                    `).join('')}
                </ul>

                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary" style="font-size: 1.2rem; padding: 1rem 2rem;">Add to Cart</button>
                    <button class="btn glass-panel" style="color: white; padding: 1rem 2rem; border-radius: 50px; font-weight: 600; cursor: pointer;">Wishlist</button>
                </div>
            </div>
        `;
    } else {
        productDetailContainer.innerHTML = `
            <div style="text-align: center; grid-column: 1 / -1;">
                <h2>Product not found</h2>
                <a href="index.html" class="btn btn-primary" style="margin-top: 1rem; text-decoration: none; display: inline-block;">Back to Home</a>
            </div>
        `;
    }
}
