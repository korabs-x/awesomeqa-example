import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from 'next/link';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const ButtonStyle = {
  width: '200px',
  padding: '10px 10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  textTransform: 'none',
  borderRadius: '4px',
};

const iconContainer = {
  backgroundColor: '#312C50',
  width: '35px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  marginBottom: '10px',
}

const Home: NextPage = () => {
  
  const handleClick = (buttonType: string) => {
    console.log(`${buttonType} button clicked`);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
          {/* Knowledge Base Button */}
          <Button
                variant="contained"
                onClick={() => console.log('Knowledge Base button clicked')}
                sx={{
                  ...ButtonStyle,
                  backgroundColor: '#1C1C1F',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
              {/* Icon container */}
              <Box
                sx={{
                  ...iconContainer
                }}
              >
                <LibraryBooksOutlinedIcon sx={{ color: 'white' }} />
              </Box>
              {/* Button text */}
              <Box
                component="span"
                sx={{
                  color: 'white',
                }}
              >
                Knowledge Base
              </Box>
            </Button>
          </Grid>

          {/* Tickets Button */}
          <Grid item>
            <Link href="/tickets" passHref>
              <Button
                  variant="contained"
                  onClick={() => console.log('Tickets clicked')}
                  sx={{
                    ...ButtonStyle,
                    backgroundColor: '#1C1C1F',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                {/* Icon container */}
                <Box
                  sx={{
                    ...iconContainer
                  }}
                >
                  <SupportAgentOutlinedIcon sx={{ color: 'white' }} />
                </Box>
                {/* Button text */}
                <Box
                  component="span"
                  sx={{
                    color: 'white',
                  }}
                >
                  Tickets
                </Box>
              </Button>
            </Link>
          </Grid>

          {/* FAQ Insights Button */}
          <Grid item>
            <Button
                  variant="contained"
                  onClick={() => console.log('FAQ Insights button')}
                  sx={{
                    ...ButtonStyle,
                    backgroundColor: '#1C1C1F',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                {/* Icon container */}
                <Box
                  sx={{
                    ...iconContainer
                  }}
                >
                  <LightbulbOutlinedIcon sx={{ color: 'white' }} />
                </Box>
                {/* Button text */}
                <Box
                  component="span"
                  sx={{
                    color: 'white',
                  }}
                >
                  FAQ Insights
                </Box>
              </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;