const passagens = [
    {
        empresa: "Satélite Azul",
        modelo: "Volvo Multi Axle Semi Sleeper",
        origem: "Cuiabá, MT",
        destino: "Sinop, MT",
        horarioSaida: "08:00",
        horarioChegada: "12:00",
        precoOriginal: 150.00, // Original price
        desconto: "25", // Discount percentage (without the % sign)
        assentos: Array.from({ length: 40 }, (_, idx) => ({
            numero: idx + 1,
            disponivel: Math.random() > 0.3,
            reservadoPorMulher: Math.random() > 0.9
        }))
    },
    {
        empresa: "Viação Verde",
        modelo: "Mercedes Benz Sleeper",
        origem: "Cuiabá, MT",
        destino: "Primavera do Leste, MT",
        horarioSaida: "09:00",
        horarioChegada: "11:30",
        precoOriginal: 80.00,
        desconto: "20",
        assentos: Array.from({ length: 40 }, (_, idx) => ({
            numero: idx + 1,
            disponivel: Math.random() > 0.3,
            reservadoPorMulher: Math.random() > 0.9
        }))
    },
    {
        empresa: "Expresso Rápido",
        modelo: "Scania Executive",
        origem: "Nobres, MT",
        destino: "Sinop, MT",
        horarioSaida: "10:00",
        horarioChegada: "14:30",
        precoOriginal: 120.00,
        desconto: "15",
        assentos: Array.from({ length: 40 }, (_, idx) => ({
            numero: idx + 1,
            disponivel: Math.random() > 0.3,
            reservadoPorMulher: Math.random() > 0.9
        }))
    },
    {
        empresa: "Ônibus Conforto",
        modelo: "Marcopolo G7",
        origem: "Cuiabá, MT",
        destino: "Alto Araguaia, MT",
        horarioSaida: "07:00",
        horarioChegada: "13:00",
        precoOriginal: 200.00,
        desconto: "30", // Adjusted to a more realistic value
        assentos: Array.from({ length: 40 }, (_, idx) => ({
            numero: idx + 1,
            disponivel: Math.random() > 0.3,
            reservadoPorMulher: Math.random() > 0.9
        }))
    },
    {
        empresa: "TransBrasil",
        modelo: "Comil Campione",
        origem: "Cuiabá, MT",
        destino: "Rio de Janeiro, RJ",
        horarioSaida: "06:00",
        horarioChegada: "18:00",
        precoOriginal: 350.00,
        desconto: "40", // Higher discount for a longer route
        assentos: Array.from({ length: 40 }, (_, idx) => ({
            numero: idx + 1,
            disponivel: Math.random() > 0.3,
            reservadoPorMulher: Math.random() > 0.9
        }))
    }
];

function filtrarPassagens(passagens, origem, destino) {
    return passagens.filter(p => 
        p.origem.toLowerCase().includes(origem.toLowerCase()) && 
        p.destino.toLowerCase().includes(destino.toLowerCase())
    );
}

function renderizarPassagens(container, passagens) {
    container.innerHTML = '';
    if (passagens.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhuma passagem encontrada.</p>';
        return;
    }

    passagens.forEach((passagem, index) => {
        // Calculate discounted price
        const precoOriginal = parseFloat(passagem.precoOriginal);
        const descontoPercent = parseFloat(passagem.desconto);
        const descontoValor = precoOriginal * (descontoPercent / 100);
        const precoComDesconto = (precoOriginal - descontoValor).toFixed(2);

        const ticketCard = document.createElement('div');
        ticketCard.className = 'ticket-card';
        const collapseId = `collapse-${index}`;
        ticketCard.innerHTML = `
            <div class="card-body">
                <div class="ticket-header">
                    <h5 class="company-name">${passagem.empresa}</h5>
                    <p class="bus-model">${passagem.modelo}</p>
                    <span class="discount-badge">${passagem.desconto}%</span>
                </div>
                <div class="ticket-times-locations">
                    <div class="ticket-times">
                        <span class="departure-time">${passagem.horarioSaida}</span>
                        <span class="dash">—</span>
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
                    <button class="select-btn" onclick="toggleCollapse('${collapseId}')">Selecionar</button>
                </div>
                <div class="collapse-section" id="${collapseId}">
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
                        <button class="btn-reservar w-100 mt-3" onclick="reservarPassagem('${index}')">Reservar</button>
                        <button class="btn-close-collapse w-100 mt-3" onclick="toggleCollapse('${collapseId}')">Fechar</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(ticketCard);

        // Add event listeners for seat selection
        ticketCard.querySelectorAll('.assento-disponivel').forEach(assento => {
            assento.addEventListener('click', () => {
                ticketCard.querySelectorAll('.assento').forEach(a => a.classList.remove('selected'));
                assento.classList.add('selected');
            });
        });
    });
}

function toggleCollapse(collapseId) {
    const collapseSection = document.getElementById(collapseId);
    const isActive = collapseSection.classList.contains('active');
    
    // Close all other collapse sections
    document.querySelectorAll('.collapse-section').forEach(section => {
        section.classList.remove('active');
    });

    // Toggle the clicked collapse section
    if (!isActive) {
        collapseSection.classList.add('active');
    }
}

function reservarPassagem(index) {
    const selectedAssento = document.querySelector(`#collapse-${index} .assento.selected`);
    if (!selectedAssento) {
        alert('Por favor, selecione um assento antes de reservar.');
        return;
    }
    const passagem = passagens[index];
    const assentoNumero = selectedAssento.getAttribute('data-assento');
    localStorage.setItem('reservaData', JSON.stringify({ ...passagem, assento: assentoNumero }));
    window.location.href = './pagamento.html';
}