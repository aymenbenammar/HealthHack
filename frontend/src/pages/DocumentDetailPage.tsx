import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AIResultPanel from '../components/AIResultPanel';
import { getDocumentById } from '../data/documents';
import { DocStatus, AIAnalysisResult } from '../types';
import { analyzeDocument } from '../api/analyzeDocument';

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#85CAE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const SpinnerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    style={{ animation: 'spin 0.8s linear infinite' }}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const StatusBadge: React.FC<{ status: DocStatus }> = ({ status }) => {
  const configs: Record<DocStatus, { label: string; bg: string; color: string; border: string }> = {
    required: { label: 'Required', bg: '#FFF3E0', color: '#E65100', border: '#FFB74D' },
    uploaded: { label: 'Uploaded', bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
    verified: { label: 'Verified', bg: '#E3F2FD', color: '#1565C0', border: '#90CAF9' },
    issue: { label: 'Issue', bg: '#FFEBEE', color: '#C62828', border: '#EF9A9A' },
  };
  const cfg = configs[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
      }}
    >
      {cfg.label}
    </span>
  );
};

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div
    style={{
      background: '#ffffff',
      border: '1px solid #E0E4EA',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '16px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    }}
  >
    <h3
      style={{
        fontSize: '15px',
        fontWeight: 700,
        color: '#1A1D23',
        marginBottom: '12px',
        paddingBottom: '10px',
        borderBottom: '1px solid #F0F2F5',
      }}
    >
      {title}
    </h3>
    {children}
  </div>
);

const DocumentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const doc = id ? getDocumentById(id) : undefined;

  if (!doc) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F2F5' }}>
        <Sidebar activePage="/documents" />
        <div style={{ marginLeft: '260px', flex: 1 }}>
          <Header />
          <main style={{ marginTop: '60px', padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🔍</div>
            <h2 style={{ color: '#1A1D23', marginBottom: '8px' }}>Document Not Found</h2>
            <p style={{ color: '#5F6B7A', marginBottom: '20px' }}>
              The document you are looking for does not exist.
            </p>
            <button
              onClick={() => navigate('/documents')}
              style={{
                padding: '10px 20px',
                background: '#85CAE2',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Back to Documents
            </button>
          </main>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
      setAnalysisError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
      setAnalysisError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeDocument(selectedFile);
      setAnalysisResult(result);
    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

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

          <main style={{ marginTop: '60px', padding: '28px 32px', flex: 1 }}>
            {/* Breadcrumb */}
            <button
              onClick={() => navigate('/documents')}
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
                marginBottom: '20px',
              }}
            >
              <BackIcon />
              Back to Overview
            </button>

            {/* Title row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                marginBottom: '24px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1D23' }}>{doc.title}</h1>
                  <StatusBadge status={doc.status} />
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 380px',
                gap: '20px',
                alignItems: 'start',
              }}
            >
              {/* Left column */}
              <div>
                {/* Description */}
                <InfoCard title="Description">
                  <p style={{ fontSize: '14px', color: '#5F6B7A', lineHeight: '1.65', marginBottom: '14px' }}>
                    {doc.description}
                  </p>
                  {doc.isUserFilledForm && <button
                    onClick={() => navigate(`/documents/${doc.id}/guidelines`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '9px 16px',
                      background: 'linear-gradient(135deg, #EBF3FF, #F0F7FF)',
                      color: '#85CAE2',
                      border: '1.5px solid #BFDBFE',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s',
                      textDecoration: 'none',
                      letterSpacing: '0.1px',
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.background = '#DBEAFE';
                      btn.style.borderColor = '#93C5FD';
                      btn.style.boxShadow = '0 2px 8px rgba(27,115,232,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.background = 'linear-gradient(135deg, #EBF3FF, #F0F7FF)';
                      btn.style.borderColor = '#BFDBFE';
                      btn.style.boxShadow = 'none';
                    }}
                  >
                    For step-by-step instructions on your specific document click here.
                  </button>}
                </InfoCard>

{/* Templates */}
                {doc.templates && doc.templates.length > 0 && (
                  <InfoCard title="Template Information">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {doc.templates.map((tmpl, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            background: '#F7F8FA',
                            border: '1px solid #E0E4EA',
                            borderRadius: '8px',
                            gap: '12px',
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1D23' }}>
                              {tmpl.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#9AA3AF', marginTop: '2px' }}>
                              Language: {tmpl.language}
                            </div>
                          </div>
                          <button
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '7px 14px',
                              background: 'transparent',
                              border: '1px solid #85CAE2',
                              borderRadius: '6px',
                              color: '#85CAE2',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                            }}
                          >
                            <DownloadIcon />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </InfoCard>
                )}
              </div>

              {/* Right column — Upload */}
              <div>
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #E0E4EA',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#1A1D23',
                      marginBottom: '16px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #F0F2F5',
                    }}
                  >
                    Your Uploaded Documents
                  </h3>

                  {/* Dropzone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    style={{
                      border: `2px dashed ${isDragOver ? '#85CAE2' : '#D0D7E2'}`,
                      borderRadius: '10px',
                      padding: '24px 16px',
                      textAlign: 'center',
                      background: isDragOver ? '#EBF3FF' : '#FAFBFC',
                      transition: 'border-color 0.15s, background 0.15s',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>📎</div>
                    <p style={{ fontSize: '13px', color: '#5F6B7A', marginBottom: '4px' }}>
                      Drag & drop your file here
                    </p>
                    <p style={{ fontSize: '12px', color: '#9AA3AF', marginBottom: '14px' }}>
                      {doc.acceptedFormats.join(', ')} up to 20 MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={doc.acceptedFormats.join(',')}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        padding: '9px 18px',
                        background: '#85CAE2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(27,115,232,0.30)',
                        transition: 'background 0.15s, box-shadow 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#1557B0';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#85CAE2';
                      }}
                    >
                      <UploadIcon />
                      Upload Document
                    </button>
                  </div>

                  {/* Selected file display */}
                  {selectedFile && (
                    <div
                      style={{
                        padding: '12px 14px',
                        background: '#F7F8FA',
                        border: '1px solid #E0E4EA',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '14px',
                      }}
                    >
                      <FileIcon />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div
                          style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#1A1D23',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {selectedFile.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#9AA3AF', marginTop: '2px' }}>
                          {formatFileSize(selectedFile.size)}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setAnalysisResult(null);
                          setAnalysisError(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#E0E4EA',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#5F6B7A',
                          fontSize: '14px',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {/* Check with AI button */}
                  {selectedFile && !isAnalyzing && (
                    <button
                      onClick={handleAnalyze}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '11px 18px',
                        background: '#F79D25',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 3px 10px rgba(247,157,37,0.35)',
                        transition: 'opacity 0.15s, box-shadow 0.15s',
                        letterSpacing: '0.1px',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(247,157,37,0.45)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 3px 10px rgba(247,157,37,0.35)';
                      }}
                    >
                      Check with AI
                    </button>
                  )}

                  {/* Loading state */}
                  {isAnalyzing && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '20px',
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: '#F79D25',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          boxShadow: '0 3px 10px rgba(124,58,237,0.35)',
                        }}
                      >
                        <SpinnerIcon />
                      </div>
                      <div style={{ fontSize: '13px', color: '#5F6B7A', fontWeight: 500 }}>
                        Analyzing document...
                      </div>
                      <div style={{ fontSize: '12px', color: '#9AA3AF' }}>
                        This may take a few seconds
                      </div>
                    </div>
                  )}

                  {/* Error state */}
                  {analysisError && (
                    <div
                      style={{
                        marginTop: '14px',
                        padding: '12px 14px',
                        background: '#FFEBEE',
                        border: '1px solid #EF9A9A',
                        borderRadius: '8px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#C62828', marginBottom: '2px' }}>
                          Analysis Failed
                        </div>
                        <div style={{ fontSize: '12px', color: '#C62828' }}>{analysisError}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress indicator */}
                <div
                  style={{
                    marginTop: '16px',
                    background: '#ffffff',
                    border: '1px solid #E0E4EA',
                    borderRadius: '10px',
                    padding: '16px 20px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#9AA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                    Checklist
                  </div>
                  {(() => {
                    const aiPassed = analysisResult
                      ? analysisResult.issues.filter(i => i.severity === 'critical').length === 0
                      : null;
                    const steps: { label: string; state: 'done' | 'failed' | 'pending' }[] = [
                      { label: 'Upload document', state: selectedFile ? 'done' : 'pending' },
                      {
                        label: aiPassed === true ? 'AI analysis passed' : aiPassed === false ? 'AI analysis failed' : 'AI analysis',
                        state: aiPassed === true ? 'done' : aiPassed === false ? 'failed' : 'pending',
                      },
                    ];
                    return steps.map((step) => (
                      <div
                        key={step.label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '6px 0',
                        }}
                      >
                        <div
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: step.state === 'done' ? '#2E7D32' : step.state === 'failed' ? '#C62828' : '#E0E4EA',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'background 0.2s',
                          }}
                        >
                        </div>
                        <span
                          style={{
                            fontSize: '13px',
                            color: step.state === 'pending' ? '#9AA3AF' : '#1A1D23',
                            fontWeight: step.state === 'pending' ? 400 : 500,
                          }}
                        >
                          {step.label}
                        </span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            {/* AI Result Panel — full width below columns */}
            {analysisResult && (
              <div style={{ marginTop: '20px' }}>
                <AIResultPanel result={analysisResult} />
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default DocumentDetailPage;
