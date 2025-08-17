import React from 'react';
import Icon from '../ui/Icon';
import { ICONS } from '../../constants';
import { Page } from '../../types';

const navItems: { name: Page; icon: keyof typeof ICONS }[] = [
  { name: 'Projects', icon: 'folder' },
  { name: 'Asset Library', icon: 'grid' },
  { name: 'Team Settings', icon: 'users' },
  { name: 'Billing', icon: 'card' },
];

interface SideBarProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ activePage, onNavigate, isCollapsed, setIsCollapsed }) => {
  return (
    <aside className={`bg-primary-bg border-r border-border flex flex-col fixed top-16 h-[calc(100vh-64px)] z-40 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.name)}
            title={isCollapsed ? item.name : undefined}
            className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 text-left group relative ${
              activePage === item.name || (activePage === 'Dashboard' && item.name === 'Projects')
                ? 'bg-primary-accent text-white shadow-lg'
                : 'text-text-secondary hover:bg-secondary-bg hover:text-text-primary'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <Icon name={item.icon} className={`w-5 h-5 transition-all ${!isCollapsed ? 'mr-3' : ''}`} />
            <span className={`font-medium transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>{item.name}</span>
            {isCollapsed && (
              <span className="absolute left-full ml-4 px-2 py-1 bg-secondary-bg text-text-primary text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.name}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center px-4 py-2.5 rounded-lg text-text-secondary hover:bg-secondary-bg hover:text-text-primary"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
             <Icon name={isCollapsed ? "arrow" : "back"} className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? "transform -rotate-180" : ""}`} />
            <span className={`font-medium ml-3 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>{isCollapsed ? '' : 'Collapse'}</span>
          </button>
      </div>
    </aside>
  );
};

export default SideBar;