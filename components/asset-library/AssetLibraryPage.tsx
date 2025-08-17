
import React from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

const AssetLibraryPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Asset Library</h1>
      <Card className="p-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
            <Icon name="grid" className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h2 className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300">Asset Library Under Construction</h2>
            <p className="mt-1 text-sm">This section will contain a global library of RF assets for your projects.</p>
        </div>
      </Card>
    </div>
  );
};

export default AssetLibraryPage;