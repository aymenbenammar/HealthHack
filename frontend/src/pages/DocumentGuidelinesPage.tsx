import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { getDocumentById } from '../data/documents';
import { learnGuidelines, GuidelinesResult, GuidelineAction } from '../api/learnGuidelines';
import { useLanguage } from '../i18n/LanguageContext';
import { getTranslatedDocument } from '../i18n/documentTranslations';

// ── Icons ──────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronDownSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUpSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// ── ChecklistItem ──────────────────────────────────────────────────────────────

const ChecklistItem: React.FC<{
  action: GuidelineAction;
  index: number;
  checked: boolean;
  onToggle: () => void;
}> = ({ action, index, checked, onToggle }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const hasDetails = action.what_it_means || action.where_to_find_it || action.what_to_prepare;

  // Indentation constants so badge and expanded content share the same left axis as the title text.
  // Outer row: checkbox(22px) + gap(12px) = 34px to reach the title column.
  // Within title column: step number minWidth(16px) + gap(8px) = 24px to reach title text.
  const TITLE_COL_OFFSET = '34px';
  const TITLE_TEXT_OFFSET = '24px';

  return (
    <div
      style={{
        border: `1.5px solid ${checked ? '#A5D6A7' : '#E0E4EA'}`,
        borderRadius: '10px',
        padding: '14px 16px',
        background: checked ? '#F1F8F2' : '#ffffff',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      {/* ── Header row: checkbox · step+title · chevron ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Checkbox */}
        <button
          onClick={onToggle}
          aria-label={checked ? 'Mark incomplete' : 'Mark complete'}
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            border: `2px solid ${checked ? '#2E7D32' : '#9AA3AF'}`,
            background: checked ? '#2E7D32' : 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.15s',
          }}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Step number + title */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#9AA3AF', flexShrink: 0, minWidth: '16px' }}>
            {index + 1}
          </span>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: checked ? '#5F6B7A' : '#1A1D23',
              lineHeight: '1.4',
              textDecoration: checked ? 'line-through' : 'none',
              transition: 'color 0.2s',
            }}
          >
            {action.item}
          </span>
        </div>

        {/* Chevron — far right, replaces "Show/Hide details" text */}
        {hasDetails && !checked && (
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? 'Collapse details' : 'Expand details'}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9AA3AF',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              transition: 'color 0.15s',
            }}
          >
            {expanded ? <ChevronUpSmall /> : <ChevronDownSmall />}
          </button>
        )}
      </div>

      {/* ── Sub-content: badge + expanded details, strictly left-aligned with title text ── */}
      {(action.important || (expanded && !checked)) && (
        <div style={{ paddingLeft: TITLE_COL_OFFSET, marginTop: '6px' }}>
          {action.important && (
            <div
              style={{
                marginLeft: TITLE_TEXT_OFFSET,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 9px',
                background: '#FFF3E0',
                border: '1px solid #FFB74D',
                borderRadius: '5px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#E65100',
              }}
            >
              ⚠ {action.important}
            </div>
          )}

          {expanded && !checked && (
            <div
              style={{
                marginLeft: TITLE_TEXT_OFFSET,
                marginTop: action.important ? '8px' : '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {action.what_it_means && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#8B95A1', marginBottom: '3px' }}>
                    {t.guideWhatItMeans}
                  </div>
                  <p style={{ fontSize: '13px', color: '#5F6B7A', lineHeight: '1.5', margin: 0 }}>
                    {action.what_it_means}
                  </p>
                </div>
              )}
              {action.where_to_find_it && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#8B95A1', marginBottom: '3px' }}>
                    {t.guideWhereToFind}
                  </div>
                  <p style={{ fontSize: '13px', color: '#5F6B7A', lineHeight: '1.5', margin: 0 }}>
                    {action.where_to_find_it}
                  </p>
                </div>
              )}
              {action.what_to_prepare && (
                <div
                  style={{
                    padding: '8px 12px',
                    background: '#EBF3FF',
                    borderRadius: '6px',
                    border: '1px solid #BFDBFE',
                    fontSize: '12px',
                    color: '#1557B0',
                  }}
                >
                  <strong>{t.guidePrepare}</strong> {action.what_to_prepare}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────────

const LANGUAGES = ['English', 'German', 'Spanish', 'French'];

const DocumentGuidelinesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Guide state
  const [result, setResult] = useState<GuidelinesResult | null>(null);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const doc = id ? getDocumentById(id) : undefined;

  // ── Derived values ──────────────────────────────────────────────────────────

  const pages = result?.pages ?? [];
  const currentPage = pages[currentPageIdx];
  const totalPages = pages.length;

  const totalItems = pages.reduce((sum, p) => sum + p.actions.length, 0);
  const completedItems = checked.size;
  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setChecked(new Set());
    setCurrentPageIdx(0);
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelected(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelected(file);
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    setChecked(new Set());
    setCurrentPageIdx(0);
    try {
      const res = await learnGuidelines(selectedFile, language);
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChecked = (pageIdx: number, actionIdx: number) => {
    const key = `${pageIdx}-${actionIdx}`;
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  if (!doc) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F2F5' }}>
        <Sidebar activePage="/documents" />
        <div style={{ marginLeft: '260px', flex: 1 }}>
          <Header />
          <main style={{ marginTop: '60px', padding: '40px 32px', textAlign: 'center' }}>
            <h2 style={{ color: '#1A1D23', marginBottom: '8px' }}>{t.docNotFound}</h2>
            <button onClick={() => navigate('/documents')} style={{ padding: '10px 20px', background: '#85CAE2', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              {t.backToDocuments}
            </button>
          </main>
        </div>
      </div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F2F5' }}>
        <Sidebar activePage="/documents" />

        <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />

          {/* ── Progress bar (only when guide is ready) ── */}
          {result && (
            <div
              style={{
                position: 'fixed',
                top: '60px',
                left: '260px',
                right: '0',
                zIndex: 90,
                background: '#ffffff',
                borderBottom: '1px solid #E0E4EA',
                padding: '10px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1D23', whiteSpace: 'nowrap' }}>
                {completedItems} / {totalItems} {t.guideStepsLabel}
              </span>
              <div
                style={{
                  flex: 1,
                  height: '8px',
                  borderRadius: '99px',
                  background: '#E0E4EA',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progressPct}%`,
                    background: progressPct === 100
                      ? 'linear-gradient(90deg, #2E7D32, #43A047)'
                      : '#F79D25',
                    borderRadius: '99px',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: progressPct === 100 ? '#2E7D32' : '#5F6B7A', whiteSpace: 'nowrap' }}>
                {progressPct}%{progressPct === 100 ? ' 🎉' : ''}
              </span>
            </div>
          )}

          <main
            style={{
              marginTop: result ? '120px' : '60px',
              padding: '28px 32px',
              flex: 1,
              transition: 'margin-top 0.2s',
            }}
          >
            {/* Breadcrumb */}
            <button
              onClick={() => navigate(`/documents/${id}`)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'transparent',
                border: 'none',
                color: '#85CAE2',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '0',
                marginBottom: '18px',
              }}
            >
              <BackIcon />
              {t.guideBackTo} {getTranslatedDocument(doc, lang).title}
            </button>

            {/* ── SETUP SCREEN (before guide generated) ── */}
            {!result && (
              <>
                {/* Title + language picker */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1A1D23', marginBottom: '4px' }}>
                      {t.guideHowToFill} {getTranslatedDocument(doc, lang).title}
                    </h1>
                    <p style={{ fontSize: '14px', color: '#5F6B7A' }}>
                      {t.guideSubtitle}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#5F6B7A', fontWeight: 500 }}>{t.guideExplainIn}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '20px',
                            border: `1px solid ${language === lang ? '#85CAE2' : '#E0E4EA'}`,
                            background: language === lang ? '#85CAE2' : '#ffffff',
                            color: language === lang ? '#ffffff' : '#5F6B7A',
                            fontSize: '13px',
                            fontWeight: language === lang ? 600 : 400,
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Upload zone */}
                {!selectedFile ? (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    style={{
                      border: `2px dashed ${isDragOver ? '#85CAE2' : '#D0D7E2'}`,
                      borderRadius: '12px',
                      padding: '72px 32px',
                      textAlign: 'center',
                      background: isDragOver ? '#EBF3FF' : '#ffffff',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontSize: '44px', marginBottom: '12px' }}>📋</div>
                    <p style={{ fontSize: '16px', fontWeight: 600, color: '#1A1D23', marginBottom: '6px' }}>
                      {t.guideUploadForm}
                    </p>
                    <p style={{ fontSize: '14px', color: '#5F6B7A', marginBottom: '20px' }}>
                      {t.guideDragDrop}
                    </p>
                    <input ref={fileInputRef} type="file" accept={doc.acceptedFormats.join(',')} onChange={handleFileChange} style={{ display: 'none' }} />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '11px 22px',
                        background: '#85CAE2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(27,115,232,0.30)',
                      }}
                    >
                      <UploadIcon />
                      {t.guideChooseFile}
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      background: '#ffffff',
                      border: '1px solid #E0E4EA',
                      borderRadius: '12px',
                      padding: '28px 32px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '40px' }}>📄</div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#1A1D23' }}>{selectedFile.name}</div>
                      <div style={{ fontSize: '13px', color: '#9AA3AF', marginTop: '2px' }}>
                        {t.guideReadyToGenerate} <strong>{language}</strong>
                      </div>
                    </div>

                    {isLoading ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: '#F79D25',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                          }}
                        >
                          <SpinnerIcon />
                        </div>
                        <div style={{ fontSize: '14px', color: '#5F6B7A', fontWeight: 500 }}>{t.guideAnalyzing}</div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={handleGenerate}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '11px 24px',
                            background: '#F79D25',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 3px 10px rgba(247,157,37,0.35)',
                          }}
                        >
                          ✨ {t.guideGenerateBtn}
                        </button>
                        <button
                          onClick={() => { setSelectedFile(null); setError(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                          style={{
                            padding: '11px 16px',
                            background: 'transparent',
                            border: '1px solid #E0E4EA',
                            borderRadius: '8px',
                            color: '#5F6B7A',
                            fontSize: '13px',
                            cursor: 'pointer',
                          }}
                        >
                          {t.guideChangeFile}
                        </button>
                      </div>
                    )}

                    {error && (
                      <div style={{ padding: '12px 16px', background: '#FFEBEE', border: '1px solid #EF9A9A', borderRadius: '8px', fontSize: '13px', color: '#C62828', maxWidth: '480px' }}>
                        <strong>Error:</strong> {error}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* ── GUIDE SCREEN (page-by-page view) ── */}
            {result && currentPage && (
              <>
                {/* Page navigation bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    background: '#ffffff',
                    border: '1px solid #E0E4EA',
                    borderRadius: '10px',
                    padding: '12px 20px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <button
                    onClick={() => setCurrentPageIdx((i) => Math.max(0, i - 1))}
                    disabled={currentPageIdx === 0}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      border: '1px solid #E0E4EA',
                      borderRadius: '8px',
                      background: currentPageIdx === 0 ? '#F7F8FA' : '#ffffff',
                      color: currentPageIdx === 0 ? '#C0C8D4' : '#1A1D23',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: currentPageIdx === 0 ? 'default' : 'pointer',
                    }}
                  >
                    <ChevronLeftIcon />
                    {t.guidePrevious}
                  </button>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#1A1D23' }}>
                      {t.guidePage} {currentPage.page} {t.guideOf} {totalPages}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9AA3AF', marginTop: '1px' }}>
                      {currentPage.actions.length} {t.guideStepsOnPage}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentPageIdx((i) => Math.min(totalPages - 1, i + 1))}
                    disabled={currentPageIdx === totalPages - 1}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      border: '1px solid #E0E4EA',
                      borderRadius: '8px',
                      background: currentPageIdx === totalPages - 1 ? '#F7F8FA' : '#ffffff',
                      color: currentPageIdx === totalPages - 1 ? '#C0C8D4' : '#1A1D23',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: currentPageIdx === totalPages - 1 ? 'default' : 'pointer',
                    }}
                  >
                    {t.guideNext}
                    <ChevronRightIcon />
                  </button>
                </div>

                {/* Split-screen: image left, checklist right */}
                <div style={{ display: 'grid', gridTemplateColumns: '9fr 11fr', gap: '20px', alignItems: 'start' }}>
                  {/* Left: page image */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    {currentPage.image ? (
                      <img
                        src={currentPage.image}
                        alt={`Page ${currentPage.page}`}
                        style={{
                          width: '100%',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <div style={{ color: '#9AA3AF', textAlign: 'center', padding: '48px' }}>
                        <div style={{ fontSize: '36px', marginBottom: '8px' }}>📄</div>
                        <div style={{ fontSize: '14px' }}>No preview available</div>
                      </div>
                    )}
                  </div>

                  {/* Right: checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Page header */}
                    <div
                      style={{
                        background: '#ffffff',
                        border: '1px solid #E0E4EA',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#85CAE2', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                        {t.guidePage} {currentPage.page} {t.guidePageChecklist}
                      </div>
                      <div style={{ fontSize: '13px', color: '#5F6B7A' }}>
                        {currentPage.actions.filter((_, i) => checked.has(`${currentPageIdx}-${i}`)).length} {t.guideOf} {currentPage.actions.length} {t.guideDoneOnPage}
                      </div>
                    </div>

                    {/* Items */}
                    {currentPage.actions.length === 0 ? (
                      <div
                        style={{
                          background: '#ffffff',
                          border: '1px solid #E0E4EA',
                          borderRadius: '12px',
                          padding: '32px 20px',
                          textAlign: 'center',
                          color: '#9AA3AF',
                          fontSize: '14px',
                          fontStyle: 'italic',
                        }}
                      >
                        {t.guideNoAction}
                      </div>
                    ) : (
                      currentPage.actions.map((action, i) => (
                        <ChecklistItem
                          key={i}
                          action={action}
                          index={i}
                          checked={checked.has(`${currentPageIdx}-${i}`)}
                          onToggle={() => toggleChecked(currentPageIdx, i)}
                        />
                      ))
                    )}

                    {/* Page-level navigation shortcut at bottom */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      {currentPageIdx > 0 && (
                        <button
                          onClick={() => setCurrentPageIdx((i) => i - 1)}
                          style={{
                            flex: 1,
                            padding: '9px',
                            border: '1px solid #E0E4EA',
                            borderRadius: '8px',
                            background: '#ffffff',
                            color: '#5F6B7A',
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                          }}
                        >
                          <ChevronLeftIcon /> {t.guidePrevPage}
                        </button>
                      )}
                      {currentPageIdx < totalPages - 1 && (
                        <button
                          onClick={() => setCurrentPageIdx((i) => i + 1)}
                          style={{
                            flex: 1,
                            padding: '9px',
                            border: '1px solid #85CAE2',
                            borderRadius: '8px',
                            background: '#EBF3FF',
                            color: '#85CAE2',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                          }}
                        >
                          {t.guideNextPage} <ChevronRightIcon />
                        </button>
                      )}
                    </div>

                    {/* Start over */}
                    <button
                      onClick={() => { setResult(null); setSelectedFile(null); setChecked(new Set()); setCurrentPageIdx(0); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      style={{
                        marginTop: '4px',
                        padding: '8px',
                        background: 'transparent',
                        border: '1px solid #E0E4EA',
                        borderRadius: '8px',
                        color: '#9AA3AF',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      {t.guideDifferentFile}
                    </button>
                  </div>
                </div>

                {/* Page dot indicators */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                  {pages.map((p, i) => {
                    const pageDone = p.actions.length > 0 && p.actions.every((_, ai) => checked.has(`${i}-${ai}`));
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPageIdx(i)}
                        title={`Page ${p.page}`}
                        style={{
                          width: i === currentPageIdx ? '28px' : '8px',
                          height: '8px',
                          borderRadius: '99px',
                          border: 'none',
                          background: pageDone
                            ? '#2E7D32'
                            : i === currentPageIdx
                            ? '#85CAE2'
                            : '#D0D7E2',
                          cursor: 'pointer',
                          padding: 0,
                          transition: 'all 0.2s',
                        }}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default DocumentGuidelinesPage;
