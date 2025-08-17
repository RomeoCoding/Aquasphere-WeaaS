
import React, { useState } from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import ToggleSwitch from '../ui/ToggleSwitch';
import { Theme } from '../../types';
import { ICONS } from '../../constants';

type SettingsTab = 'general' | 'notifications' | 'api';

interface SettingsPageProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

interface NotificationSettings {
    projectUpdatesEmail: boolean;
    projectUpdatesInApp: boolean;
    simulationCompleteEmail: boolean;
    simulationCompleteInApp: boolean;
    newMentionsEmail: boolean;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ currentTheme, setTheme }) => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('general');
    const [notifications, setNotifications] = useState<NotificationSettings>({
        projectUpdatesEmail: true,
        projectUpdatesInApp: true,
        simulationCompleteEmail: true,
        simulationCompleteInApp: false,
        newMentionsEmail: true,
    });

    const handleToggle = (key: keyof NotificationSettings) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const tabs: { id: SettingsTab; label: string; icon: keyof typeof ICONS }[] = [
        { id: 'general', label: 'General', icon: 'settings' },
        { id: 'notifications', label: 'Notifications', icon: 'bell' },
        { id: 'api', label: 'API Access', icon: 'key' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
                        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Theme</span>
                            <div className="flex items-center space-x-4">
                                <Icon name="sun" className={`w-6 h-6 ${currentTheme === 'light' ? 'text-indigo-600' : 'text-gray-500'}`} />
                                <ToggleSwitch enabled={currentTheme === 'dark'} onChange={(isDark) => setTheme(isDark ? 'dark' : 'light')} />
                                <Icon name="moon" className={`w-6 h-6 ${currentTheme === 'dark' ? 'text-indigo-500' : 'text-gray-500'}`} />
                            </div>
                        </div>
                    </Card>
                );
            case 'notifications':
                return (
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Event Notifications</h2>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                           <li className="py-4 flex justify-between items-center">
                               <div>
                                   <p className="font-medium text-gray-800 dark:text-gray-200">Project Updates</p>
                                   <p className="text-sm text-gray-500">When you are added to a project or your role changes.</p>
                               </div>
                               <div className="flex space-x-4">
                                   <ToggleSwitch enabled={notifications.projectUpdatesEmail} onChange={() => handleToggle('projectUpdatesEmail')} srLabel="Project updates email" />
                                   {/* <ToggleSwitch enabled={notifications.projectUpdatesInApp} onChange={() => handleToggle('projectUpdatesInApp')} srLabel="Project updates in-app" /> */}
                               </div>
                           </li>
                           <li className="py-4 flex justify-between items-center">
                               <div>
                                   <p className="font-medium text-gray-800 dark:text-gray-200">Simulation Complete</p>
                                   <p className="text-sm text-gray-500">When a simulation you initiated is finished.</p>
                               </div>
                               <div className="flex space-x-4">
                                   <ToggleSwitch enabled={notifications.simulationCompleteEmail} onChange={() => handleToggle('simulationCompleteEmail')} srLabel="Simulation complete email" />
                                   {/* <ToggleSwitch enabled={notifications.simulationCompleteInApp} onChange={() => handleToggle('simulationCompleteInApp')} srLabel="Simulation complete in-app" /> */}
                               </div>
                           </li>
                           <li className="py-4 flex justify-between items-center">
                               <div>
                                   <p className="font-medium text-gray-800 dark:text-gray-200">New Mentions</p>
                                   <p className="text-sm text-gray-500">When someone mentions you in a comment or chat.</p>
                               </div>
                               <div className="flex space-x-4">
                                   <ToggleSwitch enabled={notifications.newMentionsEmail} onChange={() => handleToggle('newMentionsEmail')} srLabel="New mentions email" />
                               </div>
                           </li>
                        </ul>
                    </Card>
                );
            case 'api':
                return (
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Keys</h2>
                        <div className="text-center text-gray-500 dark:text-gray-400 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <p>Generate API keys to interact with the AuraSphere API.</p>
                            <Button variant="primary" className="mt-4">Generate New Key</Button>
                        </div>
                    </Card>
                );
            default: return null;
        }
    }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
      <div className="flex space-x-8">
          <aside className="w-1/4">
              <div className="space-y-1">
                  {tabs.map(tab => (
                       <button
                         key={tab.id}
                         onClick={() => setActiveTab(tab.id)}
                         className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 text-left ${
                           activeTab === tab.id
                             ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'
                             : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                         }`}
                       >
                         <Icon name={tab.icon} className="w-5 h-5 mr-3" />
                         <span className="font-medium">{tab.label}</span>
                       </button>
                  ))}
              </div>
          </aside>
          <main className="w-3/4">
              {renderContent()}
          </main>
      </div>
    </div>
  );
};

export default SettingsPage;
