import React, { useState, useRef, useEffect } from 'react';
import Icon from '../ui/Icon';
import { Page, Theme, Project, Simulation } from '../../types';
import Breadcrumbs from './Breadcrumbs';

interface TopNavBarProps {
    onLogout: () => void;
    onNavigate: (page: Page) => void;
    navigateToDashboard: () => void;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    hideSearch?: boolean;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    project: Project | null;
    isStudio: boolean;
    simulation: Simulation | null;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ 
    onLogout, 
    onNavigate,
    navigateToDashboard,
    searchQuery, 
    setSearchQuery, 
    hideSearch = false, 
    theme, 
    setTheme,
    project,
    isStudio,
    simulation
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigateToProject = () => {
    if (project) {
        // This is a bit of a hack. In a real router, you'd navigate to `/projects/${project.id}`
        // For our state machine, we just need to exit studio mode.
        onNavigate('Projects'); // This will reset the view in App.tsx
        onNavigate(project.id as any); // This is a trick to re-select the project
    }
  }

  return (
    <header className="bg-primary-bg/80 backdrop-blur-lg border-b border-border h-16 flex items-center px-6 flex-shrink-0 z-50">
      <div className="flex items-center space-x-4">
        <button onClick={navigateToDashboard} className="flex items-center space-x-3 group">
            <div className="w-8 h-8 text-primary-accent group-hover:opacity-80 transition-opacity">
                <Icon name="logo" />
            </div>
            <h1 className="text-xl font-bold text-text-primary group-hover:opacity-80 transition-opacity">AuraSphere</h1>
        </button>
      </div>

       <div className="w-px h-6 bg-border mx-4"></div>
        
       <Breadcrumbs 
            project={project}
            isStudio={isStudio}
            simulation={simulation}
            onNavigateToDashboard={navigateToDashboard}
            onNavigateToProject={() => onNavigate('Projects')} // A simplified way to get back
       />
      
      {hideSearch ? <div className="flex-1" /> : (
        <div className="flex-1 flex justify-center px-12">
            <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="search" className="w-5 h-5 text-text-secondary" />
                </div>
                <input 
                    type="text" 
                    placeholder="Search projects..."
                    value={searchQuery || ''}
                    onChange={(e) => setSearchQuery?.(e.target.value)}
                    className="w-full bg-secondary-bg border border-border rounded-md py-2 pl-10 pr-4 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                />
            </div>
        </div>
      )}
      
      <div className="flex items-center space-x-5">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-text-secondary hover:text-primary-accent transition-colors"
          title="Toggle theme"
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-6 h-6"/>
        </button>
        <button className="text-text-secondary hover:text-primary-accent transition-colors" title="Help">
          <Icon name="help" className="w-6 h-6"/>
        </button>
        <button className="text-text-secondary hover:text-primary-accent transition-colors" title="Notifications">
          <Icon name="bell" className="w-6 h-6"/>
        </button>
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" className="w-9 h-9 rounded-full border-2 border-border hover:border-primary-accent transition-colors" />
            </button>
            {isMenuOpen && (
                 <div className="absolute right-0 top-full mt-2 w-48 bg-secondary-bg border border-border rounded-md shadow-lg z-50">
                    <div className="p-2 border-b border-border">
                         <p className="text-sm font-semibold text-text-primary">Alice</p>
                         <p className="text-xs text-text-secondary truncate">demo@aurasphere.io</p>
                    </div>
                    <button onClick={() => { onNavigate('Profile'); setIsMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-text-primary hover:bg-border">Profile</button>
                    <button onClick={() => { onNavigate('Settings'); setIsMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-text-primary hover:bg-border">Settings</button>
                    <button onClick={onLogout} className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-border border-t border-border">Logout</button>
                 </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
