import mysql from 'mysql2/promise';
import { config } from '../config/env';

/**
 * In-Memory Database Fallback Store
 * Used when MySQL server is unavailable or unconfigured to ensure zero interruption during competition.
 */
class InMemoryDatabase {
  public projects: Map<string, any> = new Map();
  public versions: Map<string, any[]> = new Map();
  public briefs: Map<string, any> = new Map();
  public aiSessions: Map<string, any[]> = new Map();
  public researchResults: Map<string, any[]> = new Map();
  public auditResults: Map<string, any[]> = new Map();

  constructor() {
    this.seedDefaultProject();
  }

  private seedDefaultProject() {
    const defaultProj = {
      id: 'proj-default-saas',
      name: 'Default SaaS Platform',
      competitionName: 'Pixelcraft Competition 2026',
      briefPrompt: 'Build a next-generation AI telemetry SaaS platform.',
      currentVersionId: 'ver-1',
      currentVersionNumber: 1,
      theme: 'futuristic',
      selectedAssetIds: ['cyber-helmet-3d'],
      requiredFeatures: ['Hero', 'Bento Grid', 'Timeline'],
      config: {
        title: 'Pixelcraft Armory',
        theme: 'futuristic',
        layout: { heroLayout: 'spatial' },
        hero: {
          title: 'Autonomous AI Telemetry Platform',
          subtitle: 'Real-time telemetry and 3D visualization.',
          visual: { type: '3d', assetId: 'cyber-helmet-3d', size: 'large' },
          cta: { primaryText: 'Get Started', secondaryText: 'Explore Vault' },
        },
        sections: [
          { id: 'bento-features', type: 'bento', title: 'Modular Capabilities' },
          { id: 'timeline-roadmap', type: 'timeline', title: 'Roadmap & Milestones' },
        ],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.projects.set(defaultProj.id, defaultProj);
    this.versions.set(defaultProj.id, [
      {
        id: 'ver-1',
        projectId: defaultProj.id,
        versionNumber: 1,
        name: 'Initial AI Draft',
        changelog: 'Initial baseline generated from prompt.',
        createdAt: new Date().toISOString(),
        config: defaultProj.config,
      },
    ]);
  }
}

export const memoryDb = new InMemoryDatabase();

let pool: mysql.Pool | null = null;
let isMySQLConnected = false;

export async function initDatabase(): Promise<{ isMySQL: boolean; status: string }> {
  try {
    pool = mysql.createPool({
      host: config.db.host,
      port: config.db.port,
      database: config.db.name,
      user: config.db.user,
      password: config.db.password,
      waitForConnections: true,
      connectionLimit: config.db.connectionLimit,
      queueLimit: 0,
      connectTimeout: 2000,
    });

    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    isMySQLConnected = true;
    console.log(`[Database] Connected successfully to MySQL at ${config.db.host}:${config.db.port}/${config.db.name}`);
    return { isMySQL: true, status: 'Connected to MySQL' };
  } catch (err: any) {
    isMySQLConnected = false;
    pool = null;
    console.warn(`[Database] MySQL unavailable (${err?.message || 'Connection failed'}). Active: In-Memory / LocalStorage Fallback.`);
    return { isMySQL: false, status: 'Operating in Memory Fallback mode' };
  }
}

export function getDbPool(): mysql.Pool | null {
  return pool;
}

export function isUsingMySQL(): boolean {
  return isMySQLConnected;
}
