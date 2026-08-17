/**
 * Learn Deutsch TOOLS - Declensions & Cases Engine (declinaisons.js)
 * Interactive matrix, Wechselpräpositionen tester, and "Article Detective" Game.
 */

// ==========================================
// 1. Wechselpräpositionen Data & Simulator
// ==========================================
const PREPOSITIONS_DATA = [
  {
    prep: "in",
    meaning: "dans / en",
    dativEx: { de: "Ich bin im (in dem) Park.", fr: "Je suis dans le parc. (Wo? -> Dativ)", type: "masc" },
    akkEx: { de: "Ich gehe in den Park.", fr: "Je vais dans le parc. (Wohin? -> Akkusativ)", type: "masc" }
  },
  {
    prep: "an",
    meaning: "à / contre (contact vertical ou bord)",
    dativEx: { de: "Das Bild hängt an der Wand.", fr: "Le tableau est accroché au mur. (Wo? -> Dativ)", type: "fem" },
    akkEx: { de: "Ich hänge das Bild an die Wand.", fr: "J'accroche le tableau au mur. (Wohin? -> Akkusativ)", type: "fem" }
  },
  {
    prep: "auf",
    meaning: "sur (contact horizontal)",
    dativEx: { de: "Das Buch liegt auf dem Tisch.", fr: "Le livre est posé sur la table. (Wo? -> Dativ)", type: "masc" },
    akkEx: { de: "Ich lege das Buch auf den Tisch.", fr: "Je pose le livre sur la table. (Wohin? -> Akkusativ)", type: "masc" }
  },
  {
    prep: "unter",
    meaning: "sous",
    dativEx: { de: "Die Katze schläft unter dem Bett.", fr: "Le chat dort sous le lit. (Wo? -> Dativ)", type: "neut" },
    akkEx: { de: "Die Katze läuft unter das Bett.", fr: "Le chat court sous le lit. (Wohin? -> Akkusativ)", type: "neut" }
  },
  {
    prep: "über",
    meaning: "au-dessus de / par-dessus",
    dativEx: { de: "Die Lampe hängt über dem Tisch.", fr: "La lampe est suspendue au-dessus de la table. (Wo? -> Dativ)", type: "masc" },
    akkEx: { de: "Das Flugzeug fliegt über die Stadt.", fr: "L'avion vole au-dessus de la ville. (Wohin? -> Akkusativ)", type: "fem" }
  },
  {
    prep: "vor",
    meaning: "devant",
    dativEx: { de: "Das Auto steht vor dem Haus.", fr: "La voiture est garée devant la maison. (Wo? -> Dativ)", type: "neut" },
    akkEx: { de: "Er fährt das Auto vor das Haus.", fr: "Il conduit la voiture devant la maison. (Wohin? -> Akkusativ)", type: "neut" }
  },
  {
    prep: "hinter",
    meaning: "derrière",
    dativEx: { de: "Der Garten liegt hinter dem Gebäude.", fr: "Le jardin se trouve derrière le bâtiment. (Wo? -> Dativ)", type: "neut" },
    akkEx: { de: "Wir gehen hinter das Gebäude.", fr: "Nous allons derrière le bâtiment. (Wohin? -> Akkusativ)", type: "neut" }
  },
  {
    prep: "neben",
    meaning: "à côté de",
    dativEx: { de: "Er sitzt neben meiner Schwester.", fr: "Il est assis à côté de ma sœur. (Wo? -> Dativ)", type: "fem" },
    akkEx: { de: "Er setzt sich neben meine Schwester.", fr: "Il s'assoit à côté de ma sœur. (Wohin? -> Akkusativ)", type: "fem" }
  },
  {
    prep: "zwischen",
    meaning: "entre",
    dativEx: { de: "Der Stift liegt zwischen den Büchern.", fr: "Le stylo se trouve entre les livres. (Wo? -> Dativ Pluriel)", type: "plur" },
    akkEx: { de: "Ich lege den Stift zwischen die Bücher.", fr: "Je pose le stylo entre les livres. (Wohin? -> Akkusativ Pluriel)", type: "plur" }
  }
];

function initPrepositionViewer() {
  const container = document.getElementById('prepositions-grid');
  if (!container) return;

  container.innerHTML = PREPOSITIONS_DATA.map((item, index) => `
    <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition">
      <div class="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
        <div class="flex items-center gap-2">
          <span class="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
            ${item.prep}
          </span>
          <div>
            <h4 class="font-bold text-slate-900">${item.prep}</h4>
            <span class="text-xs text-slate-500">${item.meaning}</span>
          </div>
        </div>
        <button onclick="speakGerman('${item.prep}', this)" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition" title="Prononcer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
        </button>
      </div>

      <div class="space-y-3">
        <!-- DATIV (Statique) -->
        <div class="p-3 rounded-lg bg-teal-50/70 border-l-4 border-teal-500">
          <div class="flex items-center justify-between text-xs font-bold text-teal-800 mb-1">
            <span>📍 DATIV (Wo? Statique)</span>
            <button onclick="speakGerman('${item.dativEx.de}', this)" class="text-teal-700 hover:text-teal-900">🔊</button>
          </div>
          <p class="text-sm font-semibold text-slate-800">${item.dativEx.de}</p>
          <p class="text-xs text-slate-500 mt-0.5">${item.dativEx.fr}</p>
        </div>

        <!-- AKKUSATIV (Mouvement) -->
        <div class="p-3 rounded-lg bg-orange-50/70 border-l-4 border-orange-500">
          <div class="flex items-center justify-between text-xs font-bold text-orange-800 mb-1">
            <span>🚀 AKKUSATIV (Wohin? Mouvement)</span>
            <button onclick="speakGerman('${item.akkEx.de}', this)" class="text-orange-700 hover:text-orange-900">🔊</button>
          </div>
          <p class="text-sm font-semibold text-slate-800">${item.akkEx.de}</p>
          <p class="text-xs text-slate-500 mt-0.5">${item.akkEx.fr}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 2. Interactive Article Detective Game
// ==========================================
const ARTICLE_QUIZ_WORDS = [
  { word: "Tisch", meaning: "la table", gender: "der", tip: "Les meubles et objets du quotidien sont souvent masculins." },
  { word: "Zeitung", meaning: "le journal", gender: "die", tip: "Les mots terminés en -ung sont TOUJOURS féminins (die)." },
  { word: "Mädchen", meaning: "la jeune fille", gender: "das", tip: "Les diminutifs en -chen ou -lein sont TOUJOURS neutres (das)." },
  { word: "Freiheit", meaning: "la liberté", gender: "die", tip: "Les mots terminés en -heit ou -keit sont TOUJOURS féminins (die)." },
  { word: "Auto", meaning: "la voiture", gender: "das", tip: "La plupart des marques ou mots d'emprunt internationaux en -o sont neutres." },
  { word: "Kaffee", meaning: "le café", gender: "der", tip: "Les boissons alcoolisées et stimulantes (der Wein, der Tee, der Kaffee) sont souvent masculines (sauf das Bier)." },
  { word: "Universität", meaning: "l'université", gender: "die", tip: "Les mots terminés en -tät sont TOUJOURS féminins (die)." },
  { word: "Dokument", meaning: "le document", gender: "das", tip: "Les mots d'origine latine ou française en -ment / -um sont neutres." },
  { word: "Montag", meaning: "lundi", gender: "der", tip: "Tous les jours de la semaine, mois et saisons sont masculins (der)." },
  { word: "Schokolade", meaning: "le chocolat", gender: "die", tip: "Beaucoup de mots se terminant par -e sont féminins (die)." },
  { word: "Kino", meaning: "le cinéma", gender: "das", tip: "Les lieux de loisirs courts d'origine internationale sont souvent neutres (das Kino, das Hotel, das Café)." },
  { word: "Lehrerin", meaning: "la professeure", gender: "die", tip: "Les métiers et titres féminins terminés en -in sont toujours féminins." },
  { word: "Schlüssel", meaning: "la clé", gender: "der", tip: "La plupart des outils et objets terminés en -el / -er sont masculins." },
  { word: "Museum", meaning: "le musée", gender: "das", tip: "Les mots en -um (das Zentrum, das Museum) sont neutres." },
  { word: "Bäckerei", meaning: "la boulangerie", gender: "die", tip: "Les commerces ou lieux en -ei sont féminins (die Bäckerei, die Metzgerei)." }
];

let currentDetectiveIndex = 0;
let detectiveScore = 0;
let detectiveStreak = 0;

function initArticleDetective() {
  currentDetectiveIndex = 0;
  detectiveScore = 0;
  detectiveStreak = 0;
  loadDetectiveCard();
}

function loadDetectiveCard() {
  const container = document.getElementById('detective-game-area');
  if (!container) return;

  if (currentDetectiveIndex >= ARTICLE_QUIZ_WORDS.length) {
    // End of game
    container.innerHTML = `
      <div class="text-center py-8">
        <div class="text-5xl mb-4">🏆</div>
        <h3 class="text-2xl font-bold text-slate-900 mb-2">Session terminée !</h3>
        <p class="text-slate-600 mb-6">Score final : <strong class="text-indigo-600 font-bold">${detectiveScore} / ${ARTICLE_QUIZ_WORDS.length}</strong></p>
        <button onclick="initArticleDetective()" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition">
          🔄 Rejouer une session
        </button>
      </div>
    `;
    UserProgress.incrementQuizCount();
    return;
  }

  const current = ARTICLE_QUIZ_WORDS[currentDetectiveIndex];

  container.innerHTML = `
    <div class="flex items-center justify-between text-xs font-semibold text-slate-500 mb-4">
      <span>Question ${currentDetectiveIndex + 1} / ${ARTICLE_QUIZ_WORDS.length}</span>
      <span class="flex items-center gap-1 text-amber-600 font-bold">
        🔥 Série : ${detectiveStreak}
      </span>
    </div>

    <div class="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6">
      <div class="flex items-center justify-center gap-3 mb-2">
        <h3 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          <span class="text-slate-400 font-normal">...</span> ${current.word}
        </h3>
        <button onclick="speakGerman('${current.word}', this)" class="p-2 rounded-full bg-white shadow hover:bg-slate-100 text-slate-700 transition" title="Écouter">
          🔊
        </button>
      </div>
      <p class="text-base text-slate-600 font-medium">Traduction : « ${current.meaning} »</p>
    </div>

    <!-- Article Choice Buttons -->
    <div class="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
      <button onclick="submitArticleChoice('der')" class="py-4 px-3 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-lg sm:text-xl transition transform active:scale-95 flex flex-col items-center">
        <span>DER</span>
        <span class="text-xs font-normal text-blue-600 mt-0.5">Masculin</span>
      </button>
      <button onclick="submitArticleChoice('die')" class="py-4 px-3 rounded-xl border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-lg sm:text-xl transition transform active:scale-95 flex flex-col items-center">
        <span>DIE</span>
        <span class="text-xs font-normal text-rose-600 mt-0.5">Féminin</span>
      </button>
      <button onclick="submitArticleChoice('das')" class="py-4 px-3 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-extrabold text-lg sm:text-xl transition transform active:scale-95 flex flex-col items-center">
        <span>DAS</span>
        <span class="text-xs font-normal text-emerald-600 mt-0.5">Neutre</span>
      </button>
    </div>

    <!-- Feedback Container -->
    <div id="detective-feedback" class="hidden"></div>
  `;
}

function submitArticleChoice(chosen) {
  const current = ARTICLE_QUIZ_WORDS[currentDetectiveIndex];
  const isCorrect = chosen === current.gender;
  const feedbackEl = document.getElementById('detective-feedback');

  if (isCorrect) {
    detectiveScore++;
    detectiveStreak++;
    UserProgress.addXP(10);
    feedbackEl.className = "p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 mt-4";
    feedbackEl.innerHTML = `
      <div class="flex items-center gap-2 font-bold text-base text-emerald-800 mb-1">
        <span>✅ Bravo ! C'est bien <strong>${current.gender.toUpperCase()} ${current.word}</strong></span>
      </div>
      <p class="text-xs text-emerald-700">💡 <strong>Astuce :</strong> ${current.tip}</p>
      <button onclick="nextDetectiveCard()" class="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition">
        Question suivante ➔
      </button>
    `;
    speakGerman(`${current.gender} ${current.word}`);
  } else {
    detectiveStreak = 0;
    feedbackEl.className = "p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 mt-4";
    feedbackEl.innerHTML = `
      <div class="flex items-center gap-2 font-bold text-base text-rose-800 mb-1">
        <span>❌ Faux ! La bonne réponse est <strong>${current.gender.toUpperCase()} ${current.word}</strong></span>
      </div>
      <p class="text-xs text-rose-700">💡 <strong>Astuce :</strong> ${current.tip}</p>
      <button onclick="nextDetectiveCard()" class="mt-3 w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-lg transition">
        Continuer ➔
      </button>
    `;
  }
  feedbackEl.classList.remove('hidden');
}

function nextDetectiveCard() {
  currentDetectiveIndex++;
  loadDetectiveCard();
}

// ==========================================
// 3. Case Declension Matrix Switcher
// ==========================================
const MATRIX_TABLES = {
  definite: `
    <table class="w-full text-left text-sm border-collapse">
      <thead>
        <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
          <th class="p-3">Cas</th>
          <th class="p-3 text-blue-700">Masculin (der)</th>
          <th class="p-3 text-rose-700">Féminin (die)</th>
          <th class="p-3 text-emerald-700">Neutre (das)</th>
          <th class="p-3 text-amber-700">Pluriel (die)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200/70 font-medium">
        <tr class="hover:bg-indigo-50/50">
          <td class="p-3 font-bold text-indigo-700">Nominativ (Sujet)</td>
          <td class="p-3 font-bold text-blue-600">der Mann</td>
          <td class="p-3 font-bold text-rose-600">die Frau</td>
          <td class="p-3 font-bold text-emerald-600">das Kind</td>
          <td class="p-3 font-bold text-amber-600">die Kinder</td>
        </tr>
        <tr class="hover:bg-orange-50/50">
          <td class="p-3 font-bold text-orange-700">Akkusativ (COD / Mouvement)</td>
          <td class="p-3 font-bold text-blue-600 bg-orange-100/50 rounded">den Mann</td>
          <td class="p-3 font-bold text-rose-600">die Frau</td>
          <td class="p-3 font-bold text-emerald-600">das Kind</td>
          <td class="p-3 font-bold text-amber-600">die Kinder</td>
        </tr>
        <tr class="hover:bg-teal-50/50">
          <td class="p-3 font-bold text-teal-700">Dativ (COI / Position)</td>
          <td class="p-3 font-bold text-blue-600 bg-teal-100/50 rounded">dem Mann</td>
          <td class="p-3 font-bold text-rose-600 bg-teal-100/50 rounded">der Frau</td>
          <td class="p-3 font-bold text-emerald-600 bg-teal-100/50 rounded">dem Kind</td>
          <td class="p-3 font-bold text-amber-600 bg-teal-100/50 rounded">den Kindern (+n)</td>
        </tr>
        <tr class="hover:bg-purple-50/50">
          <td class="p-3 font-bold text-purple-700">Genitiv (Possession)</td>
          <td class="p-3 font-bold text-blue-600">des Mannes (+es)</td>
          <td class="p-3 font-bold text-rose-600">der Frau</td>
          <td class="p-3 font-bold text-emerald-600">des Kindes (+es)</td>
          <td class="p-3 font-bold text-amber-600">der Kinder</td>
        </tr>
      </tbody>
    </table>
  `,
  indefinite: `
    <table class="w-full text-left text-sm border-collapse">
      <thead>
        <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
          <th class="p-3">Cas</th>
          <th class="p-3 text-blue-700">Masculin</th>
          <th class="p-3 text-rose-700">Féminin</th>
          <th class="p-3 text-emerald-700">Neutre</th>
          <th class="p-3 text-amber-700">Négation (kein)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200/70 font-medium">
        <tr class="hover:bg-indigo-50/50">
          <td class="p-3 font-bold text-indigo-700">Nominativ</td>
          <td class="p-3 font-bold text-blue-600">ein Tisch</td>
          <td class="p-3 font-bold text-rose-600">eine Tasche</td>
          <td class="p-3 font-bold text-emerald-600">ein Buch</td>
          <td class="p-3 font-bold text-amber-600">keine Bücher</td>
        </tr>
        <tr class="hover:bg-orange-50/50">
          <td class="p-3 font-bold text-orange-700">Akkusativ</td>
          <td class="p-3 font-bold text-blue-600 bg-orange-100/50 rounded">einen Tisch</td>
          <td class="p-3 font-bold text-rose-600">eine Tasche</td>
          <td class="p-3 font-bold text-emerald-600">ein Buch</td>
          <td class="p-3 font-bold text-amber-600">keine Bücher</td>
        </tr>
        <tr class="hover:bg-teal-50/50">
          <td class="p-3 font-bold text-teal-700">Dativ</td>
          <td class="p-3 font-bold text-blue-600 bg-teal-100/50 rounded">einem Tisch</td>
          <td class="p-3 font-bold text-rose-600 bg-teal-100/50 rounded">einer Tasche</td>
          <td class="p-3 font-bold text-emerald-600 bg-teal-100/50 rounded">einem Buch</td>
          <td class="p-3 font-bold text-amber-600 bg-teal-100/50 rounded">keinen Büchern</td>
        </tr>
        <tr class="hover:bg-purple-50/50">
          <td class="p-3 font-bold text-purple-700">Genitiv</td>
          <td class="p-3 font-bold text-blue-600">eines Tisches</td>
          <td class="p-3 font-bold text-rose-600">einer Tasche</td>
          <td class="p-3 font-bold text-emerald-600">eines Buches</td>
          <td class="p-3 font-bold text-amber-600">keiner Bücher</td>
        </tr>
      </tbody>
    </table>
  `,
  pronouns: `
    <table class="w-full text-left text-sm border-collapse">
      <thead>
        <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
          <th class="p-3">Personne</th>
          <th class="p-3 text-indigo-700">Nominativ (Sujet)</th>
          <th class="p-3 text-orange-700">Akkusativ (COD)</th>
          <th class="p-3 text-teal-700">Dativ (COI)</th>
          <th class="p-3 text-purple-700">Possessif</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200/70 font-medium">
        <tr><td class="p-3">1ère sing. (Je)</td><td class="p-3 font-bold">ich</td><td class="p-3 font-bold text-orange-600">mich</td><td class="p-3 font-bold text-teal-600">mir</td><td class="p-3">mein-</td></tr>
        <tr><td class="p-3">2ème sing. (Tu)</td><td class="p-3 font-bold">du</td><td class="p-3 font-bold text-orange-600">dich</td><td class="p-3 font-bold text-teal-600">dir</td><td class="p-3">dein-</td></tr>
        <tr><td class="p-3">3ème masc. (Il)</td><td class="p-3 font-bold">er</td><td class="p-3 font-bold text-orange-600">ihn</td><td class="p-3 font-bold text-teal-600">ihm</td><td class="p-3">sein-</td></tr>
        <tr><td class="p-3">3ème fém. (Elle)</td><td class="p-3 font-bold">sie</td><td class="p-3 font-bold text-orange-600">sie</td><td class="p-3 font-bold text-teal-600">ihr</td><td class="p-3">ihr-</td></tr>
        <tr><td class="p-3">3ème neutre (Il/Elle)</td><td class="p-3 font-bold">es</td><td class="p-3 font-bold text-orange-600">es</td><td class="p-3 font-bold text-teal-600">ihm</td><td class="p-3">sein-</td></tr>
        <tr><td class="p-3">1ère plur. (Nous)</td><td class="p-3 font-bold">wir</td><td class="p-3 font-bold text-orange-600">uns</td><td class="p-3 font-bold text-teal-600">uns</td><td class="p-3">unser-</td></tr>
        <tr><td class="p-3">2ème plur. (Vous)</td><td class="p-3 font-bold">ihr</td><td class="p-3 font-bold text-orange-600">euch</td><td class="p-3 font-bold text-teal-600">euch</td><td class="p-3">euer-</td></tr>
        <tr><td class="p-3">3ème plur. / Poli</td><td class="p-3 font-bold">sie / Sie</td><td class="p-3 font-bold text-orange-600">sie / Sie</td><td class="p-3 font-bold text-teal-600">ihnen / Ihnen</td><td class="p-3">ihr- / Ihr-</td></tr>
      </tbody>
    </table>
  `
};

function switchMatrixTab(tabName) {
  const container = document.getElementById('matrix-content');
  const tabs = document.querySelectorAll('.matrix-tab-btn');
  if (!container) return;

  tabs.forEach(btn => {
    if (btn.dataset.tab === tabName) {
      btn.className = "matrix-tab-btn px-4 py-2 text-sm font-bold rounded-lg bg-indigo-600 text-white shadow transition";
    } else {
      btn.className = "matrix-tab-btn px-4 py-2 text-sm font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition";
    }
  });

  container.innerHTML = MATRIX_TABLES[tabName] || MATRIX_TABLES.definite;
}

document.addEventListener('DOMContentLoaded', () => {
  initPrepositionViewer();
  initArticleDetective();
  switchMatrixTab('definite');
});
