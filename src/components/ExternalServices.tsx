import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import {readPrivacy,privacyCopy} from '@/lib/privacy';
import {resolveSiteLanguage} from '@/lib/site';
export function Advertising(){
 useEffect(()=>{if(!readPrivacy().ads)return;const s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9279583389810634';document.head.appendChild(s);return ()=>s.remove();},[]);
 return null;
}
export function MapConsent({children}:{children:React.ReactNode}){
 const [allowed]=useState(()=>readPrivacy().maps);const {i18n}=useTranslation();const c=privacyCopy[resolveSiteLanguage(i18n.language)];
 return allowed?<>{children}</>:<div className="p-8"><p>{c.intro}</p><Link className="mt-4 inline-block underline" href="/cookie-settings">{c.title}</Link></div>;
}
