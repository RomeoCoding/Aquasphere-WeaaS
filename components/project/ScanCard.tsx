
import React from 'react';
import { Scan, ScanStatus } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ScanCardProps {
  scan: Scan;
  onShowDetails: (scan: Scan) => void;
}

const StatusBadge: React.FC<{ status: ScanStatus }> = ({ status }) => {
  const statusStyles = {
    [ScanStatus.Processed]: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300',
    [ScanStatus.Processing]: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 animate-pulse',
    [ScanStatus.Failed]: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

const ScanCard: React.FC<ScanCardProps> = ({ scan, onShowDetails }) => {
  return (
    <Card className="flex items-center p-4 space-x-4">
      <img src={scan.previewUrl} alt="Scan preview" className="w-24 h-24 object-cover rounded-md bg-gray-200 dark:bg-gray-700" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{scan.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{scan.filename}</p>
            </div>
            <StatusBadge status={scan.status} />
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <span>Size: {scan.fileSize}</span>
          <span>Uploaded: {scan.uploadDate}</span>
        </div>
      </div>
       <Button variant="secondary" onClick={() => onShowDetails(scan)}>Details</Button>
    </Card>
  );
};

export default ScanCard;