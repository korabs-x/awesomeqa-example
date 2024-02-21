import uvicorn
from fastapi import FastAPI

from app.repositories.ticket_repository import TicketRepository
from .routers import author_router, message_router, ticket_router

from .config import TICKET_FILEPATH

app = FastAPI()

app.include_router(author_router.router)
app.include_router(ticket_router.router)
app.include_router(message_router.router)

@app.get("/healthz")
async def root():
    """
    This function represents the root endpoint of the application.
    It returns a string "OK" as a response.
    """
    return "OK"

@app.on_event("startup")
async def startup_event():
    """
    This function is called during the startup of the application.
    It initializes the ticket repository and sets the initial state of the application.
    """
    ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)
    app.state.tickets = ticket_repository.get_tickets()
    app.state.messages = ticket_repository.get_messages()
    app.state.authors = ticket_repository.get_authors()


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
