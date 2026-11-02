import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'wouter';
import {SEOHead} from '@/components/SEOHead';
import {PRIVACY_KEY,readPrivacy,privacyCopy} from '@/lib/privacy';
import {resolveSiteLanguage} from '@/lib/site';
export default function CookieSettings(){
 const {i18n}=useTranslation();const c=privacyCopy[resolveSiteLanguage(i18n.language)];
 const [choices,setChoices]=useState(readPrivacy);
 return <main className="mx-auto max-w-3xl px-5 py-12"><SEOHead title={c.title} description={c.intro} pagePath="/cookie-settings"/><h1 className="text-4xl">{c.title}</h1><p className="mt-6">{c.intro}</p><p className="mt-4">{c.details}</p><form className="mt-8 space-y-5" onSubmit={e=>{e.preventDefault();localStorage.setItem(PRIVACY_KEY,JSON.stringify(choices));window.location.reload();}}>{(['ads','maps'] as const).map(key=><label className="flex gap-3" key={key}><input type="checkbox" checked={choices[key]} onChange={e=>setChoices({...choices,[key]:e.target.checked})}/>{c[key]}</label>)}<button className="rounded-xl border px-5 py-3" type="submit">{c.save}</button></form><Link className="mt-8 inline-block underline" href="/">{c.back}</Link></main>;
}
