import React from "react";
import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Button, Box } from "@mui/material";
import ChatWidget from "./components/chatbot/ChatWidget";
import Home from "./pages/Home";
import Embed from "./pages/Embed";
import Admin from "./pages/Admin";
import NotFound from "@/pages/not-found";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6B46C1',
    },
    secondary: {
      main: '#F97316',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, sans-serif',
  },
});

function Router() {
  return (
    <>
      <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary', width: '100%', maxWidth: '100vw' }}>
        <Toolbar sx={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Link href="/">
              <Button color="inherit" data-testid="nav-home">Home</Button>
            </Link>
            <Link href="/embed">
              <Button color="inherit" data-testid="nav-embed">Embed Code</Button>
            </Link>
            <Link href="/admin">
              <Button color="inherit" data-testid="nav-admin">Admin</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/embed" component={Embed} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </Box>
    </>
  );
}

function App() {
  const [isEmbedded, setIsEmbedded] = React.useState(false);

  React.useEffect(() => {
    // Check if the app is loaded in an iframe (embedded in another website)
    const checkEmbedded = () => {
      try {
        return window.self !== window.top;
      } catch (e) {
        // If we get a security error, we're definitely in an iframe
        return true;
      }
    };

    const embedded = checkEmbedded();
    setIsEmbedded(embedded);
    
    // Set data attribute on html element for CSS targeting
    if (embedded) {
      document.documentElement.setAttribute('data-embedded', 'true');
      console.log('🔹 Embedded mode detected: Showing chatbot only');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TooltipProvider>
          <Toaster />
          {/* Only show Router (navigation & pages) when NOT embedded */}
          {!isEmbedded && <Router />}
          {/* ChatWidget is always visible */}
          <ChatWidget />
          
          {/* Apply transparent background when embedded */}
          {isEmbedded && (
            <style>{`
              body {
                background: transparent !important;
              }
              #root {
                background: transparent !important;
              }
            `}</style>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
