// app/scripts/feedback.js

const FEEDBACK_CONFIG = {
  API_ENDPOINT: 'https://backend-ai-can.onrender.com/api/v1/feedback',
  STORAGE_KEY: 'aican_user_feedback',
  DEBOUNCE_DELAY: 1000,
  TOAST_DURATION: 2000
};

const feedbackDebounce = {};

function carregarFeedbacksLocais() {
  try {
    const data = localStorage.getItem(FEEDBACK_CONFIG.STORAGE_KEY);
    return data ? JSON.parse(data) : { exercicio: {}, refeicao: {} };
  } catch (error) {
    console.error('Erro ao carregar feedbacks:', error);
    return { exercicio: {}, refeicao: {} };
  }
}

function salvarFeedbacksLocais(feedbacks) {
  try {
    localStorage.setItem(FEEDBACK_CONFIG.STORAGE_KEY, JSON.stringify(feedbacks));
  } catch (error) {
    console.error('Erro ao salvar feedbacks:', error);
  }
}

function obterFeedbackItem(tipo, nomeItem) {
  const feedbacks = carregarFeedbacksLocais();
  return feedbacks[tipo]?.[nomeItem] ?? null;
}

async function enviarFeedbackAPI(tipo, nomeItem, gostou) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('Token não encontrado');
    return;
  }

  const endpoint = tipo === 'exercicio'
    ? `${FEEDBACK_CONFIG.API_ENDPOINT}/exercicio`
    : `${FEEDBACK_CONFIG.API_ENDPOINT}/refeicao`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        item_nome: nomeItem,
        gostou: gostou,
        comentario: null
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Erro ao enviar feedback');
    }

    console.log(`Feedback de ${tipo} enviado: ${nomeItem}`);
  } catch (error) {
    console.error('Erro ao enviar feedback:', error);
    mostrarToastFeedback('Erro ao salvar feedback', 'erro');
  }
}

function atualizarEstadoBotoes(elementId, tipo, nomeItem) {
  const container = document.getElementById(elementId);
  if (!container) return;

  const feedback = obterFeedbackItem(tipo, nomeItem);
  const btnLike = container.querySelector('[data-feedback="like"]');
  const btnDislike = container.querySelector('[data-feedback="dislike"]');

  if (btnLike) {
    btnLike.classList.toggle('ativo', feedback === true);
  }
  if (btnDislike) {
    btnDislike.classList.toggle('ativo', feedback === false);
  }
}

function carregarFeedbackUI(elementId, tipo, nomeItem) {
  setTimeout(() => {
    atualizarEstadoBotoes(elementId, tipo, nomeItem);
  }, 0);
}

function mostrarToastFeedback(mensagem, tipo = 'info') {
  const toastAntigo = document.getElementById('toast-feedback');
  if (toastAntigo) {
    toastAntigo.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'toast-feedback';
  toast.className = `toast toast-${tipo}`;
  toast.textContent = mensagem;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    z-index: 2000;
    animation: slideInToast 0.3s ease-out;
    ${tipo === 'sucesso' ? 'background-color: #4caf50; color: #fff;' : ''}
    ${tipo === 'erro' ? 'background-color: #f44336; color: #fff;' : ''}
    ${tipo === 'info' ? 'background-color: #008fcb; color: #fff;' : ''}
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOutToast 0.3s ease-in';
    setTimeout(() => toast.remove(), 300);
  }, FEEDBACK_CONFIG.TOAST_DURATION);
}

async function salvarFeedback(tipo, nomeItem, gostou, elementId = null) {
  const chaveDebounce = `${tipo}_${nomeItem}`;

  if (feedbackDebounce[chaveDebounce]) {
    return;
  }

  feedbackDebounce[chaveDebounce] = true;

  try {
    const feedbacks = carregarFeedbacksLocais();
    feedbacks[tipo] = feedbacks[tipo] || {};
    feedbacks[tipo][nomeItem] = gostou;
    salvarFeedbacksLocais(feedbacks);

    if (elementId) {
      atualizarEstadoBotoes(elementId, tipo, nomeItem);
    }

    enviarFeedbackAPI(tipo, nomeItem, gostou).catch(error => {
      console.error('Erro ao enviar:', error);
      mostrarToastFeedback('Erro ao salvar feedback', 'erro');
    });

    mostrarToastFeedback('Feedback registrado', 'sucesso');

  } catch (error) {
    console.error('Erro ao salvar feedback:', error);
    mostrarToastFeedback('Erro ao processar feedback', 'erro');
  } finally {
    setTimeout(() => {
      delete feedbackDebounce[chaveDebounce];
    }, FEEDBACK_CONFIG.DEBOUNCE_DELAY);
  }
}

function criarBotoesLikeDislike(tipo, nomeItem, elementId) {
  const container = document.createElement('div');
  container.id = elementId;
  container.className = 'feedback-buttons';

  const btnLike = document.createElement('button');
  btnLike.className = 'feedback-btn feedback-like';
  btnLike.setAttribute('data-feedback', 'like');
  btnLike.setAttribute('aria-label', 'Gostei');
  btnLike.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
    </svg>
  `;
  btnLike.onclick = () => {
    salvarFeedback(tipo, nomeItem, true, elementId);
  };

  const btnDislike = document.createElement('button');
  btnDislike.className = 'feedback-btn feedback-dislike';
  btnDislike.setAttribute('data-feedback', 'dislike');
  btnDislike.setAttribute('aria-label', 'Não gostei');
  btnDislike.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-13c.83 0 1.5-.67 1.5-1.5S16.33 5 15.5 5 14 5.67 14 6.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 5 8.5 5 7 5.67 7 6.5 7.67 8 8.5 8zm3.5 2.5c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z"/>
    </svg>
  `;
  btnDislike.onclick = () => {
    salvarFeedback(tipo, nomeItem, false, elementId);
  };

  container.appendChild(btnLike);
  container.appendChild(btnDislike);
  carregarFeedbackUI(elementId, tipo, nomeItem);

  return container;
}

if (!document.getElementById('feedback-animations')) {
  const style = document.createElement('style');
  style.id = 'feedback-animations';
  style.textContent = `
    @keyframes slideInToast {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @keyframes slideOutToast {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100px);
      }
    }
  `;
  document.head.appendChild(style);
}
