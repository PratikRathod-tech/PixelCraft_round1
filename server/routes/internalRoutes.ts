/**
 * ChainRank-AML Internal Engineering Vault Routes
 * Defines internal authentication and protected vault endpoints.
 */

import { Router } from 'express';
import { InternalVaultController } from '../controllers/internalVaultController';
import { requireVaultAuth } from '../middleware/vaultAuthMiddleware';

export const internalRouter = Router();

// ========================================================
// 1. PUBLIC AUTHENTICATION HANDLERS
// ========================================================
internalRouter.post('/auth/login', InternalVaultController.login);
internalRouter.post('/auth/logout', InternalVaultController.logout);
internalRouter.get('/auth/session', InternalVaultController.getSession);

// ========================================================
// 2. PROTECTED INTERNAL ENGINEERING VAULT ENDPOINTS
// ========================================================
internalRouter.use('/vault', requireVaultAuth);

internalRouter.get('/vault/docs', InternalVaultController.getDocuments);
internalRouter.get('/vault/docs/:id', InternalVaultController.getDocumentById);
internalRouter.get('/vault/phases', InternalVaultController.getPhases);
internalRouter.get('/vault/audit', InternalVaultController.getAudits);
internalRouter.get('/vault/assets', InternalVaultController.getAssetRegistry);
