const fs = require('fs');
const content = fs.readFileSync('src/i18n.ts', 'utf8');
const lines = content.split('\n');
console.log('Line 28:');
// Print first 100 chars of line 28
const line28 = lines[27];
console.log('Length:', line28.length);
console.log('Chars around pos 25-40:');
for (let i = 20; i < 45; i++) {
  const ch = line28[i];
  console.log(' ', i, 'U+' + ch.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0'), ch === '"' ? '(ASCII DQ)' : ch === '\u300C' ? '(CORNER L)' : ch === '\u300D' ? '(CORNER R)' : ch);
}
