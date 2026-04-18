from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models import models, schemas
from config.database import get_db

parking_router = APIRouter()

# Create a new parking location listing
@parking_router.post("/parking", response_model=schemas.ParkingResponse)
def create_parking(parking: schemas.ParkingCreate, db: Session = Depends(get_db)):
    # Initialize parking database model
    new_parking = models.Parking(
        location=parking.location,
        type=parking.type,
        total_slots=parking.total_slots,
        available_slots=parking.total_slots
    )

    # Save to the database
    db.add(new_parking)
    db.commit()
    db.refresh(new_parking)

    return new_parking

# Fetch all parking lots, with optional location-based filtering
@parking_router.get("/parking", response_model=List[schemas.ParkingResponse])
def get_all_parking(location: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Parking)

    # Filter results dynamically if a location param is provided
    if location:
        query = query.filter(models.Parking.location.ilike(f"%{location}%"))

    return query.all()

# Retrieve details of a specific parking lot
@parking_router.get("/parking/{id}", response_model=schemas.ParkingResponse)
def get_parking(id: int, db: Session = Depends(get_db)):
    parking = db.query(models.Parking).filter(models.Parking.id == id).first()

    if not parking:
        raise HTTPException(status_code=404, detail="Parking not found")

    return parking
