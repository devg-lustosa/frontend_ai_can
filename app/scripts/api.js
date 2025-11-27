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

function handleAPIError(error, context = '') {
  console.error(`Erro na API${context ? ` (${context})` : ''}:`, error);

  if (!navigator.onLine) {
    return 'Sem conexão com a internet. Verifique sua rede e tente novamente.';
  }

  const errorMsg = error.message || '';

  if (errorMsg.includes('401')) {
    localStorage.clear();
    setTimeout(() => window.location.href = '/app/index.html', 2000);
    return 'Sessão expirada. Redirecionando para login...';
  }

  if (errorMsg.includes('400')) return 'Dados inválidos. Verifique os campos.';
  if (errorMsg.includes('404')) return 'Recurso não encontrado.';
  if (errorMsg.includes('409')) return 'Este email já está cadastrado.';
  if (errorMsg.includes('500')) return 'Erro no servidor. Tente novamente.';
  if (errorMsg.includes('timeout') || errorMsg.includes('network')) {
    return 'Tempo de conexão esgotado.';
  }

  return errorMsg || 'Erro desconhecido. Tente novamente.';
}

async function solicitarPlano(dadosUsuario) {
  try {
    console.log('Enviando para API:', dadosUsuario);

    const dadosAPI = formatarDadosParaAPI(dadosUsuario);

    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/sugestao`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(dadosAPI),
      timeout: 30000,
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

async function loginUsuario(username, password) {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Falha no login');
    }

    return data;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
}

async function cadastrarUsuario(dadosUsuario) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosUsuario)
    });

    const data = await response.json();

    if (!response.ok && response.status !== 201) {
      throw new Error(data.detail || 'Falha no cadastro');
    }

    return data;
  } catch (error) {
    console.error('Erro no cadastro:', error);
    throw error;
  }
}

async function buscarDadosUsuario(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Falha ao buscar dados');

    return await response.json();
  } catch (error) {
    console.warn('Erro ao buscar dados do usuário:', error);
    return null;
  }
}