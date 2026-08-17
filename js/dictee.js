/**
 * Learn Deutsch TOOLS - German Dictation & Listening Trainer (dictee.js)
 */

const DICTATION_ITEMS = [
  {
    level: "A1",
    audioText: "Ich trinke jeden Morgen eine Tasse Kaffee mit Milch.",
    meaning: "Je bois chaque matin une tasse de café avec du lait.",
    hint: "Rappelez-vous : 'Morgen', 'Tasse', 'Kaffee' et 'Milch' prennent une majuscule."
  },
  {
    level: "A1",
    audioText: "Mein Zug fährt heute um acht Uhr vom Hauptbahnhof ab.",
    meaning: "Mon train part aujourd'hui à huit heures de la gare centrale. (abfahren - verbe séparable)",
    hint: "Verbe séparable : abfahren ➔ 'fährt ... ab'."
  },
  {
    level: "A2",
    audioText: "Weil das Wetter so schön ist, machen wir einen langen Spaziergang im Park.",
    meaning: "Parce qu'il fait si beau, nous faisons une longue promenade dans le parc.",
    hint: "Subordonnée en 'weil' ➔ le verbe 'ist' est tout à la fin."
  },
  {
    level: "B1",
    audioText: "Obwohl ich sehr müde war, habe ich die ganze Nacht für die Deutschprüfung gelernt.",
    meaning: "Bien que j'étais très fatigué, j'ai révisé toute la nuit pour l'examen d'allemand.",
    hint: "Obwohl + verbe à la fin (war) -> proposition principale (habe ich gelernt)."
  },
  {
    level: "A2",
    audioText: "Könnten Sie mir bitte sagen, wo sich die nächste Apotheke befindet?",
    meaning: "Pourriez-vous s'il vous plaît me dire où se trouve la pharmacie la plus proche ?",
    hint: "Formule de politesse au Konjunktiv II : 'Könnten Sie...'"
  }
];

let dictationIdx = 0;
let dictationSpeed = 0.9;
let dictationScore = 0;

function initDictationPage() {
  dictationIdx = 0;
  dictationScore = 0;
  loadDictationItem();
}

function setPlaybackSpeed(speed) {
  dictationSpeed = speed;
  document.querySelectorAll('.speed-btn').forEach(btn => {
    if (parseFloat(btn.dataset.speed) === speed) {
      btn.className = "speed-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow";
    } else {
      btn.className = "speed-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200";
    }
  });
}

function playDictationAudio() {
  const current = DICTATION_ITEMS[dictationIdx];
  const btn = document.getElementById('play-audio-main-btn');

  if (!('speechSynthesis' in window)) {
    showToast("La synthèse vocale n'est pas supportée sur ce navigateur.", "warning");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(current.audioText);
  utterance.lang = 'de-DE';
  utterance.rate = dictationSpeed;

  if (germanVoice) utterance.voice = germanVoice;

  if (btn) {
    btn.classList.add('speaking');
    utterance.onend = () => btn.classList.remove('speaking');
    utterance.onerror = () => btn.classList.remove('speaking');
  }

  window.speechSynthesis.speak(utterance);
}

function loadDictationItem() {
  const container = document.getElementById('dictation-area');
  if (!container) return;

  if (dictationIdx >= DICTATION_ITEMS.length) {
    container.innerHTML = `
      <div class="text-center py-8">
        <div class="text-5xl mb-3">🎧</div>
        <h3 class="text-2xl font-black text-slate-900 mb-2">Session d'écoute terminée !</h3>
        <p class="text-slate-600 mb-4">Exercices réussis : <strong class="text-indigo-600 font-bold">${dictationScore} / ${DICTATION_ITEMS.length}</strong></p>
        <button onclick="initDictationPage()" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition">
          Recommencer une dictée
        </button>
      </div>
    `;
    UserProgress.incrementQuizCount();
    return;
  }

  const item = DICTATION_ITEMS[dictationIdx];

  container.innerHTML = `
    <div class="flex items-center justify-between text-xs text-slate-400 font-bold mb-4 pb-2 border-b">
      <span>Dictée ${dictationIdx + 1} / ${DICTATION_ITEMS.length}</span>
      <span class="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">${item.level}</span>
    </div>

    <!-- Audio Player Center Box -->
    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center mb-6">
      <p class="text-xs text-slate-500 font-medium mb-3">Écoutez attentivement l'extrait puis écrivez la phrase complète :</p>
      
      <button id="play-audio-main-btn" onclick="playDictationAudio()" class="audio-btn px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition transform active:scale-95 inline-flex items-center gap-2">
        <span>🔊 Écouter la phrase</span>
      </button>

      <!-- Speed Selector -->
      <div class="flex items-center justify-center gap-2 mt-4">
        <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider mr-1">Vitesse :</span>
        <button onclick="setPlaybackSpeed(0.75)" data-speed="0.75" class="speed-btn px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200">0.75x (Lent)</button>
        <button onclick="setPlaybackSpeed(0.9)" data-speed="0.9" class="speed-btn px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow">0.9x (Normal)</button>
        <button onclick="setPlaybackSpeed(1.1)" data-speed="1.1" class="speed-btn px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200">1.1x (Rapide)</button>
      </div>
    </div>

    <!-- User Input form -->
    <div class="space-y-3 mb-4">
      <label for="dictation-user-input" class="block text-xs font-bold uppercase tracking-wider text-slate-500">Votre transcription :</label>
      <textarea id="dictation-user-input" rows="3" placeholder="Écrivez la phrase en allemand ici..." 
                class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"></textarea>

      <!-- Special German Character Inserts -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <span class="text-[11px] text-slate-400 font-semibold mr-1">Caractères spéciaux :</span>
        ${['ä', 'ö', 'ü', 'Ä', 'Ö', 'Ü', 'ß'].map(c => `
          <button onclick="insertChar('${c}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold transition">
            ${c}
          </button>
        `).join('')}
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button onclick="verifyDictation()" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition">
        Vérifier la dictée ➔
      </button>
      <button onclick="giveDictationHint()" class="px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs rounded-xl border border-amber-200 transition">
        💡 Indice
      </button>
    </div>

    <div id="dictation-feedback" class="hidden mt-6"></div>
  `;
}

function insertChar(char) {
  const input = document.getElementById('dictation-user-input');
  if (!input) return;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const text = input.value;
  input.value = text.substring(0, start) + char + text.substring(end);
  input.focus();
  input.selectionStart = input.selectionEnd = start + 1;
}

function giveDictationHint() {
  const item = DICTATION_ITEMS[dictationIdx];
  showToast(`Indice : ${item.hint}`, 'info');
}

function verifyDictation() {
  const item = DICTATION_ITEMS[dictationIdx];
  const inputEl = document.getElementById('dictation-user-input');
  const feedback = document.getElementById('dictation-feedback');
  if (!inputEl || !feedback) return;

  const userText = inputEl.value.trim();
  if (!userText) {
    showToast("Veuillez saisir une réponse.", "warning");
    return;
  }

  // Normalize punctuation for comparison
  const normalize = (str) => str.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ").trim();
  const isExact = userText === item.audioText;
  const isClose = normalize(userText.toLowerCase()) === normalize(item.audioText.toLowerCase());

  if (isExact) {
    dictationScore++;
    UserProgress.addXP(25);
    feedback.className = "p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900";
    feedback.innerHTML = `
      <p class="font-black text-sm mb-1">🎉 Parfait ! Orthographe et ponctuation irréprochables !</p>
      <p class="text-xs text-emerald-800 mb-2">« <em>${item.meaning}</em> »</p>
      <button onclick="dictationIdx++; loadDictationItem();" class="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs">
        Dictée suivante ➔
      </button>
    `;
  } else if (isClose) {
    dictationScore++;
    UserProgress.addXP(15);
    feedback.className = "p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900";
    feedback.innerHTML = `
      <p class="font-black text-sm mb-1">⚠️ Presque parfait ! Attention aux majuscules ou à la ponctuation :</p>
      <div class="p-2 bg-white rounded-lg border border-amber-200 text-xs font-mono mb-2">
        Votre texte : ${userText}<br>
        Texte exact : <strong>${item.audioText}</strong>
      </div>
      <p class="text-xs text-amber-800 mb-2">« <em>${item.meaning}</em> »</p>
      <button onclick="dictationIdx++; loadDictationItem();" class="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs">
        Dictée suivante ➔
      </button>
    `;
  } else {
    feedback.className = "p-5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900";
    feedback.innerHTML = `
      <p class="font-black text-sm mb-1">❌ Des erreurs ont été détectées :</p>
      <div class="p-2 bg-white rounded-lg border border-rose-200 text-xs font-mono mb-2">
        La bonne phrase était : <br><strong>${item.audioText}</strong>
      </div>
      <p class="text-xs text-rose-800 mb-1">Traduction : « <em>${item.meaning}</em> »</p>
      <p class="text-[11px] text-slate-600">💡 ${item.hint}</p>
      <button onclick="dictationIdx++; loadDictationItem();" class="mt-3 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs">
        Continuer ➔
      </button>
    `;
  }

  feedback.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  initDictationPage();
});
