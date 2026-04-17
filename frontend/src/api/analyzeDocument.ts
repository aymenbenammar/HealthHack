import { AIAnalysisResult } from '../types';

export async function analyzeDocument(file: File, docType?: string): Promise<AIAnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);
  const langCode = localStorage.getItem('selectedLang') ?? 'en';
  formData.append('language', langCode);
  if (docType) {
    formData.append('doc_type', docType);
  }
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
