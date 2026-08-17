/**
 * Learn Deutsch TOOLS - Vocabulary & Flashcards Engine (vocabulaire.js)
 */

const VOCAB_CATEGORIES = {
  alltag: {
    name: "🏠 Vie Quotidienne & Maison",
    words: [
      { article: "der", de: "Schlüssel", pl: "die Schlüssel", fr: "la clé", ex: "Ich habe meinen Schlüssel vergessen.", level: "A1" },
      { article: "das", de: "Zimmer", pl: "die Zimmer", fr: "la chambre / la pièce", ex: "Mein Zimmer ist sehr hell.", level: "A1" },
      { article: "die", de: "Küche", pl: "die Küchen", fr: "la cuisine", ex: "Wir kochen zusammen in der Küche.", level: "A1" },
      { article: "der", de: "Kühlschrank", pl: "die Kühlschränke", fr: "le réfrigérateur", ex: "Die Milch steht im Kühlschrank.", level: "A1" },
      { article: "das", de: "Fenster", pl: "die Fenster", fr: "la fenêtre", ex: "Bitte mach das Fenster auf.", level: "A1" },
      { article: "die", de: "Tür", pl: "die Türen", fr: "la porte", ex: "Schließe bitte die Tür.", level: "A1" },
      { article: "der", de: "Nachbar", pl: "die Nachbarn", fr: "le voisin", ex: "Mein Nachbar ist sehr freundlich.", level: "A2" }
    ]
  },
  arbeit: {
    name: "💼 Travail & Bureau",
    words: [
      { article: "die", de: "Bewerbung", pl: "die Bewerbungen", fr: "la candidature", ex: "Ich schicke heute meine Bewerbung ab.", level: "B1" },
      { article: "der", de: "Kollege", pl: "die Kollegen", fr: "le collègue", ex: "Meine Kollegen sind hilfsbereit.", level: "A2" },
      { article: "das", de: "Vorstellungsgespräch", pl: "die Vorstellungsgespräche", fr: "l'entretien d'embauche", ex: "Morgen habe ich ein Vorstellungsgespräch.", level: "B1" },
      { article: "die", de: "Besprechung", pl: "die Besprechungen", fr: "la réunion", ex: "Die Besprechung beginnt um 10 Uhr.", level: "A2" },
      { article: "der", de: "Vertrag", pl: "die Verträge", fr: "le contrat", ex: "Er hat den Arbeitsvertrag unterschrieben.", level: "B1" },
      { article: "das", de: "Gehalt", pl: "die Gehälter", fr: "le salaire", ex: "Das Gehalt wird am Monatsende überwiesen.", level: "B1" }
    ]
  },
  reisen: {
    name: "✈️ Voyages & Transports",
    words: [
      { article: "der", de: "Bahnhof", pl: "die Bahnhöfe", fr: "la gare", ex: "Wir treffen uns am Hauptbahnhof.", level: "A1" },
      { article: "die", de: "Fahrkarte", pl: "die Fahrkarten", fr: "le billet de transport", ex: "Hast du schon eine Fahrkarte gekauft?", level: "A1" },
      { article: "das", de: "Flugzeug", pl: "die Flugzeuge", fr: "l'avion", ex: "Das Flugzeug landet pünktlich.", level: "A1" },
      { article: "die", de: "Verspätung", pl: "die Verspätungen", fr: "le retard", ex: "Der Zug hat 15 Minuten Verspätung.", level: "A2" },
      { article: "der", de: "Koffer", pl: "die Koffer", fr: "la valise", ex: "Ich packe meinen Koffer für den Urlaub.", level: "A1" },
      { article: "das", de: "Gleis", pl: "die Gleise", fr: "la voie de train / le quai", ex: "Der Zug fährt von Gleis 4 ab.", level: "A1" }
    ]
  },
  essen: {
    name: "🍽️ Nourriture & Restaurant",
    words: [
      { article: "das", de: "Frühstück", pl: "die Frühstücke", fr: "le petit-déjeuner", ex: "Was isst du gern zum Frühstück?", level: "A1" },
      { article: "die", de: "Rechnung", pl: "die Rechnungen", fr: "l'addition / la facture", ex: "Die Rechnung, bitte!", level: "A1" },
      { article: "der", de: "Kellner", pl: "die Kellner", fr: "le serveur", ex: "Der Kellner bringt die Speisekarte.", level: "A1" },
      { article: "das", de: "Gericht", pl: "die Gerichte", fr: "le plat", ex: "Dieses Gericht schmeckt fantastisch.", level: "A2" },
      { article: "die", de: "Mahlzeit", pl: "die Mahlzeiten", fr: "le repas", ex: "Guten Appetit! / Mahlzeit!", level: "A1" }
    ]
  },
  gefuehle: {
    name: "❤️ Sentiments & Émotions",
    words: [
      { article: "die", de: "Freude", pl: "–", fr: "la joie", ex: "Ich wünsche dir viel Freude beim Lernen.", level: "A2" },
      { article: "die", de: "Hoffnung", pl: "die Hoffnungen", fr: "l'espoir", ex: "Wir geben die Hoffnung nicht auf.", level: "B1" },
      { article: "der", de: "Mut", pl: "–", fr: "le courage", ex: "Nur Mut! Du schaffst das!", level: "A2" },
      { article: "die", de: "Geduld", pl: "–", fr: "la patience", ex: "Sprachenlernen erfordert viel Geduld.", level: "B1" },
      { article: "das", de: "Glück", pl: "–", fr: "le bonheur / la chance", ex: "Viel Glück für deine Prüfung!", level: "A1" }
    ]
  }
};

let currentCategoryKey = 'alltag';
let currentFlashcardIndex = 0;
let currentFlashcardsList = [];
let isFlipped = false;

function initVocabPage() {
  renderCategoryButtons();
  selectCategory('alltag');
  renderCustomVocabList();
}

function renderCategoryButtons() {
  const container = document.getElementById('vocab-categories-container');
  if (!container) return;

  container.innerHTML = Object.entries(VOCAB_CATEGORIES).map(([key, cat]) => `
    <button onclick="selectCategory('${key}')" class="category-tab px-4 py-2.5 rounded-xl font-bold text-sm border transition flex items-center gap-2 ${
      currentCategoryKey === key 
        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
    }">
      <span>${cat.name}</span>
      <span class="text-xs px-2 py-0.5 rounded-full ${currentCategoryKey === key ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}">${cat.words.length}</span>
    </button>
  `).join('');
}

function selectCategory(key) {
  currentCategoryKey = key;
  currentFlashcardsList = [...VOCAB_CATEGORIES[key].words];
  currentFlashcardIndex = 0;
  isFlipped = false;
  renderCategoryButtons();
  renderFlashcard();
  renderVocabTable();
}

function renderFlashcard() {
  const cardElement = document.getElementById('flashcard-wrapper');
  const progressText = document.getElementById('flashcard-progress');
  if (!cardElement) return;

  if (currentFlashcardsList.length === 0) {
    cardElement.innerHTML = `
      <div class="text-center p-8 bg-white rounded-2xl border border-slate-200">
        <p class="text-slate-500">Aucun mot dans cette catégorie.</p>
      </div>
    `;
    return;
  }

  const word = currentFlashcardsList[currentFlashcardIndex];
  if (progressText) {
    progressText.textContent = `Carte ${currentFlashcardIndex + 1} / ${currentFlashcardsList.length}`;
  }

  const badgeClass = word.article === 'der' ? 'badge-der' : word.article === 'die' ? 'badge-die' : 'badge-das';

  cardElement.innerHTML = `
    <div class="flip-card w-full max-w-md h-72 cursor-pointer mx-auto" onclick="toggleCardFlip(this)">
      <div class="flip-card-inner">
        <!-- Front -->
        <div class="flip-card-front bg-white border border-slate-200/80 p-6 shadow-lg rounded-2xl flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${badgeClass}">${word.article}</span>
            <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">${word.level}</span>
          </div>

          <div class="text-center my-auto">
            <h3 class="text-3xl font-black text-slate-900 mb-1">${word.de}</h3>
            <p class="text-xs text-slate-400 font-medium">Pluriel : ${word.pl}</p>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
            <button onclick="event.stopPropagation(); speakGerman('${word.article} ${word.de}', this)" class="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition" title="Écouter">
              🔊 Prononcer
            </button>
            <span class="italic">👆 Cliquez pour retourner</span>
          </div>
        </div>

        <!-- Back -->
        <div class="flip-card-back bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 shadow-xl rounded-2xl flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs text-indigo-300">
            <span>Traduction & Contexte</span>
            <button onclick="event.stopPropagation(); speakGerman('${word.ex}', this)" class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white transition">
              🔊
            </button>
          </div>

          <div class="text-center my-auto">
            <h4 class="text-2xl font-black text-amber-300 mb-2">« ${word.fr} »</h4>
            <p class="text-sm text-slate-200 italic bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              "${word.ex}"
            </p>
          </div>

          <div class="text-xs text-center text-indigo-300">
            <span>${word.article} ${word.de} (${word.pl})</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function toggleCardFlip(card) {
  card.classList.toggle('flipped');
}

function nextCard(known = true) {
  if (known) {
    UserProgress.addXP(5);
  }
  currentFlashcardIndex = (currentFlashcardIndex + 1) % currentFlashcardsList.length;
  renderFlashcard();
}

function prevCard() {
  currentFlashcardIndex = (currentFlashcardIndex - 1 + currentFlashcardsList.length) % currentFlashcardsList.length;
  renderFlashcard();
}

function renderVocabTable() {
  const container = document.getElementById('vocab-table-body');
  if (!container) return;

  container.innerHTML = currentFlashcardsList.map(w => {
    const badgeClass = w.article === 'der' ? 'badge-der' : w.article === 'die' ? 'badge-die' : 'badge-das';
    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100 text-sm">
        <td class="p-3">
          <span class="px-2 py-0.5 rounded text-xs font-black ${badgeClass}">${w.article}</span>
        </td>
        <td class="p-3 font-bold text-slate-900">
          ${w.de} <span class="text-xs font-normal text-slate-400 ml-1">(${w.pl})</span>
        </td>
        <td class="p-3 text-slate-700 font-medium">${w.fr}</td>
        <td class="p-3 text-xs text-slate-500 italic hidden md:table-cell">"${w.ex}"</td>
        <td class="p-3 text-right">
          <button onclick="speakGerman('${w.article} ${w.de}', this)" class="p-1 text-slate-400 hover:text-indigo-600 transition">
            🔊
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================
// Custom User Notebook (LocalStorage)
// ==========================================
function getCustomVocab() {
  const stored = localStorage.getItem('deutsch_custom_vocab');
  return stored ? JSON.parse(stored) : [];
}

function saveCustomVocab(list) {
  localStorage.setItem('deutsch_custom_vocab', JSON.stringify(list));
  renderCustomVocabList();
}

function addCustomWord(e) {
  e.preventDefault();
  const article = document.getElementById('custom-article').value;
  const word = document.getElementById('custom-word').value.trim();
  const translation = document.getElementById('custom-translation').value.trim();
  const example = document.getElementById('custom-example').value.trim();

  if (!word || !translation) {
    showToast("Veuillez remplir au moins le mot allemand et sa traduction.", "warning");
    return;
  }

  const list = getCustomVocab();
  list.unshift({
    article,
    de: word,
    fr: translation,
    ex: example || `Das ist ${article} ${word}.`,
    id: Date.now()
  });

  saveCustomVocab(list);
  document.getElementById('custom-word-form').reset();
  showToast(`"${word}" ajouté à votre carnet personnel ! 📔`, "success");
}

function deleteCustomWord(id) {
  const list = getCustomVocab().filter(w => w.id !== id);
  saveCustomVocab(list);
  showToast("Mot supprimé du carnet.", "info");
}

function renderCustomVocabList() {
  const container = document.getElementById('custom-vocab-list');
  const countEl = document.getElementById('custom-vocab-count');
  if (!container) return;

  const list = getCustomVocab();
  if (countEl) countEl.textContent = `${list.length} mots enregistrés`;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="text-center py-6 text-slate-400 text-sm">
        Votre carnet est vide pour le moment. Ajoutez vos premiers mots ci-dessus !
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(item => `
    <div class="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-3">
        <span class="px-2 py-0.5 rounded text-xs font-black ${item.article === 'der' ? 'badge-der' : item.article === 'die' ? 'badge-die' : 'badge-das'}">
          ${item.article}
        </span>
        <div>
          <h4 class="font-bold text-slate-900 text-sm">${item.de}</h4>
          <p class="text-xs text-slate-500">${item.fr}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="speakGerman('${item.article} ${item.de}', this)" class="p-1 text-slate-400 hover:text-indigo-600">🔊</button>
        <button onclick="deleteCustomWord(${item.id})" class="p-1 text-slate-300 hover:text-rose-600 transition" title="Supprimer">🗑️</button>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initVocabPage();
  const form = document.getElementById('custom-word-form');
  if (form) form.addEventListener('submit', addCustomWord);
});
