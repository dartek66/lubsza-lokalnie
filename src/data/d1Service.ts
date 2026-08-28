// Service for managing Articles with LocalStorage + Cloudflare D1 SQL Schema & Sync Ready
import { Article } from '../types';
import { ARTICLES } from '../data/mockData';

const STORAGE_KEY = 'gmina_lubsza_articles';
const D1_CONFIG_KEY = 'gmina_lubsza_d1_config';

export interface D1Config {
  endpoint?: string; // Cloudflare Worker / Pages Function API URL
  apiToken?: string; // Optional bearer token for publishing to D1
  autoSync?: boolean;
}

export const D1_SCHEMA_SQL_CLEAN = `CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  coverImage TEXT NOT NULL,
  author TEXT NOT NULL,
  authorRole TEXT NOT NULL,
  publishDate TEXT NOT NULL,
  readTimeMinutes INTEGER DEFAULT 3,
  category TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  tags TEXT,
  isFeatured INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  article_id TEXT NOT NULL,
  author TEXT NOT NULL,
  village TEXT,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);`;

export const D1_SCHEMA_SQL = D1_SCHEMA_SQL_CLEAN;

export function getStoredD1Config(): D1Config {
  try {
    const saved = localStorage.getItem(D1_CONFIG_KEY);
    return saved ? JSON.parse(saved) : { autoSync: false };
  } catch {
    return { autoSync: false };
  }
}

export function saveStoredD1Config(config: D1Config) {
  try {
    localStorage.setItem(D1_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save D1 config', e);
  }
}

// Generate URL slug from title
export function generateSlug(title?: string | null): string {
  if (!title || typeof title !== 'string') return 'artykul';
  return title
    .toLowerCase()
    .trim()
    .replace(/[ąćęłńóśźż]/g, (char) => {
      const map: Record<string, string> = {
        'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
        'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z'
      };
      return map[char] || char;
    })
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || 'artykul';
}

// Helper to generate SQL INSERT statements for Keystatic / D1 batch insert
export function exportArticlesToSQL(articles?: Article[] | null, includeSchema: boolean = true): string {
  if (!articles || !Array.isArray(articles)) {
    return includeSchema ? D1_SCHEMA_SQL_CLEAN : '';
  }
  const statements = articles.filter(Boolean).map(art => {
    const artTitle = art.title || 'Artykuł';
    const escapedTitle = artTitle.replace(/'/g, "''");
    const escapedSlug = (art.slug || generateSlug(artTitle)).replace(/'/g, "''");
    const escapedExcerpt = (art.excerpt || '').replace(/'/g, "''");
    const escapedContent = (art.content || '').replace(/'/g, "''");
    const escapedAuthor = (art.author || 'Redakcja Głos Lubszy').replace(/'/g, "''");
    const escapedRole = (art.authorRole || 'Obywatelska Redakcja').replace(/'/g, "''");
    const tagsJson = JSON.stringify(art.tags || []).replace(/'/g, "''");
    const isFeatured = art.isFeatured ? 1 : 0;
    const cover = (art.coverImage || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80').replace(/'/g, "''");
    const date = (art.publishDate || '2026-08-28').replace(/'/g, "''");
    const category = (art.category || 'aktualnosci').replace(/'/g, "''");

    return `INSERT OR REPLACE INTO articles (id, title, slug, excerpt, content, coverImage, author, authorRole, publishDate, readTimeMinutes, category, views, likes, tags, isFeatured) VALUES ('${art.id || `art-${Date.now()}`}', '${escapedTitle}', '${escapedSlug}', '${escapedExcerpt}', '${escapedContent}', '${cover}', '${escapedAuthor}', '${escapedRole}', '${date}', ${art.readTimeMinutes || 3}, '${category}', ${art.views || 0}, ${art.likes || 0}, '${tagsJson}', ${isFeatured});`;
  });

  if (includeSchema) {
    return `${D1_SCHEMA_SQL_CLEAN}\n\n${statements.join('\n')}`;
  }
  return statements.join('\n');
}
