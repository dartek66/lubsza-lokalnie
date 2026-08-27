import React, { useState } from 'react';
import { CitizenReview, ReviewCriteria, Survey } from '../types';
import { 
  Star, 
  Vote, 
  Send, 
  CheckCircle2, 
  ThumbsUp, 
  Building, 
  MessageSquare, 
  Sparkles, 
  TrendingUp, 
  BarChart3,
  Award,
  ShieldCheck,
  MapPin,
  Clock,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VILLAGES } from '../data/mockData';

interface MunicipalityRatingSectionProps {
  surveys: Survey[];
  onVoteSurvey: (surveyId: string, optionId: string) => void;
  criteria: ReviewCriteria[];
  reviews: CitizenReview[];
  onAddReview: (review: Omit<CitizenReview, 'id' | 'date' | 'helpfulCount'>) => void;
  isHighContrast: boolean;
}

export const MunicipalityRatingSection: React.FC<MunicipalityRatingSectionProps> = ({
  surveys,
  onVoteSurvey,
  criteria,
  reviews,
  onAddReview,
  isHighContrast,
}) => {
  // Survey active tab
  const [activeSurveyIndex, setActiveSurveyIndex] = useState(0);
  const currentSurvey = surveys[activeSurveyIndex] || surveys[0];

  // Review Form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewVillage, setReviewVillage] = useState('Lubsza');
  const [reviewDept, setReviewDept] = useState('Centrum Obsługi Mieszkańca / Kancelaria');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [filterVillage, setFilterVillage] = useState('Wszystkie sołectwa');

  // Calculate overall average score
  const avgScore = criteria.reduce((acc, c) => acc + c.score, 0) / criteria.length;

  const handleVote = (optionId: string) => {
    if (currentSurvey.userVotedOptionId) return; // already voted
    onVoteSurvey(currentSurvey.id, optionId);

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#3B82F6', '#60A5FA'],
      });
    } catch {
      // ignore
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    onAddReview({
      author: reviewAuthor.trim(),
      village: reviewVillage,
      rating: reviewRating,
      department: reviewDept,
      comment: reviewComment.trim(),
    });

    setReviewAuthor('');
    setReviewComment('');
    setReviewRating(5);
    setReviewSuccess(true);

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#2563EB', '#38BDF8', '#F59E0B'],
      });
    } catch {}

    setTimeout(() => setReviewSuccess(false), 4000);
  };

  const filteredReviews = filterVillage === 'Wszystkie sołectwa'
    ? reviews
    : reviews.filter(r => r.village === filterVillage);

  return (
    <section className="py-8 sm:py-12 bg-slate-100/50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800" id="sekcja-oceny">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Award className="w-3.5 h-3.5" />
            Obywatelski Barometr Władzy & Niezależne Ankiety
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-slate-100 tracking-tight">
            Obywatelska Kontrola i Ocena Władz Gminy
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Niezależna platforma mieszkańców do oceny wójta, radnych oraz referatów urzędowych. Doceniamy rzetelną pracę, ale bezkompromisowo punktujemy wpadki, zwłokę i zaniedbania.
          </p>
        </div>

        {/* 2-Column Core Layout: LEFT = Live Survey / Poll, RIGHT = Municipality Rating Score & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: REAL-TIME INTERACTIVE SURVEY (ANKIETA W CZASIE RZECZYWISTYM) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    Ankieta Mieszkańców
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Wyniki na żywo • Głosowanie aktywne</p>
                </div>
              </div>

              {/* Survey Switcher Pills */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                {surveys.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSurveyIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeSurveyIndex === idx
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    Ankieta #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Survey Header */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                  Kategoria: {currentSurvey.category}
                </span>
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Clock className="w-3.5 h-3.5" />
                  Głosowanie do: {currentSurvey.endsAt}
                </span>
              </div>

              <h4 className="text-lg font-bold font-serif text-slate-900 dark:text-slate-100 leading-snug">
                {currentSurvey.question}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {currentSurvey.description}
              </p>
            </div>

            {/* Interactive Options with Live Progress Bars */}
            <div className="space-y-3 pt-1">
              {currentSurvey.options.map((opt) => {
                const percentage = currentSurvey.totalVotes > 0 
                  ? Math.round((opt.votes / currentSurvey.totalVotes) * 100) 
                  : 0;
                const isSelected = currentSurvey.userVotedOptionId === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleVote(opt.id)}
                    className={`relative overflow-hidden p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/60 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    {/* Animated Percentage Background Fill */}
                    <div
                      className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ${
                        isSelected 
                          ? 'bg-blue-500/20 dark:bg-blue-500/30' 
                          : 'bg-slate-200/60 dark:bg-slate-700/50'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />

                    <div className="relative z-10 flex items-center justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected 
                            ? 'border-blue-600 bg-blue-600 text-white' 
                            : 'border-slate-400'
                        }`}>
                          {isSelected && <span className="text-[10px] font-bold">✓</span>}
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">
                          {opt.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{percentage}%</span>
                        <span className="text-slate-400">({opt.votes})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Votes Summary */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Vote className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Łącznie oddanych głosów: <strong className="text-slate-800 dark:text-slate-200">{currentSurvey.totalVotes}</strong>
              </span>

              {currentSurvey.userVotedOptionId ? (
                <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Twój głos został zapisany!
                </span>
              ) : (
                <span className="text-slate-400 italic">
                  Kliknij wybraną opcję, aby zagłosować
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: MUNICIPALITY EVALUATION & SCORECARD */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            
            {/* Scorecard Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Obywatelska Ocena Władz i Urzędników
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Na podstawie {criteria[0].reviewsCount} opinii mieszkańców Lubszy i sołectw</p>
                </div>
              </div>

              {/* Big Score Badge */}
              <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-3.5 py-1.5 rounded-2xl">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-2xl font-extrabold text-amber-800 dark:text-amber-200 font-mono">
                  {avgScore.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400">/ 5.0</span>
              </div>
            </div>

            {/* Criteria Breakdown Bars */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Szczegółowa ocena według kryteriów
              </h4>

              {criteria.map(crit => (
                <div key={crit.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{crit.name}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">{crit.score.toFixed(1)}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${(crit.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Review Form */}
            <form onSubmit={handleReviewSubmit} className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3.5 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center justify-between">
                <span>Wystaw opinię urzędowi</span>
                <span className="text-amber-500 font-normal normal-case text-xs flex items-center gap-1">
                  Twoja ocena: {reviewRating} ★
                </span>
              </h4>

              {/* Star Picker */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-2xl transition-transform hover:scale-125 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || reviewRating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Twoje imię / inicjały</label>
                  <input
                    type="text"
                    required
                    placeholder="np. Piotr K."
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Sołectwo</label>
                  <select
                    value={reviewVillage}
                    onChange={(e) => setReviewVillage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  >
                    {VILLAGES.filter(v => v !== 'Wszystkie sołectwa').map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold mb-1">Oceniany organ lub referat</label>
                <select
                  value={reviewDept}
                  onChange={(e) => setReviewDept(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                >
                  <option>Wójt Gminy Lubsza (Działania & Obietnice)</option>
                  <option>Radni Rady Gminy (Aktywność na sesjach)</option>
                  <option>Referat Inwestycji i Dróg (Stan nawierzchni & Chodniki)</option>
                  <option>Referat Ochrony Środowiska (Dzikie wysypiska & Czyste Powietrze)</option>
                  <option>Podatki, Opłaty i Gospodarka Odpadami</option>
                  <option>Centrum Obsługi Mieszkańca / Kancelaria Urzędu</option>
                  <option>Zakład Gospodarki Komunalnej (ZGK)</option>
                </select>
              </div>

              <div className="text-xs">
                <label className="block font-semibold mb-1">Twoja opinia (Pochwała lub Wpadka do naprawy)</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Opisz konkretną sprawę: co zasługuje na pochwałę, a co wójt lub urzędnicy powinni niezwłocznie poprawić?"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                {reviewSuccess ? (
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Dziękujemy za opinię!
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">Opinie publikowane są publicznie</span>
                )}

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Prześlij ocenę
                </button>
              </div>
            </form>

          </div>
        </div>

        {/* RECENT REVIEWS FEED */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Głosy Mieszkańców: Pochwały i Wpadki pod Lupą
            </h3>

            {/* Filter by village */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Filtruj sołectwo:</span>
              <select
                value={filterVillage}
                onChange={(e) => setFilterVillage(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {VILLAGES.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{rev.author}</span>
                      <span className="text-[11px] text-slate-400">({rev.village})</span>
                    </div>
                    <div className="flex text-amber-400 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < rev.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-md inline-block">
                    {rev.department}
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {/* Official reply from Municipality if available */}
                  {rev.officialReply && (
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border-l-2 border-blue-600 text-[11px] space-y-1 mt-2">
                      <div className="font-bold text-blue-800 dark:text-blue-300 flex items-center justify-between">
                        <span>Odpowiedź: {rev.officialReply.author}</span>
                        <span className="text-slate-400 font-normal">{rev.officialReply.date}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        {rev.officialReply.text}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span>Data: {rev.date}</span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Pomocna ({rev.helpfulCount})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
