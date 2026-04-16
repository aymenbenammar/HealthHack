from pydantic import BaseModel
from datetime import datetime
from enum import Enum


class RecordType(str, Enum):
    vital_signs = "vital_signs"
    lab_result = "lab_result"
    medication = "medication"
    appointment = "appointment"
    note = "note"


class HealthRecordBase(BaseModel):
    record_type: RecordType
    title: str
    description: str | None = None
    data: dict | None = None


class HealthRecordCreate(HealthRecordBase):
    pass


class HealthRecordUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    data: dict | None = None


class HealthRecordOut(HealthRecordBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
