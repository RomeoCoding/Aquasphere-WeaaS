
import React, { useState } from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { currentUser } from '../../constants';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Details Card */}
        <div className="lg:col-span-2">
            <Card className="p-0">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                    <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-6 mb-8">
                        <div className="relative">
                            <img src={currentUser.avatarUrl} alt="Profile" className="w-24 h-24 rounded-full"/>
                            <button className="absolute bottom-0 right-0 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-indigo-700">
                                <Icon name="upload" className="w-4 h-4"/>
                            </button>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400">RF Simulation Engineer</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                       <Input label="Full Name" id="name" defaultValue={currentUser.name} disabled={!isEditing} />
                       <Input label="Email Address" id="email" type="email" defaultValue="demo@aurasphere.io" disabled={!isEditing} />
                       <Input label="Title" id="title" defaultValue="RF Simulation Engineer" disabled={!isEditing} />
                    </div>

                    {isEditing && (
                        <div className="mt-6 flex justify-end">
                            <Button variant="primary" onClick={() => setIsEditing(false)}>Save Changes</Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>

        {/* Security Card */}
        <div>
            <Card className="p-0">
                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security</h2>
                </div>
                <div className="p-6 space-y-4">
                    <Input label="Current Password" id="current-password" type="password" />
                    <Input label="New Password" id="new-password" type="password" />
                    <Input label="Confirm New Password" id="confirm-password" type="password" />
                     <div className="pt-2">
                        <Button variant="primary" className="w-full">Update Password</Button>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;