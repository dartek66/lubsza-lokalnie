import React, { useState } from 'react';
import { HerbLubsza } from '../data/crest';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  Github, 
  Cloud, 
  Sparkles, 
  Shield, 
  FileText, 
  Code,
  CheckCircle,
  Copy,
  Layers,
  Lock
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenCMS?: () => void;
  isHighContrast: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCMS, isHighContrast }) => {
  const [showDeployGuide, setShowDeployGuide] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const wranglerConfig = `# wrangler.toml - Cloudflare Pages / Workers Configuration
name = "portal-gminy-lubsza"
compatibility_date = "2026-08-27"
pages_build_output_dir = "dist"

[vars]
ENVIRONMENT = "production"
COMMUNITY_NAME = "Gmina Lubsza"
`;

  const githubActionsWorkflow = `# .github/workflows/deploy-cloudflare.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: portal-gminy-lubsza
          directory: dist
`;

  return (
    <footer className={`border-t transition-colors ${
      isHighContrast
        ? 'bg-black text-yellow-300 border-yellow-400'
        : 'bg-slate-900 text-slate-300 border-slate-800'
    }`}>
      {/* Top Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Crest & Citizen Initiative Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <HerbLubsza className="w-12 h-12 rounded-xl border border-amber-500/40 shadow-md shrink-0" withBorder={false} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-xl text-white tracking-wide">
                    GŁOS Lubszy
                  </span>
                  <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                    Obywatelski
                  </span>
                </div>
                <p className="text-xs text-slate-400">Niezależny portal mieszkańca dla lokalnej społeczności</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Niezależna inicjatywa obywatelska mieszkańca Lubszy. Informujemy o sprawach lokalnych, patrzymy na ręce władzom gminy, punktujemy wpadki i doceniamy sukcesy. Portal tworzony oddolnie dla mieszkańców 21 sołectw.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setShowDeployGuide(true)}
                id="btn-footer-deploy-guide"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Cloud className="w-4 h-4 text-amber-400" />
                <span>GitHub & Cloudflare Pages</span>
              </button>

              {onOpenCMS && (
                <button
                  onClick={onOpenCMS}
                  id="btn-footer-open-cms"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-colors cursor-pointer"
                  title="Dostęp zabezpieczony hasłem redakcyjnym"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Panel Redaktora (CMS)</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Official Municipality Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-white font-serif uppercase tracking-wider">
                Dane Urzędu Gminy
              </h4>
              <span className="text-[10px] text-slate-400">(Informacyjnie)</span>
            </div>
            
            <div className="space-y-2 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>ul. Brzeska 16<br />49-313 Lubsza</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>tel. +48 77 411 86 10</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>ug@lubsza.ug.gov.pl</span>
              </p>
              <p className="flex items-start gap-2 pt-1 text-[11px] text-slate-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Godziny urzędowania:<br />Pn – Pt: 7:30 – 15:30</span>
              </p>
            </div>
          </div>

          {/* Col 3: Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-white font-serif uppercase tracking-wider">
              Szybka Nawigacja
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('news')} className="hover:text-blue-400 transition-colors cursor-pointer text-slate-300">
                  • Aktualności i artykuły
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('forest')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-300 font-medium">
                  • Lasy Lubszańskie (ścieżki i mapy)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('animals')} className="hover:text-amber-400 transition-colors cursor-pointer text-slate-300 font-medium">
                  • Zwierzęta, Stadnina & Adopcje
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-blue-400 transition-colors cursor-pointer text-slate-300">
                  • Wydarzenia i kalendarz imprez
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('forum')} className="hover:text-blue-400 transition-colors cursor-pointer text-slate-300">
                  • Forum mieszkańców i dyskusje
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-blue-400 transition-colors cursor-pointer text-slate-300">
                  • Galeria zdjęć gminy Lubsza
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('notices')} className="hover:text-blue-400 transition-colors cursor-pointer text-slate-300">
                  • Tablica ogłoszeń i sesje Rady Gminy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-blue-400 transition-colors cursor-pointer text-slate-300">
                  • Oceny urzędu i ankiety na żywo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resident')} className="hover:text-blue-400 transition-colors cursor-pointer text-slate-300">
                  • Harmonogram wywozu odpadów
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Important Public Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-white font-serif uppercase tracking-wider">
              E-Usługi & BIP
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="https://lubsza.bip.gov.pl" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  BIP Lubsza <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://epuap.gov.pl" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  ePUAP ESP <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://stobrawskipark.pl" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  Park Krajobrazowy <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://brzeg.katowice.lasy.gov.pl" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  Nadleśnictwo Brzeg <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & technical note */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Głos Lubszy – Obywatelski Portal Mieszkańców. Serwis niezależny, niepowiązany organizacyjnie z Urzędem Gminy Lubsza.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Deklaracja Dostępności (WCAG 2.1)</span>
            <span>•</span>
            <span>Społeczna Inicjatywa Obywatelska</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">Głos Mieszkańców Gminy Lubsza</span>
          </div>
        </div>
      </div>

      {/* Cloudflare & GitHub Deployment Guide Modal */}
      {showDeployGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 text-slate-100 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-serif">Wdrożenie: GitHub & Cloudflare Pages / Workers</h3>
                  <p className="text-xs text-slate-400">Instrukcja krok po kroku uruchomienia portalu na Twoim koncie</p>
                </div>
              </div>
              <button onClick={() => setShowDeployGuide(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer">✕</button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                Aplikacja została zbudowana jako nowoczesna, zoptymalizowana aplikacja <strong>React + Vite + Tailwind</strong>. Po wyeksportowaniu z AI Studio kod jest w 100% gotowy do wrzucenia do repozytorium <strong>GitHub</strong> oraz automatycznego hostingu na <strong>Cloudflare Pages / Workers</strong>!
              </p>

              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <h4 className="font-bold text-blue-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-xs">1</span>
                  Eksport do GitHub
                </h4>
                <p className="text-xs text-slate-300">
                  Użyj menu "Export to GitHub" w ustawieniach AI Studio lub pobierz plik ZIP i zainicjuj repozytorium:
                </p>
                <div className="bg-slate-950 p-3 rounded-xl font-mono text-[11px] text-blue-300 overflow-x-auto border border-slate-800">
                  git init<br />
                  git add .<br />
                  git commit -m "Inicjalizacja portalu Gminy Lubsza"<br />
                  git remote add origin https://github.com/TWOJA_NAZWA/portal-gminy-lubsza.git<br />
                  git push -u origin main
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-blue-400 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-xs">2</span>
                    Konfiguracja Cloudflare Pages
                  </h4>
                  <button
                    onClick={() => handleCopy(wranglerConfig, 'wrangler')}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-[11px] text-blue-300 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    {copiedCode === 'wrangler' ? 'Skopiowano!' : 'Kopiuj wrangler.toml'}
                  </button>
                </div>
                <p className="text-xs text-slate-300">
                  W panelu <strong>Cloudflare Dashboard → Workers & Pages → Create Application → Pages → Connect to Git</strong>:
                </p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li>Framework preset: <strong>Vite</strong></li>
                  <li>Build command: <code>npm run build</code></li>
                  <li>Build output directory: <code>dist</code></li>
                  <li>Node.js version: <code>20</code></li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-blue-400 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-xs">3</span>
                    Automatyczne wdrożenia z GitHub Actions (Opcjonalnie)
                  </h4>
                  <button
                    onClick={() => handleCopy(githubActionsWorkflow, 'workflow')}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-[11px] text-blue-300 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    {copiedCode === 'workflow' ? 'Skopiowano!' : 'Kopiuj Workflow'}
                  </button>
                </div>
                <p className="text-xs text-slate-300">
                  Możesz również dodać plik <code>.github/workflows/deploy-cloudflare.yml</code> do repozytorium, aby każdy push automatycznie budował i publikował portal na Cloudflare!
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-700">
              <button
                onClick={() => setShowDeployGuide(false)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Rozumiem, zamknij poradnik
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
