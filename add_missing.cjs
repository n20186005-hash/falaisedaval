const fs = require('fs');

const newTranslations = {
  fr: {
    "海滩严禁捡鹅卵石（有罚款）；悬崖下部分区域因落石风险，有官方禁入标志。": "Il est interdit de ramasser les galets sur la plage (amende) ; certaines zones au pied des falaises sont interdites en raison du risque de chutes de pierres.",
    "从海滩走到 Porte d'Aval 拱门，必须在低潮前后 4 小时内完成往返，避免涨潮被困。": "Pour se rendre de la plage à l'arche de la Porte d'Aval, vous devez faire l'aller-retour dans les 4 heures autour de la marée basse, afin d'éviter d'être piégé par la marée montante.",
    "若想同时打卡两者，建议先在海滩看全景，再沿步道上 Falaise d'Aval 的观景台拍日落。": "Si vous souhaitez visiter les deux, il est recommandé de d'abord admirer le panorama depuis la plage, puis de monter sur la plateforme d'observation de la Falaise d'Aval pour photographier le coucher du soleil.",
    "只在低潮窗口进入": "n'entrez que pendant la fenêtre de marée basse",
    "，并预留至少 1 小时回撤。": ", et prévoyez au moins 1 heure de marge pour le retour."
  },
  en: {
    "海滩严禁捡鹅卵石（有罚款）；悬崖下部分区域因落石风险，有官方禁入标志。": "Pebble collecting is strictly prohibited on the beach (fine applies); some areas at the base of the cliffs are officially off-limits due to rockfall risk.",
    "从海滩走到 Porte d'Aval 拱门，必须在低潮前后 4 小时内完成往返，避免涨潮被困。": "To walk from the beach to the Porte d'Aval arch, you must complete the round trip within 4 hours around low tide to avoid being trapped by rising tides.",
    "若想同时打卡两者，建议先在海滩看全景，再沿步道上 Falaise d'Aval 的观景台拍日落。": "If you want to visit both, it's recommended to first enjoy the panoramic view from the beach, then hike up to the Falaise d'Aval viewpoint to photograph the sunset.",
    "只在低潮窗口进入": "only enter during the low tide window",
    "，并预留至少 1 小时回撤。": ", and leave at least 1 hour margin for retreat."
  },
  "zh-Hant": {
    "海滩严禁捡鹅卵石（有罚款）；悬崖下部分区域因落石风险，有官方禁入标志。": "海灘嚴禁撿鵝卵石（有罰款）；懸崖下部分區域因落石風險，有官方禁入標誌。",
    "从海滩走到 Porte d'Aval 拱门，必须在低潮前后 4 小时内完成往返，避免涨潮被困。": "從海灘走到 Porte d'Aval 拱門，必須在低潮前後 4 小時內完成往返，避免漲潮被困。",
    "若想同时打卡两者，建议先在海滩看全景，再沿步道上 Falaise d'Aval 的观景台拍日落。": "若想同時打卡兩者，建議先在海灘看全景，再沿步道上 Falaise d'Aval 的觀景台拍日落。",
    "只在低潮窗口进入": "只在低潮窗口進入",
    "，并预留至少 1 小时回撤。": "，並預留至少 1 小時回撤。"
  },
  de: {
    "海滩严禁捡鹅卵石（有罚款）；悬崖下部分区域因落石风险，有官方禁入标志。": "Das Sammeln von Kieseln ist am Strand streng verboten (Geldstrafe); einige Bereiche am Fuß der Klippen sind aufgrund von Steinschlaggefahr offiziell gesperrt.",
    "从海滩走到 Porte d'Aval 拱门，必须在低潮前后 4 小时内完成往返，避免涨潮被困。": "Um von der Strand zur Porte d'Aval-Bogen zu gelangen, müssen Sie die Hin- und Rückfahrt innerhalb von 4 Stunden um die Ebbe herum absolvieren, um nicht von der Flut eingeschlossen zu werden.",
    "若想同时打卡两者，建议先在海滩看全景，再沿步道上 Falaise d'Aval 的观景台拍日落。": "Wenn Sie beide besuchen möchten, empfiehlt es sich, zuerst die Panoramansicht vom Strand zu genießen und dann den Wanderweg zur Aussichtsplattform der Falaise d'Aval hinaufzusteigen, um den Sonnenuntergang zu fotografieren.",
    "只在低潮窗口进入": "nur während des Ebbefensters betreten",
    "，并预留至少 1 小时回撤。": ", und预留 mindestens 1 Stunde für den Rückzug einplanen."
  }
};

let content = fs.readFileSync('src/i18n.ts', 'utf8');

for (const lng in newTranslations) {
  let toInsert = '';
  for (const [key, val] of Object.entries(newTranslations[lng])) {
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
console.log('Missing translations added.');
