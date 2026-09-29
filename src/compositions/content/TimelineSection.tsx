import React from 'react';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { PixelMotion } from '@/engine/motion/PixelMotion';
import { Clock, CheckCircle } from 'lucide-react';

export interface TimelineStep {
  time: string;
  title: string;
  description: string;
  status?: 'completed' | 'current' | 'upcoming';
}

export interface TimelineSectionProps {
  title?: string;
  steps?: TimelineStep[];
}

const defaultSteps: TimelineStep[] = [
  {
    time: '00:00 - 00:10',
    title: 'Problem Deconstruction & Wireframing',
    description: 'Deconstruct prompt requirements, select Hero & Bento layout compositions.',
    status: 'completed',
  },
  {
    time: '00:10 - 00:25',
    title: 'Asset Registration & Theme Tuning',
    description: 'Inject 3D models and images into registry; tune color palette variables.',
    status: 'completed',
  },
  {
    time: '00:25 - 00:45',
    title: 'Page Assembly & Content Injection',
    description: 'Assemble section blocks with PixelMotion reveal and hover effects.',
    status: 'current',
  },
  {
    time: '00:45 - 00:60',
    title: '3D Polish, Verification & Deployment',
    description: 'Execute build check, verify mobile responsiveness, and launch.',
    status: 'upcoming',
  },
];

/**
 * TimelineSection — Ready-Made Content Composition
 * Animated vertical roadmap / progress timeline section.
 */
export const TimelineSection: React.FC<TimelineSectionProps> = ({
  title = '60-Minute Competition Sprint Playbook',
  steps = defaultSteps,
}) => {
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <Badge variant="purple" icon={<Clock className="w-3.5 h-3.5" />}>
          Time-Stamped Execution
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-100">{title}</h2>
      </div>

      <div className="max-w-3xl mx-auto relative border-l-2 border-slate-800 ml-4 md:ml-auto pl-6 md:pl-8 space-y-8">
        {steps.map((step, idx) => (
          <PixelMotion key={idx} preset="reveal" direction="up" delay={idx * 0.1}>
            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 font-bold">{step.time}</span>
                  <Badge variant={step.status === 'completed' ? 'emerald' : step.status === 'current' ? 'cyan' : 'neutral'}>
                    {step.status || 'upcoming'}
                  </Badge>
                </div>
                <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  {step.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.description}</p>
              </div>
            </div>
          </PixelMotion>
        ))}
      </div>
    </Section>
  );
};
