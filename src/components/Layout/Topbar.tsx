import { Menu, Sun, Moon, Shield, Eye } from 'lucide-react';
import { useStore } from '../../store';

interface TopbarProps {
  toggleSidebar: () => void;
}

export const Topbar = ({ toggleSidebar }: TopbarProps) => {
  const { theme, setTheme, role, setRole } = useStore();

  const handleRoleToggle = () => {
    setRole(role === 'Admin' ? 'Viewer' : 'Admin');
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-btn menu-toggle" onClick={toggleSidebar} aria-label="Toggle Menu">
          <Menu size={20} />
        </button>
      </div>
      
      <div className="topbar-right">
        {/* Role Switcher */}
        <button 
          className="icon-btn" 
          onClick={handleRoleToggle}
          title={`Switch Role (Current: ${role})`}
          aria-label="Switch Role"
        >
           {role === 'Admin' ? <Shield size={18} /> : <Eye size={18} />}
           <span style={{ fontSize: '0.8rem', marginLeft: '6px', fontWeight: 600 }}>
             {role}
           </span>
        </button>

        {/* Theme Switcher */}
        <button 
          className="icon-btn" 
          onClick={handleThemeToggle}
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        {/* User Avatar Placeholder */}
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', 
          background: 'var(--accent-primary)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', color: '#fff',
          fontWeight: 600, fontSize: '14px', marginLeft: '0.5rem'
        }}>
          U
        </div>
      </div>
    </header>
  );
};
