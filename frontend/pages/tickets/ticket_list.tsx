import * as React from "react";
import { NextPage } from "next";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const cutText = (text: string, maxLength: number) =>
{
    if (text.length <= maxLength)
    {
        return text;
    }

    return text.slice(0, maxLength) + '...';
} 

const TicketList: NextPage = (props: {tickets: TicketData[], onOpenTicket: any}) => {
    return <List>
        {props.tickets.map((ticket, index) =>
        <ListItem
            key={ticket.id}
            secondaryAction={
            <IconButton edge="end" onClick={() => props.onOpenTicket(index)}>
                <OpenInNewIcon />
            </IconButton>
            }
        >
            <ListItemAvatar sx={{pr: 16}}>
                <Avatar alt={ticket.message.author.name} src={ticket.message.author.avatar_url} sx={{ width: 56, height: 56 }} />
            </ListItemAvatar>
            <ListItemText
            primary={cutText(ticket.message.content, 80)}
            secondary={new Date(ticket.message.timestamp).toDateString()}
            />
        </ListItem>,
        )}
    </List>
}

export default TicketList;