import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { documents, categories, getDocumentsByCategory } from '../data/documents';
import { DocStatus } from '../types';

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
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
                My Documents
              </h1>
              <p style={{ fontSize: '14px', color: '#5F6B7A' }}>
                Manage your Approbation documents and track their status
              </p>
            </div>

            {/* Federal State dropdown */}
            <div style={{ position: 'relative' }}>
              <select
                style={{
                  appearance: 'none',
                  padding: '9px 36px 9px 14px',
                  border: '1px solid #E0E4EA',
                  borderRadius: '8px',
                  background: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#1A1D23',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <option>Lower Saxony</option>
                <option>Bavaria</option>
                <option>North Rhine-Westphalia</option>
                <option>Baden-Württemberg</option>
                <option>Hamburg</option>
                <option>Berlin</option>
                <option>Hesse</option>
                <option>Saxony</option>
              </select>
              <span
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#9AA3AF',
                }}
              >
                <ChevronDownIcon />
              </span>
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
                  borderBottom: activeTab === 'documents' ? '2px solid #1B73E8' : '2px solid transparent',
                  color: activeTab === 'documents' ? '#1B73E8' : '#5F6B7A',
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
                Your Documents
                <span
                  style={{
                    background: activeTab === 'documents' ? '#1B73E8' : '#E0E4EA',
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
                  borderBottom: activeTab === 'translations' ? '2px solid #1B73E8' : '2px solid transparent',
                  color: activeTab === 'translations' ? '#1B73E8' : '#5F6B7A',
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
                Your Translations
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
                  No translations yet
                </div>
                <div style={{ fontSize: '14px' }}>
                  Upload documents and request certified translations here.
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
                  {['TITLE', 'STATUS', 'EXPIRES', 'LAST UPDATED', 'ACTIONS'].map((col) => (
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
                            color: '#1B73E8',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {cat}
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
                                marginBottom: '2px',
                              }}
                            >
                              {doc.title}
                            </div>
                            <div
                              style={{
                                fontSize: '11px',
                                color: '#9AA3AF',
                                fontFamily: 'monospace',
                              }}
                            >
                              {doc.docClass}
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
                                border: '1px solid #1B73E8',
                                borderRadius: '6px',
                                background: 'transparent',
                                color: '#1B73E8',
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
                              Set
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
              { label: 'Total Documents', value: totalDocs, color: '#1A1D23' },
              {
                label: 'Required',
                value: documents.filter((d) => d.status === 'required').length,
                color: '#E65100',
              },
              {
                label: 'Uploaded',
                value: documents.filter((d) => d.status === 'uploaded').length,
                color: '#2E7D32',
              },
              {
                label: 'Verified',
                value: documents.filter((d) => d.status === 'verified').length,
                color: '#1B73E8',
              },
              {
                label: 'Issues',
                value: documents.filter((d) => d.status === 'issue').length,
                color: '#C62828',
              },
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
