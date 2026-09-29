import React, { useState } from 'react';
import { PixelScreenConfig } from '@/engine/composition/types';
import { PixelComposer } from '@/engine/composition/PixelComposer';
import { ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

export interface LiveCanvasProps {
  config: PixelScreenConfig;
  viewport: 'desktop' | 'tablet' | 'mobile';
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
  className?: string;
}

export const LiveCanvas: React.FC<LiveCanvasProps> = ({
  config,
  viewport,
  isFullscreen,
  setIsFullscreen,
  className = '',
}) => {
  const [zoom, setZoom] = useState<number>(100);

  const viewportWidths = {
    desktop: 'w-full max-w-7xl',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  return (
    <main
      className={`relative flex-1 bg-slate-950/60 overflow-hidden flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 bg-slate-950' : ''
      } ${className}`}
    >
      {/* Canvas Toolbar */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-400 select-none z-10">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            LIVE CANVAS PREVIEW
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">{config.title || 'Untitled Composition'}</span>
        </div>

        {/* Zoom & Viewport Toolbar */}
        <div className="flex items-center gap-3">
          {/* Zoom Buttons */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded px-2 py-0.5">
            <button
              onClick={() => setZoom((z) => Math.max(25, z - 25))}
              className="hover:text-cyan-400 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-12 text-center text-[11px] text-slate-200">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(100, z + 25))}
              className="hover:text-cyan-400 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Render Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-950/80 scrollbar-thin">
        <div
          className={`transition-all duration-300 ${viewportWidths[viewport]} origin-top shadow-2xl rounded-2xl overflow-hidden border border-slate-800/80`}
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <PixelComposer config={config} />
        </div>
      </div>
    </main>
  );
};
