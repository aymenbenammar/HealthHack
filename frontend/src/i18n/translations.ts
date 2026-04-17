export type LangCode = 'en' | 'de' | 'ar' | 'fr' | 'tr' | 'es';

export interface Translations {
  // Sidebar
  myRoadmap: string;
  myDocuments: string;
  community: string;
  services: string;

  // Header
  searchPlaceholder: string;

  // DocumentsPage
  pageTitle: string;
  pageSubtitle: string;
  tabYourDocuments: string;
  tabYourTranslations: string;
  noTranslations: string;
  noTranslationsHint: string;
  colTitle: string;
  colStatus: string;
  colExpires: string;
  colLastUpdated: string;
  colActions: string;
  reminderSet: string;
  bundeslandLabel: string;
  statTotal: string;
  statRequired: string;
  statUploaded: string;
  statVerified: string;
  statIssues: string;

  // Status badges
  statusRequired: string;
  statusUploaded: string;
  statusVerified: string;
  statusIssue: string;

  // Category names
  catPersonal: string;
  catUniversity: string;
  catProfessional: string;
  catAdministrative: string;
  catLanguage: string;

  // DocumentDetailPage
  backToOverview: string;
  categoryLabel: string;
  descriptionLabel: string;
  acceptedFormatsLabel: string;
  templateInfoLabel: string;
  templateLanguage: string;
  download: string;
  yourUploadedDocs: string;
  dragAndDrop: string;
  upTo20MB: string;
  uploadDocument: string;
  checkWithAI: string;
  analyzingDoc: string;
  analyzingHint: string;
  analysisFailed: string;
  checklistLabel: string;
  checklistUpload: string;
  checklistAI: string;
  docNotFound: string;
  docNotFoundHint: string;
  backToDocuments: string;
}

const en: Translations = {
  myRoadmap: 'My Roadmap',
  myDocuments: 'My Documents',
  community: 'Community',
  services: 'Services',

  searchPlaceholder: 'Search documents...',

  pageTitle: 'My Documents',
  pageSubtitle: 'Manage your Approbation documents and track their status',
  tabYourDocuments: 'Your Documents',
  tabYourTranslations: 'Your Translations',
  noTranslations: 'No translations yet',
  noTranslationsHint: 'Upload documents and request certified translations here.',
  colTitle: 'TITLE',
  colStatus: 'STATUS',
  colExpires: 'EXPIRES',
  colLastUpdated: 'LAST UPDATED',
  colActions: 'ACTIONS',
  reminderSet: 'Set',
  bundeslandLabel: 'Federal State',
  statTotal: 'Total Documents',
  statRequired: 'Required',
  statUploaded: 'Uploaded',
  statVerified: 'Verified',
  statIssues: 'Issues',

  statusRequired: 'Required',
  statusUploaded: 'Uploaded',
  statusVerified: 'Verified',
  statusIssue: 'Issue',

  catPersonal: 'A) Personal Documents',
  catUniversity: 'B) University Documents',
  catProfessional: 'C) Professional Documents',
  catAdministrative: 'D) German Administrative Documents',
  catLanguage: 'E) Language Certificates',

  backToOverview: 'Back to Overview',
  categoryLabel: 'Category',
  descriptionLabel: 'Description',
  acceptedFormatsLabel: 'Accepted Formats',
  templateInfoLabel: 'Template Information',
  templateLanguage: 'Language',
  download: 'Download',
  yourUploadedDocs: 'Your Uploaded Documents',
  dragAndDrop: 'Drag & drop your file here',
  upTo20MB: 'up to 20 MB',
  uploadDocument: 'Upload Document',
  checkWithAI: 'Check with AI',
  analyzingDoc: 'Analyzing document...',
  analyzingHint: 'This may take a few seconds',
  analysisFailed: 'Analysis Failed',
  checklistLabel: 'Checklist',
  checklistUpload: 'Upload document',
  checklistAI: 'AI analysis complete',
  docNotFound: 'Document Not Found',
  docNotFoundHint: 'The document you are looking for does not exist.',
  backToDocuments: 'Back to Documents',
};

const de: Translations = {
  myRoadmap: 'Mein Fahrplan',
  myDocuments: 'Meine Dokumente',
  community: 'Community',
  services: 'Dienste',

  searchPlaceholder: 'Dokumente suchen...',

  pageTitle: 'Meine Dokumente',
  pageSubtitle: 'Verwalten Sie Ihre Approbationsunterlagen und verfolgen Sie deren Status',
  tabYourDocuments: 'Ihre Dokumente',
  tabYourTranslations: 'Ihre Übersetzungen',
  noTranslations: 'Noch keine Übersetzungen',
  noTranslationsHint: 'Laden Sie Dokumente hoch und beantragen Sie hier beglaubigte Übersetzungen.',
  colTitle: 'TITEL',
  colStatus: 'STATUS',
  colExpires: 'GÜLTIG BIS',
  colLastUpdated: 'ZULETZT AKTUALISIERT',
  colActions: 'AKTIONEN',
  reminderSet: 'Setzen',
  bundeslandLabel: 'Bundesland',
  statTotal: 'Dokumente gesamt',
  statRequired: 'Erforderlich',
  statUploaded: 'Hochgeladen',
  statVerified: 'Geprüft',
  statIssues: 'Probleme',

  statusRequired: 'Erforderlich',
  statusUploaded: 'Hochgeladen',
  statusVerified: 'Geprüft',
  statusIssue: 'Problem',

  catPersonal: 'A) Persönliche Dokumente',
  catUniversity: 'B) Universitätsdokumente',
  catProfessional: 'C) Berufliche Dokumente',
  catAdministrative: 'D) Deutsche Verwaltungsdokumente',
  catLanguage: 'E) Sprachzertifikate',

  backToOverview: 'Zurück zur Übersicht',
  categoryLabel: 'Kategorie',
  descriptionLabel: 'Beschreibung',
  acceptedFormatsLabel: 'Akzeptierte Formate',
  templateInfoLabel: 'Vorlagenhinweise',
  templateLanguage: 'Sprache',
  download: 'Herunterladen',
  yourUploadedDocs: 'Ihre hochgeladenen Dokumente',
  dragAndDrop: 'Datei hier ablegen',
  upTo20MB: 'bis zu 20 MB',
  uploadDocument: 'Dokument hochladen',
  checkWithAI: 'Mit KI prüfen',
  analyzingDoc: 'Dokument wird analysiert...',
  analyzingHint: 'Dies kann einige Sekunden dauern',
  analysisFailed: 'Analyse fehlgeschlagen',
  checklistLabel: 'Checkliste',
  checklistUpload: 'Dokument hochladen',
  checklistAI: 'KI-Analyse abgeschlossen',
  docNotFound: 'Dokument nicht gefunden',
  docNotFoundHint: 'Das gesuchte Dokument existiert nicht.',
  backToDocuments: 'Zurück zu den Dokumenten',
};

const fr: Translations = {
  myRoadmap: 'Mon parcours',
  myDocuments: 'Mes documents',
  community: 'Communauté',
  services: 'Services',

  searchPlaceholder: 'Rechercher des documents...',

  pageTitle: 'Mes documents',
  pageSubtitle: "Gérez vos documents d'Approbation et suivez leur statut",
  tabYourDocuments: 'Vos documents',
  tabYourTranslations: 'Vos traductions',
  noTranslations: 'Aucune traduction pour le moment',
  noTranslationsHint: 'Téléversez des documents et demandez des traductions certifiées ici.',
  colTitle: 'TITRE',
  colStatus: 'STATUT',
  colExpires: 'EXPIRE',
  colLastUpdated: 'MIS À JOUR',
  colActions: 'ACTIONS',
  reminderSet: 'Définir',
  bundeslandLabel: 'État fédéral',
  statTotal: 'Total documents',
  statRequired: 'Requis',
  statUploaded: 'Téléversé',
  statVerified: 'Vérifié',
  statIssues: 'Problèmes',

  statusRequired: 'Requis',
  statusUploaded: 'Téléversé',
  statusVerified: 'Vérifié',
  statusIssue: 'Problème',

  catPersonal: 'A) Documents personnels',
  catUniversity: 'B) Documents universitaires',
  catProfessional: 'C) Documents professionnels',
  catAdministrative: 'D) Documents administratifs allemands',
  catLanguage: 'E) Certificats de langue',

  backToOverview: "Retour à l'aperçu",
  categoryLabel: 'Catégorie',
  descriptionLabel: 'Description',
  acceptedFormatsLabel: 'Formats acceptés',
  templateInfoLabel: 'Informations sur le modèle',
  templateLanguage: 'Langue',
  download: 'Télécharger',
  yourUploadedDocs: 'Vos documents téléversés',
  dragAndDrop: 'Glissez-déposez votre fichier ici',
  upTo20MB: "jusqu'à 20 Mo",
  uploadDocument: 'Téléverser le document',
  checkWithAI: "Vérifier avec l'IA",
  analyzingDoc: 'Analyse du document...',
  analyzingHint: 'Cela peut prendre quelques secondes',
  analysisFailed: "Échec de l'analyse",
  checklistLabel: 'Liste de contrôle',
  checklistUpload: 'Téléverser le document',
  checklistAI: 'Analyse IA terminée',
  docNotFound: 'Document introuvable',
  docNotFoundHint: "Le document que vous recherchez n'existe pas.",
  backToDocuments: 'Retour aux documents',
};

const tr: Translations = {
  myRoadmap: 'Yol Haritam',
  myDocuments: 'Belgelerim',
  community: 'Topluluk',
  services: 'Hizmetler',

  searchPlaceholder: 'Belge ara...',

  pageTitle: 'Belgelerim',
  pageSubtitle: 'Approbation belgelerinizi yönetin ve durumlarını takip edin',
  tabYourDocuments: 'Belgeleriniz',
  tabYourTranslations: 'Çevirileriniz',
  noTranslations: 'Henüz çeviri yok',
  noTranslationsHint: 'Belge yükleyin ve burada onaylı çeviri talep edin.',
  colTitle: 'BAŞLIK',
  colStatus: 'DURUM',
  colExpires: 'GEÇERLİLİK',
  colLastUpdated: 'SON GÜNCELLEME',
  colActions: 'İŞLEMLER',
  reminderSet: 'Ayarla',
  bundeslandLabel: 'Eyalet',
  statTotal: 'Toplam Belge',
  statRequired: 'Gerekli',
  statUploaded: 'Yüklendi',
  statVerified: 'Doğrulandı',
  statIssues: 'Sorunlar',

  statusRequired: 'Gerekli',
  statusUploaded: 'Yüklendi',
  statusVerified: 'Doğrulandı',
  statusIssue: 'Sorun',

  catPersonal: 'A) Kişisel Belgeler',
  catUniversity: 'B) Üniversite Belgeleri',
  catProfessional: 'C) Mesleki Belgeler',
  catAdministrative: 'D) Alman İdari Belgeleri',
  catLanguage: 'E) Dil Sertifikaları',

  backToOverview: 'Genel Bakışa Dön',
  categoryLabel: 'Kategori',
  descriptionLabel: 'Açıklama',
  acceptedFormatsLabel: 'Kabul Edilen Formatlar',
  templateInfoLabel: 'Şablon Bilgisi',
  templateLanguage: 'Dil',
  download: 'İndir',
  yourUploadedDocs: 'Yüklenen Belgeleriniz',
  dragAndDrop: 'Dosyanızı buraya sürükleyin',
  upTo20MB: '20 MB\'a kadar',
  uploadDocument: 'Belge Yükle',
  checkWithAI: 'Yapay Zeka ile Kontrol Et',
  analyzingDoc: 'Belge analiz ediliyor...',
  analyzingHint: 'Bu birkaç saniye sürebilir',
  analysisFailed: 'Analiz Başarısız',
  checklistLabel: 'Kontrol Listesi',
  checklistUpload: 'Belge yükle',
  checklistAI: 'Yapay Zeka analizi tamamlandı',
  docNotFound: 'Belge Bulunamadı',
  docNotFoundHint: 'Aradığınız belge mevcut değil.',
  backToDocuments: 'Belgelere Dön',
};

const es: Translations = {
  myRoadmap: 'Mi hoja de ruta',
  myDocuments: 'Mis documentos',
  community: 'Comunidad',
  services: 'Servicios',

  searchPlaceholder: 'Buscar documentos...',

  pageTitle: 'Mis documentos',
  pageSubtitle: 'Gestione sus documentos de Approbation y realice un seguimiento de su estado',
  tabYourDocuments: 'Sus documentos',
  tabYourTranslations: 'Sus traducciones',
  noTranslations: 'Aún no hay traducciones',
  noTranslationsHint: 'Suba documentos y solicite traducciones certificadas aquí.',
  colTitle: 'TÍTULO',
  colStatus: 'ESTADO',
  colExpires: 'VENCIMIENTO',
  colLastUpdated: 'ÚLTIMA ACTUALIZACIÓN',
  colActions: 'ACCIONES',
  reminderSet: 'Establecer',
  bundeslandLabel: 'Estado federal',
  statTotal: 'Total documentos',
  statRequired: 'Requerido',
  statUploaded: 'Subido',
  statVerified: 'Verificado',
  statIssues: 'Problemas',

  statusRequired: 'Requerido',
  statusUploaded: 'Subido',
  statusVerified: 'Verificado',
  statusIssue: 'Problema',

  catPersonal: 'A) Documentos personales',
  catUniversity: 'B) Documentos universitarios',
  catProfessional: 'C) Documentos profesionales',
  catAdministrative: 'D) Documentos administrativos alemanes',
  catLanguage: 'E) Certificados de idioma',

  backToOverview: 'Volver al resumen',
  categoryLabel: 'Categoría',
  descriptionLabel: 'Descripción',
  acceptedFormatsLabel: 'Formatos aceptados',
  templateInfoLabel: 'Información de plantilla',
  templateLanguage: 'Idioma',
  download: 'Descargar',
  yourUploadedDocs: 'Sus documentos subidos',
  dragAndDrop: 'Arrastre y suelte su archivo aquí',
  upTo20MB: 'hasta 20 MB',
  uploadDocument: 'Subir documento',
  checkWithAI: 'Verificar con IA',
  analyzingDoc: 'Analizando documento...',
  analyzingHint: 'Esto puede tardar unos segundos',
  analysisFailed: 'Análisis fallido',
  checklistLabel: 'Lista de verificación',
  checklistUpload: 'Subir documento',
  checklistAI: 'Análisis de IA completado',
  docNotFound: 'Documento no encontrado',
  docNotFoundHint: 'El documento que busca no existe.',
  backToDocuments: 'Volver a documentos',
};

// Arabic — RTL, partial (key UI strings)
const ar: Translations = {
  myRoadmap: 'خارطة طريقي',
  myDocuments: 'مستنداتي',
  community: 'المجتمع',
  services: 'الخدمات',

  searchPlaceholder: 'البحث في المستندات...',

  pageTitle: 'مستنداتي',
  pageSubtitle: 'إدارة مستندات الاعتماد الطبي وتتبع حالتها',
  tabYourDocuments: 'مستنداتك',
  tabYourTranslations: 'ترجماتك',
  noTranslations: 'لا توجد ترجمات بعد',
  noTranslationsHint: 'ارفع المستندات واطلب الترجمات المعتمدة هنا.',
  colTitle: 'العنوان',
  colStatus: 'الحالة',
  colExpires: 'تاريخ الانتهاء',
  colLastUpdated: 'آخر تحديث',
  colActions: 'إجراءات',
  reminderSet: 'ضبط',
  bundeslandLabel: 'الولاية الفيدرالية',
  statTotal: 'إجمالي المستندات',
  statRequired: 'مطلوب',
  statUploaded: 'تم الرفع',
  statVerified: 'تم التحقق',
  statIssues: 'مشاكل',

  statusRequired: 'مطلوب',
  statusUploaded: 'تم الرفع',
  statusVerified: 'تم التحقق',
  statusIssue: 'مشكلة',

  catPersonal: 'أ) الوثائق الشخصية',
  catUniversity: 'ب) وثائق الجامعة',
  catProfessional: 'ج) الوثائق المهنية',
  catAdministrative: 'د) الوثائق الإدارية الألمانية',
  catLanguage: 'هـ) شهادات اللغة',

  backToOverview: 'العودة إلى النظرة العامة',
  categoryLabel: 'الفئة',
  descriptionLabel: 'الوصف',
  acceptedFormatsLabel: 'الصيغ المقبولة',
  templateInfoLabel: 'معلومات القالب',
  templateLanguage: 'اللغة',
  download: 'تنزيل',
  yourUploadedDocs: 'مستنداتك المرفوعة',
  dragAndDrop: 'اسحب وأفلت ملفك هنا',
  upTo20MB: 'حتى 20 ميجابايت',
  uploadDocument: 'رفع المستند',
  checkWithAI: 'فحص بالذكاء الاصطناعي',
  analyzingDoc: 'جارٍ تحليل المستند...',
  analyzingHint: 'قد يستغرق هذا بضع ثوانٍ',
  analysisFailed: 'فشل التحليل',
  checklistLabel: 'قائمة التحقق',
  checklistUpload: 'رفع المستند',
  checklistAI: 'اكتمل تحليل الذكاء الاصطناعي',
  docNotFound: 'المستند غير موجود',
  docNotFoundHint: 'المستند الذي تبحث عنه غير موجود.',
  backToDocuments: 'العودة إلى المستندات',
};

export const translationsMap: Record<LangCode, Translations> = { en, de, fr, tr, es, ar };

/** German federal states with per-language display names */
export const BUNDESLAENDER: { value: string; labels: Record<LangCode, string> }[] = [
  { value: 'niedersachsen',        labels: { en: 'Lower Saxony',           de: 'Niedersachsen',          fr: 'Basse-Saxe',              tr: 'Aşağı Saksonya',    es: 'Baja Sajonia',              ar: 'ساكسونيا السفلى'     } },
  { value: 'bayern',               labels: { en: 'Bavaria',                de: 'Bayern',                 fr: 'Bavière',                 tr: 'Bavyera',           es: 'Baviera',                   ar: 'بافاريا'             } },
  { value: 'nordrhein-westfalen',  labels: { en: 'North Rhine-Westphalia', de: 'Nordrhein-Westfalen',    fr: 'Rhénanie-du-Nord-Westphalie', tr: 'Kuzey Ren-Vestfalya', es: 'Renania del Norte-Westfalia', ar: 'شمال الراين-وستفاليا' } },
  { value: 'baden-wuerttemberg',   labels: { en: 'Baden-Württemberg',      de: 'Baden-Württemberg',      fr: 'Bade-Wurtemberg',         tr: 'Baden-Württemberg', es: 'Baden-Wurtemberg',          ar: 'بادن-فورتمبرغ'       } },
  { value: 'hamburg',              labels: { en: 'Hamburg',                de: 'Hamburg',                fr: 'Hambourg',                tr: 'Hamburg',           es: 'Hamburgo',                  ar: 'هامبورغ'             } },
  { value: 'berlin',               labels: { en: 'Berlin',                 de: 'Berlin',                 fr: 'Berlin',                  tr: 'Berlin',            es: 'Berlín',                    ar: 'برلين'               } },
  { value: 'hessen',               labels: { en: 'Hesse',                  de: 'Hessen',                 fr: 'Hesse',                   tr: 'Hessen',            es: 'Hesse',                     ar: 'هيسن'                } },
  { value: 'sachsen',              labels: { en: 'Saxony',                 de: 'Sachsen',                fr: 'Saxe',                    tr: 'Saksonya',          es: 'Sajonia',                   ar: 'ساكسونيا'            } },
];

/** Map category key strings (from documents.ts) to their translation key */
export const categoryTranslationKey: Record<string, keyof Translations> = {
  'A) Personal Documents': 'catPersonal',
  'B) University Documents': 'catUniversity',
  'C) Professional Documents': 'catProfessional',
  'D) German Administrative Documents': 'catAdministrative',
  'E) Language Certificates': 'catLanguage',
};
