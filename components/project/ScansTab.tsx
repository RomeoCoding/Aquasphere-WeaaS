
import React, { useState } from 'react';
import { Scan } from '../../types';
import Button from '../ui/Button';
import ScanCard from './ScanCard';
import ScanDetailsModal from './ScanDetailsModal';

interface ScansTabProps {
  scans: Scan[];
}

const ScansTab: React.FC<ScansTabProps> = ({ scans }) => {
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
  const isModalOpen = !!selectedScan;

  const handleShowDetails = (scan: Scan) => {
    setSelectedScan(scan);
  };

  const handleCloseModal = () => {
    setSelectedScan(null);
  };

  return (
    <div>
      {isModalOpen && <ScanDetailsModal scan={selectedScan!} onClose={handleCloseModal} />}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Uploaded Scans</h3>
        <Button variant="primary" icon="upload">
          Upload Scan
        </Button>
      </div>
      <div className="space-y-4">
        {scans.length > 0 ? (
          scans.map(scan => <ScanCard key={scan.id} scan={scan} onShowDetails={handleShowDetails} />)
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400">No Scans Uploaded</h4>
            <p className="text-gray-500 mt-1">Upload a LiDAR scan to begin your simulation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScansTab;