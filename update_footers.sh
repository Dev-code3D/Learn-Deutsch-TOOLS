#!/bin/bash

cd /Users/assemdev/Documents/GitHub/Learn\ Deutsch\ TOOLS

# Pages to update
pages=(
  "pages/adjectifs-declinaisons.html"
  "pages/carrieres-jobs.html"
  "pages/declinaisons.html"
  "pages/dialogues.html"
  "pages/ecoute-dictee.html"
  "pages/etudes-allemagne.html"
  "pages/exercices.html"
  "pages/grammaire.html"
  "pages/medias-livres.html"
  "pages/ressources.html"
  "pages/vocabulaire.html"
  "pages/conjugaison.html"
)

for page in "${pages[@]}"; do
  if [ -f "$page" ]; then
    # Use Perl to safely replace
    perl -pi -e 's|(<p>© 2026 Learn Deutsch TOOLS — [^<]+)(</p>)|$1 — <a href="https://dev-code3d.github.io/DocAkkDatWechprap/" target="_blank" class="hover:text-white transition text-slate-400 font-semibold">Grammaire Allemande</a>$2|' "$page"
    echo "Updated: $page"
  fi
done

echo "All footers updated!"
