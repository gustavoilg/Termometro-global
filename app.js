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
