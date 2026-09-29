import React, { useState } from 'react';
import { assetRegistry } from '@/engine/assets/registry';
import { Button } from '@/components/ui/Button';
import { Upload, CheckCircle2, FileUp } from 'lucide-react';

export interface AssetImportZoneProps {
  onAssetImported?: () => void;
}

export const AssetImportZone: React.FC<AssetImportZoneProps> = ({ onAssetImported }) => {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const ext = file.name.split('.').pop()?.toLowerCase();
    const type = ext === 'gltf' || ext === 'glb' ? 'model' : 'image';
    const id = file.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const src = URL.createObjectURL(file);

    assetRegistry.registerAsset({
      id,
      type,
      src,
      title: file.name,
      category: 'imported',
      tags: ['imported', ext || 'asset'],
    });

    setImportStatus(`Successfully registered local asset [${file.name}] into assetRegistry!`);
    if (onAssetImported) onAssetImported();

    setTimeout(() => setImportStatus(null), 4000);
  };

  return (
    <div className="p-6 bg-slate-900/60 border border-dashed border-cyan-500/30 rounded-2xl text-center space-y-3">
      <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
        <Upload className="w-6 h-6" />
      </div>

      <div>
        <h4 className="font-bold text-slate-100 text-sm">Local Asset Import Zone</h4>
        <p className="text-xs text-slate-400 mt-0.5">
          Drop local 3D models (<code className="text-cyan-400 font-mono">.glb / .gltf</code>) or images (<code className="text-cyan-400 font-mono">.png / .jpg / .svg</code>) for instant local registration.
        </p>
      </div>

      <label className="inline-block cursor-pointer">
        <input type="file" accept=".gltf,.glb,.png,.jpg,.jpeg,.webp,.svg" onChange={handleFileChange} className="hidden" />
        <Button variant="primary" size="sm" icon={<FileUp className="w-4 h-4" />}>
          Select File to Import
        </Button>
      </label>

      {importStatus && (
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400 pt-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{importStatus}</span>
        </div>
      )}
    </div>
  );
};
