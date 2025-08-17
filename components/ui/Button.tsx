import React from 'react';
import Icon from './Icon';
import { ICONS } from '../../constants';
import LoadingIndicator from './LoadingIndicator';

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

  const hasContent = children != null && children !== '';
  const iconSpacingClass = hasContent ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <LoadingIndicator size="sm" />}
      {!isLoading && icon && iconPosition === 'left' && <Icon name={icon} className={`w-4 h-4 ${iconSpacingClass}`} />}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <Icon name={icon} className={`w-4 h-4 ${iconSpacingClass}`} />}
    </button>
  );
};

export default Button;
