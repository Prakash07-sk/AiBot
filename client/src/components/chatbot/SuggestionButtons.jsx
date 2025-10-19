import { Box, Button } from '@mui/material';

const SuggestionButtons = ({ suggestions, onSuggestionClick }) => {
  return (
    <Box
      className="suggestion-buttons-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        animation: 'suggestions-fade-in 0.6s ease-out',
      }}
    >
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outlined"
          onClick={() => onSuggestionClick(suggestion)}
          data-testid={`button-suggestion-${index}`}
          className="ai-suggestion-button"
          sx={{
            borderRadius: '12px',
            padding: '12px 20px',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 500,
            border: '1px solid rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1e293b',
            minHeight: '44px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            animation: `suggestion-float ${0.5 + index * 0.1}s ease-out`,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            '&:hover': {
              transform: 'translateY(-2px)',
              background: 'rgba(255, 255, 255, 1)',
              borderColor: 'rgba(37, 99, 235, 0.3)',
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.2)',
            },
          }}
        >
          {suggestion}
        </Button>
      ))}
    </Box>
  );
};

export default SuggestionButtons;
