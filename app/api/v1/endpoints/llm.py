from typing import Any, Dict, Optional

from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from app.services.llm_client import get_llm_client

router = APIRouter()

_ALLOWED_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
}

PROMPT="""
You are a specialist in data extraction from official documents.
I want you to extract relevant information from these documents and fill in this json. 
Make sure the json is well formed.
If an information is not present in the document, fill the corresponding field with n/a.

{
  "doc_class": "ANTRAG_APPROBATION" | "NACHWEIS_ZUSTAENDIGKEIT" |
               "CV_SIGNED" | "DIPLOMA" | "CURRICULUM" | "ARBEITSZEUGNIS" |
               "LICENSE" | "PASSPORT" | "MELDEBESCHEINIGUNG" |
               "BIRTH_CERT" | "NAME_CHANGE" | "EU_FUEHRUNGSZEUGNIS" |
               "HEIMAT_FUEHRUNGSZEUGNIS" | "GOOD_STANDING" |
               "AERZTLICHE_BESCHEINIGUNG" | "B2_CERT" | "FSP_CERT" |
               "PROMOTIONSURKUNDE" | "UNKNOWN",

  "confidence": 0.0..1.0,

  "metadata": {
    "full_name":         string | null,
    "date_of_birth":     "YYYY-MM-DD" | null,
    "issuing_authority": string | null,
    "issue_date":        "YYYY-MM-DD" | null,
    "document_number":   string | null,
    "country_of_issue":  ISO-3166-alpha2 | null,
    "language":          "de" | "en" | "fa" | "ar" | ... | null
  },

  "formal_flags": {
    "has_signature":       true | false | "n/a",
    "has_date":            true | false | "n/a",
    "has_apostille":       true | false | "n/a",
    "is_certified_copy":   true | false | "unknown",
    "is_original":         true | false | "unknown",
    "has_official_stamp":  true | false | "n/a",
    "age_days":            integer | null,
    "is_valid_not_expired": true | false | "n/a"
  },

  "rule_compliance": [
    {
      "rule":     "REQUIRES_ORIGINAL" | "REQUIRES_CERTIFIED_COPY" |
                  "REQUIRES_APOSTILLE" | "MAX_AGE_90_DAYS" |
                  "MAX_AGE_3_YEARS" | "MUST_BE_VALID" |
                  "SIGNATURE_ORIGINAL" | "COMPLETE_FIELDS",
      "status":   "pass" | "fail" | "conditional" | "n/a",
      "evidence": string   // short justification
    }
  ],

  "issues": [
    {
      "code":     "MISSING_SIGNATURE" | "MISSING_DATE" |
                  "EXPIRED_MAX_AGE" | "MISSING_APOSTILLE" |
                  "NOT_CERTIFIED" | "NAME_MISMATCH" | ... (see §4),
      "severity": "critical" | "warning" | "info",
      "message":  string,      // German, user-facing
      "field":    string | null  // which field/area the issue points to
    }
  ],

  "tips": [
    string  // concrete, actionable, German, e.g.
            // "Bitte Antrag im Original unterschreiben und Postversand."
  ],

  "bundesland_note": string | null   // always include when rule depends
                                      // on Bundesland; e.g.
                                      // "Anforderungen können je nach
                                      //  Bundesland abweichen."
}

"""

@router.post("/document/guidelines", summary="Generate a page-by-page how-to checklist for filling in a document")
async def document_guidelines(
    file: UploadFile = File(...),
    language: Optional[str] = Form(default="English"),
) -> Dict[str, Any]:
    if file.content_type not in _ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file type '{file.content_type}'. Allowed: {', '.join(sorted(_ALLOWED_TYPES))}",
        )

    file_bytes = await file.read()

    try:
        llm_client = get_llm_client()
        return llm_client.explain_document_guidelines(
            file_bytes=file_bytes,
            filename=file.filename or "document",
            language=language,
        )
    except Exception as exc:
        print(str(exc))
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc))


@router.post("/document/analyze", summary="Classify a document and run compliance checks")
async def analyze_document(
    file: UploadFile = File(...),
    model: Optional[str] = Form(default=None),
    language: Optional[str] = Form(default='en'),
) -> Dict[str, Any]:
    if file.content_type not in _ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file type '{file.content_type}'. Allowed: {', '.join(sorted(_ALLOWED_TYPES))}",
        )

    file_bytes = await file.read()


    try:
        llm_client = get_llm_client()
        return llm_client.analyze_document(
            file_bytes=file_bytes,
            filename=file.filename or "document",
            prompt=PROMPT,
            model=model,
            language=language or 'en',
        )
    except Exception as exc:
        print(str(exc))
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc))
