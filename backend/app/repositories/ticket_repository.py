import json
from typing import Optional


class TicketRepository:
    def __init__(self, filepath: Optional[str] = None):
        self.tickets = []
        self.messages = {}
        if filepath:
            try:
                with open(filepath) as json_file:
                    data = json.load(json_file)
                    self.tickets = data["tickets"]
                    for message in data["messages"]:
                        self.messages[message["id"]] = message
            except FileNotFoundError:
                pass

    def set_mock_data(self, mock_data):
        self.tickets = mock_data["tickets"]
        self.messages = {msg["id"]: msg for msg in mock_data["messages"]}

    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        return self.tickets[:limit]
    
    def get_ticket_with_message(self, ticket_id: str) -> dict:
        ticket = next((t for t in self.tickets if t["id"] == ticket_id), None)
        if ticket:
            message = self.messages.get(ticket["msg_id"])
            ticket["message"] = message
        return ticket

    def delete_ticket(self, ticket_id: str) -> bool:
        original_count = len(self.tickets)
        self.tickets = [ticket for ticket in self.tickets if ticket['id'] != ticket_id]
        return len(self.tickets) < original_count

    def get_message(self, msg_id: str) -> dict:
        return self.messages.get(msg_id)