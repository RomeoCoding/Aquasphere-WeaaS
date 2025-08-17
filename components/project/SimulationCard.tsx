
import React from 'react';
import { Simulation, SimulationStatus } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface SimulationCardProps {
  simulation: Simulation;
  onViewResults: (simulation: Simulation) => void;
}

const StatusBadge: React.FC<{ status: SimulationStatus }> = ({ status }) => {
  const statusStyles = {
    [SimulationStatus.Completed]: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300',
    [SimulationStatus.Running]: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300',
    [SimulationStatus.Draft]: 'bg-gray-200 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300',
  };

  const dotStyles = {
    [SimulationStatus.Completed]: 'bg-green-500',
    [SimulationStatus.Running]: 'bg-blue-500 animate-ping',
    [SimulationStatus.Draft]: 'bg-gray-500',
  };

  return (
    <div className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
        <span className={`w-2 h-2 mr-2 rounded-full ${dotStyles[status]}`}></span>
        {status}
    </div>
  );
};

const SimulationCard: React.FC<SimulationCardProps> = ({ simulation, onViewResults }) => {
  return (
    <Card className="p-4 group">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{simulation.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{simulation.description}</p>
                 {simulation.objective && <p className="text-xs text-indigo-600 dark:text-indigo-300 mt-2 font-mono">Goal: {simulation.objective}</p>}
            </div>
            <StatusBadge status={simulation.status} />
        </div>
        {simulation.status === SimulationStatus.Completed && (
             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="primary" onClick={() => onViewResults(simulation)}>
                    View Results
                </Button>
            </div>
        )}
    </Card>
  );
};

export default SimulationCard;