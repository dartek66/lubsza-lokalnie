import React, { useState } from 'react';
import { 
  Heart, 
  Dog, 
  Cat, 
  AlertCircle, 
  Search, 
  PlusCircle, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Camera,
  Image as ImageIcon,
  Upload,
  Eye,
  MessageCircle,
  ThumbsUp,
  X,
  User,
  SlidersHorizontal
} from 'lucide-react';

export interface PetAdoptionItem {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'horse' | 'other';
  breed: string;
  age: string;
  gender: 'Samiec' | 'Samica';
  village: string;
  status: 'to_adopt' | 'lost' | 'found';
  image: string;
  description: string;
  vaccinated: boolean;
  chipped: boolean;
  contactPhone: string;
  dateAdded: string;
}

export interface PetGalleryItem {
  id: string;
  petName: string;
  species: 'dog' | 'cat' | 'horse' | 'other';
  breed: string;
  ownerName: string;
  village: string;
  image: string;
  caption: string;
  likes: number;
  dateAdded: string;
}

const INITIAL_PETS: PetAdoptionItem[] = [
  {
    id: 'pet-1',
    name: 'Baster',
    species: 'dog',
    breed: 'Mieszaniec w typie labradora',
    age: '2 lata',
    gender: 'Samiec',
    village: 'Lubsza',
    status: 'to_adopt',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    description: 'Niezwykle łagodny, radosny i karny pies. Uwielbia długie spacery po lasach lubszańskich i zabawy piłką. Świetnie dogaduje się z dziećmi oraz innymi psami.',
    vaccinated: true,
    chipped: true,
    contactPhone: '+48 600 123 456',
    dateAdded: '2026-08-20'
  },
  {
    id: 'pet-2',
    name: 'Mila',
    species: 'cat',
    breed: 'Europejski (tricolor / szylkret)',
    age: '1 rok',
    gender: 'Samica',
    village: 'Szydłowice',
    status: 'to_adopt',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    description: 'Czysta, wysterylizowana i bardzo mrucząca kotka. Korzysta z kuwety, wychowana w domu z ogrodem. Szuka kochających opiekunów.',
    vaccinated: true,
    chipped: false,
    contactPhone: '+48 602 987 654',
    dateAdded: '2026-08-24'
  },
  {
    id: 'pet-3',
    name: 'UWAGA: Zaginął pies Reksio',
    species: 'dog',
    breed: 'Owczarek niemiecki (krótkowłosy)',
    age: '4 lata',
    gender: 'Samiec',
    village: 'Rogalice / okolice leśniczówki',
    status: 'lost',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5455?auto=format&fit=crop&w=800&q=80',
    description: 'Wczoraj podczas spaceru na skraju lasu w Rogalicach spłoszył się zwierzyną i odbiegł w głąb boru. Ma czerwoną obrożę z adresatką i chip. Bardzo prosimy o kontakt!',
    vaccinated: true,
    chipped: true,
    contactPhone: '+48 691 333 444',
    dateAdded: '2026-08-26'
  },
  {
    id: 'pet-4',
    name: 'Znaleziono młodego rudego kotka',
    species: 'cat',
    breed: 'Europejski rudy',
    age: 'ok. 4-5 miesięcy',
    gender: 'Samiec',
    village: 'Czepielowice',
    status: 'found',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80',
    description: 'Przygarnięty tymczasowo z okolic przystanku PKS w Czepielowicach. Bardzo oswojony i zadbany, prawdopodobnie komuś uciekł.',
    vaccinated: true,
    chipped: false,
    contactPhone: '+48 77 411 00 00',
    dateAdded: '2026-08-25'
  }
];

const INITIAL_GALLERY: PetGalleryItem[] = [
  {
    id: 'gal-1',
    petName: 'Luna & Max',
    species: 'dog',
    breed: 'Golden Retriever i Kundelek',
    ownerName: 'Marta i Tomasz',
    village: 'Lubsza (ul. Leśna)',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    caption: 'Nasz nierozłączny duet podczas porannej wyprawy na szlak Rezerwatu Lubsza. Las to ich drugi dom!',
    likes: 42,
    dateAdded: '2026-08-26'
  },
  {
    id: 'gal-2',
    petName: 'Kasztan i Hektor',
    species: 'horse',
    breed: 'Konie szlachetnej półkrwi',
    ownerName: 'Stajnia Rogalice',
    village: 'Rogalice',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80',
    caption: 'Nasze konie po treningu na łąkach nad Smortawą. Piękne, dumne i uwielbiają głaskanie od najmłodszych gości.',
    likes: 58,
    dateAdded: '2026-08-25'
  },
  {
    id: 'gal-3',
    petName: 'Mruczek',
    species: 'cat',
    breed: 'Kot europejski pręgowany',
    ownerName: 'Pani Zofia',
    village: 'Czepielowice',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    caption: 'Nadzorca ogrodu i łowca promieni słonecznych na ganku. Żadna mysz na podwórku nie ma szans.',
    likes: 31,
    dateAdded: '2026-08-24'
  },
  {
    id: 'gal-4',
    petName: 'Barry',
    species: 'dog',
    breed: 'Border Collie',
    ownerName: 'Kamil',
    village: 'Szydłowice',
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=800&q=80',
    caption: 'Mistrz łapania frisbee i wierny kompan wycieczek rowerowych po gminnych ścieżkach.',
    likes: 27,
    dateAdded: '2026-08-23'
  },
  {
    id: 'gal-5',
    petName: 'Bona i Karmel',
    species: 'cat',
    breed: 'Koty brytyjskie',
    ownerName: 'Karolina',
    village: 'Dobrzyń',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
    caption: 'Dwa leniuchy na parapecie obserwujące ptaki w ogrodzie. Pozdrawiamy wszystkich miłośników kotów w gminie!',
    likes: 39,
    dateAdded: '2026-08-22'
  },
  {
    id: 'gal-6',
    petName: 'Iskra',
    species: 'horse',
    breed: 'Klacz małopolska',
    ownerName: 'Ośrodek Rekreacyjny Lubsza',
    village: 'Lubsza',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    caption: 'Złote popołudnie na padoku. Iskra bierze udział w hipoterapii i zajęciach jeździeckich dla dzieci.',
    likes: 46,
    dateAdded: '2026-08-21'
  }
];

const LOCAL_ANIMAL_SERVICES = [
  {
    category: 'Stadnina & Jazda Konna',
    name: 'Stajnia i Ośrodek Jeździecki w Gminie Lubsza',
    location: 'Lubsza / Rogalice',
    phone: '+48 604 555 777',
    desc: 'Nauka jazdy konnej dla dzieci i dorosłych, pensjonat dla koni, hipoterapia, rajdy konne po duktach Stobrawskiego Parku Krajobrazowego.',
    badge: 'Stadnina & Rekreacja'
  },
  {
    category: 'Opieka Weterynaryjna',
    name: 'Gabinet Weterynaryjny & Wizyty Domowe',
    location: 'Lubsza / Brzeg (obsługa terenu gminy)',
    phone: '+48 77 416 20 00',
    desc: 'Szczepienia przeciw wściekliźnie, czipowanie psów i kotów, odrobaczanie, zabiegi sterylizacji, pomoc w nagłych wypadkach.',
    badge: 'Weterynarz'
  },
  {
    category: 'Gminny Program Ochrony Zwierząt',
    name: 'Program Kastracji & Czipowania Urzędu Gminy Lubsza',
    location: 'Urząd Gminy Lubsza, Referat Ochrony Środowiska',
    phone: '+48 77 411 16 31',
    desc: 'Gmina Lubsza corocznie dofinansowuje zabiegi sterylizacji/kastracji psów i kotów właścicielskich oraz bezpłatne czipowanie zwierząt.',
    badge: 'Program Gminny'
  },
  {
    category: 'Leśne Pogotowie & Schronisko',
    name: 'Pomoc Dzikim Zwierzętom i Schronisko dla Bezdomnych Zwierząt',
    location: 'Rejon Brzeg / Opole (współpraca z UG Lubsza)',
    phone: '+48 77 416 88 88',
    desc: 'Zgłaszanie bezdomnych, błąkających się psów na terenie gminy oraz rannych dzikich zwierząt leśnych.',
    badge: 'Interwencje 24/7'
  }
];

interface AnimalsSectionProps {
  isHighContrast?: boolean;
}

export const AnimalsSection: React.FC<AnimalsSectionProps> = ({ isHighContrast }) => {
  // Main view toggle: 'board' (ogłoszenia/adopcje/zaginione) or 'gallery' (zdjęcia pupilów)
  const [mainView, setMainView] = useState<'board' | 'gallery'>('gallery');

  // Pet Notices State
  const [pets, setPets] = useState<PetAdoptionItem[]>(INITIAL_PETS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'to_adopt' | 'lost' | 'found'>('all');
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'dog' | 'cat' | 'horse'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Pet Gallery State
  const [gallery, setGallery] = useState<PetGalleryItem[]>(INITIAL_GALLERY);
  const [gallerySpeciesFilter, setGallerySpeciesFilter] = useState<'all' | 'dog' | 'cat' | 'horse'>('all');
  const [gallerySearch, setGallerySearch] = useState('');
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PetGalleryItem | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  // Notice Form State
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog' as 'dog' | 'cat' | 'horse' | 'other',
    breed: '',
    age: '',
    gender: 'Samiec' as 'Samiec' | 'Samica',
    village: 'Lubsza',
    status: 'to_adopt' as 'to_adopt' | 'lost' | 'found',
    description: '',
    contactPhone: '',
    image: '',
    vaccinated: true,
    chipped: false
  });

  // Gallery Photo Form State
  const [photoFormData, setPhotoFormData] = useState({
    petName: '',
    species: 'dog' as 'dog' | 'cat' | 'horse' | 'other',
    breed: '',
    ownerName: '',
    village: 'Lubsza',
    image: '',
    caption: ''
  });
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Handle file input for Gallery Photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
        setPhotoFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contactPhone.trim()) return;

    const newPet: PetAdoptionItem = {
      id: `pet-${Date.now()}`,
      name: formData.name,
      species: formData.species,
      breed: formData.breed || 'Mieszaniec / Rasa lokalna',
      age: formData.age || 'Nieokreślony',
      gender: formData.gender,
      village: formData.village,
      status: formData.status,
      image: formData.image.trim() || (formData.species === 'cat' 
        ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
        : formData.species === 'horse'
        ? 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'),
      description: formData.description,
      vaccinated: formData.vaccinated,
      chipped: formData.chipped,
      contactPhone: formData.contactPhone,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setPets([newPet, ...pets]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      species: 'dog',
      breed: '',
      age: '',
      gender: 'Samiec',
      village: 'Lubsza',
      status: 'to_adopt',
      description: '',
      contactPhone: '',
      image: '',
      vaccinated: true,
      chipped: false
    });
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFormData.petName.trim()) return;

    const fallbackImage = photoFormData.species === 'cat' 
      ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
      : photoFormData.species === 'horse'
      ? 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80';

    const newGalleryItem: PetGalleryItem = {
      id: `gal-${Date.now()}`,
      petName: photoFormData.petName,
      species: photoFormData.species,
      breed: photoFormData.breed || 'Pupil domowy',
      ownerName: photoFormData.ownerName || 'Mieszkaniec Gminy',
      village: photoFormData.village || 'Gmina Lubsza',
      image: photoFormData.image.trim() || fallbackImage,
      caption: photoFormData.caption || 'Nasz wspaniały pupil z Gminy Lubsza!',
      likes: 1,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setGallery([newGalleryItem, ...gallery]);
    setIsAddPhotoModalOpen(false);
    setMainView('gallery');
    setFilePreview(null);
    setPhotoFormData({
      petName: '',
      species: 'dog',
      breed: '',
      ownerName: '',
      village: 'Lubsza',
      image: '',
      caption: ''
    });
  };

  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isCurrentlyLiked = !!likedPhotos[id];
    setLikedPhotos(prev => ({ ...prev, [id]: !isCurrentlyLiked }));
    setGallery(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: isCurrentlyLiked ? item.likes - 1 : item.likes + 1
        };
      }
      return item;
    }));
  };

  const filteredPets = pets.filter(p => {
    const matchesStatus = activeFilter === 'all' || p.status === activeFilter;
    const matchesSpecies = speciesFilter === 'all' || p.species === speciesFilter;
    const matchesSearch = searchTerm.trim() === '' || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSpecies && matchesSearch;
  });

  const filteredGallery = gallery.filter(item => {
    const matchesSpecies = gallerySpeciesFilter === 'all' || item.species === gallerySpeciesFilter;
    const matchesSearch = gallerySearch.trim() === '' ||
      item.petName.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      item.village.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      item.breed.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      item.caption.toLowerCase().includes(gallerySearch.toLowerCase());
    return matchesSpecies && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Banner - Zwierzęta w Gminie Lubsza */}
      <div className={`relative rounded-3xl overflow-hidden shadow-xl border ${
        isHighContrast 
          ? 'bg-black border-yellow-400 text-yellow-300' 
          : 'bg-amber-950 text-white border-amber-800'
      }`}>
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80" 
            alt="Zwierzęta, psy, koty i konie w Gminie Lubsza" 
            className="w-full h-full object-cover object-center opacity-35 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-950/85 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-xs">
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
            Kącik Zwierzaka • Psy, Koty, Konie, Galeria i Bezpieczeństwo
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Zwierzęta w Naszej Gminie
          </h1>
          
          <p className="text-amber-100 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
            W niemal każdym domu w gminie mieszka wierny czworonóg! Oglądaj i dodawaj zdjęcia swoich pupili do wspólnej galerii, sprawdzaj zaginione i znalezione zwierzaki, bezpłatne adopcje oraz ofertę lokalnej stadniny koni.
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddPhotoModalOpen(true)}
              id="hero-add-pet-photo-btn"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              📸 Dodaj zdjęcie swojego pupila
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              id="hero-add-pet-notice-btn"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/25 backdrop-blur-xs shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              Dodaj ogłoszenie (zgubiono / znaleziono / do adopcji)
            </button>
          </div>
        </div>
      </div>

      {/* Main Mode Navigation (Galeria Pupili vs Tablica Ogłoszeń & Usługi) */}
      <div className="flex items-center justify-center sm:justify-start gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => setMainView('gallery')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
            mainView === 'gallery'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>📸 Galeria Pupili Mieszkańców</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-amber-950/40 text-amber-200 font-extrabold">
            {gallery.length}
          </span>
        </button>

        <button
          onClick={() => setMainView('board')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
            mainView === 'board'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Tablica Ogłoszeń & Adopcje</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-amber-950/40 text-amber-200 font-extrabold">
            {pets.length}
          </span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* VIEW: GALERIA ZDJĘĆ PUPILI                               */}
      {/* ======================================================== */}
      {mainView === 'gallery' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Header & Filters for Gallery */}
          <div className={`p-5 rounded-2xl border shadow-xs space-y-4 ${
            isHighContrast 
              ? 'bg-black border-yellow-400 text-yellow-300' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-600" />
                  Galeria Pupili Gminy Lubsza
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Zobacz zdjęcia psów, kotów i koni z naszych sołectw. Kliknij na zdjęcie, aby powiększyć i zostawić serduszko!
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsAddPhotoModalOpen(true)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer transition-colors shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  Dodaj zdjęcie pupila
                </button>
              </div>
            </div>

            {/* Gallery Filters & Search */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Species Chips */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gatunek:</span>
                <button
                  onClick={() => setGallerySpeciesFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    gallerySpeciesFilter === 'all'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Wszystkie ({gallery.length})
                </button>
                <button
                  onClick={() => setGallerySpeciesFilter('dog')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    gallerySpeciesFilter === 'dog'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Dog className="w-3.5 h-3.5" />
                  Psy
                </button>
                <button
                  onClick={() => setGallerySpeciesFilter('cat')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    gallerySpeciesFilter === 'cat'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Cat className="w-3.5 h-3.5" />
                  Koty
                </button>
                <button
                  onClick={() => setGallerySpeciesFilter('horse')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    gallerySpeciesFilter === 'horse'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  🐎 Konie
                </button>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  placeholder="Szukaj w galerii..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Gallery Photo Grid */}
          {filteredGallery.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <ImageIcon className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Brak zdjęć w tej kategorii</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Bądź pierwszy i dodaj zdjęcie swojego czworonoga z Gminy Lubsza!
              </p>
              <button
                onClick={() => setIsAddPhotoModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Dodaj zdjęcie
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map(item => {
                const isLiked = !!likedPhotos[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPhoto(item)}
                    className={`group cursor-pointer flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      isHighContrast
                        ? 'bg-black border-yellow-400 text-yellow-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {/* Photo Container */}
                    <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <img 
                        src={item.image} 
                        alt={item.petName} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* Species Tag */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-950/70 text-amber-300 border border-amber-400/30 backdrop-blur-xs shadow-md">
                        {item.species === 'dog' && <><Dog className="w-3.5 h-3.5" /> Pies</>}
                        {item.species === 'cat' && <><Cat className="w-3.5 h-3.5" /> Kot</>}
                        {item.species === 'horse' && <>🐎 Koń</>}
                        {item.species === 'other' && <>🐾 Pupil</>}
                      </div>

                      {/* Like Heart Button */}
                      <button
                        onClick={(e) => handleToggleLike(item.id, e)}
                        className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all backdrop-blur-xs cursor-pointer shadow-md ${
                          isLiked 
                            ? 'bg-red-600 text-white scale-105' 
                            : 'bg-slate-950/70 text-white hover:bg-red-600 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                        <span>{item.likes}</span>
                      </button>

                      {/* Village Location Badge */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-semibold bg-slate-950/70 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.village}</span>
                      </div>

                      {/* Quick view indicator */}
                      <div className="absolute bottom-3 right-3 text-white/80 group-hover:text-white transition-colors bg-slate-950/70 p-1.5 rounded-lg backdrop-blur-xs">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-amber-700 dark:text-amber-400">{item.breed}</span>
                          <span>{item.dateAdded}</span>
                        </div>

                        <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                          {item.petName}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic line-clamp-2">
                          "{item.caption}"
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 truncate">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.ownerName}</span>
                        </span>
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                          Powiększ zdjęcie →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW: TABLICA OGŁOSZEŃ (ZAGINIONE / ZNALEZIONE / ADOPCJE) */}
      {/* ======================================================== */}
      {mainView === 'board' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Helpful Local Services for Pet Owners */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Usługi dla zwierząt & Stadnina w Gminie Lubsza
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {LOCAL_ANIMAL_SERVICES.map((srv, idx) => (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between space-y-3 ${
                    isHighContrast
                      ? 'bg-black border-yellow-400 text-yellow-300'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                      {srv.badge}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{srv.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <a href={`tel:${srv.phone}`} className="hover:underline">{srv.phone}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className={`p-5 rounded-2xl border shadow-xs space-y-4 ${
            isHighContrast 
              ? 'bg-black border-yellow-400 text-yellow-300' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Status Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Wszystkie ogłoszenia ({pets.length})
                </button>
                <button
                  onClick={() => setActiveFilter('lost')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeFilter === 'lost'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 text-red-300" />
                  Zaginione (Pilne!)
                </button>
                <button
                  onClick={() => setActiveFilter('found')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeFilter === 'found'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  Znalezione
                </button>
                <button
                  onClick={() => setActiveFilter('to_adopt')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeFilter === 'to_adopt'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Heart className="w-4 h-4 text-amber-300" />
                  Do Adopcji
                </button>
              </div>

              {/* Search box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Szukaj psa, kota, wsi..."
                  className={`w-full pl-9.5 pr-4 py-2 rounded-xl text-xs sm:text-sm border transition-colors outline-none ${
                    isHighContrast
                      ? 'bg-black border-yellow-400 text-yellow-300 placeholder-yellow-600'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-amber-500'
                  }`}
                />
              </div>
            </div>

            {/* Species selector chips */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Gatunek:</span>
              <button
                onClick={() => setSpeciesFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  speciesFilter === 'all' 
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Wszystkie
              </button>
              <button
                onClick={() => setSpeciesFilter('dog')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  speciesFilter === 'dog' 
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Dog className="w-3.5 h-3.5" />
                Psy
              </button>
              <button
                onClick={() => setSpeciesFilter('cat')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  speciesFilter === 'cat' 
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Cat className="w-3.5 h-3.5" />
                Koty
              </button>
            </div>
          </div>

          {/* Pet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map(pet => {
              const isLost = pet.status === 'lost';
              const isFound = pet.status === 'found';
              const isAdopt = pet.status === 'to_adopt';

              return (
                <div
                  key={pet.id}
                  className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    isLost
                      ? 'border-red-400 dark:border-red-800 bg-red-50/30 dark:bg-red-950/20'
                      : isHighContrast
                        ? 'bg-black border-yellow-400 text-yellow-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Pet Photo */}
                  <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img 
                      src={pet.image} 
                      alt={pet.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold shadow-md backdrop-blur-xs">
                      {isLost && (
                        <span className="bg-red-600 text-white flex items-center gap-1 px-2.5 py-0.5 rounded-full animate-pulse">
                          <AlertCircle className="w-3.5 h-3.5" /> ZAGINĄŁ
                        </span>
                      )}
                      {isFound && (
                        <span className="bg-emerald-600 text-white flex items-center gap-1 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> ZNALEZIONY
                        </span>
                      )}
                      {isAdopt && (
                        <span className="bg-amber-600 text-white flex items-center gap-1 px-2.5 py-0.5 rounded-full">
                          <Heart className="w-3.5 h-3.5 fill-white" /> DO ADOPCJI
                        </span>
                      )}
                    </div>

                    {/* Location Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-semibold bg-slate-950/70 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{pet.village}</span>
                    </div>

                    {/* Date */}
                    <div className="absolute bottom-3 right-3 text-[11px] text-slate-300 bg-slate-950/70 px-2 py-1 rounded-lg backdrop-blur-xs">
                      {pet.dateAdded}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>{pet.breed}</span>
                        <span>{pet.gender} • {pet.age}</span>
                      </div>

                      <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                        {pet.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {pet.description}
                      </p>
                    </div>

                    {/* Health details */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px]">
                      {pet.vaccinated && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md font-medium">
                          <ShieldCheck className="w-3 h-3" /> Szczepiony
                        </span>
                      )}
                      {pet.chipped && (
                        <span className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Posiada Chip
                        </span>
                      )}
                    </div>

                    {/* Phone CTA */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                      <a
                        href={`tel:${pet.contactPhone}`}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                          isLost 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-amber-600 hover:bg-amber-700 text-white'
                        }`}
                      >
                        <Phone className="w-4 h-4" />
                        <span>Zadzwoń: {pet.contactPhone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DODAJ ZDJĘCIE PUPILA DO GALERII                   */}
      {/* ======================================================== */}
      {isAddPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border ${
              isHighContrast 
                ? 'bg-black border-yellow-400 text-yellow-300' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold font-serif">Dodaj zdjęcie swojego pupila</h3>
              </div>
              <button
                onClick={() => { setIsAddPhotoModalOpen(false); setFilePreview(null); }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4 pt-4 text-xs sm:text-sm">
              
              {/* Photo Upload or URL */}
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Zdjęcie pupila (wybierz plik z dysku/telefonu):
                </label>
                <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-dashed rounded-2xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                  <div className="space-y-2 text-center">
                    {filePreview ? (
                      <div className="relative inline-block">
                        <img 
                          src={filePreview} 
                          alt="Podgląd" 
                          className="h-36 w-auto max-w-full rounded-xl object-cover shadow-md mx-auto"
                        />
                        <button
                          type="button"
                          onClick={() => { setFilePreview(null); setPhotoFormData(p => ({ ...p, image: '' })); }}
                          className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full shadow cursor-pointer hover:bg-red-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-8 w-8 text-amber-600" />
                        <div className="flex text-xs text-slate-600 dark:text-slate-400 justify-center">
                          <label className="relative cursor-pointer font-bold text-amber-600 hover:text-amber-500 underline">
                            <span>Wybierz zdjęcie z urządzenia</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleFileChange} 
                              className="sr-only" 
                            />
                          </label>
                        </div>
                        <p className="text-[11px] text-slate-400">JPG, PNG, WEBP (maks. 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Alternatywny link URL */}
                <div className="mt-2">
                  <label className="block text-[11px] text-slate-500 mb-0.5">Lub wklej bezpośredni adres URL zdjęcia (opcjonalnie):</label>
                  <input
                    type="url"
                    value={photoFormData.image}
                    onChange={(e) => {
                      setPhotoFormData({ ...photoFormData, image: e.target.value });
                      if (e.target.value.startsWith('http')) setFilePreview(e.target.value);
                    }}
                    placeholder="https://..."
                    className="w-full p-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Imię zwierzaka *</label>
                  <input
                    type="text"
                    required
                    value={photoFormData.petName}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, petName: e.target.value })}
                    placeholder="np. Luna, Karmel, Kasztan..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Gatunek</label>
                  <select
                    value={photoFormData.species}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, species: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                  >
                    <option value="dog">Pies 🐕</option>
                    <option value="cat">Kot 🐈</option>
                    <option value="horse">Koń 🐎</option>
                    <option value="other">Inny pupil 🐾</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Rasa / Typ</label>
                  <input
                    type="text"
                    value={photoFormData.breed}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, breed: e.target.value })}
                    placeholder="np. Mieszaniec, Jamnik, Szlachetny..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Miejscowość (Sołectwo)</label>
                  <input
                    type="text"
                    value={photoFormData.village}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, village: e.target.value })}
                    placeholder="np. Lubsza, Dobrzyń..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Imię właściciela (do podpisu)</label>
                <input
                  type="text"
                  value={photoFormData.ownerName}
                  onChange={(e) => setPhotoFormData({ ...photoFormData, ownerName: e.target.value })}
                  placeholder="np. Ania z Lubszy lub Rodzina Kowalskich"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Krótki opis / anegdota o pupilu</label>
                <textarea
                  rows={2}
                  value={photoFormData.caption}
                  onChange={(e) => setPhotoFormData({ ...photoFormData, caption: e.target.value })}
                  placeholder="Napisz kilka miłych słów o swoim zwierzaku, co uwielbia robić na spacerach..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddPhotoModalOpen(false); setFilePreview(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  Dodaj zdjęcie do galerii
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* LIGHTBOX: POWIĘKSZENIE ZDJĘCIA Z GALERII                  */}
      {/* ======================================================== */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 cursor-default"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-950/70 hover:bg-slate-950 text-white rounded-full backdrop-blur-xs transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Large Image */}
              <div className="md:col-span-2 bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
                <img 
                  src={selectedPhoto.image} 
                  alt={selectedPhoto.petName}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details Side Panel */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-4 text-white bg-slate-900">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      {selectedPhoto.species === 'dog' && '🐕 Pies'}
                      {selectedPhoto.species === 'cat' && '🐈 Kot'}
                      {selectedPhoto.species === 'horse' && '🐎 Koń'}
                      {selectedPhoto.species === 'other' && '🐾 Pupil'}
                    </span>
                    <span className="text-xs text-slate-400">{selectedPhoto.breed}</span>
                  </div>

                  <h2 className="text-2xl font-bold font-serif text-amber-400">
                    {selectedPhoto.petName}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{selectedPhoto.village}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Opiekun: {selectedPhoto.ownerName}</span>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed italic pt-2 border-t border-slate-800">
                    "{selectedPhoto.caption}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Dodano: {selectedPhoto.dateAdded}</span>
                  <button
                    onClick={() => handleToggleLike(selectedPhoto.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      likedPhotos[selectedPhoto.id] 
                        ? 'bg-red-600 text-white' 
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPhotos[selectedPhoto.id] ? 'fill-white' : ''}`} />
                    <span>{selectedPhoto.likes} {selectedPhoto.likes === 1 ? 'polubienie' : 'polubień'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DODAJ OGŁOSZENIE (ZGUBIONO / ZNALEZIONO / ADOPCJA) */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border ${
              isHighContrast 
                ? 'bg-black border-yellow-400 text-yellow-300' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-600 fill-amber-600" />
                <h3 className="text-lg font-bold font-serif">Dodaj ogłoszenie o zwierzaku</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPetSubmit} className="space-y-4 pt-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Rodzaj ogłoszenia:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'lost' })}
                    className={`py-2 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                      formData.status === 'lost' ? 'bg-red-600 text-white border-red-600' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Zaginął pies/kot
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'found' })}
                    className={`py-2 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                      formData.status === 'found' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Znaleziono
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'to_adopt' })}
                    className={`py-2 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                      formData.status === 'to_adopt' ? 'bg-amber-600 text-white border-amber-600' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Do adopcji
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Imię / Tytuł *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="np. Baster lub Kotek rudy"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Gatunek</label>
                  <select
                    value={formData.species}
                    onChange={(e) => setFormData({ ...formData, species: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                  >
                    <option value="dog">Pies</option>
                    <option value="cat">Kot</option>
                    <option value="horse">Koń</option>
                    <option value="other">Inne zwierzę</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Miejscowość (Sołectwo)</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="np. Lubsza, Szydłowice..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Telefon kontaktowy *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="np. +48 600 000 000"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Opis (szczegóły, znaki szczególne, zachowanie)</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Napisz kilka słów o zwierzaku, gdzie był widziany lub jakie ma zwyczaje..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.vaccinated}
                    onChange={(e) => setFormData({ ...formData, vaccinated: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Szczepiony</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.chipped}
                    onChange={(e) => setFormData({ ...formData, chipped: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Posiada chip</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  Opublikuj ogłoszenie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

