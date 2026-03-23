const fs = require('fs');

const content = fs.readFileSync('src/i18n.ts', 'utf8');

const newTranslations = {
  fr: {
    "Porte d'Aval / Étretat": "Porte d'Aval / Étretat",
    "Porte d'Aval": "Porte d'Aval",
    "L'Aiguille": "L'Aiguille",
    "Plus Code": "Plus Code",
    "Étretat · Côte d'Albâtre": "Étretat · Côte d'Albâtre"
  },
  en: {
    "Porte d'Aval / Étretat": "Porte d'Aval / Étretat",
    "Porte d'Aval": "Porte d'Aval",
    "L'Aiguille": "L'Aiguille",
    "Plus Code": "Plus Code",
    "Étretat · Côte d'Albâtre": "Étretat · Alabaster Coast"
  },
  "zh-Hant": {
    "Porte d'Aval / Étretat": "Porte d'Aval / Étretat",
    "Porte d'Aval": "Porte d'Aval",
    "L'Aiguille": "L'Aiguille",
    "Plus Code": "Plus Code",
    "Étretat · Côte d'Albâtre": "Étretat · 白堊海岸"
  },
  de: {
    "Porte d'Aval / Étretat": "Porte d'Aval / Étretat",
    "Porte d'Aval": "Porte d'Aval",
    "L'Aiguille": "L'Aiguille",
    "Plus Code": "Plus Code",
    "Étretat · Côte d'Albâtre": "Étretat · Alabasterküste"
  }
};

let updatedContent = content;

function inject(lang, trans) {
  const marker = new RegExp(`(${lang}:\\s*{\\s*translation:\\s*{)`);
  const match = updatedContent.match(marker);
  if (match) {
    const insertStr = Object.entries(trans)
      .filter(([k]) => !updatedContent.includes(`"${k}":`)) // Only add if not exists
      .map(([k, v]) => `      "${k}": "${v}",`)
      .join('\n');
    if (insertStr) {
      updatedContent = updatedContent.replace(marker, `$1\n${insertStr}\n`);
    }
  }
}

inject('fr', newTranslations.fr);
inject('en', newTranslations.en);
inject('"zh-Hant"', newTranslations["zh-Hant"]);
inject('de', newTranslations.de);

fs.writeFileSync('src/i18n.ts', updatedContent, 'utf8');
console.log('Added more new translations');
