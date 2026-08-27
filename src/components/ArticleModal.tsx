import React, { useState } from 'react';
import { Article, CommentItem } from '../types';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  MessageSquare, 
  Share2, 
  Send, 
  CheckCircle,
  Tag,
  MapPin,
  Sparkles
} from 'lucide-react';
import { VILLAGES } from '../data/mockData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onLike: (articleId: string) => void;
  onAddComment: (articleId: string, comment: Omit<CommentItem, 'id' | 'createdAt' | 'likes'>) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onLike,
  onAddComment,
}) => {
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentVillage, setNewCommentVillage] = useState('Lubsza');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    onAddComment(article.id, {
      author: newCommentName.trim(),
      village: newCommentVillage,
      content: newCommentText.trim(),
    });

    setNewCommentName('');
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-article-title"
      >
        {/* Sticky Close Button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:px-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {article.publishDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              id="btn-modal-share"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? 'Skopiowano link!' : 'Udostępnij'}
            </button>
            <button
              onClick={onClose}
              id="btn-modal-close"
              aria-label="Zamknij artykuł"
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero image in modal */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 id="modal-article-title" className="text-xl sm:text-2xl md:text-3xl font-bold font-serif leading-tight text-white drop-shadow-sm">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Article Meta bar */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center font-bold text-blue-800 dark:text-blue-200">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{article.author}</p>
                <p className="text-xs text-slate-500">{article.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {article.publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {article.readTimeMinutes} min czytania
              </span>
            </div>
          </div>

          {/* Lead excerpt */}
          <div className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed bg-blue-50/60 dark:bg-blue-950/30 p-5 rounded-2xl border-l-4 border-blue-600">
            {article.excerpt}
          </div>

          {/* Full content body */}
          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
              <Tag className="w-4 h-4 text-slate-400" />
              {article.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Like Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onLike(article.id)}
              id="btn-article-like"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 font-semibold text-sm transition-colors cursor-pointer border border-rose-200 dark:border-rose-900/50"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Doceniam ten artykuł ({article.likes})</span>
            </button>

            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              Komentarze: {article.comments.length}
            </span>
          </div>

          {/* Comments Section */}
          <div className="mt-8 pt-6 border-t-2 border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="text-lg font-bold font-serif flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Dyskusja mieszkańców ({article.comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3.5">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Dodaj swój komentarz jako mieszkaniec
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Twoje imię / pseudonim
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="np. Jan Kowalski"
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Miejscowość / Sołectwo
                  </label>
                  <select
                    value={newCommentVillage}
                    onChange={(e) => setNewCommentVillage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {VILLAGES.filter(v => v !== 'Wszystkie sołectwa').map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Treść komentarza
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Napisz swoją opinię lub zadaj pytanie..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                {commentSuccess ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                    <CheckCircle className="w-4 h-4" /> Komentarz został dodany!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500">
                    Wpisy podlegają netykiecie lokalnej społeczności.
                  </span>
                )}
                <button
                  type="submit"
                  id="btn-submit-comment"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Opublikuj komentarz
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {article.comments.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4 text-center">
                  Brak komentarzy. Bądź pierwszą osobą, która skomentuje ten artykuł!
                </p>
              ) : (
                article.comments.map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{c.author}</span>
                        {c.village && (
                          <span className="flex items-center gap-0.5 text-[11px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                            <MapPin className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                            {c.village}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400">{c.createdAt}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
