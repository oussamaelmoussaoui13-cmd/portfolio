/* ==========================================================
   ANIMATIONS — apparition des éléments au défilement
   ========================================================== */
(function () {
  "use strict";

  var observer = null;

  function getObserver() {
    if (observer || !("IntersectionObserver" in window)) return observer;

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // une seule fois
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    return observer;
  }

  /**
   * Observe les éléments .reveal contenus dans `root`.
   * Les éléments d'un même parent apparaissent en léger décalé.
   */
  function observeReveals(root) {
    var elements = (root || document).querySelectorAll(".reveal:not(.is-visible)");
    var obs = getObserver();

    elements.forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (child) {
        return child.classList.contains("reveal");
      });
      var index = siblings.indexOf(el);
      el.style.setProperty("--reveal-delay", Math.min(index, 6) * 0.08 + "s");

      if (obs) {
        obs.observe(el);
      } else {
        el.classList.add("is-visible"); // navigateurs très anciens
      }
    });
  }

  window.Portfolio = window.Portfolio || {};
  window.Portfolio.observeReveals = observeReveals;
})();
