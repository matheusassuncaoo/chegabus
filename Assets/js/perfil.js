// Inicializa os ícones Feather quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    // Define o filtro inicial do histórico como "hoje"
    filtrarHistorico('hoje');
});

/**
 * Função para mostrar/ocultar o menu lateral (sidebar) no mobile
 * Alterna a classe 'active' que controla a visibilidade
 */
function alternarMenuLateral() {
    const menuLateral = document.getElementById('sidebar');
    if (menuLateral) {
        menuLateral.classList.toggle('active');
    }
}

/**
 * Função para alternar o modo de edição de diferentes seções
 * Habilita/desabilita campos e mostra/esconde botões de ação
 * @param {string} secao - Nome da seção a ser editada (personal, security, preferences)
 */
function alternarModoEdicao(secao) {
    const formulario = document.getElementById(secao + 'Form');
    const acoes = document.getElementById(secao + 'Actions');
    const campos = formulario.querySelectorAll('input, select');
    
    // Habilita/desabilita os campos
    campos.forEach(campo => {
        if (campo.type === 'checkbox') {
            campo.disabled = !campo.disabled;
        } else {
            campo.readOnly = !campo.readOnly;
        }
    });
    
    // Mostra/esconde os botões de ação
    acoes.style.display = acoes.style.display === 'none' ? 'flex' : 'none';
    
    // Atualiza o texto do botão de editar
    const botaoEditar = formulario.previousElementSibling.querySelector('.edit-btn');
    const icone = botaoEditar.querySelector('i');
    
    if (acoes.style.display === 'flex') {
        botaoEditar.innerHTML = '<i data-feather="x"></i> Cancelar';
        feather.replace();
    } else {
        botaoEditar.innerHTML = '<i data-feather="edit-2"></i> Editar';
        feather.replace();
    }
}

/**
 * Função para cancelar o modo de edição
 * Reseta o formulário para os valores originais
 * @param {string} secao - Nome da seção a ser cancelada
 */
function cancelarEdicao(secao) {
    const formulario = document.getElementById(secao + 'Form');
    const acoes = document.getElementById(secao + 'Actions');
    const campos = formulario.querySelectorAll('input, select');
    
    // Reseta o formulário para os valores originais
    resetarFormularioOriginal(secao);
    
    // Desabilita os campos
    campos.forEach(campo => {
        if (campo.type === 'checkbox') {
            campo.disabled = true;
        } else {
            campo.readOnly = true;
        }
    });
    
    // Esconde os botões de ação
    acoes.style.display = 'none';
    
    // Reseta o botão de editar
    const botaoEditar = formulario.previousElementSibling.querySelector('.edit-btn');
    botaoEditar.innerHTML = '<i data-feather="edit-2"></i> Editar';
    feather.replace();
}

/**
 * Função para salvar informações pessoais
 * Valida os campos e simula uma chamada de API
 */
function salvarInformacoesPessoais() {
    const primeiroNome = document.getElementById('firstName').value.trim();
    const sobrenome = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('phone').value.trim();
    const dataNascimento = document.getElementById('birthDate').value;
    const cpf = document.getElementById('cpf').value.trim();
    
    // Validação: verifica se todos os campos obrigatórios foram preenchidos
    if (!primeiroNome || !sobrenome || !email || !telefone || !dataNascimento || !cpf) {
        mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Validação: verifica se o email é válido
    if (!emailValido(email)) {
        mostrarMensagem('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    // Validação: verifica se o CPF é válido
    if (!cpfValido(cpf)) {
        mostrarMensagem('Por favor, insira um CPF válido.', 'error');
        return;
    }
    
    // Simula chamada de API
    mostrarMensagem('Informações pessoais atualizadas com sucesso!', 'success');
    
    // Salva no localStorage para demonstração
    const dadosUsuario = {
        primeiroNome,
        sobrenome,
        email,
        telefone,
        dataNascimento,
        cpf
    };
    localStorage.setItem('userPersonalInfo', JSON.stringify(dadosUsuario));
    
    // Sai do modo de edição
    cancelarEdicao('personal');
}

/**
 * Função para salvar informações de segurança (senha)
 * Valida os campos e simula alteração de senha
 */
function salvarInformacoesSeguranca() {
    const senhaAtual = document.getElementById('currentPassword').value;
    const novaSenha = document.getElementById('newPassword').value;
    const confirmarSenha = document.getElementById('confirmPassword').value;
    
    // Validação: verifica se todos os campos foram preenchidos
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
        mostrarMensagem('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    // Validação: verifica se a nova senha tem pelo menos 6 caracteres
    if (novaSenha.length < 6) {
        mostrarMensagem('A nova senha deve ter pelo menos 6 caracteres.', 'error');
        return;
    }
    
    // Validação: verifica se as senhas coincidem
    if (novaSenha !== confirmarSenha) {
        mostrarMensagem('As senhas não coincidem.', 'error');
        return;
    }
    
    // Simula chamada de API
    mostrarMensagem('Senha alterada com sucesso!', 'success');
    
    // Limpa os campos de senha
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    // Sai do modo de edição
    cancelarEdicao('security');
}

/**
 * Função para salvar preferências do usuário
 * Salva configurações de idioma, fuso horário e notificações
 */
function salvarPreferencias() {
    const idioma = document.getElementById('language').value;
    const fusoHorario = document.getElementById('timezone').value;
    const notificacoesEmail = document.getElementById('emailNotifications').checked;
    const notificacoesPush = document.getElementById('pushNotifications').checked;
    
    // Simula chamada de API
    mostrarMensagem('Preferências atualizadas com sucesso!', 'success');
    
    // Salva no localStorage para demonstração
    const preferencias = {
        idioma,
        fusoHorario,
        notificacoesEmail,
        notificacoesPush
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferencias));
    
    // Sai do modo de edição
    cancelarEdicao('preferences');
}

/**
 * Função para excluir a conta do usuário
 * Pede confirmação dupla antes de excluir
 */
function excluirConta() {
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
        if (confirm('Esta é sua última chance. Tem certeza absoluta?')) {
            mostrarMensagem('Conta excluída com sucesso. Redirecionando...', 'success');
            
            // Simula exclusão da conta
            setTimeout(() => {
                localStorage.clear();
                window.location.href = './login.html';
            }, 2000);
        }
    }
}

/**
 * Função para exportar dados do usuário
 * Cria um arquivo JSON com os dados e faz o download
 */
function exportarDados() {
    // Coleta os dados do usuário
    const dadosUsuario = {
        pessoal: JSON.parse(localStorage.getItem('userPersonalInfo') || '{}'),
        preferencias: JSON.parse(localStorage.getItem('userPreferences') || '{}'),
        dataExportacao: new Date().toISOString()
    };
    
    // Cria e faz download do arquivo
    const dadosString = JSON.stringify(dadosUsuario, null, 2);
    const dadosBlob = new Blob([dadosString], {type: 'application/json'});
    const url = URL.createObjectURL(dadosBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chegabus-user-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    mostrarMensagem('Dados exportados com sucesso!', 'success');
}

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
 * Função para resetar o formulário para os valores originais
 * @param {string} secao - Nome da seção a ser resetada
 */
function resetarFormularioOriginal(secao) {
    // Isso normalmente carregaria de uma API ou dados armazenados
    // Para demonstração, usamos valores padrão
    const valoresPadrao = {
        personal: {
            firstName: 'João',
            lastName: 'Silva',
            email: 'joao.silva@email.com',
            phone: '(11) 99999-9999',
            birthDate: '1990-05-15',
            cpf: '123.456.789-00'
        },
        preferences: {
            language: 'pt-BR',
            timezone: 'America/Sao_Paulo',
            emailNotifications: true,
            pushNotifications: true
        }
    };
    
    if (secao === 'personal') {
        Object.keys(valoresPadrao.personal).forEach(chave => {
            const campo = document.getElementById(chave);
            if (campo) {
                campo.value = valoresPadrao.personal[chave];
            }
        });
    } else if (secao === 'preferences') {
        document.getElementById('language').value = valoresPadrao.preferences.language;
        document.getElementById('timezone').value = valoresPadrao.preferences.timezone;
        document.getElementById('emailNotifications').checked = valoresPadrao.preferences.emailNotifications;
        document.getElementById('pushNotifications').checked = valoresPadrao.preferences.pushNotifications;
    }
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
 * Função para validar CPF (versão simplificada)
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} - True se o CPF é válido
 */
function cpfValido(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    // Validação simplificada - em uma aplicação real, implementaria o algoritmo completo do CPF
    return true;
}

/**
 * Função para mostrar mensagens na tela
 * Cria um elemento visual com a mensagem e remove automaticamente após 5 segundos
 * @param {string} mensagem - Mensagem a ser exibida
 * @param {string} tipo - Tipo da mensagem (success, error, info)
 */
function mostrarMensagem(mensagem, tipo) {
    // Remove mensagens existentes
    const mensagemExistente = document.querySelector('.message');
    if (mensagemExistente) {
        mensagemExistente.remove();
    }
    
    // Cria o elemento da mensagem
    const divMensagem = document.createElement('div');
    divMensagem.className = 'message';
    divMensagem.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease;
    `;
    
    // Define a cor baseada no tipo da mensagem
    if (tipo === 'success') {
        divMensagem.style.backgroundColor = '#28a745';
    } else if (tipo === 'error') {
        divMensagem.style.backgroundColor = '#dc3545';
    } else {
        divMensagem.style.backgroundColor = '#0057D8';
    }
    
    divMensagem.textContent = mensagem;
    document.body.appendChild(divMensagem);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (divMensagem.parentNode) {
            divMensagem.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (divMensagem.parentNode) {
                    divMensagem.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Adiciona animações CSS
const estilo = document.createElement('style');
estilo.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(estilo);

/**
 * Função para filtrar o histórico de compras por período
 * @param {string} periodo - Período a ser filtrado (hoje, semana, mes)
 */
function filtrarHistorico(periodo) {
    // Atualiza o botão ativo
    const botoes = document.querySelectorAll('.filter-btn');
    botoes.forEach(botao => {
        botao.classList.toggle('active', botao.textContent.toLowerCase() === periodo);
    });

    const containerResumo = document.getElementById('purchase-summary');
    
    // Dados fictícios para demonstração
    const dados = {
        hoje: { valor: 'R$0,00', quantidade: 0 },
        semana: { valor: 'R$112,80', quantidade: 2 },
        mes: { valor: 'R$450,50', quantidade: 5 }
    };
    
    const dadosSelecionados = dados[periodo];

    let conteudo = `
        <p class="total-value">${dadosSelecionados.valor}</p>
        <p class="total-count">(${dadosSelecionados.quantidade} compras)</p>
    `;

    // Se não há compras, mostra placeholder
    if (dadosSelecionados.quantidade === 0) {
        conteudo += `
            <div class="placeholder">
                <i data-feather="shopping-bag"></i>
                <span>Nenhuma compra registrada para este período.</span>
            </div>
        `;
    }

    containerResumo.innerHTML = conteudo;
    feather.replace(); // Re-renderiza ícones se algum foi adicionado
}

/**
 * Função placeholder para editar perfil
 * Em uma aplicação real, redirecionaria para um formulário ou abriria um modal
 */
function editarPerfil() {
    alert('Navegando para a página de edição de perfil...');
    // Em uma aplicação real, isso redirecionaria para um formulário ou abriria um modal
} 