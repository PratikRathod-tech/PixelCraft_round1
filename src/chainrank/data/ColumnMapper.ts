/**
 * ChainRank ColumnMapper
 * Intelligently maps heterogeneous dataset column names to canonical financial schema fields.
 * Supports auto-detection via fuzzy alias matching and value pattern heuristic analysis.
 */

export interface CanonicalFieldDefinition {
  key: string;
  label: string;
  required: boolean;
  aliases: string[];
  description: string;
}

export const CANONICAL_FIELDS: CanonicalFieldDefinition[] = [
  {
    key: 'source',
    label: 'Source Account',
    required: true,
    aliases: ['source', 'from', 'sender', 'src_account', 'from_account', 'originator', 'src', 'account_from', 'orig_account', 'origin_account_id', 'origin_account', 'origin_customer_id'],
    description: 'Account originating the transfer (outflow node)'
  },
  {
    key: 'target',
    label: 'Target Account',
    required: true,
    aliases: ['target', 'to', 'receiver', 'dest_account', 'to_account', 'beneficiary', 'dst', 'account_to', 'dest_account_id', 'beneficiary_account_id', 'beneficiary_account', 'beneficiary_customer_id'],
    description: 'Account receiving the transfer (inflow node)'
  },
  {
    key: 'amount',
    label: 'Transaction Amount',
    required: true,
    aliases: ['amount', 'value', 'tx_amount', 'volume', 'amt', 'usd_amount', 'sum', 'transfer_amount', 'balance_delta', 'transaction_amount', 'transaction_amount_prepared'],
    description: 'Monetary volume transferred'
  },
  {
    key: 'timestamp',
    label: 'Timestamp / Date',
    required: true,
    aliases: ['timestamp', 'date', 'time', 'datetime', 'tx_time', 'created_at', 'step', 'trans_date', 'timestamp_epoch', 'transaction_date_time', 'transaction_timestamp'],
    description: 'Time or chronological step of the transfer'
  },
  {
    key: 'transactionId',
    label: 'Transaction ID (Optional)',
    required: false,
    aliases: ['transaction_id', 'tx_id', 'id', 'ref_no', 'transfer_id', 'txn_id'],
    description: 'Unique identifier for the transaction record'
  },
  {
    key: 'currency',
    label: 'Currency (Optional)',
    required: false,
    aliases: ['currency', 'curr', 'ccy', 'unit'],
    description: 'ISO currency code (default: USD)'
  },
  {
    key: 'riskScore',
    label: 'Prior Risk Score (Optional)',
    required: false,
    aliases: ['risk_score', 'risk', 'psi', 'score', 'prob_mule', 'suspicion_score'],
    description: 'Pre-computed model risk or anomaly probability'
  },
  {
    key: 'isSuspicious',
    label: 'Suspicious / Laundering Flag (Optional)',
    required: false,
    aliases: ['is_suspicious', 'is_fraud', 'is_laundering', 'flagged', 'label', 'is_mule', 'is_sar'],
    description: 'Ground truth or heuristic suspicious flag'
  },
  {
    key: 'chainId',
    label: 'Subtree / Chain ID (Optional)',
    required: false,
    aliases: ['chain_id', 'cluster_id', 'subgraph_id', 'ring_id', 'syndicate_id'],
    description: 'Associated laundering ring or candidate chain ID'
  }
];

export const CANONICAL_ACCOUNT_FIELDS: CanonicalFieldDefinition[] = [
  {
    key: 'accountId',
    label: 'Account ID',
    required: true,
    aliases: ['account_id', 'account_i', 'account', 'acc_id', 'node_id', 'accountid', 'user_id'],
    description: 'Unique account identifier'
  },
  {
    key: 'nodeType',
    label: 'Node Type',
    required: false,
    aliases: ['node_type', 'node_typ', 'type', 'entity_type', 'account_type'],
    description: 'Internal, external, or merchant counterparty'
  },
  {
    key: 'riskTier',
    label: 'Risk Tier',
    required: false,
    aliases: ['risk_tier', 'tier', 'risk_level', 'risk_category'],
    description: 'CRITICAL, HIGH, SUSPICIOUS, or NORMAL'
  },
  {
    key: 'riskScore',
    label: 'Risk Score',
    required: false,
    aliases: ['risk_score', 'score', 'risk', 'psi', 'anomaly_score'],
    description: 'Quantitative risk score from 0.0 to 1.0'
  },
  {
    key: 'isCandidate',
    label: 'Is Candidate / Mule Flag',
    required: false,
    aliases: ['is_candidate', 'is_candida', 'candidate', 'is_mule', 'mule_candidate', 'flagged'],
    description: 'Boolean flag indicating whether account is a candidate mule'
  },
  {
    key: 'inCount',
    label: 'Inbound Transaction Count',
    required: false,
    aliases: ['in_count', 'in_cnt', 'in_degree', 'in_transactions', 'inflow_count'],
    description: 'Total number of inbound credits'
  },
  {
    key: 'outCount',
    label: 'Outbound Transaction Count',
    required: false,
    aliases: ['out_count', 'out_cnt', 'out_degree', 'out_transactions', 'outflow_count'],
    description: 'Total number of outbound debits'
  },
  {
    key: 'totalInAmount',
    label: 'Total Inbound Amount',
    required: false,
    aliases: ['total_in_amount', 'total_in_a', 'in_amount', 'total_in', 'inflow_volume', 'totalinamount'],
    description: 'Total monetary inflow'
  },
  {
    key: 'totalOutAmount',
    label: 'Total Outbound Amount',
    required: false,
    aliases: ['total_out_amount', 'total_out_', 'out_amount', 'total_out', 'outflow_volume', 'totaloutamount'],
    description: 'Total monetary outflow'
  },
  {
    key: 'betweenness',
    label: 'Betweenness Centrality',
    required: false,
    aliases: ['betweenness', 'betweenn', 'betweenness_centrality', 'betweenness_e_bc', 'e_bc'],
    description: 'Graph routing betweenness metric'
  },
  {
    key: 'inOutDisparity',
    label: 'InOut Disparity (E_IO)',
    required: false,
    aliases: ['inout_disparity', 'inout_dis', 'inout_disparity_e_io', 'disparity', 'balance_disparity', 'e_io'],
    description: 'Flow asymmetry index'
  },
  {
    key: 'volumeBalance',
    label: 'Volume Balance / Burst',
    required: false,
    aliases: ['volume_balance', 'volume_b', 'volume_balance_ratio', 'volume_burst_e_vol', 'volume_burst', 'e_vol'],
    description: 'Pass-through velocity metric'
  },
  {
    key: 'chains',
    label: 'Smurfing Chains / Ring IDs',
    required: false,
    aliases: ['chains', 'chain_id', 'chain_ids', 'smurfing_chains', 'rings', 'ring_ids'],
    description: 'Candidate chains or ring affiliations'
  }
];

export type DatasetSchemaType = 'TRANSACTION_EDGE_LIST' | 'ACCOUNT_METRICS_LEDGER';

export function detectDatasetSchema(headers: string[]): DatasetSchemaType {
  const clean = headers.map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, '_'));
  const hasAccountCol = clean.some(
    (h) => h.startsWith('account_') || h === 'account' || h === 'account_id' || h === 'account_i'
  );
  const hasCandidateOrChains = clean.some(
    (h) => h.includes('candidate') || h.includes('candida') || h.includes('chain') || h.includes('risk_tier')
  );
  const hasSource = clean.some((h) => h === 'source' || h === 'from' || h === 'sender' || h === 'from_account' || h.includes('origin'));
  const hasTarget = clean.some((h) => h === 'target' || h === 'to' || h === 'receiver' || h === 'to_account' || h.includes('beneficiary'));

  if (hasAccountCol && (hasCandidateOrChains || (!hasSource && !hasTarget))) {
    return 'ACCOUNT_METRICS_LEDGER';
  }
  return 'TRANSACTION_EDGE_LIST';
}

export interface ColumnMappingResult {
  mappings: Record<string, string>; // canonicalKey -> detectedHeaderName
  confidence: Record<string, number>; // canonicalKey -> confidence (0 to 1)
  unmappedHeaders: string[];
  missingRequired: string[];
  isComplete: boolean;
  schemaType?: DatasetSchemaType;
}

export class ColumnMapper {
  /**
   * Auto-detect mappings for a list of column headers.
   */
  public static detectMappings(
    headers: string[],
    sampleRows?: Record<string, string>[]
  ): ColumnMappingResult {
    const mappings: Record<string, string> = {};
    const confidence: Record<string, number> = {};
    const assignedHeaders = new Set<string>();

    const schemaType = detectDatasetSchema(headers);
    const targetFields = schemaType === 'ACCOUNT_METRICS_LEDGER' ? CANONICAL_ACCOUNT_FIELDS : CANONICAL_FIELDS;

    const normalizedHeaders = headers.map(h => ({
      raw: h,
      clean: h.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')
    }));

    // First pass: Exact and alias matching
    for (const field of targetFields) {
      let bestMatch: string | null = null;
      let highestScore = 0;

      for (const nh of normalizedHeaders) {
        if (assignedHeaders.has(nh.raw)) continue;

        // Exact match with field key
        if (nh.clean === field.key.toLowerCase()) {
          bestMatch = nh.raw;
          highestScore = 1.0;
          break;
        }

        // Exact match with aliases
        for (const alias of field.aliases) {
          const cleanAlias = alias.toLowerCase().replace(/[^a-z0-9]/g, '_');
          if (nh.clean === cleanAlias) {
            bestMatch = nh.raw;
            highestScore = 0.95;
            break;
          }
        }

        if (highestScore >= 0.95) break;

        // Substring match
        for (const alias of field.aliases) {
          const cleanAlias = alias.toLowerCase().replace(/[^a-z0-9]/g, '_');
          if (nh.clean.includes(cleanAlias) || cleanAlias.includes(nh.clean)) {
            const score = 0.75;
            if (score > highestScore) {
              highestScore = score;
              bestMatch = nh.raw;
            }
          }
        }
      }

      if (bestMatch && highestScore > 0.6) {
        mappings[field.key] = bestMatch;
        confidence[field.key] = highestScore;
        assignedHeaders.add(bestMatch);
      }
    }

    // Second pass: Sample value heuristics for unmapped required fields
    if (sampleRows && sampleRows.length > 0) {
      const remainingFields = CANONICAL_FIELDS.filter(f => f.required && !mappings[f.key]);
      const unassignedHeaders = normalizedHeaders.filter(nh => !assignedHeaders.has(nh.raw));

      for (const field of remainingFields) {
        for (const nh of unassignedHeaders) {
          if (assignedHeaders.has(nh.raw)) continue;

          // Check if values match amount pattern
          if (field.key === 'amount') {
            const numericValues = sampleRows
              .slice(0, 10)
              .map(r => r[nh.raw])
              .filter(v => v !== undefined && v !== '');
            const allNumeric = numericValues.length > 0 && numericValues.every(v => !isNaN(Number(v.replace(/[$€,\s]/g, ''))));
            if (allNumeric) {
              mappings[field.key] = nh.raw;
              confidence[field.key] = 0.7;
              assignedHeaders.add(nh.raw);
              break;
            }
          }

          // Check if values match timestamp pattern
          if (field.key === 'timestamp') {
            const dateValues = sampleRows
              .slice(0, 10)
              .map(r => r[nh.raw])
              .filter(v => v !== undefined && v !== '');
            const looksLikeDate = dateValues.length > 0 && dateValues.every(v => !isNaN(Date.parse(v)) || /^\d{1,10}$/.test(v));
            if (looksLikeDate) {
              mappings[field.key] = nh.raw;
              confidence[field.key] = 0.65;
              assignedHeaders.add(nh.raw);
              break;
            }
          }
        }
      }
    }

    const missingRequired = targetFields
      .filter((f) => f.required && !mappings[f.key])
      .map((f) => f.key);

    const unmappedHeaders = headers.filter((h) => !assignedHeaders.has(h));

    return {
      mappings,
      confidence,
      unmappedHeaders,
      missingRequired,
      isComplete: missingRequired.length === 0,
      schemaType
    };
  }
}
