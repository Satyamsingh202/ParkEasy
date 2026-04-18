from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import models, schemas
from config.database import get_db

auth_router = APIRouter()

# Register a new user in the system
@auth_router.post("/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if the email is already registered to avoid duplicates
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user database model instance
    new_user = models.User(
        username=user.username,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone
    )

    # Persist the user to the database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Authenticate an existing user
@auth_router.post("/login", response_model=schemas.UserResponse)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    # Validate user credentials match the database record
    user = db.query(models.User).filter(
        models.User.email == credentials.email,
        models.User.phone == credentials.phone
    ).first()

    # Reject invalid logins
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or phone number")

    return user

# Fetch user details by ID
@auth_router.get("/user/{id}", response_model=schemas.UserResponse)
def get_user(id: int, db: Session = Depends(get_db)):
    # Query database for the specific user
    user = db.query(models.User).filter(models.User.id == id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
