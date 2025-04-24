feather.replace();

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function searchPassages() {
    const origin = document.getElementById('originInput').value;
    const destination = document.getElementById('destinationInput').value;
    const date = document.getElementById('dateInput').value;
    localStorage.setItem('searchData', JSON.stringify({ origin, destination, date }));
    loadPassages();
}

function loadPassages() {
    const selectedRoute = JSON.parse(localStorage.getItem('selectedRoute'));
    const searchData = JSON.parse(localStorage.getItem('searchData'));
    
    let origin, destination;
    if (selectedRoute) {
        origin = selectedRoute.origin;
        destination = selectedRoute.destination;
    } else if (searchData) {
        origin = searchData.origin;
        destination = searchData.destination;
    } else {
        origin = '';
        destination = '';
    }

    // Pre-fill the search form
    document.getElementById('originInput').value = origin;
    document.getElementById('destinationInput').value = destination;
    if (searchData && searchData.date) {
        document.getElementById('dateInput').value = searchData.date;
    }

    // Filter passages
    let filteredPassages = filtrarPassagens(passagens, origin, destination);

    // If no passages are found, generate mock passages
    if (filteredPassages.length === 0 && origin && destination) {
        filteredPassages = generateMockPassages(origin, destination);
    }

    // Render passages
    const passagesContainer = document.getElementById('passagesContainer');
    renderizarPassagens(passagesContainer, filteredPassages);
}

function generateMockPassages(origin, destination) {
    const companies = ['Satélite Azul', 'Viação Verde', 'Expresso Rápido', 'Ônibus Conforto', 'TransBrasil'];
    const busModels = ['Volvo Multi Axle Semi Sleeper', 'Mercedes Benz Sleeper', 'Scania Executive', 'Marcopolo G7', 'Comil Campione'];
    const passages = [];

    for (let i = 0; i < 5; i++) {
        const departureHour = 8 + i * 2; // E.g., 08:00, 10:00, 12:00, 14:00, 16:00
        const precoOriginal = 150 + i * 20; // E.g., R$150, R$170, R$190, R$210, R$230
        // Assign discount based on price (higher price = higher discount)
        const desconto = precoOriginal > 200 ? "40" : precoOriginal > 180 ? "30" : precoOriginal > 160 ? "20" : "10";

        passages.push({
            empresa: companies[i % companies.length],
            modelo: busModels[i % busModels.length],
            origem: origin,
            destino: destination,
            horarioSaida: `${departureHour.toString().padStart(2, '0')}:00`,
            horarioChegada: `${(departureHour + 4).toString().padStart(2, '0')}:00`,
            precoOriginal: precoOriginal.toFixed(2),
            desconto: desconto,
            assentos: Array.from({ length: 40 }, (_, idx) => ({
                numero: idx + 1,
                disponivel: Math.random() > 0.3,
                reservadoPorMulher: Math.random() > 0.9
            }))
        });
    }
    return passages;
}

document.addEventListener('DOMContentLoaded', () => {
    loadPassages();
});