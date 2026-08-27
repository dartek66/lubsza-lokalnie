import React, { useState } from 'react';
import { Article, CategoryType } from '../types';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Heart, 
  MessageSquare, 
  Sparkles, 
  PlusCircle, 
  Filter, 
  Search,
  BookOpen,
  CheckCircle,
  Tag
} from 'lucide-react';
import { VILLAGES } from '../data/mockData';

interface ArticleSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onLikeArticle: (articleId: string) => void;
  onAddNewArticle: (article: Omit<Article, 'id' | 'views' | 'likes' | 'comments'>) => void;
  isHighContrast: boolean;
}

export const ArticleSection: React.FC<ArticleSectionProps> = ({
  articles,
  onSelectArticle,
  onLikeArticle,
  onAddNewArticle,
  isHighContrast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('wszystkie');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New article form state
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryType>('spolecznosc');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('Mieszkaniec Gminy');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80');
  const [newTags, setNewTags] = useState('Lubsza, Społeczność');

  // Categories list
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'wszystkie', label: 'Wszystkie' },
    { id: 'kontrola', label: 'Kontrola & Audyt' },
    { id: 'okiem_mieszkanca', label: 'Okiem Mieszkańca' },
    { id: 'inwestycje', label: 'Inwestycje i Drogi' },
    { id: 'spolecznosc', label: 'Społeczność & Sołectwa' },
    { id: 'kultura', label: 'Kultura & Tradycja' },
    { id: 'sport', label: 'Sport' },
    { id: 'urzad', label: 'Decyzje UG' },
  ];

  // Filtering
  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'wszystkie' || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Latest / Featured article is the 1st one
  const featuredArticle = filteredArticles[0] || articles[0];
  // Exactly 3 next articles below as requested
  const nextThreeArticles = filteredArticles.slice(1, 4);

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) return;

    onAddNewArticle({
      title: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: newExcerpt.trim() || newContent.substring(0, 140) + '...',
      content: newContent.trim(),
      coverImage: newImage,
      author: newAuthor.trim(),
      authorRole: newRole,
      publishDate: new Date().toISOString().split('T')[0],
      readTimeMinutes: Math.max(2, Math.ceil(newContent.split(' ').length / 180)),
      category: newCategory,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
    });

    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setShowAddModal(false);
  };

  return (
    <section className="py-8 sm:py-12" id="sekcja-aktualnosci">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header with Category Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 mb-2 border border-amber-200 dark:border-amber-800">
              <BookOpen className="w-3.5 h-3.5" />
              Niezależna Publicystyka & Wiadomości
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 tracking-tight">
              Wiadomości, Okiem Mieszkańca i Straż Obywatelska
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Rzetelne wieści z 21 sołectw, docenianie oddolnych inicjatyw oraz obywatelska kontrola decyzji urzędu
            </p>
          </div>

          {/* Action: Add new community article + Search */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Szukaj w portalu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56"
              />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              id="btn-add-article-modal"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Napisz / Zgłoś temat</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 1. NAJNOWSZY DANY ARTYKUŁ (FEATURED LATEST POST) */}
        {featuredArticle ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Photo */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[300px] overflow-hidden group">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Najnowszy artykuł
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              {/* Text & Action */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      {featuredArticle.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {featuredArticle.readTimeMinutes} min czytania
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectArticle(featuredArticle)}
                    className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors leading-tight"
                  >
                    {featuredArticle.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredArticle.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer bar of featured article */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <button
                      onClick={() => onLikeArticle(featuredArticle.id)}
                      className="flex items-center gap-1.5 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Polub artykuł"
                    >
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{featuredArticle.likes}</span>
                    </button>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <MessageSquare className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{featuredArticle.comments.length}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectArticle(featuredArticle)}
                    id="btn-read-featured"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer"
                  >
                    Czytaj artykuł <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-100 dark:bg-slate-900 rounded-3xl">
            <p className="text-slate-500">Brak artykułów spełniających kryteria wyszukiwania.</p>
          </div>
        )}

        {/* 2. PONIŻEJ TRZY ODNOŚNIKI, SKRÓTY ZE ZDJĘCIEM DO NASTĘPNYCH ARTYKUŁÓW */}
        {nextThreeArticles.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Kolejne artykuły i reportaże
              </h3>
              <span className="text-xs text-slate-500">
                Wyświetlono 3 z {articles.length} artykułów
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextThreeArticles.map((art) => (
                <article
                  key={art.id}
                  id={`article-card-${art.id}`}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white">
                        {art.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          {art.publishDate}
                        </span>
                        <span>•</span>
                        <span>{art.readTimeMinutes} min czytania</span>
                      </div>

                      <h4 
                        onClick={() => onSelectArticle(art)}
                        className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer transition-colors leading-snug line-clamp-2"
                      >
                        {art.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium truncate max-w-[140px]">
                      Autor: {art.author}
                    </span>

                    <button
                      onClick={() => onSelectArticle(art)}
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      Więcej <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add New Article Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold font-serif flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-600" />
                Dodaj nowy artykuł do portalu Gminy Lubsza
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Tytuł artykułu *</label>
                <input
                  type="text"
                  required
                  placeholder="np. Sukces lokalnych kół gospodyń wiejskich..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Kategoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CategoryType)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="aktualnosci">Aktualności</option>
                    <option value="inwestycje">Inwestycje</option>
                    <option value="kultura">Kultura</option>
                    <option value="sport">Sport</option>
                    <option value="spolecznosc">Społeczność</option>
                    <option value="urzad">Urząd</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">Autor / Źródło *</label>
                  <input
                    type="text"
                    required
                    placeholder="Twoje imię i nazwisko"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Krótki wstęp (zajawka)</label>
                <textarea
                  rows={2}
                  placeholder="Krótkie podsumowanie widoczne na stronie głównej..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Pełna treść artykułu *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Wpisz szczegółowy opis wydarzenia lub wiadomości..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Tagi (oddzielone przecinkami)</label>
                <input
                  type="text"
                  placeholder="np. Lubsza, Szydłowice, Kultura, Festyn"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  Zapisz i opublikuj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
