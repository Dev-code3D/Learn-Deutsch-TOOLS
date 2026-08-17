/**
 * Learn Deutsch TOOLS - Real-Life Dialogues Engine (dialogues.js)
 */

const DIALOGUES_DATA = [
  {
    id: "restaurant",
    title: "🍽️ Im Restaurant (Commander & Payer)",
    level: "A1 - A2",
    context: "Vous êtes dans un restaurant traditionnel à Munich et commandez votre repas avec le serveur.",
    vocab: [
      { de: "die Speisekarte", fr: "le menu / la carte" },
      { de: "Ich hätte gern...", fr: "J'aimerais / Je voudrais..." },
      { de: "Zusammen oder getrennt?", fr: "Ensemble ou séparément ?" },
      { de: "Stimmt so!", fr: "Gardez la monnaie !" }
    ],
    lines: [
      { speaker: "Kellner", avatar: "👨‍🍳", de: "Guten Abend! Haben Sie schon gewählt oder möchten Sie noch einen Moment in die Speisekarte schauen?", fr: "Bonsoir ! Avez-vous déjà choisi ou souhaitez-vous encore regarder le menu un instant ?" },
      { speaker: "Gast (Vous)", avatar: "🙋", de: "Guten Abend! Ja, ich hätte gern ein Schnitzel mit Bratkartoffeln und ein großes Mineralwasser, bitte.", fr: "Bonsoir ! Oui, je voudrais une escalope avec des pommes de terre sautées et une grande eau minérale, s'il vous plaît." },
      { speaker: "Kellner", avatar: "👨‍🍳", de: "Sehr gern. Mit oder ohne Kohlensäure beim Wasser?", fr: "Très volontiers. Avec ou sans gaz pour l'eau ?" },
      { speaker: "Gast (Vous)", avatar: "🙋", de: "Ohne Kohlensäure, bitte. Und bringen Sie mir bitte auch etwas Ketchup?", fr: "Sans gaz, s'il vous plaît. Et pouvez-vous m'apporter aussi du ketchup ?" },
      { speaker: "Kellner", avatar: "👨‍🍳", de: "Natürlich, kommt sofort!", fr: "Naturellement, ça arrive tout de suite !" },
      { speaker: "Gast (Vous)", avatar: "🙋", de: "Entschuldigung, wir möchten bitte bezahlen!", fr: "Excusez-moi, nous aimerions payer s'il vous plaît !" },
      { speaker: "Kellner", avatar: "👨‍🍳", de: "Zusammen oder getrennt? Das macht insgesamt 22 Euro 50.", fr: "Ensemble ou séparément ? Cela fait 22 euros 50 au total." },
      { speaker: "Gast (Vous)", avatar: "🙋", de: "Zusammen, bitte. Hier sind 25 Euro. Stimmt so, danke!", fr: "Ensemble, s'il vous plaît. Voici 25 euros. Gardez la monnaie, merci !" }
    ]
  },
  {
    id: "bahnhof",
    title: "🚆 Am Bahnhof (Acheter un billet & Horaires)",
    level: "A1 - A2",
    context: "Au guichet de la gare centrale (Hauptbahnhof), vous demandez un billet pour Francfort.",
    vocab: [
      { de: "die Hin- und Rückfahrt", fr: "l'aller-retour" },
      { de: "einfache Fahrt", fr: "aller simple" },
      { de: "das Gleis", fr: "la voie / le quai" },
      { de: "umsteigen", fr: "changer de train" }
    ],
    lines: [
      { speaker: "Bahn-Mitarbeiter", avatar: "🧑‍💼", de: "Guten Tag, wie kann ich Ihnen helfen?", fr: "Bonjour, comment puis-je vous aider ?" },
      { speaker: "Reisender (Vous)", avatar: "🧳", de: "Guten Tag! Ich brauche eine Fahrkarte nach Frankfurt für heute Nachmittag.", fr: "Bonjour ! J'ai besoin d'un billet pour Francfort pour cet après-midi." },
      { speaker: "Bahn-Mitarbeiter", avatar: "🧑‍💼", de: "Einfache Fahrt oder Hin- und Rückfahrt?", fr: "Aller simple ou aller-retour ?" },
      { speaker: "Reisender (Vous)", avatar: "🧳", de: "Hin- und Rückfahrt, bitte. Muss ich unterwegs umsteigen?", fr: "Aller-retour, s'il vous plaît. Dois-je changer de train en route ?" },
      { speaker: "Bahn-Mitarbeiter", avatar: "🧑‍💼", de: "Nein, der ICE um 14:35 Uhr fährt direkt durch. Die Abfahrt ist von Gleis 7.", fr: "Non, l'ICE de 14h35 est direct. Le départ est depuis la voie 7." },
      { speaker: "Reisender (Vous)", avatar: "🧳", de: "Perfekt! Kann ich mit Kreditkarte bezahlen?", fr: "Parfait ! Puis-je payer par carte de crédit ?" },
      { speaker: "Bahn-Mitarbeiter", avatar: "🧑‍💼", de: "Ja, natürlich. Gute Reise!", fr: "Oui, bien sûr. Bon voyage !" }
    ]
  },
  {
    id: "arzt",
    title: "🩺 Beim Arzt (Exprimer ses symptômes)",
    level: "A2 - B1",
    context: "Consultation médicale chez un médecin généraliste (Hausarzt).",
    vocab: [
      { de: "Ich habe Halsschmerzen", fr: "J'ai mal à la gorge" },
      { de: "das Fieber", fr: "la fièvre" },
      { de: "das Rezept", fr: "l'ordonnance" },
      { de: "Gute Besserung!", fr: "Bon rétablissement !" }
    ],
    lines: [
      { speaker: "Arzt", avatar: "👨‍⚕️", de: "Guten Tag! Was fehlt Ihnen denn? Was sind Ihre Beschwerden?", fr: "Bonjour ! Qu'est-ce qui ne va pas ? Quels sont vos symptômes ?" },
      { speaker: "Patient (Vous)", avatar: "🤒", de: "Guten Tag, Herr Doktor. Ich fühle mich seit zwei Tagen schlapp und habe starke Halsschmerzen.", fr: "Bonjour Docteur. Je me sens faible depuis deux jours et j'ai très mal à la gorge." },
      { speaker: "Arzt", avatar: "👨‍⚕️", de: "Haben Sie auch Fieber oder Husten?", fr: "Avez-vous également de la fièvre ou de la toux ?" },
      { speaker: "Patient (Vous)", avatar: "🤒", de: "Ja, gestern Abend hatte ich 38,5 Grad Fieber.", fr: "Oui, hier soir j'avais 38,5 de fièvre." },
      { speaker: "Arzt", avatar: "👨‍⚕️", de: "Ich untersuche Sie kurz. Bitte machen Sie den Mund auf und sagen Sie 'Ah'.", fr: "Je vous examine un instant. Ouvrez la bouche et dites 'Ah'." },
      { speaker: "Arzt", avatar: "👨‍⚕️", de: "Ihr Hals ist entzündet. Ich schreibe Ihnen ein Rezept für Antibiotika und Schmerzmittel auf. Gute Besserung!", fr: "Votre gorge est enflammée. Je vous fais une ordonnance pour des antibiotiques et antidouleurs. Bon rétablissement !" }
    ]
  },
  {
    id: "bewerbung",
    title: "💼 Vorstellungsgespräch (Entretien d'embauche)",
    level: "B1 - B2",
    context: "Présentation de son profil professionnel lors d'un entretien d'embauche.",
    vocab: [
      { de: "die Berufserfahrung", fr: "l'expérience professionnelle" },
      { de: "meine Stärken", fr: "mes points forts" },
      { de: "teamfähig", fr: "capable de travailler en équipe" },
      { de: "die Herausforderung", fr: "le défi / challenge" }
    ],
    lines: [
      { speaker: "Personalleiter", avatar: "👔", de: "Herzlich willkommen! Schön, dass Sie da sind. Stellen Sie sich bitte kurz vor.", fr: "Bienvenue ! Ravis que vous soyez là. Présentez-vous brièvement s'il vous plaît." },
      { speaker: "Bewerber (Vous)", avatar: "💼", de: "Vielen Dank für die Einladung. Mein Name ist Alex, ich habe Informatik studiert und verfüge über drei Jahre Berufserfahrung.", fr: "Merci beaucoup pour l'invitation. Je m'appelle Alex, j'ai étudié l'informatique et j'ai 3 ans d'expérience professionnelle." },
      { speaker: "Personalleiter", avatar: "👔", de: "Warum möchten Sie bei unserem Unternehmen arbeiten?", fr: "Pourquoi souhaitez-vous travailler dans notre entreprise ?" },
      { speaker: "Bewerber (Vous)", avatar: "💼", de: "Ihre innovativen Projekte begeistern mich, und ich möchte mich neuen Herausforderungen in einem internationalen Team stellen.", fr: "Vos projets innovants me passionnent, et je souhaite relever de nouveaux défis au sein d'une équipe internationale." }
    ]
  }
];

let currentDialogueId = 'restaurant';
let isRoleplayMode = false;

function initDialoguesPage() {
  renderDialogueTabs();
  selectDialogue('restaurant');
}

function renderDialogueTabs() {
  const container = document.getElementById('dialogues-tabs-list');
  if (!container) return;

  container.innerHTML = DIALOGUES_DATA.map(d => `
    <button onclick="selectDialogue('${d.id}')" class="px-4 py-2.5 rounded-xl font-bold text-xs border transition flex items-center gap-2 ${
      currentDialogueId === d.id 
        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
    }">
      <span>${d.title}</span>
      <span class="text-[10px] px-2 py-0.5 rounded ${currentDialogueId === d.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}">${d.level}</span>
    </button>
  `).join('');
}

function selectDialogue(id) {
  currentDialogueId = id;
  renderDialogueTabs();
  renderDialogueContent();
}

function toggleRoleplay() {
  isRoleplayMode = !isRoleplayMode;
  const btn = document.getElementById('roleplay-toggle-btn');
  if (btn) {
    if (isRoleplayMode) {
      btn.className = "px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow transition flex items-center gap-2";
      btn.innerHTML = "<span>🎭 Mode Rôle Joueur : ACTIF (Répliques masquées)</span>";
    } else {
      btn.className = "px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-2";
      btn.innerHTML = "<span>🎭 Activer le Mode Rôle Joueur</span>";
    }
  }
  renderDialogueContent();
}

function renderDialogueContent() {
  const dialog = DIALOGUES_DATA.find(d => d.id === currentDialogueId);
  const container = document.getElementById('dialogue-messages-area');
  const vocabContainer = document.getElementById('dialogue-vocab-chips');
  const contextEl = document.getElementById('dialogue-context-text');
  if (!container || !dialog) return;

  if (contextEl) contextEl.textContent = dialog.context;

  if (vocabContainer) {
    vocabContainer.innerHTML = dialog.vocab.map(v => `
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-xs">
        <span class="font-bold text-indigo-900">${v.de}</span>
        <span class="text-slate-400">➔</span>
        <span class="text-slate-600">${v.fr}</span>
        <button onclick="speakGerman('${v.de}', this)" class="text-indigo-600 hover:text-indigo-800 ml-1">🔊</button>
      </div>
    `).join('');
  }

  container.innerHTML = dialog.lines.map((line, idx) => {
    const isUser = line.speaker.includes('Vous') || line.speaker.includes('Gast') || line.speaker.includes('Reisender') || line.speaker.includes('Patient') || line.speaker.includes('Bewerber');
    
    return `
      <div class="flex items-start gap-3 p-4 rounded-2xl transition ${isUser ? 'bg-indigo-50/70 border border-indigo-200/80 ml-4 sm:ml-8' : 'bg-slate-50 border border-slate-200/80 mr-4 sm:mr-8'}">
        <div class="text-2xl select-none p-1 bg-white rounded-xl shadow-xs border">${line.avatar}</div>
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold ${isUser ? 'text-indigo-700' : 'text-slate-700'}">${line.speaker}</span>
            <button onclick="speakGerman('${line.de}', this)" class="p-1 rounded bg-white shadow-xs text-slate-400 hover:text-indigo-600 transition" title="Écouter">
              🔊
            </button>
          </div>

          <!-- German Text -->
          <div class="text-sm sm:text-base font-bold text-slate-900 mb-1 leading-snug">
            ${isRoleplayMode && isUser ? `
              <span class="blur-sm hover:blur-none transition select-all cursor-pointer text-indigo-700" title="Cliquez pour révéler">
                ${line.de}
              </span>
              <span class="text-[10px] text-amber-600 block font-normal mt-0.5">🔒 Réplique masquée — Essayez de formuler vous-même !</span>
            ` : line.de}
          </div>

          <!-- French Translation -->
          <div class="text-xs text-slate-500 font-medium">
            ${line.fr}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initDialoguesPage();
});
