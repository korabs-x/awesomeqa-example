def test_delete_ticket(test_client, mock_ticket_repository):
    response = test_client.delete("/tickets/1")
    assert response.status_code == 200
    assert response.json() == {"message": "Ticket deleted"}

    response = test_client.delete("/tickets/0")
    assert response.status_code == 404
    assert response.json() == {"detail": "Ticket not found"}

def test_get_tickets_no_filters(test_client, mock_ticket_repository):
    response = test_client.get("/tickets")
    assert response.status_code == 200
    tickets = response.json()["tickets"]
    assert len(tickets) == len(mock_ticket_repository.tickets)

def test_get_tickets_username_filter(test_client, mock_ticket_repository):
    response = test_client.get("/tickets?username=Test User")
    assert response.status_code == 200
    tickets = response.json()["tickets"]
    for ticket in tickets:
        assert "Test User" in ticket["message"]["author"]["name"]

def test_get_tickets_status_filter(test_client, mock_ticket_repository):
    response = test_client.get("/tickets?status=open")
    assert response.status_code == 200
    tickets = response.json()["tickets"]
    for ticket in tickets:
        assert ticket["status"] == "open"

def test_get_tickets_date_range_filters(test_client, mock_ticket_repository):
    response = test_client.get("/tickets?start_date=2023-01-01&end_date=2023-01-02")
    assert response.status_code == 200
    tickets = response.json()["tickets"]
    for ticket in tickets:
        assert "2023-01-01" <= ticket["timestamp"].split(" ")[0] <= "2023-01-02"

def test_get_tickets_combined_filters(test_client, mock_ticket_repository):
    response = test_client.get("/tickets?username=Test User&status=open&start_date=2023-01-01&end_date=2023-01-03")
    assert response.status_code == 200
    tickets = response.json()["tickets"]
    for ticket in tickets:
        assert "Test User" in ticket["message"]["author"]["name"]
        assert ticket["status"] == "open"
        assert "2023-01-01" <= ticket["timestamp"].split(" ")[0] <= "2023-01-03"

def test_get_tickets_with_pagination(test_client, mock_ticket_repository):
    response = test_client.get("/tickets?page=1&limit=2")
    assert response.status_code == 200
    tickets = response.json()["tickets"]
    assert len(tickets) == 2

def test_get_tickets_out_of_range_page(test_client, mock_ticket_repository):
    response = test_client.get("/tickets?page=999&limit=2")
    assert response.status_code == 200
    tickets = response.json()["tickets"]

def test_get_message_with_valid_id(test_client, mock_ticket_repository):
    valid_msg_id = "101"
    response = test_client.get(f"/messages/{valid_msg_id}")
    assert response.status_code == 200
    message = response.json()
    assert message["id"] == valid_msg_id
    assert "author" in message
    assert "content" in message
    assert "timestamp" in message
    assert "msg_url" in message

def test_get_message_with_invalid_id(test_client, mock_ticket_repository):
    invalid_msg_id = "999"
    response = test_client.get(f"/messages/{invalid_msg_id}")
    assert response.status_code == 404
    assert response.json() == {"detail": "Message not found"}