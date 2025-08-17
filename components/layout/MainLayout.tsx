import React, { useState, useEffect } from 'react';
import TopNavBar from './TopNavBar';
import SideBar from './SideBar';
import CollaborationPanel from '../collaboration/CollaborationPanel';
import { Page, Theme, Project, Simulation } from '../../types';

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
  navigateToDashboard: () => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  project: Project | null;
  isStudio: boolean;
  simulation: Simulation | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activePage, 
  onNavigate,
  navigateToDashboard,
  onLogout, 
  searchQuery, 
  setSearchQuery, 
  theme, 
  setTheme,
  project,
  isStudio,
  simulation
}) => {
  const [isCollaborationPanelCollapsed, setIsCollaborationPanelCollapsed] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // The sidebar is shown if we are not in any project context (dashboard-level pages)
  const showSidebar = !project && !isStudio;

  return (
    <div className="h-screen flex flex-col bg-primary-bg text-text-primary">
        <TopNavBar 
          onLogout={onLogout} 
          onNavigate={onNavigate}
          navigateToDashboard={navigateToDashboard}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hideSearch={!!project} // Hide search when inside a project
          theme={theme}
          setTheme={setTheme}
          project={project}
          isStudio={isStudio}
          simulation={simulation}
        />
        <div className="flex flex-1 overflow-hidden">
             {showSidebar && <SideBar activePage={activePage} onNavigate={onNavigate} isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />}
            <main className={`flex-1 overflow-y-auto transition-all duration-300 ${showSidebar ? (isSidebarCollapsed ? 'ml-20' : 'ml-64') : ''}`}>
                 {/* On non-studio pages, we provide padding. Studio page handles its own layout. */}
                <div className={isStudio ? "h-full" : "p-8"}>
                    {children}
                </div>
            </main>
            <CollaborationPanel
                project={project}
                isCollapsed={isCollaborationPanelCollapsed}
                setIsCollapsed={setIsCollaborationPanelCollapsed}
            />
        </div>
    </div>
  );
};

export default MainLayout;