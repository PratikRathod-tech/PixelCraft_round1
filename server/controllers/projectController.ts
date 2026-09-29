import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/projectService';

export class ProjectController {
  public static async getProjects(_req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await ProjectService.getAllProjects();
      res.json({ success: true, count: projects.length, data: projects });
    } catch (err) {
      next(err);
    }
  }

  public static async getProject(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await ProjectService.getProjectById(req.params.id);
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      res.json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  }

  public static async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, competitionName, briefPrompt, config, theme } = req.body;
      const project = await ProjectService.createProject({ name, competitionName, briefPrompt, config, theme });
      res.status(201).json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  }

  public static async saveVersion(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, changelog, config } = req.body;
      const version = await ProjectService.saveVersion(req.params.id, { name, changelog, config });
      res.status(201).json({ success: true, data: version });
    } catch (err) {
      next(err);
    }
  }

  public static async getVersions(req: Request, res: Response, next: NextFunction) {
    try {
      const versions = await ProjectService.getProjectVersions(req.params.id);
      res.json({ success: true, count: versions.length, data: versions });
    } catch (err) {
      next(err);
    }
  }

  public static async restoreVersion(req: Request, res: Response, next: NextFunction) {
    try {
      const version = await ProjectService.restoreVersion(req.params.id, req.params.versionId);
      res.json({ success: true, data: version, message: `Restored version ${version.name}` });
    } catch (err) {
      next(err);
    }
  }

  public static async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      await ProjectService.deleteProject(req.params.id);
      res.json({ success: true, message: 'Project deleted' });
    } catch (err) {
      next(err);
    }
  }
}
