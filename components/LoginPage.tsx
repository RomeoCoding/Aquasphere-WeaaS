import React, { useState } from 'react';
import Icon from './ui/Icon';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-bg">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bg-primary-accent/5 rounded-full -left-40 -top-40 w-96 h-96 animate-pulse"></div>
        <div className="absolute bg-sky-500/5 rounded-full -right-40 -bottom-40 w-96 h-96 animate-pulse animation-delay-3000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-secondary-bg/50 backdrop-blur-lg border border-border rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 text-primary-accent">
            <Icon name="logo" />
          </div>
          <h1 className="text-4xl font-bold text-text-primary">AuraSphere</h1>
          <p className="mt-2 text-primary-accent">Design Your Wireless Reality.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="rounded-md shadow-sm -space-y-px">
            {isSignUp && (
              <div>
                <input id="full-name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-border bg-primary-bg placeholder-text-secondary text-text-primary rounded-t-md focus:outline-none focus:ring-primary-accent focus:border-primary-accent focus:z-10 sm:text-sm" placeholder="Full Name" />
              </div>
            )}
            <div>
              <input id="email-address" name="email" type="email" autoComplete="email" required className={`appearance-none rounded-none relative block w-full px-3 py-3 border border-border bg-primary-bg placeholder-text-secondary text-text-primary ${isSignUp ? '' : 'rounded-t-md'} focus:outline-none focus:ring-primary-accent focus:border-primary-accent focus:z-10 sm:text-sm`} placeholder="Email address" defaultValue="demo@aurasphere.io" />
            </div>
            <div>
              <input id="password" name="password" type="password" autoComplete="current-password" required className={`appearance-none rounded-none relative block w-full px-3 py-3 border border-border bg-primary-bg placeholder-text-secondary text-text-primary rounded-b-md focus:outline-none focus:ring-primary-accent focus:border-primary-accent focus:z-10 sm:text-sm`} placeholder="Password" defaultValue="password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-accent focus:ring-primary-accent border-border bg-secondary-bg rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-accent hover:opacity-80">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-accent focus:ring-offset-primary-bg">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-text-secondary">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-primary-accent hover:opacity-80 ml-1">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;