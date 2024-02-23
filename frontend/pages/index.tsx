import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Card, CardContent, Typography, CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { InputLabel, Select, MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { Avatar } from "@mui/material";
import { Pagination } from "@mui/material";
import Link from 'next/link';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import toast, {Toaster} from "react-hot-toast";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const cardStyles = {
  width: "306px",
  height: "130px",
  padding: "8px 0px 8px 8px",
  borderRadius: "8px",
  border: "1px solid #302F36",
  gap: "20px",
  "&:hover": {
    border: "2px solid #302F36"
  }

};

const boxStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #302F36",
  borderRadius: "8px",
  width: "fit-content",
  padding: "6px",
  marginBottom: "6px", // Increase vertical space
  backgroundColor: "rgba(93, 80, 195, 0.3)",
};

const buttonStyles = {
  backgroundColor: "rgba(93, 80, 195, 0.3)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(93, 80, 195, 0.5)",
  }
};

// const items = [
//   { id: 1, name: "Item 1" },
//   { id: 2, name: "Item 2" },
//   { id: 3, name: "Item 3" },
// ];

const IndexPage = () => {
  
  const toastMessage = () => {
    console.log("clicked")
    toast.error("Not Implemented!")

  }
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }} >
        <Grid container spacing={2} >
            <Grid item xs={10} style={{margin:"auto"}}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Grid container spacing={2}>
                <Grid item xs={4} onClick={toastMessage}>
                  <Card sx={{ ...cardStyles }}>
                    <CardContent>
                      <Box sx= {{...boxStyles}}>
                        <LibraryBooksOutlinedIcon sx={{ fontSize: 40 }} />
                      </Box>
                      <Typography variant="h5" component="div" >
                        Knowledge Base
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4} >
                  <Card sx={{ ...cardStyles }}>
                  <Link href='/tickets' passHref>
                     <CardContent>
                      <Box sx= {{...boxStyles}}>
                          <SupportAgentOutlinedIcon sx={{ fontSize: 40 }} />
                      </Box>
                      <Typography variant="h5" component="div">
                        Tickets
                      </Typography>
                    </CardContent>
                   </Link>
                  </Card>
                </Grid>
                <Grid item xs={4} onClick={toastMessage}>
                  <Card sx={{ ...cardStyles }}>
                    <CardContent>
                      <Box sx= {{...boxStyles}}>
                        <LightbulbOutlinedIcon sx={{ fontSize: 40 }} />
                      </Box>
                      <Typography variant="h5" component="div">
                        FAQ Insights
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
           </Grid>
        </Grid>
        <Toaster />
      </Box>
      
    </>
  );
};

export default IndexPage;
