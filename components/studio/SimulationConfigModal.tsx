
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface SimulationConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunch: () => void;
}

const SimulationConfigModal: React.FC<SimulationConfigModalProps> = ({ isOpen, onClose, onLaunch }) => {
  if (!isOpen) return null;

  const handleLaunch = () => {
    onLaunch();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-0 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Configure New Simulation</h3>
        </div>
        <div className="p-6 space-y-6">
            <div>
                <label htmlFor="sim-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input type="text" id="sim-name" defaultValue="Q3-2025-Coverage-Test-02" className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
             <div>
                <label htmlFor="sim-desc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea id="sim-desc" rows={3} className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">Simulating effect of adding an RIS to the east wall to cover the marketing team's new desk area.</textarea>
            </div>
             <div>
                <label htmlFor="sim-obj" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Objective Function</label>
                <select id="sim-obj" className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Maximize Minimum SNR in Zone...</option>
                    <option>Maximize Coverage &gt; -65dBm</option>
                    <option>Minimize Channel Interference</option>
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Physics Precision</label>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Quick Draft</span>
                    <span>High Fidelity</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="25" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"/>
            </div>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 flex justify-end space-x-4 rounded-b-lg">
            <Button onClick={onClose} variant="secondary">Cancel</Button>
            <Button onClick={handleLaunch} variant="primary" icon="play">Launch Simulation</Button>
        </div>
      </Card>
    </div>
  );
};

export default SimulationConfigModal;
