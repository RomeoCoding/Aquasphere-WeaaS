
import React from 'react';
import { Simulation } from '../../types';
import SimulationCard from './SimulationCard';
import Icon from '../ui/Icon';

interface SimulationsTabProps {
  simulations: Simulation[];
  onViewResults: (simulation: Simulation) => void;
}

const SimulationsTab: React.FC<SimulationsTabProps> = ({ simulations, onViewResults }) => {
  return (
    <div>
      <div className="space-y-4">
        {simulations.length > 0 ? (
          simulations.map(sim => <SimulationCard key={sim.id} simulation={sim} onViewResults={onViewResults} />)
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
             <Icon name="folder" className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h4 className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-400">No Simulations Yet</h4>
            <p className="text-gray-500 mt-1">Open the Studio to create your first simulation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationsTab;