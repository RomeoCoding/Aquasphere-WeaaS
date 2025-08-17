
import React, { useState, useRef, useEffect } from 'react';
import { Project, User, AnnotationData } from '../../types';
import Icon from '../ui/Icon';

interface MessageInputProps {
  project: Project;
  onSendMessage: (content: string, mentions: string[]) => void;
  isAnnotationMode?: boolean;
  setIsAnnotationMode?: (isAnnotationMode: boolean) => void;
  pendingAnnotation?: AnnotationData | null;
  setPendingAnnotation?: (data: AnnotationData | null) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
    project, 
    onSendMessage,
    isAnnotationMode,
    setIsAnnotationMode,
    pendingAnnotation,
    setPendingAnnotation
}) => {
  const [text, setText] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const filteredMembers = project.team.filter(member => 
    member.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1 && !value.substring(atIndex + 1).includes(' ')) {
      setShowMentions(true);
      setMentionQuery(value.substring(atIndex + 1));
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (user: User) => {
    const atIndex = text.lastIndexOf('@');
    setText(text.substring(0, atIndex) + `@${user.name} `);
    setShowMentions(false);
    textareaRef.current?.focus();
  };
  
  const handleSend = () => {
    if (text.trim() || pendingAnnotation) {
      // Basic mention extraction
      const mentions = text.match(/@(\w+)/g)?.map(m => m.substring(1)) || [];
      onSendMessage(text, mentions);
      setText('');
      setPendingAnnotation?.(null);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="relative">
        {showMentions && filteredMembers.length > 0 && (
          <div className="absolute bottom-full mb-2 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 p-2">
            {filteredMembers.map(member => (
              <button 
                key={member.id} 
                onClick={() => handleMentionSelect(member)}
                className="w-full flex items-center space-x-2 p-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <img src={member.avatarUrl} alt={member.name} className="w-6 h-6 rounded-full" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{member.name}</span>
              </button>
            ))}
          </div>
        )}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-2 flex flex-col">
            {pendingAnnotation && (
                 <div className="flex items-center space-x-2 text-sm text-yellow-700 dark:text-yellow-300 p-2 bg-yellow-400/20 rounded-md mb-2">
                     <Icon name="pin" className="w-4 h-4 flex-shrink-0" />
                     <span>Annotation attached.</span>
                     <button onClick={() => setPendingAnnotation?.(null)} className="ml-auto text-yellow-700 dark:text-yellow-300 hover:text-black dark:hover:text-white">&times;</button>
                 </div>
            )}
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleInput}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Type a message... (supports **markdown**)"
                className="w-full bg-transparent resize-none focus:outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500"
                rows={1}
                style={{ maxHeight: '100px' }}
            />
            <div className="flex justify-between items-center mt-1">
                <div className="flex items-center space-x-1">
                    <button title="Attach file" className="p-1.5 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Icon name="upload" className="w-5 h-5"/>
                    </button>
                    {setIsAnnotationMode && (
                        <button 
                            title="Add 3D Annotation" 
                            onClick={() => setIsAnnotationMode(!isAnnotationMode)}
                            className={`p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${isAnnotationMode ? 'bg-indigo-600/20 text-indigo-600' : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                        >
                            <Icon name="pin" className="w-5 h-5"/>
                        </button>
                    )}
                </div>
                <button 
                    onClick={handleSend}
                    disabled={!text.trim() && !pendingAnnotation}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                    <span>Send</span>
                    <Icon name="send" className="w-4 h-4"/>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
