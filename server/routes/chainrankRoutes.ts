/**
 * ChainRank Investigation API Routes
 */

import { Router } from 'express';
import { ChainRankController } from '../controllers/chainrankController';

export const chainrankRouter = Router();

// Account & Risk Queries
chainrankRouter.get('/accounts', ChainRankController.getAccounts);
chainrankRouter.get('/accounts/:id', ChainRankController.getAccount);
chainrankRouter.get('/accounts/:id/risk', ChainRankController.getRisk);
chainrankRouter.get('/accounts/:id/metrics', ChainRankController.getMetrics);
chainrankRouter.get('/accounts/:id/chains', ChainRankController.getChains);

// Directional Tracing
chainrankRouter.get('/accounts/:id/trace/upstream', ChainRankController.getUpstreamTrace);
chainrankRouter.get('/accounts/:id/trace/downstream', ChainRankController.getDownstreamTrace);
chainrankRouter.get('/accounts/:id/trace/bidirectional', ChainRankController.getBidirectionalTrace);

// Candidate Chains
chainrankRouter.get('/chains/:id', ChainRankController.getChainById);

// Master Investigation Subgraph
chainrankRouter.get('/investigation/:id', ChainRankController.getInvestigation);
chainrankRouter.get('/accounts/:id/neighborhood', ChainRankController.getInvestigation);

// Command Center & Analytical Feeds
chainrankRouter.get('/overview', ChainRankController.getOverview);
chainrankRouter.get('/candidate-graphs', ChainRankController.getCandidateGraphs);
chainrankRouter.get('/model/metrics', ChainRankController.getModelMetrics);

