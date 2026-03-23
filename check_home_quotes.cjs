const fs = require('fs');
const content = fs.readFileSync('src/pages/Home.tsx', 'utf8');
const regex = /[\u201C\u201D]/g;
const matches = content.match(regex);
if (matches) {
  console.log('Found curly quotes in Home.tsx:', matches.length);
  // Find lines with curly quotes
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (regex.test(line)) {
      console.log('Line', idx + 1, ':', line.trim().substring(0, 80));
    }
    regex.lastIndex = 0;
  });
} else {
  console.log('No curly quotes in Home.tsx');
}
