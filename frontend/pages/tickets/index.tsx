import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import Modal from "@mui/material/Modal";

import DoneAllIcon from "@mui/icons-material/DoneAll";

import { Avatar } from "@mui/material";
import { Pagination } from "@mui/material";
import { useRouter } from 'next/router';

import Link from "next/link";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import toast, { Toaster } from "react-hot-toast";
 
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
  cursor: "pointer",
  gap: "20px",
  "&:hover": {
    border: "2px solid #302F36",
  },
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
  },
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const IndexPage = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [cardOpen, setCardOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const [author, setAuthor] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);


 const router = useRouter();

const handleItemClick = (id) => {
  console.log("id", id);
  router.push({
    pathname: '/authorDetails',
    query: { id: id },
  });
};

  
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedItemId(id)
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedItemId(null)
  };

  const toastMessage = () => {
    toast.error("Not Implemented!");
  };

  const handleButtonClick = (msg_url: string) => {
    window.open(msg_url, "_blank");
  };

   useEffect(() => {
    const fetchData = async () => {
      console.log("status", status, "author", author);
      try {
        let url = "http://localhost:5001/tickets?size=5";
        console.log("url", url);
        const response = await axios.get(url);
        setItems(response?.data?.items);
        setPageCount(response?.data?.pages);
        setPage(response?.data?.page);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();  
  }, []);

  const handleStatusFilter = (value) => {
    setStatus(value);

    let url = `http://localhost:5001/tickets?size=5&sort_order=${sortBy}`;
    if (value === "open" || value === "closed") {
      url += `&status=${value}`;
    }
    if (author === "human" || author === "bot") {
      url += `&author_type=${author}`;
    }
    console.log("url", url);

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setItems(response?.data?.items);
        setPageCount(response?.data?.pages);
        setPage(1);
        console.log("page", page);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  };

  const handleAuthorFilter = (value: string) => {
    setAuthor(value);
    console.log("page", page);

    let url = `http://localhost:5001/tickets?size=5&sort_order=${sortBy}`;
    if (status === "open" || status === "closed") {
      url += `&status=${status}`;
    }
    if (value === "human" || value === "bot") {
      url += `&author_type=${value}`;
    }
    console.log("url", url);

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setItems(response?.data?.items);
        setPageCount(response?.data?.pages);
        setPage(1);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  };

  const handleSortOrderChange = (value: string) => {
    setSortBy(value);
    console.log("page", page);
    let url = `http://localhost:5001/tickets?size=5&sort_order=${value}`;
    if (status === "open" || status === "closed") {
      url += `&status=${status}`;
    }
    if (author === "human" || author === "bot") {
      url += `&author_type=${author}`;
    }
    console.log("url", url);

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setItems(response?.data?.items);
        setPageCount(response?.data?.pages);
        setPage(1);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  };

  const handleDelete = async (id) => {
    try {
      const apiHandler = async () => {
        const deletedResponse = await axios.delete(
          `http://localhost:5001/tickets/${id}`
        );
         const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        // handleStatusFilter(status);
        if (deletedResponse) {
          toast.success(deletedResponse.data.message);
        }
      };

      apiHandler();
    } catch (error) {
      console.error("Error deleting record:", error.message);
    }
  };


  const handlePaginationClick = (value: number) => {
    setPage(value);
    let url = `http://localhost:5001/tickets?size=5&sort_order=${sortBy}&page=${value}`;
    if (status === "open" || status === "closed") {
      url += `&status=${status}`;
    }
    if (author === "human" || author === "bot") {
      url += `&author_type=${author}`;
    }
    console.log("url", url);

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setItems(response?.data?.items);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  };

  
  const handleUpdateTicket = async (id, status) => {
  try {
     const newStatus = status === "closed" ? "open" : "closed";
     let ticketId = id
 
    const updatedResponse = await axios.put(
      `http://localhost:5001/tickets/${id}/status/?status=${newStatus}`
    );

    if (updatedResponse) {
       const updatedItems = items.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setItems(updatedItems);
       handleClose()

      if (newStatus === "open") {
        toast.success("Ticket reopened successfully!");
      } else {
        toast.success("Ticket closed successfully!");
      }
    } else {
      toast.error("Failed to update ticket status.");
    }
  } catch (error) {
    console.error("update Error:", error.message);
    toast.error("Failed to update ticket status.");
  }
  handleSortOrderChange(sortBy);
};


  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={10} style={{ margin: "auto" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Grid container spacing={2}>
                <Grid item xs={4} onClick={toastMessage}>
                  <Card sx={{ ...cardStyles }}>
                    <CardContent>
                      <Box sx={{ ...boxStyles }}>
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
                    <Link href="/tickets" passHref>
                      <CardContent>
                        <Box sx={{ ...boxStyles }}>
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
                      <Box sx={{ ...boxStyles }}>
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
            <Box
              sx={{ mt: 9, display: "flex", justifyContent: "space-between" }}
            >
              <FormControl
                sx={{ width: "20%", marginRight: "10px", marginBottom: 0 }}
              >
                <InputLabel sx={{ height: "20px", marginBottom: "5px" }}>
                  Status
                </InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(event) => handleStatusFilter(event.target.value)}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"open"}>Open</MenuItem>
                  <MenuItem value={"closed"}>Resolved</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ width: "20%", marginBottom: 0 }}>
                <InputLabel>Author</InputLabel>
                <Select
                  value={author}
                  label="Author"
                  onChange={(event) => handleAuthorFilter(event.target.value)}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"bot"}>Bot</MenuItem>
                  <MenuItem value={"human"}>Human</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ flexGrow: 1 }} />
              <FormControl sx={{ width: "20%" }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort_by"
                  onChange={(event) => handleSortOrderChange(event.target.value)}
                >
                  <MenuItem value={"oldest"}>Oldest</MenuItem>
                  <MenuItem value={"newest"}>Newest</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mt: 9 }}>
              {items.map((item) => {
                const timestamp = new Date(item.timestamp);
                const hours = timestamp.getHours();
                const minutes = timestamp.getMinutes();
                const formattedTime = timestamp.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
                const date = timestamp.getDate();
                const month = timestamp.toLocaleString("en-US", { month: "short" });
                const year = timestamp.getFullYear();

                return (
                  <Card
                    key={item.id}
                    sx={{ marginBottom: "10px", border: "1px solid #302F36" }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          alt="Avatar"
                          src={item?.msg?.author?.avatar_url}
                          sx={{ marginRight: "10px", width: 60, height: 60 }}
                        />
                        <Box sx={{ marginBottom: "-20px" }}>
                          <Typography variant="h5" component="div">
                             <a
                             href="/authorDetails"
                              style={{
                                textDecoration: "none",
                                color: "rgba(93, 80, 195)",
                                fontWeight: "bold",
                              }}
                              onClick={(e) => {
                                e.preventDefault();  
                                handleItemClick(item?.msg?.author?.id);  
                              }}
                            >
                              {item?.msg?.author?.name}
                            </a>{" "}
                            <span
                              className="time"
                              style={{ fontSize: "60%", opacity: 0.5 }}
                            >
                              {` ${date} ${month} ${year} at ${formattedTime}`}
                            </span>

                          </Typography>
                          <Typography variant="subtitle1" component="div">
                            {item?.msg?.content}
                          </Typography>
                        </Box>
                     
                        <Box sx={{ flexGrow: 1 }} />
                        {item?.status == "closed" && (
                          <IconButton>
                            <DoneAllIcon />
                          </IconButton>
                        )}
                        <IconButton onClick={() => handleDelete(item?.id)}>
                          <CloseIcon />
                        </IconButton>

                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 5,
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{ ...buttonStyles, marginRight: 1 }}
                          onClick={() => handleButtonClick(item.msg.msg_url)}

                        >
                          View in Discord
                        </Button>
                        <Button
                           onClick={() => handleOpen(item.id)}
                          variant="contained"
                          sx={{ ...buttonStyles, marginLeft: 1 }}
                        >
                           {item?.status === "closed" ? "Reopen" : "Mark as Resolved"}
                        </Button>
                        
                        <Modal
                           open={selectedItemId === item.id} 
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={{ ...modalStyle }}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Are you sure ?
                            </Typography>
                            <div
                              style={{
                                marginTop: "28px",
                                marginLeft: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                variant="contained"
                                sx={{ ...buttonStyles, marginLeft: 4 }}
                                onClick={handleClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                sx={{ ...buttonStyles, marginLeft: 1 }}
                                onClick={() => handleUpdateTicket(selectedItemId, item.status)}
                              >
                                Yes
                              </Button>
                            </div>
                          </Box>
                        </Modal>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
            <Box sx={{ mt: 4 }} /> {/* Add vertical space here */}
            <Pagination
              count={pageCount}
              variant="outlined"
              //page={page}
              shape="rounded"
              sx={{ display: "flex", justifyContent: "center" }}
              onChange={(event, page) => handlePaginationClick(page)}
            />
          </Grid>
        </Grid>
        <Toaster />
      </Box>
    </>
  );
};

export default IndexPage;

 