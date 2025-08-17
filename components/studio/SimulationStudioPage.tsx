import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Project, ZoneKPI, SceneObject, Page, Theme, Asset, AssetType, CameraMode, ViewSetting, TransmitterProperties, ReceiverProperties, RISProperties, ChatMessage, AnnotationData, SimulationLog, HeatmapData, Simulation, SimulationStatus } from '../../types';
import { MOCK_ASSETS, MOCK_CHANNELS, MOCK_MESSAGES, systemUser, currentUser, ICONS } from '../../constants';
import { generateSimulationSummary } from '../../services/geminiService';
import LoadingOverlay from './LoadingOverlay';
import SimulationConfigModal from './SimulationConfigModal';
import Icon from '../ui/Icon';
import PlacementBanner from './PlacementBanner';
import { generateHeatmapData } from '../../utils/simulation';
import SimulationProgressOverlay from './SimulationProgressOverlay';
import HeatmapDisplay from './HeatmapDisplay';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Slider from '../ui/Slider';
import Select from '../ui/Select';
import ToggleSwitch from '../ui/ToggleSwitch';

// Sub-components defined in-file for cohesion, as per design mandate
// These could be broken out into separate files if they grow more complex.

// #region --- Studio Sidebar Components ---

const DesignToolkitPanel: React.FC<{
    sceneObjects: SceneObject[];
    selectedObject: SceneObject | null;
    onSelectObject: (id: string | null) => void;
    onUpdateObject: (object: SceneObject) => void;
    onDeleteObject: (id: string) => void;
    onSelectAssetToPlace: (asset: Asset) => void;
}> = ({ sceneObjects, selectedObject, onSelectObject, onUpdateObject, onDeleteObject, onSelectAssetToPlace }) => {
    
    const renderPropertiesInspector = () => {
        if (!selectedObject) {
            return <div className="p-4 text-center text-sm text-text-secondary">Select an object in the Scene Hierarchy to view its properties.</div>;
        }

        const handlePropertyChange = (newProps: Partial<SceneObject['properties']>) => {
            onUpdateObject({ ...selectedObject, properties: { ...selectedObject.properties, ...newProps } });
        };

        const InspectorContent = () => {
            switch(selectedObject.type) {
                case AssetType.Transmitter: {
                    const props = selectedObject.properties as TransmitterProperties;
                    return (
                        <div className="space-y-4">
                            <Slider label="Tx Power (dBm)" min={0} max={30} step={1} value={props.transmitPower} onChange={v => handlePropertyChange({ transmitPower: v })} />
                            <Select label="Frequency (GHz)" value={String(props.frequency)} onChange={e => handlePropertyChange({ frequency: parseFloat(e.target.value) })}>
                                <option value="2.4">2.4 GHz</option><option value="5">5 GHz</option><option value="28">28 GHz</option><option value="60">60 GHz</option>
                            </Select>
                            <Select label="Antenna Pattern" value={props.antennaPattern} onChange={e => handlePropertyChange({ antennaPattern: e.target.value as any })}>
                                <option value="Omnidirectional">Omnidirectional</option><option value="Directional">Directional</option>
                            </Select>
                        </div>
                    );
                }
                case AssetType.Receiver: {
                    const props = selectedObject.properties as ReceiverProperties;
                    return <Slider label="Rx Sensitivity (dBm)" min={-100} max={-30} step={1} value={props.sensitivity} onChange={v => handlePropertyChange({ sensitivity: v })} />;
                }
                case AssetType.RIS: {
                    const props = selectedObject.properties as RISProperties;
                    return (
                         <Select label="Phase Bit-Depth" value={props.phaseBitDepth} onChange={e => handlePropertyChange({ phaseBitDepth: e.target.value as any })}>
                            <option value="Continuous">Continuous (Ideal)</option><option value="2-bit">2-bit</option><option value="1-bit">1-bit</option>
                        </Select>
                    );
                }
                default: return null;
            }
        };

        return (
            <div className="p-4">
                <h4 className="font-bold text-text-primary mb-4">{selectedObject.name}</h4>
                <InspectorContent />
            </div>
        );
    };

    const getIconForType = (type: AssetType): keyof typeof ICONS => {
        switch(type) {
            case AssetType.Transmitter: return 'wifi';
            case AssetType.Receiver: return 'laptop';
            case AssetType.RIS: return 'ris';
            default: return 'folder';
        }
    }

    return (
        <div className="flex flex-col h-full">
            {/* Asset Library Section */}
            <div className="p-4 border-b border-border">
                <h3 className="text-sm font-bold uppercase text-text-secondary tracking-wider">Place Asset</h3>
                <div className="grid grid-cols-4 gap-2 mt-2">
                    {MOCK_ASSETS.map(asset => (
                        <button key={asset.id} onClick={() => onSelectAssetToPlace(asset)} title={asset.name} className="flex flex-col items-center p-2 rounded-md bg-secondary-bg hover:bg-border transition-colors">
                            <Icon name={asset.icon as any} className="w-6 h-6 text-primary-accent" />
                            <span className="text-xs mt-1 text-text-secondary truncate">{asset.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Scene Hierarchy Section */}
            <div className="p-4 border-b border-border flex-1 overflow-y-auto">
                <h3 className="text-sm font-bold uppercase text-text-secondary tracking-wider mb-2">Scene Hierarchy</h3>
                {sceneObjects.length > 0 ? (
                    <ul className="space-y-1">
                        {sceneObjects.map(obj => (
                             <li 
                                key={obj.id}
                                onClick={() => onSelectObject(obj.id)}
                                className={`flex items-center justify-between p-2 text-sm rounded-md cursor-pointer group ${selectedObject?.id === obj.id ? 'bg-primary-accent/20 text-text-primary' : 'hover:bg-secondary-bg'}`}
                            >
                                <div className="flex items-center space-x-2 truncate">
                                    <Icon name={getIconForType(obj.type)} className="w-4 h-4 text-text-secondary flex-shrink-0" />
                                    <span className="truncate">{obj.name}</span>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); onDeleteObject(obj.id); }} title="Delete" className="p-1 rounded hover:bg-border opacity-0 group-hover:opacity-100">
                                    <Icon name="delete" className="w-4 h-4 text-red-500"/>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-sm text-text-secondary py-4">No objects in scene.</div>
                )}
            </div>

            {/* Properties Inspector Section */}
            <div className="p-4">
                <h3 className="text-sm font-bold uppercase text-text-secondary tracking-wider mb-2">Properties Inspector</h3>
                <Card className="bg-primary-bg">
                    {renderPropertiesInspector()}
                </Card>
            </div>
        </div>
    );
};

const ResultsInspectorPanel: React.FC<{
    simulation: Simulation;
    heatmapVisible: boolean;
    setHeatmapVisible: (visible: boolean) => void;
}> = ({ simulation, heatmapVisible, setHeatmapVisible }) => {
    return (
        <div className="p-4 space-y-4">
            <div>
                <h3 className="text-sm font-bold uppercase text-text-secondary tracking-wider">Simulation Summary</h3>
                <Card className="p-3 mt-2 space-y-2">
                    <p className="font-bold text-text-primary">{simulation.name}</p>
                    <p className="text-xs text-text-secondary"><strong>Goal:</strong> {simulation.objective}</p>
                    <div className="pt-2">
                        <ToggleSwitch enabled={heatmapVisible} onChange={setHeatmapVisible} label="Show Heatmap" />
                    </div>
                </Card>
            </div>
             <div>
                <h3 className="text-sm font-bold uppercase text-text-secondary tracking-wider">Global KPIs</h3>
                <Card className="p-3 mt-2 space-y-2 text-sm">
                    <div className="flex justify-between"><span>Fitness Score:</span> <span className="font-mono text-green-400">0.982</span></div>
                    <div className="flex justify-between"><span>Avg. Coverage:</span> <span className="font-mono">94.1%</span></div>
                </Card>
            </div>
             <div>
                <h3 className="text-sm font-bold uppercase text-text-secondary tracking-wider">Detailed Analytics</h3>
                <Card className="p-3 mt-2">
                    {/* Placeholder for detailed metrics */}
                    <p className="text-center text-sm text-text-secondary py-4">Detailed zone and receiver analytics will be displayed here.</p>
                </Card>
            </div>
        </div>
    );
};

// #endregion

// #region --- Studio Bottom Bar & Viewport Components ---

const StudioBottomBar: React.FC<{
    isResultsView: boolean;
    onLaunch: () => void;
    onConfigure: () => void;
}> = ({ isResultsView, onLaunch, onConfigure }) => (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-secondary-bg/80 backdrop-blur-md border-t border-border z-20 flex items-center justify-between px-6">
        {isResultsView ? (
            <div>
                <Button variant="secondary">Compare Results</Button>
            </div>
        ) : (
            <>
                <Button variant="secondary" onClick={onConfigure}>Configure Simulation</Button>
                <Button variant="primary" icon="play" onClick={onLaunch}>LAUNCH SIMULATION</Button>
            </>
        )}
    </div>
);

const HeatmapLegend: React.FC = () => (
    <div className="absolute bottom-24 right-4 z-20 p-3 rounded-lg bg-secondary-bg/80 backdrop-blur-md border border-border text-xs">
        <p className="font-bold mb-2 text-text-primary">Signal Strength (dBm)</p>
        <div className="flex">
            <div className="w-4 h-32 bg-gradient-to-t from-[#440154] via-[#21918c] to-[#fde725] rounded-sm"></div>
            <div className="ml-2 flex flex-col justify-between h-32 text-text-secondary">
                <span>-30</span>
                <span>-65</span>
                <span>-100</span>
            </div>
        </div>
    </div>
);

// #endregion

interface SimulationStudioPageProps {
  project: Project;
  simulation: Simulation | null;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const MOCK_KPIS: ZoneKPI[] = [
    { name: 'Zone-Marketing', coverage: 99.2, avgSNR: 34.1, hasWarning: false },
    { name: 'Zone-Lobby', coverage: 85.4, avgSNR: 22.7, hasWarning: true },
    { name: 'Zone-Conference-Room', coverage: 97.8, avgSNR: 31.5, hasWarning: false },
];

const PlacedObject: React.FC<{ object: SceneObject; isSelected: boolean; onClick: () => void; }> = ({ object, isSelected, onClick }) => {
    const assetInfo = MOCK_ASSETS.find(a => a.type === object.type);
    const color = object.type === AssetType.Transmitter ? 'bg-primary-accent' : object.type === AssetType.Receiver ? 'bg-cyan-500' : 'bg-teal-500';
    
    return (
        <div 
            className={`absolute w-5 h-5 rounded-full ${color} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-lg flex items-center justify-center transition-all duration-200 ${isSelected ? 'ring-4 ring-yellow-400' : 'ring-2 ring-white/50'}`}
            style={{ left: `${(object.properties.position.x / 10) * 100}%`, top: `${(object.properties.position.y / 10) * 100}%`, zIndex: 5 }}
            title={object.name}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
             {assetInfo?.icon && <Icon name={assetInfo.icon as any} className="w-3 h-3 text-white" />}
        </div>
    );
};


const SimulationStudioPage: React.FC<SimulationStudioPageProps> = ({ project, simulation, theme, setTheme }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResultsView, setIsResultsView] = useState(!!simulation);
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<SimulationLog[]>([]);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [heatmapData, setHeatmapData] = useState<HeatmapData>(null);
  const [heatmapVisible, setHeatmapVisible] = useState(true);

  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [assetToPlace, setAssetToPlace] = useState<Asset | null>(null);
  const [ghostPosition, setGhostPosition] = useState<{x: number, y: number} | null>(null);
  
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [interactiveProbe, setInteractiveProbe] = useState<{pos: {x: string, y: string}, value: number} | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const selectedObject = sceneObjects.find(obj => obj.id === selectedObjectId) || null;
  const isPlacingAsset = !!assetToPlace;
  
  // Effect to handle initial mode
  useEffect(() => {
    setIsResultsView(!!simulation);
    if (simulation) {
        // If we load into results view, generate some heatmap data
        const dummyObjects: SceneObject[] = [
            { id: `asset-1`, assetId: 'tx-wifi', name: `Wi-Fi 6E AP-1`, type: AssetType.Transmitter, visible: true, properties: { position: {x:2,y:3,z:1}, rotation:{x:0,y:0,z:0}, transmitPower: 20, frequency: 5, antennaPattern: 'Omnidirectional' } },
            { id: `asset-2`, assetId: 'tx-wifi', name: `Wi-Fi 6E AP-2`, type: AssetType.Transmitter, visible: true, properties: { position: {x:8,y:7,z:1}, rotation:{x:0,y:0,z:0}, transmitPower: 22, frequency: 5, antennaPattern: 'Omnidirectional' } }
        ];
        setSceneObjects(dummyObjects);
        setHeatmapData(generateHeatmapData(dummyObjects));
    }
  }, [simulation]);

  const handleLoaded = () => setIsLoading(false);
  useEffect(() => {
    const timer = setTimeout(handleLoaded, 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);
  
  const handleLaunchSimulation = () => {
    setIsSimulating(true);
    setSimulationLogs([]);
    setSimulationProgress(0);

    let logId = 0;
    const addLog = (message: string, stage: SimulationLog['stage']) => {
      setSimulationLogs(prev => [...prev, { id: logId++, message, stage }]);
    };

    addLog('Job added to queue...', 'QUEUE');
    setSimulationProgress(10);

    setTimeout(() => {
        addLog('Worker picked up job.', 'WORKER');
        setSimulationProgress(25);
    }, 1000);
    
    const simInterval = setInterval(() => {
        setSimulationProgress(p => Math.min(p + 5, 90));
    }, 250);

    setTimeout(() => {
        clearInterval(simInterval);
        setSimulationProgress(100);
        addLog('Simulation complete.', 'COMPLETE');
        const results = generateHeatmapData(sceneObjects);
        setHeatmapData(results);
        setTimeout(() => {
            setIsSimulating(false);
            setIsResultsView(true);
        }, 500);
    }, 4000);
  };

  const cancelPlacement = useCallback(() => {
    setAssetToPlace(null);
    setGhostPosition(null);
  }, []);

  const updateSceneObject = (updatedObject: SceneObject) => setSceneObjects(prev => prev.map(obj => obj.id === updatedObject.id ? updatedObject : obj));
  const deleteSceneObject = (id: string) => {
    setSceneObjects(prev => prev.filter(obj => obj.id !== id));
    if (selectedObjectId === id) setSelectedObjectId(null);
  };

  const handleViewportMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlacingAsset || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) setGhostPosition({ x, y });
    else setGhostPosition(null);
  };

 const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    
    const rect = gridRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const xPercent = (clickX / rect.width);
    const yPercent = (clickY / rect.height);
    const pos = { x: xPercent * 10, y: yPercent * 10, z: 1 };
    
    if (isResultsView) {
        // Guard against trying to read properties of an empty or invalid heatmap array
        if (heatmapData && heatmapData.length > 0 && heatmapData[0].length > 0) {
            const gridX = Math.floor(xPercent * heatmapData[0].length);
            const gridY = Math.floor(yPercent * heatmapData.length);
            const value = heatmapData[gridY]?.[gridX];
            if (value !== undefined) {
                 setInteractiveProbe({ pos: { x: `${xPercent*100}%`, y: `${yPercent*100}%` }, value: Math.round(value * 10)/10 });
            }
        }
        return; // Clicks in results view only probe the heatmap
    }

    if (isPlacingAsset && assetToPlace) {
        let newProperties: SceneObject['properties'];
        switch(assetToPlace.type) {
            case AssetType.Transmitter: newProperties = { position: pos, rotation: { x: 0, y: 0, z: 0 }, transmitPower: 20, frequency: 5, antennaPattern: 'Omnidirectional' } as TransmitterProperties; break;
            case AssetType.Receiver: newProperties = { position: pos, rotation: { x: 0, y: 0, z: 0 }, sensitivity: -85 } as ReceiverProperties; break;
            case AssetType.RIS: newProperties = { position: pos, rotation: { x: 0, y: 0, z: 0 }, elementCount: { rows: 16, cols: 16}, phaseBitDepth: 'Continuous' } as RISProperties; break;
            default: return;
        }
        const newAsset: SceneObject = { id: `asset-${Date.now()}`, assetId: assetToPlace.id, name: `${assetToPlace.name}-${sceneObjects.length + 1}`, type: assetToPlace.type, visible: true, properties: newProperties };
        setSceneObjects(prev => [...prev, newAsset]);
        cancelPlacement();
    } else {
        setSelectedObjectId(null);
        setInteractiveProbe(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') cancelPlacement(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cancelPlacement]);

  if (isLoading) {
    return <LoadingOverlay onLoaded={() => {}} />;
  }
  
  return (
    <div className="relative w-full h-full flex bg-primary-bg">
      <SimulationConfigModal isOpen={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)} onLaunch={handleLaunchSimulation} />
      
      {/* --- Left Sidebar: Design Toolkit or Results Inspector --- */}
      <aside className="w-80 h-full bg-secondary-bg border-r border-border flex-shrink-0 overflow-y-auto">
        {isResultsView && simulation ? (
            <ResultsInspectorPanel simulation={simulation} heatmapVisible={heatmapVisible} setHeatmapVisible={setHeatmapVisible} />
        ) : (
            <DesignToolkitPanel 
                sceneObjects={sceneObjects}
                selectedObject={selectedObject}
                onSelectObject={setSelectedObjectId}
                onUpdateObject={updateSceneObject}
                onDeleteObject={deleteSceneObject}
                onSelectAssetToPlace={setAssetToPlace}
            />
        )}
      </aside>

      {/* --- Main Viewport Area --- */}
      <div className="flex-1 relative" onMouseMove={handleViewportMouseMove} onClick={handleViewportClick}>
          {isSimulating && <SimulationProgressOverlay logs={simulationLogs} progress={simulationProgress} />}
          {isPlacingAsset && <PlacementBanner assetName={assetToPlace!.name} onCancel={cancelPlacement} />}
          
          <div className="w-full h-full flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
              <div ref={gridRef} className="w-[90vw] max-w-[1200px] h-[70vh] max-h-[900px] bg-grid-pattern relative transition-transform duration-500" style={{ transform: 'rotateX(60deg) rotateZ(-10deg)', cursor: isPlacingAsset ? 'copy' : (isResultsView ? 'crosshair' : 'default') }}>
                  {isResultsView && heatmapData && heatmapVisible && <HeatmapDisplay heatmapData={heatmapData} opacity={0.65} />}
                  
                  {sceneObjects.filter(o => o.visible).map(obj => <PlacedObject key={obj.id} object={obj} isSelected={obj.id === selectedObjectId} onClick={() => setSelectedObjectId(obj.id)} />)}
                  
                  {isPlacingAsset && ghostPosition && (
                      <div className="absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-center justify-center pointer-events-none ring-2 bg-primary-accent/50 ring-primary-accent" style={{ left: `${ghostPosition.x}%`, top: `${ghostPosition.y}%` }}>
                          <Icon name={assetToPlace!.icon as any} className="w-3 h-3 text-white" />
                      </div>
                  )}

                  {isResultsView && interactiveProbe && (
                    <div className="absolute transform -translate-x-1/2 -translate-y-full p-2 bg-black/80 text-white text-xs rounded-md pointer-events-none" style={{ left: interactiveProbe.pos.x, top: interactiveProbe.pos.y }}>
                        {interactiveProbe.value} dBm
                    </div>
                  )}
              </div>
          </div>
          {isResultsView && heatmapVisible && <HeatmapLegend />}
          <StudioBottomBar isResultsView={isResultsView} onLaunch={handleLaunchSimulation} onConfigure={() => setIsConfigModalOpen(true)} />
      </div>

      <style>{`.bg-grid-pattern { background-image: linear-gradient(theme(colors.border / 0.7) 1px, transparent 1px), linear-gradient(90deg, theme(colors.border / 0.7) 1px, transparent 1px); background-size: 2.5rem 2.5rem; border: 1px solid theme(colors.border); border-radius: 8px; background-color: theme(colors.primary-bg / 0.5); }`}</style>
    </div>
  );
};

export default SimulationStudioPage;