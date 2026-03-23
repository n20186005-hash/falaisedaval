const fs = require('fs');
let content = fs.readFileSync('src/i18n.ts', 'utf8');
// Fix: replace the wrongly inserted escaped quotes with book corner brackets
content = content.replace(/\\"/g, '\u300C'); // 「
fs.writeFileSync('src/i18n.ts', content);
console.log('Fixed escaped quotes');
