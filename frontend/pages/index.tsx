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

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

const IndexPage = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>
            <Grid item xs={10}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card sx={{ ...cardStyles }}>
                    <CardContent>
                      <Box sx= {{...boxStyles}}>
                        <LibraryBooksOutlinedIcon sx={{ fontSize: 40 }} />
                      </Box>
                      <Typography variant="h5" component="div">
                        Knowledge Base
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ ...cardStyles }}>
                  <Link href='/your-target-path' passHref>
                  <CardActionArea>
                    <CardContent>
                      <Box sx= {{...boxStyles}}>
                          <SupportAgentOutlinedIcon sx={{ fontSize: 40 }} />
                      </Box>
                      <Typography variant="h5" component="div">
                        Tickets
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  </Link>
                  </Card>
                </Grid>
                <Grid item xs={4}>
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
            <Box sx={{ mt: 9, display: "flex", justifyContent: "space-between" }}>
              <FormControl sx={{ width: "20%", marginRight: "10px", marginBottom: 0 }}>
                <InputLabel sx={{height: "20px", marginBottom:"5px"}}>Status</InputLabel>
                <Select
                  //value={status}
                  label="Status"
                  //onChange={handleChange}
                >
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Open</MenuItem>
                  <MenuItem value={30}>Resolved</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ width: "20%", marginBottom: 0 }}>
                <InputLabel>Author</InputLabel>
                <Select
                  //value={age}
                  label="Author"
                  //onChange={handleChange}
                >
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Bot</MenuItem>
                  <MenuItem value={30}>Human</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ flexGrow: 1 }} />
              <FormControl sx={{ width: "20%" }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  //value={age}
                  label="Sort_by"
                  //onChange={handleChange}
                >
                  <MenuItem value={10}>Oldest</MenuItem>
                  <MenuItem value={20}>Newest</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: 9 }}>
              {items.map((item) => (
                <Card key={item.id} sx={{ marginBottom: "10px", border: "1px solid #302F36"}}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://cdn.discordapp.com/avatars/402751097594445824/0adbb55ae7ee2dc2f9a2bcf8721f961a.png?size=1024"
                        sx={{ marginRight: "10px", width: 60, height: 60 }}
                      />
                      <Box sx={{ marginBottom: '-20px' }}>
                        <Typography variant="h5" component="div">
                          <a href="#" style={{ textDecoration: "none", color: "rgba(93, 80, 195)", fontWeight: "bold" }}>
                            {item.name}
                          </a>{" "}
                          <span className="time" style={{ fontSize: "60%", opacity: 0.5 }}>
                            10:33am
                          </span>
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                        I don't like the other guy, he is doing racist comment.
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                      <IconButton>
                        <DoneAllIcon />
                      </IconButton>
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
                      <Button variant="contained" sx={{ ...buttonStyles, marginRight: 1 }}>
                        View in Discord
                      </Button>
                      <Button variant="contained" sx={{ ...buttonStyles, marginLeft: 1 }}>
                        Mark as Resolved
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <Box sx={{ mt: 4 }} /> {/* Add vertical space here */}
            <Pagination count={10} variant="outlined" shape="rounded" sx={{ display: "flex", justifyContent: "center" }} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default IndexPage;
