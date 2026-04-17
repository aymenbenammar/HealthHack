import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const RoadmapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3" />
  </svg>
);

const DocumentsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);


interface SidebarProps {
  activePage?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { label: t.myRoadmap, path: '/timeline', icon: <RoadmapIcon /> },
    { label: t.myDocuments, path: '/documents', icon: <DocumentsIcon /> },
  ];

  const isActive = (path: string) => {
    if (activePage) {
      return activePage === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '260px',
        height: '100vh',
        background: '#ffffff',
        borderRight: '1px solid #E0E4EA',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '24px',
          borderBottom: '1px solid #E0E4EA',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.3px',
          }}
        >
          <span style={{ color: '#F79D25' }}>Get2</span>
          <span style={{ color: '#85CAE2' }}>Germany</span>
        </span>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 0', flex: 1 }}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 20px',
                paddingLeft: active ? '17px' : '20px',
                background: active ? '#EBF3FF' : 'transparent',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                borderLeft: active ? '3px solid #85CAE2' : '3px solid transparent',
                color: active ? '#85CAE2' : '#5F6B7A',
                fontSize: '14px',
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
                textAlign: 'left',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.background = '#F5F7FA';
                  (e.currentTarget as HTMLButtonElement).style.color = '#1A1D23';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = '#5F6B7A';
                }
              }}
            >
              <span style={{ opacity: active ? 1 : 0.75 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '16px 24px',
          borderTop: '1px solid #E0E4EA',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        
      </div>
    </aside>
  );
};

export default Sidebar;
