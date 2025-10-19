import { Box, Typography } from '@mui/material';

const LoadingIndicator = ({ showTypingText = true }) => {
  return (
    <Box
      className="loading-indicator"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: '16px',
        animation: 'loading-fade-in 0.3s ease-out',
      }}
      data-testid="loading-indicator"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '12px 16px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            border: '1px solid rgba(139, 92, 246, 0.15)',
            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
              animation: 'loading-shimmer 1.5s ease-in-out infinite',
            },
          }}
        >
          <Box
            className="loading-orb"
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
              animation: 'loading-pulse 1.5s ease-in-out infinite',
              animationDelay: '0s',
            }}
          />
          <Box
            className="loading-orb"
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
              animation: 'loading-pulse 1.5s ease-in-out infinite',
              animationDelay: '0.3s',
            }}
          />
          <Box
            className="loading-orb"
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
              animation: 'loading-pulse 1.5s ease-in-out infinite',
              animationDelay: '0.6s',
            }}
          />
        </Box>
        {showTypingText && (
          <Typography
            variant="caption"
            sx={{
              marginLeft: '4px',
              opacity: 0.7,
              fontSize: '12px',
              color: '#64748b',
              fontWeight: 500,
              animation: 'loading-text-pulse 1.5s ease-in-out infinite',
            }}
            data-testid="text-typing-indicator"
          >
            thinking...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoadingIndicator;