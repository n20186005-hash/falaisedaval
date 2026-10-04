import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  SITE_URL,
  buildAbsoluteUrl,
  getAlternateUrls,
  languageConfig,
  normalizePagePath,
  resolveSiteLanguage,
} from "@/lib/site";

interface SEOHeadProps {
  title?: string;
  description?: string;
  pagePath?: string; // e.g., '', '/privacy-policy', '/terms-of-service'
  image?: string;
  type?: string;
  schemas?: Array<Record<string, unknown>> | Record<string, unknown>;
}

export function SEOHead({
  title,
  description,
  pagePath = '',
  image,
  type = 'website',
  schemas,
}: SEOHeadProps) {
  const { i18n, t } = useTranslation();
  
  const normalizedPath = normalizePagePath(pagePath);
  const currentLanguage = resolveSiteLanguage(i18n.language);
  const config = languageConfig[currentLanguage];
  const canonicalUrl = buildAbsoluteUrl(normalizedPath, currentLanguage);
  const alternateUrls = getAlternateUrls(normalizedPath);
  const metaTitle = title || "Falaise d'Aval | " + t("概览");
  const metaDesc = description || t("自然景观点") + " - " + t("Étretat · Côte d'Albâtre");
  const schemaList = Array.isArray(schemas) ? schemas : schemas ? [schemas] : [];

  return (
    <Helmet>
      <html lang={config.htmlLang} />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta property="og:site_name" content="Falaise d'Aval" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={config.ogLocale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      {image ? <meta property="og:image" content={image} /> : null}
      {image ? <meta name="twitter:image" content={image} /> : null}

      <link rel="canonical" href={canonicalUrl} />
      {alternateUrls.map((alternate) => (
        <link
          key={alternate.hrefLang}
          rel="alternate"
          hrefLang={alternate.hrefLang}
          href={alternate.href}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={buildAbsoluteUrl(normalizedPath, "fr")} />
      {schemaList.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
