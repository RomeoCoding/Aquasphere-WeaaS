import React from 'react';
import Icon from '../ui/Icon';

const TechnologyPage: React.FC = () => {
    return (
        <div className="py-24 bg-primary-bg">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-text-primary">The Technology Behind AuraSphere</h1>
                    <p className="mt-4 text-xl text-text-secondary">
                        Our platform is built on a foundation of cutting-edge research in physics-based simulation, digital twin technology, and intelligent surface design.
                    </p>
                </div>

                <div className="mt-20 space-y-16">
                    {/* Section 1: Reconfigurable Intelligent Surfaces */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-primary-accent">Reconfigurable Intelligent Surfaces (RIS)</h2>
                            <p className="mt-4 text-text-secondary">
                                RIS technology moves beyond passively reflecting signals. These digitally-controlled metasurfaces can precisely manipulate electromagnetic waves, turning obstacles into propagation paths and sculpting wireless coverage with unprecedented precision. We provide the tools to harness this revolutionary hardware.
                            </p>
                        </div>
                        <div className="bg-secondary-bg p-8 rounded-lg border border-border">
                            <p className="text-center text-text-secondary">[Clean diagram of phase shifting and beamforming will be placed here]</p>
                        </div>
                    </div>

                    {/* Section 2: Digital Twin & Simulation Engine */}
                     <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="lg:order-2">
                            <h2 className="text-3xl font-bold text-primary-accent">Digital Twin & Simulation Engine</h2>
                            <p className="mt-4 text-text-secondary">
                                Accuracy is not optional. By ingesting high-fidelity LiDAR scan data, AuraSphere creates a millimeter-accurate digital twin of your environment. Our proprietary ray-tracing and FDTD simulation engine models the complex physics of wave propagation, including reflection, diffraction, and material interaction, to deliver results you can trust.
                            </p>
                        </div>
                        <div className="bg-secondary-bg p-8 rounded-lg border border-border lg:order-1">
                            <p className="text-center text-text-secondary">[Infographic showing LiDAR data transforming into a 3D model with ray-tracing paths will be placed here]</p>
                        </div>
                    </div>

                     {/* Section 3: Security & Data Privacy */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-primary-accent">Security & Data Privacy</h2>
                            <p className="mt-4 text-text-secondary">
                                We understand the sensitivity of your facility data and network designs. Security is architected into every layer of the AuraSphere platform, from end-to-end encryption of your data to robust access controls and enterprise-grade infrastructure.
                            </p>
                        </div>
                         <div className="bg-secondary-bg p-8 rounded-lg border border-border flex justify-around items-center">
                            <div className="text-center">
                                <Icon name="shield-check" className="w-12 h-12 mx-auto text-green-400" />
                                <p className="mt-2 font-semibold">SOC 2 Compliant</p>
                            </div>
                             <div className="text-center">
                                <Icon name="lock" className="w-12 h-12 mx-auto text-text-primary" />
                                <p className="mt-2 font-semibold">Data Encryption</p>
                            </div>
                             <div className="text-center">
                                <Icon name="key" className="w-12 h-12 mx-auto text-text-primary" />
                                <p className="mt-2 font-semibold">GDPR Ready</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnologyPage;