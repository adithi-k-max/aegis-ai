import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { PlantState } from './types';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import CommandCenter from './features/CommandCenter';
import DigitalTwin from './features/DigitalTwin';
import AICopilot from './features/AICopilot';
import Alerts from './features/Alerts';
import Workers from './features/Workers';
import Permits from './features/Permits';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [plantState, setPlantState] = useState<PlantState | null>(null);

  useEffect(() => {
    // Determine socket URL based on environment (dev vs prod)
    // In our Vite setup proxy is not configured, we'll connect directly to the same host
    const socketInstance = io();
    
    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socketInstance.on('dashboard.refresh', (data: PlantState) => {
      setPlantState(data);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  if (!plantState) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fdfdfb] text-[#141414]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#141414]/20 border-t-[#141414] rounded-full animate-spin"></div>
          <p className="text-[#141414]/50 font-medium tracking-wide uppercase text-xs">Initializing AEGIS AI...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-[#fdfdfb] text-[#141414] overflow-hidden font-sans selection:bg-[#ffed00] selection:text-[#141414]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar state={plantState} />
          <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <Routes>
              <Route path="/" element={<CommandCenter state={plantState} />} />
              <Route path="/twin" element={<DigitalTwin state={plantState} />} />
              <Route path="/copilot" element={<AICopilot state={plantState} />} />
              <Route path="/alerts" element={<Alerts state={plantState} />} />
              <Route path="/workers" element={<Workers state={plantState} />} />
              <Route path="/permits" element={<Permits state={plantState} />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
