import { AIAnalysisResult } from '../types';

export async function analyzeDocument(file: File): Promise<AIAnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/v1/llm/document/analyze', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail || `HTTP ${res.status}`);
  }
  return res.json() as Promise<AIAnalysisResult>;
}
