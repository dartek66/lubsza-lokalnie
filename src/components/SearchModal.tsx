import React, { useState, useMemo } from 'react';
import { Article, OfficialAnnouncement, EventItem, ForumPost } from '../types';
import { 
  Search, 
  X, 
  FileText, 
  Building2, 
  Calendar, 
  MessageSquare, 
  ChevronRight 
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  announcements: OfficialAnnouncement[];
  events: EventItem[];
  forumPosts: ForumPost[];
  onSelectArticle: (article: Article) => void;
  onNavigateTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  announcements,
  events,
  forumPosts,
  onSelectArticle,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchingArticles = articles.filter(a =>
      a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
    );

    const matchingAnnouncements = announcements.filter(a =>
      a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
    );

    const matchingEvents = events.filter(e =>
      e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
    );

    const matchingPosts = forumPosts.filter(p =>
      p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
    );

    return {
      articles: matchingArticles,
      announcements: matchingAnnouncements,
      events: matchingEvents,
      forumPosts: matchingPosts,
      total: matchingArticles.length + matchingAnnouncements.length + matchingEvents.length + matchingPosts.length,
    };
  }, [query, articles, announcements, events, forumPosts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-20 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-slate-800 dark:text-slate-100 max-h-[80vh] overflow-y-auto">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Szukaj w portalu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-slate-100"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Results Container */}
        {results ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Znaleziono wyników: <strong className="text-slate-900 dark:text-slate-100">{results.total}</strong> dla frazy "{query}"
            </p>

            {results.total === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">Brak wyników. Spróbuj innego słowa kluczowego.</p>
            ) : (
              <div className="space-y-3.5 text-xs">
                {/* Articles */}
                {results.articles.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Aktualności</span>
                    {results.articles.map(a => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onSelectArticle(a);
                          onClose();
                        }}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-semibold">{a.title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Announcements */}
                {results.announcements.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Ogłoszenia Urzędowe</span>
                    {results.announcements.map(ann => (
                      <div
                        key={ann.id}
                        onClick={() => {
                          onNavigateTab('notices');
                          onClose();
                        }}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-semibold">{ann.title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Events */}
                {results.events.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Wydarzenia</span>
                    {results.events.map(ev => (
                      <div
                        key={ev.id}
                        onClick={() => {
                          onNavigateTab('events');
                          onClose();
                        }}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-semibold">{ev.title} ({ev.date})</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Forum */}
                {results.forumPosts.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Forum Mieszkańców</span>
                    {results.forumPosts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onNavigateTab('forum');
                          onClose();
                        }}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-semibold">{p.title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-xs text-slate-400 py-4 text-center">
            Wpisz szukaną frazę, np. "odpady", "dożynki", "park", "sesja rady", "Czyste Powietrze"
          </div>
        )}

        <div className="flex justify-end pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
