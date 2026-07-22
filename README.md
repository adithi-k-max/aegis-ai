# AEGIS AI - Enterprise Industrial Intelligence Platform

AEGIS AI is a production-grade, AI-powered industrial safety intelligence platform designed for zero-harm operations. It transforms raw industrial telemetry into actionable, explainable insights by fusing SCADA data, permit information, worker locations, and regulatory compliance into a unified multi-agent Risk Engine.

## Core Capabilities

- **Compound Risk Engine:** Identifies latent hazards by correlating disparate signals (e.g., Hot Work permit + Gas spike + Nearby worker) before traditional alarms trigger.
- **Executive Command Center:** Real-time KPI dashboards, trend analysis, and live plant health monitoring.
- **Geospatial Digital Twin:** Interactive, WebSocket-powered SVG map simulating live telemetry, heatmaps, and personnel movement across plant zones.
- **Multi-Agent Intelligence:** Powered by Google's Gemini SDK, orchestrating specialized AI agents (Sensor, Permit, Vision, Compliance, Emergency).
- **Executive Copilot:** Natural language interface for querying plant status, risk factors, and generating actionable executive summaries.

## Architecture & Technology Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Recharts
- **Backend:** Express.js (Node.js), Socket.IO
- **AI Engine:** @google/genai (Gemini 2.5 Flash)
- **Data/Simulation:** Real-time synthetic event stream generator mimicking SCADA and IoT telemetry

## Folder Structure

```
/
├── server/
│   ├── api/            # REST API Routes
│   ├── services/       # AI Agents & Business Logic
│   ├── socket/         # WebSocket Engine
│   └── simulation/     # Synthetic Data Engine
├── src/
│   ├── components/     # UI Components (shadcn-inspired)
│   ├── features/       # Core Domain Modules (Digital Twin, CommandCenter)
│   ├── types/          # Shared TypeScript Interfaces
│   └── lib/            # Utilities
├── package.json        # Full-stack build scripts
└── server.ts           # Backend Entry Point
```

## Running the Platform

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create a `.env` file from `.env.example` and add your `GEMINI_API_KEY`.

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   *The server runs full-stack Express + Vite on port 3000.*

4. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

## Demo Scenario

1. Open the **Command Center** to view the live health and risk scores.
2. Navigate to the **Digital Twin** to observe real-time telemetry fluctuations and worker movements.
3. Observe how the synthetic simulation dynamically adjusts risks across zones based on simulated pressure and gas anomalies.
4. Navigate to the **AI Copilot** and ask: *"Explain today's highest risk"* to see the AI agent retrieve live WebSocket data and generate an explainable, evidence-backed report.

## License

MIT License. See `LICENSE` for details.
