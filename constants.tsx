import React from 'react';
import { Project, User, Scan, Simulation, ScanStatus, SimulationStatus, Notification, Asset, AssetType, ChatChannel, ChatMessage, ActiveSession } from './types';

// Mock Users
export const user1: User = { id: 'u1', name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' };
export const user2: User = { id: 'u2', name: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' };
export const user3: User = { id: 'u3', name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' };
export const user4: User = { id: 'u4', name: 'Dana', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' };
export const currentUser: User = user1; // Assuming Alice is the logged-in user
export const systemUser: User = { id: 'system', name: 'AuraSphere Bot', avatarUrl: '/vite.svg' }

// Mock Scans
const scans1: Scan[] = [
  { id: 's1', name: 'Floor 3 - Pre-drywall', filename: 'F3_predry.laz', fileSize: '1.2 GB', uploadDate: '2024-07-28', status: ScanStatus.Processed, previewUrl: 'https://picsum.photos/seed/scan1/200/150', pointCount: 120_000_000 },
  { id: 's2', name: 'Floor 4 - Lobby', filename: 'F4_lobby_final.laz', fileSize: '850 MB', uploadDate: '2024-07-29', status: ScanStatus.Processing, previewUrl: 'https://picsum.photos/seed/scan2/200/150' }
];

// Mock Simulations
const simulations1: Simulation[] = [
  { id: 'sim1', name: 'Q3-2025-Coverage-Test-01', description: 'Simulating effect of adding an RIS to the east wall.', status: SimulationStatus.Completed, objective: "Maximize Minimum SNR in Zone -> 'Zone-Marketing'" },
  { id: 'sim2', name: 'Q3-2025-Capacity-Check', description: 'Checking network capacity for Q3 user estimates.', status: SimulationStatus.Running },
  { id: 'sim3', name: 'Initial Placement Draft', description: 'Quick draft for AP placement.', status: SimulationStatus.Draft }
];


// Mock Projects
export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'MegaCorp Tower II',
    client: 'MegaCorp',
    team: [user1, user2, user3],
    scans: scans1,
    simulations: simulations1
  },
  {
    id: 'p2',
    name: 'Downtown Convention Center',
    client: 'City Events Inc.',
    team: [user2, user4],
    scans: [],
    simulations: [
        { id: 'sim4', name: 'Keynote Hall Coverage', description: 'Full coverage simulation for main hall.', status: SimulationStatus.Completed, objective: '99% Coverage > -65dBm' },
    ]
  },
  {
    id: 'p3',
    name: 'North Campus Library',
    client: 'State University',
    team: [user1, user4],
    scans: [
        { id: 's3', name: 'Basement Stacks', filename: 'lib_base.laz', fileSize: '2.1 GB', uploadDate: '2024-06-15', status: ScanStatus.Processed, previewUrl: 'https://picsum.photos/seed/scan3/200/150', pointCount: 250_000_000 },
    ],
    simulations: [
         { id: 'sim5', name: 'Study Area WiFi6E Upgrade', description: 'Simulating WiFi6E APs.', status: SimulationStatus.Running },
    ]
  },
  {
    id: 'p4',
    name: 'Project Phoenix',
    client: 'Stark Industries',
    team: [user1, user2, user3, user4],
    scans: [],
    simulations: []
  },
];


// --- MOCK DATA FOR COLLABORATION ENGINE ---
export const MOCK_CHANNELS: { [projectId: string]: ChatChannel[] } = {
  'p1': [
    { id: 'ch1-p1', name: '#general' },
    { id: 'ch2-p1', name: '#simulation-results' },
  ],
  'p2': [{ id: 'ch1-p2', name: '#general' }],
  'p3': [{ id: 'ch1-p3', name: '#general' }],
  'p4': [{ id: 'ch1-p4', name: '#general' }],
};

export const MOCK_MESSAGES: { [channelId: string]: ChatMessage[] } = {
  'ch1-p1': [
    { id: 'm1', content: `Hey @Bob, can you take a look at the latest simulation results? I've attached an annotation to the area I'm concerned about.`, user: user1, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), status: 'sent', annotationData: { pinPosition: { x: 7, y: 3, z: 1 } } },
    { id: 'm2', content: `Sure thing, Alice. Pulling it up now. I see the pin near the lobby entrance. Yeah, that signal drop-off is pretty significant.`, user: user2, timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), status: 'sent' },
    { id: 'm3', content: `🤖 **Simulation "Q3-2025-Capacity-Check" has *Completed*.**`, user: systemUser, timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), status: 'sent' },
  ],
  'ch2-p1': [],
  'ch1-p2': [
    { id: 'm4', content: `The final report for the Convention Center is ready for review.`, user: user2, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), status: 'sent' },
  ]
};


// --- MOCK DATA FOR NOTIFICATIONS ---
export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n1', icon: 'play', title: 'Simulation Completed', description: 'The simulation "Q3-2025-Coverage-Test-01" has finished processing. Results are now available.', timestamp: '2 hours ago', user: user1 },
    { id: 'n2', icon: 'upload', title: 'Scan Processed', description: 'The scan "Floor 3 - Pre-drywall" has been successfully processed and is ready for use in the studio.', timestamp: '1 day ago', user: user2 },
    { id: 'n3', icon: 'folder', title: 'Project Access Granted', description: 'You have been added to the "Downtown Convention Center" project.', timestamp: '3 days ago', user: user4 },
];

// --- MOCK DATA FOR ASSET LIBRARY ---
export const MOCK_ASSETS: Asset[] = [
    { id: 'tx-wifi', name: 'Wi-Fi 6E AP', type: AssetType.Transmitter, icon: 'wifi', description: 'Omnidirectional Wi-Fi 6E Access Point.' },
    { id: 'tx-5g', name: '5G Small Cell', type: AssetType.Transmitter, icon: 'cellTower', description: 'Directional 5G NR Small Cell.' },
    { id: 'rx-laptop', name: 'Laptop', type: AssetType.Receiver, icon: 'laptop', description: 'Standard laptop receiver.' },
    { id: 'ris-2.4', name: 'RIS Panel', type: AssetType.RIS, icon: 'ris', description: '16x16 Element Reconfigurable Intelligent Surface.' },
];

// --- MOCK DATA FOR ACCOUNT SECURITY ---
export const MOCK_SESSIONS: ActiveSession[] = [
    { id: 's1', deviceType: 'desktop', browser: 'Chrome', os: 'macOS', location: 'New York, NY', lastActive: 'now', isCurrent: true },
    { id: 's2', deviceType: 'mobile', browser: 'Safari', os: 'iOS', location: 'New York, NY', lastActive: '2 hours ago', isCurrent: false },
    { id: 's3', deviceType: 'desktop', browser: 'Firefox', os: 'Windows 11', location: 'Chicago, IL', lastActive: '3 days ago', isCurrent: false },
];


// SVG Icons as React Components for easier use with Tailwind
export const ICONS = {
  logo: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 21c2-6.5 6-10 9-11s7 4.5 9 11" opacity="0.7"/>
        <path d="M9 15.5c1-3 2-4 3-4.5s2 1.5 3 4.5"/>
    </g>
  ),
  home: (<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  folder: (<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  grid: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></g>),
  users: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></g>),
  card: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></g>),
  help: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></g>),
  bell: (<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  search: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></g>),
  plus: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></g>),
  dots: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></g>),
  back: (<path d="M19 12H5m7 7l-7-7 7-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  upload: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></g>),
  arrow: (<path d="M9 18l6-6-6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />),
  polygon: (<path d="M12 2l7.79 4.5V17.5L12 22l-7.79-4.5V6.5L12 2zM12 22v-8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  ruler: (<path d="M21.17 6.83a2.828 2.828 0 00-4-4L2.83 17.17a2.828 2.828 0 004 4L21.17 6.83zM16 12l-2 2M12 8l4-4M8 16l-2 2M4 12l4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  play: (<polygon points="5 3 19 12 5 21 5 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  sparkles: (<path d="M18 8c0-4.42-3-8-3-8s-3 3.58-3 8c0 4.42 3 8 3 8s3-3.58 3-8zM10 2c0-2-2-4-2-4s-2 2-2 4c0 2 2 4 2 4s2-2 2-4zM22 14c0-2-2-4-2-4s-2 2-2 4c0 2 2 4 2 4s2-2 2-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />),
  chat: (<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  close: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></g>),
  slack: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.84 12.24a2.95 2.95 0 01-1.2 2.6l-3.37 2a2.95 2.95 0 01-3.83-1.21l-1.99-3.37a2.95 2.95 0 011.2-3.83l3.37-1.99a2.95 2.95 0 013.83 1.2z"/><path d="M2.16 11.76a2.95 2.95 0 011.2-2.6l3.37-2a2.95 2.95 0 013.83 1.21l1.99 3.37a2.95 2.95 0 01-1.2 3.83l-3.37 1.99a2.95 2.95 0 01-3.83-1.2z"/></g>),
  sun: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></g>),
  moon: (<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  settings: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></g>),
  key: (<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  'shield-check': (<path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.602-3.751m-.223-1.44a11.959 11.959 0 00-5.432-3.636m-1.226 0c-.317 0-.63.023-.936.065" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  'lock': (<path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  'desktop': (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><rect x="3" y="3" width="18" height="12" rx="2"/><line x1="7" y1="21" x2="17" y2="21"/><line x1="12" y1="15" x2="12" y2="21"/></g>),
  'signal-block': (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M12 12h.01"/><path d="M8.5 15.5h.01"/><path d="M15.5 15.5h.01"/><path d="M5 8.5h.01"/><path d="M19 8.5h.01"/><path d="M12 20l-7.5-7.5a1 1 0 010-1.414l7.5-7.5 7.5 7.5a1 1 0 010 1.414L12 20z"/></g>),
  'inefficient-coverage': (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M5 12.55a11 11 0 0114 0"/><path d="M2 8.82a19 19 0 0120 0"/><path d="M8 16.29a5 5 0 018 0"/><path d="M12 20v.01"/><path d="M12 2v2"/></g>),
  'design-guesswork': (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M3 3h18v18H3z"/><path d="M12 16v.01"/><path d="M12 13a2 2 0 00.91-3.75 2.25 2.25 0 00-2.34-2.34 2 2 0 10-1.16 4.04"/></g>),
  'scanner': (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M5 12H3L3 19a2 2 0 002 2h14a2 2 0 002-2v-7l-2 0"/><path d="M5 12l2-7h10l2 7"/><path d="M12 12V8"/></g>),
  'design-tool': (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M12 3v18"/><path d="M18 6l-6 6-6-6"/><path d="M18 18l-6-6-6 6"/></g>),
  'google': (<path d="M21.35 11.1H12.18v2.8h4.94c-.23 1.2-.88 2.3-1.95 3.03v2.4h3.08c1.8-1.65 2.84-4.08 2.84-6.93c0-.75-.07-1.48-.2-2.2zM4 12c0 2.44 1.57 4.51 3.76 5.48l3.08-2.4c-.7-0.66-1.1-1.6-1.1-2.78H4v-2.8h4.92c.1-.5.16-1.02.16-1.55c0-.53-.06-1.05-.16-1.55H4V12zm6.18-7.43v2.25h2.5c2.3 0 4.18 1.83 4.18 4.18c0 1.2-.5 2.3-1.3 3.1l3.1 2.4c1.8-1.7 2.9-4.2 2.9-7.1c0-4.97-4.03-9-9-9c-2.4 0-4.6.9-6.2 2.4l2.8 2.2c1-1.3 2.5-2.1 4.3-2.1z" fill="currentColor" stroke="none"/>),
  'github': (<path d="M9 19c-4.28 1.44-4.28-2.55-4.28-2.55s1.52.48 2.72-.96A7.4 7.4 0 0112 14c1.4 0 2.76.38 3.96.96 1.2.96 2.72.96 2.72.96s0 4-4.28 2.55M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>),

  // Studio & Collaboration Icons
  move: (<path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),
  rotate: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></g>),
  orbit: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 015.66 18.06M12 22a10 10 0 01-5.66-18.06"/><ellipse cx="12" cy="12" rx="10" ry="4"/></g>),
  walk: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><circle cx="12" cy="5" r="1"/><path d="M9 20l3-6 3 6M6 11l6-3 6 3"/><path d="M12 11v3"/></g>),
  color: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></g>),
  height: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M12 20V4M6 14l6-6 6 6M20 12h-4M8 12H4"/></g>),
  intensity: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M22 12h-4M6 12H2M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83"/></g>),
  visible: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></g>),
  hidden: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></g>),
  delete: (<g><polyline points="3 6 5 6 21 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="11" x2="10" y2="17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="14" y1="11" x2="14" y2="17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></g>),
  pin: (<g><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></g>),
  at: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" /></g>),
  send: (<path d="M22 2L11 13M22 2L15 22l-4-9-9-4 22-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>),

  // Asset Icons
  wifi: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M5 12.55a11 11 0 0114 0"/><path d="M2 8.82a19 19 0 0120 0"/><path d="M8 16.29a5 5 0 018 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></g>),
  cellTower: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M12 3l-8 8h16l-8-8z"/><path d="M12 3v18M4 11h16M8 21h8"/></g>),
  laptop: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.56a1 1 0 01-.8 1.44H3.52a1 1 0 01-.8-1.44L4 16"/></g>),
  mobile: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></g>),
  iot: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M12 8V4m0 16v-4M8 12H4m16 0h-4"/><circle cx="12" cy="12" r="2"/></g>),
  ris: (<g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8h18M3 16h18M8 3v18M16 3v18"/></g>),
};