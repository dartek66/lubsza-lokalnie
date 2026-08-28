import React, { useState, useEffect } from 'react';
import { Article, CategoryType } from '../types';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Eye, 
  Database, 
  Download, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  FileText, 
  Copy, 
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Tag,
  Calendar,
  User,
  Clock,
  BookOpen,
  HelpCircle,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Minus,
  Info,
  Columns,
  Maximize2,
  FolderGit2,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  Shield,
  LogOut,
  Key,
  EyeOff,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { HerbLubsza } from '../data/crest';
import { VILLAGES } from '../data/mockData';
import { generateSlug, exportArticlesToSQL, getStoredD1Config, saveStoredD1Config, D1_SCHEMA_SQL, D1_SCHEMA_SQL_CLEAN } from '../data/d1Service';
import { MarkdownRenderer } from './MarkdownRenderer';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSaveArticles: (newArticles: Article[]) => void;
  onSelectArticlePreview?: (article: Article) => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSaveArticles,
  onSelectArticlePreview,
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'articles' | 'd1_database' | 'export_import' | 'settings'>('editor');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Authentication & Security state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('gmina_lubsza_cms_auth') === 'true' ||
           localStorage.getItem('gmina_lubsza_cms_auth_persistent') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Change Password state in Settings Tab
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [pwdChangeFeedback, setPwdChangeFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  const getMasterPassword = (): string => {
    return localStorage.getItem('gmina_lubsza_cms_master_password') || 'lubsza2026!@#dart';
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const master = getMasterPassword();
    if (passwordInput.trim() === master.trim()) {
      setIsAuthenticated(true);
      setAuthError(null);
      if (rememberMe) {
        localStorage.setItem('gmina_lubsza_cms_auth_persistent', 'true');
      } else {
        sessionStorage.setItem('gmina_lubsza_cms_auth', 'true');
      }
    } else {
      setAuthError('Nieprawidłowe hasło dostępowe. Domyślne hasło startowe: lubsza2026!@#dart');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('gmina_lubsza_cms_auth');
    localStorage.removeItem('gmina_lubsza_cms_auth_persistent');
    setPasswordInput('');
    setAuthError(null);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const master = getMasterPassword();
    if (currentPasswordInput.trim() !== master.trim()) {
      setPwdChangeFeedback({ text: 'Obecne hasło jest niepoprawne!', isError: true });
      return;
    }
    if (!newPasswordInput.trim() || newPasswordInput.trim().length < 4) {
      setPwdChangeFeedback({ text: 'Nowe hasło musi mieć co najmniej 4 znaki.', isError: true });
      return;
    }
    if (newPasswordInput !== confirmNewPasswordInput) {
      setPwdChangeFeedback({ text: 'Nowe hasła nie są identyczne!', isError: true });
      return;
    }

    localStorage.setItem('gmina_lubsza_cms_master_password', newPasswordInput.trim());
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmNewPasswordInput('');
    setPwdChangeFeedback({ text: 'Hasło redakcyjne zostało pomyślnie zmienione!', isError: false });
    setTimeout(() => setPwdChangeFeedback(null), 4000);
  };

  const handleResetPasswordToDefault = () => {
    if (window.confirm('Czy na pewno chcesz przywrócić domyślne hasło startowe: lubsza2026!@#dart?')) {
      localStorage.removeItem('gmina_lubsza_cms_master_password');
      setPwdChangeFeedback({ text: 'Przywrócono domyślne hasło: lubsza2026!@#dart', isError: false });
      setTimeout(() => setPwdChangeFeedback(null), 4000);
    }
  };

  // Form Fields (Keystatic model)
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CategoryType>('aktualnosci');
  const [author, setAuthor] = useState('Redakcja Głos Lubszy');
  const [authorRole, setAuthorRole] = useState('Obywatelska Redakcja');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80');
  const [tags, setTags] = useState('Lubsza, Obywatele');
  const [readTime, setReadTime] = useState(3);
  const [isFeatured, setIsFeatured] = useState(false);

  // Statuses & feedback
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [editorLayout, setEditorLayout] = useState<'editor' | 'split' | 'preview'>('editor');

  // Image Inserter & GitHub Repository modal state
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imgSourceType, setImgSourceType] = useState<'github' | 'url' | 'stock'>('github');
  const [githubRepoOwner, setGithubRepoOwner] = useState('dartek66');
  const [githubRepoName, setGithubRepoName] = useState('lubsza-lokalnie');
  const [githubFolder, setGithubFolder] = useState('obrazy');
  const [githubBranch, setGithubBranch] = useState('main');
  const [githubFilename, setGithubFilename] = useState('');
  const [customImgUrl, setCustomImgUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageInsertMode, setImageInsertMode] = useState<'content' | 'cover' | 'gallery'>('content');

  // D1 Settings
  const [d1Endpoint, setD1Endpoint] = useState('');
  const [d1Token, setD1Token] = useState('');

  useEffect(() => {
    const cfg = getStoredD1Config();
    if (cfg.endpoint) setD1Endpoint(cfg.endpoint);
    if (cfg.apiToken) setD1Token(cfg.apiToken);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'aktualnosci', label: 'Wiadomości bieżące' },
    { id: 'kontrola', label: 'Kontrola & Urząd' },
    { id: 'okiem_mieszkanca', label: 'Okiem Mieszkańca / Opinia' },
    { id: 'inwestycje', label: 'Inwestycje & Drogi' },
    { id: 'spolecznosc', label: 'Społeczność & Sołectwa' },
    { id: 'kultura', label: 'Kultura & Historia' },
    { id: 'sport', label: 'Sport i Rekreacja' },
    { id: 'urzad', label: 'Decyzje i Sesje Rady' },
  ];

  const stockPhotos = [
    { name: 'Lasy Lubszańskie (Zieleń)', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Drogi i Inwestycje', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Urząd / Dokumenty', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Zwierzęta i Przyroda', url: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Spotkanie Mieszkańców', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Kościół i Zabytki', url: 'https://images.unsplash.com/photo-1548625361-16eb18e69ba3?auto=format&fit=crop&w=1200&q=80' },
  ];

  const safeArticles = Array.isArray(articles) ? articles : [];

  const handleApplyTemplate = (type: 'invest' | 'citizens' | 'alert') => {
    if (type === 'invest') {
      setTitle('Planowana przebudowa drogi gminnej w sołectwie – ruszyły konsultacje');
      setSlug('przebudowa-drogi-gminnej-konsultacje');
      setCategory('inwestycje');
      setExcerpt('Urząd Gminy ogłosił wstępny harmonogram prac remontowych. Mieszkańcy mogą zgłaszać uwagi do projektu do końca miesiąca.');
      setContent(`### Informacje o inwestycji\n\nRozpoczął się proces planowania kluczowej inwestycji drogowej na terenie naszej gminy. Projekt obejmuje wymianę nawierzchni, budowę odwodnienia oraz montaż nowoczesnego oświetlenia LED.\n\n### Harmonogram prac:\n- **Konsultacje społeczne:** do 15 września\n- **Przetarg wykonawczy:** IV kwartał br.\n- **Rozpoczęcie robót:** wiosna przyszłego roku\n\n> Zachęcamy wszystkich zainteresowanych mieszkańców do zapoznania się z dokumentacją w Urzędzie Gminy lub zgłaszania uwag w komentarzach.`);
      setCoverImage(stockPhotos[1].url);
      setTags('Inwestycje, Drogi, Bezpieczeństwo');
    } else if (type === 'citizens') {
      setTitle('Głos z Sołectwa: Inicjatywa sąsiedzka ożywia lokalną świetlicę');
      setSlug('inicjatywa-sasiedzka-swietlica-wiejska');
      setCategory('spolecznosc');
      setExcerpt('Dzięki zaangażowaniu grupy mieszkańców udało się zorganizować cykliczne warsztaty i spotkania międzypokoleniowe.');
      setContent(`### Oddolna energia mieszkańców\n\nPokazujemy, jak wiele można zdziałać wspólnymi siłami bez czekania na urzędowe dotacje. Mieszkańcy własnymi rękami odnowili salę spotkań i wyposażyli kącik dla dzieci.\n\n### Co udało się zrobić?\n- Odmalowanie ścian i renowacja mebli\n- Zorganizowanie pierwszych warsztatów rękodzieła\n- Uruchomienie kącika wymiany książek\n\n*Każdy jest mile widziany na kolejnym spotkaniu w najbliższy piątek!*`);
      setCoverImage(stockPhotos[4].url);
      setTags('Społeczność, Sołectwo, Integracja');
    } else {
      setTitle('Ważny komunikat dla mieszkańców: Zmiana organizacji ruchu');
      setSlug('zmiana-organizacji-ruchu-komunikat');
      setCategory('aktualnosci');
      setExcerpt('W związku z planowanymi pracami modernizacyjnymi od poniedziałku wprowadzony zostanie ruch wahadłowy.');
      setContent(`### Szczegóły utrudnień\n\nProsimy kierowców oraz pieszych o zachowanie szczególnej ostrożności w rejonie prowadzonych prac.\n\n- **Czas trwania:** od poniedziałku do piątku w godz. 8:00 - 17:00\n- **Objazd:** zalecany objazd drogą powiatową przez sąsiednią miejscowość\n\nDziękujemy za cierpliwość i wyrozumiałość.`);
      setCoverImage(stockPhotos[1].url);
      setTags('Komunikat, Ruch, Drogi');
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!editingArticleId) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleNewArticle = () => {
    setEditingArticleId(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCategory('aktualnosci');
    setAuthor('Redakcja Głos Lubszy');
    setAuthorRole('Obywatelska Redakcja');
    setCoverImage('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80');
    setTags('Lubsza, Mieszkańcy');
    setReadTime(3);
    setIsFeatured(false);
    setActiveTab('editor');
    setEditorLayout('editor');
  };

  const handleEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setTitle(art.title);
    setSlug(art.slug || generateSlug(art.title));
    setExcerpt(art.excerpt);
    setContent(art.content);
    setCategory(art.category);
    setAuthor(art.author);
    setAuthorRole(art.authorRole);
    setCoverImage(art.coverImage);
    setTags(art.tags?.join(', ') || '');
    setReadTime(art.readTimeMinutes || 3);
    setIsFeatured(!!art.isFeatured);
    setActiveTab('editor');
    setEditorLayout('editor');
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Czy na pewno chcesz usunąć ten artykuł z portalu?')) {
      const updated = articles.filter(a => a.id !== id);
      onSaveArticles(updated);
      setSaveFeedback('Artykuł został pomyślnie usunięty.');
      setTimeout(() => setSaveFeedback(null), 3000);
      if (editingArticleId === id) {
        handleNewArticle();
      }
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      alert('Wypełnij tytuł, zajawkę (lead) oraz treść artykułu.');
      return;
    }

    const tagArray = tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    if (editingArticleId) {
      // Update existing
      const updatedArticles = articles.map(art => {
        if (art.id === editingArticleId) {
          return {
            ...art,
            title: title.trim(),
            slug: slug.trim() || generateSlug(title),
            excerpt: excerpt.trim(),
            content: content.trim(),
            category,
            author: author.trim(),
            authorRole: authorRole.trim(),
            coverImage: coverImage.trim(),
            tags: tagArray,
            readTimeMinutes: Number(readTime) || 3,
            isFeatured,
          };
        }
        return art;
      });
      onSaveArticles(updatedArticles);
      setSaveFeedback('Artykuł został zaktualizowany i zapisany!');
    } else {
      // Create new
      const newArt: Article = {
        id: `art-${Date.now()}`,
        title: title.trim(),
        slug: slug.trim() || generateSlug(title),
        excerpt: excerpt.trim(),
        content: content.trim(),
        category,
        author: author.trim() || 'Redakcja Głos Lubszy',
        authorRole: authorRole.trim() || 'Obywatelska Redakcja',
        publishDate: dateFormatted,
        coverImage: coverImage.trim() || stockPhotos[0].url,
        readTimeMinutes: Number(readTime) || 3,
        views: 1,
        likes: 0,
        comments: [],
        tags: tagArray,
        isFeatured,
      };
      onSaveArticles([newArt, ...articles]);
      setEditingArticleId(newArt.id);
      setSaveFeedback('Nowy artykuł został opublikowany na portalu!');
    }

    setTimeout(() => setSaveFeedback(null), 3500);
  };

  const handleCopySql = (type: 'all' | 'schema' | 'inserts') => {
    let sql = '';
    if (type === 'schema') {
      sql = D1_SCHEMA_SQL_CLEAN;
    } else if (type === 'inserts') {
      sql = exportArticlesToSQL(articles, false);
    } else {
      sql = exportArticlesToSQL(articles, true);
    }
    navigator.clipboard.writeText(sql);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `glos_lubszy_artykuly_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          onSaveArticles(imported);
          alert(`Pomyślnie zaimportowano ${imported.length} artykułów.`);
        } else {
          alert('Błędny format pliku JSON.');
        }
      } catch (err) {
        alert('Błąd podczas odczytu pliku JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveD1Config = () => {
    saveStoredD1Config({ endpoint: d1Endpoint, apiToken: d1Token, autoSync: true });
    alert('Zapisano konfigurację Cloudflare D1.');
  };

  // Helper toolbar for quick markdown formatting with smart text selection & auto-focus
  const insertFormatting = (
    type: 'bold' | 'italic' | 'h2' | 'h3' | 'quote' | 'bullet' | 'number' | 'info' | 'divider' | 'link'
  ) => {
    const textarea = document.getElementById('cms-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const selectedText = content.substring(start, end);

    let replacement = '';
    let cursorOffset = 0;
    let selectLength = 0;

    switch (type) {
      case 'bold':
        if (selectedText) {
          replacement = `**${selectedText}**`;
          cursorOffset = start + replacement.length;
        } else {
          replacement = `**pogrubiony tekst**`;
          cursorOffset = start + 2;
          selectLength = 16;
        }
        break;
      case 'italic':
        if (selectedText) {
          replacement = `*${selectedText}*`;
          cursorOffset = start + replacement.length;
        } else {
          replacement = `*pochylony tekst*`;
          cursorOffset = start + 1;
          selectLength = 15;
        }
        break;
      case 'h2': {
        const prefix = (start > 0 && content[start - 1] !== '\n') ? '\n\n## ' : '## ';
        const text = selectedText || 'Śródtytuł sekcji';
        replacement = `${prefix}${text}\n`;
        cursorOffset = start + prefix.length;
        selectLength = text.length;
        break;
      }
      case 'h3': {
        const prefix = (start > 0 && content[start - 1] !== '\n') ? '\n\n### ' : '### ';
        const text = selectedText || 'Podtytuł sekcji';
        replacement = `${prefix}${text}\n`;
        cursorOffset = start + prefix.length;
        selectLength = text.length;
        break;
      }
      case 'quote': {
        const prefix = (start > 0 && content[start - 1] !== '\n') ? '\n\n> ' : '> ';
        const text = selectedText || 'Cytat lub ważna wypowiedź...';
        replacement = `${prefix}${text}\n`;
        cursorOffset = start + prefix.length;
        selectLength = text.length;
        break;
      }
      case 'info': {
        const prefix = (start > 0 && content[start - 1] !== '\n') ? '\n\n> 💡 **Ważna informacja:** ' : '> 💡 **Ważna informacja:** ';
        const text = selectedText || 'Treść ważnego komunikatu dla mieszkańców...';
        replacement = `${prefix}${text}\n`;
        cursorOffset = start + prefix.length;
        selectLength = text.length;
        break;
      }
      case 'bullet': {
        const prefix = (start > 0 && content[start - 1] !== '\n') ? '\n- ' : '- ';
        const text = selectedText || 'Punkt listy';
        replacement = `${prefix}${text}\n`;
        cursorOffset = start + prefix.length;
        selectLength = text.length;
        break;
      }
      case 'number': {
        const prefix = (start > 0 && content[start - 1] !== '\n') ? '\n1. ' : '1. ';
        const text = selectedText || 'Krok pierwszy';
        replacement = `${prefix}${text}\n`;
        cursorOffset = start + prefix.length;
        selectLength = text.length;
        break;
      }
      case 'divider':
        replacement = `\n\n---\n\n`;
        cursorOffset = start + replacement.length;
        break;
      case 'link':
        if (selectedText) {
          replacement = `[${selectedText}](https://)`;
          cursorOffset = start + selectedText.length + 3;
          selectLength = 8;
        } else {
          replacement = `[Tekst linku](https://)`;
          cursorOffset = start + 1;
          selectLength = 11;
        }
        break;
    }

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      if (selectLength > 0) {
        textarea.setSelectionRange(cursorOffset, cursorOffset + selectLength);
      } else {
        textarea.setSelectionRange(cursorOffset, cursorOffset);
      }
    }, 20);
  };

  const getComputedImageUrl = () => {
    if (imgSourceType === 'github') {
      const cleanFile = githubFilename.trim().replace(/^\/+/, '');
      if (!cleanFile) return '';
      return `https://raw.githubusercontent.com/${githubRepoOwner}/${githubRepoName}/${githubBranch}/${githubFolder}/${cleanFile}`;
    }
    return customImgUrl.trim();
  };

  const handleInsertImageToArticle = (targetMode: 'content' | 'cover' | 'gallery') => {
    const url = getComputedImageUrl();
    if (!url) {
      alert('Podaj nazwę pliku ze zdjęciem z repozytorium GitHub lub wklej bezpośredni link URL.');
      return;
    }

    if (targetMode === 'cover') {
      setCoverImage(url);
      setShowImageDialog(false);
      setSaveFeedback('Ustawiono nowe zdjęcie okładkowe artykułu!');
      setTimeout(() => setSaveFeedback(null), 3000);
      return;
    }

    const textarea = document.getElementById('cms-content-textarea') as HTMLTextAreaElement;
    const start = textarea?.selectionStart ?? content.length;
    const end = textarea?.selectionEnd ?? content.length;

    let insertionText = '';
    const cap = imageCaption.trim();

    if (targetMode === 'gallery') {
      const galleryTitle = cap || 'Fotorelacja';
      insertionText = `\n\n### 📸 Fotorelacja: ${galleryTitle}\n\n![${galleryTitle}](${url})\n${cap ? `*${cap}*\n` : ''}\n`;
    } else {
      if (cap) {
        insertionText = `\n\n![${cap}](${url})\n*${cap}*\n\n`;
      } else {
        insertionText = `\n\n![Zdjęcie do artykułu](${url})\n\n`;
      }
    }

    const newContent = content.substring(0, start) + insertionText + content.substring(end);
    setContent(newContent);
    setShowImageDialog(false);

    if (textarea) {
      setTimeout(() => {
        textarea.focus();
      }, 50);
    }
  };

  if (!isAuthenticated) {
    return (
      <div 
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HerbLubsza className="w-10 h-10 rounded-xl border border-amber-500/40 shadow-sm shrink-0" withBorder={false} />
              <div>
                <h3 className="font-bold text-base font-serif text-white flex items-center gap-1.5">
                  <span>Panel Redakcyjny</span>
                  <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Głos Lubszy • Dostęp Zabezpieczony</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prompt */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              Dostęp do publikowania artykułów, zarządzania bazą D1 i edycji treści portalu wymaga autoryzacji hasłem redakcyjnym.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                Hasło dostępowe redakcji
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  autoFocus
                  placeholder="Wpisz hasło redaktora..."
                  className="w-full pl-4 pr-11 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in shake">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                />
                <span>Zapamiętaj sesję w tej przeglądarce</span>
              </label>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Odblokuj Panel CMS</span>
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                Anuluj i wróć do portalu
              </button>
            </div>
          </form>

          {/* Hint info */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center space-y-1">
            <p>
              💡 Domyślne hasło startowe: <code className="text-amber-400 font-mono font-bold bg-black/40 px-1.5 py-0.5 rounded">lubsza2026!@#dart</code>
            </p>
            <p className="text-slate-600">
              Po zalogowaniu możesz zmienić hasło w zakładce Bezpieczeństwo & Hasło.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-white tracking-wide">
                  Panel Redaktora (CMS Keystatic / D1)
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Zalogowano
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Wizualne tworzenie i edycja artykułów dla portalu Głos Lubszy (gotowe na Cloudflare D1)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewArticle}
              id="btn-cms-new-article"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nowy Artykuł</span>
            </button>
            <button
              onClick={handleLogout}
              id="btn-cms-logout"
              title="Wyloguj i zablokuj Panel CMS"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Zablokuj</span>
            </button>
            <button
              onClick={onClose}
              id="btn-cms-close"
              aria-label="Zamknij panel redaktora"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 py-2 bg-slate-900 border-b border-slate-800 overflow-x-auto text-xs font-semibold">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'editor' 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>{editingArticleId ? 'Edycja Artykułu' : 'Kreator Artykułu'}</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'articles' 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Wszystkie Artykuły ({articles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('d1_database')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'd1_database' 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Database className="w-4 h-4 text-amber-400" />
              <span>Cloudflare D1 SQL</span>
            </button>

            <button
              onClick={() => setActiveTab('export_import')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'export_import' 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Kopia JSON & Import</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'settings' 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4 text-emerald-400" />
              <span>Bezpieczeństwo & Hasło</span>
            </button>
          </div>

          {saveFeedback && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold animate-in fade-in">
              <CheckCircle className="w-3.5 h-3.5" />
              {saveFeedback}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: VISUAL CMS EDITOR (Keystatic style) */}
          {activeTab === 'editor' && (
            <form onSubmit={handleSaveArticle} className="space-y-6">
              
              {/* Quick Article Selector & Templates Bar */}
              <div className="p-3.5 bg-slate-950/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[260px]">
                  <label className="text-xs font-bold text-amber-400 whitespace-nowrap">
                    Wczytaj do edycji:
                  </label>
                  <select
                    value={editingArticleId || ''}
                    onChange={(e) => {
                      const selId = e.target.value;
                      if (!selId) {
                        handleNewArticle();
                      } else {
                        const target = safeArticles.find(a => a.id === selId);
                        if (target) handleEditArticle(target);
                      }
                    }}
                    className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="">➕ [Nowy czysty artykuł]</option>
                    {safeArticles.map((art) => (
                      <option key={art.id} value={art.id}>
                        📝 {art.title.slice(0, 45)}... ({art.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick starter templates */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[11px] text-slate-400 hidden sm:inline">Szablony:</span>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('invest')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors cursor-pointer"
                    title="Wczytaj szablon inwestycji drogowej"
                  >
                    🚧 Inwestycja
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('citizens')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors cursor-pointer"
                    title="Wczytaj szablon inicjatywy mieszkańców"
                  >
                    🏡 Sołectwo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('alert')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors cursor-pointer"
                    title="Wczytaj szablon komunikatu"
                  >
                    📢 Komunikat
                  </button>
                </div>
              </div>

              {/* Top Action Bar in Editor */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-300">
                    Status wpisu:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Gotowy do publikacji
                  </span>
                  {editingArticleId && (
                    <span className="text-xs text-slate-400">
                      (Edytujesz ID: {editingArticleId})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* View layout modes */}
                  <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 gap-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditorLayout('editor')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        editorLayout === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Widok edycji pól"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Edycja</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditorLayout('split')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        editorLayout === 'split' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Podzielony widok z natychmiastowym podglądem"
                    >
                      <Columns className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Podgląd na żywo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditorLayout('preview')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        editorLayout === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Pełny podgląd gotowego artykułu"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Pełny artykuł</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    id="btn-cms-save"
                    className="flex items-center gap-2 px-5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingArticleId ? 'Zapisz Zmiany' : 'Opublikuj na Portalu'}</span>
                  </button>
                </div>
              </div>

              {editorLayout !== 'preview' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Main Editor Body (8 cols or 12 cols depending on layout) */}
                  <div className={editorLayout === 'split' ? 'lg:col-span-12 space-y-4' : 'lg:col-span-8 space-y-4'}>
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Tytuł Artykułu *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="np. Nowa nawierzchnia drogi w Czepielowicach – mieszkańcy doczekali się finału"
                        className="w-full px-4 py-3 text-base sm:text-lg font-serif font-bold rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Slug & Read Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                          Adres URL / Slug (przyjazny link)
                        </label>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          placeholder="np. nowa-nawierzchnia-czepielowice"
                          className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-700 text-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                          Szacowany czas czytania (minuty)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="60"
                          value={readTime}
                          onChange={(e) => setReadTime(Number(e.target.value))}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Lead / Excerpt */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Zajawka / Lead (Krótkie streszczenie widoczne na liście) *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Krótki, 2-3 zdaniowy opis wprowadzający do tematu..."
                        className="w-full px-4 py-2.5 text-sm rounded-2xl bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Rich text formatting tools */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                          Treść Artykułu (Edytor i Narzędzia Formatowania) *
                        </label>
                        <span className="text-[11px] text-amber-400/90 font-medium">
                          💡 Formatowanie jest natychmiastowo renderowane w podglądzie i na portalu
                        </span>
                      </div>

                      {/* Interactive Formatting Toolbar */}
                      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-950 rounded-2xl border border-slate-700 shadow-inner">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                          Narzędzia:
                        </span>

                        <button
                          type="button"
                          onClick={() => insertFormatting('bold')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                          title="Pogrubienie tekstu (**tekst**)"
                        >
                          <Bold className="w-3.5 h-3.5 text-blue-400" />
                          <span>Pogrubienie</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('italic')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs italic transition-colors cursor-pointer border border-slate-700"
                          title="Kursywa (*tekst*)"
                        >
                          <Italic className="w-3.5 h-3.5 text-blue-400" />
                          <span>Kursywa</span>
                        </button>

                        <div className="h-4 w-px bg-slate-700 mx-0.5" />

                        <button
                          type="button"
                          onClick={() => insertFormatting('h2')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                          title="Śródtytuł sekcji (## Tytuł)"
                        >
                          <Heading2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Śródtytuł</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('h3')}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                          title="Podtytuł sekcji (### Podtytuł)"
                        >
                          <Heading3 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Podtytuł</span>
                        </button>

                        <div className="h-4 w-px bg-slate-700 mx-0.5" />

                        <button
                          type="button"
                          onClick={() => insertFormatting('quote')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs transition-colors cursor-pointer border border-slate-700"
                          title="Cytat wypowiedzi mieszkańca (> Cytat)"
                        >
                          <Quote className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Cytat</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('info')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs transition-colors cursor-pointer border border-slate-700"
                          title="Wyróżniona ramka z komunikatem"
                        >
                          <Info className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Ważne</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('bullet')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs transition-colors cursor-pointer border border-slate-700"
                          title="Lista punktowana (- punkt)"
                        >
                          <List className="w-3.5 h-3.5 text-purple-400" />
                          <span>Lista</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('number')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs transition-colors cursor-pointer border border-slate-700"
                          title="Lista numerowana (1. punkt)"
                        >
                          <ListOrdered className="w-3.5 h-3.5 text-purple-400" />
                          <span>Numeracja</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('link')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs transition-colors cursor-pointer border border-slate-700"
                          title="Wstaw link [nazwa](url)"
                        >
                          <LinkIcon className="w-3.5 h-3.5 text-sky-400" />
                          <span>Link</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('divider')}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs transition-colors cursor-pointer border border-slate-700"
                          title="Linia oddzielająca (---)"
                        >
                          <Minus className="w-3.5 h-3.5 text-slate-400" />
                          <span>Linia</span>
                        </button>

                        <div className="h-4 w-px bg-slate-700 mx-0.5 hidden sm:block" />

                        {/* Dedicated GitHub Repo Image Inserter Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowImageDialog(true);
                            setImgSourceType('github');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs border border-emerald-500 ml-auto sm:ml-0"
                          title="Wstaw zdjęcie z repozytorium GitHub (dartek66/lubsza-lokalnie/obrazy) lub linku"
                        >
                          <FolderGit2 className="w-3.5 h-3.5 text-emerald-100" />
                          <span>🖼️ Zdjęcie z GitHub / Link</span>
                        </button>
                      </div>

                      {/* Textarea or Split View Mode */}
                      {editorLayout === 'split' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center justify-between">
                              <span>Pole edycji Markdown:</span>
                              <span className="text-[10px] text-slate-500">Zaznacz tekst i kliknij narzędzie powyżej</span>
                            </div>
                            <textarea
                              id="cms-content-textarea"
                              rows={16}
                              required
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              placeholder="Wpisz pełną treść artykułu. Możesz używać akapitów, nagłówków oraz list..."
                              className="w-full px-4 py-3 text-sm rounded-2xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-mono"
                            />
                          </div>

                          <div>
                            <div className="text-xs font-semibold text-blue-400 mb-1 flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5" />
                              <span>Podgląd na żywo (jak zobaczą czytelnicy):</span>
                            </div>
                            <div className="h-[415px] p-5 rounded-2xl bg-slate-950/90 border border-slate-800 overflow-y-auto">
                              {content ? (
                                <MarkdownRenderer content={content} />
                              ) : (
                                <div className="h-full flex items-center justify-center text-slate-600 text-sm italic">
                                  Wpisz treść w edytorze po lewej, aby zobaczyć sformatowany tekst...
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <textarea
                          id="cms-content-textarea"
                          rows={13}
                          required
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Wpisz pełną treść artykułu. Możesz używać akapitów, nagłówków oraz list..."
                          className="w-full px-4 py-3 text-sm rounded-2xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-sans"
                        />
                      )}
                    </div>
                  </div>

                  {/* Right Column: Metadata & Photo Selector (4 cols or below in split) */}
                  <div className={editorLayout === 'split' ? 'lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-800' : 'lg:col-span-4 space-y-4'}>
                    
                    {/* Category */}
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Kategoria Artykułu
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as CategoryType)}
                        className="w-full px-3 py-2.5 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                      </select>

                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="chk-featured"
                          checked={isFeatured}
                          onChange={(e) => setIsFeatured(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-700 bg-slate-900 cursor-pointer"
                        />
                        <label htmlFor="chk-featured" className="text-xs font-semibold text-slate-300 cursor-pointer">
                          Wyróżnij na samej górze (Główny)
                        </label>
                      </div>
                    </div>

                    {/* Author info */}
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Autor & Rola
                      </label>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Podpis autora</label>
                        <input
                          type="text"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="np. Janina Nowak / Redakcja"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Rola / Sołectwo</label>
                        <input
                          type="text"
                          value={authorRole}
                          onChange={(e) => setAuthorRole(e.target.value)}
                          placeholder="np. Mieszkaniec Mąkoszyc / Radny"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    {/* Cover Photo */}
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                          Zdjęcie Okładki (URL)
                        </label>
                        <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <input
                        type="url"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-900 border border-slate-700 text-slate-200"
                      />

                      {/* Fast Stock selector */}
                      <div className="pt-1">
                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">
                          Szybki wybór zdjęcia:
                        </label>
                        <div className="grid grid-cols-2 gap-1">
                          {stockPhotos.slice(0, 4).map((photo, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setCoverImage(photo.url)}
                              className="text-[10px] p-1 rounded bg-slate-900 hover:bg-blue-900/40 hover:text-blue-200 border border-slate-800 text-slate-300 text-left truncate transition-colors cursor-pointer"
                            >
                              • {photo.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Tagi (oddzielone przecinkami)
                      </label>
                      <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Lubsza, Inwestycje, Ekologia, Drogi"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />

                      {coverImage && (
                        <div className="h-20 rounded-xl overflow-hidden border border-slate-700 relative mt-2">
                          <img 
                            src={coverImage} 
                            alt="Podgląd okładki" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { (e.target as HTMLImageElement).src = stockPhotos[0].url; }}
                          />
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ) : (
                /* LIVE PREVIEW EXACTLY AS IT LOOKS IN ARTICLE MODAL */
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-800">
                    <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-6">
                      <div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white uppercase">
                          {categories.find(c => c.id === category)?.label || category}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-2">
                          {title || 'Tytuł artykułu'}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pb-3 border-b border-slate-800">
                    <span>Autor: <strong className="text-white">{author}</strong> ({authorRole})</span>
                    <span>•</span>
                    <span>Czas czytania: {readTime} min</span>
                  </div>

                  {excerpt && (
                    <div className="p-4 rounded-xl bg-blue-950/40 border-l-4 border-blue-500 text-blue-200 text-sm font-medium">
                      {excerpt}
                    </div>
                  )}

                  <div className="py-2">
                    {content ? (
                      <MarkdownRenderer content={content} />
                    ) : (
                      <div className="text-slate-500 text-sm italic">
                        Wpisz treść artykułu w edytorze, aby zobaczyć sformatowany artykuł...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>
          )}

          {/* TAB 2: ARTICLE MANAGEMENT TABLE */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Zarządzanie Artykułami Portalu
                  </h3>
                  <p className="text-xs text-slate-400">
                    Wszystkie {safeArticles.length} artykuły są natychmiast dostępne dla czytelników
                  </p>
                </div>
                <button
                  onClick={handleNewArticle}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Dodaj Nowy Artykuł</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="py-3 px-4">Tytuł</th>
                      <th className="py-3 px-3">Kategoria</th>
                      <th className="py-3 px-3">Autor</th>
                      <th className="py-3 px-3">Data</th>
                      <th className="py-3 px-3 text-center">Wyświetlenia / Polubienia</th>
                      <th className="py-3 px-4 text-right">Akcje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {safeArticles.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white max-w-xs truncate" title={art.title}>
                            {art.title}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            /{art.slug || generateSlug(art.title)}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                            {art.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-300">
                          {art.author}
                        </td>
                        <td className="py-3 px-3 text-slate-400">
                          {art.publishDate}
                        </td>
                        <td className="py-3 px-3 text-center text-slate-400">
                          {art.views} / ❤️ {art.likes}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleEditArticle(art)}
                            className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors cursor-pointer"
                            title="Edytuj treść"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors cursor-pointer"
                            title="Usuń wpis"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CLOUDFLARE D1 DATABASE & SQL EXPORT */}
          {activeTab === 'd1_database' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div className="space-y-1 text-xs">
                  <h4 className="text-sm font-bold text-amber-300">
                    Baza danych Cloudflare D1 (SQLite na brzegu sieci)
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Cloudflare D1 to relacyjna baza SQL. Konsola Cloudflare wymaga czystych zapytań SQL (bez komentarzy). Poniżej masz gotowe przyciski do wykonania w 2 prostych krokach:
                  </p>
                </div>
              </div>

              {/* Step by Step Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Step 1: Create Tables */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold text-[11px]">
                      Krok 1 (Jednorazowo)
                    </span>
                    <button
                      onClick={() => handleCopySql('schema')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedType === 'schema' ? 'Skopiowano Schemat!' : 'Kopiuj CREATE TABLE'}</span>
                    </button>
                  </div>
                  <h5 className="font-bold text-sm text-white">
                    Utworzenie Tabel (articles & comments)
                  </h5>
                  <p className="text-xs text-slate-400">
                    Tworzy strukturę tabel w D1. Wklej do konsoli Cloudflare i kliknij <em>Execute</em>.
                  </p>
                  <pre className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-300 font-mono text-[11px] max-h-28 overflow-y-auto">
                    {D1_SCHEMA_SQL_CLEAN}
                  </pre>
                </div>

                {/* Step 2: Insert Articles */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-[11px]">
                      Krok 2 (Dane)
                    </span>
                    <button
                      onClick={() => handleCopySql('inserts')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedType === 'inserts' ? 'Skopiowano Dane!' : 'Kopiuj INSERT'}</span>
                    </button>
                  </div>
                  <h5 className="font-bold text-sm text-white">
                    Wstawienie {safeArticles.length} artykułów
                  </h5>
                  <p className="text-xs text-slate-400">
                    Wstawia lub aktualizuje artykuły w bazie D1. Wklej po wykonaniu Kroku 1.
                  </p>
                  <pre className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-[11px] max-h-28 overflow-y-auto">
                    {exportArticlesToSQL(safeArticles, false)}
                  </pre>
                </div>
              </div>

              {/* All in one Clean SQL */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Wszystko w jednym (Czysty SQL bez komentarzy)
                  </h4>
                  <button
                    onClick={() => handleCopySql('all')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedType === 'all' ? 'Skopiowano Całość!' : 'Kopiuj Pełny Skrypt SQL'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-48 leading-relaxed">
                  {exportArticlesToSQL(safeArticles, true)}
                </pre>
              </div>

              {/* D1 Connection Endpoint Setup (Optional) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Konfiguracja Cloudflare Worker API (Opcjonalnie dla automatycznej synchronizacji)
                  </h4>
                  <span className="text-[10px] text-slate-400">Workers & Pages</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Adres Workera API (np. https://api.gloslubszy.workers.dev/articles)
                    </label>
                    <input
                      type="url"
                      value={d1Endpoint}
                      onChange={(e) => setD1Endpoint(e.target.value)}
                      placeholder="https://twoj-worker.workers.dev/articles"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Token autoryzacyjny API (Bearer)
                    </label>
                    <input
                      type="password"
                      value={d1Token}
                      onChange={(e) => setD1Token(e.target.value)}
                      placeholder="Wpisz token zabezpieczający..."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveD1Config}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 cursor-pointer"
                >
                  Zapisz Konfigurację API D1
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: JSON BACKUP & RESTORE */}
          {activeTab === 'export_import' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 w-fit">
                  <Download className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white font-serif">
                  Kopia Zapasowa (JSON)
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pobierz kompletny plik JSON ze wszystkimi artykułami, autorami i komentarzami. Możesz trzymać go na dysku lub w repozytorium GitHub.
                </p>
                <button
                  onClick={handleDownloadJson}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white transition-colors cursor-pointer"
                >
                  Pobierz bazę artykułów (.json)
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 w-fit">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white font-serif">
                  Wgraj Artykuły (Import)
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Przywróć artykuły z wcześniej pobranego pliku JSON lub wgraj gotowy zestaw wpisów.
                </p>
                <label className="block w-full text-center py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-bold text-xs text-slate-200 transition-colors cursor-pointer">
                  Wybierz plik JSON z dysku
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & PASSWORD SETTINGS */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Col 1: Change Password Form */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-serif">
                      Zmiana Hasła Redakcyjnego
                    </h4>
                    <p className="text-xs text-slate-400">
                      Ustaw nowe hasło zabezpieczające dostęp do Panelu CMS
                    </p>
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Obecne hasło redakcyjne
                    </label>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={currentPasswordInput}
                      onChange={(e) => setCurrentPasswordInput(e.target.value)}
                      placeholder="Wpisz dotychczasowe hasło..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        Nowe hasło (min. 4 znaki)
                      </label>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        placeholder="Nowe hasło..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        Powtórz nowe hasło
                      </label>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={confirmNewPasswordInput}
                        onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
                        placeholder="Powtórz nowe hasło..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={showNewPassword}
                        onChange={(e) => setShowNewPassword(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>Pokaż wpisywane hasła</span>
                    </label>
                  </div>

                  {pwdChangeFeedback && (
                    <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                      pwdChangeFeedback.isError 
                        ? 'bg-rose-500/15 border border-rose-500/30 text-rose-300' 
                        : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                    }`}>
                      {pwdChangeFeedback.isError ? (
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      <span>{pwdChangeFeedback.text}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
                    >
                      <Save className="w-4 h-4" />
                      <span>Zapisz Nowe Hasło</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetPasswordToDefault}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Przywróć domyślne (lubsza2026!@#dart)
                    </button>
                  </div>
                </form>
              </div>

              {/* Col 2: Active Session & Security Overview */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-serif">
                        Status Autoryzacji
                      </h4>
                      <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                        Sesja Redaktora aktywna
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <div className="text-slate-400">Aktualne hasło w systemie:</div>
                      <div className="font-mono text-amber-300 font-bold">
                        {getMasterPassword() === 'lubsza2026!@#dart' ? 'Domyślne (lubsza2026!@#dart)' : 'Własne hasło zdefiniowane'}
                      </div>
                    </div>

                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Zabezpieczenie blokuje niepowołanym osobom dodawanie nowych postów, edytowanie dotychczasowych publikacji, modyfikację zapytań SQL bazy D1 oraz manipulację eksportem danych.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-800/60 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Wyloguj i zablokuj ten panel teraz</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                  <div className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-400" />
                    Wskazówka bezpieczeństwa
                  </div>
                  <p>
                    Jeśli korzystasz ze wspólnego komputera, pamiętaj aby po zakończeniu pracy kliknąć przycisk <strong>„Zablokuj”</strong> w górnym pasku.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Summary Bar */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Liczba artykułów: <strong className="text-white">{articles.length}</strong></span>
            <span>•</span>
            <span>Autozapis w przeglądarce: <strong className="text-emerald-400">Aktywny</strong></span>
          </div>
          <div className="text-[11px] text-slate-500">
            Kompatybilne z Keystatic & Cloudflare D1
          </div>
        </div>

        {/* IMAGE INSERTER MODAL OVERLAY (GitHub / Custom URL / Stock) */}
        {showImageDialog && (
          <div 
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowImageDialog(false);
            }}
            className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-5 text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-serif">
                      Wstawianie Zdjęcia lub Galerii
                    </h3>
                    <p className="text-xs text-slate-400">
                      Repozytorium GitHub: <span className="text-emerald-400 font-mono font-semibold">dartek66/lubsza-lokalnie/obrazy</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowImageDialog(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Source Tabs */}
              <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setImgSourceType('github')}
                  className={`flex-1 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    imgSourceType === 'github' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Katalog GitHub (obrazy/)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setImgSourceType('url')}
                  className={`flex-1 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    imgSourceType === 'url' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Własny link URL</span>
                </button>

                <button
                  type="button"
                  onClick={() => setImgSourceType('stock')}
                  className={`flex-1 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    imgSourceType === 'stock' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Gotowe szablony</span>
                </button>
              </div>

              {/* Tab 1: GitHub Repository */}
              {imgSourceType === 'github' && (
                <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Ścieżka w repozytorium:</span>
                    <span className="font-mono text-emerald-400 font-bold">github.com/dartek66/lubsza-lokalnie/obrazy/</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">
                      Nazwa pliku zdjęcia w GitHub (z rozszerzeniem) *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={githubFilename}
                        onChange={(e) => setGithubFilename(e.target.value)}
                        placeholder="np. festyn-lubsza-2025.jpg, droga-tarnowiec.png"
                        className="w-full pl-3 pr-24 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 font-mono pointer-events-none">
                        obrazy/
                      </span>
                    </div>
                  </div>

                  {/* Quick filename suggestions */}
                  <div>
                    <span className="block text-[11px] text-slate-400 mb-1.5">
                      Kliknij przykładową nazwę lub strukturę:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'festyn-lubsza.jpg',
                        'remont-drogi.jpg',
                        'zebranie-solectwa.jpg',
                        'lubszanka-rzeka.jpg',
                        'inwestycje/kanalizacja.jpg',
                        'szkola-lubsza.jpg',
                      ].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setGithubFilename(preset)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-emerald-950 hover:text-emerald-300 text-[11px] font-mono border border-slate-800 text-slate-300 transition-colors cursor-pointer"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {githubFilename && (
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300 space-y-1">
                      <div className="font-semibold flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Bezpośredni link surowy (Raw GitHub Content):</span>
                      </div>
                      <div className="font-mono text-[11px] text-slate-300 break-all bg-black/40 p-2 rounded-lg">
                        {getComputedImageUrl()}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Custom URL */}
              {imgSourceType === 'url' && (
                <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <label className="block text-xs font-bold text-slate-200">
                    Wklej bezpośredni adres URL zdjęcia (HTTPS) *
                  </label>
                  <input
                    type="url"
                    value={customImgUrl}
                    onChange={(e) => setCustomImgUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... lub https://twoja-domena.pl/foto.jpg"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-400">
                    Możesz wkleić link ze zdjęciem z dowolnego hostingu (np. Unsplash, Imgur, Cloudflare R2).
                  </p>
                </div>
              )}

              {/* Tab 3: Stock Presets */}
              {imgSourceType === 'stock' && (
                <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="block text-xs font-bold text-slate-200 mb-1">
                    Wybierz gotowe tematyczne zdjęcie z banku:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {stockPhotos.map((photo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCustomImgUrl(photo.url);
                          setImgSourceType('url');
                        }}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-blue-900/30 border border-slate-800 text-left transition-colors cursor-pointer group"
                      >
                        <div className="h-16 rounded-lg overflow-hidden mb-1.5">
                          <img src={photo.url} alt={photo.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <span className="text-xs font-medium text-slate-200 block truncate">{photo.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Caption field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Podpis pod zdjęciem / Tekst alternatywny (opcjonalny)
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="np. Mieszkańcy podczas zebrania wiejskiego (fot. Redakcja)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Live Preview Box */}
              {getComputedImageUrl() && (
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-semibold text-slate-400">Podgląd ładowania grafiki:</span>
                  <div className="h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                    <img 
                      src={getComputedImageUrl()} 
                      alt={imageCaption || 'Podgląd'} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) {
                          const errDiv = document.createElement('div');
                          errDiv.className = 'w-full h-full flex items-center justify-center p-4 text-center text-xs text-amber-400 bg-amber-950/20';
                          errDiv.innerHTML = `⚠️ Zdjęcie jeszcze niedostępne pod tym adresem.<br/>Pamiętaj o wrzuceniu pliku <strong>${githubFilename || 'pliku'}</strong> do katalogu <code>obrazy/</code> na GitHubie.`;
                          parent.appendChild(errDiv);
                        }
                      }}
                    />
                  </div>
                  {imageCaption && (
                    <p className="text-[11px] text-center text-slate-400 italic">
                      {imageCaption}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2.5 justify-end">
                <button
                  type="button"
                  onClick={() => setShowImageDialog(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Anuluj
                </button>

                <button
                  type="button"
                  onClick={() => handleInsertImageToArticle('cover')}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Ustaw jako zdjęcie główne</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleInsertImageToArticle('gallery')}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Wstaw jako Fotorelację</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleInsertImageToArticle('content')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Wstaw do treści artykułu</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
