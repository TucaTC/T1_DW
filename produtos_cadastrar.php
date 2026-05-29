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

$rawInput = file_get_contents("php://input");
$dados = json_decode($rawInput, true);
if (!is_array($dados)) {
    $dados = $_POST;
}

if (!is_array($dados)) {
    $dados = [];
}

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
    // Normaliza nomes aceitos no payload: 'produto' ou 'nome'
    $produtoNome = isset($dados['produto']) ? $dados['produto'] : (isset($dados['nome']) ? $dados['nome'] : null);
    $preco = isset($dados['preco']) ? $dados['preco'] : null;
    $imagem = isset($dados['imagem']) ? $dados['imagem'] : '';
    $tipo = isset($dados['tipo']) ? $dados['tipo'] : '';

    if (empty($produtoNome) || $preco === null) {
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Dados incompletos. 'nome' (ou 'produto') e 'preco' são obrigatórios."
        ]);
        exit;
    }

    $sql = "INSERT INTO produtos (produto, preco, imagem, tipo)
                          VALUES (:produto, :preco, :imagem, :tipo)";

    $stmt = $pdo->prepare($sql);

    $stmt->bindValue(":produto", $produtoNome);
    $stmt->bindValue(":preco", $preco);
    $stmt->bindValue(":imagem", $imagem);
    $stmt->bindValue(":tipo", $tipo);

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