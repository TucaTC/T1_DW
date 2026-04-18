// cart.js - Shopping Cart Functionality

// Get cart from localStorage or initialize empty array
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(product, price) {
    const cart = getCart();
    const existingItem = cart.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, price: parseFloat(price), quantity: 1 });
    }
    saveCart(cart);
    alert(`${product} adicionado ao carrinho!`);
}

// Remove item from cart
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
}

// Update total price
function updateTotal() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Display cart items
function displayCart() {
    const cart = getCart();
    const cartSection = document.querySelector('.cart');
    const cartItems = cartSection.querySelector('#cartItems') || document.createElement('div');
    cartItems.id = 'cartItems';
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Carrinho vazio. Adicione produtos das páginas de categoria.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>${item.product} - R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                <button onclick="removeFromCart(${index})">Remover</button>
            `;
            cartItems.appendChild(itemDiv);
        });
    }

    // Insert after h2
    const h2 = cartSection.querySelector('h2');
    h2.insertAdjacentElement('afterend', cartItems);

    updateTotal();
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to add-to-cart buttons
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            if (product && price) {
                addToCart(product, price);
            }
        });
    });

    // If on cart page, display cart
    if (document.querySelector('.cart')) {
        displayCart();
    }
});