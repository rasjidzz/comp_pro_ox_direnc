// Shared helpers and inline SVG icons used by the layout and page templates.

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Escape, then turn newlines into <br> (used for addresses).
const lines = (s) => esc(s).replace(/\n/g, '<br>');

const telHref = (s) => 'tel:' + s.replace(/[^\d+]/g, '').replace(/^0/, '+62');

const svg = (body, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const icons = {
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
  mobile: svg('<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>'),
  mail: svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'),
  pin: svg('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
  check: svg('<path d="M20 6 9 17l-5-5"/>'),
  menu: svg('<path d="M3 6h18M3 12h18M3 18h18"/>'),
  close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
  globe: svg('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>'),
  shield: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),
  // Resistor zig-zag, used as the brand mark and as a decorative accent.
  resistor: svg('<path d="M1 12h4l1.5-4 3 8 3-8 3 8 3-8L20 12h3"/>'),
};

// One simple pictogram per industry, in the same order as content.industries.
const industryIcons = [
  svg('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'), // power plants
  svg('<path d="M3 21h18M5 21V10l5 3V10l5 3V6h4v15"/>'), // steel
  svg('<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M4 12h16M12 3v18"/>'), // glass
  svg('<path d="M12 2s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12z"/>'), // oil & gas
  svg('<path d="M9 2v6L4 18a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3L15 8V2M8 2h8M7 14h10"/>'), // chemicals
  svg('<path d="M2 20c2 1 4 1 6 0s4-1 6 0 4 1 6 0M4 16l2-6h12l2 6M12 10V3l5 4"/>'), // shipyards
  svg('<path d="M17.8 19.2 16 11l3.5-3.5A2.1 2.1 0 0 0 16.5 4.5L13 8 4.8 6.2 3 8l7 4-3 3H4l-1 1 4 2 2 4 1-1v-3l3-3 4 7z"/>'), // aviation
  svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 14H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 3V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 10h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z"/>'), // other
];

const clients = [
  { img: 'clients/pln.jpg', name: 'PLN' },
  { img: 'clients/skkmigas-petrochina.jpg', name: 'SKK Migas & PetroChina' },
  { img: 'clients/pupuk-iskandar-muda.jpg', name: 'Pupuk Iskandar Muda' },
  { img: 'clients/cakra-steel.jpg', name: 'Cakra Steel' },
  { img: 'clients/mulia-group.jpg', name: 'Mulia Group' },
];

module.exports = { esc, lines, telHref, icons, industryIcons, clients };
