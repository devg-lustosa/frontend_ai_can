// Simulação: JSON que você me mandou
const dados = {
  dias_de_treino: [
    {
      exercicios: [
        {
          descanso_segundos: 90,
          detalhes_execucao:
            "Deite-se no banco plano, pegue a barra com as mãos afastadas na largura dos ombros e realize a extensão dos braços",
          nome: "Supino Reto com Barra",
          repeticoes: "8-10",
          series: "4",
          video_url:
            "https://www.youtube.com/results?search_query=Supino+Reto+com+Barra",
        },
        {
          descanso_segundos: 75,
          detalhes_execucao:
            "Deite-se no banco inclinado, segure um halter em cada mão e empurre para cima com controle",
          nome: "Supino Inclinado com Halteres",
          repeticoes: "10-12",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Supino+Inclinado+com+Halteres",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Abra os braços em arco com os halteres, mantendo leve flexão nos cotovelos",
          nome: "Crucifixo com Halteres",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Crucifixo+com+Halteres",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Com os cotovelos fixos ao lado do corpo, puxe a corda para baixo até estender os braços",
          nome: "Tríceps Corda no Pulley",
          repeticoes: "12-15",
          series: "4",
          video_url:
            "https://www.youtube.com/results?search_query=Tríceps+Corda+no+Pulley",
        },
        {
          descanso_segundos: 75,
          detalhes_execucao:
            "Deite-se no banco e desça a barra em direção à testa, mantendo os cotovelos próximos à cabeça",
          nome: "Tríceps Testa com Barra W",
          repeticoes: "10-12",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Tríceps+Testa+com+Barra+W",
        },
      ],
      foco_muscular: "Peito e Tríceps",
      identificacao: "Treino A - Segunda",
    },
    {
      exercicios: [
        {
          descanso_segundos: 90,
          detalhes_execucao:
            "Puxe o corpo até o queixo passar da barra, mantendo o core contraído",
          nome: "Barra Fixa com Pegada Pronada",
          repeticoes: "8-10",
          series: "4",
          video_url:
            "https://www.youtube.com/results?search_query=Barra+Fixa+com+Pegada+Pronada",
        },
        {
          descanso_segundos: 75,
          detalhes_execucao:
            "Incline o tronco para frente, mantenha as costas retas e puxe a barra em direção ao abdômen",
          nome: "Remada Curvada com Barra",
          repeticoes: "10-12",
          series: "4",
          video_url:
            "https://www.youtube.com/results?search_query=Remada+Curvada+com+Barra",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Puxe a barra até o peito com as mãos próximas uma da outra",
          nome: "Puxada Alta com Pegada Fechada",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Puxada+Alta+com+Pegada+Fechada",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Levante a barra com os braços, contraindo o bíceps ao subir",
          nome: "Rosca Direta com Barra",
          repeticoes: "10-12",
          series: "4",
          video_url:
            "https://www.youtube.com/results?search_query=Rosca+Direta+com+Barra",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Levante um braço de cada vez, mantendo o cotovelo fixo ao lado do corpo",
          nome: "Rosca Alternada com Halteres",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Rosca+Alternada+com+Halteres",
        },
      ],
      foco_muscular: "Costas e Bíceps",
      identificacao: "Treino B - Terça",
    },
    {
      exercicios: [
        {
          descanso_segundos: 120,
          detalhes_execucao:
            "Posicione a barra nos ombros, desça com controle até os joelhos formarem 90°",
          nome: "Agachamento com Barra",
          repeticoes: "8-10",
          series: "5",
          video_url:
            "https://www.youtube.com/results?search_query=Agachamento+com+Barra",
        },
        {
          descanso_segundos: 90,
          detalhes_execucao:
            "Empurre a plataforma com os pés, sem tirar as costas do encosto",
          nome: "Leg Press 45°",
          repeticoes: "10-12",
          series: "4",
          video_url:
            "https://www.youtube.com/results?search_query=Leg+Press+45°",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Flexione os joelhos para levantar o peso, contraindo os isquiotibiais",
          nome: "Cadeira Flexora",
          repeticoes: "12-15",
          series: "4",
          video_url:
            "https://www.youtube.com/results?search_query=Cadeira+Flexora",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Estenda as pernas até a completa contração do quadríceps",
          nome: "Cadeira Extensora",
          repeticoes: "15-20",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Cadeira+Extensora",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Suba na ponta dos pés com os joelhos levemente flexionados",
          nome: "Elevação de Panturrilha em Pé",
          repeticoes: "15-20",
          series: "4",
          video_url:
            "https://www.youtube.com/results?search_query=Elevação+de+Panturrilha+em+Pé",
        },
      ],
      foco_muscular: "Pernas",
      identificacao: "Treino C - Quinta",
    },
    {
      exercicios: [
        {
          descanso_segundos: 75,
          detalhes_execucao:
            "Sente na máquina, abra as pernas lentamente contra a resistência",
          nome: "Abdução na Máquina",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Abdução+na+Máquina",
        },
        {
          descanso_segundos: 75,
          detalhes_execucao:
            "De pé, com um haltere ou máquina, levante a perna para o lado",
          nome: "Levantamento Lateral de Perna",
          repeticoes: "15-20",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Levantamento+Lateral+de+Perna",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Segure a barra próxima ao corpo e levante com força",
          nome: "Rosca Inversa no Cabo",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Rosca+Inversa+no+Cabo",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Coloque os braços na máquina e puxe em sua direção com força",
          nome: "Máquina de Remada Sentada",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Máquina+de+Remada+Sentada",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Realize movimentos de abdominal na máquina específica",
          nome: "Máquina Abdominal",
          repeticoes: "15-20",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Máquina+Abdominal",
        },
      ],
      foco_muscular: "Glúteos e Costas Leves",
      identificacao: "Treino E - Quarta",
    },
    {
      exercicios: [
        {
          descanso_segundos: 90,
          detalhes_execucao:
            "Levante a barra da frente dos ombros até a extensão total dos braços",
          nome: "Desenvolvimento com Barra",
          repeticoes: "8-10",
          series: "4",
          video_url:
            "https://www.youtube.com/results?search_query=Desenvolvimento+com+Barra",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Levante os halteres lateralmente até a altura dos ombros",
          nome: "Elevação Lateral com Halteres",
          repeticoes: "12-15",
          series: "4",
          video_url:
            "https://www.youtube.com/results?search_query=Elevação+Lateral+com+Halteres",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Levante a barra da frente até a altura dos ombros",
          nome: "Elevação Frontal com Barra",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Elevação+Frontal+com+Barra",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Com os halteres, levante os braços lateralmente com os cotovelos elevados",
          nome: "Remada Alta com Halteres",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Remada+Alta+com+Halteres",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Mantenha o corpo alinhado e levante um braço de cada vez",
          nome: "Prancha com Elevação Alternada",
          repeticoes: "30-45 segundos",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Prancha+com+Elevação+Alternada",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Realize o movimento com controle, segurando um peso no peito",
          nome: "Crunch com Peso",
          repeticoes: "15-20",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Crunch+com+Peso",
        },
      ],
      foco_muscular: "Ombros e Abdômen",
      identificacao: "Treino D - Sexta",
    },
    {
      exercicios: [
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Deite-se no banco e empurre os halteres para cima com controle",
          nome: "Supino com Halteres",
          repeticoes: "10-12",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Supino+com+Halteres",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Puxe a barra em direção ao peito com as mãos afastadas",
          nome: "Puxada Alta com Pegada Aberta",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Puxada+Alta+com+Pegada+Aberta",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Levante os halteres do chão até a altura dos ombros",
          nome: "Rosca Martelo com Halteres",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Rosca+Martelo+com+Halteres",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Com os cotovelos fixos, estenda os braços para trás na máquina",
          nome: "Tríceps na Máquina",
          repeticoes: "12-15",
          series: "3",
          video_url:
            "https://www.youtube.com/results?search_query=Tríceps+na+Máquina",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Mantenha o corpo reto e realize o movimento em pé",
          nome: "Rosca Concentrada com Haltere",
          repeticoes: "12-15",
          series: "2",
          video_url:
            "https://www.youtube.com/results?search_query=Rosca+Concentrada+com+Haltere",
        },
      ],
      foco_muscular: "Peito, Costas e Braços",
      identificacao: "Treino F - Sábado",
    },
    {
      exercicios: [
        {
          descanso_segundos: 45,
          detalhes_execucao:
            "Caminhada ou corrida leve para aquecimento e mobilidade",
          nome: "Caminhada/Corrida Leve",
          repeticoes: "20-30 minutos",
          series: "1",
          video_url:
            "https://www.youtube.com/results?search_query=Caminhada+Leve+Cardio",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Estique os principais grupos musculares por 30 segundos cada",
          nome: "Alongamento Estático",
          repeticoes: "10-15 minutos",
          series: "1",
          video_url:
            "https://www.youtube.com/results?search_query=Alongamento+Estático+Completo",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Movimentos de mobilidade articular para flexibilidade",
          nome: "Mobilidade Articular",
          repeticoes: "10 minutos",
          series: "1",
          video_url:
            "https://www.youtube.com/results?search_query=Mobilidade+Articular",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao: "Yoga leve para recuperação e bem-estar mental",
          nome: "Yoga Leve",
          repeticoes: "15-20 minutos",
          series: "1",
          video_url:
            "https://www.youtube.com/results?search_query=Yoga+Leve+Recuperação",
        },
        {
          descanso_segundos: 60,
          detalhes_execucao:
            "Meditação e respiração profunda para relaxamento total",
          nome: "Meditação e Respiração",
          repeticoes: "10 minutos",
          series: "1",
          video_url:
            "https://www.youtube.com/results?search_query=Meditação+Respiração+Profunda",
        },
      ],
      foco_muscular: "Recuperação e Bem-estar",
      identificacao: "Treino G - Domingo",
    },
  ],
  nome_da_rotina: "Divisão ABCD",
  sugestoes_nutricionais: {
    pos_treino: {
      opcao_economica: {
        custo_estimado: "Baixo",
        explicacao:
          "Fonte rápida de proteína e carboidrato, prática e acessível para recuperação pós-treino",
        ingredientes: ["atum em lata", "pão integral", "maionese light"],
        link_receita:
          "https://www.google.com/search?q=receita+sanduíche+de+atum+com+pão+integral",
        nome: "Sanduíche de Atum com Pão Integral",
      },
      opcao_equilibrada: {
        custo_estimado: "Médio",
        explicacao:
          "Boa relação de proteína e carboidrato para recuperação muscular com custo moderado",
        ingredientes: ["ovos inteiros", "pão integral", "tomate"],
        link_receita:
          "https://www.google.com/search?q=receita+omelete+de+ovo+inteiro+com+pão+integral",
        nome: "Omelete de Ovo Inteiro com Pão Integral",
      },
      opcao_premium: {
        custo_estimado: "Alto",
        explicacao:
          "Refeição completa com proteína de alto valor biológico e carboidrato de baixo índice glicêmico para recuperação rápida",
        ingredientes: [
          "peito de frango",
          "batata doce",
          "brócolis",
          "azeite de oliva",
        ],
        link_receita:
          "https://www.google.com/search?q=receita+frango+grelhado+com+batata+doce+e+brócolis",
        nome: "Frango Grelhado com Batata Doce e Brócolis",
      },
    },
    pre_treino: {
      opcao_economica: {
        custo_estimado: "Baixo",
        explicacao:
          "Fonte acessível de carboidratos e gorduras boas para gerar energia antes do treino",
        ingredientes: ["pão integral", "manteiga de amendoim"],
        link_receita:
          "https://www.google.com/search?q=receita+pão+integral+com+manteiga+de+amendoim",
        nome: "Pão Integral com Manteiga de Amendoim",
      },
      opcao_equilibrada: {
        custo_estimado: "Médio",
        explicacao:
          "Fornece carboidratos complexos e simples, além de proteína, para bom desempenho no treino",
        ingredientes: ["aveia", "banana", "leite desnatado", "mel"],
        link_receita:
          "https://www.google.com/search?q=receita+aveia+com+banana+e+leite+desnatado",
        nome: "Aveia com Banana e Leite Desnatado",
      },
      opcao_premium: {
        custo_estimado: "Alto",
        explicacao:
          "Combina proteína magra, gorduras saudáveis e fibras para energia sustentada e recuperação muscular",
        ingredientes: [
          "claras de ovo",
          "espinafre",
          "abacate",
          "azeite de oliva",
        ],
        link_receita:
          "https://www.google.com/search?q=receita+omelete+de+claras+com+espinafre+e+abacate",
        nome: "Omelete de Claras com Espinafre e Abacate",
      },
    },
  },
};
function mostrarLista() {
  const box = document.querySelector(".form-box");
  const titulo = document.getElementById("tituloLista");
  const loading = document.getElementById("loading");
  const conteudo = document.getElementById("conteudoLista");

  // Esconder loading, mostrar conteúdo
  titulo.innerText = dados.nome_da_rotina;
  loading.style.display = "none";
  conteudo.style.display = "block";

  // Renderizar cards de dias de treino
  const diasContainer = document.getElementById("diasTreino");
  dados.dias_de_treino.forEach((treino, index) => {
    const card = document.createElement("div");
    card.classList.add("treino-card");
    card.innerHTML = `${treino.identificacao}<br><span>${treino.foco_muscular}</span>`;
    card.onclick = () => mostrarTreino(index);
    diasContainer.appendChild(card);
  });

  // Mostrar primeiro treino por padrão
  mostrarTreino(0);

  // Renderizar receitas
  const receitasDiv = document.getElementById("receitas");
  receitasDiv.classList.add("receita");

  receitasDiv.innerHTML = `
    <div class="receita-bloco">
      <h3 class="receita-tipo">Receitas Pré-Treino</h3>
      ${Object.values(dados.sugestoes_nutricionais.pre_treino)
        .map(
          (r) => `
        <div class="receita-card">
          <h4>${r.nome} (${r.custo_estimado})</h4>
          <ul>
            ${r.ingredientes.map((ing) => `<li>${ing}</li>`).join("")}
          </ul>
          <p>${r.explicacao}</p>
          <a href="${r.link_receita}" target="_blank">Ver receita</a>
        </div>
      `
        )
        .join("")}
    </div>

    <div class="receita-bloco">
      <h3 class="receita-tipo">Receitas Pós-Treino</h3>
      ${Object.values(dados.sugestoes_nutricionais.pos_treino)
        .map(
          (r) => `
        <div class="receita-card">
          <h4>${r.nome} (${r.custo_estimado})</h4>
          <ul>
            ${r.ingredientes.map((ing) => `<li>${ing}</li>`).join("")}
          </ul>
          <p>${r.explicacao}</p>
          <a href="${r.link_receita}" target="_blank">Ver receita</a>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

// Mostrar treino detalhado ao clicar
function mostrarTreino(index) {
  const treino = dados.dias_de_treino[index];
  const treinoDiv = document.getElementById("treinoDetalhado");

  treinoDiv.innerHTML = `
    <h3>${treino.identificacao} - ${treino.foco_muscular}</h3>
    ${treino.exercicios
      .map(
        (ex) => `
      <div class="exercicio">
        <strong>${ex.nome}</strong>
        Séries: ${ex.series} | Repetições: ${ex.repeticoes} | Descanso: ${ex.descanso_segundos}s<br>
        <small>${ex.detalhes_execucao}</small><br>
        <a href="${ex.video_url}" target="_blank">Ver vídeo</a>
      </div>
    `
      )
      .join("")}
  `;
}

// Botão de voltar
function voltarParaFormulario() {
  window.location.href = "pos-cadastro.html";
}

// Simular carregamento
setTimeout(mostrarLista, 2000);
