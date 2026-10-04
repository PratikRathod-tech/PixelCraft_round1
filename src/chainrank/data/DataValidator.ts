/**
 * ChainRank DataValidator
 * 16-point financial integrity and AML heuristic validation engine.
 * Audits raw mapped transaction rows for data hygiene, anomaly patterns, and referential integrity.
 */

export interface ValidationErrorItem {
  rowNumber: number;
  field: string;
  ruleCode: string;
  message: string;
  severity: 'ERROR' | 'WARNING' | 'ANOMALY';
  rawValue?: string;
}

export interface ValidationSummary {
  totalProcessed: number;
  validRows: number;
  invalidRows: number;
  errorCount: number;
  warningCount: number;
  anomalyCount: number;
  healthScore: number; // 0 to 100%
  ruleBreakdown: Record<string, number>;
  sampleIssues: ValidationErrorItem[];
  detectedAccountsCount: number;
  structuringDetections: number;
  rapidPassThroughDetections: number;
}

export class DataValidator {
  /**
   * Validate mapped dataset rows against the 16 financial rules.
   */
  public static validate(
    rows: Record<string, string>[],
    mappings: Record<string, string>
  ): { summary: ValidationSummary; validatedRows: Record<string, unknown>[] } {
    const issues: ValidationErrorItem[] = [];
    const ruleBreakdown: Record<string, number> = {};
    const seenHashes = new Set<string>();
    const accountLastTxTime = new Map<string, number>();
    const accountFlows = new Map<string, { inSum: number; outSum: number }>();
    const pairHistory = new Map<string, number>(); // 'src->tgt' -> timestamp

    let validCount = 0;
    let invalidCount = 0;
    let structuringCount = 0;
    let rapidPassThroughCount = 0;

    const validatedRows: Record<string, unknown>[] = [];

    const recordRule = (code: string) => {
      ruleBreakdown[code] = (ruleBreakdown[code] || 0) + 1;
    };

    const srcCol = mappings['source'];
    const tgtCol = mappings['target'];
    const amtCol = mappings['amount'];
    const timeCol = mappings['timestamp'];
    const txIdCol = mappings['transactionId'];
    const riskCol = mappings['riskScore'];
    const susCol = mappings['isSuspicious'];
    const chainCol = mappings['chainId'];

    const now = Date.now();
    const oneDayFuture = now + 86400000;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNum = i + 2; // +1 for 0-index, +1 for header line
      let hasFatalError = false;

      const rawSrc = srcCol ? row[srcCol]?.trim() : '';
      const rawTgt = tgtCol ? row[tgtCol]?.trim() : '';
      const rawAmt = amtCol ? row[amtCol]?.trim() : '';
      const rawTime = timeCol ? row[timeCol]?.trim() : '';

      // Rule 1: Missing Source
      if (!rawSrc) {
        hasFatalError = true;
        recordRule('RULE_01_MISSING_SOURCE');
        issues.push({ rowNumber: rowNum, field: 'source', ruleCode: 'RULE_01_MISSING_SOURCE', message: 'Source account ID is missing or empty', severity: 'ERROR' });
      }

      // Rule 2: Missing Target
      if (!rawTgt) {
        hasFatalError = true;
        recordRule('RULE_02_MISSING_TARGET');
        issues.push({ rowNumber: rowNum, field: 'target', ruleCode: 'RULE_02_MISSING_TARGET', message: 'Target account ID is missing or empty', severity: 'ERROR' });
      }

      // Rule 3: Self-Transfer
      if (rawSrc && rawTgt && rawSrc === rawTgt) {
        hasFatalError = true;
        recordRule('RULE_03_SELF_TRANSFER');
        issues.push({ rowNumber: rowNum, field: 'target', ruleCode: 'RULE_03_SELF_TRANSFER', message: `Self-transfer detected: ${rawSrc} -> ${rawTgt}`, severity: 'ERROR', rawValue: rawSrc });
      }

      // Rule 4: Non-Numeric Amount
      const cleanAmt = rawAmt.replace(/[$€£,\s]/g, '');
      const parsedAmt = parseFloat(cleanAmt);
      if (isNaN(parsedAmt)) {
        hasFatalError = true;
        recordRule('RULE_04_NON_NUMERIC_AMOUNT');
        issues.push({ rowNumber: rowNum, field: 'amount', ruleCode: 'RULE_04_NON_NUMERIC_AMOUNT', message: `Amount "${rawAmt}" is not a valid number`, severity: 'ERROR', rawValue: rawAmt });
      }

      // Rule 5: Negative Amount
      if (!isNaN(parsedAmt) && parsedAmt < 0) {
        hasFatalError = true;
        recordRule('RULE_05_NEGATIVE_AMOUNT');
        issues.push({ rowNumber: rowNum, field: 'amount', ruleCode: 'RULE_05_NEGATIVE_AMOUNT', message: `Negative transfer amount: ${parsedAmt}`, severity: 'ERROR', rawValue: rawAmt });
      }

      // Rule 6: Zero Amount
      if (!isNaN(parsedAmt) && parsedAmt === 0) {
        recordRule('RULE_06_ZERO_AMOUNT');
        issues.push({ rowNumber: rowNum, field: 'amount', ruleCode: 'RULE_06_ZERO_AMOUNT', message: 'Transaction amount is exactly zero', severity: 'WARNING', rawValue: '0' });
      }

      // Rule 7 & 8: Timestamp checks
      let timestampMs = 0;
      if (!rawTime) {
        hasFatalError = true;
        recordRule('RULE_07_INVALID_TIMESTAMP');
        issues.push({ rowNumber: rowNum, field: 'timestamp', ruleCode: 'RULE_07_INVALID_TIMESTAMP', message: 'Timestamp is missing', severity: 'ERROR' });
      } else {
        const parsedDate = Date.parse(rawTime);
        if (!isNaN(parsedDate)) {
          timestampMs = parsedDate;
        } else if (/^\d+$/.test(rawTime)) {
          // Unix epoch in ms or seconds
          const num = parseInt(rawTime, 10);
          timestampMs = num > 1e11 ? num : num * 1000;
        } else {
          hasFatalError = true;
          recordRule('RULE_07_INVALID_TIMESTAMP');
          issues.push({ rowNumber: rowNum, field: 'timestamp', ruleCode: 'RULE_07_INVALID_TIMESTAMP', message: `Unrecognized timestamp format: "${rawTime}"`, severity: 'ERROR', rawValue: rawTime });
        }

        if (timestampMs > oneDayFuture) {
          recordRule('RULE_08_FUTURE_TIMESTAMP');
          issues.push({ rowNumber: rowNum, field: 'timestamp', ruleCode: 'RULE_08_FUTURE_TIMESTAMP', message: 'Transaction timestamp is in the future', severity: 'WARNING', rawValue: rawTime });
        }
      }

      // Rule 9: Duplicate Transaction
      const txHash = `${rawSrc}->${rawTgt}:${parsedAmt}:${timestampMs}`;
      if (seenHashes.has(txHash)) {
        recordRule('RULE_09_DUPLICATE_TX');
        issues.push({ rowNumber: rowNum, field: 'transaction', ruleCode: 'RULE_09_DUPLICATE_TX', message: `Duplicate transaction record detected`, severity: 'WARNING' });
      } else {
        seenHashes.add(txHash);
      }

      // Rule 10: Extreme Outlier (> $100M)
      if (!isNaN(parsedAmt) && parsedAmt > 100000000) {
        recordRule('RULE_10_EXTREME_OUTLIER');
        issues.push({ rowNumber: rowNum, field: 'amount', ruleCode: 'RULE_10_EXTREME_OUTLIER', message: `Extreme volume outlier: $${parsedAmt.toLocaleString()}`, severity: 'ANOMALY', rawValue: rawAmt });
      }

      // Rule 11: Micro Amount (< $0.01)
      if (!isNaN(parsedAmt) && parsedAmt > 0 && parsedAmt < 0.01) {
        recordRule('RULE_11_MICRO_AMOUNT');
        issues.push({ rowNumber: rowNum, field: 'amount', ruleCode: 'RULE_11_MICRO_AMOUNT', message: 'Sub-cent transfer amount detected (dust test)', severity: 'ANOMALY', rawValue: rawAmt });
      }

      // Rule 12: Structuring detection ($9,000 - $9,999)
      let isStructuring = false;
      if (!isNaN(parsedAmt) && parsedAmt >= 9000 && parsedAmt < 10000) {
        isStructuring = true;
        structuringCount++;
        recordRule('RULE_12_STRUCTURING_RANGE');
        issues.push({ rowNumber: rowNum, field: 'amount', ruleCode: 'RULE_12_STRUCTURING_RANGE', message: `Structuring threshold anomaly: $${parsedAmt.toFixed(2)} (near $10k CTR trigger)`, severity: 'ANOMALY', rawValue: rawAmt });
      }

      // Rule 13: Corrupt ID Characters
      if (/[^\w.-]/.test(rawSrc) || /[^\w.-]/.test(rawTgt)) {
        recordRule('RULE_13_CORRUPT_ACCOUNT_ID');
        issues.push({ rowNumber: rowNum, field: 'source', ruleCode: 'RULE_13_CORRUPT_ACCOUNT_ID', message: 'Account identifier contains illegal or control characters', severity: 'WARNING' });
      }

      // Rule 14: Rapid High-Frequency Burst (<= 1s)
      if (rawSrc && timestampMs > 0) {
        const lastTime = accountLastTxTime.get(rawSrc);
        if (lastTime && Math.abs(timestampMs - lastTime) <= 1000) {
          recordRule('RULE_14_BURST_VELOCITY');
          issues.push({ rowNumber: rowNum, field: 'timestamp', ruleCode: 'RULE_14_BURST_VELOCITY', message: `High-frequency burst transfer <= 1s from account ${rawSrc}`, severity: 'ANOMALY' });
        }
        accountLastTxTime.set(rawSrc, timestampMs);
      }

      // Rule 15: Rapid Pass-Through Tracking
      if (rawSrc && rawTgt && !isNaN(parsedAmt) && parsedAmt > 0) {
        const srcFlow = accountFlows.get(rawSrc) || { inSum: 0, outSum: 0 };
        srcFlow.outSum += parsedAmt;
        accountFlows.set(rawSrc, srcFlow);

        const tgtFlow = accountFlows.get(rawTgt) || { inSum: 0, outSum: 0 };
        tgtFlow.inSum += parsedAmt;
        accountFlows.set(rawTgt, tgtFlow);
      }

      // Rule 16: Immediate Ping-pong / Circular Loop (A -> B then B -> A)
      if (rawSrc && rawTgt) {
        const reverseKey = `${rawTgt}->${rawSrc}`;
        const prevTime = pairHistory.get(reverseKey);
        if (prevTime && Math.abs(timestampMs - prevTime) <= 3600000) {
          recordRule('RULE_16_CIRCULAR_LOOP');
          issues.push({ rowNumber: rowNum, field: 'target', ruleCode: 'RULE_16_CIRCULAR_LOOP', message: `Immediate circular counterparty loop between ${rawSrc} and ${rawTgt}`, severity: 'ANOMALY' });
        }
        pairHistory.set(`${rawSrc}->${rawTgt}`, timestampMs);
      }

      if (hasFatalError) {
        invalidCount++;
      } else {
        validCount++;
        validatedRows.push({
          id: txIdCol && row[txIdCol] ? row[txIdCol] : `tx_${i + 1}`,
          source: rawSrc,
          target: rawTgt,
          amount: parsedAmt,
          timestamp: timestampMs > 0 ? new Date(timestampMs).toISOString() : new Date().toISOString(),
          timestampMs,
          isStructuring,
          riskScore: riskCol && row[riskCol] ? parseFloat(row[riskCol]) : 0,
          isSuspicious: susCol && (row[susCol] === '1' || row[susCol]?.toLowerCase() === 'true'),
          chainId: chainCol ? row[chainCol] : undefined
        });
      }
    }

    // Inspect aggregate pass-through for Rule 15
    for (const [, flow] of accountFlows.entries()) {
      if (flow.inSum > 1000 && flow.outSum > 1000) {
        const diff = Math.abs(flow.inSum - flow.outSum);
        if (diff / Math.max(flow.inSum, flow.outSum) < 0.1) {
          rapidPassThroughCount++;
          recordRule('RULE_15_RAPID_PASS_THROUGH');
        }
      }
    }

    const errorCount = issues.filter(i => i.severity === 'ERROR').length;
    const warningCount = issues.filter(i => i.severity === 'WARNING').length;
    const anomalyCount = issues.filter(i => i.severity === 'ANOMALY').length;

    // Health Score calculation
    const errorPenalty = Math.min(60, (errorCount / Math.max(1, rows.length)) * 100);
    const warningPenalty = Math.min(25, (warningCount / Math.max(1, rows.length)) * 30);
    const healthScore = Math.max(0, Math.round(100 - errorPenalty - warningPenalty));

    return {
      summary: {
        totalProcessed: rows.length,
        validRows: validCount,
        invalidRows: invalidCount,
        errorCount,
        warningCount,
        anomalyCount,
        healthScore,
        ruleBreakdown,
        sampleIssues: issues.slice(0, 30),
        detectedAccountsCount: accountFlows.size,
        structuringDetections: structuringCount,
        rapidPassThroughDetections: rapidPassThroughCount
      },
      validatedRows
    };
  }
}
