/**
 * Learn Deutsch TOOLS - Adjective Declensions Engine (adjectifs.js)
 * Interactive matrix, dynamic simulator, and Adjective Endings Trainer.
 */

// Adjective endings logic
const ADJECTIVE_RULES = {
  // 1. Weak Declension (after der, die, das, dieser, jener, etc.)
  weak: {
    name: "Déclinaison Faible (après article défini der, die, das)",
    desc: "Utilisée lorsque l'article porte déjà la marque du cas. Les terminaisons sont soit -e, soit -en.",
    rule: "Règle de la cuillère / poêle : Au Nominativ (et Akk fém/neutre), la terminaison est -e. Partout ailleurs, c'est -en.",
    endings: {
      masc: { nom: "-e", akk: "-en", dat: "-en", gen: "-en" },
      fem:  { nom: "-e", akk: "-e",  dat: "-en", gen: "-en" },
      neut: { nom: "-e", akk: "-e",  dat: "-en", gen: "-en" },
      plur: { nom: "-en",akk: "-en", dat: "-en", gen: "-en" }
    },
    examples: {
      masc: { nom: "der alt<strong>e</strong> Mann", akk: "den alt<strong>en</strong> Mann", dat: "dem alt<strong>en</strong> Mann", gen: "des alt<strong>en</strong> Mannes" },
      fem:  { nom: "die schön<strong>e</strong> Frau", akk: "die schön<strong>e</strong> Frau", dat: "der schön<strong>en</strong> Frau", gen: "der schön<strong>en</strong> Frau" },
      neut: { nom: "das neu<strong>e</strong> Buch", akk: "das neu<strong>e</strong> Buch", dat: "dem neu<strong>en</strong> Buch", gen: "des neu<strong>en</strong> Buches" },
      plur: { nom: "die groß<strong>en</strong> Häuser", akk: "die groß<strong>en</strong> Häuser", dat: "den groß<strong>en</strong> Häusern", gen: "der groß<strong>en</strong> Häuser" }
    }
  },

  // 2. Mixed Declension (after ein, eine, kein, mein, dein, sein...)
  mixed: {
    name: "Déclinaison Mixte (après ein, eine, kein, possessifs mein/dein...)",
    desc: "Utilisée après un article indéfini ou possessif. Si l'article n'a pas de terminaison distincte (ein masc/neutre au Nominativ), l'adjectif prend la marque du genre (-er ou -es).",
    rule: "Au Nominativ masc = -er, neutre = -es. Au fém = -e. Aux autres cas = -en.",
    endings: {
      masc: { nom: "-er", akk: "-en", dat: "-en", gen: "-en" },
      fem:  { nom: "-e",  akk: "-e",  dat: "-en", gen: "-en" },
      neut: { nom: "-es", akk: "-es", dat: "-en", gen: "-en" },
      plur: { nom: "-en", akk: "-en", dat: "-en", gen: "-en" }
    },
    examples: {
      masc: { nom: "ein alt<strong>er</strong> Mann", akk: "einen alt<strong>en</strong> Mann", dat: "einem alt<strong>en</strong> Mann", gen: "eines alt<strong>en</strong> Mannes" },
      fem:  { nom: "eine schön<strong>e</strong> Frau", akk: "eine schön<strong>e</strong> Frau", dat: "einer schön<strong>en</strong> Frau", gen: "einer schön<strong>en</strong> Frau" },
      neut: { nom: "ein neu<strong>es</strong> Buch", akk: "ein neu<strong>es</strong> Buch", dat: "einem neu<strong>en</strong> Buch", gen: "eines neu<strong>en</strong> Buches" },
      plur: { nom: "keine groß<strong>en</strong> Häuser", akk: "keine groß<strong>en</strong> Häuser", dat: "keinen groß<strong>en</strong> Häusern", gen: "keiner groß<strong>en</strong> Häuser" }
    }
  },

  // 3. Strong Declension (without article - Nullartikel)
  strong: {
    name: "Déclinaison Forte (sans aucun article / Nullartikel)",
    desc: "Utilisée quand il n'y a pas d'article. L'adjectif doit alors porter lui-même la marque caractéristique du cas et du genre (identique aux terminaisons de der/die/das, sauf au Génitif masc/neutre qui prend -en).",
    rule: "L'adjectif remplace l'article : -er (der), -e (die), -es (das), -en (den), -em (dem), -er (der).",
    endings: {
      masc: { nom: "-er", akk: "-en", dat: "-em", gen: "-en" },
      fem:  { nom: "-e",  akk: "-e",  dat: "-er", gen: "-er" },
      neut: { nom: "-es", akk: "-es", dat: "-em", gen: "-en" },
      plur: { nom: "-e",  akk: "-e",  dat: "-en", gen: "-er" }
    },
    examples: {
      masc: { nom: "heiß<strong>er</strong> Kaffee", akk: "heiß<strong>en</strong> Kaffee", dat: "heiß<strong>em</strong> Kaffee", gen: "heiß<strong>en</strong> Kaffees" },
      fem:  { nom: "frisch<strong>e</strong> Milch", akk: "frisch<strong>e</strong> Milch", dat: "frisch<strong>er</strong> Milch", gen: "frisch<strong>er</strong> Milch" },
      neut: { nom: "kalt<strong>es</strong> Wasser", akk: "kalt<strong>es</strong> Wasser", dat: "kalt<strong>em</strong> Wasser", gen: "kalt<strong>en</strong> Wassers" },
      plur: { nom: "gut<strong>e</strong> Freunde", akk: "gut<strong>e</strong> Freunde", dat: "gut<strong>en</strong> Freunden", gen: "gut<strong>er</strong> Freunde" }
    }
  }
};

let currentSelectedDeclType = 'weak';

function initAdjectivesPage() {
  renderDeclensionTypeButtons();
  renderAdjectiveMatrix('weak');
  initSimulator();
  initAdjectiveQuiz();
}

function renderDeclensionTypeButtons() {
  const container = document.getElementById('adjective-type-buttons');
  if (!container) return;

  const types = [
    { key: 'weak', label: '1. Faible (der/die/das)', color: 'bg-blue-600' },
    { key: 'mixed', label: '2. Mixte (ein/kein/mein)', color: 'bg-emerald-600' },
    { key: 'strong', label: '3. Forte (sans article)', color: 'bg-purple-600' }
  ];

  container.innerHTML = types.map(t => `
    <button onclick="switchAdjectiveDeclType('${t.key}')" class="px-4 py-2.5 rounded-xl font-bold text-xs border transition ${
      currentSelectedDeclType === t.key 
        ? `${t.color} text-white shadow-md border-transparent` 
        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
    }">
      ${t.label}
    </button>
  `).join('');
}

function switchAdjectiveDeclType(key) {
  currentSelectedDeclType = key;
  renderDeclensionTypeButtons();
  renderAdjectiveMatrix(key);
}

function renderAdjectiveMatrix(typeKey) {
  const container = document.getElementById('adjective-matrix-container');
  const explEl = document.getElementById('adjective-rule-explanation');
  if (!container) return;

  const data = ADJECTIVE_RULES[typeKey];

  if (explEl) {
    explEl.innerHTML = `
      <div class="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
        <h4 class="font-black text-indigo-950 text-sm mb-1">${data.name}</h4>
        <p class="text-xs text-indigo-900 mb-2">${data.desc}</p>
        <div class="p-2.5 bg-white rounded-xl text-xs font-bold text-slate-800 border border-indigo-100 flex items-center gap-2">
          <span>💡</span> <span>${data.rule}</span>
        </div>
      </div>
    `;
  }

  const cases = [
    { key: 'nom', name: 'Nominativ', color: 'text-indigo-700' },
    { key: 'akk', name: 'Akkusativ', color: 'text-orange-700' },
    { key: 'dat', name: 'Dativ', color: 'text-teal-700' },
    { key: 'gen', name: 'Genitiv', color: 'text-purple-700' }
  ];

  container.innerHTML = `
    <table class="w-full text-left text-xs sm:text-sm border-collapse">
      <thead>
        <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
          <th class="p-3">Cas</th>
          <th class="p-3 text-blue-700">Masculin</th>
          <th class="p-3 text-rose-700">Féminin</th>
          <th class="p-3 text-emerald-700">Neutre</th>
          <th class="p-3 text-amber-700">Pluriel</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 font-medium">
        ${cases.map(c => `
          <tr class="hover:bg-slate-50 transition">
            <td class="p-3 font-bold ${c.color}">${c.name}</td>
            <td class="p-3">${data.examples.masc[c.key]} <span class="ml-1 px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-mono font-bold">${data.endings.masc[c.key]}</span></td>
            <td class="p-3">${data.examples.fem[c.key]} <span class="ml-1 px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[11px] font-mono font-bold">${data.endings.fem[c.key]}</span></td>
            <td class="p-3">${data.examples.neut[c.key]} <span class="ml-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-mono font-bold">${data.endings.neut[c.key]}</span></td>
            <td class="p-3">${data.examples.plur[c.key]} <span class="ml-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[11px] font-mono font-bold">${data.endings.plur[c.key]}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ==========================================
// 2. Live Dynamic Simulator
// ==========================================
function initSimulator() {
  const articleSelect = document.getElementById('sim-article-type');
  const genderSelect = document.getElementById('sim-gender');
  const caseSelect = document.getElementById('sim-case');
  const adjInput = document.getElementById('sim-adjective');
  const nounInput = document.getElementById('sim-noun');

  const updateSimulatorResult = () => {
    const artType = articleSelect ? articleSelect.value : 'def';
    const gender = genderSelect ? genderSelect.value : 'masc';
    const cs = caseSelect ? caseSelect.value : 'nom';
    const rawAdj = (adjInput && adjInput.value.trim()) || 'klein';
    const rawNoun = (nounInput && nounInput.value.trim()) || (gender === 'masc' ? 'Hund' : gender === 'fem' ? 'Katze' : gender === 'neut' ? 'Haus' : 'Kinder');

    let declType = 'weak';
    let articleStr = '';

    if (artType === 'def') {
      declType = 'weak';
      const articles = {
        masc: { nom: 'der', akk: 'den', dat: 'dem', gen: 'des' },
        fem:  { nom: 'die', akk: 'die', dat: 'der', gen: 'der' },
        neut: { nom: 'das', akk: 'das', dat: 'dem', gen: 'des' },
        plur: { nom: 'die', akk: 'die', dat: 'den', gen: 'der' }
      };
      articleStr = articles[gender][cs];
    } else if (artType === 'indef') {
      declType = 'mixed';
      const articles = {
        masc: { nom: 'ein', akk: 'einen', dat: 'einem', gen: 'eines' },
        fem:  { nom: 'eine', akk: 'eine', dat: 'einer', gen: 'einer' },
        neut: { nom: 'ein', akk: 'ein', dat: 'einem', gen: 'eines' },
        plur: { nom: 'keine', akk: 'keine', dat: 'keinen', gen: 'keiner' }
      };
      articleStr = articles[gender][cs];
    } else {
      declType = 'strong';
      articleStr = '';
    }

    const ending = ADJECTIVE_RULES[declType].endings[gender][cs];
    const cleanEnding = ending.replace('-', '');
    const conjugatedAdj = `${rawAdj}${cleanEnding}`;
    
    let nounEnding = '';
    if (cs === 'gen' && (gender === 'masc' || gender === 'neut')) {
      nounEnding = rawNoun.endsWith('s') ? '' : 'es';
    } else if (cs === 'dat' && gender === 'plur' && !rawNoun.endsWith('n') && !rawNoun.endsWith('s')) {
      nounEnding = 'n';
    }

    const fullNoun = `${rawNoun}${nounEnding}`;
    const fullPhrase = `${articleStr ? articleStr + ' ' : ''}${conjugatedAdj} ${fullNoun}`.trim();

    const outputEl = document.getElementById('sim-result-phrase');
    const endingBadge = document.getElementById('sim-result-ending');
    const explBadge = document.getElementById('sim-result-expl');

    if (outputEl) outputEl.textContent = fullPhrase;
    if (endingBadge) endingBadge.textContent = ending;
    if (explBadge) {
      explBadge.textContent = `${ADJECTIVE_RULES[declType].name} ➔ Cas : ${cs.toUpperCase()} / Genre : ${gender.toUpperCase()}`;
    }
  };

  [articleSelect, genderSelect, caseSelect, adjInput, nounInput].forEach(el => {
    if (el) el.addEventListener('change', updateSimulatorResult);
    if (el && el.tagName === 'INPUT') el.addEventListener('input', updateSimulatorResult);
  });

  updateSimulatorResult();

  const listenBtn = document.getElementById('sim-listen-btn');
  if (listenBtn) {
    listenBtn.addEventListener('click', () => {
      const phrase = document.getElementById('sim-result-phrase')?.textContent;
      if (phrase) speakGerman(phrase, listenBtn);
    });
  }
}

// ==========================================
// 3. Adjectives Quiz Trainer
// ==========================================
const ADJ_QUIZ = [
  {
    sentence: "Ich trinke gern heiß___ Kaffee.",
    correct: "-en",
    full: "heiß<strong>en</strong> Kaffee",
    meaning: "Je bois volontiers du café chaud. (Akkusativ masculin sans article = Déclinaison forte ➔ -en)",
    options: ["-en", "-er", "-es", "-e"]
  },
  {
    sentence: "Wir haben ein schön___ Haus gekauft.",
    correct: "-es",
    full: "ein schön<strong>es</strong> Haus",
    meaning: "Nous avons acheté une belle maison. (Akkusativ neutre avec 'ein' = Déclinaison mixte ➔ -es)",
    options: ["-es", "-en", "-e", "-em"]
  },
  {
    sentence: "Er hilft der alt___ Dame.",
    correct: "-en",
    full: "der alt<strong>en</strong> Dame",
    meaning: "Il aide la vieille dame. (Dativ féminin après article défini 'der' = Déclinaison faible ➔ -en)",
    options: ["-en", "-er", "-e", "-em"]
  },
  {
    sentence: "Gestern habe ich mit mein___ neu___ Freunden gesprochen.",
    correct: "-en",
    full: "meinen neu<strong>en</strong> Freunden",
    meaning: "Hier j'ai parlé avec mes nouveaux amis. (Dativ pluriel = toujours -en)",
    options: ["-en", "-er", "-e", "-es"]
  }
];

let adjQuizIdx = 0;
let adjScore = 0;

function initAdjectiveQuiz() {
  adjQuizIdx = 0;
  adjScore = 0;
  loadAdjQuizQuestion();
}

function loadAdjQuizQuestion() {
  const container = document.getElementById('adj-quiz-container');
  if (!container) return;

  if (adjQuizIdx >= ADJ_QUIZ.length) {
    container.innerHTML = `
      <div class="text-center py-6">
        <div class="text-4xl mb-2">🎉</div>
        <h4 class="text-xl font-bold text-slate-900 mb-1">Entraînement Terminé !</h4>
        <p class="text-slate-600 text-sm mb-4">Score : <strong class="text-indigo-600 font-bold">${adjScore} / ${ADJ_QUIZ.length}</strong></p>
        <button onclick="initAdjectiveQuiz()" class="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow">
          Recommencer
        </button>
      </div>
    `;
    UserProgress.incrementQuizCount();
    return;
  }

  const q = ADJ_QUIZ[adjQuizIdx];

  container.innerHTML = `
    <div class="flex items-center justify-between text-xs text-slate-400 font-bold mb-3 pb-2 border-b">
      <span>Question ${adjQuizIdx + 1} / ${ADJ_QUIZ.length}</span>
      <span class="text-indigo-600 font-bold">Score : ${adjScore}</span>
    </div>

    <div class="p-4 bg-slate-50 rounded-xl text-center mb-4 border border-slate-200">
      <h3 class="text-xl font-extrabold text-slate-900">${q.sentence}</h3>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4" id="adj-options-list">
      ${q.options.map(opt => `
        <button onclick="checkAdjAnswer('${opt}')" class="py-3 px-2 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 font-mono font-bold text-base text-slate-800 transition active:scale-95">
          ${opt}
        </button>
      `).join('')}
    </div>

    <div id="adj-feedback-box" class="hidden"></div>
  `;
}

function checkAdjAnswer(chosen) {
  const q = ADJ_QUIZ[adjQuizIdx];
  const isCorrect = chosen === q.correct;
  const feedback = document.getElementById('adj-feedback-box');
  const buttons = document.querySelectorAll('#adj-options-list button');

  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent.trim() === q.correct) {
      b.className = "py-3 px-2 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-mono font-bold text-base";
    } else if (b.textContent.trim() === chosen) {
      b.className = "py-3 px-2 rounded-xl border-2 border-rose-500 bg-rose-50 text-rose-900 font-mono font-bold text-base";
    }
  });

  if (isCorrect) {
    adjScore++;
    UserProgress.addXP(10);
    feedback.className = "p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs";
    feedback.innerHTML = `
      <p class="font-bold mb-1">✅ Bravo ! Phrase complète : « ${q.full} »</p>
      <p>${q.meaning}</p>
      <button onclick="adjQuizIdx++; loadAdjQuizQuestion();" class="mt-2 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs">
        Question suivante ➔
      </button>
    `;
  } else {
    feedback.className = "p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs";
    feedback.innerHTML = `
      <p class="font-bold mb-1">❌ Mauvaise terminaison. La bonne réponse était : <strong>${q.correct}</strong></p>
      <p>${q.meaning}</p>
      <button onclick="adjQuizIdx++; loadAdjQuizQuestion();" class="mt-2 w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded font-bold text-xs">
        Continuer ➔
      </button>
    `;
  }

  feedback.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  initAdjectivesPage();
});
