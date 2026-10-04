#!/usr/bin/env node
// Static site build: renders src/pages.js with each language in src/content/
// into dist/ (English at the root, Indonesian under /id/). No dependencies.
//
//   node build.js
//
const fs = require('fs');
const path = require('path');
const layout = require('./src/layout');
const { pages } = require('./src/pages');

const SITE_URL = 'https://gridresistorindonesia.com';
const LANGS = ['en', 'id'];
const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

const content = Object.fromEntries(
  LANGS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(SRC, 'content', `${l}.json`), 'utf8'))])
);
const prefix = (lang) => (lang === 'en' ? '' : `${lang}/`);
const pathOf = Object.fromEntries(pages.map((p) => [p.key, p.path]));
const prettyUrl = (rel) => SITE_URL + '/' + rel.replace(/(^|\/)index\.html$/, '$1');

function meta(t, page) {
  if (page.key.startsWith('product:')) {
    const p = t.products[page.key.slice(8)];
    return { title: `${p.name} — ${p.full}`, description: p.summary };
  }
  return t.meta[page.key];
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, entry.name);
    const d = path.join(to, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

function write(rel, data) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
}

// Empty dist/ rather than deleting it, so it can stay open in Explorer or a local server.
fs.mkdirSync(DIST, { recursive: true });
for (const entry of fs.readdirSync(DIST)) fs.rmSync(path.join(DIST, entry), { recursive: true, force: true });
copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));

const sitemap = [];
let count = 0;

for (const lang of LANGS) {
  const t = content[lang];
  const other = LANGS.find((l) => l !== lang);

  for (const page of pages) {
    // The 404 page is served from arbitrary URLs, so it is English-only and uses absolute links.
    if (page.key === 'notFound' && lang !== 'en') continue;
    const rel = prefix(lang) + page.path;
    const root = page.key === 'notFound' ? '/' : '../'.repeat(rel.split('/').length - 1);

    const ctx = {
      t,
      lang,
      root,
      img: (p) => `${root}assets/img/${p}`,
      link: (key) => root + prefix(lang) + pathOf[key],
    };
    const { title, description } = meta(t, page);
    const alternates = page.noindex
      ? []
      : [
          ...LANGS.map((l) => ({ lang: l, href: prettyUrl(prefix(l) + page.path) })),
          { lang: 'x-default', href: prettyUrl(page.path) },
        ];

    const html = layout({
      ...ctx,
      active: page.active || page.key,
      altLink: root + prefix(other) + (page.key === 'notFound' ? pathOf.home : page.path),
      title,
      description,
      canonical: page.noindex ? null : prettyUrl(rel),
      alternates,
      body: page.render(ctx),
    });
    write(rel, html);
    count++;
    if (!page.noindex) sitemap.push(prettyUrl(rel));
  }
}

const today = new Date().toISOString().slice(0, 10);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.copyFileSync(path.join(SRC, 'htaccess'), path.join(DIST, '.htaccess'));

console.log(`Built ${count} pages into ${path.relative(process.cwd(), DIST) || 'dist'}/`);
