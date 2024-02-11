import * as React from "react";
import { NextPage } from "next";
import { Grid, Box } from "@mui/material";

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HomeButton from "./home_button";

const Home: NextPage = () => 
   (
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <HomeButton icon={<LibraryBooksIcon/>} text='Knowledge Base' href='/knowledge_base' />
          </Grid>
          <Grid item xs={4}>  
            <HomeButton icon={<SupportAgentIcon/>} text='Tickets' href='/tickets' />
          </Grid>
          <Grid item xs={4}>
            <HomeButton icon={<LightbulbIcon/>} text='FAQ Insights' href='/faq_insights' />
          </Grid>
        </Grid>
      </Box>
  )


export default Home;
