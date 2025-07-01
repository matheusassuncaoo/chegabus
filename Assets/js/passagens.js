// Inicializa os ícones Feather (biblioteca de ícones)
feather.replace();

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
 * Função para buscar passagens baseada nos campos de pesquisa
 * Salva os dados no localStorage e recarrega as passagens
 */
function buscarPassagens() {
    const origem = document.getElementById('origemInput').value;
    const destino = document.getElementById('destinoInput').value;
    const data = document.getElementById('dataInput').value;
    
    // Salva os dados de pesquisa no localStorage
    localStorage.setItem('searchData', JSON.stringify({ origem, destino, data }));
    
    // Recarrega as passagens com os novos filtros
    carregarPassagens();
}

/**
 * Função para renderizar (criar e mostrar) os cards das passagens na página
 * @param {HTMLElement} container - Elemento HTML onde os cards serão inseridos
 * @param {Array} passagens - Array com os dados das passagens a serem exibidas
 */
function renderizarPassagens(container, passagens) {
    // Limpa o conteúdo atual do container
    container.innerHTML = '';
    
    // Se não há passagens, mostra mensagem
    if (passagens.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhuma passagem encontrada.</p>';
        return;
    }

    // Percorre cada passagem e cria um card para ela
    passagens.forEach((passagem, indice) => {
        // Calcula o preço com desconto
        const precoOriginal = parseFloat(passagem.precoOriginal);
        const percentualDesconto = parseFloat(passagem.desconto);
        const valorDesconto = precoOriginal * (percentualDesconto / 100);
        const precoComDesconto = (precoOriginal - valorDesconto).toFixed(2);

        // Cria o elemento div do card da passagem
        const cardPassagem = document.createElement('div');
        cardPassagem.className = 'ticket-card';
        const idColapso = `collapse-${indice}`;
        
        // Define o HTML interno do card com os dados da passagem
        cardPassagem.innerHTML = `
            <div class="card-body">
                <div class="ticket-header">
                    <div class="company-info">
                        <h5 class="company-name">${passagem.empresa}</h5>
                        <p class="bus-model">${passagem.modelo}</p>
                    </div>
                    <span class="discount-badge">${passagem.desconto}%</span>
                </div>
                <div class="ticket-times-locations">
                    <div class="ticket-times">
                        <span class="departure-time">${passagem.horarioSaida}</span>
                        <div class="dash"><span>—</span></div>
                        <span class="arrival-time">${passagem.horarioChegada}</span>
                    </div>
                    <div class="ticket-locations">
                        <span>${passagem.origem}</span>
                        <span>${passagem.destino}</span>
                    </div>
                </div>
                <div class="ticket-footer">
                    <div class="price-wrapper">
                        <span class="original-price">R$ ${precoOriginal.toFixed(2)}</span>
                        <span class="price">R$ ${precoComDesconto}</span>
                    </div>
                    <button class="select-btn" onclick="alternarColapso('${idColapso}')">Selecionar</button>
                </div>
                <div class="collapse-section" id="${idColapso}">
                    <div class="collapse-content">
                        <h6>Selecione seu assento</h6>
                        <div class="assentos">
                            ${passagem.assentos.map(assento => `
                                <button class="assento ${assento.disponivel ? 'assento-disponivel' : assento.reservadoPorMulher ? 'assento-mulher' : 'assento-reservado'}" 
                                        data-assento="${assento.numero}" 
                                        ${!assento.disponivel ? 'disabled' : ''}>
                                    ${assento.numero}
                                </button>
                            `).join('')}
                        </div>
                        <div class="assento-legend">
                            <span class="badge badge-disponivel">Disponível</span>
                            <span class="badge badge-reservado">Reservado</span>
                            <span class="badge badge-mulher">Mulher</span>
                        </div>
                        <button class="btn-reservar w-100 mt-3" onclick="reservarPassagem('${indice}')">Reservar</button>
                        <button class="btn-close-collapse w-100 mt-3" onclick="alternarColapso('${idColapso}')">Fechar</button>
                    </div>
                </div>
            </div>
        `;
        
        // Adiciona o card ao container
        container.appendChild(cardPassagem);

        // Adiciona eventos de clique para seleção de assentos
        cardPassagem.querySelectorAll('.assento-disponivel').forEach(assento => {
            assento.addEventListener('click', () => {
                // Remove seleção de todos os assentos
                cardPassagem.querySelectorAll('.assento').forEach(a => a.classList.remove('selected'));
                // Adiciona seleção ao assento clicado
                assento.classList.add('selected');
            });
        });
    });
}

/**
 * Função para mostrar/ocultar a seção de seleção de assentos
 * @param {string} idColapso - ID da seção que deve ser alternada
 */
function alternarColapso(idColapso) {
    const secaoColapso = document.getElementById(idColapso);
    const estaAtivo = secaoColapso.classList.contains('active');
    
    // Fecha todas as outras seções de colapso
    document.querySelectorAll('.collapse-section').forEach(secao => {
        secao.classList.remove('active');
    });

    // Alterna a seção clicada (só abre se não estiver ativa)
    if (!estaAtivo) {
        secaoColapso.classList.add('active');
    }
}

/**
 * Função para reservar uma passagem
 * Verifica se um assento foi selecionado e redireciona para pagamento
 * @param {number} indice - Índice da passagem no array
 */
function reservarPassagem(indice) {
    // Verifica se um assento foi selecionado
    const assentoSelecionado = document.querySelector(`#collapse-${indice} .assento.selected`);
    if (!assentoSelecionado) {
        alert('Por favor, selecione um assento antes de reservar.');
        return;
    }
    
    // Pega os dados da passagem e do assento
    const passagem = passagens[indice];
    const numeroAssento = assentoSelecionado.getAttribute('data-assento');
    
    // Salva os dados da reserva no localStorage
    localStorage.setItem('reservaData', JSON.stringify({ ...passagem, assento: numeroAssento }));
    
    // Redireciona para a página de pagamento
    window.location.href = './pagamento.html';
}

/**
 * Função principal para carregar as passagens na página
 * Pega dados do localStorage e renderiza as passagens filtradas
 */
function carregarPassagens() {
    // Pega dados da rota selecionada ou da pesquisa
    const rotaSelecionada = JSON.parse(localStorage.getItem('selectedRoute'));
    const dadosPesquisa = JSON.parse(localStorage.getItem('searchData'));
    
    let origem, destino;
    if (rotaSelecionada) {
        origem = rotaSelecionada.origem;
        destino = rotaSelecionada.destino;
        // Limpa a rota selecionada para não interferir em buscas futuras
        localStorage.removeItem('selectedRoute');
    } else if (dadosPesquisa) {
        origem = dadosPesquisa.origem;
        destino = dadosPesquisa.destino;
    } else {
        origem = '';
        destino = '';
    }

    // Preenche o formulário de pesquisa com os dados
    document.getElementById('origemInput').value = origem;
    document.getElementById('destinoInput').value = destino;
    if (dadosPesquisa && dadosPesquisa.data) {
        document.getElementById('dataInput').value = dadosPesquisa.data;
    }

    // Filtra as passagens baseada na origem e destino
    let passagensFiltradas = filtrarPassagens(passagens, origem, destino);

    // Se não encontrou passagens e há origem/destino, gera passagens fictícias
    if (passagensFiltradas.length === 0 && origem && destino) {
        passagensFiltradas = gerarPassagensFicticias(origem, destino);
    }

    // Renderiza as passagens na página
    const containerPassagens = document.getElementById('passagesContainer');
    renderizarPassagens(containerPassagens, passagensFiltradas);
}

/**
 * Função para gerar passagens fictícias quando não há dados reais
 * @param {string} origem - Cidade de origem
 * @param {string} destino - Cidade de destino
 * @returns {Array} - Array com passagens fictícias
 */
function gerarPassagensFicticias(origem, destino) {
    const empresas = ['Satélite Azul', 'Viação Verde', 'Expresso Rápido', 'Ônibus Conforto', 'TransBrasil'];
    const modelosOnibus = ['Volvo Multi Axle Semi Sleeper', 'Mercedes Benz Sleeper', 'Scania Executive', 'Marcopolo G7', 'Comil Campione'];
    const passagens = [];

    // Gera 5 passagens fictícias
    for (let i = 0; i < 5; i++) {
        const horaSaida = 8 + i * 2; // Ex: 08:00, 10:00, 12:00, 14:00, 16:00
        const precoOriginal = 150 + i * 20; // Ex: R$150, R$170, R$190, R$210, R$230
        
        // Define desconto baseado no preço (preço maior = desconto maior)
        const desconto = precoOriginal > 200 ? "40" : precoOriginal > 180 ? "30" : precoOriginal > 160 ? "20" : "10";

        passagens.push({
            empresa: empresas[i % empresas.length],
            modelo: modelosOnibus[i % modelosOnibus.length],
            origem: origem,
            destino: destino,
            horarioSaida: `${horaSaida.toString().padStart(2, '0')}:00`,
            horarioChegada: `${(horaSaida + 4).toString().padStart(2, '0')}:00`,
            precoOriginal: precoOriginal.toFixed(2),
            desconto: desconto,
            assentos: Array.from({ length: 40 }, (_, indice) => ({
                numero: indice + 1,
                disponivel: Math.random() > 0.3,
                reservadoPorMulher: Math.random() > 0.9
            }))
        });
    }
    return passagens;
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
                input.value = item;
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

// Evento que é acionado quando o DOM (a estrutura da página) está completamente carregado.
document.addEventListener('DOMContentLoaded', () => {
    carregarPassagens();
    configurarAutocomplete('origemInput', todasAsCidades);
    configurarAutocomplete('destinoInput', todasAsCidades);
    configurarInputData('dataInput');
    feather.replace();
});