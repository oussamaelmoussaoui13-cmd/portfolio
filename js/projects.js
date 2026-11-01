/* ==========================================================
   PROJETS — génération des cartes, filtres, fenêtre de détail
   Les données viennent de js/data/projects-data.js
   ========================================================== */
(function () {
  "use strict";

  var ICON_GITHUB =
    '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>';
  var ICON_EXTERNAL =
    '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var projects = [];
  var grid, filtersEl, modal, modalBody;
  var lastFocused = null;

  /* ---------- Utilitaires ---------- */

  // Échappe le texte pour l'insérer sans risque dans le HTML
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Image du projet, ou visuel générique si aucune image n'est fournie
  function mediaHTML(project, cls) {
    if (project.image) {
      return '<img src="' + esc(project.image) + '" alt="Aperçu du projet ' + esc(project.title) +
        '" loading="lazy" width="640" height="360">';
    }
    return '<span class="' + cls + '" aria-hidden="true">&lt;/&gt;</span>';
  }

  function badgesHTML(techs, small) {
    return (techs || [])
      .map(function (t) {
        return '<li class="badge' + (small ? " badge--small" : "") + '">' + esc(t) + "</li>";
      })
      .join("");
  }

  function linksHTML(project, asButtons) {
    var html = "";
    if (project.github) {
      html += '<a class="' + (asButtons ? "btn btn--outline" : "project-link") + '" href="' + esc(project.github) +
        '" target="_blank" rel="noopener noreferrer">' + ICON_GITHUB + " Code source</a>";
    }
    if (project.demo) {
      html += '<a class="' + (asButtons ? "btn btn--primary" : "project-link") + '" href="' + esc(project.demo) +
        '" target="_blank" rel="noopener noreferrer">' + ICON_EXTERNAL + " Démo</a>";
    }
    return html;
  }

  /* ---------- Cartes ---------- */

  function cardHTML(project, index) {
    var links = linksHTML(project, false);
    return (
      '<article class="project-card reveal" data-index="' + index + '">' +
        '<div class="project-card__media">' +
          mediaHTML(project, "project-card__placeholder") +
          (project.context ? '<span class="project-card__tag">' + esc(project.context) + "</span>" : "") +
          (project.example ? '<span class="project-card__tag project-card__tag--example">Exemple</span>' : "") +
        "</div>" +
        '<div class="project-card__body">' +
          '<h3 class="project-card__title"><button type="button" data-open="' + index + '">' + esc(project.title) + "</button></h3>" +
          '<p class="project-card__desc">' + esc(project.description) + "</p>" +
          '<ul class="badges" aria-label="Technologies">' + badgesHTML(project.technologies, true) + "</ul>" +
          (links ? '<div class="project-card__links">' + links + "</div>" : "") +
        "</div>" +
      "</article>"
    );
  }

  function renderCards() {
    if (!projects.length) {
      grid.innerHTML = '<p class="projects__empty">Les projets seront bientôt ajoutés.</p>';
      return;
    }
    grid.innerHTML = projects.map(cardHTML).join("");
  }

  /* ---------- Filtres ---------- */

  function renderFilters() {
    var techs = [];
    projects.forEach(function (p) {
      (p.technologies || []).forEach(function (t) {
        if (techs.indexOf(t) === -1) techs.push(t);
      });
    });

    if (techs.length < 2) {
      filtersEl.hidden = true;
      return;
    }

    var buttons = ['<button type="button" class="filter-btn is-active" data-filter="all" aria-pressed="true">Tous</button>'];
    techs.forEach(function (t) {
      buttons.push('<button type="button" class="filter-btn" data-filter="' + esc(t) + '" aria-pressed="false">' + esc(t) + "</button>");
    });
    filtersEl.innerHTML = buttons.join("");

    filtersEl.addEventListener("click", function (event) {
      var btn = event.target.closest(".filter-btn");
      if (!btn) return;
      applyFilter(btn.getAttribute("data-filter"));

      filtersEl.querySelectorAll(".filter-btn").forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
    });
  }

  function applyFilter(filter) {
    grid.querySelectorAll(".project-card").forEach(function (card) {
      var project = projects[Number(card.getAttribute("data-index"))];
      var show = filter === "all" || (project.technologies || []).indexOf(filter) !== -1;
      card.classList.toggle("is-hidden", !show);
      if (show) card.classList.add("is-visible");
    });
  }

  /* ---------- Fenêtre de détail ---------- */

  function modalHTML(p) {
    var html = '<div class="modal__media">' + mediaHTML(p, "") + "</div>";
    html += '<div class="modal__content">';

    var meta = [p.context, p.date].filter(Boolean).map(esc).join(" · ");
    if (meta) html += '<p class="modal__context">' + meta + "</p>";

    html += '<h3 class="modal__title" id="modal-title">' + esc(p.title) + "</h3>";
    html += '<ul class="badges">' + badgesHTML(p.technologies, false) + "</ul>";

    html += "<h4>Présentation</h4><p>" + esc(p.details || p.description) + "</p>";

    if (p.role) html += "<h4>Mon rôle</h4><p>" + esc(p.role) + "</p>";

    if (p.features && p.features.length) {
      html += '<h4>Fonctionnalités</h4><ul class="modal__list">' +
        p.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") +
        "</ul>";
    }

    if (p.challenges) html += "<h4>Difficultés &amp; apprentissages</h4><p>" + esc(p.challenges) + "</p>";

    if (p.gallery && p.gallery.length) {
      html += '<h4>Captures</h4><div class="modal__gallery">' +
        p.gallery.map(function (src, i) {
          return '<img src="' + esc(src) + '" alt="Capture ' + (i + 1) + " du projet " + esc(p.title) + '" loading="lazy">';
        }).join("") +
        "</div>";
    }

    var links = linksHTML(p, true);
    if (links) html += '<div class="modal__links">' + links + "</div>";

    html += "</div>";
    return html;
  }

  function openModal(index) {
    var project = projects[index];
    if (!project) return;

    lastFocused = document.activeElement;
    modalBody.innerHTML = modalHTML(project);
    modal.hidden = false;
    modalBody.scrollTop = 0;
    document.body.classList.add("no-scroll");
    modal.querySelector(".modal__close").focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocused) lastFocused.focus();
  }

  // Garde le focus clavier à l'intérieur de la modale
  function trapFocus(event) {
    if (event.key !== "Tab" || modal.hidden) return;
    var focusables = modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ---------- Initialisation ---------- */

  function initProjects() {
    grid = document.getElementById("projects-grid");
    filtersEl = document.getElementById("project-filters");
    modal = document.getElementById("project-modal");
    modalBody = document.getElementById("modal-body");
    projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

    renderCards();
    renderFilters();

    // Ouvre la modale au clic sur une carte (sauf sur les liens)
    grid.addEventListener("click", function (event) {
      if (event.target.closest("a")) return;
      var card = event.target.closest(".project-card");
      if (card) openModal(Number(card.getAttribute("data-index")));
    });

    modal.addEventListener("click", function (event) {
      if (event.target.closest("[data-close-modal]")) closeModal();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
      trapFocus(event);
    });
  }

  window.Portfolio = window.Portfolio || {};
  window.Portfolio.initProjects = initProjects;
})();
