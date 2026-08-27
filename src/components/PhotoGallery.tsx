import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { 
  Image as ImageIcon, 
  Heart, 
  MapPin, 
  Calendar, 
  Camera, 
  X, 
  Upload, 
  CheckCircle, 
  Maximize2,
  Filter,
  Sparkles
} from 'lucide-react';
import { VILLAGES } from '../data/mockData';

interface PhotoGalleryProps {
  galleryItems: GalleryItem[];
  onLikePhoto: (photoId: string) => void;
  onAddPhoto: (photo: Omit<GalleryItem, 'id' | 'likes'>) => void;
  isHighContrast: boolean;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  galleryItems,
  onLikePhoto,
  onAddPhoto,
  isHighContrast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('wszystkie');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload Form state
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('Lubsza');
  const [newCategory, setNewCategory] = useState<'przyroda' | 'zabytki' | 'wydarzenia' | 'inwestycje'>('przyroda');
  const [newAuthor, setNewAuthor] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const categories = [
    { id: 'wszystkie', label: 'Wszystkie zdjęcia' },
    { id: 'przyroda', label: 'Lasy i Przyroda' },
    { id: 'zabytki', label: 'Zabytki i Architektura' },
    { id: 'wydarzenia', label: 'Imprezy i Festyny' },
    { id: 'inwestycje', label: 'Inwestycje Gminne' },
  ];

  const filteredItems = selectedCategory === 'wszystkie'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    onAddPhoto({
      title: newTitle.trim(),
      location: newLocation,
      category: newCategory,
      imageUrl: newImgUrl,
      author: newAuthor.trim(),
      date: new Date().toISOString().split('T')[0],
      description: newDesc.trim() || 'Zdjęcie nadesłane przez mieszkańca Gminy Lubsza.',
    });

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadModal(false);
      setNewTitle('');
      setNewDesc('');
      setNewAuthor('');
    }, 2000);
  };

  return (
    <section className="py-8 sm:py-12" id="sekcja-galeria">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
              <Camera className="w-3.5 h-3.5" />
              Obiektyw Ziemi Lubszańskiej
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
              Galeria zdjęć gminy Lubsza
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Malownicze krajobrazy Stobrawskiego Parku, zabytki, fotorelacje z wydarzeń i inwestycji
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            id="btn-upload-photo"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer self-start md:self-auto"
          >
            <Upload className="w-4 h-4" />
            <span>Prześlij swoje zdjęcie</span>
          </button>
        </div>

        {/* Category Filters */}
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

        {/* Masonry / Responsive Grid of Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              id={`photo-card-${item.id}`}
              className="group relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div 
                className="relative h-64 w-full overflow-hidden cursor-pointer"
                onClick={() => setLightboxItem(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white border border-white/20">
                    {item.category}
                  </span>
                </div>

                {/* Expand Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxItem(item);
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                  title="Powiększ zdjęcie"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <h3 className="font-bold text-sm line-clamp-1 leading-snug group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      {item.location}
                    </span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              {/* Photo Card Footer */}
              <div className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate">Fot. {item.author}</span>
                <button
                  onClick={() => onLikePhoto(item.id)}
                  className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer text-rose-500 font-semibold"
                  title="Polub zdjęcie"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxItem(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-slate-950/80 border-b border-white/10">
              <div>
                <h3 className="font-bold text-base sm:text-lg font-serif">{lightboxItem.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span>Lokalizacja: {lightboxItem.location}</span>
                  <span>•</span>
                  <span>Autor: {lightboxItem.author}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onLikePhoto(lightboxItem.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>{lightboxItem.likes}</span>
                </button>
                <button 
                  onClick={() => setLightboxItem(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black max-h-[65vh]">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-4 bg-slate-950 text-xs sm:text-sm text-slate-300 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p>{lightboxItem.description}</p>
              <span className="text-[11px] text-slate-500 shrink-0">Data wykonania: {lightboxItem.date}</span>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-serif flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-600" />
                Nadeślij fotografię z Gminy Lubsza
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-500">✕</button>
            </div>

            {uploadSuccess ? (
              <div className="text-center py-8 space-y-2">
                <CheckCircle className="w-12 h-12 text-blue-600 mx-auto" />
                <h4 className="font-bold text-base">Dziękujemy! Fotografia została dodana.</h4>
                <p className="text-xs text-slate-500">Pojawi się w galerii dla wszystkich mieszkańców.</p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Tytuł zdjęcia *</label>
                  <input
                    type="text"
                    required
                    placeholder="np. Zachód słońca nad lasem w Rogalicach"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1">Lokalizacja / Sołectwo</label>
                    <select
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
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
                      <option value="przyroda">Lasy i Przyroda</option>
                      <option value="zabytki">Zabytki i Architektura</option>
                      <option value="wydarzenia">Imprezy i Festyny</option>
                      <option value="inwestycje">Inwestycje Gminne</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Autor zdjęcia *</label>
                  <input
                    type="text"
                    required
                    placeholder="Twoje imię i nazwisko"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Krótki opis</label>
                  <textarea
                    rows={2}
                    placeholder="Gdzie i w jakich okolicznościach wykonano zdjęcie?"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-500 font-semibold"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 cursor-pointer shadow-xs"
                  >
                    Opublikuj w galerii
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
