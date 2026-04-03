import { LayoutDashboard, ArrowLeftRight, Wallet } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Sidebar = ({ isOpen, currentPath, onNavigate }: SidebarProps) => {
  const navItems = [
    { name: 'Dashboard', path: 'dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: 'transactions', icon: ArrowLeftRight },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <Wallet size={28} className="text-accent" style={{ color: 'var(--accent-primary)' }} />
        <span>FinDash</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
              onClick={() => onNavigate(item.path)}
              aria-label={item.name}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
