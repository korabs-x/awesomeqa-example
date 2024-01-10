import pytest
from fastapi.testclient import TestClient
from app.main import app, get_ticket_repository
from app.repositories.ticket_repository import TicketRepository

@pytest.fixture(scope="module")
def test_client():
    return TestClient(app)

@pytest.fixture(scope="module")
def mock_ticket_repository():
    mock_ticket = {
        "id": "12345",
        "msg_id": "2024",
        "status": "open",
        "resolved_by": None,
        "ts_last_status_change": None,
        "timestamp": "2023-11-02 10:57:08.165617",
        "context_messages": ["1", "2", "3", "4"]
    }
    mock_message = {
        "id": "2024",
        "author": {
            "name": "Test User",
            "avatar_url": "http://example.com/avatar.png"
        },
        "content": "This is a test message content.",
        "timestamp": "2023-11-02 10:57:08.165617",
        "msg_url": "http://example.com/message/2024"
    }
    mock_ticket_list = [mock_ticket]
    mock_message_list = [mock_message]
    ticket_repository = TicketRepository(filepath="dummy")
    ticket_repository.set_mock_data({"tickets": mock_ticket_list, "messages": mock_message_list})
    app.dependency_overrides[get_ticket_repository] = lambda: ticket_repository
    return ticket_repository