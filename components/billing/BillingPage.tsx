
import React from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

const BillingPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Billing</h1>
       <Card className="p-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
            <Icon name="card" className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h2 className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300">Billing & Subscriptions</h2>
            <p className="mt-1 text-sm">View your current plan, manage payment methods, and see your invoice history.</p>
        </div>
      </Card>
    </div>
  );
};

export default BillingPage;