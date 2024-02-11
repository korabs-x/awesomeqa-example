import { Box, Button, Typography } from "@mui/material";
import * as React from "react";

const TicketButton = (props: {icon: JSX.Element, text: string, onClick?: any, href?: any}) => 
    (<Box sx={{alignItems: "center"}}>
        <Button size='large' onClick={props.onClick} href={props.href}>
            <Typography color="text.primary" sx={{pr: 1}}>
                {props.text}
            </Typography>
            {props.icon}
        </Button>
    </Box>)

export default TicketButton;