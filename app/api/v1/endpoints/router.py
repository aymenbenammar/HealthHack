import json
import pathlib
from datetime import datetime
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status
from fastapi.responses import FileResponse

from app.services.llm_client import get_llm_client

RESOURCES_DIR = pathlib.Path(__file__).resolve().parents[4] / "resources"

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
    doc_type: Optional[str] = Form(default=None),
) -> Dict[str, Any]:
    if file.content_type not in _ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file type '{file.content_type}'. Allowed: {', '.join(sorted(_ALLOWED_TYPES))}",
        )

    file_bytes = await file.read()

    try:
        llm_client = get_llm_client()
        result = llm_client.analyze_document(
            file_bytes=file_bytes,
            filename=file.filename or "document",
            prompt=PROMPT,
            model=model,
            language=language or 'en',
        )
    except Exception as exc:
        print(str(exc))
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc))

    # If the caller specified a doc_type, verify the LLM agrees.
    # Return a mismatch issue without saving when they don't match.
    llm_class = result.get("doc_class", "UNKNOWN")
    if doc_type and llm_class not in (doc_type, "UNKNOWN"):
        return {
            "doc_class": llm_class,
            "confidence": result.get("confidence", 0),
            "metadata": {},
            "formal_flags": {},
            "rule_compliance": [],
            "issues": [
                {
                    "code": "WRONG_DOCUMENT_TYPE",
                    "severity": "critical",
                    "message": (
                        f"The uploaded document appears to be '{llm_class}', "
                        f"but you selected '{doc_type}'. "
                        "Please upload the correct document."
                    ),
                    "field": None,
                }
            ],
            "tips": [
                f"Make sure you are uploading a '{doc_type}' document before submitting."
            ],
            "bundesland_note": None,
        }

    # Determine save folder: prefer the explicit doc_type from the frontend,
    # fall back to what the LLM classified, then to UNKNOWN.
    folder_name = doc_type or llm_class or "UNKNOWN"
    doc_dir = RESOURCES_DIR / folder_name
    doc_dir.mkdir(parents=True, exist_ok=True)

    original_name = pathlib.Path(file.filename or "document")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_stem = original_name.stem
    file_suffix = original_name.suffix or ".pdf"
    saved_filename = f"{file_stem}_{timestamp}{file_suffix}"
    result_filename = f"{file_stem}_{timestamp}_result.json"

    (doc_dir / saved_filename).write_bytes(file_bytes)
    (doc_dir / result_filename).write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    result["_saved"] = {
        "doc_type": folder_name,
        "filename": saved_filename,
        "result_filename": result_filename,
    }
    return result


def _entries_for_dir(type_dir: pathlib.Path) -> List[Dict[str, Any]]:
    """Return all saved entries inside a single doc-type directory."""
    entries: List[Dict[str, Any]] = []
    for result_file in sorted(type_dir.glob("*_result.json"), reverse=True):
        stem = result_file.stem[: -len("_result")]  # strip _result suffix
        source_files = [
            f for f in type_dir.iterdir()
            if f.stem == stem and f.suffix != ".json"
        ]
        try:
            result_data = json.loads(result_file.read_text(encoding="utf-8"))
        except Exception:
            result_data = {}
        entries.append({
            "doc_type": type_dir.name,
            "filename": source_files[0].name if source_files else None,
            "result_filename": result_file.name,
            "saved_at": datetime.fromtimestamp(result_file.stat().st_mtime).isoformat(),
            "result": result_data,
        })
    return entries


@router.get("/documents/saved", summary="List all saved documents grouped by type")
async def list_saved_documents() -> List[Dict[str, Any]]:
    if not RESOURCES_DIR.exists():
        return []
    entries: List[Dict[str, Any]] = []
    for type_dir in sorted(RESOURCES_DIR.iterdir()):
        if type_dir.is_dir():
            entries.extend(_entries_for_dir(type_dir))
    return entries


@router.get("/documents/saved/{doc_type}", summary="List saved documents for a specific document type")
async def list_saved_documents_by_type(doc_type: str) -> List[Dict[str, Any]]:
    type_dir = RESOURCES_DIR / doc_type
    if not type_dir.exists() or not type_dir.is_dir():
        return []
    return _entries_for_dir(type_dir)


@router.get("/documents/saved/{doc_type}/{filename}", summary="Download a saved document file")
async def get_saved_document(doc_type: str, filename: str) -> FileResponse:
    file_path = RESOURCES_DIR / doc_type / filename
    if not file_path.exists() or not file_path.is_file():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File not found")
    return FileResponse(path=str(file_path), filename=filename)
