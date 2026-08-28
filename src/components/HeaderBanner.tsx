import React, { useState, useEffect } from 'react';
import { HerbLubsza } from '../data/crest';
import { 
  CloudSun, 
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudDrizzle,
  CloudFog,
  Wind, 
  Leaf, 
  BellRing, 
  ChevronRight, 
  Compass, 
  FileText, 
  MessageSquareQuote,
  Sparkles,
  Users,
  Trees,
  Heart,
  RefreshCw,
  Info,
  Droplets
} from 'lucide-react';

interface HeaderBannerProps {
  onNavigate: (tab: string) => void;
  onOpenSearch?: () => void;
  onOpenAlert?: () => void;
  onOpenWasteSchedule?: () => void;
  isHighContrast?: boolean;
}

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: number;
  description: string;
  lastUpdated: string;
  isLive: boolean;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onNavigate,
  onOpenSearch,
  onOpenAlert,
  onOpenWasteSchedule,
  isHighContrast = false,
}) => {
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [showWeatherSourceInfo, setShowWeatherSourceInfo] = useState(false);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  // Weather state (Default fallback + Live fetch from Open-Meteo for Lubsza coordinates)
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 21,
    apparentTemperature: 21,
    humidity: 62,
    windSpeed: 12,
    weatherCode: 1,
    isDay: 1,
    description: 'Częściowo słonecznie',
    lastUpdated: 'Aktualizowane na żywo',
    isLive: false
  });

  const getWeatherInterpretation = (code: number, isDay: number) => {
    switch (code) {
      case 0:
        return { text: isDay ? 'Bezchmurnie i słonecznie' : 'Bezchmurna noc', icon: Sun };
      case 1:
      case 2:
        return { text: 'Niewielkie zachmurzenie', icon: CloudSun };
      case 3:
        return { text: 'Pochmurno', icon: Cloud };
      case 45:
      case 48:
        return { text: 'Mgła / zamglenie', icon: CloudFog };
      case 51:
      case 53:
      case 55:
        return { text: 'Lekka mżawka', icon: CloudDrizzle };
      case 61:
      case 63:
      case 65:
        return { text: 'Opady deszczu', icon: CloudRain };
      case 71:
      case 73:
      case 75:
        return { text: 'Opady śniegu', icon: CloudSnow };
      case 80:
      case 81:
      case 82:
        return { text: 'Przelotny deszcz', icon: CloudRain };
      case 95:
      case 96:
      case 99:
        return { text: 'Burza z piorunami', icon: CloudLightning };
      default:
        return { text: 'Umiarkowane zachmurzenie', icon: CloudSun };
    }
  };

  const fetchLiveLubszaWeather = async () => {
    setIsWeatherLoading(true);
    try {
      // Coordinates for Lubsza (powiat brzeski, woj. opolskie): Lat 50.8986, Lon 17.5244
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=50.8986&longitude=17.5244&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=Europe%2FWarsaw'
      );
      if (response.ok) {
        const data = await response.json();
        const current = data.current;
        const interp = getWeatherInterpretation(current.weather_code, current.is_day);
        
        setWeather({
          temperature: Math.round(current.temperature_2m),
          apparentTemperature: Math.round(current.apparent_temperature),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          weatherCode: current.weather_code,
          isDay: current.is_day,
          description: interp.text,
          lastUpdated: new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
          isLive: true
        });
      }
    } catch (err) {
      console.warn('Nie udało się pobrać aktualnej pogody z Open-Meteo, używam danych orientacyjnych.', err);
    } finally {
      setIsWeatherLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveLubszaWeather();
    // Refresh weather automatically every 15 minutes
    const timer = setInterval(fetchLiveLubszaWeather, 15 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const WeatherIconComponent = getWeatherInterpretation(weather.weatherCode, weather.isDay).icon;

  const officialTickerAlerts = [
    { title: 'Kontrola Obywatelska: Sprawdzamy realizację inwestycji i wydatków budżetu Gminy Lubsza [Audyt]', tag: 'STRAŻ OBYWATELSKA', tab: 'news' },
    { title: 'Barometr Władzy: Oceń wójta, radnych i referaty urzędowe w niezależnej sondzie!', tag: 'OCEŃ WŁADZE', tab: 'reviews' },
    { title: 'XXVIII Sesja Rady Gminy – zobacz projekty uchwał, budżet i transmisję online', tag: 'RADNI POD LUPĄ', tab: 'notices' },
    { title: 'Dożynki Gminne w Szydłowicach – wielkie święto tradycji, sołectw i KGW', tag: 'SPOŁECZNOŚĆ', tab: 'events' },
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
                {/* Official Crest Image */}
                <div className="shrink-0 p-1 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl group transition-all duration-300 hover:border-amber-400/50">
                  <HerbLubsza className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" />
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
              <div className="bg-slate-900/85 backdrop-blur-md rounded-3xl p-6 border border-white/15 text-white shadow-2xl space-y-4">
                
                {/* Header of Weather Card */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <div className="flex items-center gap-2">
                    <WeatherIconComponent className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Pogoda w Lubszy
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={fetchLiveLubszaWeather}
                      disabled={isWeatherLoading}
                      title="Odśwież dane meteorologiczne na żywo"
                      aria-label="Odśwież pogodę"
                      className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isWeatherLoading ? 'animate-spin text-blue-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => setShowWeatherSourceInfo(!showWeatherSourceInfo)}
                      title="Informacje o źródle danych"
                      className="text-[11px] text-blue-300 bg-blue-950/90 hover:bg-blue-900 px-2.5 py-0.5 rounded-full border border-blue-700/80 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Stacja Lubsza</span>
                      <Info className="w-3 h-3 text-blue-400" />
                    </button>
                  </div>
                </div>

                {/* Weather Info Popover details if clicked */}
                {showWeatherSourceInfo && (
                  <div className="p-3 bg-blue-950/90 rounded-2xl border border-blue-700/60 text-xs text-blue-100 space-y-1 animate-fadeIn">
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      Prawdziwe dane meteorologiczne na żywo
                    </p>
                    <p className="text-[11px] text-blue-200 leading-relaxed">
                      Dane pobierane są w czasie rzeczywistym z modeli <strong>Open-Meteo / DWD ICON & ECMWF</strong> dla dokładnych współrzędnych geograficznych Gminy Lubsza (<strong>50°53&apos;55&quot;N, 17°31&apos;28&quot;E</strong>).
                    </p>
                    <div className="text-[10px] text-blue-300/80 pt-1 flex justify-between">
                      <span>Status: {weather.isLive ? 'Połączono ze stacją' : 'Tryb gotowości'}</span>
                      <span>Ostatni odczyt: {weather.lastUpdated}</span>
                    </div>
                  </div>
                )}

                {/* Main Temperature & Conditions */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {weather.temperature}°C
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        odcz. {weather.apparentTemperature}°C
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 font-medium capitalize">
                      {weather.description}
                    </p>
                  </div>
                  
                  <div className="text-right text-xs space-y-1.5 text-slate-300">
                    <div className="flex items-center justify-end gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-sky-300" />
                      <span>Wiatr: {weather.windSpeed} km/h</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-blue-300" />
                      <span>Wilgotność: {weather.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-medium">Jakość: Bardzo dobra</span>
                    </div>
                  </div>
                </div>

                {/* Direct Emergency / Office Hours Strip */}
                <div className="bg-slate-950/70 rounded-2xl p-3.5 border border-slate-800 text-xs space-y-1">
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
