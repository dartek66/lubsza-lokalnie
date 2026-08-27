import React, { useState } from 'react';
import { ForumPost, ForumReply } from '../types';
import { 
  MessageSquare, 
  ThumbsUp, 
  MessageCircle, 
  Send, 
  Pin, 
  Tag, 
  User, 
  MapPin, 
  PlusCircle, 
  Sparkles, 
  Search,
  Filter,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { VILLAGES } from '../data/mockData';

interface CommunityForumProps {
  posts: ForumPost[];
  onLikePost: (postId: string) => void;
  onAddReply: (postId: string, reply: Omit<ForumReply, 'id' | 'createdAt' | 'likes'>) => void;
  onAddPost: (post: Omit<ForumPost, 'id' | 'createdAt' | 'likes' | 'replies'>) => void;
  isHighContrast: boolean;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({
  posts,
  onLikePost,
  onAddReply,
  onAddPost,
  isHighContrast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('wszystkie');
  const [selectedVillage, setSelectedVillage] = useState<string>('Wszystkie sołectwa');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Reply state
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyAuthor, setReplyAuthor] = useState<Record<string, string>>({});
  const [replyVillage, setReplyVillage] = useState<Record<string, string>>({});

  // New Post Form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState<'Mieszkaniec' | 'Sołtys' | 'Radny' | 'Stowarzyszenie' | 'Lokalny Przedsiębiorca'>('Mieszkaniec');
  const [newVillage, setNewVillage] = useState('Lubsza');
  const [newCategory, setNewCategory] = useState<any>('inicjatywy');
  const [newTags, setNewTags] = useState('Lubsza, Społeczność');

  const categories = [
    { id: 'wszystkie', label: 'Wszystkie wątki' },
    { id: 'inicjatywy', label: 'Inicjatywy i Akcje' },
    { id: 'drogi_infrastruktura', label: 'Drogi i Bezpieczeństwo' },
    { id: 'ekologia', label: 'Ekologia i Przyroda' },
    { id: 'ogloszenia_drobne', label: 'Ogłoszenia i Oddam' },
    { id: 'pomoc_sasiedzka', label: 'Pomoc sąsiedzka' },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'wszystkie' || post.category === selectedCategory;
    const matchesVillage = selectedVillage === 'Wszystkie sołectwa' || post.village === selectedVillage;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesVillage && matchesSearch;
  });

  const handleReplySubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = replyText[postId];
    const author = replyAuthor[postId] || 'Mieszkaniec';
    const village = replyVillage[postId] || 'Lubsza';

    if (!text || !text.trim()) return;

    onAddReply(postId, {
      author: author.trim(),
      village: village,
      content: text.trim(),
    });

    setReplyText(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) return;

    onAddPost({
      title: newTitle.trim(),
      content: newContent.trim(),
      author: newAuthor.trim(),
      authorRole: newRole,
      village: newVillage,
      category: newCategory,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
    });

    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setShowAddModal(false);
  };

  return (
    <section className="py-8 sm:py-12" id="sekcja-forum">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
              <MessageSquare className="w-3.5 h-3.5" />
              Głos Mieszkańców Gminy Lubsza
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
              Forum Społeczności Lokalnej
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Rozmawiaj o sprawach sołectw, zgłaszaj inicjatywy sąsiedzkie i wymieniaj się informacjami
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            id="btn-add-forum-post"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Rozpocznij nowy wątek</span>
          </button>
        </div>

        {/* Filter Toolbar: Category pills + Sołectwo dropdown + Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Filters */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-44">
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full text-xs py-1.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                {VILLAGES.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Szukaj wątku..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Forum Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-slate-500 text-sm font-semibold">Brak wątków spełniających wybrane kryteria.</p>
            </div>
          ) : (
            filteredPosts.map(post => {
              const isExpanded = expandedPostId === post.id;
              return (
                <div
                  key={post.id}
                  id={`forum-post-${post.id}`}
                  className={`bg-white dark:bg-slate-900 rounded-3xl border transition-all duration-200 overflow-hidden shadow-2xs hover:shadow-md ${
                    post.isPinned
                      ? 'border-blue-300 dark:border-blue-700 bg-blue-50/20 dark:bg-blue-950/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Post Header & Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        {post.isPinned && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            <Pin className="w-3 h-3 rotate-45" /> Przypięte
                          </span>
                        )}
                        <span className="font-bold text-slate-900 dark:text-slate-100">{post.author}</span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {post.authorRole}
                        </span>
                        <span className="flex items-center gap-0.5 text-slate-500 text-[11px]">
                          <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          {post.village}
                        </span>
                      </div>

                      <span className="text-slate-400 text-xs">{post.createdAt}</span>
                    </div>

                    <h3 
                      onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                      className="font-bold text-base sm:text-lg font-serif text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors leading-snug"
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Footer Actions */}
                  <div className="px-5 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onLikePost(post.id)}
                        className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold cursor-pointer"
                        title="Poprzyj wątek"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Popieram ({post.likes})</span>
                      </button>

                      <button
                        onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                        className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Odpowiedzi ({post.replies.length})</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                      className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      {isExpanded ? 'Zwiń dyskusję' : 'Odpowiedz / Zobacz wątek'}
                    </button>
                  </div>

                  {/* Expanded Replies & Reply Box */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 space-y-4 animate-in slide-in-from-top-1 duration-150">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Odpowiedzi mieszkańców ({post.replies.length})
                      </h4>

                      {/* Replies list */}
                      <div className="space-y-2.5">
                        {post.replies.length === 0 ? (
                          <p className="text-xs text-slate-500 italic">Brak odpowiedzi. Dodaj pierwszą!</p>
                        ) : (
                          post.replies.map(reply => (
                            <div key={reply.id} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                              <div className="flex items-center justify-between text-[11px] text-slate-500">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900 dark:text-slate-100">{reply.author}</span>
                                  {reply.authorRole && (
                                    <span className="px-2 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-bold">
                                      {reply.authorRole}
                                    </span>
                                  )}
                                  <span className="text-slate-400">({reply.village})</span>
                                </div>
                                <span>{reply.createdAt}</span>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                {reply.content}
                              </p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Reply Input Form */}
                      <form onSubmit={(e) => handleReplySubmit(post.id, e)} className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <input
                            type="text"
                            placeholder="Twoje imię / podpis"
                            value={replyAuthor[post.id] || ''}
                            onChange={(e) => setReplyAuthor({ ...replyAuthor, [post.id]: e.target.value })}
                            className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                          />
                          <select
                            value={replyVillage[post.id] || 'Lubsza'}
                            onChange={(e) => setReplyVillage({ ...replyVillage, [post.id]: e.target.value })}
                            className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 cursor-pointer"
                          >
                            {VILLAGES.filter(v => v !== 'Wszystkie sołectwa').map(v => (
                              <option key={v} value={v}>{v}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex gap-2">
                          <textarea
                            rows={2}
                            required
                            placeholder="Napisz odpowiedź do tego wątku..."
                            value={replyText[post.id] || ''}
                            onChange={(e) => setReplyText({ ...replyText, [post.id]: e.target.value })}
                            className="flex-1 p-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold self-end flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Wyślij</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Add New Forum Thread Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-slate-800 dark:text-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-serif flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Nowy wątek na forum Gminy Lubsza
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-500">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Tytuł tematu *</label>
                <input
                  type="text"
                  required
                  placeholder="np. Propozycja ścieżki rowerowej do Dobrzynia..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Kategoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="inicjatywy">Inicjatywy i Akcje</option>
                    <option value="drogi_infrastruktura">Drogi i Bezpieczeństwo</option>
                    <option value="ekologia">Ekologia i Przyroda</option>
                    <option value="ogloszenia_drobne">Ogłoszenia drobne</option>
                    <option value="pomoc_sasiedzka">Pomoc sąsiedzka</option>
                    <option value="ogolne">Sprawy ogólne</option>
                  </select>
                </div>

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
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Twoje imię / podpis *</label>
                  <input
                    type="text"
                    required
                    placeholder="np. Anna S."
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Rola w społeczności</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="Mieszkaniec">Mieszkaniec</option>
                    <option value="Sołtys">Sołtys</option>
                    <option value="Radny">Radny</option>
                    <option value="Stowarzyszenie">Stowarzyszenie</option>
                    <option value="Lokalny Przedsiębiorca">Lokalny Przedsiębiorca</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Treść wiadomości *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Opisz sprawę, pomysł lub zapytanie do sąsiadów..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tagi (oddzielone przecinkami)</label>
                <input
                  type="text"
                  placeholder="np. Ekologia, Smortawa, Inicjatywa"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
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
                  Opublikuj wątek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
