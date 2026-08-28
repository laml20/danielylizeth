(function () {
  'use strict';

  var RSVP_EMAIL = 'lizethml2002@gmail.com';

  // RSVP submissions are POSTed here as form data. Paste the deployed
  // Google Apps Script Web App URL (…/exec) that appends a row to your
  // spreadsheet. While this is empty the form falls back to opening a
  // pre-filled email to RSVP_EMAIL.
  var RSVP_ENDPOINT = '';
  // Ceremony start, anchored to Los Angeles time (PDT, UTC-7 in September) so
  // every guest sees the same countdown regardless of their own timezone.
  var WEDDING_START = new Date('2026-09-19T13:00:00-07:00');
  var DAY_END = new Date('2026-09-20T00:00:00-07:00');

  var lang = window.i18n.detectDefaultLang();
  window.i18n.applyLang(lang);

  document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.i18n.markToggled();
      window.i18n.applyLang(btn.getAttribute('data-lang-btn'));
    });
  });

  /* ---------------- Envelope open + sparkle/wipe transition ---------------- */
  var envelopeScreen = document.getElementById('envelope-screen');
  var invitationScreen = document.getElementById('invitation-screen');
  var envelopeBtn = document.getElementById('envelope-btn');
  var headerControls = document.getElementById('main-header-controls');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var opened = false;

  // The wax seal is baked into envelope.png, not a separate element — its
  // center sits at roughly (51%, 53%) of the envelope image itself.
  function originFromSeal() {
    var rect = envelopeBtn.getBoundingClientRect();
    var x = ((rect.left + rect.width * 0.51) / window.innerWidth) * 100;
    var y = ((rect.top + rect.height * 0.53) / window.innerHeight) * 100;
    return { x: x + '%', y: y + '%' };
  }

  if (!reduceMotion) {
    setTimeout(function () {
      if (!opened) envelopeBtn.classList.add('shimmy');
    }, 2000);
  }

  function spawnSparkles(origin) {
    var layer = document.createElement('div');
    layer.className = 'sparkle-layer';
    var count = reduceMotion ? 0 : 32;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('span');
      s.className = 'sparkle';
      s.style.setProperty('--ox', origin.x);
      s.style.setProperty('--oy', origin.y);
      s.style.setProperty('--angle', Math.round(Math.random() * 360) + 'deg');
      s.style.setProperty('--dist', (30 + Math.random() * 40) + 'vmax');
      s.style.setProperty('--delay', Math.round(Math.random() * 300) + 'ms');
      layer.appendChild(s);
    }
    document.body.appendChild(layer);
    setTimeout(function () { layer.remove(); }, 1700);
  }

  function openInvitation() {
    if (opened) return;
    opened = true;

    var origin = originFromSeal();
    invitationScreen.style.setProperty('--ox', origin.x);
    invitationScreen.style.setProperty('--oy', origin.y);

    envelopeBtn.classList.add('is-pressed');
    spawnSparkles(origin);

    invitationScreen.classList.add('is-open');
    // Force layout so the clip-path starts at 0% before animating.
    void invitationScreen.offsetWidth;
    invitationScreen.classList.add('is-wiping');

    envelopeScreen.classList.add('is-leaving');

    try { history.pushState({ invite: true }, '', '#invitacion'); } catch (e) {}

    headerControls.hidden = false;

    setTimeout(function () {
      envelopeScreen.classList.add('is-hidden');
      document.body.style.overflow = '';
      startCountdown();
      initScrollReveal();
    }, reduceMotion ? 420 : 1150);
  }

  document.body.style.overflow = 'hidden';
  envelopeBtn.addEventListener('click', function () {
    document.body.style.overflow = '';
    openInvitation();
  });

  window.addEventListener('popstate', function () {
    if (!opened) openInvitation();
  });

  /* ---------------- Hard pull / scroll up at the top → back to landing ---------------- */
  function returnToLanding() {
    if (!opened) return;
    // Reload without the hash so the envelope screen shows fresh.
    window.location.replace(window.location.pathname + window.location.search);
  }

  var pullAccum = 0;
  window.addEventListener('wheel', function (e) {
    if (!opened) return;
    if (window.scrollY <= 0 && e.deltaY < 0) {
      pullAccum += -e.deltaY;
      if (pullAccum > 260) { pullAccum = 0; returnToLanding(); }
    } else {
      pullAccum = 0;
    }
  }, { passive: true });

  var pullTouchStart = null;
  window.addEventListener('touchstart', function (e) {
    pullTouchStart = window.scrollY <= 0 ? e.touches[0].clientY : null;
  }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    if (!opened || pullTouchStart === null) return;
    if (window.scrollY <= 0 && e.touches[0].clientY - pullTouchStart > 150) {
      pullTouchStart = null;
      returnToLanding();
    }
  }, { passive: true });
  window.addEventListener('touchend', function () { pullTouchStart = null; }, { passive: true });

  /* ---------------- Countdown ---------------- */
  var cdDays = document.getElementById('cd-days');
  var cdHours = document.getElementById('cd-hours');
  var cdMinutes = document.getElementById('cd-minutes');
  var cdSeconds = document.getElementById('cd-seconds');
  var cdRow = document.querySelector('.countdown__row');
  var cdMessage = document.getElementById('countdown-message');
  var countdownTimer = null;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var now = Date.now();
    if (now < WEDDING_START.getTime()) {
      var diff = WEDDING_START.getTime() - now;
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var minutes = Math.floor((diff % 3600000) / 60000);
      var seconds = Math.floor((diff % 60000) / 1000);
      cdDays.textContent = days;
      cdHours.textContent = pad(hours);
      cdMinutes.textContent = pad(minutes);
      cdSeconds.textContent = pad(seconds);
      cdRow.hidden = false;
      cdMessage.hidden = true;
    } else if (now < DAY_END.getTime()) {
      showMessage('countdownToday');
    } else {
      showMessage('countdownPast');
      clearInterval(countdownTimer);
    }
  }

  function showMessage(key) {
    cdRow.hidden = true;
    cdMessage.hidden = false;
    cdMessage.textContent = window.i18n.translate(key, document.documentElement.lang);
  }

  document.addEventListener('langchange', function () {
    if (!cdRow.hidden) return;
    var key = Date.now() < DAY_END.getTime() ? 'countdownToday' : 'countdownPast';
    if (Date.now() >= WEDDING_START.getTime()) showMessage(key);
  });

  function startCountdown() {
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  /* ---------------- Scroll reveal ---------------- */
  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------- RSVP modal ---------------- */
  var modal = document.getElementById('rsvp-modal');
  var openBtn = document.getElementById('rsvp-open-btn');
  var closeBtn = document.getElementById('rsvp-close');
  var form = document.getElementById('rsvp-form');
  var successPanel = document.getElementById('rsvp-success');
  var guestsField = document.getElementById('rsvp-guests-field');
  var lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    var nameInput = document.getElementById('rsvp-name');
    setTimeout(function () { nameInput.focus(); }, 50);
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
    setTimeout(function () {
      form.hidden = false;
      form.reset();
      guestsField.style.display = '';
      successPanel.hidden = true;
      var errPanel = document.getElementById('rsvp-error');
      if (errPanel) errPanel.hidden = true;
      var subBtn = form.querySelector('.modal__primary-btn');
      subBtn.disabled = false;
      subBtn.textContent = window.i18n.translate('submitButton', document.documentElement.lang);
      setGuests(1);
    }, 300);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  form.querySelectorAll('input[name="attending"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      guestsField.style.display = radio.value === 'no' && radio.checked ? 'none' : '';
    });
  });

  /* ----- Guest count stepper ----- */
  var guestsInput = document.getElementById('rsvp-guests');
  var guestsMinus = document.getElementById('rsvp-guests-minus');
  var guestsPlus = document.getElementById('rsvp-guests-plus');
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;

  function clampGuests(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) n = GUESTS_MIN;
    return Math.min(GUESTS_MAX, Math.max(GUESTS_MIN, n));
  }
  function setGuests(n) {
    var v = clampGuests(n);
    guestsInput.value = v;
    guestsMinus.disabled = v <= GUESTS_MIN;
    guestsPlus.disabled = v >= GUESTS_MAX;
  }
  guestsMinus.addEventListener('click', function () { setGuests(guestsInput.value - 1); });
  guestsPlus.addEventListener('click', function () { setGuests(Number(guestsInput.value) + 1); });
  setGuests(guestsInput.value);

  /* ----- Submit ----- */
  var submitBtn = form.querySelector('.modal__primary-btn');
  var errorPanel = document.getElementById('rsvp-error');

  function showSuccess() {
    form.hidden = true;
    if (errorPanel) errorPanel.hidden = true;
    successPanel.hidden = false;
  }

  function showError() {
    var curLang = document.documentElement.lang;
    submitBtn.disabled = false;
    submitBtn.textContent = window.i18n.translate('submitButton', curLang);
    if (errorPanel) {
      errorPanel.textContent = window.i18n.translate('errorBody', curLang);
      errorPanel.hidden = false;
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var curLang = document.documentElement.lang;
    var name = document.getElementById('rsvp-name').value.trim();
    var attending = form.querySelector('input[name="attending"]:checked').value;
    var guests = attending === 'yes' ? String(clampGuests(guestsInput.value)) : '';
    var message = document.getElementById('rsvp-message').value.trim();

    if (!name) return;

    submitBtn.disabled = true;
    submitBtn.textContent = window.i18n.translate('sendingButton', curLang);

    if (RSVP_ENDPOINT) {
      var payload = new FormData();
      payload.append('name', name);
      payload.append('attending', attending);
      payload.append('guests', guests);
      payload.append('message', message);
      payload.append('lang', curLang);
      payload.append('submittedAt', new Date().toISOString());

      fetch(RSVP_ENDPOINT, { method: 'POST', body: payload })
        .then(function () { showSuccess(); })
        .catch(function () { showError(); });
    } else {
      // No endpoint configured yet — fall back to a pre-filled email.
      var subject = curLang === 'en'
        ? 'RSVP — Daniel & Lizeth — ' + name
        : 'Confirmación — Daniel y Lizeth — ' + name;
      var bodyLines = curLang === 'en'
        ? ['Name: ' + name,
           'Attending: ' + (attending === 'yes' ? 'Yes' : 'No'),
           attending === 'yes' ? 'Guests: ' + guests : null,
           message ? 'Message: ' + message : null]
        : ['Nombre: ' + name,
           'Asistirá: ' + (attending === 'yes' ? 'Sí' : 'No'),
           attending === 'yes' ? 'Acompañantes: ' + guests : null,
           message ? 'Mensaje: ' + message : null];
      var body = bodyLines.filter(Boolean).join('\n');
      window.location.href = 'mailto:' + RSVP_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      showSuccess();
    }
  });
})();
