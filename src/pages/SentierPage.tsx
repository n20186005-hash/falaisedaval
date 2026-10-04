import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Camera, Footprints, MapPinned, ShieldAlert, Wind } from "lucide-react";
import heroImg from "@/assets/photos/gallery-04.jpg";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildBreadcrumbSchema, buildAbsoluteUrl, GOOGLE_MAPS_URL, resolveSiteLanguage, SITE_URL } from "@/lib/site";

const copy = {
  fr: {
    title: "Sentier panoramique de la Falaise d'Aval à Étretat",
    description:
      "Préparez le sentier panoramique de la Falaise d'Aval à Étretat : accès, temps de marche, points de vue, sécurité, vent et conseils photo.",
    kicker: "Guide sentier",
    intro:
      "Le sentier panoramique de la Falaise d'Aval est l'une des plus belles promenades d'Étretat. On y vient pour voir la Porte d'Aval, L'Aiguille, la baie et les falaises de craie depuis le haut, avec une vue qui change selon la lumière, le vent et la marée.",
    stats: [
      ["Départ conseillé", "Front de mer d'Étretat"],
      ["Temps de marche", "30 à 60 min selon le rythme"],
      ["Niveau", "Facile à modéré selon la météo"],
      ["Meilleure lumière", "Fin d'après-midi et coucher du soleil"],
    ],
    sections: {
      route: "Itinéraire conseillé",
      routeBody:
        "Depuis la plage d'Étretat, longez le front de mer puis montez vers la falaise d'Aval. Le chemin offre très vite une vue dégagée sur la Porte d'Aval et L'Aiguille. Plus vous prenez de hauteur, plus la forme de l'arche devient lisible.",
      viewpoints: "Points de vue à privilégier",
      viewpointItems: [
        "Le premier belvédère pour une vue rapide et accessible.",
        "Le sentier en hauteur pour cadrer la baie d'Étretat et la falaise.",
        "Les zones dégagées au coucher du soleil pour une lumière plus chaude.",
      ],
      safety: "Sécurité sur le sentier",
      safetyItems: [
        "Restez loin du bord, surtout après la pluie et par vent fort.",
        "Le terrain peut devenir glissant sur l'herbe et la craie humide.",
        "Si vous descendez vers la plage ou les rochers, vérifiez toujours la marée.",
      ],
      photo: "Conseils photo",
      photoBody:
        "Un grand-angle fonctionne très bien pour inclure la Porte d'Aval, L'Aiguille et la mer. Un téléobjectif aide à isoler les textures de craie et la silhouette de l'arche. Par temps venteux, prévoyez des pauses stables et évitez les changements de position trop près du vide.",
      nearby: "Avant de partir",
      nearbyItems: [
        "Chaussures fermées avec bonne accroche.",
        "Coupe-vent même en été.",
        "Eau et batterie chargée pour la photo et la carte.",
      ],
      links: "Liens utiles",
    },
    ctas: {
      map: "Voir sur Google Maps",
      photos: "Voir les photos",
      compare: "Comparer Amont et Aval",
    },
  },
  en: {
    title: "Panoramic trail of Falaise d'Aval in Etretat",
    description:
      "Plan the panoramic trail of Falaise d'Aval in Etretat with route tips, walking time, viewpoints, wind notes, safety advice and photo spots.",
    kicker: "Trail guide",
    intro:
      "The panoramic trail of Falaise d'Aval is one of the most rewarding walks in Etretat. Visitors come here for elevated views of Porte d'Aval, L'Aiguille, the bay and the chalk cliffs, with scenery that changes dramatically with light, wind and tide.",
    stats: [
      ["Best starting point", "Etretat seafront"],
      ["Walking time", "30 to 60 minutes"],
      ["Difficulty", "Easy to moderate depending on weather"],
      ["Best light", "Late afternoon and sunset"],
    ],
    sections: {
      route: "Suggested route",
      routeBody:
        "From Etretat beach, follow the seafront and climb toward Falaise d'Aval. The path quickly opens onto clear views of Porte d'Aval and L'Aiguille. The higher you go, the easier it becomes to read the full shape of the arch.",
      viewpoints: "Best viewpoints",
      viewpointItems: [
        "The first lookout for a quick and accessible panorama.",
        "The upper trail to frame both the bay and the cliff.",
        "Open sunset spots for warmer light across the chalk.",
      ],
      safety: "Trail safety",
      safetyItems: [
        "Keep a wide distance from the edge, especially after rain and in strong wind.",
        "Grass and wet chalk can be slippery.",
        "If you plan to descend to the beach or rocks, always check the tide first.",
      ],
      photo: "Photo tips",
      photoBody:
        "A wide lens works well for Porte d'Aval, L'Aiguille and the Channel in one frame. A telephoto helps isolate chalk textures and the arch profile. In windy conditions, take stable positions and avoid moving too close to the edge.",
      nearby: "Before you go",
      nearbyItems: [
        "Closed shoes with grip.",
        "A windproof layer even in summer.",
        "Water and a charged phone for maps and photos.",
      ],
      links: "Useful links",
    },
    ctas: {
      map: "Open Google Maps",
      photos: "View photos",
      compare: "Compare Amont and Aval",
    },
  },
} as const;

export default function SentierPage() {
  const { i18n } = useTranslation();
  const locale = resolveSiteLanguage(i18n.language) === "en" ? "en" : "fr";
  const content = copy[locale];

  const schemas = [
    buildBreadcrumbSchema([
      { name: "Falaise d'Aval", path: "/" },
      { name: content.title, path: "/sentier-panoramique-falaise-daval" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.title,
      description: content.description,
      url: buildAbsoluteUrl("/sentier-panoramique-falaise-daval", "fr"),
      isPartOf: buildAbsoluteUrl("/", "fr"),
      about: {
        "@type": "TouristAttraction",
        name: "Falaise d'Aval",
        url: SITE_URL,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={content.title}
        description={content.description}
        pagePath="/sentier-panoramique-falaise-daval"
        type="article"
        image={new URL(heroImg, SITE_URL).toString()}
        schemas={schemas}
      />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <Button asChild variant="ghost" className="-ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Falaise d'Aval
          </Link>
        </Button>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge variant="secondary" className="rounded-full">{content.kicker}</Badge>
            <h1 className="mt-4 text-4xl sm:text-5xl leading-tight">{content.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{content.intro}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                  {content.ctas.map}
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/photos">{content.ctas.photos}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/falaise-damont-ou-daval">{content.ctas.compare}</Link>
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden rounded-3xl border bg-card/60">
            <img
              src={heroImg}
              alt="Vue panoramique sur la Falaise d'Aval et la baie d'Étretat"
              width={3000}
              height={4500}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </Card>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {content.stats.map(([label, value]) => (
            <Card key={label} className="rounded-2xl p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
              <div className="mt-2 text-base font-medium">{value}</div>
            </Card>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Footprints className="h-4 w-4" />
              {content.sections.route}
            </div>
            <p className="mt-4 text-muted-foreground">{content.sections.routeBody}</p>
          </Card>

          <Card className="rounded-3xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Camera className="h-4 w-4" />
              {content.sections.photo}
            </div>
            <p className="mt-4 text-muted-foreground">{content.sections.photoBody}</p>
          </Card>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPinned className="h-4 w-4" />
              {content.sections.viewpoints}
            </div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {content.sections.viewpointItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-3xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <ShieldAlert className="h-4 w-4" />
              {content.sections.safety}
            </div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {content.sections.safetyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-3xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Wind className="h-4 w-4" />
              {content.sections.nearby}
            </div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {content.sections.nearbyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </section>
      </main>
    </div>
  );
}
