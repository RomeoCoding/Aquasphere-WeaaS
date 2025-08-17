
import React, { useState, useRef, useEffect } from 'react';
import { Project, ChatChannel } from '../../types';
import Icon from '../ui/Icon';

interface ChannelHeaderProps {
  project: Project;
  channels: ChatChannel[];
  currentChannel: ChatChannel | null;
  onSelectChannel: (channel: ChatChannel) => void;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ project, channels, currentChannel, onSelectChannel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="p-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white/50 dark:bg-gray-800/50">
      <div className="relative" ref={menuRef}>
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Project: {project.name}</p>
          <div className="flex items-center">
            <h2 className="font-bold text-gray-900 dark:text-white truncate">{currentChannel?.name}</h2>
            <Icon name="arrow" className={`w-4 h-4 ml-2 transform transition-transform ${isOpen ? 'rotate-90' : '-rotate-90'}`} />
          </div>
        </button>
        
        {isOpen && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-20">
                {channels.map(channel => (
                    <button 
                        key={channel.id}
                        onClick={() => { onSelectChannel(channel); setIsOpen(false); }}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                        {channel.name}
                    </button>
                ))}
            </div>
        )}
      </div>
    </header>
  );
};

export default ChannelHeader;
