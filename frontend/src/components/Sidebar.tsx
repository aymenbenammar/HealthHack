import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

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

const CommunityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ServicesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
);

const navItems: NavItem[] = [
  { label: 'My Roadmap', path: '/roadmap', icon: <RoadmapIcon /> },
  { label: 'My Documents', path: '/documents', icon: <DocumentsIcon /> },
  { label: 'Community', path: '/community', icon: <CommunityIcon /> },
  { label: 'Services', path: '/services', icon: <ServicesIcon /> },
];

interface SidebarProps {
  activePage?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
          <span style={{ color: '#E65100' }}>Get2</span>
          <span style={{ color: '#1B73E8' }}>Germany</span>
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
                borderLeft: active ? '3px solid #1B73E8' : '3px solid transparent',
                color: active ? '#1B73E8' : '#5F6B7A',
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
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1B73E8, #7C3AED)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          ZT
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1D23', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Zahra Trabelsi
          </div>
          <div style={{ fontSize: '11px', color: '#9AA3AF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            zahratrabelsi10@gmail.com
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
