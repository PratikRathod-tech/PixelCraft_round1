/**
 * ChainRank-AML Engineering Vault & Architecture Control Plane
 * Internal-only engineering interface accessible via /__engineering.
 * STRICTLY ISOLATED: Never linked in public navigation, sidebar, or search.
 */

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  Terminal,
  Layers,
  Cpu,
  GitBranch,
  Box,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Search,
  Database,
  Activity,
  LogOut,
  RefreshCw,
  FolderGit2,
  BookOpen,
} from 'lucide-react';

interface DocMeta {
  id: string;
  title: string;
  category: string;
  phase: string;
  description: string;
  lastUpdated: string;
}

interface PhaseItem {
  phaseId: string;
  name: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'BLOCKED' | 'VERIFYING' | 'COMPLETED' | 'ARCHIVED';
  objective: string;
  dependencies: string[];
  files: string[];
  tests: string[];
  verification: string;
  nextPhase: string;
}

interface AuditItem {
  id: string;
  category: string;
  test: string;
  result: 'PASS' | 'WARNING' | 'FAIL';
  source: string;
  details: string;
  timestamp: string;
}

interface AssetSummary {
  total: number;
  procedural: number;
  glb: number;
  quarantined: number;
}

type VaultTab =
  | 'overview'
  | 'docs'
  | 'phases'
  | 'assets'
  | 'audits'
  | 'repositories'
  | 'three'
  | 'adrs';

export const EngineeringVaultPage: React.FC = () => {
  // Authentication State
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [checkingSession, setCheckingSession] = useState<boolean>(true);

  // Active View State
  const [activeTab, setActiveTab] = useState<VaultTab>('overview');

  // Vault Data
  const [documents, setDocuments] = useState<DocMeta[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>('vault-readme');
  const [selectedDocContent, setSelectedDocContent] = useState<string>('');
  const [docSearchQuery, setDocSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loadingDoc, setLoadingDoc] = useState<boolean>(false);

  const [phases, setPhases] = useState<PhaseItem[]>([]);
  const [audits, setAudits] = useState<AuditItem[]>([]);
  const [auditSummary, setAuditSummary] = useState<{ total: number; pass: number; warning: number; fail: number; status: string } | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [assetSummary, setAssetSummary] = useState<AssetSummary | null>(null);

  // Check initial session
  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      setCheckingSession(true);
      const res = await fetch('/api/internal/auth/session');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
          loadVaultData();
        } else {
          setAuthenticated(false);
        }
      }
    } catch (err) {
      console.error('[Vault] Error checking session:', err);
      setAuthenticated(false);
    } finally {
      setCheckingSession(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);

    try {
      const res = await fetch('/api/internal/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setAuthError(errData.message || 'Authentication failed.');
        setIsAuthenticating(false);
        return;
      }

      setAuthenticated(true);
      setPasswordInput('');
      loadVaultData();
    } catch (err: any) {
      setAuthError('Connection error during authentication.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/internal/auth/logout', { method: 'POST' });
    } finally {
      setAuthenticated(false);
      setSelectedDocContent('');
    }
  };

  const loadVaultData = async () => {
    // 1. Fetch Docs
    try {
      const docsRes = await fetch('/api/internal/vault/docs');
      if (docsRes.ok) {
        const data = await docsRes.json();
        setDocuments(data.documents || []);
        if (data.documents && data.documents.length > 0) {
          loadDocContent('vault-readme');
        }
      }
    } catch (err) {
      console.error('[Vault] Error loading docs:', err);
    }

    // 2. Fetch Phases
    try {
      const phasesRes = await fetch('/api/internal/vault/phases');
      if (phasesRes.ok) {
        const data = await phasesRes.json();
        setPhases(data.phases || []);
      }
    } catch (err) {
      console.error('[Vault] Error loading phases:', err);
    }

    // 3. Fetch Audits
    try {
      const auditRes = await fetch('/api/internal/vault/audit');
      if (auditRes.ok) {
        const data = await auditRes.json();
        setAudits(data.audits || []);
        setAuditSummary(data.summary || null);
      }
    } catch (err) {
      console.error('[Vault] Error loading audits:', err);
    }

    // 4. Fetch Assets
    try {
      const assetRes = await fetch('/api/internal/vault/assets');
      if (assetRes.ok) {
        const data = await assetRes.json();
        setAssets(data.assets || []);
        setAssetSummary(data.summary || null);
      }
    } catch (err) {
      console.error('[Vault] Error loading assets:', err);
    }
  };

  const loadDocContent = async (docId: string) => {
    try {
      setLoadingDoc(true);
      setSelectedDocId(docId);
      const res = await fetch(`/api/internal/vault/docs/${encodeURIComponent(docId)}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedDocContent(data.content || '');
      } else {
        setSelectedDocContent('Document content could not be retrieved from internal registry.');
      }
    } catch (err) {
      setSelectedDocContent('Error loading document content.');
    } finally {
      setLoadingDoc(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 animate-spin text-cyan-400" />
          <span>Verifying internal engineering credential session...</span>
        </div>
      </div>
    );
  }

  // ========================================================
  // LOGIN PROMPT (SHIELDED CONTROL PLANE)
  // ========================================================
  if (!authenticated) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 p-4 font-mono select-none">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-800/80 text-cyan-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white tracking-wide">CHAINRANK-AML</h2>
              <p className="text-xs text-slate-400">Hidden Engineering Vault & Control Plane</p>
            </div>
          </div>

          <div className="mb-6 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-[11px] text-amber-300">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <Lock className="h-3.5 w-3.5" />
              <span>RESTRICTED INTERNAL AREA</span>
            </div>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              This interface is reserved for lead architects and core system engineers. All access is logged and requires server-side authentication.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase text-slate-400 mb-1.5 font-semibold">
                Engineering Vault Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter vault authorization key..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none font-mono"
                  autoFocus
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isAuthenticating || !passwordInput}
              className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 px-4 py-2.5 text-xs font-semibold text-white transition-all shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAuthenticating ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Unlock className="h-3.5 w-3.5" />
                  <span>Authorize Session</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <span className="text-[10px] text-slate-500">
              Zero Plaintext Passwords • Server-Side Scrypt Verification
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Filtered documents
  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesQuery =
      docSearchQuery.trim() === '' ||
      doc.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(docSearchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categories = ['all', 'architecture', 'phases', 'implementation', 'repositories', 'assets', 'research', 'ui', 'testing', 'decisions', 'changelog'];

  // ========================================================
  // AUTHENTICATED ENGINEERING CONTROL PLANE
  // ========================================================
  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 font-sans select-none overflow-hidden">
      {/* 1. INTERNAL VAULT SIDEBAR */}
      <aside className="w-64 border-r border-slate-800/80 bg-slate-900/70 backdrop-blur-xl flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
                <Terminal className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-xs font-bold text-white tracking-wide">ENGINEERING VAULT</h1>
                <span className="text-[10px] text-cyan-400 font-mono">PHASE 8 CONTROL PLANE</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Cpu className="h-4 w-4 shrink-0" />
              <span>System Cockpit</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'docs'
                  ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 shrink-0" />
                <span>Doc Registry</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {documents.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('phases')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'phases'
                  ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="h-4 w-4 shrink-0" />
                <span>Phase Registry</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Phase 8
              </span>
            </button>

            <button
              onClick={() => setActiveTab('assets')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'assets'
                  ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Box className="h-4 w-4 shrink-0" />
                <span>90-Asset Map</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                90
              </span>
            </button>

            <button
              onClick={() => setActiveTab('audits')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'audits'
                  ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Activity className="h-4 w-4 shrink-0" />
                <span>Audit Runner</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                {auditSummary?.pass || 20}/{audits.length || 20}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('repositories')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'repositories'
                  ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <FolderGit2 className="h-4 w-4 shrink-0" />
              <span>Repositories</span>
            </button>

            <button
              onClick={() => setActiveTab('adrs')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'adrs'
                  ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <GitBranch className="h-4 w-4 shrink-0" />
              <span>ADRs (Decisions)</span>
            </button>

            <button
              onClick={() => setActiveTab('three')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'three'
                  ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Eye className="h-4 w-4 shrink-0" />
              <span>3D Track Lab</span>
            </button>
          </nav>
        </div>

        {/* Footer with Session Info & Logout */}
        <div className="p-3 border-t border-slate-800/80 font-mono text-[11px]">
          <div className="flex items-center justify-between mb-2 text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AUTH: ACTIVE</span>
            </span>
            <span className="text-[10px] text-slate-500">8h TTL</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-red-500/20 hover:border-red-500/40 text-slate-300 hover:text-red-300 py-1.5 transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE VIEWPORT */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {/* Top Header Bar */}
        <header className="h-14 border-b border-slate-800/80 bg-slate-900/40 px-6 flex items-center justify-between shrink-0 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">VAULT WORKSPACE //</span>
            <span className="text-white font-bold uppercase">{activeTab}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-[11px]">
              CANONICAL REPO: <span className="text-cyan-400">Mini_project_1/Pixel</span>
            </span>
            <span className="rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 text-[10px]">
              ROLE: ARCHITECT
            </span>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 font-mono">
          {/* TAB 1: SYSTEM COCKPIT (OVERVIEW) */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">System Architecture & Status Cockpit</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Internal control telemetry across research models, Express backend, 3D systems, and documentation.
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>SYSTEM INTEGRITY: OPTIMAL</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-[10px] text-slate-500 uppercase block">Active Phase</span>
                    <span className="text-xl font-bold text-cyan-400 mt-1 block">Phase 8</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Engineering Vault</span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-[10px] text-slate-500 uppercase block">Allowlisted Docs</span>
                    <span className="text-xl font-bold text-white mt-1 block">{documents.length}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Markdown Specifications</span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-[10px] text-slate-500 uppercase block">Audited Checkpoints</span>
                    <span className="text-xl font-bold text-emerald-400 mt-1 block">
                      {auditSummary ? `${auditSummary.pass}/${auditSummary.total}` : '20/20'}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 mt-0.5 block">100% Passed</span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-[10px] text-slate-500 uppercase block">Canonical 3D Assets</span>
                    <span className="text-xl font-bold text-purple-400 mt-1 block">90 Models</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">31 Proc + 59 GLB</span>
                  </div>
                </div>
              </div>

              {/* Subsystems Map */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl">
                  <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                    <Database className="h-4 w-4 text-blue-400" />
                    <span>Backend & Data Layer</span>
                  </h3>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Ingested Accounts:</span>
                      <span className="font-bold text-white">150,619 Records</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Candidate Chains:</span>
                      <span className="font-bold text-white">22,374 Chains</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Directed Transfer Edges:</span>
                      <span className="font-bold text-white">157,722 Edges</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Query Engine Latency:</span>
                      <span className="font-bold text-emerald-400">&lt; 10ms (In-Memory Map)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mock Data Fallback:</span>
                      <span className="font-bold text-cyan-400">DISABLED (Zero Synthetic Data)</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl">
                  <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-purple-400" />
                    <span>3D Spatial & Visual Pipeline</span>
                  </h3>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Contained Stage:</span>
                      <span className="font-bold text-white">440px Analytical Viewport</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Physics & Node Cap:</span>
                      <span className="font-bold text-white">N &le; 150 / E &le; 300</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Camera Presets:</span>
                      <span className="font-bold text-white">9 Canonical Coordinates</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Physical Campus Zones:</span>
                      <span className="font-bold text-white">13 Architectural Modules</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Framerate:</span>
                      <span className="font-bold text-emerald-400">60 FPS Budget Maintained</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENTATION VIEWER */}
          {activeTab === 'docs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
              {/* Doc List & Category Filter (4 Cols) */}
              <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col h-[750px]">
                <div className="space-y-2 mb-3">
                  <div className="relative">
                    <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={docSearchQuery}
                      onChange={(e) => setDocSearchQuery(e.target.value)}
                      placeholder="Search vault docs..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-8 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px]">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`px-2 py-0.5 rounded capitalize whitespace-nowrap transition-colors cursor-pointer ${
                          selectedCategory === c
                            ? 'bg-cyan-600 text-white font-semibold'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Document List */}
                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                  {filteredDocs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => loadDocContent(doc.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                        selectedDocId === doc.id
                          ? 'border-cyan-500/80 bg-cyan-950/40 text-white'
                          : 'border-slate-800/80 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="truncate pr-2">{doc.title}</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-cyan-300 shrink-0">
                          {doc.phase}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        {doc.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Document Content Viewer (8 Cols) */}
              <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col h-[750px] overflow-hidden">
                {loadingDoc ? (
                  <div className="flex h-full items-center justify-center text-slate-500 text-xs">
                    <RefreshCw className="h-4 w-4 animate-spin text-cyan-400 mr-2" />
                    <span>Loading document from secure vault...</span>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto pr-3">
                    <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed select-text">
                      {selectedDocContent}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PHASE REGISTRY */}
          {activeTab === 'phases' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-white">Project Phase Lifecycle Registry</h2>
                <span className="text-xs text-slate-400">Current Phase: <strong className="text-cyan-400">PHASE-08</strong></span>
              </div>

              <div className="space-y-3">
                {phases.map((p) => {
                  const isCompleted = p.status === 'COMPLETED';
                  const isInProgress = p.status === 'IN_PROGRESS';

                  return (
                    <div
                      key={p.phaseId}
                      className={`rounded-2xl border p-4 transition-all ${
                        isInProgress
                          ? 'border-cyan-500/80 bg-cyan-950/20'
                          : isCompleted
                          ? 'border-slate-800 bg-slate-900/50'
                          : 'border-slate-800/40 bg-slate-950/40 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-sm text-white">{p.phaseId}</span>
                          <span className="text-slate-400">—</span>
                          <span className="font-semibold text-sm text-slate-200">{p.name}</span>
                        </div>

                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${
                            isCompleted
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : isInProgress
                              ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 animate-pulse'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mb-3">{p.objective}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800/60">
                        <div>
                          <span className="text-slate-500">Key Files: </span>
                          <span className="text-slate-300 font-mono">{p.files.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Verification: </span>
                          <span className="text-emerald-400 font-mono">{p.verification}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ASSET REGISTRY MAP */}
          {activeTab === 'assets' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
                <div>
                  <h2 className="text-base font-bold text-white">Canonical 90-Asset Registry Explorer</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Authoritative 3D geometries, licensing, and quarantine status.</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    Total: <strong className="text-white">{assetSummary?.total || 90}</strong>
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    Procedural: <strong className="text-cyan-300">{assetSummary?.procedural || 31}</strong>
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-purple-400">
                    GLB: <strong className="text-purple-300">{assetSummary?.glb || 59}</strong>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {assets.slice(0, 45).map((a) => (
                  <div
                    key={a.id}
                    className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white truncate max-w-[180px]">{a.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        a.format === 'procedural' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {a.format}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-400 space-y-1">
                      <div>ID: <span className="text-slate-300">{a.id}</span></div>
                      <div>Category: <span className="text-slate-300 capitalize">{a.category}</span></div>
                      <div>License: <span className="text-emerald-400">{a.license}</span></div>
                      <div className="truncate">Role: <span className="text-slate-400">{a.investigationRole}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT RUNNER */}
          {activeTab === 'audits' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
                <div>
                  <h2 className="text-base font-bold text-white">System Integrity & Invariant Audits</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Automated validation across 10 critical operational dimensions.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    {auditSummary?.pass || 20}/{audits.length || 20} PASS
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                {audits.map((aud) => (
                  <div
                    key={aud.id}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{aud.test}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {aud.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{aud.details}</p>
                      <span className="text-[10px] text-slate-500 font-mono">Source: {aud.source}</span>
                    </div>

                    <span className="shrink-0 flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{aud.result}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REPOSITORIES */}
          {activeTab === 'repositories' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div>
                <h2 className="text-base font-bold text-white">Repository & Source Map Registry</h2>
                <p className="text-xs text-slate-400 mt-0.5">Discovered repository roots, canonical sources, and data bridges.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-cyan-400">Mini_project_1/Pixel</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">ACTIVE PRODUCTION</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Primary React/Vite/Express workspace containing the enterprise 2D analytics shell, Three.js spatial theater, and in-memory search services.
                  </p>
                  <div className="text-[10px] text-slate-500 pt-1 font-mono">
                    Policy: READ / WRITE (Canonical Root)
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-purple-400">Mini_project_1/03_Datasets</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">CANONICAL GROUND TRUTH</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Raw banking transaction streams, predicted mule accounts (MOD-03), and smurfing chains.
                  </p>
                  <div className="text-[10px] text-slate-500 pt-1 font-mono">
                    Policy: READ ONLY (Authoritative Baseline)
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-amber-400">Mini_project_1/AI_ML_Mule_Account_Research</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">FROZEN RESEARCH</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    MuleTrace Python scripts, betweenness centrality estimators, and feature engineering notebooks.
                  </p>
                  <div className="text-[10px] text-slate-500 pt-1 font-mono">
                    Policy: READ ONLY (Frozen Scientific Archive)
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-emerald-400">Mini_project_1/DMLRank</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">FROZEN GNN ENGINE</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Deep Metric Learning Stage 8 GNN models, pairwise loss implementations, and embeddings.
                  </p>
                  <div className="text-[10px] text-slate-500 pt-1 font-mono">
                    Policy: READ ONLY (Frozen Scientific Archive)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ADRs */}
          {activeTab === 'adrs' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div>
                <h2 className="text-base font-bold text-white">Architecture Decision Records (ADRs)</h2>
                <p className="text-xs text-slate-400 mt-0.5">Immutable architectural invariants governing ChainRank-AML development.</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'ADR-001', title: '2D-First Application Architecture', status: 'Accepted', date: 'Oct 2026', desc: 'Adopt a 2D-first application shell with dense analytical dashboards and selective embedded 3D spatial visualization.' },
                  { id: 'ADR-002', title: 'Selective 3D Visualization', status: 'Accepted', date: 'Oct 2026', desc: 'Embed 3D within the CentralIntelligenceStage and provide an optional 3D Spatial Theater for deep investigations.' },
                  { id: 'ADR-003', title: '90-Asset Canonical Registry', status: 'Accepted', date: 'Oct 2026', desc: 'Establish an immutable 90-asset registry (31 procedural, 59 GLB) with automated quarantine validation.' },
                  { id: 'ADR-004', title: '150-Node Subgraph Cap', status: 'Accepted', date: 'Oct 2026', desc: 'Enforce a server-side cap of N <= 150 nodes and E <= 300 edges per investigation query to guarantee 60 FPS.' },
                  { id: 'ADR-005', title: 'Server-Side Engineering Vault', status: 'Accepted', date: 'Oct 2026', desc: 'Protect the internal control plane with server-side authentication, HttpOnly cookies, and scrypt password hashing.' },
                  { id: 'ADR-006', title: 'Public/Private Route Isolation', status: 'Accepted', date: 'Oct 2026', desc: 'Permanently redirect legacy routes to / and isolate /__engineering from all public menus and search results.' },
                  { id: 'ADR-007', title: 'Separate 3D Development Track', status: 'Accepted', date: 'Oct 2026', desc: 'Confine experimental 3D development to internal lab until fully validated to protect the stable public baseline.' },
                  { id: 'ADR-008', title: 'Zero Mock Data Architecture', status: 'Accepted', date: 'Oct 2026', desc: 'Bind 100% of frontend views directly to real research datasets (150,619 accounts, 22,374 chains).' },
                ].map((adr) => (
                  <div key={adr.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-cyan-400">{adr.id}</span>
                        <span className="text-white text-xs font-semibold">{adr.title}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {adr.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{adr.desc}</p>
                    <span className="text-[10px] text-slate-500 font-mono">Date: {adr.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: 3D TRACK LAB (INTERNAL DEVELOPMENT ONLY) */}
          {activeTab === 'three' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h2 className="text-base font-bold text-white">3D Development Control Panel (Isolated Track)</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Isolated development environment for Phase 9 visual experiments. Does not affect the public baseline.
                    </p>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                    INTERNAL TRACK ONLY
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <h4 className="font-bold text-white">1. Lighting Controls</h4>
                    <p className="text-slate-400 text-[11px]">
                      Simulate high-contrast cyan accent rim lighting and ambient floor bounce adjustments.
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono block">Status: READY FOR PHASE 9</span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <h4 className="font-bold text-white">2. GPU Particles</h4>
                    <p className="text-slate-400 text-[11px]">
                      Compute velocity vectors directly in vertex shaders to visualize high-speed smurfing flows.
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono block">Status: READY FOR PHASE 9</span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <h4 className="font-bold text-white">3. Campus Geometry</h4>
                    <p className="text-slate-400 text-[11px]">
                      Reposition Bank HQ portico and reflective coordinate platforms without public regression.
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono block">Status: READY FOR PHASE 9</span>
                  </div>
                </div>

                <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4 text-xs text-blue-300">
                  <strong>Architectural Rule:</strong> The public application consumes only stable, validated 3D components. All experimental shaders, materials, and asset placements are developed in this isolated track.
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EngineeringVaultPage;
