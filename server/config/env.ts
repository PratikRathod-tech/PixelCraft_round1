import dotenv from 'dotenv';
dotenv.config();

export type EnvironmentMode = 'development' | 'production' | 'test';

export interface StartupDiagnostics {
  serverStatus: 'ready' | 'starting' | 'degraded';
  environment: EnvironmentMode;
  port: number;
  corsOrigin: string;
  database: {
    configured: boolean;
    host: string;
    port: number;
    name: string;
    mode: 'mysql' | 'in_memory';
  };
  gemini: {
    configured: boolean;
    provider: 'gemini' | 'heuristic_fallback';
  };
  persistenceMode: string;
  uptimeSeconds: number;
  version: string;
}

const startTime = Date.now();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: (process.env.NODE_ENV as EnvironmentMode) || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  geminiApiKey: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '',
  version: '1.0.0-phase13',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    name: process.env.DB_NAME || 'pixelcraft_armory',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    connectionLimit: 10,
  },
  
  getUptimeSeconds(): number {
    return Math.floor((Date.now() - startTime) / 1000);
  },

  getDiagnostics(isUsingMySQL: boolean): StartupDiagnostics {
    return {
      serverStatus: 'ready',
      environment: this.nodeEnv,
      port: this.port,
      corsOrigin: this.corsOrigin,
      database: {
        configured: isUsingMySQL,
        host: this.db.host,
        port: this.db.port,
        name: this.db.name,
        mode: isUsingMySQL ? 'mysql' : 'in_memory',
      },
      gemini: {
        configured: Boolean(this.geminiApiKey),
        provider: this.geminiApiKey ? 'gemini' : 'heuristic_fallback',
      },
      persistenceMode: isUsingMySQL ? 'MySQL Persistent DB' : 'Resilient In-Memory Store',
      uptimeSeconds: this.getUptimeSeconds(),
      version: this.version,
    };
  },
};
