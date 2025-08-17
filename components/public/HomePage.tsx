import React, { useEffect, useRef } from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { PublicPage } from '../../types';

interface HomePageProps {
    setPage: (page: PublicPage) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
    
    // Simple hook for scroll animations
    const useScrollAnimate = () => {
        const ref = useRef<HTMLDivElement>(null);
        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-fade-in-up');
                        }
                    });
                },
                { threshold: 0.1 }
            );
            if (ref.current) {
                observer.observe(ref.current);
            }
            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            };
        }, []);
        return ref;
    };

    const problemRef = useScrollAnimate();
    const solutionRef = useScrollAnimate();
    const socialProofRef = useScrollAnimate();

    return (
        <div>
            {/* 1. Hero Section */}
            <section className="relative text-center py-32 lg:py-48 px-6 overflow-hidden bg-secondary-bg">
                 <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `url('https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(4px)'}}></div>
                 <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary-bg via-primary-bg/80 to-primary-bg"></div>

                <div className="relative z-20 container mx-auto animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight">
                        Orchestrate Your Wireless Environment.
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-text-secondary">
                        AuraSphere is the digital twin platform for designing, simulating, and optimizing next-generation wireless networks, powered by Reconfigurable Intelligent Surfaces.
                    </p>
                    <div className="mt-10 flex justify-center items-center space-x-4">
                        <Button variant="primary" className="px-8 py-3 text-lg" onClick={() => setPage('demo')}>Request a Demo</Button>
                        <Button variant="secondary" className="px-8 py-3 text-lg">Start 14-Day Free Trial</Button>
                    </div>
                </div>
            </section>

            {/* 2. Problem Section */}
            <section ref={problemRef} className="py-24 bg-primary-bg opacity-0">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-text-primary">Don't Let Your Infrastructure Limit Your Ambition.</h2>
                    <div className="mt-12 grid md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-secondary-bg border border-border rounded-lg flex items-center justify-center text-primary-accent">
                                <Icon name="signal-block" className="w-8 h-8" />
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-text-primary">Signal Blockage</h3>
                            <p className="mt-2 text-text-secondary">Higher frequencies mean more data, but also more dropped connections. Walls, equipment, and even people create unpredictable RF dead zones.</p>
                        </div>
                        <div className="flex flex-col items-center">
                             <div className="w-16 h-16 bg-secondary-bg border border-border rounded-lg flex items-center justify-center text-primary-accent">
                                <Icon name="inefficient-coverage" className="w-8 h-8" />
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-text-primary">Inefficient Coverage</h3>
                            <p className="mt-2 text-text-secondary">Blanketing an area with access points is expensive, power-hungry, and still results in interference and unreliable performance.</p>
                        </div>
                        <div className="flex flex-col items-center">
                             <div className="w-16 h-16 bg-secondary-bg border border-border rounded-lg flex items-center justify-center text-primary-accent">
                                <Icon name="design-guesswork" className="w-8 h-8" />
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-text-primary">Design by Guesswork</h3>
                            <p className="mt-2 text-text-secondary">Traditional network planning is a reactive process of surveying and troubleshooting. You can't afford to guess when mission-critical systems are on the line.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Solution Diagram */}
            <section ref={solutionRef} className="py-24 bg-secondary-bg opacity-0">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-text-primary">From a Digital Twin to a Perfect Signal.</h2>
                    <div className="mt-16 grid md:grid-cols-4 gap-8 items-start text-center">
                       {/* Step 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 flex items-center justify-center text-primary-accent"><Icon name="scanner" className="w-16 h-16" /></div>
                            <h4 className="mt-4 font-bold text-text-primary">1. SCAN</h4>
                            <p className="mt-1 text-sm text-text-secondary">We start by creating a millimeter-accurate 3D digital twin of your facility.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 flex items-center justify-center text-primary-accent"><Icon name="design-tool" className="w-16 h-16" /></div>
                            <h4 className="mt-4 font-bold text-text-primary">2. DESIGN</h4>
                            <p className="mt-1 text-sm text-text-secondary">Place virtual hardware, define coverage zones, and set performance goals.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 flex items-center justify-center text-primary-accent"><Icon name="sparkles" className="w-16 h-16" /></div>
                            <h4 className="mt-4 font-bold text-text-primary">3. SIMULATE</h4>
                            <p className="mt-1 text-sm text-text-secondary">Our physics-based engine runs thousands of scenarios to find the optimal layout.</p>
                        </div>
                        {/* Step 4 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 flex items-center justify-center text-success"><Icon name="shield-check" className="w-16 h-16" /></div>
                            <h4 className="mt-4 font-bold text-text-primary">4. DEPLOY</h4>
                            <p className="mt-1 text-sm text-text-secondary">Deploy with confidence, knowing your network is pre-validated for peak performance.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Social Proof */}
            <section ref={socialProofRef} className="py-24 bg-primary-bg opacity-0">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-text-primary text-center">The Foundation for the Future of Connectivity.</h2>
                    <div className="mt-12 text-center">
                        <p className="text-sm uppercase tracking-widest text-text-secondary">Trusted By Industry Leaders in</p>
                        <div className="mt-6 flex justify-center items-center space-x-12 grayscale opacity-60">
                            <span className="font-semibold">Advanced Manufacturing</span>
                            <span className="font-semibold">Logistics</span>
                            <span className="font-semibold">Smart Buildings</span>
                            <span className="font-semibold">Enterprise IT</span>
                        </div>
                    </div>

                    <Card className="mt-20 max-w-4xl mx-auto p-8 md:p-12 bg-secondary-bg/50">
                        <div className="md:flex md:items-center md:space-x-8">
                            <img className="w-24 h-24 rounded-full mx-auto md:mx-0 flex-shrink-0" src="https://i.pravatar.cc/150?u=cto" alt="Jane Doe"/>
                            <div className="mt-6 md:mt-0 text-center md:text-left">
                                <p className="text-xl text-text-primary italic">"AuraSphere allowed us to deploy our private 5G network in half the time and with 30% less hardware. Their simulation was not just a prediction; it was a blueprint for success."</p>
                                <p className="mt-4 font-bold text-text-primary">Jane Doe, CTO</p>
                                <p className="text-text-secondary">Quantum Dynamics</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* 5. Final CTA */}
            <section className="bg-secondary-bg">
                <div className="container mx-auto px-6 py-20 text-center">
                    <h2 className="text-4xl font-bold text-text-primary">Ready to See Your Wireless Future?</h2>
                    <div className="mt-8 flex justify-center items-center space-x-4">
                         <Button variant="secondary" className="px-8 py-3 text-lg" onClick={() => setPage('demo')}>Request a Personalized Demo</Button>
                         <Button variant="primary" className="px-8 py-3 text-lg" onClick={() => setPage('home')}>Start Your Free Trial</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;