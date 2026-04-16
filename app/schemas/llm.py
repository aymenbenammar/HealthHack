from pydantic import BaseModel
from enum import Enum


class Role(str, Enum):
    system = "system"
    user = "user"
    assistant = "assistant"


class Message(BaseModel):
    role: Role
    content: str


class ChatRequest(BaseModel):
    prompt: str
    system_prompt: str | None = None
    history: list[Message] = []
    model: str | None = None  # overrides default when provided


class ChatResponse(BaseModel):
    content: str
    model: str
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int
