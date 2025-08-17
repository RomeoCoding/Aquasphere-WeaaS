import React, { useState, useEffect, useMemo } from 'react';
import { Project, Page, Theme, Simulation } from './types';
import { MOCK_PROJECTS } from './constants';

// Page Components
import DashboardPage from './components/dashboard/DashboardPage';
import ProjectWorkspacePage from './components/project/ProjectWorkspacePage';
import SimulationStudioPage from './components/studio/SimulationStudioPage';
import AssetLibraryPage from './components/asset-library/AssetLibraryPage';
import TeamSettingsPage from './components/team-settings/TeamSettingsPage';
import BillingPage from './components/billing/BillingPage';
import ProfilePage from './components/profile/ProfilePage';
import SettingsPage from './components/settings/SettingsPage';

// Layout
import MainLayout from './components/layout/MainLayout';

// Public Site Components
import PublicHeader from './components/public/PublicHeader';
import PublicFooter from './components/public/PublicFooter';
import HomePage from './components/public/HomePage';
import RequestDemoPage from './components/public/RequestDemoPage';
import TechnologyPage from './components/public/TechnologyPage';
import LegalPage from './components/public/LegalPage';
import CookieBanner from './components/public/CookieBanner';
import PricingPage from './components/public/PricingPage';
import AboutUsPage from './components/public/AboutUsPage';

// Auth Components
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import VerifyEmailPage from './components/auth/VerifyEmailPage';

// UI Components
import LoadingIndicator from './components/ui/LoadingIndicator';


export enum AppView {
  PUBLIC,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  VERIFY_EMAIL,
  AUTHENTICATED,
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.PUBLIC);
  const [publicPage, setPublicPage] = useState<string>('home');
  const [currentPage, setCurrentPage] = useState<Page>('Projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSimulation, setActiveSimulation] = useState<Simulation | null>(null);
  const [isStudio, setIsStudio] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');
    return (storedTheme as Theme) || 'dark';
  });

  useEffect(() => {
    // Simulate checking auth status, e.g., from a token in localStorage
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if(isLoggedIn) {
      setCurrentView(AppView.AUTHENTICATED);
    }
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const filteredProjects = useMemo(() => {
    if (!searchQuery) return MOCK_PROJECTS;
    return MOCK_PROJECTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    setCurrentView(AppView.AUTHENTICATED);
    setCurrentPage('Projects');
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setSelectedProject(null);
    setIsStudio(false);
    setActiveSimulation(null);
    setCurrentView(AppView.PUBLIC);
    setPublicPage('home');
  }

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage('Projects'); // Context is a project, but it's not a named page
    setIsStudio(false);
    setActiveSimulation(null);
  };
  
  const handleOpenStudio = (simulation?: Simulation) => {
    if (!selectedProject) return;
    setActiveSimulation(simulation || null);
    setIsStudio(true);
  };

  const navigateToDashboard = () => {
    setSelectedProject(null);
    setIsStudio(false);
    setActiveSimulation(null);
    setCurrentPage('Projects');
  }
  
  const handleNavigate = (page: Page) => {
    // When navigating from a project context, we reset it
    if(selectedProject || isStudio) {
      setSelectedProject(null);
      setIsStudio(false);
      setActiveSimulation(null);
    }
    setCurrentPage(page);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary-bg">
        <LoadingIndicator />
      </div>
    );
  }
  
  const renderCoreAppContent = () => {
    if (isStudio && selectedProject) {
        return <SimulationStudioPage 
            project={selectedProject} 
            simulation={activeSimulation}
            theme={theme}
            setTheme={setTheme}
        />;
    }

    if (selectedProject) {
        return <ProjectWorkspacePage project={selectedProject} onOpenStudio={handleOpenStudio} />;
    }
    
    switch(currentPage) {
        case 'Dashboard':
        case 'Projects':
            return <DashboardPage projects={filteredProjects} onSelectProject={handleSelectProject} />;
        case 'Asset Library':
            return <AssetLibraryPage />;
        case 'Team Settings':
            return <TeamSettingsPage />;
        case 'Billing':
            return <BillingPage />;
        case 'Profile':
            return <ProfilePage />;
        case 'Settings':
            return <SettingsPage currentTheme={theme} setTheme={setTheme} />;
        default:
            return <DashboardPage projects={filteredProjects} onSelectProject={handleSelectProject} />;
    }
  }
  
  const renderPublicContent = () => {
      let pageContent;
      switch(publicPage) {
          case 'home': pageContent = <HomePage setPage={setPublicPage} />; break;
          case 'demo': pageContent = <RequestDemoPage />; break;
          case 'technology': pageContent = <TechnologyPage />; break;
          case 'pricing': pageContent = <PricingPage onSignUp={() => setCurrentView(AppView.REGISTER)} />; break;
          case 'about': pageContent = <AboutUsPage />; break;
          case 'privacy': pageContent = <LegalPage page='privacy' />; break;
          case 'terms': pageContent = <LegalPage page='terms' />; break;
          default: pageContent = <HomePage setPage={setPublicPage} />;
      }

      return (
         <div className="bg-primary-bg min-h-screen flex flex-col font-sans">
            <PublicHeader setPage={setPublicPage} onSignInClick={() => setCurrentView(AppView.LOGIN)} onSignUpClick={() => setCurrentView(AppView.REGISTER)} theme={theme} setTheme={setTheme} />
            <main className="flex-1">{pageContent}</main>
            <PublicFooter setPage={setPublicPage} />
            <CookieBanner />
        </div>
      )
  }

  switch(currentView) {
    case AppView.PUBLIC:
      return renderPublicContent();
    case AppView.LOGIN:
      return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => setCurrentView(AppView.REGISTER)} onNavigateToForgotPassword={() => setCurrentView(AppView.FORGOT_PASSWORD)} />;
    case AppView.REGISTER:
        return <RegisterPage onRegisterSuccess={() => setCurrentView(AppView.VERIFY_EMAIL)} onNavigateToLogin={() => setCurrentView(AppView.LOGIN)} />;
    case AppView.VERIFY_EMAIL:
        return <VerifyEmailPage onNavigateToLogin={() => setCurrentView(AppView.LOGIN)} />;
    case AppView.FORGOT_PASSWORD:
        return <ForgotPasswordPage onNavigateToLogin={() => setCurrentView(AppView.LOGIN)} />;
    case AppView.AUTHENTICATED:
      return (
        <MainLayout 
            activePage={currentPage} 
            onNavigate={handleNavigate}
            navigateToDashboard={navigateToDashboard}
            onLogout={handleLogout}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            theme={theme}
            setTheme={setTheme}
            project={selectedProject}
            isStudio={isStudio}
            simulation={activeSimulation}
        >
            {renderCoreAppContent()}
        </MainLayout>
      );
    default:
        return renderPublicContent();
  }
};

export default App;
