// app/scripts/solicitar-lista.js

const validators = {
  required: (value) => ({
    isValid: !!value?.trim(),
    message: "Este campo é obrigatório."
  }),

  minLength: (min) => (value) => ({
    isValid: value.trim().length >= min,
    message: `Deve ter pelo menos ${min} caracteres.`
  }),

  maxLength: (max) => (value) => ({
    isValid: value.trim().length <= max,
    message: `Deve ter no máximo ${max} caracteres.`
  }),

  pattern: (regex, msg) => (value) => ({
    isValid: regex.test(value),
    message: msg
  }),

  range: (min, max, unit = "") => (value) => ({
    isValid: value >= min && value <= max,
    message: `Deve ser entre ${min} e ${max}${unit ? ' ' + unit : ''}.`
  }),

  notEmpty: (value) => ({
    isValid: !!value,
    message: "Selecione uma opção."
  })
};

const regrasValidacao = {
  nome: [
    validators.required,
    validators.minLength(3),
    validators.maxLength(50),
    validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+$/, "Nome contém caracteres inválidos."),
    validators.pattern(/^[^0-9]*$/, "Nome não pode conter números.")
  ],

  peso: [
    validators.required,
    validators.range(20, 350, "kg")
  ],

  idade: [
    validators.required,
    validators.range(11, 110, "anos")
  ],

  altura: [
    validators.required,
    validators.range(50, 300, "cm")
  ],

  disponibilidade: [
    validators.required,
    validators.range(1, 7, "vezes por semana")
  ],

  localTreino: [
    validators.notEmpty
  ],

  objetivo: [
    validators.notEmpty
  ]
};

function validarCampo(input, rules) {
  const value = input.value;

  for (const rule of rules) {
    const result = rule(value);
    if (!result.isValid) {
      mostrarErro(input, result.message);
      return false;
    }
  }

  return true;
}

function mostrarErro(input, mensagem) {
  if (!input || !input.parentNode) {
    console.error('Elemento inválido para mostrar erro:', input);
    return;
  }
  const span = document.createElement("span");
  span.classList.add("error-message");
  span.textContent = mensagem;
  input.parentNode.appendChild(span);
}

function irParaLoading() {
  const form = document.getElementById("posCadastroForm");

  form.querySelectorAll(".error-message").forEach((el) => el.remove());

  const fields = [
    { id: 'nome', rules: regrasValidacao.nome },
    { id: 'peso', rules: regrasValidacao.peso },
    { id: 'idade', rules: regrasValidacao.idade },
    { id: 'altura', rules: regrasValidacao.altura },
    { id: 'disponibilidade', rules: regrasValidacao.disponibilidade },
    { id: 'localTreino', rules: regrasValidacao.localTreino },
    { id: 'objetivo', rules: regrasValidacao.objetivo }
  ];

  let isValid = true;

  for (const field of fields) {
    const input = document.getElementById(field.id);
    if (!input) {
      console.error(`Campo ${field.id} não encontrado no DOM`);
      isValid = false;
      continue;
    }
    if (!validarCampo(input, field.rules)) {
      isValid = false;
    }
  }

  if (!isValid) {
    return;
  }

  const payload = {
    nome: document.getElementById('nome').value.trim(),
    peso: Number(document.getElementById('peso').value),
    idade: Number(document.getElementById('idade').value),
    altura: Number(document.getElementById('altura').value),
    disponibilidade: Number(document.getElementById('disponibilidade').value),
    localTreino: document.getElementById('localTreino').value,
    objetivo: document.getElementById('objetivo').value,
  };

  if (!payload.nome || !payload.localTreino || !payload.objetivo) {
    console.error('Payload inválido:', payload);
    alert('Erro ao preparar dados. Por favor, tente novamente.');
    return;
  }

  try {
    salvarLocalStorage('aican_solicitacao', payload);
  } catch (err) {
    console.error('Erro ao salvar solicitação:', err);
    alert('Erro ao salvar dados. Por favor, tente novamente.');
    return;
  }

  const botao = document.querySelector('.btn-submit');
  if (botao) {
    botao.disabled = true;
    botao.textContent = 'Abrindo tela de carregamento...';
  }

  window.location.href = "../view/lista-exercicios.html";
}