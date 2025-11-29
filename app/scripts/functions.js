// Funções utilitárias usadas por várias páginas

// Gerar hash simples para validação de integridade
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Salvar dados no localStorage com validação de integridade
function salvarLocalStorage(key, data) {
  try {
    const dataStr = JSON.stringify(data);
    const sizeKB = new Blob([dataStr]).size / 1024;

    const metadata = {
      timestamp: Date.now(),
      hash: simpleHash(dataStr),
      version: "1.0",
      size: sizeKB,
    };
    localStorage.setItem(key, dataStr);
    localStorage.setItem("aican_metadata", JSON.stringify(metadata));
    console.log(`Dados salvos: ${sizeKB.toFixed(2)}KB`);
  } catch (err) {
    console.error("Erro ao salvar no localStorage:", err);
    if (err.name === "QuotaExceededError") {
      console.error("Espaço de armazenamento cheio.");
    }
    throw err;
  }
}

function voltarParaFormulario() {
  // Limpar dados antigos antes de voltar
  localStorage.removeItem('aican_resposta');
  localStorage.removeItem('aican_metadata');
  localStorage.removeItem('aican_solicitacao');
  window.location.href = "../view/solicitar-lista.html";
}

function logout() {
  // Limpar todos os dados do localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user_name');
  localStorage.removeItem('aican_resposta');
  localStorage.removeItem('aican_metadata');
  localStorage.removeItem('aican_solicitacao');
  // Redirecionar para login
  window.location.href = "../index.html";
}

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
