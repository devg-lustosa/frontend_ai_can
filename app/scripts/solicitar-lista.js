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
  const span = document.createElement("span");
  span.classList.add("error-message");
  span.innerText = mensagem;
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
    if (!validarCampo(input, field.rules)) {
      isValid = false;
    }
  }

  if (isValid) {
    const payload = {
      nome: nome.value.trim(),
      peso: Number(peso.value),
      idade: Number(idade.value),
      altura: Number(altura.value),
      disponibilidade: Number(disponibilidade.value),
      localTreino: localTreino.value,
      objetivo: objetivo.value,
    };

    localStorage.setItem("aican_solicitacao", JSON.stringify(payload));

    const botao = document.querySelector('.btn-submit');
    botao.disabled = true;
    botao.textContent = 'Gerando seu plano...';

    solicitarPlano(payload)
      .then((resposta) => {
        const plano = resposta?.plano || resposta;
        if (!plano || !plano.nome_da_rotina || !plano.dias_de_treino || !plano.sugestoes_nutricionais) {
          console.error('Resposta da API com formato inválido:', resposta);
          botao.disabled = false;
          botao.textContent = 'Gerar Lista de Exercícios';
          alert('Resposta da API inválida. Verifique o backend ou tente novamente.');
          return;
        }
        if (typeof salvarLocalStorage === 'function') {
          salvarLocalStorage('aican_resposta', resposta);
        } else {
          localStorage.setItem("aican_resposta", JSON.stringify(resposta));
        }
        window.location.href = "../view/lista-exercicios.html";
      })
      .catch((error) => {
        console.error('Erro ao solicitar plano:', error);
        botao.disabled = false;
        botao.textContent = 'Gerar Lista de Exercícios';
        alert(`Erro ao gerar plano: ${error.message}\n\nTente novamente mais tarde.`);
      });
  }
}

function salvarLocalStorage(key, data) {
  try {
    const dataStr = JSON.stringify(data);
    const simpleHash = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return hash.toString(36);
    };

    const sizeKB = new Blob([dataStr]).size / 1024;

    const metadata = {
      timestamp: Date.now(),
      hash: simpleHash(dataStr),
      version: '1.0',
      size: sizeKB
    };
    localStorage.setItem(key, dataStr);
    localStorage.setItem('aican_metadata', JSON.stringify(metadata));
  } catch (err) {
    console.error('Erro ao salvar:', err);
    localStorage.setItem(key, JSON.stringify(data));
  }
}