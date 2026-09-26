/**
 * Learn Deutsch TOOLS - Resources & Tools Engine (ressources.js)
 * Includes Number-to-German converter and phonetic chart.
 */

// ==========================================
// 1. German Numbers to Words Converter
// ==========================================
const ONES = ["", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
const TEENS = ["zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
const TENS = ["", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];

const DIGIT_WORDS = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];

function integerToGermanWords(num, withDashes = true) {
  if (num === 0) return "null";
  if (num < 0) return "minus " + integerToGermanWords(Math.abs(num), withDashes);

  if (num < 10) return ONES[num];
  if (num < 20) return TEENS[num - 10];
  if (num < 100) {
    const unit = num % 10;
    const ten = Math.floor(num / 10);
    if (unit === 0) return TENS[ten];
    if (unit === 1) return withDashes ? `ein<span class="dash">-</span>und<span class="dash">-</span>${TENS[ten]}` : `einund${TENS[ten]}`;
    return withDashes ? `${ONES[unit]}<span class="dash">-</span>und<span class="dash">-</span>${TENS[ten]}` : `${ONES[unit]}und${TENS[ten]}`;
  }
  if (num < 1000) {
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    const hundredPrefix = hundred === 1 ? (withDashes ? `ein<span class="dash">-</span>hundert` : "einhundert") : (withDashes ? `${ONES[hundred]}<span class="dash">-</span>hundert` : `${ONES[hundred]}hundert`);
    if (remainder === 0) return hundredPrefix;
    const remainderText = integerToGermanWords(remainder, withDashes);
    return withDashes ? `${hundredPrefix}<span class="dash">-</span>${remainderText}` : `${hundredPrefix}${remainderText}`;
  }
  if (num < 1000000) {
    const thousand = Math.floor(num / 1000);
    const remainder = num % 1000;
    const thousandPrefix = thousand === 1 ? (withDashes ? `ein<span class="dash">-</span>tausend` : "eintausend") : (withDashes ? `${integerToGermanWords(thousand, withDashes)}<span class="dash">-</span>tausend` : `${integerToGermanWords(thousand, withDashes)}tausend`);
    if (remainder === 0) return thousandPrefix;
    const remainderText = integerToGermanWords(remainder, withDashes);
    return withDashes ? `${thousandPrefix}<span class="dash">-</span>${remainderText}` : `${thousandPrefix}${remainderText}`;
  }
  if (num < 1000000000) {
    const million = Math.floor(num / 1000000);
    const remainder = num % 1000000;
    const millionWord = million === 1 ? (withDashes ? `eine<span class="dash">-</span>Million` : "eine Million") : (withDashes ? `${integerToGermanWords(million, withDashes)}<span class="dash">-</span>Millionen` : `${integerToGermanWords(million, withDashes)} Millionen`);
    if (remainder === 0) return millionWord;
    const remainderText = integerToGermanWords(remainder, withDashes);
    return withDashes ? `${millionWord}<span class="dash">-</span>${remainderText}` : `${millionWord}${remainderText}`;
  }
  return "Nombre trop grand (max 999 999 999)";
}

function convertNumberToGerman(inputStr, withDashes = true) {
  if (typeof inputStr === "number") inputStr = String(inputStr);
  if (!inputStr) return { html: "Entrez un nombre", speech: "" };
  
  const clean = inputStr.trim().replace(/\s+/g, "").replace(",", ".");
  if (clean === "" || clean === "-" || clean === "." || isNaN(clean)) {
    return { html: "Entrez un nombre valide (ex: 142 ou 1,67)", speech: "" };
  }

  const parts = clean.split(".");
  const intStr = parts[0];
  const intVal = parseInt(intStr, 10);

  if (isNaN(intVal)) return { html: "Entrez un nombre valide", speech: "" };
  if (Math.abs(intVal) > 999999999) return { html: "Nombre trop grand (max 999 999 999)", speech: "" };

  const intHtml = integerToGermanWords(intVal, withDashes);
  const intSpeech = integerToGermanWords(intVal, false);

  if (parts.length === 1 || parts[1].length === 0) {
    return { html: intHtml, speech: intSpeech };
  }

  const decStr = parts[1];
  const decDigitsWords = decStr.split("").map(d => {
    const n = parseInt(d, 10);
    return isNaN(n) ? "" : DIGIT_WORDS[n];
  }).filter(Boolean);

  const dashSpan = withDashes ? `<span class="dash">-</span>` : "-";
  const mainHtml = `${intHtml}${dashSpan}Komma${dashSpan}${decDigitsWords.join(dashSpan)}`;
  const mainSpeech = `${intSpeech} Komma ${decDigitsWords.join(" ")}`;

  let fullHtml = mainHtml;
  if (decStr.length === 2) {
    const twoDigitVal = parseInt(decStr, 10);
    if (!isNaN(twoDigitVal) && twoDigitVal >= 10) {
      const twoDigitHtml = integerToGermanWords(twoDigitVal, withDashes);
      fullHtml += ` <span class="text-xs text-slate-400 font-normal block sm:inline mt-1 sm:mt-0 sm:ml-2">(aussi : ${intHtml} Komma ${twoDigitHtml})</span>`;
    }
  }

  return { html: fullHtml, speech: mainSpeech };
}

// Backward compatibility alias
function numberToGermanWords(num, withDashes = true) {
  return convertNumberToGerman(num, withDashes).html;
}

function initNumberConverter() {
  const input = document.getElementById('number-input');
  const resultText = document.getElementById('number-result-de');
  const audioBtn = document.getElementById('number-audio-btn');
  if (!input || !resultText) return;

  const update = () => {
    const valStr = input.value;
    const res = convertNumberToGerman(valStr, true);
    resultText.innerHTML = res.html;
    resultText.dataset.speech = res.speech;
  };

  input.addEventListener('input', update);
  update();

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const speech = resultText.dataset.speech || resultText.textContent;
      if (speech && !speech.includes("Entrez")) {
        speakGerman(speech, audioBtn);
      }
    });
  }
}

// ==========================================
// 2. Phonetics & Special Sounds
// ==========================================
const PHONETICS_DATA = [
  { char: "Ä / ä", desc: "Entre le 'è' et le 'é' français", ex: "der Käse (le fromage)", audio: "der Käse" },
  { char: "Ö / ö", desc: "Comme le 'eu' dans 'peur'", ex: "schön (beau)", audio: "schön" },
  { char: "Ü / ü", desc: "Comme le 'u' français bien prononcé en avant", ex: "die Tür (la porte)", audio: "die Tür" },
  { char: "ß (Eszett)", desc: "Double 's' dur (comme 'poisson')", ex: "die Straße (la rue)", audio: "die Straße" },
  { char: "ei", desc: "Se prononce 'aï' (comme dans 'Aïe')", ex: "das Eis (la glace), mein (mon)", audio: "das Eis, mein" },
  { char: "ie", desc: "Se prononce 'i' long", ex: "das Lied (la chanson), vier (quatre)", audio: "das Lied, vier" },
  { char: "eu / äu", desc: "Se prononce 'oï' (comme dans 'boy')", ex: "heute (aujourd'hui), die Häuser (les maisons)", audio: "heute, die Häuser" },
  { char: "ch (après a, o, u)", desc: "Son 'Ach-Laut' rauque du fond de la gorge", ex: "das Buch (le livre), die Nacht (la nuit)", audio: "das Buch, die Nacht" },
  { char: "ch (après e, i, ä, ö, ü)", desc: "Son 'Ich-Laut' doux et chuinté", ex: "ich (je), das Mädchen (la jeune fille)", audio: "ich, das Mädchen" },
  { char: "sp / st (au début)", desc: "Se prononce 'chp' / 'cht'", ex: "der Sport (le sport), die Stadt (la ville)", audio: "der Sport, die Stadt" },
  { char: "w", desc: "Se prononce comme un 'v' français", ex: "das Wasser (l'eau), woher (d'où)", audio: "das Wasser, woher" },
  { char: "v", desc: "Se prononce généralement comme un 'f' (sauf mots étrangers)", ex: "der Vater (le père), viel (beaucoup)", audio: "der Vater, viel" }
];

function initPhoneticsGrid() {
  const container = document.getElementById('phonetics-grid');
  if (!container) return;

  container.innerHTML = PHONETICS_DATA.map(item => `
    <div class="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:border-indigo-300 transition flex items-center justify-between">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xl font-black text-indigo-600 font-mono">${item.char}</span>
          <span class="text-xs text-slate-500 font-medium">${item.desc}</span>
        </div>
        <p class="text-xs font-semibold text-slate-800 italic">Ex : ${item.ex}</p>
      </div>
      <button onclick="speakGerman('${item.audio}', this)" class="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition" title="Écouter le son">
        🔊
      </button>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initNumberConverter();
  initPhoneticsGrid();
});
