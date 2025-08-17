import React, { useState, useEffect } from 'react';
import { Project, ChatChannel, ChatMessage, AnnotationData } from '../../types';
import { MOCK_CHANNELS, MOCK_MESSAGES } from '../../constants';
import Icon from '../ui/Icon';
import ChannelHeader from './ChannelHeader';
import MessageStream from './MessageStream';
import MessageInput from './MessageInput';

interface CollaborationPanelProps {
  project: Project | null;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  // Studio-specific props for annotations
  isAnnotationMode?: boolean;
  setIsAnnotationMode?: (isAnnotationMode: boolean) => void;
  pendingAnnotation?: AnnotationData | null;
  setPendingAnnotation?: (data: AnnotationData | null) => void;
  messages?: ChatMessage[];
  setMessages?: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onViewAnnotation?: (data: AnnotationData) => void;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ 
    project, 
    isCollapsed, 
    setIsCollapsed,
    isAnnotationMode,
    setIsAnnotationMode,
    pendingAnnotation,
    setPendingAnnotation,
    messages: studioMessages, // Renamed to avoid conflict
    setMessages: setStudioMessages,
    onViewAnnotation
}) => {
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const [channels, setChannels] = useState<ChatChannel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<ChatChannel | null>(null);
  
  // Use messages from studio if available, otherwise use local state
  const messages = studioMessages || localMessages;
  const setMessages = setStudioMessages || setLocalMessages;

  useEffect(() => {
    if (project) {
      const projectChannels = MOCK_CHANNELS[project.id] || [];
      setChannels(projectChannels);
      if (projectChannels.length > 0) {
        const generalChannel = projectChannels.find(c => c.name === '#general') || projectChannels[0];
        setCurrentChannel(generalChannel);
      } else {
        setCurrentChannel(null);
      }
    } else {
      setChannels([]);
      setCurrentChannel(null);
    }
  }, [project]);

  useEffect(() => {
    if (currentChannel && !studioMessages) { // Don't override studio messages
      setMessages(MOCK_MESSAGES[currentChannel.id] || []);
    }
  }, [currentChannel, setMessages, studioMessages]);

  const handleSendMessage = (content: string, mentions: string[]) => {
    // This is where you'd send the message over a WebSocket
    // For now, we simulate with optimistic updates
    if (!content.trim() && !pendingAnnotation) return;

    const newMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      content: content,
      timestamp: new Date().toISOString(),
      user: { id: 'u1', name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }, // currentUser
      status: 'sending',
      annotationData: pendingAnnotation,
    };

    setMessages(prev => [...prev, newMessage]);
    setPendingAnnotation?.(null);

    // Simulate server response
    setTimeout(() => {
      setMessages(prev => prev.map(msg => msg.id === newMessage.id ? { ...msg, status: 'sent', id: `msg-${Date.now()}` } : msg));
    }, 500);
  };

  return (
    <aside className={`fixed top-0 right-0 h-full bg-secondary-bg/50 backdrop-blur-md z-40 border-l border-border transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-[400px]'}`}>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-16 bg-secondary-bg hover:bg-border rounded-l-md border-y border-l border-border flex items-center justify-center z-50 text-text-secondary hover:text-text-primary"
        title={isCollapsed ? "Open collaboration panel" : "Collapse collaboration panel"}
      >
        <Icon name="arrow" className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
      </button>

      <div className={`flex flex-col h-full transition-opacity duration-200 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {!project ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                 <Icon name="chat" className="w-12 h-12 text-text-secondary/50" />
                 <p className="mt-2 text-sm text-text-secondary">Select a project to view collaboration.</p>
            </div>
        ) : (
            <>
                <ChannelHeader 
                    project={project}
                    channels={channels}
                    currentChannel={currentChannel}
                    onSelectChannel={setCurrentChannel}
                />
                <MessageStream 
                    messages={messages} 
                    onViewAnnotation={onViewAnnotation}
                />
                <MessageInput 
                    project={project}
                    onSendMessage={handleSendMessage}
                    isAnnotationMode={isAnnotationMode}
                    setIsAnnotationMode={setIsAnnotationMode}
                    pendingAnnotation={pendingAnnotation}
                    setPendingAnnotation={setPendingAnnotation}
                />
            </>
        )}
      </div>
    </aside>
  );
};

export default CollaborationPanel;