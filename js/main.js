/* ==========================================================
   MAIN — point d'entrée : initialise tous les modules
   ========================================================== */
(function () {
  "use strict";

  var app = window.Portfolio || {};

  /* ----- Copie de l'adresse e-mail ----- */
  var toastTimer = null;

  function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2500);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Solution de secours (ex. ouverture du fichier en local)
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (e) {
        reject(e);
      } finally {
        document.body.removeChild(area);
      }
    });
  }

  function initCopyButtons() {
    document.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var email = btn.getAttribute("data-email");
        copyText(email).then(
          function () { showToast("Adresse e-mail copiée ✓"); },
          function () { showToast("Impossible de copier : " + email); }
        );
      });
    });
  }

  /* ----- Démarrage ----- */
  document.getElementById("year").textContent = new Date().getFullYear();

  if (app.initNavigation) app.initNavigation();
  if (app.initProjects) app.initProjects();   // avant les animations : crée les cartes
  if (app.observeReveals) app.observeReveals(document);
  initCopyButtons();
})();
