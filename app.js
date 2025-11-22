// Banco de imagens local (pode trocar por URLs reais depois)
const images = [
    "https://dummyimage.com/400x400/222/fff&text=Carro",
    "https://dummyimage.com/400x400/333/fff&text=Pizza",
    "https://dummyimage.com/400x400/444/fff&text=Praia",
    "https://dummyimage.com/400x400/555/fff&text=Gato",
    "https://dummyimage.com/400x400/666/fff&text=Futebol",
    "https://dummyimage.com/400x400/777/fff&text=Sorvete",
    "https://dummyimage.com/400x400/888/fff&text=Moto",
    "https://dummyimage.com/400x400/999/fff&text=Montanha",
    "https://dummyimage.com/400x400/111/fff&text=Café",
    "https://dummyimage.com/400x400/000/fff&text=Computador"
];
// app.js - demo minimal
document.addEventListener('DOMContentLoaded', () => {
  const voteScreen = document.getElementById('vote-screen');
  const resultScreen = document.getElementById('result-screen');
  const options = document.querySelectorAll('.option');
  const youChoiceEl = document.getElementById('you-choice');
  const barA = document.getElementById('barA');
  const barB = document.getElementById('barB');
  const labelA = document.getElementById('labelA');
  const labelB = document.getElementById('labelB');
  const nextBtn = document.getElementById('nextBtn');

  // Exemplo: perguntas dummy (no backend ainda)
  const questions = [
    { id:1, q:"Qual você prefere?", a:"Pizza", b:"Hambúrguer", aImg:"assets/option-a.png", bImg:"assets/option-b.png" },
    { id:2, q:"Cachorro ou gato?", a:"Cachorro", b:"Gato", aImg:"assets/option-a.png", bImg:"assets/option-b.png" }
  ];
  let current = 0;

  function loadQuestion(i){
    const Q = questions[i];
    document.getElementById('question-title').textContent = Q.q;
    labelA.textContent = Q.a;
    labelB.textContent = Q.b;
    // swap images if present
    const imgs = document.querySelectorAll('.option-img');
    if(imgs[0]) imgs[0].src = Q.aImg;
    if(imgs[1]) imgs[1].src = Q.bImg;
    // reset bars
    barA.style.width = '0%'; barA.textContent = '0%';
    barB.style.width = '0%'; barB.textContent = '0%';
  }

  // Simula chamada ao servidor que retorna resultados agregados
  function fetchResultsSimulated(choice){
    // aqui você chamaria seu endpoint /vote e depois /results
    // Simulação: cria % aleatório ao redor do choice
    const base = Math.floor(Math.random()*60) + 20; // 20..79
    let aPct = choice === 'A' ? Math.min(95, base + 10) : Math.max(5, base - 10);
    let bPct = 100 - aPct;
    return { a: aPct, b: bPct };
  }

  function showResults(choice){
    const res = fetchResultsSimulated(choice);
    youChoiceEl.textContent = choice === 'A' ? labelA.textContent : labelB.textContent;
    // anima largura
    setTimeout(() => {
      barA.style.width = res.a + '%';
      barA.textContent = res.a + '%';
      barB.style.width = res.b + '%';
      barB.textContent = res.b + '%';
    }, 120);
    voteScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
  }

  options.forEach(opt => {
    opt.addEventListener('click', (e) => {
      const choice = opt.dataset.choice;
      // Paralelamente: aqui você faria POST /vote { question_id, choice, country }
      showResults(choice);
    });
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % questions.length;
    loadQuestion(current);
    resultScreen.classList.add('hidden');
    voteScreen.classList.remove('hidden');
  });

  // theme toggle (simples)
  document.getElementById('toggleTheme').addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    // se quiser, persista em localStorage
  });

  // init
  loadQuestion(current);
});
// Banco de imagens local (pode trocar por URLs reais depois)
const images = [
    "https://via.placeholder.com/400x400?text=Carro",
    "https://via.placeholder.com/400x400?text=Pizza",
    "https://via.placeholder.com/400x400?text=Praia",
    "https://via.placeholder.com/400x400?text=Gato",
    "https://via.placeholder.com/400x400?text=Futebol",
    "https://via.placeholder.com/400x400?text=Sorvete",
    "https://via.placeholder.com/400x400?text=Moto",
    "https://via.placeholder.com/400x400?text=Montanha",
    "https://via.placeholder.com/400x400?text=Café",
    "https://via.placeholder.com/400x400?text=Computador"
];

// Elementos da interface
const optionA = document.getElementById("optionA").querySelector("img");
const optionB = document.getElementById("optionB").querySelector("img");
const resultBox = document.getElementById("result");

// Escolhe 2 imagens diferentes aleatórias
function generateOptions() {
    let a = Math.floor(Math.random() * images.length);
    let b = Math.floor(Math.random() * images.length);

    while (b === a) {
        b = Math.floor(Math.random() * images.length);
    }

    optionA.src = images[a];
    optionB.src = images[b];
}

// Função de voto
function vote(option) {
    if (option === "A") {
        resultBox.textContent = "Você escolheu A!";
    } else {
        resultBox.textContent = "Você escolheu B!";
    }

    // Aguarda 500ms e troca as imagens
    setTimeout(() => {
        resultBox.textContent = "";
        generateOptions();
    }, 500);
}

// Inicializa a primeira dupla
generateOptions();
