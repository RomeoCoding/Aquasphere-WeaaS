
import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  srLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, label, srLabel }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={enabled}
          onChange={() => onChange(!enabled)}
        />
         <div className={`block w-14 h-8 rounded-full transition ${enabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${enabled ? 'translate-x-6' : ''}`}></div>
      </div>
      {label && <span className="ml-3 text-gray-700 dark:text-gray-300 font-medium">{label}</span>}
      {srLabel && <span className="sr-only">{srLabel}</span>}
    </label>
  );
};

export default ToggleSwitch;
