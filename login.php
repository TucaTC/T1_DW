<?php
// login.php
session_start();

// 🔒 Em produção, substitua por consulta PDO/MySQLi
$usuarios = [
    ['username' => 'admin', 'password' => password_hash('admin123', PASSWORD_DEFAULT), 'role' => 'employee'],
    ['username' => 'cliente', 'password' => password_hash('cliente123', PASSWORD_DEFAULT), 'role' => 'customer']
];

$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        $erro = 'Preencha usuário e senha.';
    } else {
        $user_found = null;
        foreach ($usuarios as $u) {
            if (strcasecmp($u['username'], $username) === 0 && password_verify($password, $u['password'])) {
                $user_found = $u;
                break;
            }
        }

        if ($user_found) {
            $_SESSION['user'] = [
                'username' => $user_found['username'],
                'role'     => $user_found['role']
            ];

            // Redirecionamento baseado no cargo
            header('Location: ' . ($user_found['role'] === 'employee' ? 'admin.html' : 'index.html'));
            exit;
        } else {
            $erro = 'Credenciais inválidas.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - TechShop</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="page-container">
    <div class="topbar">
        <div class="topbar-left">
            <a href="index.html" class="home-link">Início</a>
        </div>
        <h2 style="color:#fff; margin:0;">Acessar Conta</h2>
        <div class="topbar-right"></div>
    </div>

    <main>
        <div class="login-form">
            <?php if ($erro): ?>
                <p style="color: #d32f2f; text-align: center; font-weight: bold;"><?php echo $erro; ?></p>
            <?php endif; ?>
            <form method="POST" action="login.php">
                <label for="username">Usuário:</label>
                <input type="text" id="username" name="username" required autocomplete="username">
                
                <label for="password">Senha:</label>
                <input type="password" id="password" name="password" required autocomplete="current-password">
                
                <button type="submit">Entrar</button>
            </form>
            <p style="text-align: center; margin-top: 15px; color: var(--text-muted);">
                Não tem conta? <a href="register.php" style="color: var(--primary);">Registrar-se</a>
            </p>
        </div>
    </main>

    <footer>© 2026 TechShop. Todos os direitos reservados.</footer>
    </div>
</body>
</html>
