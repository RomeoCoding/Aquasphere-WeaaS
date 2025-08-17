
import React from 'react';
import { Scan } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ScanDetailsModalProps {
  scan: Scan;
  onClose: () => void;
}

const ScanDetailsModal: React.FC<ScanDetailsModalProps> = ({ scan, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:text-gray-500 dark:hover:text-white"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{scan.name}</h3>
        <div className="space-y-3 text-gray-600 dark:text-gray-300">
            <p><strong>Filename:</strong> {scan.filename}</p>
            <p><strong>File Size:</strong> {scan.fileSize}</p>
            <p><strong>Upload Date:</strong> {scan.uploadDate}</p>
            <p><strong>Status:</strong> {scan.status}</p>
            {scan.pointCount && <p><strong>Point Count:</strong> {scan.pointCount.toLocaleString()}</p>}
        </div>
        <div className="mt-6 flex justify-end">
            <Button onClick={onClose} variant="secondary">Close</Button>
        </div>
      </Card>
    </div>
  );
};

export default ScanDetailsModal;