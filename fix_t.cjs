const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace {t(t("xxx"))} with {t("xxx")}
content = content.replace(/\{t\(t\("(.*?)"\)\)\}/g, '{t("$1")}');
content = content.replace(/t\(t\("(.*?)"\)\)/g, 't("$1")');

// Fix the specific broken one: {t("{t("，并预留至少 1 小时回撤。")}")}
content = content.replace(/\{t\("\{t\("，并预留至少 1 小时回撤。"\)\}"\)\}/g, '{t("，并预留至少 1 小时回撤。")}');

fs.writeFileSync('src/pages/Home.tsx', content, 'utf8');
console.log('Fixed double t()');
