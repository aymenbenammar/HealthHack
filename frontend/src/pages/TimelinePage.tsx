import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { documents, phaseConfig, getDocumentsByPhase } from '../data/documents';
import { getSubmissionStatus, SUBMISSION_STEPS, stepIndex } from '../utils/submissionStatus';
import { DocStatus } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

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

const TimelinePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const totalDocs = documents.length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F2F5' }}>
      <Sidebar activePage="/timeline" />

      <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ marginTop: '60px', padding: '28px 32px', flex: 1 }}>
          {/* Page title */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1A1D23', marginBottom: '4px' }}>
              Preparation Timeline
            </h1>
            <p style={{ fontSize: '14px', color: '#5F6B7A' }}>
              Your step-by-step roadmap to Approbation — organized by priority and preparation time.
            </p>
          </div>

          {/* Phase legend */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '28px',
            }}
          >
            {([1, 2, 3, 4] as const).map((phase) => {
              const cfg = phaseConfig[phase];
              return (
                <div
                  key={phase}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: cfg.bg,
                    border: `1px solid ${cfg.border}`,
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: cfg.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {phase}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: cfg.color }}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Phases */}
          {([1, 2, 3, 4] as const).map((phase) => {
            const cfg = phaseConfig[phase];
            const phaseDocs = getDocumentsByPhase(phase);
            return (
              <div key={phase} style={{ marginBottom: '36px' }}>
                {/* Phase header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px',
                    padding: '14px 20px',
                    background: '#ffffff',
                    border: `1px solid ${cfg.border}`,
                    borderLeft: `4px solid ${cfg.color}`,
                    borderRadius: '10px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: cfg.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {phase}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1A1D23' }}>
                      {cfg.label}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9AA3AF', marginTop: '2px' }}>
                      {cfg.sublabel}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      background: cfg.bg,
                      color: cfg.color,
                      fontSize: '12px',
                      fontWeight: 700,
                      border: `1px solid ${cfg.border}`,
                    }}
                  >
                    {phaseDocs.length} doc{phaseDocs.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Cards grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                    gap: '12px',
                    paddingLeft: '20px',
                  }}
                >
                  {phaseDocs.map((doc) => {
                    const prepWeeks = doc.prepTimeDays
                      ? doc.prepTimeDays >= 14
                        ? `~${Math.round(doc.prepTimeDays / 7)}w`
                        : doc.prepTimeDays === 1
                        ? '1 day'
                        : `~${doc.prepTimeDays}d`
                      : null;
                    const subSt = getSubmissionStatus(doc.id);
                    const subStep = SUBMISSION_STEPS[stepIndex(subSt)];

                    return (
                      <div
                        key={doc.id}
                        onClick={() => navigate(`/documents/${doc.id}`)}
                        style={{
                          background: '#fff',
                          border: `1px solid ${cfg.border}`,
                          borderLeft: `3px solid ${cfg.color}`,
                          borderRadius: '10px',
                          padding: '14px 16px',
                          cursor: 'pointer',
                          transition: 'box-shadow 0.12s, transform 0.12s',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.10)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: '8px',
                            marginBottom: '4px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '13px',
                              fontWeight: 600,
                              color: '#1A1D23',
                              lineHeight: '1.4',
                            }}
                          >
                            {doc.title}
                          </div>
                          <StatusBadge status={doc.status} />
                        </div>

                        <div style={{ fontSize: '11px', color: '#9AA3AF', marginBottom: '8px' }}>
                          {doc.category.replace(/^[A-Z]\) /, '')}
                        </div>

                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {prepWeeks && (
                            <span
                              style={{
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 600,
                                background: cfg.bg,
                                color: cfg.color,
                              }}
                            >
                              {prepWeeks}
                            </span>
                          )}
                          {doc.maxAgeDays != null && (
                            <span
                              style={{
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 600,
                                background: '#FFF8E1',
                                color: '#E65100',
                              }}
                            >
                              valid {doc.maxAgeDays}d
                            </span>
                          )}
                          {(doc.dependencies ?? []).length > 0 && (
                            <span
                              style={{
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 600,
                                background: '#F0F2F5',
                                color: '#5F6B7A',
                              }}
                            >
                              {doc.dependencies!.length} prereq
                              {doc.dependencies!.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>

                        {/* Submission status strip */}
                        <div
                          style={{
                            marginTop: '10px',
                            paddingTop: '8px',
                            borderTop: '1px solid #F0F2F5',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: subStep.color,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: subStep.color,
                            }}
                          >
                            {subStep.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Summary bar */}
          <div
            style={{
              marginTop: '8px',
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
                <div
                  style={{
                    fontSize: '11px',
                    color: '#9AA3AF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '4px',
                  }}
                >
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

export default TimelinePage;
