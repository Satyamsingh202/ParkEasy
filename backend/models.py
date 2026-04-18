from sqlalchemy import Column, Integer, String, DateTime
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)

class Parking(Base):
    __tablename__ = "parking"
    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, index=True)
    type = Column(String)  # free / paid / emergency
    total_slots = Column(Integer)
    available_slots = Column(Integer)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    parking_id = Column(Integer, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
