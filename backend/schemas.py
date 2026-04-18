from pydantic import BaseModel
from typing import Optional
from datetime import datetime

<<<<<<< HEAD
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
        orm_mode = True

# ---- Parking Schemas ----

=======
>>>>>>> main
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
<<<<<<< HEAD
=======
    distance_km: Optional[float] = None
>>>>>>> main

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
