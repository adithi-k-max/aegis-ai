import { Server } from 'socket.io';
import { getPlantState, updateSimulation } from '../simulation/state';

export function setupSocketIO(io: Server) {
  io.on('connection', (socket) => {
    console.log('Client connected to WebSocket:', socket.id);
    
    // Send initial state
    socket.emit('dashboard.refresh', getPlantState());

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Simulation loop: Update state and broadcast every 3 seconds
  setInterval(() => {
    const newState = updateSimulation();
    io.emit('dashboard.refresh', newState);
  }, 3000);
}
