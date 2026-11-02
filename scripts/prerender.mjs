import {createServer} from 'vite';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try {
 const {render}=await server.ssrLoadModule('/src/entry-server.tsx');
 const template=await fs.readFile('dist/index.html','utf8');
 // Vite's SSR loader returns development asset URLs. Resolve those by content
 // against the emitted build, including the same URLs in preload and OG tags.
 const digest = bytes => createHash('sha256').update(bytes).digest('hex');
 const emitted = new Map();
 for (const file of await fs.readdir('dist/assets')) {
  emitted.set(digest(await fs.readFile(`dist/assets/${file}`)), `/assets/${file}`);
 }
 const assetMap = new Map();
 for (const file of await fs.readdir('src/assets/photos')) {
  const output = emitted.get(digest(await fs.readFile(`src/assets/photos/${file}`)));
  if (!output) throw new Error(`Missing emitted image: ${file}`);
  assetMap.set(`/src/assets/photos/${file}`, output);
 }
 const resolveAssets = html => {
  for (const [source, output] of assetMap) html = html.replaceAll(source, output);
  if (html.includes('/src/assets/')) throw new Error('Unresolved SSR asset URL');
  return html;
 };
 const generated = [];
 const paths=['/','/photos','/sentier-panoramique-falaise-daval','/falaise-damont-ou-daval','/acces-securite-falaise-daval','/privacy-policy','/terms-of-service','/cookie-settings','/overview','/tips','/map','/reviews','/sources','/comparison'];
 for(const [lang,prefix] of [['fr',''],['en','/en'],['de','/de'],['zh-Hant','/zh-hant']]) for(const path of paths){
  const {body,head}=await render(path,lang);
  const target=`dist${prefix}${path==='/'?'':path}`;
  await fs.mkdir(target,{recursive:true});
  const html=resolveAssets(template.replace('<html lang="fr">',`<html lang="${lang}">`).replace(/<title>[\s\S]*?<\/title>/,'').replace(/<meta name="description"[^>]*>/,'').replace('</head>',`${head}</head>`).replace('<div id="root"></div>',`<div id="root">${body}</div>`));
  await fs.writeFile(`${target}/index.html`,html);
  generated.push({file:`${target}/index.html`,html});
 }
 const notFound=template.replace('<div id="root"></div>','<main><h1>404 — Page introuvable / Page not found</h1><a href="/">Falaise d’Aval</a></main>').replace(/<script type="module"[^>]*><\/script>/,'').replace('</head>','<meta name="robots" content="noindex"></head>');
 await fs.writeFile('dist/404.html',notFound);
 generated.push({file:'dist/404.html',html:notFound});
 let checked = 0;
 for (const {file,html} of generated) {
  // Check every local src/href (including all image and preload URLs).
  for (const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
   const url = match[1].replace('https://www.falaisedaval.com', '');
   if (!url.startsWith('/assets/')) continue;
   await fs.access(`dist${url}`).catch(() => {throw new Error(`Missing asset in ${file}: ${url}`);});
   checked++;
  }
 }
 console.log(`Validated ${checked} local asset references in ${generated.length} HTML files`);
 console.log('Prerendered 56 localized pages (including 24 legacy section routes) and 404.html');
}finally{await server.close();}
