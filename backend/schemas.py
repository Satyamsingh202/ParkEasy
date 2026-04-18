from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# ---- User Schemas ----

class UserCreate(BaseModel):
    username: str
    full_name: str
    email: str
    phone: str

class UserLogin(BaseModel):
    email: str
    phone: str

class UserResponse(BaseModel):
    id: int
    username: str
    full_name: str
    email: str
    phone: str

    class Config:
        from_attributes = True

# ---- Parking Schemas ----

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
    distance_km: Optional[float] = None

    class Config:
        from_attributes = True

class BookingCreate(BaseModel):
    parking_id: int

class BookingResponse(BaseModel):
    id: int
    parking_id: int
    timestamp: datetime
    qr_payload: Optional[str] = None

    class Config:
        from_attributes = True
