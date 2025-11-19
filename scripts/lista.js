// Classe PlanoTreino
class PlanoTreino {
  constructor(usuario) {
    this.usuario = usuario;
  }

  // Método que gera treinos simulados
  gerarTreino() {
    return {
      A: {
        exercicios: [
          {
            exercicio: "Supino reto",
            url: "https://www.youtube.com/watch?v=example1",
            serie: "4x10",
          },
          {
            exercicio: "Supino inclinado",
            url: "https://www.youtube.com/watch?v=example2",
            serie: "3x12",
          },
          {
            exercicio: "Crucifixo",
            url: "https://www.youtube.com/watch?v=example3",
            serie: "3x12",
          },
          {
            exercicio: "Tríceps pulley",
            url: "https://www.youtube.com/watch?v=example4",
            serie: "3x12",
          },
          {
            exercicio: "Tríceps francês",
            url: "https://www.youtube.com/watch?v=example5",
            serie: "3x10",
          },
          {
            exercicio: "Flexão de braço",
            url: "https://www.youtube.com/watch?v=example6",
            serie: "3x15",
          },
        ],
        preTreino: {
          nome: "Cafeína + Creatina",
          receita: "Café preto + 5g creatina",
        },
        posTreino: {
          nome: "Whey + Banana",
          receita: "Shake de whey com banana",
        },
      },
      B: {
        exercicios: [
          {
            exercicio: "Agachamento livre",
            url: "https://www.youtube.com/watch?v=example7",
            serie: "4x8",
          },
          {
            exercicio: "Leg press",
            url: "https://www.youtube.com/watch?v=example8",
            serie: "4x12",
          },
          {
            exercicio: "Avanço",
            url: "https://www.youtube.com/watch?v=example9",
            serie: "3x12",
          },
          {
            exercicio: "Levantamento terra",
            url: "https://www.youtube.com/watch?v=example10",
            serie: "4x6",
          },
          {
            exercicio: "Glúteo 4 apoios",
            url: "https://www.youtube.com/watch?v=example11",
            serie: "3x15",
          },
          {
            exercicio: "Abdominal supra",
            url: "https://www.youtube.com/watch?v=example12",
            serie: "3x20",
          },
        ],
        preTreino: {
          nome: "Pré-treino cafeinado",
          receita: "Suplemento pré-treino + água",
        },
        posTreino: {
          nome: "Batata doce + Frango",
          receita: "150g batata doce + 100g frango",
        },
      },
      C: {
        exercicios: [
          {
            exercicio: "Barra fixa",
            url: "https://www.youtube.com/watch?v=example13",
            serie: "3x8",
          },
          {
            exercicio: "Remada curvada",
            url: "https://www.youtube.com/watch?v=example14",
            serie: "4x10",
          },
          {
            exercicio: "Rosca direta",
            url: "https://www.youtube.com/watch?v=example15",
            serie: "3x12",
          },
          {
            exercicio: "Rosca alternada",
            url: "https://www.youtube.com/watch?v=example16",
            serie: "3x12",
          },
          {
            exercicio: "Desenvolvimento ombro",
            url: "https://www.youtube.com/watch?v=example17",
            serie: "4x10",
          },
          {
            exercicio: "Elevação lateral",
            url: "https://www.youtube.com/watch?v=example18",
            serie: "3x15",
          },
        ],
        preTreino: {
          nome: "Beta-alanina + Creatina",
          receita: "Suplemento beta-alanina + 5g creatina",
        },
        posTreino: {
          nome: "Whey isolado + Aveia",
          receita: "Shake de whey isolado + 30g aveia",
        },
      },
    };
  }

  // Método que monta HTML
  gerarHTML() {
    const treinos = this.gerarTreino();
    let html = `<h3>Plano de Treino para ${this.usuario.nome}</h3>`;
    html += `<p><strong>Objetivo:</strong> ${this.usuario.objetivo}</p>`;
    html += `<hr>`;

    for (const [dia, bloco] of Object.entries(treinos)) {
      html += `<div class="treino-dia"><h3>Treino ${dia}</h3><ul>`;
      bloco.exercicios.forEach((ex, i) => {
        html += `
        <li>
          <strong>${i + 1}. ${ex.exercicio}</strong> 
          (<a href="${
            ex.url
          }" target="_blank" style="color:var(--cor-texto)">vídeo</a>)<br>
          Série/Repetição: ${ex.serie}
        </li>
      `;
      });
      html += `</ul>
      <p><strong>Pré-treino:</strong> ${bloco.preTreino.nome} - Receita: ${bloco.preTreino.receita}</p>
      <p><strong>Pós-treino:</strong> ${bloco.posTreino.nome} - Receita: ${bloco.posTreino.receita}</p>
    </div>`;
    }

    return html;
  }
}

// Recupera usuário do localStorage
const usuarioData = localStorage.getItem("usuario");
if (usuarioData) {
  const usuario = JSON.parse(usuarioData);
  const plano = new PlanoTreino(usuario);
  document.getElementById("treino").innerHTML = plano.gerarHTML();
} else {
  document.getElementById("treino").innerHTML =
    "<p style='color:#ff4d4d'>Nenhum usuário encontrado. Volte ao cadastro.</p>";
}
