import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Image as ImageIcon, AlertCircle } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownImage: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (!src) return null;

  if (hasError) {
    return (
      <div className="my-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
        <div>
          <p className="font-bold">Nie udało się załadować obrazu</p>
          <p className="font-mono text-[11px] mt-0.5 opacity-90 break-all">{src}</p>
          {src.includes('dartek66/lubsza-lokalnie') && (
            <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-300">
              💡 Upewnij się, że plik o tej nazwie został wypchnięty (push) do repozytorium GitHub do katalogu <code className="font-bold bg-black/10 dark:bg-white/10 px-1 rounded">obrazy/</code> na gałęzi <code className="font-bold bg-black/10 dark:bg-white/10 px-1 rounded">main</code>.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <figure className="my-6 block not-prose">
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-sm">
        <img
          src={src}
          alt={alt || 'Zdjęcie do artykułu'}
          loading="lazy"
          className="w-full max-h-[550px] object-cover hover:scale-[1.01] transition-transform duration-300"
          onError={() => setHasError(true)}
        />
      </div>
      {alt && alt.trim().length > 0 && (
        <figcaption className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 italic flex items-center justify-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
          <span>{alt}</span>
        </figcaption>
      )}
    </figure>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (!content || typeof content !== 'string') {
    return null;
  }

  return (
    <div className={`markdown-content prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base ${className}`}>
      <Markdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-6 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-5 mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full inline-block"></span>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-4 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-3 mb-1.5">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-3.5 leading-relaxed text-slate-700 dark:text-slate-300">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-slate-950 dark:text-white bg-amber-500/10 px-1 py-0.5 rounded">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-800 dark:text-slate-200">
              {children}
            </em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border-l-4 border-blue-600 dark:border-blue-500 text-slate-800 dark:text-blue-200 font-medium italic shadow-xs">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="my-3 space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300 pl-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300 pl-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          hr: () => (
            <hr className="my-6 border-slate-200 dark:border-slate-800" />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs">
              {children}
            </code>
          ),
          img: ({ src, alt }) => (
            <MarkdownImage src={typeof src === 'string' ? src : undefined} alt={alt} />
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};

