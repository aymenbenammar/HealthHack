import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TimelinePage from './pages/TimelinePage';
import DocumentsPage from './pages/DocumentsPage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import DocumentGuidelinesPage from './pages/DocumentGuidelinesPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/timeline" replace />} />
      <Route path="/timeline" element={<TimelinePage />} />
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="/documents/:id" element={<DocumentDetailPage />} />
      <Route path="/documents/:id/guidelines" element={<DocumentGuidelinesPage />} />
      <Route path="*" element={<Navigate to="/timeline" replace />} />
    </Routes>
  );
};

export default App;
