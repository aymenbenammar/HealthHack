export type DocStatus = 'required' | 'uploaded' | 'verified' | 'issue';

export interface DocumentTemplate {
  name: string;
  language: string;
}

export interface AppDocument {
  id: string;
  title: string;
  docClass: string;
  category: string;
  status: DocStatus;
  description: string;
  acceptedFormats: string[];
  templates?: DocumentTemplate[];
  expires?: string;
  lastUpdated?: string;
}

export interface AIIssue {
  code: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  field?: string;
}

export interface RuleCompliance {
  rule: string;
  status: 'pass' | 'fail' | 'n/a' | 'conditional';
  evidence: string;
}

export interface CrossDocIssue {
  code: string;
  severity: string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
}

export interface AIAnalysisResult {
  doc_class: string;
  confidence: number;
  metadata: {
    full_name?: string;
    date_of_birth?: string;
    issuing_authority?: string;
    issue_date?: string;
    document_number?: string;
    country_of_issue?: string;
    language?: string;
  };
  formal_flags: Record<string, unknown>;
  rule_compliance: RuleCompliance[];
  issues: AIIssue[];
  tips: string[];
  bundesland_note?: string;
  cross_doc_issues?: CrossDocIssue[];
}
