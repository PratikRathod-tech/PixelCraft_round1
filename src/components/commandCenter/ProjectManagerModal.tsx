import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  apiClient,
  ProjectSummary,
  ProjectDetail,
  ProjectVersion,
  VersionDiff,
  BackendStatus,
  CanvasState,
} from '@/engine/api/apiClient';
import {
  FolderPlus,
  History,
  GitCommit,
  GitCompare,
  Database,
  Trash2,
  Copy,
  Sparkles,
  Server,
} from 'lucide-react';

export interface ProjectManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCanvasState: CanvasState;
  currentTheme: string;
  onLoadProject: (project: ProjectDetail) => void;
  onRestoreVersion: (canvasState: CanvasState, theme: string) => void;
}

export const ProjectManagerModal: React.FC<ProjectManagerModalProps> = ({
  isOpen,
  onClose,
  currentCanvasState,
  currentTheme,
  onLoadProject,
  onRestoreVersion,
}) => {
  const [tab, setTab] = useState<'projects' | 'new' | 'versions' | 'diff'>('projects');
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [versions, setVersions] = useState<ProjectVersion[]>([]);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>({
    online: false,
    dbType: 'offline',
    geminiConnected: false,
    version: '1.0.0',
  });
  const [loading, setLoading] = useState(false);

  // New Project Form
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectPrompt, setNewProjectPrompt] = useState('');
  const [newProjectIndustry, setNewProjectIndustry] = useState('Tech & AI');
  const [newProjectAudience, setNewProjectAudience] = useState('Hackathon Judges & Early Adopters');

  // New Version Form
  const [versionNote, setVersionNote] = useState('');
  const [versionName, setVersionName] = useState('');

  // Diff comparison
  const [diffV1, setDiffV1] = useState<string>('');
  const [diffV2, setDiffV2] = useState<string>('');
  const [diffResult, setDiffResult] = useState<VersionDiff | null>(null);

  const fetchStatusAndProjects = async () => {
    setLoading(true);
    const status = await apiClient.checkStatus();
    setBackendStatus(status);
    const list = await apiClient.listProjects();
    setProjects(list);
    if (list.length > 0 && !selectedProjectId) {
      setSelectedProjectId(list[0].id);
    }
    setLoading(false);
  };

  const fetchVersions = async (projId: string) => {
    if (!projId) return;
    const vers = await apiClient.listVersions(projId);
    setVersions(vers);
    if (vers.length >= 2) {
      setDiffV1(vers[1].id);
      setDiffV2(vers[0].id);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatusAndProjects();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedProjectId) {
      fetchVersions(selectedProjectId);
    }
  }, [selectedProjectId]);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    setLoading(true);
    const proj = await apiClient.createProject({
      name: newProjectName,
      prompt: newProjectPrompt,
      industry: newProjectIndustry,
      target_audience: newProjectAudience,
      active_theme: currentTheme,
      canvas_state: currentCanvasState,
    });
    setLoading(false);
    setNewProjectName('');
    setNewProjectPrompt('');
    await fetchStatusAndProjects();
    setSelectedProjectId(proj.id);
    onLoadProject(proj);
    setTab('projects');
  };

  const handleSaveVersion = async () => {
    if (!selectedProjectId) return;
    setLoading(true);
    const name = versionName.trim() || 'v' + (versions.length + 1);
    await apiClient.createVersion(selectedProjectId, {
      name,
      description: versionNote,
      canvasState: currentCanvasState,
    });
    setVersionName('');
    setVersionNote('');
    await fetchVersions(selectedProjectId);
    setLoading(false);
  };

  const handleRestoreVersion = async (ver: ProjectVersion) => {
    setLoading(true);
    await apiClient.restoreVersion(selectedProjectId, ver.id);
    onRestoreVersion(ver.canvas_state, ver.theme_snapshot);
    setLoading(false);
    onClose();
  };

  const handleCompareVersions = async () => {
    if (!diffV1 || !diffV2) return;
    setLoading(true);
    const res = await apiClient.compareVersions(diffV1, diffV2);
    setDiffResult(res);
    setLoading(false);
  };

  const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this project?')) return;
    await apiClient.deleteProject(id);
    await fetchStatusAndProjects();
  };

  const handleDuplicateProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await apiClient.duplicateProject(id);
    await fetchStatusAndProjects();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Competition Project & Version Control System">
      <div className="space-y-4 font-mono text-xs max-h-[75vh] overflow-y-auto pr-1">
        {/* Backend & DB Status Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-slate-950 border border-slate-800 rounded-xl">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200">Persistence Architecture:</span>
            <Badge
              variant={
                backendStatus.dbType === 'mysql'
                  ? 'cyan'
                  : backendStatus.dbType === 'memory'
                  ? 'purple'
                  : 'neutral'
              }
              className="text-[9px] py-0"
            >
              {backendStatus.dbType.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span
                className={'w-2 h-2 rounded-full ' + (backendStatus.online ? 'bg-emerald-400' : 'bg-slate-500')}
              />
              {backendStatus.online ? 'Server Online' : 'Offline Mode (LocalStorage)'}
            </span>
            <span className="flex items-center gap-1">
              <span
                className={'w-2 h-2 rounded-full ' + (backendStatus.geminiConnected ? 'bg-cyan-400 shadow-glow-cyan' : 'bg-amber-400')}
              />
              {backendStatus.geminiConnected ? 'Gemini 2.0 Bridge Connected' : 'Mock AI Active'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
          <button
            onClick={() => setTab('projects')}
            className={'flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ' + (
              tab === 'projects'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Database className="w-3.5 h-3.5" /> Projects ({projects.length})
          </button>

          <button
            onClick={() => setTab('new')}
            className={'flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ' + (
              tab === 'new'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <FolderPlus className="w-3.5 h-3.5" /> New Project
          </button>

          <button
            onClick={() => setTab('versions')}
            className={'flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ' + (
              tab === 'versions'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <History className="w-3.5 h-3.5" /> Version History ({versions.length})
          </button>

          <button
            onClick={() => setTab('diff')}
            className={'flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ' + (
              tab === 'diff'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <GitCompare className="w-3.5 h-3.5" /> Visual Diffs
          </button>
        </div>

        {/* TAB 1: PROJECTS LIST */}
        {tab === 'projects' && (
          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400">
                <p>No competition projects saved yet.</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setTab('new')}
                  className="mt-3"
                  icon={<FolderPlus className="w-3.5 h-3.5" />}
                >
                  Create First Project
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((proj) => {
                  const isSelected = selectedProjectId === proj.id;
                  return (
                    <div
                      key={proj.id}
                      onClick={async () => {
                        setSelectedProjectId(proj.id);
                        const full = await apiClient.getProject(proj.id);
                        if (full) onLoadProject(full);
                      }}
                      className={'p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ' + (
                        isSelected
                          ? 'bg-cyan-950/30 border-cyan-500/50 shadow-glow-cyan'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-100 text-sm">{proj.name}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => handleDuplicateProject(proj.id, e)}
                            title="Duplicate"
                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteProject(proj.id, e)}
                            title="Delete"
                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {proj.prompt && (
                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                          <strong>Brief:</strong> {proj.prompt}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px] text-slate-500">
                        <span>Theme: {proj.active_theme}</span>
                        <span>v{proj.current_version} • {proj.layout_count} sections</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NEW PROJECT FORM */}
        {tab === 'new' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <span className="font-bold text-slate-200 flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-cyan-400" /> Create New Competition Project
            </span>

            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">PROJECT NAME *</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. CyberMed Telemetry Dashboard"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">COMPETITION PROMPT / BRIEF</label>
                <textarea
                  value={newProjectPrompt}
                  onChange={(e) => setNewProjectPrompt(e.target.value)}
                  rows={2}
                  placeholder="e.g. Build an autonomous telemetry command center with 3D visualization..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">INDUSTRY</label>
                  <input
                    type="text"
                    value={newProjectIndustry}
                    onChange={(e) => setNewProjectIndustry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">TARGET AUDIENCE</label>
                  <input
                    type="text"
                    value={newProjectAudience}
                    onChange={(e) => setNewProjectAudience(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="md"
                disabled={!newProjectName.trim() || loading}
                onClick={handleCreateProject}
                icon={<FolderPlus className="w-4 h-4" />}
              >
                CREATE PROJECT
              </Button>
            </div>
          </div>
        )}

        {/* TAB 3: VERSIONS HISTORY */}
        {tab === 'versions' && (
          <div className="space-y-3">
            {/* Create Snapshot Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <span className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                <GitCommit className="w-3.5 h-3.5 text-emerald-400" /> Save Current Canvas As Snapshot
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={versionName}
                  onChange={(e) => setVersionName(e.target.value)}
                  placeholder="Snapshot name (e.g. 'Added Bento Section')"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500"
                />
                <input
                  type="text"
                  value={versionNote}
                  onChange={(e) => setVersionNote(e.target.value)}
                  placeholder="Notes / rationale..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500"
                />
                <Button
                  variant="primary"
                  size="sm"
                  disabled={loading}
                  onClick={handleSaveVersion}
                  icon={<GitCommit className="w-3.5 h-3.5" />}
                >
                  SAVE
                </Button>
              </div>
            </div>

            {/* Versions List */}
            <div className="space-y-2">
              {versions.length === 0 ? (
                <div className="p-4 text-center text-slate-500 bg-slate-900/40 rounded-lg">
                  No snapshots saved for this project yet.
                </div>
              ) : (
                versions.map((v) => (
                  <div
                    key={v.id}
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-cyan-300">v{v.version_number}</span>
                        <span className="text-slate-200 font-bold">{v.name}</span>
                        <Badge variant="neutral" className="text-[9px] py-0">
                          {v.theme_snapshot}
                        </Badge>
                      </div>
                      {v.description && (
                        <p className="text-[10px] text-slate-400 mt-0.5">{v.description}</p>
                      )}
                      <span className="text-[9px] text-slate-500">
                        {new Date(v.created_at).toLocaleString()} • {v.canvas_state.sections?.length || 0} sections
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestoreVersion(v)}
                      icon={<History className="w-3 h-3 text-cyan-400" />}
                    >
                      RESTORE
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: VISUAL DIFFS */}
        {tab === 'diff' && (
          <div className="space-y-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3">
              <span className="font-bold text-slate-200 flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-purple-400" /> Compare Two Saved Snapshots
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">BASE VERSION (V1)</label>
                  <select
                    value={diffV1}
                    onChange={(e) => setDiffV1(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                  >
                    {versions.map((v) => (
                      <option key={v.id} value={v.id}>
                        v{v.version_number} — {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">TARGET VERSION (V2)</label>
                  <select
                    value={diffV2}
                    onChange={(e) => setDiffV2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                  >
                    {versions.map((v) => (
                      <option key={v.id} value={v.id}>
                        v{v.version_number} — {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!diffV1 || !diffV2 || diffV1 === diffV2 || loading}
                  onClick={handleCompareVersions}
                  icon={<GitCompare className="w-3.5 h-3.5" />}
                >
                  COMPUTE DIFF
                </Button>
              </div>
            </div>

            {diffResult && (
              <div className="bg-slate-950 border border-purple-500/40 rounded-xl p-3.5 space-y-2 text-[11px]">
                <div className="font-bold text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> DIFF SUMMARY: {diffResult.v1.name} → {diffResult.v2.name}
                </div>
                <p className="text-slate-300 leading-snug">{diffResult.changes.summary}</p>

                {diffResult.changes.themeChanged && (
                  <div className="text-[10px] text-cyan-300">
                    <strong>Theme Changed:</strong> {diffResult.changes.oldTheme} → {diffResult.changes.newTheme}
                  </div>
                )}

                {diffResult.changes.sectionsAdded.length > 0 && (
                  <div className="text-[10px] text-emerald-400">
                    <strong>Sections Added:</strong> {diffResult.changes.sectionsAdded.join(', ')}
                  </div>
                )}

                {diffResult.changes.sectionsRemoved.length > 0 && (
                  <div className="text-[10px] text-rose-400">
                    <strong>Sections Removed:</strong> {diffResult.changes.sectionsRemoved.join(', ')}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
