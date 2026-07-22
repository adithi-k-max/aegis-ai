export interface Zone {
  id: string;
  name: string;
  riskScore: number;
  status: 'safe' | 'observe' | 'warning' | 'high' | 'critical';
  metrics: {
    temperature: number;
    pressure: number;
    gas: number;
    humidity: number;
  };
  coordinates?: { x: number, y: number, w: number, h: number };
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  zoneId: string;
  vitals: {
    heartRate: number;
    fatigue: number;
  };
  hasPPE: boolean;
}

export interface Permit {
  id: string;
  type: 'Hot Work' | 'Cold Work' | 'Confined Space' | 'Electrical';
  zoneId: string;
  status: 'Active' | 'Pending' | 'Revoked' | 'Expired';
  workers: string[];
  expiresAt: string;
}

export interface Incident {
  id: string;
  type: string;
  zoneId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  description: string;
  status: 'Open' | 'Investigating' | 'Resolved';
}

export interface PlantState {
  healthScore: number;
  overallRisk: number;
  zones: Zone[];
  workers: Worker[];
  permits: Permit[];
  incidents: Incident[];
}
