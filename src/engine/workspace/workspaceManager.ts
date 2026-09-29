import { WorkspaceValidationResult } from './workspaceTypes';
import fs from 'fs';
import path from 'path';

export class WorkspaceManager {
  private static workspaceRoot = path.join(process.cwd(), 'WORKSPACE');

  public static getWorkspaceRoot(): string {
    return this.workspaceRoot;
  }

  /**
   * Validates that the isolated workspace structure is intact
   */
  public static validateWorkspaceStructure(): WorkspaceValidationResult {
    const root = this.getWorkspaceRoot();
    const missingDirectories: string[] = [];
    const missingFiles: string[] = [];
    const errors: string[] = [];

    const expectedDirs = [
      path.join(root, 'COMPETITIONS'),
      path.join(root, 'UI_UX_WORK'),
      path.join(root, 'EXPERIMENTS'),
      path.join(root, 'RESEARCH'),
      path.join(root, 'ARCHIVE'),
      path.join(root, 'COMPETITIONS/_TEMPLATE/ROUND_1'),
      path.join(root, 'COMPETITIONS/_TEMPLATE/ROUND_2'),
      path.join(root, 'UI_UX_WORK/_TEMPLATE'),
    ];

    const expectedFiles = [
      path.join(root, 'README.md'),
      path.join(root, 'COMPETITIONS/_TEMPLATE/PROJECT_README.md'),
      path.join(root, 'COMPETITIONS/_TEMPLATE/project.json'),
      path.join(root, 'UI_UX_WORK/_TEMPLATE/PROJECT_README.md'),
      path.join(root, 'UI_UX_WORK/_TEMPLATE/project.json'),
      path.join(root, 'EXPERIMENTS/README.md'),
      path.join(root, 'RESEARCH/README.md'),
      path.join(root, 'ARCHIVE/README.md'),
    ];

    expectedDirs.forEach((d) => {
      if (!fs.existsSync(d)) missingDirectories.push(d);
    });

    expectedFiles.forEach((f) => {
      if (!fs.existsSync(f)) missingFiles.push(f);
    });

    return {
      valid: missingDirectories.length === 0 && missingFiles.length === 0,
      missingDirectories,
      missingFiles,
      errors,
    };
  }

  /**
   * Validates a project.json object against workspace conventions
   */
  public static validateProjectMetadata(metadata: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!metadata || typeof metadata !== 'object') {
      return { valid: false, errors: ['Project metadata is missing or not an object.'] };
    }

    if (!metadata.projectId || typeof metadata.projectId !== 'string') {
      errors.push('Missing or invalid "projectId".');
    }
    if (!metadata.projectName || typeof metadata.projectName !== 'string') {
      errors.push('Missing or invalid "projectName".');
    }
    if (!['competition', 'uiux', 'experiment'].includes(metadata.type)) {
      errors.push(`Invalid project type "${metadata.type}". Must be competition, uiux, or experiment.`);
    }
    if (!metadata.currentVersion || typeof metadata.currentVersion !== 'string') {
      errors.push('Missing or invalid "currentVersion".');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
