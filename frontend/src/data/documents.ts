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
    templates: [
      { name: 'Approbation Application Form (Lower Saxony)', language: 'German' },
      { name: 'Approbation Application Form (Bavaria)', language: 'German' },
      { name: 'Approbation Application Form (NRW)', language: 'German' },
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
  },
];

export const categories = [
  'A) Personal Documents',
  'B) University Documents',
  'C) Professional Documents',
  'D) German Administrative Documents',
  'E) Language Certificates',
];

export function getDocumentById(id: string): AppDocument | undefined {
  return documents.find((d) => d.id === id);
}

export function getDocumentsByCategory(category: string): AppDocument[] {
  return documents.filter((d) => d.category === category);
}
