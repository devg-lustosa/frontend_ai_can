// app/scripts/validators.js
// Validadores reutilizáveis para formulários

const validators = {
    required: (value) => ({
        isValid: !!value?.toString().trim(),
        message: 'Este campo é obrigatório'
    }),
    minLength: (min) => (value) => ({
        isValid: value?.toString().length >= min,
        message: `Mínimo de ${min} caracteres`
    }),
    maxLength: (max) => (value) => ({
        isValid: value?.toString().length <= max,
        message: `Máximo de ${max} caracteres`
    }),
    email: (value) => ({
        isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Email inválido'
    }),
    range: (min, max, unit = '') => (value) => {
        const num = Number(value);
        return {
            isValid: !isNaN(num) && num >= min && num <= max,
            message: `Deve estar entre ${min} e ${max}${unit ? ' ' + unit : ''}`
        };
    },
    pattern: (regex, message) => (value) => ({
        isValid: regex.test(value),
        message: message
    }),
    nome: (value) => ({
        isValid: /^[A-Za-zÀ-ÿ\s]+$/.test(value),
        message: 'Nome não pode conter números ou caracteres especiais'
    }),
    matchPassword: (passwordFieldId) => (value) => {
        const passwordField = document.getElementById(passwordFieldId);
        return {
            isValid: value === passwordField?.value,
            message: 'As senhas não coincidem'
        };
    }
};

function validateField(value, rules) {
    for (const rule of rules) {
        const result = rule(value);
        if (!result.isValid) {
            return result;
        }
    }
    return { isValid: true, message: '' };
}

function applyFieldValidation(field, isValid, message = '') {
    const errorElement = field.parentElement.querySelector('.error-message');

    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        if (errorElement) errorElement.textContent = '';
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        if (errorElement) {
            errorElement.textContent = message;
        } else {
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = message;
            error.style.color = '#ff4444';
            error.style.fontSize = '12px';
            error.style.marginTop = '4px';
            error.style.display = 'block';
            field.parentElement.appendChild(error);
        }
    }
}
