import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import {
  chainRankRegistry,
  AssetValidationStatus,
  validateAsset,
  ASSET_CATEGORIES
} from '@/chainrank/assets';
import { AssetLoader } from '@/three/registry/loaders';
import {
  Search,
  Box,
  Shield,
  Copy,
  Check,
  Building,
  Terminal,
  Server,
  Briefcase,
  Eye,
  AlertTriangle,
  Bug,
  LayoutGrid,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileCheck
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  banks: <Building className="w-4 h-4" />,
  atms: <Terminal className="w-4 h-4" />,
  terminals: <Terminal className="w-4 h-4" />,
  servers: <Server className="w-4 h-4" />,
  workstations: <Briefcase className="w-4 h-4" />,
  security: <Shield className="w-4 h-4" />,
  investigation: <FileCheck className="w-4 h-4" />,
  furniture: <Box className="w-4 h-4" />,
  environments: <LayoutGrid className="w-4 h-4" />,
  characters: <Eye className="w-4 h-4" />,
  infrastructure: <Server className="w-4 h-4" />,
  props: <Box className="w-4 h-4" />,
  other: <HelpCircle className="w-4 h-4" />
};

export const AssetGalleryPage: React.FC = () => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>('cr-bank-hq');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'LABORATORY' | 'VALIDATION_DEBUG'>('LABORATORY');

  const stats = useMemo(() => chainRankRegistry.getStats(), []);
  const allAssets = useMemo(() => chainRankRegistry.getAllAssets(), []);

  // Filtered collection
  const filteredAssets = useMemo(() => {
    return allAssets.filter((asset) => {
      if (selectedCategory !== 'all' && asset.category !== selectedCategory) return false;
      if (selectedFormat !== 'all' && asset.format !== selectedFormat) return false;
      if (selectedStatus !== 'all' && asset.validationStatus !== selectedStatus) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = asset.name.toLowerCase().includes(q);
        const matchesRole = asset.investigationRole.toLowerCase().includes(q);
        const matchesTags = asset.tags.some((t) => t.toLowerCase().includes(q));
        const matchesDesc = asset.description.toLowerCase().includes(q);
        if (!matchesName && !matchesRole && !matchesTags && !matchesDesc) return false;
      }
      return true;
    });
  }, [allAssets, selectedCategory, selectedFormat, selectedStatus, searchQuery]);

  const selectedAsset = useMemo(() => {
    return chainRankRegistry.getAsset(selectedAssetId) || filteredAssets[0] || allAssets[0];
  }, [selectedAssetId, filteredAssets, allAssets]);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: AssetValidationStatus) => {
    switch (status) {
      case 'VALID':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> VALID
          </span>
        );
      case 'PROCEDURAL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Box className="w-3 h-3" /> PROCEDURAL
          </span>
        );
      case 'INVALID_ASSET':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3 h-3" /> QUARANTINED
          </span>
        );
      case 'REVIEW_REQUIRED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" /> REVIEW REQ
          </span>
        );
      case 'UNVERIFIED_LICENSE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <HelpCircle className="w-3 h-3" /> UNVERIFIED
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/60 backdrop-blur shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white">ChainRank 3D Asset Laboratory</h1>
              <span className="px-2 py-0.5 text-xs font-mono bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                Phase 3 Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Curated Financial Infrastructure & 3D AML Investigation Registry
            </p>
          </div>
        </div>

        {/* View Mode Toggle & Telemetry */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 text-xs">
            <button
              onClick={() => setViewMode('LABORATORY')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                viewMode === 'LABORATORY'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D Laboratory
            </button>
            <button
              onClick={() => setViewMode('VALIDATION_DEBUG')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                viewMode === 'VALIDATION_DEBUG'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bug className="w-3.5 h-3.5" /> Validation Inspector
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-slate-400 pl-3 border-l border-slate-800">
            <span>Total: <strong className="text-white">{stats.total}</strong></span>
            <span>Valid: <strong className="text-emerald-400">{stats.valid}</strong></span>
            <span>Quarantined: <strong className="text-rose-400">{stats.invalid}</strong></span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {viewMode === 'LABORATORY' ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar: Filters & Catalog */}
          <aside className="w-80 border-r border-slate-800 bg-slate-900/40 flex flex-col shrink-0">
            {/* Search Input */}
            <div className="p-3 border-b border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search assets, roles, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="p-3 border-b border-slate-800 space-y-2 text-xs">
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Categories ({stats.total})</option>
                  {Object.values(ASSET_CATEGORIES).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({stats.byCategory[cat.id] || 0})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1">
                {['all', 'procedural', 'glb'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-2.5 py-1 rounded text-xs font-medium uppercase transition-all ${
                      selectedFormat === fmt
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1">
                {['all', 'VALID', 'PROCEDURAL', 'INVALID_ASSET', 'REVIEW_REQUIRED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                      selectedStatus === st
                        ? 'bg-slate-700 text-white font-semibold'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {st === 'all' ? 'All Status' : st === 'INVALID_ASSET' ? 'Quarantined' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Asset List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredAssets.map((asset) => {
                const isSelected = asset.id === selectedAsset.id;
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-blue-950/40 border-blue-500/50 shadow-sm'
                        : 'bg-slate-950/30 border-slate-800/60 hover:bg-slate-800/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="p-1.5 rounded bg-slate-800/60 text-slate-300 mt-0.5">
                      {CATEGORY_ICONS[asset.category] || <Box className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-medium text-xs text-white truncate">{asset.name}</span>
                        {getStatusBadge(asset.validationStatus)}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {asset.investigationRole}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-mono">
                        <span>{asset.category}</span>
                        <span>•</span>
                        <span>{asset.polygonCount?.toLocaleString() || 0} tris</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Center Stage: Interactive 3D Canvas */}
          <main className="flex-1 flex flex-col relative bg-slate-950">
            {/* Canvas Toolbar */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400 font-mono">Selected:</span>
              <strong className="text-white font-medium">{selectedAsset.name}</strong>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`ml-2 px-2 py-0.5 rounded text-[11px] font-medium border ${
                  wireframe
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                Wireframe: {wireframe ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* 3D Viewport */}
            <div className="flex-1 w-full h-full">
              <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
                <color attach="background" args={['#090d16']} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 15, 10]} intensity={1.2} />
                <directionalLight position={[-10, 10, -5]} color="#38bdf8" intensity={0.5} />
                <gridHelper args={[24, 24, '#1e293b', '#0f172a']} position={[0, -0.01, 0]} />

                <Center>
                  <AssetLoader
                    assetId={selectedAsset.id}
                    wireframe={wireframe}
                  />
                </Center>

                <OrbitControls enableDamping dampingFactor={0.06} minDistance={1} maxDistance={50} />
              </Canvas>
            </div>
          </main>

          {/* Right Sidebar: 22-Field Metadata Drawer */}
          <aside className="w-96 border-l border-slate-800 bg-slate-900/50 p-5 overflow-y-auto space-y-5 text-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                  {selectedAsset.category}
                </span>
                {getStatusBadge(selectedAsset.validationStatus)}
              </div>
              <h2 className="text-base font-bold text-white mt-1">{selectedAsset.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <code className="text-xs text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded font-mono border border-blue-800/40">
                  {selectedAsset.id}
                </code>
                <button
                  onClick={() => handleCopyId(selectedAsset.id)}
                  className="p-1 hover:text-white text-slate-400 transition-colors"
                  title="Copy ID"
                >
                  {copiedId === selectedAsset.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Investigation Role */}
            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
              <h3 className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Investigation Role</h3>
              <p className="text-slate-200 mt-1 leading-relaxed">{selectedAsset.investigationRole}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Description</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">{selectedAsset.description}</p>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-2 border-t border-slate-800/80 pt-4">
              <h3 className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Technical Specifications</h3>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 bg-slate-950/60 rounded border border-slate-800/60">
                  <span className="text-slate-500 block">Format</span>
                  <span className="text-white uppercase">{selectedAsset.format}</span>
                </div>
                <div className="p-2 bg-slate-950/60 rounded border border-slate-800/60">
                  <span className="text-slate-500 block">Polygons</span>
                  <span className="text-white">{selectedAsset.polygonCount?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="p-2 bg-slate-950/60 rounded border border-slate-800/60">
                  <span className="text-slate-500 block">File Size</span>
                  <span className="text-white">
                    {selectedAsset.fileSizeBytes
                      ? `${(selectedAsset.fileSizeBytes / 1024).toFixed(1)} KB`
                      : 'Procedural'}
                  </span>
                </div>
                <div className="p-2 bg-slate-950/60 rounded border border-slate-800/60">
                  <span className="text-slate-500 block">Dimensions</span>
                  <span className="text-white">
                    {selectedAsset.dimensions
                      ? `${selectedAsset.dimensions.width}×${selectedAsset.dimensions.height}×${selectedAsset.dimensions.depth}m`
                      : 'Parametric'}
                  </span>
                </div>
              </div>
            </div>

            {/* Licensing & Provenance */}
            <div className="space-y-2 border-t border-slate-800/80 pt-4">
              <h3 className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Licensing & Provenance</h3>
              <div className="p-3 bg-slate-950/60 rounded border border-slate-800/60 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">License:</span>
                  <span className="text-emerald-400 font-medium">{selectedAsset.license}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Source:</span>
                  <span className="text-slate-300 truncate max-w-[180px]">{selectedAsset.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Attribution Required:</span>
                  <span className="text-slate-300">{selectedAsset.attributionRequired ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Path:</span>
                  <span className="text-slate-400 font-mono text-[10px] truncate max-w-[200px]" title={selectedAsset.path}>
                    {selectedAsset.path}
                  </span>
                </div>
              </div>
            </div>

            {/* Semantic Tags */}
            <div className="border-t border-slate-800/80 pt-4">
              <h3 className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-2">Semantic Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedAsset.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700/60">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        /* VALIDATION & AUDIT DEBUG INSPECTOR */
        <div className="flex-1 p-6 overflow-y-auto bg-slate-950">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Overview Banner */}
            <div className="p-5 bg-purple-950/20 border border-purple-800/40 rounded-xl flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Bug className="w-5 h-5 text-purple-400" />
                  3D Asset Integrity & Quarantine Diagnostic Matrix
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Automated validation verifying 0-byte corrupt assets, license provenance, and WebGL loader safety.
                </p>
              </div>
              <div className="flex gap-4 text-xs font-mono">
                <div className="text-center px-3 py-1.5 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">TOTAL ASSETS</span>
                  <strong className="text-white text-sm">{stats.total}</strong>
                </div>
                <div className="text-center px-3 py-1.5 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">VALID / PROCEDURAL</span>
                  <strong className="text-emerald-400 text-sm">{stats.valid}</strong>
                </div>
                <div className="text-center px-3 py-1.5 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">QUARANTINED (0-BYTE)</span>
                  <strong className="text-rose-400 text-sm">{stats.invalid}</strong>
                </div>
              </div>
            </div>

            {/* Validation Table */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-mono text-[11px]">
                    <th className="py-3 px-4">Asset ID & Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Format</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Polygons</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Diagnostic Verification Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {allAssets.map((asset) => {
                    const val = validateAsset(asset);
                    return (
                      <tr key={asset.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4">
                          <strong className="text-white block font-sans text-xs">{asset.name}</strong>
                          <span className="text-slate-500 text-[10px]">{asset.id}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{asset.category}</td>
                        <td className="py-3 px-4 uppercase text-slate-400">{asset.format}</td>
                        <td className="py-3 px-4 text-slate-300">
                          {asset.fileSizeBytes !== undefined
                            ? `${(asset.fileSizeBytes / 1024).toFixed(1)} KB`
                            : 'Procedural'}
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          {asset.polygonCount?.toLocaleString() || 0}
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(val.status)}</td>
                        <td className="py-3 px-4 font-sans text-xs">
                          {val.errors.length > 0 ? (
                            <span className="text-rose-400 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5 shrink-0" /> {val.errors[0]}
                            </span>
                          ) : val.warnings.length > 0 ? (
                            <span className="text-amber-400 flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {val.warnings[0]}
                            </span>
                          ) : (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Verified healthy & loadable
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetGalleryPage;
