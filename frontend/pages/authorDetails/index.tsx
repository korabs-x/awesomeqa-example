import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia
} from "@mui/material";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [items, setItems] = useState({});
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/authors/${id}`);
        setItems(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
     
  }, [id]);

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
      <Card sx={{ maxWidth: 345, margin:"auto" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`${items?.avatar_url}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {items?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {items?.msg?.content}
         </Typography>
      </CardContent>
         <Button href="/tickets" size="small">Go Back to tickets</Button>
     </Card>
       </Box>
    </>
  );
};

export default Home;
