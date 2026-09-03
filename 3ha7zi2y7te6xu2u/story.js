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

  /* Scroll reveal — .reveal elements fade/rise in when scrolled into view. */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  }
})();
