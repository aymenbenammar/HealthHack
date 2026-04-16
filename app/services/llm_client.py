"""
Groq LLM client with support for plain text, images, and PDFs.

Image handling
--------------
Images are accepted as raw bytes (any common format: JPEG, PNG, WEBP, GIF).
They are base64-encoded and forwarded as image_url blocks to a Groq vision model.

PDF handling
------------
PDFs are processed in two stages:
  1. Text extraction  – pypdf pulls all selectable text from every page.
  2. Page rendering   – pymupdf renders every page to a PNG and passes them
                        as images so scanned / image-heavy PDFs are still
                        understood by the vision model.

Both the extracted text and the page images are included in the same request,
giving the model the richest possible view of the document.
"""

import base64
import io
from typing import Any

import fitz  # pymupdf
import pypdf
from groq import Groq

from app.core.config import settings
from app.schemas.llm import ChatResponse, Message, Role


class GroqLLMClient:
    def __init__(
        self,
        api_key: str | None = None,
        text_model: str | None = None,
        vision_model: str | None = None,
    ) -> None:
        self._client = Groq(api_key=api_key or settings.GROQ_API_KEY)
        self._text_model = text_model or settings.GROQ_DEFAULT_TEXT_MODEL
        self._vision_model = vision_model or settings.GROQ_DEFAULT_VISION_MODEL

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def chat(
        self,
        prompt: str,
        *,
        system_prompt: str | None = None,
        history: list[Message] | None = None,
        images: list[bytes] | None = None,
        pdfs: list[bytes] | None = None,
        model: str | None = None,
    ) -> ChatResponse:
        """Send a chat request, optionally including images and/or PDFs.

        Parameters
        ----------
        prompt:        The user's text message.
        system_prompt: Optional system-level instruction.
        history:       Prior conversation turns (role + content pairs).
        images:        Raw image bytes (JPEG / PNG / WEBP / GIF).
        pdfs:          Raw PDF bytes.  Text and page renders are extracted
                       automatically and appended to the user turn.
        model:         Override the default model for this request.
        """
        images = images or []
        pdfs = pdfs or []
        history = history or []

        has_visuals = bool(images or pdfs)
        resolved_model = model or (self._vision_model if has_visuals else self._text_model)

        messages: list[dict[str, Any]] = []

        if system_prompt:
            messages.append({"role": Role.system, "content": system_prompt})

        for msg in history:
            messages.append({"role": msg.role, "content": msg.content})

        user_content: list[dict[str, Any]] = [{"type": "text", "text": prompt}]

        # ---- PDFs -------------------------------------------------------
        for pdf_bytes in pdfs:
            text, page_images = self._process_pdf(pdf_bytes)
            if text.strip():
                user_content.append(
                    {"type": "text", "text": f"[PDF extracted text]\n{text}"}
                )
            for img_b64 in page_images:
                user_content.append(self._image_url_block(img_b64, "image/png"))

        # ---- Standalone images ------------------------------------------
        for img_bytes in images:
            mime, b64 = self._encode_image(img_bytes)
            user_content.append(self._image_url_block(b64, mime))

        messages.append({"role": Role.user, "content": user_content})

        response = self._client.chat.completions.create(
            model=resolved_model,
            messages=messages,  # type: ignore[arg-type]
        )

        choice = response.choices[0].message
        usage = response.usage

        return ChatResponse(
            content=choice.content or "",
            model=response.model,
            prompt_tokens=usage.prompt_tokens,
            completion_tokens=usage.completion_tokens,
            total_tokens=usage.total_tokens,
        )

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _process_pdf(self, pdf_bytes: bytes) -> tuple[str, list[str]]:
        """Return (full_text, list_of_base64_page_pngs) for a PDF."""
        text = self._extract_pdf_text(pdf_bytes)
        page_images = self._render_pdf_pages(pdf_bytes)
        return text, page_images

    @staticmethod
    def _extract_pdf_text(pdf_bytes: bytes) -> str:
        reader = pypdf.PdfReader(io.BytesIO(pdf_bytes))
        parts: list[str] = []
        for page_num, page in enumerate(reader.pages, start=1):
            page_text = page.extract_text() or ""
            if page_text.strip():
                parts.append(f"--- Page {page_num} ---\n{page_text}")
        return "\n\n".join(parts)

    @staticmethod
    def _render_pdf_pages(pdf_bytes: bytes, dpi: int = 150) -> list[str]:
        """Render every PDF page to a PNG and return base64-encoded strings."""
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        b64_pages: list[str] = []
        zoom = dpi / 72  # 72 DPI is PyMuPDF's default
        matrix = fitz.Matrix(zoom, zoom)
        for page in doc:
            pix = page.get_pixmap(matrix=matrix, alpha=False)
            b64_pages.append(base64.b64encode(pix.tobytes("png")).decode())
        doc.close()
        return b64_pages

    @staticmethod
    def _encode_image(image_bytes: bytes) -> tuple[str, str]:
        """Detect MIME type and return (mime_type, base64_string)."""
        # Detect by magic bytes
        if image_bytes[:3] == b"\xff\xd8\xff":
            mime = "image/jpeg"
        elif image_bytes[:8] == b"\x89PNG\r\n\x1a\n":
            mime = "image/png"
        elif image_bytes[:6] in (b"GIF87a", b"GIF89a"):
            mime = "image/gif"
        elif image_bytes[:4] == b"RIFF" and image_bytes[8:12] == b"WEBP":
            mime = "image/webp"
        else:
            mime = "image/jpeg"  # safe fallback
        return mime, base64.b64encode(image_bytes).decode()

    @staticmethod
    def _image_url_block(b64: str, mime: str) -> dict[str, Any]:
        return {
            "type": "image_url",
            "image_url": {"url": f"data:{mime};base64,{b64}"},
        }


# Module-level singleton — import and use directly
llm_client = GroqLLMClient()
