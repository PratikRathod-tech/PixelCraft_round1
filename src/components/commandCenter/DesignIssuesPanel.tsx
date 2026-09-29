import { PixelScreenConfig } from '@/engine/composition/types';
import { DesignValidator, DesignIssue } from '@/engine/competition/designValidator';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, CheckCircle, ShieldAlert, Zap, Check } from 'lucide-react';

export interface DesignIssuesPanelProps {
  config: PixelScreenConfig;
  onChangeConfig: (newConfig: PixelScreenConfig) => void;
  className?: string;
}

export const DesignIssuesPanel: React.FC<DesignIssuesPanelProps> = ({
  config,
  onChangeConfig,
  className = '',
}) => {
  const { issues, scorecard } = DesignValidator.validateConfig(config);

  const handleAutoFix = (issue: DesignIssue) => {
    if (issue.autoFixMutation) {
      const updated = issue.autoFixMutation(config);
      onChangeConfig(updated);
    }
  };

  return (
    <div className={`space-y-5 font-mono text-xs ${className}`}>
      {/* Requirement Coverage Scorecard Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-100 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> REQUIREMENT COVERAGE SCORECARD
          </span>
          <Badge variant={scorecard.coveragePercentage >= 80 ? 'emerald' : 'amber'}>
            {scorecard.coveragePercentage}% COVERED
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${scorecard.coveragePercentage}%` }}
          />
        </div>

        {/* Factual Requirement Checklist */}
        <div className="space-y-1.5 pt-1 text-[11px]">
          {scorecard.requirements.map((req) => (
            <div key={req.id} className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                {req.status === 'passed' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                {req.status === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                {req.status === 'missing' && <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />}
                <span>{req.label}</span>
              </span>
              <span className="text-slate-500 text-[10px] truncate max-w-[140px]">{req.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Proportionality & Visual Quality Issues */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-slate-100 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> DESIGN VALIDATOR ({issues.length})
          </span>
        </div>

        {issues.length === 0 ? (
          <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-center text-emerald-400 text-xs">
            ✓ Zero design flaws detected! Proportions, contrast, and framing are optimal.
          </div>
        ) : (
          <div className="space-y-2">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className={`p-3 rounded-xl border text-[11px] space-y-2 ${
                  issue.severity === 'critical'
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                    : issue.severity === 'warning'
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{issue.message}</span>
                  <Badge variant={issue.severity === 'critical' ? 'amber' : 'neutral'} className="text-[9px] py-0">
                    {issue.category.toUpperCase()}
                  </Badge>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed">{issue.suggestedFix}</p>

                {issue.autoFixAvailable && (
                  <div className="pt-1 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Zap className="w-3 h-3 text-cyan-400" />}
                      onClick={() => handleAutoFix(issue)}
                      className="text-[10px] py-0.5 px-2"
                    >
                      AUTO FIX ISSUE
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
