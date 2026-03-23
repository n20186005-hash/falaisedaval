const fs = require('fs');
let content = fs.readFileSync('src/i18n.ts', 'utf8');
// Replace curly left/right double quotes with Chinese book quotes or single quotes
// so they don't interfere with JavaScript string parsing
content = content.replace(/\u201C/g, '\u300C'); // 「 (Chinese left corner bracket)
content = content.replace(/\u201D/g, '\u300D'); // 」 (Chinese right corner bracket)
fs.writeFileSync('src/i18n.ts', content);
console.log('Fixed curly quotes');
