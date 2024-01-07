import pytest
from fastapi.testclient import TestClient
from app.main import app, get_ticket_repository
from app.repositories.ticket_repository import TicketRepository

@pytest.fixture(scope="module")
def test_client():
    return TestClient(app)

@pytest.fixture(scope="module")
def mock_ticket_repository():
    mock_ticket =   {
            "id": "12345",
            "msg_id": "2024",
            "status": "open",
            "resolved_by": 'null',
            "ts_last_status_change": 'null',
            "timestamp": "2023-11-02 10:57:08.165617",
            "context_messages": ["1", "2", "3", "4"]
    }
    mock_ticket_list = [mock_ticket]
    ticket_repository = TicketRepository(filepath="dummy")
    ticket_repository.set_mock_data({"tickets": mock_ticket_list})
    app.dependency_overrides[get_ticket_repository] = lambda: ticket_repository
    return ticket_repository