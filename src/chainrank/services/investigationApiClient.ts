/**
 * ChainRank Investigation API Client
 * Provides typed HTTP communication with the Express backend (/api/chainrank).
 * Bridges real research metrics from MuleTrace MOD-03 and DMLRank into frontend stores and 3D scenes.
 */

import {
  Account,
  RiskProfile,
  MuleMetrics,
  CandidateChain,
  TraceResult,
  InvestigationResponse,
  OverviewSummary,
  CandidateGraphsResponse,
  ModelMetricsSummary,
  AccountsPageResponse
} from '../domain';

const API_BASE_URL = '/api/chainrank';

export class InvestigationApiClient {
  /**
   * Fetch full investigation workspace including focal account, neighborhood graph, and candidate chains.
   */
  public static async getInvestigation(
    accountId: string,
    options?: { depth?: number; maxNodes?: number; maxEdges?: number; minRiskFilter?: number }
  ): Promise<InvestigationResponse> {
    const params = new URLSearchParams();
    if (options?.depth) params.set('depth', String(options.depth));
    if (options?.maxNodes) params.set('maxNodes', String(options.maxNodes));
    if (options?.maxEdges) params.set('maxEdges', String(options.maxEdges));
    if (options?.minRiskFilter !== undefined) params.set('minRiskFilter', String(options.minRiskFilter));

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/investigation/${encodeURIComponent(accountId)}${queryStr}`);
    if (!res.ok) {
      throw new Error(`Failed to load investigation for account ${accountId}: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as InvestigationResponse;
  }

  /**
   * Fetch isolated canonical Account entity.
   */
  public static async getAccount(accountId: string): Promise<Account> {
    const res = await fetch(`${API_BASE_URL}/accounts/${encodeURIComponent(accountId)}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch account ${accountId}: ${res.status}`);
    }
    return (await res.json()) as Account;
  }

  /**
   * Fetch normalized risk profile.
   */
  public static async getRiskProfile(accountId: string): Promise<RiskProfile> {
    const res = await fetch(`${API_BASE_URL}/accounts/${encodeURIComponent(accountId)}/risk`);
    if (!res.ok) {
      throw new Error(`Failed to fetch risk profile for ${accountId}: ${res.status}`);
    }
    return (await res.json()) as RiskProfile;
  }

  /**
   * Fetch raw research MuleMetrics.
   */
  public static async getMuleMetrics(accountId: string): Promise<MuleMetrics> {
    const res = await fetch(`${API_BASE_URL}/accounts/${encodeURIComponent(accountId)}/metrics`);
    if (!res.ok) {
      throw new Error(`Failed to fetch mule metrics for ${accountId}: ${res.status}`);
    }
    return (await res.json()) as MuleMetrics;
  }

  /**
   * Fetch candidate chains associated with account.
   */
  public static async getCandidateChains(accountId: string): Promise<CandidateChain[]> {
    const res = await fetch(`${API_BASE_URL}/accounts/${encodeURIComponent(accountId)}/chains`);
    if (!res.ok) {
      throw new Error(`Failed to fetch candidate chains for ${accountId}: ${res.status}`);
    }
    return (await res.json()) as CandidateChain[];
  }

  /**
   * Execute multi-hop forensic trace (UPSTREAM, DOWNSTREAM, or BIDIRECTIONAL).
   */
  public static async getTrace(
    accountId: string,
    direction: 'upstream' | 'downstream' | 'bidirectional'
  ): Promise<TraceResult> {
    const res = await fetch(`${API_BASE_URL}/accounts/${encodeURIComponent(accountId)}/trace/${direction}`);
    if (!res.ok) {
      throw new Error(`Failed to execute ${direction} trace for ${accountId}: ${res.status}`);
    }
    return (await res.json()) as TraceResult;
  }

  /**
   * Fetch specific candidate chain details.
   */
  public static async getCandidateChainById(chainId: string): Promise<CandidateChain> {
    const res = await fetch(`${API_BASE_URL}/chains/${encodeURIComponent(chainId)}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch chain ${chainId}: ${res.status}`);
    }
    return (await res.json()) as CandidateChain;
  }

  /**
   * Fetch high-level command center overview summary.
   */
  public static async getOverview(): Promise<OverviewSummary> {
    const res = await fetch(`${API_BASE_URL}/overview`);
    if (!res.ok) {
      throw new Error(`Failed to fetch overview summary: ${res.status}`);
    }
    return (await res.json()) as OverviewSummary;
  }

  /**
   * Fetch paginated candidate chains.
   */
  public static async getCandidateGraphs(page: number = 1, limit: number = 20, search?: string): Promise<CandidateGraphsResponse> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', String(limit));
    if (search) params.set('search', search);

    const res = await fetch(`${API_BASE_URL}/candidate-graphs?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch candidate graphs: ${res.status}`);
    }
    return (await res.json()) as CandidateGraphsResponse;
  }

  /**
   * Fetch model architecture & benchmark metrics.
   */
  public static async getModelMetrics(): Promise<ModelMetricsSummary> {
    const res = await fetch(`${API_BASE_URL}/model/metrics`);
    if (!res.ok) {
      throw new Error(`Failed to fetch model metrics: ${res.status}`);
    }
    return (await res.json()) as ModelMetricsSummary;
  }

  /**
   * Fetch paginated accounts from the 150k universe.
   */
  public static async getAccounts(
    page: number = 1,
    limit: number = 25,
    search?: string,
    risk?: string
  ): Promise<AccountsPageResponse> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', String(limit));
    if (search) params.set('search', search);
    if (risk) params.set('risk', risk);

    const res = await fetch(`${API_BASE_URL}/accounts?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch accounts: ${res.status}`);
    }
    return (await res.json()) as AccountsPageResponse;
  }
}


