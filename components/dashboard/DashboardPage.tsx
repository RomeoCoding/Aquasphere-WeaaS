
import React, { useState } from 'react';
import { Project } from '../../types';
import ProjectCard from './ProjectCard';
import Button from '../ui/Button';

interface DashboardPageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ projects, onSelectProject }) => {
  const [showTour, setShowTour] = useState(true);

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <div className="relative">
            <Button variant="primary" icon="plus">
                New Project
            </Button>
            {showTour && (
                <div className="absolute top-full right-0 mt-2 p-3 bg-indigo-500 text-white rounded-lg shadow-lg text-sm w-60 z-10">
                    <p className="font-semibold">Welcome to AuraSphere!</p>
                    <p>Let's create your first project to get started.</p>
                    <button onClick={() => setShowTour(false)} className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-700 rounded-full text-xs">&times;</button>
                    <div className="absolute bottom-full right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-indigo-500"></div>
                </div>
            )}
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.length > 0 ? projects.map(project => (
            <ProjectCard key={project.id} project={project} onSelectProject={onSelectProject} />
        )) : (
            <div className="col-span-full text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400">No Projects Found</h4>
                <p className="text-gray-500 mt-1">Your search did not match any projects.</p>
            </div>
        )}
        </div>
    </div>
  );
};

export default DashboardPage;