from pydantic import BaseModel
from datetime import datetime

class Author(BaseModel):
    """
        Represents an author.

        Attributes:
            id (str): The unique identifier of the author.
            name (str): The name of the author.
            nickname (str): The nickname of the author.
            color (str): The color associated with the author.
            avatar_url (str): The URL of the author's avatar.
            is_bot (bool): Indicates whether the author is a bot or not.
            timestamp_insert (datetime): The timestamp of when the author was inserted.
    """
    id: str
    name: str
    nickname: str
    color: str
    avatar_url: str
    is_bot: bool
    timestamp_insert: datetime
