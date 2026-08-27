import React, { useState } from 'react';
import { WasteCollectionSchedule } from '../types';
import { 
  Trash2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Download, 
  Info, 
  Sparkles,
  ChevronRight,
  Bell
} from 'lucide-react';
import { WASTE_SCHEDULES, VILLAGES } from '../data/mockData';

interface WasteScheduleWidgetProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const WasteScheduleWidget: React.FC<WasteScheduleWidgetProps> = ({
  onClose,
  isModal = false,
}) => {
  const [selectedVillage, setSelectedVillage] = useState<string>('Lubsza');
  const [reminderSaved, setReminderSaved] = useState(false);

  const currentSchedule = WASTE_SCHEDULES.find(s => s.village === selectedVillage) || WASTE_SCHEDULES[0];

  const typeConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
    bio: { label: 'Odpady BIO (brązowy)', bg: 'bg-amber-100 dark:bg-amber-950/80', text: 'text-amber-900 dark:text-amber-200', border: 'border-amber-300 dark:border-amber-800' },
    zmieszane: { label: 'Zmieszane (czarny)', bg: 'bg-stone-200 dark:bg-stone-800', text: 'text-stone-800 dark:text-stone-200', border: 'border-stone-400 dark:border-stone-700' },
    plastik: { label: 'Metale i Tworzywa (żółty)', bg: 'bg-yellow-100 dark:bg-yellow-950/80', text: 'text-yellow-900 dark:text-yellow-200', border: 'border-yellow-300 dark:border-yellow-800' },
    papier: { label: 'Papier (niebieski)', bg: 'bg-blue-100 dark:bg-blue-950/80', text: 'text-blue-900 dark:text-blue-200', border: 'border-blue-300 dark:border-blue-800' },
    szklo: { label: 'Szkło (zielony)', bg: 'bg-emerald-100 dark:bg-emerald-950/80', text: 'text-emerald-900 dark:text-emerald-200', border: 'border-emerald-300 dark:border-emerald-800' },
    wielkogabarytowe: { label: 'Gabaryty & Elektrośmieci', bg: 'bg-purple-100 dark:bg-purple-950/80', text: 'text-purple-900 dark:text-purple-200', border: 'border-purple-300 dark:border-purple-800' },
  };

  const handleSetReminder = () => {
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 3000);
  };

  const content = (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 mb-1 border border-blue-200 dark:border-blue-800">
            <Trash2 className="w-3.5 h-3.5" />
            Gospodarka Komunalna UG Lubsza
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
            Harmonogram Odbioru Odpadów 2026
          </h2>
          <p className="text-xs text-slate-500">Wybierz swoje sołectwo, aby sprawdzić najbliższe terminy wywozu</p>
        </div>

        {/* Village picker */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Sołectwo:</label>
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
          >
            {WASTE_SCHEDULES.map(s => (
              <option key={s.village} value={s.village}>{s.village}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dates Timeline for selected village */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Najbliższe zbiórki dla sołectwa {selectedVillage}</span>
          <span className="text-[11px] font-normal text-slate-400">Pojemniki wystawiamy do godz. 6:00 rano</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {currentSchedule.dates.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-bold font-mono text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    {item.date}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  {new Date(item.date).toLocaleDateString('pl-PL', { weekday: 'long' })}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {item.types.map(t => {
                  const cfg = typeConfig[t] || { label: t, bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200' };
                  return (
                    <span
                      key={t}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                    >
                      {cfg.label}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Waste Legend */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Zasady segregacji w Gminie Lubsza & PSZOK
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Punkt Selektywnego Zbierania Odpadów Komunalnych (PSZOK) w Lubszy czynny jest w środy (10:00-18:00) oraz soboty (8:00-14:00). Bezpłatnie przyjmowane są opony, gruz remontowy, elektrośmieci oraz chemikalia domowe.
        </p>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
        <button
          onClick={handleSetReminder}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {reminderSaved ? 'Powiadomienie włączone!' : 'Włącz przypomnienia w przeglądarce'}
        </button>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            Zamknij
          </button>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950/40" id="sekcja-odpady">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          {content}
        </div>
      </div>
    </section>
  );
};
