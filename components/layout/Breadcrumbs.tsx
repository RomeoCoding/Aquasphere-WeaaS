import React from 'react';
import { Project, Simulation } from '../../types';
import Icon from '../ui/Icon';

interface BreadcrumbsProps {
  project: Project | null;
  isStudio: boolean;
  simulation: Simulation | null;
  onNavigateToDashboard: () => void;
  onNavigateToProject: () => void;
}

const Crumb: React.FC<{ children: React.ReactNode; onClick?: () => void; isLast?: boolean }> = ({ children, onClick, isLast = false }) => {
  const commonClasses = "text-sm font-medium";
  if (isLast) {
    return <span className={`${commonClasses} text-text-primary`}>{children}</span>;
  }
  return (
    <button onClick={onClick} className={`${commonClasses} text-text-secondary hover:text-text-primary`}>
      {children}
    </button>
  );
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ project, isStudio, simulation, onNavigateToDashboard, onNavigateToProject }) => {
  if (!project) return null; // Only show breadcrumbs when in a project context or deeper

  return (
    <nav className="flex items-center space-x-2" aria-label="Breadcrumb">
      <Crumb onClick={onNavigateToDashboard}>Dashboard</Crumb>
      
      <Icon name="arrow" className="w-4 h-4 text-text-secondary transform -rotate-180" />
      <Crumb onClick={onNavigateToProject} isLast={!isStudio}>
        {project.name}
      </Crumb>
      
      {isStudio && (
        <>
          <Icon name="arrow" className="w-4 h-4 text-text-secondary transform -rotate-180" />
          {simulation ? (
            <Crumb isLast>Results: {simulation.name}</Crumb>
          ) : (
            <Crumb isLast>Studio</Crumb>
          )}
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
