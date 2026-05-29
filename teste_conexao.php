<?php
header("Content-Type: application/json; charset=UTF-8");

try {
    // CONFIGURAÇÃO DO BANCO
    $host    = "sql102.infinityfree.com";
    $banco   = "if0_41382792_techshop";
    $usuario = "if0_41382792";
    $senha   = "56862022Aa";

    // CONEXÃO PDO
    $pdo = new PDO( "mysql:host=$host;dbname=$banco;charset=utf8",
        $usuario,  $senha   );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Testa conexão
    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Conexão bem-sucedida!",
        "host" => $host,
        "banco" => $banco
    ]);

    // Verifica se tabela existe
    $sql = "SELECT COUNT(*) as total FROM produtos";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Tabela produtos encontrada",
        "total_produtos" => $resultado['total']
    ]);

} catch(PDOException $erro) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro na conexão: " . $erro->getMessage()
    ]);
}
?>
