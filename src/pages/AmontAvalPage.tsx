import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Camera, Footprints, Sunset, Telescope } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildAbsoluteUrl, buildBreadcrumbSchema, resolveSiteLanguage, SITE_URL } from "@/lib/site";

const copy = {
  fr: {
    title: "Falaise d'Amont ou Falaise d'Aval : laquelle visiter à Étretat ?",
    description:
      "Comparez la Falaise d'Amont et la Falaise d'Aval à Étretat : vues, lumière, photo, marche et conseils pour choisir la meilleure falaise selon votre visite.",
    kicker: "Comparatif Étretat",
    intro:
      "À Étretat, la Falaise d'Amont et la Falaise d'Aval offrent deux expériences très proches mais pas tout à fait identiques. Si vous cherchez la vue la plus iconique sur la Porte d'Aval et L'Aiguille, Aval reste incontournable. Si vous voulez une lecture plus large de la baie, Amont peut être le meilleur choix.",
    columns: [
      ["Vue emblématique", "Porte d'Aval + L'Aiguille", "Panorama complet d'Étretat"],
      ["Photo", "Très forte identité visuelle", "Superbe vue d'ensemble sur la baie"],
      ["Coucher du soleil", "Très bon", "Très bon selon la météo"],
      ["Marche", "Courte montée puis points de vue", "Accès facile à bon nombre de vues"],
      ["Idéal pour", "La carte postale d'Étretat", "Le panorama général"],
    ],
    notes: [
      "Choisissez Aval si c'est votre première visite.",
      "Choisissez Amont si vous voulez cadrer l'ensemble de la baie.",
      "Le meilleur scénario reste souvent de voir les deux, surtout en fin de journée.",
    ],
    cards: {
      avalTitle: "Falaise d'Aval",
      avalBody:
        "Porte d'Aval, L'Aiguille et la silhouette la plus recherchée dans Google. C'est le meilleur choix pour le visiteur qui veut comprendre immédiatement pourquoi Étretat est célèbre.",
      amontTitle: "Falaise d'Amont",
      amontBody:
        "Très intéressante pour lire la baie dans son ensemble, suivre la courbe du littoral et obtenir un point de vue plus large sur le front de mer.",
      tipTitle: "Conseil pratique",
      tipBody:
        "Si vous avez une demi-journée, commencez par la plage, continuez vers Aval pour la vue iconique, puis gardez Amont comme deuxième angle si la météo reste bonne.",
    },
    ctas: {
      home: "Retour au guide principal",
      trail: "Voir le sentier panoramique",
      photos: "Voir les photos",
    },
  },
  en: {
    title: "Falaise d'Amont or Falaise d'Aval: which one should you visit in Etretat?",
    description:
      "Compare Falaise d'Amont and Falaise d'Aval in Etretat for views, light, photography, walking effort and trip planning.",
    kicker: "Etretat comparison",
    intro:
      "In Etretat, Falaise d'Amont and Falaise d'Aval are close together but they answer slightly different visitor needs. If you want the classic view with Porte d'Aval and L'Aiguille, Aval is the essential stop. If you want a broader reading of the bay, Amont can be the better fit.",
    columns: [
      ["Best-known view", "Porte d'Aval + L'Aiguille", "Full Etretat bay panorama"],
      ["Photography", "Strong iconic framing", "Excellent overall bay view"],
      ["Sunset", "Very good", "Very good depending on conditions"],
      ["Walking", "Short climb then viewpoints", "Easy access to several viewpoints"],
      ["Best for", "The classic Etretat postcard", "The broader panorama"],
    ],
    notes: [
      "Choose Aval for a first visit.",
      "Choose Amont if you want the whole bay in frame.",
      "The best plan is often to see both, especially later in the day.",
    ],
    cards: {
      avalTitle: "Falaise d'Aval",
      avalBody:
        "This is where you get Porte d'Aval, L'Aiguille and the most recognizable Etretat silhouette. It is the best choice for first-time visitors who want the classic landmark view.",
      amontTitle: "Falaise d'Amont",
      amontBody:
        "A strong option for reading the whole bay, following the curve of the coastline and getting a broader look over the seafront.",
      tipTitle: "Practical tip",
      tipBody:
        "If you only have half a day, start from the beach, continue toward Aval for the iconic view, then keep Amont as your second angle if the weather stays clear.",
    },
    ctas: {
      home: "Back to the main guide",
      trail: "Open the panoramic trail guide",
      photos: "View the photo gallery",
    },
  },
} as const;

export default function AmontAvalPage() {
  const { i18n } = useTranslation();
  const locale = resolveSiteLanguage(i18n.language) === "en" ? "en" : "fr";
  const content = copy[locale];

  const schemas = [
    buildBreadcrumbSchema([
      { name: "Falaise d'Aval", path: "/" },
      { name: content.title, path: "/falaise-damont-ou-daval" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.title,
      description: content.description,
      url: buildAbsoluteUrl("/falaise-damont-ou-daval", "fr"),
      about: {
        "@type": "Place",
        name: "Étretat",
        url: SITE_URL,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={content.title}
        description={content.description}
        pagePath="/falaise-damont-ou-daval"
        type="article"
        schemas={schemas}
      />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <Button asChild variant="ghost" className="-ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Falaise d'Aval
          </Link>
        </Button>

        <Badge variant="secondary" className="mt-6 rounded-full">{content.kicker}</Badge>
        <h1 className="mt-4 text-4xl sm:text-5xl leading-tight">{content.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{content.intro}</p>

        <section className="mt-10 overflow-hidden rounded-3xl border">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-muted/30 text-sm font-medium">
            <div className="p-4">Critère</div>
            <div className="p-4">Falaise d'Aval</div>
            <div className="p-4">Falaise d'Amont</div>
          </div>
          {content.columns.map(([label, aval, amont]) => (
            <div key={label} className="grid grid-cols-[1.1fr_1fr_1fr] border-t text-sm">
              <div className="p-4 font-medium">{label}</div>
              <div className="p-4 text-muted-foreground">{aval}</div>
              <div className="p-4 text-muted-foreground">{amont}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Telescope className="h-4 w-4" />
              {content.cards.avalTitle}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{content.cards.avalBody}</p>
          </Card>

          <Card className="rounded-3xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Camera className="h-4 w-4" />
              {content.cards.amontTitle}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{content.cards.amontBody}</p>
          </Card>

          <Card className="rounded-3xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sunset className="h-4 w-4" />
              {content.cards.tipTitle}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{content.cards.tipBody}</p>
          </Card>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {content.notes.map((note) => (
            <Card key={note} className="rounded-3xl p-6">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Footprints className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{note}</span>
              </div>
            </Card>
          ))}
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">{content.ctas.home}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sentier-panoramique-falaise-daval">{content.ctas.trail}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/photos">{content.ctas.photos}</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
