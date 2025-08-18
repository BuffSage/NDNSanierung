(function(){"use strict";
  // i18n dictionary (footer.rights has NO year or "©" — we inject the current year in code)
  var I18N = {
    "de": {
      "nav": { "services": "Leistungen", "about": "Über Uns", "contact": "Kontakt" },
      "footer": {
        "nav_title": "Navigation",
        "contact_title": "Kontakt",
        "legal_title": "Rechtliches",
        "imprint": "Impressum",
        "privacy": "Datenschutz",
        "rights": "NDN Sanierung. Alle Rechte vorbehalten."
      },
      "home": {
        "tagline": "Asbest- und Schadstoffsanierung mit Zertifizierung (TRGS 519). Sicher. Schnell. Fachgerecht.",
        "cta_services": "Zu den Leistungen",
        "cta_contact": "Kontakt aufnehmen",
        "point1": "Asbestsanierung gemäß TRGS 519.",
        "point2_title": "Schnell vor Ort",
        "point2": "Flexible Terminvereinbarung.",
        "point3_title": "Erfahrung",
        "point3": "Qualifiziertes Fachpersonal."
      },
      "leistungen": {
        "title": "Unsere Fachleistungen im Detail",
        "asbestos": {
          "title": "Asbestsanierung nach TRGS 519",
          "text": "Asbest ist eine ernstzunehmende Gefahr für die Gesundheit. Wir sanieren fachgerecht und zertifiziert. Wir entfernen u.a.:",
          "item1": "Asbestzementplatten (Eternit) an Dächern und Fassaden",
          "item2": "Asbesthaltige Rohre, Lüftungskanäle und Formteile",
          "item3": "Floor-Flex-Platten und asbesthaltige Kleber",
          "item4": "Brandschutzverkleidungen, Dichtmassen & Spritzasbest",
          "outro": "Wir arbeiten staubarm, sicher und nach Vorschrift – inklusive Entsorgung und Dokumentation."
        },
        "kmf": { "title": "KMF & Schadstoffe", "text": "Wir sanieren weitere Schadstoffe wie KMF, PCB, PAK und Holzschutzmittel – ganzheitlich und sicher." },
        "gallery_title": "Einblicke in unsere Arbeit – Asbest"
      },
      "about": { "title": "Über Uns", "text": "Wir sind spezialisiert auf Asbest- und Schadstoffsanierung und arbeiten zuverlässig, termingerecht und nach höchsten Sicherheitsstandards." },
      "contact": { "title": "Kontakt", "subtitle": "Schreiben Sie uns oder rufen Sie an:", "name": "Name", "email": "E-Mail", "message": "Nachricht", "submit": "Senden" }
    },
    "en": {
      "nav": { "services": "Services", "about": "About Us", "contact": "Contact" },
      "footer": {
        "nav_title": "Navigation",
        "contact_title": "Contact",
        "legal_title": "Legal",
        "imprint": "Imprint",
        "privacy": "Privacy Policy",
        "rights": "NDN Sanierung. All rights reserved."
      },
      "home": {
        "tagline": "Certified asbestos and hazardous material remediation (TRGS 519). Safe. Fast. Professional.",
        "cta_services": "View Services",
        "cta_contact": "Contact Us",
        "point1": "Asbestos remediation according to TRGS 519.",
        "point2_title": "Quick on Site",
        "point2": "Flexible scheduling.",
        "point3_title": "Experience",
        "point3": "Qualified specialists."
      },
      "leistungen": {
        "title": "Our Professional Services in Detail",
        "asbestos": {
          "title": "Asbestos Remediation (TRGS 519)",
          "text": "Asbestos is a serious health hazard. We remediate professionally and to code. We remove e.g.:",
          "item1": "Asbestos cement panels (Eternit) on roofs and facades",
          "item2": "Asbestos-containing pipes, ducts and fittings",
          "item3": "Floor-flex tiles and asbestos adhesives",
          "item4": "Fire protection cladding, sealants & sprayed asbestos",
          "outro": "We work with low dust, safely and compliantly – including disposal and documentation."
        },
        "kmf": { "title": "MMF & Pollutants", "text": "We remediate other pollutants such as mineral wool, PCB, PAH and wood preservatives – comprehensively and safely." },
        "gallery_title": "A look at our work – Asbestos"
      },
      "about": { "title": "About Us", "text": "We specialise in asbestos and pollutant remediation, working reliably, on schedule and to the highest safety standards." },
      "contact": { "title": "Contact", "subtitle": "Write to us or call:", "name": "Name", "email": "Email", "message": "Message", "submit": "Send" }
    }
  };

  function $(sel, root){ return (root||document).querySelector(sel); }
  function $all(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.de;
    $all("[data-i18n]").forEach(function(node){
      var keys = node.getAttribute("data-i18n").split(".");
      var val = keys.reduce(function(acc,k){ return acc && acc[k]; }, dict);
      if (typeof val === "string") node.textContent = val;
    });
    // After applying generic translations, inject current year into footer rights
    updateFooterRights(lang);
  }

  function updateFooterRights(lang) {
    var dict = I18N[lang] || I18N.de;
    var base = (((dict||{}).footer||{}).rights) || "";
    var text = "© " + new Date().getFullYear() + " " + String(base).replace(/^©\s*/,"").trim();
    $all(".rights").forEach(function(el){ el.textContent = text; });
  }

  var themeBtn = $("#themeToggle");
  if (themeBtn) themeBtn.addEventListener("click", function() {
    var cur = document.documentElement.classList.contains("dark") ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    document.documentElement.classList.remove(cur);
    document.documentElement.classList.add(next);
    try { localStorage.setItem('theme', next); } catch(e) {}
  });

  var langBtn = $("#langToggle");
  function currentLang(){ return document.documentElement.getAttribute("lang") || "de"; }
  function setLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem('lang', lang); } catch(e) {}
    applyLang(lang);
    if (langBtn) langBtn.textContent = lang.toUpperCase();
  }
  if (langBtn) langBtn.addEventListener("click", function(){ setLang(currentLang()==="de" ? "en" : "de"); });

  var menuBtn = $("#menuBtn");
  if (menuBtn) menuBtn.addEventListener("click", function(){ document.body.classList.toggle("mobile-open"); });

  // Initial language (also sets footer year via applyLang -> updateFooterRights)
  setLang(currentLang());

  // Asbest gallery (Leistungen)
  var carousel = $("#asbestCarousel");
  if (carousel) {
    var images = [
      "https://images.unsplash.com/photo-1621905252507-b3c699df93d3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1581092446337-23c3b036c1d0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551893623-1135b671f6a1?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600783936237-7a5f5582a954?auto=format&fit=crop&w=1400&q=80"
    ];
    var idx = 0;
    function render() {
      carousel.innerHTML = "";
      images.forEach(function(src, i) {
        var slide = document.createElement("div");
        slide.className = "slide" + (i===idx ? " active" : "");
        var img = document.createElement("img");
        img.src = src;
        img.alt = (currentLang()==="de" ? "Asbest Galerie Bild " : "Asbestos gallery image ") + (i+1);
        slide.appendChild(img);
        carousel.appendChild(slide);
      });
      var dots = document.createElement("div");
      dots.className = "dots";
      images.forEach(function(_, i) {
        var b = document.createElement("button");
        b.className = "dot" + (i===idx ? " active" : "");
        b.setAttribute("aria-label", (currentLang()==="de" ? "Bild " : "Slide ") + (i+1));
        b.addEventListener("click", function(){ idx = i; render(); });
        dots.appendChild(b);
      });
      carousel.appendChild(dots);
    }
    render();
    setInterval(function(){
      idx = (idx + 1) % images.length;
      var slides = $all(".slide", carousel);
      slides.forEach(function(s, i){ s.classList.toggle("active", i===idx); });
      $all(".dot", carousel).forEach(function(d, i){ d.classList.toggle("active", i===idx); });
    }, 3000);
  }
})();
