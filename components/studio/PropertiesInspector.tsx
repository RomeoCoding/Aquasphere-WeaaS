import React from 'react';
import { ZoneKPI, SceneObject, TransmitterProperties, ReceiverProperties, RISProperties, AssetType } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Slider from '../ui/Slider';
import Select from '../ui/Select';

interface PropertiesInspectorProps {
    selectedObject: SceneObject | null;
    onUpdateObject: (object: SceneObject) => void;
    isResultsView: boolean;
    simulationKpis: ZoneKPI[];
    onGenerateSummary: () => void;
    summary: string;
    isSummaryLoading: boolean;
    heatmapOpacity: number;
    setHeatmapOpacity: (opacity: number) => void;
}

const KPIRow: React.FC<{ kpi: ZoneKPI }> = ({ kpi }) => (
    <div className={`p-3 rounded-md ${kpi.hasWarning ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
        <div className="flex justify-between items-center font-bold text-text-primary">
            <span>{kpi.name}</span>
            {kpi.hasWarning && <span className="text-xs text-red-300">WARNING</span>}
        </div>
        <div className="mt-2 flex justify-between text-sm">
            <span className="text-text-secondary">Coverage (&gt; -65dBm)</span>
            <span className={kpi.hasWarning ? 'text-red-300' : 'text-green-300'}>{kpi.coverage}%</span>
        </div>
        <div className="mt-1 flex justify-between text-sm">
            <span className="text-text-secondary">Avg. SNR</span>
            <span className="text-text-primary">{kpi.avgSNR} dB</span>
        </div>
    </div>
);

const TransmitterInspector: React.FC<{ object: SceneObject; onUpdate: (props: Partial<TransmitterProperties>) => void; }> = ({ object, onUpdate }) => {
    const props = object.properties as TransmitterProperties;
    return (
        <div className="space-y-4">
            <Slider label="Transmit Power (dBm)" min={0} max={30} step={1} value={props.transmitPower} onChange={v => onUpdate({ transmitPower: v })} />
            <Select label="Frequency (GHz)" value={String(props.frequency)} onChange={e => onUpdate({ frequency: parseFloat(e.target.value) })}>
                <option value="2.4">2.4 GHz</option>
                <option value="5">5 GHz</option>
                <option value="28">28 GHz</option>
                <option value="60">60 GHz</option>
            </Select>
            <Select label="Antenna Pattern" value={props.antennaPattern} onChange={e => onUpdate({ antennaPattern: e.target.value as any })}>
                <option value="Omnidirectional">Omnidirectional</option>
                <option value="Directional">Directional</option>
            </Select>
            {props.antennaPattern === 'Directional' && (
                <div className="space-y-4 p-3 border border-border rounded-md">
                     <Slider label="Azimuth (°)" min={0} max={360} step={1} value={props.azimuth || 0} onChange={v => onUpdate({ azimuth: v })} />
                     <Slider label="Elevation (°)" min={-90} max={90} step={1} value={props.elevation || 0} onChange={v => onUpdate({ elevation: v })} />
                     <Slider label="Beamwidth (°)" min={5} max={120} step={1} value={props.beamwidth || 30} onChange={v => onUpdate({ beamwidth: v })} />
                </div>
            )}
        </div>
    );
};

const ReceiverInspector: React.FC<{ object: SceneObject; onUpdate: (props: Partial<ReceiverProperties>) => void; }> = ({ object, onUpdate }) => {
    const props = object.properties as ReceiverProperties;
    return (
        <div className="space-y-4">
            <Slider label="Receiver Sensitivity (dBm)" min={-100} max={-30} step={1} value={props.sensitivity} onChange={v => onUpdate({ sensitivity: v })} />
        </div>
    );
};

const RISInspector: React.FC<{ object: SceneObject; onUpdate: (props: Partial<RISProperties>) => void; }> = ({ object, onUpdate }) => {
    const props = object.properties as RISProperties;
    return (
        <div className="space-y-4">
            <div className="flex space-x-2">
                <Input label="Rows" type="number" value={props.elementCount.rows} onChange={e => onUpdate({ elementCount: { ...props.elementCount, rows: parseInt(e.target.value)} })} />
                <Input label="Columns" type="number" value={props.elementCount.cols} onChange={e => onUpdate({ elementCount: { ...props.elementCount, cols: parseInt(e.target.value)} })} />
            </div>
             <Select label="Phase Bit-Depth" value={props.phaseBitDepth} onChange={e => onUpdate({ phaseBitDepth: e.target.value as any })}>
                <option value="Continuous">Continuous (Ideal)</option>
                <option value="4-bit">4-bit</option>
                <option value="3-bit">3-bit</option>
                <option value="2-bit">2-bit</option>
                <option value="1-bit">1-bit</option>
            </Select>
        </div>
    );
};

const PropertiesInspector: React.FC<PropertiesInspectorProps> = ({ selectedObject, onUpdateObject, isResultsView, simulationKpis, onGenerateSummary, summary, isSummaryLoading, heatmapOpacity, setHeatmapOpacity }) => {
    
    const handlePropertyChange = (newProps: Partial<SceneObject['properties']>) => {
        if (!selectedObject) return;
        onUpdateObject({
            ...selectedObject,
            properties: {
                ...selectedObject.properties,
                ...newProps,
            },
        });
    };

    const renderProperties = () => {
        if (!selectedObject) {
            return <p className="text-text-secondary text-sm">Select an object to see its properties.</p>;
        }
        
        return (
            <div className="space-y-4">
                <h4 className="font-bold text-text-primary">{selectedObject.name}</h4>
                 {selectedObject.type === AssetType.Transmitter && <TransmitterInspector object={selectedObject} onUpdate={handlePropertyChange} />}
                 {selectedObject.type === AssetType.Receiver && <ReceiverInspector object={selectedObject} onUpdate={handlePropertyChange} />}
                 {selectedObject.type === AssetType.RIS && <RISInspector object={selectedObject} onUpdate={handlePropertyChange} />}
            </div>
        );
    };

  return (
    <div className="w-80 bg-primary-bg/70 backdrop-blur-md h-full z-20 flex flex-col p-4 border-l border-border">
        <h3 className="text-lg font-semibold mb-4 text-text-primary flex-shrink-0">
            {isResultsView ? 'Analytics & KPIs' : 'Properties Inspector'}
        </h3>
        <div className="flex-1 overflow-y-auto pr-1">
            {isResultsView ? (
                <div className="space-y-4">
                    <Card className="p-4 bg-secondary-bg">
                        <p className="text-sm text-text-secondary">Simulation Goal</p>
                        <p className="font-semibold text-text-primary">Maximize Min SNR in 'Zone-Marketing'</p>
                        <p className="mt-2 text-sm text-green-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            Result: Achieved (28.5 dB)
                        </p>
                    </Card>
                    <Card className="p-4 bg-secondary-bg">
                        <h4 className="font-semibold mb-2 text-text-primary">Zone KPIs</h4>
                        <div className="space-y-2">
                            {simulationKpis.map(kpi => <KPIRow key={kpi.name} kpi={kpi} />)}
                        </div>
                    </Card>
                     <Card className="p-4 bg-secondary-bg">
                        <h4 className="font-semibold mb-2 text-text-primary">Visualization Settings</h4>
                        <Slider label="Heatmap Opacity" min={0} max={1} step={0.05} value={heatmapOpacity} onChange={setHeatmapOpacity} />
                    </Card>
                    <Card className="p-4 bg-secondary-bg">
                        <h4 className="font-semibold mb-2 text-text-primary">AI-Powered Summary</h4>
                        {summary ? (
                            <div className="text-sm text-text-secondary whitespace-pre-wrap">{summary}</div>
                        ) : (
                            <Button 
                                onClick={onGenerateSummary}
                                isLoading={isSummaryLoading}
                                icon="sparkles"
                                className="w-full"
                            >
                                Generate Summary
                            </Button>
                        )}
                    </Card>
                </div>
            ) : (
                <Card className="flex-1 p-4 bg-secondary-bg">
                    {renderProperties()}
                </Card>
            )}
        </div>
    </div>
  );
};

export default PropertiesInspector;