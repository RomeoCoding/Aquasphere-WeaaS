import React, { useState, useMemo, useEffect, useRef } from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}

const PasswordStrengthMeter: React.FC<{ password: string }> = ({ password }) => {
    const strength = useMemo(() => {
        let score = 0;
        if (password.length > 8) score++;
        if (password.match(/[a-z]/)) score++;
        if (password.match(/[A-Z]/)) score++;
        if (password.match(/[0-9]/)) score++;
        if (password.match(/[^a-zA-Z0-9]/)) score++;
        return score;
    }, [password]);

    const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength];
    const strengthColor = ['bg-danger', 'bg-danger', 'bg-warning', 'bg-yellow-500', 'bg-success', 'bg-success'][strength];

    return (
        <div className="w-full bg-secondary-bg rounded-full h-2.5">
            <div 
                className={`h-2.5 rounded-full transition-all ${strengthColor}`} 
                style={{ width: `${(strength / 5) * 100}%`}}
            ></div>
            <p className="text-xs text-text-secondary mt-1">{strengthText}</p>
        </div>
    )
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
      if (step !== 1 || !email) {
          setEmailError('');
          return;
      }
      setIsCheckingEmail(true);
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = window.setTimeout(() => {
          // Simulate API call
          if (email === 'taken@aurasphere.io') {
              setEmailError('This email is already in use. ');
          } else {
              setEmailError('');
          }
          setIsCheckingEmail(false);
      }, 500);

  }, [email, step]);


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
                <Input label="Work Email" id="email" type="email" placeholder="you@company.com" required value={email} onChange={e => setEmail(e.target.value)} />
                {isCheckingEmail && <p className="text-xs text-text-secondary mt-1">Checking...</p>}
                {emailError && <p className="text-xs text-danger mt-1">{emailError}<button type="button" onClick={onNavigateToLogin} className="font-medium text-primary-accent hover:opacity-80 underline">Log In Instead?</button></p>}
            </div>
            <Input 
                label="Password"
                id="password" 
                type={passwordVisible ? 'text' : 'password'} 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                rightAdornment={
                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="text-text-secondary">
                        <Icon name={passwordVisible ? 'hidden' : 'visible'} className="w-5 h-5" />
                    </button>
                }
            />
            <PasswordStrengthMeter password={password} />
          </div>
        );
      case 2:
        return (
            <div className="space-y-4">
                <Input label="Full Name" id="full-name" type="text" placeholder="Jane Doe" required />
                <Input label="Company Name" id="company-name" type="text" placeholder="Your Company, Inc." required />
                <Input label="Role" id="role" type="text" placeholder="e.g. RF Engineer" />
            </div>
        );
      case 3:
        return (
            <div className="space-y-4">
                <div className="h-40 overflow-y-auto p-4 border border-border rounded-md text-sm text-text-secondary bg-primary-bg">
                    <h4 className="font-bold text-text-primary mb-2">Terms of Service</h4>
                    <p>By using AuraSphere, you agree to these terms. You are responsible for what you do on the platform and for keeping your account secure...</p>
                    {/* Add more placeholder text */}
                </div>
                <div className="flex items-start">
                    <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-primary-accent focus:ring-primary-accent border-border bg-secondary-bg rounded mt-1" />
                    <label htmlFor="terms" className="ml-3 block text-sm text-text-secondary">
                        I have read and agree to the <a href="#" className="font-medium text-primary-accent">Terms of Service</a> and <a href="#" className="font-medium text-primary-accent">Privacy Policy</a>.
                    </label>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  const handleNext = (e: React.FormEvent) => {
      e.preventDefault();
      if(step < 3) {
          setStep(s => s + 1);
      } else {
          onRegisterSuccess();
      }
  }

  return (
     <div className="min-h-screen bg-primary-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto text-primary-accent">
                    <Icon name="logo" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
                    Create your AuraSphere account
                </h2>
                <p className="mt-2 text-center text-sm text-text-secondary">
                    Already have an account?{' '}
                    <button onClick={onNavigateToLogin} className="font-medium text-primary-accent hover:opacity-80">
                        Sign In
                    </button>
                </p>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-2">
                {[1,2,3].map(s => (
                     <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-primary-accent' : 'bg-secondary-bg'}`}></div>
                ))}
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleNext}>
                {renderStep()}
                <div className="flex items-center justify-between pt-4">
                    {step > 1 && <Button type="button" variant="secondary" onClick={() => setStep(s => s - 1)}>Back</Button>}
                    <Button type="submit" variant="primary" className={`${step === 1 ? 'w-full' : ''} justify-center py-3 ml-auto`} disabled={isCheckingEmail || (step === 1 && !!emailError)}>
                        {step < 3 ? 'Continue' : 'Create Account'}
                    </Button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default RegisterPage;
