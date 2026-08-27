import React, { useState } from 'react';
import { OfficialAnnouncement } from '../types';
import { 
  FileText, 
  AlertTriangle, 
  Download, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight,
  Eye,
  Filter,
  X,
  FileCheck
} from 'lucide-react';

interface OfficialAnnouncementsProps {
  announcements: OfficialAnnouncement[];
}

export const OfficialAnnouncements: React.FC<OfficialAnnouncementsProps> = ({ announcements }) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<OfficialAnnouncement | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('wszystkie');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = [
    { id: 'wszystkie', label: 'Wszystkie ogłoszenia' },
    { id: 'sesja_rady', label: 'Sesje Rady Gminy' },
    { id: 'komunikat', label: 'Komunikaty Wójta' },
    { id: 'konsultacje', label: 'Konsultacje społeczne' },
    { id: 'dotacje', label: 'Dotacje i Programy' },
    { id: 'ostrzezenie', label: 'Alerty i ostrzeżenia' },
  ];

  const filtered = filterCategory === 'wszystkie'
    ? announcements
    : announcements.filter(a => a.category === filterCategory);

  const handleDownload = (ann: OfficialAnnouncement) => {
    setDownloadSuccess(ann.id);
    // Simulate real document download
    const blob = new Blob([
      `URZĄD GMINY LUBSZA - DOKUMENT OFICJALNY\n` +
      `Nr sprawy: ${ann.documentNumber || 'UG.2026'}\n` +
      `Tytuł: ${ann.title}\n` +
      `Data publikacji: ${ann.date}\n` +
      `Wydział: ${ann.department}\n\n` +
      `TREŚĆ KOMUNIKATU:\n${ann.fullText}\n\n` +
      `-- Dokument wygenerowany z Portalu Mieszkańców Gminy Lubsza --`
    ], { type: 'text/plain;charset=utf-8' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = ann.attachmentName || `Dokument_${ann.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800" id="sekcja-urzad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 mb-2 border border-slate-300 dark:border-slate-700">
              <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Monitoring Urzędu Gminy & Decyzji Wójta
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
              Sprawy urzędowe pod lupą mieszkańców
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Śledzimy oficjalne zarządzenia, sesje Rady Gminy, konsultacje społeczne oraz przetargi. Tłumaczymy zawiłości urzędowego języka na zrozumiały dla każdego.
            </p>
          </div>

          <a 
            href="https://lubsza.bip.gov.pl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs"
          >
            Oficjalny BIP Gminy Lubsza <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Announcements List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(ann => (
            <div
              key={ann.id}
              id={`announcement-card-${ann.id}`}
              className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-200 hover:shadow-md flex flex-col justify-between space-y-4 ${
                ann.urgent
                  ? 'border-amber-400 dark:border-amber-500 ring-1 ring-amber-400/30'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    {ann.urgent && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider text-[10px] bg-amber-500 text-white animate-pulse">
                        <AlertTriangle className="w-3 h-3" /> Pilne
                      </span>
                    )}
                    <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase text-[11px]">
                      {ann.department}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                    <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    {ann.date}
                  </span>
                </div>

                <h3 
                  onClick={() => setSelectedAnnouncement(ann)}
                  className="font-bold text-base text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer leading-snug"
                >
                  {ann.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {ann.excerpt}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleDownload(ann)}
                  id={`btn-download-${ann.id}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer"
                  title="Pobierz oficjalny załącznik"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{ann.attachmentName ? ann.attachmentName : 'Pobierz PDF'}</span>
                  {ann.attachmentSize && <span className="text-[10px] text-slate-400">({ann.attachmentSize})</span>}
                </button>

                <button
                  onClick={() => setSelectedAnnouncement(ann)}
                  className="flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Czytaj treść <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {selectedAnnouncement.department}
                </span>
              </div>
              <button 
                onClick={() => setSelectedAnnouncement(null)} 
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Nr sprawy / uchwały: <strong>{selectedAnnouncement.documentNumber || 'UG.0002.2026'}</strong></span>
                <span>Data publikacji: <strong>{selectedAnnouncement.date}</strong></span>
              </div>

              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-slate-100 leading-snug">
                {selectedAnnouncement.title}
              </h2>

              <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-900 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedAnnouncement.excerpt}
              </div>

              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                {selectedAnnouncement.fullText}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleDownload(selectedAnnouncement)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Pobierz oficjalny dokument ({selectedAnnouncement.attachmentSize || 'PDF'})
              </button>

              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
