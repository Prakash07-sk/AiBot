
import { Box, Container, Paper, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        paddingTop: '80px',
        paddingBottom: '80px',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="md" sx={{ width: '100%', maxWidth: '100%' }}>
        <Paper
          elevation={2}
          sx={{
            padding: '48px',
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              marginBottom: '24px',
            }}
          >
            Embeddable Chat Widget Demo
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            This is a demonstration page showing the embeddable chatbot widget in action.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              marginBottom: '16px',
              lineHeight: 1.8,
            }}
          >
            Look for the chat bubble in the bottom-right corner of your screen. Click it to start a conversation!
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginTop: '32px',
              opacity: 0.7,
            }}
          >
            Try sending a message to see how the chatbot responds with contextual awareness.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
