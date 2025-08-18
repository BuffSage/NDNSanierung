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
        point1: 'Asbestsanierung gemäß TRGS 519.',
        point2_title: 'Schnell vor Ort',
        point2: 'Flexible Terminvereinbarung.',
        point3_title: 'Erfahrung',
        point3: 'Qualifiziertes Fachpersonal.',
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
        point1: 'Asbestos remediation according to TRGS 519.',
        point2_title: 'Quick on Site',
        point2: 'Flexible scheduling.',
        point3_title: 'Experience',
        point3: 'Qualified specialists.',
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

  function normalizeUberUnsLinks() {
    $$('a[href$="ueber-uns.html"]').forEach((a) => {
      a.href = a.href.replace('ueber-uns.html', 'uber-uns.html');
    });
  }

  function initGallery() {
    const carousel = $('#asbestCarousel');
    if (!carousel) return;

    const images = [
      'https://images.unsplash.com/photo-1621905252507-b3c699df93d3?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1581092446337-23c3b036c1d0?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1551893623-1135b671f6a1?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600783936237-7a5f5582a954?auto=format&fit=crop&w=1400&q=80',
    ];

    let idx = 0;

    function render() {
      // rebuild slides+ dots (kept simple + robust)
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
          render();
        });
        dots.appendChild(b);
      });
      carousel.appendChild(dots);
    }

    render();

    setInterval(() => {
      idx = (idx + 1) % images.length;
      const slides = $$('.slide', carousel);
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      $$('.dot', carousel).forEach((d, i) => d.classList.toggle('active', i === idx));
    }, 3000);
  }

  function init() {
    // language (also updates footer year)
    setLang(currentLang());

    // header interactions
    initThemeToggle();
    initLangToggle();
    initMenuToggle();

    // fix links
    normalizeUberUnsLinks();

    // gallery
    initGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
