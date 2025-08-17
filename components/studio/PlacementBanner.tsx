import React from 'react';
import Icon from '../ui/Icon';

interface PlacementBannerProps {
  assetName: string;
  onCancel: () => void;
}

const PlacementBanner: React.FC<PlacementBannerProps> = ({ assetName, onCancel }) => {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-indigo-600 text-white rounded-lg shadow-lg flex items-center px-4 py-2 text-sm">
      <span>
        Placing: <strong>{assetName}</strong>. Click on a surface to place. Press [ESC] to cancel.
      </span>
      <button onClick={onCancel} className="ml-4 text-indigo-200 hover:text-white">
        <Icon name="close" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PlacementBanner;
