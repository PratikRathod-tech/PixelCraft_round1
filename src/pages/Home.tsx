import React from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '@/layouts/PageShell';
import { HeroLayout } from '@/layouts/HeroLayout';
import { SplitLayout } from '@/layouts/SplitLayout';
import { GridLayout } from '@/layouts/GridLayout';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PlaceholderScene } from '@/components/3d/PlaceholderScene';
import { PixelMotion } from '@/engine/motion/PixelMotion';
import { Zap, Sparkles, LayoutGrid, Clock, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <PageShell>
      {/* Hero Section */}
      <HeroLayout
        badge={
          <Badge variant="cyan" icon={<Zap className="w-3.5 h-3.5" />}>
            Pixelcraft Armory v0.1 Foundation
          </Badge>
        }
        title={
          <>
            Rapid Competition <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              Website Assembly System
            </span>
          </>
        }
        subtitle="Modular React components, 3D R3F canvases, motion presets, and layout engines engineered for rapid 1-hour web design battles."
        actions={
          <>
            <Link to="/armory">
              <Button variant="primary" size="lg" icon={<LayoutGrid className="w-5 h-5" />}>
                Launch Armory Lab (/armory)
              </Button>
            </Link>
            <a href="#philosophy">
              <Button variant="outline" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Architecture Overview
              </Button>
            </a>
          </>
        }
        visual={
          <R3FCanvas className="h-[400px] w-full shadow-2xl shadow-cyan-500/10">
            <PlaceholderScene variant="cyber" />
          </R3FCanvas>
        }
      />

      {/* Core Principles */}
      <Section id="philosophy" variant="muted">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="purple" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Built for Speed & Reliability
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Designed for 1-Hour Competition Sprints
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Do not reinvent existing technologies. Reuse high-quality open-source components with standardized abstractions.
          </p>
        </div>

        <GridLayout columns={3}>
          <PixelMotion preset="reveal" delay={0.1}>
            <Card className="h-full space-y-3 border-cyan-500/20">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-lg">60-Minute Rapid Assembly</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Pre-wired layouts, tokens, motion presets, and 3D scenes allow instant composition when receiving an unknown problem statement.
              </p>
            </Card>
          </PixelMotion>

          <PixelMotion preset="reveal" delay={0.2}>
            <Card className="h-full space-y-3 border-purple-500/20">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-lg">Modular Component Layer</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Clean abstractions like <code className="text-cyan-400 font-mono">&lt;PixelAsset /&gt;</code> and <code className="text-purple-400 font-mono">&lt;PixelMotion /&gt;</code> standardize layout composition.
              </p>
            </Card>
          </PixelMotion>

          <PixelMotion preset="reveal" delay={0.3}>
            <Card className="h-full space-y-3 border-emerald-500/20">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-lg">Competition-Time Reliability</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Zero complex drag-and-drop editors or backend dependencies — pure, resilient client-side React + TypeScript performance.
              </p>
            </Card>
          </PixelMotion>
        </GridLayout>
      </Section>

      {/* Split Feature Demo */}
      <SplitLayout
        leftContent={
          <div className="space-y-6">
            <Badge variant="cyan">Asset Registry</Badge>
            <h2 className="text-3xl font-bold text-slate-100">
              Centralized Asset Registry System
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Never hardcode raw file paths during competition. Reference assets by uniform IDs like <code className="text-cyan-400 font-mono">hero-grid-bg</code> or <code className="text-cyan-400 font-mono">cyber-helmet-3d</code> for instant hot-swapping.
            </p>
            <Link to="/armory">
              <Button variant="primary" size="md">
                Explore Asset Registry
              </Button>
            </Link>
          </div>
        }
        rightContent={
          <GlassPanel className="p-6 space-y-4" borderGlow>
            <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-3">
              <span className="text-slate-400">src/engine/assets/registry.ts</span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
            <pre className="text-xs font-mono text-cyan-300 overflow-x-auto p-3 bg-slate-950/80 rounded-lg">
{`const asset = assetRegistry.getAsset("planet-01");

<PixelAsset
  id="cyber-helmet-3d"
  className="w-full h-48"
/>`}
            </pre>
          </GlassPanel>
        }
      />
    </PageShell>
  );
};
