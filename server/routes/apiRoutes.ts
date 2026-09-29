import { Router } from 'express';
import { ProjectController } from '../controllers/projectController';
import { AIController } from '../controllers/aiController';
import { AuditController } from '../controllers/auditController';
import { isUsingMySQL } from '../db/database';
import { GeminiService } from '../services/geminiService';
import { config } from '../config/env';

export const apiRouter = Router();

// Full Health Check
apiRouter.get('/health', (_req, res) => {
  const diagnostics = config.getDiagnostics(isUsingMySQL());
  res.json({
    status: 'online',
    database: diagnostics.persistenceMode,
    gemini: diagnostics.gemini.provider === 'gemini' ? 'connected' : 'heuristic_fallback',
    persistence: diagnostics.persistenceMode,
    version: diagnostics.version,
    uptime: diagnostics.uptimeSeconds,
    timestamp: new Date().toISOString(),
  });
});

// Readiness Probe (verifies ability to serve requests)
apiRouter.get('/health/readiness', (_req, res) => {
  res.json({
    status: 'ready',
    canServe: true,
    persistenceAvailable: true,
    timestamp: new Date().toISOString(),
  });
});

// Liveness Probe (verifies process is alive)
apiRouter.get('/health/liveness', (_req, res) => {
  res.json({
    status: 'alive',
    uptime: config.getUptimeSeconds(),
    timestamp: new Date().toISOString(),
  });
});

// Projects
apiRouter.get('/projects', ProjectController.getProjects);
apiRouter.post('/projects', ProjectController.createProject);
apiRouter.get('/projects/:id', ProjectController.getProject);
apiRouter.delete('/projects/:id', ProjectController.deleteProject);

// Versions
apiRouter.get('/projects/:id/versions', ProjectController.getVersions);
apiRouter.post('/projects/:id/versions', ProjectController.saveVersion);
apiRouter.post('/projects/:id/versions/:versionId/restore', ProjectController.restoreVersion);

// AI Bridge
apiRouter.post('/ai/review', AIController.review);
apiRouter.post('/ai/ask', AIController.ask);
apiRouter.post('/ai/research', AIController.research);

// Audit
apiRouter.post('/audit/run', AuditController.run);
