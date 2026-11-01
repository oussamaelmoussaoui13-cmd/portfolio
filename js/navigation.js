/* ==========================================================
   NAVIGATION — barre au défilement, menu mobile, lien actif,
   bouton « retour en haut »
   ========================================================== */
(function () {
  "use strict";

  function initNavigation() {
    var header = document.getElementById("header");
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    var backToTop = document.getElementById("back-to-top");
    var links = menu.querySelectorAll(".nav__link");

    /* ----- Barre de navigation et bouton retour en haut au scroll ----- */
    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 20);
      backToTop.classList.toggle("is-visible", y > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ----- Menu mobile ----- */
    function openMenu() {
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fermer le menu");
      document.body.classList.add("no-scroll");
    }

    function closeMenu() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Ouvrir le menu");
      document.body.classList.remove("no-scroll");
    }

    toggle.addEventListener("click", function () {
      if (menu.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    links.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });

    // Referme le menu si on repasse en affichage ordinateur
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860 && menu.classList.contains("is-open")) {
        closeMenu();
      }
    });

    /* ----- Lien actif selon la section visible ----- */
    if (!("IntersectionObserver" in window)) return;

    var linkById = {};
    links.forEach(function (link) {
      linkById[link.getAttribute("href").slice(1)] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (l) {
            l.classList.remove("is-active");
            l.removeAttribute("aria-current");
          });
          var active = linkById[entry.target.id];
          if (active) {
            active.classList.add("is-active");
            active.setAttribute("aria-current", "true");
          }
        });
      },
      // Une section est « active » quand elle traverse le milieu de l'écran
      { rootMargin: "-45% 0px -50% 0px" }
    );

    document.querySelectorAll("main section[id]").forEach(function (section) {
      observer.observe(section);
    });
  }

  window.Portfolio = window.Portfolio || {};
  window.Portfolio.initNavigation = initNavigation;
})();
