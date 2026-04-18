from database import SessionLocal, engine
import models
from datetime import datetime

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Check if parking exists
parking = db.query(models.Parking).first()
if not parking:
    print("No parking found, inserting dummy data.")
    p1 = models.Parking(location="Downtown Garage", type="paid", total_slots=50, available_slots=50)
    p2 = models.Parking(location="City Center Mall", type="free", total_slots=100, available_slots=100)
    db.add_all([p1, p2])
    db.commit()
    print("Inserted dummy parking data.")
else:
    print("Parking data already exists.")
db.close()
