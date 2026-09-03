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
      vestimentaBody: 'Los invitamos a vestir tonos de verde, vino, café, rosa, o colores similares, el día de nuestra boda.',

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
      storyPara1: 'La historia de Daniel y Lizeth comenzó en su segundo año de la universidad, cuando ambos asistieron a una reunión de la Sociedad de Ingenieros Profesionales Hispanos (SHPE). Lizeth reconoció a Daniel de una clase de historia mexicana que habían tenido esa mañana, así que cuando todos salieron a comer tacos, ella empezó una conversación con él. Al terminar la reunión, un grupo decidió ir por postre a una refresquería. Ellos se unieron y platicaron durante todo el camino.',
      storyPara2: 'Desde entonces, Daniel buscaba la manera de acercarse a Lizeth al final de clase, y empezó a acompañarla a almorzar. En las semanas siguientes, se seguían encontrando en eventos escolares y poco a poco se fueron conociendo mejor. Salieron a cenar varias veces en Rice Village, y finalmente, Daniel organizó un picnic en Hermann Park donde le pidió que fuera su novia. Ella dijo que sí.',
      storyPara3: 'Los dos siguieron involucrados en SHPE durante toda la carrera, llegando a ser presidenta (Lizeth) y tesorero (Daniel) en su último año. Se graduaron juntos en mayo de 2025, y después pasaron un año separados por más de mil millas de distancia, ya que Daniel regresó a vivir en Los Ángeles y Lizeth se mudó a Seattle por el trabajo.',
      storyPara4: 'Después de tantas videollamadas, citas virtuales y viajes de una ciudad a otra, Daniel le pidió matrimonio en el Parque Nacional Joshua Tree. Lizeth dijo que sí, otra vez :) . Una vez casados, la pareja vivirá en Seattle, donde Lizeth continuará su carrera como ingeniera de software y Daniel estudiará una maestría en ingeniería mecánica en la Universidad de Washington.',
      // Pie de foto para cada imagen de "Nuestra Historia" — reemplázalos.
      storyCap1: 'Cena en Hugo\'s',
      storyCap2: 'Conferencia de SHPE 2023',
      storyCap3: 'Graduación · Mayo 2025',
      storyCap4: 'La propuesta · Joshua Tree',
      storyCap5: 'Universidad de Washington · Seattle',

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
      vestimentaBody: 'We invite you to wear shades of green, burgundy, brown, pink, or similar on the day of the wedding.',

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
      storyPara1: 'Daniel and Lizeth\'s story began their sophomore year, when they both attended a club meeting for the Society of Hispanic Professional Engineers (SHPE). Lizeth recognized Daniel from a Mexican history class earlier that day, so when everyone headed outside afterward for tacos, she struck up a conversation with him. After the meeting ended, a smaller group decided to get dessert at a refresquería. They joined them and talked the whole way there. ',
      storyPara2: 'From then on, Daniel would find his way to Lizeth\'s side as soon as history class let out and started walking her to lunch. Over the following weeks, they kept crossing paths at school events and slowly got to know each other better. They went out to dinner a few times in Rice Village, and eventually, Daniel planned a picnic in Hermann Park where he asked her to be his girlfriend. She said yes.',
      storyPara3: 'The two stayed involved in SHPE throughout college, rising to president (Lizeth) and treasurer (Daniel) by their senior year. They graduated together in May of 2025, and then spent the next year more than a thousand miles apart, as Daniel moved back home to Los Angeles and Lizeth headed to Seattle for work.',
      storyPara4: 'After countless FaceTime calls, virtual dates, and cross-country trips between the two cities, Daniel proposed in Joshua Tree National Park. Lizeth said yes, again :) . Once they\'re married, the couple will live in Seattle, where Lizeth will continue her career as a software engineer and Daniel will pursue a master\'s in mechanical engineering at the University of Washington.',
      // Caption under each "Our Story" photo — replace these.
      storyCap1: 'Date night at Hugo\'s',
      storyCap2: 'SHPE Conference 2023',
      storyCap3: 'Graduation · May 2025',
      storyCap4: 'The proposal · Joshua Tree',
      storyCap5: 'University of Washington · Seattle',

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
