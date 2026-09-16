'use strict';

// Main presentation; all additional films are defined in the bilingual pages.
const TERRA_VIDEO_URL = 'https://youtu.be/OK0nKGFt8v4';
const locale = document.documentElement.lang === 'fr' ? window.TERRA_LOCALES.fr : {};
const ui = locale.ui || { menuOpen: 'Open navigation', menuClose: 'Close navigation', watchFilm: 'Watch the Terra AI film ↗', filmStatus: 'Watch the project film', filmTitle: 'Terra AI project film', pause: 'Pause slideshow', play: 'Play slideshow' };

const iconPaths = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  radio: '<path d="M8 8a6 6 0 0 0 0 8m8-8a6 6 0 0 1 0 8M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14M12 14v8"/><circle cx="12" cy="11" r="2"/>',
  check: '<path d="M12 2l8 3v6c0 5-4 8-8 11-4-3-8-6-8-11V5z"/><path d="m8 12 3 3 5-6"/>',
  network: '<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-5h14v5"/>',
  leaf: '<path d="M20 3c-9-1-15 4-15 10 0 4 5 6 8 4 5-3 7-8 7-14ZM4 21l11-12"/>',
  chip: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3"/>',
  cloud: '<path d="M7 19h11a4 4 0 0 0 1-8 7 7 0 0 0-13-2 5 5 0 0 0 1 10Z"/>',
  message: '<path d="M21 14a3 3 0 0 1-3 3H8l-5 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3zM7 8h10M7 12h6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.5"/>',
  farmer: '<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3M6 7h12"/>',
  building: '<path d="m3 8 9-6 9 6H3Zm2 3v7m5-7v7m4-7v7m5-7v7M2 21h20M3 18h18"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6h14M5 18h14"/>',
  box: '<path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 10 9-5M12 12 3 7m9 5v10M7 4.8l9 5V14"/>',
  truck: '<path d="M3 5h12v13H3zM15 10h4l3 4v4h-7"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
  book: '<path d="M12 5c-3-2-6-3-10-2v16c4-1 7 0 10 2m0-16c3-2 6-3 10-2v16c-4-1-7 0-10 2V5Z"/>',
  drop: '<path d="M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13ZM8 15a4 4 0 0 0 4 4"/>',
  map: '<path d="m9 3 6 3 7-3v17l-7 3-6-3-7 3V6l7-3Zm0 0v17m6-14v17"/>'
};
function paintIcon(element, name) {
  element.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.leaf}</svg>`;
}
document.querySelectorAll('[data-icon]').forEach(el => paintIcon(el, el.dataset.icon));

const stepsEN = [
  { kicker: '01 / SENSE THE FIELD', title: 'Start with what the land is telling us.', description: 'Soil probes follow electrical conductivity (EC), moisture, temperature and pH. Leaf sensors track wetness and temperature, while air sensing adds environmental context. Readings are linked to a known field and management zone.', input: 'Physical soil, crop and air conditions', output: 'Time-stamped measurements for a specific zone' },
  { kicker: '02 / COLLECT AT THE EDGE', title: 'Give the field its own listening point.', description: 'The solar-powered Terra Box collects sensor readings through its interfaces. The RAK3112 controller processes and packages them, links them to the device and zone, and applies configured local rules. Approved irrigation control can operate locally where the equipment is installed.', input: 'Measurements from soil, leaf and air sensors', output: 'Structured field packets and configured local actions' },
  { kicker: '03 / CONNECT THE FIELD', title: 'Bring the network to the farm.', description: 'Terra Boxes send compact packets over a private LoRaWAN network to a shared gateway. No individual SIM card is needed at each Box. The gateway forwards data to Terra Cloud using an available internet backhaul: Ethernet, Wi-Fi, cellular or an external satellite connection.', input: 'LoRaWAN packets from multiple Terra Boxes', output: 'Field data forwarded to the cloud through one shared uplink' },
  { kicker: '04 / INTERPRET IN CONTEXT', title: 'A measurement becomes useful with context.', description: 'Terra Cloud associates each reading with the farmer, field and season. Sensor trends are considered alongside Terra Lab results, crop stage, weather and recorded field events. Rules and AI help identify situations that need attention and prepare agronomic decision support.', input: 'Sensor trends + laboratory results + crop and weather context', output: 'A traceable observation, alert or draft recommendation' },
  { kicker: '05 / VALIDATE WITH EXPERTISE', title: 'The agronomist turns insight into advice.', description: 'A Terra agronomist checks the evidence against the local crop, Terra Lab baseline and management plan. They confirm or adapt the recommendation, request a field inspection or ask for a new laboratory sample when the evidence is insufficient. Nutrient advice is grounded in laboratory NPK results.', input: 'An alert and its supporting agronomic evidence', output: 'Validated guidance adapted to the farmer’s situation' },
  { kicker: '06 / REACH THE FARMER', title: 'Make the next step clear and accessible.', description: 'Validated advice reaches the farmer by SMS on a basic mobile phone. French and local-language delivery, including Lingala and Swahili, are part of the deployment plan. Field actions, follow-up observations and harvest results enrich the farm record and the next season’s decisions.', input: 'Agronomist-validated advice and the registered farmer contact', output: 'A practical SMS, an action in the field and a feedback loop' }
];

const actorsEN = [
  { kicker: 'AT THE CENTER OF THE SYSTEM', title: 'Give every farmer a place in the agricultural economy.', description: 'A registered farm profile brings location, crops, soil information, field history and agronomic needs into one place. Farmers contribute observations and outcomes, and receive guidance and access to the people who can help them act.', from: 'Farm & field data', fromDetail: 'Location · soil · crop · needs', to: 'A connected sector', toDetail: 'Experts · services · markets', icon: 'network', benefits: ['Get crop-specific guidance from agronomists through accessible SMS.', 'Connect identified needs with suitable inputs, support and buyers.', 'Build a season-by-season record that makes the farm easier to support.'] },
  { kicker: 'HUMAN KNOWLEDGE, EXTENDED', title: 'Keep expertise connected to the field.', description: 'Terra’s field agronomists combine crop knowledge with continuous observations. Terra Laboratoire Agronomique establishes and refreshes the chemical soil baseline. Terra links both to the same zone and season, making it easier to interpret change and follow up on advice.', from: 'Field observations', fromDetail: 'Trends · alerts · crop stage', to: 'Expert decisions', toDetail: 'Agronomists · laboratories', icon: 'check', benefits: ['Link each laboratory result to the correct farmer and management zone.', 'Review field alerts, validate recommendations and prioritize farm visits.', 'Record advice and follow-up results so the next decision starts with better evidence.'] },
  { kicker: 'A CLEARER PICTURE FOR PUBLIC ACTION', title: 'Help agricultural policy reach the right field.', description: 'The planned national platform brings registered farmers, crop locations and field needs into a shared agricultural picture. Ministries can use appropriate regional and farm-level information to plan support and follow its implementation.', from: 'Registered farms', fromDetail: 'Zones · crops · documented needs', to: 'Government', toDetail: 'Ministries · extension services', icon: 'building', benefits: ['Identify where enrolled farmers are located and what they produce.', 'Target extension services, subsidies and interventions using documented needs.', 'Coordinate with NGOs, cooperatives and buyers through a consistent field reference.'] },
  { kicker: 'MORE TARGETED DEVELOPMENT SUPPORT', title: 'Connect assistance with documented needs.', description: 'NGOs and development actors, including organizations such as FAO, are intended users of the platform. Terra can connect program criteria to registered farms, helping teams coordinate support and track outcomes over time.', from: 'Farm-level needs', fromDetail: 'Baseline · risks · outcomes', to: 'Development actors', toDetail: 'NGOs · agricultural programs', icon: 'globe', benefits: ['Find eligible enrolled farmers using location, crop and assessed need.', 'Coordinate assistance with public services and local agronomists.', 'Compare documented baseline and follow-up results to assess program impact.'] },
  { kicker: 'FROM GENERAL SUPPLY TO SPECIFIC NEED', title: 'Match the right inputs to the right farm.', description: 'Seed, fertilizer and agricultural input suppliers can respond to needs documented in a farm’s agronomic plan. Terra connects that demand to the right zone and farmer, with technical choices guided by agronomists and laboratory evidence.', from: 'Approved farm plans', fromDetail: 'Crop · soil baseline · input needs', to: 'Input suppliers', toDetail: 'Seeds · fertilizers · equipment', icon: 'box', benefits: ['Understand what participating farms need and when they need it.', 'Coordinate deliveries around crop calendars and identified locations.', 'Keep commercial supply connected to agronomic advice and actual soil conditions.'] },
  { kicker: 'MAKE PRODUCTION EASIER TO FIND', title: 'Connect harvests to a more predictable market.', description: 'Processors and buyers need to know who grows what, where and when. Terra’s planned production profiles connect these actors to enrolled farms and cooperatives, supporting procurement discussions and harvest collection planning.', from: 'Production profiles', fromDetail: 'Crops · locations · harvest windows', to: 'Buyers & processors', toDetail: 'Procurement · collection · markets', icon: 'truck', benefits: ['Discover identified farms and cooperatives producing relevant crops.', 'Plan collection routes around locations and expected harvest windows.', 'Feed actual harvested quantities and buyer requirements back into the next season’s plan.'] },
  { kicker: 'BUILD AN AGRICULTURAL KNOWLEDGE BASE', title: 'Let field evidence strengthen research.', description: 'Researchers need comparable observations across soil zones, crops and seasons. Terra aims to connect sensor time series with laboratory results, field events and outcomes, building datasets that can support calibration and model evaluation.', from: 'Seasonal evidence', fromDetail: 'Sensors · lab results · outcomes', to: 'Research teams', toDetail: 'Universities · model validation', icon: 'book', benefits: ['Study relationships between field conditions and agronomic outcomes.', 'Validate predictive models against laboratory evidence and real field data.', 'Return evaluated findings to agronomists so research improves practical guidance.'] },
  { kicker: 'SHARE WHAT WORKS, WITH CONTEXT', title: 'Turn successful practice into shared learning.', description: 'The proposed Terra Clone approach identifies practices from well-documented farms that may be useful in similar conditions. Soil type, crop variety, input history and outcomes provide context; an agronomist checks suitability before adapting a practice elsewhere.', from: 'Documented practice', fromDetail: 'Soil · variety · actions · results', to: 'Comparable farms', toDetail: 'Adaptation · validation · learning', icon: 'network', benefits: ['Document successful crop-management approaches and the conditions behind them.', 'Find potentially comparable fields instead of copying a recipe everywhere.', 'Adapt practices with agronomic review, then measure how they perform locally.'] }
];

const steps = locale.steps || stepsEN;
const actors = locale.actors || actorsEN;

function setText(id, text) { document.getElementById(id).textContent = text; }
function bindTabs(selector, onSelect, vertical) {
  const buttons = [...document.querySelectorAll(selector)];
  function select(index, focus) {
    buttons.forEach((button, i) => { button.setAttribute('aria-selected', String(i === index)); button.tabIndex = i === index ? 0 : -1; });
    onSelect(index);
    if (focus) buttons[index].focus();
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => select(index, false));
    button.addEventListener('keydown', event => {
      const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
      const previousKey = vertical ? 'ArrowUp' : 'ArrowLeft';
      let target;
      if (event.key === nextKey) target = (index + 1) % buttons.length;
      if (event.key === previousKey) target = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = buttons.length - 1;
      if (target !== undefined) { event.preventDefault(); select(target, true); }
    });
  });
}
bindTabs('[data-step]', index => {
  const step = steps[index];
  for (const field of ['kicker', 'title', 'description', 'input', 'output']) setText(`pipeline-${field}`, step[field]);
  document.getElementById('pipeline-panel').setAttribute('aria-labelledby', `step-tab-${index}`);
}, false);
bindTabs('[data-actor]', index => {
  const actor = actors[index];
  for (const field of ['kicker', 'title', 'description', 'from', 'to']) setText(`actor-${field}`, actor[field]);
  setText('actor-from-detail', actor.fromDetail); setText('actor-to-detail', actor.toDetail);
  paintIcon(document.getElementById('actor-to-icon'), actor.icon);
  const benefits = document.getElementById('actor-benefits');
  benefits.replaceChildren(...actor.benefits.map((text, i) => {
    const row = document.createElement('div'); const number = document.createElement('span'); const description = document.createElement('p');
    number.textContent = `0${i + 1}`; description.textContent = text; row.append(number, description); return row;
  }));
  document.getElementById('actor-panel').setAttribute('aria-labelledby', `actor-tab-${index}`);
}, true);

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', ui.menuOpen); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? ui.menuClose : ui.menuOpen); navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });

function getYouTubeId(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let id = null;
    if (host === 'youtu.be') id = url.pathname.split('/')[1];
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      id = url.searchParams.get('v');
      if (!id && /^\/(embed|shorts|live)\//.test(url.pathname)) id = url.pathname.split('/')[2];
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}
const videoId = getYouTubeId(TERRA_VIDEO_URL);
if (videoId && document.getElementById('film-action')) {
  const filmLink = document.getElementById('film-action');
  filmLink.textContent = ui.watchFilm;
  filmLink.href = `https://www.youtube.com/watch?v=${videoId}`;
  filmLink.dataset.video = videoId;
  filmLink.dataset.videoTitle = ui.filmTitle;
  setText('film-status', ui.filmStatus);
}


// Language links keep both the page and its current section.
function updateLanguageLinks() {
  const protocolPage = document.body.dataset.page === 'protocol';
  document.querySelectorAll('.language-switch a').forEach(link => {
    const path = protocolPage
      ? (link.lang === 'fr' ? 'protocole.html' : 'protocol.html')
      : (link.lang === 'fr' ? 'fr.html' : 'index.html');
    link.href = path + window.location.hash;
  });
}
updateLanguageLinks();
window.addEventListener('hashchange', updateLanguageLinks);

// Horizontal carousel with manual controls, optional autoplay and reduced-motion support.
const gallery = document.getElementById('gallery-track');
if (gallery) {
  const items = [...gallery.querySelectorAll('.gallery-item')];
  const previous = document.getElementById('gallery-prev');
  const next = document.getElementById('gallery-next');
  const pause = document.getElementById('gallery-pause');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = reduceMotion.matches;
  let hovering = false;
  let interacting = false;
  let visible = false;
  let direction = 1;
  let current = 0;
  let interactionTimeout;
  const maxScroll = () => Math.max(0, gallery.scrollWidth - gallery.clientWidth);
  const spacing = () => items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : gallery.clientWidth;
  const behavior = () => reduceMotion.matches ? 'auto' : 'smooth';
  function updateGallery() {
    const maximum = maxScroll();
    current = Math.min(items.length - 1, Math.round(gallery.scrollLeft / Math.max(1, spacing())));
    previous.disabled = gallery.scrollLeft <= 2;
    next.disabled = gallery.scrollLeft >= maximum - 2;
    document.getElementById('gallery-counter').textContent = `${String(current + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    pause.textContent = userPaused ? ui.play : ui.pause;
    pause.setAttribute('aria-pressed', String(userPaused));
  }
  function move(amount, manual) {
    if (manual) {
      userPaused = true;
      direction = amount;
    }
    gallery.scrollTo({ left: Math.max(0, Math.min(maxScroll(), gallery.scrollLeft + spacing() * amount)), behavior: behavior() });
    updateGallery();
  }
  previous.addEventListener('click', () => move(-1, true));
  next.addEventListener('click', () => move(1, true));
  pause.addEventListener('click', () => { userPaused = !userPaused; updateGallery(); });
  gallery.addEventListener('scroll', updateGallery, { passive: true });
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1, true); }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); userPaused = true;
      gallery.scrollTo({ left: event.key === 'Home' ? 0 : maxScroll(), behavior: behavior() }); updateGallery();
    }
  });
  gallery.addEventListener('pointerdown', () => { userPaused = true; updateGallery(); });
  gallery.addEventListener('wheel', () => { interacting = true; clearTimeout(interactionTimeout); interactionTimeout = setTimeout(() => { interacting = false; }, 5000); }, { passive: true });
  const gallerySection = gallery.closest('section');
  gallerySection.addEventListener('mouseenter', () => { hovering = true; });
  gallerySection.addEventListener('mouseleave', () => { hovering = false; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, { threshold: 0.15 }).observe(gallery);
  } else { visible = true; }
  window.addEventListener('resize', updateGallery);
  reduceMotion.addEventListener('change', event => { if (event.matches) userPaused = true; updateGallery(); });
  setInterval(() => {
    if (userPaused || hovering || interacting || !visible || document.hidden || gallery.contains(document.activeElement) || maxScroll() < 2) return;
    if (gallery.scrollLeft >= maxScroll() - 2) direction = -1;
    if (gallery.scrollLeft <= 2) direction = 1;
    move(direction, false);
  }, 4500);
  updateGallery();
}
