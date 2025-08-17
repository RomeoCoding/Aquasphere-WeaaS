
import React, { useEffect, useRef } from 'react';
import { ChatMessage, AnnotationData } from '../../types';
import Message from './Message';

interface MessageStreamProps {
  messages: ChatMessage[];
  onViewAnnotation?: (data: AnnotationData) => void;
}

const MessageStream: React.FC<MessageStreamProps> = ({ messages, onViewAnnotation }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50">
      {messages.map(msg => (
        <Message key={msg.id} message={msg} onViewAnnotation={onViewAnnotation} />
      ))}
    </div>
  );
};

export default MessageStream;
