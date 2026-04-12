// script.js

// Simple login system using localStorage for demo
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            const message = document.getElementById('message');

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username && u.password === password && u.role === role);
            if (user) {
                localStorage.setItem('user', JSON.stringify({username, role}));
                if (role === 'employee') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                message.textContent = 'Credenciais inválidas.';
            }
        });
    }

    // Register
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            const role = document.getElementById('regRole').value;
            const regMessage = document.getElementById('regMessage');

            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(u => u.username === username)) {
                regMessage.textContent = 'Usuário já existe.';
            } else {
                users.push({username, password, role});
                localStorage.setItem('users', JSON.stringify(users));
                regMessage.textContent = 'Registro realizado com sucesso!';
                setTimeout(() => window.location.href = 'login.html', 2000);
            }
        });
    }

    // Add to cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({product, price});
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Item adicionado ao carrinho!');
        });
    });

    // Display cart
    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;
        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.product} - R$ ${item.price.toFixed(2)}`;
            cartItems.appendChild(div);
            total += item.price;
        });
        document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    // Checkout
    const checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            alert('Compra finalizada! (Simulação)');
            localStorage.removeItem('cart');
            window.location.reload();
        });
    }

    // Add item (admin)
    const addItemForm = document.getElementById('addItemForm');
    if (addItemForm) {
        addItemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const category = document.getElementById('category').value;
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const price = parseFloat(document.getElementById('price').value);
            const adminMessage = document.getElementById('adminMessage');

            // For demo, just alert; in real app, save to server
            alert(`Item adicionado: ${name} em ${category}`);
            adminMessage.textContent = 'Item adicionado com sucesso!';
        });
    }
});