import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LangCode, BUNDESLAENDER } from '../i18n/translations';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9AA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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
  const { lang, setLang, t, bundesland, setBundesland } = useLanguage();
  const [searchValue, setSearchValue] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const selectedLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
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
        padding: '0 24px',
        zIndex: 99,
        gap: '16px',
      }}
    >
      {/* Search bar */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SearchIcon />
          </span>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t.searchPlaceholder}
            style={{
              width: '100%',
              height: '36px',
              paddingLeft: '38px',
              paddingRight: '12px',
              border: '1px solid #E0E4EA',
              borderRadius: '8px',
              background: '#F7F8FA',
              fontSize: '13px',
              color: '#1A1D23',
              outline: 'none',
              transition: 'border-color 0.15s, background 0.15s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#85CAE2';
              e.target.style.background = '#ffffff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E0E4EA';
              e.target.style.background = '#F7F8FA';
            }}
          />
        </div>
      </div>

      {/* Right side controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

        {/* Bundesland dropdown */}
        <div style={{ position: 'relative' }}>
          <select
            value={bundesland}
            onChange={(e) => setBundesland(e.target.value)}
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
            {BUNDESLAENDER.map((bl) => (
              <option key={bl.value} value={bl.value}>
                {bl.labels[lang]}
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

        {/* Language dropdown */}
        <div ref={langRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setLangOpen((o) => !o)}
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
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setLangOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '9px 14px',
                    background: l.code === lang ? '#EBF3FF' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: l.code === lang ? '#85CAE2' : '#1A1D23',
                    fontWeight: l.code === lang ? 600 : 400,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (l.code !== lang)
                      (e.currentTarget as HTMLButtonElement).style.background = '#F5F7FA';
                  }}
                  onMouseLeave={(e) => {
                    if (l.code !== lang)
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bell */}
        <button
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: '1px solid #E0E4EA',
            borderRadius: '8px',
            color: '#5F6B7A',
            cursor: 'pointer',
          }}
        >
          <BellIcon />
          <span
            style={{
              position: 'absolute',
              top: '7px',
              right: '8px',
              width: '7px',
              height: '7px',
              background: '#E65100',
              borderRadius: '50%',
              border: '1.5px solid #fff',
            }}
          />
        </button>

        {/* Avatar */}
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
