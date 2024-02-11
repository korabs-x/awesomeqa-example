import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Icon } from "@mui/material";
import { ReactNode } from "react";

const HomeButton: NextPage = (props: {icon: ReactNode, text: string, href: string}) => {

  return (
      <Button
      variant="contained"
      color="primary"
      href={props.href}
      sx={{width: '306px', height: '130px'}} 
      >
        <Grid container spacing={1}>
          <Grid item xs={1}>  
            <Box sx={{
              width: '40px', 
              height: '40px', 
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2
              }} 
              bgcolor="secondary.main">
              {props.icon}
            </Box>
          </Grid>
          <Grid item xs={11}/>
          <Grid item xs={12}>
            {props.text}
          </Grid>
        </Grid>
          
      </Button>
  );
};

export default HomeButton;