// scripts/cadastro.js

document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('form-cadastro');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleRegister);
    }
});

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const svg = btn.querySelector('svg');

    if (input.type === 'password') {
        input.type = 'text';
        // Ícone de olho cortado (esconder)
        svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
    } else {
        input.type = 'password';
        // Ícone de olho normal (mostrar)
        svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }
}

async function handleRegister(event) {
    event.preventDefault();

    const nome = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const messageDiv = document.getElementById('auth-message');
    const btnSubmit = event.target.querySelector('button[type="submit"]');

    // Reset mensagem
    messageDiv.className = 'message hidden';
    messageDiv.textContent = '';

    // Validação básica
    if (password.length < 6) {
        messageDiv.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        return;
    }

    if (password !== confirmPassword) {
        messageDiv.textContent = 'As senhas não coincidem.';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        return;
    }

    // Loading state
    const originalBtnText = btnSubmit.textContent;
    btnSubmit.textContent = 'Cadastrando...';
    btnSubmit.disabled = true;

    try {
        const payload = {
            email: email,
            password: password,
            nome: nome
        };

        // Usa função centralizada do api.js
        await cadastrarUsuario(payload);

        // Sucesso
        messageDiv.textContent = 'Conta criada com sucesso! Redirecionando para login...';
        messageDiv.className = 'message success';
        messageDiv.classList.remove('hidden');

        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);

    } catch (error) {
        console.error('Erro no cadastro:', error);
        messageDiv.textContent = error.message || 'Erro ao conectar com o servidor';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
    } finally {
        btnSubmit.textContent = originalBtnText;
        btnSubmit.disabled = false;
    }
}
