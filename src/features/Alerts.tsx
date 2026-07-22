import { PlantState } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export default function Alerts({ state }: { state: PlantState }) {
  const criticalZones = state.zones.filter(z => z.status === 'critical' || z.status === 'high');

  return (
    <div className="space-y-8 md:space-y-12 max-w-7xl mx-auto py-6 md:py-10 px-4 md:px-8">
      <div className="flex items-center justify-between border-b border-[#141414]/10 pb-6 md:pb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-[#141414] tracking-tighter uppercase italic">Active Alerts</h1>
          <p className="text-[#141414]/50 text-[10px] md:text-xs mt-2 md:mt-3 uppercase tracking-widest font-bold">Critical and High Risk Zones</p>
        </div>
      </div>

      {criticalZones.length === 0 ? (
        <Card className="p-10 text-center border-dashed border-[#141414]/20">
          <ShieldAlert className="w-10 h-10 mx-auto text-[#141414]/20 mb-4" />
          <p className="text-[#141414]/50 font-bold uppercase tracking-widest text-[10px] md:text-sm">No Active Alerts</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {criticalZones.map(zone => (
            <Card key={zone.id} className="border-t-[4px] border-t-red-600">
              <CardHeader className="border-b border-[#141414]/10 pb-4">
                <CardTitle className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase flex justify-between">
                  <span>{zone.name}</span>
                  <Badge variant="destructive">{zone.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-[#141414]/50">Risk Score</span>
                  <span className="text-xl md:text-2xl font-black text-red-600 italic">{zone.riskScore}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#141414]/5">
                    <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#141414]/50">Gas</div>
                    <div className="text-xs md:text-sm font-bold text-[#141414]">{zone.metrics.gas} ppm</div>
                  </div>
                  <div className="p-3 bg-[#141414]/5">
                    <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#141414]/50">Pressure</div>
                    <div className="text-xs md:text-sm font-bold text-[#141414]">{zone.metrics.pressure} bar</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
