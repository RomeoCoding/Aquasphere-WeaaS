import React from 'react';
import { SimulationLog } from '../../types';
import Icon from '../ui/Icon';

interface SimulationProgressOverlayProps {
  logs: SimulationLog[];
  progress: number;
}

const SimulationProgressOverlay: React.FC<SimulationProgressOverlayProps> = ({ logs, progress }) => {
  return (
    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-2xl border border-gray-700 p-6 flex flex-col text-gray-200">
        <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 text-indigo-400 animate-pulse">
                <Icon name="logo" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white">Running Simulation...</h2>
                <p className="text-sm text-gray-400">Computational engine is processing your request.</p>
            </div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
          <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="w-full h-48 bg-black rounded-md p-3 font-mono text-xs overflow-y-auto">
          {logs.map(log => (
            <p key={log.id} className="whitespace-pre-wrap">
              <span className="text-gray-500 mr-2">{`[${log.stage}]`}</span>
              <span className={log.stage === 'SIMULATION' ? 'text-indigo-400' : 'text-gray-300'}>{log.message}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationProgressOverlay;
