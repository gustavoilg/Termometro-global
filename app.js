document.addEventListener("DOMContentLoaded", () => {

  // --- Função IA Grátis (Lexica) ---
  async function getImage(prompt) {
    try {
      const res = await fetch(`https://lexica.art/api/v1/search?q=${encodeURIComponent(prompt)}`);
      const data = await res.json();

      if (!data.images || data.images.length === 0) {
        return "https://dummyimage.com/600x600/000/fff&text=No+Image";
      }

      // Escolhe uma imagem aleatória da busca
      const randomIndex = Math.floor(Math.random() * data.images.length);
      return data.images[randomIndex].src;

    } catch (error) {
      console.error("Erro ao buscar imagem:", error);
      return "https://dummyimage.com/600x600/000/fff&text=Error";
    }
  }

  // --- Lista de prompts rotativos ---
  const prompts = [
    "futuristic car",
    "cute dog",
    "delicious pizza",
    "futuristic city skyline",
    "robot face",
    "tropical beach sunset",
    "fantasy dragon",
    "beautiful girl portrait",
    "cute cat",
    "colorful galaxy",
    "sports sneakers",
    "gaming setup",
    "luxury watch",
    "anime samurai",
    "hamburger ultra realistic"
  ];

  // --- Elementos do HTML ---
  const imgA = document.querySelectorAll(".option-img")[0];
  const imgB = document.querySelectorAll(".option-img")[1];

  const voteScreen = document.getElementById("vote-screen");
  const resultScreen = document.getElementById("result-screen");

  const youChoice = document.getElementById("you-choice");
  const barA = document.getElementById("barA");
  const barB = document.getElementById("barB");
  const nextBtn = document.getElementById("nextBtn");

  // Gera dois prompts diferentes
  function getTwoPrompts() {
    let a = Math.floor(Math.random() * prompts.length);
    let b = Math.floor(Math.random() * prompts.length);

    while (a === b) {
      b = Math.floor(Math.random() * prompts.length);
    }
    return [prompts[a], prompts[b]];
  }

  // Troca imagens usando IA
  async function generateOptions() {
    const [promptA, promptB] = getTwoPrompts();

    imgA.src = await getImage(promptA);
    imgB.src = await getImage(promptB);

    document.getElementById("labelA").textContent = promptA;
    document.getElementById("labelB").textContent = promptB;
  }

  // Exibe resultado da votação
  function showResult(choice) {
    youChoice.textContent = choice === "A" ? "Opção A" : "Opção B";

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

  // Evento de clique nas opções
  document.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", () => {
      const choice = btn.dataset.choice;
      showResult(choice);
    });
  });

  // Botão "próxima pergunta"
  nextBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    voteScreen.classList.remove("hidden");
    generateOptions();
  });

  // Iniciar o MVP carregando imagens da IA
  generateOptions();
});
