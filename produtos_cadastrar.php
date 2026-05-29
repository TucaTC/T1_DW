<?php
// produtos_cadastrar.php
/*
  a) curl.exe -X POST http://localhost/fatec/backend/produtos_cadastrar.php ^
-H "Content-Type: application/json" ^
-d "{\"id\":30,\"nome\":\"Mouse\",\"preco\":123.90,\"imagem\":\"https://picsum.photos\"}"



ou 

b) $corpo = @{
    id = 30
    nome = "Monitor"
    preco = 999.90
    imagem = "https://picsum.photos"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost/fatec/backend/produtos_cadastrar.php" -Method Post -ContentType "application/json" -Body $corpo


	
*/
header("Content-Type: application/json");

$dados = json_decode(file_get_contents("php://input"), true);

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
    // SQL
	
	/*    $pdo = new PDO(
        "mysql:host=localhost;dbname=aula031125;charset=utf8",
        "root",
        ""
    );
	*/
	
	
/*
    $sql = "INSERT INTO produtos (id, nome, preco, imagem)
						  VALUES (:id, :nome, :preco, :imagem)";
*/
    $sql = "INSERT INTO produtos (nome, preco, imagem)
						  VALUES (:nome, :preco, :imagem)";

	$stmt = $pdo->prepare($sql);

    //$stmt->bindValue(":id", $dados["id"]);
    $stmt->bindValue(":nome", $dados["nome"]);
    $stmt->bindValue(":preco", $dados["preco"]);
    $stmt->bindValue(":imagem", $dados["imagem"]);

    $stmt->execute();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Produto cadastrado com sucesso"
    ]);

} catch(PDOException $erro) {

    echo json_encode([
        "sucesso" => false,
        "mensagem" => $erro->getMessage()
    ]);
}
?>