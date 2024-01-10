import React, { useState, useEffect } from 'react';
import { List, ListItem, Card, IconButton, Typography, Avatar, ListItemText, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';

const truncateMessage = (message, limit = 10) => {
    const words = message.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return message;
};

const TicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [ticketDetails, setTicketDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5001/tickets?page=${page}&limit=20`)
        .then(response => response.json())
        .then(tickets => {
            // Fetch message data for each ticket
            Promise.all(tickets.map(ticket => 
            fetch(`http://localhost:5001/messages/${ticket.msg_id}`).then(res => res.json())
            )).then(messages => {
            // Combine ticket data with message data
            const ticketsWithMessages = tickets.map((ticket, index) => ({
                ...ticket,
                message: messages[index]
            }));
            setTickets(ticketsWithMessages);
            setLoading(false);
            });
        })
        .catch(err => {
            setError('Failed to fetch tickets');
            setLoading(false);
        });
    }, [page]);

    useEffect(() => {
        if (selectedTicketId) {
            setLoading(true);
            fetch(`http://localhost:5001/tickets/${selectedTicketId}`)
            .then(response => response.json())
            .then(async (ticket) => {
                const contextMessages = await fetchContextMessages(ticket.context_messages);
                setTicketDetails({ ...ticket, contextMessages });
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch ticket details');
                setLoading(false);
            });
        }
    }, [selectedTicketId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
      };
      
      const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
      };

    const handleListItemClick = (ticketId) => {
        setSelectedTicketId(ticketId);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRemoveTicket = async () => {
        if (selectedTicketId) {
            try {
                const response = await fetch(`http://localhost:5001/tickets/${selectedTicketId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the ticket');
                }

                // Update the tickets state to remove the deleted ticket
                const updatedTickets = tickets.filter(ticket => ticket.id !== selectedTicketId);
                setTickets(updatedTickets);

                setSelectedTicketId(null);
                setTicketDetails(null);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const fetchContextMessages = async (contextMessageIds) => {
        const messagePromises = contextMessageIds.map(msgId => 
            fetch(`http://localhost:5001/messages/${msgId}`).then(res => res.json())
        );
        return Promise.all(messagePromises);
    };

    const renderTicketHighlight = (ticket) => {
        const questionAuthor = ticket.message.author;
        const questionTimestamp = new Date(ticket.timestamp).toLocaleString();
    
        return (
            <Box bgcolor="#353535" p={2} color="white">
                <Typography variant="h5" component="h2">
                    Ticket ID:  {ticketDetails.id}
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={questionAuthor.avatar_url} alt={questionAuthor.name} />
                    <Box ml={2}>
                        <Typography variant="subtitle1"><strong>{questionAuthor.name}</strong></Typography>
                        <Typography variant="caption">{questionTimestamp}</Typography>
                    </Box>
                </Box>
                <Typography variant="body1" mb={2}>{ticket.message.content}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      onClick={() => window.open(ticket.message.msg_url, '_blank')}
                    >
                      View in Discord
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleRemoveTicket}
                    >
                      Remove Ticket
                    </Button>
                </Box>
            </Box>
        );
    };
    
    const ScrollableBox = styled(Box)({
        maxHeight: 'calc(100vh - 200px)',
        overflowY: 'auto',
        backgroundColor: '#1E1E1E',
    });

    const renderContextMessages = (contextMessages, ticketMsgId) => (
        <ScrollableBox>
          <Typography variant="h6" sx={{ color: 'white' }}>Message Thread</Typography>
          {contextMessages.map((msg, index) => (
            <Box key={index} display="flex" justifyContent="space-between" alignItems="center" my={2} p={2} bgcolor={msg.id === ticketMsgId ? "#464646" : "#353535"}>
              <Box display="flex" alignItems="center">
                <Avatar src={msg.author.avatar_url} alt={msg.author.name} sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">{msg.author.name}</Typography>
                  <Typography variant="body2">{msg.content}</Typography>
                </Box>
              </Box>
              <Typography variant="caption" sx={{ color: 'gray' }}>
                {new Date(msg.timestamp).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </ScrollableBox>
    );

    const renderTicketDetails = () => {
        if (!selectedTicketId) {
            return (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    height="100%"
                >
                    <SentimentVerySatisfiedOutlinedIcon sx={{ fontSize: 60 }} />
                    <Typography variant="h6">Please select a ticket</Typography>
                </Box>
            );
        }

        if (ticketDetails) {
            return (
                <Card raised>
                    {renderTicketHighlight(ticketDetails)}
                    {renderContextMessages(ticketDetails.contextMessages, ticketDetails.msg_id)}
                </Card>
            );
        }
        return <Typography variant="h5">Select a ticket to view details</Typography>;
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <div style={{ width: '30%', backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" alignItems="center" padding={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        color="primary"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
                {page > 1 && (
                    <Box display="flex" justifyContent="center" pt={2}>
                        <IconButton onClick={handlePreviousPage}>
                            <ArrowDropUpOutlinedIcon />
                        </IconButton>
                    </Box>
                )}
                <List style={{ overflowY: 'auto', flexGrow: 1 }}>
                {tickets.map(ticket => (
                    <ListItem
                    key={ticket.id}
                    onClick={() => handleListItemClick(ticket.id)}
                    style={{
                        backgroundColor: selectedTicketId === ticket.id ? '#353535' : 'transparent',
                        alignItems: 'flex-start'
                    }}
                    >
                <Avatar src={ticket.message.author.avatar_url} alt={ticket.message.author.name} />
                <Box sx={{ ml: 2 }}>
                    <ListItemText
                        primary={ticket.message.author.name}
                        secondary={truncateMessage(ticket.message.content)}
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                </Box>
                </ListItem>
            ))}
                <Box display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={handleNextPage}>
                        <ArrowDropDownIcon />
                    </IconButton>
                </Box>
            </List>
        </div>

      {/* Main Content */}
      <div style={{ width: '70%' }}>
        {renderTicketDetails()}
      </div>
    </div>
  );
};

export default TicketsPage;