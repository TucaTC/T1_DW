<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acessar - TechShop</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="page-container">
    <!-- Topbar alinhada com CSS Grid -->
    <nav class="topbar">
        <div class="topbar-left">
            <a href="index.html" class="home-link">Início</a>
        </div>
        <span style="color: #fff; font-weight: bold; text-align: center;">TechShop</span>
        <div class="topbar-right">
            <a class="cart-link" href="cart.html">Carrinho</a>
            <a href="auth.php" class="auth-link">Entrar</a>
        </div>
    </nav>

    <main>
        <div class="auth-options">
            <h2>Acessar sua conta</h2>
            <p>Escolha uma opção para continuar</p>
            
            <div class="auth-buttons">
                <a href="login.php" class="button-link">Login</a>
                <a href="register.php" class="button-link">Registrar</a>
            </div>
        </div>
    </main>

    <footer>
        &copy; 2026 TechShop. Todos os direitos reservados.
    </footer>
    </div>
</body>
</html>
