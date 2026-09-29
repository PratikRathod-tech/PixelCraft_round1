import { Request, Response, NextFunction } from 'express';
import { GeminiService } from '../services/geminiService';
import { ResearchService } from '../services/researchService';

export class AIController {
  public static async review(req: Request, res: Response, next: NextFunction) {
    try {
      const { role, config, briefPrompt } = req.body;
      if (!GeminiService.isConfigured()) {
        return res.json({ success: false, fallback: true, message: 'Gemini server key unconfigured, using fallback.' });
      }
      const result = await GeminiService.generateReview(role || 'design', config, briefPrompt);
      res.json({ success: true, data: JSON.parse(result.text || '[]'), webSources: result.webSources });
    } catch (err: any) {
      res.json({ success: false, fallback: true, error: err?.message });
    }
  }

  public static async ask(req: Request, res: Response, next: NextFunction) {
    try {
      const { prompt, config } = req.body;
      if (!GeminiService.isConfigured()) {
        return res.json({ success: false, fallback: true });
      }
      const result = await GeminiService.askArmory(prompt, config);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.json({ success: false, fallback: true, error: err?.message });
    }
  }

  public static async research(req: Request, res: Response, next: NextFunction) {
    try {
      const { query, topic } = req.body;
      const result = await ResearchService.executeResearch(query || 'Competition Strategy', topic);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
}
