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
console.log('Added missing translations to all languages properly');
