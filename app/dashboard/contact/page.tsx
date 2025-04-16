'use client';

import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Divider, 
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  LinearProgress,
  Alert
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  MarkEmailRead as MarkEmailReadIcon,
  Email as EmailIcon,
  Reply as ReplyIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactMessage } from '@/lib/types';
import { useTheme } from '@mui/material/styles';
import { createGradientBackground } from '@/app/theme';

export default function ContactPage() {
  const theme = useTheme();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/contact');
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch contact messages');
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleOpenMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    
    // Mark as read if not already
    if (!message.read) {
      try {
        const response = await fetch(`/api/contact?id=${message.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ read: true }),
        });
        
        if (response.ok) {
          setMessages(prev => 
            prev.map(m => m.id === message.id ? { ...m, read: true } : m)
          );
        }
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  const handleOpenReplyDialog = () => {
    setReplyDialogOpen(true);
    setReplyText(`Dear ${selectedMessage?.name},\n\nThank you for your message. `);
  };

  const handleCloseReplyDialog = () => {
    setReplyDialogOpen(false);
    setReplyText('');
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const handleSendReply = () => {
    // In a real app, this would send an email reply
    setAlert({ message: `Reply sent to ${selectedMessage?.email}!`, severity: 'success' });
    setReplyDialogOpen(false);
    setReplyText('');
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/contact?id=${selectedMessage.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages(prev => prev.filter(m => m.id !== selectedMessage.id));
        setAlert({ message: 'Message deleted successfully!', severity: 'success' });
        setSelectedMessage(null);
      } else {
        setAlert({ message: 'Failed to delete message. Please try again.', severity: 'error' });
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      setAlert({ message: 'An error occurred. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Messages
          {unreadCount > 0 && (
            <Chip 
              label={`${unreadCount} unread`} 
              size="small" 
              color="primary"
              sx={{ ml: 2, fontWeight: 'bold' }}
            />
          )}
        </Typography>
      </Box>

      {alert && (
        <Alert 
          severity={alert.severity} 
          sx={{ mb: 3 }}
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}

      {loading ? (
        <LinearProgress sx={{ mb: 4 }} />
      ) : messages.length === 0 ? (
        <Paper sx={{ 
          p: 6, 
          textAlign: 'center',
          bgcolor: 'rgba(30, 30, 30, 0.7)',
          borderRadius: '16px'
        }}>
          <EmailIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6">No messages yet</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            When someone sends you a message through your contact form, it will appear here.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={selectedMessage ? 5 : 12}>
            <Paper sx={{ 
              borderRadius: '16px',
              overflow: 'hidden',
              bgcolor: 'rgba(30, 30, 30, 0.7)',
              height: '70vh',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ 
                p: 2, 
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Typography variant="h6" fontWeight="medium">
                  Inbox
                </Typography>
                <Chip 
                  label={`${messages.length} ${messages.length === 1 ? 'message' : 'messages'}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                />
              </Box>
              
              <List sx={{ 
                overflowY: 'auto', 
                flexGrow: 1,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0, 0, 0, 0.1)',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                }
              }}>
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ListItem 
                        button 
                        onClick={() => handleOpenMessage(message)}
                        sx={{ 
                          px: 3,
                          py: 2,
                          borderLeft: '4px solid',
                          borderColor: message.read ? 'transparent' : 'primary.main',
                          bgcolor: selectedMessage?.id === message.id ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.03)'
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: message.read ? 'rgba(100, 100, 100, 0.5)' : createGradientBackground(), 
                            color: 'white',
                            fontWeight: 'bold'
                          }}>
                            {message.name.charAt(0).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography 
                                variant="body1" 
                                component="span"
                                fontWeight={message.read ? 'normal' : 'bold'}
                              >
                                {message.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(message.date)}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography
                                variant="body2"
                                component="span"
                                fontWeight={message.read ? 'normal' : 'medium'}
                                color={message.read ? 'text.secondary' : 'text.primary'}
                              >
                                {message.subject}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  mt: 0.5
                                }}
                              >
                                {message.message}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" sx={{ opacity: 0.1 }} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </List>
            </Paper>
          </Grid>

          {selectedMessage && (
            <Grid item xs={12} md={7}>
              <Paper sx={{ 
                borderRadius: '16px',
                overflow: 'hidden',
                bgcolor: 'rgba(30, 30, 30, 0.7)',
                height: '70vh',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Box sx={{ 
                  p: 2, 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  bgcolor: 'rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <IconButton size="small" onClick={handleCloseMessage}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="subtitle1" fontWeight="medium" sx={{ flexGrow: 1 }}>
                    Message Details
                  </Typography>
                  <IconButton 
                    size="small"
                    onClick={handleOpenReplyDialog}
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <ReplyIcon />
                  </IconButton>
                  <IconButton 
                    size="small"
                    onClick={handleOpenDeleteDialog}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                
                <Box sx={{ 
                  p: 3,
                  overflowY: 'auto',
                  flexGrow: 1,
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                  }
                }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                      {selectedMessage.subject}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 3
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: createGradientBackground(), 
                          color: 'white',
                          fontWeight: 'bold',
                          width: 48,
                          height: 48
                        }}>
                          {selectedMessage.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedMessage.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedMessage.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(selectedMessage.date)}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3, opacity: 0.1 }} />
                    <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                      {selectedMessage.message}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  p: 2, 
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  bgcolor: 'rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 2
                }}>
                  <Button 
                    variant="outlined" 
                    onClick={handleOpenDeleteDialog}
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  <Button 
                    variant="contained"
                    onClick={handleOpenReplyDialog}
                    startIcon={<ReplyIcon />}
                  >
                    Reply
                  </Button>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}

      {/* Reply Dialog */}
      <Dialog
        open={replyDialogOpen}
        onClose={handleCloseReplyDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', py: 3 }}>
          Reply to {selectedMessage?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Send an email reply to {selectedMessage?.email}
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            value={replyText}
            onChange={handleReplyChange}
            label="Your Reply"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseReplyDialog}>Cancel</Button>
          <Button 
            onClick={handleSendReply} 
            variant="contained"
            startIcon={<SendIcon />}
            disabled={!replyText.trim()}
          >
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this message from {selectedMessage?.name}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseDeleteDialog}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteMessage} 
            color="error" 
            variant="contained"
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
