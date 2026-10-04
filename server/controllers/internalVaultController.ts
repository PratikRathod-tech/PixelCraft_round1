/**
 * ChainRank-AML Internal Vault Controller
 * Handles authentication, session verification, and allowlisted engineering assets.
 */

import { Request, Response } from 'express';
import { vaultSecurityService } from '../services/vaultSecurityService';
import { vaultDocumentRegistryService } from '../services/vaultDocumentRegistry';
import { PHASE_REGISTRY } from '../services/vaultPhaseRegistry';
import { VaultAuditService } from '../services/vaultAuditService';
import { chainRankRegistry } from '../../src/chainrank/assets/registry';

export class InternalVaultController {
  /**
   * POST /api/internal/auth/login
   */
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { password } = req.body || {};

      if (!password || typeof password !== 'string') {
        res.status(400).json({ error: 'Bad Request', message: 'Password is required.' });
        return;
      }

      const isValid = vaultSecurityService.verifyPassword(password);

      if (!isValid) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid engineering credentials. Access denied.',
        });
        return;
      }

      const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
      const session = vaultSecurityService.createSession(clientIp);

      vaultSecurityService.setSessionCookie(res, session.sessionId);

      res.json({
        success: true,
        message: 'Engineering Vault session authenticated.',
        sessionId: session.sessionId,
        role: session.role,
        expiresAt: session.expiresAt,
      });
    } catch (err: any) {
      console.error('[InternalVaultController.login]', err);
      res.status(500).json({ error: 'Internal Error', message: err.message });
    }
  }

  /**
   * POST /api/internal/auth/logout
   */
  public static async logout(req: Request, res: Response): Promise<void> {
    try {
      const sessionId = vaultSecurityService.extractSessionId(req);
      if (sessionId) {
        vaultSecurityService.destroySession(sessionId);
      }
      vaultSecurityService.clearSessionCookie(res);
      res.json({ success: true, message: 'Engineering session terminated.' });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Error', message: err.message });
    }
  }

  /**
   * GET /api/internal/auth/session
   */
  public static async getSession(req: Request, res: Response): Promise<void> {
    try {
      const sessionId = vaultSecurityService.extractSessionId(req);
      const session = vaultSecurityService.validateSession(sessionId);

      if (!session) {
        res.status(200).json({
          authenticated: false,
          role: null,
        });
        return;
      }

      res.status(200).json({
        authenticated: true,
        role: session.role,
        expiresAt: session.expiresAt,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Error', message: err.message });
    }
  }

  /**
   * GET /api/internal/vault/docs
   */
  public static async getDocuments(_req: Request, res: Response): Promise<void> {
    try {
      const docs = vaultDocumentRegistryService.getAllDocuments();
      res.json({
        total: docs.length,
        documents: docs,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Error', message: err.message });
    }
  }

  /**
   * GET /api/internal/vault/docs/:id
   */
  public static async getDocumentById(req: Request, res: Response): Promise<void> {
    try {
      const docId = req.params.id;
      const result = vaultDocumentRegistryService.readDocumentContent(docId);

      if (!result) {
        res.status(404).json({
          error: 'Not Found',
          message: `Document '${docId}' not found in allowlisted registry.`,
        });
        return;
      }

      res.json({
        id: result.meta.id,
        title: result.meta.title,
        category: result.meta.category,
        phase: result.meta.phase,
        description: result.meta.description,
        lastUpdated: result.meta.lastUpdated,
        content: result.content,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Error', message: err.message });
    }
  }

  /**
   * GET /api/internal/vault/phases
   */
  public static async getPhases(_req: Request, res: Response): Promise<void> {
    try {
      res.json({
        currentPhase: 'PHASE-08',
        totalPhases: PHASE_REGISTRY.length,
        phases: PHASE_REGISTRY,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Error', message: err.message });
    }
  }

  /**
   * GET /api/internal/vault/audit
   */
  public static async getAudits(_req: Request, res: Response): Promise<void> {
    try {
      const audits = VaultAuditService.runAudits();
      const passCount = audits.filter((a) => a.result === 'PASS').length;
      const warnCount = audits.filter((a) => a.result === 'WARNING').length;
      const failCount = audits.filter((a) => a.result === 'FAIL').length;

      res.json({
        summary: {
          total: audits.length,
          pass: passCount,
          warning: warnCount,
          fail: failCount,
          status: failCount === 0 ? 'HEALTHY' : 'DEGRADED',
        },
        audits,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Error', message: err.message });
    }
  }

  /**
   * GET /api/internal/vault/assets
   */
  public static async getAssetRegistry(_req: Request, res: Response): Promise<void> {
    try {
      const assets = chainRankRegistry.getAllAssets();
      const proceduralCount = assets.filter((a) => a.format === 'procedural').length;
      const glbCount = assets.filter((a) => a.format === 'glb').length;
      const quarantined = assets.filter((a) => a.validationStatus === 'QUARANTINED' || a.validationStatus === 'INVALID_ASSET').length;

      res.json({
        summary: {
          total: assets.length,
          procedural: proceduralCount,
          glb: glbCount,
          quarantined,
        },
        assets: assets.map((a) => ({
          id: a.id,
          name: a.name,
          category: a.category,
          format: a.format,
          source: a.source,
          license: a.license,
          fileSizeBytes: a.fileSizeBytes,
          polygonCount: a.polygonCount,
          dimensions: a.dimensions,
          validationStatus: a.validationStatus,
          investigationRole: a.investigationRole,
          tags: a.tags,
        })),
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Error', message: err.message });
    }
  }
}
