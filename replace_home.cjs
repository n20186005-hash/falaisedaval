const fs = require('fs');

const phrases = [
  "自然景观点",
  "评分 4.8/5（Google）",
  "24 小时开放",
  "面向英吉利海峡的",
  "纪念碑级拱门",
  "Falaise d’Aval 是 Étretat 最具辨识度的海崖段之一：白垩悬崖被海水雕刻出巨大的天然拱门（Porte d’Aval），",
  "旁侧可见“针状岩”（L’Aiguille）。低潮时更靠近礁滩与洞穴区域，但涨潮速度快——请把潮汐当作第一条规则。",
  "开始了解",
  "看照片",
  "位置",
  "关键词",
  "拱门 / 针状岩 / 低潮 / 观景步道",
  "为什么这里最‘像Étretat’",
  "一眼识别的拱门轮廓 + 近距离可触达的海蚀地形，让 Falaise d’Aval 成为经典观景点。",
  "海蚀拱门像一座天然“门洞”，在不同光线下呈现完全不同的层次。",
  "“针状岩”立在海中，是摄影构图里的稳定锚点：广角看尺度，长焦看纹理。",
  "低潮可达",
  "许多近景视角只在低潮窗口出现；涨潮会迅速抹掉路径。安全第一。",
  "说明：页面基础信息（评分、开放时间、Plus Code）来自 Google Maps；地貌与观景建议参考公开旅游信息。",
  "怎么逛更舒服",
  "这里的关键不是‘走多远’，而是‘什么时候走’：低潮窗口 + 回撤余量。",
  "半日路线（不赶）",
  "海滩侧先取一个‘远景点’",
  "先用远景确定拱门、针状岩、浪线关系，再决定是否近距离探索。",
  "低潮窗口进入礁滩（可选）",
  "只在你确定潮汐与退路时进入；不要把‘拍到’建立在‘赌一把’上。",
  "上崖顶步道看轮廓与光线",
  "崖顶更适合全景与日落光；风大时注意站位与边缘距离。",
  "潮汐提醒",
  "谷地/礁滩区域一旦涨潮，很容易被海水“切断”回程。最稳妥：",
  "只在低潮窗口进入",
  "，并预留至少 1 小时回撤。",
  "鞋子与步行",
  "鹅卵石路面更费力且更滑，建议穿防滑鞋；摄影党最好带长焦与防风外套。",
  "在 Google Maps 里规划路线",
  "自然景观点；部分近景路线受潮汐/天气影响。",
  "日落前后",
  "逆光或侧逆光会强调悬崖纹理；阴天则更适合拍“冷色电影感”。",
  "远离边缘",
  "崖顶风强且边缘松散，请保持距离；拍照时更不要背对海风走近边缘。",
  "数据与引用",
  "为了保持信息可信，我们只引用可公开访问的页面。",
  "Google Maps（地点基础信息）",
  "评分、开放时间、Plus Code、简介等（可能随时间变化）",
  "打开",
  "参考站点：plagedetretat.com",
  "版式节奏与栏目结构参考（非内容复制）"
];

let homeContent = fs.readFileSync('src/pages/Home.tsx', 'utf8');

phrases.forEach(phrase => {
  // Try to replace text between tags or quotes
  // We need to be careful.
  const regexContent = new RegExp(`>\\s*${phrase}\\s*<`, 'g');
  homeContent = homeContent.replace(regexContent, `>{t("${phrase}")}<`);
  
  const regexQuotes = new RegExp(`"\\s*${phrase}\\s*"`, 'g');
  homeContent = homeContent.replace(regexQuotes, `t("${phrase}")`);
  
  // also handle some specific ones manually
  if (phrase === "，并预留至少 1 小时回撤。") {
    homeContent = homeContent.replace(/，并预留至少 1 小时回撤。/g, `{t("，并预留至少 1 小时回撤。")}`);
  }
  if (phrase === "只在低潮窗口进入" && homeContent.includes('<span className="font-medium text-foreground">只在低潮窗口进入</span>')) {
     homeContent = homeContent.replace('<span className="font-medium text-foreground">只在低潮窗口进入</span>', '<span className="font-medium text-foreground">{t("只在低潮窗口进入")}</span>');
  }
});

fs.writeFileSync('src/pages/Home.tsx', homeContent, 'utf8');
console.log('Replaced Home.tsx');
