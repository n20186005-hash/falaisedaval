export const SITE_URL = "https://www.falaisedaval.com";
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/9PbnpZHawCuUewXF8";
export const PLACE_NAME = "Falaise d'Aval";
export const PLACE_CATEGORY = "Scenic spot";
export const PLACE_LOCALITY = "Étretat";
export const PLACE_LOCATION = "Étretat, France";
export const PLACE_PLUS_CODE = "P54V+WC Étretat, France";
export const REVIEW_RATING = "4.8";
export const REVIEW_COUNT = "17,569";

export const languageConfig = {
  fr: { prefix: "", hrefLang: "fr-FR", htmlLang: "fr", ogLocale: "fr_FR", label: "Français" },
  en: { prefix: "/en", hrefLang: "en", htmlLang: "en", ogLocale: "en_US", label: "English" },
  de: { prefix: "/de", hrefLang: "de", htmlLang: "de", ogLocale: "de_DE", label: "Deutsch" },
  "zh-Hant": {
    prefix: "/zh-hant",
    hrefLang: "zh-Hant",
    htmlLang: "zh-Hant",
    ogLocale: "zh_TW",
    label: "繁體中文",
  },
} as const;

export type SiteLanguage = keyof typeof languageConfig;

export function resolveSiteLanguage(language?: string): SiteLanguage {
  if (language === "en" || language?.startsWith("en-")) return "en";
  if (language === "de" || language?.startsWith("de-")) return "de";
  if (language === "zh-Hant" || language?.startsWith("zh-Hant")) return "zh-Hant";
  return "fr";
}

export function normalizePagePath(pagePath = "") {
  if (!pagePath || pagePath === "/") return "";
  const ensuredLeadingSlash = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
  return ensuredLeadingSlash.endsWith("/") ? ensuredLeadingSlash.slice(0, -1) : ensuredLeadingSlash;
}

export function stripLanguagePrefix(pathname: string) {
  const knownPrefixes = Object.values(languageConfig)
    .map((entry) => entry.prefix)
    .filter(Boolean);

  for (const prefix of knownPrefixes) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      const stripped = pathname.slice(prefix.length);
      return stripped || "/";
    }
  }

  return pathname || "/";
}

export function buildLocalizedPath(pathname: string, language: SiteLanguage) {
  const normalized = normalizePagePath(pathname);
  const prefix = languageConfig[language].prefix;
  const fullPath = `${prefix}${normalized}`;
  return fullPath || "/";
}

export function buildAbsoluteUrl(pathname: string, language: SiteLanguage) {
  const localizedPath = buildLocalizedPath(pathname, language);
  return localizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${localizedPath}`;
}

export function getAlternateUrls(pathname: string) {
  const normalized = normalizePagePath(pathname);
  return (Object.keys(languageConfig) as SiteLanguage[]).map((language) => ({
    language,
    hrefLang: languageConfig[language].hrefLang,
    href: buildAbsoluteUrl(normalized, language),
  }));
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path, "fr"),
    })),
  };
}
