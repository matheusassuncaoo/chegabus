// Inicializa os ícones Feather (biblioteca de ícones)
feather.replace();

/**
 * Função para mostrar/ocultar o menu lateral (sidebar)
 * Alterna a classe 'active' que controla a visibilidade
 */
function alternarMenuLateral() {
    const menuLateral = document.getElementById('sidebar');
    menuLateral.classList.toggle('active');
}

/**
 * Função para ir para o próximo passo do formulário
 * Valida os campos do passo atual antes de avançar
 * @param {number} passo - Número do passo para onde ir
 */
function proximoPasso(passo) {
    const passoAtual = document.querySelector('.form-step.active');
    const proximoPassoElemento = document.getElementById(`step${passo}`);
    const passosProgresso = document.querySelectorAll('.progress-step');

    // Validação para o Passo 1 (Nome e Celular)
    if (passo === 2) {
        const nomeSobrenome = document.getElementById('nomeSobrenome').value.trim();
        const celular = document.getElementById('celular').value.trim();
        
        // Verifica se os campos obrigatórios foram preenchidos
        if (!nomeSobrenome || !celular) {
            alert('Por favor, preencha todos os campos antes de continuar.');
            return;
        }
        
        // Atualiza o título do passo do CPF com o nome digitado
        const primeiroNome = nomeSobrenome.split(' ')[0];
        document.getElementById('cpfTitle').textContent = `${primeiroNome}, qual seu CPF?`;
    }

    // Validação para o Passo 2 (CPF)
    if (passo === 3) {
        const cpf = document.getElementById('cpf').value.trim();
        
        // Verifica se o CPF tem 11 dígitos e são apenas números
        if (!cpf || cpf.length !== 11 || !/^\d+$/.test(cpf)) {
            alert('Por favor, insira um CPF válido com 11 dígitos.');
            return;
        }
        
        // Salva os dados do formulário no localStorage para confirmação
        const nomeSobrenome = document.getElementById('nomeSobrenome').value.trim();
        const celular = document.getElementById('celular').value.trim();
        const dadosReserva = JSON.parse(localStorage.getItem('reservaData')) || {};
        dadosReserva.passageiro = { nome: nomeSobrenome, celular, cpf };
        localStorage.setItem('reservaData', JSON.stringify(dadosReserva));
    }

    // Esconde o passo atual e mostra o próximo passo
    passoAtual.classList.remove('active');
    proximoPassoElemento.classList.add('active');

    // Atualiza a barra de progresso
    passosProgresso.forEach(elementoPasso => {
        elementoPasso.classList.remove('active');
        if (parseInt(elementoPasso.getAttribute('data-step')) <= passo) {
            elementoPasso.classList.add('active');
        }
    });
}

/**
 * Função para voltar ao passo anterior do formulário
 * @param {number} passo - Número do passo para onde voltar
 */
function passoAnterior(passo) {
    const passoAtual = document.querySelector('.form-step.active');
    const passoAnteriorElemento = document.getElementById(`step${passo}`);
    const passosProgresso = document.querySelectorAll('.progress-step');

    // Esconde o passo atual e mostra o passo anterior
    passoAtual.classList.remove('active');
    passoAnteriorElemento.classList.add('active');

    // Atualiza a barra de progresso
    passosProgresso.forEach(elementoPasso => {
        elementoPasso.classList.remove('active');
        if (parseInt(elementoPasso.getAttribute('data-step')) <= passo) {
            elementoPasso.classList.add('active');
        }
    });
}

// Adiciona máscara para o campo CPF (só permite números)
document.getElementById('cpf').addEventListener('input', function (evento) {
    let valor = evento.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos
    evento.target.value = valor;
});

// Evento que executa quando a página termina de carregar
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o primeiro passo esteja ativo quando a página carrega
    document.getElementById('step1').classList.add('active');
});