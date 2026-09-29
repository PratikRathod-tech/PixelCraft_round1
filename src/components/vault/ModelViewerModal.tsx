import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { R3FCanvas } from '@/components/3d/R3FCanvas';
import { PixelModel } from '@/components/3d/PixelModel';
import { Zap, Copy, Check } from 'lucide-react';

export interface ModelViewerModalProps {
  modelId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onUseModel: (id: string) => void;
}

export const ModelViewerModal: React.FC<ModelViewerModalProps> = ({
  modelId,
  isOpen,
  onClose,
  onUseModel,
}) => {
  const [wireframe, setWireframe] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!modelId) return null;

  const handleCopyPath = () => {
    navigator.clipboard.writeText(`src/assets/3d/${modelId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Interactive 3D Viewer: ${modelId}`}>
      <div className="space-y-4 text-xs font-mono">
        {/* Interactive WebGL Canvas */}
        <R3FCanvas className="h-72 w-full shadow-2xl" cameraPos={[0, 0, 4]}>
          <PixelModel id={modelId} position="center" scale="medium" animation="rotate" wireframe={wireframe} />
        </R3FCanvas>

        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400">
          <span>Drag mouse to rotate • Scroll to zoom</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWireframe(!wireframe)}
            className={wireframe ? 'border-cyan-400 text-cyan-400' : ''}
          >
            Wireframe: {wireframe ? 'ON' : 'OFF'}
          </Button>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            onClick={handleCopyPath}
          >
            {copied ? 'Copied Path!' : 'Copy Model Path'}
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<Zap className="w-4 h-4" />}
            onClick={() => {
              onUseModel(modelId);
              onClose();
            }}
          >
            USE 3D MODEL
          </Button>
        </div>
      </div>
    </Modal>
  );
};
