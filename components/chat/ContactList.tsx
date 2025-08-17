
import React from 'react';
import { Conversation } from '../../types';

interface ContactListProps {
    conversations: Conversation[];
    selectedConversationId: string;
    onSelectConversation: (conversation: Conversation) => void;
}

const ContactList: React.FC<ContactListProps> = ({ conversations, selectedConversationId, onSelectConversation }) => {
    const groups = conversations.filter(c => c.type === 'group');
    const dms = conversations.filter(c => c.type === 'dm');

    return (
        <div className="w-48 bg-gray-50 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-700 p-2 overflow-y-auto">
            <div>
                <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 px-2 mb-1">Channels</h4>
                {groups.map(convo => (
                    <button 
                        key={convo.id}
                        onClick={() => onSelectConversation(convo)}
                        className={`w-full text-left p-2 rounded-md text-sm font-medium ${selectedConversationId === convo.id ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    >
                        # {convo.name}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 px-2 mb-1">Direct Messages</h4>
                {dms.map(convo => (
                    <button 
                        key={convo.id}
                        onClick={() => onSelectConversation(convo)}
                        className={`w-full text-left p-2 rounded-md flex items-center space-x-2 ${selectedConversationId === convo.id ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    >
                        <img src={convo.avatarUrl} alt={convo.name} className="w-6 h-6 rounded-full" />
                        <span className="text-sm font-medium">{convo.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ContactList;