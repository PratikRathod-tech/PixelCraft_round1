import React from 'react';
import { useStore } from '../state/StoreContext';
import { MANIFEST_LOGS } from '../data/cluesAndLogs';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { X, Terminal, Radio } from 'lucide-react';

export const CommsManifestModal: React.FC = () => {
  const { isManifestModalOpen, setIsManifestModalOpen } = useStore();

  if (!isManifestModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-mono text-xs">
      <div className="bg-[#0D1630] border-2 border-[#52E5FF]/60 rounded-2xl max-w-2xl w-full overflow-hidden shadow-[0_0_50px_rgba(82,229,255,0.3)] relative animate-scale-up text-[#F1F5FF] max-h-[85vh] flex flex-col justify-between">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#26375F] flex items-center justify-between bg-[#070B18]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#A8FF60]" />
            <span className="font-extrabold text-sm text-[#52E5FF] tracking-wider">
              ABDUL'S CLASSIFIED TRADE LOGS (1979–2026)
            </span>
          </div>

          <button
            onClick={() => setIsManifestModalOpen(false)}
            className="p-1.5 rounded-lg text-[#788BB8] hover:text-[#52E5FF] transition-colors focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body - Manifest Logs */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* 3D Holographic Transceiver Header */}
          <div className="bg-[#070B18] border border-[#26375F] rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-44 h-32 rounded-lg overflow-hidden border border-[#52E5FF]/40 bg-[#0D1630] relative shrink-0">
              <R3FCanvas className="w-full h-full" enableOrbit={true} cameraPos={[0, 0, 3.5]}>
                <PixelModel id="retro-boombox-3d" animation="rotate" scale="small" />
              </R3FCanvas>
              <div className="absolute bottom-1 right-1.5 font-mono text-[8px] text-[#52E5FF] bg-[#070B18]/80 px-1 py-0.2 rounded">
                [Sub-Space Radio]
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-[#A8FF60] font-bold text-[11px]">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>1420.405 MHz Quantum Sub-Carrier Active</span>
              </div>
              <p className="text-[11px] text-[#DDE7FF]/80 leading-relaxed font-sans">
                For forty-seven years, interstellar freighters crossing Sector Orion-3 have tuned to Old Delhi for Cardamom Chai, Pure Cow Ghee, and sub-light plasma cells.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {MANIFEST_LOGS.map((log) => (
              <div
                key={log.id}
                className="bg-[#070B18] border border-[#26375F] rounded-xl p-4 space-y-2 text-xs hover:border-[#52E5FF]/60 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-1 border-b border-[#26375F] pb-2 text-[11px]">
                  <span className="font-bold text-[#52E5FF]">{log.id} • {log.vesselName}</span>
                  <span className="text-[#A8FF60]">{log.dateTerrestrial} ({log.dateGalactic})</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-[#DDE7FF]">
                  <p><strong>Commander:</strong> {log.captain}</p>
                  <p><strong>Origin Port:</strong> {log.originPort}</p>
                </div>

                <div className="text-[11px]">
                  <span className="text-[#788BB8] block">Supplies Exchanged:</span>
                  <ul className="list-disc pl-4 text-[#A8FF60]">
                    {log.suppliesTaken.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-[11px] text-[#DDE7FF]/80 italic pt-1 border-t border-[#26375F]/60 font-sans">
                  "{log.notes}"
                </p>
              </div>
            ))}
          </div>

          {/* Final Narrative Reveal Card */}
          <div className="bg-gradient-to-r from-[#4B2A73]/60 to-[#070B18] border border-[#52E5FF]/40 rounded-xl p-4 text-center space-y-2">
            <span className="text-sm font-extrabold text-[#F1F5FF] font-display block">
              YOU WERE NEVER SUPPOSED TO FIND THIS.
            </span>
            <p className="text-xs text-[#52E5FF] font-sans">
              "Abdul never left Old Delhi. He simply brought the entire galaxy to his corner store."
            </p>
            <span className="text-[10px] text-[#A8FF60] block font-mono">
              ★ CLASSIFIED DISCOVERY COMPLETED — OUTPOST #07 IS SECURE ★
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#26375F] bg-[#070B18] flex justify-end">
          <button
            onClick={() => setIsManifestModalOpen(false)}
            className="bg-[#52E5FF] text-[#070B18] px-4 py-2 rounded-lg text-xs font-bold font-mono hover:bg-[#A8FF60] transition-colors"
          >
            Close Classified Comms
          </button>
        </div>
      </div>
    </div>
  );
};
