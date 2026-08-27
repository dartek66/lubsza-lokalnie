import React, { useState, useEffect } from 'react';
import { 
  Article, 
  CommentItem,
  OfficialAnnouncement, 
  EventItem, 
  ForumPost, 
  GalleryItem, 
  Survey, 
  CitizenReview, 
  ReviewCriteria, 
  ResidentAlert 
} from './types';
import { 
  ARTICLES, 
  OFFICIAL_ANNOUNCEMENTS, 
  EVENTS, 
  FORUM_POSTS, 
  GALLERY_ITEMS, 
  SURVEYS, 
  INITIAL_CRITERIA, 
  CITIZEN_REVIEWS, 
  RESIDENT_ALERTS, 
  COMMUNITY_STATS 
} from './data/mockData';

// Component imports
import { Navbar } from './components/Navbar';
import { HeaderBanner } from './components/HeaderBanner';
import { ArticleSection } from './components/ArticleSection';
import { ArticleModal } from './components/ArticleModal';
import { OfficialAnnouncements } from './components/OfficialAnnouncements';
import { UsefulLinksSection } from './components/UsefulLinksSection';
import { MunicipalityRatingSection } from './components/MunicipalityRatingSection';
import { PhotoGallery } from './components/PhotoGallery';
import { EventsSection } from './components/EventsSection';
import { CommunityForum } from './components/CommunityForum';
import { WasteScheduleWidget } from './components/WasteScheduleWidget';
import { ResidentAlertModal } from './components/ResidentAlertModal';
import { SearchModal } from './components/SearchModal';
import { ForestSection } from './components/ForestSection';
import { AnimalsSection } from './components/AnimalsSection';
import { Footer } from './components/Footer';

// Extra icons
import { 
  Sparkles, 
  AlertTriangle, 
  MessageSquarePlus, 
  Calendar, 
  Award, 
  Layers, 
  ArrowUp,
  Radio,
  BookOpen
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Accessibility States
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isWasteModalOpen, setIsWasteModalOpen] = useState(false);

  // Dynamic Data States with persistence
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('gmina_lubsza_articles');
    return saved ? JSON.parse(saved) : ARTICLES;
  });

  const [announcements, setAnnouncements] = useState<OfficialAnnouncement[]>(OFFICIAL_ANNOUNCEMENTS);

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('gmina_lubsza_events');
    return saved ? JSON.parse(saved) : EVENTS;
  });

  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('gmina_lubsza_forum');
    return saved ? JSON.parse(saved) : FORUM_POSTS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('gmina_lubsza_gallery');
    return saved ? JSON.parse(saved) : GALLERY_ITEMS;
  });

  const [surveys, setSurveys] = useState<Survey[]>(() => {
    const saved = localStorage.getItem('gmina_lubsza_surveys');
    return saved ? JSON.parse(saved) : SURVEYS;
  });

  const [criteria, setCriteria] = useState<ReviewCriteria[]>(() => {
    const saved = localStorage.getItem('gmina_lubsza_criteria');
    return saved ? JSON.parse(saved) : INITIAL_CRITERIA;
  });

  const [reviews, setReviews] = useState<CitizenReview[]>(() => {
    const saved = localStorage.getItem('gmina_lubsza_reviews');
    return saved ? JSON.parse(saved) : CITIZEN_REVIEWS;
  });

  const [alerts, setAlerts] = useState<ResidentAlert[]>(() => {
    const saved = localStorage.getItem('gmina_lubsza_alerts');
    return saved ? JSON.parse(saved) : RESIDENT_ALERTS;
  });

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('gmina_lubsza_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('gmina_lubsza_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('gmina_lubsza_forum', JSON.stringify(forumPosts));
  }, [forumPosts]);

  useEffect(() => {
    localStorage.setItem('gmina_lubsza_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('gmina_lubsza_surveys', JSON.stringify(surveys));
  }, [surveys]);

  useEffect(() => {
    localStorage.setItem('gmina_lubsza_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('gmina_lubsza_criteria', JSON.stringify(criteria));
  }, [criteria]);

  useEffect(() => {
    localStorage.setItem('gmina_lubsza_alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Handle article like
  const handleLikeArticle = (articleId: string) => {
    setArticles(prev => prev.map(a => {
      if (a.id === articleId) {
        const isLiked = a.isLiked;
        return {
          ...a,
          likes: isLiked ? a.likes - 1 : a.likes + 1,
          isLiked: !isLiked,
        };
      }
      return a;
    }));

    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle(prev => prev ? {
        ...prev,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
        isLiked: !prev.isLiked,
      } : null);
    }
  };

  // Handle article comment
  const handleAddComment = (articleId: string, commentData: Omit<CommentItem, 'id' | 'createdAt' | 'likes'>) => {
    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      author: commentData.author,
      createdAt: 'przed chwilą',
      content: commentData.content,
      village: commentData.village,
      likes: 0,
    };

    setArticles(prev => prev.map(a => {
      if (a.id === articleId) {
        return {
          ...a,
          comments: [newComment, ...(a.comments || [])],
        };
      }
      return a;
    }));

    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle(prev => prev ? {
        ...prev,
        comments: [newComment, ...(prev.comments || [])],
      } : null);
    }
  };

  // Real-time survey vote
  const handleVoteSurvey = (surveyId: string, optionId: string) => {
    setSurveys(prev => prev.map(s => {
      if (s.id === surveyId) {
        return {
          ...s,
          totalVotes: s.totalVotes + 1,
          userVotedOptionId: optionId,
          options: s.options.map(opt => {
            if (opt.id === optionId) {
              return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
          }),
        };
      }
      return s;
    }));
  };

  // Add Citizen Review
  const handleAddReview = (newRev: Omit<CitizenReview, 'id' | 'date' | 'helpfulCount'>) => {
    const review: CitizenReview = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 1,
    };

    setReviews(prev => [review, ...prev]);

    // Recalculate criteria score dynamically
    setCriteria(prev => prev.map(c => {
      const newScore = Math.min(5, Math.max(1, (c.score * c.reviewsCount + newRev.rating) / (c.reviewsCount + 1)));
      return {
        ...c,
        score: Number(newScore.toFixed(1)),
        reviewsCount: c.reviewsCount + 1,
      };
    }));
  };

  // Like Photo
  const handleLikePhoto = (photoId: string) => {
    setGalleryItems(prev => prev.map(p => {
      if (p.id === photoId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  // Add Photo
  const handleAddPhoto = (photo: Omit<GalleryItem, 'id' | 'likes'>) => {
    const newP: GalleryItem = {
      ...photo,
      id: `photo-${Date.now()}`,
      likes: 1,
    };
    setGalleryItems(prev => [newP, ...prev]);
  };

  // Join Event
  const handleToggleJoinEvent = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const joined = e.isJoined;
        return {
          ...e,
          isJoined: !joined,
          attendeesCount: joined ? e.attendeesCount - 1 : e.attendeesCount + 1,
        };
      }
      return e;
    }));
  };

  // Add Event
  const handleAddEvent = (event: Omit<EventItem, 'id' | 'attendeesCount'>) => {
    const newEv: EventItem = {
      ...event,
      id: `ev-${Date.now()}`,
      attendeesCount: 1,
      isJoined: true,
    };
    setEvents(prev => [newEv, ...prev]);
  };

  // Like Forum Post
  const handleLikeForumPost = (postId: string) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  // Reply Forum Post
  const handleAddForumReply = (postId: string, reply: any) => {
    const newRep = {
      ...reply,
      id: `rep-${Date.now()}`,
      createdAt: 'przed chwilą',
      likes: 0,
    };
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, newRep],
        };
      }
      return p;
    }));
  };

  // Add Forum Post
  const handleAddForumPost = (post: any) => {
    const newPost: ForumPost = {
      ...post,
      id: `post-${Date.now()}`,
      createdAt: 'dzisiaj',
      likes: 1,
      replies: [],
    };
    setForumPosts(prev => [newPost, ...prev]);
  };

  // Add Resident Alert
  const handleAddResidentAlert = (alert: any) => {
    const newAl: ResidentAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'zgloszone',
      upvotes: 1,
    };
    setAlerts(prev => [newAl, ...prev]);
  };

  // Upvote Alert
  const handleUpvoteAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return { ...a, upvotes: a.upvotes + 1 };
      }
      return a;
    }));
  };

  // Scroll to top on tab switch
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Font size class mapper
  const fontSizeClass = {
    normal: '',
    large: 'text-[1.08rem]',
    xlarge: 'text-[1.18rem]',
  }[fontSize];

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors ${fontSizeClass} ${
      isHighContrast
        ? 'high-contrast bg-black text-yellow-300'
        : isDarkMode
        ? 'dark bg-slate-950 text-slate-100'
        : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Accessible Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAlert={() => setIsAlertModalOpen(true)}
      />

      {/* Main Content Area based on activeTab */}
      <main className="pb-12">
        {/* TAB: HOME (Strona Główna wg wytycznych: Baner z herbem i zdjęciem z gminy, najnowszy dodany artykuł + 3 skróty poniżej, sekcja najważniejszych ogłoszeń urzędowych, przydatne linki, ankiety i ocena urzędu, galeria) */}
        {activeTab === 'home' && (
          <div className="space-y-4 sm:space-y-8 animate-in fade-in duration-300">
            {/* Hero Header with Coat of Arms, Local Imagery, Urgent ticker */}
            <HeaderBanner
              onOpenAlert={() => setIsAlertModalOpen(true)}
              onOpenWasteSchedule={() => setIsWasteModalOpen(true)}
              onNavigate={handleNavigate}
            />

            {/* Articles Section: Latest Featured + 3 Shortcut Links + All Articles grid */}
            <ArticleSection
              articles={articles}
              onSelectArticle={(art) => setSelectedArticle(art)}
              onLikeArticle={handleLikeArticle}
              isHighContrast={isHighContrast}
            />

            {/* Official Municipal Notices Board */}
            <OfficialAnnouncements
              announcements={announcements}
              isHighContrast={isHighContrast}
            />

            {/* Resident Rating & Live Surveys (Ocena Urzędu Gminy & Wyniki w czasie rzeczywistym) */}
            <MunicipalityRatingSection
              surveys={surveys}
              onVoteSurvey={handleVoteSurvey}
              criteria={criteria}
              reviews={reviews}
              onAddReview={handleAddReview}
              isHighContrast={isHighContrast}
            />

            {/* Photo Gallery Grid Preview */}
            <PhotoGallery
              galleryItems={galleryItems}
              onLikePhoto={handleLikePhoto}
              onAddPhoto={handleAddPhoto}
              isHighContrast={isHighContrast}
            />

            {/* Civic E-Services & Useful Links */}
            <UsefulLinksSection
              onOpenWasteSchedule={() => setIsWasteModalOpen(true)}
              onOpenAlert={() => setIsAlertModalOpen(true)}
              isHighContrast={isHighContrast}
            />
          </div>
        )}

        {/* TAB: NEWS / AKTUALNOŚCI */}
        {activeTab === 'news' && (
          <div className="pt-6 animate-in fade-in duration-300">
            <ArticleSection
              articles={articles}
              onSelectArticle={(art) => setSelectedArticle(art)}
              onLikeArticle={handleLikeArticle}
              isHighContrast={isHighContrast}
            />
          </div>
        )}

        {/* TAB: FOREST & TRAILS / LASY I ŚCIEŻKI */}
        {activeTab === 'forest' && (
          <div className="pt-6 animate-in fade-in duration-300">
            <ForestSection
              isHighContrast={isHighContrast}
            />
          </div>
        )}

        {/* TAB: ANIMALS / ZWIERZĘTA */}
        {activeTab === 'animals' && (
          <div className="pt-6 animate-in fade-in duration-300">
            <AnimalsSection
              isHighContrast={isHighContrast}
            />
          </div>
        )}

        {/* TAB: EVENTS / WYDARZENIA KULTURALNE */}
        {activeTab === 'events' && (
          <div className="pt-6 animate-in fade-in duration-300">
            <EventsSection
              events={events}
              onToggleJoinEvent={handleToggleJoinEvent}
              onAddEvent={handleAddEvent}
              isHighContrast={isHighContrast}
            />
          </div>
        )}

        {/* TAB: FORUM / DYSKUSJE MIESZKAŃCÓW */}
        {activeTab === 'forum' && (
          <div className="pt-6 animate-in fade-in duration-300">
            <CommunityForum
              posts={forumPosts}
              onLikePost={handleLikeForumPost}
              onAddReply={handleAddForumReply}
              onAddPost={handleAddForumPost}
              isHighContrast={isHighContrast}
            />
          </div>
        )}

        {/* TAB: GALLERY / GALERIA ZDJĘĆ */}
        {activeTab === 'gallery' && (
          <div className="pt-6 animate-in fade-in duration-300">
            <PhotoGallery
              galleryItems={galleryItems}
              onLikePhoto={handleLikePhoto}
              onAddPhoto={handleAddPhoto}
              isHighContrast={isHighContrast}
            />
          </div>
        )}

        {/* TAB: NOTICES / TABLICA OGŁOSZEŃ URZĘDOWYCH */}
        {activeTab === 'notices' && (
          <div className="pt-6 animate-in fade-in duration-300">
            <OfficialAnnouncements
              announcements={announcements}
              isHighContrast={isHighContrast}
            />
          </div>
        )}

        {/* TAB: REVIEWS & SURVEYS / OCENY I ANKIETY */}
        {activeTab === 'reviews' && (
          <div className="pt-6 animate-in fade-in duration-300">
            <MunicipalityRatingSection
              surveys={surveys}
              onVoteSurvey={handleVoteSurvey}
              criteria={criteria}
              reviews={reviews}
              onAddReview={handleAddReview}
              isHighContrast={isHighContrast}
            />
          </div>
        )}

        {/* TAB: RESIDENT SERVICES & WASTE SCHEDULE / DLA MIESZKAŃCA */}
        {activeTab === 'resident' && (
          <div className="pt-6 space-y-8 animate-in fade-in duration-300">
            <WasteScheduleWidget isModal={false} />
            <UsefulLinksSection
              onOpenWasteSchedule={() => setIsWasteModalOpen(true)}
              onOpenAlert={() => setIsAlertModalOpen(true)}
              isHighContrast={isHighContrast}
            />
          </div>
        )}
      </main>

      {/* MODAL: Article Reader with Comments */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onLike={() => handleLikeArticle(selectedArticle.id)}
          onAddComment={(articleId, commentData) => handleAddComment(articleId, commentData)}
          isHighContrast={isHighContrast}
        />
      )}

      {/* MODAL: Global Portal Search */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        announcements={announcements}
        events={events}
        forumPosts={forumPosts}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onNavigateTab={handleNavigate}
      />

      {/* MODAL: Resident Alert (Naprawmy Gminę) */}
      <ResidentAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        alerts={alerts}
        onAddAlert={handleAddResidentAlert}
        onUpvoteAlert={handleUpvoteAlert}
      />

      {/* MODAL: Waste Schedule (Harmonogram Wywozu Odpadów) */}
      {isWasteModalOpen && (
        <WasteScheduleWidget
          isModal={true}
          onClose={() => setIsWasteModalOpen(false)}
        />
      )}

      {/* Footer with Municipality Info & Cloudflare/GitHub Deployment Details */}
      <Footer
        onNavigate={handleNavigate}
        isHighContrast={isHighContrast}
      />

    </div>
  );
}
