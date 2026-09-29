import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PixelScreenConfig } from '@/engine/composition/types';
import { VisualKitEngine, VisualKitResult } from '@/engine/competition/visualKitEngine';
import { Zap, Sparkles } from 'lucide-react';

export interface CompetitionSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuildComposition: (config: PixelScreenConfig) => void;
}

export const CompetitionSprintModal: React.FC<CompetitionSprintModalProps> = ({
  isOpen,
  onClose,
  onBuildComposition,
}) => {
  const [character, setCharacter] = useState('Cybernetic Specialist');
  const [element, setElement] = useState('Quantum AI Mesh');
  const [wildcard, setWildcard] = useState('Space Expedition');

  const [kitPreview, setKitPreview] = useState<VisualKitResult | null>(null);

  const handleGenerateKit = () => {
    const kit = VisualKitEngine.generateKit({
      character,
      element,
      wildCard: wildcard,
    });
    setKitPreview(kit);
  };

  const handleApplyKit = () => {
    const kit = kitPreview || VisualKitEngine.generateKit({ character, element, wildCard: wildcard });
    onBuildComposition(kit.generatedConfig);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pixelcraft Visual Kit Builder">
      <div className="space-y-5 text-xs font-mono">
        <p className="text-slate-400 font-sans">
          Enter your 3 competition prompt cards below. The Armory Intelligence Engine will match assets and compile an optimized visual kit.
        </p>

        {/* Input Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="1. Character / Persona"
            value={character}
            onChange={(e) => {
              setCharacter(e.target.value);
              setKitPreview(null);
            }}
            placeholder="e.g. Robot / Avatar"
          />

          <Input
            label="2. Element / Technology"
            value={element}
            onChange={(e) => {
              setElement(e.target.value);
              setKitPreview(null);
            }}
            placeholder="e.g. AI / Security"
          />

          <Input
            label="3. Wild Card Rule"
            value={wildcard}
            onChange={(e) => {
              setWildcard(e.target.value);
              setKitPreview(null);
            }}
            placeholder="e.g. Space / Retro"
          />
        </div>

        {!kitPreview && (
          <div className="flex justify-center pt-2">
            <Button variant="outline" size="sm" icon={<Sparkles className="w-4 h-4 text-cyan-400" />} onClick={handleGenerateKit}>
              Generate Visual Kit Direction
            </Button>
          </div>
        )}

        {/* Generated Visual Kit Preview */}
        {kitPreview && (
          <div className="bg-slate-900 border border-cyan-500/40 rounded-xl p-4 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> VISUAL DIRECTION PROPOSAL
              </span>
              <Badge variant="cyan">{kitPreview.theme.toUpperCase()}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-slate-500 block">PRIMARY 3D VISUAL:</span>
                <span className="text-slate-100 font-bold">{kitPreview.primaryVisual.name}</span>
                <span className="text-slate-400 block text-[10px]">Category: {kitPreview.primaryVisual.category}</span>
              </div>

              <div>
                <span className="text-slate-500 block">CHARACTER DIRECTION:</span>
                <span className="text-purple-400 font-bold">{kitPreview.characterDirection}</span>
              </div>
            </div>

            {/* Match Reasons Explanation */}
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold text-[10px]">WHY THIS MATCHED:</span>
              <div className="flex flex-wrap gap-1 text-[10px] text-slate-300">
                {kitPreview.matchReasons.map((r, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                    ✓ {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Layout: <strong className="text-slate-200">{kitPreview.layout}</strong></span>
              <span>Motion: <strong className="text-slate-200">{kitPreview.motionPreset}</strong></span>
              <span>Background: <strong className="text-slate-200">{kitPreview.bgType}</strong></span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 flex justify-between items-center border-t border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="primary" size="md" icon={<Zap className="w-4 h-4" />} onClick={handleApplyKit}>
            APPLY VISUAL KIT TO CANVAS
          </Button>
        </div>
      </div>
    </Modal>
  );
};
