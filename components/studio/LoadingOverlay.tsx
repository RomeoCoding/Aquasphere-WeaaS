import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon';

const messages = [
  "Loading 3D point cloud...",
  "Initializing physics engine...",
  "Calibrating render scene...",
  "Warming up RF simulators...",
  "Finalizing workspace..."
];

interface LoadingOverlayProps {
    onLoaded: () => void;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ onLoaded }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1));
    }, 1200);

    const progressInterval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(progressInterval);
                clearInterval(messageInterval);
                onLoaded();
                return 100;
            }
            return prev + 1;
        });
    }, 50);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 bg-primary-bg z-50 flex flex-col items-center justify-center">
      <div className="w-24 h-24 text-primary-accent animate-pulse">
        <Icon name="logo" />
      </div>
      <h2 className="text-2xl font-bold text-text-primary mt-4">Entering Studio</h2>
      
      <div className="w-full max-w-md mt-8">
        <div className="h-2 bg-secondary-bg rounded-full overflow-hidden">
            <div 
                className="h-full bg-primary-accent transition-all duration-150" 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
        <div className="h-5 mt-3 text-center">
            <span className="text-primary-accent transition-opacity duration-500" key={currentMessageIndex}>
                {messages[currentMessageIndex % messages.length]}
            </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;