import { AIAnalysisResult } from '../types';

export interface SavedEntry {
  doc_type: string;
  filename: string | null;
  result_filename: string;
  saved_at: string;
  result: AIAnalysisResult;
}

export async function getSavedResults(docType: string): Promise<SavedEntry[]> {
  const res = await fetch(`/api/v1/llm/documents/saved/${encodeURIComponent(docType)}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json() as Promise<SavedEntry[]>;
}
