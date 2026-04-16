from fastapi import APIRouter

from app.api.v1.endpoints import health_records, llm, users

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(health_records.router, prefix="/health-records", tags=["health-records"])
api_router.include_router(llm.router, prefix="/llm", tags=["llm"])
