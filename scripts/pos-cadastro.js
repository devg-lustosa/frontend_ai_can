class Usuario {
  constructor(
    nome,
    sexo,
    peso,
    altura,
    idade,
    objetivo,
    frequencia,
    localidade
  ) {
    this.nome = nome;
    this.sexo = sexo;
    this.peso = peso;
    this.altura = altura;
    this.idade = idade;
    this.objetivo = objetivo;
    this.frequencia = frequencia;
    this.localidade = localidade;
  }
}

document
  .getElementById("posCadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = new Usuario(
      document.getElementById("nome").value.trim(),
      document.getElementById("sexo").value,
      document.getElementById("peso").value,
      document.getElementById("altura").value,
      document.getElementById("idade").value,
      document.getElementById("objetivo").value,
      document.getElementById("frequencia").value,
      document.getElementById("localidade").value
    );

    // Salva no localStorage para usar na próxima página
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Redireciona para a página de lista
    window.location.href = "lista-exercicios.html";
  });
