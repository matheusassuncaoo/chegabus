// Inicializa os ícones Feather (biblioteca de ícones)
feather.replace();

// Variáveis para controlar o carrossel de slides
let slideAtual = 0; // Índice do slide que está sendo exibido atualmente
const slides = [
    document.getElementById('slideScreen1'), // Primeiro slide
    document.getElementById('slideScreen2')  // Segundo slide
];
const pontos = document.querySelectorAll('.dot'); // Pontos de navegação
const navegacaoPontos = document.getElementById('navDots'); // Container dos pontos
const navegacaoSetas = document.getElementById('navArrows'); // Container das setas

/**
 * Função para atualizar a exibição dos slides
 * Ativa o slide atual e desativa os outros, além de atualizar os pontos
 */
function atualizarSlides() {
    // Percorre todos os slides e ativa apenas o atual
    slides.forEach((slide, indice) => {
        slide.classList.toggle('active', indice === slideAtual);
    });
    
    // Percorre todos os pontos e ativa apenas o do slide atual
    pontos.forEach((ponto, indice) => {
        ponto.classList.toggle('active', indice === slideAtual);
    });
}

/**
 * Função para mostrar um slide específico
 * @param {number} indice - Índice do slide que deve ser mostrado
 */
function mostrarSlide(indice) {
    slideAtual = indice;
    atualizarSlides();
}

/**
 * Função para ir para o próximo slide
 * Se estiver no último slide, redireciona para a página de login
 */
function proximoSlide() {
    if (slideAtual === 1) {
        // Se estiver no último slide, vai para a página de login
        window.location.href = './Assets/pages/login.html';
    } else {
        // Vai para o próximo slide (usa módulo para voltar ao início se necessário)
        slideAtual = (slideAtual + 1) % slides.length;
        atualizarSlides();
    }
}

/**
 * Função para ir para o slide anterior
 * Se estiver no primeiro slide, vai para o último
 */
function slideAnterior() {
    // Volta um slide (usa módulo para ir ao último se necessário)
    slideAtual = (slideAtual - 1 + slides.length) % slides.length;
    atualizarSlides();
}

// Evento que executa quando a página termina de carregar
window.onload = function() {
    // Aguarda 2 segundos (2000ms) antes de mostrar o primeiro slide
    setTimeout(() => {
        // Esconde a tela do logo
        document.getElementById('logoScreen').classList.add('hidden');
        
        // Mostra o primeiro slide
        document.getElementById('slideScreen1').classList.add('active');
        
        // Torna visível a navegação (pontos e setas)
        navegacaoPontos.classList.add('visible');
        navegacaoSetas.classList.add('visible');
    }, 2000); // 2000 milissegundos = 2 segundos
};