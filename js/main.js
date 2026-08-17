/**
 * Learn Deutsch TOOLS - Core Engine (main.js)
 * Provides speech synthesis (TTS), streak & XP tracking, mobile nav, enhanced multi-keyword search, and toast alerts.
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
// 5. Global Search & Navigation
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
      link.classList.add('text-indigo-600', 'font-bold', 'bg-indigo-50');
      link.classList.remove('text-slate-600');
    }
  });
}

// Ultra-Comprehensive Global Index with keywords, tags and descriptions
const SITE_INDEX = [
  // 1. Grammaire & Cas
  { title: "Les 4 Cas Allemands (Nominativ, Akkusativ, Dativ, Genitiv)", desc: "Tableaux des articles définis, indéfinis, pronoms personnels et règles", url: "pages/declinaisons.html", cat: "Cas & Déclinaisons", keywords: ["nominatif", "accusatif", "datif", "génitif", "wer", "wen", "wem", "wessen", "der", "die", "das", "den", "dem", "des", "ein", "eine", "einen", "einem", "eines"] },
  { title: "Wechselpräpositionen (Prépositions Mixtes Statique vs Mouvement)", desc: "Les 9 prépositions : an, auf, hinter, in, neben, über, unter, vor, zwischen", url: "pages/declinaisons.html#wechsel", cat: "Prépositions", keywords: ["wo", "wohin", "statique", "mouvement", "an", "auf", "in", "unter", "über", "vor", "hinter", "neben", "zwischen"] },
  { title: "Détective d'Articles (Jeu interactif Der, Die, Das)", desc: "Devinez le genre des noms allemands avec astuces mnémoniques (-ung, -heit, -ling...)", url: "pages/declinaisons.html#detective", cat: "Jeu Interactif", keywords: ["jeu", "quiz", "genre", "masculin", "feminin", "neutre", "suffixes"] },
  
  // 2. Adjectifs
  { title: "Déclinaison des Adjectifs (-e, -en, -er, -es, -em)", desc: "Les 3 types d'accords : déclinaison faible, mixte et forte (sans article)", url: "pages/adjectifs-declinaisons.html", cat: "Adjectifs", keywords: ["adjectifs", "terminaisons", "faible", "mixte", "forte", "nullartikel", "schön", "gut", "alt", "neu"] },
  { title: "Simulateur d'accords d'adjectifs en temps réel", desc: "Testez n'importe quelle combinaison de genre, cas et article avec audio", url: "pages/adjectifs-declinaisons.html#simulator", cat: "Simulateur", keywords: ["simulateur", "accord", "adjectif", "live", "audio"] },

  // 3. Verbes & Conjugaison
  { title: "Conjugateur de Verbes Allemands (50+ Verbes & Temps)", desc: "Présent, Prétérit, Perfekt (haben/sein), Konjunktiv II, Impératif avec audio", url: "pages/conjugaison.html", cat: "Conjugaison", keywords: ["verbe", "conjuguer", "sein", "haben", "werden", "können", "müssen", "wollen", "gehen", "sprechen", "fahren", "temps", "präsens", "präteritum", "perfekt"] },
  { title: "Tableau des Verbes Irréguliers et Forts (A1 - B2)", desc: "Les 3 formes : Infinitif, Präteritum, Partizip II", url: "pages/conjugaison.html#starke-verben", cat: "Verbes Forts", keywords: ["starke verben", "irréguliers", "partizip 2", "participe passé", "tableau"] },
  { title: "Verbes à Particules Séparables vs Inséparables", desc: "Règles des préfixes (be-, ge-, er-, ver-, zer- vs ab-, an-, auf-, mit-)", url: "pages/conjugaison.html#trennbare", cat: "Grammaire", keywords: ["trennbare", "séparables", "inséparables", "prefixes", "aufstehen", "verstehen"] },

  // 4. Vocabulaire & Flashcards
  { title: "Flashcards 3D & Vocabulaire Thématique (A1 à B2+)", desc: "11 thématiques : Maison, Travail, Voyage, Santé, Économie, Tech, Climat, Connecteurs", url: "pages/vocabulaire.html", cat: "Vocabulaire", keywords: ["flashcards", "cartes", "mémorisation", "vocabulaire", "a1", "a2", "b1", "b2", "mots", "audio"] },
  { title: "Carnet de Vocabulaire Personnel (Export & Import JSON)", desc: "Enregistrez vos propres mots découverts avec sauvegarde locale", url: "pages/vocabulaire.html#custom-list", cat: "Espace Perso", keywords: ["carnet", "ajouter", "mots", "export", "import", "sauvegarde", "json"] },

  // 5. Études en Allemagne
  { title: "Étudier en Allemagne : DAAD, Universités & Bourses", desc: "Guide officiel : universités gratuites, visa de 18 mois, bourses Deutschlandstipendium", url: "pages/etudes-allemagne.html", cat: "Études en Allemagne", keywords: ["études", "université", "daad", "uni-assist", "bourses", "hochschule", "bachelor", "master", "visa", "gratuit"] },
  { title: "Certifications de Langue pour l'Université (TestDaF, DSH, telc, Goethe)", desc: "Niveaux requis B2/C1 pour intégrer une université allemande", url: "pages/etudes-allemagne.html", cat: "Certifications", keywords: ["testdaf", "dsh", "telc c1", "goethe c1", "examen", "certificat", "diplome"] },
  { title: "Logement Étudiant & Colocation (WG-Gesucht & Studierendenwerk)", desc: "Comment trouver une chambre en WG (Wohngemeinschaft) en Allemagne", url: "pages/etudes-allemagne.html", cat: "Logement", keywords: ["logement", "colocation", "wg", "wg-gesucht", "chambre", "studierendenwerk"] },

  // 6. Carrière & Jobs
  { title: "Jobs Étudiants : Contrat Werkstudent & Minijob (538€)", desc: "Travailler jusqu'à 20h/semaine avec cotisations allégées et salaire avantageux", url: "pages/carrieres-jobs.html", cat: "Jobs & Carrière", keywords: ["job", "étudiant", "werkstudent", "minijob", "538", "travail", "salaire", "stage", "praktikum"] },
  { title: "Modèle de CV Allemand (Lebenslauf tabellarisch à copier)", desc: "Structure type d'un CV allemand avec compétences linguistiques et informatiques", url: "pages/carrieres-jobs.html", cat: "Modèle CV", keywords: ["cv", "lebenslauf", "lettre de motivation", "anschreiben", "candidature", "bewerbung"] },
  { title: "Portails d'Emploi en Allemagne (StepStone, Jobmensa, Xing, LinkedIn)", desc: "Sites d'annonces d'emploi et de recrutement en Allemagne", url: "pages/carrieres-jobs.html", cat: "Recrutement", keywords: ["stepstone", "jobmensa", "zenjob", "xing", "linkedin", "arbeitsagentur", "indeed", "offres"] },

  // 7. Presse, Médias & Livres
  { title: "Actualités en Allemand Facile (Nachrichtenleicht & Logo ZDF)", desc: "Journaux audio et écrits avec vocabulaire simplifié pour progresser (A2-B1)", url: "pages/medias-livres.html", cat: "Presse Facile", keywords: ["nachrichtenleicht", "dlf", "dw", "deutsche welle", "logo", "zdf", "facile", "audio"] },
  { title: "Livres & Romans Gradués en Allemand (A1 à B2)", desc: "André Klein, Olly Richards, Tschick, Momo, Die Verwandlung, Der Vorleser", url: "pages/medias-livres.html", cat: "Livres", keywords: ["livres", "romans", "lecture", "dino lernt deutsch", "tschick", "momo", "kafka"] },
  { title: "Livres Audio Allemands Gratuits & Légaux (ARD Audiothek & Vorleser.net)", desc: "Plus de 800 œuvres et fictions audio gratuites en allemand", url: "pages/medias-livres.html", cat: "Livres Audio", keywords: ["audiobooks", "hörbücher", "ard audiothek", "vorleser", "librivox", "ohrka", "gratuit"] },

  // 8. Dialogues & Situations Réelles
  { title: "Dialogues Réels : Restaurant, Gare, Médecin, Entretien d'Embauche", desc: "Conversations bilingues avec audio natif et mode rôle joueur", url: "pages/dialogues.html", cat: "Dialogues", keywords: ["dialogues", "conversations", "restaurant", "gare", "médecin", "entretien", "oral", "parler"] },

  // 9. Dictée & Écoute
  { title: "Dictée Allemande Interactive avec Vitesse Réglable", desc: "Écoute ralentie (0.75x, 0.9x), clavier spécial (ä, ö, ü, ß) et correction immédiate", url: "pages/ecoute-dictee.html", cat: "Compréhension Orale", keywords: ["dictée", "écoute", "orthographe", "audio", "vitesse", "caracteres speciaux"] },

  // 10. Exercices & Syntaxe
  { title: "Quiz de Grammaire & Cas Allemands", desc: "Évaluation rapide avec explications détaillées de chaque règle en français", url: "pages/exercices.html", cat: "Quiz", keywords: ["quiz", "exercices", "qcm", "test", "evaluation", "score", "xp"] },
  { title: "Constructeur de Phrases Satzbau (Ordre des Mots & Verbe en V2)", desc: "Reconstituez des phrases principales et subordonnées avec le verbe à la bonne place", url: "pages/exercices.html#satzbau", cat: "Syntaxe", keywords: ["satzbau", "ordre des mots", "v2", "verbe en 2eme", "syntaxe", "phrase"] },

  // 11. Fiches Grammaire
  { title: "Règle TeKaMoLo : L'Ordre des Compléments dans la Phrase", desc: "Temporal ➔ Kausal ➔ Modal ➔ Lokal expliqué avec exemples clairs", url: "pages/grammaire.html#tekamolo", cat: "Guide Grammatical", keywords: ["tekamolo", "ordre", "temporal", "kausal", "modal", "lokal", "syntaxe"] },
  { title: "Subordonnées (weil, dass, wenn) vs Conjonctions ADUSO (Position 0)", desc: "Règles pour le verbe à la fin vs Aber, Denn, Und, Sondern, Oder", url: "pages/grammaire.html#neben", cat: "Guide Grammatical", keywords: ["subordonnées", "aduso", "weil", "dass", "wenn", "obwohl", "aber", "denn", "und", "sondern", "oder"] },
  { title: "Les 6 Verbes Modaux (können, müssen, dürfen, wollen, sollen, möchten)", desc: "Signification, conjugaison et syntaxe avec l'infinitif en fin de phrase", url: "pages/grammaire.html", cat: "Guide Grammatical", keywords: ["modaux", "können", "müssen", "dürfen", "wollen", "sollen", "möchten"] },
  { title: "Mots Directionnels (rein, raus, rauf, runter, rüber)", desc: "Adverbes oraux de mouvement et de direction", url: "pages/grammaire.html#directions", cat: "Guide Grammatical", keywords: ["directions", "rein", "raus", "rauf", "runter", "rüber"] },

  // 12. Outils & Ressources
  { title: "Convertisseur de Nombres en Lettres Allemandes (0 à 999 999 999)", desc: "Convertissez instantanément n'importe quel chiffre avec audio de prononciation", url: "pages/ressources.html#number-converter", cat: "Outils", keywords: ["nombres", "chiffres", "lettres", "compter", "eins", "einundzwanzig", "cent", "mille"] },
  { title: "Guide Phonétique & Sons Allemands (Umlauts Ä, Ö, Ü, ß, ch, sch, ei, eu)", desc: "Prononciation interactive des sons spécifiques de la langue allemande", url: "pages/ressources.html#phonetics", cat: "Phonétique", keywords: ["phonetique", "prononciation", "umlaut", "ä", "ö", "ü", "ß", "sons", "alphabet"] },
  { title: "Sélection des Meilleurs Dictionnaires & Podcasts (LEO, PONS, Easy German)", desc: "Dictionnaires en ligne recommandés, podcasts d'immersion et chaînes YouTube", url: "pages/ressources.html#podcasts", cat: "Ressources", keywords: ["dictionnaires", "leo", "pons", "duden", "podcasts", "easy german", "slow german", "nicos weg"] }
];

function resolveUrlForCurrentPage(itemUrl) {
  const isSubfolder = window.location.pathname.includes('/pages/');
  if (!isSubfolder) {
    return itemUrl;
  }
  if (itemUrl.startsWith('pages/')) {
    return itemUrl.substring(6);
  }
  return '../' + itemUrl;
}

function initSearchModal() {
  const searchInputs = document.querySelectorAll('.site-search-input, #global-search-input');
  const searchResultsContainers = document.querySelectorAll('.site-search-results, #global-search-results');

  if (searchInputs.length === 0) return;

  searchInputs.forEach((input, index) => {
    const resultsContainer = searchResultsContainers[index] || document.getElementById('global-search-results');
    if (!resultsContainer) return;

    input.addEventListener('input', (e) => {
      const rawQuery = e.target.value.trim().toLowerCase();
      if (!rawQuery) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.add('hidden');
        return;
      }

      const queryWords = rawQuery.split(/\s+/);

      const matches = SITE_INDEX.filter(item => {
        const itemText = (item.title + ' ' + (item.desc || '') + ' ' + item.cat + ' ' + (item.keywords ? item.keywords.join(' ') : '')).toLowerCase();
        return queryWords.every(w => itemText.includes(w));
      });

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div class="p-4 text-center text-xs text-slate-500">
            <span class="text-base block mb-1">🔍</span>
            Aucun résultat pour <strong>"${rawQuery}"</strong>.<br>
            <span class="text-[11px] text-slate-400">Essayez : <em>dativ, verbes, cv, daad, audio, quiz, werkstudent...</em></span>
          </div>
        `;
        resultsContainer.classList.remove('hidden');
        return;
      }

      resultsContainer.innerHTML = `
        <div class="p-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex justify-between">
          <span>${matches.length} résultat(s) trouvé(s)</span>
          <span>Appuyez sur Entrée ↵</span>
        </div>
        <div class="divide-y divide-slate-100 max-h-80 overflow-y-auto">
          ${matches.slice(0, 10).map(item => {
            const finalUrl = resolveUrlForCurrentPage(item.url);
            return `
              <a href="${finalUrl}" class="flex flex-col p-2.5 rounded-lg hover:bg-indigo-50/80 transition text-left group">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition flex items-center gap-1.5">
                    <span>${item.title}</span>
                  </span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-700 font-bold">${item.cat}</span>
                </div>
                ${item.desc ? `<p class="text-[11px] text-slate-500 mt-0.5 line-clamp-1">${item.desc}</p>` : ''}
              </a>
            `;
          }).join('')}
        </div>
      `;
      resultsContainer.classList.remove('hidden');
    });

    // Handle Enter Key to navigate to first result
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const firstLink = resultsContainer.querySelector('a');
        if (firstLink) {
          window.location.href = firstLink.getAttribute('href');
        }
      }
    });
  });

  // Global Keyboard Shortcut: Press '/' or 'Cmd+K' / 'Ctrl+K' to open search immediately
  document.addEventListener('keydown', (e) => {
    if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      const firstInput = document.querySelector('.site-search-input, #global-search-input');
      if (firstInput) {
        firstInput.focus();
        firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // Hide search when clicking outside
  document.addEventListener('click', (e) => {
    searchInputs.forEach((input, index) => {
      const container = searchResultsContainers[index] || document.getElementById('global-search-results');
      if (container && !input.contains(e.target) && !container.contains(e.target)) {
        container.classList.add('hidden');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTTS();
  UserProgress.updateUI();
  initDailyWord();
  initNavbar();
  initSearchModal();
});
