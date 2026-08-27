// ===== DATA =====
const SLIDES = [
  { img:'/artemis.png', tag:'ARTEMIS PROGRAM', title:'Returning Humanity\nto the Moon', desc:'Artemis is the first step in the next era of human exploration. Together with commercial and international partners, NASA will establish a sustained presence on the Moon.', cta:'Explore Artemis' },
  { img:'/nebula.png', tag:'JAMES WEBB TELESCOPE', title:'Unveiling the\nInvisible Universe', desc:'The James Webb Space Telescope is the largest, most powerful telescope ever launched into space, peering deeper into the cosmos than ever before.', cta:'View Discoveries' },
  { img:'/earth.png', tag:'EARTH SCIENCE', title:'Our Home Planet\nFrom Above', desc:'NASA studies Earth from space, providing critical data on climate change, natural disasters, and the health of our planet\'s ecosystems.', cta:'Earth Science' },
  { img:'/mars.png', tag:'MARS EXPLORATION', title:'The Red Planet\nAwaits', desc:'NASA\'s Perseverance rover is exploring Mars, searching for signs of ancient microbial life and collecting samples for future return to Earth.', cta:'Mars Missions' },
  { img:'/astronaut.png', tag:'HUMAN SPACEFLIGHT', title:'Humans in Space\nPioneering the Future', desc:'For over 20 years, astronauts have lived and worked continuously aboard the International Space Station, advancing science in microgravity.', cta:'Crew Updates' },
];

const MISSIONS = [
  { name:'Artemis III', desc:'The first crewed lunar landing mission of the Artemis program, returning astronauts to the Moon\'s surface.', img:'/artemis.png', badge:'CREWED', badgeColor:'#fc3d21', status:'Upcoming', year:'2026' },
  { name:'James Webb Space Telescope', desc:'Observing the most distant objects in the universe and studying the formation of stars and galaxies.', img:'/nebula.png', badge:'ACTIVE', badgeColor:'#10b981', status:'Operational', year:'2021' },
  { name:'Mars Perseverance', desc:'Exploring Jezero Crater, collecting rock samples and testing oxygen production on the Red Planet.', img:'/mars.png', badge:'ACTIVE', badgeColor:'#10b981', status:'Operational', year:'2020' },
  { name:'Europa Clipper', desc:'Investigating Jupiter\'s moon Europa to determine if it has conditions suitable for life.', img:'/earth.png', badge:'EN ROUTE', badgeColor:'#f59e0b', status:'In Transit', year:'2024' },
  { name:'Voyager 1 & 2', desc:'The farthest human-made objects from Earth, still sending data from interstellar space.', img:'/astronaut.png', badge:'ACTIVE', badgeColor:'#10b981', status:'47 Years', year:'1977' },
  { name:'OSIRIS-APEX', desc:'Studying asteroid Apophis during its close approach to Earth in 2029.', img:'/nebula.png', badge:'EN ROUTE', badgeColor:'#f59e0b', status:'In Transit', year:'2023' },
];

const STATS = [
  { icon:'🚀', num:200, suffix:'+', label:'Active Missions' },
  { icon:'🌍', num:65, suffix:'+', label:'Years of Exploration' },
  { icon:'👨‍🚀', num:350, suffix:'+', label:'Astronauts Flown' },
  { icon:'🛰️', num:27, suffix:'K+', label:'Orbits of ISS' },
];

const NEWS = [
  { title:'Webb Telescope Captures New Image of Star Formation', date:'April 25, 2026', excerpt:'The JWST has captured an unprecedented view of a stellar nursery, revealing the complex processes behind star birth.', img:'/nebula.png' },
  { title:'Artemis III Crew Announcement Expected Next Month', date:'April 22, 2026', excerpt:'NASA is preparing to announce the crew that will land on the Moon\'s south pole as part of the Artemis III mission.', img:'/artemis.png' },
  { title:'Record-Breaking Spacewalk Completed on ISS', date:'April 18, 2026', excerpt:'Two astronauts completed a 8-hour spacewalk to upgrade the station\'s solar arrays, setting a new duration record.', img:'/astronaut.png' },
];

const PLANETS = [
  { emoji:'☀️', name:'The Sun', fact:'A massive star at the center of our solar system, powering all life on Earth.', dist:'93M miles', glow:'rgba(251,191,36,0.15)' },
  { emoji:'🪨', name:'Mercury', fact:'The smallest planet, closest to the Sun with extreme temperature swings.', dist:'36M miles', glow:'rgba(148,163,184,0.15)' },
  { emoji:'🌕', name:'Venus', fact:'Earth\'s twin in size but with a toxic atmosphere and 900°F surface.', dist:'67M miles', glow:'rgba(251,191,36,0.1)' },
  { emoji:'🌍', name:'Earth', fact:'The only known planet to harbor life, with liquid water on its surface.', dist:'93M miles', glow:'rgba(96,165,250,0.15)' },
  { emoji:'🔴', name:'Mars', fact:'The Red Planet — target of human exploration with evidence of ancient water.', dist:'142M miles', glow:'rgba(239,68,68,0.15)' },
  { emoji:'🟤', name:'Jupiter', fact:'The largest planet with a Great Red Spot storm larger than Earth.', dist:'484M miles', glow:'rgba(217,119,6,0.15)' },
  { emoji:'💫', name:'Saturn', fact:'Famous for its stunning ring system made of ice and rock particles.', dist:'886M miles', glow:'rgba(251,191,36,0.12)' },
  { emoji:'🔵', name:'Neptune', fact:'An ice giant with the strongest winds in the solar system at 1,200 mph.', dist:'2.8B miles', glow:'rgba(59,130,246,0.15)' },
];

// ===== STARS BACKGROUND =====
function createStars() {
  const container = document.getElementById('stars-bg');
  for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--dur:${2+Math.random()*4}s;animation-delay:${Math.random()*4}s`;
    container.appendChild(star);
  }
}

// ===== HERO SLIDER =====
let currentSlide = 0;
let slideInterval;
let progressInterval;
const SLIDE_DURATION = 6000;

function initSlider() {
  const track = document.getElementById('slider-track');
  const content = document.getElementById('slider-content');
  const dots = document.getElementById('slider-dots');

  track.innerHTML = SLIDES.map((s,i) => `<img src="${s.img}" alt="${s.tag}" class="slide-img ${i===0?'active':''}" />`).join('');
  dots.innerHTML = SLIDES.map((_,i) => `<div class="slider-dot ${i===0?'active':''}" data-i="${i}"></div>`).join('');

  renderSlideContent(0);
  startAutoSlide();

  document.getElementById('slider-prev').addEventListener('click', () => goSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length));
  document.getElementById('slider-next').addEventListener('click', () => goSlide((currentSlide + 1) % SLIDES.length));
  dots.querySelectorAll('.slider-dot').forEach(d => d.addEventListener('click', () => goSlide(Number(d.dataset.i))));
}

function renderSlideContent(i) {
  const s = SLIDES[i];
  const content = document.getElementById('slider-content');
  content.innerHTML = `<div class="slide-info active">
    <div class="slide-tag"><span class="dot"></span> ${s.tag}</div>
    <h1 class="slide-title">${s.title.replace('\n','<br>')}</h1>
    <p class="slide-desc">${s.desc}</p>
    <div class="slide-actions">
      <a href="#missions" class="btn btn-primary">${s.cta}</a>
      <a href="#gallery" class="btn btn-outline">View Gallery →</a>
    </div>
  </div>`;
}

function goSlide(i) {
  if (i === currentSlide) return;
  const track = document.getElementById('slider-track');
  const imgs = track.querySelectorAll('.slide-img');
  imgs[currentSlide].classList.remove('active');
  currentSlide = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  imgs[currentSlide].classList.add('active');

  // Animate content
  const info = document.querySelector('.slide-info');
  if (info) { info.classList.remove('active'); }
  setTimeout(() => renderSlideContent(i), 300);

  // Dots
  document.querySelectorAll('.slider-dot').forEach((d,idx) => d.classList.toggle('active', idx===i));

  // Restart auto
  startAutoSlide();
}

function startAutoSlide() {
  clearInterval(slideInterval);
  clearInterval(progressInterval);
  const bar = document.getElementById('slider-progress');
  let progress = 0;
  bar.style.width = '0%';
  progressInterval = setInterval(() => {
    progress += 100 / (SLIDE_DURATION / 50);
    bar.style.width = Math.min(progress, 100) + '%';
  }, 50);
  slideInterval = setInterval(() => {
    goSlide((currentSlide + 1) % SLIDES.length);
  }, SLIDE_DURATION);
}

// ===== MISSIONS =====
function initMissions() {
  const grid = document.getElementById('missions-grid');
  grid.innerHTML = MISSIONS.map((m,i) => `
    <div class="mission-card reveal reveal-delay-${(i%3)+1}">
      <div class="mission-img">
        <img src="${m.img}" alt="${m.name}" loading="lazy"/>
        <span class="mission-badge" style="background:${m.badgeColor};color:white">${m.badge}</span>
      </div>
      <div class="mission-body">
        <h3 class="mission-name">${m.name}</h3>
        <p class="mission-desc">${m.desc}</p>
        <div class="mission-meta">
          <span>📅 ${m.year}</span>
          <span>📡 ${m.status}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== IMAGE OF THE DAY =====
function initIOTD() {
  const card = document.getElementById('iotd-card');
  card.innerHTML = `
    <div class="iotd-image"><img src="/nebula.png" alt="Stellar Nebula" loading="lazy"/></div>
    <div class="iotd-text">
      <div class="iotd-date">📸 April 27, 2026</div>
      <h3 class="iotd-title">The Pillars of Creation: A New Perspective</h3>
      <p class="iotd-desc">This stunning composite image from the James Webb Space Telescope reveals the iconic Pillars of Creation in unprecedented detail. The near-infrared view cuts through the dusty columns to reveal newly formed stars hidden within, while the mid-infrared data highlights the intricate layers of gas and dust being sculpted by radiation from young, massive stars.</p>
      <a href="#" class="btn btn-outline">Full Resolution ↗</a>
    </div>`;
}

// ===== STATS =====
function initStats() {
  const grid = document.getElementById('stats-grid');
  grid.innerHTML = STATS.map(s => `
    <div class="stat-card reveal">
      <div class="stat-icon">${s.icon}</div>
      <div class="stat-num" data-target="${s.num}" data-suffix="${s.suffix}">0${s.suffix}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    if (el.dataset.counted) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.dataset.counted = 'true';
      const target = Number(el.dataset.target);
      const suffix = el.dataset.suffix;
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + suffix;
      }, 20);
    }
  });
}

// ===== NEWS =====
function initNews() {
  const grid = document.getElementById('news-grid');
  grid.innerHTML = NEWS.map((n,i) => `
    <div class="news-card reveal reveal-delay-${i+1}">
      <div class="news-img"><img src="${n.img}" alt="${n.title}" loading="lazy"/></div>
      <div class="news-body">
        <div class="news-date">${n.date}</div>
        <h3 class="news-title">${n.title}</h3>
        <p class="news-excerpt">${n.excerpt}</p>
        <span class="news-read-more">Read More →</span>
      </div>
    </div>
  `).join('');
}

// ===== PLANETS =====
function initPlanets() {
  const container = document.getElementById('planets-carousel');
  container.innerHTML = PLANETS.map(p => `
    <div class="planet-card" style="--planet-glow:${p.glow}">
      <span class="planet-emoji">${p.emoji}</span>
      <div class="planet-name">${p.name}</div>
      <div class="planet-fact">${p.fact}</div>
      <div class="planet-distance">Distance from Sun: <strong>${p.dist}</strong></div>
    </div>
  `).join('');
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  // Navbar scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 80);
    animateCounters();
    revealElements();
  });

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });
}

function revealElements() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) el.classList.add('visible');
  });
}

// ===== HAMBURGER =====
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  btn.addEventListener('click', () => { links.classList.toggle('open'); });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// ===== NEWSLETTER =====
function initNewsletter() {
  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input.value) {
      input.value = '';
      const btn = e.target.querySelector('button');
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 2500);
    }
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  createStars();
  initSlider();
  initMissions();
  initIOTD();
  initStats();
  initNews();
  initPlanets();
  initScrollEffects();
  initHamburger();
  initNewsletter();
  initSmoothScroll();
  // Initial reveal check
  setTimeout(revealElements, 100);
});
