import React, { useState } from 'react';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { useStore } from '../state/StoreContext';
import { Box, RotateCw } from 'lucide-react';

export const StoreCounter3D: React.FC<{ isSecretMode?: boolean }> = ({ isSecretMode = false }) => {
  const { discoverClue } = useStore();

  const normalModels = [
    { id: 'brass-lantern-3d', label: '1979 Brass Lamp', desc: 'Antique counter lamp burning since 1979' },
    { id: 'retro-boombox-3d', label: '1420 MHz Radio', desc: 'Shortwave radio tuned to 1420.405 MHz carrier' },
    { id: 'antique-camera-3d', label: 'Vintage Astrolabe', desc: 'Bellows optical instrument tuned to Orion' },
  ];

  const alienModels = [
    { id: 'cyber-helmet-3d', label: 'Orion-3 Pilot Relic', desc: 'Damaged navigation helmet recovered in 1979' },
    { id: 'brain-stem-3d', label: 'Memory Seed Core', desc: 'Neural matrix radiating 849 GHz optical memory' },
    { id: 'cyber-xbot-3d', label: 'Cargo Automaton', desc: 'Sub-space automated freight droid' },
  ];

  const models = isSecretMode ? alienModels : normalModels;
  const [selectedModel, setSelectedModel] = useState<string>(models[0].id);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const handleClueInteract = (modelId: string) => {
    setSelectedModel(modelId);
    if (!isSecretMode && modelId === 'retro-boombox-3d') {
      discoverClue('teaBarcode');
    }
  };

  const currentDesc = models.find((m) => m.id === selectedModel)?.desc || '';

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden border shadow-lg transition-all duration-500 relative flex flex-col justify-between ${
        isSecretMode
          ? 'bg-[#0D1630] border-[#26375F] shadow-[0_0_30px_rgba(82,229,255,0.15)] text-[#F1F5FF]'
          : 'bg-[#FFF9EF] border-[#D8D0C1] shadow-md text-[#1C2421]'
      }`}
    >
      {/* Top Controls Bar */}
      <div
        className={`px-3 py-2 border-b flex items-center justify-between text-xs ${
          isSecretMode
            ? 'bg-[#070B18] border-[#26375F]'
            : 'bg-[#F5F0E6] border-[#D8D0C1]'
        }`}
      >
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
          <span
            className={`w-2 h-2 rounded-full ${
              isSecretMode ? 'bg-[#52E5FF] animate-pulse' : 'bg-[#173F35]'
            }`}
          />
          <span className={isSecretMode ? 'text-[#52E5FF]' : 'text-[#173F35]'}>
            {isSecretMode ? 'CLASSIFIED VAULT ARTIFACT // 3D' : "ABDUL'S PHYSICAL COUNTER // 3D"}
          </span>
        </div>

        {/* 3D Action Tools */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setWireframe(!wireframe)}
            title="Toggle Wireframe HUD"
            className={`p-1 rounded text-[10px] font-mono flex items-center gap-1 transition-colors ${
              wireframe
                ? 'bg-[#52E5FF] text-[#070B18] font-bold'
                : isSecretMode
                ? 'bg-[#0D1630] text-[#788BB8] hover:text-[#52E5FF]'
                : 'bg-[#EFE8DA] text-[#6F756F] hover:text-[#173F35]'
            }`}
          >
            <Box className="w-3 h-3" />
            <span className="hidden sm:inline">Mesh</span>
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Auto Rotation"
            className={`p-1 rounded text-[10px] font-mono flex items-center gap-1 transition-colors ${
              autoRotate
                ? isSecretMode
                  ? 'bg-[#4B2A73] text-[#A8FF60]'
                  : 'bg-[#173F35] text-[#E8B94F]'
                : isSecretMode
                ? 'bg-[#0D1630] text-[#788BB8]'
                : 'bg-[#EFE8DA] text-[#6F756F]'
            }`}
          >
            <RotateCw className="w-3 h-3" />
            <span className="hidden sm:inline">Spin</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Stage */}
      <div className="w-full h-56 sm:h-72 md:h-80 relative">
        <R3FCanvas
          className="w-full h-full"
          enableOrbit={true}
          cameraPos={[0, 0, 3.8]}
        >
          <PixelModel
            id={selectedModel}
            animation={autoRotate ? 'rotate' : 'none'}
            wireframe={wireframe}
            scale="medium"
          />
        </R3FCanvas>

        {/* Orbit Hint */}
        <div
          className={`absolute bottom-2 right-3 font-mono text-[9px] pointer-events-none px-2 py-0.5 rounded backdrop-blur-sm ${
            isSecretMode
              ? 'bg-[#070B18]/80 text-[#52E5FF]'
              : 'bg-[#FFF9EF]/80 text-[#6F756F]'
          }`}
        >
          [Drag to Rotate • Scroll to Zoom]
        </div>
      </div>

      {/* Model Selector Tabs & Description */}
      <div
        className={`p-3 border-t space-y-2 ${
          isSecretMode
            ? 'bg-[#070B18] border-[#26375F]'
            : 'bg-[#F5F0E6] border-[#D8D0C1]'
        }`}
      >
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
          {models.map((m) => (
            <button
              key={m.id}
              onClick={() => handleClueInteract(m.id)}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                selectedModel === m.id
                  ? isSecretMode
                    ? 'bg-[#52E5FF] text-[#070B18] font-bold shadow-[0_0_10px_rgba(82,229,255,0.3)]'
                    : 'bg-[#173F35] text-[#FFF9EF] font-bold shadow-xs'
                  : isSecretMode
                  ? 'bg-[#0D1630] text-[#DDE7FF] hover:border-[#52E5FF]/40 border border-[#26375F]'
                  : 'bg-[#FFF9EF] text-[#4F5552] hover:bg-[#EFE8DA] border border-[#D8D0C1]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span
            className={`truncate max-w-xs ${
              isSecretMode ? 'text-[#788BB8]' : 'text-[#6F756F]'
            }`}
          >
            {currentDesc}
          </span>
          <span
            className={`font-mono text-[10px] font-bold ${
              isSecretMode ? 'text-[#A8FF60]' : 'text-[#A94335]'
            }`}
          >
            {selectedModel === 'retro-boombox-3d' && !isSecretMode && 'Carrier: 1420.405 MHz'}
            {isSecretMode && 'PBR Verified // 60 FPS'}
          </span>
        </div>
      </div>
    </div>
  );
};
