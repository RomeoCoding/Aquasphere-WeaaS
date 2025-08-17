import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import ToggleSwitch from '../ui/ToggleSwitch';

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Delay showing banner slightly to avoid layout shift on load
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookie_consent', 'all');
        setIsVisible(false);
    };
    
    const handleSavePreferences = () => {
        // In a real app, you would save the specific preferences
        localStorage.setItem('cookie_consent', 'custom');
        setIsModalOpen(false);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Modal */}
            {isModalOpen && (
                 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                     <div className="w-full max-w-lg bg-secondary-bg border border-border rounded-lg p-6 relative">
                         <h2 className="text-xl font-bold text-text-primary">Manage Cookie Preferences</h2>
                         <p className="mt-2 text-sm text-text-secondary">We use cookies for various purposes. You can choose which categories to allow.</p>
                         <div className="mt-6 space-y-4">
                            <div>
                                <ToggleSwitch enabled={true} onChange={() => {}} label="Necessary Cookies" />
                                <p className="text-xs text-text-secondary ml-16">These cookies are essential for the website to function and cannot be switched off.</p>
                            </div>
                             <div>
                                <ToggleSwitch enabled={true} onChange={() => {}} label="Analytics Cookies" />
                                <p className="text-xs text-text-secondary ml-16">These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
                            </div>
                             <div>
                                <ToggleSwitch enabled={false} onChange={() => {}} label="Marketing Cookies" />
                                <p className="text-xs text-text-secondary ml-16">These cookies may be set through our site by our advertising partners to build a profile of your interests.</p>
                            </div>
                         </div>
                         <div className="mt-6 flex justify-end space-x-4">
                             <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button variant="primary" onClick={handleSavePreferences}>Save Preferences</Button>
                         </div>
                     </div>
                 </div>
            )}

            {/* Banner */}
            <div className="fixed bottom-0 left-0 right-0 bg-secondary-bg/80 backdrop-blur-md border-t border-border p-4 z-40">
                <div className="container mx-auto flex items-center justify-between">
                    <p className="text-sm text-text-secondary">
                        We use cookies to operate our site and analyze traffic. See our <a href="#" className="underline hover:text-text-primary">Cookie Policy</a> for details.
                    </p>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" onClick={() => setIsModalOpen(true)}>Manage Preferences</Button>
                        <Button variant="primary" onClick={handleAcceptAll}>Accept All</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CookieBanner;