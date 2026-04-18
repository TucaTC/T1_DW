<?php
session_start();
$erro = '';
$success = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? 'customer';

    if ($username === '' || $password === '') {
        $erro = 'Preencha usuário e senha.';
    } else {
        // Em um sistema real, aqui seria salva a conta no banco de dados.
        $success = 'Cadastro realizado com sucesso. Agora faça login.';
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar - TechShop</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="topbar">
      <div class="topbar-left">
          <a class="home-link" href="index.html">Início</a>
          <a class="cart-link" href="cart.html">Carrinho</a>
      </div>
      <div class="topbar-right">
          <a class="auth-link" href="auth.php">Entrar</a>
      </div>
    </div>

    <main>
        <section class="register-form">
            <h2>Registrar</h2>
            <?php if ($erro): ?>
                <p class="error-message"><?php echo $erro; ?></p>
            <?php endif; ?>
            <?php if ($success): ?>
                <p class="success-message"><?php echo $success; ?></p>
            <?php endif; ?>
            <form method="POST" action="register.php">
                <label for="username">Usuário:</label>
                <input type="text" id="username" name="username" required autocomplete="username">

                <label for="password">Senha:</label>
                <input type="password" id="password" name="password" required autocomplete="new-password">

                <label for="role">Tipo:</label>
                <select id="role" name="role">
                    <option value="customer">Cliente</option>
                    <option value="employee">Funcionário</option>
                </select>

                <button type="submit">Registrar</button>
            </form>
            <p style="text-align: center; margin-top: 15px; color: var(--text-muted);">
                Já tem conta? <a href="login.php" style="color: var(--primary);">Entrar</a>
            </p>
        </section>
    </main>

    <footer>© 2026 TechShop. Todos os direitos reservados.</footer>
</body>
</html>
