import React from 'react';
import Icon from './Icon';
import { ICONS } from '../../constants';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: keyof typeof ICONS;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    icon, 
    iconPosition = 'left', 
    isLoading = false,
    className = '', 
    ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 border rounded-md font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-bg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variantStyles = {
    primary: 'bg-primary-accent border-transparent text-white hover:bg-opacity-80 focus:ring-primary-accent',
    secondary: 'bg-secondary-bg border-border text-text-primary hover:bg-border focus:ring-primary-accent',
    ghost: 'bg-transparent border-transparent text-text-secondary hover:bg-secondary-bg hover:text-text-primary focus:ring-primary-accent',
  };

  const iconElement = icon ? <Icon name={icon} className={`w-4 h-4 ${isLoading ? 'hidden' : 'block'}`} /> : null;

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {iconPosition === 'left' && !isLoading && iconElement}
      <span className={`${icon && !isLoading ? 'mx-2' : ''}`}>{children}</span>
      {iconPosition === 'right' && !isLoading && iconElement}
    </button>
  );
};

export default Button;