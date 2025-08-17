import React from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

interface VerifyEmailPageProps {
  onNavigateToLogin: () => void;
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ onNavigateToLogin }) => {
  return (
     <div className="min-h-screen bg-primary-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
            <div className="w-24 h-24 mx-auto text-primary-accent">
                <Icon name="send" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
                Please verify your email
            </h2>
            <p className="mt-2 text-text-secondary max-w-sm mx-auto">
                We've sent an email to your address. Please click the link in that email to activate your account.
            </p>
            <div>
                <Button variant="primary" onClick={onNavigateToLogin} className="mt-4">
                    Return to Sign In
                </Button>
            </div>
             <p className="text-xs text-text-secondary pt-4">
                Didn't receive an email? Check your spam folder or <button className="font-medium text-primary-accent">resend the email</button>.
            </p>
        </div>
    </div>
  );
};

export default VerifyEmailPage;
