import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'wouter';
import { ThemeProvider } from './contexts/ThemeContext';
import i18n from './i18n';
import Home from './pages/Home';
import SafetyPage from './pages/SafetyPage';
import PhotosPage from './pages/PhotosPage';
import SentierPage from './pages/SentierPage';
import AmontAvalPage from './pages/AmontAvalPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookieSettings from './pages/CookieSettings';
export async function render(path: string, language: string) {
 await i18n.changeLanguage(language);
 const pages: Record<string, React.ComponentType> = {'/':Home,'/acces-securite-falaise-daval':SafetyPage,'/photos':PhotosPage,'/sentier-panoramique-falaise-daval':SentierPage,'/falaise-damont-ou-daval':AmontAvalPage,'/privacy-policy':PrivacyPolicy,'/terms-of-service':TermsOfService,'/cookie-settings':CookieSettings};
 const Page=pages[path] || Home;
 const body=renderToString(<HelmetProvider><ThemeProvider><Router hook={() => [path, () => {}]}><Page /></Router></ThemeProvider></HelmetProvider>);
 const tags=body.match(/<title[^>]*>[\s\S]*?<\/title>|<meta[^>]*>|<link[^>]*>|<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g) || [];
 let content=body; for(const tag of tags) content=content.replace(tag,'');
 return {body:content.replaceAll('opacity:0','opacity:1'),head:tags.join('')};
}
