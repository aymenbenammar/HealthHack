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
from groq import Groq
from app.core.config import settings
from openai import OpenAI
from app.services.utils import split_pdf_to_images

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
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
            self.logger.addHandler(handler)

    def analyze_document(self, file_bytes: bytes, filename: str,prompt:str, model: str = None) -> dict:
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

        # Extract the JSON object by finding the outermost { ... }
        start = raw.find("{")
        end = raw.rfind("}") + 1
        try:
            result = json.loads(raw[start:end])
        except (json.JSONDecodeError, ValueError):
            result = {"result": raw}

        # Save result to resources/
        os.makedirs("resources", exist_ok=True)
        base_name = os.path.splitext(filename)[0]
        output_path = os.path.join("resources", f"{base_name}_result.json")
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        self.logger.info(f"Result saved to {output_path}")

        return result
