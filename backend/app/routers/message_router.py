from datetime import datetime
from typing import Annotated, Union, Dict

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi_pagination import Page, Params, paginate

from app.models.message import Message


router = APIRouter(prefix="/messages", tags=["Messages"])

def get_messages_from_app_state(request: Request):
    """
        Retrieve the messages from the application state.

        Args:
            request (Request): The incoming request.

        Returns:
            List[Message]: The list of messages stored in the application state.
    """
    return request.app.state.messages

@router.get("/", response_model=Page[Message])
def get_all_messages(
        params: Params = Depends(),
        sort_order: Annotated[
            Union[str, None], Query(pattern="^newest|oldest$")
        ] = "newest",
        messages: Dict[str, Dict] = Depends(get_messages_from_app_state)
    ):
    """
        Retrieve all messages from the app state and return them in a sorted and paginated manner.

        Args:
            params (Params): The parameters for pagination.
            sort_order (str, optional): The sort order for the messages. 
                                        Can be "newest" or "oldest". Defaults to "newest".
            messages (Dict[str, Dict]): The dictionary containing all the messages.

        Returns:
            List[Message]: The sorted and paginated list of messages.
    """
    sorted_messages = sorted(
        messages.values(),
        key=lambda x: datetime.strptime(x['timestamp_insert'], '%Y-%m-%d %H:%M:%S.%f').timestamp(),
        reverse=(sort_order.lower() == "newest")
    )
    message_objects = [Message(**message) for message in sorted_messages]
    return paginate(message_objects, params)

@router.get("/{msg_id}", response_model=Message)
def get_messages(msg_id: str, messages: Dict[str, Dict] = Depends(get_messages_from_app_state)):
    """
        Retrieve a specific message by its ID from the messages dictionary.

        Parameters:
        - msg_id (str): The ID of the message to retrieve.
        - messages (Dict[str, Dict]): The dictionary containing all the messages.

        Returns:
        - Dict: The message with the specified ID.

        Raises:
        - HTTPException: If the message with the specified ID is not found.
    """
    message = messages.get(msg_id)
    if message:
        return message
    raise HTTPException(status_code=404, detail="Message not found")
