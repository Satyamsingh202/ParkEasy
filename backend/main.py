from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json

import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="QR Parking API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- User Auth Endpoints ----

@app.post("/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = models.User(
        username=user.username,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=schemas.UserResponse)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.email == credentials.email,
        models.User.phone == credentials.phone
    ).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or phone number")
    return user

@app.get("/user/{id}", response_model=schemas.UserResponse)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# ---- Parking Endpoints ----

@app.post("/parking", response_model=schemas.ParkingResponse)
def create_parking(parking: schemas.ParkingCreate, db: Session = Depends(get_db)):
    new_parking = models.Parking(
        location=parking.location,
        type=parking.type,
        total_slots=parking.total_slots,
        available_slots=parking.total_slots
    )
    db.add(new_parking)
    db.commit()
    db.refresh(new_parking)
    return new_parking

@app.get("/parking", response_model=list[schemas.ParkingResponse])
def get_all_parking(db: Session = Depends(get_db)):
    return db.query(models.Parking).all()

@app.get("/parking/{id}", response_model=schemas.ParkingResponse)
def get_parking(id: int, db: Session = Depends(get_db)):
    parking = db.query(models.Parking).filter(models.Parking.id == id).first()
    if not parking:
        raise HTTPException(status_code=404, detail="Parking not found")
    return parking

@app.post("/book", response_model=schemas.BookingResponse)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    parking = db.query(models.Parking).filter(models.Parking.id == booking.parking_id).first()
    if not parking:
        raise HTTPException(status_code=404, detail="Parking not found")
    
    if parking.available_slots <= 0:
        raise HTTPException(status_code=400, detail="No available slots")
    
    parking.available_slots -= 1
    
    new_booking = models.Booking(
        parking_id=booking.parking_id
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    
    # Generate unique QR Payload (JSON string simulating a token)
    qr_payload = json.dumps({
        "bookingId": new_booking.id,
        "parkingId": new_booking.parking_id,
        "timestamp": new_booking.timestamp.isoformat()
    })
    
    response = schemas.BookingResponse(
        id=new_booking.id,
        parking_id=new_booking.parking_id,
        timestamp=new_booking.timestamp,
        qr_payload=qr_payload
    )
    
    return response

@app.get("/bookings", response_model=list[schemas.BookingResponse])
def get_all_bookings(db: Session = Depends(get_db)):
    return db.query(models.Booking).all()
