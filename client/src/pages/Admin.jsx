import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Divider,
  Alert,
  Snackbar,
  IconButton,
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as ResetIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const Admin = () => {
  const [config, setConfig] = useState({
    title: 'Wizz',
    primaryColor: '#3498db',
    apiHost: 'http://localhost:5000',
    chatEndpoint: '/api/chat',
    quickSuggestions: [
      'How can you help me?',
      'What services do you offer?',
      'Tell me about your features',
      'How do I get started?',
    ],
    brandingFooterText: 'Powered by',
    brandingName: 'wizzcomAi.com',
    brandingLink: 'https://wizzcomAi.com',
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('chatbot_admin_config');
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('chatbot_admin_config', JSON.stringify(config));
    setSaveSuccess(true);
    
    window.dispatchEvent(new CustomEvent('chatbot-config-updated', { detail: config }));
  };

  const handleReset = () => {
    const defaultConfig = {
      title: 'Wizz',
      primaryColor: '#3498db',
      apiHost: 'http://localhost:5000',
      chatEndpoint: '/api/chat',
      quickSuggestions: [
        'How can you help me?',
        'What services do you offer?',
        'Tell me about your features',
        'How do I get started?',
      ],
      brandingFooterText: 'Powered by',
      brandingName: 'wizzcomAi.com',
      brandingLink: 'https://wizzcomAi.com',
    };
    setConfig(defaultConfig);
    localStorage.removeItem('chatbot_admin_config');
  };

  const handleSuggestionChange = (index, value) => {
    const newSuggestions = [...config.quickSuggestions];
    newSuggestions[index] = value;
    setConfig({ ...config, quickSuggestions: newSuggestions });
  };

  const handleAddSuggestion = () => {
    setConfig({
      ...config,
      quickSuggestions: [...config.quickSuggestions, ''],
    });
  };

  const handleRemoveSuggestion = (index) => {
    const newSuggestions = config.quickSuggestions.filter((_, i) => i !== index);
    setConfig({ ...config, quickSuggestions: newSuggestions });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        paddingTop: '40px',
        paddingBottom: '80px',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="md" sx={{ width: '100%', maxWidth: '100%' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Widget Configuration
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          Customize your chatbot widget settings
        </Typography>

        <Paper
          elevation={2}
          sx={{
            padding: '32px',
            borderRadius: '16px',
            marginBottom: '24px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: '8px' }}>
            <Grid item xs={12}>
              <TextField
                label="Widget Title"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                fullWidth
                data-testid="input-config-title"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Primary Color"
                value={config.primaryColor}
                onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: config.primaryColor,
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                data-testid="input-config-color"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="API Host"
                value={config.apiHost}
                onChange={(e) => setConfig({ ...config, apiHost: e.target.value })}
                fullWidth
                data-testid="input-config-api-host"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Chat Endpoint"
                value={config.chatEndpoint}
                onChange={(e) => setConfig({ ...config, chatEndpoint: e.target.value })}
                fullWidth
                data-testid="input-config-chat-endpoint"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            padding: '32px',
            borderRadius: '16px',
            marginBottom: '24px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Typography variant="h6">Quick Suggestions</Typography>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddSuggestion}
              data-testid="button-add-suggestion"
            >
              Add Suggestion
            </Button>
          </Box>
          <Grid container spacing={2}>
            {config.quickSuggestions.map((suggestion, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    label={`Suggestion ${index + 1}`}
                    value={suggestion}
                    onChange={(e) => handleSuggestionChange(index, e.target.value)}
                    fullWidth
                    data-testid={`input-suggestion-${index}`}
                  />
                  <IconButton
                    onClick={() => handleRemoveSuggestion(index)}
                    disabled={config.quickSuggestions.length <= 1}
                    data-testid={`button-remove-suggestion-${index}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            padding: '32px',
            borderRadius: '16px',
            marginBottom: '24px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Branding
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: '8px' }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Footer Text"
                value={config.brandingFooterText}
                onChange={(e) => setConfig({ ...config, brandingFooterText: e.target.value })}
                fullWidth
                data-testid="input-branding-footer-text"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Brand Name"
                value={config.brandingName}
                onChange={(e) => setConfig({ ...config, brandingName: e.target.value })}
                fullWidth
                data-testid="input-branding-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Brand Link (URL)"
                value={config.brandingLink}
                onChange={(e) => setConfig({ ...config, brandingLink: e.target.value })}
                fullWidth
                data-testid="input-branding-link"
              />
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            data-testid="button-save-config"
          >
            Save Configuration
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<ResetIcon />}
            onClick={handleReset}
            data-testid="button-reset-config"
          >
            Reset to Defaults
          </Button>
        </Box>

        <Alert severity="info" sx={{ marginTop: '24px' }}>
          <Typography variant="body2">
            Changes will be saved to your browser's localStorage and applied immediately to the widget.
            Clear your browser data to reset all settings.
          </Typography>
        </Alert>
      </Container>

      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={() => setSaveSuccess(false)}
        message="Configuration saved successfully!"
      />
    </Box>
  );
};

export default Admin;
