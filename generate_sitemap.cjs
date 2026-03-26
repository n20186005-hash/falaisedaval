const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.falaisedaval.com';

// 所有页面路径
const pages = [
  '',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-settings'
];

// 支持的语言及其 URL 前缀和 hreflang 代码
const langs = [
  { code: 'fr', prefix: '' },          // 法语（默认）
  { code: 'en', prefix: '/en' },       // 英语
  { code: 'de', prefix: '/de' },       // 德语
  { code: 'zh-Hant', prefix: '/zh-hant' } // 繁体中文
];

// 获取当前时间格式，用于 sitemap 的 lastmod
const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

pages.forEach(page => {
  langs.forEach(lang => {
    const pageUrl = `${baseUrl}${lang.prefix}${page}`;
    
    xml += `  <url>\n`;
    xml += `    <loc>${pageUrl || baseUrl + '/'}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
    
    // 为当前 URL 添加指向所有语言版本（包括它自己）的 hreflang 标签
    langs.forEach(altLang => {
      const altUrl = `${baseUrl}${altLang.prefix}${page}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang.code}" href="${altUrl || baseUrl + '/'}" />\n`;
    });
    
    // 强制添加 x-default 指向默认语言（法语版）
    const defaultUrl = `${baseUrl}${page}`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl || baseUrl + '/'}" />\n`;
    
    xml += `  </url>\n`;
  });
});

xml += `</urlset>`;

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml has been generated successfully.');
