import { LangCode } from './translations';
import { AppDocument } from '../types';

interface DocTranslation {
  title: string;
  description: string;
  templates?: { name: string; language: string }[];
  howToGet?: string;
  usefulLinks?: { label: string; description: string }[];
}

type DocTranslationMap = Record<string, DocTranslation>;

// ── German translations ────────────────────────────────────────────────────────
const de: DocTranslationMap = {
  'birth-cert': {
    title: 'Geburtsurkunde',
    howToGet: 'Beantragen Sie eine beglaubigte Kopie beim Standesamt Ihres Geburtslandes. Möglicherweise ist eine Apostille erforderlich. Eine beglaubigte deutsche Übersetzung durch einen vereidigten Übersetzer ist Pflicht, wenn das Original nicht auf Deutsch ist. Internationale Anfragen können 4–8 Wochen dauern.',
    description:
      'Eine offizielle Geburtsurkunde, ausgestellt vom Standesamt Ihres Geburtslandes. Muss vollständigen Namen, Geburtsdatum, Geburtsort sowie die Namen der Eltern enthalten. Falls nicht auf Deutsch, ist eine beglaubigte Übersetzung erforderlich.',
    templates: [
      { name: 'Anschreiben-Vorlage', language: 'Deutsch' },
      { name: 'Übersetzungsanforderungsformular', language: 'Deutsch / Englisch' },
    ],
    usefulLinks: [
      { label: 'Apostillen-Informationen (Haager Konferenz)', description: 'Prüfen Sie, ob Ihr Land eine Apostille für ausländische Dokumente benötigt.' },
      { label: 'Verzeichnis beeidigter Übersetzer (BDÜ)', description: 'Finden Sie einen vereidigten deutschen Übersetzer für Ihre Geburtsurkunde.' },
      { label: 'NiZzA-Dokumentenanforderungen', description: 'Offizielle NiZzA-Checkliste für Approbationsunterlagen.' },
    ],
  },
  'passport': {
    title: 'Reisepass',
    howToGet: 'Scannen Sie die Datenseite (Lichtbildseite) Ihres aktuell gültigen Reisepasses oder EU-Personalausweises in Farbe. Stellen Sie sicher, dass die gesamte Seite sichtbar und der Text lesbar ist. Keine Übersetzung erforderlich.',
    description:
      'Ein gültiger Reisepass oder nationaler Personalausweis. Muss für die gesamte Dauer des Approbationsverfahrens gültig sein. Reichen Sie einen farbigen Scan der Datenseite mit Lichtbild ein.',
    usefulLinks: [
      { label: 'Deutsche Botschaft finden', description: 'Finden Sie die deutsche Botschaft oder das Konsulat in Ihrem Land.' },
      { label: 'EU-Pass / Personalausweisanforderungen', description: 'EU-Regelungen für Reisedokumente und Personalausweise.' },
    ],
  },
  'name-change': {
    title: 'Nachweis der Namensänderung',
    howToGet: 'Beschaffen Sie das offizielle Dokument über die Namensänderung bei der zuständigen Behörde (z. B. Heiratsurkunde vom Standesamt, Gerichtsbeschluss). Eine beglaubigte deutsche Übersetzung ist erforderlich, wenn das Dokument nicht auf Deutsch ist. Für ausländische Dokumente sollten Sie 3–6 Wochen einplanen.',
    description:
      'Falls sich Ihr Name geändert hat (z. B. durch Heirat oder Gerichtsbeschluss), müssen Sie das offizielle Dokument zum Nachweis der Namensänderung einreichen. Dies stellt die Namensübereinstimmung in allen eingereichten Unterlagen sicher.',
    templates: [
      { name: 'Erklärung zur Namensübereinstimmung', language: 'Deutsch' },
    ],
    usefulLinks: [
      { label: 'Apostille & Beglaubigungsleitfaden', description: 'Wie Sie ausländische Personenstandsdokumente für die Verwendung in Deutschland legalisieren.' },
      { label: 'NiZzA-Dokumentenanforderungen', description: 'Offizielle Checkliste einschließlich Nachweis der Namensänderung.' },
    ],
  },
  'cv-signed': {
    title: 'Unterzeichneter Lebenslauf',
    howToGet: 'Verfassen Sie den Lebenslauf selbst auf Deutsch (oder lassen Sie ihn von einem vereidigten Übersetzer übersetzen). Er muss in tabellarischer, chronologischer Form vorliegen, alle Zeiträume von der Geburt bis heute lückenlos abdecken, handschriftlich unterzeichnet und datiert sein. Jede Lücke von mehr als einem Monat muss begründet werden.',
    description:
      'Ein vollständiger, chronologischer Lebenslauf, der alle Ausbildungs- und Beschäftigungszeiträume lückenlos abdeckt. Muss handschriftlich unterzeichnet und datiert sein. Jede unerklärte Lücke von mehr als einem Monat muss begründet werden. Falls nicht auf Deutsch verfasst, ist eine Übersetzung erforderlich.',
    usefulLinks: [
      { label: 'BAMF-Lebenslaufvorlage', description: 'Deutsche Lebenslaufvorlage, die von Behörden akzeptiert wird.' },
      { label: 'NiZzA-Lebenslaufanforderungen', description: 'Spezifische Anforderungen an den Lebenslauf im Approbationsverfahren.' },
    ],
  },
  'diploma': {
    title: 'Diplom / Medizinischer Abschluss',
    howToGet: 'Beantragen Sie eine notariell beglaubigte Kopie beim Studienbüro Ihrer Universität. Reichen Sie eine beglaubigte deutsche Übersetzung durch einen vereidigten Übersetzer ein. Für Nicht-EU-Abschlüsse kann zusätzlich ein EU-Konformitätszertifikat des Ausstellerlandes erforderlich sein. Internationale Anfragen können 4–8 Wochen dauern.',
    description:
      'Ihr originales medizinisches Diplom (Arztdiplom oder gleichwertig), verliehen von einer anerkannten Universität. Das Dokument muss das Studienfach (Medizin), die ausstellende Institution und Ihren vollständigen Namen angeben. Eine beglaubigte deutsche Übersetzung ist erforderlich, wenn das Original nicht auf Deutsch ist.',
    templates: [
      { name: 'Antrag auf Anerkennung des Abschlusses', language: 'Deutsch' },
    ],
    usefulLinks: [
      { label: 'anabin – Datenbank ausländischer Qualifikationen', description: 'Prüfen Sie, wie Ihr Abschluss in Deutschland eingestuft wird.' },
      { label: 'KMK-Anerkennung ausländischer Abschlüsse', description: 'Offizielles KMK-Portal für Informationen zur Abschlussanerkennung.' },
      { label: 'NiZzA – Erforderliche Bildungsnachweise', description: 'Was als Nachweis der medizinischen Ausbildung bei der NiZzA gilt.' },
    ],
  },
  'arbeitszeugnis': {
    title: 'Nachweis der praktischen Ausbildung',
    howToGet: 'Beantragen Sie das Zeugnis beim Krankenhaus oder der Klinik, in der Sie die Ausbildung absolviert haben. Es muss Zeitraum, Einrichtung und Vorgesetzten bestätigen. Eine beglaubigte deutsche Übersetzung ist erforderlich, wenn es nicht auf Deutsch ist. Einplanen: 3–5 Wochen.',
    description:
      'Dokumentation, die den Abschluss Ihrer praktischen Ausbildung bestätigt (z. B. klinisches Praktikum oder Facharztweiterbildung). Muss Dauer, Einrichtung und Bestätigung des Vorgesetzten enthalten. Entspricht dem deutschen „Famulaturbescheinigung"- oder „Praktisches-Jahr"-Zeugnis.',
    templates: [
      { name: 'Vorlage für die Zusammenfassung der praktischen Ausbildung', language: 'Deutsch / Englisch' },
    ],
    usefulLinks: [
      { label: 'NiZzA-Anforderungen an die praktische Ausbildung', description: 'Was als akzeptabler Nachweis der praktischen medizinischen Ausbildung gilt.' },
    ],
  },
  'curriculum': {
    title: 'Akademische Notenübersicht',
    howToGet: 'Beantragen Sie das offizielle Notenblatt direkt beim Studienbüro Ihrer Universität. Es muss ein offizielles Siegel oder einen Stempel tragen. Eine beglaubigte deutsche Übersetzung durch einen vereidigten Übersetzer ist erforderlich, wenn es nicht auf Deutsch ist. Internationale Anfragen können 4–6 Wochen dauern.',
    description:
      'Offizielles Notenblatt mit allen absolvierten Kursen, Noten und Kreditstunden. Muss vom Studienbüro Ihrer Universität ausgestellt sein und ein offizielles Siegel oder einen Stempel tragen. Eine beglaubigte Übersetzung ins Deutsche ist erforderlich, wenn das Original nicht auf Deutsch oder Englisch ist.',
    usefulLinks: [
      { label: 'anabin – Universitätsdatenbank', description: 'Überprüfen Sie, ob Ihre Universität in Deutschland anerkannt ist.' },
      { label: 'NiZzA-Dokumenten-Checkliste', description: 'Offizielle Liste der Universitätsdokumente, die für die Approbation erforderlich sind.' },
    ],
  },
  'promotionsurkunde': {
    title: 'Promotionsurkunde',
    howToGet: 'Beantragen Sie eine beglaubigte Kopie bei der Universität, die Ihren Doktortitel verliehen hat. Eine beglaubigte deutsche Übersetzung ist erforderlich, wenn sie nicht auf Deutsch ist. Einplanen: 2–4 Wochen. Nur erforderlich, wenn Sie einen Doktortitel besitzen.',
    description:
      'Falls Sie einen Doktortitel (Dr. med. oder gleichwertig) besitzen, reichen Sie die originale Promotionsurkunde ein. Dieses Dokument wird benötigt, damit die Behörde den akademischen Titel, den Sie in Deutschland führen möchten, überprüfen kann.',
    usefulLinks: [
      { label: 'Ärztekammer Niedersachsen – Doktortitelanerkennung', description: 'Ansprechpartner für Fragen zur Anerkennung von Doktortiteln in Niedersachsen.' },
    ],
  },
  'license': {
    title: 'Ärztliche Zulassung',
    howToGet: 'Beantragen Sie eine beglaubigte aktuelle Kopie Ihrer ärztlichen Zulassung bei der zuständigen Behörde Ihres Heimatlandes. Sie muss die uneingeschränkte Berechtigung zur Berufsausübung bestätigen. Eine beglaubigte deutsche Übersetzung ist erforderlich. Einplanen: 4–6 Wochen.',
    description:
      'Aktuelle, gültige Zulassung zur Ausübung der Medizin, ausgestellt von der zuständigen Behörde in Ihrem Heimatland oder dem Land, in dem Sie zuletzt tätig waren. Muss die uneingeschränkte Berechtigung zur Berufsausübung bestätigen. Eine beglaubigte deutsche Übersetzung ist erforderlich.',
    templates: [
      { name: 'Musteranschreiben zur Zulassungsverifizierung', language: 'Deutsch / Englisch' },
    ],
    usefulLinks: [
      { label: 'Bundesärztekammer – Ärztliche Zulassung', description: 'Informationen der Bundesärztekammer zur Zulassung ausländischer Ärzte in Deutschland.' },
      { label: 'WHO iRegulate – Verzeichnis der Zulassungsbehörden', description: 'Finden Sie die ärztliche Zulassungsbehörde in Ihrem Heimatland.' },
    ],
  },
  'good-standing': {
    title: 'Unbedenklichkeitsbescheinigung',
    howToGet: 'Beantragen Sie die Bescheinigung bei der Ärztekammer oder der Zulassungsbehörde Ihres Heimatlandes. Das Dokument darf nicht älter als 3 Monate sein. Eine beglaubigte deutsche Übersetzung ist erforderlich. Einplanen: 2–4 Wochen.',
    description:
      'Eine Bescheinigung der Ärztekammer oder der Zulassungsbehörde Ihres Heimatlandes, die bestätigt, dass Ihre Zulassung in gutem Stand ist und Sie keinen Disziplinarmaßnahmen unterworfen wurden. Darf zum Zeitpunkt der Einreichung nicht älter als 3 Monate sein.',
    templates: [
      { name: 'Vorlage für die Anforderung einer Unbedenklichkeitsbescheinigung', language: 'Englisch' },
    ],
    usefulLinks: [
      { label: 'Bundesärztekammer – Vorlage Unbedenklichkeitsbescheinigung', description: 'Musterschreiben zur Anforderung einer Unbedenklichkeitsbescheinigung.' },
      { label: 'NiZzA – Unbedenklichkeitsbescheinigung', description: 'NiZzA-Anforderungen an die Unbedenklichkeitsbescheinigung.' },
    ],
  },
  'antrag-approbation': {
    title: 'Approbationsantrag',
    howToGet: 'Laden Sie das Formular der zuständigen Landesbehörde herunter (z. B. Niedersächsisches Landesgesundheitsamt). Füllen Sie es vollständig aus, unterschreiben und datieren Sie es. Reichen Sie es zusammen mit allen anderen Pflichtdokumenten ein. Bereiten Sie alles zuerst vor, reichen Sie dieses zuletzt ein.',
    description:
      'Das offizielle Antragsformular für die Approbation (Antrag auf Erteilung der Approbation als Arzt/Ärztin). Muss vollständig ausgefüllt, unterzeichnet und datiert sein. Das Formular wird von der jeweiligen Landesbehörde (Landesgesundheitsbehörde) bereitgestellt.',
    templates: [
      { name: 'Approbationsantrag (Niedersachsen)', language: 'Deutsch' },
      { name: 'Approbationsantrag (Bayern)', language: 'Deutsch' },
      { name: 'Approbationsantrag (NRW)', language: 'Deutsch' },
    ],
    usefulLinks: [
      { label: 'NiZzA – Offizielles Antragsportal', description: 'Laden Sie alle offiziellen Formulare herunter und reichen Sie Ihren Approbationsantrag ein.' },
      { label: 'NiZzA – FAQ für Antragsteller', description: 'Häufig gestellte Fragen zum Approbationsverfahren in Niedersachsen.' },
      { label: 'Bundesärztekammer – Übersicht Approbation', description: 'Bundesweite Übersicht des Approbationsverfahrens für ausländische Ärzte.' },
    ],
  },
  'nachweis-zustaendigkeit': {
    title: 'Zuständigkeitsnachweis',
    howToGet: 'Ihre zuständige Behörde wird durch Ihren gemeldeten Wohnsitz in Deutschland bestimmt. Reichen Sie Ihre Meldebescheinigung oder eine Bestätigung Ihres Arbeitgebers ein, aus der Ihr Einsatzort hervorgeht. Wenden Sie sich bei Unklarheiten direkt an die Approbationsbehörde.',
    description:
      'Dokumentation, die die zuständige Behörde (Approbationsbehörde) bestätigt, die für die Bearbeitung Ihres Antrags verantwortlich ist. Die Zuständigkeit richtet sich nach Ihrem gemeldeten Wohnsitz in Deutschland. Reichen Sie einen Meldenachweis oder eine Arbeitgeberbestätigung ein.',
    usefulLinks: [
      { label: 'NiZzA – Zuständige Behörde ermitteln', description: 'Finden Sie heraus, welche Approbationsbehörde für Ihren Antrag zuständig ist.' },
    ],
  },
  'meldebescheinigung': {
    title: 'Meldebescheinigung',
    howToGet: 'Beantragen Sie die Meldebescheinigung beim örtlichen Einwohnermeldeamt (Bürgeramt). Bringen Sie Ihren Reisepass und ggf. Ihre Wohnungsgeberbestätigung mit. Das Dokument darf nicht älter als 3 Monate sein – beantragen Sie es nahe am Einreichungstermin.',
    description:
      'Eine vom örtlichen Einwohnermeldeamt ausgestellte Meldebescheinigung, die Ihre gemeldete Anschrift in Deutschland bestätigt. Darf nicht älter als 3 Monate sein.',
    usefulLinks: [
      { label: 'Serviceportal – Bürgeramt finden', description: 'Finden Sie das nächste Bürgeramt zur Anmeldung Ihrer Adresse.' },
      { label: 'Anmeldung – So funktioniert es', description: 'Schritt-für-Schritt-Anleitung zur Anmeldung Ihrer Adresse in Deutschland.' },
    ],
  },
  'eu-fuehrungszeugnis': {
    title: 'EU-Führungszeugnis',
    howToGet: 'Beantragen Sie das EU-Führungszeugnis (Belegart 0 – für Privatpersonen) beim örtlichen Bürgeramt. Bringen Sie Ihren Reisepass mit. Die Bearbeitungszeit beträgt ca. 2–3 Wochen. Das Dokument darf nicht älter als 3 Monate sein – beantragen Sie es nahe am Einreichungstermin.',
    description:
      'Ein EU-Führungszeugnis aus dem Deutschen Bundeszentralregister, das beim örtlichen Bürgeramt beantragt wird. Erforderlich zum Nachweis, dass in Deutschland keine Vorstrafen vorliegen. Darf nicht älter als 3 Monate sein.',
    templates: [
      { name: 'Antrag auf Führungszeugnis', language: 'Deutsch' },
    ],
    usefulLinks: [
      { label: 'Bundesamt für Justiz – Führungszeugnis', description: 'Offizielles Portal zur Beantragung eines deutschen Führungszeugnisses (Belegart O).' },
      { label: 'Online-Beantragung des Führungszeugnisses', description: 'Beantragen Sie Ihr Führungszeugnis online (erfordert deutschen Ausweis oder Anmeldung).' },
    ],
  },
  'heimat-fuehrungszeugnis': {
    title: 'Polizeiliches Führungszeugnis aus dem Heimatland',
    howToGet: 'Beantragen Sie das polizeiliche Führungszeugnis bei der zuständigen Behörde Ihres Heimatlandes. Es muss offiziell gestempelt und unterzeichnet sein. Eine beglaubigte deutsche Übersetzung ist erforderlich. Einplanen: 2–6 Wochen. Das Dokument darf nicht älter als 3 Monate sein.',
    description:
      'Ein offizielles polizeiliches Führungszeugnis aus Ihrem Heimatland (oder einem früheren Wohnsitzland). Muss von der zuständigen Behörde ausgestellt und mit einer beglaubigten deutschen Übersetzung versehen sein. Darf nicht älter als 3 Monate sein.',
    usefulLinks: [
      { label: 'ACRO – Strafregister UK', description: 'Für Bewerber aus dem Vereinigten Königreich: So erhalten Sie ein polizeiliches Führungszeugnis.' },
      { label: 'Deutsche Botschaft – Heimatlandnachweis', description: 'Wenden Sie sich an die deutsche Botschaft in Ihrem Heimatland für Orientierungshilfe beim Erhalt von Bescheinigungen.' },
    ],
  },
  'aerztliche-bescheinigung': {
    title: 'Ärztliche Gesundheitsbescheinigung',
    howToGet: 'Vereinbaren Sie einen Termin bei einem zugelassenen deutschen Arzt. Der Arzt erstellt eine Bescheinigung über Ihre gesundheitliche Eignung zur Ausübung der Medizin. Das Dokument darf nicht älter als 3 Monate sein – beantragen Sie es nahe am Einreichungstermin.',
    description:
      'Eine Bescheinigung eines approbierten Arztes, die bestätigt, dass Sie körperlich und geistig in der Lage sind, die Medizin auszuüben. Muss von einem deutschen Arzt ausgestellt sein und bestätigen, dass keine gesundheitlichen Gründe vorliegen, die die Berufsausübung verhindern (ärztliche Bescheinigung über die gesundheitliche Eignung).',
    templates: [
      { name: 'Vorlage für die Gesundheitsbescheinigung', language: 'Deutsch' },
    ],
    usefulLinks: [
      { label: 'NiZzA – Vorlage Gesundheitsbescheinigung', description: 'Laden Sie die offizielle Vorlage für die ärztliche Gesundheitsbescheinigung für NiZzA herunter.' },
      { label: 'Jameda – Arzt in Ihrer Nähe finden', description: 'Finden Sie einen deutschen Hausarzt, der Ihre Gesundheitsbescheinigung ausstellt.' },
    ],
  },
  'b2-cert': {
    title: 'Deutsches Sprachzertifikat B2',
    howToGet: 'Melden Sie sich für eine Prüfung bei einer anerkannten Institution an (Goethe-Institut, telc, TestDaF, ÖSD). Prüfungstermine können 4–8 Wochen im Voraus ausgebucht sein. Reichen Sie das Originalzertifikat oder eine beglaubigte Kopie ein. Das Zertifikat darf nicht älter als 2 Jahre sein.',
    description:
      'Nachweis der deutschen Sprachkenntnisse auf B2-Niveau (GER) oder höher, ausgestellt von einer anerkannten Institution wie dem Goethe-Institut, telc, TestDaF oder ÖSD. Das Zertifikat muss von der jeweiligen Approbationsbehörde offiziell anerkannt sein.',
    templates: [
      { name: 'Liste anerkannter Sprachinstitute', language: 'Deutsch' },
    ],
    usefulLinks: [
      { label: 'Goethe-Institut – Deutschkurse & Prüfungen', description: 'Melden Sie sich für die Goethe-B2-Prüfung an, die von deutschen Behörden weitgehend anerkannt wird.' },
      { label: 'telc – B2-Prüfungsanmeldung', description: 'telc B2-Prüfungstermine und Anmeldung.' },
      { label: 'TestDaF – Akademischer Deutschtest', description: 'TestDaF wird von vielen Approbationsbehörden als B2-Äquivalent anerkannt.' },
    ],
  },
  'fsp-cert': {
    title: 'Fachsprachenprüfung (FSP)',
    howToGet: 'Melden Sie sich direkt bei der Landesärztekammer Ihres Bundeslandes für die FSP an. Die Prüfung wird nur von der Ärztekammer abgenommen und kann nicht extern absolviert werden. Beantragen Sie die Anmeldung frühzeitig – Plätze können mehrere Monate im Voraus ausgebucht sein. Bereiten Sie sich mit medizinischen Fachbegriffen und Arzt-Patienten-Gesprächen vor.',
    description:
      'Die Fachsprachenprüfung (FSP) ist eine medizinische Deutschprüfung, die von der jeweiligen Landesärztekammer durchgeführt wird. Sie bewertet die Arzt-Patienten-Kommunikation, medizinische Dokumentation und Fachterminologie. Diese Prüfung ist für Nicht-EU-Bewerber verpflichtend und wird häufig auch für EU-Bewerber verlangt.',
    templates: [
      { name: 'FSP-Anmeldeformular', language: 'Deutsch' },
      { name: 'FSP-Vorbereitungsleitfaden', language: 'Deutsch / Englisch' },
    ],
    usefulLinks: [
      { label: 'Ärztekammer Niedersachsen – FSP-Informationen', description: 'Offizielle FSP-Anmeldung, Termine und Vorbereitungsmaterialien für Niedersachsen.' },
      { label: 'FSP-Vorbereitungsleitfaden (BLÄK)', description: 'FSP-Leitfaden der Bayerischen Landesärztekammer – nützliche Vorbereitungsreferenz.' },
      { label: 'Bundesärztekammer – FSP-Überblick', description: 'Bundesweite Übersicht der Anforderungen an die medizinische Sprachprüfung.' },
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
    howToGet: trans.howToGet ?? doc.howToGet,
    usefulLinks: trans.usefulLinks && doc.usefulLinks
      ? trans.usefulLinks.map((tl, i) => ({
          ...doc.usefulLinks![i],
          label: tl.label,
          description: tl.description,
        }))
      : doc.usefulLinks,
  };
}
