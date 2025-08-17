import React, { useState, useEffect } from 'react';
import TopNavBar from './TopNavBar';
import SideBar from './SideBar';
import CollaborationPanel from '../collaboration/CollaborationPanel';
import { Page, Theme, Project } from '../../types';

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  project: Project | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activePage, 
  onNavigate, 
  onLogout, 
  searchQuery, 
  setSearchQuery, 
  theme, 
  setTheme,
  project
}) => {
  const [isCollaborationPanelCollapsed, setIsCollaborationPanelCollapsed] = useState(true);

  // Determine if we're in a project context where the standard sidebar should be hidden
  const isProjectWorkspace = !!project;

  return (
    <div className="flex min-h-screen">
      {!isProjectWorkspace && <SideBar activePage={activePage} onNavigate={onNavigate} />}
      <div className={`flex-1 transition-all duration-300 ${isProjectWorkspace ? '' : 'ml-64'} ${!isCollaborationPanelCollapsed ? 'mr-[400px]' : 'mr-16'}`}>
        <TopNavBar 
          onLogout={onLogout} 
          onNavigate={onNavigate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hideSearch={isProjectWorkspace}
          theme={theme}
          setTheme={setTheme}
        />
        <main className="p-8 pt-24">
          {children}
        </main>
      </div>
      <CollaborationPanel
        project={project}
        isCollapsed={isCollaborationPanelCollapsed}
        setIsCollapsed={setIsCollaborationPanelCollapsed}
      />
    </div>
  );
};

export default MainLayout;