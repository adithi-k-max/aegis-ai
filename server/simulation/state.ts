import { PlantState, Zone, Worker, Permit, Incident } from '../../src/types';

// Initial Mock Data
let state: PlantState = {
  healthScore: 92,
  overallRisk: 15,
  zones: [
    { id: 'zone-a', name: 'Storage Facility', riskScore: 10, status: 'safe', metrics: { temperature: 22, pressure: 1.0, gas: 0, humidity: 40 }, coordinates: { x: 10, y: 10, w: 30, h: 40 } },
    { id: 'zone-b', name: 'Boiler Room', riskScore: 35, status: 'observe', metrics: { temperature: 65, pressure: 2.4, gas: 5, humidity: 30 }, coordinates: { x: 50, y: 10, w: 40, h: 40 } },
    { id: 'zone-c', name: 'Chemical Tank', riskScore: 15, status: 'safe', metrics: { temperature: 20, pressure: 1.1, gas: 0, humidity: 45 }, coordinates: { x: 10, y: 60, w: 40, h: 30 } },
    { id: 'zone-d', name: 'Control Room', riskScore: 5, status: 'safe', metrics: { temperature: 22, pressure: 1.0, gas: 0, humidity: 50 }, coordinates: { x: 60, y: 60, w: 30, h: 30 } },
  ],
  workers: [
    { id: 'w-1', name: 'Alex Johnson', role: 'Technician', zoneId: 'zone-b', vitals: { heartRate: 75, fatigue: 10 }, hasPPE: true },
    { id: 'w-2', name: 'Sarah Lee', role: 'Operator', zoneId: 'zone-d', vitals: { heartRate: 68, fatigue: 5 }, hasPPE: true },
    { id: 'w-3', name: 'Mike Chen', role: 'Maintenance', zoneId: 'zone-a', vitals: { heartRate: 82, fatigue: 20 }, hasPPE: true },
  ],
  permits: [
    { id: 'p-1', type: 'Hot Work', zoneId: 'zone-b', status: 'Active', workers: ['w-1'], expiresAt: new Date(Date.now() + 3600000).toISOString() },
  ],
  incidents: []
};

export const getPlantState = () => state;

export const updateSimulation = () => {
  // Randomly fluctuate sensor values slightly
  state.zones = state.zones.map(zone => {
    const tempChange = (Math.random() - 0.5) * 2;
    const pressChange = (Math.random() - 0.5) * 0.1;
    
    // Calculate new risk score based on synthetic thresholds
    let newRisk = zone.riskScore + (Math.random() - 0.5) * 2;
    newRisk = Math.max(0, Math.min(100, newRisk)); // Clamp between 0 and 100

    let status: Zone['status'] = 'safe';
    if (newRisk > 80) status = 'critical';
    else if (newRisk > 60) status = 'high';
    else if (newRisk > 40) status = 'warning';
    else if (newRisk > 20) status = 'observe';

    return {
      ...zone,
      riskScore: Math.round(newRisk),
      status,
      metrics: {
        ...zone.metrics,
        temperature: Math.round((zone.metrics.temperature + tempChange) * 10) / 10,
        pressure: Math.round((zone.metrics.pressure + pressChange) * 100) / 100,
      }
    };
  });

  // Calculate overall risk
  const maxRisk = Math.max(...state.zones.map(z => z.riskScore));
  state.overallRisk = maxRisk;
  state.healthScore = 100 - (maxRisk / 2); // Simple heuristic

  return state;
};

// Expose a function to artificially inject a hazard for the demo
export const injectHazard = () => {
  const boiler = state.zones.find(z => z.id === 'zone-b');
  if (boiler) {
    boiler.riskScore = 85;
    boiler.status = 'critical';
    boiler.metrics.gas = 45; // High gas
    boiler.metrics.pressure = 3.8;
  }
};
