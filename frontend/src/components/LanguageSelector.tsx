import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '\u{1F1FA}\u{1F1F8}', dir: 'ltr' },
  { code: 'es', name: 'Espanol', flag: '\u{1F1EA}\u{1F1F8}', dir: 'ltr' },
  { code: 'fr', name: 'Francais', flag: '\u{1F1EB}\u{1F1F7}', dir: 'ltr' },
  { code: 'pt', name: 'Portugues', flag: '\u{1F1E7}\u{1F1F7}', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '\u{1F1E9}\u{1F1EA}', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', flag: '\u{1F1EE}\u{1F1F3}', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '\u{1F1F8}\u{1F1E6}', dir: 'rtl' },
  { code: 'ur', name: 'اردو', flag: '\u{1F1F5}\u{1F1F0}', dir: 'rtl' },
  { code: 'yo', name: 'Yorùbá', flag: '\u{1F1F3}\u{1F1EC}', dir: 'ltr' },
  { code: 'ha', name: 'Hausa', flag: '\u{1F1F3}\u{1F1EC}', dir: 'ltr' },
  { code: 'ig', name: 'Igbo', flag: '\u{1F1F3}\u{1F1EC}', dir: 'ltr' },
  { code: 'pcm', name: 'Naija', flag: '\u{1F1F3}\u{1F1EC}', dir: 'ltr' },
  { code: 'sw', name: 'Kiswahili', flag: '\u{1F1F0}\u{1F1EA}', dir: 'ltr' },
  { code: 'tl', name: 'Tagalog', flag: '\u{1F1F5}\u{1F1ED}', dir: 'ltr' },
  { code: 'id', name: 'Bahasa', flag: '\u{1F1EE}\u{1F1E9}', dir: 'ltr' },
];

export default function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    const lang = languages.find(l => l.code === code);
    document.documentElement.dir = lang?.dir || 'ltr';
    document.documentElement.lang = code;
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-sm font-medium text-ink border border-pebble/50 hover:bg-white/90 transition-all cursor-pointer"
      >
        <Globe size={14} className="text-amber" />
        <span>{compact ? current.flag : current.name}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 rounded-xl bg-white shadow-xl border border-pebble/30 p-1.5 max-h-64 overflow-y-auto min-w-[160px]">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLang(lang.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                i18n.language === lang.code
                  ? 'bg-amber/10 text-amber font-semibold'
                  : 'text-ink hover:bg-pebble/20'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
