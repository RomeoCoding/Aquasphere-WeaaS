import React from 'react';
import { user1, user2, user3, user4 } from '../../constants';

const TeamMemberCard: React.FC<{ name: string; title: string; avatarUrl: string }> = ({ name, title, avatarUrl }) => (
    <div className="text-center">
        <img className="w-32 h-32 rounded-full mx-auto" src={avatarUrl} alt={name} />
        <h4 className="mt-4 text-xl font-bold text-text-primary">{name}</h4>
        <p className="text-text-secondary">{title}</p>
    </div>
);

const AboutUsPage: React.FC = () => {
    return (
        <div className="py-24 bg-primary-bg">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-text-primary">We're Engineering the Future of Wireless</h1>
                    <p className="mt-4 text-xl text-text-secondary">
                        AuraSphere was founded by a team of RF engineers, physicists, and software developers who believe that wireless connectivity shouldn't be left to chance. Our mission is to provide the tools that enable innovation, from private 5G networks in smart factories to next-generation Wi-Fi in the world's most complex venues.
                    </p>
                </div>

                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-text-primary text-center">Meet the Team</h2>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        <TeamMemberCard name={user1.name} title="CEO & Co-Founder" avatarUrl={user1.avatarUrl} />
                        <TeamMemberCard name={user2.name} title="CTO & Co-Founder" avatarUrl={user2.avatarUrl} />
                        <TeamMemberCard name={user3.name} title="Head of Product" avatarUrl={user3.avatarUrl} />
                        <TeamMemberCard name={user4.name} title="Lead RF Scientist" avatarUrl={user4.avatarUrl} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
