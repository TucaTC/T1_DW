document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addItemForm');
    const adminMessage = document.getElementById('adminMessage');

    if (!form || !adminMessage) return;

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const produto = document.getElementById('produto').value.trim();
        const imagem = document.getElementById('imagem').value.trim();
        const preco = Number(document.getElementById('preco').value);
        const tipo = document.getElementById('category').value;

        if (!produto || !imagem || Number.isNaN(preco)) {
            adminMessage.textContent = 'Preencha todos os campos corretamente.';
            adminMessage.style.color = 'red';
            return;
        }

        const payload = {
            produto: produto,
            imagem: imagem,
            preco: preco,
            tipo: tipo
        };

        try {
            const response = await fetch('produtos_cadastrar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const texto = await response.text();
            let data = null;
            try {
                data = JSON.parse(texto);
            } catch (parseError) {
                console.error('Resposta não é JSON:', texto);
                adminMessage.textContent = 'Erro: resposta inválida do servidor.';
                adminMessage.style.color = 'red';
                return;
            }

            if (response.ok && data.sucesso) {
                adminMessage.textContent = data.mensagem;
                adminMessage.style.color = 'green';
                form.reset();
            } else {
                adminMessage.textContent = data.mensagem || 'Erro ao cadastrar produto.';
                adminMessage.style.color = 'red';
            }
        } catch (error) {
            adminMessage.textContent = 'Erro ao conectar com o servidor.';
            adminMessage.style.color = 'red';
            console.error('Erro no cadastro:', error);
        }
    });
});
