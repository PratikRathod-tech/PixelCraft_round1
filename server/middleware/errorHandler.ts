import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const isProduction = config.nodeEnv === 'production';
  const status = err.status || 500;

  // Log on server only
  console.error(`[Server Error ${status}]:`, err.message || err);

  // In production, never leak internal stack traces or internal secrets
  res.status(status).json({
    success: false,
    error: isProduction && status === 500 
      ? 'An unexpected error occurred. Please try again later.' 
      : err.message || 'Internal server error',
    timestamp: new Date().toISOString(),
  });
}
