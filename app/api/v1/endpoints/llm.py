"""
LLM chat endpoint.

Accepts a multipart/form-data request so callers can attach images and PDFs
alongside the text prompt in a single HTTP call.

Fields
------
prompt          (required) The user's message.
system_prompt   (optional) System-level instruction.
model           (optional) Override the default Groq model.
images          (optional) One or more image files (JPEG/PNG/WEBP/GIF).
pdfs            (optional) One or more PDF files.

For JSON-only requests (no files), use POST /chat instead.
"""

from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from app.schemas.llm import ChatRequest, ChatResponse, Message, Role
from app.services.llm_client import llm_client

router = APIRouter()


@router.post("/chat", response_model=ChatResponse, summary="JSON chat (no files)")
async def chat(body: ChatRequest) -> ChatResponse:
    """Plain JSON endpoint — no file attachments."""
    try:
        return llm_client.chat(
            prompt=body.prompt,
            system_prompt=body.system_prompt,
            history=body.history,
            model=body.model,
        )
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc))


@router.post(
    "/chat/multipart",
    response_model=ChatResponse,
    summary="Multipart chat (images + PDFs)",
)
async def chat_multipart(
    prompt: str = Form(...),
    system_prompt: str | None = Form(default=None),
    model: str | None = Form(default=None),
    images: list[UploadFile] = File(default=[]),
    pdfs: list[UploadFile] = File(default=[]),
) -> ChatResponse:
    """
    Multipart endpoint — attach images and/or PDFs alongside the prompt.

    Example (curl):
        curl -X POST http://localhost:8000/api/v1/llm/chat/multipart \\
          -F "prompt=Summarise this document" \\
          -F "pdfs=@report.pdf" \\
          -F "images=@chart.png"
    """
    _assert_allowed_types(images, allowed={"image/jpeg", "image/png", "image/webp", "image/gif"})
    _assert_allowed_types(pdfs, allowed={"application/pdf"})

    image_bytes = [await f.read() for f in images]
    pdf_bytes = [await f.read() for f in pdfs]

    try:
        return llm_client.chat(
            prompt=prompt,
            system_prompt=system_prompt,
            images=image_bytes,
            pdfs=pdf_bytes,
            model=model,
        )
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc))


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _assert_allowed_types(files: list[UploadFile], allowed: set[str]) -> None:
    for f in files:
        if f.content_type and f.content_type not in allowed:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=f"Unsupported file type '{f.content_type}' for '{f.filename}'. "
                       f"Allowed: {', '.join(sorted(allowed))}",
            )
