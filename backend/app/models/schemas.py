from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# ---- User Schemas ----

# Expected payload schema for registering a fresh user
class UserCreate(BaseModel):
    username: str
    full_name: str
    email: str
    phone: str

# Payload strictly containing login assertions
class UserLogin(BaseModel):
    email: str
    phone: str

# Public outbound shape of a User structure
class UserResponse(BaseModel):
    id: int
    username: str
    full_name: str
    email: str
    phone: str

    class Config:
        # Maps SQLAlchemy properties directly to shape the output JSON
        from_attributes = True

# ---- Parking Schemas ----

# Input shape to establish a new parking lot
class ParkingCreate(BaseModel):
    location: str
    type: str  # e.g., free / paid / emergency
    total_slots: int

# Expected outbound structure encapsulating dynamic availability status
class ParkingResponse(BaseModel):
    id: int
    location: str
    type: str
    total_slots: int
    available_slots: int
    # Optional field that may be dynamically calculated
    distance_km: Optional[float] = None

    class Config:
        from_attributes = True

# Minimum required data to perform a fast-acting slot booking
class BookingCreate(BaseModel):
    parking_id: int

# Outbound format of a successful reservation mapping
class BookingResponse(BaseModel):
    id: int
    parking_id: int
    # Required for QR validation lifespan matching
    timestamp: datetime
    # The JSON string required purely for frontend QR generation
    qr_payload: Optional[str] = None

    class Config:
        from_attributes = True
