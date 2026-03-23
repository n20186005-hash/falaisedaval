const fs = require('fs');
let content = fs.readFileSync('src/i18n.ts', 'utf8');
// Replace curly double quotes with escaped versions so Babel parser doesn't break
content = content.replace(/[\u201C\u201D]/g, function(m) {
  return '\\"';
});
fs.writeFileSync('src/i18n.ts', content);
console.log('Fixed curly quotes');
