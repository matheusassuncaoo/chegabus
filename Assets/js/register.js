// Inicializa os ícones Feather quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    // Configura a funcionalidade dos campos de código
    configurarCamposCodigo();
});

/**
 * Função para alternar a visibilidade da senha
 * @param {string} inputId - ID do campo de senha
 * @param {string} iconId - ID do ícone do olho
 */
function alternarVisibilidadeSenha(inputId, iconId) {
    const campo = document.getElementById(inputId);
    const iconeOlho = document.getElementById(iconId);
    
    // Se a senha está oculta, mostra ela
    if (campo.type === 'password') {
        campo.type = 'text';
        iconeOlho.setAttribute('data-feather', 'eye');
    } else {
        // Se a senha está visível, oculta ela
        campo.type = 'password';
        iconeOlho.setAttribute('data-feather', 'eye-off');
    }
    
    // Atualiza os ícones na página
    feather.replace();
}

/**
 * Função principal de cadastro
 * Valida todos os campos e mostra a tela de verificação
 */
function cadastrar() {
    // Pega os valores dos campos e remove espaços em branco
    const primeiroNome = document.getElementById('firstNameInput').value.trim();
    const sobrenome = document.getElementById('lastNameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const telefone = document.getElementById('phoneInput').value.trim();
    const senha = document.getElementById('passwordInput').value;
    const confirmarSenha = document.getElementById('confirmPasswordInput').value;
    const termosAceitos = document.getElementById('termsCheckbox').checked;

    // Validação: verifica se todos os campos obrigatórios foram preenchidos
    if (!primeiroNome || !sobrenome || !email || !telefone || !senha || !confirmarSenha) {
        mostrarErro('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Validação: verifica se o email é válido
    if (!emailValido(email)) {
        mostrarErro('Por favor, insira um e-mail válido.');
        return;
    }

    // Validação: verifica se a senha tem pelo menos 6 caracteres
    if (senha.length < 6) {
        mostrarErro('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    // Validação: verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
        mostrarErro('As senhas não coincidem.');
        return;
    }

    // Validação: verifica se os termos foram aceitos
    if (!termosAceitos) {
        mostrarErro('Você deve aceitar os termos e condições.');
        return;
    }

    // Mostra a tela de verificação
    document.getElementById('emailDisplay').textContent = email;
    document.getElementById('registerScreen').style.display = 'none';
    document.getElementById('verificationScreen').style.display = 'block';
    
    // Inicia o timer de reenvio
    iniciarTimerReenvio();
}

/**
 * Função para verificar o código de 6 dígitos
 * Simula a verificação e redireciona para o dashboard
 */
function verificarCodigo() {
    const camposCodigo = document.querySelectorAll('.code-input');
    let codigo = '';
    
    // Junta todos os dígitos dos campos
    camposCodigo.forEach(campo => {
        codigo += campo.value;
    });

    // Verifica se o código tem 6 dígitos
    if (codigo.length !== 6) {
        mostrarErro('Por favor, insira o código completo de 6 dígitos.');
        return;
    }

    // Simula a verificação (em uma aplicação real, isso chamaria uma API)
    mostrarSucesso('Conta criada com sucesso! Redirecionando...');
    
    // Aguarda 2 segundos e redireciona
    setTimeout(() => {
        window.location.href = './dashboard.html';
    }, 2000);
}

/**
 * Função para reenviar o código de verificação
 * Reinicia o timer e simula o reenvio
 */
function reenviarCodigo() {
    const linkReenvio = document.querySelector('.resend-text a');
    const timerReenvio = document.getElementById('resendTimer');
    
    // Só reenvia se o timer não estiver ativo
    if (linkReenvio.style.display !== 'none') {
        linkReenvio.style.display = 'none';
        timerReenvio.style.display = 'block';
        iniciarTimerReenvio();
        
        // Simula o reenvio do código
        mostrarSucesso('Código reenviado com sucesso!');
    }
}

/**
 * Função para iniciar o timer de 30 segundos para reenvio
 * Mostra contagem regressiva e habilita reenvio após 30 segundos
 */
function iniciarTimerReenvio() {
    const linkReenvio = document.querySelector('.resend-text a');
    const timerReenvio = document.getElementById('resendTimer');
    const spanTimer = document.getElementById('timer');
    
    let tempoRestante = 30; // 30 segundos
    
    const timer = setInterval(() => {
        tempoRestante--;
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;
        
        // Formata o tempo como MM:SS
        spanTimer.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        
        // Quando chegar a 0, para o timer e habilita o reenvio
        if (tempoRestante <= 0) {
            clearInterval(timer);
            timerReenvio.style.display = 'none';
            linkReenvio.style.display = 'inline';
        }
    }, 1000); // Executa a cada 1 segundo
}

/**
 * Função para configurar os campos de código de 6 dígitos
 * Adiciona eventos para navegação automática entre campos
 */
function configurarCamposCodigo() {
    const camposCodigo = document.querySelectorAll('.code-input');
    
    camposCodigo.forEach((campo, indice) => {
        // Evento quando o usuário digita algo
        campo.addEventListener('input', function() {
            // Se digitou um caractere, vai para o próximo campo
            if (this.value.length === 1) {
                if (indice < camposCodigo.length - 1) {
                    camposCodigo[indice + 1].focus();
                }
            }
        });
        
        // Evento para lidar com a tecla Backspace
        campo.addEventListener('keydown', function(evento) {
            // Se pressionou Backspace e o campo está vazio, volta para o campo anterior
            if (evento.key === 'Backspace' && this.value.length === 0) {
                if (indice > 0) {
                    camposCodigo[indice - 1].focus();
                }
            }
        });
    });
}

/**
 * Função para validar formato de email usando regex
 * @param {string} email - Email a ser validado
 * @returns {boolean} - True se o email é válido
 */
function emailValido(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

/**
 * Função para mostrar mensagem de erro
 * Cria um elemento visual com a mensagem e remove automaticamente após 5 segundos
 * @param {string} mensagem - Mensagem de erro a ser exibida
 */
function mostrarErro(mensagem) {
    // Remove mensagens de erro existentes
    const erroExistente = document.querySelector('.error-message');
    if (erroExistente) {
        erroExistente.remove();
    }
    
    // Cria o elemento da mensagem de erro
    const divErro = document.createElement('div');
    divErro.className = 'error-message';
    divErro.style.cssText = `
        background-color: #ffebee;
        color: #c62828;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 14px;
        border: 1px solid #ffcdd2;
    `;
    divErro.textContent = mensagem;
    
    // Insere a mensagem no início do container
    const container = document.querySelector('.register-container, .verification-container');
    container.insertBefore(divErro, container.firstChild);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (divErro.parentNode) {
            divErro.remove();
        }
    }, 5000);
}

/**
 * Função para mostrar mensagem de sucesso
 * Cria um elemento visual com a mensagem e remove automaticamente após 5 segundos
 * @param {string} mensagem - Mensagem de sucesso a ser exibida
 */
function mostrarSucesso(mensagem) {
    // Remove mensagens de sucesso existentes
    const sucessoExistente = document.querySelector('.success-message');
    if (sucessoExistente) {
        sucessoExistente.remove();
    }
    
    // Cria o elemento da mensagem de sucesso
    const divSucesso = document.createElement('div');
    divSucesso.className = 'success-message';
    divSucesso.style.cssText = `
        background-color: #e8f5e8;
        color: #2e7d32;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 14px;
        border: 1px solid #c8e6c9;
    `;
    divSucesso.textContent = mensagem;
    
    // Insere a mensagem no início do container
    const container = document.querySelector('.register-container, .verification-container');
    container.insertBefore(divSucesso, container.firstChild);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (divSucesso.parentNode) {
            divSucesso.remove();
        }
    }, 5000);
} 