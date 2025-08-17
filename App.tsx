import React, { useState, useEffect, useMemo } from 'react';
import { Project, Simulation, SimulationStatus, Page, Theme } from './types';
import { MOCK_PROJECTS } from './constants';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import ProjectWorkspacePage from './components/project/ProjectWorkspacePage';
import SimulationStudioPage from './components/studio/SimulationStudioPage';
import AssetLibraryPage from './components/asset-library/AssetLibraryPage';
import TeamSettingsPage from './components/team-settings/TeamSettingsPage';
import BillingPage from './components/billing/BillingPage';
import MainLayout from './components/layout/MainLayout';
import ProfilePage from './components/profile/ProfilePage';
import SettingsPage from './components/settings/SettingsPage';


export enum AppView {
  LOGIN,
  AUTHENTICATED,
  PROJECT_WORKSPACE,
  SIMULATION_STUDIO,
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [currentPage, setCurrentPage] = useState<Page>('Projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialStudioIsResultsView, setInitialStudioIsResultsView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme as Theme;
    // If no theme is stored, default to dark and set it in localStorage
    localStorage.setItem('theme', 'dark');
    return 'dark';
  });


  useEffect(() => {
    // Simulate checking auth status
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const filteredProjects = useMemo(() => {
    if (!searchQuery) return MOCK_PROJECTS;
    return MOCK_PROJECTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleLogin = () => {
    setCurrentView(AppView.AUTHENTICATED);
    setCurrentPage('Projects');
  };
  
  const handleLogout = () => {
    setSelectedProject(null);
    setCurrentView(AppView.LOGIN);
  }

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView(AppView.PROJECT_WORKSPACE);
  };
  
  const handleOpenStudio = (simulation?: Simulation) => {
    setInitialStudioIsResultsView(!!simulation && simulation.status === SimulationStatus.Completed);
    setCurrentView(AppView.SIMULATION_STUDIO);
  };

  const navigateToDashboard = () => {
    setSelectedProject(null);
    setCurrentView(AppView.AUTHENTICATED);
    setCurrentPage('Projects');
  }
  
  const handleNavigate = (page: Page) => {
    setSelectedProject(null);
    setCurrentPage(page);
    setCurrentView(AppView.AUTHENTICATED);
  }

  const navigateBack = () => {
    if (currentView === AppView.SIMULATION_STUDIO) {
      setCurrentView(AppView.PROJECT_WORKSPACE);
    } else if (currentView === AppView.PROJECT_WORKSPACE) {
      navigateToDashboard();
    } else {
        // From a standard page, go back to projects dashboard
        handleNavigate('Projects');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary-bg">
        <div className="text-text-primary text-xl">Loading AuraSphere...</div>
      </div>
    );
  }
  
  const renderAuthenticatedView = () => {
    let content;
    // The "Dashboard" nav item is functionally the same as "Projects" in this design
    if (currentPage === 'Dashboard' || currentPage === 'Projects') {
        content = <DashboardPage projects={filteredProjects} onSelectProject={handleSelectProject} />
    } else if (currentPage === 'Asset Library') {
        content = <AssetLibraryPage />;
    } else if (currentPage === 'Team Settings') {
        content = <TeamSettingsPage />;
    } else if (currentPage === 'Billing') {
        content = <BillingPage />;
    } else if (currentPage === 'Profile') {
        content = <ProfilePage />;
    } else if (currentPage === 'Settings') {
        content = <SettingsPage currentTheme={theme} setTheme={setTheme} />;
    }
    
    return (
        <MainLayout 
            activePage={currentPage} 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            theme={theme}
            setTheme={setTheme}
            project={selectedProject}
        >
            {content}
        </MainLayout>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case AppView.LOGIN:
        return <LoginPage onLogin={handleLogin} />;
      
      case AppView.AUTHENTICATED:
          return renderAuthenticatedView();

      case AppView.PROJECT_WORKSPACE:
        return selectedProject ? (
          <MainLayout 
            activePage={currentPage} 
            onNavigate={handleNavigate} 
            onLogout={handleLogout} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            theme={theme} 
            setTheme={setTheme}
            project={selectedProject}
          >
            <ProjectWorkspacePage project={selectedProject} onOpenStudio={handleOpenStudio} onBack={navigateBack} />
          </MainLayout>
        ) : (navigateToDashboard(), null);

      case AppView.SIMULATION_STUDIO:
        return selectedProject ? (
            <SimulationStudioPage 
                project={selectedProject} 
                onBack={navigateBack}
                onLogout={handleLogout}
                onNavigate={handleNavigate}
                initialIsResultsView={initialStudioIsResultsView}
                theme={theme}
                setTheme={setTheme}
            />
        ) : (navigateToDashboard(), null);

      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return <div className="min-h-screen bg-primary-bg">{renderContent()}</div>;
};

export default App;