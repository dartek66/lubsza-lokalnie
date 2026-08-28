import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  MessageSquare, 
  Image as ImageIcon, 
  FileText, 
  Star, 
  Menu, 
  X, 
  Search, 
  AlertCircle, 
  Sun, 
  Moon, 
  Eye, 
  Sparkles,
  PhoneCall,
  MapPin,
  Trees,
  Heart,
  Trash2
} from 'lucide-react';
import { HerbLubsza } from '../data/crest';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAlertModal?: () => void;
  onOpenAlert?: () => void;
  onOpenSearch: () => void;
  isHighContrast: boolean;
  setIsHighContrast: (val: boolean | ((prev: boolean) => boolean)) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge' | ((prev: 'normal' | 'large' | 'xlarge') => 'normal' | 'large' | 'xlarge')) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  unreadAlertCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAlertModal,
  onOpenAlert,
  onOpenSearch,
  isHighContrast,
  setIsHighContrast,
  fontSize,
  setFontSize,
  isDarkMode,
  setIsDarkMode,
  unreadAlertCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAlertClick = () => {
    if (onOpenAlertModal) onOpenAlertModal();
    else if (onOpenAlert) onOpenAlert();
  };

  const navItems = [
    { id: 'home', label: 'Strona Główna', icon: Sparkles },
    { id: 'news', label: 'Wiadomości i Opinie', icon: Newspaper },
    { id: 'forest', label: 'Las i Ścieżki', icon: Trees },
    { id: 'animals', label: 'Zwierzęta', icon: Heart },
    { id: 'events', label: 'Wydarzenia', icon: Calendar },
    { id: 'forum', label: 'Forum Mieszkańców', icon: MessageSquare },
    { id: 'reviews', label: 'Oceń Władze & Ankiety', icon: Star },
    { id: 'notices', label: 'Urzędowe pod Lupą', icon: FileText },
    { id: 'gallery', label: 'Galeria', icon: ImageIcon },
    { id: 'resident', label: 'Niezbędnik Mieszkańca', icon: Trash2 },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cycleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
  };

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-200 ${
      isHighContrast 
        ? 'bg-black text-yellow-300 border-b-2 border-yellow-400' 
        : isDarkMode 
          ? 'bg-slate-900/95 text-slate-100 border-b border-slate-800/80 backdrop-blur-md' 
          : 'bg-white/95 text-slate-800 border-b border-slate-200/80 backdrop-blur-md shadow-xs'
    }`}>
      {/* Top utility bar - WCAG Accessibility & Official details */}
      <div className={`text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b ${
        isHighContrast 
          ? 'bg-black border-yellow-400 text-yellow-300' 
          : isDarkMode 
            ? 'bg-slate-950/90 border-slate-800 text-slate-400' 
            : 'bg-slate-100/90 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Niezależny Portal Mieszkańców Gminy Lubsza
            </span>
            <span className="hidden md:inline-block text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 font-semibold">
              Inicjatywa Obywatelska (Nieoficjalny)
            </span>
            <span className="hidden lg:inline-block text-slate-500 dark:text-slate-400 text-[11px]">
              Głos 21 sołectw • Patrzymy władzy na ręce
            </span>
          </div>

          {/* Accessibility tools */}
          <div className="flex items-center gap-2">
            {/* Font size toggle */}
            <button
              onClick={cycleFontSize}
              id="btn-accessibility-fontsize"
              title="Zmień rozmiar czcionki (A / A+ / A++)"
              aria-label="Zmień rozmiar czcionki"
              className={`px-2 py-0.5 rounded-md text-xs font-bold border transition-colors cursor-pointer ${
                isHighContrast 
                  ? 'border-yellow-400 hover:bg-yellow-400 hover:text-black' 
                  : isDarkMode
                    ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-2xs'
              }`}
            >
              A{fontSize === 'large' ? '+' : fontSize === 'xlarge' ? '++' : ''}
            </button>

            {/* High contrast mode */}
            <button
              onClick={() => setIsHighContrast(prev => !prev)}
              id="btn-accessibility-contrast"
              title="Wysoki kontrast (WCAG)"
              aria-label="Włącz lub wyłącz wysoki kontrast"
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
                isHighContrast
                  ? 'bg-yellow-400 text-black border-yellow-300'
                  : isDarkMode
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kontrast</span>
            </button>

            {/* Dark mode toggle */}
            {!isHighContrast && (
              <button
                onClick={() => setIsDarkMode(prev => !prev)}
                id="btn-theme-toggle"
                title={isDarkMode ? 'Tryb jasny' : 'Tryb ciemny'}
                aria-label="Przełącz motyw dzień / noc"
                className={`p-1 rounded-md border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-slate-700 bg-slate-800 text-amber-300 hover:bg-slate-700'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Search trigger */}
            <button
              onClick={onOpenSearch}
              id="btn-header-search"
              aria-label="Szukaj w portalu"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isHighContrast
                  ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black'
                  : isDarkMode
                    ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-2xs'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Szukaj w portalu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('home')}
            id="brand-logo-btn"
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1 shrink-0"
          >
            <div className="transition-transform duration-300 group-hover:scale-105 shrink-0">
              <HerbLubsza className="w-12 h-12 md:w-14 md:h-14" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-xl md:text-2xl font-serif text-slate-900 dark:text-slate-100">
                  GŁOS LUBSZY
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                  Obywatelski
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Niezależny Portal Mieszkańców Gminy Lubsza
              </p>
            </div>
          </button>

          {/* Desktop Permanent Horizontal Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-wrap justify-end" aria-label="Główne menu">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? isHighContrast
                        ? 'bg-yellow-400 text-black font-bold'
                        : isDarkMode
                          ? 'bg-blue-900/70 text-blue-200 border border-blue-700 shadow-xs'
                          : 'bg-blue-50 text-blue-900 border border-blue-200 shadow-xs'
                      : isHighContrast
                        ? 'text-yellow-300 hover:bg-yellow-950'
                        : isDarkMode
                          ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              id="btn-mobile-quick-search"
              aria-label="Szukaj w portalu"
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              id="btn-mobile-menu-toggle"
              aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu nawigacji'}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200 ${
          isHighContrast
            ? 'bg-black border-yellow-400 text-yellow-300'
            : isDarkMode
              ? 'bg-slate-900 border-slate-800 text-slate-200'
              : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pb-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-mobile-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition-colors cursor-pointer ${
                    isActive
                      ? isHighContrast
                        ? 'bg-yellow-400 text-black font-bold'
                        : isDarkMode
                          ? 'bg-blue-900/60 text-blue-300 border border-blue-700'
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      : isDarkMode
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Niezależny Portal Mieszkańców</span>
            <button 
              onClick={onOpenSearch}
              className="text-blue-600 dark:text-blue-400 font-semibold underline cursor-pointer"
            >
              Szukaj w portalu
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
