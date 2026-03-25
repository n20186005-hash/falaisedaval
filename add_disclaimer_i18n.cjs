const fs = require('fs');

const content = fs.readFileSync('src/i18n.ts', 'utf8');

const newTranslations = {
  fr: {
    "信息提取自公共资源": "Informations extraites de ressources publiques",
    "结合了诺曼底当地旅游局、维基百科以及谷歌地图的基本信息。": "Combine les informations de l'office de tourisme local de Normandie, de Wikipédia et les informations de base de Google Maps.",
    "免责声明（Disclaimer）": "Clause de non-responsabilité (Disclaimer)",
    "本网站是一个独立的第三方旅游资讯指南，旨在为游客提供客观的历史背景与游览建议，与 Falaise d'Aval 的官方管理机构无关。如需购买官方门票或获取官方通告，请访问官方渠道。": "Ce site web est un guide d'information touristique tiers indépendant, conçu pour fournir aux visiteurs un contexte historique objectif et des conseils de visite. Il n'est pas affilié à l'organisme de gestion officiel de la Falaise d'Aval. Pour acheter des billets officiels ou obtenir des annonces officielles, veuillez visiter les canaux officiels."
  },
  en: {
    "信息提取自公共资源": "Information extracted from public resources",
    "结合了诺曼底当地旅游局、维基百科以及谷歌地图的基本信息。": "Combines information from the local Normandy tourist office, Wikipedia, and basic information from Google Maps.",
    "免责声明（Disclaimer）": "Disclaimer",
    "本网站是一个独立的第三方旅游资讯指南，旨在为游客提供客观的历史背景与游览建议，与 Falaise d'Aval 的官方管理机构无关。如需购买官方门票或获取官方通告，请访问官方渠道。": "This website is an independent third-party tourist information guide, designed to provide visitors with objective historical background and visiting advice. It is not affiliated with the official management organization of Falaise d'Aval. To purchase official tickets or obtain official announcements, please visit the official channels."
  },
  "zh-Hant": {
    "信息提取自公共资源": "資訊提取自公共資源",
    "结合了诺曼底当地旅游局、维基百科以及谷歌地图的基本信息。": "結合了諾曼第當地旅遊局、維基百科以及谷歌地圖的基本資訊。",
    "免责声明（Disclaimer）": "免責聲明（Disclaimer）",
    "本网站是一个独立的第三方旅游资讯指南，旨在为游客提供客观的历史背景与游览建议，与 Falaise d'Aval 的官方管理机构无关。如需购买官方门票或获取官方通告，请访问官方渠道。": "本網站是一個獨立的第三方旅遊資訊指南，旨在為遊客提供客觀的歷史背景與遊覽建議，與 Falaise d'Aval 的官方管理機構無關。如需購買官方門票或獲取官方通告，請訪問官方渠道。"
  },
  de: {
    "信息提取自公共资源": "Informationen aus öffentlichen Quellen entnommen",
    "结合了诺曼底当地旅游局、维基百科以及谷歌地图的基本信息。": "Kombiniert Informationen des lokalen Tourismusbüros der Normandie, Wikipedia und grundlegende Informationen von Google Maps.",
    "免责声明（Disclaimer）": "Haftungsausschluss (Disclaimer)",
    "本网站是一个独立的第三方旅游资讯指南，旨在为游客提供客观的历史背景与游览建议，与 Falaise d'Aval 的官方管理机构无关。如需购买官方门票或获取官方通告，请访问官方渠道。": "Diese Website ist ein unabhängiger touristischer Informationsführer von Drittanbietern, der Besuchern objektive historische Hintergründe und Besuchsempfehlungen bieten soll. Sie ist nicht mit der offiziellen Verwaltungsorganisation der Falaise d'Aval verbunden. Um offizielle Tickets zu kaufen oder offizielle Ankündigungen zu erhalten, besuchen Sie bitte die offiziellen Kanäle."
  }
};

let updatedContent = content;

// Function to extract the section for a specific language
function getSection(lang) {
  const marker = new RegExp(`(${lang}:\\s*{\\s*translation:\\s*{)([\\s\\S]*?)(^\\s*})`, 'm');
  const match = updatedContent.match(marker);
  return match ? match[2] : '';
}

function inject(lang, trans) {
  const marker = new RegExp(`(${lang}:\\s*{\\s*translation:\\s*{)`);
  const section = getSection(lang);
  
  if (marker.test(updatedContent)) {
    const insertStr = Object.entries(trans)
      .filter(([k]) => !section.includes(`"${k}":`)) // Only add if not exists in this section
      .map(([k, v]) => `      "${k}": "${v}",`)
      .join('\n');
      
    if (insertStr) {
      updatedContent = updatedContent.replace(marker, `$1\n${insertStr}`);
    }
  }
}

inject('fr', newTranslations.fr);
inject('en', newTranslations.en);
inject('"zh-Hant"', newTranslations["zh-Hant"]);
inject('de', newTranslations.de);

fs.writeFileSync('src/i18n.ts', updatedContent, 'utf8');
console.log('Added disclaimer and sources translations to all languages');
