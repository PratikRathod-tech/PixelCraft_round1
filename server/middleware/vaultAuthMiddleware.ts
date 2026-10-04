/**
 * ChainRank-AML Engineering Vault Authentication Middleware
 * Enforces server-side authorization for all internal control plane endpoints.
 * Unauthenticated requests are rejected with HTTP 401.
 */

import { Request, Response, NextFunction } from 'express';
import { vaultSecurityService } from '../services/vaultSecurityService';

export function requireVaultAuth(req: Request, res: Response, next: NextFunction): void {
  const sessionId = vaultSecurityService.extractSessionId(req);

  if (!sessionId) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Valid engineering vault session required. Access to internal control plane denied.',
    });
    return;
  }

  const session = vaultSecurityService.validateSession(sessionId);

  if (!session) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Engineering vault session expired or invalid. Please re-authenticate.',
    });
    return;
  }

  // Attach session context to request
  (req as any).vaultSession = session;
  next();
}
