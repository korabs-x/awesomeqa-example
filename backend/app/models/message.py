from datetime import datetime
from pydantic import BaseModel
from .author import Author

class Message(BaseModel):
    """
        Represents a message object.

        Attributes:
            id (str): The unique identifier of the message.
            timestamp_insert (datetime): The timestamp when the message was inserted.
            author_id (str): The unique identifier of the message author.
            content (str): The content of the message.
            msg_url (str): The URL of the message.
            author (Author): The author of the message.
    """
    id: str
    timestamp_insert: datetime
    author_id: str
    content: str
    msg_url: str
    author: Author
