
import React, { useState } from 'react';
import { Conversation } from '../../types';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import ContactList from './ContactList';
import ChatWindow from './ChatWindow';

interface ChatPanelProps {
    conversations: Conversation[];
}

const ChatPanel: React.FC<ChatPanelProps> = ({ conversations }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-indigo-600 rounded-full text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-transform hover:scale-110 z-50"
                aria-label="Open Chat"
            >
                <Icon name="chat" className="w-8 h-8" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Card className="w-[600px] h-[500px] flex flex-col shadow-2xl bg-white dark:bg-gray-800/50">
                 <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-lg">
                    <h2 className="font-bold text-gray-900 dark:text-white">Chat</h2>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="text-gray-400 hover:text-gray-800 dark:hover:text-white"
                        aria-label="Close Chat"
                    >
                       <Icon name="close" className="w-6 h-6" />
                    </button>
                </header>
                <div className="flex flex-1 overflow-hidden">
                    <ContactList 
                        conversations={conversations}
                        selectedConversationId={selectedConversation.id}
                        onSelectConversation={setSelectedConversation}
                    />
                    <ChatWindow 
                        conversation={selectedConversation}
                    />
                </div>
            </Card>
        </div>
    );
};

export default ChatPanel;