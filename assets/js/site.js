/* Charrylicious · interactie (Flowy). De inhoud zelf staat in inhoud.js */
(function () {
  'use strict';
  var D = window.CHARRY || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  var DAGEN = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
  var DAG_KORT = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
  var MAANDEN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  var IMG = 'assets/img/';
  var FLOWERS = ['flower-yellow.webp', 'flower-pink.webp', 'flower-peach.webp'];

  /* ---------- tijd in België ---------- */
  function nuInBelgie() {
    try {
      var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Brussels', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      return { y: +o.year, m: +o.month - 1, d: +o.day, min: (+o.hour % 24) * 60 + (+o.minute) };
    } catch (e) {
      var n = new Date(); return { y: n.getFullYear(), m: n.getMonth(), d: n.getDate(), min: n.getHours() * 60 + n.getMinutes() };
    }
  }
  var NU = nuInBelgie();
  var VANDAAG = new Date(NU.y, NU.m, NU.d);
  var iso = function (dt) { return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0'); };
  var parse = function (s) { var a = String(s).split('-'); return new Date(+a[0], +a[1] - 1, +a[2]); };
  var weekdag = function (dt) { return (dt.getDay() + 6) % 7; }; // 0 = maandag
  var naarMin = function (t) { var a = t.split(':'); return +a[0] * 60 + (+a[1] || 0); };
  var uurTekst = function (t) { var a = t.split(':'); return (+a[0]) + 'u' + (a[1] && a[1] !== '00' ? a[1] : ''); };

  /* ---------- berichtje & bellen ---------- */
  var tel = D.telefoonInternationaal || '+32479388285';
  var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  function smsLink(tekst) { return 'sms:' + tel + (ios ? '&' : '?') + 'body=' + encodeURIComponent(tekst || D.berichtje || ''); }
  $$('.js-sms').forEach(function (a) { a.href = smsLink(); });
  $$('.js-tel').forEach(function (a) { a.href = 'tel:' + tel; });
  $$('.js-phone').forEach(function (s) { s.textContent = D.telefoon || s.textContent; });

  /* ---------- openingsuren ---------- */
  var uren = D.uren || {};
  var vandaagNaam = DAGEN[weekdag(VANDAAG)];
  (function () {
    var dl = $('#hours'); if (!dl) return;
    var html = '';
    DAGEN.forEach(function (dag) {
      var u = uren[dag];
      var cls = (u ? 'open-day' : 'closed') + (dag === vandaagNaam ? ' is-today' : '');
      var naam = dag.charAt(0).toUpperCase() + dag.slice(1) + (dag === vandaagNaam ? ' · vandaag' : '');
      html += '<div class="hrow ' + cls + '"><span>' + naam + '</span><span>' + (u ? uurTekst(u[0]) + ' tot ' + uurTekst(u[1]) : 'gesloten') + '</span></div>';
    });
    dl.innerHTML = html;
    if (D.uitzondering) { var ex = $('#exception'); ex.textContent = D.uitzondering; ex.hidden = false; }
  })();

  (function () {
    var pill = $('#open-pill'); if (!pill) return;
    var u = uren[vandaagNaam]; var txt;
    if (u && NU.min >= naarMin(u[0]) && NU.min < naarMin(u[1])) {
      txt = 'Nu open tot ' + uurTekst(u[1]); pill.classList.add('is-open');
    } else if (u && NU.min < naarMin(u[0])) {
      txt = 'Vandaag open vanaf ' + uurTekst(u[0]);
    } else {
      for (var i = 1; i <= 7; i++) {
        var dag = DAGEN[(weekdag(VANDAAG) + i) % 7];
        if (uren[dag]) { txt = (i === 1 ? 'Morgen' : dag.charAt(0).toUpperCase() + dag.slice(1)) + ' terug open om ' + uurTekst(uren[dag][0]); break; }
      }
      pill.classList.add('is-closed');
    }
    if (txt) pill.lastElementChild.textContent = txt;
  })();

  /* ---------- agenda ---------- */
  var events = (D.agenda || []).map(function (e) { var x = Object.assign({}, e); x.dt = parse(e.datum); return x; })
    .filter(function (e) { return e.dt >= VANDAAG; })
    .sort(function (a, b) { return a.dt - b.dt; });
  var byIso = {}; events.forEach(function (e) { byIso[iso(e.dt)] = e; });

  function kortDatum(e) { return { d1: DAG_KORT[weekdag(e.dt)], d2: e.dt.getDate(), d3: MAANDEN[e.dt.getMonth()].slice(0, 3) }; }
  function langDatum(e) { return DAGEN[weekdag(e.dt)].replace(/^./, function (c) { return c.toUpperCase(); }) + ' ' + e.dt.getDate() + ' ' + MAANDEN[e.dt.getMonth()]; }
  function badge(e) { var k = kortDatum(e); return '<span class="date-badge"><span class="d1">' + k.d1 + '</span><span class="d2">' + k.d2 + '</span><span class="d3">' + k.d3 + '</span></span>'; }

  // eerstvolgende event in de hero
  (function () {
    var a = $('#next-event'); var e = events[0]; if (!a || !e) return;
    a.innerHTML = badge(e) + '<span class="txt"><span class="t1">' + esc(e.titel) + '</span><span class="t2">' + esc(e.uur) + (e.verplicht ? ' · reserveren verplicht' : '') + '</span></span>' +
      '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5515B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    a.hidden = false;
    a.addEventListener('click', function () { kies(e); });
  })();

  var maand = new Date(VANDAAG.getFullYear(), VANDAAG.getMonth(), 1);
  var laatsteMaand = events.length ? new Date(events[events.length - 1].dt.getFullYear(), events[events.length - 1].dt.getMonth(), 1) : maand;
  var gekozen = events[0] || null;

  function tekenKalender() {
    var grid = $('#cal-grid'); if (!grid) return;
    $('#cal-title').textContent = MAANDEN[maand.getMonth()] + ' ' + maand.getFullYear();
    $('#cal-prev').disabled = maand <= new Date(VANDAAG.getFullYear(), VANDAAG.getMonth(), 1);
    $('#cal-next').disabled = maand >= laatsteMaand && maand >= new Date(VANDAAG.getFullYear(), VANDAAG.getMonth() + 1, 1);
    var html = ''; var start = weekdag(maand);
    for (var i = 0; i < start; i++) html += '<span class="day empty" aria-hidden="true"></span>';
    var dagen = new Date(maand.getFullYear(), maand.getMonth() + 1, 0).getDate();
    for (var d = 1; d <= dagen; d++) {
      var dt = new Date(maand.getFullYear(), maand.getMonth(), d);
      var key = iso(dt); var ev = byIso[key];
      var open = !!uren[DAGEN[weekdag(dt)]];
      var cls = 'day' + (open ? ' open' : '') + (+dt === +VANDAAG ? ' today' : '') + (dt < VANDAAG ? ' past' : '');
      if (ev) {
        var idx = events.indexOf(ev);
        html += '<button type="button" class="' + cls + ' event" data-iso="' + key + '" aria-pressed="' + (ev === gekozen) + '" aria-label="' + esc(langDatum(ev) + ': ' + ev.titel) + '"><span>' + d + '</span><img src="' + IMG + FLOWERS[idx % 3] + '" alt=""></button>';
      } else {
        html += '<span class="' + cls + '">' + d + (+dt === +VANDAAG ? '<small>vandaag</small>' : '') + '</span>';
      }
    }
    grid.innerHTML = html;
    $$('button.event', grid).forEach(function (b) { b.addEventListener('click', function () { kies(byIso[b.getAttribute('data-iso')], true); }); });
  }

  function tekenEvent() {
    var card = $('#event-card'); if (!card) return;
    var e = gekozen;
    if (!e) {
      card.innerHTML = '<div class="event-empty"><h3 style="font-family:var(--display);font-weight:800;font-size:32px;color:var(--kersrood);margin:0">Binnenkort meer leuks</h3><p>Hou onze Instagram in het oog voor de volgende dagschotel of het volgende event.</p><a class="btn btn-outline" href="https://www.instagram.com/' + esc(D.instagram || '_charrylicious_') + '/" target="_blank" rel="noopener">@' + esc(D.instagram || '_charrylicious_') + '</a></div>';
      return;
    }
    var idx = events.indexOf(e);
    var kleur = e.verplicht ? '#FFD4DC' : '#F9CF86';
    var label = idx === 0 ? (e.label || 'Eerstvolgende') : (e.label || 'Op de agenda');
    var media = e.foto
      ? '<img class="ph" src="' + IMG + esc(e.foto) + '" alt="' + esc(e.titel) + '">'
      : '<div class="no-photo"><img class="deco spin" src="' + IMG + 'flower-yellow.webp" alt="" style="left:22px;bottom:22px;width:70px"><img class="deco spin-rev" src="' + IMG + 'flower-pink.webp" alt="" style="right:20px;top:24px;width:80px"><img src="' + IMG + 'icon-cup.webp" alt="" style="width:130px;height:auto"></div>';
    var note = e.verplicht
      ? '<strong>Reserveren is verplicht.</strong> Stuur je naam en met hoeveel je komt naar ' + esc(D.telefoon) + '.'
      : '<strong>Gewoon binnenwandelen.</strong> Liever zeker van een plekje? Stuur ons een berichtje.';
    var msg = 'Hallo Charrylicious! Ik wil graag reserveren voor ' + e.titel.toLowerCase() + ' op ' + langDatum(e).toLowerCase() + ' voor (aantal) personen. Mijn naam is ';
    card.innerHTML = '<div class="event-media" style="background:' + kleur + '">' + media + badge(e) + '</div>' +
      '<div class="event-body fade-in"><span class="label" style="background:' + kleur + '">' + esc(label) + '</span>' +
      '<h3>' + esc(e.titel) + '</h3><p class="when">' + esc(langDatum(e)) + ' · ' + esc(e.uur) + '</p><p>' + esc(e.tekst) + '</p>' +
      '<p class="note">' + note + '</p>' +
      '<a class="btn btn-red" href="' + smsLink(msg) + '"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Stuur een berichtje</a></div>';
  }

  function kies(e, vanKalender) {
    if (!e) return;
    gekozen = e;
    maand = new Date(e.dt.getFullYear(), e.dt.getMonth(), 1);
    tekenKalender(); tekenEvent();
    if (vanKalender && window.innerWidth < 860) { var c = $('#event-card'); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }
  if (gekozen) maand = new Date(gekozen.dt.getFullYear(), gekozen.dt.getMonth(), 1);
  tekenKalender(); tekenEvent();
  var prev = $('#cal-prev'), next = $('#cal-next');
  if (prev) prev.addEventListener('click', function () { maand = new Date(maand.getFullYear(), maand.getMonth() - 1, 1); tekenKalender(); });
  if (next) next.addEventListener('click', function () { maand = new Date(maand.getFullYear(), maand.getMonth() + 1, 1); tekenKalender(); });

  /* ---------- events voor Google (schema.org), automatisch uit de agenda ---------- */
  (function () {
    if (!events.length) return;
    var SITE = 'https://charrylicious.be/';
    var plaats = { '@type': 'Place', name: 'Charrylicious', address: { '@type': 'PostalAddress', streetAddress: D.adres || 'Avelgemstraat 121', postalCode: '8550', addressLocality: 'Zwevegem', addressCountry: 'BE' } };
    var lijst = events.map(function (e) {
      var tijd = /(\d{1,2})u(\d{2})?/.exec(e.uur || '');
      var start = iso(e.dt) + (tijd ? 'T' + String(tijd[1]).padStart(2, '0') + ':' + (tijd[2] || '00') + ':00' + tijdzone(e.dt) : '');
      var ev = {
        '@context': 'https://schema.org', '@type': 'FoodEvent', name: e.titel + ' bij Charrylicious',
        description: e.tekst, startDate: start, eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', location: plaats,
        organizer: { '@type': 'Organization', name: 'Charrylicious', url: SITE },
        image: [SITE + IMG + (e.foto || 'og-image.jpg')], url: SITE + '#agenda'
      };
      var prijs = /(\d+)[,.](\d{2})/.exec(e.uur || '');
      if (prijs) ev.offers = { '@type': 'Offer', price: prijs[1] + '.' + prijs[2], priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: SITE + '#reserveren' };
      return ev;
    });
    var sc = document.createElement('script'); sc.type = 'application/ld+json';
    sc.textContent = JSON.stringify(lijst); document.head.appendChild(sc);
  })();
  function tijdzone(dt) {
    // zomertijd in België: laatste zondag van maart tot laatste zondag van oktober
    var j = dt.getFullYear();
    var lz = function (m) { var d = new Date(j, m + 1, 0); d.setDate(d.getDate() - d.getDay()); return d; };
    return (dt >= lz(2) && dt < lz(9)) ? '+02:00' : '+01:00';
  }

  /* ---------- suggestie van het weekend ---------- */
  (function () {
    var box = $('#suggestie'); var s = D.suggestie;
    if (!box || !s || !s.titel) return;
    box.innerHTML = '<img class="spin" src="' + IMG + 'flower-peach.webp" alt="">' +
      '<div class="sg-txt"><p class="kicker">Suggestie van het weekend</p><h3>' + esc(s.titel) + '</h3>' + (s.tekst ? '<p>' + esc(s.tekst) + '</p>' : '') + '</div>';
    box.hidden = false;
  })();

  /* ---------- lopende band ---------- */
  (function () {
    var t = $('#marquee-track'); if (!t) return;
    var open = DAGEN.filter(function (d) { return uren[d]; });
    var items = [];
    if (open.length) items.push('Open ' + open.join(' en ') + ' van ' + uurTekst(uren[open[0]][0]) + ' tot ' + uurTekst(uren[open[0]][1]));
    items.push('Reserveren met een berichtje', 'Alles huisgemaakt', (D.adres || '') + ' in Zwevegem');
    if (D.suggestie && D.suggestie.titel) items.push('Dit weekend: ' + D.suggestie.titel.toLowerCase());
    events.slice(0, 2).forEach(function (e) { items.push(DAG_KORT[weekdag(e.dt)] + ' ' + e.dt.getDate() + '/' + (e.dt.getMonth() + 1) + ' ' + e.titel.toLowerCase()); });
    var one = items.map(function (x, i) { return '<span>' + esc(x) + '<img src="' + IMG + FLOWERS[i % 2 ? 0 : 1] + '" alt=""></span>'; }).join('');
    t.innerHTML = one + one;
  })();

  /* ---------- kaart met tabbladen ---------- */
  (function () {
    var tabs = $('#tabs'), panel = $('#tab-panel'); var clubs = D.kaart || [];
    if (!tabs || !panel || !clubs.length) return;
    tabs.innerHTML = clubs.map(function (c, i) {
      return '<button type="button" class="tab" role="tab" id="tab-' + i + '" aria-controls="tab-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(c.naam) + '</button>';
    }).join('');
    function toon(i) {
      var c = clubs[i];
      $$('.tab', tabs).forEach(function (b, j) { b.setAttribute('aria-selected', j === i); b.tabIndex = j === i ? 0 : -1; });
      panel.setAttribute('aria-labelledby', 'tab-' + i);
      panel.innerHTML = '<div class="club-photo" style="background:' + esc(c.kleur) + '"><img class="ph" src="' + IMG + esc(c.foto) + '" alt="' + esc(c.titel) + '" loading="lazy">' +
        '<img class="deco spin" src="' + IMG + FLOWERS[i % 3] + '" alt="">' +
        '<div class="cap"><h3>' + esc(c.titel) + '</h3><p>' + esc(c.zin) + '</p></div></div>' +
        '<div class="club-list"><ul>' + c.items.map(function (it, k) { return '<li style="animation-delay:' + (k * 0.05) + 's">' + esc(it) + '</li>'; }).join('') + '</ul>' +
        (c.noot ? '<p class="noot">' + esc(c.noot) + '</p>' : '') + '</div>';
    }
    $$('.tab', tabs).forEach(function (b, i) {
      b.addEventListener('click', function () { toon(i); });
      b.addEventListener('keydown', function (ev) {
        var n = clubs.length, j = null;
        if (ev.key === 'ArrowRight') j = (i + 1) % n; if (ev.key === 'ArrowLeft') j = (i - 1 + n) % n;
        if (j !== null) { ev.preventDefault(); toon(j); $('#tab-' + j).focus(); }
      });
    });
    toon(0);
  })();

  /* ---------- header, gsm menu, vaste knop ---------- */
  var header = $('#header'), cta = $('#mobile-cta'), hero = $('.hero');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('small-head', y > 30);
    if (cta && hero) cta.classList.toggle('show', y > hero.offsetHeight * 0.6);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var toggle = $('.menu-toggle'), nav = $('#hoofdmenu');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }); });
  }

  /* ---------- veelgestelde vragen: maar één tegelijk open ---------- */
  $$('.faq-list details').forEach(function (d, i, alle) {
    d.addEventListener('toggle', function () {
      if (d.open) alle.forEach(function (x) { if (x !== d) x.open = false; });
    });
  });

  /* ---------- binnenschuiven bij scrollen ---------- */
  var reveals = $$('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
