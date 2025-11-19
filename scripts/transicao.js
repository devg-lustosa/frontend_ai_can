document.addEventListener("DOMContentLoaded", () => {
  const frases = [
    "Um guia de exercícios e nutrição. Você nos diz onde quer chegar, e nossa IA sugere o caminho.",
    "Treinos e refeições personalizados por Inteligência Artificial, adaptados ao seu objetivo.",
    "Otimize seus resultados. Seu guia inteligente de exercícios e nutrição para o pré e pós-treino.",
  ];

  const descricao = document.getElementById("descricao");
  let index = 0;

  function typeWriter(text, i = 0) {
    if (i < text.length) {
      descricao.textContent = text.substring(0, i + 1);
      setTimeout(() => typeWriter(text, i + 1), 60); // velocidade da digitação
    }
  }

  function trocarFrase() {
    index = (index + 1) % frases.length;
    descricao.textContent = "";
    typeWriter(frases[index]);
  }

  // primeira frase
  typeWriter(frases[index]);

  // troca a cada 6 segundos
  setInterval(trocarFrase, 13000);
});
