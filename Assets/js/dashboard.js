// Inicializa os ícones Feather (biblioteca de ícones)
feather.replace();

// Array com as rotas populares (mais procuradas pelos usuários)
const rotasPopulares = [
    { 
        destino: "Cuiabá, MT → Sinop, MT", 
        imagem: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQ84rKF_82HHLKusSWRkLwQkyRn46WrlIUW5fJESRi-RuZp1QiLy9jBVxhq0SmvRxgGibFq2CJ-BXehMTKaYd5LeDQgSYOQ_jukTfEgQg", 
        desconto: "-25%",
        descricao: "Viaje para o 'Portal da Amazônia' e explore a capital do Nortão, um polo de agronegócio e natureza."
    },
    { 
        destino: "Cuiabá, MT → Primavera do Leste, MT", 
        imagem: "https://lh3.googleusercontent.com/p/AF1QipNskjxkS1JMO24x0g6JJwwDnyKbfFr00RWdVB-O=w594-h343-n-k-no", 
        desconto: "-20%",
        descricao: "Descubra os campos floridos e a agricultura pulsante de uma das cidades mais prósperas de Mato Grosso."
    },
    { 
        destino: "Nobres, MT → Sinop, MT", 
        imagem: "https://portalmatogrosso.com.br/wp-content/uploads/2024/03/sinop-centro.jpeg", 
        desconto: "-15%",
        descricao: "De um paraíso de águas cristalinas para o coração do agronegócio mato-grossense."
    },
    { 
        destino: "Cuiabá, MT → Alto Araguaia, MT", 
        imagem: "https://cdn.semana7.com.br/storage/webdisco/2021/10/26/1200x900/e2fb00c22b857d69a1bed9786c204747.jpg", 
        desconto: "-85%",
        descricao: "Explore as belezas do Araguaia e suas famosas praias de água doce."
    }
];

// Array com as rotas recentes (últimas pesquisadas ou compradas)
const rotasRecentes = [
    { 
        destino: "Cuiabá, MT → Rio de Janeiro, RJ", 
        imagem: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325", 
        desconto: "-25%",
        descricao: "Da capital do agronegócio para a Cidade Maravilhosa, cheia de encantos mil."
    },
    { 
        destino: "Cuiabá, MT → São Paulo, SP", 
        imagem: "https://lh3.googleusercontent.com/p/AF1QipMGIvyxHIHM6WzEEpOvqyVXatJC6W7QklJ5smMm=w594-h343-n-k-no", 
        desconto: "-25%",
        descricao: "Conecte-se com a maior metrópole do país, um centro de cultura e negócios."
    },
    { 
        destino: "Florianópolis, SC → São Paulo, SP", 
        imagem: "https://lh3.googleusercontent.com/p/AF1QipMGIvyxHIHM6WzEEpOvqyVXatJC6W7QklJ5smMm=w594-h343-n-k-no", 
        desconto: "-25%",
        descricao: "Da Ilha da Magia para a selva de pedra, uma viagem de contrastes."
    },
    { 
        destino: "Salvador, BA → Manaus, AM", 
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Sx0RymxmpIt6v7Z4uC7xfiuFVC01t-26hA&s", 
        desconto: "-85%",
        descricao: "Do calor da Bahia para a imensidão da Floresta Amazônica."
    }
];

/**
 * Função para renderizar (criar e mostrar) os cards das rotas na página
 * @param {string} idContainer - ID do elemento HTML onde os cards serão inseridos
 * @param {Array} rotas - Array com os dados das rotas a serem exibidas
 */
function renderizarRotas(idContainer, rotas) {
    const container = document.getElementById(idContainer);
    
    // Verifica se o container existe na página
    if (!container) return;

    // Limpa o conteúdo atual do container
    container.innerHTML = ''; 

    // Percorre cada rota e cria um card para ela
    rotas.forEach(rota => {
        // Cria o elemento div do card
        const card = document.createElement('div');
        card.className = 'route-card';
        
        // Define o HTML interno do card com os dados da rota
        card.innerHTML = `
            <img src="${rota.imagem}" alt="${rota.destino}" class="card-img-top">
            <span class="discount-badge">${rota.desconto}</span>
            <div class="card-body">
                <h5 class="card-title">${rota.destino}</h5>
                <p class="card-text">${rota.descricao}</p>
                <button class="btn view-passages-btn">Reservar</button>
            </div>
        `;
        
        // Adiciona o card ao container
        container.appendChild(card);

        // Adiciona evento de clique no botão "Reservar"
        card.querySelector('.view-passages-btn').addEventListener('click', () => {
            // Separa origem e destino da string (ex: "Cuiabá, MT → Sinop, MT")
            const [origem, destino] = rota.destino.split(' → ');
            
            // Cria objeto com os dados da rota selecionada
            const dadosRota = { origem, destino };
            
            // Salva no localStorage para usar na próxima página
            localStorage.setItem('selectedRoute', JSON.stringify(dadosRota));
            
            // Redireciona para a página de passagens
            window.location.href = './passagens.html';
        });
    });
}

/**
 * Função para buscar rotas baseada nos campos de pesquisa
 * Pega os valores dos campos e redireciona para a página de passagens
 */
function buscarRotas() {
    // Pega os valores dos campos de pesquisa
    const origem = document.querySelector('input[placeholder="Ponto de Partida"]').value;
    const destino = document.querySelector('input[placeholder="Ponto de Chegada"]').value;
    const data = document.querySelector('input[type="date"]').value;
    
    // Salva os dados de pesquisa no localStorage
    localStorage.setItem('searchData', JSON.stringify({ origem, destino, data }));
    
    // Redireciona para a página de passagens
    window.location.href = './passagens.html';
}

/**
 * Função para mostrar/ocultar o menu lateral (sidebar)
 * Alterna a classe 'active' que controla a visibilidade
 */
function alternarMenuLateral() {
    const menuLateral = document.getElementById('sidebar');
    if (menuLateral) {
        menuLateral.classList.toggle('active');
    }
}

/**
 * Função para configurar o autocomplete em um campo de input.
 * @param {string} inputId - ID do campo de input.
 * @param {string[]} data - Array com os dados para o autocomplete.
 */
function configurarAutocomplete(inputId, data) {
    const input = document.getElementById(inputId);
    const wrapper = input.parentElement;
    let suggestionsContainer;

    input.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        fecharTodasAsListas();
        if (!value) return;

        suggestionsContainer = document.createElement('div');
        suggestionsContainer.setAttribute('class', 'autocomplete-suggestions');
        wrapper.appendChild(suggestionsContainer);

        const dadosFiltrados = data.filter(item => item.toLowerCase().includes(value));

        dadosFiltrados.forEach(item => {
            const sugestao = document.createElement('div');
            sugestao.setAttribute('class', 'suggestion-item');
            const matchIndex = item.toLowerCase().indexOf(value);
            sugestao.innerHTML = item.substring(0, matchIndex) +
                                '<strong>' + item.substring(matchIndex, matchIndex + value.length) + '</strong>' +
                                item.substring(matchIndex + value.length);
            
            sugestao.addEventListener('click', function() {
                input.value = item; // Use innerText to avoid setting the strong tags
                fecharTodasAsListas();
            });
            suggestionsContainer.appendChild(sugestao);
        });
    });

    function fecharTodasAsListas() {
        const todasAsSugestoes = document.querySelectorAll('.autocomplete-suggestions');
        todasAsSugestoes.forEach(container => container.remove());
    }

    document.addEventListener('click', function (e) {
        if (e.target !== input) {
            fecharTodasAsListas();
        }
    });
}

/**
 * Função para configurar a validação de data em um campo de input.
 * @param {string} inputId - ID do campo de data.
 */
function configurarInputData(inputId) {
    const inputData = document.getElementById(inputId);
    const hoje = new Date().toISOString().split('T')[0];
    inputData.setAttribute('min', hoje);

    inputData.addEventListener('blur', function() {
        if (this.value && this.value < hoje) {
            alert('Não é possível selecionar uma data passada.');
            this.value = '';
        }
    });
}

// Evento que executa quando a página termina de carregar
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza as rotas populares e recentes na página
    renderizarRotas('popularRoutes', rotasPopulares);
    renderizarRotas('recentRoutes', rotasRecentes);

    // Configura o autocomplete e a validação de data
    configurarAutocomplete('origemInput', todasAsCidades);
    configurarAutocomplete('destinoInput', todasAsCidades);
    configurarInputData('dataInput');
    feather.replace(); // Garante que os ícones adicionados via JS sejam renderizados
});
