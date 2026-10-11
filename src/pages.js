// Page templates. Each page renders its <main> body from the language content `t`.
const { esc, lines, telHref, icons, industryIcons, clients } = require('./lib');

const PRODUCT_ORDER = [
  'hrgs',
  'neutral-grounding-resistors',
  'loadbanks',
  'motor-starting-resistors',
  'oil-cooled-starters',
  'dynamic-braking-resistors',
];

// ---------- shared sections ----------

const pageHeader = (title, lead, crumbs = '') => `
<section class="page-header">
  <div class="container">
    ${crumbs}
    <h1>${esc(title)}</h1>
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
  </div>
</section>`;

const productCard = (c, slug) => {
  const p = c.t.products[slug];
  return `
  <article class="card product-card reveal">
    <a href="${c.link('product:' + slug)}">
      <div class="card-media"><img src="${c.img(p.img)}" alt="${esc(p.name)}" loading="lazy"></div>
      <div class="card-body">
        <p class="eyebrow">${esc(p.full)}</p>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.summary)}</p>
        <span class="link-arrow">${esc(c.t.common.learnMore)} ${icons.arrow}</span>
      </div>
    </a>
  </article>`;
};

const industriesGrid = (c) => `
<ul class="industry-grid">
  ${c.t.industries
    .map((name, i) => `<li class="industry reveal">${industryIcons[i]}<span>${esc(name)}</span></li>`)
    .join('')}
</ul>`;

const clientsStrip = (c, title) => `
<section class="section clients">
  <div class="container">
    <h2 class="section-title center">${esc(title)}</h2>
    <ul class="client-logos">
      ${clients
        .map((cl) => `<li><img src="${c.img(cl.img)}" alt="${esc(cl.name)}" title="${esc(cl.name)}" loading="lazy"></li>`)
        .join('')}
    </ul>
  </div>
</section>`;

const checkList = (items) =>
  `<ul class="check-list">${items.map((i) => `<li>${icons.check}<span>${esc(i)}</span></li>`).join('')}</ul>`;

// ---------- pages ----------

const home = (c) => {
  const h = c.t.home;
  return `
<section class="hero">
  <img class="bg-img" src="${c.img('site/hero-resistors.jpg')}" alt="">
  <div class="container hero-inner">
    <p class="eyebrow eyebrow-light">${esc(h.eyebrow)}</p>
    <h1>${esc(h.title)}</h1>
    <p class="hero-lead">${esc(h.lead)}</p>
    <div class="hero-actions">
      <a class="btn btn-primary btn-lg" href="${c.link('products')}">${esc(h.ctaPrimary)} ${icons.arrow}</a>
      <a class="btn btn-ghost btn-lg" href="${c.link('contact')}">${esc(h.ctaSecondary)}</a>
    </div>
    <p class="hero-agent">${esc(c.t.common.soleAgent)}</p>
  </div>
</section>

<section class="stats">
  <div class="container stats-grid">
    ${h.stats.map((s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('')}
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="reveal">
      <h2 class="section-title">${esc(h.aboutTitle)}</h2>
      <p class="lead">${esc(h.aboutText)}</p>
      <a class="link-arrow" href="${c.link('about')}">${esc(c.t.nav.about)} ${icons.arrow}</a>
    </div>
    <figure class="split-media reveal">
      <img src="${c.img('site/facility-bursa.jpg')}" alt="${esc(c.t.about.facilityCaption)}" loading="lazy">
      <figcaption>${esc(c.t.about.facilityCaption)}</figcaption>
    </figure>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="section-head">
      <h2 class="section-title">${esc(h.productsTitle)}</h2>
      <p>${esc(h.productsLead)}</p>
    </div>
    <div class="card-grid">${PRODUCT_ORDER.map((s) => productCard(c, s)).join('')}</div>
  </div>
</section>

<section class="section section-dark">
  <img class="bg-img" src="${c.img('site/industry-plant.jpg')}" alt="" loading="lazy">
  <div class="container">
    <div class="section-head">
      <h2 class="section-title">${esc(h.industriesTitle)}</h2>
      <p>${esc(h.industriesLead)}</p>
    </div>
    ${industriesGrid(c)}
  </div>
</section>

${clientsStrip(c, h.clientsTitle)}`;
};

const about = (c) => {
  const a = c.t.about;
  return `
${pageHeader(a.title, a.lead)}
<section class="section">
  <div class="container split">
    <div class="prose reveal">
      <p class="lead">${esc(a.p1)}</p>
      <p>${esc(a.p2)}</p>
    </div>
    <figure class="split-media reveal">
      <img src="${c.img('site/facility-bursa.jpg')}" alt="${esc(a.facilityCaption)}" loading="lazy">
      <figcaption>${esc(a.facilityCaption)}</figcaption>
    </figure>
  </div>
</section>

<section class="section section-alt">
  <div class="container split split-reverse">
    <div class="prose reveal">
      <img class="principal-logo" src="${c.img('site/logo-ozdirenc.jpg')}" alt="Öz Direnç" width="216" height="44" loading="lazy">
      <h2 class="section-title">${esc(a.principalTitle)}</h2>
      <p>${esc(a.principalP1)}</p>
      <p>${esc(a.principalP2)}</p>
    </div>
    <div class="cert-box reveal">
      ${icons.shield}
      <h3>${esc(a.certTitle)}</h3>
      <p>${esc(a.certText)}</p>
      <ul class="cert-list">${a.certs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section section-dark">
  <div class="container">
    <h2 class="section-title center">${esc(a.partnersTitle)}</h2>
    <ul class="chips">${a.partners.map((p) => `<li${p === 'Indonesia' ? ' class="chip-active"' : ''}>${esc(p)}</li>`).join('')}</ul>
  </div>
</section>

${clientsStrip(c, a.clientsTitle)}`;
};

const products = (c) => {
  const p = c.t.productsPage;
  return `
${pageHeader(p.title, p.lead)}
<section class="section">
  <div class="container">
    <div class="card-grid">${PRODUCT_ORDER.map((s) => productCard(c, s)).join('')}</div>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    <h2 class="section-title">${esc(c.t.common.gallery)}</h2>
    <div class="catalog-grid">
      ${c.t.catalog
        .map(
          (item) => `
      <a class="catalog-item reveal" href="${c.link('product:' + item.product)}">
        <img src="${c.img(item.img)}" alt="${esc(item.name)}" loading="lazy">
        <span>${esc(item.name)}</span>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>`;
};

const product = (slug) => (c) => {
  const p = c.t.products[slug];
  const crumbs = `<nav class="crumbs" aria-label="Breadcrumb"><a href="${c.link('products')}">${esc(c.t.nav.products)}</a><span>/</span><span aria-current="page">${esc(p.name)}</span></nav>`;
  const related = PRODUCT_ORDER.filter((s) => s !== slug).slice(0, 3);
  return `
<section class="page-header product-header">
  <div class="container split">
    <div>
      ${crumbs}
      <p class="eyebrow eyebrow-light">${esc(p.full)}</p>
      <h1>${esc(p.name)}</h1>
      <p class="lead">${esc(p.summary)}</p>
      <a class="btn btn-primary" href="${c.link('contact')}">${esc(c.t.nav.cta)} ${icons.arrow}</a>
    </div>
    <div class="product-hero-media"><img src="${c.img(p.img)}" alt="${esc(p.name)}"></div>
  </div>
</section>

<section class="section">
  <div class="container split split-top">
    <div class="prose reveal">
      ${p.intro.map((x) => `<p>${esc(x)}</p>`).join('')}
      ${
        p.reasons
          ? `<h2 class="sub-title">${esc(p.reasonsTitle)}</h2>
      <ol class="num-list">${p.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ol>`
          : ''
      }
    </div>
    <aside class="panel reveal">
      <h2 class="sub-title">${esc(p.listTitle)}</h2>
      ${checkList(p.list)}
    </aside>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2 class="section-title">${esc(c.t.common.gallery)}</h2>
    <div class="gallery">
      ${p.gallery
        .map(
          (g) => `
      <figure class="gallery-item reveal">
        <button type="button" class="zoom" data-full="${c.img(g.img)}" data-caption="${esc(g.caption)}">
          <img src="${c.img(g.img)}" alt="${esc(g.caption)}" loading="lazy">
        </button>
        <figcaption>${esc(g.caption)}</figcaption>
      </figure>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head row">
      <h2 class="section-title">${esc(c.t.common.related)}</h2>
      <a class="link-arrow" href="${c.link('products')}">${esc(c.t.common.backToProducts)} ${icons.arrow}</a>
    </div>
    <div class="card-grid">${related.map((s) => productCard(c, s)).join('')}</div>
  </div>
</section>`;
};

const applications = (c) => {
  const a = c.t.applicationsPage;
  return `
${pageHeader(a.title, a.lead)}
<section class="section">
  <div class="container">
    <h2 class="section-title">${esc(a.appsTitle)}</h2>
    <div class="app-grid">
      ${c.t.applications
        .map((app, i) => {
          const p = c.t.products[app.product];
          return `
      <article class="app-card reveal">
        <img src="${c.img(p.img)}" alt="${esc(p.name)}" loading="lazy">
        <div>
          <span class="app-num">0${i + 1}</span>
          <h3>${esc(app.title)}</h3>
          <p>${esc(app.text)}</p>
          <a class="link-arrow" href="${c.link('product:' + app.product)}">${esc(p.name)} ${icons.arrow}</a>
        </div>
      </article>`;
        })
        .join('')}
    </div>
  </div>
</section>
<section class="section section-dark">
  <img class="bg-img" src="${c.img('site/industry-plant.jpg')}" alt="" loading="lazy">
  <div class="container">
    <div class="section-head">
      <h2 class="section-title">${esc(a.industriesTitle)}</h2>
      <p>${esc(c.t.home.industriesLead)}</p>
    </div>
    ${industriesGrid(c)}
  </div>
</section>`;
};

const contact = (c) => {
  const p = c.t.contactPage;
  const k = c.t.contact;
  const maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('The CEO Building, Jl. TB. Simatupang No. 18C, Jakarta Selatan');
  return `
${pageHeader(p.title, p.lead)}
<section class="section">
  <div class="container contact-grid">
    <article class="contact-card contact-card-main reveal">
      <h2>${esc(c.t.common.headOffice)}</h2>
      <p class="contact-company">${esc(c.t.company)}</p>
      <p class="contact-line">${icons.pin}<span>${lines(k.office)}</span></p>
      <p class="contact-line">${icons.phone}<span><small>Power Grid</small><a href="tel:085211892728">Riri (0852 1189 2728)</a></span></p>
      <p class="contact-line">${icons.phone}<span><small>Industry</small><a href="tel:087782300200">Winarto (0877 82 300 200)</a></span></p>
      <p class="contact-line">${icons.phone}<span><small>Support</small><a href="tel:085777559599">Nyoman (0857 7755 9599)</a></span></p>
      <p class="contact-line">${icons.mail}<span><small>${esc(c.t.common.email)}</small><a href="mailto:${k.email}">${esc(k.email)}</a></span></p>
      <div class="contact-actions">
        <a class="btn btn-primary" href="mailto:${k.email}">${icons.mail} ${esc(k.email)}</a>
        <a class="btn btn-outline" href="${maps}" target="_blank" rel="noopener">${icons.pin} ${esc(p.mapLink)}</a>
      </div>
    </article>
    <article class="contact-card reveal">
      <img src="${c.img('site/facility-bursa.jpg')}" alt="${esc(c.t.about.facilityCaption)}" loading="lazy">
      <h2>${esc(c.t.common.factory)}</h2>
      <p class="contact-company">${esc(k.factoryName)}</p>
      <p class="contact-line">${icons.pin}<span>${lines(k.factory)}</span></p>
      <p class="contact-line">${icons.phone}<span><a href="${telHref(k.factoryPhone)}">${esc(k.factoryPhone)}</a></span></p>
      <p class="contact-line">${icons.mail}<span><a href="mailto:${k.factoryEmail}">${esc(k.factoryEmail)}</a></span></p>
    </article>
  </div>
</section>`;
};

const notFound = (c) => `
<section class="page-header not-found">
  <div class="container">
    <p class="big-404">404</p>
    <h1>${esc(c.t.notFound.title)}</h1>
    <p class="lead">${esc(c.t.notFound.text)}</p>
    <a class="btn btn-primary" href="${c.link('home')}">${esc(c.t.notFound.back)}</a>
  </div>
</section>`;

// key → output path (relative to the language root) and renderer.
const pages = [
  { key: 'home', path: 'index.html', render: home },
  { key: 'about', path: 'about.html', render: about },
  { key: 'products', path: 'products.html', render: products },
  ...PRODUCT_ORDER.map((slug) => ({
    key: 'product:' + slug,
    path: `products/${slug}.html`,
    render: product(slug),
    active: 'products',
  })),
  { key: 'applications', path: 'applications.html', render: applications },
  { key: 'contact', path: 'contact.html', render: contact },
  { key: 'notFound', path: '404.html', render: notFound, noindex: true },
];

module.exports = { pages };
