from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import json
from app.models import models, schemas
from config.database import get_db

booking_router = APIRouter()

# Create a booking for a specific parking lot
@booking_router.post("/book", response_model=schemas.BookingResponse)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    # Verify the parking location exists
    parking = db.query(models.Parking).filter(models.Parking.id == booking.parking_id).first()
    if not parking:
        raise HTTPException(status_code=404, detail="Parking not found")

    # Ensure there is availability before booking
    if parking.available_slots <= 0:
        raise HTTPException(status_code=400, detail="No available slots")

    # Decrement available slot count atomically (simplified handling)
    parking.available_slots -= 1

    # Book the slot
    new_booking = models.Booking(
        parking_id=booking.parking_id
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    # Ensure timestamp always exists to calculate QR payload correctly
    timestamp = getattr(new_booking, "timestamp", None) or datetime.utcnow()

    # Generate QR payload data encompassing key booking details
    qr_payload = json.dumps({
        "bookingId": new_booking.id,
        "parkingId": new_booking.parking_id,
        "timestamp": timestamp.isoformat()
    })

    return schemas.BookingResponse(
        id=new_booking.id,
        parking_id=new_booking.parking_id,
        timestamp=timestamp,
        qr_payload=qr_payload
    )

# Retrieve a list of all successful bookings
@booking_router.get("/bookings", response_model=List[schemas.BookingResponse])
def get_all_bookings(db: Session = Depends(get_db)):
    bookings = db.query(models.Booking).all()

    result = []
    for b in bookings:
        # Fallback timestamp logic to avert NoneType formatting issues
        timestamp = getattr(b, "timestamp", None) or datetime.utcnow()

        result.append(
            schemas.BookingResponse(
                id=b.id,
                parking_id=b.parking_id,
                timestamp=timestamp,
                qr_payload=json.dumps({
                    "bookingId": b.id,
                    "parkingId": b.parking_id,
                    "timestamp": timestamp.isoformat()
                })
            )
        )

    return result
