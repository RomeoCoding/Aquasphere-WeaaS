import React from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

const BillingPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Billing & Subscriptions</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan */}
        <div className="lg:col-span-2">
            <Card>
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-semibold">Current Plan</h2>
                </div>
                <div className="p-6 flex justify-between items-start">
                    <div>
                        <p className="text-3xl font-bold">Pro Plan</p>
                        <p className="text-text-secondary mt-1">$499 / month</p>
                        <ul className="text-sm mt-4 space-y-2 text-text-secondary">
                            <li className="flex items-center"><Icon name="plus" className="w-4 h-4 mr-2 text-primary-accent"/>Unlimited simulations</li>
                            <li className="flex items-center"><Icon name="plus" className="w-4 h-4 mr-2 text-primary-accent"/>Up to 10 team members</li>
                            <li className="flex items-center"><Icon name="plus" className="w-4 h-4 mr-2 text-primary-accent"/>Priority support</li>
                        </ul>
                    </div>
                    <div>
                        <Button variant="secondary">Change Plan</Button>
                    </div>
                </div>
            </Card>
        </div>

        {/* Payment Method */}
        <div>
             <Card>
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4 p-4 rounded-md bg-secondary-bg border border-border">
                        <Icon name="card" className="w-8 h-8 text-text-primary" />
                        <div>
                            <p className="font-semibold">Visa ending in 4242</p>
                            <p className="text-sm text-text-secondary">Expires 12/2026</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full mt-4">Update Payment Method</Button>
                </div>
            </Card>
        </div>

        {/* Invoice History */}
        <div className="lg:col-span-3">
             <Card className="p-0">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-semibold">Invoice History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-secondary uppercase bg-primary-bg">
                            <tr>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Amount</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3 text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border">
                                <td className="px-6 py-4 font-medium">July 1, 2024</td>
                                <td className="px-6 py-4">$499.00</td>
                                <td className="px-6 py-4"><span className="text-green-400">Paid</span></td>
                                <td className="px-6 py-4 text-right"><a href="#" className="font-medium text-primary-accent hover:underline">Download</a></td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="px-6 py-4 font-medium">June 1, 2024</td>
                                <td className="px-6 py-4">$499.00</td>
                                <td className="px-6 py-4"><span className="text-green-400">Paid</span></td>
                                <td className="px-6 py-4 text-right"><a href="#" className="font-medium text-primary-accent hover:underline">Download</a></td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="px-6 py-4 font-medium">May 1, 2024</td>
                                <td className="px-6 py-4">$499.00</td>
                                <td className="px-6 py-4"><span className="text-green-400">Paid</span></td>
                                <td className="px-6 py-4 text-right"><a href="#" className="font-medium text-primary-accent hover:underline">Download</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>

      </div>
    </div>
  );
};

export default BillingPage;
