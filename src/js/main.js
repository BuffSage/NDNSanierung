(function () {
  'use strict';

  // -----------------------------
  // i18n dictionary (no hardcoded year in footer)
  // -----------------------------
  const I18N = {
    de: {
      nav: { services: 'Leistungen', about: 'Über Uns', contact: 'Kontakt' },
      footer: {
        nav_title: 'Navigation',
        contact_title: 'Kontakt',
        legal_title: 'Rechtliches',
        imprint: 'Impressum',
        privacy: 'Datenschutz',
        rights: 'NDN Sanierung. Alle Rechte vorbehalten.',
      },
      home: {
        tagline:
          'Asbest- und Schadstoffsanierung mit Zertifizierung (TRGS 519). Sicher. Schnell. Fachgerecht.',
        cta_services: 'Zu den Leistungen',
        cta_contact: 'Kontakt aufnehmen',
        point1: 'Asbestsanierung gemäß TRGS 519. Wir kümmern uns um Planung, Durchführung und Entsorgung.',
        point2_title: 'Schnell vor Ort',
        point2: 'Flexible Terminvereinbarung. Unser Team ist kurzfristig einsatzbereit.',
        point3_title: 'Erfahrung',
        point3: 'Qualifiziertes Fachpersonal. Profitieren Sie von jahrelanger Erfahrung.',
      },
      leistungen: {
        title: 'Unsere Fachleistungen im Detail',
        asbestos: {
          title: 'Asbestsanierung nach TRGS 519',
          text: 'Asbest ist eine ernstzunehmende Gefahr für die Gesundheit. Wir sanieren fachgerecht und zertifiziert. Wir entfernen u.a.:',
          item1: 'Asbestzementplatten (Eternit) an Dächern und Fassaden',
          item2: 'Asbesthaltige Rohre, Lüftungskanäle und Formteile',
          item3: 'Floor-Flex-Platten und asbesthaltige Kleber',
          item4: 'Brandschutzverkleidungen, Dichtmassen & Spritzasbest',
          outro:
            'Wir arbeiten staubarm, sicher und nach Vorschrift – inklusive Entsorgung und Dokumentation.',
        },
        kmf: {
          title: 'KMF & Schadstoffe',
          text: 'Wir sanieren weitere Schadstoffe wie KMF, PCB, PAK und Holzschutzmittel – ganzheitlich und sicher.',
        },
        gallery_title: 'Einblicke in unsere Arbeit – Asbest',
      },
      about: {
        title: 'Über Uns',
        text: 'Wir sind spezialisiert auf Asbest- und Schadstoffsanierung und arbeiten zuverlässig, termingerecht und nach höchsten Sicherheitsstandards.',
      },
      contact: {
        title: 'Kontakt',
        subtitle: 'Schreiben Sie uns oder rufen Sie an:',
        name: 'Name',
        email: 'E-Mail',
        message: 'Nachricht',
        submit: 'Senden',
      },
    },
    en: {
      nav: { services: 'Services', about: 'About Us', contact: 'Contact' },
      footer: {
        nav_title: 'Navigation',
        contact_title: 'Contact',
        legal_title: 'Legal',
        imprint: 'Imprint',
        privacy: 'Privacy Policy',
        rights: 'NDN Sanierung. All rights reserved.',
      },
      home: {
        tagline:
          'Certified asbestos and hazardous material remediation (TRGS 519). Safe. Fast. Professional.',
        cta_services: 'View Services',
        cta_contact: 'Contact Us',
        point1: 'Asbestos remediation according to TRGS 519. We handle planning, execution and disposal.',
        point2_title: 'Quick on Site',
        point2: 'Flexible scheduling. Our team is ready at short notice.',
        point3_title: 'Experience',
        point3: 'Qualified specialists. Benefit from years of hands-on experience.',
      },
      leistungen: {
        title: 'Our Professional Services in Detail',
        asbestos: {
          title: 'Asbestos Remediation (TRGS 519)',
          text: 'Asbestos is a serious health hazard. We remediate professionally and to code. We remove e.g.:',
          item1: 'Asbestos cement panels (Eternit) on roofs and facades',
          item2: 'Asbestos-containing pipes, ducts and fittings',
          item3: 'Floor-flex tiles and asbestos adhesives',
          item4: 'Fire protection cladding, sealants & sprayed asbestos',
          outro:
            'We work with low dust, safely and compliantly – including disposal and documentation.',
        },
        kmf: {
          title: 'MMF & Pollutants',
          text: 'We remediate other pollutants such as mineral wool, PCB, PAH and wood preservatives – comprehensively and safely.',
        },
        gallery_title: 'A look at our work – Asbestos',
      },
      about: {
        title: 'About Us',
        text: 'We specialise in asbestos and pollutant remediation, working reliably, on schedule and to the highest safety standards.',
      },
      contact: {
        title: 'Contact',
        subtitle: 'Write to us or call:',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send',
      },
    },
  };

  // -----------------------------
  // Helpers
  // -----------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const getByPath = (obj, path) =>
    path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), obj);

  const currentLang = () => document.documentElement.getAttribute('lang') || 'de';

  function updateFooterRights(lang) {
    const dict = I18N[lang] || I18N.de;
    const base = dict.footer?.rights || '';
    const text = `© ${new Date().getFullYear()} ${String(base).replace(/^©\s*/, '').trim()}`;
    $$('.rights').forEach((el) => (el.textContent = text));
  }

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.de;
    $$('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      const val = getByPath(dict, key);
      if (typeof val === 'string') node.textContent = val;
    });
    updateFooterRights(lang);
  }

  function setLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    try {
      localStorage.setItem('lang', lang);
    } catch (_) {}
    applyLang(lang);
    const langBtn = $('#langToggle');
    if (langBtn) langBtn.textContent = lang.toUpperCase();
  }

  // -----------------------------
  // Init blocks
  // -----------------------------
  function initThemeToggle() {
    const themeBtn = $('#themeToggle');
    if (!themeBtn) return;
    themeBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const cur = html.classList.contains('dark') ? 'dark' : 'light';
      const next = cur === 'dark' ? 'light' : 'dark';
      html.classList.remove(cur);
      html.classList.add(next);
      try {
        localStorage.setItem('theme', next);
      } catch (_) {}
    });
  }

  function initLangToggle() {
    const langBtn = $('#langToggle');
    if (!langBtn) return;
    langBtn.addEventListener('click', () => {
      setLang(currentLang() === 'de' ? 'en' : 'de');
    });
  }

  function initMenuToggle() {
    const menuBtn = $('#menuBtn');
    if (!menuBtn) return;
    menuBtn.addEventListener('click', () => {
      document.body.classList.toggle('mobile-open');
    });
  }

    function initCookieConsent() {
      try {
        if (localStorage.getItem('cookieConsent')) return;
      } catch (_) {}

      const policyHref = currentLang() === 'de' ? '/datenschutz.html' : '/en/datenschutz.html';

      const banner = document.createElement('div');
      banner.className = 'cookie-banner';
      banner.innerHTML = `
        <p>${
          currentLang() === 'de'
            ? `Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Mehr dazu in unserer <a href="${policyHref}">Datenschutzerkl\u00e4rung</a>.`
            : `We use cookies to improve your experience. See our <a href="${policyHref}">Privacy Policy</a>.`
        }</p>
        <div class="cookie-actions">
          <button class="btn" id="cookieReject">${
            currentLang() === 'de' ? 'Alle ablehnen' : 'Reject all'
          }</button>
          <button class="btn" id="cookieSettings">${
            currentLang() === 'de' ? 'Einstellungen' : 'Settings'
          }</button>
          <button class="btn primary" id="cookieAccept">${
            currentLang() === 'de' ? 'Alle akzeptieren' : 'Accept all'
          }</button>
        </div>
      `;

      const overlay = document.createElement('div');
      overlay.className = 'cookie-modal';
      overlay.style.display = 'none';
      overlay.innerHTML = `
        <div class="cookie-box">
          <h2>${currentLang() === 'de' ? 'Cookie-Einstellungen' : 'Cookie Settings'}</h2>
          <p>${
            currentLang() === 'de'
              ? 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.'
              : 'We use cookies to improve your experience.'
          }</p>
          <div class="cookie-options">
            <label><input type="checkbox" data-key="essential" checked disabled> ${
              currentLang() === 'de' ? 'Notwendig' : 'Essential'
            }</label>
            <label><input type="checkbox" data-key="analytics"> ${
              currentLang() === 'de' ? 'Statistik' : 'Analytics'
            }</label>
            <label><input type="checkbox" data-key="marketing"> ${
              currentLang() === 'de' ? 'Marketing' : 'Marketing'
            }</label>
          </div>
          <div class="cookie-actions">
            <button class="btn" id="cookieSave">${
              currentLang() === 'de' ? 'Speichern' : 'Save'
            }</button>
            <button class="btn primary" id="cookieAcceptAll">${
              currentLang() === 'de' ? 'Alle akzeptieren' : 'Accept all'
            }</button>
          </div>
        </div>
      `;

      function storeConsent(consent) {
        try {
          localStorage.setItem('cookieConsent', JSON.stringify(consent));
        } catch (_) {}
        banner.remove();
        overlay.remove();
      }

      banner
        .querySelector('#cookieAccept')
        .addEventListener('click', () => {
          storeConsent({ essential: true, analytics: true, marketing: true });
        });

      banner
        .querySelector('#cookieReject')
        .addEventListener('click', () => {
          storeConsent({ essential: true });
        });

      banner
        .querySelector('#cookieSettings')
        .addEventListener('click', () => {
          overlay.style.display = 'flex';
          banner.style.display = 'none';
        });

      overlay
        .querySelector('#cookieAcceptAll')
        .addEventListener('click', () => {
          storeConsent({ essential: true, analytics: true, marketing: true });
        });

      overlay
        .querySelector('#cookieSave')
        .addEventListener('click', () => {
          const consent = { essential: true };
          overlay
            .querySelectorAll('.cookie-options input')
            .forEach((input) => {
              if (!input.disabled) {
                consent[input.dataset.key] = input.checked;
              }
            });
          storeConsent(consent);
        });

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.style.display = 'none';
          banner.style.display = '';
        }
      });

      document.body.appendChild(banner);
      document.body.appendChild(overlay);
    }

    function initGallery() {
      const carousel = $('#asbestCarousel');
      if (!carousel) return;

      const images = [
        '/src/assets/cons1.jpg',
        '/src/assets/cons2.jpg',
        '/src/assets/cons4.jpg',
      ];

      let idx = 0;
      let timer;

      function render() {
        carousel.innerHTML = '';
        images.forEach((src, i) => {
          const slide = document.createElement('div');
          slide.className = 'slide' + (i === idx ? ' active' : '');
          const img = document.createElement('img');
          img.src = src;
          img.alt =
            (currentLang() === 'de' ? 'Asbest Galerie Bild ' : 'Asbestos gallery image ') +
            (i + 1);
          slide.appendChild(img);
          carousel.appendChild(slide);
        });
        const navPrev = document.createElement('button');
        navPrev.className = 'arrow prev';
        navPrev.innerHTML = '&#10094;';
        navPrev.addEventListener('click', () => {
          idx = (idx - 1 + images.length) % images.length;
          update();
        });
        const navNext = document.createElement('button');
        navNext.className = 'arrow next';
        navNext.innerHTML = '&#10095;';
        navNext.addEventListener('click', () => {
          idx = (idx + 1) % images.length;
          update();
        });
        carousel.appendChild(navPrev);
        carousel.appendChild(navNext);

        const dots = document.createElement('div');
        dots.className = 'dots';
        images.forEach((_, i) => {
          const b = document.createElement('button');
          b.className = 'dot' + (i === idx ? ' active' : '');
          b.setAttribute(
            'aria-label',
            (currentLang() === 'de' ? 'Bild ' : 'Slide ') + (i + 1)
          );
          b.addEventListener('click', () => {
            idx = i;
            update();
          });
          dots.appendChild(b);
        });
        carousel.appendChild(dots);
      }

      function update() {
        const slides = $$('.slide', carousel);
        slides.forEach((s, i) => s.classList.toggle('active', i === idx));
        $$('.dot', carousel).forEach((d, i) => d.classList.toggle('active', i === idx));
        clearInterval(timer);
        timer = setInterval(() => {
          idx = (idx + 1) % images.length;
          update();
        }, 3000);
      }

      render();
      update();
    }

    function initCardAnimations() {
      const cards = $$('.features .card');
      if (!cards.length) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        { threshold: 0.2 }
      );
      cards.forEach((card, i) => {
        card.style.setProperty('--slide-from', i % 2 === 0 ? '-40px' : '40px');
        io.observe(card);
      });
    }

    function initRevealOnScroll() {
      const els = $$('.reveal');
      if (!els.length) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      els.forEach((el) => io.observe(el));
    }

    function updateAddress() {
      const addr = 'Endertstraße 1, 56812 Cochem';
      $$('.address').forEach((el) => (el.textContent = addr));
    }

  function init() {
    // language (also updates footer year)
    setLang(currentLang());

    // header interactions
    initThemeToggle();
    initLangToggle();
      initMenuToggle();
      initCookieConsent();
      initCardAnimations();
      initRevealOnScroll();
      updateAddress();

    // gallery
    initGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
