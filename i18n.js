// All copy lives here, keyed by language. Elements with data-i18n="key" get
// their textContent replaced; data-i18n-html="key" allows a line break;
// data-i18n-aria="key" sets aria-label; data-i18n-placeholder="key" sets
// the placeholder attribute. See applyLang().
(function () {
  var STORAGE_KEY = 'wedding-lang';
  var STORAGE_TOGGLED_KEY = 'wedding-lang-toggled';

  var translations = {
    es: {
      eyebrowWedding: 'Nuestra Boda',
      coupleNames: 'Daniel y Lizeth',
      weddingDate: '19 de Septiembre del 2026',
      weddingLocation: 'Los Ángeles, California',

      countdownDays: 'Días',
      countdownHours: 'Horas',
      countdownMinutes: 'Minutos',
      countdownSeconds: 'Segundos',
      countdownToday: '¡Hoy es el día!',
      countdownPast: 'Gracias por celebrar con nosotros',

      verseQuote: '“Coloca aquí tu versículo bíblico”',
      verseRef: '— Referencia',

      blessingIntro: 'Con la bendición de Dios y de nuestros padres,',
      parents1: 'Efren Plascencia Reyes y Maricela Segura Picazo',
      parentsAnd: 'y',
      parents2: 'José Arturo Mendoza Milán y María de Jesús Loredo Guerrero',
      inviteLine1: 'Tenemos el honor de invitarte a',
      inviteLine2: 'celebrar nuestra boda',
      signatureNames: 'Daniel y Lizeth',

      misaHeading: 'Misa',
      misaVenue: 'St. Anne Church & Shrine',
      misaAddress: '2011 Colorado Ave<br>Santa Monica, CA 90404',
      misaTime: '1:00 PM',
      mapButton: 'Ver ubicación',

      cenaHeading: 'Cena',
      cenaTBA: 'Por anunciarse',

      vestimentaHeading: 'Vestimenta',
      vestimentaBody: 'Los invitamos a usar los colores café, verde, vino, rosa, crema, o similares el día de la boda.',

      rsvpHeading: 'Reservación',
      rsvpBody: 'Esperamos que nos puedan acompañar en este día tan grande en nuestras vidas. Por favor confirmen para asegurar su asiento, o si saben que no podrán asistir, por favor déjenos saber lo más antes posible.',
      rsvpButton: 'Confirmar Asistencia',

      closingBody: 'Gracias por acompañarnos y por ser parte de este momento tan importante de nuestras vidas.',
      closingSignoff: 'Con mucho cariño,',

      langAria: 'Idioma',

      modalHeading: 'Confirmar Asistencia',
      modalClose: 'Cerrar',
      labelName: 'Nombre completo',
      placeholderName: 'Tu nombre',
      labelAttending: '¿Podrás acompañarnos?',
      optionYes: 'Sí, ahí estaré',
      optionNo: 'No podré asistir',
      labelGuests: 'Número de acompañantes (incluyéndote)',
      labelMessage: 'Mensaje para los novios (opcional)',
      placeholderMessage: 'Escribe un mensaje...',
      submitButton: 'Enviar Confirmación',
      requiredNote: 'Tu confirmación se envía directamente a los novios.',
      sendingButton: 'Enviando…',
      errorBody: 'No pudimos enviar tu confirmación. Revisa tu conexión e inténtalo de nuevo.',

      successHeading: '¡Gracias!',
      successBody: 'Hemos recibido tu confirmación. ¡Nos vemos pronto!'
    },
    en: {
      eyebrowWedding: 'Our Wedding',
      coupleNames: 'Daniel & Lizeth',
      weddingDate: 'September 19, 2026',
      weddingLocation: 'Los Angeles, California',

      countdownDays: 'Days',
      countdownHours: 'Hours',
      countdownMinutes: 'Minutes',
      countdownSeconds: 'Seconds',
      countdownToday: "Today's the day!",
      countdownPast: 'Thank you for celebrating with us',

      verseQuote: '"Place your Bible verse here"',
      verseRef: '— Reference',

      blessingIntro: 'With the blessing of God and our parents,',
      parents1: 'Efren Plascencia Reyes and Maricela Segura Picazo',
      parentsAnd: 'and',
      parents2: 'José Arturo Mendoza Milán and María de Jesús Loredo Guerrero',
      inviteLine1: 'We are honored to invite you to',
      inviteLine2: 'celebrate our wedding',
      signatureNames: 'Daniel & Lizeth',

      misaHeading: 'Ceremony',
      misaVenue: 'St. Anne Church & Shrine',
      misaAddress: '2011 Colorado Ave<br>Santa Monica, CA 90404',
      misaTime: '1:00 PM',
      mapButton: 'View location',

      cenaHeading: 'Reception',
      cenaTBA: 'To be announced',

      vestimentaHeading: 'Attire',
      vestimentaBody: 'We invite you to wear shades of brown, green, wine, pink, cream, or similar on the day of the wedding.',

      rsvpHeading: 'RSVP',
      rsvpBody: "We hope you can join us on this big day in our lives. Please confirm to secure your seat, or if you know you can't attend, please let us know as soon as possible.",
      rsvpButton: 'Confirm Attendance',

      closingBody: 'Thank you for joining us and being part of this important moment in our lives.',
      closingSignoff: 'With much love,',

      langAria: 'Language',

      modalHeading: 'Confirm Attendance',
      modalClose: 'Close',
      labelName: 'Full name',
      placeholderName: 'Your name',
      labelAttending: 'Will you be able to join us?',
      optionYes: "Yes, I'll be there",
      optionNo: "I won't be able to attend",
      labelGuests: 'Number of guests (including you)',
      labelMessage: 'Message for the couple (optional)',
      placeholderMessage: 'Write a message...',
      submitButton: 'Send RSVP',
      requiredNote: 'Your RSVP is sent straight to the couple.',
      sendingButton: 'Sending…',
      errorBody: "We couldn't send your RSVP. Check your connection and try again.",

      successHeading: 'Thank you!',
      successBody: "We've got your RSVP. See you soon!"
    }
  };

  function detectDefaultLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && translations[stored]) return stored;
    } catch (e) {}
    var nav = (navigator.language || 'es').toLowerCase();
    return nav.indexOf('en') === 0 ? 'en' : 'es';
  }

  function translate(key, lang) {
    var dict = translations[lang] || translations.es;
    return dict[key] || translations.es[key] || '';
  }

  function applyLang(lang) {
    if (!translations[lang]) lang = 'es';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = translate(el.getAttribute('data-i18n'), lang);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = translate(el.getAttribute('data-i18n-html'), lang);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', translate(el.getAttribute('data-i18n-aria'), lang));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', translate(el.getAttribute('data-i18n-placeholder'), lang));
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang-btn') === lang);
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function markToggled() {
    try {
      localStorage.setItem(STORAGE_TOGGLED_KEY, '1');
    } catch (e) {}
  }

  window.i18n = {
    translations: translations,
    detectDefaultLang: detectDefaultLang,
    applyLang: applyLang,
    translate: translate,
    markToggled: markToggled
  };
})();
