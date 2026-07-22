import { PlantState } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { HeartPulse, Activity } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export default function Workers({ state }: { state: PlantState }) {
  return (
    <div className="space-y-8 md:space-y-12 max-w-7xl mx-auto py-6 md:py-10 px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#141414]/10 pb-6 md:pb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-[#141414] tracking-tighter uppercase italic">Personnel</h1>
          <p className="text-[#141414]/50 text-[10px] md:text-xs mt-2 md:mt-3 uppercase tracking-widest font-bold">Active Workers on Site</p>
        </div>
        <Badge variant="secondary" className="px-4 py-2 text-xs md:text-sm uppercase tracking-[0.2em] w-fit">
          Total: {state.workers.length}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.workers.map(worker => {
          const zone = state.zones.find(z => z.id === worker.zoneId);
          return (
            <Card key={worker.id} className="border-l-[4px] border-l-[#141414]">
              <CardHeader className="border-b border-[#141414]/10 pb-4">
                <CardTitle className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase flex justify-between items-center">
                  <span className="truncate mr-2">{worker.id}</span>
                  <Badge variant={worker.hasPPE ? 'secondary' : 'destructive'} className="shrink-0">
                    {worker.hasPPE ? 'PPE OK' : 'NO PPE'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-[#141414] italic">{worker.name}</h3>
                  <p className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#141414]/50 uppercase mt-1">{worker.role}</p>
                </div>
                <div className="p-4 bg-[#141414]/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#141414]/50">Location</span>
                    <span className="text-[10px] md:text-xs font-bold text-[#141414] uppercase">{zone?.name || worker.zoneId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#141414]/50">Heart Rate</span>
                    <span className="text-[10px] md:text-xs font-bold text-[#141414] flex items-center gap-1">
                      <HeartPulse className="w-3 h-3" /> {worker.vitals.heartRate} bpm
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#141414]/50">Fatigue</span>
                    <span className="text-[10px] md:text-xs font-bold text-[#141414] flex items-center gap-1">
                      <Activity className="w-3 h-3" /> {worker.vitals.fatigue}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
