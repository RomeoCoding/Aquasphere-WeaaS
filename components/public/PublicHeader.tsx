import React from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { PublicPage, Theme } from '../../types';

interface PublicHeaderProps {
    setPage: (page: PublicPage) => void;
    onSignInClick: () => void;
    onSignUpClick: () => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const PublicHeader: React.FC<PublicHeaderProps> = ({ setPage, onSignInClick, onSignUpClick, theme, setTheme }) => {
    return (
        <header className="sticky top-0 z-50 bg-primary-bg/80 backdrop-blur-lg border-b border-border">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <button onClick={() => setPage('home')} className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 text-primary-accent group-hover:opacity-80 transition-opacity">
                        <Icon name="logo" />
                    </div>
                    <h1 className="text-xl font-bold text-text-primary group-hover:opacity-80 transition-opacity">AuraSphere</h1>
                </button>

                <nav className="hidden md:flex items-center space-x-8">
                    <button onClick={() => setPage('technology')} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Technology</button>
                    <button onClick={() => setPage('pricing')} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Pricing</button>
                    <button onClick={() => setPage('about')} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">About Us</button>
                </nav>

                <div className="flex items-center space-x-4">
                     <button 
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="text-text-secondary hover:text-primary-accent transition-colors"
                        title="Toggle theme"
                        >
                        <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-6 h-6"/>
                    </button>
                    <div className="w-px h-6 bg-border hidden sm:block"></div>
                    <Button variant="ghost" onClick={onSignInClick}>Sign In</Button>
                    <Button variant="primary" onClick={onSignUpClick}>Start Free Trial</Button>
                </div>
            </div>
        </header>
    );
};

export default PublicHeader;
