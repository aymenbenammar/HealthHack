import React from 'react';
import { AIAnalysisResult, AIIssue, RuleCompliance, CrossDocIssue } from '../types';

interface AIResultPanelProps {
  result: AIAnalysisResult;
}

const severityColor = (severity: AIIssue['severity']) => {
  switch (severity) {
    case 'critical':
      return { bg: '#FFEBEE', border: '#EF9A9A', text: '#C62828', badge: '#C62828', badgeBg: '#FFCDD2' };
    case 'warning':
      return { bg: '#FFFDE7', border: '#FFE082', text: '#F57F17', badge: '#F57F17', badgeBg: '#FFF9C4' };
    case 'info':
      return { bg: '#E3F2FD', border: '#90CAF9', text: '#1565C0', badge: '#1565C0', badgeBg: '#BBDEFB' };
  }
};

const ruleStatusIcon = (status: RuleCompliance['status']) => {
  switch (status) {
    case 'pass':
      return <span style={{ color: '#2E7D32', fontSize: '14px', fontWeight: 700 }}>✓</span>;
    case 'fail':
      return <span style={{ color: '#C62828', fontSize: '14px', fontWeight: 700 }}>✗</span>;
    case 'conditional':
      return <span style={{ color: '#F57F17', fontSize: '14px', fontWeight: 700 }}>~</span>;
    case 'n/a':
      return <span style={{ color: '#9AA3AF', fontSize: '14px' }}>—</span>;
  }
};

const MetadataSection: React.FC<{ metadata: AIAnalysisResult['metadata'] }> = ({ metadata }) => {
  const entries = Object.entries(metadata).filter(([, v]) => v !== undefined && v !== '');
  if (entries.length === 0) return null;

  const labelMap: Record<string, string> = {
    full_name: 'Full Name',
    date_of_birth: 'Date of Birth',
    issuing_authority: 'Issuing Authority',
    issue_date: 'Issue Date',
    document_number: 'Document Number',
    country_of_issue: 'Country of Issue',
    language: 'Language',
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#5F6B7A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
        Extracted Metadata
      </h4>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '8px',
        }}
      >
        {entries.map(([key, value]) => (
          <div
            key={key}
            style={{
              background: '#F7F8FA',
              border: '1px solid #E0E4EA',
              borderRadius: '6px',
              padding: '8px 12px',
            }}
          >
            <div style={{ fontSize: '11px', color: '#9AA3AF', marginBottom: '2px' }}>
              {labelMap[key] || key}
            </div>
            <div style={{ fontSize: '13px', color: '#1A1D23', fontWeight: 500 }}>{value as string}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IssuesSection: React.FC<{ issues: AIIssue[] }> = ({ issues }) => {
  if (issues.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          background: '#E8F5E9',
          border: '1px solid #A5D6A7',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <span style={{ color: '#2E7D32', fontSize: '18px' }}>✓</span>
        <span style={{ fontSize: '14px', color: '#2E7D32', fontWeight: 600 }}>No issues found — document looks good!</span>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#5F6B7A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
        Issues Found ({issues.length})
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {issues.map((issue, i) => {
          const colors = severityColor(issue.severity);
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 14px',
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
              }}
            >
              <div style={{ flexShrink: 0, marginTop: '1px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                    background: colors.badgeBg,
                    color: colors.badge,
                  }}
                >
                  {issue.severity}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: colors.text, fontWeight: 700, fontFamily: 'monospace', marginBottom: '3px' }}>
                  {issue.code}
                  {issue.field && (
                    <span style={{ fontWeight: 400, opacity: 0.8 }}> · {issue.field}</span>
                  )}
                </div>
                <div style={{ fontSize: '13px', color: colors.text }}>{issue.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RuleComplianceSection: React.FC<{ rules: RuleCompliance[] }> = ({ rules }) => {
  if (rules.length === 0) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#5F6B7A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
        Rule Compliance
      </h4>
      <div
        style={{
          border: '1px solid #E0E4EA',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {rules.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '10px 14px',
              background: i % 2 === 0 ? '#ffffff' : '#FAFBFC',
              borderBottom: i < rules.length - 1 ? '1px solid #F0F2F5' : 'none',
            }}
          >
            <div style={{ width: '20px', flexShrink: 0, marginTop: '1px', textAlign: 'center' }}>
              {ruleStatusIcon(r.status)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', color: '#1A1D23', fontWeight: 500 }}>{r.rule}</div>
              {r.evidence && (
                <div style={{ fontSize: '12px', color: '#9AA3AF', marginTop: '2px' }}>{r.evidence}</div>
              )}
            </div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                color:
                  r.status === 'pass'
                    ? '#2E7D32'
                    : r.status === 'fail'
                    ? '#C62828'
                    : r.status === 'conditional'
                    ? '#F57F17'
                    : '#9AA3AF',
                flexShrink: 0,
              }}
            >
              {r.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TipsSection: React.FC<{ tips: string[] }> = ({ tips }) => {
  if (tips.length === 0) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#5F6B7A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
        Tips & Recommendations
      </h4>
      <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tips.map((tip, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: '10px',
              padding: '10px 14px',
              background: '#F7F8FA',
              borderRadius: '8px',
              border: '1px solid #E0E4EA',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '16px', flexShrink: 0 }}>💡</span>
            <span style={{ fontSize: '13px', color: '#1A1D23', lineHeight: '1.5' }}>{tip}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

const CrossDocSection: React.FC<{ issues: CrossDocIssue[] }> = ({ issues }) => {
  if (!issues || issues.length === 0) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#5F6B7A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
        Cross-Document Issues
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {issues.map((issue, i) => (
          <div
            key={i}
            style={{
              padding: '12px 14px',
              background: '#FFF8E1',
              border: '1px solid #FFE082',
              borderRadius: '8px',
            }}
          >
            <div style={{ fontSize: '12px', color: '#F57F17', fontWeight: 700, fontFamily: 'monospace', marginBottom: '3px' }}>
              {issue.code}
              {issue.field && <span style={{ fontWeight: 400 }}> · {issue.field}</span>}
            </div>
            <div style={{ fontSize: '13px', color: '#795548' }}>{issue.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIResultPanel: React.FC<AIResultPanelProps> = ({ result }) => {
  const confidencePct = Math.round(result.confidence * 100);

  return (
    <div
      style={{
        marginTop: '20px',
        border: '1px solid #E0E4EA',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: '14px 20px',
          background: '#F79D25',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>✨</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>AI Analysis Results</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
              Identified as{' '}
              <span
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '1px 8px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                {result.doc_class}
              </span>
            </div>
          </div>
        </div>

        {/* Confidence */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>Confidence</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '80px',
                height: '6px',
                background: 'rgba(255,255,255,0.25)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${confidencePct}%`,
                  height: '100%',
                  background: '#fff',
                  borderRadius: '3px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              {confidencePct}%
            </span>
          </div>
        </div>
      </div>

      {/* Panel body */}
      <div style={{ padding: '20px' }}>
        <MetadataSection metadata={result.metadata} />
        <IssuesSection issues={result.issues} />
        <RuleComplianceSection rules={result.rule_compliance} />
        <TipsSection tips={result.tips} />
        <CrossDocSection issues={result.cross_doc_issues || []} />

        {/* Bundesland note */}
        {result.bundesland_note && (
          <div
            style={{
              display: 'flex',
              gap: '10px',
              padding: '12px 14px',
              background: '#E3F2FD',
              border: '1px solid #90CAF9',
              borderRadius: '8px',
            }}
          >
            <span style={{ fontSize: '16px', flexShrink: 0 }}>ℹ️</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1565C0', marginBottom: '2px' }}>
                Federal State Note
              </div>
              <div style={{ fontSize: '13px', color: '#1565C0' }}>{result.bundesland_note}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIResultPanel;
