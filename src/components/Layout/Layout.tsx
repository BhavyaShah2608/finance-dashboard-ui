import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useStore } from '../../store';
import './Layout.css';

export const Layout = ({ children, currentPath, onNavigate }: { children: ReactNode, currentPath: string, onNavigate: (path: string) => void }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Simulated simple routing instead of React Router to keep things light
  return (
    <div className="layout-container">
      <Sidebar 
        isOpen={isSidebarOpen} 
        currentPath={currentPath}
        onNavigate={(path) => {
          onNavigate(path);
          setSidebarOpen(false);
        }}
      />
      <div className={`mobile-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>
      
      <div className="layout-content">
        <Topbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <main className="layout-main animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};
