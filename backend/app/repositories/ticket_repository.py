import json
from typing import Optional

class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            raw_data = json.load(json_file)
            self.tickets = raw_data["tickets"]
            self.messages = raw_data["messages"]
            self.ticket_dict = {ticket["id"]: (ticket | {"index": index}) for index, ticket in enumerate(self.tickets)}
            self.message_dict = {message["id"]: message for message in self.messages}

    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        return self.tickets[:limit]
    
    def get_messages(self, limit: Optional[int] = None) -> list[dict]:
        return self.messages[:limit]
    
    def get_messages_by_id(self, message_ids: list[int]) -> list[dict]:
        return [self.message_dict[message_id] for message_id in message_ids]
    
    def delete_ticket(self, ticket_id: int):
        del self.tickets[self.ticket_dict[ticket_id]["index"]]
