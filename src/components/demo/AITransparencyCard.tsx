import React from 'react';
import { AssistantState } from '@/engine/ai/aiTypes';
import { Bot, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';

interface AITransparencyCardProps {
  assistantStates: Record<string, AssistantState> | null;
  providerName?: string;
  isGemini?: boolean;
}

export const AITransparencyCard: React.FC<AITransparencyCardProps> = ({
  assistantStates,
  providerName = 'Gemini 1.5 Pro',
  isGemini = true,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-bold tracking-wider text-slate-100 uppercase font-mono">
            AI Assistant Transparency & Status
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-slate-400">Provider:</span>
          <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/50 font-bold">
            {providerName ? providerName : isGemini ? 'Gemini 1.5 Pro (Server Secure)' : 'Resilient Heuristic Provider'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {assistantStates &&
          Object.entries(assistantStates).map(([role, state]) => (
            <div
              key={role}
              className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 capitalize font-mono">{state.title}</span>
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    state.status === 'ready'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-red-950 text-red-400 border border-red-800'
                  }`}
                >
                  {state.status === 'ready' ? (
                    <>
                      <CheckCircle className="w-2.5 h-2.5" /> Ready
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-2.5 h-2.5" /> Error
                    </>
                  )}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">{state.lastResponse}</p>
              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Suggestions: {state.suggestions?.length || 0}</span>
                <span className="text-cyan-400 flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> Validated
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
