from fastapi.testclient import TestClient
from app.main import app, get_ticket_repository
from app.repositories.ticket_repository import TicketRepository

client = TestClient(app)

mock_ticket =   {
            "id": "12345",
            "msg_id": "2024",
            "status": "open",
            "resolved_by": 'null',
            "ts_last_status_change": 'null',
            "timestamp": "2023-11-02 10:57:08.165617",
            "context_messages": ["1", "2", "3", "4"]
}

# Mock ticket list
mock_ticket_list = [mock_ticket]

# Set mock data for testing
ticket_repository = TicketRepository(filepath="dummy")
ticket_repository.set_mock_data({"tickets": mock_ticket_list})
app.dependency_overrides[TicketRepository] = lambda: ticket_repository

app.dependency_overrides[get_ticket_repository] = lambda: ticket_repository

def test_delete_ticket():
    # Test if ticket is deleted
    response = client.delete("/tickets/12345")
    assert response.status_code == 200
    assert response.json() == {"message": "Ticket deleted"}

    # Test if ticket is not found
    response = client.delete("/tickets/3891af5b-5817-44f9-acbf-d0bef22b3759")
    assert response.status_code == 404
    assert response.json() == {"detail": "Ticket not found"}