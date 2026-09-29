import React, { useState, useEffect } from 'react';
import { PixelScreenConfig } from '@/engine/composition/types';
import { AIOrchestrator } from '@/engine/ai/aiOrchestrator';
import {
  AssistantState,
  AssistantSuggestion,
  AssistantRoleType,
  AskArmoryResponse,
  AIResearchResult,
} from '@/engine/ai/aiTypes';
import { assistantRoles } from '@/engine/ai/assistantRoles';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  Palette,
  Zap,
  Eye,
  Check,
  X,
  RefreshCw,
  Send,
  ArrowRight,
  Globe,
  HelpCircle,
  Search,
  BookOpen,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export interface AICommandPanelProps {
  config: PixelScreenConfig;
  onChangeConfig: (newConfig: PixelScreenConfig) => void;
  className?: string;
}

export const AICommandPanel: React.FC<AICommandPanelProps> = ({
  config,
  onChangeConfig,
  className = '',
}) => {
  const [panelTab, setPanelTab] = useState<'copilot' | 'research'>('copilot');
  const [assistants, setAssistants] = useState<Record<AssistantRoleType, AssistantState> | null>(null);
  const [loading, setLoading] = useState(false);
  const [askPrompt, setAskPrompt] = useState('');
  const [askLoading, setAskLoading] = useState(false);
  const [askResponse, setAskResponse] = useState<AskArmoryResponse | null>(null);

  // AI Research Bridge State
  const [researchQuery, setResearchQuery] = useState('');
  const [researchLoading, setResearchLoading] = useState(false);
  const [researchResult, setResearchResult] = useState<AIResearchResult | null>(null);

  const providerStatus = AIOrchestrator.getProviderStatus();

  const runAudit = async () => {
    setLoading(true);
    const res = await AIOrchestrator.runFullAudit({ config });
    setAssistants(res);
    setLoading(false);
  };

  useEffect(() => {
    runAudit();
  }, [config.title, config.theme, config.hero?.visual?.assetId]);

  const handleApply = (suggestion: AssistantSuggestion) => {
    if (suggestion.configMutation) {
      const updated = suggestion.configMutation(config);
      onChangeConfig(updated);
    }
    if (assistants) {
      const roleState = assistants[suggestion.role];
      if (roleState) {
        const updatedSuggestions = roleState.suggestions.map((s) =>
          s.id === suggestion.id ? { ...s, applied: true } : s
        );
        setAssistants({
          ...assistants,
          [suggestion.role]: { ...roleState, suggestions: updatedSuggestions },
        });
      }
    }
  };

  const handleDismiss = (role: AssistantRoleType, suggestionId: string) => {
    if (assistants) {
      const roleState = assistants[role];
      if (roleState) {
        const updatedSuggestions = roleState.suggestions.filter((s) => s.id !== suggestionId);
        setAssistants({
          ...assistants,
          [role]: { ...roleState, suggestions: updatedSuggestions },
        });
      }
    }
  };

  const handleAskArmory = async (promptToUse?: string) => {
    const q = promptToUse || askPrompt;
    if (!q.trim()) return;
    setAskLoading(true);
    try {
      const res = await AIOrchestrator.askArmory(q, { config });
      setAskResponse(res);
    } catch {
      // fallback
    } finally {
      setAskLoading(false);
    }
  };

  const handleApplyAskFix = () => {
    if (askResponse?.configMutation) {
      const updated = askResponse.configMutation(config);
      onChangeConfig(updated);
      setAskResponse(null);
      setAskPrompt('');
    }
  };

  const handleRunResearch = async (customQuery?: string) => {
    const q = customQuery || researchQuery;
    if (!q.trim()) return;
    setResearchLoading(true);
    try {
      const provider = AIOrchestrator.getProvider();
      if (provider.researchAI) {
        const res = await provider.researchAI(q, 'competition_ui', JSON.stringify(config));
        setResearchResult(res);
      }
    } catch {
      // fallback
    } finally {
      setResearchLoading(false);
    }
  };

  const renderIcon = (role: AssistantRoleType) => {
    if (role === 'design') return <Palette className="w-4 h-4 text-cyan-400" />;
    if (role === 'strategy') return <Zap className="w-4 h-4 text-purple-400" />;
    return <Eye className="w-4 h-4 text-emerald-400" />;
  };

  const quickPrompts = [
    'Make this feel more premium',
    'Improve mobile hierarchy',
    'Does this satisfy the competition prompt?',
    'Give me 3 ways to differentiate this',
    'Reduce visual clutter',
  ];

  const researchTopics = [
    'Fintech Dark Mode Standards',
    'Healthcare GIS Telemetry UI',
    'Web3 Cyber Dashboard Best Practices',
    'Bento Grid Conversion Metrics',
  ];

  return (
    <div className={'space-y-4 font-mono text-xs ' + className}>
      {/* Header & Provider Status */}
      <div className="flex flex-col gap-2 border-b border-slate-800 pb-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px]">
            <button
              onClick={() => setPanelTab('copilot')}
              className={'px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ' + (
                panelTab === 'copilot'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Sparkles className="w-3 h-3" /> COPILOT
            </button>
            <button
              onClick={() => setPanelTab('research')}
              className={'px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ' + (
                panelTab === 'research'
                  ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <BookOpen className="w-3 h-3" /> AI RESEARCH BRIDGE
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            icon={<RefreshCw className={'w-3.5 h-3.5 ' + (loading ? 'animate-spin' : '')} />}
            onClick={runAudit}
          >
            Re-Audit
          </Button>
        </div>

        {/* Live Provider Badge */}
        <div className="flex items-center justify-between text-[11px] bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5">
            <span
              className={'w-2 h-2 rounded-full ' + (
                providerStatus.isGeminiConnected ? 'bg-cyan-400 shadow-glow-cyan' : 'bg-emerald-400'
              )}
            />
            <span className="text-slate-300 font-bold">
              {providerStatus.isGeminiConnected ? 'Gemini 2.0 Bridge Online' : 'Mock Copilot Engine Active'}
            </span>
          </div>
          <Badge variant={providerStatus.isGeminiConnected ? 'cyan' : 'neutral'} className="text-[9px] py-0">
            {providerStatus.type.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* MODE 1: COPILOT & AUDIT */}
      {panelTab === 'copilot' && (
        <div className="space-y-4">
          {/* ASK ARMORY */}
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5 text-[11px]">
                <HelpCircle className="w-3.5 h-3.5" /> ASK THE ARMORY COPILOT
              </span>
            </div>

            <div className="flex gap-1.5">
              <input
                type="text"
                value={askPrompt}
                onChange={(e) => setAskPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskArmory()}
                placeholder="e.g. 'Make this feel more premium'..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
              />
              <Button
                variant="primary"
                size="sm"
                icon={<Send className={'w-3 h-3 ' + (askLoading ? 'animate-spin' : '')} />}
                onClick={() => handleAskArmory()}
                disabled={askLoading || !askPrompt.trim()}
              >
                Ask
              </Button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-1">
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAskPrompt(qp);
                    handleAskArmory(qp);
                  }}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all text-left"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Structured Ask Result */}
            {askResponse && (
              <div className="mt-2 bg-slate-950 border border-cyan-500/50 rounded-lg p-3 space-y-2 text-[11px]">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> COPILOT RECOMMENDATION
                </div>

                <p className="text-slate-300 leading-snug">{askResponse.recommendation}</p>
                <p className="text-slate-400 text-[10px] leading-snug">
                  <strong>Rationale:</strong> {askResponse.reason}
                </p>

                {askResponse.changes && askResponse.changes.length > 0 && (
                  <div className="bg-slate-900 border border-slate-800 rounded p-2 space-y-1 text-[10px]">
                    <span className="text-slate-400 font-bold uppercase text-[9px]">Proposed Mutation:</span>
                    {askResponse.changes.map((ch, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-200">
                        <span className="text-cyan-400 font-bold">{ch.property}:</span>
                        <span className="line-through text-slate-500">{String(ch.from)}</span>
                        <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
                        <span className="text-emerald-400 font-bold">{String(ch.to)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {askResponse.webSources && askResponse.webSources.length > 0 && (
                  <div className="pt-1 border-t border-slate-800 flex flex-wrap gap-1 text-[9px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" /> Web Grounded:
                    </span>
                    {askResponse.webSources.map((ws, i) => (
                      <a
                        key={i}
                        href={ws.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 underline hover:text-cyan-300"
                      >
                        {ws.title}
                      </a>
                    ))}
                  </div>
                )}

                {askResponse.configMutation && (
                  <div className="pt-1 flex justify-end">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<Zap className="w-3 h-3" />}
                      onClick={handleApplyAskFix}
                      className="text-[10px] py-0.5 px-2"
                    >
                      APPLY PROPOSED FIX
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* AUDIT CARDS */}
          {assistants &&
            (Object.keys(assistants) as AssistantRoleType[]).map((roleKey) => {
              const roleData = assistantRoles[roleKey];
              const state = assistants[roleKey];

              return (
                <div
                  key={roleKey}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      {renderIcon(roleKey)}
                      <span className="font-bold text-slate-100 text-xs">{roleData.name}</span>
                    </div>
                    <Badge
                      variant={roleKey === 'design' ? 'cyan' : roleKey === 'strategy' ? 'purple' : 'emerald'}
                      className="text-[9px] py-0"
                    >
                      {roleData.badge}
                    </Badge>
                  </div>

                  {state.lastResponse && (
                    <p className="text-[11px] text-slate-400 leading-snug">{state.lastResponse}</p>
                  )}

                  <div className="space-y-2 pt-1">
                    {state.suggestions.map((s) => (
                      <div
                        key={s.id}
                        className={'p-2.5 rounded-lg border text-[11px] space-y-1.5 transition-all ' + (
                          s.applied
                            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                            : s.severity === 'critical'
                            ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                            : s.severity === 'warning'
                            ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        )}
                      >
                        <div className="flex items-center justify-between font-bold text-slate-200">
                          <span>{s.title}</span>
                          {s.applied ? (
                            <Badge variant="emerald" className="text-[9px] py-0 flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" /> APPLIED
                            </Badge>
                          ) : (
                            <button
                              onClick={() => handleDismiss(roleKey, s.id)}
                              className="text-slate-500 hover:text-slate-300"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {s.problem && s.problem !== 'None detected.' && (
                          <p className="text-[10px] text-slate-400 leading-snug">
                            <strong>Issue:</strong> {s.problem}
                          </p>
                        )}
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                          <strong>Recommendation:</strong> {s.recommendation || s.message}
                        </p>
                        {s.reason && (
                          <p className="text-[10px] text-slate-400 leading-snug">
                            <strong>Rationale:</strong> {s.reason}
                          </p>
                        )}

                        {s.changes && s.changes.length > 0 && (
                          <div className="bg-slate-900/90 border border-slate-800 rounded p-1.5 space-y-0.5 text-[10px]">
                            {s.changes.map((ch, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                                <span className="text-cyan-400 font-bold">{ch.property}:</span>
                                <span className="line-through text-slate-500">{String(ch.from)}</span>
                                <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
                                <span className="text-emerald-400 font-bold">{String(ch.to)}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {!s.applied && s.configMutation && (
                          <div className="pt-1 flex justify-end">
                            <Button
                              variant="primary"
                              size="sm"
                              icon={<Zap className="w-3 h-3" />}
                              onClick={() => handleApply(s)}
                              className="text-[10px] py-0.5 px-2"
                            >
                              APPLY FIX
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* MODE 2: AI RESEARCH BRIDGE */}
      {panelTab === 'research' && (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-3 space-y-2.5">
            <span className="text-purple-400 font-bold flex items-center gap-1.5 text-[11px]">
              <Search className="w-3.5 h-3.5" /> STRUCTURED AI RESEARCH BRIDGE
            </span>

            <div className="flex gap-1.5">
              <input
                type="text"
                value={researchQuery}
                onChange={(e) => setResearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunResearch()}
                placeholder="Topic (e.g. 'Fintech Dark Mode Standards')..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-purple-500"
              />
              <Button
                variant="primary"
                size="sm"
                icon={<Search className={'w-3 h-3 ' + (researchLoading ? 'animate-spin' : '')} />}
                onClick={() => handleRunResearch()}
                disabled={researchLoading || !researchQuery.trim()}
              >
                Research
              </Button>
            </div>

            {/* Quick Topic Chips */}
            <div className="flex flex-wrap gap-1">
              {researchTopics.map((top, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setResearchQuery(top);
                    handleRunResearch(top);
                  }}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-purple-300 hover:border-purple-500/40 transition-all text-left"
                >
                  {top}
                </button>
              ))}
            </div>
          </div>

          {/* Research Results Display */}
          {researchResult && (
            <div className="space-y-2.5">
              {/* 1. FACTS */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1. VERIFIED FACTS
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300 pl-4 list-disc">
                  {researchResult.facts.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* 2. ANALYSIS */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
                <div className="font-bold text-purple-400 flex items-center gap-1.5 text-xs">
                  <Zap className="w-3.5 h-3.5" /> 2. COMPETITION ANALYSIS
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300 pl-4 list-disc">
                  {researchResult.analysis.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>

              {/* 3. RECOMMENDATIONS */}
              <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-3 space-y-1.5">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5" /> 3. ACTIONABLE RECOMMENDATIONS
                </div>
                <ul className="space-y-1 text-[11px] text-emerald-200 pl-4 list-disc">
                  {researchResult.recommendations.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* 4. UNCERTAINTIES */}
              {researchResult.uncertainties && researchResult.uncertainties.length > 0 && (
                <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 space-y-1.5">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                    <AlertCircle className="w-3.5 h-3.5" /> 4. UNCERTAINTIES & ASSUMPTIONS
                  </div>
                  <ul className="space-y-1 text-[11px] text-amber-200 pl-4 list-disc">
                    {researchResult.uncertainties.map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 5. SOURCES */}
              {researchResult.sources && researchResult.sources.length > 0 && (
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-[10px]">
                  <span className="text-slate-500 font-bold uppercase">Citations & Grounding Sources:</span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {researchResult.sources.map((src, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-300 flex items-center gap-1"
                      >
                        <Globe className="w-2.5 h-2.5 text-cyan-400" />
                        {src.title}
                        {src.credibility && (
                          <Badge variant="cyan" className="text-[8px] py-0 px-1 ml-1">
                            {src.credibility.toUpperCase()}
                          </Badge>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
