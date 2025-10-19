import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import { InsertDriveFile as FileIcon } from '@mui/icons-material';
import { getConfig } from '../../utils/config';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
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
            <Typography
              variant="body1"
              sx={{
                fontSize: '15px',
                lineHeight: '1.5',
              }}
              data-testid={`text-message-content-${message.id}`}
            >
              {message.content}
            </Typography>
          )}
        </Box>
      </Box>

    </Box>
  );
};

export default MessageBubble;
