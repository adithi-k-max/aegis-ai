import { PlantState } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Activity, AlertTriangle, CheckCircle, FileText, Users, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

const mockTrendData = Array.from({ length: 20 }).map((_, i) => ({
  time: i,
  risk: Math.max(10, Math.min(100, 20 + Math.sin(i / 2) * 15 + Math.random() * 10))
}));

export default function CommandCenter({ state }: { state: PlantState }) {
  
  const criticalZones = state.zones.filter(z => z.status === 'critical' || z.status === 'high');

  return (
    <div className="space-y-8 md:space-y-12 max-w-7xl mx-auto py-6 md:py-10 px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#141414]/10 pb-6 md:pb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-[#141414] tracking-tighter uppercase italic">Executive Command Center</h1>
          <p className="text-[#141414]/50 text-[10px] md:text-xs mt-2 md:mt-3 uppercase tracking-widest font-bold">Real-time industrial safety intelligence</p>
        </div>
        <Badge variant={state.overallRisk > 60 ? 'destructive' : state.overallRisk > 40 ? 'default' : 'secondary'} className="px-4 py-2 text-xs md:text-sm uppercase tracking-[0.2em] w-fit">
          Plant Risk: {state.overallRisk}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Plant Health" 
          value={`${state.healthScore}%`} 
          icon={Activity} 
          trend="+2.4%" 
          status={state.healthScore > 80 ? 'good' : 'bad'}
        />
        <KPICard 
          title="Active Workers" 
          value={state.workers.length.toString()} 
          icon={Users} 
          trend="Stable"
        />
        <KPICard 
          title="Active Permits" 
          value={state.permits.length.toString()} 
          icon={FileText} 
        />
        <KPICard 
          title="Critical Alerts" 
          value={criticalZones.length.toString()} 
          icon={AlertTriangle} 
          status={criticalZones.length > 0 ? 'bad' : 'good'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="border-b border-[#141414]/10 pb-4">
            <CardTitle className="text-[11px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase">Compound Risk Trend (Last Hour)</CardTitle>
          </CardHeader>
          <CardContent className="h-72 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <XAxis dataKey="time" hide />
                <YAxis stroke="#141414" strokeOpacity={0.2} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fdfdfb', borderColor: '#141414', borderRadius: '0', borderWidth: '1px' }}
                  itemStyle={{ color: '#141414' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="#141414" 
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="border-b border-[#141414]/10 pb-4">
            <CardTitle className="text-[11px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase">Zone Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {state.zones.map(zone => (
              <motion.div 
                key={zone.id} 
                className="flex items-center justify-between p-4 border border-[#141414]/10 bg-transparent"
                initial={false}
                animate={{ borderColor: zone.status === 'critical' ? '#dc2626' : zone.status === 'high' ? '#d97706' : 'rgba(20, 20, 20, 0.1)' }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-none ${
                    zone.status === 'critical' ? 'bg-red-600 animate-pulse' : 
                    zone.status === 'high' ? 'bg-amber-500' : 'bg-[#141414]/20'
                  }`} />
                  <span className="text-xs font-bold tracking-widest text-[#141414] uppercase">{zone.name}</span>
                </div>
                <div className="text-[10px] text-[#141414]/50 font-bold tracking-widest">{zone.riskScore}% Risk</div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon: Icon, trend, status }: any) {
  return (
    <Card className="flex flex-col h-full border-t-[4px] border-t-[#141414]">
      <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between space-y-0 pb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#141414]/50 uppercase">{title}</p>
          <Icon className="h-4 w-4 text-[#141414]/50" />
        </div>
        <div className="flex items-baseline space-x-3 mt-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#141414] italic">{value}</h2>
          {trend && (
            <span className={`text-[10px] font-bold tracking-widest uppercase ${status === 'bad' ? 'text-red-600' : 'text-[#141414]/40'}`}>
              {trend}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
