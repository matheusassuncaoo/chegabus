feather.replace();

const popularRoutes = [
    { destination: "Cuiabá, MT → Sinop, MT", image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQ84rKF_82HHLKusSWRkLwQkyRn46WrlIUW5fJESRi-RuZp1QiLy9jBVxhq0SmvRxgGibFq2CJ-BXehMTKaYd5LeDQgSYOQ_jukTfEgQg", discount: "-25%" },
    { destination: "Cuiabá, MT → Primavera do Leste, MT", image: "https://lh3.googleusercontent.com/p/AF1QipNskjxkS1JMO24x0g6JJwwDnyKbfFr00RWdVB-O=w594-h343-n-k-no", discount: "-20%" },
    { destination: "Nobres, MT → Sinop, MT", image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn9GcQ84rKF_82HHLKusSWRkLwQkyRn46WrlIUW5fJESRi-RuZp1QiLy9jBVxhq0SmvRxgGibFq2CJ-BXehMTKaYd5LeDQgSYOQ_jukTfEgQg", discount: "-15%" },
    { destination: "Cuiabá, MT → Alto Araguaia, MT", image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn9GcRZ5ayhTBpWDiJYZtwmFzw8h4rZMp5IxEy-E-PBbFiVv4-5JAoY70GZSURg5_-nIdDp7gA-QvDl10Vho4pbsVfX5KfoEXvgY6sm9M2L3w", discount: "-85%" }
];

const recentRoutes = [
    { destination: "Cuiabá, MT → Rio de Janeiro, RJ", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325", discount: "-25%" },
    { destination: "Cuiabá, MT → São Paulo, SP", image: "https://lh3.googleusercontent.com/p/AF1QipMGIvyxHIHM6WzEEpOvqyVXatJC6W7QklJ5smMm=w594-h343-n-k-no", discount: "-25%" },
    { destination: "Florianópolis, SC → São Paulo, SP", image: "https://lh3.googleusercontent.com/p/AF1QipMGIvyxHIHM6WzEEpOvqyVXatJC6W7QklJ5smMm=w594-h343-n-k-no", discount: "-25%" },
    { destination: "Salvador, BA → Manaus, AM", image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn9GcTR09PDgyiOVLbrU6QqpavE0kR6QBbcHYWNHj-yEwuCxJgzvO2wPbMd6lgawapE6iTsMoGFNXQfaUPwSeADrYAk3VshJ8Sx6CNjVvT-qQ", discount: "-85%" }
];

function renderRoutes(containerId, routes) {
    const container = document.getElementById(containerId);
    
    routes.forEach(route => {
        const card = document.createElement('div');
        card.className = 'route-card';
        card.innerHTML = `
            <img src="${route.image}" alt="${route.destination}" class="card-img-top">
            <span class="discount-badge">${route.discount}</span>
            <div class="card-body">
                <h5 class="card-title">${route.destination}</h5>
                <p class="card-text">Escolha sua rota e viaje com conforto!</p>
                <button class="btn view-passages-btn">Ver Passagens</button>
            </div>
        `;
        container.appendChild(card);

        // Add event listener to the "Ver Passagens" button
        card.querySelector('.view-passages-btn').addEventListener('click', () => {
            const [origin, destination] = route.destination.split(' → ');
            const routeData = { origin, destination };
            localStorage.setItem('selectedRoute', JSON.stringify(routeData));
            window.location.href = './passagens.html';
        });
    });
}

function searchRoutes() {
    const origin = document.querySelector('input[placeholder="Ponto de Partida"]').value;
    const destination = document.querySelector('input[placeholder="Ponto de Chegada"]').value;
    const date = document.querySelector('input[type="date"]').value;
    localStorage.setItem('searchData', JSON.stringify({ origin, destination, date }));
    window.location.href = './passagens.html';
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    renderRoutes('popularRoutes', popularRoutes);
    renderRoutes('recentRoutes', recentRoutes);
});