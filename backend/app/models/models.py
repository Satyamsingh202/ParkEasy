from sqlalchemy import Column, Integer, String, DateTime
import datetime
from config.database import Base

# Database model strictly storing verified users
class User(Base):
    __tablename__ = "users"
    
    # Unique identifier
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    full_name = Column(String)
    # Emails must remain unique system-wide
    email = Column(String, unique=True, index=True)
    phone = Column(String)

# Stores meta-data about all parking spaces in the framework
class Parking(Base):
    __tablename__ = "parking"
    
    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, index=True)
    # Categorizes the slot (e.g. free / paid / emergency)
    type = Column(String)  
    total_slots = Column(Integer)
    # Tracks dynamically how many slots remain without overriding total capacity
    available_slots = Column(Integer)

# Records end-user reservations tying back to Parking infrastructure
class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    # Simple implicit referencing to a parking spot
    parking_id = Column(Integer, index=True)
    # Determines the exact creation moment to generate QR proofs
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
