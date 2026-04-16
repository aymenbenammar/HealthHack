from fastapi import APIRouter, HTTPException, status
from datetime import datetime

from app.schemas.health_record import HealthRecordCreate, HealthRecordOut, HealthRecordUpdate

router = APIRouter()

# In-memory store for demo purposes — replace with DB queries
_records: dict[int, dict] = {}
_next_id = 1


@router.get("/", response_model=list[HealthRecordOut])
async def list_records(user_id: int | None = None):
    records = list(_records.values())
    if user_id is not None:
        records = [r for r in records if r["user_id"] == user_id]
    return records


@router.post("/", response_model=HealthRecordOut, status_code=status.HTTP_201_CREATED)
async def create_record(payload: HealthRecordCreate, user_id: int = 1):
    global _next_id
    now = datetime.utcnow()
    record = {
        "id": _next_id,
        "user_id": user_id,
        "record_type": payload.record_type,
        "title": payload.title,
        "description": payload.description,
        "data": payload.data,
        "created_at": now,
        "updated_at": now,
    }
    _records[_next_id] = record
    _next_id += 1
    return record


@router.get("/{record_id}", response_model=HealthRecordOut)
async def get_record(record_id: int):
    record = _records.get(record_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    return record


@router.patch("/{record_id}", response_model=HealthRecordOut)
async def update_record(record_id: int, payload: HealthRecordUpdate):
    record = _records.get(record_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    if payload.title is not None:
        record["title"] = payload.title
    if payload.description is not None:
        record["description"] = payload.description
    if payload.data is not None:
        record["data"] = payload.data
    record["updated_at"] = datetime.utcnow()
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_record(record_id: int):
    if record_id not in _records:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    del _records[record_id]
