const fs = require('fs');

const content = fs.readFileSync('src/i18n.ts', 'utf8');

const newTranslations = {
  fr: {
    "Étretat, 法国": "Étretat, France",
    "P54V+WC Étretat, 法国": "P54V+WC Étretat, France",
    "快速计划": "Plan rapide",
    "安全": "Sécurité",
    "地形": "Terrain",
    "对比": "Comparaison",
    "评价": "Avis"
  },
  en: {
    "Étretat, 法国": "Étretat, France",
    "P54V+WC Étretat, 法国": "P54V+WC Étretat, France",
    "快速计划": "Quick plan",
    "安全": "Safety",
    "地形": "Footing",
    "对比": "Comparison",
    "评价": "Reviews"
  },
  "zh-Hant": {
    "Étretat, 法国": "Étretat, 法國",
    "P54V+WC Étretat, 法国": "P54V+WC Étretat, 法國",
    "快速计划": "快速計劃",
    "安全": "安全",
    "地形": "地形",
    "对比": "對比",
    "评价": "評價"
  },
  de: {
    "Étretat, 法国": "Étretat, Frankreich",
    "P54V+WC Étretat, 法国": "P54V+WC Étretat, Frankreich",
    "快速计划": "Schneller Plan",
    "安全": "Sicherheit",
    "地形": "Bodenbeschaffenheit",
    "对比": "Vergleich",
    "评价": "Bewertungen"
  }
};

let updatedContent = content;

function inject(lang, trans) {
  const marker = new RegExp(`(${lang}:\\s*{\\s*translation:\\s*{)`);
  const match = updatedContent.match(marker);
  if (match) {
    const insertStr = Object.entries(trans)
      .map(([k, v]) => `      "${k}": "${v}",`)
      .join('\n') + '\n';
    updatedContent = updatedContent.replace(marker, `$1\n${insertStr}`);
  }
}

inject('fr', newTranslations.fr);
inject('en', newTranslations.en);
inject('"zh-Hant"', newTranslations["zh-Hant"]);
inject('de', newTranslations.de);

fs.writeFileSync('src/i18n.ts', updatedContent, 'utf8');
console.log('Added new translations');
