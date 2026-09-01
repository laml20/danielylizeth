(function () {
  'use strict';

  var RSVP_EMAIL = 'lizethml2002@gmail.com';

  // RSVP submissions are POSTed here as form data. Paste the deployed
  // Google Apps Script Web App URL (…/exec) that appends a row to your
  // spreadsheet. While this is empty the form falls back to opening a
  // pre-filled email to RSVP_EMAIL.
  var RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzW-ACbqM9Ft1zdTFr9Qsrwb9rXeZfyk1nVR9EG9N6Fs5w5zVQwBukaMcRMrQQSoAKh_w/exec';
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

  /* ---------------- Envelope open ---------------- */
  var envelopeScreen = document.getElementById('envelope-screen');
  var invitationScreen = document.getElementById('invitation-screen');
  var envelopeBtn = document.getElementById('envelope-btn');
  var headerControls = document.getElementById('main-header-controls');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var opened = false;

  if (!reduceMotion) {
    var shimmyInterval = setInterval(function () {
      if (opened) {
        clearInterval(shimmyInterval);
        return;
      }
      envelopeBtn.classList.add('shimmy');
    }, 4500);
    envelopeBtn.addEventListener('animationend', function (e) {
      if (e.animationName === 'shimmy') envelopeBtn.classList.remove('shimmy');
    });
  }

  function openInvitation() {
    if (opened) return;
    opened = true;

    invitationScreen.classList.add('is-open');
    envelopeScreen.classList.add('is-hidden');
    document.body.style.overflow = '';

    try { history.pushState({ invite: true }, '', '#invitacion'); } catch (e) {}

    headerControls.hidden = false;
    startCountdown();
  }

  // On a fresh load — including a refresh made while the invitation was open —
  // start at the top on the envelope screen. Otherwise the browser can restore
  // a large scroll offset into the now-hidden invitation screen while body
  // scrolling is locked, leaving a blank, unscrollable page.
  if ('scrollRestoration' in history) {
    try { history.scrollRestoration = 'manual'; } catch (e) {}
  }
  window.scrollTo(0, 0);
  if (window.location.hash === '#invitacion') {
    try {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (e) {}
  }

  document.body.style.overflow = 'hidden';
  envelopeBtn.addEventListener('click', function () {
    document.body.style.overflow = '';
    openInvitation();
  });

  window.addEventListener('popstate', function () {
    if (!opened) openInvitation();
  });

  /* ---------------- Hard pull at the top/bottom → back to landing ---------------- */
  // Resets in place (no reload) so it works the same regardless of how a
  // given browser handles reload/back-forward-cache behavior.
  function returnToLanding() {
    if (!opened) return;
    opened = false;

    invitationScreen.classList.remove('is-open');
    envelopeScreen.classList.remove('is-hidden');
    envelopeBtn.classList.remove('is-pressed');
    headerControls.hidden = true;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    try {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (e) {}

    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }

    if (!reduceMotion) {
      clearInterval(shimmyInterval);
      shimmyInterval = setInterval(function () {
        if (opened) {
          clearInterval(shimmyInterval);
          return;
        }
        envelopeBtn.classList.add('shimmy');
      }, 4500);
    }
  }

  // Some browsers (notably iOS Safari) restore the exact in-memory page
  // state on refresh instead of re-running this script, which would leave
  // a reload sitting on the invitation screen instead of the envelope.
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) returnToLanding();
  });

  function isAtTop() { return window.scrollY <= 0; }

  // Pulling past the very top of the page (not the bottom) closes back to the
  // envelope — but only on a deliberate, long pull, not an ordinary fast
  // scroll/flick that happens to register a big single delta or distance.
  var pullAccum = 0;
  window.addEventListener('wheel', function (e) {
    if (!opened) return;
    if (isAtTop() && e.deltaY < 0) {
      pullAccum += -e.deltaY;
    } else {
      pullAccum = 0;
      return;
    }
    if (pullAccum > 420) { pullAccum = 0; returnToLanding(); }
  }, { passive: true });

  var pullTouchStart = null;
  window.addEventListener('touchstart', function (e) {
    pullTouchStart = isAtTop() ? { y: e.touches[0].clientY } : null;
  }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    if (!opened || pullTouchStart === null) return;
    if (!isAtTop()) { pullTouchStart = null; return; }
    var dy = e.touches[0].clientY - pullTouchStart.y;
    if (dy > 220) {
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
      setAdults(1);
      setChildren(0);
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

  /* ----- Guest count steppers (adults + children) ----- */
  var STEPPER_MAX = 10;

  function makeStepper(prefix, min) {
    var input = document.getElementById('rsvp-' + prefix);
    var minusBtn = document.getElementById('rsvp-' + prefix + '-minus');
    var plusBtn = document.getElementById('rsvp-' + prefix + '-plus');

    function clamp(n) {
      n = parseInt(n, 10);
      if (isNaN(n)) n = min;
      return Math.min(STEPPER_MAX, Math.max(min, n));
    }
    function set(n) {
      var v = clamp(n);
      input.value = v;
      minusBtn.disabled = v <= min;
      plusBtn.disabled = v >= STEPPER_MAX;
    }
    minusBtn.addEventListener('click', function () { set(Number(input.value) - 1); });
    plusBtn.addEventListener('click', function () { set(Number(input.value) + 1); });
    set(input.value);

    return set;
  }

  var setAdults = makeStepper('adults', 1);
  var setChildren = makeStepper('children', 0);

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
    var adults = attending === 'yes' ? String(document.getElementById('rsvp-adults').value) : '';
    var children = attending === 'yes' ? String(document.getElementById('rsvp-children').value) : '';
    var message = document.getElementById('rsvp-message').value.trim();

    if (!name) return;

    submitBtn.disabled = true;
    submitBtn.textContent = window.i18n.translate('sendingButton', curLang);

    if (RSVP_ENDPOINT) {
      var payload = new FormData();
      payload.append('name', name);
      payload.append('attending', attending);
      payload.append('adults', adults);
      payload.append('children', children);
      payload.append('message', message);
      payload.append('lang', curLang);
      payload.append('submittedAt', new Date().toISOString());

      // no-cors: Apps Script Web Apps don't sensd CORS headers on the final
      // (redirected) response, so a normal fetch would reject even though the
      // row was written. The response is opaque and unreadable, which is fine
      // here — we only need to know the POST left the browser.
      fetch(RSVP_ENDPOINT, { method: 'POST', body: payload, mode: 'no-cors' })
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
           attending === 'yes' ? 'Adults: ' + adults : null,
           attending === 'yes' ? 'Children: ' + children : null,
           message ? 'Message: ' + message : null]
        : ['Nombre: ' + name,
           'Asistirá: ' + (attending === 'yes' ? 'Sí' : 'No'),
           attending === 'yes' ? 'Adultos: ' + adults : null,
           attending === 'yes' ? 'Niños: ' + children : null,
           message ? 'Mensaje: ' + message : null];
      var body = bodyLines.filter(Boolean).join('\n');
      window.location.href = 'mailto:' + RSVP_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      showSuccess();
    }
  });
})();
