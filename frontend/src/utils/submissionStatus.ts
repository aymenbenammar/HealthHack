export type SubmissionStatus = 'not_submitted' | 'submitted' | 'done';

const KEY = (docId: string) => `sub_status_${docId}`;

export function getSubmissionStatus(docId: string): SubmissionStatus {
  return (localStorage.getItem(KEY(docId)) as SubmissionStatus) || 'not_submitted';
}

export function setSubmissionStatus(docId: string, status: SubmissionStatus): void {
  localStorage.setItem(KEY(docId), status);
}

export const SUBMISSION_STEPS: { key: SubmissionStatus; label: string; color: string; bg: string; border: string }[] = [
  { key: 'not_submitted', label: 'Not Submitted', color: '#9AA3AF', bg: '#F7F8FA',  border: '#E0E4EA' },
  { key: 'submitted',     label: 'Submitted',     color: '#E65100', bg: '#FFF3E0',  border: '#FFB74D' },
  { key: 'done',          label: 'Done',           color: '#2E7D32', bg: '#E8F5E9',  border: '#A5D6A7' },
];

export function stepIndex(status: SubmissionStatus): number {
  return SUBMISSION_STEPS.findIndex(s => s.key === status);
}
