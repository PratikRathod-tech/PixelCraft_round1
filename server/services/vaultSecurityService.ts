/**
 * ChainRank-AML Engineering Vault Security Service
 * Implements server-side cryptographic password verification and session management.
 * Plaintext passwords are NEVER stored in source code or client-side bundles.
 */

import crypto from 'crypto';
import { Request, Response } from 'express';

// Secure default cryptographic hash and salt (NIST SP 800-132 scrypt specification)
const DEFAULT_SALT = 'a9911ba72c336f1f872bc4b6781d94cb';
const DEFAULT_HASH = '4a1e1f24155e581d7292e5b331417ff9d5f8fff494b3f49c251e28e1c07ff10fb5817a7edb84ebc6a960b68a96bf92f86820a4b121db60632127fa4fbecd7d53';

export interface VaultSession {
  sessionId: string;
  createdAt: number;
  expiresAt: number;
  role: 'ENGINEERING_ADMIN';
  ipAddress: string;
}

class VaultSecurityService {
  private activeSessions = new Map<string, VaultSession>();
  private readonly SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
  private readonly COOKIE_NAME = 'cr_vault_session';

  /**
   * Cryptographically verify a supplied password against stored scrypt hash and salt.
   */
  public verifyPassword(candidatePassword: string): boolean {
    if (!candidatePassword || typeof candidatePassword !== 'string') {
      return false;
    }

    const salt = process.env.ENGINEERING_VAULT_PASSWORD_SALT || DEFAULT_SALT;
    const expectedHash = process.env.ENGINEERING_VAULT_PASSWORD_HASH || DEFAULT_HASH;

    try {
      const derivedKey = crypto.scryptSync(candidatePassword, salt, 64);
      const candidateHash = derivedKey.toString('hex');

      const expectedBuffer = Buffer.from(expectedHash, 'hex');
      const candidateBuffer = Buffer.from(candidateHash, 'hex');

      if (expectedBuffer.length !== candidateBuffer.length) {
        return false;
      }

      // Timing-safe comparison to prevent timing attacks
      return crypto.timingSafeEqual(expectedBuffer, candidateBuffer);
    } catch (err) {
      console.error('[VaultSecurity] Error verifying password:', err);
      return false;
    }
  }

  /**
   * Create an authenticated session.
   */
  public createSession(ipAddress: string = '127.0.0.1'): VaultSession {
    const sessionId = crypto.randomBytes(32).toString('hex');
    const now = Date.now();
    const session: VaultSession = {
      sessionId,
      createdAt: now,
      expiresAt: now + this.SESSION_TTL_MS,
      role: 'ENGINEERING_ADMIN',
      ipAddress,
    };

    this.activeSessions.set(sessionId, session);
    return session;
  }

  /**
   * Validate an active session ID.
   */
  public validateSession(sessionId?: string): VaultSession | null {
    if (!sessionId) return null;

    const session = this.activeSessions.get(sessionId);
    if (!session) return null;

    if (Date.now() > session.expiresAt) {
      this.activeSessions.delete(sessionId);
      return null;
    }

    return session;
  }

  /**
   * Invalidate an active session.
   */
  public destroySession(sessionId?: string): boolean {
    if (!sessionId) return false;
    return this.activeSessions.delete(sessionId);
  }

  /**
   * Extract session ID from request cookies or Authorization header.
   */
  public extractSessionId(req: Request): string | undefined {
    // 1. Check HttpOnly cookie
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').map((c) => c.trim());
      for (const cookie of cookies) {
        if (cookie.startsWith(`${this.COOKIE_NAME}=`)) {
          return decodeURIComponent(cookie.substring(this.COOKIE_NAME.length + 1));
        }
      }
    }

    // 2. Check Authorization Bearer header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7).trim();
    }

    // 3. Check custom header
    const customHeader = req.headers['x-vault-session'];
    if (typeof customHeader === 'string') {
      return customHeader.trim();
    }

    return undefined;
  }

  /**
   * Attach HttpOnly session cookie to response.
   */
  public setSessionCookie(res: Response, sessionId: string): void {
    const isProduction = process.env.NODE_ENV === 'production';
    const maxAgeSeconds = Math.floor(this.SESSION_TTL_MS / 1000);

    const cookieParts = [
      `${this.COOKIE_NAME}=${encodeURIComponent(sessionId)}`,
      'Path=/',
      `Max-Age=${maxAgeSeconds}`,
      'HttpOnly',
      'SameSite=Strict',
    ];

    if (isProduction) {
      cookieParts.push('Secure');
    }

    res.setHeader('Set-Cookie', cookieParts.join('; '));
  }

  /**
   * Clear session cookie.
   */
  public clearSessionCookie(res: Response): void {
    res.setHeader(
      'Set-Cookie',
      `${this.COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`
    );
  }
}

export const vaultSecurityService = new VaultSecurityService();
