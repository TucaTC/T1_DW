// script.js

// Simple login system using localStorage for demo
document.addEventListener('DOMContentLoaded', function() {
    const normalize = value => (value || '').toString().trim();
    const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = normalize(document.getElementById('username').value);
            const password = document.getElementById('password').value;
            const message = document.getElementById('message');

            const users = getUsers();
            const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
            if (user) {
                localStorage.setItem('user', JSON.stringify({username: user.username, role: user.role}));
                if (user.role === 'employee') {
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
            const username = normalize(document.getElementById('regUsername').value);
            const password = document.getElementById('regPassword').value;
            const role = document.getElementById('regRole').value;
            const regMessage = document.getElementById('regMessage');

            if (!username || !password) {
                regMessage.textContent = 'Preencha usuário e senha.';
                return;
            }

            const users = getUsers();
            if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
                regMessage.textContent = 'Usuário já existe.';
            } else {
                users.push({username, password, role});
                localStorage.setItem('users', JSON.stringify(users));
                regMessage.textContent = 'Registro realizado com sucesso!';
                setTimeout(() => window.location.href = 'login.html', 2000);
            }
        });
    }

    const topUserLink = document.querySelector('.auth-link');
    const topbarRight = document.querySelector('.topbar-right');
    let currentUser = null;
    try {
        currentUser = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        currentUser = null;
    }

    if (topUserLink && topbarRight) {
        if (currentUser && currentUser.username) {
            // Check if user is employee
            if (currentUser.role === 'employee') {
                const adminBtn = document.createElement('a');
                adminBtn.href = 'admin.html';
                adminBtn.className = 'admin-btn';
                adminBtn.textContent = 'Adicionar Produtos';
                topbarRight.insertBefore(adminBtn, topUserLink);
            }

            topUserLink.textContent = `Olá, ${currentUser.username}`;
            topUserLink.href = '#';
            topUserLink.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            });
        } else {
            topUserLink.textContent = 'Entrar';
            topUserLink.href = 'auth.html';
        }
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
            const name = document.getElementById('name').value?.trim();
            const description = document.getElementById('description').value?.trim();
            const priceInput = document.getElementById('price').value;
            const price = priceInput ? parseFloat(priceInput) : 0;
            const adminMessage = document.getElementById('adminMessage');

            console.log('Form submitted:', { category, name, description, price });

            if (!name || name === '') {
                adminMessage.textContent = 'Preencha o nome do produto.';
                adminMessage.style.color = '#d32f2f';
                return;
            }
            if (!description || description === '') {
                adminMessage.textContent = 'Preencha a descrição do produto.';
                adminMessage.style.color = '#d32f2f';
                return;
            }
            if (!price || price <= 0 || isNaN(price)) {
                adminMessage.textContent = 'Preencha um preço válido.';
                adminMessage.style.color = '#d32f2f';
                return;
            }

            try {
                let customProducts = JSON.parse(localStorage.getItem('customProducts')) || {};
                if (!customProducts[category]) {
                    customProducts[category] = [];
                }
                
                const newProduct = { name, description, price };
                customProducts[category].push(newProduct);
                localStorage.setItem('customProducts', JSON.stringify(customProducts));
                
                adminMessage.textContent = `✓ Item "${name}" adicionado com sucesso em ${category}!`;
                adminMessage.style.color = '#4caf50';
                addItemForm.reset();
                setTimeout(() => {
                    adminMessage.textContent = '';
                    adminMessage.style.color = 'inherit';
                }, 4000);
            } catch (error) {
                console.error('Erro ao adicionar produto:', error);
                adminMessage.textContent = 'Erro ao adicionar produto. Tente novamente.';
                adminMessage.style.color = '#d32f2f';
            }
        });
    } else {
        console.warn('Formulário addItemForm não encontrado');
    }

    // Display custom products
    function displayCustomProducts() {
        const customProducts = JSON.parse(localStorage.getItem('customProducts')) || {};
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        let categoryKey = null;

        if (currentPage === 'peças.html') categoryKey = 'peças';
        else if (currentPage === 'pc.html') categoryKey = 'pc';
        else if (currentPage === 'note.html') categoryKey = 'note';
        else if (currentPage === 'cell.html') categoryKey = 'cell';
        else if (currentPage === 'tblt.html') categoryKey = 'tblt';

        if (categoryKey && customProducts[categoryKey]) {
            const productsSection = document.querySelector('.products');
            if (productsSection) {
                customProducts[categoryKey].forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';
                    productDiv.innerHTML = `
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="price">R$ ${product.price.toFixed(2)}</p>
                        <button class="add-to-cart" data-product="${product.name}" data-price="${product.price}">Adicionar ao Carrinho</button>
                    `;
                    productsSection.appendChild(productDiv);

                    // Add event listener to new button
                    const newBtn = productDiv.querySelector('.add-to-cart');
                    newBtn.addEventListener('click', function() {
                        const prod = this.getAttribute('data-product');
                        const pr = parseFloat(this.getAttribute('data-price'));
                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
                        cart.push({product: prod, price: pr});
                        localStorage.setItem('cart', JSON.stringify(cart));
                        alert('Item adicionado ao carrinho!');
                    });
                });
            }
        }
    }

    displayCustomProducts();
});