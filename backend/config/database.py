from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define SQLite database file location
SQLALCHEMY_DATABASE_URL = "sqlite:///./parking.db"

# Create a synchronous robust SQLAlchemy engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create a session factory to spawn DB sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class to inherit for ORM models
Base = declarative_base()

# Generator function for database injection
def get_db():
    db = SessionLocal()
    try:
        # Provide the caller with DB access
        yield db
    finally:
        # Ensure cleanup always executes
        db.close()
