import { LangCode } from './translations';
import { AppDocument } from '../types';

interface DocTranslation {
  title: string;
  description: string;
  templates?: { name: string; language: string }[];
}

type DocTranslationMap = Record<string, DocTranslation>;

// ── German translations ────────────────────────────────────────────────────────
const de: DocTranslationMap = {
  'birth-cert': {
    title: 'Geburtsurkunde',
    description:
      'Eine offizielle Geburtsurkunde, ausgestellt vom Standesamt Ihres Geburtslandes. Muss vollständigen Namen, Geburtsdatum, Geburtsort sowie die Namen der Eltern enthalten. Falls nicht auf Deutsch, ist eine beglaubigte Übersetzung erforderlich.',
    templates: [
      { name: 'Anschreiben-Vorlage', language: 'Deutsch' },
      { name: 'Übersetzungsanforderungsformular', language: 'Deutsch / Englisch' },
    ],
  },
  'passport': {
    title: 'Reisepass',
    description:
      'Ein gültiger Reisepass oder nationaler Personalausweis. Muss für die gesamte Dauer des Approbationsverfahrens gültig sein. Reichen Sie einen farbigen Scan der Datenseite mit Lichtbild ein.',
  },
  'name-change': {
    title: 'Nachweis der Namensänderung',
    description:
      'Falls sich Ihr Name geändert hat (z. B. durch Heirat oder Gerichtsbeschluss), müssen Sie das offizielle Dokument zum Nachweis der Namensänderung einreichen. Dies stellt die Namensübereinstimmung in allen eingereichten Unterlagen sicher.',
    templates: [
      { name: 'Erklärung zur Namensübereinstimmung', language: 'Deutsch' },
    ],
  },
  'cv-signed': {
    title: 'Unterzeichneter Lebenslauf',
    description:
      'Ein vollständiger, chronologischer Lebenslauf, der alle Ausbildungs- und Beschäftigungszeiträume lückenlos abdeckt. Muss handschriftlich unterzeichnet und datiert sein. Jede unerklärte Lücke von mehr als einem Monat muss begründet werden. Falls nicht auf Deutsch verfasst, ist eine Übersetzung erforderlich.',
  },
  'diploma': {
    title: 'Diplom / Medizinischer Abschluss',
    description:
      'Ihr originales medizinisches Diplom (Arztdiplom oder gleichwertig), verliehen von einer anerkannten Universität. Das Dokument muss das Studienfach (Medizin), die ausstellende Institution und Ihren vollständigen Namen angeben. Eine beglaubigte deutsche Übersetzung ist erforderlich, wenn das Original nicht auf Deutsch ist.',
    templates: [
      { name: 'Antrag auf Anerkennung des Abschlusses', language: 'Deutsch' },
    ],
  },
  'arbeitszeugnis': {
    title: 'Nachweis der praktischen Ausbildung',
    description:
      'Dokumentation, die den Abschluss Ihrer praktischen Ausbildung bestätigt (z. B. klinisches Praktikum oder Facharztweiterbildung). Muss Dauer, Einrichtung und Bestätigung des Vorgesetzten enthalten. Entspricht dem deutschen „Famulaturbescheinigung"- oder „Praktisches-Jahr"-Zeugnis.',
    templates: [
      { name: 'Vorlage für die Zusammenfassung der praktischen Ausbildung', language: 'Deutsch / Englisch' },
    ],
  },
  'curriculum': {
    title: 'Akademische Notenübersicht',
    description:
      'Offizielles Notenblatt mit allen absolvierten Kursen, Noten und Kreditstunden. Muss vom Studienbüro Ihrer Universität ausgestellt sein und ein offizielles Siegel oder einen Stempel tragen. Eine beglaubigte Übersetzung ins Deutsche ist erforderlich, wenn das Original nicht auf Deutsch oder Englisch ist.',
  },
  'promotionsurkunde': {
    title: 'Promotionsurkunde',
    description:
      'Falls Sie einen Doktortitel (Dr. med. oder gleichwertig) besitzen, reichen Sie die originale Promotionsurkunde ein. Dieses Dokument wird benötigt, damit die Behörde den akademischen Titel, den Sie in Deutschland führen möchten, überprüfen kann.',
  },
  'license': {
    title: 'Ärztliche Zulassung',
    description:
      'Aktuelle, gültige Zulassung zur Ausübung der Medizin, ausgestellt von der zuständigen Behörde in Ihrem Heimatland oder dem Land, in dem Sie zuletzt tätig waren. Muss die uneingeschränkte Berechtigung zur Berufsausübung bestätigen. Eine beglaubigte deutsche Übersetzung ist erforderlich.',
    templates: [
      { name: 'Musteranschreiben zur Zulassungsverifizierung', language: 'Deutsch / Englisch' },
    ],
  },
  'good-standing': {
    title: 'Unbedenklichkeitsbescheinigung',
    description:
      'Eine Bescheinigung der Ärztekammer oder der Zulassungsbehörde Ihres Heimatlandes, die bestätigt, dass Ihre Zulassung in gutem Stand ist und Sie keinen Disziplinarmaßnahmen unterworfen wurden. Darf zum Zeitpunkt der Einreichung nicht älter als 3 Monate sein.',
    templates: [
      { name: 'Vorlage für die Anforderung einer Unbedenklichkeitsbescheinigung', language: 'Englisch' },
    ],
  },
  'antrag-approbation': {
    title: 'Approbationsantrag',
    description:
      'Das offizielle Antragsformular für die Approbation (Antrag auf Erteilung der Approbation als Arzt/Ärztin). Muss vollständig ausgefüllt, unterzeichnet und datiert sein. Das Formular wird von der jeweiligen Landesbehörde (Landesgesundheitsbehörde) bereitgestellt.',
    templates: [
      { name: 'Approbationsantrag (Niedersachsen)', language: 'Deutsch' },
      { name: 'Approbationsantrag (Bayern)', language: 'Deutsch' },
      { name: 'Approbationsantrag (NRW)', language: 'Deutsch' },
    ],
  },
  'nachweis-zustaendigkeit': {
    title: 'Zuständigkeitsnachweis',
    description:
      'Dokumentation, die die zuständige Behörde (Approbationsbehörde) bestätigt, die für die Bearbeitung Ihres Antrags verantwortlich ist. Die Zuständigkeit richtet sich nach Ihrem gemeldeten Wohnsitz in Deutschland. Reichen Sie einen Meldenachweis oder eine Arbeitgeberbestätigung ein.',
  },
  'meldebescheinigung': {
    title: 'Meldebescheinigung',
    description:
      'Eine vom örtlichen Einwohnermeldeamt ausgestellte Meldebescheinigung, die Ihre gemeldete Anschrift in Deutschland bestätigt. Darf nicht älter als 3 Monate sein.',
  },
  'eu-fuehrungszeugnis': {
    title: 'EU-Führungszeugnis',
    description:
      'Ein EU-Führungszeugnis aus dem Deutschen Bundeszentralregister, das beim örtlichen Bürgeramt beantragt wird. Erforderlich zum Nachweis, dass in Deutschland keine Vorstrafen vorliegen. Darf nicht älter als 3 Monate sein.',
    templates: [
      { name: 'Antrag auf Führungszeugnis', language: 'Deutsch' },
    ],
  },
  'heimat-fuehrungszeugnis': {
    title: 'Polizeiliches Führungszeugnis aus dem Heimatland',
    description:
      'Ein offizielles polizeiliches Führungszeugnis aus Ihrem Heimatland (oder einem früheren Wohnsitzland). Muss von der zuständigen Behörde ausgestellt und mit einer beglaubigten deutschen Übersetzung versehen sein. Darf nicht älter als 3 Monate sein.',
  },
  'aerztliche-bescheinigung': {
    title: 'Ärztliche Gesundheitsbescheinigung',
    description:
      'Eine Bescheinigung eines approbierten Arztes, die bestätigt, dass Sie körperlich und geistig in der Lage sind, die Medizin auszuüben. Muss von einem deutschen Arzt ausgestellt sein und bestätigen, dass keine gesundheitlichen Gründe vorliegen, die die Berufsausübung verhindern (ärztliche Bescheinigung über die gesundheitliche Eignung).',
    templates: [
      { name: 'Vorlage für die Gesundheitsbescheinigung', language: 'Deutsch' },
    ],
  },
  'b2-cert': {
    title: 'Deutsches Sprachzertifikat B2',
    description:
      'Nachweis der deutschen Sprachkenntnisse auf B2-Niveau (GER) oder höher, ausgestellt von einer anerkannten Institution wie dem Goethe-Institut, telc, TestDaF oder ÖSD. Das Zertifikat muss von der jeweiligen Approbationsbehörde offiziell anerkannt sein.',
    templates: [
      { name: 'Liste anerkannter Sprachinstitute', language: 'Deutsch' },
    ],
  },
  'fsp-cert': {
    title: 'Fachsprachenprüfung (FSP)',
    description:
      'Die Fachsprachenprüfung (FSP) ist eine medizinische Deutschprüfung, die von der jeweiligen Landesärztekammer durchgeführt wird. Sie bewertet die Arzt-Patienten-Kommunikation, medizinische Dokumentation und Fachterminologie. Diese Prüfung ist für Nicht-EU-Bewerber verpflichtend und wird häufig auch für EU-Bewerber verlangt.',
    templates: [
      { name: 'FSP-Anmeldeformular', language: 'Deutsch' },
      { name: 'FSP-Vorbereitungsleitfaden', language: 'Deutsch / Englisch' },
    ],
  },
};

// ── Translation registry ───────────────────────────────────────────────────────
const allDocTranslations: Partial<Record<LangCode, DocTranslationMap>> = { de };

/**
 * Returns a copy of `doc` with title, description, and templates replaced by
 * the translation for `lang`. Falls back to the original values if no
 * translation exists for that language or document id.
 */
export function getTranslatedDocument(doc: AppDocument, lang: LangCode): AppDocument {
  const langMap = allDocTranslations[lang];
  if (!langMap) return doc;
  const trans = langMap[doc.id];
  if (!trans) return doc;
  return {
    ...doc,
    title: trans.title,
    description: trans.description,
    templates: trans.templates ?? doc.templates,
  };
}
