export type CategoryType = 'wszystkie' | 'aktualnosci' | 'kontrola' | 'okiem_mieszkanca' | 'inwestycje' | 'kultura' | 'sport' | 'spolecznosc' | 'urzad';

export interface CommentItem {
  id: string;
  author: string;
  avatar?: string;
  village?: string;
  createdAt: string;
  content: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorRole: string;
  publishDate: string;
  readTimeMinutes: number;
  category: CategoryType;
  views: number;
  likes: number;
  comments: CommentItem[];
  tags: string[];
  isFeatured?: boolean;
}

export interface OfficialAnnouncement {
  id: string;
  title: string;
  category: 'sesja_rady' | 'komunikat' | 'konsultacje' | 'dotacje' | 'przetarg' | 'ostrzezenie';
  date: string;
  urgent: boolean;
  department: string;
  excerpt: string;
  fullText: string;
  documentNumber?: string;
  attachmentName?: string;
  attachmentSize?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  village: string;
  category: 'kultura' | 'sport' | 'festyn' | 'warsztaty' | 'dla_dzieci' | 'ekologia';
  description: string;
  image: string;
  organizer: string;
  attendeesCount: number;
  isJoined?: boolean;
}

export interface ForumReply {
  id: string;
  author: string;
  village: string;
  authorRole?: string;
  createdAt: string;
  content: string;
  likes: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: 'Mieszkaniec' | 'Sołtys' | 'Radny' | 'Stowarzyszenie' | 'Lokalny Przedsiębiorca';
  village: string;
  category: 'ogolne' | 'drogi_infrastruktura' | 'ekologia' | 'inicjatywy' | 'ogloszenia_drobne' | 'pomoc_sasiedzka';
  createdAt: string;
  likes: number;
  tags: string[];
  replies: ForumReply[];
  isPinned?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: 'przyroda' | 'zabytki' | 'wydarzenia' | 'inwestycje';
  imageUrl: string;
  author: string;
  date: string;
  description: string;
  likes: number;
}

export interface SurveyOption {
  id: string;
  label: string;
  votes: number;
}

export interface Survey {
  id: string;
  question: string;
  description: string;
  endsAt: string;
  category: string;
  options: SurveyOption[];
  totalVotes: number;
  userVotedOptionId?: string;
  isActive: boolean;
}

export interface ReviewCriteria {
  id: string;
  name: string;
  score: number; // e.g. 4.6
  reviewsCount: number;
}

export interface CitizenReview {
  id: string;
  author: string;
  village: string;
  rating: number;
  criteriaRatings?: Record<string, number>;
  comment: string;
  date: string;
  department: string;
  officialReply?: {
    date: string;
    author: string;
    text: string;
  };
  helpfulCount: number;
}

export interface WasteCollectionSchedule {
  village: string;
  dates: {
    date: string;
    types: ('zmieszane' | 'plastik' | 'papier' | 'szklo' | 'bio' | 'wielkogabarytowe')[];
  }[];
}

export interface ResidentAlert {
  id: string;
  title: string;
  category: 'drogi' | 'oswietlenie' | 'odpady' | 'zielen' | 'bezpieczenstwo' | 'inne';
  village: string;
  locationDetails: string;
  description: string;
  status: 'zgloszone' | 'w_weryfikacji' | 'w_realizacji' | 'rozwiazane';
  date: string;
  photoUrl?: string;
  upvotes: number;
  isUpvoted?: boolean;
}

export interface SoltysContact {
  village: string;
  name: string;
  phone: string;
  email: string;
  officeHours: string;
}
