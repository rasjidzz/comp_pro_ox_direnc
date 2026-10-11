// Page shell: <head>, header with navigation and language switch, footer.
const { esc, lines, telHref, icons } = require('./lib');

const NAV = ['home', 'about', 'products', 'applications', 'contact'];

module.exports = function layout(ctx) {
  const { t, lang, root, link, altLink, active, body, title, description, canonical, alternates } = ctx;
  const other = lang === 'en' ? { code: 'id', label: 'ID' } : { code: 'en', label: 'EN' };
  const fullTitle = active === 'home' ? `${t.company} — ${title}` : `${title} | ${t.company}`;

  const navItems = NAV.map(
    (key) =>
      `<li><a href="${link(key)}"${active === key ? ' aria-current="page"' : ''}>${esc(t.nav[key])}</a></li>`
  ).join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${canonical ? `<link rel="canonical" href="${canonical}">` : ''}
${alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${a.href}">`).join('\n')}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:locale" content="${lang === 'id' ? 'id_ID' : 'en_US'}">
<meta name="theme-color" content="#0b1d33">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}assets/css/style.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#main">${esc(t.common.skip)}</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="${link('home')}" aria-label="${esc(t.company)} — ${esc(t.nav.home)}">
      <span class="brand-text"><strong>GRID</strong> Resistor <span>Indonesia</span></span>
    </a>
    <nav class="main-nav" id="main-nav" aria-label="Main">
      <ul>${navItems}</ul>
      <a class="btn btn-primary nav-cta" href="${link('contact')}">${esc(t.nav.cta)}</a>
    </nav>
    <div class="header-tools">
      <a class="lang-switch" href="${altLink}" hreflang="${other.code}" lang="${other.code}">${icons.globe}<span>${other.label}</span></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav">
        <span class="open">${icons.menu}</span><span class="close">${icons.close}</span>
        <span class="sr-only">${esc(t.nav.menu)}</span>
      </button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a class="brand brand-light" href="${link('home')}">
        <span class="brand-text"><strong>GRID</strong> Resistor <span>Indonesia</span></span>
      </a>
      <p class="footer-tag">${esc(t.common.soleAgent)}</p>
      <img class="footer-principal" src="${root}assets/img/site/logo-ozdirenc.jpg" alt="Öz Direnç" width="216" height="44" loading="lazy">
    </div>
    <div>
      <h2 class="footer-title">${esc(t.common.headOffice)}</h2>
      <p class="footer-contact">${icons.pin}<span>${lines(t.contact.office)}</span></p>
    </div>
    <div>
      <h2 class="footer-title">${esc(t.nav.contact)}</h2>
      <p class="contact-line">${icons.phone}<span><small style="color: #E53935 !important; font-weight: bold;">Power Grid</small><a href="tel:085211892728">Riri (0852 1189 2728)</a></span></p>
      <p class="contact-line">${icons.phone}<span><small style="color: #E53935 !important; font-weight: bold;">Industry</small><a href="tel:087782300200">Winarto (0877 82 300 200)</a></span></p>
      <p class="contact-line">${icons.phone}<span><small style="color: #FFD700 !important; font-weight: bold;">Support</small><a href="tel:085777559599">Nyoman (0857 7755 9599)</a></span></p>
      <p class="footer-contact">${icons.mail}<a href="mailto:${t.contact.email}">${esc(t.contact.email)}</a></p>
    </div>
    <div>
      <h2 class="footer-title">${esc(t.common.quickLinks)}</h2>
      <ul class="footer-links">${NAV.slice(1).map((k) => `<li><a href="${link(k)}">${esc(t.nav[k])}</a></li>`).join('')}</ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© ${new Date().getFullYear()} ${esc(t.company)}. ${esc(t.common.rights)}</p>
  </div>
</footer>
<div class="lightbox" hidden>
  <button class="lightbox-close" type="button" aria-label="Close">${icons.close}</button>
  <figure><img alt=""><figcaption></figcaption></figure>
</div>
<script src="${root}assets/js/main.js" defer></script>
</body>
</html>
`;
};
