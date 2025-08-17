import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Project, ZoneKPI, SceneObject, Page, Theme, Asset, AssetType, CameraMode, ViewSetting, TransmitterProperties, ReceiverProperties, RISProperties, ChatMessage, AnnotationData, SimulationLog, HeatmapData } from '../../types';
import { MOCK_ASSETS, MOCK_CHANNELS, MOCK_MESSAGES, systemUser, currentUser } from '../../constants';
import { generateSimulationSummary } from '../../services/geminiService';
import TopNavBar from '../layout/TopNavBar';
import LoadingOverlay from './LoadingOverlay';
import SceneHierarchy from './SceneHierarchy';
import PropertiesInspector from './PropertiesInspector';
import SimulationControlBar from './SimulationControlBar';
import SimulationConfigModal from './SimulationConfigModal';
import Icon from '../ui/Icon';
import AssetLibraryPanel from './AssetLibraryPanel';
import PlacementBanner from './PlacementBanner';
import ViewportToolbar from './ViewportToolbar';
import CollaborationPanel from '../collaboration/CollaborationPanel';
import { generateHeatmapData } from '../../utils/simulation';
import SimulationProgressOverlay from './SimulationProgressOverlay';
import HeatmapDisplay from './HeatmapDisplay';


interface SimulationStudioPageProps {
  project: Project;
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
  initialIsResultsView?: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const MOCK_KPIS: ZoneKPI[] = [
    { name: 'Zone-Marketing', coverage: 99.2, avgSNR: 34.1, hasWarning: false },
    { name: 'Zone-Lobby', coverage: 85.4, avgSNR: 22.7, hasWarning: true },
    { name: 'Zone-Conference-Room', coverage: 97.8, avgSNR: 31.5, hasWarning: false },
];

const PlacedObject: React.FC<{ object: SceneObject | AnnotationData & {id: string}; isSelected: boolean; onClick: () => void; isAnnotation?: boolean }> = ({ object, isSelected, onClick, isAnnotation = false }) => {
    const isSceneObject = 'assetId' in object;
    const assetInfo = isSceneObject ? MOCK_ASSETS.find(a => a.type === object.type) : null;
    
    let color, iconName;

    if (isAnnotation) {
        color = 'bg-secondary-accent';
        iconName = 'pin';
    } else if (isSceneObject) {
        color = object.type === AssetType.Transmitter ? 'bg-primary-accent' : object.type === AssetType.Receiver ? 'bg-cyan-500' : 'bg-teal-500';
        iconName = assetInfo?.icon;
    }
    
    const position = isAnnotation ? (object as AnnotationData).pinPosition : (object as SceneObject).properties.position;

    return (
        <div 
            className={`absolute w-5 h-5 rounded-full ${color} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-lg flex items-center justify-center transition-all duration-200 ${isSelected ? 'ring-4 ring-yellow-400' : 'ring-2 ring-white/50'}`}
            style={{ left: `${(position.x / 10) * 100}%`, top: `${(position.y / 10) * 100}%`, zIndex: isAnnotation ? 10 : 5 }}
            title={'name' in object ? object.name : 'Annotation'}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
             {iconName && <Icon name={iconName} className="w-3 h-3 text-white" />}
        </div>
    );
};


const SimulationStudioPage: React.FC<SimulationStudioPageProps> = ({ project, onBack, onLogout, onNavigate, initialIsResultsView = false, theme, setTheme }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResultsView, setIsResultsView] = useState(initialIsResultsView);
  const [summary, setSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  
  // Simulation Engine State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<SimulationLog[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapData>(null);
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.65);

  // Scene and Tool State
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [assetToPlace, setAssetToPlace] = useState<Asset | null>(null);
  const [ghostPosition, setGhostPosition] = useState<{x: number, y: number} | null>(null);
  
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isAssetLibraryOpen, setIsAssetLibraryOpen] = useState(true);
  const [isCollaborationPanelCollapsed, setIsCollaborationPanelCollapsed] = useState(false);

  // Viewport State
  const [cameraMode, setCameraMode] = useState<CameraMode>(CameraMode.Orbit);
  const [viewSetting, setViewSetting] = useState<ViewSetting>(ViewSetting.TrueColor);
  
  // Collaboration State
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [pendingAnnotation, setPendingAnnotation] = useState<AnnotationData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES[MOCK_CHANNELS[project.id][0].id] || []);
  const [highlightedAnnotation, setHighlightedAnnotation] = useState<AnnotationData | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const selectedObject = sceneObjects.find(obj => obj.id === selectedObjectId) || null;
  const isPlacingAsset = !!assetToPlace;

  useEffect(() => { setIsResultsView(initialIsResultsView) }, [initialIsResultsView]);
  const handleLoaded = () => setIsLoading(false);
  
  const addMessage = (newMessage: Omit<ChatMessage, 'id' | 'timestamp' | 'status'>) => {
    const messageWithMeta: ChatMessage = {
      ...newMessage,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'sending',
    };
    setMessages(prev => [...prev, messageWithMeta]);

    // Simulate server confirmation
    setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === messageWithMeta.id ? { ...m, status: 'sent' } : m));
    }, 500);
  };

  const handleLaunchSimulation = () => {
    setIsSimulating(true);
    setSimulationLogs([]);
    setHeatmapData(null);
    setIsResultsView(false);

    const simName = "Q4-High-Fidelity-Test";
    let logId = 0;

    const addLog = (message: string, stage: SimulationLog['stage']) => {
      setSimulationLogs(prev => [...prev, { id: logId++, message, stage }]);
    };

    addMessage({ content: `🤖 **${currentUser.name} started a new simulation:** "${simName}". Status: *Queued*.`, user: systemUser });
    addLog(`Job "${simName}" added to queue (Celery)...`, 'QUEUE');
    
    setTimeout(() => { addLog('Worker picked up job.', 'WORKER'); }, 1000);
    setTimeout(() => { addLog('Initializing 400x400 grid (High Fidelity)...', 'WORKER'); }, 2000);
    setTimeout(() => { addLog('Running Evolutionary Algorithm (Generation 1/50)...', 'SIMULATION'); }, 3000);
    setTimeout(() => { addLog('Running Evolutionary Algorithm (Generation 25/50)...', 'SIMULATION'); }, 4500);
    setTimeout(() => { addLog('Running Evolutionary Algorithm (Generation 50/50)...', 'SIMULATION'); }, 6000);
    setTimeout(() => { addLog('Compressing results to .npz format...', 'COMPLETE'); }, 7000);
    setTimeout(() => { addLog('Uploading results to S3...', 'COMPLETE'); }, 7500);

    setTimeout(() => {
      addLog('Simulation complete. Fetching results.', 'COMPLETE');
      const results = generateHeatmapData(sceneObjects);
      setHeatmapData(results);

      setTimeout(() => {
        setIsSimulating(false);
        setIsResultsView(true);
        addMessage({ content: `🤖 **Simulation "${simName}" has *Completed*.**`, user: systemUser });
      }, 500);
    }, 8000);
  };


  const handleGenerateSummary = useCallback(async () => {
    setIsSummaryLoading(true);
    const result = await generateSimulationSummary(project.name, "Q3-2025-Coverage-Test-01", "Maximize Min SNR in 'Zone-Marketing'", MOCK_KPIS);
    setSummary(result);
    setIsSummaryLoading(false);
  }, [project.name]);

  const startPlacement = (asset: Asset) => {
    setAssetToPlace(asset);
    setSelectedObjectId(null);
    setIsAnnotationMode(false);
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
    if ((!isPlacingAsset && !isAnnotationMode) || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) setGhostPosition({ x, y });
    else setGhostPosition(null);
  };

  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    
    const rect = gridRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width);
    const y = ((e.clientY - rect.top) / rect.height);
    const pos = { x: x * 10, y: y * 10, z: 1 };
    
    if (isAnnotationMode) {
      setPendingAnnotation({ pinPosition: pos });
      setIsAnnotationMode(false);
      setGhostPosition(null);
      return;
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
    } else {
        setSelectedObjectId(null); // Deselect on clicking background
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') { cancelPlacement(); setIsAnnotationMode(false); } };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cancelPlacement]);
  
  const allAnnotations = messages.map((m, i) => m.annotationData ? ({ ...m.annotationData, id: `anno-${m.id}`}) : null).filter(Boolean) as (AnnotationData & {id: string})[];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-primary-bg text-text-primary">
      {isLoading && <LoadingOverlay onLoaded={handleLoaded} />}
      <TopNavBar title={`Studio / ${project.name}`} onLogout={onLogout} onNavigate={onNavigate} hideSearch theme={theme} setTheme={setTheme} />
      <SimulationConfigModal isOpen={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)} onLaunch={handleLaunchSimulation} />

      <main className="absolute top-16 left-0 right-0 bottom-0 flex">
        <AssetLibraryPanel onSelectAsset={startPlacement} isOpen={isAssetLibraryOpen} setIsOpen={setIsAssetLibraryOpen} />
        
        <div className={`flex-1 relative transition-all duration-300 ${!isCollaborationPanelCollapsed ? 'mr-[400px]' : 'mr-16'}`} onMouseMove={handleViewportMouseMove} onClick={handleViewportClick}>
            {isSimulating && <SimulationProgressOverlay logs={simulationLogs} progress={0} />}
            {(isPlacingAsset || isAnnotationMode) && <PlacementBanner assetName={isAnnotationMode ? 'Annotation Pin' : assetToPlace!.name} onCancel={() => { cancelPlacement(); setIsAnnotationMode(false); }} />}
            <ViewportToolbar cameraMode={cameraMode} setCameraMode={setCameraMode} viewSetting={viewSetting} setViewSetting={setViewSetting} />
            
            <div className="w-full h-full flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
                <div ref={gridRef} className="w-[900px] h-[700px] bg-grid-pattern relative transition-transform duration-500" style={{ transform: 'rotateX(60deg) rotateZ(-10deg)', cursor: isPlacingAsset ? 'copy' : isAnnotationMode ? 'crosshair' : 'default' }}>
                    {isResultsView && heatmapData && <HeatmapDisplay heatmapData={heatmapData} opacity={heatmapOpacity} />}
                    {isResultsView && <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 via-transparent to-cyan-500/10 pointer-events-none"></div>}
                    
                    {sceneObjects.filter(o => o.visible).map(obj => <PlacedObject key={obj.id} object={obj} isSelected={obj.id === selectedObjectId && !isAnnotationMode} onClick={() => { setSelectedObjectId(obj.id); setIsAnnotationMode(false); }} />)}
                    {allAnnotations.map(anno => <PlacedObject key={anno.id} object={anno} isSelected={highlightedAnnotation?.pinPosition === anno.pinPosition} onClick={() => {}} isAnnotation /> )}
                    
                    {(isPlacingAsset || isAnnotationMode) && ghostPosition && (
                        <div className={`absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-center justify-center pointer-events-none ring-2 ${isAnnotationMode ? 'bg-secondary-accent/50 ring-secondary-accent' : 'bg-primary-accent/50 ring-primary-accent'}`} style={{ left: `${ghostPosition.x}%`, top: `${ghostPosition.y}%` }}>
                            <Icon name={isAnnotationMode ? 'pin' : assetToPlace!.icon} className="w-3 h-3 text-white" />
                        </div>
                    )}
                </div>
            </div>
        </div>

        <PropertiesInspector selectedObject={selectedObject} onUpdateObject={updateSceneObject} isResultsView={isResultsView} simulationKpis={MOCK_KPIS} onGenerateSummary={handleGenerateSummary} summary={summary} isSummaryLoading={isSummaryLoading} heatmapOpacity={heatmapOpacity} setHeatmapOpacity={setHeatmapOpacity} />
      </main>
      
      <SceneHierarchy sceneObjects={sceneObjects} selectedObjectId={selectedObjectId} onSelectObject={id => { setSelectedObjectId(id); setIsAnnotationMode(false); }} onUpdateObject={updateSceneObject} onDeleteObject={deleteSceneObject} />
      <SimulationControlBar onLaunch={handleLaunchSimulation} onShowConfig={() => setIsConfigModalOpen(true)} />
      
      <CollaborationPanel 
          project={project}
          isCollapsed={isCollaborationPanelCollapsed}
          setIsCollapsed={setIsCollaborationPanelCollapsed}
          isAnnotationMode={isAnnotationMode}
          setIsAnnotationMode={setIsAnnotationMode}
          pendingAnnotation={pendingAnnotation}
          setPendingAnnotation={setPendingAnnotation}
          messages={messages}
          setMessages={setMessages}
          onViewAnnotation={(data) => {
              setHighlightedAnnotation(data);
              setTimeout(() => setHighlightedAnnotation(null), 2000); // Highlight for 2s
          }}
      />

      <style>{`.bg-grid-pattern { background-image: linear-gradient(theme(colors.border / 0.7) 1px, transparent 1px), linear-gradient(90deg, theme(colors.border / 0.7) 1px, transparent 1px); background-size: 2.5rem 2.5rem; border: 1px solid theme(colors.border); border-radius: 8px; background-color: theme(colors.primary-bg / 0.5); }`}</style>
    </div>
  );
};

export default SimulationStudioPage;