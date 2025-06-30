// Inicializa os ícones Feather (biblioteca de ícones)
feather.replace();

/**
 * Função para alternar a visibilidade da senha
 * @param {string} inputId - ID do campo de senha
 * @param {string} iconId - ID do ícone do olho
 */
function alternarVisibilidadeSenha(inputId, iconId) {
    const campoSenha = document.getElementById(inputId);
    const iconeOlho = document.getElementById(iconId);
    
    // Se a senha está oculta, mostra ela
    if (campoSenha.type === 'password') {
        campoSenha.type = 'text';
        iconeOlho.setAttribute('data-feather', 'eye');
    } else {
        // Se a senha está visível, oculta ela
        campoSenha.type = 'password';
        iconeOlho.setAttribute('data-feather', 'eye-off');
    }
    
    // Atualiza os ícones na página
    feather.replace();
}

/**
 * Função para mostrar a tela de "Esqueci minha senha"
 * Esconde a tela de login e mostra a tela de recuperação
 */
function mostrarEsqueciSenha() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('forgotPasswordScreen').style.display = 'block';
}

/**
 * Função para mostrar a tela de verificação de código
 * Valida o email e inicia o timer para reenvio
 */
function mostrarVerificacao() {
    const email = document.getElementById('forgotEmailInput').value;
    
    // Validação básica: verifica se o email foi preenchido
    if (!email) {
        alert('Por favor, insira seu e-mail.');
        return;
    }

    // Esconde a tela de esqueci senha e mostra a tela de verificação
    document.getElementById('forgotPasswordScreen').style.display = 'none';
    document.getElementById('verificationScreen').style.display = 'flex';
    
    // Mostra o email na tela de verificação
    document.getElementById('emailVerificationDisplay').textContent = email;

    // Inicia o timer de 59 segundos para reenvio
    iniciarTimerReenvio();
}

// Variável global para controlar o intervalo do timer
let intervaloTimer;

/**
 * Função para iniciar o timer de 59 segundos para reenvio de código
 * Mostra a contagem regressiva e habilita o reenvio após 59 segundos
 */
function iniciarTimerReenvio() {
    let segundos = 59;
    const elementoTimer = document.getElementById('resendTimer');
    const elementoReenvio = document.getElementById('resendCode');

    // Reseta o estado inicial
    elementoTimer.textContent = 'Solicite novo código em 00:59s';
    elementoTimer.style.display = 'block';
    elementoReenvio.style.display = 'none';
    elementoReenvio.querySelector('a').style.color = '';

    // Cria um intervalo que executa a cada 1 segundo
    intervaloTimer = setInterval(() => {
        segundos--;
        const segundosFormatados = String(segundos).padStart(2, '0');
        elementoTimer.textContent = `Solicite novo código em 00:${segundosFormatados}s`;

        // Quando chegar a 0, para o timer e habilita o reenvio
        if (segundos <= 0) {
            clearInterval(intervaloTimer);
            elementoTimer.style.display = 'none';
            elementoReenvio.style.display = 'block';
            elementoReenvio.querySelector('a').style.color = '#dc3545'; // Cor vermelha
        }
    }, 1000);
}

/**
 * Função para reenviar o código de verificação
 * Simula o reenvio e reinicia o timer
 */
function reenviarCodigo() {
    // Aqui iria a lógica real de reenvio do código
    alert("Um novo código de verificação foi enviado!");
    iniciarTimerReenvio(); // Reinicia o timer de 59 segundos
}

/**
 * Função principal de login
 * Valida os campos e simula o processo de autenticação
 */
function fazerLogin() {
    const emailDigitado = document.getElementById('emailInput').value;
    const senhaDigitada = document.getElementById('passwordInput').value;

    // Validação básica dos campos
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    
    // Verifica se o email/telefone é válido
    if (!emailDigitado || (!regexEmail.test(emailDigitado) && !regexTelefone.test(emailDigitado))) {
        alert('Por favor, insira um e-mail ou número de telefone válido.');
        return;
    }
    
    // Verifica se a senha tem pelo menos 6 caracteres
    if (!senhaDigitada || senhaDigitada.length < 6) {
        alert('Por favor, insira uma senha com pelo menos 6 caracteres.');
        return;
    }

    // Simula o login (aqui você conectaria com um backend real)
    // Salva os dados do usuário no localStorage do navegador
    localStorage.setItem('user', JSON.stringify({ email: emailDigitado }));
    
    // Redireciona para o dashboard após login bem-sucedido
    window.location.href = 'dashboard.html';
}

/**
 * Função para verificar o código de 6 dígitos e redirecionar
 * Coleta todos os dígitos dos campos e verifica se está completo
 */
function verificarERedirecionar() {
    const camposCodigo = document.querySelectorAll('.code-input');
    const codigoCompleto = Array.from(camposCodigo).map(campo => campo.value).join('');

    // Se o código tem 6 dígitos, considera válido
    if (codigoCompleto.length === 6) {
        // Simula a verificação e redireciona
        console.log('Código de verificação completo:', codigoCompleto);
        window.location.href = 'dashboard.html';
    }
}

// Evento que executa quando a página termina de carregar
document.addEventListener('DOMContentLoaded', () => {
    const camposCodigo = document.querySelectorAll('.code-input');
    
    // Se existem campos de código na página
    if (camposCodigo.length > 0) {
        camposCodigo.forEach((campo, indice) => {
            // Evento que executa quando o usuário digita algo
            campo.addEventListener('input', () => {
                // Move o foco para o próximo campo quando um dígito é digitado
                if (campo.value.length === 1 && indice < camposCodigo.length - 1) {
                    camposCodigo[indice + 1].focus();
                }

                // Se é o último campo e foi preenchido, verifica o código
                if (indice === camposCodigo.length - 1 && campo.value.length === 1) {
                    verificarERedirecionar();
                }
            });

            // Evento para lidar com a tecla Backspace
            campo.addEventListener('keydown', (evento) => {
                // Se pressionou Backspace e o campo está vazio, volta para o campo anterior
                if (evento.key === 'Backspace' && campo.value.length === 0 && indice > 0) {
                    camposCodigo[indice - 1].focus();
                }
            });
        });

        // Evento para colar código (Ctrl+V)
        camposCodigo[0].addEventListener('paste', (evento) => {
            evento.preventDefault(); // Previne o comportamento padrão
            
            // Pega o texto colado
            const textoColado = (evento.clipboardData || window.clipboardData).getData('text').trim();
            
            // Verifica se é um código válido de 6 dígitos
            if (textoColado.length === 6 && /^\d{6}$/.test(textoColado)) {
                // Distribui cada dígito nos campos correspondentes
                textoColado.split('').forEach((caractere, indice) => {
                    if (camposCodigo[indice]) {
                        camposCodigo[indice].value = caractere;
                    }
                });
                // Verifica e redireciona automaticamente
                verificarERedirecionar();
            }
        });
    }

    // Adiciona evento de clique no botão de verificar
    const botaoVerificar = document.querySelector('.verify-btn');
    if (botaoVerificar) {
        botaoVerificar.addEventListener('click', verificarERedirecionar);
    }
});