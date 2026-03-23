const fs = require('fs');

// Read Home.tsx and extract all t("...") keys
const home = fs.readFileSync('src/pages/Home.tsx', 'utf8');
const keyMatches = home.match(/t\("([^"]+)"/g) || [];
const usedKeys = keyMatches.map(k => k.replace('t("', ''));

// Read i18n.ts
const i18n = fs.readFileSync('src/i18n.ts', 'utf8');

// Find zh-Hant section
const zhHantMatch = i18n.match(/zh-Hant[\s\S]*?translation[\s\S]*?\{([\s\S]*?)\n  \}[\s\S]*?\}\n/);
if (!zhHantMatch) {
  console.log('Could not find zh-Hant section');
  process.exit(1);
}
const zhHantContent = zhHantMatch[1];

// Extract all keys in zh-Hant
const zhHantKeys = [];
const keyRegex = /"([^"]+)":\s*"/g;
let m;
while ((m = keyRegex.exec(zhHantContent)) !== null) {
  zhHantKeys.push(m[1]);
}

// Check which keys are missing from zh-Hant
const missing = [];
for (const key of usedKeys) {
  if (!zhHantKeys.includes(key)) {
    missing.push(key);
  }
}

console.log('Missing zh-Hant translations:', missing.length);
missing.forEach(k => console.log('  -', k));

// Also check fr
const frMatch = i18n.match(/fr:\s*translation:\s*\{([\s\S]*?)\n  \},\n/);
if (!frMatch) {
  console.log('Could not find fr section');
  process.exit(1);
}
const frContent = frMatch[1];
const frKeys = [];
const frRegex = /"([^"]+)":\s*"/g;
while ((m = frRegex.exec(frContent)) !== null) {
  frKeys.push(m[1]);
}

const missingFr = [];
for (const key of usedKeys) {
  if (!frKeys.includes(key)) {
    missingFr.push(key);
  }
}
console.log('\nMissing fr translations:', missingFr.length);
missingFr.forEach(k => console.log('  -', k));
