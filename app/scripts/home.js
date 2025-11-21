// app/scripts/home.js

const FRASES_DESCRICAO = [
  "Um guia de exercícios e nutrição. Você nos diz onde quer chegar, e nossa IA sugere o caminho.",
  "Treinos e refeições personalizados por Inteligência Artificial, adaptados ao seu objetivo.",
  "Otimize seus resultados. Seu guia inteligente de exercícios e nutrição para o pré e pós-treino.",
];

const VELOCIDADE_TYPEWRITER = 60; // ms por caractere
const TEMPO_TRANSICAO = 400; // ms para fade out/in
const INTERVALO_FRASES = 13000; // ms entre frases

function typeWriter(text, element, i = 0) {
  if (!element) {
    console.error('Elemento de descrição não encontrado');
    return;
  }
  
  if (i < text.length) {
    element.textContent = text.substring(0, i + 1);
    setTimeout(() => typeWriter(text, element, i + 1), VELOCIDADE_TYPEWRITER);
  }
}

function trocarFrase(element, frases, indexRef) {
  if (!element) return;
  
  element.style.opacity = "0";
  
  setTimeout(() => {
    indexRef.value = (indexRef.value + 1) % frases.length;
    element.textContent = "";
    element.style.opacity = "1";
    typeWriter(frases[indexRef.value], element);
  }, TEMPO_TRANSICAO);
}

document.addEventListener("DOMContentLoaded", () => {
  const descricao = document.getElementById("descricao");
  
  if (!descricao) {
    console.error('Elemento #descricao não encontrado no DOM');
    return;
  }

  const indexRef = { value: 0 };
  
  typeWriter(FRASES_DESCRICAO[indexRef.value], descricao);
  setInterval(() => trocarFrase(descricao, FRASES_DESCRICAO, indexRef), INTERVALO_FRASES);
});