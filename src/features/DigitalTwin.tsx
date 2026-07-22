import { PlantState } from '../types';
import { Card } from '../components/ui/card';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '../components/ui/badge';
import { useState } from 'react';
import { AlertTriangle, Thermometer, Wind, Gauge } from 'lucide-react';

export default function DigitalTwin({ state }: { state: PlantState }) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const activeZone = selectedZone ? state.zones.find(z => z.id === selectedZone) : null;

  return (
    <div className="flex flex-col min-h-full max-w-7xl mx-auto py-6 md:py-10 px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#141414]/10 pb-6 md:pb-8 mb-6 md:mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-[#141414] tracking-tighter uppercase italic">Digital Twin</h1>
          <p className="text-[#141414]/50 text-[10px] md:text-xs mt-2 md:mt-3 uppercase tracking-widest font-bold">Real-time geospatial intelligence & telemetry</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 pb-10">
        <Card className="col-span-1 lg:col-span-2 relative overflow-hidden bg-[#141414] border-[#141414] flex items-center justify-center p-4 min-h-[300px] md:min-h-[400px]">
          {/* SVG Plant Map Simulation */}
          <div className="relative w-full aspect-video max-w-3xl border border-white/10 bg-white/5 overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            {state.zones.map(zone => {
              if (!zone.coordinates) return null;
              
              const isCritical = zone.status === 'critical';
              const isHigh = zone.status === 'high';
              
              const color = isCritical ? 'rgba(220, 38, 38, 0.2)' : 
                            isHigh ? 'rgba(217, 119, 6, 0.2)' : 
                            'rgba(255, 255, 255, 0.05)';
              
              const borderColor = isCritical ? '#dc2626' : 
                                  isHigh ? '#d97706' : 
                                  'rgba(255, 255, 255, 0.2)';

              return (
                <motion.div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className="absolute cursor-pointer border backdrop-blur-sm transition-colors flex items-center justify-center group"
                  style={{
                    left: `${zone.coordinates.x}%`,
                    top: `${zone.coordinates.y}%`,
                    width: `${zone.coordinates.w}%`,
                    height: `${zone.coordinates.h}%`,
                    backgroundColor: color,
                    borderColor: borderColor,
                  }}
                  animate={{
                    boxShadow: isCritical ? '0 0 40px rgba(220,38,38,0.3)' : 'none'
                  }}
                >
                  <span className="text-[8px] md:text-[10px] font-bold tracking-widest text-white/50 group-hover:text-white transition-colors uppercase text-center px-1">
                    {zone.name}
                  </span>
                  
                  {isCritical && (
                    <div className="absolute -top-1.5 -right-1.5">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-none h-3 w-3 bg-red-600"></span>
                      </span>
                    </div>
                  )}

                  {/* Render Workers in Zone */}
                  <div className="absolute bottom-2 left-2 flex space-x-1">
                    {state.workers.filter(w => w.zoneId === zone.id).map(w => (
                      <div key={w.id} className="w-1.5 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" title={w.name} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        <div className="col-span-1 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {activeZone ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col border-t-[4px] border-t-[#141414]">
                  <div className="p-6 md:p-8 border-b border-[#141414]/10">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <h3 className="text-2xl md:text-3xl font-black italic text-[#141414] tracking-tighter uppercase leading-tight">{activeZone.name}</h3>
                      <Badge variant={activeZone.status === 'critical' ? 'destructive' : 'default'} className="uppercase shrink-0">
                        {activeZone.status}
                      </Badge>
                    </div>
                    <p className="text-[9px] md:text-[10px] text-[#141414]/50 font-bold tracking-widest uppercase">ID: {activeZone.id} | Risk: {activeZone.riskScore}%</p>
                  </div>
                  
                  <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar space-y-8 md:space-y-10">
                    <div>
                      <h4 className="text-[9px] md:text-[10px] font-bold text-[#141414]/50 uppercase tracking-[0.2em] mb-4">Live Telemetry</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <MetricBox icon={Thermometer} label="Temp" value={`${activeZone.metrics.temperature}°C`} alert={activeZone.metrics.temperature > 50} />
                        <MetricBox icon={Gauge} label="Pressure" value={`${activeZone.metrics.pressure} bar`} alert={activeZone.metrics.pressure > 2.0} />
                        <MetricBox icon={Wind} label="Gas Conc." value={`${activeZone.metrics.gas} ppm`} alert={activeZone.metrics.gas > 10} />
                        <MetricBox icon={AlertTriangle} label="Humidity" value={`${activeZone.metrics.humidity}%`} />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[9px] md:text-[10px] font-bold text-[#141414]/50 uppercase tracking-[0.2em] mb-4">Active Personnel</h4>
                      {state.workers.filter(w => w.zoneId === activeZone.id).length > 0 ? (
                        <div className="space-y-3">
                          {state.workers.filter(w => w.zoneId === activeZone.id).map(w => (
                            <div key={w.id} className="flex justify-between items-center pb-2 border-b border-[#141414]/10">
                              <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-[#141414]">{w.name}</span>
                              <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#141414]/50 uppercase">{w.role}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[9px] md:text-[10px] text-[#141414]/50 font-bold uppercase tracking-widest">No personnel in zone.</p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
              >
                <Card className="h-full flex items-center justify-center p-8 text-center border border-[#141414]/10 bg-transparent border-dashed min-h-[200px]">
                  <p className="text-[#141414]/50 text-[10px] font-bold tracking-widest uppercase leading-relaxed max-w-[200px]">Select a zone on the Digital Twin map to view live telemetry.</p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MetricBox({ icon: Icon, label, value, alert = false }: any) {
  return (
    <div className={`p-4 border ${alert ? 'bg-red-50 border-red-600/20 text-red-600' : 'bg-transparent border-[#141414]/10 text-[#141414]'}`}>
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="w-3 h-3 opacity-50 shrink-0" />
        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] opacity-50 truncate">{label}</span>
      </div>
      <div className={`text-lg md:text-xl font-bold tracking-widest ${alert ? 'text-red-600' : 'text-[#141414]'}`}>
        {value}
      </div>
    </div>
  );
}
