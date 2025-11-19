document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    const usuarioError = document.getElementById("usuario-error");
    const emailError = document.getElementById("email-error");
    const senhaError = document.getElementById("senha-error");
    const confirmarSenhaError = document.getElementById(
      "confirmar-senha-error"
    );

    usuarioError.textContent = "";
    emailError.textContent = "";
    senhaError.textContent = "";
    confirmarSenhaError.textContent = "";

    let valido = true;

    // Validação usuario
    if (usuario === "") {
      usuarioError.textContent = "Digite seu nome de usuário";
      valido = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      emailError.textContent = "Digite seu e-mail";
      valido = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Digite um e-mail válido";
      valido = false;
    }

    // Validar senha
    if (senha === "") {
      senhaError.textContent = "Digite a senha.";
      valido = false;
    } else if (senha.length < 6) {
      senhaError.textContent = "A senha deve ter pelo menos 6 caracteres";
      valido = false;
    }

    if (confirmarSenha === "") {
      confirmarSenhaError.textContent = "Confirme sua senha";
      valido = false;
    } else if (senha !== confirmarSenha) {
      confirmarSenhaError.textContent = "As senhas não coincidem";
      valido = false;
    }

    // Se tiver tudo Ok
    if (valido) {
      alert("Cadastro realizado com sucesso!");
      // this.submit(); // Desconecte para enviar ao servidor
    }
  });
