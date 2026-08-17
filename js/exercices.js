/**
 * Learn Deutsch TOOLS - Interactive Exercises & Satzbau Engine (exercices.js)
 */

const QUIZ_QUESTIONS = [
  {
    category: "cases",
    question: "Complétez avec le bon article : « Ich lege das Buch auf ___ Tisch. » (Mouvement vers la table masculine)",
    options: [
      { text: "den", correct: true, exp: "Le verbe 'legen' exprime une action/mouvement (Wohin?). La préposition mixte 'auf' demande donc l'Akkusativ : der Tisch -> den Tisch." },
      { text: "dem", correct: false, exp: "'dem' serait utilisé pour une position statique (Wo? + Dativ avec 'liegen'), ex: Das Buch liegt auf dem Tisch." },
      { text: "der", correct: false, exp: "'der' est la forme au Nominativ masculin ou Dativ féminin." },
      { text: "des", correct: false, exp: "'des' est la marque du Genitiv masculin/neutre." }
    ]
  },
  {
    category: "cases",
    question: "Complétez : « Die Katze schläft unter ___ Bett. » (das Bett - Position statique)",
    options: [
      { text: "dem", correct: true, exp: "Le verbe 'schlafen' indique une position sans mouvement dirigé (Wo?). Unter + Dativ neutre (das Bett) = unter dem Bett." },
      { text: "das", correct: false, exp: "'das' serait l'Akkusativ neutre (pour un mouvement comme 'Die Katze läuft unter das Bett')." },
      { text: "den", correct: false, exp: "'den' est l'Akkusativ masculin ou le Dativ pluriel." },
      { text: "des", correct: false, exp: "'des' est le Genitiv." }
    ]
  },
  {
    category: "verbs",
    question: "Quelle est la forme correcte au Perfekt de : « Wir ___ nach Berlin gefahren. » ?",
    options: [
      { text: "sind", correct: true, exp: "Le verbe 'fahren' exprime un déplacement / changement de lieu, il se conjugue donc avec l'auxiliaire 'sein' : Wir sind gefahren." },
      { text: "haben", correct: false, exp: "Les verbes de déplacement (gehen, fahren, fliegen, kommen) utilisent 'sein' et non 'haben'." },
      { text: "werden", correct: false, exp: "'werden' sert à former le Futur ou le Passif, pas le Perfekt standard." },
      { text: "waren", correct: false, exp: "'waren' est le verbe sein au Präteritum (Plus-que-parfait : waren gefahren)." }
    ]
  },
  {
    category: "verbs",
    question: "Conjuguez le verbe irrégulier 'sehen' au présent : « Du ___ sehr müde aus. » (aussehen)",
    options: [
      { text: "siehst", correct: true, exp: "Le verbe fort 'sehen' subit une alternance vocalique e -> ie à la 2e et 3e personne du singulier : du siehst." },
      { text: "sehst", correct: false, exp: "'sehst' n'existe pas en allemand standard (changement e -> ie obligatoire)." },
      { text: "sieht", correct: false, exp: "'sieht' correspond à er / sie / es." },
      { text: "saht", correct: false, exp: "'saht' est la forme de la 2e personne du pluriel au Präteritum (ihr saht)." }
    ]
  },
  {
    category: "syntax",
    question: "Complétez la subordonnée : « Ich bleibe heute zu Hause, weil ich krank ___ . »",
    options: [
      { text: "bin", correct: true, exp: "Règle d'or : Après une conjonction de subordination comme 'weil', 'dass', 'wenn', le verbe conjugué se place TOUJOURS TOUT À LA FIN de la proposition." },
      { text: "habe", correct: false, exp: "En allemand, pour dire 'être malade', on dit 'krank sein' (Ich bin krank), et le verbe doit être à la fin." },
      { text: "werde", correct: false, exp: "Signifierait 'parce que je deviens malade'." },
      { text: "war", correct: false, exp: "'war' est au passé, alors que 'bleibe' est au présent." }
    ]
  },
  {
    category: "cases",
    question: "Complétez : « Ich danke ___ für deine Hilfe! » (danken + Dativ)",
    options: [
      { text: "dir", correct: true, exp: "Le verbe 'danken' régit obligatoirement le Dativ : danken + Dativ (ich danke dir / Ihnen)." },
      { text: "dich", correct: false, exp: "'dich' est la forme à l'Akkusativ. Attention au piège avec le français !" },
      { text: "du", correct: false, exp: "'du' est au Nominativ." },
      { text: "dein", correct: false, exp: "'dein' est un adjectif possessif." }
    ]
  }
];

let currentQuizFilter = 'all';
let currentQuizList = [...QUIZ_QUESTIONS];
let currentQuizIdx = 0;
let userQuizScore = 0;

function initQuizEngine() {
  currentQuizList = [...QUIZ_QUESTIONS];
  currentQuizIdx = 0;
  userQuizScore = 0;
  loadQuizQuestion();
  initSatzbauChallenge();
}

function filterQuiz(cat) {
  currentQuizFilter = cat;
  currentQuizList = cat === 'all' ? [...QUIZ_QUESTIONS] : QUIZ_QUESTIONS.filter(q => q.category === cat);
  currentQuizIdx = 0;
  userQuizScore = 0;

  document.querySelectorAll('.quiz-filter-btn').forEach(b => {
    if (b.dataset.cat === cat) {
      b.className = "quiz-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow";
    } else {
      b.className = "quiz-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200";
    }
  });

  loadQuizQuestion();
}

function loadQuizQuestion() {
  const container = document.getElementById('quiz-box');
  if (!container) return;

  if (currentQuizIdx >= currentQuizList.length) {
    container.innerHTML = `
      <div class="text-center py-8">
        <div class="text-5xl mb-3">🎉</div>
        <h3 class="text-2xl font-black text-slate-900 mb-2">Quiz terminé !</h3>
        <p class="text-slate-600 mb-4">Votre score : <strong class="text-indigo-600 text-xl font-black">${userQuizScore} / ${currentQuizList.length}</strong></p>
        <button onclick="initQuizEngine()" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition">
          Recommencer le Quiz
        </button>
      </div>
    `;
    UserProgress.incrementQuizCount();
    return;
  }

  const q = currentQuizList[currentQuizIdx];

  container.innerHTML = `
    <div class="flex items-center justify-between text-xs text-slate-400 font-bold mb-4 pb-2 border-b border-slate-100">
      <span>Question ${currentQuizIdx + 1} / ${currentQuizList.length}</span>
      <span class="text-indigo-600">Score : ${userQuizScore}</span>
    </div>

    <h3 class="text-lg font-bold text-slate-900 mb-4">${q.question}</h3>

    <div class="space-y-2.5 mb-5" id="quiz-options-container">
      ${q.options.map((opt, i) => `
        <button onclick="handleAnswerChoice(${i})" class="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-sm font-semibold text-slate-800 transition flex items-center justify-between group">
          <div class="flex items-center gap-3">
            <span class="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-xs font-bold text-slate-600 transition">
              ${['A', 'B', 'C', 'D'][i]}
            </span>
            <span>${opt.text}</span>
          </div>
        </button>
      `).join('')}
    </div>

    <div id="quiz-explanation-box" class="hidden p-4 rounded-xl text-sm font-medium"></div>
  `;
}

function handleAnswerChoice(selectedIdx) {
  const q = currentQuizList[currentQuizIdx];
  const chosenOpt = q.options[selectedIdx];
  const explBox = document.getElementById('quiz-explanation-box');
  const buttons = document.querySelectorAll('#quiz-options-container button');

  // Disable all buttons
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (q.options[i].correct) {
      btn.className = "w-full text-left p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-sm font-bold text-emerald-900 flex items-center justify-between";
    } else if (i === selectedIdx) {
      btn.className = "w-full text-left p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 text-sm font-bold text-rose-900 flex items-center justify-between";
    }
  });

  if (chosenOpt.correct) {
    userQuizScore++;
    UserProgress.addXP(15);
    explBox.className = "p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm mb-4";
    explBox.innerHTML = `
      <p class="font-bold mb-1">✅ Excellent !</p>
      <p class="text-xs text-emerald-800">${chosenOpt.exp}</p>
      <button onclick="nextQuizStep()" class="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition">
        Question suivante ➔
      </button>
    `;
  } else {
    explBox.className = "p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-sm mb-4";
    explBox.innerHTML = `
      <p class="font-bold mb-1">❌ Pas tout à fait...</p>
      <p class="text-xs text-rose-800">${chosenOpt.exp}</p>
      <button onclick="nextQuizStep()" class="mt-3 w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs transition">
        Continuer ➔
      </button>
    `;
  }

  explBox.classList.remove('hidden');
}

function nextQuizStep() {
  currentQuizIdx++;
  loadQuizQuestion();
}

// ==========================================
// 2. Satzbau (Interactive Sentence Builder)
// ==========================================
const SATZBAU_CHALLENGES = [
  {
    meaning: "Demain, je vais au supermarché avec mon ami. (Règle V2 : Verbe en 2e)",
    correctSentence: ["Morgen", "gehe", "ich", "mit", "meinem", "Freund", "in", "den", "Supermarkt."],
    shuffled: ["in", "gehe", "Morgen", "Freund", "ich", "den", "mit", "meinem", "Supermarkt."],
    explanation: "Dans une phrase principale en allemand, le verbe conjugué ('gehe') occupe impérativement la 2ème position, même si on commence par un complément de temps ('Morgen')."
  },
  {
    meaning: "Elle apprend l'allemand parce qu'elle veut travailler à Berlin. (Subordonnée en 'weil')",
    correctSentence: ["Sie", "lernt", "Deutsch,", "weil", "sie", "in", "Berlin", "arbeiten", "will."],
    shuffled: ["weil", "sie", "Deutsch,", "arbeiten", "in", "lernt", "Berlin", "will.", "Sie"],
    explanation: "Après la conjonction de subordination 'weil', le verbe conjugué ('will') est rejeté à l'extrême fin de la phrase."
  },
  {
    meaning: "Tous les matins, nous buvons un café chaud dans la cuisine.",
    correctSentence: ["Jeden", "Morgen", "trinken", "wir", "in", "der", "Küche", "heißen", "Kaffee."],
    shuffled: ["trinken", "in", "heißen", "Jeden", "Kaffee.", "der", "Morgen", "Küche", "wir"],
    explanation: "Ordre logique TeKaMoLo : Temps (Jeden Morgen) -> Verbe en position 2 (trinken) -> Sujet (wir) -> Lieu (in der Küche) -> Objet (heißen Kaffee)."
  }
];

let satzbauIdx = 0;
let userSentenceWords = [];

function initSatzbauChallenge() {
  satzbauIdx = 0;
  loadSatzbauStep();
}

function loadSatzbauStep() {
  const container = document.getElementById('satzbau-area');
  if (!container) return;

  if (satzbauIdx >= SATZBAU_CHALLENGES.length) {
    container.innerHTML = `
      <div class="text-center py-6">
        <div class="text-4xl mb-2">⭐</div>
        <h4 class="text-xl font-bold text-slate-900 mb-1">Tous les défis Satzbau complétés !</h4>
        <p class="text-slate-600 text-sm mb-4">Vous maîtrisez la position du verbe en allemand.</p>
        <button onclick="initSatzbauChallenge()" class="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-lg">
          Recommencer
        </button>
      </div>
    `;
    return;
  }

  const challenge = SATZBAU_CHALLENGES[satzbauIdx];
  userSentenceWords = [];

  container.innerHTML = `
    <div class="mb-4">
      <div class="flex items-center justify-between text-xs text-slate-400 font-bold mb-1">
        <span>Défi Satzbau ${satzbauIdx + 1} / ${SATZBAU_CHALLENGES.length}</span>
        <span class="text-indigo-600">Structure de phrase</span>
      </div>
      <p class="text-sm font-semibold text-slate-800 bg-slate-100 p-3 rounded-xl">
        🎯 <strong>Traduire :</strong> « ${challenge.meaning} »
      </p>
    </div>

    <!-- Drop Zone / Sentence preview -->
    <div class="min-h-[60px] p-3 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/40 flex flex-wrap items-center gap-2 mb-4" id="satzbau-target-zone">
      <span class="text-xs text-slate-400 italic">Cliquez sur les mots ci-dessous pour assembler la phrase...</span>
    </div>

    <!-- Shuffled Word chips -->
    <div class="flex flex-wrap gap-2 mb-6" id="satzbau-chips-container">
      ${challenge.shuffled.map((word, i) => `
        <button onclick="addWordToSentence('${word}', this)" class="word-chip px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-sm font-bold text-slate-800 shadow-sm transition active:scale-95">
          ${word}
        </button>
      `).join('')}
    </div>

    <div class="flex items-center gap-3">
      <button onclick="checkSatzbauSentence()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition">
        Vérifier la phrase ➔
      </button>
      <button onclick="resetSatzbauSentence()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition">
        Effacer
      </button>
    </div>

    <div id="satzbau-feedback" class="hidden mt-4"></div>
  `;
}

function addWordToSentence(word, chipBtn) {
  userSentenceWords.push(word);
  chipBtn.classList.add('selected');

  const targetZone = document.getElementById('satzbau-target-zone');
  if (targetZone) {
    targetZone.innerHTML = userSentenceWords.map((w, i) => `
      <span class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow flex items-center gap-1.5">
        ${w}
      </span>
    `).join('');
  }
}

function resetSatzbauSentence() {
  loadSatzbauStep();
}

function checkSatzbauSentence() {
  const challenge = SATZBAU_CHALLENGES[satzbauIdx];
  const feedbackEl = document.getElementById('satzbau-feedback');
  const targetZone = document.getElementById('satzbau-target-zone');

  const isCorrect = JSON.stringify(userSentenceWords) === JSON.stringify(challenge.correctSentence);

  if (isCorrect) {
    UserProgress.addXP(20);
    feedbackEl.className = "p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900";
    feedbackEl.innerHTML = `
      <p class="font-bold text-sm mb-1">🎉 Parfait ! Phrase correcte !</p>
      <p class="text-xs text-emerald-800 mb-3">💡 ${challenge.explanation}</p>
      <div class="flex items-center gap-3">
        <button onclick="speakGerman('${challenge.correctSentence.join(' ')}', this)" class="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-bold">
          🔊 Écouter la phrase
        </button>
        <button onclick="satzbauIdx++; loadSatzbauStep();" class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold">
          Défi suivant ➔
        </button>
      </div>
    `;
  } else {
    feedbackEl.className = "p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900";
    feedbackEl.innerHTML = `
      <p class="font-bold text-sm mb-1">❌ Ordre incorrect.</p>
      <p class="text-xs text-rose-800">La bonne phrase était : « <strong>${challenge.correctSentence.join(' ')}</strong> »</p>
      <p class="text-xs text-slate-600 mt-1">💡 ${challenge.explanation}</p>
      <button onclick="resetSatzbauSentence()" class="mt-2 text-xs font-bold text-rose-700 underline">
        Réessayer
      </button>
    `;
  }

  feedbackEl.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  initQuizEngine();
});
