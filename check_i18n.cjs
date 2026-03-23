const fs = require('fs');
const content = fs.readFileSync('src/i18n.ts', 'utf8');
const lines = content.split('\n');
// Find lines containing curly quotes (even escaped ones)
lines.forEach((line, idx) => {
  if (line.includes('\u201C') || line.includes('\u201D') || line.includes('\\"')) {
    console.log('Line', idx + 1, ':', JSON.stringify(line.substring(0, 80)));
  }
});
// Also check line 28 specifically
console.log('\nLine 28 raw:');
console.log(JSON.stringify(lines[27]));
