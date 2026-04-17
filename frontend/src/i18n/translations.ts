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
  checklistAIPassed: string;
  checklistAIFailed: string;
  docNotFound: string;
  docNotFoundHint: string;
  backToDocuments: string;

  // Tabs
  tabPreparationTimeline: string;

  // Timeline phases
  phase1Label: string;
  phase1Sublabel: string;
  phase2Label: string;
  phase2Sublabel: string;
  phase3Label: string;
  phase3Sublabel: string;
  phase4Label: string;
  phase4Sublabel: string;

  // Time units & badges
  dayUnit: string;
  daysUnit: string;
  weeksUnit: string;
  prepTimeLabel: string;
  validForLabel: string;
  prereqLabel: string;
  prereqsLabel: string;

  // Preparation Overview (DocumentDetailPage)
  prepOverviewTitle: string;
  howToObtainLabel: string;
  requiresFirstLabel: string;
  alsoRequiredForLabel: string;
  stepByStepBtn: string;

  // TimelinePage
  timelinePageSubtitle: string;
  docLabel: string;
  docsLabel: string;
  submissionNotSubmitted: string;
  submissionSubmitted: string;
  submissionDone: string;

  // DocumentDetailPage — Useful Links
  usefulLinksTitle: string;

  // DocumentGuidelinesPage (step-by-step)
  guideBackTo: string;
  guideHowToFill: string;
  guideSubtitle: string;
  guideExplainIn: string;
  guideUploadForm: string;
  guideDragDrop: string;
  guideChooseFile: string;
  guideReadyToGenerate: string;
  guideAnalyzing: string;
  guideGenerateBtn: string;
  guideChangeFile: string;
  guideStepsLabel: string;
  guidePrevious: string;
  guideNext: string;
  guidePage: string;
  guideOf: string;
  guideStepsOnPage: string;
  guidePageChecklist: string;
  guideDoneOnPage: string;
  guideNoAction: string;
  guidePrevPage: string;
  guideNextPage: string;
  guideDifferentFile: string;
  guideWhatItMeans: string;
  guideWhereToFind: string;
  guidePrepare: string;
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
  checklistAI: 'AI analysis',
  checklistAIPassed: 'AI analysis passed',
  checklistAIFailed: 'AI analysis failed',
  docNotFound: 'Document Not Found',
  docNotFoundHint: 'The document you are looking for does not exist.',
  backToDocuments: 'Back to Documents',

  tabPreparationTimeline: 'Preparation Timeline',
  phase1Label: 'Start Immediately',
  phase1Sublabel: 'Long lead time — request these first',
  phase2Label: 'Schedule Early',
  phase2Sublabel: '2–4 months before submission',
  phase3Label: 'Last 3 Months',
  phase3Sublabel: 'Time-sensitive — obtain close to submission',
  phase4Label: 'Compile & Submit',
  phase4Sublabel: 'Fill in the application when all docs are ready',

  dayUnit: 'day',
  daysUnit: 'days',
  weeksUnit: 'weeks',
  prepTimeLabel: 'Prep time:',
  validForLabel: 'Valid for:',
  prereqLabel: 'prereq',
  prereqsLabel: 'prereqs',

  prepOverviewTitle: 'Preparation Overview',
  howToObtainLabel: 'How to Obtain',
  requiresFirstLabel: 'Requires First',
  alsoRequiredForLabel: 'Also Required For',
  stepByStepBtn: 'For step-by-step instructions on your specific document click here.',

  timelinePageSubtitle: 'Your step-by-step roadmap to Approbation — organized by priority and preparation time.',
  docLabel: 'doc',
  docsLabel: 'docs',
  submissionNotSubmitted: 'Not Submitted',
  submissionSubmitted: 'Submitted',
  submissionDone: 'Done',

  usefulLinksTitle: 'Useful Links',

  guideBackTo: 'Back to',
  guideHowToFill: 'How to Fill:',
  guideSubtitle: 'Upload the empty form and get a step-by-step guide for every page.',
  guideExplainIn: 'Explain in:',
  guideUploadForm: 'Upload the empty form',
  guideDragDrop: 'Drag & drop a PDF or image, or click to browse',
  guideChooseFile: 'Choose File',
  guideReadyToGenerate: 'Ready to generate guide in',
  guideAnalyzing: 'Analyzing document…',
  guideGenerateBtn: 'Generate Guide',
  guideChangeFile: 'Change file',
  guideStepsLabel: 'steps',
  guidePrevious: 'Previous',
  guideNext: 'Next',
  guidePage: 'Page',
  guideOf: 'of',
  guideStepsOnPage: 'steps on this page',
  guidePageChecklist: 'checklist',
  guideDoneOnPage: 'done on this page',
  guideNoAction: 'No action required on this page.',
  guidePrevPage: 'Prev page',
  guideNextPage: 'Next page',
  guideDifferentFile: 'Upload a different file',
  guideWhatItMeans: 'What it means',
  guideWhereToFind: 'Where to find it',
  guidePrepare: 'Prepare:',
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
  checklistAI: 'KI-Analyse',
  checklistAIPassed: 'KI-Analyse bestanden',
  checklistAIFailed: 'KI-Analyse fehlgeschlagen',
  docNotFound: 'Dokument nicht gefunden',
  docNotFoundHint: 'Das gesuchte Dokument existiert nicht.',
  backToDocuments: 'Zurück zu den Dokumenten',

  tabPreparationTimeline: 'Vorbereitungs-Timeline',
  phase1Label: 'Sofort beginnen',
  phase1Sublabel: 'Lange Vorlaufzeit — diese zuerst beantragen',
  phase2Label: 'Frühzeitig planen',
  phase2Sublabel: '2–4 Monate vor Einreichung',
  phase3Label: 'Letzte 3 Monate',
  phase3Sublabel: 'Zeitkritisch — kurz vor Einreichung besorgen',
  phase4Label: 'Zusammenstellen & Einreichen',
  phase4Sublabel: 'Antrag ausfüllen, wenn alle Unterlagen bereit sind',

  dayUnit: 'Tag',
  daysUnit: 'Tage',
  weeksUnit: 'Wochen',
  prepTimeLabel: 'Vorbereitungszeit:',
  validForLabel: 'Gültig für:',
  prereqLabel: 'Voraussetzung',
  prereqsLabel: 'Voraussetzungen',

  prepOverviewTitle: 'Vorbereitungsübersicht',
  howToObtainLabel: 'So erhalten Sie es',
  requiresFirstLabel: 'Zuerst erforderlich',
  alsoRequiredForLabel: 'Auch erforderlich für',
  stepByStepBtn: 'Klicken Sie hier für Schritt-für-Schritt-Anleitungen zu Ihrem Dokument.',

  timelinePageSubtitle: 'Ihr Schritt-für-Schritt-Fahrplan zur Approbation — geordnet nach Priorität und Vorbereitungszeit.',
  docLabel: 'Dokument',
  docsLabel: 'Dokumente',
  submissionNotSubmitted: 'Nicht eingereicht',
  submissionSubmitted: 'Eingereicht',
  submissionDone: 'Erledigt',

  usefulLinksTitle: 'Nützliche Links',

  guideBackTo: 'Zurück zu',
  guideHowToFill: 'Ausfüllhilfe:',
  guideSubtitle: 'Laden Sie das leere Formular hoch und erhalten Sie eine Schritt-für-Schritt-Anleitung für jede Seite.',
  guideExplainIn: 'Erklärung auf:',
  guideUploadForm: 'Leeres Formular hochladen',
  guideDragDrop: 'PDF oder Bild hierher ziehen oder zum Durchsuchen klicken',
  guideChooseFile: 'Datei auswählen',
  guideReadyToGenerate: 'Bereit zur Erstellung der Anleitung auf',
  guideAnalyzing: 'Dokument wird analysiert…',
  guideGenerateBtn: 'Anleitung erstellen',
  guideChangeFile: 'Datei ändern',
  guideStepsLabel: 'Schritte',
  guidePrevious: 'Zurück',
  guideNext: 'Weiter',
  guidePage: 'Seite',
  guideOf: 'von',
  guideStepsOnPage: 'Schritte auf dieser Seite',
  guidePageChecklist: 'Checkliste',
  guideDoneOnPage: 'erledigt auf dieser Seite',
  guideNoAction: 'Auf dieser Seite sind keine Aktionen erforderlich.',
  guidePrevPage: 'Vorherige Seite',
  guideNextPage: 'Nächste Seite',
  guideDifferentFile: 'Andere Datei hochladen',
  guideWhatItMeans: 'Was es bedeutet',
  guideWhereToFind: 'Wo Sie es finden',
  guidePrepare: 'Vorbereiten:',
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
  checklistAI: 'Analyse IA',
  checklistAIPassed: 'Analyse IA réussie',
  checklistAIFailed: 'Analyse IA échouée',
  docNotFound: 'Document introuvable',
  docNotFoundHint: "Le document que vous recherchez n'existe pas.",
  backToDocuments: 'Retour aux documents',

  tabPreparationTimeline: 'Calendrier de préparation',
  phase1Label: 'Commencer immédiatement',
  phase1Sublabel: 'Long délai — demandez ces documents en premier',
  phase2Label: 'Planifier tôt',
  phase2Sublabel: '2–4 mois avant la soumission',
  phase3Label: '3 derniers mois',
  phase3Sublabel: 'Sensible au temps — obtenez-les près de la soumission',
  phase4Label: 'Compiler et soumettre',
  phase4Sublabel: 'Remplir la demande quand tous les docs sont prêts',

  dayUnit: 'jour',
  daysUnit: 'jours',
  weeksUnit: 'semaines',
  prepTimeLabel: 'Temps de préparation :',
  validForLabel: 'Valable pour :',
  prereqLabel: 'prérequis',
  prereqsLabel: 'prérequis',

  prepOverviewTitle: 'Aperçu de la préparation',
  howToObtainLabel: 'Comment obtenir',
  requiresFirstLabel: 'Nécessite d\'abord',
  alsoRequiredForLabel: 'Également requis pour',
  stepByStepBtn: 'Cliquez ici pour des instructions pas à pas sur votre document spécifique.',

  timelinePageSubtitle: 'Votre feuille de route étape par étape vers l\'Approbation — organisée par priorité et temps de préparation.',
  docLabel: 'document',
  docsLabel: 'documents',
  submissionNotSubmitted: 'Non soumis',
  submissionSubmitted: 'Soumis',
  submissionDone: 'Terminé',

  usefulLinksTitle: 'Liens utiles',

  guideBackTo: 'Retour à',
  guideHowToFill: 'Comment remplir :',
  guideSubtitle: 'Téléchargez le formulaire vide et obtenez un guide étape par étape pour chaque page.',
  guideExplainIn: 'Expliquer en :',
  guideUploadForm: 'Télécharger le formulaire vide',
  guideDragDrop: 'Glissez-déposez un PDF ou une image, ou cliquez pour parcourir',
  guideChooseFile: 'Choisir un fichier',
  guideReadyToGenerate: 'Prêt à générer le guide en',
  guideAnalyzing: 'Analyse du document…',
  guideGenerateBtn: 'Générer le guide',
  guideChangeFile: 'Changer de fichier',
  guideStepsLabel: 'étapes',
  guidePrevious: 'Précédent',
  guideNext: 'Suivant',
  guidePage: 'Page',
  guideOf: 'sur',
  guideStepsOnPage: 'étapes sur cette page',
  guidePageChecklist: 'liste de contrôle',
  guideDoneOnPage: 'terminé sur cette page',
  guideNoAction: 'Aucune action requise sur cette page.',
  guidePrevPage: 'Page précédente',
  guideNextPage: 'Page suivante',
  guideDifferentFile: 'Télécharger un autre fichier',
  guideWhatItMeans: 'Ce que ça signifie',
  guideWhereToFind: 'Où le trouver',
  guidePrepare: 'Préparer :',
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
  checklistAI: 'Yapay Zeka analizi',
  checklistAIPassed: 'Yapay Zeka analizi geçti',
  checklistAIFailed: 'Yapay Zeka analizi başarısız',
  docNotFound: 'Belge Bulunamadı',
  docNotFoundHint: 'Aradığınız belge mevcut değil.',
  backToDocuments: 'Belgelere Dön',

  tabPreparationTimeline: 'Hazırlık Zaman Çizelgesi',
  phase1Label: 'Hemen Başla',
  phase1Sublabel: 'Uzun süre gerektiriyor — önce bunları talep edin',
  phase2Label: 'Erken Planla',
  phase2Sublabel: 'Başvurudan 2–4 ay önce',
  phase3Label: 'Son 3 Ay',
  phase3Sublabel: 'Zamana duyarlı — başvuruya yakın temin edin',
  phase4Label: 'Derle ve Başvur',
  phase4Sublabel: 'Tüm belgeler hazır olduğunda başvuruyu doldur',

  dayUnit: 'gün',
  daysUnit: 'gün',
  weeksUnit: 'hafta',
  prepTimeLabel: 'Hazırlık süresi:',
  validForLabel: 'Geçerlilik:',
  prereqLabel: 'önkoşul',
  prereqsLabel: 'önkoşul',

  prepOverviewTitle: 'Hazırlık Genel Bakış',
  howToObtainLabel: 'Nasıl Edinilir',
  requiresFirstLabel: 'Önce Gerekli',
  alsoRequiredForLabel: 'Aynı Zamanda Gerekli',
  stepByStepBtn: 'Belgenize özel adım adım talimatlar için buraya tıklayın.',

  timelinePageSubtitle: 'Approbation\'a giden adım adım yol haritanız — öncelik ve hazırlık süresine göre düzenlenmiştir.',
  docLabel: 'belge',
  docsLabel: 'belge',
  submissionNotSubmitted: 'Gönderilmedi',
  submissionSubmitted: 'Gönderildi',
  submissionDone: 'Tamamlandı',

  usefulLinksTitle: 'Faydalı Bağlantılar',

  guideBackTo: 'Geri dön:',
  guideHowToFill: 'Nasıl Doldurulur:',
  guideSubtitle: 'Boş formu yükleyin ve her sayfa için adım adım kılavuz alın.',
  guideExplainIn: 'Şu dilde açıkla:',
  guideUploadForm: 'Boş formu yükle',
  guideDragDrop: 'PDF veya resim sürükleyin ya da tıklayarak seçin',
  guideChooseFile: 'Dosya Seç',
  guideReadyToGenerate: 'Kılavuz oluşturmaya hazır:',
  guideAnalyzing: 'Belge analiz ediliyor…',
  guideGenerateBtn: 'Kılavuz Oluştur',
  guideChangeFile: 'Dosyayı değiştir',
  guideStepsLabel: 'adım',
  guidePrevious: 'Önceki',
  guideNext: 'Sonraki',
  guidePage: 'Sayfa',
  guideOf: '/',
  guideStepsOnPage: 'bu sayfadaki adım',
  guidePageChecklist: 'kontrol listesi',
  guideDoneOnPage: 'bu sayfada tamamlandı',
  guideNoAction: 'Bu sayfada herhangi bir işlem gerekmemektedir.',
  guidePrevPage: 'Önceki sayfa',
  guideNextPage: 'Sonraki sayfa',
  guideDifferentFile: 'Farklı dosya yükle',
  guideWhatItMeans: 'Ne anlama gelir',
  guideWhereToFind: 'Nerede bulunur',
  guidePrepare: 'Hazırla:',
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
  checklistAI: 'Análisis de IA',
  checklistAIPassed: 'Análisis de IA aprobado',
  checklistAIFailed: 'Análisis de IA fallido',
  docNotFound: 'Documento no encontrado',
  docNotFoundHint: 'El documento que busca no existe.',
  backToDocuments: 'Volver a documentos',

  tabPreparationTimeline: 'Cronograma de preparación',
  phase1Label: 'Comenzar de inmediato',
  phase1Sublabel: 'Largo plazo — solicitar primero',
  phase2Label: 'Planificar con antelación',
  phase2Sublabel: '2–4 meses antes de la presentación',
  phase3Label: 'Últimos 3 meses',
  phase3Sublabel: 'Urgente — obtener cerca de la presentación',
  phase4Label: 'Compilar y presentar',
  phase4Sublabel: 'Completar la solicitud cuando todos los docs estén listos',

  dayUnit: 'día',
  daysUnit: 'días',
  weeksUnit: 'semanas',
  prepTimeLabel: 'Tiempo de preparación:',
  validForLabel: 'Válido por:',
  prereqLabel: 'requisito',
  prereqsLabel: 'requisitos',

  prepOverviewTitle: 'Resumen de preparación',
  howToObtainLabel: 'Cómo obtenerlo',
  requiresFirstLabel: 'Requiere primero',
  alsoRequiredForLabel: 'También requerido para',
  stepByStepBtn: 'Haga clic aquí para instrucciones paso a paso sobre su documento específico.',

  timelinePageSubtitle: 'Su hoja de ruta paso a paso hacia la Approbation — organizada por prioridad y tiempo de preparación.',
  docLabel: 'documento',
  docsLabel: 'documentos',
  submissionNotSubmitted: 'No enviado',
  submissionSubmitted: 'Enviado',
  submissionDone: 'Listo',

  usefulLinksTitle: 'Enlaces útiles',

  guideBackTo: 'Volver a',
  guideHowToFill: 'Cómo rellenar:',
  guideSubtitle: 'Sube el formulario vacío y obtén una guía paso a paso para cada página.',
  guideExplainIn: 'Explicar en:',
  guideUploadForm: 'Subir el formulario vacío',
  guideDragDrop: 'Arrastra un PDF o imagen, o haz clic para buscar',
  guideChooseFile: 'Elegir archivo',
  guideReadyToGenerate: 'Listo para generar la guía en',
  guideAnalyzing: 'Analizando documento…',
  guideGenerateBtn: 'Generar guía',
  guideChangeFile: 'Cambiar archivo',
  guideStepsLabel: 'pasos',
  guidePrevious: 'Anterior',
  guideNext: 'Siguiente',
  guidePage: 'Página',
  guideOf: 'de',
  guideStepsOnPage: 'pasos en esta página',
  guidePageChecklist: 'lista de verificación',
  guideDoneOnPage: 'hecho en esta página',
  guideNoAction: 'No se requiere ninguna acción en esta página.',
  guidePrevPage: 'Página anterior',
  guideNextPage: 'Página siguiente',
  guideDifferentFile: 'Subir un archivo diferente',
  guideWhatItMeans: 'Qué significa',
  guideWhereToFind: 'Dónde encontrarlo',
  guidePrepare: 'Preparar:',
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
  checklistAI: 'تحليل الذكاء الاصطناعي',
  checklistAIPassed: 'نجح تحليل الذكاء الاصطناعي',
  checklistAIFailed: 'فشل تحليل الذكاء الاصطناعي',
  docNotFound: 'المستند غير موجود',
  docNotFoundHint: 'المستند الذي تبحث عنه غير موجود.',
  backToDocuments: 'العودة إلى المستندات',

  tabPreparationTimeline: 'الجدول الزمني للتحضير',
  phase1Label: 'ابدأ فوراً',
  phase1Sublabel: 'وقت طويل — اطلب هذه المستندات أولاً',
  phase2Label: 'خطط مبكراً',
  phase2Sublabel: '2–4 أشهر قبل التقديم',
  phase3Label: 'آخر 3 أشهر',
  phase3Sublabel: 'حساس للوقت — احصل عليها قرب التقديم',
  phase4Label: 'اجمع وقدّم',
  phase4Sublabel: 'أكمل الطلب عندما تكون جميع المستندات جاهزة',

  dayUnit: 'يوم',
  daysUnit: 'أيام',
  weeksUnit: 'أسابيع',
  prepTimeLabel: 'وقت التحضير:',
  validForLabel: 'صالح لمدة:',
  prereqLabel: 'شرط مسبق',
  prereqsLabel: 'شروط مسبقة',

  prepOverviewTitle: 'نظرة عامة على التحضير',
  howToObtainLabel: 'كيفية الحصول عليه',
  requiresFirstLabel: 'يتطلب أولاً',
  alsoRequiredForLabel: 'مطلوب أيضاً لـ',
  stepByStepBtn: 'انقر هنا للحصول على تعليمات خطوة بخطوة حول مستندك المحدد.',

  timelinePageSubtitle: 'خارطة طريقك خطوة بخطوة نحو الاعتماد الطبي — مرتبة حسب الأولوية ووقت التحضير.',
  docLabel: 'مستند',
  docsLabel: 'مستندات',
  submissionNotSubmitted: 'لم يُقدَّم',
  submissionSubmitted: 'تم التقديم',
  submissionDone: 'مكتمل',

  usefulLinksTitle: 'روابط مفيدة',

  guideBackTo: 'العودة إلى',
  guideHowToFill: 'كيفية تعبئة:',
  guideSubtitle: 'ارفع النموذج الفارغ واحصل على دليل خطوة بخطوة لكل صفحة.',
  guideExplainIn: 'شرح بـ:',
  guideUploadForm: 'رفع النموذج الفارغ',
  guideDragDrop: 'اسحب وأفلت ملف PDF أو صورة، أو انقر للتصفح',
  guideChooseFile: 'اختر ملفاً',
  guideReadyToGenerate: 'جاهز لإنشاء الدليل بـ',
  guideAnalyzing: 'جارٍ تحليل المستند…',
  guideGenerateBtn: 'إنشاء الدليل',
  guideChangeFile: 'تغيير الملف',
  guideStepsLabel: 'خطوات',
  guidePrevious: 'السابق',
  guideNext: 'التالي',
  guidePage: 'صفحة',
  guideOf: 'من',
  guideStepsOnPage: 'خطوات في هذه الصفحة',
  guidePageChecklist: 'قائمة التحقق',
  guideDoneOnPage: 'تم في هذه الصفحة',
  guideNoAction: 'لا يوجد إجراء مطلوب في هذه الصفحة.',
  guidePrevPage: 'الصفحة السابقة',
  guideNextPage: 'الصفحة التالية',
  guideDifferentFile: 'رفع ملف مختلف',
  guideWhatItMeans: 'ماذا يعني',
  guideWhereToFind: 'أين تجده',
  guidePrepare: 'تحضير:',
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
