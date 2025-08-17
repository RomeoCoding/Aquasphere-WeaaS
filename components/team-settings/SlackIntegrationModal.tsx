
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

interface SlackIntegrationModalProps {
  onClose: () => void;
}

const SlackIntegrationModal: React.FC<SlackIntegrationModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-0 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
                 <Icon name="logo" className="w-10 h-10 text-indigo-500" />
                 <Icon name="plus" className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                 <Icon name="slack" className="w-10 h-10 text-gray-800 dark:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Connect AuraSphere to Slack</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
                Streamline your workflow by integrating your AuraSphere projects directly with your Slack workspace.
            </p>
        </div>

        <div className="p-6 border-y border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-start space-x-3">
                <Icon name="bell" className="w-5 h-5 text-indigo-500 dark:text-indigo-400 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Automated Notifications</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive real-time updates in Slack when scans are processed, simulations are complete, or teammates comment.</p>
                </div>
            </div>
             <div className="flex items-start space-x-3">
                <Icon name="folder" className="w-5 h-5 text-indigo-500 dark:text-indigo-400 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Automatic Channel Creation</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">AuraSphere can automatically create a dedicated private channel (e.g., #proj-megacorp-tower) for each new project.</p>
                </div>
            </div>
        </div>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center space-y-4 rounded-b-lg">
           <Button variant="primary" className="w-full justify-center bg-[#4A154B] hover:bg-[#5e2d5f] focus:ring-[#4A154B]">
                <Icon name="slack" className="w-5 h-5 mr-2" />
                Add to Slack (Simulation)
           </Button>
            <Button onClick={onClose} variant="ghost">Cancel</Button>
        </div>
      </Card>
    </div>
  );
};

export default SlackIntegrationModal;