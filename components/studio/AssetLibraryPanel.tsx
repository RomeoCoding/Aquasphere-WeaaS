import React from 'react';
import { Asset } from '../../types';
import { MOCK_ASSETS } from '../../constants';
import Icon from '../ui/Icon';

interface AssetLibraryPanelProps {
  onSelectAsset: (asset: Asset) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AssetCard: React.FC<{ asset: Asset; onSelect: () => void }> = ({ asset, onSelect }) => (
    <div 
        onClick={onSelect}
        title={asset.description}
        className="p-2 flex flex-col items-center justify-center text-center rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 hover:ring-2 ring-indigo-500 transition-all"
    >
        <div className="w-10 h-10 mb-2 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Icon name={asset.icon} className="w-8 h-8"/>
        </div>
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{asset.name}</p>
    </div>
);


const AssetLibraryPanel: React.FC<AssetLibraryPanelProps> = ({ onSelectAsset, isOpen, setIsOpen }) => {
  const transmitters = MOCK_ASSETS.filter(a => a.type === 'Transmitter');
  const receivers = MOCK_ASSETS.filter(a => a.type === 'Receiver');
  const surfaces = MOCK_ASSETS.filter(a => a.type === 'RIS');

  return (
    <div className={`relative h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md z-30 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-16 bg-gray-200 dark:bg-gray-700 hover:bg-indigo-200 dark:hover:bg-indigo-700 rounded-r-md border-y border-r border-gray-300 dark:border-gray-600 flex items-center justify-center">
            <Icon name="arrow" className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <div className={`p-4 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Asset Library</h3>
            <div className="space-y-4">
                <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">Transmitters</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {transmitters.map(asset => <AssetCard key={asset.id} asset={asset} onSelect={() => onSelectAsset(asset)} />)}
                    </div>
                </div>
                 <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">Receivers</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {receivers.map(asset => <AssetCard key={asset.id} asset={asset} onSelect={() => onSelectAsset(asset)} />)}
                    </div>
                </div>
                 <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">Surfaces</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {surfaces.map(asset => <AssetCard key={asset.id} asset={asset} onSelect={() => onSelectAsset(asset)} />)}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AssetLibraryPanel;