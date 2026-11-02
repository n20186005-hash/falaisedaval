import { MapConsent } from "@/components/ExternalServices";
import { SafetyLink } from "@/pages/SafetyPage";
/*
  Falaise d'Aval — Visitor Page
*/

import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { SEOHead } from "@/components/SEOHead";
import {
  ArrowUpRight,
  Compass,
  MapPinned,
  ShieldAlert,
  Waves,
  Camera,
  Footprints,
  ExternalLink,
  Mountain,
  Moon,
  Sun,
  Globe
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import heroImg from "@/assets/photos/hero-falaise-daval.jpg";
import g1 from "@/assets/photos/gallery-01.jpg";
import g2 from "@/assets/photos/gallery-02.jpg";
import g3 from "@/assets/photos/gallery-03.jpg";
import g4 from "@/assets/photos/gallery-04.jpg";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  buildAbsoluteUrl,
  GOOGLE_MAPS_URL,
  PLACE_CATEGORY,
  PLACE_LOCALITY,
  PLACE_NAME,
  PLACE_PLUS_CODE,
  REVIEW_COUNT,
  REVIEW_RATING,
  resolveSiteLanguage,
  SITE_URL,
} from "@/lib/site";

interface HomeProps {
  targetSection?: string;
}

function SectionTitle(props: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
        {props.kicker}
      </div>
      <h2 className="text-3xl sm:text-4xl leading-[0.98]">{props.title}</h2>
      {props.desc ? (
        <p className="max-w-2xl text-muted-foreground">{props.desc}</p>
      ) : null}
    </div>
  );
}

export default function Home({ targetSection }: HomeProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const locale = resolveSiteLanguage(i18n.language);

  const seoCopy = {
    fr: {
      title: "Falaise d'Aval à Étretat : accès, sentier & conseils de visite",
      description:
        "Découvrez la Falaise d'Aval à Étretat : Porte d'Aval, Aiguille, sentier panoramique, accès, points de vue et conseils pratiques pour préparer votre visite.",
      heroTitle: "Falaise d'Aval à Étretat : guide de visite",
      heroBody:
        "La Falaise d'Aval à Étretat permet de découvrir la Porte d'Aval, L'Aiguille et le sentier panoramique au-dessus de la Manche. Retrouvez ici l'accès, la carte, les meilleurs points de vue, les conseils photo et les informations essentielles pour respecter les accès autorisés.",
      heroBadge: "Guide en français",
      quickTitle: "Préparer votre visite",
      quickLinks: [
        {
          title: "Sentier panoramique de la Falaise d'Aval",
          description: "Temps de marche, points de vue, vent et sécurité.",
          href: "/sentier-panoramique-falaise-daval",
        },
        {
          title: "Falaise d'Amont ou Falaise d'Aval",
          description: "Le comparatif le plus utile pour choisir votre parcours.",
          href: "/falaise-damont-ou-daval",
        },
        {
          title: "Photos de la Falaise d'Aval",
          description: "Repérez les meilleurs cadrages avant de partir.",
          href: "/photos",
        },
        {
          title: "Carte et accès",
          description: "Ouvrez Google Maps et préparez votre arrivée.",
          href: "/map",
        },
      ],
      navTrail: "Sentier",
      navCompare: "Amont ou Aval",
      navPhotos: "Photos",
      navMap: "Carte",
      primaryCta: "Voir sur Google Maps",
      secondaryCta: "Voir le sentier",
    },
    en: {
      title: "Falaise d'Aval in Etretat: access, trail and visit tips",
      description:
        "Discover Falaise d'Aval in Etretat with Porte d'Aval, the Needle, panoramic trail, access tips, viewpoints and practical advice for your visit.",
      heroTitle: "Falaise d'Aval in Etretat: visitor guide",
      heroBody:
        "Falaise d'Aval in Etretat offers views of Porte d'Aval, L'Aiguille and the panoramic trail above the Channel. Use this guide for access, map links, viewpoints, photo spots and practical visit advice.",
      heroBadge: "Main visitor guide",
      quickTitle: "Plan your visit",
      quickLinks: [
        {
          title: "Panoramic trail of Falaise d'Aval",
          description: "Walking time, viewpoints, wind notes and safety.",
          href: "/sentier-panoramique-falaise-daval",
        },
        {
          title: "Falaise d'Amont or Falaise d'Aval",
          description: "A clear comparison to choose the right route.",
          href: "/falaise-damont-ou-daval",
        },
        {
          title: "Photos of Falaise d'Aval",
          description: "Preview framing ideas before you arrive.",
          href: "/photos",
        },
        {
          title: "Map and access",
          description: "Open Google Maps and prepare your arrival.",
          href: "/map",
        },
      ],
      navTrail: "Trail",
      navCompare: "Amont or Aval",
      navPhotos: "Photos",
      navMap: "Map",
      primaryCta: "Open Google Maps",
      secondaryCta: "Open trail guide",
    },
    "de": {
  "title": "Falaise d’Aval in Étretat: Zugang, Wege und Besuchstipps",
  "description": "Entdecken Sie Porte d’Aval, die Felsnadel und die Panoramawege von Étretat. Hinweise zu erlaubten Zugängen, Aussichtspunkten und der Besuchsplanung.",
  "heroTitle": "Falaise d’Aval in Étretat: Besucherführer",
  "heroBody": "Die Falaise d’Aval bietet Blicke auf Porte d’Aval, die Felsnadel und den Ärmelkanal. Hier finden Sie erlaubte Zugänge, Karten, Aussichtspunkte und Hinweise für Ihren Besuch.",
  "heroBadge": "Besucherführer auf Deutsch",
  "quickTitle": "Ihren Besuch planen",
  "quickLinks": [
    {
      "title": "Panoramaweg an der Falaise d’Aval",
      "description": "Gehzeit, Aussichtspunkte, Wind und Sicherheit.",
      "href": "/sentier-panoramique-falaise-daval"
    },
    {
      "title": "Falaise d’Amont oder Falaise d’Aval",
      "description": "Aussichten und Wege für Ihre Auswahl vergleichen.",
      "href": "/falaise-damont-ou-daval"
    },
    {
      "title": "Fotos der Falaise d’Aval",
      "description": "Ansichten zur Vorbereitung Ihres Besuchs.",
      "href": "/photos"
    },
    {
      "title": "Karte und Zugang",
      "description": "Google Maps öffnen und die Anreise planen.",
      "href": "/map"
    }
  ],
  "navTrail": "Panoramaweg",
  "navCompare": "Amont oder Aval",
  "navPhotos": "Fotos",
  "navMap": "Karte",
  "primaryCta": "In Google Maps öffnen",
  "secondaryCta": "Zum Panoramaweg"
},
    "zh-Hant": {
  "title": "Étretat Falaise d’Aval 遊覽指南：通行、步道與觀景建議",
  "description": "認識 Étretat 的 Porte d’Aval 拱門、針岩與全景步道，查閱允許通行的區域、觀景位置及實用遊覽資訊。",
  "heroTitle": "Étretat Falaise d’Aval 遊覽指南",
  "heroBody": "Falaise d’Aval 可欣賞 Porte d’Aval、針岩與英吉利海峽景色。本指南整理允許通行的區域、地圖、觀景位置與拍照建議，協助規劃符合現場限制的行程。",
  "heroBadge": "繁體中文遊覽指南",
  "quickTitle": "規劃你的行程",
  "quickLinks": [
    {
      "title": "Falaise d’Aval 全景步道",
      "description": "步行時間、觀景位置、風勢與安全資訊。",
      "href": "/sentier-panoramique-falaise-daval"
    },
    {
      "title": "Falaise d’Amont 或 Falaise d’Aval",
      "description": "比較景觀與步道，選擇適合的遊覽方式。",
      "href": "/falaise-damont-ou-daval"
    },
    {
      "title": "Falaise d’Aval 照片",
      "description": "出發前認識不同角度的景色。",
      "href": "/photos"
    },
    {
      "title": "地圖與交通",
      "description": "開啟 Google Maps 規劃抵達方式。",
      "href": "/map"
    }
  ],
  "navTrail": "全景步道",
  "navCompare": "Amont 與 Aval",
  "navPhotos": "照片",
  "navMap": "地圖",
  "primaryCta": "開啟 Google Maps",
  "secondaryCta": "閱讀步道指南"
},
  } as const;

  const content = seoCopy[locale];
  const homeSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: PLACE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: resolveSiteLanguage(i18n.language),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      inLanguage: locale,
      name: content.title,
      description: content.description,
      url: buildAbsoluteUrl("/", resolveSiteLanguage(i18n.language)),
      about: {
        "@type": "TouristAttraction",
        name: PLACE_NAME,
        sameAs: GOOGLE_MAPS_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: PLACE_NAME,
      description:
        "Falaises de craie, Porte d'Aval et L'Aiguille à Étretat, en Normandie.",
      url: buildAbsoluteUrl("/", resolveSiteLanguage(i18n.language)),
      image: new URL(heroImg, SITE_URL).toString(),
      sameAs: GOOGLE_MAPS_URL,
      additionalType: PLACE_CATEGORY,
      identifier: PLACE_PLUS_CODE,
      address: {
        "@type": "PostalAddress",
        addressLocality: PLACE_LOCALITY,
        addressRegion: "Normandie",
        addressCountry: "FR",
      },
    },
  ];

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    
    // Create mapping for URL prefixes
    const prefixMap: Record<string, string> = {
      'fr': '',
      'en': '/en',
      'de': '/de',
      'zh-Hant': '/zh-hant'
    };
    
    const newPrefix = prefixMap[lng] || '';
    
    // Get current path without language prefix
    let currentPath = window.location.pathname;
    const langPrefixes = ['/en', '/de', '/zh-hant'];
    for (const prefix of langPrefixes) {
      if (currentPath === prefix || currentPath.startsWith(`${prefix}/`)) {
        currentPath = currentPath.slice(prefix.length) || '/';
        break;
      }
    }
    
    // Redirect to the new URL with the correct language prefix
    const newUrl = `${newPrefix}${currentPath === '/' ? '' : currentPath}`;
    window.location.href = newUrl || '/';
  };

  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  const gallery = useMemo(
    () => [
      { src: g1, alt: t("阴天质感：Porte d'Aval 的拱门") },
      { src: g2, alt: t("海滩视角：拱门与海浪") },
      { src: g3, alt: t("暮色与低潮礁滩的层次") },
      { src: g4, alt: t("悬崖步道俯瞰：Aiguille 与海湾") },
    ],
    [t],
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SEOHead 
        title={content.title}
        description={content.description}
        pagePath=""
        type="website"
        image={new URL(heroImg, SITE_URL).toString()}
        schemas={homeSchemas}
      />
      <div className="grain absolute inset-0 -z-10" />

      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-baseline gap-3">
              <div
                className="text-lg font-semibold"
                style={{ fontFamily: "Cormorant Garamond" }}
              >
                {t("Falaise d'Aval")}
              </div>
              <div className="hidden sm:block text-xs tracking-[0.18em] uppercase text-muted-foreground">
                {t("Étretat · Côte d'Albâtre")}
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link className="hover:opacity-70" href="/sentier-panoramique-falaise-daval">
                {content.navTrail}
              </Link>
              <Link className="hover:opacity-70" href="/falaise-damont-ou-daval">
                {content.navCompare}
              </Link>
              <Link className="hover:opacity-70" href="/photos">
                {content.navPhotos}
              </Link>
              <Link className="hover:opacity-70" href="/map">
                {content.navMap}
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Toggle language</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                    Français
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange('zh-Hant')}>
                    繁體中文
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange('de')}>
                    Deutsch
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button asChild variant="outline" className="hidden sm:inline-flex">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content.primaryCta} <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild className="md:hidden" size="sm">
                <Link href="/map">
                  <MapPinned className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">{content.heroBadge}</Badge>
                  <Badge variant="secondary" className="rounded-full">{t("以现场开放信息为准")}</Badge>
                </div>

                <div className="my-5"><SafetyLink /></div>
                <h1 className="mt-5 text-5xl sm:text-6xl leading-[0.95]">{content.heroTitle}</h1>

                <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                  {content.heroBody}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                      {content.primaryCta}
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/sentier-panoramique-falaise-daval">{content.secondaryCta}</Link>
                  </Button>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  <Card className="hairline rounded-2xl p-4 bg-card/70">
                    <div className="flex items-center gap-2">
                      <Compass className="h-4 w-4" />
                      <div className="text-sm font-medium">{t("位置")}</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{t("Étretat, 法国")}</div>
                  </Card>
                  <Card className="hairline rounded-2xl p-4 bg-card/70">
                    <div className="flex items-center gap-2">
                      <MapPinned className="h-4 w-4" />
                      <div className="text-sm font-medium">{t("Plus Code")}</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{t("P54V+WC Étretat, 法国")}</div>
                  </Card>
                  <Card className="hairline rounded-2xl p-4 bg-card/70">
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4" />
                      <div className="text-sm font-medium">{t("关键词")}</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{t("拱门 / 针状岩 / 允许通行步道")}</div>
                  </Card>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-[2.2rem] border bg-card shadow-[0_30px_80px_-60px_rgba(0,0,0,0.65)]">
                  <img
                      src={heroImg}
                      alt={t("Falaise d'Aval、Porte d'Aval 与 L'Aiguille")}
                      className="h-[380px] w-full object-cover sm:h-[520px]"
                      loading="eager"
                  />
                  <div className="absolute inset-0 mask-fade bg-[linear-gradient(to_bottom,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-white">
                        <div className="text-xs tracking-[0.22em] uppercase opacity-80">{t("照片")}</div>
                        <div className="text-lg" style={{ fontFamily: "Cormorant Garamond" }}>
                          {t("Porte d'Aval / Étretat")}
                        </div>
                      </div>
                      <Badge className="rounded-full bg-white/90 text-foreground hover:bg-white/90">
                        Étretat
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="overview" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 pt-2 sm:pt-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.quickLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Card className="hairline rounded-2xl p-5 transition-colors hover:bg-card/80">
                    <div className="text-sm font-medium">{item.title}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle
                kicker={t("概览")}
                title={t("为什么这里最'像Étretat'")}
                desc={t("从允许的区域欣赏地貌")}
              />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <Card className="hairline rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold" style={{ fontFamily: "Cormorant Garamond" }}>
                      {t("Porte d'Aval")}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t("海蚀拱门像一座天然「门洞」，在不同光线下呈现完全不同的层次。")}</p>
                  </div>
                  <Camera className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>

              <Card className="hairline rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold" style={{ fontFamily: "Cormorant Garamond" }}>
                      {t("L'Aiguille")}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t("「针状岩」立在海中，是摄影构图里的稳定锚点：广角看尺度，长焦看纹理。")}</p>
                  </div>
                  <Waves className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>

              <Card className="hairline rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold" style={{ fontFamily: "Cormorant Garamond" }}>{t("遵守封闭措施")}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{t("禁止进入崖脚")}</p>
                  </div>
                  <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </div>

            <div className="mt-8 text-xs text-muted-foreground">{t("说明：页面基础信息（评分、开放时间、Plus Code）来自 Google Maps；地貌与观景建议参考公开旅游信息。")}</div>
          </div>
        </section>

        <section id="photos" className="scroll-mt-24 border-y bg-card/35">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle
                kicker={t("照片")}
                title={t("照片")}
              />

            <div className="mt-10">
              <Carousel opts={{ align: "start", loop: true }} className="relative">
                <CarouselContent>
                  {gallery.map((item) => (
                    <CarouselItem key={item.alt} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="hairline overflow-hidden rounded-2xl">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="h-64 w-full object-cover"
                          loading="lazy"
                        />
                        <div className="p-4">
                          <div className="text-sm font-medium">{item.alt}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{t("照片")} · Étretat</div>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-2" />
                <CarouselNext className="-right-2" />
              </Carousel>
            </div>
          </div>
        </section>

        <section id="tips" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle
                kicker={t("玩法")}
                title={t("怎么逛更舒服")}
                desc={t("依照官方开放信息规划")}
              />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <Card className="hairline rounded-2xl p-6">
                <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">{t("快速计划")}</div>
                <h3 className="mt-2 text-2xl leading-tight">{t("半日路线（不赶）")}</h3>
                <Separator className="my-5" />
                <ol className="space-y-4 text-sm">
                  <li className="flex gap-3">
                    <div className="mt-0.5 h-6 w-6 rounded-full bg-accent/60 grid place-items-center text-xs font-semibold">
                      1
                    </div>
                    <div>
                      <div className="font-medium">{t("海滩侧先取一个'远景点'")}</div>
                      <div className="text-muted-foreground mt-1">{t("先用远景确定拱门、针状岩、浪线关系，再决定是否近距离探索。")}</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-0.5 h-6 w-6 rounded-full bg-accent/60 grid place-items-center text-xs font-semibold">
                      2
                    </div>
                    <div>
                      <div className="font-medium">{t("留在允许的观景区域")}</div>
                      <div className="text-muted-foreground mt-1">{t("不要进入洞穴或崖脚")}</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-0.5 h-6 w-6 rounded-full bg-accent/60 grid place-items-center text-xs font-semibold">
                      3
                    </div>
                    <div>
                      <div className="font-medium">{t("上崖顶步道看轮廓与光线")}</div>
                      <div className="text-muted-foreground mt-1">{t("崖顶更适合全景与日落光；风大时注意站位与边缘距离。")}</div>
                    </div>
                  </li>
                </ol>
              </Card>

              <div className="grid gap-4">
                <Card className="hairline rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">{t("安全")}</div>
                      <h3 className="mt-2 text-2xl leading-tight">{t("访问限制")}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{t("遵守市政限制说明")}<span className="font-medium text-foreground">{t("低潮并不解除禁令")}</span>{t("遵循现场标识")}</p>
                    </div>
                    <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>

                <Card className="hairline rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">{t("地形")}</div>
                      <h3 className="mt-2 text-2xl leading-tight">{t("鞋子与步行")}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{t("鹅卵石路面更费力且更滑，建议穿防滑鞋；摄影党最好带长焦与防风外套。")}</p>
                    </div>
                    <Footprints className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="comparison" className="scroll-mt-24 border-t bg-card/10">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle
              kicker={t("对比")}
              title={t("Plage d'Étretat 与 Falaise d'Aval 景点对比")}
              desc={t("游玩指南")}
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Card className="hairline rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">{t("共同点")}</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>{t("同属于 Étretat 的标志性白垩悬崖景观的一部分。")}</li>
                  <li>{t("海岸环境需遵守限制")}</li>
                  <li>{t("皆以独特的鹅卵石海滩和壮丽的日落光影而闻名。")}</li>
                </ul>
              </Card>
              <Card className="hairline rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">{t("不同点")}</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>{t("Plage d'Étretat 主要是指宽阔的公共鹅卵石海滩，更适合休闲、听浪和观看全景。")}</li>
                  <li>{t("Falaise d'Aval 侧重于南侧的悬崖，著名的拱门（Porte d'Aval）和针状岩（L'Aiguille），更具戏剧性和探险感。")}</li>
                  <li>{t("Falaise d'Aval 提供了悬崖顶部的徒步步道，可以从高处俯瞰海湾，而海滩主要在底部。")}</li>
                </ul>
              </Card>

              <Card className="hairline rounded-2xl border-yellow-200 bg-yellow-50/50 p-6 dark:border-yellow-900 dark:bg-yellow-900/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-yellow-500">⚠️</span> {t("提示")}
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>{t("海滩严禁捡鹅卵石（有罚款）；悬崖下部分区域因落石风险，有官方禁入标志。")}</li>
                  <li>{t("不要沿崖脚前往拱门")}</li>
                  <li>{t("若想同时打卡两者，建议先在海滩看全景，再沿步道上 Falaise d'Aval 的观景台拍日落。")}</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        <section id="reviews" className="scroll-mt-24 border-t bg-card/35">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <h2 className="text-3xl">Google Maps</h2>
            <p className="mt-4">{REVIEW_RATING}/5 · {REVIEW_COUNT} {t("条评价")} · {t("评分核对日期")} 2026-11-02</p>
            <p className="mt-3 text-muted-foreground">{t("评分动态来源说明")}</p>
            <a className="mt-4 inline-block underline" href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">{t("查看更多 Google Maps 評價")}</a>
          </div>
        </section>

        <section id="map" className="scroll-mt-24 border-t bg-card/35">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionTitle
                kicker={t("地图")}
                title={t("地图")}
              />
              <Button asChild variant="outline" className="w-fit">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                >{t("在 Google Maps 里规划路线")}<ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border bg-background">
              <div className="aspect-[16/10] w-full">
                <MapConsent><iframe
                  title="Falaise d'Aval - Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10320.744008344805!2d0.17452778715820244!3d49.707299900000024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e017ec085cd9e3%3A0xf32a14b75516be50!2sFalaise%20d&#39;Aval!5e0!3m2!1sen!2sus!4v1774238261235!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                /></MapConsent>
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <Card className="hairline rounded-2xl p-6">
                <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Access</div>
                <div className="mt-2 text-xl" style={{ fontFamily: "Cormorant Garamond" }}>{t("以现场开放信息为准")}</div>
                <p className="mt-2 text-sm text-muted-foreground">{t("自然地点以现场公告为准")}</p>
              </Card>
              <Card className="hairline rounded-2xl p-6">
                <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Best light</div>
                <div className="mt-2 text-xl" style={{ fontFamily: "Cormorant Garamond" }}>{t("日落前后")}</div>
                <p className="mt-2 text-sm text-muted-foreground">{t("逆光或侧逆光会强调悬崖纹理；阴天则更适合拍「冷色电影感」。")}</p>
              </Card>
              <Card className="hairline rounded-2xl p-6">
                <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Mini rule</div>
                <div className="mt-2 text-xl" style={{ fontFamily: "Cormorant Garamond" }}>{t("远离边缘")}</div>
                <p className="mt-2 text-sm text-muted-foreground">{t("崖顶风强且边缘松散，请保持距离；拍照时更不要背对海风走近边缘。")}</p>
              </Card>
            </div>
          </div>
        </section>

        <section id="sources" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle kicker={t("数据与引用")} title={t("数据与引用")} desc={t("为了保持信息可信，我们只引用可公开访问的页面。")} />

            <div className="mt-8 grid gap-4">
              <Card className="hairline rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{t("信息提取自公共资源")}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{t("结合了诺曼底当地旅游局、维基百科以及谷歌地图的基本信息。")}</div>
                  </div>
                </div>
              </Card>

              <Card className="hairline rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{t("Google Maps（地点基础信息）")}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{t("评分、开放时间、Plus Code、简介等（可能随时间变化）")}</div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">{t("打开")}<ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <footer className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-8 p-5 bg-muted/30 rounded-xl border-l-4 border-yellow-500">
              <h4 className="font-semibold text-sm mb-2">{t("免责声明（Disclaimer）")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("本网站是一个独立的第三方旅游资讯指南，旨在为游客提供客观的历史背景与游览建议，与 Falaise d'Aval 的官方管理机构无关。如需购买官方门票或获取官方通告，请访问官方渠道。")}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <div>
                <p>{t("如需本网站的技术支持，请联系：claritleonelmnicol@gmail.com")}</p>
                <p className="mt-2">{t("© 2026 Falaise d'Aval ·版权所有。")}</p>
              </div>
              <div className="flex gap-4">
                <Link className="hover:opacity-70" href="/privacy-policy">{t("隐私政策")}</Link>
                <Link className="hover:opacity-70" href="/terms-of-service">{t("服务条款")}</Link>
                <Link className="hover:opacity-70" href="/cookie-settings">{t("Cookie 设置")}</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
