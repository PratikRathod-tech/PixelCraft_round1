import { config } from '../config/env';

export class GeminiService {
  private static endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  public static isConfigured(): boolean {
    return !!config.geminiApiKey && config.geminiApiKey.trim().length > 10;
  }

  public static async generateReview(
    role: 'design' | 'strategy' | 'ux',
    screenConfig: any,
    briefPrompt?: string
  ): Promise<{ text: string; webSources: Array<{ title: string; url?: string }> }> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key is not configured on server.');
    }

    const systemPrompt = `
You are the AI Competition Copilot for Pixelcraft Armory.
Role: ${role.toUpperCase()} ASSISTANT.
Current Config: ${JSON.stringify(screenConfig, null, 2)}
Competition Prompt: "${briefPrompt || 'General Web Design Competition'}"

VALID 3D ASSETS:
cyber-helmet-3d, mecha-robot-3d, sci-fi-drone-3d, orbital-satellite-3d, dna-helix-3d, trophy-cup-3d, quantum-computer-3d

VALID THEMES:
cyberpunk-neon, deep-cosmic, emerald-matrix, minimal-light, cinematic-dark, sunset-synthwave, solar-amber, midnight-tokyo, biophilic-forest, crimson-vector

VALID HERO LAYOUTS:
hero, split, spatial, card, compact, showcase

INSTRUCTIONS:
Return a JSON array of suggestions with schema:
[
  {
    "title": "Short title",
    "severity": "critical" | "warning" | "suggestion" | "info",
    "problem": "1-2 sentence issue",
    "recommendation": "1-2 sentence recommendation",
    "reason": "Evaluator scoring rationale",
    "confidence": 0.92,
    "changes": [
      { "property": "theme" | "layout.heroLayout" | "hero.visual.size" | "hero.visual.assetId" | "background.opacity", "to": "...", "why": "..." }
    ]
  }
]
`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const url = `${this.endpoint}?key=${config.geminiApiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Gemini API HTTP ${response.status}: ${response.statusText}`);
      }

      const data: any = await response.json();
      const candidate = data.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text || '[]';

      const webSources: Array<{ title: string; url?: string }> = [];
      if (candidate?.groundingMetadata?.groundingChunks) {
        candidate.groundingMetadata.groundingChunks.forEach((c: any) => {
          if (c.web?.uri && c.web?.title) {
            webSources.push({ title: c.web.title, url: c.web.uri });
          }
        });
      }

      return { text, webSources };
    } catch (err: any) {
      clearTimeout(timeout);
      throw err;
    }
  }

  public static async askArmory(
    question: string,
    screenConfig: any
  ): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key is not configured on server.');
    }

    const systemPrompt = `
You are the AI Competition Copilot for Pixelcraft Armory.
User Request: "${question}"
Current Config: ${JSON.stringify(screenConfig)}

Return JSON with schema:
{
  "analysis": "1-2 sentence analysis",
  "recommendation": "1-2 sentence solution",
  "reason": "Rationale for competition scoring",
  "confidence": 0.94,
  "changes": [
    { "property": "theme" | "layout.heroLayout" | "hero.visual.size" | "background.opacity", "to": "...", "why": "..." }
  ]
}
`;

    const url = `${this.endpoint}?key=${config.geminiApiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) throw new Error(`Gemini error ${response.status}`);
    const data: any = await response.json();
    return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || '{}');
  }
}
