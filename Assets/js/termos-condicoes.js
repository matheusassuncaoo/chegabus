// Inicializa os ícones Feather quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
});

/**
 * Função para voltar à página anterior
 * Se houver uma página anterior no histórico, volta para ela
 * Caso contrário, redireciona para a página inicial
 */
function voltar() {
    // Verifica se existe uma página anterior no histórico do navegador
    if (document.referrer) {
        window.history.back(); // Volta para a página anterior
    } else {
        window.location.href = '/index.html'; // Redireciona para a página inicial
    }
} 