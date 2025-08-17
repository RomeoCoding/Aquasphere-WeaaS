import React from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Card from '../ui/Card';

interface PricingPageProps {
    onSignUp: () => void;
}

const PricingTier: React.FC<{
    name: string;
    price: string;
    description: string;
    features: string[];
    isFeatured?: boolean;
    ctaLabel: string;
    onAction: () => void;
}> = ({ name, price, description, features, isFeatured = false, ctaLabel, onAction }) => {
    return (
        <Card className={`flex flex-col p-8 ${isFeatured ? 'border-primary-accent ring-2 ring-primary-accent shadow-glow' : ''}`}>
            <h3 className="text-2xl font-bold text-text-primary">{name}</h3>
            <p className="mt-2 text-text-secondary">{description}</p>
            <p className="mt-6">
                <span className="text-5xl font-extrabold text-text-primary">{price}</span>
                {price !== 'Custom' && price !== '$0' && <span className="text-base font-medium text-text-secondary">/month</span>}
            </p>
            <ul className="mt-8 space-y-4 text-text-secondary flex-1">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <Icon name="plus" className="w-5 h-5 mr-3 text-success" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-10">
                <Button onClick={onAction} variant={isFeatured ? 'primary' : 'secondary'} className="w-full py-3">
                    {ctaLabel}
                </Button>
            </div>
        </Card>
    )
}

const PricingPage: React.FC<PricingPageProps> = ({ onSignUp }) => {
    return (
        <div className="py-24 bg-primary-bg">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-text-primary">Find the Right Plan for Your Team</h1>
                    <p className="mt-4 text-xl text-text-secondary">
                        Start with a 14-day free trial on our Business plan. No credit card required.
                    </p>
                </div>

                <div className="mt-16 grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                    <PricingTier
                        name="Community Edition"
                        price="$0"
                        description="For Students, Researchers, and Hobbyists."
                        features={[
                            "Access to the core 2D simulation engine",
                            "Limited to 3 local projects",
                            "No cloud storage or collaboration"
                        ]}
                        ctaLabel="Download for Free"
                        onAction={() => alert('Simulating download of AuraSphere Community Edition...')}
                    />
                     <PricingTier 
                        name="Business"
                        price="$1,999"
                        description="For growing teams that need advanced collaboration and scale."
                        features={[
                            "50 Projects",
                            "50 Team Members",
                            "Advanced Collaboration Tools",
                            "Priority Support",
                            "API Access"
                        ]}
                        isFeatured={true}
                        ctaLabel="Start Free Trial"
                        onAction={onSignUp}
                    />
                     <PricingTier 
                        name="Enterprise"
                        price="Custom"
                        description="For large organizations with complex security and deployment needs."
                        features={[
                            "Unlimited Projects & Members",
                            "Dedicated Support & SLA",
                            "On-Premise Deployment Option",
                            "Advanced Security & SSO"
                        ]}
                        ctaLabel="Contact Sales"
                        onAction={() => alert('Redirecting to sales contact form...')}
                    />
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
