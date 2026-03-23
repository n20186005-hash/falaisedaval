const fs = require('fs');
let content = fs.readFileSync('src/i18n.ts', 'utf8');
// Replace curly/smart double quotes within string keys and values with corner brackets
// so they don't interfere with JavaScript string parsing
// Left curly quote: U+201C, Right curly quote: U+201D
content = content.replace(/\u201C/g, '\u300C'); // 「
content = content.replace(/\u201D/g, '\u300D'); // 」
fs.writeFileSync('src/i18n.ts', content);
console.log('All curly quotes replaced with corner brackets');
