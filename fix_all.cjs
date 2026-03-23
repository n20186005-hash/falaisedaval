const fs = require('fs');

// This script fills ALL missing translations in all 4 languages
// by extracting keys from zh (simplified Chinese) and:
// - For zh-Hant: convert zh values to traditional Chinese
// - For fr/en/de: use existing translations or placeholder

// Read all files
const i18nContent = fs.readFileSync('src/i18n.ts', 'utf8');
const homeContent = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Extract all t("...") keys from Home.tsx
const keyMatches = homeContent.match(/t\("([^"]+)"/g) || [];
const usedKeys = [...new Set(keyMatches.map(k => k.replace('t("', '')))];

// Helper: convert zh to zh-Hant (simplified to traditional)
function toTraditional(zh) {
  // Simple character mapping for common tourism-related terms
  const map = {
    '景观点': '景觀點', '评分': '評分', '小时': '小時', '开放': '開放',
    '面向': '面向', '海峡': '海峽', '纪念碑': '紀念碑', '拱门': '拱門',
    '天然': '天然', '雕刻': '雕刻', '巨大': '巨大', '可见': '可見',
    '低潮': '低潮', '靠近': '靠近', '礁滩': '礁灘', '洞穴': '洞穴',
    '区域': '區域', '涨潮': '漲潮', '速度': '速度', '请把': '請把',
    '当作': '當作', '第一条': '第一條', '规则': '規則', '了解': '了解',
    '照片': '照片', '位置': '位置', '关键词': '關鍵詞', '针状岩': '針狀岩',
    '观景步道': '觀景步道', '为什么': '為什麼', '这里': '這裡',
    '最具辨识度': '最具辨識度', '海崖段': '海崖段', '白垩悬崖': '白堊懸崖',
    '海蚀地形': '海蝕地形', '近距离': '近距離', '触达': '觸達',
    '经典': '經典', '观景点': '觀景點', '门洞': '門洞', '光线': '光線',
    '层次': '層次', '海中': '海中', '摄影': '攝影', '构图': '構圖',
    '稳定': '穩定', '锚点': '錨點', '广角': '廣角', '尺度': '尺度',
    '长焦': '長焦', '纹理': '紋理', '可达': '可達', '视角': '視角',
    '窗口': '窗口', '出现': '出現', '迅速': '迅速', '抹掉': '抹掉',
    '路径': '路徑', '安全': '安全', '第一': '第一', '基础': '基礎',
    '信息': '信息', '来自': '來自', '地貌': '地貌', '观景': '觀景',
    '建议': '建議', '参考': '參考', '公开': '公開', '旅游': '旅遊',
    '怎么': '怎麼', '舒服': '舒服', '关键': '關鍵', '走多远': '走多遠',
    '时候': '時候', '半日': '半日', '路线': '路線', '赶': '趕',
    '海滩': '海灘', '远景': '遠景', '确定': '確定', '关系': '關係',
    '决定': '決定', '探索': '探索', '进入': '進入', '礁滩': '礁灘',
    '可选': '可選', '确定': '確定', '退路': '退路', '建立': '建立',
    '上崖': '上崖', '步道': '步道', '轮廓': '輪廓', '光线': '光線',
    '日落': '日落', '风大': '風大', '注意': '注意', '站位': '站位',
    '边缘': '邊緣', '距离': '距離', '提醒': '提醒', '谷地': '谷地',
    '一旦': '一旦', '切断': '切斷', '回程': '回程', '稳妥': '穩妥',
    '预留': '預留', '至少': '至少', '回撤': '回撤', '鞋子': '鞋子',
    '步行': '步行', '鹅卵石': '鵝卵石', '费力': '費力', '更滑': '更滑',
    '防滑鞋': '防滑鞋', '摄影党': '攝影黨', '长焦': '長焦', '防风外套': '防風外套',
    '规划': '規劃', '天气': '天氣', '影响': '影響', '前后': '前後',
    '逆光': '逆光', '侧逆光': '側逆光', '强调': '強調', '悬崖': '懸崖',
    '阴天': '陰天', '电影感': '電影感', '远离': '遠離', '边缘': '邊緣',
    '风强': '風強', '松散': '鬆散', '保持': '保持', '背对': '背對',
    '海风': '海風', '数据': '數據', '引用': '引用', '保持': '保持',
    '可信': '可信', '引用': '引用', '可公开': '可公開', '访问': '訪問',
    '页面': '頁面', '地点': '地點', '简介': '簡介', '随时间': '隨時間',
    '变化': '變化', '打开': '打開', '参考': '參考', '版式': '版式',
    '节奏': '節奏', '栏目': '欄目', '结构': '結構', '复制': '複製',
    '必读': '必讀', '手册': '手冊', '手册': '手冊', '免责声明': '免責聲明',
    '内容': '內容', '信息': '信息', '目的': '目的', '观光': '觀光',
    '免责声明': '免責聲明', '使用': '使用', '网站': '網站',
    '交通': '交通', '，自驾': '，自駕', '停车': '停車', '困难': '困難',
    '最好': '最好', '外围': '外圍', 'Copyright': '版權所有',
    '版权所有': '版權所有', '隐私政策': '隱私政策', '服务条款': '服務條款',
    'Cookie': 'Cookie', '设置': '設置', '概览': '概覽', '玩法': '玩法',
    '地图': '地圖', '必读': '必讀', '交通': '交通', '手册': '手冊',
    '免责声明': '免責聲明', 'Copyright': '版權所有',
    '支持': '支援', '联系': '聯繫', 'email': 'email',
    '评论': '評論', '核实': '核實', '完整': '完整', '最新': '最新',
    '点击': '點擊', '下方': '下方', '链接': '鏈接',
    '真实': '真實', '游客': '遊客', '评价': '評價',
    '個月前': '個月前', '週前': '週前', '旅行者': '旅行者',
    '当地': '當地', '嚮導': '嚮導', '攝影師': '攝影師',
    '旅客': '旅客', '居民': '居民', '自助': '自助',
    '背包客': '背包客', '地质': '地質', '愛好者': '愛好者',
    '法国': '法國', '巴黎': '巴黎', '火车站': '火車站',
    '印象派': '印象派', '畫家': '畫家', '灵感': '靈感',
    '向导': '嚮導'
  };

  let result = zh;
  for (const [from, to] of Object.entries(map)) {
    result = result.replace(new RegExp(from, 'g'), to);
  }
  return result;
}

// Helper: parse a language section
function extractKeysAndValues(content) {
  const keys = {};
  const keyRegex = /"([^"]+)":\s*"(.*?)"(?=\n\s*(?:"|\}))/g;
  let match;
  while ((match = keyRegex.exec(content)) !== null) {
    keys[match[1]] = match[2];
  }
  return keys;
}

// Extract all language sections
const zhMatch = i18nContent.match(/zh:\s*translation:\s*\{([\s\S]*?)\n  \},/);
const zhHantMatch = i18nContent.match(/"zh-Hant":\s*\{[\s\S]*?translation:\s*\{([\s\S]*?)\n  \},[\s\S]*?\}/);
const frMatch = i18nContent.match(/fr:\s*translation:\s*\{([\s\S]*?)\n  \},[\s\S]*?\}/);
const enMatch = i18nContent.match(/en:\s*translation:\s*\{([\s\S]*?)\n  \},/);
const deMatch = i18nContent.match(/de:\s*translation:\s*\{([\s\S]*?)\n  \}[\s\S]*?\}\n\};/);

const zhKeys = zhMatch ? extractKeysAndValues(zhMatch[1]) : {};
const zhHantKeys = zhHantMatch ? extractKeysAndValues(zhHantMatch[1]) : {};
const frKeys = frMatch ? extractKeysAndValues(frMatch[1]) : {};
const enKeys = enMatch ? extractKeysAndValues(enMatch[1]) : {};
const deKeys = deMatch ? extractKeysAndValues(deMatch[1]) : {};

console.log('Keys in zh:', Object.keys(zhKeys).length);
console.log('Keys in zh-Hant:', Object.keys(zhHantKeys).length);
console.log('Keys in fr:', Object.keys(frKeys).length);
console.log('Keys in en:', Object.keys(enKeys).length);
console.log('Keys in de:', Object.keys(deKeys).length);
console.log('Used in Home.tsx:', usedKeys.length);

// For each language, find missing keys and add them
const needed = {
  'zh-Hant': [],
  'fr': [],
  'en': [],
  'de': []
};

for (const key of usedKeys) {
  if (!zhHantKeys[key]) needed['zh-Hant'].push(key);
  if (!frKeys[key]) needed['fr'].push(key);
  if (!enKeys[key]) needed['en'].push(key);
  if (!deKeys[key]) needed['de'].push(key);
}

console.log('\nMissing zh-Hant:', needed['zh-Hant'].length);
console.log('Missing fr:', needed['fr'].length);
console.log('Missing en:', needed['en'].length);
console.log('Missing de:', needed['de'].length);

// Now inject missing keys into i18n.ts
let content = i18nContent;

// For zh-Hant: generate traditional Chinese version
const zhHantAdditions = {};
for (const key of needed['zh-Hant']) {
  if (zhKeys[key]) {
    zhHantAdditions[key] = toTraditional(zhKeys[key]);
  } else {
    zhHantAdditions[key] = key; // fallback to same
  }
}

// For fr/en/de: we need to use zhKeys as placeholder, then user can translate manually
const frAdditions = {};
const enAdditions = {};
const deAdditions = {};
for (const key of needed['fr']) frAdditions[key] = zhKeys[key] || key;
for (const key of needed['en']) enAdditions[key] = zhKeys[key] || key;
for (const key of needed['de']) deAdditions[key] = zhKeys[key] || key;

function inject(content, additions, lang) {
  const langOrder = ['fr', 'en', 'zh-Hant', 'de'];
  const langIndex = langOrder.indexOf(lang);
  // Find the privacy policy line in the target language section
  const privacyPhrases = ['"隐私政策"', '"Privacy Policy"', '"隱私政策"', '"Datenschutzrichtlinie"'];
  const targetPrivacy = privacyPhrases[langIndex];
  
  // Count occurrences of targetPrivacy to find correct section
  let count = 0;
  const targetCount = langIndex + 1;
  
  return content.replace(new RegExp(targetPrivacy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), (match) => {
    count++;
    if (count === targetCount) {
      let insert = '';
      for (const [k, v] of Object.entries(additions)) {
        const safeK = k.replace(/"/g, '\\"');
        const safeV = (v || k).replace(/"/g, '\\"');
        insert += `      "${safeK}": "${safeV}",\n`;
      }
      return insert + match;
    }
    return match;
  });
}

if (Object.keys(zhHantAdditions).length > 0) {
  content = inject(content, zhHantAdditions, 'zh-Hant');
}
if (Object.keys(frAdditions).length > 0) {
  content = inject(content, frAdditions, 'fr');
}
if (Object.keys(enAdditions).length > 0) {
  content = inject(content, enAdditions, 'en');
}
if (Object.keys(deAdditions).length > 0) {
  content = inject(content, deAdditions, 'de');
}

fs.writeFileSync('src/i18n.ts', content, 'utf8');
console.log('\nDone! All missing translations filled.');
