export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export enum ScanStatus {
  Processed = 'Processed',
  Processing = 'Processing',
  Failed = 'Failed',
}

export interface Scan {
  id: string;
  name: string;
  filename: string;
  fileSize: string;
  uploadDate: string;
  status: ScanStatus;
  previewUrl: string;
  pointCount?: number;
}

export enum SimulationStatus {
    Completed = 'Completed',
    Running = 'Running',
    Draft = 'Draft'
}

export interface Simulation {
  id: string;
  name: string;
  description: string;
  status: SimulationStatus;
  objective?: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  team: User[];
  scans: Scan[];
  simulations: Simulation[];
}

export interface ZoneKPI {
    name:string;
    coverage: number;
    avgSNR: number;
    hasWarning: boolean;
}

// --- COLLABORATION ENGINE TYPES ---

export interface AnnotationData {
    pinPosition: { x: number; y: number; z: number };
    // In a real implementation, this would include camera position and rotation quaternion
    cameraState?: any; 
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string; // ISO 8601 string
  user: User; // Use a specific User type. Null for system messages.
  status: 'sending' | 'sent';
  parentMessageId?: string | null; // For threading
  annotationData?: AnnotationData | null; // For 3D annotations
}

export interface ChatChannel {
  id: string;
  name: string; // e.g., '#general', '#simulation-results'
}


// --- NEW TYPE FOR NOTIFICATIONS ---
export interface Notification {
    id: string;
    icon: 'upload' | 'play' | 'folder';
    title: string;
    description: string;
    timestamp: string;
    user: User;
}

export type Page = 'Dashboard' | 'Projects' | 'Asset Library' | 'Team Settings' | 'Billing' | 'Profile' | 'Settings';

export type PublicPage = 'home' | 'technology' | 'pricing' | 'about' | 'demo' | 'privacy' | 'terms';

export type AuthPage = 'Login' | 'Register' | 'ForgotPassword' | 'VerifyEmail';


// --- NEW TYPE FOR THEME ---
export type Theme = 'light' | 'dark';


// --- NEW TYPES FOR SIMULATION STUDIO ---

export enum AssetType {
  Transmitter = 'Transmitter',
  Receiver = 'Receiver',
  RIS = 'RIS',
  Zone = 'Zone'
}

export enum CameraMode {
  Orbit = 'Orbit',
  Walk = 'Walk'
}

export enum ViewSetting {
  TrueColor = 'True Color',
  Height = 'Height',
  Intensity = 'Intensity'
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  icon: string;
  description: string;
}

interface BaseProperties {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

export interface TransmitterProperties extends BaseProperties {
  transmitPower: number; // dBm
  frequency: number; // GHz
  antennaPattern: 'Omnidirectional' | 'Directional';
  azimuth?: number; // degrees
  elevation?: number; // degrees
  beamwidth?: number; // degrees
}

export interface ReceiverProperties extends BaseProperties {
  sensitivity: number; // dBm
}

export interface RISProperties extends BaseProperties {
  elementCount: { rows: number; cols: number };
  phaseBitDepth: 'Continuous' | '4-bit' | '3-bit' | '2-bit' | '1-bit';
}

export interface SceneObject {
  id: string;
  assetId: string;
  name: string;
  type: AssetType;
  visible: boolean;
  properties: TransmitterProperties | ReceiverProperties | RISProperties;
}


// --- LEGACY CHAT TYPES ---

export interface SimpleMessage {
    id: string;
    text: string;
    timestamp: string;
    sender: User;
}

export interface Conversation {
  id: string;
  name: string;
  type: 'group' | 'dm';
  participants: User[];
  messages: SimpleMessage[];
  avatarUrl?: string; // For DMs
}

// --- COMPUTATIONAL ENGINE TYPES ---
export interface SimulationLog {
  id: number;
  message: string;
  stage: 'QUEUE' | 'WORKER' | 'SIMULATION' | 'COMPLETE';
}

export type HeatmapData = number[][] | null;

// --- ACCOUNT & SECURITY TYPES ---
export interface ActiveSession {
  id: string;
  deviceType: 'desktop' | 'mobile';
  browser: string;
  os: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}