import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Box,
  Slide,
  Chip,
} from '@mui/material';
import { Close as CloseIcon, Send as SendIcon, AttachFile as AttachIcon, OpenInNew as OpenInNewIcon, AutoAwesome as AIIcon } from '@mui/icons-material';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';
import BrandingFooter from './BrandingFooter';
import { sendChatMessage } from '../../services/chatService';
import { getConfig } from '../../utils/config';
import headerLogoImage from '../../assets/ai-bot-icon.png';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullDialog = ({ open, onClose, onNewMessage }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatbot_messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [config, setConfig] = useState(getConfig());
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const isOpenRef = useRef(open);
  const fileInputRef = useRef(null);

  useEffect(() => {
    isOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    localStorage.setItem('chatbot_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const handleConfigUpdate = () => {
      setConfig(getConfig());
    };
    
    window.addEventListener('chatbot-config-updated', handleConfigUpdate);
    return () => window.removeEventListener('chatbot-config-updated', handleConfigUpdate);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (messages.length > 0) {
      setShowSuggestions(false);
    }
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    const text = messageText || inputValue.trim();
    const file = selectedFile;
    
    if (!text && !file) return;

    let fileData = null;
    if (file) {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      const base64 = await base64Promise;
      fileData = {
        name: file.name,
        size: file.size,
        type: file.type,
        data: base64,
      };
    }

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text || (file ? `[Uploaded: ${file.name}]` : ''),
      timestamp: Date.now(),
      file: fileData,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setSelectedFile(null);
    setIsLoading(true);

    const conversationHistory = [
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        ...(msg.file && { file: msg.file }),
      })),
      {
        role: 'user',
        content: text || (file ? `File uploaded: ${file.name}` : ''),
        ...(fileData && { file: fileData }),
      },
    ];

    try {
      const messageContent = text || (file ? `File uploaded: ${file.name}` : '');
      const apiPayload = {
        conversation_history: conversationHistory,
        query: messageContent,
        ...(fileData && { attachment: fileData }),
      };
      const response = await sendChatMessage(apiPayload.conversation_history, apiPayload.query, apiPayload.attachment);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: response.response || response.message || 'I received your message.',
        timestamp: Date.now(),
      };

      setMessages((prev) => 
        prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, read: true } : msg
        ).concat(botMessage)
      );
      
      if (!isOpenRef.current) {
        onNewMessage?.();
      }
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="md"
      fullWidth
      className="chat-dialog"
      PaperProps={{
        className: 'chat-dialog-paper',
        sx: {
          width: '90vw',
          maxWidth: '600px',
          height: '90vh',
          maxHeight: '800px',
          borderRadius: '24px',
          margin: 0,
          boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.15)',
          overflow: 'hidden',
          background: 'linear-gradient(185deg, #eef2ff 0%, #fdf4ff 20%, #ffffff 70%)',
        },
      }}
      data-testid="dialog-chat"
    >
      <DialogContent className="chat-dialog-content" sx={{ padding: 0, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header with Close Button */}
        <Box sx={{ 
          padding: '20px',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <IconButton
            onClick={onClose}
            sx={{ 
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#1e293b',
              width: '40px',
              height: '40px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'rotate(90deg) scale(1.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
            data-testid="button-close-chat"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Main Content Area */}
        <Box className="messages-container" sx={{ 
          padding: '20px 40px 20px', 
          overflowY: 'auto', 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: messages.length === 0 && !isLoading ? 'center' : 'flex-start',
        }}>
          {showSuggestions && messages.length === 0 && !isLoading && (
            <Box sx={{ textAlign: 'center', maxWidth: '480px' , overflowY: 'hidden'}}>
              {/* AI Icon with Animation */}
              <Box sx={{ 
                marginBottom: '32px',
                display: 'flex',
                justifyContent: 'center',
              }}>

              </Box>

              {/* Main Heading */}
              <Box sx={{ 
                fontSize: '42px', 
                fontWeight: 700, 
                color: '#0f172a',
                marginBottom: '12px',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
              }}>
                Get <span style={{ 
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>help</span> with
              </Box>
              <Box sx={{ 
                fontSize: '42px', 
                fontWeight: 700, 
                color: '#0f172a',
                marginBottom: '16px',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
              }}>
                anything
              </Box>
              
              {/* Subtitle */}
              <Box sx={{ 
                fontSize: '15px', 
                color: '#64748b', 
                marginBottom: '40px',
                fontWeight: 400,
              }}>
                Fast answers. Powered by AI.
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.6) 50%, transparent 70%)',
                    animation: 'shimmer 3s ease-in-out infinite',
                    pointerEvents: 'none',
                    zIndex: 2,
                  },
                }}
              >
                <AIIcon sx={{ 
                  fontSize: '64px',
                  color: '#8B5CF6',
                  filter: 'drop-shadow(0 2px 6px rgba(139, 92, 246, 0.3))',
                  position: 'relative',
                  zIndex: 1,
                }} />
              </Box>
            </Box>
          )}

          {messages.length > 0 && (
            <Box sx={{ width: '100%', maxWidth: '520px' }}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <LoadingIndicator />}
            </Box>
          )}

          {!showSuggestions && messages.length === 0 && isLoading && (
            <Box sx={{ textAlign: 'center', maxWidth: '480px' }}>
              <LoadingIndicator />
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* Input Container */}
        <Box
          className="input-container"
          sx={{
            padding: '20px 40px 32px',
            background: 'transparent',
          }}
        >
          {selectedFile && (
            <Box sx={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
              <Chip
                label={selectedFile.name}
                onDelete={handleRemoveFile}
                size="small"
                data-testid="chip-selected-file"
                sx={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '520px', margin: '0 auto' }}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              accept="image/*,.pdf,.doc,.docx,.txt"
              data-testid="input-file"
            />
            <TextField
              fullWidth
              multiline
              maxRows={3}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              data-testid="input-message"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)',
                    borderColor: 'rgba(37, 99, 235, 0.3)',
                  },
                  '&.Mui-focused': {
                    background: 'rgba(255, 255, 255, 1)',
                    borderColor: '#2563EB',
                    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.2)',
                  },
                  '& fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '12px 0',
                  fontSize: '15px',
                  color: '#1e293b',
                  '&::placeholder': {
                    color: '#94a3b8',
                    opacity: 1,
                  },
                },
              }}
            />
            <IconButton
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() && !selectedFile}
              data-testid="button-send-message"
              sx={{
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                color: 'white',
                width: '48px',
                height: '48px',
                flexShrink: 0,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #DB2777 100%)',
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
                },
                '&:active': {
                  transform: 'translateY(0) scale(1)',
                },
                '&:disabled': {
                  background: '#e2e8f0',
                  color: '#cbd5e1',
                  boxShadow: 'none',
                },
              }}
            >
              <SendIcon sx={{ fontSize: '20px' }} />
            </IconButton>
          </Box>
          
          {/* Powered By Footer */}
          <Box sx={{ 
            textAlign: 'center', 
            marginTop: '16px',
            fontSize: '12px',
            color: '#94a3b8',
            opacity: 0.6,
          }}>
            Powered by{' '}
            <a 
              href={config.brandingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#a5b4fc', 
                textDecoration: 'underline',
                fontWeight: 400,
                transition: 'color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => e.target.style.color = '#818cf8'}
              onMouseLeave={(e) => e.target.style.color = '#a5b4fc'}
            >
              {config.brandingName}
              <OpenInNewIcon sx={{ fontSize: '13px' }} />
            </a>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FullDialog;
