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
  window.location.href = "../view/solicitar-lista.html";
}

function irParaPaginaDeAjuda() {
  window.location.href = "./view/ajuda.html";
}

function voltarMenu() {
  window.location.href = "../index.html";
}
