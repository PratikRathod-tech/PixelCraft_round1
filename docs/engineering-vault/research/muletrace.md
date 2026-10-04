# MuleTrace MOD-03 Research Equations
**Classification: Mathematical Reference**

---

## 1. Topological Metrics
1. **Betweenness Anomaly Score ($E_{BC}$)**:
   $$E_{BC} = \frac{BC(v) - \mu_{BC}}{\sigma_{BC}}$$
2. **In/Out Ratio Disparity ($E_{IO}$)**:
   $$E_{IO} = 1.0 - \frac{\min(\text{InVol}, \text{OutVol})}{\max(\text{InVol}, \text{OutVol})}$$
3. **Velocity Volume Burst ($E_{Vol}$)**:
   $$E_{Vol} = \frac{\text{TxCount}}{\Delta t} \times \text{FlowFactor}$$
4. **Composite Mule Score ($E_{mule}$)**:
   $$E_{mule} = E_{BC} + E_{IO} + E_{Vol}$$
   *Candidate threshold: $E_{mule} \ge 1.00$.*
