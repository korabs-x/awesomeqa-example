from app.repositories.ticket_repository import TicketRepository
import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import JSONResponse


app = FastAPI()

TICKET_FILEPATH = "../data/awesome_tickets.json"

def get_ticket_repository() -> TicketRepository:
    return TicketRepository(filepath=TICKET_FILEPATH)

@app.get("/healthz")
async def root():
    return "OK"


@app.get("/tickets")
async def get_tickets(
    limit: int = 20,
    ticket_repository: TicketRepository = Depends(get_ticket_repository),
):
    tickets = ticket_repository.get_tickets(limit)
    return JSONResponse(tickets, status_code=200)

@app.delete("/tickets/{ticket_id}")
async def delete_ticket(ticket_id: str, ticket_repository: TicketRepository = Depends(get_ticket_repository)):
    success = ticket_repository.delete_ticket(ticket_id)
    if not success:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return {"message": "Ticket deleted"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
