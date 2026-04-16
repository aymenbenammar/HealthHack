from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    APP_NAME: str = "HealthHack API"
    APP_VERSION: str = "0.1.0"

    API_V1_PREFIX: str = "/api/v1"

    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]

    GROQ_API_KEY: str = ""
    GROQ_DEFAULT_VISION_MODEL: str = "meta-llama/llama-4-scout-17b-16e-instruct"
    GROQ_DEFAULT_TEXT_MODEL: str = "llama-3.3-70b-versatile"



settings = Settings()
