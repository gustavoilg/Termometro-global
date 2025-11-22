document.addEventListener("DOMContentLoaded", () => {
  // Lista de imagens (coloque suas URLs reais aqui)
  const images = [
    "https://dummyimage.com/400x400/222/fff&text=Carro",
    "https://dummyimage.com/400x400/333/fff&text=Pizza",
    "https://dummyimage.com/400x400/555/fff&text=Viagem",
    "https://dummyimage.com/400x400/777/fff&text=Gato",
    "https://dummyimage.com/400x400/999/fff&text=Cachorro"
  ];

  // Pega as imagens A e B do HTML
  const imgA = document.querySelectorAll(".option-img")[0];
  const imgB = document.querySelectorAll(".option-img")[1];

  // Tela de votação e tela de resultado
  const voteScreen = document.getElementById("vote-screen");
  const resultScreen = document.getElementById("result-screen");

  // Elementos da tela de resultado
  const youChoice = document.getElementById("you-choice");
  const barA = document.getElementById("barA");
  const barB = document.getElementById("barB");
  const nextBtn = document.getElementById("nextBtn");

  let currentA = 0;
  let currentB = 0;

  // Gera novas opções
  function generateOptions() {
    let indexA = Math.floor(Math.random() * images.length);
    let indexB = Math.floor(Math.random() * images.length);

    while (indexA === indexB) {
      indexB = Math.floor(Math.random() * images.length);
    }

    imgA.src = images[indexA];
    imgB.src = images[indexB];
  }

  // Mostra resultado
  function showResult(choice) {
    youChoice.textContent = choice === "A" ? "Opção A" : "Opção B";

    // Simulação de votos globais
    let votesA = Math.floor(Math.random() * 1000);
    let votesB = Math.floor(Math.random() * 1000);

    let total = votesA + votesB;
    let pctA = Math.round((votesA / total) * 100);
    let pctB = 100 - pctA;

    barA.style.width = pctA + "%";
    barB.style.width = pctB + "%";
    barA.textContent = pctA + "%";
    barB.textContent = pctB + "%";

    voteScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
  }

  // Clique nas opções A e B
  document.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", () => {
      const choice = btn.dataset.choice;
      showResult(choice);
    });
  });

  // Botão de próxima pergunta
  nextBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    voteScreen.classList.remove("hidden");
    generateOptions();
  });

  // Iniciar com duas imagens aleatórias
  generateOptions();
});
