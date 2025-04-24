feather.replace();

function togglePassword() {
    const passwordInput = document.getElementById('passwordInput');
    const eyeIcon = document.getElementById('eyeIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('data-feather', 'eye');
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('data-feather', 'eye-off');
    }
    feather.replace();
}

function showForgotPassword() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('forgotPasswordScreen').style.display = 'block';
}

function showVerification() {
    const emailInput = document.getElementById('forgotEmailInput').value;
    if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    document.getElementById('emailDisplay').textContent = emailInput;
    document.getElementById('emailVerificationDisplay').textContent = emailInput;
    document.getElementById('forgotPasswordScreen').style.display = 'none';
    document.getElementById('verificationScreen').style.display = 'block';
}

function login() {
    const emailInput = document.getElementById('emailInput').value;
    const passwordInput = document.getElementById('passwordInput').value;

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!emailInput || (!emailRegex.test(emailInput) && !phoneRegex.test(emailInput))) {
        alert('Por favor, insira um e-mail ou número de telefone válido.');
        return;
    }
    if (!passwordInput || passwordInput.length < 6) {
        alert('Por favor, insira uma senha com pelo menos 6 caracteres.');
        return;
    }

    // Simulate login (replace with actual authentication logic)
    localStorage.setItem('user', JSON.stringify({ email: emailInput }));
    window.location.href = 'dashboard.html';
}

// Auto-focus next code input
document.querySelectorAll('.code-input').forEach((input, index, inputs) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
        }
    });
});