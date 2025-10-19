import { useState, useEffect } from 'react';
import { Fab, Badge, Box } from '@mui/material';
import { AutoAwesome as AIIcon } from '@mui/icons-material';
import FullDialog from './FullDialog';
import { getConfig } from '../../utils/config';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [config, setConfig] = useState(getConfig());
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);

  useEffect(() => {
    const handleConfigUpdate = () => {
      setConfig(getConfig());
    };
    
    window.addEventListener('chatbot-config-updated', handleConfigUpdate);
    
    // Hide welcome animation after it completes
    const timer = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, 3000);
    
    return () => {
      window.removeEventListener('chatbot-config-updated', handleConfigUpdate);
      clearTimeout(timer);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <>
      {!isOpen && (
        <div 
          className="chat-widget-container" 
          data-testid="chat-widget"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            left: 'auto',
            top: 'auto',
            zIndex: 999999,
          }}
        >
          <Badge
            badgeContent={unreadCount}
            color="error"
            className="chat-widget-badge"
            data-testid="badge-notification"
          >
            <Fab
              onClick={handleToggle}
              className="chat-widget-fab ai-themed-fab"
              data-testid="button-chat-toggle"
              sx={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                color: 'white',
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transition: 'left 0.6s',
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #DB2777 100%)',
                  transform: 'translateY(-4px) scale(1.05)',
                  boxShadow: '0 12px 32px rgba(99, 102, 241, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15)',
                  '&::before': {
                    left: '100%',
                  },
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(1.02)',
                },
              }}
            >
              <AIIcon 
                sx={{ 
                  fontSize: '28px',
                  animation: showWelcomeAnimation ? 'welcome-bounce 2.5s ease-in-out' : 'none',
                }} 
              />
            </Fab>
          </Badge>
        </div>
      )}

      <FullDialog
        open={isOpen}
        onClose={handleToggle}
        onNewMessage={() => {
          if (!isOpen) {
            setUnreadCount((prev) => prev + 1);
          }
        }}
      />
    </>
  );
};

export default ChatWidget;
