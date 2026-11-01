/* ==========================================================
   DONNÉES DES PROJETS
   ----------------------------------------------------------
   C'est le SEUL fichier à modifier pour ajouter un projet.

   Champs disponibles :
   - title        (obligatoire) Titre du projet
   - context      Ex. : "Projet de formation", "Projet personnel"
   - date         Ex. : "2025"
   - description  (obligatoire) Description courte affichée sur la carte
   - details      Description longue affichée dans la fenêtre de détail
   - role         Votre rôle dans le projet
   - features     Liste des fonctionnalités principales
   - challenges   Difficultés rencontrées / ce que vous avez appris
   - technologies (obligatoire) Liste des technologies — sert aussi aux filtres
   - image        Chemin de l'image principale (ex. "assets/images/projects/mon-projet.webp")
   - gallery      Liste de captures supplémentaires
   - github       Lien vers le code source
   - demo         Lien vers une démo en ligne (laisser vide s'il n'y en a pas)
   - aiAssisted   true = affiche le badge « Assisté par IA » et le bloc explicatif
   - example      true = projet d'exemple (badge jaune)
   ========================================================== */

window.PROJECTS = [
  {
    title: "Gestion de parking",
    context: "",
    date: "",
    description:
      "Application web de gestion d'un parking : suivi des véhicules stationnés, calcul automatique du montant à payer selon la durée et la catégorie, et état du parking en temps réel.",
    details:
      "Application web en PHP connectée à une base de données. La page principale liste les véhicules actuellement stationnés en croisant trois tables (stationnements, véhicules et catégories), calcule pour chacun la durée de stationnement et le montant dû selon le tarif horaire de sa catégorie, et permet d'enregistrer les entrées et les sorties.",
    role:
      "Conception du projet et pilotage complet du développement : définition des fonctionnalités et de la structure de la base de données, guidage de l'IA, relecture et validation de chaque partie du code.",
    features: [
      "Tableau des véhicules stationnés : place, immatriculation, marque, catégorie, couleur, heure d'arrivée",
      "Calcul de la durée de stationnement et du montant à payer selon le tarif horaire de la catégorie",
      "Enregistrement des entrées et des sorties de véhicules",
      "Info-bulle « état du parking » : places occupées et libres, sorties du jour, montant encaissé dans la journée",
      "Requêtes SQL avec jointures et requêtes préparées (PDO)",
      "Échappement des données affichées pour se protéger des injections HTML (XSS)"
    ],
    challenges: "",
    technologies: ["PHP", "SQL", "PDO", "HTML"],
    image: "",
    gallery: [],
    github: "",
    demo: "",
    aiAssisted: true
  },
  {
    title: "Calculatrice",
    context: "",
    date: "",
    description:
      "Calculatrice de bureau en Java Swing avec interface personnalisée, opérations avancées (puissance, racine carrée, pourcentage), saisie au clavier et gestion des erreurs.",
    details:
      "Application de bureau développée en Java avec la bibliothèque Swing. La fenêtre possède sa propre barre de titre (déplaçable, avec boutons réduire et fermer) et un écran à deux lignes affichant l'opération en cours et le résultat. Les calculs sont isolés dans des méthodes dédiées et les cas d'erreur sont gérés par des exceptions.",
    role:
      "Conception de l'application et pilotage complet du développement : définition des fonctionnalités et de l'interface, guidage de l'IA, relecture et validation du code.",
    features: [
      "Opérations : addition, soustraction, multiplication, division, puissance, racine carrée, pourcentage, changement de signe",
      "Enchaînement des opérations et affichage de l'expression en cours",
      "Saisie au clavier (chiffres, opérateurs, Entrée pour valider, Échap pour effacer)",
      "Gestion des erreurs : division par zéro, racine d'un nombre négatif, résultat trop grand, saisie invalide",
      "Affichage en notation scientifique pour les très grands et très petits nombres",
      "Fenêtre sans bordure système avec barre de titre personnalisée et déplaçable"
    ],
    challenges: "",
    technologies: ["Java", "Swing"],
    image: "",
    gallery: [],
    github: "",
    demo: "",
    aiAssisted: true
  },
  {
    title: "Devinette de nombre",
    context: "",
    date: "",
    description:
      "Jeu en Python avec interface graphique Tkinter : trouver un nombre mystère en un nombre d'essais limité, avec trois niveaux de difficulté et sauvegarde des records.",
    details:
      "Jeu de bureau développé en Python avec Tkinter. Le joueur choisit un niveau, propose des nombres et reçoit une indication (« plus grand » ou « plus petit ») jusqu'à trouver le nombre mystère ou épuiser ses essais. Le meilleur score de chaque niveau est enregistré dans un fichier texte.",
    role:
      "Conception du jeu et pilotage complet du développement : définition des règles et de l'interface, guidage de l'IA, relecture et validation du code.",
    features: [
      "Trois niveaux : Facile (1 à 20, 6 essais), Moyen (1 à 50, 7 essais), Difficile (1 à 100, 7 essais)",
      "Indications « plus grand » / « plus petit » après chaque essai",
      "Affichage des essais restants et de l'historique des propositions",
      "Vérification de la saisie (nombre valide, compris dans l'intervalle du niveau)",
      "Record par niveau sauvegardé dans un fichier et affiché à l'écran",
      "Validation possible avec la touche Entrée"
    ],
    challenges: "",
    technologies: ["Python", "Tkinter"],
    image: "",
    gallery: [],
    github: "",
    demo: "",
    aiAssisted: true
  }
];
