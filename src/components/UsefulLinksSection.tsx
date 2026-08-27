import React, { useState } from 'react';
import { 
  CreditCard, 
  Map, 
  CalendarCheck, 
  Trash2, 
  Bus, 
  PhoneCall, 
  FileCheck2, 
  ShieldAlert, 
  ExternalLink, 
  Flame, 
  Users2, 
  HelpCircle,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SOLTYSI_LIST } from '../data/mockData';

interface UsefulLinksProps {
  onOpenWasteSchedule: () => void;
  onOpenAlertModal?: () => void;
  onOpenAlert?: () => void;
  isHighContrast?: boolean;
}

export const UsefulLinksSection: React.FC<UsefulLinksProps> = ({
  onOpenWasteSchedule,
  onOpenAlertModal,
  onOpenAlert,
  isHighContrast,
}) => {
  const triggerAlertModal = onOpenAlertModal || onOpenAlert;
  const [showSoltysiModal, setShowSoltysiModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentSent, setAppointmentSent] = useState(false);

  // Form states for appointment
  const [appDept, setAppDept] = useState('Urząd Stanu Cywilnego / Dowody osobiste');
  const [appName, setAppName] = useState('');
  const [appPhone, setAppPhone] = useState('');
  const [appDate, setAppDate] = useState('2026-09-02');
  const [appTime, setAppTime] = useState('10:00');

  const links = [
    {
      id: 'epayments',
      title: 'ePłatności Samorządowe',
      desc: 'Opłać online podatek od nieruchomości, podatek rolny oraz opłatę śmieciową bez prowizji.',
      icon: CreditCard,
      badge: 'e-Urząd',
      color: 'from-blue-600 to-indigo-600',
      action: () => window.open('https://lubsza.bip.gov.pl', '_blank'),
    },
    {
      id: 'waste',
      title: 'Harmonogram Odbioru Śmieci',
      desc: 'Sprawdź terminy wywozu bio, plastiku, papieru, szkła i gabarytów dla Twojej miejscowości.',
      icon: Trash2,
      badge: 'Dla domu',
      color: 'from-amber-500 to-orange-600',
      action: onOpenWasteSchedule,
    },
    {
      id: 'geoportal',
      title: 'Geoportal Gminy Lubsza',
      desc: 'Interaktywna mapa działek ewidencyjnych, planu zagospodarowania przestrzennego (MPZP) i sieci uzbrojenia.',
      icon: Map,
      badge: 'Mapy',
      color: 'from-blue-500 to-sky-600',
      action: () => window.open('https://geoportal.gov.pl', '_blank'),
    },
    {
      id: 'appointment',
      title: 'Rezerwacja Wizyty w UG',
      desc: 'Umów wizytę w Urzędzie Gminy w Lubszy bez czekania w kolejce na konkretny dzień i godzinę.',
      icon: CalendarCheck,
      badge: 'Szybka obsługa',
      color: 'from-indigo-500 to-blue-700',
      action: () => setShowAppointmentModal(true),
    },
    {
      id: 'bus',
      title: 'Rozkład Jazdy i Komunikacja',
      desc: 'Aktualne połączenia autobusowe: Lubsza – Brzeg, Czepielowice, Szydłowice, Mąkoszyce.',
      icon: Bus,
      badge: 'Transport',
      color: 'from-sky-500 to-blue-600',
      action: () => window.open('https://rozklad-pkp.pl', '_blank'),
    },
    {
      id: 'soltysi',
      title: 'Baza Sołectw i Sołtysów',
      desc: 'Numery telefonów, adresy i godziny dyżurów sołtysów 21 sołectw Gminy Lubsza.',
      icon: Users2,
      badge: 'Sołectwa',
      color: 'from-blue-600 to-slate-700',
      action: () => setShowSoltysiModal(true),
    },
    {
      id: 'emergency',
      title: 'Ważne Telefony i Dyżury',
      desc: 'Pogotowie wodociągowe, energetyczne, leśne, dzielnicowy oraz nocne dyżury aptek.',
      icon: PhoneCall,
      badge: 'Pomoc',
      color: 'from-rose-500 to-red-600',
      action: () => setShowEmergencyModal(true),
    },
    {
      id: 'clean-air',
      title: 'Czyste Powietrze & CEEB',
      desc: 'Złóż deklarację źródła ciepła, sprawdź gminne dotacje do pomp ciepła i fotowoltaiki.',
      icon: Flame,
      badge: 'Ekologia',
      color: 'from-emerald-600 to-teal-700',
      action: () => window.open('https://zone.gunb.gov.pl', '_blank'),
    },
  ];

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentSent(true);
    setTimeout(() => {
      setAppointmentSent(false);
      setShowAppointmentModal(false);
    }, 2500);
  };

  return (
    <section className="py-8 sm:py-12" id="sekcja-przydatne-linki">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              e-Usługi i Niezbędnik Mieszkańca
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
              Przydatne linki i e-Urząd
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Wszystkie najważniejsze usługi gminne, harmonogramy i kontakty w jednym miejscu
            </p>
          </div>

          {triggerAlertModal && (
            <button
              onClick={triggerAlertModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
            >
              <ShieldAlert className="w-4 h-4" />
              Zgłoś usterkę lub awarię (Alert)
            </button>
          )}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <div
                key={link.id}
                id={`link-card-${link.id}`}
                onClick={link.action}
                className="group relative p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {link.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1">
                      {link.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>Przejdź</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal: Sołtysi */}
      {showSoltysiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] overflow-y-auto space-y-4 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-serif flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <Users2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Sołectwa i Sołtysi Gminy Lubsza
              </h3>
              <button onClick={() => setShowSoltysiModal(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer p-1 rounded-lg">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOLTYSI_LIST.map((soltys, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                      Sołectwo {soltys.village}
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">Sołtys: {soltys.name}</p>
                  <p className="text-slate-600 dark:text-slate-300">📞 {soltys.phone}</p>
                  <p className="text-slate-500">✉️ {soltys.email}</p>
                  <p className="text-[11px] text-slate-500 bg-white dark:bg-slate-900 p-2 rounded-xl mt-1 border border-slate-200 dark:border-slate-700">
                    🕒 Dyżur: {soltys.officeHours}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => setShowSoltysiModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Zamknij listę
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ważne numery alarmowe */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-serif flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <PhoneCall className="w-5 h-5" />
                Ważne telefony alarmowe i komunalne
              </h3>
              <button onClick={() => setShowEmergencyModal(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer p-1 rounded-lg">✕</button>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-between font-bold text-rose-700 dark:text-rose-300">
                <span>Numer Alarmowy (Policja, Straż, Pogotowie)</span>
                <span className="text-base">112</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-800 dark:text-slate-200">
                <span>Sekretariat Urzędu Gminy Lubsza</span>
                <span className="font-bold">+48 77 411 86 10</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-800 dark:text-slate-200">
                <span>Awarie wodociągowo-kanalizacyjne (ZGK)</span>
                <span className="font-bold">+48 77 411 86 35</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-800 dark:text-slate-200">
                <span>Pogotowie Energetyczne (Tauron)</span>
                <span className="font-bold">991</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-800 dark:text-slate-200">
                <span>Nadleśnictwo Brzeg (Lasy Lubszańskie)</span>
                <span className="font-bold">+48 77 416 30 11</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-800 dark:text-slate-200">
                <span>Dzielnicowy Rejonu Lubsza (Policja)</span>
                <span className="font-bold">+48 514 016 342</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => setShowEmergencyModal(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Rezerwacja wizyty */}
      {showAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-serif flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <CalendarCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Rezerwacja wizyty w UG Lubsza
              </h3>
              <button onClick={() => setShowAppointmentModal(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer p-1 rounded-lg">✕</button>
            </div>

            {appointmentSent ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">Rezerwacja potwierdzona!</h4>
                <p className="text-xs text-slate-500">
                  Otrzymasz wiadomość SMS z kodem biletu kolejkowego. Zapraszamy do pokoju nr 4.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAppointmentSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Wybierz wydział / sprawę</label>
                  <select
                    value={appDept}
                    onChange={(e) => setAppDept(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Urząd Stanu Cywilnego / Dowody osobiste</option>
                    <option>Referat Podatków i Opłat Lokalnych</option>
                    <option>Referat Inwestycji i Gospodarki Nieruchomościami</option>
                    <option>Ochrona Środowiska / Czyste Powietrze</option>
                    <option>Działalność gospodarcza (CEIDG)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Imię i nazwisko</label>
                  <input
                    type="text"
                    required
                    placeholder="np. Janina Nowak"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Telefon kontaktowy</label>
                  <input
                    type="tel"
                    required
                    placeholder="+48 600 000 000"
                    value={appPhone}
                    onChange={(e) => setAppPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Dzień wizyty</label>
                    <input
                      type="date"
                      required
                      value={appDate}
                      onChange={(e) => setAppDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Godzina</label>
                    <select
                      value={appTime}
                      onChange={(e) => setAppTime(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                    >
                      <option>08:30</option>
                      <option>09:30</option>
                      <option>10:30</option>
                      <option>11:30</option>
                      <option>13:00</option>
                      <option>14:30</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAppointmentModal(false)}
                    className="px-3.5 py-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 cursor-pointer"
                  >
                    Zarezerwuj termin
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
