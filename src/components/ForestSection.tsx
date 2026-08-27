import React, { useState } from 'react';
import { 
  Compass, 
  Bike, 
  Footprints, 
  Map as MapIcon, 
  Trees, 
  Info, 
  Download, 
  ExternalLink, 
  Navigation, 
  Flame, 
  ShieldCheck, 
  Sun, 
  Clock, 
  Sparkles,
  ChevronRight,
  Camera,
  Layers,
  CheckCircle2,
  TreePine,
  Search
} from 'lucide-react';

export interface ForestTrail {
  id: string;
  name: string;
  type: 'walking' | 'biking' | 'educational' | 'family';
  lengthKm: number;
  difficulty: 'Łatwa' | 'Średnia' | 'Wymagająca';
  timeEstimate: string;
  startingPoint: string;
  colorMark: string;
  colorHex: string;
  description: string;
  highlights: string[];
  surfaceType: string;
  suitableFor: string[];
  gpxAvailable: boolean;
  mapCoordinates: string;
  googleMapsUrl?: string;
  image: string;
}

const FOREST_TRAILS: ForestTrail[] = [
  {
    id: 'trail-1',
    name: 'Szlak Rezerwatu Przyrody Lubsza & Starych Dębów',
    type: 'walking',
    lengthKm: 6.8,
    difficulty: 'Łatwa',
    timeEstimate: '1.5 - 2 godz.',
    startingPoint: 'Parking leśny przy leśniczówce Lubsza (droga w kierunku Rogalic)',
    colorMark: 'Zielony',
    colorHex: '#16a34a',
    description: 'Niezwykle malownicza ścieżka prowadząca sercem Rezerwatu Przyrody Lubsza. Trasa biegnie wśród pomnikowych dębów szypułkowych i buków liczących ponad 180-220 lat. Idealna na spokojny spacer z rodziną, nordic walking i leśną kąpiel (shinrin-yoku).',
    highlights: [
      'Pomnikowe Dęby Lubszańskie (ponad 200 lat)',
      'Tablice edukacyjne z opisem flory i fauny Stobrawskiego PK',
      'Drewniane wiaty odpoczynkowe i ławeczki',
      'Czyste runo leśne i bogate siedliska ptaków śpiewających'
    ],
    surfaceType: 'Ścieżka leśna, ubity dukt gruntowy',
    suitableFor: ['Pieszo', 'Nordic Walking', 'Spacer z wózkiem terenowym', 'Dzieci i seniorzy'],
    gpxAvailable: true,
    mapCoordinates: '50.9167° N, 17.5167° E',
    googleMapsUrl: 'https://maps.google.com/?q=Rezerwat+Przyrody+Lubsza',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'trail-2',
    name: 'Wielka Leśna Pętla Rowerowa Smortawy i Borów Stobrawskich',
    type: 'biking',
    lengthKm: 24.5,
    difficulty: 'Średnia',
    timeEstimate: '1.5 - 2.5 godz.',
    startingPoint: 'Lubsza (Centrum / Park Dworski) → Dobrzyń → Szydłowice → Błota → Lubsza',
    colorMark: 'Niebieski',
    colorHex: '#2563eb',
    description: 'Najpopularniejsza i wspaniale utrzymana trasa dla miłośników dwóch kółek (cross, trekking, gravel, MTB). Prowadzi wzdłuż urokliwych meandrów rzeki Smortawy, przez zacienione bory sosnowo-mieszane oraz malownicze skraje łąk śródleśnych.',
    highlights: [
      'Malownicze zakola i mostki na rzece Smortawie',
      'Ostoja zwierzyny: sarny, jelenie, dzięcioły czarne i bieliki',
      'Miejsca postoju rowerzystów (MOR) z ławkami i stojakami',
      'Zabytkowy kościół i park w Dobrzyniu'
    ],
    surfaceType: '75% utwardzony dukt szutrowy i leśny, 25% asfalt lokalny o znikomym ruchu',
    suitableFor: ['Rower trekkingowy', 'Gravel / MTB', 'Rower crossowy', 'E-bike'],
    gpxAvailable: true,
    mapCoordinates: '50.9320° N, 17.5340° E',
    googleMapsUrl: 'https://maps.google.com/?q=Lubsza+Lasy+Stobrawskie',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'trail-3',
    name: 'Ścieżka Dydaktyczno-Przyrodnicza „Rogalicki Bór”',
    type: 'educational',
    lengthKm: 4.2,
    difficulty: 'Łatwa',
    timeEstimate: '1 godz.',
    startingPoint: 'Rogalice (wiata turystyczna obok leśniczówki Rogalice)',
    colorMark: 'Czerwony',
    colorHex: '#dc2626',
    description: 'Edukacyjna ścieżka z 12 przystankami tematycznymi przygotowanymi we współpracy z leśnikami. Wyjaśnia zrównoważoną gospodarkę leśną, cykl życia drzewostanu, ochronę mrowisk oraz znaczenie martwego drewna dla ekosystemu.',
    highlights: [
      '12 interaktywnych tablic przyrodniczych dla dzieci i dorosłych',
      'Mrowiska i ścieżka zmysłów (kora, szyszki, mech)',
      'Wieża widokowa / ambona obserwacyjna na leśną polanę',
      'Zadaszona wiata z miejscem na ognisko (po zgłoszeniu do Nadleśnictwa)'
    ],
    surfaceType: 'Wyrównana ścieżka gruntowa z drewnianymi mostkami',
    suitableFor: ['Wycieczki szkolne', 'Rodziny z dziećmi', 'Pieszo', 'Nordic Walking'],
    gpxAvailable: true,
    mapCoordinates: '50.9480° N, 17.5580° E',
    googleMapsUrl: 'https://maps.google.com/?q=Rogalice+Lasy',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'trail-4',
    name: 'Szlak Bobrowy i Dolina Czarnej Wody',
    type: 'walking',
    lengthKm: 8.5,
    difficulty: 'Średnia',
    timeEstimate: '2.5 godz.',
    startingPoint: 'Czepielowice (skraj lasu) → leśna dolina cieku wodnego',
    colorMark: 'Żółty',
    colorHex: '#eab308',
    description: 'Dzika i nieco tajemnicza trasa wzdłuż terenów podmokłych i rozlewisk. Można tu zaobserwować liczne tamy bobrowe, żeremia oraz rzadkie gatunki ptactwa wodno-błotnego.',
    highlights: [
      'Imponujące konstrukcje bobrowe i stawy rozlewiskowe',
      'Kładki i pomosty widokowe',
      'Stanowiska paproci pióropusznika i leśnych storczyków',
      'Cisza i absolutny brak hałasu cywilizacyjnego'
    ],
    surfaceType: 'Ścieżka leśna, miejscami podmokła (zalecane buty trekkingowe)',
    suitableFor: ['Pieszo', 'Fotografia przyrodnicza', 'Birdwatching'],
    gpxAvailable: true,
    mapCoordinates: '50.8920° N, 17.5890° E',
    googleMapsUrl: 'https://maps.google.com/?q=Czepielowice+Lasy',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'trail-5',
    name: 'Szlak Rodzinny „Młody Odkrywca Lasu” – Park Dworski i Leśna Polana',
    type: 'family',
    lengthKm: 2.8,
    difficulty: 'Łatwa',
    timeEstimate: '45 min - 1 godz.',
    startingPoint: 'Lubsza, Parking przy stadionie sportowym i Parku Dworskim',
    colorMark: 'Pomarańczowy',
    colorHex: '#ea580c',
    description: 'Krótka, całkowicie bezpieczna i płaska trasa spacerowa przygotowana specjalnie z myślą o rodzinach z małymi dziećmi i wózkami. Łączy zabytkowy drzewostan parkowy z bezpiecznym fragmentem lasu państwowego.',
    highlights: [
      'Gładka, utwardzona nawierzchnia (wygodna dla każdego wózka)',
      'Polana piknikowa z drewnianymi ławami',
      'Plac zabaw z naturalnych kłód drewna',
      'Bezpieczne oddalenie od dróg kołowych'
    ],
    surfaceType: 'Utwardzona alejka szutrowa i gładki dukt leśny',
    suitableFor: ['Wózki dziecięce', 'Seniorzy', 'Dzieci na rowerkach biegowych', 'Pieszo'],
    gpxAvailable: true,
    mapCoordinates: '50.9080° N, 17.5250° E',
    googleMapsUrl: 'https://maps.google.com/?q=Lubsza+Park+Dworski',
    image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1200&q=80',
  }
];

const FOREST_RULES = [
  {
    icon: Flame,
    title: 'Ogień i ogniska',
    text: 'Ogniska wolno palić wyłącznie w wyznaczonych i oznakowanych miejscach (np. wiaty leśne w Rogalicach po uzgodnieniu z Nadleśnictwem). Zakaz palenia tytoniu i używania otwartego ognia w odległości mniejszej niż 100m od lasu.'
  },
  {
    icon: ShieldCheck,
    title: 'Śmieci zabieramy ze sobą',
    text: 'Zasada „Leave No Trace” – to co przyniosłeś do lasu, zabierz z powrotem. Las to dom dzikich zwierząt, a butelki i puszki mogą stanowić dla nich śmiertelną pułapkę oraz wywołać pożar.'
  },
  {
    icon: Trees,
    title: 'Pojazdy silnikowe',
    text: 'Wjazd do lasu samochodami, motocyklami, quadami i skuterami jest surowo zabroniony przepisami prawa (z wyjątkiem oznakowanych dróg publicznych). Korzystajmy z bezpłatnych parkingów leśnych.'
  },
  {
    icon: Compass,
    title: 'Spokój i ochrona zwierząt',
    text: 'Psy prowadzimy wyłącznie na smyczy, aby nie płoszyły saren, zajęcy i ptaków gniazdujących na ziemi. Zachowajmy ciszę i cieszmy się śpiewem ptaków i szumem drzew.'
  }
];

interface ForestSectionProps {
  isHighContrast?: boolean;
}

export const ForestSection: React.FC<ForestSectionProps> = ({ isHighContrast }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTrailModal, setActiveTrailModal] = useState<ForestTrail | null>(null);

  const filteredTrails = FOREST_TRAILS.filter(trail => {
    const matchesType = selectedType === 'all' || trail.type === selectedType;
    const matchesSearch = searchQuery.trim() === '' || 
      trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.startingPoint.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Banner - Las Lubszański & Stobrawski Park Krajobrazowy */}
      <div className={`relative rounded-3xl overflow-hidden shadow-xl border ${
        isHighContrast 
          ? 'bg-black border-yellow-400 text-yellow-300' 
          : 'bg-emerald-950 text-white border-emerald-800'
      }`}>
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80" 
            alt="Lasy Lubszańskie i Stobrawski Park Krajobrazowy" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-xs">
            <TreePine className="w-4 h-4 text-emerald-400" />
            Lasy Lubszańskie & Stobrawski Park Krajobrazowy • 58% powierzchni gminy
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Zielone Serce Gminy Lubsza
          </h1>
          
          <p className="text-emerald-100 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
            Mamy wspaniały, pachnący żywicą las tuż za progiem! Odkryj oznakowane ścieżki piesze, malownicze trasy rowerowe wzdłuż Smortawy, pomnikowe dęby Rezerwatu Lubsza oraz punkty odpoczynku.
          </p>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-center">
            <div className="bg-emerald-900/60 backdrop-blur-xs border border-emerald-700/50 p-3 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-emerald-300">58%</span>
              <span className="text-[11px] text-emerald-200 font-medium">Lesistość Gminy</span>
            </div>
            <div className="bg-emerald-900/60 backdrop-blur-xs border border-emerald-700/50 p-3 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-emerald-300">5+</span>
              <span className="text-[11px] text-emerald-200 font-medium">Oznakowanych Tras</span>
            </div>
            <div className="bg-emerald-900/60 backdrop-blur-xs border border-emerald-700/50 p-3 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-emerald-300">220 l.</span>
              <span className="text-[11px] text-emerald-200 font-medium">Najstarsze Dęby</span>
            </div>
            <div className="bg-emerald-900/60 backdrop-blur-xs border border-emerald-700/50 p-3 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-emerald-300">24 km</span>
              <span className="text-[11px] text-emerald-200 font-medium">Pętla Rowerowa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className={`p-5 rounded-2xl border shadow-xs ${
        isHighContrast 
          ? 'bg-black border-yellow-400 text-yellow-300' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedType === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Wszystkie Trasy ({FOREST_TRAILS.length})
            </button>
            <button
              onClick={() => setSelectedType('walking')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedType === 'walking'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Footprints className="w-4 h-4" />
              Ścieżki Piesze
            </button>
            <button
              onClick={() => setSelectedType('biking')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedType === 'biking'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Bike className="w-4 h-4" />
              Trasy Rowerowe
            </button>
            <button
              onClick={() => setSelectedType('educational')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedType === 'educational'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Compass className="w-4 h-4" />
              Ścieżki Dydaktyczne
            </button>
            <button
              onClick={() => setSelectedType('family')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedType === 'family'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Dla Rodzin & Wózków
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj trasy, dębu, szlaku..."
              className={`w-full pl-9.5 pr-4 py-2 rounded-xl text-xs sm:text-sm border transition-colors outline-none ${
                isHighContrast
                  ? 'bg-black border-yellow-400 text-yellow-300 placeholder-yellow-600'
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-emerald-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Trails Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrails.map(trail => {
          const isBiking = trail.type === 'biking';
          const isWalking = trail.type === 'walking';
          const isEdu = trail.type === 'educational';
          
          return (
            <div
              key={trail.id}
              className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isHighContrast
                  ? 'bg-black border-yellow-400 text-yellow-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Card Image Cover with overlay badges */}
              <div className="relative h-52 overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img 
                  src={trail.image} 
                  alt={trail.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Trail Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-slate-100 backdrop-blur-xs shadow-md border border-slate-200 dark:border-slate-700">
                  {isBiking && <Bike className="w-3.5 h-3.5 text-blue-600" />}
                  {isWalking && <Footprints className="w-3.5 h-3.5 text-emerald-600" />}
                  {isEdu && <Compass className="w-3.5 h-3.5 text-red-600" />}
                  {!isBiking && !isWalking && !isEdu && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                  <span>
                    {isBiking ? 'Trasa Rowerowa' : isWalking ? 'Ścieżka Piesza' : isEdu ? 'Ścieżka Dydaktyczna' : 'Trasa Rodzinna'}
                  </span>
                </div>

                {/* Trail Color Mark Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white backdrop-blur-xs border border-white/20">
                  <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white" style={{ backgroundColor: trail.colorHex }} />
                  <span>Szlak {trail.colorMark}</span>
                </div>

                {/* Bottom specs overlay on image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                    Długość: <strong className="text-emerald-400 font-mono text-sm">{trail.lengthKm} km</strong>
                  </span>
                  <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                    Czas: <strong className="text-slate-200">{trail.timeEstimate}</strong>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      trail.difficulty === 'Łatwa'
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
                    }`}>
                      Trudność: {trail.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                      {trail.surfaceType.split(',')[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif leading-snug text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {trail.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {trail.description}
                  </p>
                </div>

                {/* Highlights mini-list */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <div className="font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                    <Trees className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Warto zobaczyć na trasie:</span>
                  </div>
                  <ul className="space-y-1 pl-5 list-disc text-slate-600 dark:text-slate-400 text-[11px]">
                    {trail.highlights.slice(0, 2).map((hl, idx) => (
                      <li key={idx} className="line-clamp-1">{hl}</li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => setActiveTrailModal(trail)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <MapIcon className="w-3.5 h-3.5" />
                    <span>Szczegóły & Punkty</span>
                  </button>

                  {trail.googleMapsUrl && (
                    <a
                      href={trail.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer"
                      title="Otwórz nawigację w Google Maps"
                    >
                      <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Map & Points of Interest Guide */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${
        isHighContrast 
          ? 'bg-black border-yellow-400 text-yellow-300' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
              <Compass className="w-4 h-4" />
              Nawigacja w terenie
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
              Punkty startowe & Parkingi leśne
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Zostaw auto na bezpiecznym, bezpłatnym parkingu leśnym z wiatami i ruszaj na szlak. Wszystkie trasy posiadają jednolite oznakowanie zgodne ze standardem PTTK i Lasów Państwowych.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <MapIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-slate-100">Parking Leśny Lubsza (przy leśniczówce)</strong>
                  <span className="text-slate-500 dark:text-slate-400">Pojemność 25 aut • Wiata • Początek Szlaku Dębów</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <MapIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-slate-100">Parking Turystyczny Rogalice</strong>
                  <span className="text-slate-500 dark:text-slate-400">Pojemność 15 aut • Wiata i miejsce ogniskowe • Szlak Dydaktyczny</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <MapIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-slate-100">Park Dworski Lubsza (przy stadionie)</strong>
                  <span className="text-slate-500 dark:text-slate-400">Duży parking • Trasa rodzinna dla wózków</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive OpenStreetMap Embed / Map Representation */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md bg-slate-100 dark:bg-slate-800 relative h-[380px] sm:h-[420px]">
            <iframe 
              title="Mapa Lasów Lubszańskich i Stobrawskiego Parku Krajobrazowego"
              src="https://www.openstreetmap.org/export/embed.html?bbox=17.4500%2C50.8700%2C17.6500%2C50.9800&amp;layer=mapnik&amp;marker=50.9167%2C17.5167"
              className="w-full h-full border-0"
              loading="lazy"
            />
            
            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 max-w-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Legenda Szlaków:</span>
              <div className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                <span className="w-3 h-1.5 rounded-full bg-green-600" />
                <span>Zielony: Rezerwat Przyrody Lubsza (6.8 km)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                <span className="w-3 h-1.5 rounded-full bg-blue-600" />
                <span>Niebieski: Rowerowy Szlak Smortawy (24.5 km)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                <span className="w-3 h-1.5 rounded-full bg-red-600" />
                <span>Czerwony: Ścieżka Rogalicki Bór (4.2 km)</span>
              </div>
            </div>

            <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200">
              Nadleśnictwo Brzeg / Lasy Lubsza
            </div>
          </div>
        </div>
      </div>

      {/* Forest Code of Conduct (Kodeks Kulturalnego spacerowicza) */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        isHighContrast 
          ? 'bg-black border-yellow-400 text-yellow-300' 
          : 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60'
      }`}>
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Szanujmy naszą przyrodę
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
            Kodeks Dobrego Leśnego Gościa
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Lasy Gminy Lubsza to bezcenny skarb przyrodniczy i duma naszej społeczności. Przestrzegajmy prostych zasad, by służyły nam i kolejnym pokoleniom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FOREST_RULES.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/40 shadow-2xs space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {rule.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {rule.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Full Trail Details */}
      {activeTrailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border ${
              isHighContrast 
                ? 'bg-black border-yellow-400 text-yellow-300' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
            }`}
          >
            {/* Modal Image Header */}
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <img 
                src={activeTrailModal.image} 
                alt={activeTrailModal.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              
              <button
                onClick={() => setActiveTrailModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
                aria-label="Zamknij"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono">
                    {activeTrailModal.lengthKm} km
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
                    {activeTrailModal.timeEstimate}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full" style={{ backgroundColor: activeTrailModal.colorHex }}>
                    Szlak {activeTrailModal.colorMark}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-serif leading-tight">
                  {activeTrailModal.name}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Opis i przebieg trasy:</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeTrailModal.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    Miejsce startu i parking:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">{activeTrailModal.startingPoint}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    Nawierzchnia:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">{activeTrailModal.surfaceType}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Główne atrakcje i punkty widokowe:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeTrailModal.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Trasa polecana dla:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeTrailModal.suitableFor.map((item, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => setActiveTrailModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Zamknij
                </button>
                {activeTrailModal.googleMapsUrl && (
                  <a
                    href={activeTrailModal.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Nawiguj do punktu startowego</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
