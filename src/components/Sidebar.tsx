import { Link, useLocation } from 'react-router-dom';
import { Activity, Map, Cpu, ShieldAlert, Users, FileText, Settings, Zap, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const navItems = [
    { name: 'Command Center', path: '/', icon: Activity },
    { name: 'Digital Twin', path: '/twin', icon: Map },
    { name: 'AI Copilot', path: '/copilot', icon: Cpu },
    { name: 'Active Alerts', path: '/alerts', icon: ShieldAlert },
    { name: 'Workers', path: '/workers', icon: Users },
    { name: 'Permits', path: '/permits', icon: FileText },
  ];

  const SidebarContent = () => (
    <>
      <div className="h-20 flex items-center px-6 border-b border-[#141414]/10 shrink-0 justify-between">
        <div className="flex items-center">
          <Zap className="w-5 h-5 text-[#141414] mr-3" />
          <span className="font-black text-xl tracking-tighter uppercase italic text-[#141414]">Monolith.</span>
        </div>
        <button className="md:hidden" onClick={() => setMobileOpen(false)}>
          <X className="w-5 h-5 text-[#141414]" />
        </button>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-bold text-[#141414]/50 tracking-[0.2em] mb-6 px-2 uppercase">Platform</div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors group",
                  isActive 
                    ? "bg-[#141414] text-white" 
                    : "text-[#141414]/70 hover:bg-[#141414]/5 hover:text-[#141414]"
                )}
              >
                <Icon className={cn("w-4 h-4 mr-4 shrink-0", isActive ? "text-white" : "text-[#141414]/50 group-hover:text-[#141414]")} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-6 border-t border-[#141414]/10 shrink-0">
        <button className="flex items-center w-full px-4 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-[#141414]/70 hover:bg-[#141414]/5 transition-colors">
          <Settings className="w-4 h-4 mr-4 text-[#141414]/50 shrink-0" />
          <span className="truncate">System Settings</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {!mobileOpen && (
        <button 
          className="md:hidden fixed bottom-4 right-4 z-50 bg-[#141414] text-white p-3 shadow-xl"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <aside className="hidden md:flex w-64 shrink-0 border-r border-[#141414]/10 bg-[#fdfdfb] flex-col h-full z-10">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-[#141414]/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 max-w-[80%] border-r border-[#141414]/10 bg-[#fdfdfb] flex flex-col h-full z-50">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
