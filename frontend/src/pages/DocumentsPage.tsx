import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { documents, categories, getDocumentsByCategory } from '../data/documents';
import { DocStatus } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { categoryTranslationKey } from '../i18n/translations';
import { getTranslatedDocument } from '../i18n/documentTranslations';


const StatusBadge: React.FC<{ status: DocStatus }> = ({ status }) => {
  const { t } = useLanguage();
  const configs: Record<DocStatus, { label: string; bg: string; color: string; border: string }> = {
    required: { label: t.statusRequired, bg: '#FFF3E0', color: '#E65100', border: '#FFB74D' },
    uploaded: { label: t.statusUploaded, bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
    verified: { label: t.statusVerified, bg: '#E3F2FD', color: '#1565C0', border: '#90CAF9' },
    issue: { label: t.statusIssue, bg: '#FFEBEE', color: '#C62828', border: '#EF9A9A' },
  };
  const cfg = configs[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      {cfg.label}
    </span>
  );
};

const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'documents' | 'translations'>('documents');
  const totalDocs = documents.length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F2F5' }}>
      <Sidebar activePage="/documents" />

      <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main
          style={{
            marginTop: '60px',
            padding: '28px 32px',
            flex: 1,
          }}
        >
          {/* Page title row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1A1D23', marginBottom: '4px' }}>
                {t.pageTitle}
              </h1>
              <p style={{ fontSize: '14px', color: '#5F6B7A' }}>
                {t.pageSubtitle}
              </p>
            </div>

          </div>

          {/* Main card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #E0E4EA',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0',
                borderBottom: '1px solid #E0E4EA',
                padding: '0 24px',
              }}
            >
              <button
                onClick={() => setActiveTab('documents')}
                style={{
                  padding: '14px 4px',
                  marginRight: '28px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'documents' ? '2px solid #85CAE2' : '2px solid transparent',
                  color: activeTab === 'documents' ? '#85CAE2' : '#5F6B7A',
                  fontSize: '14px',
                  fontWeight: activeTab === 'documents' ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'color 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.tabYourDocuments}
                <span
                  style={{
                    background: activeTab === 'documents' ? '#85CAE2' : '#E0E4EA',
                    color: activeTab === 'documents' ? '#fff' : '#5F6B7A',
                    borderRadius: '20px',
                    padding: '1px 8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    transition: 'background 0.15s',
                  }}
                >
                  {totalDocs}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('translations')}
                style={{
                  padding: '14px 4px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'translations' ? '2px solid #85CAE2' : '2px solid transparent',
                  color: activeTab === 'translations' ? '#85CAE2' : '#5F6B7A',
                  fontSize: '14px',
                  fontWeight: activeTab === 'translations' ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'color 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.tabYourTranslations}
                <span
                  style={{
                    background: '#E0E4EA',
                    color: '#5F6B7A',
                    borderRadius: '20px',
                    padding: '1px 8px',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  0
                </span>
              </button>
            </div>

            {/* Tab content */}
            {activeTab === 'translations' ? (
              <div
                style={{
                  padding: '48px 24px',
                  textAlign: 'center',
                  color: '#9AA3AF',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>📄</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#5F6B7A', marginBottom: '6px' }}>
                  {t.noTranslations}
                </div>
                <div style={{ fontSize: '14px' }}>
                  {t.noTranslationsHint}
                </div>
              </div>
            ) : (
              <div>
                {/* Table header */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 130px 130px 150px 110px',
                    padding: '10px 24px',
                    background: '#F7F8FA',
                    borderBottom: '1px solid #E0E4EA',
                  }}
                >
                  {[t.colTitle, t.colStatus, t.colExpires, t.colLastUpdated, t.colActions].map((col) => (
                    <div
                      key={col}
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#9AA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {col}
                    </div>
                  ))}
                </div>

                {/* Categories */}
                {categories.map((cat) => {
                  const catDocs = getDocumentsByCategory(cat);
                  if (catDocs.length === 0) return null;
                  return (
                    <div key={cat}>
                      {/* Category header */}
                      <div
                        style={{
                          padding: '10px 24px',
                          background: '#F0F2F5',
                          borderBottom: '1px solid #E0E4EA',
                          borderTop: '1px solid #E0E4EA',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#85CAE2',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {t[categoryTranslationKey[cat]] ?? cat}
                        </span>
                      </div>

                      {/* Doc rows */}
                      {catDocs.map((doc, idx) => (
                        <div
                          key={doc.id}
                          onClick={() => navigate(`/documents/${doc.id}`)}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 130px 130px 150px 110px',
                            padding: '14px 24px',
                            borderBottom: idx < catDocs.length - 1 ? '1px solid #F0F2F5' : 'none',
                            cursor: 'pointer',
                            transition: 'background 0.12s',
                            alignItems: 'center',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.background = '#F7F8FA';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                          }}
                        >
                          {/* Title */}
                          <div>
                            <div
                              style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#1A1D23',
                              }}
                            >
                              {getTranslatedDocument(doc, lang).title}
                            </div>
                          </div>

                          {/* Status */}
                          <div>
                            <StatusBadge status={doc.status} />
                          </div>

                          {/* Expires */}
                          <div style={{ fontSize: '13px', color: '#9AA3AF' }}>
                            {doc.expires || '—'}
                          </div>

                          {/* Last Updated */}
                          <div style={{ fontSize: '13px', color: '#9AA3AF' }}>
                            {doc.lastUpdated || '—'}
                          </div>

                          {/* Actions */}
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/documents/${doc.id}/guidelines`);
                              }}
                              title="Learn how to fill this document"
                              style={{
                                padding: '5px 10px',
                                border: '1px solid #85CAE2',
                                borderRadius: '6px',
                                background: 'transparent',
                                color: '#85CAE2',
                                fontSize: '12px',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              Guide
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              style={{
                                padding: '5px 10px',
                                border: '1px solid #E0E4EA',
                                borderRadius: '6px',
                                background: 'transparent',
                                color: '#5F6B7A',
                                fontSize: '12px',
                                cursor: 'pointer',
                              }}
                            >
                              {t.reminderSet}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Summary bar */}
          <div
            style={{
              marginTop: '20px',
              padding: '14px 20px',
              background: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #E0E4EA',
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: t.statTotal, value: totalDocs, color: '#1A1D23' },
              { label: t.statRequired, value: documents.filter((d) => d.status === 'required').length, color: '#E65100' },
              { label: t.statUploaded, value: documents.filter((d) => d.status === 'uploaded').length, color: '#2E7D32' },
              { label: t.statVerified, value: documents.filter((d) => d.status === 'verified').length, color: '#85CAE2' },
              { label: t.statIssues, value: documents.filter((d) => d.status === 'issue').length, color: '#C62828' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: '11px', color: '#9AA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentsPage;
