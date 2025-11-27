// scripts/cadastro.js

document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('form-cadastro');
    const passwordInput = document.getElementById('register-password');
    const passwordHint = document.getElementById('password-hint');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleRegister);
    }

    if (passwordInput && passwordHint) {
        passwordInput.addEventListener('focus', () => {
            passwordHint.classList.remove('hidden');
            passwordHint.style.display = 'block';
        });

        passwordInput.addEventListener('blur', () => {
            // Só esconde se o campo estiver vazio
            if (!passwordInput.value) {
                passwordHint.classList.add('hidden');
                passwordHint.style.display = 'none';
            }
        });
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

    // Validação de NOME (apenas letras e espaços)
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!nome || nome.trim().length < 3) {
        messageDiv.textContent = 'O nome deve ter pelo menos 3 caracteres.';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        return;
    }

    if (!nomeRegex.test(nome)) {
        messageDiv.textContent = 'O nome não pode conter números ou caracteres especiais.';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        return;
    }

    if (nome.length > 100) {
        messageDiv.textContent = 'O nome não pode ter mais de 100 caracteres.';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        return;
    }

    // Validação de EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        messageDiv.textContent = 'Digite um e-mail válido.';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        return;
    }

    // Validação de SENHA
    if (!password || password.length < 6) {
        messageDiv.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        return;
    }

    if (password.length > 100) {
        messageDiv.textContent = 'A senha não pode ter mais de 100 caracteres.';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        return;
    }

    // Validação de FORÇA DA SENHA
    const temMaiuscula = /[A-Z]/.test(password);
    const temMinuscula = /[a-z]/.test(password);
    const temNumero = /[0-9]/.test(password);
    const temEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (!temMaiuscula || !temMinuscula || !temNumero || !temEspecial) {
        messageDiv.textContent = 'A senha deve conter: maiúscula, minúscula, número e caractere especial (!@#$%...).';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        return;
    }

    // Validação de CONFIRMAÇÃO DE SENHA
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
