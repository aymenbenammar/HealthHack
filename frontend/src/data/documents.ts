import { AppDocument } from '../types';

export const documents: AppDocument[] = [
  // A) Personal Documents
  {
    id: 'birth-cert',
    title: 'Birth Certificate',
    docClass: 'BIRTH_CERT',
    category: 'A) Personal Documents',
    status: 'required',
    description:
      'An official birth certificate issued by the civil registry office of your country of birth. Must show full name, date of birth, place of birth, and names of parents. If not in German, a certified translation is required.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    templates: [
      { name: 'Birth Certificate Template', language: 'German' },
      { name: 'Translation Request Form', language: 'German / English' },
    ],
    howToGet:
      'Request a certified copy from the civil registry office (Standesamt) in your country of birth. An apostille may be required. A certified German translation by a sworn translator is mandatory if the original is not in German. International requests can take 4–8 weeks.',
    prepTimeDays: 42,
    maxAgeDays: null,
    phase: 1,
    processes: ['Approbation', 'Marriage Registration', 'Visa Applications'],
    dependencies: [],
  },
  {
    id: 'passport',
    title: 'Passport',
    docClass: 'PASSPORT',
    category: 'A) Personal Documents',
    status: 'required',
    description:
      'A valid passport or national identity card. Must be valid for the duration of the Approbation process. Provide a color scan of the data page including the photo.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    howToGet:
      'Scan the data page (photo page) of your current valid passport or EU national identity card in color. Ensure the entire page is visible and text is legible. No translation required.',
    prepTimeDays: 1,
    maxAgeDays: null,
    phase: 3,
    processes: ['Approbation', 'Visa Applications', 'Bank Account Opening', 'Residence Permit'],
    dependencies: [],
  },
  {
    id: 'name-change',
    title: 'Proof of Name Change',
    docClass: 'NAME_CHANGE',
    category: 'A) Personal Documents',
    status: 'required',
    description:
      'If your name has changed (e.g., through marriage or court order), you must submit the official document proving the name change. This ensures consistency across all submitted documents.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    templates: [
      { name: 'Name Consistency Declaration', language: 'German' },
    ],
    howToGet:
      'Obtain the official document recording the name change from the relevant authority (e.g., marriage certificate from a civil registry, court order). A certified German translation is required if not already in German. Allow 3–6 weeks for foreign documents.',
    prepTimeDays: 28,
    maxAgeDays: null,
    phase: 1,
    processes: ['Approbation'],
    dependencies: [],
  },
  {
    id: 'cv-signed',
    title: 'Signed / Curriculum Vitae',
    docClass: 'CV_SIGNED',
    category: 'A) Personal Documents',
    status: 'required',
    description:
      'A comprehensive, chronological curriculum vitae covering all periods of education and employment without gaps. Must be hand-signed and dated. Any unexplained gap longer than one month must be accounted for. A German translation is required if the CV is not written in German.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    isUserFilledForm: true,
    howToGet:
      'Write the CV yourself in German (or have it translated by a sworn translator). It must be in tabular, chronological format, cover all periods without gaps from birth to today, and be hand-signed and dated. Any gap exceeding one month must be explained.',
    prepTimeDays: 7,
    maxAgeDays: null,
    phase: 2,
    processes: ['Approbation', 'Job Applications'],
    dependencies: [],
  },

  // B) University Documents
  {
    id: 'diploma',
    title: 'Diploma / Medical Degree',
    docClass: 'DIPLOMA',
    category: 'B) University Documents',
    status: 'required',
    description:
      'Your original medical degree (Arztdiplom or equivalent) awarded by a recognized university. The document must state the field of study (medicine), the awarding institution, and your full name. A certified German translation is required if the original is not in German.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    templates: [
      { name: 'Degree Recognition Request', language: 'German' },
    ],
    howToGet:
      'Request a notarially certified copy from your university\'s registrar. Submit a certified German translation by a sworn translator. For non-EU degrees, an EU-conformity certificate from the issuing country may also be required (see checklist item 6). Allow 4–8 weeks for international requests.',
    prepTimeDays: 42,
    maxAgeDays: null,
    phase: 1,
    processes: ['Approbation', 'Medical Chamber Registration', 'Specialist Title Recognition'],
    dependencies: [],
  },
  {
    id: 'arbeitszeugnis',
    title: 'Proof of Practical Training',
    docClass: 'ARBEITSZEUGNIS',
    category: 'B) University Documents',
    status: 'required',
    description:
      'Documentation confirming completion of your practical training (e.g., clinical internship or residency). Must include duration, institution, and supervisor confirmation. Equivalent to the German "Famulaturbescheinigung" or "Praktisches Jahr" certificate.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    templates: [
      { name: 'Practical Training Summary Template', language: 'German / English' },
    ],
    howToGet:
      'Request the certificate from the hospital or clinic where you completed the training. It must confirm the period, institution, and supervisor. A certified German translation is required if not already in German. Allow 3–5 weeks.',
    prepTimeDays: 28,
    maxAgeDays: null,
    phase: 1,
    processes: ['Approbation'],
    dependencies: [],
  },
  {
    id: 'curriculum',
    title: 'Transcript of Records',
    docClass: 'CURRICULUM',
    category: 'B) University Documents',
    status: 'required',
    description:
      'Official transcript listing all completed courses, grades, and credit hours. Must be issued by your university registrar and bear an official stamp or seal. A certified translation into German is required if the original is not in German or English.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    howToGet:
      'Request the official transcript directly from your university\'s registrar office. It must carry an official seal or stamp. A certified German translation by a sworn translator is required if not in German. Allow 4–6 weeks for international requests.',
    prepTimeDays: 35,
    maxAgeDays: null,
    phase: 1,
    processes: ['Approbation'],
    dependencies: [],
  },
  {
    id: 'promotionsurkunde',
    title: 'Doctorate Certificate',
    docClass: 'PROMOTIONSURKUNDE',
    category: 'B) University Documents',
    status: 'required',
    description:
      'If you hold a doctorate (Dr. med. or equivalent), submit the original promotion certificate. This document is required for the authority to verify the academic title you intend to use in Germany.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    howToGet:
      'Request a certified copy from the university that awarded your doctorate. A certified German translation is required if not in German. Allow 2–4 weeks. Only required if you hold a doctoral degree.',
    prepTimeDays: 21,
    maxAgeDays: null,
    phase: 1,
    processes: ['Approbation', 'Medical Chamber Registration'],
    dependencies: [],
  },

  // C) Professional Documents
  {
    id: 'license',
    title: 'Medical License',
    docClass: 'LICENSE',
    category: 'C) Professional Documents',
    status: 'required',
    description:
      'Current, valid license to practice medicine issued by the competent authority in your home country or the country where you most recently practiced. Must confirm unrestricted authorization to practice. A certified German translation is required.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    templates: [
      { name: 'License Verification Request Letter', language: 'German / English' },
    ],
    howToGet:
      'Request the license or authorization certificate from the medical licensing authority (e.g., medical council, health ministry) of your home country or last country of practice. A certified German translation is required. Processing can take 4–8 weeks for foreign authorities.',
    prepTimeDays: 56,
    maxAgeDays: null,
    phase: 1,
    processes: ['Approbation', 'Medical Chamber Registration'],
    dependencies: [],
  },
  {
    id: 'good-standing',
    title: 'Good Standing Certificate',
    docClass: 'GOOD_STANDING',
    category: 'C) Professional Documents',
    status: 'required',
    description:
      'A certificate from the medical council or licensing authority in your home country confirming that your license is in good standing and that you have not been subject to any disciplinary measures. Must not be older than 3 months at the time of submission.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    templates: [
      { name: 'Good Standing Request Template', language: 'English' },
    ],
    howToGet:
      'Write to the medical council or licensing authority of every country where you have practiced medicine. The certificate (Unbedenklichkeitsbescheinigung) must state that no disciplinary or supervisory proceedings are pending. It must be issued within 3 months of your submission date — plan carefully. Allow 4–6 weeks per country.',
    prepTimeDays: 42,
    maxAgeDays: 90,
    phase: 1,
    processes: ['Approbation'],
    dependencies: [],
  },

  // D) German Administrative Documents
  {
    id: 'antrag-approbation',
    title: 'Approbation Application Form',
    docClass: 'ANTRAG_APPROBATION',
    category: 'D) German Administrative Documents',
    status: 'required',
    description:
      'The official application form for the Approbation (Antrag auf Erteilung der Approbation als Arzt/Ärztin). Must be completed in full, signed, and dated. The form is provided by the respective Landesbehörde (state health authority).',
    acceptedFormats: ['.pdf'],
    isUserFilledForm: true,
    templates: [
      { name: 'Approbation Application Form (Lower Saxony)', language: 'German' },
      { name: 'Approbation Application Form (Bavaria)', language: 'German' },
      { name: 'Approbation Application Form (NRW)', language: 'German' },
    ],
    howToGet:
      'Download the official form from your state authority\'s website (e.g., NiZzA for Lower Saxony). Fill it in completely and sign by hand. Also complete the attached Absichtserklärung (declaration of intent to practice in the state) and IMI-Einverständniserklärung and Erklärung über Straffreiheit — all available as official templates. Only fill in this form once all other documents are ready.',
    prepTimeDays: 3,
    maxAgeDays: null,
    phase: 4,
    processes: ['Approbation'],
    dependencies: [
      'passport', 'diploma', 'curriculum', 'arbeitszeugnis', 'cv-signed',
      'license', 'good-standing', 'b2-cert', 'fsp-cert',
      'eu-fuehrungszeugnis', 'heimat-fuehrungszeugnis',
      'meldebescheinigung', 'aerztliche-bescheinigung',
    ],
  },
  {
    id: 'nachweis-zustaendigkeit',
    title: 'Proof of Jurisdiction',
    docClass: 'NACHWEIS_ZUSTAENDIGKEIT',
    category: 'D) German Administrative Documents',
    status: 'required',
    description:
      'Documentation confirming the competent authority (Approbationsbehörde) responsible for processing your application. This is determined by your registered place of residence in Germany. Submit proof of registration or employer confirmation.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    howToGet:
      'Your Meldebescheinigung (registration certificate) is usually sufficient. Alternatively, a letter from your German employer confirming your work location is accepted. Obtain the Meldebescheinigung first.',
    prepTimeDays: 7,
    maxAgeDays: null,
    phase: 3,
    processes: ['Approbation'],
    dependencies: ['meldebescheinigung'],
  },
  {
    id: 'meldebescheinigung',
    title: 'Registration Certificate',
    docClass: 'MELDEBESCHEINIGUNG',
    category: 'D) German Administrative Documents',
    status: 'required',
    description:
      'A Meldebescheinigung issued by your local Einwohnermeldeamt (residents\' registration office) confirming your registered address in Germany. Must not be older than 3 months.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    howToGet:
      'Visit your local Einwohnermeldeamt (residents\' registration office) or Bürgeramt in person with your passport and proof of address (rental contract or landlord letter). The certificate is issued on the spot or within a few days. Validity: 3 months — obtain close to your submission date.',
    prepTimeDays: 2,
    maxAgeDays: 90,
    phase: 3,
    processes: ['Approbation', 'Bank Account Opening', 'Residence Permit', 'Proof of Jurisdiction'],
    dependencies: [],
  },
  {
    id: 'eu-fuehrungszeugnis',
    title: 'EU Criminal Record Certificate',
    docClass: 'EU_FUEHRUNGSZEUGNIS',
    category: 'D) German Administrative Documents',
    status: 'required',
    description:
      'An EU-standard criminal record certificate (Führungszeugnis) from the German Federal Central Register (Bundeszentralregister), applied for at your local Bürgeramt. Required to confirm no criminal convictions in Germany. Must not be older than 3 months.',
    acceptedFormats: ['.pdf'],
    templates: [
      { name: 'Application for Führungszeugnis', language: 'German' },
    ],
    howToGet:
      'Apply at your local Bürgeramt with your passport. When asked for the purpose, state "Approbation BÄO" to ensure correct processing. The certificate (Belegart O) is sent by post in 2–4 weeks. Validity: 3 months — request it close to your submission date.',
    prepTimeDays: 28,
    maxAgeDays: 90,
    phase: 3,
    processes: ['Approbation'],
    dependencies: [],
  },
  {
    id: 'heimat-fuehrungszeugnis',
    title: 'Home Country Criminal Record',
    docClass: 'HEIMAT_FUEHRUNGSZEUGNIS',
    category: 'D) German Administrative Documents',
    status: 'required',
    description:
      'An official criminal record certificate from your home country (or country of previous residence). Must be issued by the competent authority and accompanied by a certified German translation. Must not be older than 3 months.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    howToGet:
      'Request from the police or justice authority of your home country and every country where you lived for more than 3 months. A certified German translation is required. Processing time varies — some countries take 4–8 weeks. Because of the 3-month validity, coordinate timing carefully with your submission date.',
    prepTimeDays: 56,
    maxAgeDays: 90,
    phase: 1,
    processes: ['Approbation'],
    dependencies: [],
  },
  {
    id: 'aerztliche-bescheinigung',
    title: 'Medical Health Certificate',
    docClass: 'AERZTLICHE_BESCHEINIGUNG',
    category: 'D) German Administrative Documents',
    status: 'required',
    description:
      'A certificate from a licensed physician confirming that you are physically and mentally fit to practice medicine. Must be issued by a German physician and state that there are no health grounds preventing professional medical practice (ärztliche Bescheinigung über die gesundheitliche Eignung).',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    templates: [
      { name: 'Health Certificate Template', language: 'German' },
    ],
    howToGet:
      'Book an appointment with any licensed physician practicing in Germany (Hausarzt or specialist). Bring the official NiZzA/authority template if available. The doctor issues the certificate after a brief consultation. Validity: 3 months — obtain close to submission. Allow 1–2 weeks for an appointment.',
    prepTimeDays: 14,
    maxAgeDays: 90,
    phase: 3,
    processes: ['Approbation'],
    dependencies: [],
  },

  // E) Language Certificates
  {
    id: 'b2-cert',
    title: 'German B2 Language Certificate',
    docClass: 'B2_CERT',
    category: 'E) Language Certificates',
    status: 'required',
    description:
      'Proof of German language proficiency at B2 level (CEFR) or higher, issued by a recognized institution such as Goethe-Institut, telc, TestDaF, or ÖSD. The certificate must be officially recognized by the respective Approbationsbehörde.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    templates: [
      { name: 'Recognized Language Institutes List', language: 'German' },
    ],
    howToGet:
      'Enroll in a German language course at an accredited institution (Goethe-Institut, telc, TestDaF, ÖSD). Exam sessions are scheduled several months in advance — register early. Starting from A1 level typically takes 12–18 months; from B1 allow 3–6 months. This certificate is a prerequisite for registering for the Fachsprachprüfung (FSP).',
    prepTimeDays: 120,
    maxAgeDays: null,
    phase: 1,
    processes: ['Approbation', 'Fachsprachprüfung (FSP) Registration', 'Residence Permit Extension'],
    dependencies: [],
  },
  {
    id: 'fsp-cert',
    title: 'Medical German Exam / Fachsprachenprüfung (FSP)',
    docClass: 'FSP_CERT',
    category: 'E) Language Certificates',
    status: 'required',
    description:
      'The Fachsprachenprüfung (FSP) is a medical German language examination conducted by the respective Landesärztekammer (State Medical Chamber). It assesses doctor-patient communication, medical documentation, and professional terminology. This exam is mandatory for non-EU applicants and often required for EU applicants as well.',
    acceptedFormats: ['.pdf', '.jpg', '.png'],
    templates: [
      { name: 'FSP Registration Form', language: 'German' },
      { name: 'FSP Preparation Guide', language: 'German / English' },
    ],
    howToGet:
      'Register with your state\'s Landesärztekammer (e.g., Ärztekammer Niedersachsen). A valid B2 certificate is required before you can register. Exam slots are limited and fill up quickly — register as soon as you have your B2 certificate. Allow 2–4 months for preparation and scheduling.',
    prepTimeDays: 90,
    maxAgeDays: null,
    phase: 2,
    processes: ['Approbation', 'Berufserlaubnis (Temporary Practice Permit)'],
    dependencies: ['b2-cert'],
  },
];

export const categories = [
  'A) Personal Documents',
  'B) University Documents',
  'C) Professional Documents',
  'D) German Administrative Documents',
  'E) Language Certificates',
];

export const phaseConfig: Record<1 | 2 | 3 | 4, { label: string; sublabel: string; color: string; bg: string; border: string }> = {
  1: { label: 'Start Immediately', sublabel: 'Long lead time — request these first', color: '#C62828', bg: '#FFEBEE', border: '#EF9A9A' },
  2: { label: 'Schedule Early', sublabel: '2–4 months before submission', color: '#E65100', bg: '#FFF3E0', border: '#FFB74D' },
  3: { label: 'Last 3 Months', sublabel: 'Time-sensitive — obtain close to submission', color: '#1565C0', bg: '#E3F2FD', border: '#90CAF9' },
  4: { label: 'Compile & Submit', sublabel: 'Fill in the application when all docs are ready', color: '#2E7D32', bg: '#E8F5E9', border: '#A5D6A7' },
};

export function getDocumentById(id: string): AppDocument | undefined {
  return documents.find((d) => d.id === id);
}

export function getDocumentsByCategory(category: string): AppDocument[] {
  return documents.filter((d) => d.category === category);
}

export function getDocumentsByPhase(phase: 1 | 2 | 3 | 4): AppDocument[] {
  return documents.filter((d) => d.phase === phase);
}
