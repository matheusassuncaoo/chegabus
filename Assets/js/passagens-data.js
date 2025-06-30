// Lista de todas as cidades disponíveis para o autocomplete
const todasAsCidades = [
    "Cuiabá, MT",
    "Sinop, MT",
    "Primavera do Leste, MT",
    "Nobres, MT",
    "Alto Araguaia, MT",
    "Rio de Janeiro, RJ",
    "São Paulo, SP",
    "Florianópolis, SC",
    "Salvador, BA",
    "Manaus, AM",
    "Rondonópolis, MT",
    "Várzea Grande, MT",
    "Tangará da Serra, MT",
    "Campo Grande, MS",
    "Goiânia, GO",
    "Brasília, DF"
];

// Array com os dados das passagens disponíveis no sistema
// Cada passagem contém informações da empresa, ônibus, rota, horários e assentos
const passagens = [
    {
        empresa: "Satélite Azul",
        modelo: "Volvo Multi Axle Semi Sleeper",
        origem: "Cuiabá, MT",
        destino: "Sinop, MT",
        horarioSaida: "08:00",
        horarioChegada: "12:00",
        precoOriginal: 150.00, // Preço original da passagem
        desconto: "25", // Percentual de desconto (sem o símbolo %)
        assentos: Array.from({ length: 40 }, (_, indice) => ({
            numero: indice + 1,
            disponivel: Math.random() > 0.3, // 70% de chance de estar disponível
            reservadoPorMulher: Math.random() > 0.9 // 10% de chance de ser reservado por mulher
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
        assentos: Array.from({ length: 40 }, (_, indice) => ({
            numero: indice + 1,
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
        assentos: Array.from({ length: 40 }, (_, indice) => ({
            numero: indice + 1,
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
        desconto: "30", // Ajustado para um valor mais realista
        assentos: Array.from({ length: 40 }, (_, indice) => ({
            numero: indice + 1,
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
        desconto: "40", // Desconto maior para uma rota mais longa
        assentos: Array.from({ length: 40 }, (_, indice) => ({
            numero: indice + 1,
            disponivel: Math.random() > 0.3,
            reservadoPorMulher: Math.random() > 0.9
        }))
    }
];

/**
 * Função para filtrar passagens baseada na origem e destino
 * @param {Array} passagens - Array com todas as passagens
 * @param {string} origem - Cidade de origem para filtrar
 * @param {string} destino - Cidade de destino para filtrar
 * @returns {Array} - Array com as passagens que correspondem aos filtros
 */
function filtrarPassagens(passagens, origem, destino) {
    // Se não há filtros, retorna todas as passagens
    if (!origem && !destino) return passagens;
    
    // Filtra as passagens que correspondem aos critérios
    // Converte para minúsculas para fazer busca case-insensitive
    return passagens.filter(passagem => 
        passagem.origem.toLowerCase().includes(origem.toLowerCase()) && 
        passagem.destino.toLowerCase().includes(destino.toLowerCase())
    );
}