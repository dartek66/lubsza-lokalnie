import React, { useState } from 'react';
import { ResidentAlert } from '../types';
import { 
  AlertCircle, 
  MapPin, 
  Send, 
  CheckCircle, 
  ThumbsUp, 
  Clock, 
  ShieldAlert, 
  Camera, 
  X, 
  Sparkles,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VILLAGES } from '../data/mockData';

interface ResidentAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: ResidentAlert[];
  onAddAlert: (alert: Omit<ResidentAlert, 'id' | 'date' | 'upvotes' | 'status'>) => void;
  onUpvoteAlert: (alertId: string) => void;
}

export const ResidentAlertModal: React.FC<ResidentAlertModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onAddAlert,
  onUpvoteAlert,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');
  const [title, setTitle] = useState('');
  const [village, setVillage] = useState('Lubsza');
  const [locationDetails, setLocationDetails] = useState('');
  const [category, setCategory] = useState<any>('drogi');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAddAlert({
      title: title.trim(),
      village,
      locationDetails: locationDetails.trim() || 'Teren sołectwa ' + village,
      category,
      description: description.trim(),
    });

    setSuccess(true);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    } catch {}

    setTimeout(() => {
      setSuccess(false);
      setTitle('');
      setLocationDetails('');
      setDescription('');
      setActiveTab('list');
    }, 2000);
  };

  const statusBadges: Record<string, { label: string; bg: string; text: string }> = {
    zgloszone: { label: 'Zgłoszone (Czeka na reakcję UG)', bg: 'bg-stone-100 dark:bg-stone-800', text: 'text-stone-700 dark:text-stone-300' },
    w_weryfikacji: { label: 'Przekazane do urzędu', bg: 'bg-amber-100 dark:bg-amber-950', text: 'text-amber-800 dark:text-amber-300' },
    w_realizacji: { label: 'Urząd podjął prace', bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-800 dark:text-blue-300' },
    rozwiazane: { label: 'Rozwiązano pod naciskiem mieszkańców', bg: 'bg-emerald-100 dark:bg-emerald-950', text: 'text-emerald-800 dark:text-emerald-300' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif">Obywatelska Straż & Rejestr Usterek</h2>
              <p className="text-xs text-slate-500">Publiczny rejestr spraw: zgłaszamy zaniedbania i sprawdzamy czas reakcji urzędu</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'form'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Nowe Zgłoszenie
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'list'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Aktywne Zgłoszenia ({alerts.length})
          </button>
        </div>

        {/* TAB 1: FORM */}
        {activeTab === 'form' && (
          <div>
            {success ? (
              <div className="text-center py-10 space-y-2">
                <CheckCircle className="w-12 h-12 text-blue-600 mx-auto" />
                <h3 className="font-bold text-lg">Zgłoszenie zostało zarejestrowane!</h3>
                <p className="text-xs text-slate-500">Przekazano do właściwego referatu Urzędu Gminy Lubsza.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Krótki tytuł problemu *</label>
                  <input
                    type="text"
                    required
                    placeholder="np. Uszkodzona pokrywa studzienki na ul. Brzeskiej"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Miejscowość / Sołectwo</label>
                    <select
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer"
                    >
                      {VILLAGES.filter(v => v !== 'Wszystkie sołectwa').map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Kategoria usterki</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer"
                    >
                      <option value="drogi">Uszkodzenie nawierzchni / drogi</option>
                      <option value="oswietlenie">Oświetlenie uliczne / lampa</option>
                      <option value="odpady">Dzikie wysypisko / odpady</option>
                      <option value="zielen">Zieleń gminna / powalone drzewo</option>
                      <option value="bezpieczenstwo">Bezpieczeństwo pieszych</option>
                      <option value="inne">Inna sprawa komunalna</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Dokładna lokalizacja</label>
                  <input
                    type="text"
                    placeholder="np. Przy przystanku autobusowym, obok numeru 12"
                    value={locationDetails}
                    onChange={(e) => setLocationDetails(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Szczegółowy opis sytuacji *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Opisz usterkę, zagrożenie dla ruchu lub pieszych..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-slate-500 font-semibold cursor-pointer"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Wyślij alert do urzędu
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE ALERTS LIST */}
        {activeTab === 'list' && (
          <div className="space-y-3">
            {alerts.map(alt => {
              const badge = statusBadges[alt.status] || statusBadges.zgloszone;
              return (
                <div
                  key={alt.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                    <span className="text-slate-400">{alt.date}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{alt.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{alt.description}</p>
                  
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      {alt.village} • {alt.locationDetails}
                    </span>

                    <button
                      onClick={() => onUpvoteAlert(alt.id)}
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" /> Potwierdzam problem ({alt.upvotes})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
