import React, { useState } from 'react';
import { EventItem } from '../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  PlusCircle, 
  Tag, 
  Sparkles, 
  Check, 
  Share2,
  CalendarCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VILLAGES } from '../data/mockData';

interface EventsSectionProps {
  events: EventItem[];
  onToggleJoinEvent: (eventId: string) => void;
  onAddEvent: (event: Omit<EventItem, 'id' | 'attendeesCount'>) => void;
  isHighContrast: boolean;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  onToggleJoinEvent,
  onAddEvent,
  isHighContrast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('wszystkie');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-09-12');
  const [newTime, setNewTime] = useState('16:00');
  const [newLocation, setNewLocation] = useState('Świetlica Wiejska, Lubsza');
  const [newVillage, setNewVillage] = useState('Lubsza');
  const [newCategory, setNewCategory] = useState<any>('kultura');
  const [newDesc, setNewDesc] = useState('');
  const [newOrganizer, setNewOrganizer] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80');

  const categories = [
    { id: 'wszystkie', label: 'Wszystkie wydarzenia' },
    { id: 'festyn', label: 'Festyny i Dożynki' },
    { id: 'kultura', label: 'Kultura i Koncerty' },
    { id: 'sport', label: 'Sport i Rekreacja' },
    { id: 'warsztaty', label: 'Warsztaty i Edukacja' },
  ];

  const filteredEvents = selectedCategory === 'wszystkie'
    ? events
    : events.filter(e => e.category === selectedCategory);

  const handleJoin = (eventId: string) => {
    onToggleJoinEvent(eventId);
    try {
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.8 },
      });
    } catch {}
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newOrganizer.trim() || !newDesc.trim()) return;

    onAddEvent({
      title: newTitle.trim(),
      date: newDate,
      time: newTime,
      location: newLocation.trim(),
      village: newVillage,
      category: newCategory,
      description: newDesc.trim(),
      image: newImage,
      organizer: newOrganizer.trim(),
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewOrganizer('');
  };

  return (
    <section className="py-8 sm:py-12" id="sekcja-wydarzenia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
              <Calendar className="w-3.5 h-3.5" />
              Kalendarz Imprez i Spotkań
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
              Wydarzenia kulturalne i sportowe
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Dożynki, pikniki sołeckie, turnieje sportowe, warsztaty i spotkania w gminie Lubsza
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            id="btn-add-event"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Zgłoś wydarzenie / imprezę</span>
          </button>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white font-bold shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              id={`event-card-${event.id}`}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Event Photo & Date Badge */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                  
                  {/* Floating Date Badge with Full Month Name */}
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-3 py-1.5 rounded-2xl shadow-md text-center border border-slate-200 dark:border-slate-700 min-w-[76px]">
                    <span className="block text-[11px] font-extrabold uppercase tracking-wide text-blue-600 dark:text-blue-400 capitalize">
                      {new Date(event.date).toLocaleDateString('pl-PL', { month: 'long' })}
                    </span>
                    <span className="block text-xl font-black font-mono leading-none text-slate-900 dark:text-slate-100 mt-0.5">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white border border-white/20">
                    {event.category}
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg font-serif leading-snug">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {new Date(event.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>Godz. {event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Organizator: <strong className="text-slate-700 dark:text-slate-300">{event.organizer}</strong></span>
                    <span className="flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400">
                      <Users className="w-3.5 h-3.5" /> {event.attendeesCount} chętnych
                    </span>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Wstęp wolny dla mieszkańców
                </span>

                <button
                  onClick={() => handleJoin(event.id)}
                  id={`btn-join-event-${event.id}`}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    event.isJoined
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-xs'
                  }`}
                >
                  {event.isJoined ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Wezmę udział!
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="w-3.5 h-3.5" /> Wezmę udział
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-slate-800 dark:text-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-serif flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Zgłoś wydarzenie w Gminie Lubsza
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-500">✕</button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Nazwa wydarzenia *</label>
                <input
                  type="text"
                  required
                  placeholder="np. Turniej Tenisa Stołowego Sołectw"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Godzina (od - do)</label>
                  <input
                    type="text"
                    required
                    placeholder="np. 15:00 - 19:00"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Miejscowość / Sołectwo</label>
                  <select
                    value={newVillage}
                    onChange={(e) => setNewVillage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    {VILLAGES.filter(v => v !== 'Wszystkie sołectwa').map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Kategoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="kultura">Kultura i Koncerty</option>
                    <option value="festyn">Festyn i Dożynki</option>
                    <option value="sport">Sport i Rekreacja</option>
                    <option value="warsztaty">Warsztaty i Edukacja</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Dokładne miejsce</label>
                <input
                  type="text"
                  required
                  placeholder="np. Boisko sportowe, Świetlica wiejska..."
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Organizator *</label>
                <input
                  type="text"
                  required
                  placeholder="np. KGW, OSP, Sołtys, Klub Sportowy..."
                  value={newOrganizer}
                  onChange={(e) => setNewOrganizer(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Opis programu *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Co będzie się działo? Atrakcje dla dzieci, poczęstunek..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-semibold"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Zapisz wydarzenie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
