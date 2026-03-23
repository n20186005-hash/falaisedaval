const fs = require('fs');

const home = fs.readFileSync('src/pages/Home.tsx', 'utf8');
const i18n = fs.readFileSync('src/i18n.ts', 'utf8');

const keyMatches = home.match(/t\("([^"]+)"/g) || [];
const usedKeys = [...new Set(keyMatches.map(k => k.replace('t("', '')))];

const languages = ['fr', 'en', '"zh-Hant"', 'de'];

for (const lang of languages) {
  const langMatch = i18n.match(new RegExp(`${lang}:\\s*{\\s*translation:\\s*{([\\s\\S]*?)^\\s*}`, 'm'));
  if (!langMatch) {
    console.log(`Could not find section for ${lang}`);
    continue;
  }
  const content = langMatch[1];
  const keys = [];
  const keyRegex = /"([^"]+)":/g;
  let m;
  while ((m = keyRegex.exec(content)) !== null) {
    keys.push(m[1]);
  }
  
  const missing = usedKeys.filter(k => !keys.includes(k));
  console.log(`\nMissing in ${lang}: ${missing.length}`);
  if (missing.length > 0) {
    missing.forEach(k => console.log(`  - "${k}"`));
  }
}
