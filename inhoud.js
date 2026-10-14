/*
  ==========================================================
  CHARRYLICIOUS · INHOUD VAN DE WEBSITE
  ==========================================================
  Dit is het enige bestand dat je moet aanpassen voor:
  openingsuren, de agenda (events en dagschotels) en de kaart.

  Tips:
  · Verander alleen de tekst tussen de 'aanhalingstekens'.
  · Laat komma's en haakjes staan zoals ze staan.
  · Datums schrijf je als 'JJJJ-MM-DD', bv. '2026-10-24'.
  · Voorbije dagen in de agenda verdwijnen vanzelf.
  ==========================================================
*/

window.CHARRY = {

  telefoon: '0479 38 82 85',
  telefoonInternationaal: '+32479388285',
  adres: 'Avelgemstraat 121',
  gemeente: '8550 Zwevegem',
  instagram: '_charrylicious_',

  // Tekst die al klaarstaat als iemand op "Stuur een berichtje" tikt
  berichtje: 'Hallo Charrylicious! Ik wil graag een plekje reserveren op (dag) om (uur) voor (aantal) personen. Mijn naam is ',

  // Openingsuren. Gesloten = null
  uren: {
    maandag: null,
    dinsdag: null,
    woensdag: null,
    donderdag: null,
    vrijdag: null,
    zaterdag: ['14:00', '20:00'],
    zondag: ['14:00', '20:00']
  },

  // Uitzondering bovenaan bij de openingsuren (laat leeg '' als er geen is)
  uitzondering: '',

  // ---------------- AGENDA ----------------
  // foto: kies uit de map assets/img (bv. 'spaghetti.jpg'), of laat leeg ''
  // verplicht: true = reserveren is verplicht
  agenda: [
    {
      datum: '2026-10-17',
      titel: 'Hutspot met worst',
      label: 'Dagschotel',
      uur: 'enkel deze zaterdag · 20,00 per persoon',
      tekst: 'Een dampende pot hutspot zoals bij moeke, met een klontje boter erbij. Echt hutspotweer!',
      foto: 'hutspot.jpg',
      verplicht: true
    },
    {
      datum: '2026-10-24',
      titel: 'Spaghetti avond',
      label: 'Event',
      uur: 'vanaf 18u30 · 17,00 per persoon',
      tekst: 'Een grote kom spaghetti bolognese met vers geraspte kaas en een gezellige avond aan tafel.',
      foto: 'spaghetti.jpg',
      verplicht: true
    }
  ],

  // ---------------- SUGGESTIE VAN HET WEEKEND ----------------
  // Laat titel leeg '' om dit blokje te verbergen
  suggestie: {
    titel: "Pannenkoeken op oma's wijze",
    tekst: 'Onze suggestie van het weekend. Zoals oma ze bakte, met een flinke portie liefde.'
  },

  // ---------------- DE KAART ----------------
  // Geen prijzen. Volgorde hier = volgorde van de tabbladen.
  kaart: [
    {
      naam: 'Coffee club',
      titel: 'The coffee & hot drinks club',
      zin: 'Warm, romig en met liefde gezet.',
      foto: 'cappuccino.jpg',
      kleur: '#FFD4DC',
      items: ['Koffie', 'Espresso', 'Americano', 'Cappuccino, gewoon of met slagroom', 'Latte macchiato', 'Latte macchiato vanille, caramel of speculaas', 'Latte met vanille of chocolade ijs', 'Iced latte traditioneel', 'Espresso latte met honing', 'Iced espresso latte met honing', 'Iced espresso latte met honing en ijs', 'Verse warme chocolademelk: puur, melk, wit, caramel of pink', 'Verse munt thee', 'Rozenbottel thee', 'Kamille thee'],
      noot: 'Chocolademelk ook met slagroom. Extra water, melk of slagroom kan altijd.'
    },
    {
      naam: 'Cookie club',
      titel: 'The cookie club',
      zin: 'Vers gebakken, nog een beetje warm.',
      foto: 'cookies.jpg',
      kleur: '#F9CF86',
      items: ['Triple chocolate cookie', 'Chocolade bom cookie', 'The secret cookie met dadels en walnoten', 'The pink blush cookie'],
      noot: 'Ook als cookie mug of met ijs ertussen.'
    },
    {
      naam: 'Cold homemade drinks',
      titel: 'Cold homemade drinks',
      zin: 'Zelf gemaakt, ijskoud geschonken.',
      foto: 'icetea.jpg',
      kleur: '#96C8B4',
      items: ['Ice tea framboos, citroen en honing', 'Ice tea gember en honing', 'Ice tea blauwe bessen, citroen en honing', 'Huisgemaakte milkshake vanille of chocolade', 'Huisgemaakte milkshake banaan of aardbei'],
      noot: 'Alles huisgemaakt, elke dag vers.'
    },
    {
      naam: 'Een goestingske',
      titel: 'Een goestingske',
      zin: 'Voor de kleine en de grote honger.',
      foto: 'borrelhapjes.jpg',
      kleur: '#F9B0B0',
      items: ['Portie chips, zout of paprika', 'Portie kaas', 'Portie olijven', 'Borrelplank met kaas en olijven', 'Croque met een hoek af', 'Croque monsieur met garnituur', 'Croque boemboem', 'Pasta bolognese'],
      noot: 'Pasta bolognese vanaf 17u.'
    },
    {
      naam: 'Sweets',
      titel: 'Sweets & ijs',
      zin: 'Want er is altijd plaats voor dessert.',
      foto: 'brownies.jpg',
      kleur: '#FFD4DC',
      items: ['Huisgemaakte brownies', 'Chocolademousse', 'Coupe vanille', 'Coupe chocolade', 'Coupe dame blanche', 'Coupe brésilienne', 'Coupe bananasplit', 'Sorbet van passievrucht', 'Affogato', 'Schepijs'],
      noot: ''
    },
    {
      naam: 'Iets fris & de biertjes club',
      titel: 'Iets fris & de biertjes club',
      zin: 'Iets fris voor bij de babbel.',
      foto: 'bubbels.jpg',
      kleur: '#F9CF86',
      items: ['Water Chaudfontaine', 'Tönissteiner orange', 'Coca-Cola regular of zero', 'Royal Bliss tonic of agrum', 'Appeltiser', 'Appelsap of appel-kersensap', 'Fruitsap', 'Stella Artois, ook 0%', 'Liefmans, ook 0%', 'Badou, ook 0% of 75cl', 'Orval', 'Ypra', 'Omer', 'St. Bernardus'],
      noot: ''
    },
    {
      naam: 'Iets met & iets zonder',
      titel: 'Iets met & iets zonder club',
      zin: 'Met of zonder alcohol, altijd feestelijk.',
      foto: 'aperitief.jpg',
      kleur: '#96C8B4',
      items: ['Cava', 'Huisgemaakte picon', 'Witte wijn, ook 0%', 'Rosé wijn, ook 0%', 'Rode wijn, ook 0%'],
      noot: 'Elke wijn bestaat ook alcoholvrij.'
    }
  ]
};
