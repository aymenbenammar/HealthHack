import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { BUNDESLAENDER, LangCode } from '../i18n/translations';

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'es', label: 'Español' },
];

const Header: React.FC = () => {
  const { lang, setLang, bundesland, setBundesland } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const selectedLang = LANGUAGES.find((entry) => entry.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: '260px',
        right: 0,
        height: '60px',
        background: '#ffffff',
        borderBottom: '1px solid #E0E4EA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 24px',
        zIndex: 99,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
          <select
            value={bundesland}
            onChange={(event) => setBundesland(event.target.value)}
            style={{
              appearance: 'none',
              padding: '6px 28px 6px 10px',
              border: '1px solid #E0E4EA',
              borderRadius: '6px',
              background: '#ffffff',
              fontSize: '13px',
              fontWeight: 500,
              color: '#5F6B7A',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {BUNDESLAENDER.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.labels[lang]}
              </option>
            ))}
          </select>
          <span
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: '#9AA3AF',
            }}
          >
            <ChevronIcon />
          </span>
        </div>

        <div ref={langRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setLangOpen((open) => !open)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              background: 'transparent',
              border: '1px solid #E0E4EA',
              borderRadius: '6px',
              color: '#5F6B7A',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <GlobeIcon />
            <span>{selectedLang.label}</span>
            <ChevronIcon />
          </button>

          {langOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                right: 0,
                background: '#ffffff',
                border: '1px solid #E0E4EA',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                minWidth: '140px',
                zIndex: 200,
                overflow: 'hidden',
              }}
            >
              {LANGUAGES.map((entry) => (
                <button
                  key={entry.code}
                  onClick={() => {
                    setLang(entry.code);
                    setLangOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '9px 14px',
                    background: entry.code === lang ? '#EBF3FF' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: entry.code === lang ? '#85CAE2' : '#1A1D23',
                    fontWeight: entry.code === lang ? 600 : 400,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(event) => {
                    if (entry.code !== lang) {
                      event.currentTarget.style.background = '#F5F7FA';
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (entry.code !== lang) {
                      event.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            height: '36px',
            padding: '0 12px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #85CAE2, #7C3AED)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          User
        </div>
      </div>
    </header>
  );
};

export default Header;
