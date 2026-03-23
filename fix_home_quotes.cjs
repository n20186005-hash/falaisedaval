const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');
// Replace curly double quotes with corner brackets
content = content.replace(/\u201C/g, '\u300C');
content = content.replace(/\u201D/g, '\u300D');
fs.writeFileSync('src/pages/Home.tsx', content);
console.log('Fixed Home.tsx curly quotes');
