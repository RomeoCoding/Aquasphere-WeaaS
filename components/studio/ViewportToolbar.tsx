import React from 'react';
import { CameraMode, ViewSetting } from '../../types';
import Icon from '../ui/Icon';

interface ViewportToolbarProps {
  cameraMode: CameraMode;
  setCameraMode: (mode: CameraMode) => void;
  viewSetting: ViewSetting;
  setViewSetting: (setting: ViewSetting) => void;
}

const ToolbarButton: React.FC<{
  label: string;
  icon: any;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    title={label}
    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'bg-gray-200/50 dark:bg-gray-900/50 hover:bg-gray-300/70 dark:hover:bg-gray-700/70 text-gray-700 dark:text-gray-200'
    }`}
  >
    <Icon name={icon} className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

const ViewportToolbar: React.FC<ViewportToolbarProps> = ({
  cameraMode,
  setCameraMode,
  viewSetting,
  setViewSetting,
}) => {
  return (
    <div className="absolute top-4 left-4 z-30 flex space-x-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
      <div className="flex space-x-1">
        <ToolbarButton
          label="Orbit"
          icon="orbit"
          isActive={cameraMode === CameraMode.Orbit}
          onClick={() => setCameraMode(CameraMode.Orbit)}
        />
        <ToolbarButton
          label="Walk"
          icon="walk"
          isActive={cameraMode === CameraMode.Walk}
          onClick={() => setCameraMode(CameraMode.Walk)}
        />
      </div>
      <div className="w-px bg-gray-300 dark:bg-gray-600"></div>
      <div className="flex space-x-1">
        <ToolbarButton
          label="Color"
          icon="color"
          isActive={viewSetting === ViewSetting.TrueColor}
          onClick={() => setViewSetting(ViewSetting.TrueColor)}
        />
        <ToolbarButton
          label="Height"
          icon="height"
          isActive={viewSetting === ViewSetting.Height}
          onClick={() => setViewSetting(ViewSetting.Height)}
        />
        <ToolbarButton
          label="Intensity"
          icon="intensity"
          isActive={viewSetting === ViewSetting.Intensity}
          onClick={() => setViewSetting(ViewSetting.Intensity)}
        />
      </div>
    </div>
  );
};

export default ViewportToolbar;
