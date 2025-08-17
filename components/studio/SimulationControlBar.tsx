
import React from 'react';
import Button from '../ui/Button';

interface SimulationControlBarProps {
    onLaunch: () => void;
    onShowConfig: () => void;
}

const SimulationControlBar: React.FC<SimulationControlBarProps> = ({ onLaunch, onShowConfig }) => {
  return (
    <div className="absolute bottom-0 left-16 right-0 h-20 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-20 flex items-center justify-between px-6">
        <div>
            <Button variant="secondary" onClick={onShowConfig}>New Simulation</Button>
        </div>
        <div>
            <Button variant="primary" icon="play" onClick={onLaunch}>LAUNCH SIMULATION</Button>
        </div>
    </div>
  );
};

export default SimulationControlBar;