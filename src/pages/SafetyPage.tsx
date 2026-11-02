import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { buildLocalizedPath, languageConfig, resolveSiteLanguage, type SiteLanguage } from "@/lib/site";
import copy from "@/lib/safety-content.json";

export const SAFETY_PATH = "/acces-securite-falaise-daval";
export function SafetyLink() {
  const { i18n } = useTranslation();
  const lang = resolveSiteLanguage(i18n.language);
  return <Link className="inline-block rounded-xl border px-4 py-3 font-medium underline underline-offset-4" href={buildLocalizedPath(SAFETY_PATH, lang)}>{copy[lang].label}</Link>;
}
export default function SafetyPage() {
  const { i18n } = useTranslation();
  const lang = resolveSiteLanguage(i18n.language);
  const content = copy[lang];
  return <main className="mx-auto max-w-4xl px-5 py-10 sm:py-16">
    <SEOHead title={content.title} description={content.description} pagePath={SAFETY_PATH} />
    <nav className="flex flex-wrap gap-4" aria-label="Language">{(Object.keys(languageConfig) as SiteLanguage[]).map(l => <a key={l} href={buildLocalizedPath(SAFETY_PATH, l)} hrefLang={languageConfig[l].htmlLang} aria-current={l === lang ? "page" : undefined}>{languageConfig[l].label}</a>)}</nav>
    <h1 className="mt-8 text-4xl leading-tight sm:text-5xl">{content.title}</h1>
    <p className="mt-4 text-sm text-muted-foreground">{content.updated}</p>
    <p className="mt-6 rounded-2xl border bg-card p-6 text-lg">{content.intro}</p>
    {content.sections.map(([title, body]) => <section className="mt-9" key={title}><h2 className="text-2xl">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{body}</p></section>)}
    <section className="mt-10 rounded-2xl border p-6"><h2 className="text-2xl">{content.sources}</h2><ul className="mt-4 space-y-3 underline">
      <li><a href="https://www.normandie-tourisme.fr/les-incontournables/etretat/a-visiter-a-faire-a-etretat/">Normandie Tourisme — accès et réglementation</a></li>
      <li><a href="https://www.lehavre-etretat-tourisme.com/decouvrir/les-incontournables/decouvrir-etretat/les-falaises-detretat/">Le Havre Étretat Normandie Tourisme — les falaises</a></li>
      <li><a href="https://www.lehavre-etretat-tourisme.com/uploads/2023/02/Dpt-76-Etretat-installation-equipements-temporaires.pdf">Département de Seine-Maritime — équipements de sécurité (2023, PDF)</a></li>
    </ul></section>
    <nav className="mt-10 flex flex-wrap gap-5 underline"><Link href={buildLocalizedPath("/",lang)}>{content.home}</Link><Link href={buildLocalizedPath("/sentier-panoramique-falaise-daval",lang)}>{content.trail}</Link></nav>
  </main>;
}
