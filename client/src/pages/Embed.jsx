import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from '@mui/material';
import { ContentCopy as CopyIcon, CheckCircle as CheckIcon } from '@mui/icons-material';

const Embed = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    apiHost: 'http://localhost:5000',
    primaryColor: '#3498db',
    title: 'Smart Assistant',
  });

  const currentDomain = window.location.origin;

  const iframeCode = `<!-- Embeddable Chat Widget (iframe) -->
<iframe 
  src="${currentDomain}/" 
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 999999; pointer-events: none;"
  title="Chat Widget"
></iframe>`;

  const scriptCode = `<!-- Embeddable Chat Widget (Script Tag) -->
<script>
  (function() {
    var iframe = document.createElement('iframe');
    iframe.src = '${currentDomain}/';
    iframe.style.cssText = 'position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 999999; pointer-events: none;';
    iframe.title = 'Chat Widget';
    document.body.appendChild(iframe);
  })();
</script>`;

  const fullPageCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Widget Embedded</title>
</head>
<body style="margin: 0; padding: 20px; font-family: system-ui;">
  <h1>Your Website Content Here</h1>
  <p>The chat widget will appear in the bottom-right corner.</p>
  
  ${activeTab === 0 ? iframeCode : scriptCode}
</body>
</html>`;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <Container maxWidth="lg" sx={{ width: '100%', maxWidth: '100%' }}>
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
          Embed Chat Widget
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            marginBottom: '32px',
            textAlign: 'center',
            maxWidth: '600px',
            marginX: 'auto',
          }}
        >
          Copy the code below to embed the chat widget on your website
        </Typography>

        <Paper
          elevation={2}
          sx={{
            padding: '32px',
            borderRadius: '16px',
            marginBottom: '24px',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ marginBottom: '24px', borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="iframe Embed" data-testid="tab-iframe" />
            <Tab label="Script Tag" data-testid="tab-script" />
            <Tab label="Full Page Example" data-testid="tab-full-page" />
          </Tabs>

          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                iframe Embed Code
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px' }}>
                Most secure option with complete isolation from your parent page styles.
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  padding: '16px',
                  backgroundColor: 'action.hover',
                  borderRadius: '8px',
                  position: 'relative',
                  marginBottom: '16px',
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    overflow: 'auto',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                  }}
                  data-testid="code-iframe"
                >
                  {iframeCode}
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={copied ? <CheckIcon /> : <CopyIcon />}
                  onClick={() => handleCopy(iframeCode)}
                  sx={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                  }}
                  data-testid="button-copy-iframe"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </Paper>
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Script Tag Embed
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px' }}>
                Dynamically injects the widget via JavaScript. Easy to install.
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  padding: '16px',
                  backgroundColor: 'action.hover',
                  borderRadius: '8px',
                  position: 'relative',
                  marginBottom: '16px',
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    overflow: 'auto',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                  }}
                  data-testid="code-script"
                >
                  {scriptCode}
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={copied ? <CheckIcon /> : <CopyIcon />}
                  onClick={() => handleCopy(scriptCode)}
                  sx={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                  }}
                  data-testid="button-copy-script"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </Paper>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Complete Page Example
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px' }}>
                A full HTML page example showing how to integrate the widget.
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  padding: '16px',
                  backgroundColor: 'action.hover',
                  borderRadius: '8px',
                  position: 'relative',
                  marginBottom: '16px',
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    overflow: 'auto',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                  }}
                  data-testid="code-full-page"
                >
                  {fullPageCode}
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={copied ? <CheckIcon /> : <CopyIcon />}
                  onClick={() => handleCopy(fullPageCode)}
                  sx={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                  }}
                  data-testid="button-copy-full-page"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </Paper>
            </Box>
          )}

          <Alert severity="info" sx={{ marginTop: '24px' }}>
            <Typography variant="body2">
              <strong>Installation:</strong> Simply paste the code above before the closing{' '}
              <code>&lt;/body&gt;</code> tag of your HTML page. The widget will appear in the
              bottom-right corner automatically.
            </Typography>
          </Alert>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            padding: '32px',
            borderRadius: '16px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Configuration (Optional)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '24px' }}>
            Customize the widget appearance by setting environment variables:
          </Typography>

          <Box sx={{ display: 'grid', gap: '16px' }}>
            <TextField
              label="API Host"
              value={config.apiHost}
              onChange={(e) => setConfig({ ...config, apiHost: e.target.value })}
              fullWidth
              size="small"
              data-testid="input-api-host"
            />
            <TextField
              label="Primary Color"
              value={config.primaryColor}
              onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
              fullWidth
              size="small"
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
              data-testid="input-primary-color"
            />
            <TextField
              label="Widget Title"
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              fullWidth
              size="small"
              data-testid="input-widget-title"
            />
          </Box>

          <Alert severity="warning" sx={{ marginTop: '24px' }}>
            <Typography variant="body2">
              Set these values in your <code>.env</code> file as <code>VITE_API_HOST</code>,{' '}
              <code>VITE_PRIMARY_COLOR</code>, and <code>VITE_TITLE</code>
            </Typography>
          </Alert>
        </Paper>
      </Container>
    </Box>
  );
};

export default Embed;
