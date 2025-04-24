feather.replace();

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function nextStep(step) {
    const currentStep = document.querySelector('.form-step.active');
    const nextStepElement = document.getElementById(`step${step}`);
    const progressSteps = document.querySelectorAll('.progress-step');

    // Validation for Step 1
    if (step === 2) {
        const nomeSobrenome = document.getElementById('nomeSobrenome').value.trim();
        const celular = document.getElementById('celular').value.trim();
        if (!nomeSobrenome || !celular) {
            alert('Por favor, preencha todos os campos antes de continuar.');
            return;
        }
        // Update the CPF step title with the entered name
        const firstName = nomeSobrenome.split(' ')[0];
        document.getElementById('cpfTitle').textContent = `${firstName}, qual seu CPF?`;
    }

    // Validation for Step 2
    if (step === 3) {
        const cpf = document.getElementById('cpf').value.trim();
        if (!cpf || cpf.length !== 11 || !/^\d+$/.test(cpf)) {
            alert('Por favor, insira um CPF válido com 11 dígitos.');
            return;
        }
        // Save the form data to localStorage for confirmation
        const nomeSobrenome = document.getElementById('nomeSobrenome').value.trim();
        const celular = document.getElementById('celular').value.trim();
        const reservaData = JSON.parse(localStorage.getItem('reservaData')) || {};
        reservaData.passageiro = { nome: nomeSobrenome, celular, cpf };
        localStorage.setItem('reservaData', JSON.stringify(reservaData));
    }

    // Hide current step and show next step
    currentStep.classList.remove('active');
    nextStepElement.classList.add('active');

    // Update progress bar
    progressSteps.forEach(stepElement => {
        stepElement.classList.remove('active');
        if (parseInt(stepElement.getAttribute('data-step')) <= step) {
            stepElement.classList.add('active');
        }
    });
}

function previousStep(step) {
    const currentStep = document.querySelector('.form-step.active');
    const previousStepElement = document.getElementById(`step${step}`);
    const progressSteps = document.querySelectorAll('.progress-step');

    // Hide current step and show previous step
    currentStep.classList.remove('active');
    previousStepElement.classList.add('active');

    // Update progress bar
    progressSteps.forEach(stepElement => {
        stepElement.classList.remove('active');
        if (parseInt(stepElement.getAttribute('data-step')) <= step) {
            stepElement.classList.add('active');
        }
    });
}

// Add CPF mask
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    e.target.value = value;
});

document.addEventListener('DOMContentLoaded', () => {
    // Ensure the first step is active on page load
    document.getElementById('step1').classList.add('active');
});feather.replace();

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function nextStep(step) {
    const currentStep = document.querySelector('.form-step.active');
    const nextStepElement = document.getElementById(`step${step}`);
    const progressSteps = document.querySelectorAll('.progress-step');

    // Validation for Step 1
    if (step === 2) {
        const nomeSobrenome = document.getElementById('nomeSobrenome').value.trim();
        const celular = document.getElementById('celular').value.trim();
        if (!nomeSobrenome || !celular) {
            alert('Por favor, preencha todos os campos antes de continuar.');
            return;
        }
        // Update the CPF step title with the entered name
        const firstName = nomeSobrenome.split(' ')[0];
        document.getElementById('cpfTitle').textContent = `${firstName}, qual seu CPF?`;
    }

    // Validation for Step 2
    if (step === 3) {
        const cpf = document.getElementById('cpf').value.trim();
        if (!cpf || cpf.length !== 11 || !/^\d+$/.test(cpf)) {
            alert('Por favor, insira um CPF válido com 11 dígitos.');
            return;
        }
        // Save the form data to localStorage for confirmation
        const nomeSobrenome = document.getElementById('nomeSobrenome').value.trim();
        const celular = document.getElementById('celular').value.trim();
        const reservaData = JSON.parse(localStorage.getItem('reservaData')) || {};
        reservaData.passageiro = { nome: nomeSobrenome, celular, cpf };
        localStorage.setItem('reservaData', JSON.stringify(reservaData));
    }

    // Hide current step and show next step
    currentStep.classList.remove('active');
    nextStepElement.classList.add('active');

    // Update progress bar
    progressSteps.forEach(stepElement => {
        stepElement.classList.remove('active');
        if (parseInt(stepElement.getAttribute('data-step')) <= step) {
            stepElement.classList.add('active');
        }
    });
}

function previousStep(step) {
    const currentStep = document.querySelector('.form-step.active');
    const previousStepElement = document.getElementById(`step${step}`);
    const progressSteps = document.querySelectorAll('.progress-step');

    // Hide current step and show previous step
    currentStep.classList.remove('active');
    previousStepElement.classList.add('active');

    // Update progress bar
    progressSteps.forEach(stepElement => {
        stepElement.classList.remove('active');
        if (parseInt(stepElement.getAttribute('data-step')) <= step) {
            stepElement.classList.add('active');
        }
    });
}

// Add CPF mask
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    e.target.value = value;
});

document.addEventListener('DOMContentLoaded', () => {
    // Ensure the first step is active on page load
    document.getElementById('step1').classList.add('active');
});