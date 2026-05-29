// prod.js - carrega produtos via API e renderiza em prod.html

async function carregarProdutos() {
    const container = document.getElementById('listaProdutos');
    if (!container) return;

    // Pegar 'tipo' da query string
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo') || '';

    try {
        const resposta = await fetch(`produtos_pdo.php?tipo=${encodeURIComponent(tipo)}`);
        if (!resposta.ok) throw new Error('Resposta inválida da API');
        const produtos = await resposta.json();

        if (!Array.isArray(produtos) || produtos.length === 0) {
            container.innerHTML = '<p>Nenhum produto encontrado para esta categoria.</p>';
            return;
        }

        container.innerHTML = '';
        produtos.forEach(prod => {
            const nome = prod.nome || prod.produto || prod.title || 'Produto';
            const preco = Number(prod.preco) || 0;
            const imagem = prod.imagem || prod.image || 'imagens/placeholder.png';

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${imagem}" alt="${nome}" />
                <h4>${nome}</h4>
                <div class="price">R$ ${preco.toFixed(2).replace('.', ',')}</div>
                <button class="add-to-cart" data-product="${escapeHtml(nome)}" data-price="${preco}">Comprar</button>
            `;
            container.appendChild(card);
        });

    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
        container.innerHTML = '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
    }
}

// Event delegation para botões adicionar ao carrinho
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    const product = btn.getAttribute('data-product');
    const price = btn.getAttribute('data-price');
    if (product && price) {
        // Usa a função global de cart.js se existir
        if (typeof addToCart === 'function') {
            addToCart(product, price);
        } else {
            // fallback simples
            alert(product + ' adicionado ao carrinho!');
        }
    }
});

// Helper: escapar HTML simples
function escapeHtml(str) {
    return String(str).replace(/[&"'<>]/g, function (s) {
        return ({'&':'&amp;', '"':'&quot;', "'":'&#39;', '<':'&lt;', '>':'&gt;'}[s]);
    });
}

// Executar quando DOM pronto
document.addEventListener('DOMContentLoaded', carregarProdutos);