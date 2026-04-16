from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    APP_NAME: str = "HealthHack API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False

    API_V1_PREFIX: str = "/api/v1"

    # Database
    DATABASE_URL: str = "sqlite:///./healthhack.db"

    # Security
    SECRET_KEY: str = "change-me-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    # CORS
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:5173"]

    # Groq
    GROQ_API_KEY: str = ""
    GROQ_DEFAULT_TEXT_MODEL: str = "llama-3.3-70b-versatile"
    GROQ_DEFAULT_VISION_MODEL: str = "meta-llama/llama-4-scout-17b-16e-instruct"


settings = Settings()
