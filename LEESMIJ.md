# Charrylicious website

Gemaakt door Flowy, oktober 2026. Eén pagina, zonder reservatiesysteem: reserveren gaat met een berichtje naar 0479 38 82 85.

## Wat zit waar

| Bestand | Wat |
|---|---|
| `index.html` | De pagina zelf |
| `inhoud.js` | **Alles wat regelmatig verandert:** openingsuren, agenda, suggestie van het weekend en de kaart |
| `assets/css/style.css` | De stijl (kleuren en lettertypes uit het brandbook) |
| `assets/js/site.js` | De bewegingen: kalender, tabbladen, open/gesloten, binnenschuiven |
| `assets/img/` | Foto's, logo en bloemetjes (al klein gemaakt voor het web) |
| `assets/fonts/` | Grandstander (titels) en Nunito (tekst) |
| `robots.txt`, `sitemap.xml` | Voor Google. Pas `lastmod` in de sitemap aan na een grote wijziging |
| `llms.txt` | Korte samenvatting voor AI tools (ChatGPT, Perplexity, Gemini) |

## Iets aanpassen

Open `inhoud.js` met een gewone teksteditor of rechtstreeks op GitHub (potloodje), pas de tekst tussen de aanhalingstekens aan en bewaar.

- **Nieuwe dag in de agenda:** kopieer een blokje `{ datum: ..., }` en pas het aan. Een datum schrijf je als `'2026-11-07'`. Voorbije dagen verdwijnen vanzelf uit de kalender.
- **Suggestie van het weekend:** pas `titel` en `tekst` aan. Een lege titel `''` verbergt het blokje.
- **Openingsuren:** `['14:00', '20:00']` of `null` voor gesloten. De site toont zelf "Nu open tot 20u" of "Zaterdag terug open om 14u".
- **Uitzondering** (bv. vakantie): vul `uitzondering: 'Gesloten van 1 tot 7 januari'` in.
- **Foto bij een event:** zet de foto in `assets/img/` en vul de bestandsnaam in bij `foto`.

## Vindbaarheid (SEO)

- De events in `inhoud.js` worden automatisch als event voor Google klaargezet (met datum, uur en prijs uit `uur`). Schrijf het uur als `18u30` en de prijs als `17,00`.
- **Uren of afspraken veranderd?** Pas ze dan ook aan in de veelgestelde vragen in `index.html` (twee keer: in het blok bovenaan bij `FAQPage` en in de sectie `vragen`), en in `llms.txt`.

## Online zetten met GitHub Pages

1. Maak een nieuwe repository, bv. `charrylicious`, en upload alle bestanden uit deze map (de map zelf niet, enkel wat erin zit).
2. Ga naar **Settings › Pages**, kies **Deploy from a branch**, branch `main`, map `/ (root)` en bewaar.
3. Domeinnaam koppelen: vul bij **Settings › Pages › Custom domain** het domein in (bv. `charrylicious.be`). Zet bij je domeinregistrar:
   - vier A records naar `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - een CNAME record `www` naar `<jouw-github-naam>.github.io`
4. Vink daarna **Enforce HTTPS** aan.

Tip: zet in `index.html` bij `og:image` het volledige adres (bv. `https://charrylicious.be/assets/img/og-image.jpg`) zodra het domein werkt, dan ziet een gedeelde link er mooi uit op WhatsApp en Facebook.
