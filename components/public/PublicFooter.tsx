import React from 'react';
import Icon from '../ui/Icon';
import { PublicPage } from '../../types';

interface PublicFooterProps {
    setPage: (page: PublicPage) => void;
}

const PublicFooter: React.FC<PublicFooterProps> = ({ setPage }) => {
    return (
        <footer className="bg-primary-bg border-t border-border">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                         <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 text-primary-accent">
                                <Icon name="logo" />
                            </div>
                            <h1 className="text-xl font-bold text-text-primary">AuraSphere</h1>
                        </div>
                        <p className="mt-4 text-sm text-text-secondary">
                            &copy; {new Date().getFullYear()} AuraSphere, Inc. <br/> All rights reserved.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-text-primary">Product</h4>
                        <nav className="mt-4 space-y-2 text-sm">
                            <button onClick={() => setPage('technology')} className="block text-text-secondary hover:text-text-primary">Technology</button>
                            <button onClick={() => setPage('pricing')} className="block text-text-secondary hover:text-text-primary">Pricing</button>
                            <a href="#" className="block text-text-secondary hover:text-text-primary">Security</a>
                        </nav>
                    </div>
                    <div>
                        <h4 className="font-semibold text-text-primary">Company</h4>
                        <nav className="mt-4 space-y-2 text-sm">
                            <button onClick={() => setPage('about')} className="block text-text-secondary hover:text-text-primary">About Us</button>
                            <a href="#" className="block text-text-secondary hover:text-text-primary">Careers</a>
                            <a href="#" className="block text-text-secondary hover:text-text-primary">Contact</a>
                        </nav>
                    </div>
                    <div>
                        <h4 className="font-semibold text-text-primary">Legal</h4>
                        <nav className="mt-4 space-y-2 text-sm">
                            <button onClick={() => setPage('terms')} className="block text-text-secondary hover:text-text-primary">Terms of Service</button>
                            <button onClick={() => setPage('privacy')} className="block text-text-secondary hover:text-text-primary">Privacy Policy</button>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;