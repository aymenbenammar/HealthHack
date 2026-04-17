"""
VLLM Client Module
Handles communication with the Visual Language Model server.
Provides methods for image processing, API requests, and response handling.
"""

import requests
import json
from typing import Optional, List, Dict, Union
from base64 import b64encode
import logging
import time
import base64
import traceback
import os
from datetime import date as _date
from groq import Groq
from anthropic import Anthropic
from app.core.config import settings
from app.services.utils import split_pdf_to_images

# ── Compliance rules per doc-class ────────────────────────────────────────────
# Each tuple: (issue_code, field_hint, check_instruction)
# Only the codes that appear as ✔ for this class in the defect matrix.
_DOC_CLASS_RULES: dict[str, list[tuple[str, str, str]]] = {
    "ANTRAG_APPROBATION": [
        ("MISSING_SIGNATURE", "formal_flags.has_signature",
         "has_signature must be true — the form must carry an original handwritten signature"),
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("INCOMPLETE_FIELDS", "metadata.full_name",
         "full_name must be present"),
        ("ORIGINAL_REQUIRED", "formal_flags.is_original",
         "is_original must be true — copies are not accepted"),
        ("DATE_INCONSISTENT", "metadata.issue_date",
         "issue_date must not be a future date and must not contradict other dates in the document"),
    ],
    "NACHWEIS_ZUSTAENDIGKEIT": [
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
    ],
    "CV_SIGNED": [
        ("MISSING_SIGNATURE", "formal_flags.has_signature",
         "has_signature must be true — CV must be hand-signed"),
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("INCOMPLETE_FIELDS", "metadata.full_name",
         "full_name must be present"),
        ("ORIGINAL_REQUIRED", "formal_flags.is_original",
         "is_original must be true — a copy of the signed CV is not accepted"),
        ("DATE_INCONSISTENT", "metadata.issue_date",
         "issue_date must not be in the future; employment/education dates must not overlap or contradict"),
        ("CHRONOLOGICAL_GAP", "(employment history)",
         "Check all employment and education periods; flag any unexplained gap longer than 1 month (31 days)"),
    ],
    "DIPLOMA": [
        ("MISSING_STAMP", "formal_flags.has_official_stamp",
         "has_official_stamp must be true"),
        ("NOT_CERTIFIED", "formal_flags.is_certified_copy",
         "If is_original is false, is_certified_copy must be true (Beglaubigungsvermerk required)"),
        ("MISSING_APOSTILLE", "formal_flags.has_apostille",
         "has_apostille must be true for non-EU/EEA documents; for EU/EEA it is conditional on Bundesland"),
        ("MISSING_TRANSLATION", "metadata.language",
         "If language is not 'de', a German translation must be attached"),
        ("TRANSLATION_NOT_SWORN", "(translation info)",
         "If a translation is present, the translator must be 'öffentlich bestellt und allgemein beeidigt'"),
        ("DATE_INCONSISTENT", "metadata.issue_date",
         "issue_date must not be in the future and must not contradict graduation year or other internal dates"),
    ],
    "CURRICULUM": [
        ("MISSING_STAMP", "formal_flags.has_official_stamp",
         "has_official_stamp must be true"),
        ("NOT_CERTIFIED", "formal_flags.is_certified_copy",
         "If is_original is false, is_certified_copy must be true"),
        ("MISSING_APOSTILLE", "formal_flags.has_apostille",
         "has_apostille must be true for non-EU/EEA documents; conditional for EU/EEA"),
        ("MISSING_TRANSLATION", "metadata.language",
         "If language is not 'de', a German translation must be attached"),
        ("TRANSLATION_NOT_SWORN", "(translation info)",
         "If a translation is present, translator must be 'öffentlich bestellt und allgemein beeidigt'"),
    ],
    "ARBEITSZEUGNIS": [
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("MISSING_STAMP", "formal_flags.has_official_stamp",
         "has_official_stamp must be true"),
        ("NOT_CERTIFIED", "formal_flags.is_certified_copy",
         "If is_original is false, is_certified_copy must be true"),
        ("MISSING_APOSTILLE", "formal_flags.has_apostille",
         "has_apostille must be true for non-EU/EEA documents; conditional for EU/EEA"),
        ("MISSING_TRANSLATION", "metadata.language",
         "If language is not 'de', a German translation must be attached"),
        ("TRANSLATION_NOT_SWORN", "(translation info)",
         "If a translation is present, translator must be 'öffentlich bestellt und allgemein beeidigt'"),
        ("INCOMPLETE_FIELDS", "metadata.full_name",
         "full_name must be present"),
        ("DATE_INCONSISTENT", "metadata.issue_date",
         "issue_date must not be in the future and must not contradict employment dates in the document"),
    ],
    "LICENSE": [
        ("DOC_EXPIRED", "formal_flags.is_valid_not_expired",
         "is_valid_not_expired must be true — the licence must not have passed its own expiry date"),
        ("MISSING_STAMP", "formal_flags.has_official_stamp",
         "has_official_stamp must be true"),
        ("NOT_CERTIFIED", "formal_flags.is_certified_copy",
         "If is_original is false, is_certified_copy must be true"),
        ("MISSING_APOSTILLE", "formal_flags.has_apostille",
         "has_apostille must be true for non-EU/EEA documents; conditional for EU/EEA"),
        ("MISSING_TRANSLATION", "metadata.language",
         "If language is not 'de', a German translation must be attached"),
        ("TRANSLATION_NOT_SWORN", "(translation info)",
         "If a translation is present, translator must be 'öffentlich bestellt und allgemein beeidigt'"),
    ],
    "PASSPORT": [
        ("DOC_EXPIRED", "formal_flags.is_valid_not_expired",
         "is_valid_not_expired must be true — the passport must not be expired"),
        ("NOT_CERTIFIED", "formal_flags.is_certified_copy",
         "If is_original is false, is_certified_copy must be true"),
    ],
    "MELDEBESCHEINIGUNG": [
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("MISSING_STAMP", "formal_flags.has_official_stamp",
         "has_official_stamp must be true"),
        ("NOT_CERTIFIED", "formal_flags.is_certified_copy",
         "If is_original is false, is_certified_copy must be true"),
        ("INCOMPLETE_FIELDS", "metadata.full_name",
         "full_name must be present"),
        ("EXPIRED_MAX_AGE", "formal_flags.age_days",
         "age_days must be ≤ 90; the Meldebescheinigung must not be older than 90 days"),
    ],
    "BIRTH_CERT": [
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("NOT_CERTIFIED", "formal_flags.is_certified_copy",
         "If is_original is false, is_certified_copy must be true"),
        ("MISSING_APOSTILLE", "formal_flags.has_apostille",
         "has_apostille must be true for non-EU/EEA documents; conditional for EU/EEA"),
        ("MISSING_TRANSLATION", "metadata.language",
         "If language is not 'de', a German translation must be attached"),
        ("TRANSLATION_NOT_SWORN", "(translation info)",
         "If a translation is present, translator must be 'öffentlich bestellt und allgemein beeidigt'"),
    ],
    "NAME_CHANGE": [
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("NOT_CERTIFIED", "formal_flags.is_certified_copy",
         "If is_original is false, is_certified_copy must be true"),
        ("MISSING_APOSTILLE", "formal_flags.has_apostille",
         "has_apostille must be true for non-EU/EEA documents; conditional for EU/EEA"),
        ("MISSING_TRANSLATION", "metadata.language",
         "If language is not 'de', a German translation must be attached"),
        ("TRANSLATION_NOT_SWORN", "(translation info)",
         "If a translation is present, translator must be 'öffentlich bestellt und allgemein beeidigt'"),
    ],
    "EU_FUEHRUNGSZEUGNIS": [
        ("MISSING_SIGNATURE", "formal_flags.has_signature",
         "has_signature must be true"),
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("EXPIRED_MAX_AGE", "formal_flags.age_days",
         "age_days must be ≤ 90; Führungszeugnis must not be older than 90 days"),
        ("ORIGINAL_REQUIRED", "formal_flags.is_original",
         "is_original must be true — only originals accepted"),
        ("WRONG_BELEGART_FZ", "(belegart field or document text)",
         "Must be Belegart 0 (issued for private use / Privatpersonen); any other Belegart is invalid"),
    ],
    "HEIMAT_FUEHRUNGSZEUGNIS": [
        ("MISSING_SIGNATURE", "formal_flags.has_signature",
         "has_signature must be true"),
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("MISSING_STAMP", "formal_flags.has_official_stamp",
         "has_official_stamp must be true"),
        ("EXPIRED_MAX_AGE", "formal_flags.age_days",
         "age_days must be ≤ 90"),
        ("ORIGINAL_REQUIRED", "formal_flags.is_original",
         "is_original must be true"),
        ("MISSING_APOSTILLE", "formal_flags.has_apostille",
         "has_apostille must be true for non-EU/EEA documents; conditional for EU/EEA"),
        ("MISSING_TRANSLATION", "metadata.language",
         "If language is not 'de', a German translation must be attached"),
        ("TRANSLATION_NOT_SWORN", "(translation info)",
         "If a translation is present, translator must be 'öffentlich bestellt und allgemein beeidigt'"),
    ],
    "GOOD_STANDING": [
        ("MISSING_SIGNATURE", "formal_flags.has_signature",
         "has_signature must be true"),
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("MISSING_STAMP", "formal_flags.has_official_stamp",
         "has_official_stamp must be true"),
        ("EXPIRED_MAX_AGE", "formal_flags.age_days",
         "age_days must be ≤ 90"),
        ("ORIGINAL_REQUIRED", "formal_flags.is_original",
         "is_original must be true"),
        ("MISSING_TRANSLATION", "metadata.language",
         "If language is not 'de', a German translation must be attached"),
        ("TRANSLATION_NOT_SWORN", "(translation info)",
         "If a translation is present, translator must be 'öffentlich bestellt und allgemein beeidigt'"),
    ],
    "AERZTLICHE_BESCHEINIGUNG": [
        ("MISSING_SIGNATURE", "formal_flags.has_signature",
         "has_signature must be true — must carry the physician's signature"),
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("MISSING_STAMP", "formal_flags.has_official_stamp",
         "has_official_stamp must be true — must carry the practice stamp"),
        ("EXPIRED_MAX_AGE", "formal_flags.age_days",
         "age_days must be ≤ 90"),
        ("ORIGINAL_REQUIRED", "formal_flags.is_original",
         "is_original must be true"),
    ],
    "B2_CERT": [
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
        ("NOT_CERTIFIED", "formal_flags.is_certified_copy",
         "If is_original is false, is_certified_copy must be true"),
        ("EXPIRED_MAX_AGE", "formal_flags.age_days",
         "age_days must be ≤ 730 (2 years); language certificate must not be older than 2 years"),
        ("WRONG_LEVEL", "(certificate level visible in document)",
         "Language level must be B2, C1, or C2; anything below B2 is invalid. "
         "Accepted providers: Goethe-Institut, telc, ÖSD, DSH, TestDaF"),
    ],
    "FSP_CERT": [
        ("MISSING_DATE", "metadata.issue_date",
         "issue_date must not be null"),
    ],
    "PROMOTIONSURKUNDE": [
        ("NOT_CERTIFIED", "formal_flags.is_certified_copy",
         "If is_original is false, is_certified_copy must be true"),
        ("MISSING_APOSTILLE", "formal_flags.has_apostille",
         "has_apostille must be true for non-EU/EEA documents; conditional for EU/EEA"),
        ("MISSING_TRANSLATION", "metadata.language",
         "If language is not 'de', a German translation must be attached"),
        ("TRANSLATION_NOT_SWORN", "(translation info)",
         "If a translation is present, translator must be 'öffentlich bestellt und allgemein beeidigt'"),
    ],
}

signatures = {
    "JVBERi0": "application/pdf",
    "R0lGODdh": "image/gif",
    "R0lGODlh": "image/gif",
    "iVBORw0KGgo": "image/png",
    "/9j/": "image/jpg"
};

def detectMimeType(b64):
    for s in signatures:
        if s in b64:
            return signatures[s]






class GroqLLMClient:
    """
    High-level client that splits documents into images and calls the Groq VLM.
    """

    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.default_model = settings.GROQ_DEFAULT_VISION_MODEL
        self.text_model = settings.GROQ_DEFAULT_TEXT_MODEL
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
            self.logger.addHandler(handler)

    # ── Pass-2: rule-based compliance check ───────────────────────────────────

    _LANG_NAMES = {
        'en': 'English', 'de': 'German', 'ar': 'Arabic',
        'fr': 'French', 'tr': 'Turkish', 'ru': 'Russian',
    }

    def _build_compliance_prompt(self, extraction: dict, language: str = 'en') -> str:
        doc_class = extraction.get("doc_class", "UNKNOWN")
        rules = _DOC_CLASS_RULES.get(doc_class, [])
        today = str(_date.today())
        lang_name = self._LANG_NAMES.get(language, 'English')

        if rules:
            rules_block = "\n".join(
                f"  {i+1}. {code} — field: {field}\n     Rule: {instruction}"
                for i, (code, field, instruction) in enumerate(rules)
            )
        else:
            rules_block = "  (no specific rules defined for this document class)"

        return f"""You are a compliance checker for German Approbation (medical licence) documents.

Today's date: {today}

The following JSON was extracted from a document by a vision model.
Document class: {doc_class}

EXTRACTED DATA:
{json.dumps(extraction, ensure_ascii=False, indent=2)}

APPLICABLE CHECKS FOR {doc_class}:
{rules_block}

INSTRUCTIONS:
- Go through each check above one by one.
- If a check FAILS, add one entry to "issues".
- If a check PASSES or is NOT APPLICABLE (field is "n/a"), do NOT add an issue.
- For age-based checks: use formal_flags.age_days if available; treat null as unknown (skip).
- For apostille on EU/EEA documents (country_of_issue in AT BE BG CY CZ DE DK EE ES FI FR GR HR HU IE IT LT LU LV MT NL PL PT RO SE SI SK IS LI NO CH): use severity "warning" and add a bundesland_note.
- For apostille on non-EU documents: severity must be "critical".
- Fill "rule_compliance" with one entry per check (pass / fail / n/a).
- "message" must be in {lang_name}, user-facing, and actionable.
- "tips" must be in {lang_name}, concrete, and actionable (1–3 items, only for failed checks).
- Set "bundesland_note" if any result depends on the Bundesland; otherwise null.

RETURN ONLY valid JSON — no markdown fences, no explanation:
{{
  "issues": [
    {{
      "code": "<ISSUE_CODE>",
      "severity": "critical" | "warning" | "info",
      "message": "<{lang_name} user-facing message>",
      "field": "<field name>"
    }}
  ],
  "rule_compliance": [
    {{
      "rule": "<check name>",
      "status": "pass" | "fail" | "n/a",
      "evidence": "<short explanation>"
    }}
  ],
  "tips": ["<{lang_name} tip 1>", "..."],
  "bundesland_note": null
}}"""

    def check_compliance(self, extraction: dict, language: str = 'en') -> dict:
        """
        Pass-2: send the extraction JSON to the text LLM and get back
        issues, rule_compliance, tips, and bundesland_note.
        Returns a dict with those four keys (empty defaults on failure).
        """
        prompt = self._build_compliance_prompt(extraction, language=language)
        client = Groq(api_key=self.api_key)
        self.logger.info(f"Running compliance check (text LLM) for {extraction.get('doc_class', '?')}...")

        completion = client.chat.completions.create(
            model=self.text_model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            max_completion_tokens=2048,
        )

        raw = completion.choices[0].message.content
        print("\n" + "-"*60)
        print("PASS 2 — TEXT LLM RAW RESPONSE")
        print("-"*60)
        print(raw)
        print("-"*60 + "\n")

        start = raw.find("{")
        end = raw.rfind("}") + 1
        try:
            result = json.loads(raw[start:end])
            self.logger.info("Compliance check completed successfully")
        except (json.JSONDecodeError, ValueError):
            self.logger.warning("Compliance check returned invalid JSON — using empty defaults")
            result = {}

        return {
            "issues":          result.get("issues", []),
            "rule_compliance": result.get("rule_compliance", []),
            "tips":            result.get("tips", []),
            "bundesland_note": result.get("bundesland_note", None),
        }

    # ── Pass-3: cross-document name mismatch ──────────────────────────────────

    def check_name_mismatch(self, resources_dir: str = "resources") -> list[dict]:
        """
        Scan every *_result.json under resources/ and compare full_name values.
        Returns a list containing a single NAME_MISMATCH issue dict if more than
        one distinct name is found, or an empty list if all names agree.
        """
        name_map: dict[str, dict] = {}   # normalized_name -> {original, docs:[doc_id, ...]}

        if not os.path.isdir(resources_dir):
            return []

        for root, _, files in os.walk(resources_dir):
            for fname in files:
                if not fname.endswith("_result.json"):
                    continue
                path = os.path.join(root, fname)
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        data = json.load(f)
                    name = (data.get("metadata") or {}).get("full_name")
                    if not name or name.lower() in ("n/a", "null", "unknown", ""):
                        continue
                    doc_id = fname.replace("_result.json", "")
                    key = name.strip().lower()
                    if key not in name_map:
                        name_map[key] = {"original_name": name, "found_in": []}
                    name_map[key]["found_in"].append(doc_id)
                except Exception as exc:
                    self.logger.warning(f"Could not read {path} for name check: {exc}")

        if len(name_map) <= 1:
            return []

        names_summary = {v["original_name"]: v["found_in"] for v in name_map.values()}
        return [
            {
                "code": "NAME_MISMATCH",
                "severity": "critical",
                "message": (
                    f"{len(name_map)} We found several different names in the uploaded documents. "
                    "Please check whether a name change document is required."
                ),
                "field": "metadata.full_name",
                "details": names_summary,
            }
        ]

    def analyze_document(self, file_bytes: bytes, filename: str, prompt: str, model: str = None, language: str = 'en') -> dict:
        """
        Split a PDF (or single image) into page images saved under resources/,
        then send all pages to the Groq VLM in one request.
        The output template from document_templates/antrag_approbation.json is
        injected into the prompt so the VLM returns the expected output shape.
        """
        if model is None:
            model = self.default_model

        ext = os.path.splitext(filename)[1].lower()

        if ext == ".pdf":
            base_name = os.path.splitext(filename)[0]
            image_paths = split_pdf_to_images(file_bytes, base_name)
            self.logger.info(f"PDF split into {len(image_paths)} page image(s)")
        else:
            # Save the image directly into resources/
            os.makedirs("resources", exist_ok=True)
            image_path = os.path.join("resources", filename)
            with open(image_path, "wb") as f:
                f.write(file_bytes)
            image_paths = [image_path]
            self.logger.info(f"Image saved to {image_path}")

        # Encode every page image as base64
        image_contents = []
        for path in image_paths:
            with open(path, "rb") as f:
                img_data = base64.b64encode(f.read()).decode("utf-8")
            mime = detectMimeType(img_data) or "image/png"
            image_contents.append({
                "type": "image_url",
                "image_url": {"url": f"data:{mime};base64,{img_data}"},
            })


        client = Groq(api_key=self.api_key)
        self.logger.info(f"Calling Groq VLM ({model}) with {len(image_contents)} image(s)...")
        completion = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": [{"type": "text", "text": prompt}] + image_contents,
                }
            ],
            temperature=0,
            max_completion_tokens=4096,
            top_p=1,
            stream=False,
        )

        raw = completion.choices[0].message.content
        self.logger.info(f"VLM response received ({len(raw)} chars)")

        # ── Pass 1: parse VLM extraction ─────────────────────────────────────
        start = raw.find("{")
        end = raw.rfind("}") + 1
        try:
            result = json.loads(raw[start:end])
        except (json.JSONDecodeError, ValueError):
            result = {"result": raw}

        print("\n" + "="*60)
        print("PASS 1 — VLM EXTRACTION RESULT")
        print("="*60)
        print(json.dumps(result, ensure_ascii=False, indent=2))
        print("="*60 + "\n")

        # ── Pass 2: compliance check (text LLM) ──────────────────────────────
        compliance = self.check_compliance(result, language=language)
        result.update(compliance)

        print("\n" + "="*60)
        print("PASS 2 — COMPLIANCE CHECK RESULT")
        print("="*60)
        print(json.dumps(compliance, ensure_ascii=False, indent=2))
        print("="*60 + "\n")

        # ── Save merged result alongside the page images ──────────────────────
        base_name = os.path.splitext(filename)[0]
        output_path = os.path.join(os.path.dirname(image_paths[0]), f"{base_name}_result.json")
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        self.logger.info(f"Result saved to {output_path}")

        # ── Pass 3: cross-document name mismatch ─────────────────────────────
        cross_doc_issues = self.check_name_mismatch()

        print("\n" + "="*60)
        print("PASS 3 — CROSS-DOCUMENT NAME CHECK")
        print("="*60)
        if cross_doc_issues:
            print(json.dumps(cross_doc_issues, ensure_ascii=False, indent=2))
        else:
            print("All document names match — no NAME_MISMATCH detected.")
        print("="*60 + "\n")

        result["cross_doc_issues"] = cross_doc_issues

        # Re-save with cross-doc issues included
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        return result

    def explain_document_guidelines(
        self,
        file_bytes: bytes,
        filename: str,
        language: str = "English",
        model: str = None,
    ) -> dict:
        """
        Single-pass VLM analysis: generate a page-by-page to-do checklist
        explaining how to fill in or prepare the document.
        Returns: {"pages": [...]}
        """
        if model is None:
            model = self.default_model

        ext = os.path.splitext(filename)[1].lower()
        if ext == ".pdf":
            base_name = os.path.splitext(filename)[0]
            image_paths = split_pdf_to_images(file_bytes, base_name)
            self.logger.info(f"Guidelines: PDF split into {len(image_paths)} page image(s)")
        else:
            os.makedirs("resources", exist_ok=True)
            image_path = os.path.join("resources", filename)
            with open(image_path, "wb") as f:
                f.write(file_bytes)
            image_paths = [image_path]

        # Encode images and keep a per-page data-URI for the response
        page_data_uris: list[str] = []
        image_contents = []
        for path in image_paths:
            with open(path, "rb") as f:
                raw = f.read()
            img_data = base64.b64encode(raw).decode("utf-8")
            mime = detectMimeType(img_data) or "image/png"
            data_uri = f"data:{mime};base64,{img_data}"
            page_data_uris.append(data_uri)
            image_contents.append({
                "type": "image_url",
                "image_url": {"url": data_uri},
            })

        prompt = f"""You are an expert, empathetic bureaucratic assistant helping international doctors prepare German Approbation documents.
Analyze the attached document and provide a stress-free, actionable explanation STRICTLY IN {language}.

Goal: Make the checklist easy to follow and not overwhelming. The user should be able to work page-by-page.

Output rules:
- Do NOT include a summary.
- Return ONLY valid JSON (no markdown, no code fences, no extra text).
- Organize output by page number.
- Each action item must have a required key "item".
- Optional keys for non-obvious items: "important", "what_it_means", "where_to_find_it", "what_to_prepare".
- For simple/obvious items (name, date of birth, address, phone, email, signature, today's date), include only "item".
- Omit "important" if there is no deadline or critical note.
- "where_to_find_it" must refer to real-world sources (letters, office notices, authority documents), not the form itself.
- If a page requires no user action, return an empty "actions" array.

Return JSON in exactly this shape:
{{
  "pages": [
    {{
      "page": 1,
      "actions": [
        {{
          "item": "Fill in your full legal name"
        }},
        {{
          "item": "Enter your LPA number",
          "what_it_means": "Your identifier assigned by the state examination office (Landesprüfungsamt).",
          "where_to_find_it": "Found on correspondence from the Landesprüfungsamt or on your exam results letter.",
          "what_to_prepare": "Your latest letter from the exam office"
        }},
        {{
          "item": "Submit the application before 31.05.2026",
          "important": "Deadline: 31.05.2026",
          "what_it_means": "Applications received after this date may not be processed in time."
        }}
      ]
    }},
    {{
      "page": 2,
      "actions": []
    }}
  ]
}}"""

        client = Groq(api_key=self.api_key)
        self.logger.info(f"Guidelines: calling Groq VLM ({model}) with {len(image_contents)} image(s)...")
        completion = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": [{"type": "text", "text": prompt}] + image_contents,
                }
            ],
            temperature=0,
            max_completion_tokens=2048,
            top_p=1,
            stream=False,
        )

        raw = completion.choices[0].message.content
        self.logger.info(f"Guidelines: VLM response received ({len(raw)} chars)")

        start = raw.find("{")
        end = raw.rfind("}") + 1
        try:
            result = json.loads(raw[start:end])
        except (json.JSONDecodeError, ValueError):
            result = {"pages": []}

        # Embed the page image into each page object so the frontend
        # can render pages without an extra round-trip.
        if "pages" in result and isinstance(result["pages"], list):
            for page_obj in result["pages"]:
                idx = page_obj.get("page", 1) - 1
                if 0 <= idx < len(page_data_uris):
                    page_obj["image"] = page_data_uris[idx]

        return result


# Anthropic requires "image/jpeg" (not "image/jpg") and does not accept "image/gif"
# for its vision input; map accordingly.
_ANTHROPIC_MIME_MAP = {
    "image/jpg": "image/jpeg",
    "image/jpeg": "image/jpeg",
    "image/png": "image/png",
    "image/webp": "image/webp",
    "image/gif": "image/gif",
    "application/pdf": "application/pdf",
}


class AnthropicLLMClient:
    """
    Drop-in replacement for GroqLLMClient that routes all vision and text
    calls to Anthropic's Claude (default: Claude Opus 4.7).
    """

    def __init__(self):
        self.api_key = settings.ANTHROPIC_API_KEY
        self.default_model = settings.ANTHROPIC_DEFAULT_MODEL
        self.text_model = settings.ANTHROPIC_DEFAULT_MODEL
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
            self.logger.addHandler(handler)

    def _extract_text(self, message) -> str:
        parts = []
        for block in message.content:
            text = getattr(block, "text", None)
            if text:
                parts.append(text)
        return "".join(parts)

    # Reuse Groq's prompt builder — it is pure string formatting.
    _build_compliance_prompt = GroqLLMClient._build_compliance_prompt
    # Reuse the filesystem-only cross-doc name check.
    check_name_mismatch = GroqLLMClient.check_name_mismatch

    def check_compliance(self, extraction: dict) -> dict:
        prompt = self._build_compliance_prompt(extraction)
        client = Anthropic(api_key=self.api_key)
        self.logger.info(f"Running compliance check (Claude {self.text_model}) for {extraction.get('doc_class', '?')}...")

        message = client.messages.create(
            model=self.text_model,
            max_tokens=2048,
            temperature=0,
            messages=[{"role": "user", "content": prompt}],
        )

        raw = self._extract_text(message)
        print("\n" + "-"*60)
        print("PASS 2 — CLAUDE TEXT RESPONSE")
        print("-"*60)
        print(raw)
        print("-"*60 + "\n")

        start = raw.find("{")
        end = raw.rfind("}") + 1
        try:
            result = json.loads(raw[start:end])
            self.logger.info("Compliance check completed successfully")
        except (json.JSONDecodeError, ValueError):
            self.logger.warning("Compliance check returned invalid JSON — using empty defaults")
            result = {}

        return {
            "issues":          result.get("issues", []),
            "rule_compliance": result.get("rule_compliance", []),
            "tips":            result.get("tips", []),
            "bundesland_note": result.get("bundesland_note", None),
        }

    def _build_image_blocks(self, image_paths: list[str]) -> tuple[list[dict], list[str]]:
        """Return (anthropic_content_blocks, data_uris) for a list of image paths."""
        blocks = []
        data_uris = []
        for path in image_paths:
            with open(path, "rb") as f:
                raw_bytes = f.read()
            img_data = base64.b64encode(raw_bytes).decode("utf-8")
            detected = detectMimeType(img_data) or "image/png"
            anth_mime = _ANTHROPIC_MIME_MAP.get(detected, "image/png")
            data_uris.append(f"data:{anth_mime};base64,{img_data}")
            blocks.append({
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": anth_mime,
                    "data": img_data,
                },
            })
        return blocks, data_uris

    def analyze_document(self, file_bytes: bytes, filename: str, prompt: str, model: str = None) -> dict:
        if model is None:
            model = self.default_model

        ext = os.path.splitext(filename)[1].lower()

        if ext == ".pdf":
            base_name = os.path.splitext(filename)[0]
            image_paths = split_pdf_to_images(file_bytes, base_name)
            self.logger.info(f"PDF split into {len(image_paths)} page image(s)")
        else:
            os.makedirs("resources", exist_ok=True)
            image_path = os.path.join("resources", filename)
            with open(image_path, "wb") as f:
                f.write(file_bytes)
            image_paths = [image_path]
            self.logger.info(f"Image saved to {image_path}")

        image_blocks, _ = self._build_image_blocks(image_paths)

        client = Anthropic(api_key=self.api_key)
        self.logger.info(f"Calling Claude ({model}) with {len(image_blocks)} image(s)...")
        message = client.messages.create(
            model=model,
            max_tokens=4096,
            temperature=0,
            messages=[{
                "role": "user",
                "content": image_blocks + [{"type": "text", "text": prompt}],
            }],
        )

        raw = self._extract_text(message)
        self.logger.info(f"Claude response received ({len(raw)} chars)")

        start = raw.find("{")
        end = raw.rfind("}") + 1
        try:
            result = json.loads(raw[start:end])
        except (json.JSONDecodeError, ValueError):
            result = {"result": raw}

        print("\n" + "="*60)
        print("PASS 1 — CLAUDE EXTRACTION RESULT")
        print("="*60)
        print(json.dumps(result, ensure_ascii=False, indent=2))
        print("="*60 + "\n")

        compliance = self.check_compliance(result)
        result.update(compliance)

        print("\n" + "="*60)
        print("PASS 2 — COMPLIANCE CHECK RESULT")
        print("="*60)
        print(json.dumps(compliance, ensure_ascii=False, indent=2))
        print("="*60 + "\n")

        base_name = os.path.splitext(filename)[0]
        output_path = os.path.join(os.path.dirname(image_paths[0]), f"{base_name}_result.json")
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        self.logger.info(f"Result saved to {output_path}")

        cross_doc_issues = self.check_name_mismatch()
        print("\n" + "="*60)
        print("PASS 3 — CROSS-DOCUMENT NAME CHECK")
        print("="*60)
        if cross_doc_issues:
            print(json.dumps(cross_doc_issues, ensure_ascii=False, indent=2))
        else:
            print("All document names match — no NAME_MISMATCH detected.")
        print("="*60 + "\n")

        result["cross_doc_issues"] = cross_doc_issues

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        return result

    def explain_document_guidelines(
        self,
        file_bytes: bytes,
        filename: str,
        language: str = "English",
        model: str = None,
    ) -> dict:
        if model is None:
            model = self.default_model

        ext = os.path.splitext(filename)[1].lower()
        if ext == ".pdf":
            base_name = os.path.splitext(filename)[0]
            image_paths = split_pdf_to_images(file_bytes, base_name)
            self.logger.info(f"Guidelines: PDF split into {len(image_paths)} page image(s)")
        else:
            os.makedirs("resources", exist_ok=True)
            image_path = os.path.join("resources", filename)
            with open(image_path, "wb") as f:
                f.write(file_bytes)
            image_paths = [image_path]

        image_blocks, page_data_uris = self._build_image_blocks(image_paths)

        prompt = f"""You are an expert, empathetic bureaucratic assistant helping international doctors prepare German Approbation documents.
Analyze the attached document and provide a stress-free, actionable explanation STRICTLY IN {language}.

Goal: Make the checklist easy to follow and not overwhelming. The user should be able to work page-by-page.

Output rules:
- Do NOT include a summary.
- Return ONLY valid JSON (no markdown, no code fences, no extra text).
- Organize output by page number.
- Each action item must have a required key "item".
- Optional keys for non-obvious items: "important", "what_it_means", "where_to_find_it", "what_to_prepare".
- For simple/obvious items (name, date of birth, address, phone, email, signature, today's date), include only "item".
- Omit "important" if there is no deadline or critical note.
- "where_to_find_it" must refer to real-world sources (letters, office notices, authority documents), not the form itself.
- If a page requires no user action, return an empty "actions" array.

Return JSON in exactly this shape:
{{
  "pages": [
    {{
      "page": 1,
      "actions": [
        {{
          "item": "Fill in your full legal name"
        }},
        {{
          "item": "Enter your LPA number",
          "what_it_means": "Your identifier assigned by the state examination office (Landesprüfungsamt).",
          "where_to_find_it": "Found on correspondence from the Landesprüfungsamt or on your exam results letter.",
          "what_to_prepare": "Your latest letter from the exam office"
        }},
        {{
          "item": "Submit the application before 31.05.2026",
          "important": "Deadline: 31.05.2026",
          "what_it_means": "Applications received after this date may not be processed in time."
        }}
      ]
    }},
    {{
      "page": 2,
      "actions": []
    }}
  ]
}}"""

        client = Anthropic(api_key=self.api_key)
        self.logger.info(f"Guidelines: calling Claude ({model}) with {len(image_blocks)} image(s)...")
        message = client.messages.create(
            model=model,
            max_tokens=2048,
            temperature=0,
            messages=[{
                "role": "user",
                "content": image_blocks + [{"type": "text", "text": prompt}],
            }],
        )

        raw = self._extract_text(message)
        self.logger.info(f"Guidelines: Claude response received ({len(raw)} chars)")

        start = raw.find("{")
        end = raw.rfind("}") + 1
        try:
            result = json.loads(raw[start:end])
        except (json.JSONDecodeError, ValueError):
            result = {"pages": []}

        if "pages" in result and isinstance(result["pages"], list):
            for page_obj in result["pages"]:
                idx = page_obj.get("page", 1) - 1
                if 0 <= idx < len(page_data_uris):
                    page_obj["image"] = page_data_uris[idx]

        return result


def get_llm_client():
    """
    Factory: return a GroqLLMClient or AnthropicLLMClient depending on
    settings.LLM_PROVIDER ("groq" | "anthropic"). Unknown values fall back
    to Groq.
    """
    provider = (settings.LLM_PROVIDER or "groq").strip().lower()
    if provider == "anthropic":
        return AnthropicLLMClient()
    return GroqLLMClient()
