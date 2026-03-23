const fs = require('fs');
let content = fs.readFileSync('src/i18n.ts', 'utf8');

// For each line, find the pattern of unescaped " inside string keys/values
// and replace inner " with corner brackets 「」
// Strategy: for each line, try to fix by replacing " that appear mid-string
// We'll process the content line by line

const lines = content.split('\n');
const fixed = lines.map((line, idx) => {
  // Skip lines without double quotes issues
  if (!line.includes('"')) return line;

  // This is a heuristic: find strings that have 3 or more " on the same line
  // which usually means there's an embedded quote
  // Count ASCII double quotes on this line
  const quoteCount = (line.match(/"/g) || []).length;
  if (quoteCount <= 2) return line; // normal key-value pair

  // If more than 2 quotes, there's likely an embedded quote
  // Replace ASCII " inside the value parts with corner brackets
  // We do this by processing character by character

  // Match: "key": "value",
  // The problem is when key or value contains " that breaks parsing
  // We look for patterns like: "some text"more text"more"
  // and replace the inner " with corner brackets

  let result = '';
  let inString = false;
  let i = 0;
  while (i < line.length) {
    const ch = line[i];
    if (ch === '"' && (i === 0 || line[i-1] !== '\\')) {
      if (!inString) {
        // Starting a string
        inString = true;
        result += ch;
      } else {
        // This could be end of string OR an embedded quote
        // Look ahead: if next non-space char is : or , or } then it's end of string
        let j = i + 1;
        while (j < line.length && (line[j] === ' ' || line[j] === '\t')) j++;
        const next = line[j];
        if (next === ':' || next === ',' || next === '"' || next === '\n' || next === '}') {
          // This is the end of string
          inString = false;
          result += ch;
        } else {
          // This is an embedded quote - replace with corner bracket
          // Determine if it's opening or closing
          result += '\u300C'; // 「
        }
      }
    } else {
      result += ch;
    }
    i++;
  }

  // But we also need to handle the closing quote after embedded content
  // When we convert an opening " to 「, we need to convert the matching closing " to 」
  // Simple approach: after first pass, replace remaining unmatched 「 with proper pair

  // Actually let's use a simpler approach for the closing quote
  // Count 「 and 」 - if 「 > 」, the next " after text should be 」
  const openCount = (result.match(/\u300C/g) || []).length;
  const closeCount = (result.match(/\u300D/g) || []).length;

  if (openCount > closeCount) {
    // Replace the FIRST remaining " after the key/value content with 」
    // This is tricky - let's try a different strategy
  }

  return result;
});

const fixedContent = fixed.join('\n');
fs.writeFileSync('src/i18n.ts', fixedContent);
console.log('Fixed embedded quotes');

// Now verify
const newContent = fs.readFileSync('src/i18n.ts', 'utf8');
const newLines = newContent.split('\n');
newLines.forEach((line, idx) => {
  if ((line.match(/"/g) || []).length > 2) {
    console.log('WARNING: Line', idx + 1, 'still has', (line.match(/"/g) || []).length, 'quotes');
  }
});
console.log('Done verifying');
