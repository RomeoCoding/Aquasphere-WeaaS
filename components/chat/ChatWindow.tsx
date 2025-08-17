
import React from 'react';
import { currentUser } from '../../constants';
import { Conversation } from '../../types';
import Icon from '../ui/Icon';

interface ChatWindowProps {
    conversation: Conversation;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation }) => {
    return (
        <div className="flex flex-col flex-1 bg-white dark:bg-gray-800/50">
            <header className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">{conversation.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {conversation.participants.map(p => p.name).join(', ')}
                </p>
            </header>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 dark:bg-transparent">
                {conversation.messages.map(msg => (
                     <div key={msg.id} className={`flex items-start gap-3 ${msg.sender.id === currentUser.id ? 'flex-row-reverse' : ''}`}>
                        <img src={msg.sender.avatarUrl} alt={msg.sender.name} className="w-8 h-8 rounded-full" />
                        <div className={`p-3 rounded-lg max-w-xs ${msg.sender.id === currentUser.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <span className={`text-xs mt-1 block text-right ${msg.sender.id === currentUser.id ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>{msg.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
            <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder={`Message ${conversation.name}`}
                        className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-full py-2 pl-4 pr-10 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400">
                        <Icon name="play" className="w-5 h-5 rotate-90" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChatWindow;