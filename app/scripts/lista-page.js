// app/scripts/lista-page.js

const STORAGE_CONFIG = {
  PLAN_KEY: 'aican_resposta',
  METADATA_KEY: 'aican_metadata',
  EXPIRATION_HOURS: 24,
  MAX_SIZE_KB: 800
};

function carregarLocalStorage(key) {
  try {
    const dataStr = localStorage.getItem(key);
    const metadataStr = localStorage.getItem(STORAGE_CONFIG.METADATA_KEY);

    if (!dataStr) {
      console.log('Nenhum dado salvo');
      return null;
    }

    if (metadataStr) {
      const metadata = JSON.parse(metadataStr);
      const now = Date.now();
      const ageHours = (now - metadata.timestamp) / (1000 * 60 * 60);

      if (ageHours > STORAGE_CONFIG.EXPIRATION_HOURS) {
        console.warn(`Dados expirados (${ageHours.toFixed(1)}h de ${STORAGE_CONFIG.EXPIRATION_HOURS}h)`);
        limparDadosStorage();
        return null;
      }

      const currentHash = simpleHash(dataStr);
      if (currentHash !== metadata.hash) {
        console.error('Dados corrompidos (hash inválido)');
        limparDadosStorage();
        return null;
      }

      console.log(`Dados válidos (idade: ${ageHours.toFixed(1)}h, tamanho: ${metadata.size.toFixed(2)}KB)`);
    }

    return JSON.parse(dataStr);

  } catch (err) {
    console.error('Erro ao carregar do localStorage:', err);
    limparDadosStorage();
    return null;
  }
}

function limparDadosStorage() {
  console.log('Limpando dados antigos...');
  localStorage.removeItem(STORAGE_CONFIG.PLAN_KEY);
  localStorage.removeItem(STORAGE_CONFIG.METADATA_KEY);
  localStorage.removeItem('aican_solicitacao');
}

async function enviarSolicitacaoECarregar(loadingEl, loadingText) {
  const solicitacaoRaw = localStorage.getItem('aican_solicitacao');
  if (!solicitacaoRaw) return null;

  let solicitacao = null;
  try { solicitacao = JSON.parse(solicitacaoRaw); } catch (e) { return null; }

  if (!solicitacao) return null;

  try {
    const resposta = await solicitarPlano(solicitacao);
    const plano = resposta?.plano || resposta;
    if (plano && plano.nome_da_rotina && plano.dias_de_treino && plano.sugestoes_nutricionais) {
      try { salvarLocalStorage(STORAGE_CONFIG.PLAN_KEY, resposta); } catch (e) { localStorage.setItem(STORAGE_CONFIG.PLAN_KEY, JSON.stringify(resposta)); }
      localStorage.removeItem('aican_solicitacao');
      if (loadingEl) loadingEl.style.display = 'none';
      mostrarLista(plano);
      return true;
    }
  } catch (err) {
    console.error('Erro ao enviar solicitação:', err);
  }
  return false;
}

async function carregarPlanoTreino() {
  const loadingEl = document.getElementById('loading');
  const conteudoLista = document.getElementById('conteudoLista');
  const loadingText = document.getElementById('loadingText');

  try {
    const dados = carregarLocalStorage(STORAGE_CONFIG.PLAN_KEY);
    const plan = dados ? (dados.plano || dados) : null;

    if (plan && plan.nome_da_rotina && plan.dias_de_treino && plan.sugestoes_nutricionais) {
      console.log('Plano carregado (fast path)');
      if (loadingEl) loadingEl.style.display = 'none';
      mostrarLista(plan);
      return;
    }
  } catch (err) {
    console.warn('Erro ao tentar fast-path:', err);
  }

  async function esperarPlanoTreino(maxWaitMs = 240000, intervalMs = 800) {
    const started = Date.now();
    while (Date.now() - started < maxWaitMs) {
      try {
        const dados = carregarLocalStorage(STORAGE_CONFIG.PLAN_KEY);
        const plan = dados ? (dados.plano || dados) : null;
        if (plan && plan.nome_da_rotina && plan.dias_de_treino && plan.sugestoes_nutricionais) {
          return plan;
        }
      } catch (err) {
        console.warn('Erro ao ler localStorage durante polling:', err);
        break;
      }
      await new Promise((r) => setTimeout(r, intervalMs));
    }
    return null;
  }

  if (loadingText) loadingText.textContent = 'Aguardando sua lista — ainda estamos gerando, por favor espere...';

  if (await enviarSolicitacaoECarregar(loadingEl, loadingText)) {
    return;
  }

  const plan = await esperarPlanoTreino(30000, 1000);
  if (plan) {
    if (loadingEl) loadingEl.style.display = 'none';
    console.log('Plano carregado após polling');
    mostrarLista(plan);
    return;
  }

  if (loadingText) loadingText.textContent = 'Ainda estamos gerando seu plano — isso pode levar alguns segundos.';

  const actions = document.getElementById('loadingActions');
  if (actions) actions.style.display = 'flex';

  const retryBtn = document.getElementById('btnRetry');
  const backBtn = document.getElementById('btnBack');

  if (retryBtn) retryBtn.onclick = async () => {
    if (actions) actions.style.display = 'none';
    if (loadingText) loadingText.textContent = 'Rechecando — aguarde...';

    if (await enviarSolicitacaoECarregar(loadingEl, loadingText)) {
      return;
    }

    const p = await esperarPlanoTreino(240000, 800);
    if (p) {
      if (loadingEl) loadingEl.style.display = 'none';
      mostrarLista(p);
      return;
    }
    if (actions) actions.style.display = 'flex';
    if (loadingText) loadingText.textContent = 'Ainda não encontramos seu plano — você pode tentar novamente ou voltar.';
  };

  if (backBtn) backBtn.onclick = () => {
    window.location.href = '../view/solicitar-lista.html';
  };
}

function redirectToForm() {
  const loading = document.getElementById('loading');
  const conteudoLista = document.getElementById('conteudoLista');

  if (loading) {
    loading.innerHTML = `
      <div style="text-align: center;">
        <p style="color: #008fcb; font-size: 18px; margin-bottom: 20px;">
          Nenhum plano de treino encontrado
        </p>
        <p style="color: #aaa; margin-bottom: 30px;">
          Você será redirecionado para criar um novo plano...
        </p>
      </div>
    `;
  }

  setTimeout(() => {
    window.location.href = '../view/solicitar-lista.html';
  }, 2000);
}

function mostrarLista(plano) {
  const box = document.querySelector('.form-box');
  const loading = document.getElementById('loading');
  const conteudoLista = document.getElementById('conteudoLista');

  if (loading) loading.style.display = 'none';
  if (conteudoLista) conteudoLista.style.display = 'block';

  const titulo = document.getElementById('tituloLista');
  if (titulo) titulo.textContent = plano.nome_da_rotina;

  const diasScroll = document.getElementById('diasTreino') || document.createElement('div');
  diasScroll.id = 'diasTreino';
  diasScroll.classList.add('treinos-scroll');
  diasScroll.innerHTML = '';

  plano.dias_de_treino.forEach((treino, idx) => {
    const card = document.createElement('div');
    card.classList.add('treino-card');

    const idSpan = document.createTextNode(treino.identificacao);
    const focoSpan = document.createElement('span');
    focoSpan.textContent = treino.foco_muscular;

    card.appendChild(idSpan);
    card.appendChild(focoSpan);

    card.onclick = () => mostrarDetalhesDay(idx, plano.dias_de_treino);
    diasScroll.appendChild(card);
  });

  if (!document.getElementById('diasTreino')) {
    conteudoLista.insertBefore(diasScroll, conteudoLista.firstChild);
  }

  let detalhesDiv = document.getElementById('treinoDetalhado');
  if (!detalhesDiv) {
    detalhesDiv = document.createElement('div');
    detalhesDiv.id = 'treinoDetalhado';
    detalhesDiv.classList.add('treino-detalhado');
    conteudoLista.insertBefore(detalhesDiv, document.getElementById('receitas'));
  }

  if (plano.dias_de_treino.length > 0) {
    mostrarDetalhesDay(0, plano.dias_de_treino);
  }

  let receitasDiv = document.getElementById('receitas');
  if (!receitasDiv) {
    receitasDiv = document.createElement('div');
    receitasDiv.id = 'receitas';
    receitasDiv.classList.add('receita');
    conteudoLista.insertBefore(receitasDiv, document.querySelector('.botoes-final'));
  }
  receitasDiv.innerHTML = '';

  const preBloco = document.createElement('div');
  preBloco.classList.add('receita-bloco');
  const preBlocoTitleDiv = document.createElement('div');
  preBlocoTitleDiv.classList.add('receita-tipo');
  preBlocoTitleDiv.textContent = 'Sugestões Pré-Treino';
  preBloco.appendChild(preBlocoTitleDiv);

  if (plano.sugestoes_nutricionais.pre_treino) {
    Object.entries(plano.sugestoes_nutricionais.pre_treino).forEach(([key, r], index) => {
      const card = document.createElement('div');
      card.classList.add('receita-card');

      const headerReceita = document.createElement('div');
      headerReceita.style.cssText = 'display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 8px;';

      const h4 = document.createElement('h4');
      h4.style.margin = '0';
      h4.textContent = r.nome;

      const feedbackElementId = `feedback-pre-${index}`;
      const botoesLikeDislike = criarBotoesLikeDislike(
        'refeicao',
        r.nome,
        feedbackElementId
      );

      headerReceita.appendChild(h4);
      headerReceita.appendChild(botoesLikeDislike);
      card.appendChild(headerReceita);

      const ul = document.createElement('ul');
      r.ingredientes.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = ing;
        ul.appendChild(li);
      });
      card.appendChild(ul);

      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = r.explicacao;
      p.appendChild(strong);
      card.appendChild(p);

      const a = document.createElement('a');
      a.href = r.link_receita;
      a.target = "_blank";
      a.textContent = "Ver receita completa";
      card.appendChild(a);

      preBloco.appendChild(card);
    });
  }
  receitasDiv.appendChild(preBloco);

  const posBloco = document.createElement('div');
  posBloco.classList.add('receita-bloco');
  const posBlocoTitleDiv = document.createElement('div');
  posBlocoTitleDiv.classList.add('receita-tipo');
  posBlocoTitleDiv.textContent = 'Sugestões Pós-Treino';
  posBloco.appendChild(posBlocoTitleDiv);

  if (plano.sugestoes_nutricionais.pos_treino) {
    Object.entries(plano.sugestoes_nutricionais.pos_treino).forEach(([key, r], index) => {
      const card = document.createElement('div');
      card.classList.add('receita-card');

      const headerReceita = document.createElement('div');
      headerReceita.style.cssText = 'display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 8px;';

      const h4 = document.createElement('h4');
      h4.style.margin = '0';
      h4.textContent = r.nome;

      const feedbackElementId = `feedback-pos-${index}`;
      const botoesLikeDislike = criarBotoesLikeDislike(
        'refeicao',
        r.nome,
        feedbackElementId
      );

      headerReceita.appendChild(h4);
      headerReceita.appendChild(botoesLikeDislike);
      card.appendChild(headerReceita);

      const ul = document.createElement('ul');
      r.ingredientes.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = ing;
        ul.appendChild(li);
      });
      card.appendChild(ul);

      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = r.explicacao;
      p.appendChild(strong);
      card.appendChild(p);

      const a = document.createElement('a');
      a.href = r.link_receita;
      a.target = "_blank";
      a.textContent = "Ver receita completa";
      card.appendChild(a);

      posBloco.appendChild(card);
    });
  }
  receitasDiv.appendChild(posBloco);
}

function mostrarDetalhesDay(index, dias) {
  const treino = dias[index];
  const detalhesDiv = document.getElementById('treinoDetalhado');

  if (!detalhesDiv) return;

  detalhesDiv.innerHTML = '';

  const h3 = document.createElement('h3');
  h3.textContent = `${treino.identificacao} - ${treino.foco_muscular}`;
  detalhesDiv.appendChild(h3);

  if (treino.exercicios && treino.exercicios.length > 0) {
    treino.exercicios.forEach((ex, exIndex) => {
      const exDiv = document.createElement('div');
      exDiv.classList.add('exercicio');

      const headerEx = document.createElement('div');
      headerEx.style.cssText = 'display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 8px;';

      const strong = document.createElement('strong');
      strong.textContent = ex.nome;

      const feedbackElementId = `feedback-ex-${index}-${exIndex}`;
      const botoesLikeDislike = criarBotoesLikeDislike(
        'exercicio',
        ex.nome,
        feedbackElementId
      );

      headerEx.appendChild(strong);
      headerEx.appendChild(botoesLikeDislike);
      exDiv.appendChild(headerEx);

      const infoText = document.createTextNode(` Séries: ${ex.series} | Repetições: ${ex.repeticoes} | Descanso: ${ex.descanso_segundos}s`);
      exDiv.appendChild(infoText);

      exDiv.appendChild(document.createElement('br'));

      const small = document.createElement('small');
      small.textContent = ex.detalhes_execucao;
      exDiv.appendChild(small);

      exDiv.appendChild(document.createElement('br'));

      const a = document.createElement('a');
      a.href = ex.video_url;
      a.target = "_blank";
      a.textContent = "Ver vídeo";
      exDiv.appendChild(a);

      detalhesDiv.appendChild(exDiv);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(carregarPlanoTreino, 300);
});