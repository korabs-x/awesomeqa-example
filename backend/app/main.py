from app.repositories.ticket_repository import TicketRepository
import uvicorn
from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TICKET_FILEPATH = "../data/awesome_tickets.json"
ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)


@app.get("/tickets")
async def get_tickets(
    limit: int = 20,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_tickets(limit)
    ticket_messages = ticket_repository.get_messages_by_id([ticket["msg_id"] for ticket in tickets])

    new_tickets = [ticket | {"message": ticket_messages[index]} for index, ticket in enumerate(tickets)]
    return JSONResponse({"tickets": new_tickets, "messages": ticket_messages}, status_code=200)

class DeleteTicketData(BaseModel):
    ticket_id: str

@app.post("/delete_ticket")
async def delete_ticket(
    data: DeleteTicketData,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    ticket_repository.delete_ticket(data.ticket_id)
    return JSONResponse({}, status_code=200)


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
