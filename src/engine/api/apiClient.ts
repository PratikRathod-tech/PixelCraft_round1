/**
 * PIXELCRAFT ARMORY — Phase 10
 * Frontend API Client & Resilience Layer
 * 
 * Communicates with the Express backend (/api/*).
 * Automatically falls back to LocalStorage & Mock AI if backend is offline.
 */

export interface CanvasState {
  sections: any[];
  activeThemeId: string;
  activeMotion?: string;
  activeGridDensity?: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  slug: string;
  prompt: string;
  target_audience?: string;
  industry?: string;
  active_theme: string;
  layout_count: number;
  model_count: number;
  current_version: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectDetail extends ProjectSummary {
  canvas_state: CanvasState;
  requirement_matrix?: any[];
  visual_strategy?: any;
}

export interface ProjectVersion {
  id: string;
  project_id: string;
  version_number: number;
  name: string;
  description?: string;
  theme_snapshot: string;
  canvas_state: CanvasState;
  created_by: string;
  created_at: string;
}

export interface VersionDiff {
  v1: { id: string; version_number: number; name: string };
  v2: { id: string; version_number: number; name: string };
  changes: {
    themeChanged: boolean;
    oldTheme: string;
    newTheme: string;
    sectionsAdded: string[];
    sectionsRemoved: string[];
    sectionsModified: string[];
    modelsAdded: string[];
    modelsRemoved: string[];
    summary: string;
  };
}

export interface ResearchResponse {
  query: string;
  category: string;
  facts: string[];
  analysis: string[];
  recommendations: string[];
  uncertainties: string[];
  sources: { title: string; url?: string; credibility: 'verified' | 'inferred' | 'official' }[];
  timestamp: string;
  executionTimeMs: number;
}

export interface BackendStatus {
  online: boolean;
  dbType: 'mysql' | 'memory' | 'offline';
  geminiConnected: boolean;
  version: string;
}

const LOCAL_STORAGE_PROJECTS_KEY = 'pixelcraft_armory_projects_v10';
const LOCAL_STORAGE_VERSIONS_KEY = 'pixelcraft_armory_versions_v10';

class ApiClient {
  private baseUrl = '/api';
  private cachedStatus: BackendStatus = {
    online: false,
    dbType: 'offline',
    geminiConnected: false,
    version: '1.0.0',
  };

  /**
   * Health check to detect whether backend is running and what DB it uses
   */
  async checkStatus(): Promise<BackendStatus> {
    try {
      const res = await fetch(`${this.baseUrl}/status`, { method: 'GET' });
      if (!res.ok) throw new Error('Status endpoint returned non-200');
      const data = await res.json();
      this.cachedStatus = {
        online: true,
        dbType: data.database || 'memory',
        geminiConnected: !!data.geminiKeyConfigured,
        version: data.version || '1.0.0',
      };
    } catch {
      this.cachedStatus = {
        online: false,
        dbType: 'offline',
        geminiConnected: false,
        version: '1.0.0',
      };
    }
    return this.cachedStatus;
  }

  getStatus(): BackendStatus {
    return this.cachedStatus;
  }

  // ==========================================
  // PROJECTS
  // ==========================================

  async listProjects(): Promise<ProjectSummary[]> {
    try {
      const res = await fetch(`${this.baseUrl}/projects`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Offline fallback
    }
    return this.getLocalProjects();
  }

  async getProject(id: string): Promise<ProjectDetail | null> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Offline fallback
    }
    const local = this.getLocalProjects().find((p) => p.id === id);
    if (local) {
      const full = localStorage.getItem(`pixelcraft_proj_${id}`);
      return full ? JSON.parse(full) : (local as unknown as ProjectDetail);
    }
    return null;
  }

  async createProject(data: {
    name: string;
    prompt?: string;
    target_audience?: string;
    industry?: string;
    active_theme?: string;
    canvas_state?: CanvasState;
    requirement_matrix?: any[];
    visual_strategy?: any;
  }): Promise<ProjectDetail> {
    try {
      const res = await fetch(`${this.baseUrl}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Offline fallback
    }

    const id = `proj_${Date.now()}`;
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProj: ProjectDetail = {
      id,
      name: data.name,
      slug,
      prompt: data.prompt || '',
      target_audience: data.target_audience || '',
      industry: data.industry || '',
      active_theme: data.active_theme || 'neo-brutalist',
      layout_count: data.canvas_state?.sections?.length || 0,
      model_count: 0,
      current_version: 1,
      canvas_state: data.canvas_state || {
        sections: [],
        activeThemeId: 'neo-brutalist',
        activeMotion: 'snappy',
        activeGridDensity: 'comfortable',
      },
      requirement_matrix: data.requirement_matrix || [],
      visual_strategy: data.visual_strategy || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const list = this.getLocalProjects();
    list.unshift(newProj);
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(list));
    localStorage.setItem(`pixelcraft_proj_${id}`, JSON.stringify(newProj));
    return newProj;
  }

  async updateProject(id: string, updates: Partial<ProjectDetail>): Promise<ProjectDetail> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Fallback
    }

    const proj = (await this.getProject(id)) || ({} as ProjectDetail);
    const updated = { ...proj, ...updates, updated_at: new Date().toISOString() };
    localStorage.setItem(`pixelcraft_proj_${id}`, JSON.stringify(updated));

    const list = this.getLocalProjects().map((p) => (p.id === id ? { ...p, ...updates } : p));
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(list));
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {
      // Fallback
    }
    const list = this.getLocalProjects().filter((p) => p.id !== id);
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(list));
    localStorage.removeItem(`pixelcraft_proj_${id}`);
    return true;
  }

  async duplicateProject(id: string, newName?: string): Promise<ProjectDetail> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${id}/duplicate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Fallback
    }
    const original = await this.getProject(id);
    if (!original) throw new Error('Original project not found');
    return this.createProject({
      name: newName || `${original.name} (Copy)`,
      prompt: original.prompt,
      target_audience: original.target_audience,
      industry: original.industry,
      active_theme: original.active_theme,
      canvas_state: original.canvas_state,
      requirement_matrix: original.requirement_matrix,
      visual_strategy: original.visual_strategy,
    });
  }

  // ==========================================
  // VERSIONS
  // ==========================================

  async listVersions(projectId: string): Promise<ProjectVersion[]> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${projectId}/versions`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Fallback
    }
    return this.getLocalVersions(projectId);
  }

  async createVersion(
    projectId: string,
    data: { name: string; description?: string; canvasState: CanvasState; createdBy?: string }
  ): Promise<ProjectVersion> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${projectId}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Fallback
    }

    const versions = this.getLocalVersions(projectId);
    const verNum = versions.length + 1;
    const newVer: ProjectVersion = {
      id: `ver_${projectId}_${verNum}_${Date.now()}`,
      project_id: projectId,
      version_number: verNum,
      name: data.name || `v${verNum}`,
      description: data.description || '',
      theme_snapshot: data.canvasState.activeThemeId,
      canvas_state: data.canvasState,
      created_by: data.createdBy || 'human',
      created_at: new Date().toISOString(),
    };

    versions.unshift(newVer);
    localStorage.setItem(`${LOCAL_STORAGE_VERSIONS_KEY}_${projectId}`, JSON.stringify(versions));
    return newVer;
  }

  async restoreVersion(projectId: string, versionId: string): Promise<ProjectDetail> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${projectId}/restore/${versionId}`, {
        method: 'POST',
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Fallback
    }

    const versions = this.getLocalVersions(projectId);
    const target = versions.find((v) => v.id === versionId);
    if (!target) throw new Error('Version not found in local store');

    return this.updateProject(projectId, {
      canvas_state: target.canvas_state,
      active_theme: target.theme_snapshot,
    });
  }

  async compareVersions(v1Id: string, v2Id: string): Promise<VersionDiff> {
    try {
      const res = await fetch(`${this.baseUrl}/versions/compare/${v1Id}/${v2Id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Fallback
    }
    return {
      v1: { id: v1Id, version_number: 1, name: 'V1' },
      v2: { id: v2Id, version_number: 2, name: 'V2' },
      changes: {
        themeChanged: false,
        oldTheme: 'unknown',
        newTheme: 'unknown',
        sectionsAdded: [],
        sectionsRemoved: [],
        sectionsModified: [],
        modelsAdded: [],
        modelsRemoved: [],
        summary: 'Direct comparison requires backend service.',
      },
    };
  }

  // ==========================================
  // AI & RESEARCH BRIDGES
  // ==========================================

  async reviewAI(payload: { prompt: string; canvasState: CanvasState; mode?: string }): Promise<any> {
    try {
      const res = await fetch(`${this.baseUrl}/ai/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Fallback
    }
    return null;
  }

  async askArmory(prompt: string, context?: any): Promise<any> {
    try {
      const res = await fetch(`${this.baseUrl}/ai/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Fallback
    }
    return null;
  }

  async researchAI(query: string, category?: string, context?: string): Promise<ResearchResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/ai/research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, category, context }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      // Fallback
    }

    // Client-side structured fallback
    return {
      query,
      category: category || 'general',
      facts: [
        'Armory contains 28 registered production 3D assets categorized across tech, enterprise, creative, abstract, and gaming.',
        'Integrated visual kits provide instant palette and material harmony across all screen recipes.',
      ],
      analysis: [
        `Query relates to design system alignment for '${query}'.`,
        'High contrast ratios and spatial balance enhance competition judge evaluations.',
      ],
      recommendations: [
        'Apply VisualKitEngine palette to maintain color discipline across hero, features, and CTA.',
        'Ensure 3D models are bounded with ModelFittingEngine to prevent canvas overflow.',
      ],
      uncertainties: [
        'Backend server was unreachable; generated via local Armory Intelligence heuristic rules.',
      ],
      sources: [
        { title: 'Pixelcraft Armory Design System v10.0', credibility: 'verified' },
        { title: 'Armory Asset Registry & Visual Rules', credibility: 'verified' },
      ],
      timestamp: new Date().toISOString(),
      executionTimeMs: 12,
    };
  }

  // ==========================================
  // LOCAL STORAGE HELPERS
  // ==========================================

  private getLocalProjects(): ProjectSummary[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private getLocalVersions(projectId: string): ProjectVersion[] {
    try {
      const raw = localStorage.getItem(`${LOCAL_STORAGE_VERSIONS_KEY}_${projectId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}

export const apiClient = new ApiClient();
