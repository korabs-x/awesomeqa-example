from datetime import datetime

from typing import List
from pydantic import BaseModel
from .message import Message

class Ticket(BaseModel):
    """
        Represents a ticket object.

        Attributes:
            id (str): The ID of the ticket.
            status (str): The status of the ticket.
            timestamp (datetime): The timestamp of the ticket.
            msg (Message): The message associated with the ticket.
            context_messages (List[str]): The list of context messages for the ticket.
    """

    id: str
    status: str
    timestamp: datetime
    msg: Message
    context_messages: List[str]
