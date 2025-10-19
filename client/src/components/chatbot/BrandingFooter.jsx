import { useState, useEffect } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { getConfig } from '../../utils/config';

const BrandingFooter = () => {
  const [config, setConfig] = useState(getConfig());

  useEffect(() => {
    const handleConfigUpdate = () => {
      setConfig(getConfig());
    };

    window.addEventListener('chatbot-config-updated', handleConfigUpdate);
    return () => window.removeEventListener('chatbot-config-updated', handleConfigUpdate);
  }, []);

  const footerText = config?.brandingFooterText || 'Powered by';
  const brandName = config?.brandingName || 'wizzcomAi.com';
  const brandLink = config?.brandingLink || 'https://wizzcomAi.com';

  return (
    <Box
      className="branding-footer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 0',
        backgroundColor: 'transparent',
        pointerEvents: 'none',
      }}
      data-testid="branding-footer"
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: '11px',
          color: 'text.secondary',
          opacity: 0.7,
        }}
      >
        {footerText}{' '}
        <Link
          href={brandLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            pointerEvents: 'auto',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          data-testid="link-branding"
        >
          {brandName}
        </Link>
      </Typography>
    </Box>
  );
};

export default BrandingFooter;