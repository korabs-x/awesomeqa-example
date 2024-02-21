from datetime import datetime
from typing import Annotated, Union, Dict

from fastapi import APIRouter, Request, Depends, HTTPException, Query
from fastapi_pagination import Page, Params, paginate

from app.models.ticket import Ticket

router = APIRouter(prefix="/tickets", tags=["Tickets"])


def get_tickets_from_app_state(request: Request):
    """
        Retrieve the tickets from the application state.

        Args:
            request (Request): The incoming request object.

        Returns:
            List[Ticket]: The list of tickets stored in the application state.
    """
    return request.app.state.tickets

@router.get("/", response_model=Page[Ticket])
def get_all_tickets(
    params: Params = Depends(),
    sort_order: Annotated[
        Union[str, None], Query(pattern="^newest|oldest$")
    ] = "newest",
    status: Annotated[
        Union[str, None], Query(pattern="^open|closed$")
    ] = None,
    author_type: Annotated[
        Union[str, None], Query(pattern="^bot|human$")
    ] = None,
    tickets: Dict = Depends(get_tickets_from_app_state)
):
    """
        Retrieve all tickets based on the specified parameters.

        Args:
            params (Params): The parameters for pagination.
            sort_order (str, optional): The sort order of the tickets. 
                                        Can be "newest" or "oldest". Defaults to "newest".
            status (str, optional): The status of the tickets. 
                                    Can be "open" or "closed". Defaults to None.
            author_type (str, optional): The type of author of the tickets. 
                                         Can be "bot" or "human". Defaults to None.
            tickets (Dict): The dictionary containing all the tickets.

        Returns:
            List: The list of filtered and sorted tickets based on the specified parameters.
    """
    sorted_tickets = sorted(
        tickets.values(),
        key=lambda x: datetime.strptime(x['timestamp'], '%Y-%m-%d %H:%M:%S.%f').timestamp(),
        reverse=(sort_order.lower() == "newest")
    )
    filtered_tickets = []

    for ticket in sorted_tickets:
        if status and ticket['status'] != status:
            continue
        if author_type and ticket['msg']['author']['is_bot'] != (author_type == "bot"):
            continue
        filtered_tickets.append(ticket)

    return paginate(filtered_tickets, params)

@router.get("/{ticket_id}", response_model=Ticket)
def get_author(ticket_id: str, tickets: Dict = Depends(get_tickets_from_app_state)):
    """
        Retrieve the author of a ticket based on the ticket ID.

        Args:
            ticket_id (str): The ID of the ticket.
            tickets (Dict): A dictionary containing all the tickets.

        Returns:
            dict: The ticket information if found.

        Raises:
            HTTPException: If the ticket is not found.
    """
    ticket = tickets.get(ticket_id)
    if ticket:
        return ticket
    raise HTTPException(status_code=404, detail="Ticket not found")

@router.put("/{ticket_id}/status", response_model=Ticket)
def update_ticket_status(
    ticket_id: str,
    status: Annotated[
        str, Query(pattern="^open|closed$")
    ],
    tickets: Dict = Depends(get_tickets_from_app_state)
):
    """
        Update the status of a ticket.

        Args:
            ticket_id (str): The ID of the ticket to update.
            status (str): The new status of the ticket. Must be either "open" or "closed".
            tickets (Dict): The dictionary containing all the tickets.

        Returns:
            dict: The updated ticket.

        Raises:
            HTTPException: If the ticket with the given ID is not found.
        """
    ticket = tickets.get(ticket_id)
    if ticket:
        ticket['status'] = status
        tickets[ticket_id] = ticket
        return ticket
    raise HTTPException(status_code=404, detail="Ticket not found")

@router.delete("/{ticket_id}")
def delete_ticket(ticket_id: str, tickets: Dict = Depends(get_tickets_from_app_state)):
    """
        Delete a ticket from the tickets dictionary based on the given ticket_id.
        
        Args:
            ticket_id (str): The ID of the ticket to be deleted.
            tickets (Dict): The dictionary containing all the tickets.
            
        Returns:
            dict: A dictionary with a message indicating the success of the deletion.
            
        Raises:
            HTTPException: If the ticket with the given ticket_id is not found.
    """
    ticket = tickets.get(ticket_id)
    if ticket:
        del tickets[ticket_id]
        return {"message": "Ticket deleted successfully"}
    raise HTTPException(status_code=404, detail="Ticket not found")
