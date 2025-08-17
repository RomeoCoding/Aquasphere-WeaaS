import React from 'react';

const LoadingIndicator: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'lg' }) => {
  const sizeClasses = size === 'lg' ? 'w-24 h-24' : 'w-5 h-5';
  const strokeWidth = size === 'lg' ? 1.5 : 2.5;

  return (
    <div className={`relative ${sizeClasses} flex items-center justify-center`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className="absolute w-full h-full text-primary-accent">
        <style>
          {`
            .arc {
              stroke-dasharray: 80;
              stroke-dashoffset: 80;
              animation: draw-arc 1.8s ease-in-out infinite;
            }
            .arc1 { animation-delay: 0s; }
            .arc2 { animation-delay: 0.2s; }
          `}
        </style>
        <path className="arc arc1" d="M3 21c2-6.5 6-10 9-11s7 4.5 9 11" opacity="0"/>
        <path className="arc arc2" d="M9 15.5c1-3 2-4 3-4.5s2 1.5 3 4.5" opacity="0"/>
      </svg>
    </div>
  );
};

export default LoadingIndicator;
