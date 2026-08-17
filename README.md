# 🇩🇪 Learn Deutsch TOOLS — La Boîte à Outils Complète d'Allemand

> Une suite web moderne, réactive, élégante et interactive pour apprendre, pratiquer et perfectionner la langue allemande (niveaux A1 à B2).

---

## 🌟 Modules & Pages Disponibles

### 1. 📐 **Les 4 Cas Allemands (`pages/declinaisons.html`)**
- **Rôles & Questions clés** : *Nominativ* (Wer?), *Akkusativ* (Wen/Wohin?), *Dativ* (Wem/Wo?), *Genitiv* (Wessen?).
- **Tableaux interactifs** : Articles définis (*der/die/das*), indéfinis (*ein/eine*), négatifs (*kein*), pronoms personnels.
- **Wechselpräpositionen** : Les 9 prépositions mixtes (*an, auf, hinter, in, neben, über, unter, vor, zwischen*) avec sélecteur comparatif *Statique (Wo? + Dativ)* vs *Mouvement (Wohin? + Akkusativ)* et audio natif.
- **Jeu « Détective d'Articles »** : Jeu interactif pour deviner l'article (*Der / Die / Das*) avec astuces mnémoniques et suivi de série.

### 2. 🎨 **Déclinaison des Adjectifs & Simulateur (`pages/adjectifs-declinaisons.html`)**
- **Les 3 Types de Déclinaisons** :
  1. *Déclinaison Faible* (après article défini *der/die/das*).
  2. *Déclinaison Mixte* (après article indéfini *ein/kein/mein*).
  3. *Déclinaison Forte* (sans article / *Nullartikel*).
- **Simulateur dynamique en temps réel** : Testez n'importe quel accord d'adjectif en direct avec audio !
- **Quiz d'entraînement aux terminaisons** (*-e, -en, -er, -es, -em*).

### 3. 🔄 **Conjugateur de Verbes & Audio (`pages/conjugaison.html`)**
- **Conjugateur temps réel** pour plus de 50 verbes essentiels.
- Temps supportés : *Präsens*, *Präteritum*, *Perfekt* (avec auxiliaire *haben / sein* et *Partizip II*), *Konjunktiv II*, *Impératif*.
- Synthèse vocale native allemande sur chaque verbe et exemple.
- Guide complet des **verbes à particules séparables** (*trennbare Verben*) vs **inséparables** (*be-, ge-, er-, ver-, zer-, ent-, emp-, miss-*).
- Tableau synthétique complet des verbes forts et irréguliers (A1-B2).

### 4. 🗂️ **Vocabulaire & Flashcards 3D (`pages/vocabulaire.html`)**
- **Cartes mémoires 3D** avec effet de retournement interactif (*flip*).
- Thèmes : Vie courante & Maison, Travail & Bureau, Voyages & Transports, Nourriture & Restaurant, Sentiments & Émotions.
- **Carnet de Vocabulaire Personnalisé** : Enregistrez vos propres mots de vocabulaire avec sauvegarde automatique locale (`localStorage`).

### 5. 💬 **Dialogues & Situations de la Vie Réelle (`pages/dialogues.html`)**
- Conversations réalistes : Au restaurant / café, À la gare (billets & retards), Chez le médecin (symptômes & ordonnance), Entretien d'embauche.
- **Mode Rôle Joueur** : Masquez les répliques pour vous entraîner à répondre par vous-même avant de révéler et d'écouter l'audio.

### 6. 🎧 **Dictée & Compréhension Orale (`pages/ecoute-dictee.html`)**
- Exercice de dictée interactive avec audio à vitesse réglable (0.75x, 0.9x, 1.1x).
- Clavier virtuel intégré pour les caractères allemands (*ä, ö, ü, Ä, Ö, Ü, ß*).
- Analyse précise des fautes d'orthographe, majuscules et ponctuation.

### 7. 🎯 **Exercices, Quiz & Satzbau Builder (`pages/exercices.html`)**
- **Quiz QCM** avec explications grammaticales immédiates et détaillées en français.
- **Satzbau Builder** : Reconstruisez des phrases allemandes en respectant la règle du **Verbe en 2ème position** (phrase principale) ou du **Verbe en fin de proposition** (subordonnées avec *weil, dass, wenn...*).
- Système de score, points XP et streak journalier.

### 8. 📚 **Guide Grammatical Synthétique (`pages/grammaire.html`)**
- **La Règle TeKaMoLo** : Ordre logique des compléments (*Temporal ➔ Kausal ➔ Modal ➔ Lokal*).
- **Subordonnées vs Conjonctions ADUSO** (*Aber, Denn, Und, Sondern, Oder* en position 0).
- Les **6 Verbes Modaux** (*können, müssen, dürfen, wollen, sollen, möchten*).
- Les mots directionnels oraux (*rein, raus, rauf, runter, rüber*).
- Fiches optimisées pour l'impression papier (`Cmd+P` / `Ctrl+P`).

### 9. 🛠️ **Boîte à Outils & Immersion (`pages/ressources.html`)**
- **Convertisseur instantané de nombres en lettres allemandes** (0 à 999 999 999) avec prononciation audio.
- Tableau phonétique interactif des sons allemands (*Ä, Ö, Ü, ß, ch, sch, sp, st, ei, eu, ie*).
- Sélection des meilleurs dictionnaires (LEO, PONS, Duden) et médias d'apprentissage (Easy German, Slow German, Nicos Weg, Nachrichtenleicht).

---

## 🚀 Utilisation & Déploiement

Le projet fonctionne de manière 100% autonome sans serveur complexe.

### 1. Ouvrir localement :
Double-cliquez simplement sur `index.html` dans votre navigateur.

### 2. Déploiement en 1 clic sur GitHub Pages :
1. Poussez les fichiers sur votre dépôt GitHub :
   ```bash
   git add .
   git commit -m "Déploiement Learn Deutsch TOOLS v2.0"
   git push origin main
   ```
2. Allez dans **Settings** ➔ **Pages** sur GitHub.
3. Choisissez la branche `main` (ou `master`) et le dossier `/ (root)`.
4. Votre site est immédiatement disponible en ligne gratuitement !

---

## 📁 Architecture des Fichiers

```
Learn Deutsch TOOLS/
├── index.html                           # Page d'accueil & Hub principal
├── README.md                            # Documentation complète
├── css/
│   └── custom.css                       # Styles personnalisés (badges d'articles, flip 3D, print)
├── js/
│   ├── main.js                          # Moteur audio TTS, Streak, XP, recherche globale
│   ├── declinaisons.js                  # Moteur des cas, Wechselpräpositionen, jeu d'articles
│   ├── adjectifs.js                     # Déclinaisons des adjectifs, simulateur et quiz
│   ├── conjugaison.js                   # Base de données verbes, conjugateur, filtres
│   ├── vocabulaire.js                   # Flashcards 3D, carnet perso (LocalStorage)
│   ├── dialogues.js                     # Conversations réelles, audio & mode rôle joueur
│   ├── dictee.js                        # Dictée audio, vitesse et correction
│   ├── exercices.js                     # Moteur de Quiz & Satzbau Builder
│   └── ressources.js                    # Convertisseur chiffres en lettres & phonétique
└── pages/
    ├── declinaisons.html                # Les 4 Cas & Prépositions mixtes
    ├── adjectifs-declinaisons.html      # Déclinaisons des adjectifs & simulateur
    ├── conjugaison.html                 # Conjugateur de verbes & Verbes forts
    ├── vocabulaire.html                 # Flashcards & Carnet de vocabulaire
    ├── dialogues.html                   # Situations & Dialogues réels
    ├── ecoute-dictee.html               # Dictée & Compréhension Orale
    ├── exercices.html                   # Quiz & Satzbau
    ├── grammaire.html                   # Guide grammatical complet & TeKaMoLo
    └── ressources.html                  # Chiffres en lettres, Phonétique & Liens
```

---
*Viel Erfolg beim Deutschlernen! 🇩🇪*
