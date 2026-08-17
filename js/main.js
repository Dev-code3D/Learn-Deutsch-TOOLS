/**
 * Learn Deutsch TOOLS - Core Engine (main.js)
 * Provides speech synthesis (TTS), streak & XP tracking, mobile nav, search, and toast alerts.
 */

// ==========================================
// 1. Text-To-Speech (TTS) German Audio
// ==========================================
let germanVoice = null;

function initTTS() {
  if ('speechSynthesis' in window) {
    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      germanVoice = voices.find(v => v.lang === 'de-DE' || v.lang.startsWith('de')) || null;
    };
    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }
}

function speakGerman(text, btnElement = null) {
  if (!('speechSynthesis' in window)) {
    showToast("La synthèse vocale n'est pas supportée par votre navigateur.", "warning");
    return;
  }

  window.speechSynthesis.cancel(); // Stop ongoing speech

  const cleanText = text.replace(/^(der|die|das|den|dem|des|ein|eine)\s+/i, '').trim();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = 0.9;
  if (germanVoice) utterance.voice = germanVoice;

  if (btnElement) {
    btnElement.classList.add('speaking');
    utterance.onend = () => btnElement.classList.remove('speaking');
    utterance.onerror = () => btnElement.classList.remove('speaking');
  }

  window.speechSynthesis.speak(utterance);
}

// ==========================================
// 2. User Stats & Streak Tracker (LocalStorage)
// ==========================================
const UserProgress = {
  getStats() {
    const defaultStats = {
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      xp: 45,
      wordsLearned: 12,
      quizzesCompleted: 3,
      favorites: []
    };
    const stored = localStorage.getItem('deutsch_tools_stats');
    if (!stored) {
      localStorage.setItem('deutsch_tools_stats', JSON.stringify(defaultStats));
      return defaultStats;
    }
    const data = JSON.parse(stored);
    
    // Check streak
    const today = new Date().toISOString().split('T')[0];
    if (data.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (data.lastActiveDate === yesterday) {
        data.streak += 1;
      } else {
        data.streak = 1;
      }
      data.lastActiveDate = today;
      localStorage.setItem('deutsch_tools_stats', JSON.stringify(data));
    }
    return data;
  },

  addXP(amount) {
    const stats = this.getStats();
    stats.xp += amount;
    localStorage.setItem('deutsch_tools_stats', JSON.stringify(stats));
    this.updateUI();
    showToast(`+${amount} XP gagnés ! 🎉`, 'success');
  },

  incrementQuizCount() {
    const stats = this.getStats();
    stats.quizzesCompleted += 1;
    stats.xp += 25;
    localStorage.setItem('deutsch_tools_stats', JSON.stringify(stats));
    this.updateUI();
  },

  toggleFavorite(word) {
    const stats = this.getStats();
    const index = stats.favorites.indexOf(word);
    let added = false;
    if (index > -1) {
      stats.favorites.splice(index, 1);
    } else {
      stats.favorites.push(word);
      added = true;
    }
    localStorage.setItem('deutsch_tools_stats', JSON.stringify(stats));
    this.updateUI();
    showToast(added ? `"${word}" ajouté aux favoris ⭐` : `"${word}" retiré des favoris`, 'info');
    return added;
  },

  updateUI() {
    const stats = this.getStats();
    const streakBadges = document.querySelectorAll('.user-streak-count');
    const xpBadges = document.querySelectorAll('.user-xp-count');
    const quizBadges = document.querySelectorAll('.user-quizzes-count');

    streakBadges.forEach(el => el.textContent = `${stats.streak} j`);
    xpBadges.forEach(el => el.textContent = `${stats.xp} XP`);
    quizBadges.forEach(el => el.textContent = `${stats.quizzesCompleted}`);
  }
};

// ==========================================
// 3. Toast Notification Helper
// ==========================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const typeStyles = {
    info: 'bg-slate-900 text-white border-slate-700',
    success: 'bg-emerald-600 text-white border-emerald-500',
    warning: 'bg-amber-600 text-white border-amber-500',
    error: 'bg-rose-600 text-white border-rose-500'
  };

  const icons = {
    info: '💡',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  toast.className = `pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0 p-4 rounded-xl shadow-xl flex items-center gap-3 border text-sm font-medium ${typeStyles[type] || typeStyles.info}`;
  toast.innerHTML = `
    <span class="text-lg">${icons[type] || '💡'}</span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================
// 4. Daily German Word / Motivation
// ==========================================
const DAILY_WORDS = [
  { de: "die Gemütlichkeit", fr: "sentiment de confort chaleureux, convivialité", example: "Deutsche Cafés strahlen Gemütlichkeit aus.", type: "die", plural: "-en" },
  { de: "das Fernweh", fr: "la nostalgie des voyages, l'envie d'ailleurs", example: "Im Winter habe ich immer großes Fernweh.", type: "das", plural: "–" },
  { de: "der Feierabend", fr: "la fin de la journée de travail / temps libre du soir", example: "Schönen Feierabend! Ich gehe jetzt nach Hause.", type: "der", plural: "-e" },
  { de: "die Vorfreude", fr: "la joie par anticipation / le plaisir d'attendre", example: "Vorfreude ist die schönste Freude.", type: "die", plural: "-n" },
  { de: "das Fingerspitzengefühl", fr: "le tact, doigté, subtilité intuitive", example: "In schwierigen Verhandlungen braucht man Fingerspitzengefühl.", type: "das", plural: "–" },
  { de: "der Kummerspeck", fr: "les kilos pris à cause du stress ou du chagrin", example: "Nach den Prüfungen hatte sie ein bisschen Kummerspeck.", type: "der", plural: "–" },
  { de: "die Sehnsucht", fr: "désir ardent, nostalgie profonde", example: "Er hat große Sehnsucht nach seiner Familie.", type: "die", plural: "Sehnsüchte" }
];

function initDailyWord() {
  const container = document.getElementById('daily-word-card');
  if (!container) return;

  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const word = DAILY_WORDS[dayOfYear % DAILY_WORDS.length];

  const badgeColor = word.type === 'der' ? 'badge-der' : word.type === 'die' ? 'badge-die' : 'badge-das';

  container.innerHTML = `
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span> Mot du Jour
      </span>
      <button onclick="speakGerman('${word.de}', this)" class="audio-btn p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition" title="Écouter la prononciation">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
      </button>
    </div>
    <div class="mb-2">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeColor}">${word.type}</span>
        <h4 class="text-xl font-extrabold text-slate-900">${word.de}</h4>
        <span class="text-xs text-slate-500">(Pl: ${word.plural})</span>
      </div>
      <p class="text-sm text-slate-600 mt-1 font-medium">${word.fr}</p>
    </div>
    <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 italic">
      "${word.example}"
    </div>
  `;
}

// ==========================================
// 5. Global Search / Navigation Init
// ==========================================
function initNavbar() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Highlight active page
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.endsWith(href) || (currentPath.endsWith('/') && href.includes('index.html')))) {
      link.classList.add('text-indigo-600', 'font-bold');
      link.classList.remove('text-slate-600');
    }
  });
}

// Comprehensive Global Quick Finder
const SITE_INDEX = [
  { title: "Les 4 Cas Allemands (Nominativ, Akkusativ, Dativ, Genitiv)", url: "pages/declinaisons.html", cat: "Grammaire" },
  { title: "Prépositions Mixtes (Wechselpräpositionen - Statique vs Mouvement)", url: "pages/declinaisons.html#wechsel", cat: "Grammaire" },
  { title: "Détective d'Articles (Jeu Der / Die / Das)", url: "pages/declinaisons.html#detective", cat: "Jeu" },
  { title: "Déclinaison des Adjectifs (-e, -en, -er, -es, -em)", url: "pages/adjectifs-declinaisons.html", cat: "Adjectifs" },
  { title: "Simulateur d'accords d'adjectifs en direct", url: "pages/adjectifs-declinaisons.html", cat: "Outil" },
  { title: "Étudier en Allemagne (DAAD, TestDaF, DSH, Bourses, WG-Gesucht)", url: "pages/etudes-allemagne.html", cat: "Études" },
  { title: "Jobs & Carrière en Allemagne (Werkstudent, Minijob 538€, Lebenslauf)", url: "pages/carrieres-jobs.html", cat: "Emploi" },
  { title: "Modèle de CV Allemand (Lebenslauf tabellarisch à copier)", url: "pages/carrieres-jobs.html", cat: "Emploi" },
  { title: "Presse, Médias & Actualités en Allemand Facile (Nachrichtenleicht)", url: "pages/medias-livres.html", cat: "Presse" },
  { title: "Livres & Romans Gradués en Allemand (A1 à B2)", url: "pages/medias-livres.html", cat: "Livres" },
  { title: "Livres Audio Allemands Gratuits (ARD Audiothek, Vorleser.net)", url: "pages/medias-livres.html", cat: "Audio" },
  { title: "Dialogues de la vie réelle (Restaurant, Gare, Médecin, Entretien)", url: "pages/dialogues.html", cat: "Dialogues" },
  { title: "Mode Rôle Joueur pour Conversations Allemandes", url: "pages/dialogues.html", cat: "Pratique" },
  { title: "Dictée Allemande & Compréhension Orale (Audio)", url: "pages/ecoute-dictee.html", cat: "Audio" },
  { title: "Conjugateur de Verbes Allemands (50+ Verbes & Temps)", url: "pages/conjugaison.html", cat: "Outil" },
  { title: "Liste des Verbes Irréguliers et Forts (A1-B2)", url: "pages/conjugaison.html#starke-verben", cat: "Conjugaison" },
  { title: "Verbes à Particules Séparables (trennbare Verben)", url: "pages/conjugaison.html#trennbare", cat: "Conjugaison" },
  { title: "Flashcards Vocabulaire par Thèmes (3D)", url: "pages/vocabulaire.html", cat: "Vocabulaire" },
  { title: "Carnet de Vocabulaire Personnalisé avec Export/Import JSON", url: "pages/vocabulaire.html#custom-list", cat: "Vocabulaire" },
  { title: "Quiz & Exercices Interactifs avec Score", url: "pages/exercices.html", cat: "Exercices" },
  { title: "Constructeur de Phrases (Satzbau & Règle du Verbe en 2ème)", url: "pages/exercices.html#satzbau", cat: "Exercices" },
  { title: "L'Ordre des Mots dans la Phrase (Règle TeKaMoLo)", url: "pages/grammaire.html#tekamolo", cat: "Grammaire" },
  { title: "Subordonnées & Conjonctions (weil, dass, wenn, obwohl)", url: "pages/grammaire.html#neben", cat: "Grammaire" },
  { title: "Convertisseur de Nombres en Lettres Allemandes", url: "pages/ressources.html#number-converter", cat: "Outil" },
  { title: "Podcasts & Chaînes YouTube recommandées", url: "pages/ressources.html#podcasts", cat: "Ressources" },
  { title: "Mots Directionnels (rein, raus, rauf, runter, rüber)", url: "pages/grammaire.html#directions", cat: "Grammaire" }
];

function initSearchModal() {
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('global-search-results');
  if (!searchInput || !searchResults) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchResults.innerHTML = '';
      searchResults.classList.add('hidden');
      return;
    }

    const isSubfolder = window.location.pathname.includes('/pages/');

    const matches = SITE_INDEX.filter(item => 
      item.title.toLowerCase().includes(query) || item.cat.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<div class="p-3 text-sm text-slate-500 text-center">Aucun résultat trouvé pour "${query}"</div>`;
      searchResults.classList.remove('hidden');
      return;
    }

    searchResults.innerHTML = matches.map(item => {
      let targetUrl = item.url;
      if (isSubfolder) {
        if (targetUrl.startsWith('pages/')) {
          targetUrl = targetUrl.replace('pages/', '');
        } else {
          targetUrl = '../' + targetUrl;
        }
      }
      return `
        <a href="${targetUrl}" class="flex items-center justify-between p-3 rounded-lg hover:bg-indigo-50 transition text-sm text-slate-800 font-medium group">
          <div class="flex items-center gap-2">
            <span class="text-xs px-2 py-0.5 rounded bg-slate-100 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-700 font-semibold">${item.cat}</span>
            <span>${item.title}</span>
          </div>
          <svg class="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </a>
      `;
    }).join('');
    searchResults.classList.remove('hidden');
  });

  // Hide search when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTTS();
  UserProgress.updateUI();
  initDailyWord();
  initNavbar();
  initSearchModal();
});
