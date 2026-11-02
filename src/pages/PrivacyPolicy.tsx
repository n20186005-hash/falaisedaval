import {useTranslation} from 'react-i18next';
import {Link} from 'wouter';
import {SEOHead} from '@/components/SEOHead';
import {privacyCopy} from '@/lib/privacy';
import {resolveSiteLanguage} from '@/lib/site';
export default function PrivacyPolicy(){
 const {i18n}=useTranslation();const c=privacyCopy[resolveSiteLanguage(i18n.language)];
 return <main className="mx-auto max-w-3xl px-5 py-12"><SEOHead title={c.title} description={c.intro} pagePath="/privacy-policy"/><h1 className="text-4xl">{c.title}</h1><p className="mt-6">{c.intro}</p><p className="mt-4">{c.details}</p><p className="mt-4">{c.policy} <a href="mailto:claritleonelmnicol@gmail.com">claritleonelmnicol@gmail.com</a></p><p className="mt-6"><a className="underline" href="https://policies.google.com/privacy">Google — Privacy Policy</a></p><Link className="mt-6 inline-block underline" href="/cookie-settings">{c.title}</Link><p className="mt-6"><Link href="/">{c.back}</Link></p></main>;
}
