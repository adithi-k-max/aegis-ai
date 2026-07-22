import { Bell, Search, User } from 'lucide-react';
import { PlantState } from '../types';

export default function Topbar({ state }: { state: PlantState }) {
  const activeAlerts = state.zones.filter(z => z.status === 'critical' || z.status === 'high').length;

  return (
    <header className="h-20 border-b border-[#141414]/10 bg-[#fdfdfb] flex items-center justify-between px-4 md:px-10 z-10 sticky top-0 shrink-0">
      <div className="flex items-center border border-[#141414]/20 rounded-none px-3 md:px-4 py-2 focus-within:border-[#141414] transition-colors max-w-[150px] md:max-w-none">
        <Search className="w-4 h-4 text-[#141414]/50 mr-2 md:mr-3 shrink-0" />
        <input 
          type="text" 
          placeholder="SEARCH..." 
          className="bg-transparent border-none outline-none text-[10px] uppercase font-bold tracking-widest w-full text-[#141414] placeholder:text-[#141414]/30"
        />
      </div>

      <div className="flex items-center space-x-4 md:space-x-8">
        <div className="hidden md:flex items-center text-[10px] uppercase font-bold tracking-widest text-[#141414]/50 border-r border-[#141414]/10 pr-8">
          <span className="w-2 h-2 rounded-none bg-[#141414] mr-3 animate-pulse"></span>
          Live Stream
        </div>
        
        <button className="relative p-2 hover:bg-[#141414]/5 transition-colors text-[#141414]/70 hover:text-[#141414]">
          <Bell className="w-5 h-5" />
          {activeAlerts > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-none ring-2 ring-[#fdfdfb]"></span>
          )}
        </button>

        <div className="h-10 w-10 bg-[#141414] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
