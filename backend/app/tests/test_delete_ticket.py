from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_delete_ticket():
    # Test if ticket is deleted
    response = client.delete("/tickets/83a1af5b-5817-44f9-acbf-d0bef22b3759")
    assert response.status_code == 200
    assert response.json() == {"message": "Ticket deleted"}

    # Test if ticket is not found
    response = client.delete("/tickets/3891af5b-5817-44f9-acbf-d0bef22b3759")
    assert response.status_code == 404
    assert response.json() == {"detail": "Ticket not found"}