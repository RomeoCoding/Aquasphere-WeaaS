
import React, { useState } from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import SlackIntegrationModal from './SlackIntegrationModal';
import { user1, user2, user3, user4 } from '../../constants';

const teamMembers = [user1, user2, user3, user4];

const TeamSettingsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {isModalOpen && <SlackIntegrationModal onClose={() => setIsModalOpen(false)} />}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Team Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Members</h2>
            <Card className="p-0">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {teamMembers.map(member => (
                        <li key={member.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{member.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">demo-user-email@aurasphere.io</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Admin</span>
                                <Button variant="ghost">
                                    <Icon name="dots" className="w-5 h-5"/>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
        
        <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Integrations</h2>
            <Card className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Icon name="slack" className="w-7 h-7 text-gray-800 dark:text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Slack</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Not Connected</p>
                    </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 my-4">
                    Connect Slack to automatically create project channels and receive notifications for important events.
                </p>
                <Button variant="secondary" className="w-full" onClick={() => setIsModalOpen(true)}>
                    Connect
                </Button>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamSettingsPage;