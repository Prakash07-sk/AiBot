import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, Alert, AlertTitle } from '@mui/material';
import { InsertDriveFile as FileIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getConfig } from '../../utils/config';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.isError || false;
  const [config, setConfig] = useState(getConfig());

  useEffect(() => {
    const handleConfigUpdate = () => {
      setConfig(getConfig());
    };
    
    window.addEventListener('chatbot-config-updated', handleConfigUpdate);
    return () => window.removeEventListener('chatbot-config-updated', handleConfigUpdate);
  }, []);

  return (
    <Box
      className={`message-bubble ${isUser ? 'user-message' : 'bot-message'}`}
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '16px',
        gap: '12px',
      }}
      data-testid={`message-${message.role}-${message.id}`}
    >
      <Box
        sx={{
          maxWidth: isUser ? '75%' : '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        {isError ? (
          // Error message styling
          <Alert 
            severity="error" 
            icon={<ErrorIcon />}
            sx={{
              maxWidth: '100%',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2)',
              '& .MuiAlert-icon': {
                color: '#ef4444',
              },
              '& .MuiAlert-message': {
                width: '100%',
              },
            }}
            data-testid={`error-message-${message.id}`}
          >
            <AlertTitle sx={{ fontWeight: 600, marginBottom: '4px' }}>
              Error
            </AlertTitle>
            <Typography
              variant="body2"
              sx={{
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              {message.content}
            </Typography>
          </Alert>
        ) : (
          // Normal message styling
          <Box
            className={isUser ? 'ai-user-bubble' : 'ai-bot-bubble'}
            sx={{
              padding: isUser ? '12px 16px' : '8px 0',
              borderRadius: isUser ? '15px' : '0',
              background: isUser 
                ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'
                : 'transparent',
              color: isUser ? 'white' : '#1e293b',
              wordBreak: 'break-word',
              transition: 'all 0.3s ease',
              position: 'relative',
              animation: 'message-fade-in 0.4s ease-out',
              '&:hover': {
                transform: isUser ? 'translateY(-1px)' : 'none',
              },
            }}
          >
            {message.file && (
              <Box sx={{ marginBottom: message.content ? '8px' : 0 }}>
                {message.file.type.startsWith('image/') ? (
                  <CardMedia
                    component="img"
                    src={message.file.data}
                    alt={message.file.name}
                    sx={{
                      maxWidth: '200px',
                      borderRadius: '8px',
                      marginBottom: '4px',
                    }}
                    data-testid={`image-attachment-${message.id}`}
                  />
                ) : (
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      padding: '8px',
                      backgroundColor: isUser ? 'rgba(255,255,255,0.2)' : 'action.hover',
                      marginBottom: '4px',
                    }}
                    data-testid={`file-attachment-${message.id}`}
                  >
                    <FileIcon />
                    <Typography variant="body2" noWrap sx={{ maxWidth: '150px' }}>
                      {message.file.name}
                    </Typography>
                  </Card>
                )}
              </Box>
            )}
            {message.content && (
              <Box
                sx={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  '& p': {
                    margin: '0 0 8px 0',
                    '&:last-child': {
                      marginBottom: 0,
                    },
                  },
                  '& ul, & ol': {
                    margin: '4px 0',
                    paddingLeft: '20px',
                  },
                  '& li': {
                    margin: '2px 0',
                  },
                  '& code': {
                    backgroundColor: isUser ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                  },
                  '& pre': {
                    backgroundColor: isUser ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
                    padding: '12px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    margin: '8px 0',
                    '& code': {
                      backgroundColor: 'transparent',
                      padding: 0,
                    },
                  },
                  '& blockquote': {
                    borderLeft: `3px solid ${isUser ? 'rgba(255,255,255,0.5)' : '#cbd5e1'}`,
                    paddingLeft: '12px',
                    margin: '8px 0',
                    fontStyle: 'italic',
                    opacity: 0.9,
                  },
                  '& strong': {
                    fontWeight: 600,
                  },
                  '& em': {
                    fontStyle: 'italic',
                  },
                  '& a': {
                    color: isUser ? '#fff' : '#6366F1',
                    textDecoration: 'underline',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  },
                  '& h1, & h2, & h3, & h4, & h5, & h6': {
                    fontWeight: 600,
                    margin: '12px 0 8px 0',
                    '&:first-child': {
                      marginTop: 0,
                    },
                  },
                  '& h1': { fontSize: '20px' },
                  '& h2': { fontSize: '18px' },
                  '& h3': { fontSize: '16px' },
                  '& table': {
                    borderCollapse: 'collapse',
                    width: '100%',
                    margin: '8px 0',
                  },
                  '& th, & td': {
                    border: `1px solid ${isUser ? 'rgba(255,255,255,0.3)' : '#e2e8f0'}`,
                    padding: '6px 12px',
                    textAlign: 'left',
                  },
                  '& th': {
                    backgroundColor: isUser ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                    fontWeight: 600,
                  },
                  '& hr': {
                    border: 'none',
                    borderTop: `1px solid ${isUser ? 'rgba(255,255,255,0.3)' : '#e2e8f0'}`,
                    margin: '12px 0',
                  },
                }}
                data-testid={`text-message-content-${message.id}`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {message.content}
                </ReactMarkdown>
              </Box>
            )}
          </Box>
        )}
      </Box>

    </Box>
  );
};

export default MessageBubble;
