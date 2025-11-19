document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    const emailError = document.getElementById("email-error");
    const senhaError = document.getElementById("senha-error");

    emailError.textContent = "";
    senhaError.textContent = "";

    let valido = true;

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

    // Se tiver tudo Ok
    if (valido) {
      alert("Login realizado com sucesso!");
      // this.submit(); // Desconecte para enviar ao servidor
    }
  });
