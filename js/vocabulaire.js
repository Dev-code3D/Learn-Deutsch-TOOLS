/**
 * Learn Deutsch TOOLS - Thematic Vocabulary & Flashcards Engine (vocabulaire.js)
 * Comprehensive dataset spanning A1, A2, B1, B2, and B2+/C1.
 */

const VOCAB_CATEGORIES = {
  alltag: {
    name: "🏠 Vie Quotidienne & Maison",
    words: [
      { article: "der", de: "Schlüssel", pl: "die Schlüssel", fr: "la clé", ex: "Ich habe meinen Schlüssel im Auto vergessen.", level: "A1" },
      { article: "das", de: "Zimmer", pl: "die Zimmer", fr: "la chambre / la pièce", ex: "Mein Zimmer ist sehr hell und ruhig.", level: "A1" },
      { article: "die", de: "Küche", pl: "die Küchen", fr: "la cuisine", ex: "Wir kochen heute Abend zusammen in der Küche.", level: "A1" },
      { article: "der", de: "Kühlschrank", pl: "die Kühlschränke", fr: "le réfrigérateur", ex: "Die kalte Milch steht im Kühlschrank.", level: "A1" },
      { article: "das", de: "Fenster", pl: "die Fenster", fr: "la fenêtre", ex: "Bitte mach das Fenster auf, es ist warm.", level: "A1" },
      { article: "die", de: "Tür", pl: "die Türen", fr: "la porte", ex: "Vergiss nicht, die Tür abzuschließen.", level: "A1" },
      { article: "der", de: "Nachbar", pl: "die Nachbarn", fr: "le voisin", ex: "Unser Nachbar ist immer sehr hilfsbereit.", level: "A2" },
      { article: "die", de: "Miete", pl: "die Mieten", fr: "le loyer", ex: "Die Miete wird am Ersten des Monats fällig.", level: "A2" },
      { article: "der", de: "Müll", pl: "–", fr: "les déchets / la poubelle", ex: "In Deutschland trennt man den Müll sorgfältig.", level: "A2" },
      { article: "die", de: "Heizung", pl: "die Heizungen", fr: "le chauffage", ex: "Im Winter drehen wir die Heizung auf.", level: "A2" },
      { article: "das", de: "Haushaltsgerät", pl: "die Haushaltsgeräte", fr: "l'appareil électroménager", ex: "Die Waschmaschine ist ein nützliches Haushaltsgerät.", level: "B1" },
      { article: "die", de: "Nebenkosten", pl: "–", fr: "les charges locatives", ex: "Die Warmmiete beinhaltet alle Nebenkosten.", level: "B1" }
    ]
  },
  arbeit: {
    name: "💼 Travail & Monde Pro",
    words: [
      { article: "die", de: "Bewerbung", pl: "die Bewerbungen", fr: "la candidature", ex: "Ich habe heute meine Bewerbung abgeschickt.", level: "A2" },
      { article: "der", de: "Kollege", pl: "die Kollegen", fr: "le collègue", ex: "Meine Kollegen arbeiten sehr professionell.", level: "A2" },
      { article: "das", de: "Vorstellungsgespräch", pl: "die Vorstellungsgespräche", fr: "l'entretien d'embauche", ex: "Morgen um 10 Uhr habe ich ein Vorstellungsgespräch.", level: "B1" },
      { article: "die", de: "Besprechung", pl: "die Besprechungen", fr: "la réunion", ex: "Die wöchentliche Besprechung dauert eine Stunde.", level: "A2" },
      { article: "der", de: "Vertrag", pl: "die Verträge", fr: "le contrat", ex: "Er hat gestern einen unbefristeten Arbeitsvertrag unterschrieben.", level: "B1" },
      { article: "das", de: "Gehalt", pl: "die Gehälter", fr: "le salaire", ex: "Das Bruttogehalt wird pünktlich überwiesen.", level: "B1" },
      { article: "die", de: "Überstunde", pl: "die Überstunden", fr: "l'heure supplémentaire", ex: "Er macht selten Überstunden am Freitag.", level: "B1" },
      { article: "die", de: "Kündigung", pl: "die Kündigungen", fr: "la démission / le licenciement", ex: "Die Kündigungsfrist beträgt drei Monate.", level: "B2" },
      { article: "die", de: "Beförderung", pl: "die Beförderungen", fr: "la promotion professionnelle", ex: "Sie hat hart gearbeitet und eine Beförderung erhalten.", level: "B2" },
      { article: "die", de: "Verhandlung", pl: "die Verhandlungen", fr: "la négociation", ex: "Die Gehaltsverhandlungen verliefen sehr positiv.", level: "B2" },
      { article: "die", de: "Führungskraft", pl: "die Führungskräfte", fr: "le cadre dirigeant / manager", ex: "Eine gute Führungskraft motiviert ihr Team.", level: "B2+" }
    ]
  },
  reisen: {
    name: "✈️ Voyages & Transports",
    words: [
      { article: "der", de: "Bahnhof", pl: "die Bahnhöfe", fr: "la gare", ex: "Wir treffen uns am Berliner Hauptbahnhof.", level: "A1" },
      { article: "die", de: "Fahrkarte", pl: "die Fahrkarten", fr: "le billet de transport", ex: "Haben Sie schon eine Fahrkarte gekauft?", level: "A1" },
      { article: "das", de: "Flugzeug", pl: "die Flugzeuge", fr: "l'avion", ex: "Das Flugzeug fliegt pünktlich nach Frankfurt.", level: "A1" },
      { article: "die", de: "Verspätung", pl: "die Verspätungen", fr: "le retard", ex: "Der Zug hat leider 20 Minuten Verspätung.", level: "A2" },
      { article: "der", de: "Koffer", pl: "die Koffer", fr: "la valise", ex: "Ich packe meinen Koffer für die Urlaubsreise.", level: "A1" },
      { article: "das", de: "Gleis", pl: "die Gleise", fr: "la voie / le quai de gare", ex: "Der ICE nach Hamburg fährt von Gleis 7 ab.", level: "A1" },
      { article: "die", de: "Unterkunft", pl: "die Unterkünfte", fr: "l'hébergement / le logement", ex: "Wir haben eine gemütliche Unterkunft in den Bergen gebucht.", level: "B1" },
      { article: "der", de: "Aufenthalt", pl: "die Aufenthalte", fr: "le séjour", ex: "Ich wünsche Ihnen einen angenehmen Aufenthalt in Wien.", level: "B1" },
      { article: "die", de: "Sehenswürdigkeit", pl: "die Sehenswürdigkeiten", fr: "le monument / site touristique", ex: "Das Brandenburger Tor ist eine berühmte Sehenswürdigkeit.", level: "B1" },
      { article: "das", de: "Fernweh", pl: "–", fr: "l'envie de voyager / nostalgie d'ailleurs", ex: "Im trüben November packt mich immer das Fernweh.", level: "B2" }
    ]
  },
  essen: {
    name: "🍽️ Cuisine & Restaurant",
    words: [
      { article: "das", de: "Frühstück", pl: "die Frühstücke", fr: "le petit-déjeuner", ex: "Zum Frühstück esse ich Brot mit Käse.", level: "A1" },
      { article: "die", de: "Rechnung", pl: "die Rechnungen", fr: "l'addition / la facture", ex: "Zahlen bitte! Wir möchten die Rechnung.", level: "A1" },
      { article: "der", de: "Kellner", pl: "die Kellner", fr: "le serveur", ex: "Der Kellner empfiehlt die Spezialität des Tages.", level: "A1" },
      { article: "das", de: "Gericht", pl: "die Gerichte", fr: "le plat culinaire", ex: "Dieses vegetarische Gericht schmeckt hervorragend.", level: "A2" },
      { article: "die", de: "Mahlzeit", pl: "die Mahlzeiten", fr: "le repas", ex: "Guten Appetit zur Mittagsmahlzeit!", level: "A1" },
      { article: "die", de: "Zutat", pl: "die Zutaten", fr: "l'ingrédient", ex: "Frische Kräuter sind die wichtigste Zutat.", level: "A2" },
      { article: "der", de: "Geschmack", pl: "die Geschmäcker", fr: "le goût / la saveur", ex: "Über Geschmack lässt sich bekanntlich streiten.", level: "B1" },
      { article: "das", de: "Trinkgeld", pl: "die Trinkgelder", fr: "le pourboire", ex: "In Deutschland gibt man üblicherweise 5 bis 10 Prozent Trinkgeld.", level: "A2" },
      { article: "die", de: "Ernährung", pl: "–", fr: "l'alimentation / la nutrition", ex: "Eine ausgewogene Ernährung fördert die Gesundheit.", level: "B1" },
      { article: "der", de: "Feinschmecker", pl: "die Feinschmecker", fr: "le gourmet / fin palais", ex: "Dieses Restaurant ist ein Paradies für Feinschmecker.", level: "B2" }
    ]
  },
  gefuehle: {
    name: "❤️ Sentiments & Personnalité",
    words: [
      { article: "die", de: "Freude", pl: "–", fr: "la joie", ex: "Ich wünsche dir viel Freude beim Lernen.", level: "A2" },
      { article: "die", de: "Hoffnung", pl: "die Hoffnungen", fr: "l'espoir", ex: "Wir geben die Hoffnung niemals auf.", level: "B1" },
      { article: "der", de: "Mut", pl: "–", fr: "le courage", ex: "Nur Mut! Du schaffst diese Deutschprüfung!", level: "A2" },
      { article: "die", de: "Geduld", pl: "–", fr: "la patience", ex: "Sprachenlernen braucht Zeit und viel Geduld.", level: "B1" },
      { article: "das", de: "Glück", pl: "–", fr: "la chance / le bonheur", ex: "Viel Glück für dein Vorstellungsgespräch!", level: "A1" },
      { article: "die", de: "Angst", pl: "die Ängste", fr: "la peur / l'angoisse", ex: "Man sollte keine Angst vor Fehlern haben.", level: "A2" },
      { article: "die", de: "Enttäuschung", pl: "die Enttäuschungen", fr: "la déception", ex: "Die Niederlage war eine große Enttäuschung.", level: "B1" },
      { article: "das", de: "Selbstvertrauen", pl: "–", fr: "la confiance en soi", ex: "Erfolge stärken das persönliche Selbstvertrauen.", level: "B2" },
      { article: "die", de: "Zuversicht", pl: "–", fr: "l'optimisme confiant / sérénité", ex: "Mit Zuversicht blicken wir in die Zukunft.", level: "B2+" },
      { article: "das", de: "Mitgefühl", pl: "–", fr: "la compassion / empathie", ex: "Sie zeigte großes Mitgefühl für die Betroffenen.", level: "B2" }
    ]
  },
  gesundheit: {
    name: "🩺 Santé & Corps Humain",
    words: [
      { article: "der", de: "Arzt", pl: "die Ärzte", fr: "le médecin", ex: "Ich muss heute dringend zum Arzt gehen.", level: "A1" },
      { article: "das", de: "Krankenhaus", pl: "die Krankenhäuser", fr: "l'hôpital", ex: "Die Klinik liegt in der Nähe des Stadtzentrums.", level: "A2" },
      { article: "die", de: "Apotheke", pl: "die Apotheken", fr: "la pharmacie", ex: "Holen Sie die Medikamente bitte aus der Apotheke.", level: "A1" },
      { article: "das", de: "Fieber", pl: "–", fr: "la fièvre", ex: "Das Kind hat hohes Fieber und muss im Bett bleiben.", level: "A2" },
      { article: "das", de: "Rezept", pl: "die Rezepte", fr: "l'ordonnance médicale", ex: "Der Arzt hat mir ein Rezept für Tabletten ausgestellt.", level: "A2" },
      { article: "die", de: "Krankenversicherung", pl: "die Krankenversicherungen", fr: "l'assurance maladie", ex: "In Deutschland ist eine Krankenversicherung gesetzliche Pflicht.", level: "B1" },
      { article: "die", de: "Untersuchung", pl: "die Untersuchungen", fr: "l'examen médical / consultation", ex: "Die gründliche Untersuchung dauerte 30 Minuten.", level: "B1" },
      { article: "die", de: "Behandlung", pl: "die Behandlungen", fr: "le traitement médical", ex: "Die moderne Behandlung zeigte schnell Wirkung.", level: "B2" },
      { article: "die", de: "Genesung", pl: "–", fr: "le rétablissement / la guérison", ex: "Wir wünschen Ihnen eine baldige Genesung!", level: "B2+" }
    ]
  },
  uni_studium: {
    name: "🎓 Université & Sciences",
    words: [
      { article: "die", de: "Vorlesung", pl: "die Vorlesungen", fr: "le cours magistral à la fac", ex: "Die Vorlesung in Mathematik beginnt um 8 Uhr.", level: "B1" },
      { article: "das", de: "Seminar", pl: "die Seminare", fr: "le séminaire / cours interactif", ex: "Im Seminar diskutieren Studierende wissenschaftliche Texte.", level: "B1" },
      { article: "die", de: "Klausur", pl: "die Klausuren", fr: "l'examen écrit / partiel", ex: "Nächste Woche schreiben wir drei Klausuren.", level: "B1" },
      { article: "die", de: "Hausarbeit", pl: "die Hausarbeiten", fr: "le mémoire de semestre", ex: "Ich muss bis Ende März eine Hausarbeit abgeben.", level: "B1" },
      { article: "das", de: "Stipendium", pl: "die Stipendien", fr: "la bourse d'études", ex: "Er erhielt ein prestigeträchtiges DAAD-Stipendium.", level: "B1" },
      { article: "die", de: "Zulassung", pl: "die Zulassungen", fr: "l'admission universitaire", ex: "Endlich habe ich die Zulassung für das Masterstudium bekommen!", level: "B2" },
      { article: "die", de: "Forschung", pl: "die Forschungen", fr: "la recherche scientifique", ex: "Die Universität investiert viel Geld in innovative Forschung.", level: "B2" },
      { article: "die", de: "Erkenntnis", pl: "die Erkenntnisse", fr: "la découverte / le constat scientifique", ex: "Neue wissenschaftliche Erkenntnisse verändern unsere Sichtweise.", level: "B2+" },
      { article: "die", de: "Abschlussarbeit", pl: "die Abschlussarbeiten", fr: "le mémoire de fin d'études / thèse", ex: "Sie schreibt ihre Masterarbeit über erneuerbare Energien.", level: "B2" }
    ]
  },
  wirtschaft: {
    name: "💶 Économie & Finance",
    words: [
      { article: "das", de: "Unternehmen", pl: "die Unternehmen", fr: "l'entreprise / la société", ex: "Das deutsche Unternehmen exportiert weltweit Maschinen.", level: "B1" },
      { article: "der", de: "Markt", pl: "die Märkte", fr: "le marché économique", ex: "Die Nachfrage auf dem globalen Markt steigt an.", level: "B1" },
      { article: "die", de: "Währung", pl: "die Währungen", fr: "la monnaie / devise", ex: "Der Euro ist die gemeinsame Währung vieler europäischer Länder.", level: "B1" },
      { article: "die", de: "Steuer", pl: "die Steuern", fr: "l'impôt / la taxe", ex: "Jeder Bürger zahlt Einkommensteuer an den Staat.", level: "B1" },
      { article: "die", de: "Investition", pl: "die Investitionen", fr: "l'investissement", ex: "Nachhaltige Investitionen sichern die Zukunft.", level: "B2" },
      { article: "der", de: "Gewinn", pl: "die Gewinne", fr: "le bénéfice / profit", ex: "Das Unternehmen verzeichnete einen Rekordgewinn.", level: "B2" },
      { article: "die", de: "Inflation", pl: "–", fr: "l'inflation", ex: "Die Zentralbank versucht, die Inflation einzudämmen.", level: "B2" },
      { article: "das", de: "Bruttoinlandsprodukt (BIP)", pl: "–", fr: "le PIB (Produit Intérieur Brut)", ex: "Deutschland erwirtschaftet ein hohes Bruttoinlandsprodukt.", level: "B2+" },
      { article: "die", de: "Nachhaltigkeit", pl: "–", fr: "la durabilité / responsabilité", ex: "Nachhaltigkeit ist heute ein zentraler Wettbewerbsfaktor.", level: "B2+" }
    ]
  },
  technologie: {
    name: "💻 Technologie & Numérique",
    words: [
      { article: "die", de: "Datei", pl: "die Dateien", fr: "le fichier informatique", ex: "Speichere bitte die Datei auf der externen Festplatte.", level: "A2" },
      { article: "das", de: "Passwort", pl: "die Passwörter", fr: "le mot de passe", ex: "Ein sicheres Passwort enthält Zahlen und Sonderzeichen.", level: "A1" },
      { article: "die", de: "Webseite", pl: "die Webseiten", fr: "le site web", ex: "Diese Webseite bietet interaktive Tools zum Deutschlernen.", level: "A2" },
      { article: "die", de: "Künstliche Intelligenz (KI)", pl: "–", fr: "l'Intelligence Artificielle (IA)", ex: "Künstliche Intelligenz revolutioniert den Arbeitsmarkt.", level: "B1" },
      { article: "der", de: "Datenschutz", pl: "–", fr: "la protection des données (RGPD)", ex: "Der Datenschutz hat in Deutschland einen sehr hohen Stellenwert.", level: "B2" },
      { article: "die", de: "Entwicklung", pl: "die Entwicklungen", fr: "le développement / l'évolution", ex: "Die technologische Entwicklung schreitet rasant voran.", level: "B2" },
      { article: "die", de: "Benutzeroberfläche", pl: "die Benutzeroberflächen", fr: "l'interface utilisateur (UI)", ex: "Die Benutzeroberfläche ist intuitiv und responsive gestaltet.", level: "B2+" }
    ]
  },
  umwelt: {
    name: "🌍 Environnement & Climat",
    words: [
      { article: "das", de: "Wetter", pl: "–", fr: "la météo / le temps", ex: "Das Wetter am Wochenende wird sonnig und mild.", level: "A1" },
      { article: "die", de: "Umwelt", pl: "–", fr: "l'environnement", ex: "Wir müssen unsere Umwelt besser schützen.", level: "A2" },
      { article: "der", de: "Klimawandel", pl: "–", fr: "le changement climatique", ex: "Der globale Klimawandel erfordert schnelles Handeln.", level: "B1" },
      { article: "die", de: "Erneuerbare Energie", pl: "die erneuerbaren Energien", fr: "l'énergie renouvelable", ex: "Wind- und Solarenergie sind erneuerbare Energien.", level: "B1" },
      { article: "der", de: "Treibhauseffekt", pl: "–", fr: "l'effet de serre", ex: "CO2-Emissionen verstärken den Treibhauseffekt.", level: "B2" },
      { article: "das", de: "Artensterben", pl: "–", fr: "l'extinction des espèces", ex: "Der Verlust von Lebensräumen beschleunigt das Artensterben.", level: "B2+" },
      { article: "der", de: "Umweltschutz", pl: "–", fr: "la protection de l'environnement", ex: "Umweltschutz beginnt im täglichen Alltag jedes Einzelnen.", level: "B1" }
    ]
  },
  konnektoren: {
    name: "💬 Connecteurs & Argumentation",
    words: [
      { article: "–", de: "deshalb / deswegen", pl: "–", fr: "c'est pourquoi / par conséquent (V2)", ex: "Es regnet, deshalb nehme ich einen Regenschirm mit.", level: "A2" },
      { article: "–", de: "trotzdem", pl: "–", fr: "malgré tout / quand même (V2)", ex: "Er war krank, trotzdem ging er zur Arbeit.", level: "A2" },
      { article: "–", de: "einerseits ... andererseits", pl: "–", fr: "d'une part ... d'autre part", ex: "Einerseits ist es teuer, andererseits ist die Qualität hervorragend.", level: "B1" },
      { article: "–", de: "sowohl ... als auch", pl: "–", fr: "aussi bien ... que / tant ... que", ex: "Er spricht sowohl fließend Deutsch als auch Englisch.", level: "B1" },
      { article: "–", de: "weder ... noch", pl: "–", fr: "ni ... ni", ex: "Ich trinke weder Kaffee noch schwarzen Tee.", level: "B1" },
      { article: "–", de: "im Vergleich zu", pl: "–", fr: "en comparaison avec (+ Dat)", ex: "Im Vergleich zum letzten Jahr sind die Preise gestiegen.", level: "B2" },
      { article: "–", de: "meiner Ansicht nach", pl: "–", fr: "selon mon point de vue / à mon avis", ex: "Meiner Ansicht nach ist diese Entscheidung absolut richtig.", level: "B2" },
      { article: "–", de: "zusammenfassend lässt sich sagen", pl: "–", fr: "en conclusion, on peut affirmer que", ex: "Zusammenfassend lässt sich sagen, dass das Projekt erfolgreich war.", level: "B2+" }
    ]
  }
};

let currentCategoryKey = 'alltag';
let currentLevelFilter = 'all';
let currentFlashcardIndex = 0;
let currentFlashcardsList = [];
let isFlipped = false;

function initVocabPage() {
  renderCategoryButtons();
  selectCategory('alltag');
  renderCustomVocabList();
  initVocabSearch();
}

function renderCategoryButtons() {
  const container = document.getElementById('vocab-categories-container');
  if (!container) return;

  container.innerHTML = Object.entries(VOCAB_CATEGORIES).map(([key, cat]) => `
    <button onclick="selectCategory('${key}')" class="category-tab px-3.5 py-2 rounded-xl font-bold text-xs border transition flex items-center gap-1.5 ${
      currentCategoryKey === key 
        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
    }">
      <span>${cat.name}</span>
      <span class="text-[10px] px-1.5 py-0.5 rounded-full ${currentCategoryKey === key ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600 font-semibold'}">${cat.words.length}</span>
    </button>
  `).join('');
}

function selectCategory(key) {
  currentCategoryKey = key;
  applyFilters();
  renderCategoryButtons();
}

function filterByLevel(level) {
  currentLevelFilter = level;
  document.querySelectorAll('.level-filter-btn').forEach(b => {
    if (b.dataset.level === level) {
      b.className = "level-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow";
    } else {
      b.className = "level-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200";
    }
  });
  applyFilters();
}

function applyFilters() {
  const baseWords = VOCAB_CATEGORIES[currentCategoryKey].words;
  if (currentLevelFilter === 'all') {
    currentFlashcardsList = [...baseWords];
  } else {
    currentFlashcardsList = baseWords.filter(w => w.level.startsWith(currentLevelFilter));
  }
  currentFlashcardIndex = 0;
  isFlipped = false;
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
        <p class="text-slate-500 text-sm">Aucun mot correspondant au filtre sélectionné (${currentLevelFilter}).</p>
        <button onclick="filterByLevel('all')" class="mt-3 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg">Afficher tous les niveaux</button>
      </div>
    `;
    if (progressText) progressText.textContent = "0 / 0";
    return;
  }

  const word = currentFlashcardsList[currentFlashcardIndex];
  if (progressText) {
    progressText.textContent = `Carte ${currentFlashcardIndex + 1} / ${currentFlashcardsList.length}`;
  }

  const badgeClass = word.article === 'der' ? 'badge-der' : word.article === 'die' ? 'badge-die' : word.article === 'das' ? 'badge-das' : 'bg-slate-100 text-slate-600 border border-slate-200';

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
            <button onclick="event.stopPropagation(); speakGerman('${word.article !== '–' ? word.article + ' ' : ''}${word.de}', this)" class="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition" title="Écouter">
              🔊 Prononcer
            </button>
            <span class="italic">👆 Cliquez pour retourner</span>
          </div>
        </div>

        <!-- Back -->
        <div class="flip-card-back bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white p-6 shadow-xl rounded-2xl flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs text-indigo-300">
            <span>Traduction & Contexte</span>
            <button onclick="event.stopPropagation(); speakGerman('${word.ex}', this)" class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white transition">
              🔊
            </button>
          </div>

          <div class="text-center my-auto">
            <h4 class="text-2xl font-black text-amber-300 mb-2">« ${word.fr} »</h4>
            <p class="text-xs sm:text-sm text-slate-200 italic bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              "${word.ex}"
            </p>
          </div>

          <div class="text-xs text-center text-indigo-300">
            <span>${word.article !== '–' ? word.article + ' ' : ''}${word.de} (${word.pl})</span>
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
  if (known && currentFlashcardsList.length > 0) {
    UserProgress.addXP(5);
  }
  if (currentFlashcardsList.length > 0) {
    currentFlashcardIndex = (currentFlashcardIndex + 1) % currentFlashcardsList.length;
    renderFlashcard();
  }
}

function prevCard() {
  if (currentFlashcardsList.length > 0) {
    currentFlashcardIndex = (currentFlashcardIndex - 1 + currentFlashcardsList.length) % currentFlashcardsList.length;
    renderFlashcard();
  }
}

function renderVocabTable() {
  const container = document.getElementById('vocab-table-body');
  if (!container) return;

  container.innerHTML = currentFlashcardsList.map(w => {
    const badgeClass = w.article === 'der' ? 'badge-der' : w.article === 'die' ? 'badge-die' : w.article === 'das' ? 'badge-das' : 'bg-slate-100 text-slate-600';
    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100 text-xs sm:text-sm">
        <td class="p-3">
          <span class="px-2 py-0.5 rounded text-xs font-black ${badgeClass}">${w.article}</span>
        </td>
        <td class="p-3 font-bold text-slate-900">
          ${w.de} <span class="text-xs font-normal text-slate-400 ml-1">(${w.pl})</span>
        </td>
        <td class="p-3 text-slate-700 font-medium">${w.fr}</td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">${w.level}</span>
        </td>
        <td class="p-3 text-xs text-slate-500 italic hidden md:table-cell">"${w.ex}"</td>
        <td class="p-3 text-right">
          <button onclick="speakGerman('${w.article !== '–' ? w.article + ' ' : ''}${w.de}', this)" class="p-1 text-slate-400 hover:text-indigo-600 transition">
            🔊
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Vocab Instant Search Filter across all categories
function initVocabSearch() {
  const searchInput = document.getElementById('vocab-inline-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      applyFilters();
      return;
    }

    // Search across ALL categories
    const allWords = Object.values(VOCAB_CATEGORIES).flatMap(c => c.words);
    currentFlashcardsList = allWords.filter(w => 
      w.de.toLowerCase().includes(q) || w.fr.toLowerCase().includes(q) || (w.ex && w.ex.toLowerCase().includes(q))
    );
    currentFlashcardIndex = 0;
    renderFlashcard();
    renderVocabTable();
  });
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

function exportCustomVocabJSON() {
  const list = getCustomVocab();
  if (list.length === 0) {
    showToast("Votre carnet est vide, rien à exporter.", "warning");
    return;
  }
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `mon_vocabulaire_allemand_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Fichier de vocabulaire exporté avec succès ! 💾", "success");
}

function importCustomVocabJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        const existing = getCustomVocab();
        const merged = [...imported, ...existing];
        const unique = Array.from(new Map(merged.map(item => [item.de.toLowerCase(), item])).values());
        saveCustomVocab(unique);
        showToast(`${imported.length} mots importés dans votre carnet ! 🎉`, "success");
      } else {
        showToast("Format JSON invalide.", "error");
      }
    } catch(err) {
      showToast("Erreur lors de la lecture du fichier JSON.", "error");
    }
  };
  reader.readAsText(file);
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
        <span class="px-2 py-0.5 rounded text-xs font-black ${item.article === 'der' ? 'badge-der' : item.article === 'die' ? 'badge-die' : item.article === 'das' ? 'badge-das' : 'bg-slate-100 text-slate-600'}">
          ${item.article}
        </span>
        <div>
          <h4 class="font-bold text-slate-900 text-sm">${item.de}</h4>
          <p class="text-xs text-slate-500">${item.fr}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="speakGerman('${item.article !== '–' ? item.article + ' ' : ''}${item.de}', this)" class="p-1 text-slate-400 hover:text-indigo-600">🔊</button>
        <button onclick="deleteCustomWord(${item.id})" class="p-1 text-slate-300 hover:text-rose-600 transition" title="Supprimer">🗑️</button>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initVocabPage();
  const form = document.getElementById('custom-word-form');
  if (form) form.addEventListener('submit', addCustomWord);

  const importInput = document.getElementById('import-vocab-file');
  if (importInput) importInput.addEventListener('change', importCustomVocabJSON);
});
