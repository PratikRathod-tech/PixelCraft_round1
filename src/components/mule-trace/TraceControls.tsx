/**
 * TraceControls.tsx
 * Multi-speed stepped forensic playback toolbar for Mule Trace exploration.
 */

import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward
} from 'lucide-react';

export interface TraceControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onChangeSpeed: (speed: number) => void;
  direction: 'upstream' | 'downstream' | 'bidirectional';
  onChangeDirection: (dir: 'upstream' | 'downstream' | 'bidirectional') => void;
  className?: string;
}

export const TraceControls: React.FC<TraceControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReset,
  onPrevStep,
  onNextStep,
  currentStep,
  totalSteps,
  speed,
  onChangeSpeed,
  direction,
  onChangeDirection,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/90 backdrop-blur shadow-lg ${className}`}>
      {/* Left: Direction Selector */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Trace Vector:</span>
        <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
          <button
            onClick={() => onChangeDirection('downstream')}
            className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-all ${
              direction === 'downstream'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DOWNSTREAM
          </button>
          <button
            onClick={() => onChangeDirection('upstream')}
            className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-all ${
              direction === 'upstream'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            UPSTREAM
          </button>
          <button
            onClick={() => onChangeDirection('bidirectional')}
            className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md transition-all ${
              direction === 'bidirectional'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            BIDIRECTIONAL
          </button>
        </div>
      </div>

      {/* Center: Playback & Step Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="p-2 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          title="Reset Trace Playback"
          aria-label="Reset trace"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onPrevStep}
          disabled={currentStep <= 0}
          className="p-2 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous Hop"
          aria-label="Previous hop"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all shadow-md ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-500 text-white'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
          aria-label={isPlaying ? 'Pause trace' : 'Play trace'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY TRACE</span>
            </>
          )}
        </button>

        <button
          onClick={onNextStep}
          disabled={currentStep >= totalSteps - 1}
          className="p-2 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Next Hop"
          aria-label="Next hop"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Step Progress Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 font-mono text-xs">
          <span className="text-slate-400">HOP:</span>
          <span className="font-bold text-cyan-400">
            {totalSteps > 0 ? currentStep + 1 : 0}
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">{totalSteps}</span>
        </div>
      </div>

      {/* Right: Playback Speed Selector */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-mono text-slate-400 hidden sm:inline">Speed:</span>
        <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => onChangeSpeed(s)}
              className={`px-2 py-1 text-xs font-mono font-semibold rounded-md transition-all ${
                speed === s
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
