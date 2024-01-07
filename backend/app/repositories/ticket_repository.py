import json
from typing import Optional


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        return self.data["tickets"][:limit]

    def delete_ticket(self, ticket_id: str) -> bool:
        original_count = len(self.data["tickets"])
        self.data["tickets"] = [ticket for ticket in self.data["tickets"] if ticket['id'] != ticket_id]
        return len(self.data["tickets"]) < original_count