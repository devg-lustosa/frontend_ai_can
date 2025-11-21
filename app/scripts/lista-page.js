// app/scripts/lista-page.js

const STORAGE_CONFIG = {
  PLAN_KEY: 'aican_resposta',
  METADATA_KEY: 'aican_metadata',
  EXPIRATION_HOURS: 24,
  MAX_SIZE_KB: 800
};

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function salvarLocalStorage(key, data) {
  try {
    const dataStr = JSON.stringify(data);
    const sizeKB = new Blob([dataStr]).size / 1024;

    if (sizeKB > STORAGE_CONFIG.MAX_SIZE_KB) {
      console.warn(`Dados muito grandes: ${sizeKB.toFixed(2)}KB (máximo: ${STORAGE_CONFIG.MAX_SIZE_KB}KB)`);
      limparDadosStorage();
    }

    const metadata = {
      timestamp: Date.now(),
      hash: simpleHash(dataStr),
      version: '1.0',
      size: sizeKB
    };

    localStorage.setItem(key, dataStr);
    localStorage.setItem(STORAGE_CONFIG.METADATA_KEY, JSON.stringify(metadata));

    console.log(`Dados salvos: ${sizeKB.toFixed(2)}KB`);
  } catch (err) {
    console.error('Erro ao salvar no localStorage:', err);
    if (err.name === 'QuotaExceededError') {
      alert('Espaço de armazenamento cheio. Limpando dados antigos...');
      limparDadosStorage();
    }
  }
}

function carregarLocalStoage(key) {
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

async function carregarPlanoTreino() {
  let plan = null;

  try {
    const dados = carregarLocalStoage(STORAGE_CONFIG.PLAN_KEY);

    if (dados) {
      plan = dados.plano || dados;

      if (!plan.nome_da_rotina || !plan.dias_de_treino || !plan.sugestoes_nutricionais) {
        console.error('Estrutura de dados inválida');
        limparDadosStorage();
        redirectToForm();
        return;
      }

      console.log('Plano carregado com sucesso');
      mostrarLista(plan);
      return;
    }
  } catch (err) {
    console.warn('Erro ao processar dados:', err);
    limparDadosStorage();
  }

  console.log('Nenhum plano disponível - redirecionando para formulário');
  redirectToForm();
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
    card.innerHTML = `
      ${treino.identificacao}
      <span>${treino.foco_muscular}</span>
    `;
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
  preBloco.innerHTML = `<div class="receita-tipo">Sugestões Pré-Treino</div>`;

  if (plano.sugestoes_nutricionais.pre_treino) {
    Object.values(plano.sugestoes_nutricionais.pre_treino).forEach((r) => {
      const card = document.createElement('div');
      card.classList.add('receita-card');
      card.innerHTML = `
        <h4>${r.nome}</h4>
        <ul>${r.ingredientes.map(ing => `<li>${ing}</li>`).join('')}</ul>
        <p><strong>${r.explicacao}</strong></p>
        <a href="${r.link_receita}" target="_blank">Ver receita completa</a>
      `;
      preBloco.appendChild(card);
    });
  }
  receitasDiv.appendChild(preBloco);

  const posBloco = document.createElement('div');
  posBloco.classList.add('receita-bloco');
  posBloco.innerHTML = `<div class="receita-tipo">Sugestões Pós-Treino</div>`;

  if (plano.sugestoes_nutricionais.pos_treino) {
    Object.values(plano.sugestoes_nutricionais.pos_treino).forEach((r) => {
      const card = document.createElement('div');
      card.classList.add('receita-card');
      card.innerHTML = `
        <h4>${r.nome}</h4>
        <ul>${r.ingredientes.map(ing => `<li>${ing}</li>`).join('')}</ul>
        <p><strong>${r.explicacao}</strong></p>
        <a href="${r.link_receita}" target="_blank">Ver receita completa</a>
      `;
      posBloco.appendChild(card);
    });
  }
  receitasDiv.appendChild(posBloco);
}

function mostrarDetalhesDay(index, dias) {
  const treino = dias[index];
  const detalhesDiv = document.getElementById('treinoDetalhado');

  if (!detalhesDiv) return;

  detalhesDiv.innerHTML = `<h3>${treino.identificacao} - ${treino.foco_muscular}</h3>`;

  if (treino.exercicios && treino.exercicios.length > 0) {
    treino.exercicios.forEach((ex) => {
      const exDiv = document.createElement('div');
      exDiv.classList.add('exercicio');
      exDiv.innerHTML = `
        <strong>${ex.nome}</strong>
        Séries: ${ex.series} | Repetições: ${ex.repeticoes} | Descanso: ${ex.descanso_segundos}s
        <br><small>${ex.detalhes_execucao}</small>
        <br><a href="${ex.video_url}" target="_blank">Ver vídeo</a>
      `;
      detalhesDiv.appendChild(exDiv);
    });
  }
}

setTimeout(carregarPlanoTreino, 1500);