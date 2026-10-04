# Data Architecture
**Classification: Architecture Authority Specification**

---

## 1. Canonical Domain Entities (`Pixel/src/chainrank/domain/`)
1. **`Account`**:
   - `id`: Canonical string ID (e.g. `100110.0`).
   - `balance`, `currency`, `bankName`, `accountType`.
   - `riskProfile`: `muleProbabilityScore` ($\psi$), `riskTier`, `investigationRole`.
   - `muleMetrics`: $E_{BC}, E_{IO}, E_{Vol}, E_{mule}$.
   - `candidateChainIds`: Smurfing networks traversing this account.
   - `provenance`: Origin tracking (`MuleTrace-MOD03` | `DMLRank-Stage8`).
2. **`TransactionEdge`**:
   - `id`, `sourceId`, `targetId`, `amount`, `timestamp`, `isSuspicious`, `flowIntensity`.
3. **`CandidateChain`**:
   - `chainId`, `startMuleAccountId`, `nodeCount`, `edgeCount`, `aggregateAmount`, `maxMuleScore`.
4. **`TraceResult`**:
   - `focusAccountId`, `direction`, `pathAccountIds`, `edges`, `hopCount`, `totalTracedAmount`.
