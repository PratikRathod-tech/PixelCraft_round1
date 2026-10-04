import React from 'react';
import { Html } from '@react-three/drei';
import { Account3DNode } from '../../types/three';

interface AccountLabelProps {
  account: Account3DNode;
  visible: boolean;
}

export const AccountLabel: React.FC<AccountLabelProps> = ({ account, visible }) => {
  if (!visible) return null;

  const isHighRisk = account.riskLevel === 'HIGH' || account.riskLevel === 'CRITICAL';

  return (
    <Html distanceFactor={25} position={[0, 1.2, 0]} center>
      <div className={`px-2 py-1 rounded text-xs font-mono select-none pointer-events-none whitespace-nowrap shadow-lg backdrop-blur-md border ${
        isHighRisk
          ? 'bg-red-950/90 text-red-200 border-red-500'
          : 'bg-slate-900/90 text-cyan-200 border-cyan-500'
      }`}>
        <div className="font-bold flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${isHighRisk ? 'bg-red-500 animate-pulse' : 'bg-cyan-400'}`} />
          {account.accountId}
        </div>
        <div className="text-[10px] text-slate-300">
          Risk: <span className="font-semibold text-white">{(account.riskScore * 100).toFixed(1)}%</span> | Txs: {account.transactionCount}
        </div>
      </div>
    </Html>
  );
};
