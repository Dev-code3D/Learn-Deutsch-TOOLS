/**
 * Learn Deutsch TOOLS - German Verb Conjugation Database & Engine (conjugaison.js)
 */

const VERBS_DATABASE = [
  {
    infinitive: "sein",
    translation: "être",
    auxiliary: "sein",
    level: "A1",
    type: "irregular",
    praesens: ["bin", "bist", "ist", "sind", "seid", "sind"],
    praeteritum: ["war", "warst", "war", "waren", "wart", "waren"],
    partizip2: "gewesen",
    konjunktiv2: ["wäre", "wärest", "wäre", "wären", "wäret", "wären"],
    imperativ: { du: "Sei!", ihr: "Seid!", sie: "Seien Sie!" },
    example: "Ich bin sehr glücklich heute."
  },
  {
    infinitive: "haben",
    translation: "avoir",
    auxiliary: "haben",
    level: "A1",
    type: "irregular",
    praesens: ["habe", "hast", "hat", "haben", "habt", "haben"],
    praeteritum: ["hatte", "hattest", "hatte", "hatten", "hattet", "hatten"],
    partizip2: "gehabt",
    konjunktiv2: ["hätte", "hättest", "hätte", "hätten", "hättet", "hätten"],
    imperativ: { du: "Hab!", ihr: "Habt!", sie: "Haben Sie!" },
    example: "Wir haben morgen frei."
  },
  {
    infinitive: "werden",
    translation: "devenir / futur",
    auxiliary: "sein",
    level: "A1",
    type: "irregular",
    praesens: ["werde", "wirst", "wird", "werden", "werdet", "werden"],
    praeteritum: ["wurde", "wurdest", "wurde", "wurden", "wurdet", "wurden"],
    partizip2: "geworden",
    konjunktiv2: ["würde", "würdest", "würde", "würden", "würdet", "würden"],
    imperativ: { du: "Werde!", ihr: "Werdet!", sie: "Werden Sie!" },
    example: "Er wird bald Arzt."
  },
  {
    infinitive: "können",
    translation: "pouvoir, être capable",
    auxiliary: "haben",
    level: "A1",
    type: "modal",
    praesens: ["kann", "kannst", "kann", "können", "könnt", "können"],
    praeteritum: ["konnte", "konntest", "konnte", "konnten", "konntet", "konnten"],
    partizip2: "gekonnt",
    konjunktiv2: ["könnte", "könntest", "könnte", "könnten", "könntet", "könnten"],
    imperativ: { du: "-", ihr: "-", sie: "-" },
    example: "Kannst du mir helfen?"
  },
  {
    infinitive: "müssen",
    translation: "devoir, obligation absolue",
    auxiliary: "haben",
    level: "A1",
    type: "modal",
    praesens: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
    praeteritum: ["musste", "musstest", "musste", "mussten", "musstet", "mussten"],
    partizip2: "gemusst",
    konjunktiv2: ["müsste", "müsstest", "müsste", "müssten", "müsstet", "müssten"],
    imperativ: { du: "-", ihr: "-", sie: "-" },
    example: "Ich muss jetzt zur Arbeit gehen."
  },
  {
    infinitive: "wollen",
    translation: "vouloir",
    auxiliary: "haben",
    level: "A1",
    type: "modal",
    praesens: ["will", "willst", "will", "wollen", "wollt", "wollen"],
    praeteritum: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"],
    partizip2: "gewollt",
    konjunktiv2: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"],
    imperativ: { du: "-", ihr: "-", sie: "-" },
    example: "Was willst du trinken?"
  },
  {
    infinitive: "gehen",
    translation: "aller (à pied), marcher",
    auxiliary: "sein",
    level: "A1",
    type: "stark",
    praesens: ["gehe", "gehst", "geht", "gehen", "geht", "gehen"],
    praeteritum: ["ging", "gingst", "ging", "gingen", "gingt", "gingen"],
    partizip2: "gegangen",
    konjunktiv2: ["ginge", "gingest", "ginge", "gingen", "ginget", "gingen"],
    imperativ: { du: "Geh!", ihr: "Geht!", sie: "Gehen Sie!" },
    example: "Wohin gehst du?"
  },
  {
    infinitive: "kommen",
    translation: "venir, arriver",
    auxiliary: "sein",
    level: "A1",
    type: "stark",
    praesens: ["komme", "kommst", "kommt", "kommen", "kommt", "kommen"],
    praeteritum: ["kam", "kamst", "kam", "kamen", "kamt", "kamen"],
    partizip2: "gekommen",
    konjunktiv2: ["käme", "kämest", "käme", "kämen", "kämet", "kämen"],
    imperativ: { du: "Komm!", ihr: "Kommt!", sie: "Kommen Sie!" },
    example: "Woher kommst du?"
  },
  {
    infinitive: "machen",
    translation: "faire",
    auxiliary: "haben",
    level: "A1",
    type: "regular",
    praesens: ["mache", "machst", "macht", "machen", "macht", "machen"],
    praeteritum: ["machte", "machtest", "machte", "machten", "machtet", "machten"],
    partizip2: "gemacht",
    konjunktiv2: ["machte", "machtest", "machte", "machten", "machtet", "machten"],
    imperativ: { du: "Mach!", ihr: "Macht!", sie: "Machen Sie!" },
    example: "Was machst du am Wochenende?"
  },
  {
    infinitive: "sehen",
    translation: "voir, regarder",
    auxiliary: "haben",
    level: "A1",
    type: "stark",
    praesens: ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"],
    praeteritum: ["sah", "sahst", "sah", "sahen", "saht", "sahen"],
    partizip2: "gesehen",
    konjunktiv2: ["sähe", "sähest", "sähe", "sähen", "sähet", "sähen"],
    imperativ: { du: "Sieh!", ihr: "Seht!", sie: "Sehen Sie!" },
    example: "Siehst du den großen Turm?"
  },
  {
    infinitive: "sprechen",
    translation: "parler",
    auxiliary: "haben",
    level: "A1",
    type: "stark",
    praesens: ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"],
    praeteritum: ["sprach", "sprachst", "sprach", "sprachen", "spracht", "sprachen"],
    partizip2: "gesprochen",
    konjunktiv2: ["spräche", "sprächest", "spräche", "sprächen", "sprächet", "sprächen"],
    imperativ: { du: "Sprich!", ihr: "Sprecht!", sie: "Sprechen Sie!" },
    example: "Ich spreche Deutsch und Französisch."
  },
  {
    infinitive: "fahren",
    translation: "aller (en véhicule), conduire",
    auxiliary: "sein",
    level: "A1",
    type: "stark",
    praesens: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
    praeteritum: ["fuhr", "fuhrst", "fuhr", "fuhren", "fuhrt", "fuhren"],
    partizip2: "gefahren",
    konjunktiv2: ["führe", "führest", "führe", "führen", "führet", "führen"],
    imperativ: { du: "Fahr!", ihr: "Fahrt!", sie: "Fahren Sie!" },
    example: "Wir fahren mit dem Zug nach Berlin."
  },
  {
    infinitive: "essen",
    translation: "manger",
    auxiliary: "haben",
    level: "A1",
    type: "stark",
    praesens: ["esse", "isst", "isst", "essen", "esst", "essen"],
    praeteritum: ["aß", "aßest", "aß", "aßen", "aßt", "aßen"],
    partizip2: "gegessen",
    konjunktiv2: ["äße", "äßest", "äße", "äßen", "äßet", "äßen"],
    imperativ: { du: "Iss!", ihr: "Esst!", sie: "Essen Sie!" },
    example: "Was isst du gern zum Frühstück?"
  },
  {
    infinitive: "schreiben",
    translation: "écrire",
    auxiliary: "haben",
    level: "A1",
    type: "stark",
    praesens: ["schreibe", "schreibst", "schreibt", "schreiben", "schreibt", "schreiben"],
    praeteritum: ["schrieb", "schriebst", "schrieb", "schrieben", "schriebt", "schrieben"],
    partizip2: "geschrieben",
    konjunktiv2: ["schriebe", "schriebest", "schriebe", "schrieben", "schriebet", "schrieben"],
    imperativ: { du: "Schreib!", ihr: "Schreibt!", sie: "Schreiben Sie!" },
    example: "Er schreibt eine E-Mail an seinen Chef."
  },
  {
    infinitive: "anrufen",
    translation: "appeler au téléphone (trennbar)",
    auxiliary: "haben",
    level: "A2",
    type: "trennbar",
    praesens: ["rufe an", "rufst an", "ruft an", "rufen an", "ruft an", "rufen an"],
    praeteritum: ["rief an", "riefst an", "rief an", "riefen an", "rieft an", "riefen an"],
    partizip2: "angerufen",
    konjunktiv2: ["riefe an", "riefest an", "riefe an", "riefen an", "riefet an", "riefen an"],
    imperativ: { du: "Ruf an!", ihr: "Ruft an!", sie: "Rufen Sie an!" },
    example: "Ich rufe dich heute Abend an."
  },
  {
    infinitive: "verstehen",
    translation: "comprendre (untrennbar)",
    auxiliary: "haben",
    level: "A1",
    type: "stark",
    praesens: ["verstehe", "verstehst", "versteht", "verstehen", "versteht", "verstehen"],
    praeteritum: ["verstand", "verstandest", "verstand", "verstanden", "verstandet", "verstanden"],
    partizip2: "verstanden",
    konjunktiv2: ["verstände", "verständest", "verstände", "verständen", "verständet", "verständen"],
    imperativ: { du: "Versteh!", ihr: "Versteht!", sie: "Verstehen Sie!" },
    example: "Ich verstehe diesen Satz nicht."
  },
  {
    infinitive: "bleiben",
    translation: "rester",
    auxiliary: "sein",
    level: "A1",
    type: "stark",
    praesens: ["bleibe", "bleibst", "bleibt", "bleiben", "bleibt", "bleiben"],
    praeteritum: ["blieb", "bliebst", "blieb", "blieben", "bliebt", "blieben"],
    partizip2: "geblieben",
    konjunktiv2: ["bliebe", "bliebest", "bliebe", "blieben", "bliebet", "blieben"],
    imperativ: { du: "Bleib!", ihr: "Bleibt!", sie: "Bleiben Sie!" },
    example: "Bleibst du heute zu Hause?"
  },
  {
    infinitive: "nehmen",
    translation: "prendre",
    auxiliary: "haben",
    level: "A1",
    type: "stark",
    praesens: ["nehme", "nimmst", "nimmt", "nehmen", "nehmt", "nehmen"],
    praeteritum: ["nahm", "nahmst", "nahm", "nahmen", "nahmt", "nahmen"],
    partizip2: "genommen",
    konjunktiv2: ["nähme", "nähmest", "nähme", "nähmen", "nähmet", "nähmen"],
    imperativ: { du: "Nimm!", ihr: "Nehmt!", sie: "Nehmen Sie!" },
    example: "Ich nehme eine Tasse Kaffee, bitte."
  },
  {
    infinitive: "geben",
    translation: "donner (es gibt = il y a)",
    auxiliary: "haben",
    level: "A1",
    type: "stark",
    praesens: ["gebe", "gibst", "gibt", "geben", "gebt", "geben"],
    praeteritum: ["gab", "gabst", "gab", "gaben", "gabt", "gaben"],
    partizip2: "gegeben",
    konjunktiv2: ["gäbe", "gäbest", "gäbe", "gäben", "gäbet", "gäben"],
    imperativ: { du: "Gib!", ihr: "Gebt!", sie: "Geben Sie!" },
    example: "Es gibt viele gute Bücher in der Bibliothek."
  },
  {
    infinitive: "wissen",
    translation: "savoir",
    auxiliary: "haben",
    level: "A1",
    type: "irregular",
    praesens: ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"],
    praeteritum: ["wusste", "wusstest", "wusste", "wussten", "wusstet", "wussten"],
    partizip2: "gewusst",
    konjunktiv2: ["wüsste", "wüsstest", "wüsste", "wüssten", "wüsstet", "wüssten"],
    imperativ: { du: "Wisse!", ihr: "Wisst!", sie: "Wissen Sie!" },
    example: "Ich weiß nicht, wie spät es ist."
  },
  {
    infinitive: "dürfen",
    translation: "avoir l'autorisation / le droit",
    auxiliary: "haben",
    level: "A2",
    type: "modal",
    praesens: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
    praeteritum: ["durfte", "durftest", "durfte", "durften", "durftet", "durften"],
    partizip2: "gedurft",
    konjunktiv2: ["dürfte", "dürftest", "dürfte", "dürften", "dürftet", "dürften"],
    imperativ: { du: "-", ihr: "-", sie: "-" },
    example: "Hier darf man nicht parken."
  },
  {
    infinitive: "sollen",
    translation: "devoir (conseil, consigne morale)",
    auxiliary: "haben",
    level: "A2",
    type: "modal",
    praesens: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
    praeteritum: ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"],
    partizip2: "gesollt",
    konjunktiv2: ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"],
    imperativ: { du: "-", ihr: "-", sie: "-" },
    example: "Der Arzt sagt, ich soll viel Wasser trinken."
  },
  {
    infinitive: "mögen",
    translation: "aimer, apprécier (möchte = aimerait)",
    auxiliary: "haben",
    level: "A1",
    type: "modal",
    praesens: ["mag", "magst", "mag", "mögen", "mögt", "mögen"],
    praeteritum: ["mochte", "mochtest", "mochte", "mochten", "mochtet", "mochten"],
    partizip2: "gemocht",
    konjunktiv2: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
    imperativ: { du: "-", ihr: "-", sie: "-" },
    example: "Ich mag deutsche Musik. Ich möchte reisen."
  }
];

const PRONOUNS = ["ich", "du", "er / sie / es", "wir", "ihr", "sie / Sie"];

let currentSelectedVerb = VERBS_DATABASE[0];

function initConjugator() {
  renderVerbSelector();
  renderConjugationDisplay(currentSelectedVerb);
  renderIrregularVerbsTable(VERBS_DATABASE);

  // Search input filter
  const searchInput = document.getElementById('verb-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = VERBS_DATABASE.filter(v => 
        v.infinitive.toLowerCase().includes(q) || v.translation.toLowerCase().includes(q)
      );
      renderVerbSelector(filtered);
      renderIrregularVerbsTable(filtered);
    });
  }
}

function renderVerbSelector(verbs = VERBS_DATABASE) {
  const container = document.getElementById('verb-buttons-list');
  if (!container) return;

  if (verbs.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 p-2">Aucun verbe trouvé</p>`;
    return;
  }

  container.innerHTML = verbs.map(v => `
    <button onclick="selectVerb('${v.infinitive}')" class="px-3 py-2 text-xs font-semibold rounded-lg border transition text-left flex items-center justify-between ${
      currentSelectedVerb.infinitive === v.infinitive 
        ? 'bg-indigo-600 text-white border-indigo-600 shadow' 
        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
    }">
      <span>${v.infinitive}</span>
      <span class="text-[10px] opacity-75 font-normal ml-1">${v.translation}</span>
    </button>
  `).join('');
}

function selectVerb(infinitive) {
  const found = VERBS_DATABASE.find(v => v.infinitive === infinitive);
  if (found) {
    currentSelectedVerb = found;
    renderVerbSelector();
    renderConjugationDisplay(found);
  }
}

function renderConjugationDisplay(v) {
  const container = document.getElementById('verb-details-container');
  if (!container) return;

  const typeLabels = {
    regular: { label: "Régulier (Schwach)", color: "bg-emerald-100 text-emerald-800" },
    stark: { label: "Fort (Stark - Irrégulier)", color: "bg-purple-100 text-purple-800" },
    irregular: { label: "Très Irrégulier", color: "bg-rose-100 text-rose-800" },
    modal: { label: "Verbe Modal", color: "bg-amber-100 text-amber-800" },
    trennbar: { label: "À Particule Séparable", color: "bg-blue-100 text-blue-800" }
  };

  const currentType = typeLabels[v.type] || typeLabels.regular;

  container.innerHTML = `
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
      <div>
        <div class="flex items-center gap-3">
          <h2 class="text-3xl font-extrabold text-slate-900">${v.infinitive}</h2>
          <button onclick="speakGerman('${v.infinitive}', this)" class="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition" title="Écouter le verbe">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          </button>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold ${currentType.color}">${currentType.label}</span>
          <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-bold">${v.level}</span>
        </div>
        <p class="text-base text-slate-600 mt-1 font-medium">Sens : « <strong class="text-slate-800">${v.translation}</strong> »</p>
      </div>

      <div class="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200/70 p-2.5 rounded-xl">
        <span class="font-semibold text-slate-500">Auxiliaire Perfekt :</span>
        <span class="font-bold px-2 py-0.5 rounded ${v.auxiliary === 'sein' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">${v.auxiliary}</span>
      </div>
    </div>

    <!-- Tenses Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
      <!-- Präsens -->
      <div class="bg-slate-50/80 rounded-xl p-4 border border-slate-200/70">
        <div class="flex items-center justify-between font-bold text-slate-800 text-sm mb-3 pb-2 border-b border-slate-200/60">
          <span>Präsens (Présent)</span>
          <span class="text-xs text-indigo-600 font-semibold">Gegenwart</span>
        </div>
        <ul class="space-y-1.5 text-sm">
          ${PRONOUNS.map((pron, idx) => `
            <li class="flex items-center justify-between hover:bg-white p-1 rounded transition">
              <span class="text-slate-500 text-xs font-medium">${pron}</span>
              <div class="flex items-center gap-1.5">
                <span class="font-bold text-slate-900">${v.praesens[idx]}</span>
                <button onclick="speakGerman('${pron.replace(/ \/ .*/, '')} ${v.praesens[idx]}', this)" class="text-slate-400 hover:text-indigo-600 text-xs">🔊</button>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Präteritum -->
      <div class="bg-slate-50/80 rounded-xl p-4 border border-slate-200/70">
        <div class="flex items-center justify-between font-bold text-slate-800 text-sm mb-3 pb-2 border-b border-slate-200/60">
          <span>Präteritum (Imparfait / Récit)</span>
          <span class="text-xs text-indigo-600 font-semibold">Vergangenheit</span>
        </div>
        <ul class="space-y-1.5 text-sm">
          ${PRONOUNS.map((pron, idx) => `
            <li class="flex items-center justify-between hover:bg-white p-1 rounded transition">
              <span class="text-slate-500 text-xs font-medium">${pron}</span>
              <div class="flex items-center gap-1.5">
                <span class="font-bold text-slate-900">${v.praeteritum[idx]}</span>
                <button onclick="speakGerman('${pron.replace(/ \/ .*/, '')} ${v.praeteritum[idx]}', this)" class="text-slate-400 hover:text-indigo-600 text-xs">🔊</button>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Perfekt -->
      <div class="bg-slate-50/80 rounded-xl p-4 border border-slate-200/70">
        <div class="flex items-center justify-between font-bold text-slate-800 text-sm mb-3 pb-2 border-b border-slate-200/60">
          <span>Perfekt (Passé composé parlé)</span>
          <span class="text-xs text-indigo-600 font-semibold">${v.auxiliary} + Partizip II</span>
        </div>
        <div class="p-3 bg-white rounded-lg border border-slate-200 text-center mb-2">
          <span class="text-xs text-slate-400">Partizip II :</span>
          <div class="text-lg font-black text-indigo-600">${v.partizip2}</div>
        </div>
        <p class="text-xs text-slate-600 italic">
          Exemple : ${v.auxiliary === 'sein' ? 'Ich <strong>bin</strong> ' : 'Ich <strong>habe</strong> '} ${v.partizip2}.
        </p>
      </div>

      <!-- Konjunktiv II & Imperativ -->
      <div class="bg-slate-50/80 rounded-xl p-4 border border-slate-200/70">
        <div class="flex items-center justify-between font-bold text-slate-800 text-sm mb-3 pb-2 border-b border-slate-200/60">
          <span>Konjunktiv II & Impératif</span>
          <span class="text-xs text-indigo-600 font-semibold">Conditionnel & Ordre</span>
        </div>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between items-center p-2 bg-white rounded border border-slate-200">
            <span class="font-semibold text-slate-600">ich (Konj. II) :</span>
            <span class="font-bold text-indigo-700 text-sm">${v.konjunktiv2[0]}</span>
          </div>
          <div class="flex justify-between items-center p-2 bg-white rounded border border-slate-200">
            <span class="font-semibold text-slate-600">du (Impératif) :</span>
            <span class="font-bold text-slate-900 text-sm">${v.imperativ.du}</span>
          </div>
          <div class="flex justify-between items-center p-2 bg-white rounded border border-slate-200">
            <span class="font-semibold text-slate-600">Sie (Poli) :</span>
            <span class="font-bold text-slate-900 text-sm">${v.imperativ.sie}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Example sentence box -->
    <div class="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-700">Exemple en contexte</span>
        <p class="text-sm font-semibold text-slate-800 mt-0.5">"${v.example}"</p>
      </div>
      <button onclick="speakGerman('${v.example}', this)" class="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition" title="Écouter l'exemple">
        🔊
      </button>
    </div>
  `;
}

function renderIrregularVerbsTable(verbs) {
  const container = document.getElementById('irregular-table-body');
  if (!container) return;

  const irregulars = verbs.filter(v => v.type === 'stark' || v.type === 'irregular');

  container.innerHTML = irregulars.map(v => `
    <tr class="hover:bg-slate-50 transition border-b border-slate-200/70 text-sm">
      <td class="p-3 font-bold text-slate-900">
        <button onclick="selectVerb('${v.infinitive}')" class="hover:text-indigo-600 underline">
          ${v.infinitive}
        </button>
      </td>
      <td class="p-3 text-slate-600">${v.translation}</td>
      <td class="p-3 font-medium text-slate-800">er/sie/es ${v.praesens[2]}</td>
      <td class="p-3 font-bold text-indigo-700">${v.praeteritum[0]}</td>
      <td class="p-3 font-bold text-emerald-700">${v.partizip2}</td>
      <td class="p-3 font-semibold text-slate-500">${v.auxiliary}</td>
      <td class="p-3 text-right">
        <button onclick="speakGerman('${v.infinitive}, ${v.praeteritum[0]}, ${v.partizip2}', this)" class="text-slate-400 hover:text-indigo-600">
          🔊
        </button>
      </td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initConjugator();
});
