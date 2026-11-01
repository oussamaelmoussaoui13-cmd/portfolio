# Portfolio — Développeur informatique

Portfolio personnel présentant mon profil, mes compétences et mes projets dans le cadre
de ma recherche de stage en développement informatique.

**Technologies :** HTML5, CSS3, JavaScript (vanilla) — sans framework ni backend.

## Fonctionnalités

- Page unique avec navigation fixe, lien actif selon la section et menu mobile
- Thème sombre avec accents bleus, design responsive (mobile, tablette, ordinateur)
- Animations discrètes à l'apparition, désactivées si `prefers-reduced-motion`
- Projets générés depuis un fichier de données, avec filtres par technologie et fenêtre de détail
- Téléchargement du CV (PDF)
- Contact : e-mail (avec copie en un clic), GitHub, LinkedIn
- Accessibilité : HTML sémantique, navigation clavier, focus visible, lien d'évitement

## Structure

```
portfolio/
├── index.html
├── css/
│   ├── variables.css      # Couleurs, polices, espacements
│   ├── base.css           # Reset et styles globaux
│   ├── layout.css         # Navigation, sections, hero, footer
│   ├── components.css     # Boutons, badges, cartes, timeline, modale
│   ├── animations.css     # Animations et réduction de mouvement
│   └── responsive.css     # Adaptations tablette / mobile
├── js/
│   ├── main.js            # Point d'entrée
│   ├── navigation.js      # Menu, lien actif, retour en haut
│   ├── animations.js      # Apparition au défilement
│   ├── projects.js        # Cartes, filtres, modale
│   └── data/
│       └── projects-data.js   # ← Données des projets
└── assets/
    ├── cv/                # CV.pdf
    ├── images/projects/   # Captures des projets
    └── favicon/
```

## Lancer le site en local

Ouvrir simplement `index.html` dans un navigateur (double-clic).

Ou, avec un petit serveur local :

```bash
python3 -m http.server 8000
```

puis ouvrir <http://localhost:8000>.

## Personnaliser le contenu

Tous les contenus à compléter sont marqués **`[À COMPLÉTER]`** (ou `VOTRE-PROFIL`,
`Prénom Nom`, `votre.email@exemple.com`) et s'affichent en jaune sur le site.

1. **`index.html`** : nom, liens GitHub / LinkedIn, e-mail, texte « À propos », dates du parcours.
2. **`js/data/projects-data.js`** : remplacer les projets d'exemple par vos vrais projets
   (supprimer `example: true`).
3. **`assets/cv/CV.pdf`** : ajouter votre CV.
4. *(Optionnel)* **photo** : ajouter `assets/images/profile.webp` et suivre le commentaire
   dans la section « À propos » de `index.html`.
5. *(Optionnel)* **couleurs** : modifier `css/variables.css`.

Pour retrouver rapidement tous les éléments à compléter :

```bash
grep -rn "À COMPLÉTER\|VOTRE-PROFIL\|Prénom Nom\|votre.email" --include=*.html --include=*.js .
```

## Mise en ligne avec GitHub Pages

1. Pousser le projet sur GitHub.
2. Dans le dépôt : **Settings → Pages**.
3. Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`.
4. Le site sera disponible à l'adresse `https://<utilisateur>.github.io/<depot>/`.
