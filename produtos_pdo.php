<?php

// RETORNO JSON  produtos_pdo.php
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

    // CONFIGURA PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $idSelecionado = null;
    // paranetro tipo
    if (isset($_GET['tipo'])) {
        $idSelecionado = $_GET['tipo'];
    } else {
        header("Location: index.php");
        exit;
    }
    
    // SQL
    $sql = "SELECT * FROM produtos WHERE tipo = :tipo";
    // PREPARA A QUERY
    $stmt = $pdo->prepare($sql);
    // EXECUTA
    $stmt->execute([':tipo' => $idSelecionado]);

    // BUSCA TODOS OS DADOS
    $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // CONVERTE TIPOS
    foreach($produtos as &$produto){
        $produto["id"] = (int)$produto["id"];
        $produto["preco"] = (float)$produto["preco"];
    }

    // RETORNA JSON
    echo json_encode(
        $produtos,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
    );

} catch(PDOException $erro){

    // ERRO EM JSON
    echo json_encode([
       "erro" => $erro->getMessage()
    ]);
}

?>