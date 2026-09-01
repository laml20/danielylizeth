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

      verseQuote: '“Por eso el hombre deja a su padre y a su madre para unirse a su mujer, y pasan a ser una sola carne.”',
      verseRef: 'Genesis 2:24',

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
      vestimentaBody: 'Los invitamos a vestir tonos de verde, café, vino o rosa, o colores similares, el día de nuestra boda.',

      rsvpHeading: 'Confirma tu Asistencia',
      rsvpBody: '¡Nos encantaría contar con su presencia en este día tan especial para nosotros! Les agradecemos confirmar su asistencia lo más pronto posible para poder reservar su asiento. En caso de no poder acompañarnos, les agradecemos también nos lo hagan saber con anticipación.',
      rsvpButton: 'Confirmar Asistencia',

      closingBody: 'Gracias por acompañarnos y por ser parte de este momento tan importante de nuestras vidas.',
      closingSignoff: 'Con mucho cariño,',

      // Our Story
      storyLink: 'Nuestra Historia →',
      storyLinkAria: 'Ver nuestra historia',
      storyHeading: 'Nuestra Historia',
      storyBackLink: '← Volver a la Invitación',
      storyPara1: 'Al comienzo de nuestro segundo año de universidad, los dos asistimos por primera vez a un evento de la Sociedad de Ingenieros Hispanos Profesionales (SHPE). Después de reconocernos de la clase de historia Mexicana que habíamos tenido más temprano ese día, empezamos a platicar y terminamos caminando juntos desde el campus hasta la refresquería en Rice Village. Despues de allí, empezamos a almorzar juntos despues de clase, y nos fuimos conociendo más. Salimos a cenar algunas veces en Rice Village y comenzamos oficialmente nuestra relación en un picnic en Hermann Park.',
      storyPara2: 'Seguimos involucrados en SHPE durante el resto de la carrera, y en nuestro último año llegamos a ser presidenta (Lizeth) y tesorero (Daniel). Nos graduamos en mayo de 2025 y, después de la universidad, pasamos un año a más de mil quinientos kilómetros de distancia: Daniel regresó a casa en Los Ángeles y Lizeth se mudó a Seattle por el trabajo.',
      storyPara3: 'Después de tantas llamadas por FaceTime, citas virtuales y viajes entre Seattle y Los Ángeles, Daniel le pidió matrimonio a Lizeth en el Parque Nacional Joshua Tree, y Lizeth dijo que sí. Después de casarnos, viviremos en Seattle, donde Lizeth seguirá trabajando como ingeniera de software y Daniel estudiará una maestría en ingeniería mecánica en la Universidad de Washington.',

      langAria: 'Idioma',

      modalHeading: 'Confirmar Asistencia',
      modalClose: 'Cerrar',
      labelName: 'Nombre completo',
      placeholderName: 'Tu nombre',
      labelAttending: '¿Podrás acompañarnos?',
      optionYes: 'Sí, ahí estaré',
      optionNo: 'No podré asistir',
      labelAdults: 'Adultos',
      labelChildren: 'Niños',
      labelMessage: 'Mensaje para los novios (opcional)',
      placeholderMessage: 'Escribe un mensaje...',
      submitButton: 'Enviar Confirmación',
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

      verseQuote: '"That is why a man leaves his father and mother and clings to his wife, and the two of them become one body."',
      verseRef: 'Genesis 2:24',

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
      vestimentaBody: 'We invite you to wear shades of brown, green, burgundy, pink, or similar on the day of the wedding.',

      rsvpHeading: 'RSVP',
      rsvpBody: "We hope you can join us on this big day in our lives! Please confirm to secure your seat, or if you know you can't attend, please let us know as soon as possible.",
      rsvpButton: 'Confirm Attendance',

      closingBody: 'Thank you for joining us and being part of this important moment in our lives.',
      closingSignoff: 'With much love,',

      // Our Story
      storyLink: 'Our Story →',
      storyLinkAria: 'See our story',
      storyHeading: 'Our Story',
      storyBackLink: '← Back to the Invitation',
      storyPara1: 'At the beginning of our sophomore year, we both went to a Society of Hispanic Professional Engineers (SHPE) event for the first time. We recognized each other from the Mexican history class we had had earlier that day, started talking, and ended up walking all the way from campus to the refresquería in Rice Village together. We started getting lunch together regularly after class and got to know each other better over time. We went out for dinner a couple of times in Rice Village, and we officially began our relationship on a picnic in Hermann Park.',
      storyPara2: 'We stayed involved in SHPE throughout college, eventually serving as president (Lizeth) and treasurer (Daniel) during our senior year. We both graduated in May 2025, and afterward we spent a year more than a thousand miles apart — Daniel moved back home to Los Angeles, and Lizeth moved to Seattle for work.',
      storyPara3: 'After countless FaceTime calls, virtual dates, and trips between Seattle and Los Angeles, Daniel proposed to Lizeth in Joshua Tree National Park, and Lizeth said yes. After the wedding, we will live in Seattle, where Lizeth will keep working as a software engineer and Daniel will pursue a master’s in mechanical engineering at the University of Washington.',

      langAria: 'Language',

      modalHeading: 'Confirm Attendance',
      modalClose: 'Close',
      labelName: 'Full name',
      placeholderName: 'Your name',
      labelAttending: 'Will you be able to join us?',
      optionYes: "Yes, I'll be there",
      optionNo: "I won't be able to attend",
      labelAdults: 'Adults',
      labelChildren: 'Children',
      labelMessage: 'Message for the couple (optional)',
      placeholderMessage: 'Write a message...',
      submitButton: 'Send RSVP',
      sendingButton: 'Sending…',
      errorBody: "We couldn't send your RSVP. Check your connection and try again.",

      successHeading: 'Thank you!',
      successBody: "We've got your RSVP. See you soon!"
    }
  };

  function detectDefaultLang() {
    // Always open in Spanish. Only honor a saved language if this visitor
    // has explicitly used the Es/En toggle before; browser locale is ignored.
    try {
      if (localStorage.getItem(STORAGE_TOGGLED_KEY) === '1') {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored && translations[stored]) return stored;
      }
    } catch (e) {}
    return 'es';
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
