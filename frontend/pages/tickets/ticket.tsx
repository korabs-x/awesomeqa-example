import * as React from "react";
import { NextPage } from "next";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import LaunchIcon from '@mui/icons-material/Launch';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import TicketButton from "./ticket_button";

const Ticket: NextPage = (props: {ticket: TicketData, onNext: any, onRemove: any}) => 
    <Box sx={{ width: 600, height: 400 }}>
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <Avatar 
                    alt={props.ticket.message.author.name} 
                    src={props.ticket.message.author.avatar_url} 
                    sx={{ width: 56, height: 56 }} 
                    />
                }
                title={
                    <Box>
                        <Typography variant="h6" component="div">
                        {props.ticket.message.author.name}
                        </Typography>
                        {
                        props.ticket.message.author.is_bot ?? (
                            <Typography sx={{ mt: 1.5 }} color="text.secondary">
                                Bot
                            </Typography>
                            )
                        }
                    </Box>
                }
            />
            <CardContent>
                <Typography sx={{ mt: 1.5 }} variant="h6" component="div">
                    {props.ticket.message.content}
                </Typography>
                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    Posted on: {new Date(props.ticket.message.timestamp).toDateString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TicketButton icon={<ClearIcon sx={{color: "text.primary"}} />} text="Remove" onClick={props.onRemove}/>
                    </Grid>
                    <Grid item xs={4}>  
                        <TicketButton icon={<LaunchIcon sx={{color: "text.primary"}} />} text="Go to Link" href={props.ticket.message.msg_url} />
                    </Grid>
                    <Grid item xs={4}>
                        <TicketButton icon={<NextPlanIcon sx={{color: "text.primary"}} />} text="Next" onClick={props.onNext} />
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    </Box>

export default Ticket;