import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { initDatabase, isUsingMySQL } from './db/database';
import { apiRouter } from './routes/apiRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Production-Safe CORS
app.use(cors({
  origin: config.corsOrigin === '*' ? true : config.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '2mb' }));

app.use('/api', apiRouter);
app.use(errorHandler);

export async function startServer(port: number = config.port) {
  const dbStatus = await initDatabase();
  const diagnostics = config.getDiagnostics(isUsingMySQL());

  console.log('====================================================');
  console.log('⚡ PIXELCRAFT ARMORY — PRODUCTION BACKEND INITIALIZED');
  console.log('====================================================');
  console.log(`  Environment:      ${diagnostics.environment.toUpperCase()}`);
  console.log(`  Server Port:      ${diagnostics.port}`);
  console.log(`  Database Layer:   ${diagnostics.persistenceMode}`);
  console.log(`  Gemini AI Engine: ${diagnostics.gemini.configured ? 'Active (API Key Verified)' : 'Active (Heuristic Engine)'}`);
  console.log(`  Version:          ${diagnostics.version}`);
  console.log('====================================================');

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`[Server] Pixelcraft Production Backend listening on http://localhost:${port}`);
      resolve(server);
    });
  });
}

// Auto-start if executed directly
if (typeof require !== 'undefined' && require.main === module) {
  startServer();
}

export default app;
