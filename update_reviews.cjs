const fs = require('fs');

const translations = {
  fr: {
    "评价 - 游客怎么说": "Évaluation - Ce que disent les visiteurs",
    "条评价": "avis",
    "评分与评论数据来源于 Google Maps（最后更新：2026 年）。我们仅展示部分经核实的高分评价。如需查看完整最新评论，请点击下方链接。": "Les notes et les avis proviennent de Google Maps (Dernière mise à jour : 2026). Nous ne présentons qu'une sélection d'avis positifs vérifiés. Pour voir tous les avis récents, cliquez sur le lien ci-dessous."
  },
  en: {
    "评价 - 游客怎么说": "Reviews - What visitors say",
    "条评价": "reviews",
    "评分与评论数据来源于 Google Maps（最后更新：2026 年）。我们仅展示部分经核实的高分评价。如需查看完整最新评论，请点击下方链接。": "Rating and review data are from Google Maps (Last updated: 2026). We only display a selection of verified high-score reviews. For full latest reviews, please click the link below."
  },
  "zh-Hant": {
    "评价 - 游客怎么说": "評價 - 遊客怎麼說",
    "条评价": "條評價",
    "评分与评论数据来源于 Google Maps（最后更新：2026 年）。我们仅展示部分经核实的高分评价。如需查看完整最新评论，请点击下方链接。": "評分與評論數據來源於 Google Maps（最後更新：2026 年）。我們僅展示部分經核實的高分評價。如需查看完整最新評論，請點擊下方鏈接。"
  },
  de: {
    "评价 - 游客怎么说": "Bewertungen - Was Besucher sagen",
    "条评价": "Bewertungen",
    "评分与评论数据来源于 Google Maps（最后更新：2026 年）。我们仅展示部分经核实的高分评价。如需查看完整最新评论，请点击下方链接。": "Bewertungen und Rezensionsdaten stammen von Google Maps (Letztes Update: 2026). Wir zeigen nur eine Auswahl verifizierter High-Score-Bewertungen. Um alle aktuellen Bewertungen zu sehen, klicken Sie bitte auf den untenstehenden Link."
  }
};

let content = fs.readFileSync('src/i18n.ts', 'utf8');

for (const lng in translations) {
  let toInsert = '';
  for (const [key, val] of Object.entries(translations[lng])) {
    const safeKey = key.replace(/"/g, '\\"');
    const safeVal = val.replace(/"/g, '\\"');
    if (!content.includes('"' + safeKey + '"')) {
      toInsert += '      "' + safeKey + '": "' + safeVal + '",\n';
    }
  }
  if (toInsert) {
    const targetCount = lng === 'fr' ? 1 : lng === 'en' ? 2 : lng === 'zh-Hant' ? 3 : 4;
    let matchCount = 0;
    content = content.replace(/([ \t]*"隐私政策")/g, (match, p1) => {
      matchCount++;
      if (matchCount === targetCount) {
        return toInsert + p1;
      }
      return match;
    });
  }
}

fs.writeFileSync('src/i18n.ts', content, 'utf8');
console.log('Translations added.');
