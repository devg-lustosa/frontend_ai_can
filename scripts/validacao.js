function irParaLoading() {
  const form = document.getElementById("posCadastroForm");
  let isValid = true;

  // Remove mensagens antigas
  form.querySelectorAll(".error-message").forEach((el) => el.remove());

  // Nome e Sobrenome
  const nome = document.getElementById("nome");
  if (!nome.value.trim()) {
    mostrarErro(nome, "Nome e Sobrenome é obrigatório.");
    isValid = false;
  } else if (/\d/.test(nome.value)) {
    mostrarErro(nome, "Nome não pode conter números.");
    isValid = false;
  }

  // Peso
  const peso = document.getElementById("peso");
  if (!peso.value.trim()) {
    mostrarErro(peso, "Peso é obrigatório.");
    isValid = false;
  } else if (peso.value <= 0 || peso.value > 350) {
    mostrarErro(peso, "Peso deve ser entre 1 e 350 kg.");
    isValid = false;
  }

  // Idade
  const idade = document.getElementById("idade");
  if (!idade.value.trim()) {
    mostrarErro(idade, "Idade é obrigatória.");
    isValid = false;
  } else if (idade.value <= 0 || idade.value > 100) {
    mostrarErro(idade, "Idade deve ser entre 1 e 100 anos.");
    isValid = false;
  }

  // Altura
  const altura = document.getElementById("altura");
  if (!altura.value.trim()) {
    mostrarErro(altura, "Altura é obrigatória.");
    isValid = false;
  } else if (altura.value <= 0 || altura.value > 250) {
    mostrarErro(altura, "Altura deve ser entre 1 e 250 cm.");
    isValid = false;
  }

  // Disponibilidade
  const disponibilidade = document.getElementById("disponibilidade");
  if (!disponibilidade.value.trim()) {
    mostrarErro(disponibilidade, "Disponibilidade é obrigatória.");
    isValid = false;
  } else if (disponibilidade.value < 1 || disponibilidade.value > 7) {
    mostrarErro(
      disponibilidade,
      "Disponibilidade deve ser entre 1 e 7 vezes por semana."
    );
    isValid = false;
  }

  // Local de Treino
  const localTreino = document.getElementById("localTreino");
  if (!localTreino.value) {
    mostrarErro(localTreino, "Selecione um local de treino.");
    isValid = false;
  }

  // Objetivo
  const objetivo = document.getElementById("objetivo");
  if (!objetivo.value) {
    mostrarErro(objetivo, "Selecione um objetivo.");
    isValid = false;
  }

  // Se tudo válido, redireciona para loading
  if (isValid) {
    window.location.href = "../view/lista-exercicios.html"; // ajuste o caminho conforme sua estrutura
  }
}

// Função auxiliar para mostrar erro
function mostrarErro(input, mensagem) {
  const span = document.createElement("span");
  span.classList.add("error-message");
  span.innerText = mensagem;
  input.parentNode.appendChild(span);
}
