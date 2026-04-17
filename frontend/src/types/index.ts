export type DocStatus = 'required' | 'uploaded' | 'verified' | 'issue';

export interface DocumentTemplate {
  name: string;
  language: string;
}

export interface UsefulLink {
  label: string;
  url: string;
  description: string;
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
  isUserFilledForm?: boolean;
  expires?: string;
  lastUpdated?: string;
  // Preparation overview
  howToGet?: string;
  prepTimeDays?: number;       // rough estimate
  maxAgeDays?: number | null;  // validity period; null = no expiry
  phase?: 1 | 2 | 3 | 4;      // timeline phase
  processes?: string[];        // other processes that also require this doc
  dependencies?: string[];     // doc IDs that must be obtained first
  usefulLinks?: UsefulLink[];  // where to get or learn more about this document
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
