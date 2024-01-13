import pytest
from fastapi.testclient import TestClient
from app.main import app, get_ticket_repository
from app.repositories.ticket_repository import TicketRepository

@pytest.fixture(scope="module")
def test_client():
    return TestClient(app)

@pytest.fixture(scope="module")
def mock_ticket_repository():
    mock_tickets = [
        {"id": "1", "msg_id": "101", "status": "open", "timestamp": "2023-01-01 10:00:00.000000"},
        {"id": "2", "msg_id": "102", "status": "closed", "timestamp": "2023-01-02 10:00:00.000000"},
        {"id": "3", "msg_id": "103", "status": "open", "timestamp": "2023-01-03 10:00:00.000000"},
    ]

    mock_messages = [
        {
            "id": "101",
            "author": {
                "name": "Test User 1",
                "avatar_url": "http://example.com/avatar1.png"
            },
            "content": "This is a test message content from user 1.",
            "timestamp": "2023-01-01 10:00:00.000000",
            "msg_url": "http://example.com/message/101"
        },
        {
            "id": "102",
            "author": {
                "name": "Test User 2",
                "avatar_url": "http://example.com/avatar2.png"
            },
            "content": "This is a test message content from user 2.",
            "timestamp": "2023-01-02 10:00:00.000000",
            "msg_url": "http://example.com/message/102"
        },
        {
            "id": "103",
            "author": {
                "name": "Test User 3",
                "avatar_url": "http://example.com/avatar3.png"
            },
            "content": "This is a test message content from user 3.",
            "timestamp": "2023-01-03 10:00:00.000000",
            "msg_url": "http://example.com/message/103"
        },
    ]

    ticket_repository = TicketRepository(filepath="dummy")
    ticket_repository.set_mock_data({"tickets": mock_tickets, "messages": mock_messages})
    app.dependency_overrides[get_ticket_repository] = lambda: ticket_repository
    return ticket_repository