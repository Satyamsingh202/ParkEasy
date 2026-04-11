from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ParkingCreate(BaseModel):
    location: str
    type: str  # free / paid / emergency
    total_slots: int

class ParkingResponse(BaseModel):
    id: int
    location: str
    type: str
    total_slots: int
    available_slots: int

    class Config:
        orm_mode = True

class BookingCreate(BaseModel):
    parking_id: int

class BookingResponse(BaseModel):
    id: int
    parking_id: int
    timestamp: datetime
    qr_payload: Optional[str] = None

    class Config:
        orm_mode = True
