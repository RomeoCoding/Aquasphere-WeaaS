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
}

const SideBar: React.FC<SideBarProps> = ({ activePage, onNavigate }) => {
  return (
    <div className="w-64 bg-primary-bg border-r border-border pt-20 flex flex-col fixed h-full">
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.name)}
            className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 text-left ${
              activePage === item.name || (activePage === 'Dashboard' && item.name === 'Projects')
                ? 'bg-primary-accent text-white shadow-lg'
                : 'text-text-secondary hover:bg-secondary-bg hover:text-text-primary'
            }`}
          >
            <Icon name={item.icon} className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;