import React from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateToRegister, onNavigateToForgotPassword }) => {
  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto text-primary-accent">
                    <Icon name="logo" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-text-secondary">
                    Or{' '}
                    <button onClick={onNavigateToRegister} className="font-medium text-primary-accent hover:opacity-80">
                        start your 14-day free trial
                    </button>
                </p>
            </div>
            <div className="bg-secondary-bg p-8 rounded-lg border border-border">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <Input label="Work Email" id="email-address" name="email" type="email" autoComplete="email" required placeholder="demo@aurasphere.io" />
                        <Input label="Password" id="password" name="password" type="password" autoComplete="current-password" required placeholder="••••••••" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-accent focus:ring-primary-accent border-border bg-primary-bg rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-text-secondary">
                                Remember me
                            </label>
                        </div>

                        <button onClick={onNavigateToForgotPassword} className="font-medium text-primary-accent hover:opacity-80">
                            Forgot your password?
                        </button>
                    </div>

                    <div>
                        <Button type="submit" variant="primary" className="w-full justify-center py-3">
                            Sign In
                        </Button>
                    </div>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-secondary-bg text-text-secondary">Or continue with</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <Button variant="secondary" className="w-full justify-center py-2.5">
                        <Icon name="google" className="w-5 h-5 mr-2" /> Google
                    </Button>
                    <Button variant="secondary" className="w-full justify-center py-2.5">
                        <Icon name="github" className="w-5 h-5 mr-2" /> GitHub
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;
