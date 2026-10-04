import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Camera, Image as ImageIcon } from "lucide-react";
import g1 from "@/assets/photos/gallery-01.jpg";
import g2 from "@/assets/photos/gallery-02.jpg";
import g3 from "@/assets/photos/gallery-03.jpg";
import g4 from "@/assets/photos/gallery-04.jpg";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildAbsoluteUrl, buildBreadcrumbSchema, resolveSiteLanguage, SITE_URL } from "@/lib/site";

const gallery = [
  {
    src: g1,
    width: 3000,
    height: 2000,
    alt: "Porte d'Aval et l'Aiguille à Étretat",
    caption: "Porte d'Aval et L'Aiguille vues sous une lumière plus douce.",
  },
  {
    src: g2,
    width: 3000,
    height: 2250,
    alt: "Vue de la Falaise d'Aval depuis la plage d'Étretat",
    caption: "Vue depuis la plage avec la mer, les galets et l'arche.",
  },
  {
    src: g3,
    width: 3000,
    height: 2000,
    alt: "Photo de la Falaise d'Aval au crépuscule",
    caption: "Couleurs plus calmes sur les falaises et le littoral à marée basse.",
  },
  {
    src: g4,
    width: 3000,
    height: 4500,
    alt: "Sentier panoramique de la Falaise d'Aval à Étretat",
    caption: "Vue en hauteur depuis le sentier panoramique vers la baie.",
  },
];

const copy = {
  fr: {
    title: "Photos de la Falaise d'Aval à Étretat : Porte d'Aval et Aiguille",
    description:
      "Découvrez des photos de la Falaise d'Aval à Étretat avec la Porte d'Aval, L'Aiguille, le sentier panoramique et différentes lumières sur les falaises.",
    kicker: "Galerie photo",
    intro:
      "Cette galerie photo met en avant la Falaise d'Aval, la Porte d'Aval et L'Aiguille depuis plusieurs angles utiles pour préparer une visite, choisir une heure de lumière ou repérer un point de vue.",
    trail: "Voir le sentier panoramique",
  },
  en: {
    title: "Photos of Falaise d'Aval in Etretat: Porte d'Aval and the Needle",
    description:
      "Browse photos of Falaise d'Aval in Etretat featuring Porte d'Aval, L'Aiguille, the panoramic trail and different light conditions on the cliffs.",
    kicker: "Photo gallery",
    intro:
      "This gallery highlights Falaise d'Aval, Porte d'Aval and L'Aiguille from several angles that help visitors plan viewpoints, choose the best light and understand the landscape before arriving.",
    trail: "Open the panoramic trail guide",
  },
} as const;

export default function PhotosPage() {
  const { i18n } = useTranslation();
  const locale = resolveSiteLanguage(i18n.language) === "en" ? "en" : "fr";
  const content = copy[locale];

  const schemas = [
    buildBreadcrumbSchema([
      { name: "Falaise d'Aval", path: "/" },
      { name: "Photos", path: "/photos" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: content.title,
      description: content.description,
      url: buildAbsoluteUrl("/photos", "fr"),
      hasPart: gallery.map((image) => ({
        "@type": "ImageObject",
        contentUrl: new URL(image.src, SITE_URL).toString(),
        caption: image.caption,
        description: image.alt,
        width: image.width,
        height: image.height,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={content.title}
        description={content.description}
        pagePath="/photos"
        type="article"
        image={new URL(g1, SITE_URL).toString()}
        schemas={schemas}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <Button asChild variant="ghost" className="-ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Falaise d'Aval
          </Link>
        </Button>

        <Badge variant="secondary" className="mt-6 rounded-full">{content.kicker}</Badge>
        <h1 className="mt-4 text-4xl sm:text-5xl leading-tight">{content.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{content.intro}</p>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {gallery.map((image) => (
            <Card key={image.alt} className="overflow-hidden rounded-3xl">
              <figure>
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-[320px] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="p-5">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ImageIcon className="h-4 w-4" />
                    {image.alt}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{image.caption}</p>
                </figcaption>
              </figure>
            </Card>
          ))}
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/sentier-panoramique-falaise-daval">{content.trail}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/falaise-damont-ou-daval">Falaise d'Amont ou d'Aval</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Camera className="mr-2 h-4 w-4" />
              Falaise d'Aval
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
