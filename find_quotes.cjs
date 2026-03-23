const fs = require('fs');
const content = fs.readFileSync('src/i18n.ts', 'utf8');
const regex = /"[^"]*[\u201C\u201D][^"]*":/g;
const matches = content.match(regex);
if (matches) {
  console.log('Found keys with curly quotes:');
  matches.forEach(m => console.log(m));
} else {
  console.log('No curly quotes found in keys');
}
