import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage, AnnotationData } from '../../types';
import { currentUser, systemUser } from '../../constants';
import Icon from '../ui/Icon';

interface MessageProps {
  message: ChatMessage;
  onViewAnnotation?: (data: AnnotationData) => void;
}

const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Message: React.FC<MessageProps> = ({ message, onViewAnnotation }) => {
  const isCurrentUser = message.user.id === currentUser.id;
  const isSystemMessage = message.user.id === systemUser.id;

  if (isSystemMessage) {
    return (
      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 my-2">
        <div className="w-4 h-4 flex-shrink-0">🤖</div>
        <div className="prose prose-sm dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>
        <span className="flex-shrink-0">{formatTimestamp(message.timestamp)}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 group ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
      <img src={message.user.avatarUrl} alt={message.user.name} className="w-8 h-8 rounded-full flex-shrink-0" />
      <div className={`p-3 rounded-lg max-w-xs transition-opacity duration-300 ${isCurrentUser ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} ${message.status === 'sending' ? 'opacity-60' : 'opacity-100'}`}>
        <div className="flex items-center justify-between mb-1">
          <p className="font-semibold text-sm">{message.user.name}</p>
          <span className={`text-xs ${isCurrentUser ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>{formatTimestamp(message.timestamp)}</span>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-strong:text-current prose-em:text-current">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>
        {message.annotationData && (
          <button 
            onClick={() => onViewAnnotation?.(message.annotationData!)}
            className="mt-2 w-full text-left flex items-center space-x-2 p-2 rounded-md bg-black/10 hover:bg-black/20 transition-colors"
          >
            <Icon name="pin" className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-semibold">View Annotation in 3D Scene</span>
          </button>
        )}
      </div>
      <div className={`self-center flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
        <button title="Share to Slack" className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <Icon name="slack" className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
         <button title="Reply in Thread" className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <Icon name="chat" className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Message;