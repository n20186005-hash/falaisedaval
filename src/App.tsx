import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Advertising } from "@/components/ExternalServices";
import SafetyPage from "@/pages/SafetyPage";
import Home from "@/pages/Home";
import PhotosPage from "@/pages/PhotosPage";
import SentierPage from "@/pages/SentierPage";
import AmontAvalPage from "@/pages/AmontAvalPage";
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
        <Route path="/acces-securite-falaise-daval" component={SafetyPage} />
        <Route path="/photos" component={PhotosPage} />
        <Route path="/sentier-panoramique-falaise-daval" component={SentierPage} />
        <Route path="/falaise-damont-ou-daval" component={AmontAvalPage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/cookie-settings" component={CookieSettings} />
        {['/', '/overview', '/tips', '/map', '/reviews', '/sources', '/comparison'].map(path => <Route key={path} path={path}><Home targetSection={path === '/' ? undefined : path.slice(1)} /></Route>)}
        <Route><meta name="robots" content="noindex" /><main className="mx-auto max-w-3xl p-10"><h1>404 — Page introuvable / Page not found</h1><a href="/">Falaise d’Aval</a></main></Route>
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
            <Advertising />
            <AppRouter />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;

