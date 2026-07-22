import { PlantState } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, Clock, MapPin } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export default function Permits({ state }: { state: PlantState }) {
  return (
    <div className="space-y-8 md:space-y-12 max-w-7xl mx-auto py-6 md:py-10 px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#141414]/10 pb-6 md:pb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-[#141414] tracking-tighter uppercase italic">Work Permits</h1>
          <p className="text-[#141414]/50 text-[10px] md:text-xs mt-2 md:mt-3 uppercase tracking-widest font-bold">Active and Pending Authorizations</p>
        </div>
        <Badge variant="secondary" className="px-4 py-2 text-xs md:text-sm uppercase tracking-[0.2em] w-fit">
          Total: {state.permits.length}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {state.permits.map(permit => {
          const zone = state.zones.find(z => z.id === permit.zoneId);
          return (
            <Card key={permit.id} className={`border-t-[4px] ${permit.status === 'Active' ? 'border-t-[#141414]' : permit.status === 'Revoked' ? 'border-t-red-600' : 'border-t-[#141414]/30'}`}>
              <CardHeader className="border-b border-[#141414]/10 pb-4">
                <CardTitle className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase flex justify-between items-center">
                  <span>{permit.id}</span>
                  <Badge variant={permit.status === 'Active' ? 'default' : permit.status === 'Revoked' ? 'destructive' : 'secondary'}>
                    {permit.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#141414] italic">{permit.type}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#141414]/50 shrink-0" />
                    <div>
                      <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#141414]/50">Zone</div>
                      <div className="text-[10px] md:text-xs font-bold text-[#141414] uppercase">{zone?.name || permit.zoneId}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#141414]/50 shrink-0" />
                    <div>
                      <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#141414]/50">Expires At</div>
                      <div className="text-[10px] md:text-xs font-bold text-[#141414] uppercase">{new Date(permit.expiresAt).toLocaleTimeString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#141414]/50 shrink-0" />
                    <div>
                      <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#141414]/50">Assigned Workers</div>
                      <div className="text-[10px] md:text-xs font-bold text-[#141414] uppercase">{permit.workers.join(', ')}</div>
                    </div>
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
