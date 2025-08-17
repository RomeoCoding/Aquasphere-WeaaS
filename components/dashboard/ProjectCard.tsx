import React, { useState, useRef, useEffect } from 'react';
import { Project, SimulationStatus } from '../../types';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const runningSimulations = project.simulations.filter(s => s.status === SimulationStatus.Running).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Card className="p-6 flex flex-col justify-between group hover:shadow-glow hover:border-primary-accent/50 hover:-translate-y-1">
      <div>
        <h3 className="text-xl font-bold text-text-primary truncate">{project.name}</h3>
        <p className="text-sm text-text-secondary mb-4">Client: {project.client}</p>
        
        <div className="flex -space-x-2 mb-4">
          {project.team.slice(0, 4).map(user => (
            <img 
              key={user.id} 
              src={user.avatarUrl} 
              alt={user.name} 
              title={user.name}
              className="w-8 h-8 rounded-full border-2 border-secondary-bg"
            />
          ))}
          {project.team.length > 4 && (
            <div className="w-8 h-8 rounded-full bg-border border-2 border-secondary-bg flex items-center justify-center text-xs font-semibold text-text-secondary">
              +{project.team.length - 4}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-text-secondary border-t border-border pt-4">
            <span>{project.scans.length} Scan{project.scans.length !== 1 ? 's' : ''}</span>
            <span className="w-px h-4 bg-border"></span>
            <div className="flex items-center">
                <span>{project.simulations.length} Sim{project.simulations.length !== 1 ? 's' : ''}</span>
                {runningSimulations > 0 && (
                    <div className="ml-2 flex items-center space-x-1.5 text-primary-accent">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-accent/75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-accent"></span>
                        </span>
                        <span className="text-xs">{runningSimulations} Running</span>
                    </div>
                )}
            </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button onClick={() => onSelectProject(project)} variant="primary" className="w-full">
            Open
        </Button>
        <div className="relative" ref={menuRef}>
          <Button variant="secondary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon name="dots" className="w-5 h-5" />
          </Button>
          {isMenuOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-secondary-bg border border-border rounded-md shadow-lg z-10">
              <a href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-border">Rename</a>
              <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-border">Archive</a>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;