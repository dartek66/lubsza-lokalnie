import { Article, OfficialAnnouncement, EventItem, ForumPost, GalleryItem, Survey, CitizenReview, ReviewCriteria, WasteCollectionSchedule, ResidentAlert, SoltysContact } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Rewitalizacja Parku Dworskiego w Lubszy – sukces zrealizowany, ale co z oświetleniem przyległych ulic? [Audyt Mieszkańca]',
    slug: 'rewitalizacja-parku-w-lubszy-audyt-mieszkanca',
    excerpt: 'Zakończono modernizację alejek i placu zabaw w Parku Dworskim. Inwestycja cieszy oko, jednak mieszkańcy słusznie pytają: dlaczego urząd zapomniał o doświetleniu niebezpiecznego skrzyżowania przy ul. Leśnej?',
    content: `Jako mieszkańcy Lubszy doceniamy, gdy nasze podatki wracają w postaci zadbanej przestrzeni publicznej. Zakończenie rewitalizacji zabytkowego Parku Dworskiego to bez wątpienia estetyczny sukces – nowe drewniane urządzenia dla dzieci, alejki spacerowe i wiata rowerowa robią świetne wrażenie.

Jednak z punktu widzenia obywatelskiego audytu nie możemy przejść obojętnie obok niedociągnięć:
1. **Brak doświetlenia dojścia do parku**: Nowe solarne latarnie stanęły wewnątrz parku, ale samo skrzyżowanie ul. Brzeskiej z ul. Leśną po zmroku tonie w ciemnościach. To tamtędy dzieci wracają z placu zabaw!
2. **Koszty i przejrzystość**: Zwróciliśmy się z wnioskiem o informację publiczną dotyczącą ostatecznego kosztorysu powykonawczego – poinformujemy mieszkańców, czy inwestycja zamknęła się w pierwotnym budżecie.
3. **Czystość i monitoring**: Apelujemy do władz gminy o szybki montaż zapowiadanych kamer, aby wandale nie zniszczyli pracy wykonawców w pierwsze tygodnie po otwarciu.

Pochwała dla wykonawców za staranność, ale czerwona kartka dla urzędu za brak kompleksowego spojrzenia na bezpieczeństwo drogowe wokół parku!`,
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    author: 'Dariusz K.',
    authorRole: 'Mieszkaniec Lubszy & Inicjatywa Obywatelska',
    publishDate: '2026-08-26',
    readTimeMinutes: 4,
    category: 'kontrola',
    views: 1240,
    likes: 218,
    tags: ['Audyt Obywatelski', 'Lubsza', 'Park Dworski', 'Bezpieczeństwo', 'Inwestycje UG'],
    isFeatured: true,
    comments: [
      {
        id: 'c1',
        author: 'Marek z Lubszy',
        village: 'Lubsza',
        createdAt: '2026-08-26 18:30',
        content: 'Dokładnie tak! Park ładny, ale na Leśnej wieczorem jest po prostu ciemno jak w jaskini. Brawo za poruszenie tego tematu na portalu!',
        likes: 34,
      },
      {
        id: 'c2',
        author: 'Katarzyna P.',
        village: 'Czepielowice',
        createdAt: '2026-08-26 20:15',
        content: 'Dobrze, że ktoś wreszcie kontroluje te inwestycje z perspektywy zwykłego człowieka, a nie tylko laurki na oficjalnym BIP-ie.',
        likes: 27,
      },
    ],
  },
  {
    id: 'art-2',
    title: 'Budżet Gminy Lubsza pod lupą: Gdzie trafiają nasze podatki i które sołectwa czekają najdłużej na remonty dróg?',
    slug: 'budzet-gminy-lubsza-pod-lupa-inwestycje',
    excerpt: 'Przeanalizowaliśmy wydatki majątkowe gminy na 2026 rok. Sprawdzamy, dlaczego niektóre sołectwa otrzymują coroczne wielomilionowe wsparcie, a inne nie mogą doprosić się 200 metrów chodnika.',
    content: `Samorząd to nie prywatny folwark wójta ani garstki radnych – to wspólnota ponad 8,9 tysiąca mieszkańców 21 sołectw. W ramach obywatelskiego monitoringu budżetu przygotowaliśmy zestawienie wydatków na infrastrukturę drogową.

Co wynika z analizy uchwał budżetowych?
- Ponad 62% środków na nawierzchnie asfaltowe trafia do zaledwie 4 największych miejscowości w gminie.
- Mieszkańcy Rogalic, Błot i Śmiechowic od ponad 3 lat składają petycje o bezpieczne utwardzenie poboczy i remonty dziurawych odcinków po zimie.
- Koszty administracyjne i obsługi urzędu wzrosły o 11% rok do roku – pytamy, czy za tym wzrostem poszła lepsza jakość obsługi petenta?

Będziemy obecni na najbliższej sesji Rady Gminy i zdamy Wam dokładną relację z dyskusji nad zmianami w planie finansowym!`,
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    author: 'Redakcja Obywatelska',
    authorRole: 'Głos Mieszkańców Gminy Lubsza',
    publishDate: '2026-08-25',
    readTimeMinutes: 5,
    category: 'kontrola',
    views: 980,
    likes: 185,
    tags: ['Budżet', 'Podatki', 'Drogi', 'Rada Gminy', 'Równy Rozwój Sołectw'],
    comments: [
      {
        id: 'c3',
        author: 'Grzegorz',
        village: 'Rogalice',
        createdAt: '2026-08-25 14:20',
        content: 'U nas w Rogalicach pobocze na wyjeździe to dramat po każdym deszczu. Radni obiecują przed wyborami, a potem cisza. Dzięki za ten artykuł!',
        likes: 19,
      }
    ],
  },
  {
    id: 'art-3',
    title: 'Dożynki Gminne w Szydłowicach – wspaniała praca Kół Gospodyń Wiejskich! Doceniamy tradycję i trud rolników',
    slug: 'dozynki-gminne-2026-szydlowice-tradycja',
    excerpt: 'Święto plonów w Szydłowicach zbliża się wielkimi krokami. To doskonała okazja, by podziękować rolnikom z naszej gminy oraz paniom z KGW, które wkładają serce w wieńce dożynkowe i lokalne smaki.',
    content: `Dożynki to jedno z najpiękniejszych świąt w życiu polskiej wsi. Tegorocznym gospodarzem jest sołectwo Szydłowice.

Chcemy w tym miejscu złożyć ogromne ukłony dla wszystkich Kół Gospodyń Wiejskich z naszej gminy. To właśnie oddolna energia mieszkanek i mieszkańców – od pieczenia tradycyjnych ciast, przez przygotowanie stoisk rękodzieła, aż po misternie plecione wieńce – tworzy duszę tego wydarzenia.

Warto pojawić się całą rodziną 6 września na boisku w Szydłowicach i wesprzeć lokalnych wytwórców! Jednocześnie apelujemy do urzędników o lepsze oznakowanie tymczasowych parkingów, aby nie powtórzył się chaos komunikacyjny z zeszłego roku.`,
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    author: 'Teresa B.',
    authorRole: 'Mieszkanka Szydłowic & Społecznik',
    publishDate: '2026-08-24',
    readTimeMinutes: 3,
    category: 'kultura',
    views: 740,
    likes: 142,
    tags: ['Dożynki', 'Szydłowice', 'KGW', 'Rolnictwo', 'Tradycja'],
    comments: [
      {
        id: 'c4',
        author: 'Grażyna B.',
        village: 'Szydłowice',
        createdAt: '2026-08-25 11:00',
        content: 'Zapraszamy serdecznie! Mamy przygotowany wspaniały poczęstunek i program.',
        likes: 12,
      },
    ],
  },
  {
    id: 'art-4',
    title: 'Nowy wóz dla OSP Mąkoszyce – wielkie brawa dla druhów! Przypominamy: to determinacja strażaków wymusiła środki',
    slug: 'nowy-woz-strazacki-osp-makoszyce-sukces-druhow',
    excerpt: 'Nowoczesny średni samochód gaśniczy 4x4 trafił do remizy w Mąkoszycach. Władze chętnie pozują do zdjęć, ale warto pamiętać, ile miesięcy walki i pisania wniosków kosztowało to samych strażaków ochotników.',
    content: `Bezpieczeństwo w otoczeniu potężnych Lasów Lubszańskich i Stobrawskiego Parku Krajobrazowego to sprawa nadrzędna. Nowy wóz ratowniczo-gaśniczy dla OSP Mąkoszyce to fantastyczna wiadomość dla całej gminy.

Warto jednak przypomnieć kulisy tej sprawy:
- To zarząd OSP samodzielnie przygotował aplikację grantową i zabezpieczył dofinansowanie z funduszy krajowych.
- Wkład gminny był wielokrotnie przesuwany w czasie przez urzędników, dopóki sprawą nie zainteresowali się mieszkańcy i lokalne media.

Dziś gratulujemy druhom strażakom! Ich bezinteresowna służba ratuje życie i mienie każdego z nas. Chylimy czoła przed Waszą pasją i gotowością bojową!`,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    author: 'Dariusz K.',
    authorRole: 'Redakcja Obywatelska Lubsza',
    publishDate: '2026-08-20',
    readTimeMinutes: 3,
    category: 'spolecznosc',
    views: 890,
    likes: 210,
    tags: ['OSP', 'Mąkoszyce', 'Strażacy', 'Bezpieczeństwo', 'Inicjatywa Oddolna'],
    comments: [],
  },
  {
    id: 'art-5',
    title: 'Dzikie wysypiska w lasach i przy drogach polnych: Zgłaszamy, a urząd milczy. Kiedy pojawią się fotopułapki?',
    slug: 'dzikie-wysypiska-lasy-lubszanskie-apel-o-fotopulapki',
    excerpt: 'Opony, gruz budowlany i odpady wielkogabarytowe w rejonie rezerwatu Lubsza. Mieszkańcy mają dość bierności. Pytamy wójta i Referat Ochrony Środowiska o konkretny plan walki ze śmieciarzami.',
    content: `Lasy Lubszańskie to największy skarb przyrodniczy naszej małej ojczyzny. Niestety, niemal co tydzień na leśnych duktach i drogach dojazdowych pojawiają się sterty podrzuconych śmieci po remontach.

Mimo wielokrotnych zgłoszeń mieszkańców przez formularz i bezpośrednio do urzędu:
1. Odpady leżą tygodniami, zanim zostaną uprzątnięte.
2. Gmina wciąż nie wdrożyła mobilnych fotopułapek, które z powodzeniem stosują sąsiednie nadleśnictwa i gminy.
3. Koszty utylizacji dzikich śmieci pokrywane są ze wspólnej kasy wszystkich mieszkańców!

Domagamy się publicznej informacji od władz gminy: ile mandatów wystawiono w 2026 roku za zaśmiecanie lasów i kiedy zakupiony zostanie system monitoringu newralgicznych miejsc?`,
    coverImage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    author: 'Grupa Ekologiczna Mieszkańców',
    authorRole: 'Straż Obywatelska',
    publishDate: '2026-08-18',
    readTimeMinutes: 4,
    category: 'kontrola',
    views: 650,
    likes: 153,
    tags: ['Ekologia', 'Śmieci', 'Lasy Lubszańskie', 'Kontrola UG', 'Ochrona Środowiska'],
    comments: [],
  },
  {
    id: 'art-6',
    title: 'Sesje Rady Gminy pod okiem mieszkańców: Kto z radnych aktywnie walczy o sołectwo, a kto tylko podnosi rękę?',
    slug: 'sesje-rady-gminy-lubsza-monitoring-aktywnosci-radnych',
    excerpt: 'Przyglądamy się interpelacjom i wystąpieniom radnych podczas ostatnich posiedzeń. Sprawdź, czy Twój przedstawiciel w Radzie Gminy zadaje niewygodne pytania w imieniu wyborców.',
    content: `Transparentność władzy to podstawa zdrowego samorządu. W ramach naszego cyklu „Radni pod lupą” podsumowujemy pierwsze półrocze prac Rady Gminy Lubsza.

Z naszych obserwacji wynika, że tylko nieliczni radni korzystają z prawa składania pisemnych interpelacji i dopytują o szczegóły przetargów drogowych czy opóźnienia w realizacji wniosków sołeckich.

Zachęcamy mieszkańców do oglądania transmisji z sesji oraz do zadawania pytań swoim sołtysom i radnym przed kolejnym posiedzeniem 3 września. Nie bądźmy biernymi widzami!`,
    coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    author: 'Obserwator Samorządowy',
    authorRole: 'Mieszkaniec Gminy Lubsza',
    publishDate: '2026-08-15',
    readTimeMinutes: 4,
    category: 'okiem_mieszkanca',
    views: 810,
    likes: 198,
    tags: ['Rada Gminy', 'Sesja', 'Radni', 'Interpelacje', 'Jawność'],
    comments: [],
  }
];

export const OFFICIAL_ANNOUNCEMENTS: OfficialAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Zwołanie XXVIII Zwyczajnej Sesji Rady Gminy Lubsza na dzień 3 września 2026 r.',
    category: 'sesja_rady',
    date: '2026-08-27',
    urgent: true,
    department: 'Biuro Rady Gminy',
    excerpt: 'Przewodniczący Rady Gminy Lubsza informuje, że w sali narad Urzędu Gminy odbędzie się sesja poświęcona m.in. zmianom w budżecie oraz planom zagospodarowania przestrzennego.',
    fullText: `Na podstawie art. 20 ust. 1 ustawy z dnia 8 marca 1990 r. o samorządzie gminnym zwołuję XXVIII Zwyczajną Sesję Rady Gminy Lubsza na dzień 3 września 2026 r. (czwartek) o godz. 10:00 w sali konferencyjnej Urzędu Gminy w Lubszy, ul. Brzeska 16.

Porządek obrad:
1. Otwarcie sesji i stwierdzenie prawomocności obrad.
2. Przyjęcie protokołu z poprzedniej sesji.
3. Sprawozdanie Wójta Gminy z działalności międzysesyjnej.
4. Podjęcie uchwały w sprawie zmian w budżecie gminy na 2026 rok.
5. Uchwalenie lokalnego programu wspierania edukacji ekologicznej.
6. Wolne wnioski i zapytania mieszkańców oraz radnych.

Obrady będą transmitowane na żywo na kanale YouTube Gminy Lubsza.`,
    documentNumber: 'BRG.0002.28.2026',
    attachmentName: 'Porzadek_obrad_Sesja_XXVIII.pdf',
    attachmentSize: '412 KB',
  },
  {
    id: 'ann-2',
    title: 'Konsultacje społeczne dotyczące projektu Strategii Rozwoju Gminy Lubsza do roku 2035',
    category: 'konsultacje',
    date: '2026-08-25',
    urgent: false,
    department: 'Referat Rozwoju Gospodarczego i Promocji',
    excerpt: 'Zapraszamy wszystkich mieszkańców, sołtysów i organizacje pozarządowe do zgłaszania uwag i propozycji do dokumentu strategicznego gminy.',
    fullText: `Wójt Gminy Lubsza ogłasza rozpoczęcie konsultacji społecznych projektu dokumentu "Strategia Rozwoju Gminy Lubsza 2035". Formularze konsultacyjne można składać osobiście w sekretariacie urzędu lub elektronicznie poprzez platformę ePUAP oraz formularz online na niniejszym portalu.`,
    documentNumber: 'RRG.033.4.2026',
    attachmentName: 'Projekt_Strategii_Lubsza_2035.pdf',
    attachmentSize: '2.8 MB',
  },
  {
    id: 'ann-3',
    title: 'Komunikat w sprawie czasowej zmiany organizacji ruchu na trasie Lubsza – Dobrzyń',
    category: 'ostrzezenie',
    date: '2026-08-24',
    urgent: true,
    department: 'Referat Inwestycji i Dróg',
    excerpt: 'W dniach 1-5 września z powodu układania nowej nawierzchni bitumicznej wprowadzony zostanie ruch wahadłowy sterowany sygnalizacją świetlną.',
    fullText: `Informujemy kierowców i mieszkańców, że w związku z realizacją zadania przebudowy drogi gminnej relacji Lubsza - Dobrzyń, wystąpią czasowe utrudnienia. Prosimy o zachowanie szczególnej ostrożności i stosowanie się do tymczasowego oznakowania.`,
    documentNumber: 'ID.7011.12.2026',
    attachmentName: 'Mapa_objazdow_Lubsza_Dobrzyn.pdf',
    attachmentSize: '1.2 MB',
  },
  {
    id: 'ann-4',
    title: 'Nabór wniosków na dofinansowanie usuwania wyrobów zawierających azbest z terenu gminy',
    category: 'dotacje',
    date: '2026-08-21',
    urgent: false,
    department: 'Referat Ochrony Środowiska',
    excerpt: 'Właściciele nieruchomości mogą ubiegać się o 100% refundację kosztów demontażu, transportu i utylizacji pokryć dachowych z eternitu.',
    fullText: `Wnioski przyjmowane są do 30 września 2026 r. Dofinansowanie pokrywa koszty zbiórki i unieszkodliwienia odpadów niebezpiecznych z posesji prywatnych.`,
    documentNumber: 'OŚ.6220.8.2026',
    attachmentName: 'Wniosek_Azbest_2026.pdf',
    attachmentSize: '320 KB',
  },
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Piknik Ekologiczny i Otwarcie Parku Dworskiego w Lubszy',
    date: '2026-08-29',
    time: '14:00 - 20:00',
    location: 'Park Dworski, ul. Parkowa, Lubsza',
    village: 'Lubsza',
    category: 'festyn',
    description: 'Warsztaty leśne z leśnikami z Nadleśnictwa Brzeg, konkursy z nagrodami dla dzieci, bezpłatne dmuchańce, strefa gastronomiczna i koncert lokalnego zespołu wokalnego.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    organizer: 'GOK Lubsza & Sołectwo Lubsza',
    attendeesCount: 142,
  },
  {
    id: 'ev-2',
    title: 'Dożynki Gminne 2026 w Szydłowicach',
    date: '2026-09-06',
    time: '12:30 - 23:00',
    location: 'Kompleks rekreacyjno-sportowy w Szydłowicach',
    village: 'Szydłowice',
    category: 'kultura',
    description: 'Święto plonów z udziałem wszystkich sołectw. Tradycyjny korowód, konkurs wieńców, stoiska kulinarne, występy kabaretowe oraz zabawa taneczna do białego rana.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    organizer: 'Wójt Gminy Lubsza, Rada Sołecka Szydłowice',
    attendeesCount: 310,
  },
  {
    id: 'ev-3',
    title: 'Bieg Przełajowy "Ścieżkami Lasów Lubszańskich" (edycja jesienna)',
    date: '2026-09-19',
    time: '10:00 - 14:00',
    location: 'Leśniczówka Rogalice / Rezerwat Przyrody',
    village: 'Rogalice',
    category: 'sport',
    description: 'Biegi na dystansach 5 km, 10 km oraz marsz Nordic Walking urokliwymi trasami Stobrawskiego Parku Krajobrazowego. Pamiątkowe medale z drewna dla każdego uczestnika!',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80',
    organizer: 'Stowarzyszenie Miłośników Ziemi Lubszańskiej & LKS Olimpia',
    attendeesCount: 88,
  },
  {
    id: 'ev-4',
    title: 'Warsztaty Ceramiki i Rękodzieła dla Dzieci i Seniorów',
    date: '2026-09-10',
    time: '16:30 - 18:30',
    location: 'Świetlica Wiejska w Czepielowicach',
    village: 'Czepielowice',
    category: 'warsztaty',
    description: 'Bezpłatne warsztaty lepienia w glinie i tworzenia tradycyjnych opolskich ozdób. Zapewniamy wszystkie materiały i wypał prac.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    organizer: 'GOK Lubsza & KGW Czepielowice',
    attendeesCount: 24,
  },
];

export const FORUM_POSTS: ForumPost[] = [
  {
    id: 'forum-1',
    title: 'Inicjatywa: Wspólne sprzątanie brzegów rzeki Smortawy przed jesienią',
    content: 'Drodzy sąsiedzi z Lubszy i okolic! Proponuję zorganizować w pierwszą sobotę września społeczną akcję posprzątania okolic rzeki Smortawy i ścieżek spacerowych w stronę lasu. Czy Urząd Gminy mógłby zapewnić worki na odpady i ich bezpłatny odbiór? Kto z Was byłby chętny dołączyć?',
    author: 'Wojciech M.',
    authorRole: 'Mieszkaniec',
    village: 'Lubsza',
    category: 'inicjatywy',
    createdAt: '2026-08-26 14:10',
    likes: 34,
    tags: ['Ekologia', 'Smortawa', 'AkcjaSpołeczna', 'Lubsza'],
    isPinned: true,
    replies: [
      {
        id: 'fr-1',
        author: 'Sołtys Lubszy',
        authorRole: 'Sołtys',
        village: 'Lubsza',
        createdAt: '2026-08-26 15:40',
        content: 'Świetny pomysł Panie Wojciechu! Rozmawiałem z Referatem Ochrony Środowiska – urząd zapewni rękawice, worki oraz podstawi kontener przy moście na ul. Młyńskiej.',
        likes: 21,
      },
      {
        id: 'fr-2',
        author: 'Magdalena R.',
        village: 'Lubsza',
        createdAt: '2026-08-26 17:20',
        content: 'Będziemy z całą rodziną i harcerzami. Warto dbać o nasze piękne tereny!',
        likes: 9,
      },
    ],
  },
  {
    id: 'forum-2',
    title: 'Oświetlenie przejścia dla pieszych przy szkole podstawowej w Lubszy',
    content: 'Zbliża się wrzesień i powrót dzieci do szkoły. Czy jest szansa na doświetlenie przejścia dla pieszych przy Zespole Szkolno-Przedszkolnym od strony ul. Brzeskiej? W porannych godzinach jesiennych widoczność bywa ograniczona.',
    author: 'Karolina S.',
    authorRole: 'Mieszkaniec',
    village: 'Lubsza',
    category: 'drogi_infrastruktura',
    createdAt: '2026-08-25 09:30',
    likes: 28,
    tags: ['Bezpieczeństwo', 'Szkoła', 'Dzieci', 'PrzejścieDlaPieszych'],
    replies: [
      {
        id: 'fr-3',
        author: 'Radny Gminy Lubsza',
        authorRole: 'Radny',
        village: 'Czepielowice',
        createdAt: '2026-08-25 12:15',
        content: 'Sprawa została wpisana do wniosków budżetowych na najbliższą sesję. Zostaną tam zamontowane aktywne znaki D-6 z pulsującym światłem LED i doświetleniem asymetrycznym.',
        likes: 18,
      },
    ],
  },
  {
    id: 'forum-3',
    title: 'Oddam sadzonki malin i jeżyn bezkolcowych dla pasjonatów ogrodnictwa',
    content: 'Podczas prac w ogrodzie w Mąkoszycach zostało mi około 30 zdrowych, ukorzenionych sadzonek pysznych malin jesiennych. Chętnie oddam za darmo lub wymienię na sadzonki truskawek/bylin. Odbiór osobisty.',
    author: 'Janusz K.',
    authorRole: 'Mieszkaniec',
    village: 'Mąkoszyce',
    category: 'ogloszenia_drobne',
    createdAt: '2026-08-24 16:50',
    likes: 14,
    tags: ['Ogród', 'OddamZaDarmo', 'Mąkoszyce'],
    replies: [
      {
        id: 'fr-4',
        author: 'Beata W.',
        village: 'Szydłowice',
        createdAt: '2026-08-24 18:00',
        content: 'Dzień dobry, chętnie odbiorę 10 sztuk jutro popołudniu. Napisałam wiadomość prywatną!',
        likes: 2,
      },
    ],
  },
  {
    id: 'forum-4',
    title: 'Rozkład jazdy autobusów do Brzegu od 1 września – czy są zmiany?',
    content: 'Czy ktoś posiada aktualną rozpiskę kursów linii podmiejskich Lubsza - Brzeg oraz Pisarzowice - Brzeg obowiązującą od nowego roku szkolnego?',
    author: 'Monika K.',
    authorRole: 'Mieszkaniec',
    village: 'Pisarzowice',
    category: 'ogolne',
    createdAt: '2026-08-23 11:20',
    likes: 9,
    tags: ['Komunikacja', 'Autobusy', 'Brzeg', 'Rozkład'],
    replies: [
      {
        id: 'fr-5',
        author: 'Michał D.',
        village: 'Lubsza',
        createdAt: '2026-08-23 13:45',
        content: 'Tak, dodano 2 dodatkowe poranne kursy o 6:45 i 7:15. Pełny PDF wisi już w sekcji przydatnych linków na tym portalu!',
        likes: 7,
      },
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Poranne mgły nad Lasami Lubszańskimi',
    location: 'Rezerwat Przyrody Lubsza',
    category: 'przyroda',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    author: 'Krzysztof Leśny',
    date: '2026-08-15',
    description: 'Niezwykły widok na stary drzewostan dębowy o świcie w Stobrawskim Parku Krajobrazowym.',
    likes: 78,
  },
  {
    id: 'gal-2',
    title: 'Zabytkowy Kościół pw. św. Walentego w Lubszy',
    location: 'Lubsza, centrum',
    category: 'zabytki',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-195fe57876a4?auto=format&fit=crop&w=1000&q=80',
    author: 'Zofia Malinowska',
    date: '2026-07-28',
    description: 'Architektoniczna perła naszej gminy w promieniach zachodzącego letniego słońca.',
    likes: 95,
  },
  {
    id: 'gal-3',
    title: 'Kajaki na meandrach rzeki Smortawy',
    location: 'Przystań kajakowa Lubsza - Dobrzyń',
    category: 'wydarzenia',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    author: 'Klub Wodny Lubsza',
    date: '2026-08-05',
    description: 'Weekendowy spływ rodzinny czystą i malowniczą trasą rzeczną.',
    likes: 64,
  },
  {
    id: 'gal-4',
    title: 'Złote łany zbóż w sołectwie Tarnowiec',
    location: 'Tarnowiec',
    category: 'przyroda',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
    author: 'Rolnik z Pasją',
    date: '2026-08-10',
    description: 'Żniwa 2026 w gminie Lubsza – urodzajne gleby Niziny Śląskiej.',
    likes: 52,
  },
  {
    id: 'gal-5',
    title: 'Nowy plac zabaw i siłownia plenerowa w Parku Dworskim',
    location: 'Lubsza',
    category: 'inwestycje',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1000&q=80',
    author: 'Referat Inwestycji',
    date: '2026-08-22',
    description: 'Nowa bezpieczna nawierzchnia i nowoczesne certyfikowane urządzenia.',
    likes: 83,
  },
  {
    id: 'gal-6',
    title: 'Gminny turniej piłkarski sołectw w Szydłowicach',
    location: 'Szydłowice',
    category: 'wydarzenia',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
    author: 'LKS Olimpia',
    date: '2026-07-20',
    description: 'Emocjonujące zmagania 12 drużyn reprezentujących sołectwa gminy Lubsza.',
    likes: 41,
  },
];

export const INITIAL_SURVEYS: Survey[] = [
  {
    id: 'survey-1',
    question: 'Jaki priorytet inwestycyjny powinien być kluczowy w budżecie Gminy Lubsza na rok 2027?',
    description: 'Głosowanie mieszkańców posłuży jako bezpośrednia rekomendacja dla Wójta i Radnych podczas prac nad projektem budżetu.',
    endsAt: '2026-09-15',
    category: 'Inwestycje i Rozwój',
    options: [
      { id: 'opt-1', label: 'Budowa i modernizacja dróg gminnych oraz chodników', votes: 245 },
      { id: 'opt-2', label: 'Rozbudowa sieci tras rowerowych w Lasach Lubszańskich', votes: 168 },
      { id: 'opt-3', label: 'Dofinansowanie ekologicznych źródeł ciepła i OZE dla domów', votes: 114 },
      { id: 'opt-4', label: 'Nowoczesne zaplecze sportowo-rekreacyjne dla dzieci i młodzieży', votes: 139 },
      { id: 'opt-5', label: 'Instalacja inteligentnego monitoringu i oświetlenia LED w sołectwach', votes: 82 },
    ],
    totalVotes: 748,
    isActive: true,
  },
  {
    id: 'survey-2',
    question: 'W jakich godzinach Urząd Gminy w Lubszy powinien być najbardziej dostępny dla pracujących mieszkańców?',
    description: 'Analizujemy potrzebę wydłużenia czasu pracy urzędu w wybrane dni tygodnia.',
    endsAt: '2026-09-30',
    category: 'Obsługa Mieszkańca',
    options: [
      { id: 'opt-21', label: 'W każdy wtorek do godziny 18:00', votes: 189 },
      { id: 'opt-22', label: 'W każdą środę do godziny 19:00', votes: 142 },
      { id: 'opt-23', label: 'Jedna dyżurna sobota w miesiącu (9:00 - 13:00)', votes: 310 },
      { id: 'opt-24', label: 'Obecne godziny (7:30 - 15:30) są dla mnie wystarczające', votes: 65 },
    ],
    totalVotes: 706,
    isActive: true,
  },
];

export const INITIAL_CRITERIA: ReviewCriteria[] = [
  { id: 'crit-1', name: 'Dostępność wójta i otwartość na postulaty mieszkańców', score: 3.7, reviewsCount: 384 },
  { id: 'crit-2', name: 'Szybkość reakcji referatów na zgłaszane usterki i dziury w drogach', score: 3.3, reviewsCount: 384 },
  { id: 'crit-3', name: 'Przejrzystość wydatków budżetowych i przetargów', score: 3.5, reviewsCount: 384 },
  { id: 'crit-4', name: 'Uprzejmość i pomocność pracowników w biurze obsługi', score: 4.6, reviewsCount: 384 },
  { id: 'crit-5', name: 'Dbałość o czystość terenów gminnych, lasów i gospodarkę odpadami', score: 3.8, reviewsCount: 384 },
];

export const INITIAL_REVIEWS: CitizenReview[] = [
  {
    id: 'rev-1',
    author: 'Stanisław B.',
    village: 'Lubsza',
    rating: 5,
    department: 'Centrum Obsługi Mieszkańca / Kancelaria Urzędu',
    comment: 'Pochwała: Wymiana dowodu osobistego oraz meldunek załatwione sprawnie i bez kolejek. Pani w okienku niezwykle uprzejma i cierpliwa. Duży plus za terminal płatniczy.',
    date: '2026-08-25',
    officialReply: {
      date: '2026-08-26',
      author: 'Referat Spraw Obywatelskich',
      text: 'Dziękujemy za pozytywną opinię o pracy naszych urzędników.',
    },
    helpfulCount: 31,
  },
  {
    id: 'rev-2',
    author: 'Marek W.',
    village: 'Rogalice',
    rating: 2,
    department: 'Referat Inwestycji i Dróg (Stan nawierzchni & Chodniki)',
    comment: 'Wpadka / Do Poprawy: Od ponad dwóch miesięcy prosimy urząd o załatanie głębokich wyrw w asfalcie na drodze dojazdowej. Samochody niszczą zawieszenie, a odpowiedź urzędu to wieczne „brak środków w bieżącym kwartale”. Żądamy równego traktowania mniejszych sołectw!',
    date: '2026-08-23',
    helpfulCount: 42,
  },
  {
    id: 'rev-3',
    author: 'Katarzyna L.',
    village: 'Lubsza',
    rating: 2,
    department: 'Referat Ochrony Środowiska (Dzikie wysypiska & Czyste Powietrze)',
    comment: 'Wpadka: Zgłaszałam stertę eternitu i opon porzuconą przy drodze leśnej w lipcu. Mamy koniec sierpnia i śmieci nadal leżą! Kiedy wreszcie gmina zainwestuje w fotopułapki i zacznie karać śmieciarzy, zamiast ignorować zgłoszenia mieszkańców?',
    date: '2026-08-20',
    officialReply: {
      date: '2026-08-21',
      author: 'Referat Ochrony Środowiska UG',
      text: 'Zlecenie usunięcia odpadów niebezpiecznych zostało przekazane do firmy utylizacyjnej. Termin realizacji: do 5 września.',
    },
    helpfulCount: 38,
  },
  {
    id: 'rev-4',
    author: 'Tomasz G.',
    village: 'Mąkoszyce',
    rating: 4,
    department: 'Wójt Gminy Lubsza (Działania & Obietnice)',
    comment: 'Ocena mieszana: Pochwała za wsparcie jednostki OSP i zakup wozu strażackiego, jednak wójt powinien częściej organizować otwarte dyżury w sołectwach, a nie tylko przyjmować w gabinecie w Lubszy.',
    date: '2026-08-16',
    helpfulCount: 25,
  }
];

export const WASTE_SCHEDULES: WasteCollectionSchedule[] = [
  {
    village: 'Lubsza',
    dates: [
      { date: '2026-08-28', types: ['bio', 'zmieszane'] },
      { date: '2026-09-04', types: ['plastik', 'papier'] },
      { date: '2026-09-11', types: ['bio', 'zmieszane', 'szklo'] },
      { date: '2026-09-18', types: ['plastik', 'papier'] },
      { date: '2026-09-25', types: ['bio', 'zmieszane', 'wielkogabarytowe'] },
    ],
  },
  {
    village: 'Czepielowice',
    dates: [
      { date: '2026-08-29', types: ['bio', 'zmieszane'] },
      { date: '2026-09-05', types: ['plastik', 'papier'] },
      { date: '2026-09-12', types: ['bio', 'zmieszane', 'szklo'] },
      { date: '2026-09-19', types: ['plastik', 'papier'] },
      { date: '2026-09-26', types: ['bio', 'zmieszane', 'wielkogabarytowe'] },
    ],
  },
  {
    village: 'Mąkoszyce',
    dates: [
      { date: '2026-08-31', types: ['bio', 'zmieszane'] },
      { date: '2026-09-07', types: ['plastik', 'papier'] },
      { date: '2026-09-14', types: ['bio', 'zmieszane', 'szklo'] },
      { date: '2026-09-21', types: ['plastik', 'papier'] },
      { date: '2026-09-28', types: ['bio', 'zmieszane', 'wielkogabarytowe'] },
    ],
  },
  {
    village: 'Szydłowice',
    dates: [
      { date: '2026-09-01', types: ['bio', 'zmieszane'] },
      { date: '2026-09-08', types: ['plastik', 'papier'] },
      { date: '2026-09-15', types: ['bio', 'zmieszane', 'szklo'] },
      { date: '2026-09-22', types: ['plastik', 'papier'] },
      { date: '2026-09-29', types: ['bio', 'zmieszane', 'wielkogabarytowe'] },
    ],
  },
  {
    village: 'Dobrzyń',
    dates: [
      { date: '2026-09-02', types: ['bio', 'zmieszane'] },
      { date: '2026-09-09', types: ['plastik', 'papier'] },
      { date: '2026-09-16', types: ['bio', 'zmieszane', 'szklo'] },
      { date: '2026-09-23', types: ['plastik', 'papier'] },
      { date: '2026-09-30', types: ['bio', 'zmieszane', 'wielkogabarytowe'] },
    ],
  },
];

export const INITIAL_ALERTS: ResidentAlert[] = [
  {
    id: 'alt-1',
    title: 'Uszkodzona latarnia uliczna przy wjeździe na ul. Leśną',
    category: 'oswietlenie',
    village: 'Lubsza',
    locationDetails: 'Ul. Leśna, naprzeciwko posesji nr 14',
    description: 'Lampa migocze w nocy i gaśnie, stwarzając niebezpieczeństwo dla pieszych wracających od przystanku.',
    status: 'w_realizacji',
    date: '2026-08-25',
    upvotes: 12,
  },
  {
    id: 'alt-2',
    title: 'Pęknięta gałąź wisząca nad ścieżką rowerową w stronę rezerwatu',
    category: 'bezpieczenstwo',
    village: 'Rogalice',
    locationDetails: 'Szlak zielony, 300m za leśniczówką',
    description: 'Duży konar dębowy nadłamany po ostatniej burzy grozi upadkiem na trasę rowerzystów.',
    status: 'rozwiazane',
    date: '2026-08-22',
    upvotes: 24,
  },
  {
    id: 'alt-3',
    title: 'Ubytek w krawężniku i nawierzchni na zakręcie',
    category: 'drogi',
    village: 'Szydłowice',
    locationDetails: 'Skrzyżowanie obok kościoła',
    description: 'Wyrwa po zimie powiększyła się po ostatnich deszczach.',
    status: 'w_weryfikacji',
    date: '2026-08-26',
    upvotes: 7,
  },
];

export const SOLTYSI_LIST: SoltysContact[] = [
  { village: 'Lubsza', name: 'Jan Kowalczyk', phone: '+48 601 234 567', email: 'soltys.lubsza@lubsza.ug.gov.pl', officeHours: 'Środy 17:00 - 19:00 (Dom Ludowy)' },
  { village: 'Czepielowice', name: 'Maria Adamska', phone: '+48 602 345 678', email: 'soltys.czepielowice@lubsza.ug.gov.pl', officeHours: 'Czwartki 16:00 - 18:00 (Świetlica)' },
  { village: 'Mąkoszyce', name: 'Stanisław Wróbel', phone: '+48 603 456 789', email: 'soltys.makoszyce@lubsza.ug.gov.pl', officeHours: 'Wtorki 18:00 - 19:30 (Remiza OSP)' },
  { village: 'Szydłowice', name: 'Helena Dąbrowska', phone: '+48 604 567 890', email: 'soltys.szydlowice@lubsza.ug.gov.pl', officeHours: 'Poniedziałki 17:00 - 18:30 (Świetlica)' },
  { village: 'Dobrzyń', name: 'Piotr Kaczmarek', phone: '+48 605 678 901', email: 'soltys.dobrzyn@lubsza.ug.gov.pl', officeHours: 'Piątki 16:30 - 18:00 (Dom Strażaka)' },
  { village: 'Tarnowiec', name: 'Krzysztof Sikora', phone: '+48 606 789 012', email: 'soltys.tarnowiec@lubsza.ug.gov.pl', officeHours: 'Środy 18:00 - 19:00' },
  { village: 'Pisarzowice', name: 'Barbara Zielińska', phone: '+48 607 890 123', email: 'soltys.pisarzowice@lubsza.ug.gov.pl', officeHours: 'Czwartki 17:00 - 18:30' },
  { village: 'Rogalice', name: 'Tadeusz Grabowski', phone: '+48 608 901 234', email: 'soltys.rogalice@lubsza.ug.gov.pl', officeHours: 'Wtorki 16:00 - 17:30' },
];

export const VILLAGES = [
  'Wszystkie sołectwa',
  'Lubsza',
  'Czepielowice',
  'Mąkoszyce',
  'Szydłowice',
  'Dobrzyń',
  'Tarnowiec',
  'Pisarzowice',
  'Rogalice',
  'Lubicz',
  'Błota',
  'Nowy Świat',
  'Roszkowice',
  'Śmiechowice',
];

export const ARTICLES = INITIAL_ARTICLES;
export const EVENTS = EVENTS_DATA;
export const SURVEYS = INITIAL_SURVEYS;
export const CITIZEN_REVIEWS = INITIAL_REVIEWS;
export const RESIDENT_ALERTS = INITIAL_ALERTS;

export const COMMUNITY_STATS = {
  residentsCount: '8 940',
  villagesCount: '21',
  forestCoverage: '58%',
  surveyParticipants: '1 454',
};


