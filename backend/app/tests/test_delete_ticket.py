def test_delete_ticket(test_client, mock_ticket_repository):
    # Test if ticket is deleted
    response = test_client.delete("/tickets/12345")
    assert response.status_code == 200
    assert response.json() == {"message": "Ticket deleted"}

    # Test if ticket is not found
    response = test_client.delete("/tickets/3891af5b-5817-44f9-acbf-d0bef22b3759")
    assert response.status_code == 404
    assert response.json() == {"detail": "Ticket not found"}