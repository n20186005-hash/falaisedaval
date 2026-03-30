import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookieSettings from "@/pages/CookieSettings";

// Custom hook to strip language prefix for routing
const useLanguageAwareLocation = () => {
  const [loc, setLoc] = useBrowserLocation();
  
  let path = loc;
  let currentPrefix = '';
  
  // Strip supported language prefixes: /en, /de, /zh-hant
  const langPrefixes = ['/en', '/de', '/zh-hant'];
  for (const prefix of langPrefixes) {
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      path = path.slice(prefix.length) || '/';
      currentPrefix = prefix;
      break;
    }
  }

  // Intercept navigation to automatically append the current language prefix
  const navigate = (to: string | URL, options?: { replace?: boolean }) => {
    const toStr = to.toString();
    // Only append if it's an absolute path and doesn't already have a prefix
    if (toStr.startsWith('/') && currentPrefix && !langPrefixes.some(p => toStr === p || toStr.startsWith(`${p}/`))) {
      setLoc(`${currentPrefix}${toStr === '/' ? '' : toStr}`, options);
    } else {
      setLoc(to, options);
    }
  };

  return [path, navigate] as [string, typeof navigate];
};

function AppRouter() {
  return (
    <Router hook={useLanguageAwareLocation}>
      <Switch>
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/cookie-settings" component={CookieSettings} />
        <Route path="/:section?">{(params) => <Home targetSection={params.section} />}</Route>
      </Switch>
    </Router>
  );
}

// Note on theming:
// - Choose defaultTheme based on your design (light or dark background)
// - Update the color palette in index.css to match
// - If you want switchable themes, add `switchable` prop and use `useTheme` hook

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="light" switchable>
          <TooltipProvider>
            <Toaster />
            <AppRouter />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;

