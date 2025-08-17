import React from 'react';

interface LegalPageProps {
    page: 'terms' | 'privacy';
}

const legalContent = {
    terms: {
        title: "Terms of Service",
        sections: [
            {
                summary: "This is your agreement with us. By using AuraSphere, you agree to these terms.",
                fullText: "1. Acceptance of Terms. By accessing or using the AuraSphere platform ('Service'), provided by AuraSphere, Inc. ('Company'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to all of these Terms, do not use the Service."
            },
            {
                summary: "You are responsible for what you do on the platform and for keeping your account secure.",
                fullText: "2. User Conduct and Responsibilities. You are solely responsible for your conduct and any data, text, files, information, usernames, images, graphics, photos, profiles, audio and video clips, sounds, musical works, works of authorship, applications, links and other content or materials (collectively, 'Content') that you submit, post or display on or via the Service. You agree to comply with all laws, rules and regulations (for example, federal, state, local and provincial) applicable to your use of the Service and your Content."
            }
        ]
    },
    privacy: {
        title: "Privacy Policy",
        sections: [
            {
                summary: "We collect information you provide, like your name and email, and data about how you use the service.",
                fullText: "1. Information We Collect. We collect information you provide directly to us, such as when you create an account, update your profile, use the interactive features of our services, and communicate with us. The types of information we may collect include your name, email address, company information, and any other information you choose to provide. We also automatically collect information when you use our services, including log information and device information."
            },
            {
                summary: "We use this information to provide and improve our service, and to communicate with you.",
                fullText: "2. How We Use Your Information. We may use the information we collect for various purposes, including to: Provide, maintain, and improve our services; Process transactions and send you related information; Send you technical notices, updates, security alerts, and support messages; Respond to your comments, questions, and requests and provide customer service; Communicate with you about products, services, offers, and events offered by Company and others, and provide news and information we think will be of interest to you."
            }
        ]
    }
}


const LegalPage: React.FC<LegalPageProps> = ({ page }) => {
    const content = legalContent[page];

    return (
        <div className="py-24 bg-primary-bg">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-text-primary">{content.title}</h1>
                    <p className="mt-2 text-text-secondary">Last updated: July 30, 2024</p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Full Legal Text Column */}
                        <div className="lg:col-span-2 prose prose-invert max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary">
                            <h2>Full {content.title}</h2>
                            {content.sections.map((section, index) => (
                                <p key={index} dangerouslySetInnerHTML={{ __html: section.fullText }}></p>
                            ))}
                        </div>

                        {/* Plain English Summary Column */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-secondary-bg border border-border rounded-lg p-6">
                                <h3 className="text-xl font-bold text-text-primary">Plain English Summary</h3>
                                <div className="mt-6 space-y-6">
                                    {content.sections.map((section, index) => (
                                        <div key={index}>
                                            <p className="font-semibold text-text-primary">Section {index + 1}</p>
                                            <p className="mt-1 text-sm text-text-secondary">{section.summary}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;