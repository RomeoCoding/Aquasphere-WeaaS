import React, { useState } from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ForgotPasswordPageProps {
  onNavigateToLogin: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigateToLogin }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would make an API call here.
        // We show a generic message to prevent user enumeration.
        setIsSubmitted(true);
    };

  return (
     <div className="min-h-screen bg-primary-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto text-primary-accent">
                    <Icon name="logo" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
                    Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-text-secondary">
                    Or{' '}
                    <button onClick={onNavigateToLogin} className="font-medium text-primary-accent hover:opacity-80">
                        return to sign in
                    </button>
                </p>
            </div>

            {isSubmitted ? (
                 <div className="bg-secondary-bg p-6 border border-border rounded-lg text-center">
                    <Icon name="send" className="w-12 h-12 mx-auto text-success" />
                    <h3 className="mt-4 text-xl font-bold text-text-primary">Check your email</h3>
                    <p className="mt-2 text-text-secondary">If an account with that email exists, we have sent a password reset link.</p>
                </div>
            ) : (
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <Input id="email" type="email" placeholder="Enter your work email" required />
                    <div>
                        <Button type="submit" variant="primary" className="w-full justify-center py-3">
                            Send Reset Link
                        </Button>
                    </div>
                </form>
            )}
        </div>
    </div>
  );
};

export default ForgotPasswordPage;
