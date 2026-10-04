/**
 * ChainRank DataParser
 * Parses CSV, TSV, and JSON formatted financial transaction datasets.
 * Supports auto-detection of delimiters, quote escaping, and batch streaming.
 */

export interface ParsedDataset {
  headers: string[];
  rows: Record<string, string>[];
  totalRows: number;
  delimiter: string;
  errors: string[];
}

export class DataParser {
  /**
   * Auto-detect delimiter from the first few lines of text.
   */
  public static detectDelimiter(sample: string): string {
    const lines = sample.split(/\r?\n/).slice(0, 5).filter(l => l.trim().length > 0);
    if (lines.length === 0) return ',';

    const candidates = [',', '\t', ';', '|'];
    const scores: Record<string, number> = { ',': 0, '\t': 0, ';': 0, '|': 0 };

    for (const d of candidates) {
      const counts = lines.map(line => (line.match(new RegExp(`\\${d}`, 'g')) || []).length);
      const allEqual = counts.every(c => c > 0 && c === counts[0]);
      if (allEqual) {
        scores[d] = counts[0] * 10;
      } else {
        const sum = counts.reduce((a, b) => a + b, 0);
        scores[d] = sum;
      }
    }

    let bestDelimiter = ',';
    let maxScore = -1;
    for (const d of candidates) {
      if (scores[d] > maxScore) {
        maxScore = scores[d];
        bestDelimiter = d;
      }
    }

    return bestDelimiter;
  }

  /**
   * Parse CSV/TSV text into structured records.
   */
  public static parseDelimited(text: string, customDelimiter?: string): ParsedDataset {
    const errors: string[] = [];
    if (!text || text.trim().length === 0) {
      return { headers: [], rows: [], totalRows: 0, delimiter: ',', errors: ['Empty dataset supplied'] };
    }

    const delimiter = customDelimiter || this.detectDelimiter(text);
    const lines = text.split(/\r?\n/);
    if (lines.length === 0) {
      return { headers: [], rows: [], totalRows: 0, delimiter, errors: ['No data lines found'] };
    }

    // Parse header line
    const headerLine = lines[0];
    const headers = this.parseLine(headerLine, delimiter).map(h => h.trim().replace(/^["']|["']$/g, ''));

    if (headers.length === 0 || headers.every(h => h.length === 0)) {
      return { headers: [], rows: [], totalRows: 0, delimiter, errors: ['Invalid or empty header row'] };
    }

    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip blank lines

      const values = this.parseLine(line, delimiter);
      if (values.length !== headers.length) {
        if (errors.length < 10) {
          errors.push(`Row ${i + 1}: expected ${headers.length} columns, found ${values.length}`);
        }
      }

      const rowObj: Record<string, string> = {};
      for (let j = 0; j < headers.length; j++) {
        const h = headers[j];
        rowObj[h] = values[j] !== undefined ? values[j].trim().replace(/^["']|["']$/g, '') : '';
      }
      rows.push(rowObj);
    }

    return {
      headers,
      rows,
      totalRows: rows.length,
      delimiter,
      errors
    };
  }

  /**
   * Parse a single line respecting quotes.
   */
  private static parseLine(line: string, delimiter: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        if (inQuotes && line[i + 1] === char) {
          current += char;
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  /**
   * Parse JSON dataset.
   */
  public static parseJson(jsonString: string): ParsedDataset {
    try {
      const parsed = JSON.parse(jsonString);
      let items: Record<string, unknown>[] = [];

      if (Array.isArray(parsed)) {
        items = parsed;
      } else if (parsed && typeof parsed === 'object') {
        const possibleArray = Object.values(parsed).find(v => Array.isArray(v));
        if (possibleArray) {
          items = possibleArray as Record<string, unknown>[];
        } else {
          items = [parsed as Record<string, unknown>];
        }
      }

      if (items.length === 0) {
        return { headers: [], rows: [], totalRows: 0, delimiter: 'json', errors: ['No items found in JSON array'] };
      }

      const headerSet = new Set<string>();
      items.slice(0, 50).forEach(item => {
        if (item && typeof item === 'object') {
          Object.keys(item).forEach(k => headerSet.add(k));
        }
      });

      const headers = Array.from(headerSet);
      const rows = items.map(item => {
        const row: Record<string, string> = {};
        for (const h of headers) {
          const val = item[h];
          row[h] = val !== undefined && val !== null ? String(val) : '';
        }
        return row;
      });

      return {
        headers,
        rows,
        totalRows: rows.length,
        delimiter: 'json',
        errors: []
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return {
        headers: [],
        rows: [],
        totalRows: 0,
        delimiter: 'json',
        errors: [`JSON Parse Error: ${msg}`]
      };
    }
  }

  /**
   * Unified loader supporting text or JSON detection.
   */
  public static parseText(content: string, filename?: string): ParsedDataset {
    const trimmed = content.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return this.parseJson(content);
    }
    return this.parseDelimited(content, filename?.endsWith('.tsv') ? '\t' : undefined);
  }
}
