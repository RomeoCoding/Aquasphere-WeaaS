import React, { useState } from 'react';
import { Project, Simulation } from '../../types';
import Button from '../ui/Button';
import ScansTab from './ScansTab';
import SimulationsTab from './SimulationsTab';
import NotificationsTab from './NotificationsTab';
import Icon from '../ui/Icon';
import { MOCK_NOTIFICATIONS } from '../../constants';

interface ProjectWorkspacePageProps {
  project: Project;
  onOpenStudio: (simulation?: Simulation) => void;
  onBack: () => void;
}

type ProjectTab = 'notifications' | 'scans' | 'simulations';

const ProjectWorkspacePage: React.FC<ProjectWorkspacePageProps> = ({ project, onOpenStudio, onBack }) => {
  const [activeTab, setActiveTab] = useState<ProjectTab>('notifications');

  const tabs: { id: ProjectTab, label: string }[] = [
    { id: 'notifications', label: 'Notifications' },
    { id: 'scans', label: 'Scans & Data' },
    { id: 'simulations', label: 'Simulations' },
  ];
  
  const handleViewResults = (simulation: Simulation) => {
    onOpenStudio(simulation);
  };

  return (
    <div>
          <header className="mb-8">
            <button onClick={onBack} className="flex items-center text-sm text-primary-accent hover:opacity-80 mb-4">
                <Icon name="back" className="w-4 h-4 mr-2" />
                Back to Projects
            </button>
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">{project.name}</h1>
                    <p className="text-text-secondary mt-1">Client: {project.client}</p>
                </div>
                <Button variant="primary" onClick={() => onOpenStudio()}>
                    Open in Studio
                </Button>
            </div>
          </header>

          <div className="border-b border-border mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-accent text-primary-accent'
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:border-text-secondary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            {activeTab === 'scans' && <ScansTab scans={project.scans} />}
            {activeTab === 'simulations' && (
              <SimulationsTab 
                simulations={project.simulations} 
                onViewResults={handleViewResults}
              />
            )}
            {activeTab === 'notifications' && <NotificationsTab notifications={MOCK_NOTIFICATIONS} />}
          </div>
    </div>
  );
};

export default ProjectWorkspacePage;