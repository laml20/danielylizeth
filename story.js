// Our Story page (historia.html). Reuses i18n.js for copy + the shared
// language toggle; nothing else from the main script.js is needed here.
(function () {
  'use strict';

  window.i18n.applyLang(window.i18n.detectDefaultLang());

  document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.i18n.markToggled();
      window.i18n.applyLang(btn.getAttribute('data-lang-btn'));
    });
  });
})();
