/**
 * ChainRank Investigation API Controller
 * Provides RESTful access to MuleTrace MOD-03 research metrics, candidate chains, and 3D subgraphs.
 */

import { Request, Response } from 'express';
import { chainrankInvestigationService } from '../services/chainrankInvestigationService';

export class ChainRankController {
  public static async getAccount(req: Request, res: Response): Promise<void> {
    try {
      const account = await chainrankInvestigationService.getAccount(req.params.id);
      if (!account) {
        res.status(404).json({ error: `Account '${req.params.id}' not found in research dataset.` });
        return;
      }
      res.json(account);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getRisk(req: Request, res: Response): Promise<void> {
    try {
      const risk = await chainrankInvestigationService.getRiskProfile(req.params.id);
      if (!risk) {
        res.status(404).json({ error: `Account '${req.params.id}' not found.` });
        return;
      }
      res.json(risk);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getMetrics(req: Request, res: Response): Promise<void> {
    try {
      const metrics = await chainrankInvestigationService.getMuleMetrics(req.params.id);
      if (!metrics) {
        res.status(404).json({ error: `Account '${req.params.id}' metrics not found.` });
        return;
      }
      res.json(metrics);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getChains(req: Request, res: Response): Promise<void> {
    try {
      const chains = await chainrankInvestigationService.getCandidateChains(req.params.id);
      res.json({ accountId: req.params.id, candidateChains: chains });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getChainById(req: Request, res: Response): Promise<void> {
    try {
      const chain = await chainrankInvestigationService.getCandidateChain(req.params.id);
      if (!chain) {
        res.status(404).json({ error: `Chain '${req.params.id}' not found.` });
        return;
      }
      res.json(chain);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getUpstreamTrace(req: Request, res: Response): Promise<void> {
    try {
      const trace = await chainrankInvestigationService.getUpstreamTrace(req.params.id);
      res.json(trace);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getDownstreamTrace(req: Request, res: Response): Promise<void> {
    try {
      const trace = await chainrankInvestigationService.getDownstreamTrace(req.params.id);
      res.json(trace);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getBidirectionalTrace(req: Request, res: Response): Promise<void> {
    try {
      const trace = await chainrankInvestigationService.getBidirectionalTrace(req.params.id);
      res.json(trace);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getInvestigation(req: Request, res: Response): Promise<void> {
    try {
      const maxNodes = req.query.maxNodes ? parseInt(req.query.maxNodes as string, 10) : 100;
      const maxEdges = req.query.maxEdges ? parseInt(req.query.maxEdges as string, 10) : 200;
      const direction = req.query.direction as any;

      const investigation = await chainrankInvestigationService.getInvestigation({
        accountId: req.params.id,
        maxNodes,
        maxEdges,
        direction
      });

      if (!investigation) {
        res.status(404).json({ error: `Investigation for account '${req.params.id}' not found in research dataset.` });
        return;
      }

      res.json(investigation);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getOverview(_req: Request, res: Response): Promise<void> {
    try {
      const summary = await chainrankInvestigationService.getOverviewSummary();
      res.json(summary);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getCandidateGraphs(req: Request, res: Response): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
      const search = req.query.search as string | undefined;

      const result = await chainrankInvestigationService.getCandidateGraphsList(page, limit, search);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getModelMetrics(_req: Request, res: Response): Promise<void> {
    try {
      const metrics = await chainrankInvestigationService.getModelMetrics();
      res.json(metrics);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }

  public static async getAccounts(req: Request, res: Response): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 25;
      const search = req.query.search as string | undefined;
      const risk = req.query.risk as string | undefined;

      const result = await chainrankInvestigationService.getAccountsPage(page, limit, search, risk);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  }
}


