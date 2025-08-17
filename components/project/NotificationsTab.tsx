
import React from 'react';
import { Notification } from '../../types';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

interface NotificationsTabProps {
  notifications: Notification[];
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ notifications }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Notifications</h3>
      <Card className="p-0">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map(notif => (
                <li key={notif.id} className="p-4 flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex-shrink-0 flex items-center justify-center">
                        <Icon name={notif.icon} className="w-5 h-5 text-gray-500 dark:text-gray-300"/>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{notif.title}</h4>
                            <span className="text-xs text-gray-400 dark:text-gray-500">{notif.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notif.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                             <img src={notif.user.avatarUrl} alt={notif.user.name} className="w-5 h-5 rounded-full" />
                             <span className="text-xs text-gray-400 dark:text-gray-500">Triggered by {notif.user.name}</span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
      </Card>
    </div>
  );
};

export default NotificationsTab;