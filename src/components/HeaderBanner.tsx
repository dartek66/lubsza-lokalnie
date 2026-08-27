import React, { useState } from 'react';
import { HerbLubsza } from '../data/crest';
import { 
  CloudSun, 
  Wind, 
  Leaf, 
  BellRing, 
  ChevronRight, 
  Compass, 
  FileText, 
  CalendarDays, 
  MessageSquareQuote,
  Search,
  Sparkles,
  Users,
  AlertTriangle,
  Trees,
  Heart,
  Trash2
} from 'lucide-react';

interface HeaderBannerProps {
  onNavigate: (tab: string) => void;
  onOpenSearch?: () => void;
  onOpenAlert?: () => void;
  onOpenWasteSchedule?: () => void;
  isHighContrast?: boolean;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onNavigate,
  onOpenSearch,
  onOpenAlert,
  onOpenWasteSchedule,
  isHighContrast = false,
}) => {
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

  const officialTickerAlerts = [
    { title: 'Kontrola Obywatelska: Sprawdzamy realizację inwestycji i wydatków budżetu Gminy Lubsza [Audyt]', tag: 'STRAŻ OBYWATELSKA', tab: 'news' },
    { title: 'Barometr Władzy: Oceń wójta, radnych i referaty urzędowe w niezależnej sondzie!', tag: 'OCEŃ WŁADZE', tab: 'reviews' },
    { title: 'XXVIII Sesja Rady Gminy – 3 września 2026 r. – zobacz projekty uchwał i transmisję', tag: 'RADNI POD LUPĄ', tab: 'notices' },
    { title: 'Dożynki Gminne w Szydłowicach – 6 września 2026 r. – wielkie święto tradycji i KGW', tag: 'SPOŁECZNOŚĆ', tab: 'events' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Banner with Polish Lubsza Nature Imagery & Dark Gradient Overlay */}
      <div className="relative bg-slate-950 min-h-[360px] md:min-h-[420px] flex items-center">
        {/* Scenic Background image representing Lasy Lubszańskie & Stobrawski Park */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Sophisticated dual-tone gradient mask in slate & blue */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-blue-950/80" />
        
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Coat of Arms + Welcome Typography */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Official Crest Badge with glow */}
                <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl shrink-0">
                  <HerbLubsza className="w-20 h-24 md:w-24 md:h-28" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Niezależny Głos Mieszkańców 21 Sołectw
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight">
                    Głos Mieszkańców Gminy Lubsza
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light mt-2 leading-relaxed">
                    Obywatelski portal informacyjny, publicystyka i forum. Informujemy o sprawach lokalnych, promujemy aktywność sołectw oraz patrzymy władzy i urzędnikom na ręce.
                  </p>
                </div>
              </div>

              {/* Quick Jump Action Pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <button
                  onClick={() => onNavigate('news')}
                  id="hero-jump-news"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  Wiadomości & Okiem Mieszkańca
                </button>
                <button
                  onClick={() => onNavigate('forest')}
                  id="hero-jump-forest"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/45 text-emerald-200 text-xs font-semibold border border-emerald-400/40 backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <Trees className="w-4 h-4 text-emerald-300" />
                  Lasy & Trasy (58% lasów)
                </button>
                <button
                  onClick={() => onNavigate('animals')}
                  id="hero-jump-animals"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/25 hover:bg-amber-500/40 text-amber-200 text-xs font-semibold border border-amber-400/40 backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                  Zwierzęta & Stadnina
                </button>
                <button
                  onClick={() => onNavigate('reviews')}
                  id="hero-jump-reviews"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold border border-amber-400/30 backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-amber-400" />
                  Oceń Wójta i Urząd
                </button>
                <button
                  onClick={() => onNavigate('notices')}
                  id="hero-jump-notices"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-sky-400" />
                  Urzędowe pod Lupą
                </button>
                <button
                  onClick={() => onNavigate('forum')}
                  id="hero-jump-forum"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium border border-blue-400/30 backdrop-blur-xs transition-colors cursor-pointer shadow-sm"
                >
                  <MessageSquareQuote className="w-4 h-4 text-blue-100" />
                  Forum i Debata
                </button>
              </div>
            </div>

            {/* Right: Real-time Municipality Info Card (Weather & Quick Status) */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-white/15 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <div className="flex items-center gap-2">
                    <CloudSun className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Pogoda w Lubszy
                    </span>
                  </div>
                  <span className="text-[11px] text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-800 font-medium">
                    Stacja Lubsza
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white">22°C</div>
                    <p className="text-xs text-slate-300 mt-0.5">Częściowo słonecznie, bez opadów</p>
                  </div>
                  <div className="text-right text-xs space-y-1.5 text-slate-300">
                    <div className="flex items-center justify-end gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-sky-300" />
                      <span>Wiatr: 11 km/h</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-medium">Jakość pow.: Bardzo dobra</span>
                    </div>
                  </div>
                </div>

                {/* Direct Emergency / Urgent Call Strip */}
                <div className="bg-slate-950/60 rounded-2xl p-3.5 border border-slate-800 text-xs space-y-1">
                  <div className="font-semibold text-blue-300 flex items-center justify-between">
                    <span>Godziny Urzędu Gminy:</span>
                    <span className="text-slate-300 font-normal">Pon-Pt 7:30 - 15:30</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Centrum Obsługi Mieszkańca: ul. Brzeska 16, 49-313 Lubsza
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Official Urzędowe Ticker / Alert Tape */}
      <div className={`py-2.5 px-4 border-b transition-colors ${
        isHighContrast 
          ? 'bg-yellow-400 text-black border-yellow-500' 
          : 'bg-slate-900 text-slate-100 border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-md bg-blue-600 text-white shrink-0 uppercase tracking-wider text-[10px]">
              <BellRing className="w-3 h-3 animate-bounce" />
              Ważne
            </span>
            <div className="truncate font-medium flex items-center gap-2">
              <span className="text-blue-400 font-mono text-[11px] hidden md:inline">
                [{officialTickerAlerts[activeAlertIndex].tag}]
              </span>
              <span className="truncate">
                {officialTickerAlerts[activeAlertIndex].title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => onNavigate(officialTickerAlerts[activeAlertIndex].tab)}
              className="font-bold text-blue-400 hover:text-blue-300 underline flex items-center gap-1 cursor-pointer"
            >
              Szczegóły <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <div className="flex gap-1.5 ml-1">
              {officialTickerAlerts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAlertIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeAlertIndex === idx ? 'bg-blue-500 w-5' : 'bg-slate-600 hover:bg-slate-400 w-2'
                  }`}
                  aria-label={`Przełącz komunikat ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
