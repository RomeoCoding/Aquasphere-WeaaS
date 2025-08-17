import React, { useState, useRef, useEffect } from 'react';
import { SceneObject, AssetType } from '../../types';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

interface SceneHierarchyProps {
    sceneObjects: SceneObject[];
    selectedObjectId: string | null;
    onSelectObject: (id: string | null) => void;
    onUpdateObject: (object: SceneObject) => void;
    onDeleteObject: (id: string) => void;
}

const getIconForType = (type: AssetType) => {
    switch(type) {
        case AssetType.Transmitter: return 'wifi';
        case AssetType.Receiver: return 'laptop';
        case AssetType.RIS: return 'ris';
        default: return 'folder';
    }
}

const SceneObjectItem: React.FC<{
    object: SceneObject;
    isSelected: boolean;
    onSelect: () => void;
    onUpdate: (object: SceneObject) => void;
    onDelete: () => void;
}> = ({ object, isSelected, onSelect, onUpdate, onDelete }) => {
    const [isRenaming, setIsRenaming] = useState(false);
    const [name, setName] = useState(object.name);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isRenaming) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isRenaming]);
    
    const handleRename = () => {
        if (name.trim()) {
            onUpdate({ ...object, name: name.trim() });
        } else {
            setName(object.name); // Revert if empty
        }
        setIsRenaming(false);
    };

    return (
        <li 
            className={`flex items-center justify-between p-2 text-sm rounded-md cursor-pointer group ${isSelected ? 'bg-indigo-600/20 dark:bg-indigo-500/30' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            onClick={onSelect}
        >
            <div className="flex items-center space-x-2 truncate">
                <Icon name={getIconForType(object.type)} className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                {isRenaming ? (
                     <input 
                        ref={inputRef}
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-transparent border-b border-indigo-500 focus:outline-none text-gray-900 dark:text-white"
                     />
                ) : (
                    <span 
                        onDoubleClick={() => setIsRenaming(true)}
                        className={`truncate ${object.visible ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500 italic'}`}
                    >
                        {object.name}
                    </span>
                )}
            </div>
            <div className={`flex items-center space-x-1 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <button onClick={(e) => { e.stopPropagation(); onUpdate({ ...object, visible: !object.visible }); }} title={object.visible ? 'Hide' : 'Show'} className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
                    <Icon name={object.visible ? 'visible' : 'hidden'} className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} title="Delete" className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
                    <Icon name="delete" className="w-4 h-4 text-red-500 dark:text-red-400"/>
                </button>
            </div>
        </li>
    );
};

const SceneHierarchy: React.FC<SceneHierarchyProps> = ({ sceneObjects, selectedObjectId, onSelectObject, onUpdateObject, onDeleteObject }) => {
  const groupedObjects = sceneObjects.reduce((acc, obj) => {
    if (!acc[obj.type]) acc[obj.type] = [];
    acc[obj.type].push(obj);
    return acc;
  }, {} as Record<AssetType, SceneObject[]>);

  return (
    <div className="absolute top-20 left-4 w-72 h-[calc(100vh-140px)] z-20">
      <Card className="w-full h-full p-0 flex flex-col backdrop-blur-lg bg-white/70 dark:bg-gray-900/70">
        <h3 className="text-lg font-semibold p-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Scene Hierarchy</h3>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {Object.entries(groupedObjects).map(([type, objects]) => (
                <div key={type}>
                    <h4 className="px-2 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">{type}s</h4>
                    <ul>
                        {objects.map(obj => (
                            <SceneObjectItem
                                key={obj.id}
                                object={obj}
                                isSelected={obj.id === selectedObjectId}
                                onSelect={() => onSelectObject(obj.id)}
                                onUpdate={onUpdateObject}
                                onDelete={() => onDeleteObject(obj.id)}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default SceneHierarchy;
