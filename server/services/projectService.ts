import { isUsingMySQL, getDbPool, memoryDb } from '../db/database';
import { CompetitionProjectRecord, ProjectVersionRecord } from '../types/apiTypes';

export class ProjectService {
  public static async getAllProjects(): Promise<CompetitionProjectRecord[]> {
    if (isUsingMySQL()) {
      const pool = getDbPool()!;
      const [rows]: any = await pool.query('SELECT * FROM competition_projects ORDER BY updated_at DESC');
      return rows.map((r: any) => ({
        id: r.id,
        name: r.name,
        competitionName: r.competition_name,
        briefPrompt: r.brief_prompt,
        currentVersionId: r.current_version_id,
        currentVersionNumber: r.current_version_number,
        theme: r.theme,
        selectedAssetIds: typeof r.selected_asset_ids === 'string' ? JSON.parse(r.selected_asset_ids) : (r.selected_asset_ids || []),
        requiredFeatures: typeof r.required_features === 'string' ? JSON.parse(r.required_features) : (r.required_features || []),
        config: null,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      }));
    }
    return Array.from(memoryDb.projects.values());
  }

  public static async getProjectById(id: string): Promise<CompetitionProjectRecord | null> {
    if (isUsingMySQL()) {
      const pool = getDbPool()!;
      const [rows]: any = await pool.query('SELECT * FROM competition_projects WHERE id = ?', [id]);
      if (rows.length === 0) return null;
      const r = rows[0];
      const versions = await this.getProjectVersions(id);
      const currentVer = versions.find((v) => v.id === r.current_version_id) || versions[versions.length - 1];
      return {
        id: r.id,
        name: r.name,
        competitionName: r.competition_name,
        briefPrompt: r.brief_prompt,
        currentVersionId: r.current_version_id,
        currentVersionNumber: r.current_version_number,
        theme: r.theme,
        selectedAssetIds: typeof r.selected_asset_ids === 'string' ? JSON.parse(r.selected_asset_ids) : (r.selected_asset_ids || []),
        requiredFeatures: typeof r.required_features === 'string' ? JSON.parse(r.required_features) : (r.required_features || []),
        config: currentVer?.config || null,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      };
    }
    return memoryDb.projects.get(id) || null;
  }

  public static async createProject(data: {
    name: string;
    competitionName?: string;
    briefPrompt?: string;
    config: any;
    theme?: string;
  }): Promise<CompetitionProjectRecord> {
    const id = `proj-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const versionId = `ver-1-${Date.now()}`;
    const now = new Date().toISOString();

    const record: CompetitionProjectRecord = {
      id,
      name: data.name || 'Untitled Competition Project',
      competitionName: data.competitionName || 'Web Design Competition',
      briefPrompt: data.briefPrompt || '',
      currentVersionId: versionId,
      currentVersionNumber: 1,
      theme: data.theme || data.config?.theme || 'futuristic',
      selectedAssetIds: data.config?.hero?.visual?.assetId ? [data.config.hero.visual.assetId] : ['cyber-helmet-3d'],
      requiredFeatures: data.config?.sections?.map((s: any) => s.title || s.type) || ['Hero'],
      config: data.config,
      createdAt: now,
      updatedAt: now,
    };

    const initialVersion: ProjectVersionRecord = {
      id: versionId,
      projectId: id,
      versionNumber: 1,
      name: 'v1.0 Initial Draft',
      changelog: 'Initial baseline created from prompt.',
      config: data.config,
      createdAt: now,
    };

    if (isUsingMySQL()) {
      const pool = getDbPool()!;
      await pool.query(
        `INSERT INTO competition_projects (id, name, competition_name, brief_prompt, current_version_id, current_version_number, theme, selected_asset_ids, required_features, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          record.id,
          record.name,
          record.competitionName,
          record.briefPrompt,
          record.currentVersionId,
          record.currentVersionNumber,
          record.theme,
          JSON.stringify(record.selectedAssetIds),
          JSON.stringify(record.requiredFeatures),
          now,
          now,
        ]
      );
      await pool.query(
        `INSERT INTO project_versions (id, project_id, version_number, name, changelog, config, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [initialVersion.id, initialVersion.projectId, initialVersion.versionNumber, initialVersion.name, initialVersion.changelog, JSON.stringify(initialVersion.config), now]
      );
    } else {
      memoryDb.projects.set(id, record);
      memoryDb.versions.set(id, [initialVersion]);
    }

    return record;
  }

  public static async saveVersion(
    projectId: string,
    data: { name: string; changelog?: string; config: any }
  ): Promise<ProjectVersionRecord> {
    const project = await this.getProjectById(projectId);
    if (!project) throw new Error(`Project ${projectId} not found.`);

    const versions = await this.getProjectVersions(projectId);
    const nextVersionNum = versions.length + 1;
    const versionId = `ver-${nextVersionNum}-${Date.now()}`;
    const now = new Date().toISOString();

    // Compute diff summary against previous version
    const prevConfig = versions[versions.length - 1]?.config || {};
    const diffDetails: string[] = [];
    if (prevConfig.theme !== data.config.theme) {
      diffDetails.push(`Theme: ${prevConfig.theme || 'default'} -> ${data.config.theme}`);
    }
    if (prevConfig.layout?.heroLayout !== data.config.layout?.heroLayout) {
      diffDetails.push(`Layout: ${prevConfig.layout?.heroLayout || 'hero'} -> ${data.config.layout?.heroLayout}`);
    }
    if (prevConfig.hero?.visual?.assetId !== data.config.hero?.visual?.assetId) {
      diffDetails.push(`Hero 3D: ${prevConfig.hero?.visual?.assetId || 'none'} -> ${data.config.hero?.visual?.assetId}`);
    }

    const versionRecord: ProjectVersionRecord = {
      id: versionId,
      projectId,
      versionNumber: nextVersionNum,
      name: data.name || `v1.${nextVersionNum - 1}`,
      changelog: data.changelog || 'Manual snapshot save.',
      config: data.config,
      diffSummary: {
        themeChanged: prevConfig.theme !== data.config.theme,
        layoutChanged: prevConfig.layout?.heroLayout !== data.config.layout?.heroLayout,
        assetChanged: prevConfig.hero?.visual?.assetId !== data.config.hero?.visual?.assetId,
        sectionCountChanged: prevConfig.sections?.length !== data.config.sections?.length,
        details: diffDetails,
      },
      createdAt: now,
    };

    if (isUsingMySQL()) {
      const pool = getDbPool()!;
      await pool.query(
        `INSERT INTO project_versions (id, project_id, version_number, name, changelog, config, diff_summary, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [versionRecord.id, versionRecord.projectId, versionRecord.versionNumber, versionRecord.name, versionRecord.changelog, JSON.stringify(versionRecord.config), JSON.stringify(versionRecord.diffSummary), now]
      );
      await pool.query(
        `UPDATE competition_projects SET current_version_id = ?, current_version_number = ?, updated_at = ? WHERE id = ?`,
        [versionId, nextVersionNum, now, projectId]
      );
    } else {
      const list = memoryDb.versions.get(projectId) || [];
      list.push(versionRecord);
      memoryDb.versions.set(projectId, list);
      project.currentVersionId = versionId;
      project.currentVersionNumber = nextVersionNum;
      project.config = data.config;
      project.updatedAt = now;
      memoryDb.projects.set(projectId, project);
    }

    return versionRecord;
  }

  public static async getProjectVersions(projectId: string): Promise<ProjectVersionRecord[]> {
    if (isUsingMySQL()) {
      const pool = getDbPool()!;
      const [rows]: any = await pool.query('SELECT * FROM project_versions WHERE project_id = ? ORDER BY version_number ASC', [projectId]);
      return rows.map((r: any) => ({
        id: r.id,
        projectId: r.project_id,
        versionNumber: r.version_number,
        name: r.name,
        changelog: r.changelog,
        config: typeof r.config === 'string' ? JSON.parse(r.config) : r.config,
        diffSummary: typeof r.diff_summary === 'string' ? JSON.parse(r.diff_summary) : r.diff_summary,
        createdAt: r.created_at,
      }));
    }
    return memoryDb.versions.get(projectId) || [];
  }

    public static async getVersionDiff(projectId: string, v1: number | string, v2: number | string) {
    const versions = await this.getProjectVersions(projectId);
    const ver1 = versions.find((v) => v.versionNumber === Number(v1) || v.id === v1);
    const ver2 = versions.find((v) => v.versionNumber === Number(v2) || v.id === v2);

    if (!ver1 || !ver2) {
      throw new Error(`Cannot compute diff: version ${v1} or ${v2} not found.`);
    }

    const c1 = ver1.config || {};
    const c2 = ver2.config || {};

    const s1 = c1.sections || [];
    const s2 = c2.sections || [];

    const details: string[] = [];
    if (c1.theme !== c2.theme) details.push(`Theme: ${c1.theme} -> ${c2.theme}`);
    if (c1.layout?.heroLayout !== c2.layout?.heroLayout) details.push(`HeroLayout: ${c1.layout?.heroLayout} -> ${c2.layout?.heroLayout}`);
    if (c1.hero?.visual?.assetId !== c2.hero?.visual?.assetId) details.push(`Asset: ${c1.hero?.visual?.assetId} -> ${c2.hero?.visual?.assetId}`);

    return {
      themeChanged: c1.theme !== c2.theme,
      layoutChanged: c1.layout?.heroLayout !== c2.layout?.heroLayout,
      assetChanged: c1.hero?.visual?.assetId !== c2.hero?.visual?.assetId,
      sectionCountChanged: s1.length !== s2.length,
      details,
    };
  }

public static async restoreVersion(projectId: string, versionIdOrNum: string | number): Promise<ProjectVersionRecord> {
    const versions = await this.getProjectVersions(projectId);
    const targetVer = versions.find((v) => v.id === versionIdOrNum || v.versionNumber === Number(versionIdOrNum));
    if (!targetVer) throw new Error(`Version ${versionIdOrNum} not found in project ${projectId}.`);

    const now = new Date().toISOString();
    if (isUsingMySQL()) {
      const pool = getDbPool()!;
      await pool.query(
        'UPDATE competition_projects SET current_version_id = ?, current_version_number = ?, updated_at = ? WHERE id = ?',
        [targetVer.id, targetVer.versionNumber, now, projectId]
      );
    } else {
      const proj = memoryDb.projects.get(projectId);
      if (proj) {
        proj.currentVersionId = targetVer.id;
        proj.currentVersionNumber = targetVer.versionNumber;
        proj.config = targetVer.config;
        proj.updatedAt = now;
        memoryDb.projects.set(projectId, proj);
      }
    }

    return targetVer;
  }

  public static async duplicateProject(id: string, newName?: string): Promise<CompetitionProjectRecord> {
    const original = await this.getProjectById(id);
    if (!original) throw new Error(`Project ${id} not found.`);

    return this.createProject({
      name: newName || `${original.name} (Copy)`,
      competitionName: original.competitionName,
      briefPrompt: original.briefPrompt,
      theme: original.theme,
      config: original.config,
    });
  }

  public static async deleteProject(id: string): Promise<boolean> {
    if (isUsingMySQL()) {
      const pool = getDbPool()!;
      await pool.query('DELETE FROM competition_projects WHERE id = ?', [id]);
    } else {
      memoryDb.projects.delete(id);
      memoryDb.versions.delete(id);
    }
    return true;
  }
}
