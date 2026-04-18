import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import local routed domains
from app.routes.auth import auth_router
from app.routes.parking import parking_router
from app.routes.booking import booking_router
from app.models import models
from config.database import engine

# Automatically initialize all SQLite schema tables defined in models.py
models.Base.metadata.create_all(bind=engine)

# Create the top-level FastAPI application
app = FastAPI(title="QR Parking API")

# Register broad Cross-Origin policies to prevent frontend blockage
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect decoupled routing endpoints to this main app instance
app.include_router(auth_router)
app.include_router(parking_router)
app.include_router(booking_router)

# Native execution block allows starting via `python main.py` rather than calling Uvicorn externally
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)