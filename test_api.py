from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)
response = client.post("/book", json={"parking_id": 1})
print(response.status_code)
print(response.json())
