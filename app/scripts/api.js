// app/scripts/api.js

const API_BASE_URL = 'https://backend-ai-can.onrender.com';

function formatarDadosParaAPI(dadosFormulario) {
  return {
    nome: dadosFormulario.nome,
    altura: dadosFormulario.altura,
    peso: dadosFormulario.peso,
    idade: dadosFormulario.idade,
    disponibilidade: dadosFormulario.disponibilidade,
    local: dadosFormulario.localTreino,
    objetivo: dadosFormulario.objetivo
  };
}

async function solicitarPlano(dadosUsuario) {
  try {
    console.log('Enviando para API:', dadosUsuario);

    const dadosAPI = formatarDadosParaAPI(dadosUsuario);

    const response = await fetch(`${API_BASE_URL}/api/v1/sugestao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosAPI),
      timeout: 30000, // 30 segundos
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error ${response.status}: ${errorData.detail || 'Erro desconhecido'}`);
    }

    const data = await response.json();
    console.log('Resposta da API:', data);
    return data;

  } catch (error) {
    console.error('Erro ao solicitar plano:', error);
    throw error;
  }
}

async function verificarAPIOnline() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      timeout: 5000,
    });
    return response.ok;
  } catch (error) {
    console.warn('API indisponível:', error);
    return false;
  }
}