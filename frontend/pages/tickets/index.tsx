import * as React from "react";
import { NextPage } from "next";
import Ticket from "./ticket";
import TicketList from "./ticket_list";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";


const Tickets: NextPage = () => {
    const [showTicketList, setShowTicketList] = React.useState(0);
    const [tickets, setTickets] = React.useState<TicketData[]>([]); 

    React.useEffect(() => {
        fetch('http://localhost:5001/tickets')
           .then((response) => response.json())
           .then((data) => {
              setTickets(data["tickets"]);
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);

    const [activeIndex, setActiveIndex] = React.useState(0);
    
    const onNext = () => {
        if (tickets.length == activeIndex + 1)
        {
            setActiveIndex(0);
        }
        else {
            setActiveIndex(activeIndex + 1);
        }
    };

    const onRemove = () => {
        fetch('http://localhost:5001/delete_ticket', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({"ticket_id": tickets[activeIndex].id}),
        }).then(
            () => 
            {
                setTickets(tickets.splice(activeIndex, 1));
                if (activeIndex == tickets.length)
                {
                    setActiveIndex(0);
                }
            }
        ).catch(
            () => console.log("Could not delete data")
        );
    };

    const onOpenTicket = (index: number) => {
        setShowTicketList(0); 
        setActiveIndex(index)
    };

    return (
    <Box sx={{ flexDirection: 'column'}}>
        <Box sx={{display: "flex", flexDirection: 'row-reverse', py: 8}}>
            <ToggleButtonGroup
                value={showTicketList}
                exclusive
                onChange={(_, value: number) => setShowTicketList(value)}
                >
                <ToggleButton value={0}>Ticket View</ToggleButton>
                <ToggleButton value={1}>List View</ToggleButton>
            </ToggleButtonGroup>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {
                tickets.length == 0 ? <></> : 
                (showTicketList == 1 ? 
                        <TicketList tickets={tickets} onOpenTicket={onOpenTicket}/> :
                        <Ticket ticket={tickets[activeIndex]} 
                                onNext={onNext}
                                onRemove={onRemove}
                        />
                )
            }
        </Box>
    </Box>);
}

export default Tickets;
