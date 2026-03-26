import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

// Base URL configuration - change this to your actual production domain
const SITE_URL = 'https://www.falaisedaval.com';

interface SEOHeadProps {
  title?: string;
  description?: string;
  pagePath?: string; // e.g., '', '/privacy-policy', '/terms-of-service'
}

export function SEOHead({ title, description, pagePath = '' }: SEOHeadProps) {
  const { i18n, t } = useTranslation();
  
  // Clean up page path to ensure it starts with / but doesn't have trailing slash
  const cleanPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;
  const normalizedPath = cleanPath === '/' ? '' : cleanPath;

  // Map internal languages to URL language prefixes and hreflang codes
  const langConfig = {
    'fr': { prefix: '', hreflang: 'fr' }, // Default language has no prefix
    'en': { prefix: '/en', hreflang: 'en' },
    'de': { prefix: '/de', hreflang: 'de' },
    'zh-Hant': { prefix: '/zh-hant', hreflang: 'zh-Hant' }
  };

  const currentLang = i18n.language as keyof typeof langConfig;
  const config = langConfig[currentLang] || langConfig['fr'];

  // Construct current canonical URL
  const canonicalUrl = `${SITE_URL}${config.prefix}${normalizedPath}`;

  // Default values from translation if not provided
  const metaTitle = title || "Falaise d'Aval | " + t("概览");
  const metaDesc = description || t("自然景观点") + " - " + t("Étretat · Côte d'Albâtre");

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={config.hreflang} />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />

      {/* Canonical Link (Self-referencing) */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags (Bidirectional) */}
      <link rel="alternate" hrefLang="fr" href={`${SITE_URL}${normalizedPath}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en${normalizedPath}`} />
      <link rel="alternate" hrefLang="de" href={`${SITE_URL}/de${normalizedPath}`} />
      <link rel="alternate" hrefLang="zh-Hant" href={`${SITE_URL}/zh-hant${normalizedPath}`} />
      
      {/* x-default tag (Fallback language, typically English or the primary language) */}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${normalizedPath}`} />
    </Helmet>
  );
}
