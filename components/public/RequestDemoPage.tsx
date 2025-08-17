import React from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const RequestDemoPage: React.FC = () => {
    return (
        <div className="py-24 bg-secondary-bg">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-text-primary">See AuraSphere in Action</h1>
                        <p className="mt-4 text-lg text-text-secondary">
                            Schedule a personalized demo with one of our solutions experts. We'll tailor the presentation to your specific industry challenges and show you how AuraSphere can de-risk your next-generation wireless deployments.
                        </p>
                        <ul className="mt-8 space-y-4 text-text-primary">
                            <li className="flex items-start">
                                <span className="text-primary-accent font-bold mr-3 mt-1">&#10003;</span>
                                See how to build a digital twin from LiDAR data in minutes.
                            </li>
                             <li className="flex items-start">
                                <span className="text-primary-accent font-bold mr-3 mt-1">&#10003;</span>
                                Explore advanced simulation scenarios for 5G and Wi-Fi 6E.
                            </li>
                             <li className="flex items-start">
                                <span className="text-primary-accent font-bold mr-3 mt-1">&#10003;</span>
                                Get answers to your specific technical and business questions.
                            </li>
                        </ul>
                    </div>
                    <div className="bg-primary-bg p-8 border border-border rounded-lg shadow-2xl">
                        <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Request Your Demo</h2>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thank you! A solutions expert will contact you within 24 hours."); }}>
                            <Input label="Full Name" id="name" type="text" placeholder="Jane Doe" required />
                            <Input label="Work Email" id="email" type="email" placeholder="jane.doe@company.com" required />
                            <Input label="Company" id="company" type="text" placeholder="Your Company Name" required />
                            <Input label="Role" id="role" type="text" placeholder="e.g., VP of Engineering" />
                             <div>
                                <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tell us about your project or challenge (optional)</label>
                                <textarea
                                    id="challenge"
                                    rows={4}
                                    className="w-full bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g., 'We are planning a private 5G network for our new factory...'"
                                />
                            </div>
                            <Button type="submit" variant="primary" className="w-full py-3">Submit Request</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDemoPage;