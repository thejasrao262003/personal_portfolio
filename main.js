/* ============================================================
   THEJAS RAO PORTFOLIO — main.js
   Shared JavaScript: Wave Canvas, Typing, Menu, Cursor,
   Scroll Progress, Parallax, Journey Milestones, Live Clock
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   1. CUSTOM CURSOR
───────────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let mx = -100, my = -100;
  let cx = -100, cy = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

  // Hover expansion on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .project-card, .work-card, .bento-card, .milestone-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    cx = lerp(cx, mx, 0.12);
    cy = lerp(cy, my, 0.12);
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    raf = requestAnimationFrame(animate);
  }
  animate();
})();


/* ─────────────────────────────────────────────
   2. SCROLL PROGRESS BAR
───────────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
})();



/* ─────────────────────────────────────────────
   4. TYPING / TYPEWRITER EFFECT
───────────────────────────────────────────── */
function initTyping(targetId, strings, prefix = '') {
  const el = document.getElementById(targetId);
  if (!el) return;

  let i = 0, j = 0, deleting = false, paused = false;
  const speed = { type: 55, delete: 30, pause: 1600 };

  function tick() {
    const current = strings[i];

    if (!deleting) {
      el.textContent = prefix + current.slice(0, j + 1);
      j++;
      if (j === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; tick(); }, speed.pause);
        return;
      }
    } else {
      el.textContent = prefix + current.slice(0, j - 1);
      j--;
      if (j === 0) {
        deleting = false;
        i = (i + 1) % strings.length;
      }
    }

    const nextDelay = deleting ? speed.delete : speed.type + (Math.random() * 20 - 10);
    if (!paused) setTimeout(tick, nextDelay);
  }

  tick();
}


/* ─────────────────────────────────────────────
   5. FULL-SCREEN MENU OVERLAY → PUSH SIDEBAR
───────────────────────────────────────────── */
(function initMenu() {
  const overlay = document.getElementById('menu-overlay');
  const btn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('menu-close');
  const siteOv = document.getElementById('site-overlay');
  if (!overlay || !btn) return;

  function open() {
    overlay.classList.add('open');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () =>
    overlay.classList.contains('open') ? close() : open()
  );
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (siteOv) siteOv.addEventListener('click', close);

  // Intercept main navigation links for "push" exit animation
  overlay.querySelectorAll('.menu-links a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      // Skip if it's the current page or an anchor
      if (!href || href.startsWith('#')) {
        close();
        return;
      }

      e.preventDefault();
      document.body.classList.add('menu-exiting');

      // Wait for the CSS transition (0.6s) then navigate
      setTimeout(() => {
        window.location.href = href;
      }, 500); // 500ms feels snappy while still showing the animation
    });
  });

  // Regular close for social links
  overlay.querySelectorAll('.menu-socials a').forEach(a => {
    a.addEventListener('click', close);
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();


/* ─────────────────────────────────────────────
   6. INTERSECTION OBSERVER — SCROLL REVEAL
───────────────────────────────────────────── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal, .work-card');
  if (!items.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => obs.observe(item));
})();


/* ─────────────────────────────────────────────
   7. PROJECT SECTION — JS-DRIVEN STICKY + SINGLE CARD FLIP
─────────────────────────────────────────────
   One card in the DOM. JS rotates it to -90° (edge-on, invisible),
   swaps content at that midpoint, then continues to 0° — creating
   the illusion of flipping the SAME card front to back.
   Fully stateless logic computes the active side purely from scroll percentage.
───────────────────────────────────────────── */
(function initProjectScroll() {
  const section = document.getElementById('proj-section');
  const sticky = section && section.querySelector('.proj-sticky');
  if (!section || !sticky) return;

  // Single card DOM refs
  const card = document.getElementById('proj-card');
  const imgEl = document.getElementById('proj-card-image');
  const titleEl = document.getElementById('proj-card-title');
  const descEl = document.getElementById('proj-card-desc');
  const tagsEl = document.getElementById('proj-card-tags');
  const track = document.getElementById('proj-marquee-track');
  if (!card) return;

  // All project data in JS
  const PROJECTS = [
    {
      grad: 'grad-kantara',
      title: 'Kantara Contest Backend',
      desc: '',
      link: 'https://www.kantara.world/',
      tags: ['EC2', 'API Gateway', 'MySQL', 'Locust'],
      marquee: 'KANTARA \u00a0\u00a0 SCALE \u00a0\u00a0 KANTARA \u00a0\u00a0 SCALE \u00a0\u00a0 KANTARA \u00a0\u00a0 '
    },
    {
      grad: 'grad-agri',
      title: 'AgriPredict V2',
      desc: '',
      link: 'https://agri-predict-v2-frontend.vercel.app/',
      tags: ['LangGraph', 'AWS', 'FastAPI', 'Event-driven'],
      marquee: 'AGRIPREDICT \u00a0\u00a0 AGRIPREDICT \u00a0\u00a0 AGRIPREDICT \u00a0\u00a0 AGRIPREDICT \u00a0\u00a0 '
    },
    {
      grad: 'grad-mcp',
      title: 'MCP Server & Agentic EC2 Automation',
      desc: '',
      link: 'https://github.com/thejasrao262003/AWS_MCP',
      tags: ['Python', 'FastMCP', 'Boto3', 'GitHub Copilot'],
      marquee: 'MCP \u00a0\u00a0 AGENTIC \u00a0\u00a0 MCP \u00a0\u00a0 AGENTIC \u00a0\u00a0 MCP \u00a0\u00a0 AGENTIC \u00a0\u00a0 '
    },
    {
      grad: 'grad-alister',
      title: 'A-Lister — Amazon Listing Automation',
      desc: '',
      link: 'https://alister.alaiy.com/',
      tags: ['AWS Lambda', 'SQS', 'ECS', 'MongoDB'],
      marquee: 'A-LISTER \u00a0\u00a0 AUTOMATION \u00a0\u00a0 A-LISTER \u00a0\u00a0 AUTOMATION \u00a0\u00a0 '
    },
    {
      grad: 'grad-narratron',
      title: 'Narratron',
      desc: 'Built a fully serverless pipeline that autonomously generates complete YouTube Shorts every 48 hrs, finishing script → TTS → video render in <5 mins.',
      link: 'https://github.com/thejasrao262003/narratron-deployment',
      tags: ['FastAPI', 'Modal serverless', 'AWS lambda', 'AWS S3', 'MongoDB'],
      marquee: 'NARRATRON \u00a0\u00a0 SERVERLESS \u00a0\u00a0 NARRATRON \u00a0\u00a0 SERVERLESS \u00a0\u00a0 '
    }
  ];

  const COUNT = PROJECTS.length;
  let lastLoadedIdx = -1;

  // Add click listener to open the currently loaded project link
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    if (lastLoadedIdx >= 0 && PROJECTS[lastLoadedIdx].link) {
      window.open(PROJECTS[lastLoadedIdx].link, '_blank');
    }
  });

  function loadProject(idx) {
    if (idx === lastLoadedIdx) return; // Prevent unnecessary DOM work
    const p = PROJECTS[idx];

    // Swap gradient class for placeholder
    imgEl.className = 'proj-card-image ' + p.grad;

    // Update text
    titleEl.textContent = p.title;

    if (descEl) {
      if (p.desc) {
        descEl.textContent = p.desc;
        descEl.style.display = 'block';
      } else {
        descEl.style.display = 'none';
      }
    }

    tagsEl.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');

    // Update marquee
    if (track) {
      track.textContent = p.marquee + p.marquee;
      track.style.animation = 'none';
      requestAnimationFrame(() => { track.style.animation = ''; });
    }

    // Update DOM counter text safely
    const counterEl = document.getElementById('proj-current');
    if (counterEl) counterEl.textContent = (idx + 1);

    lastLoadedIdx = idx;
  }

  // Init with first project
  loadProject(0);

  function update() {
    const rect = section.getBoundingClientRect();
    const sectionH = section.offsetHeight;
    const vh = window.innerHeight;
    const scrollTop = window.scrollY || window.pageYOffset;

    // ── JS Sticky pinning ──────────────────────────────────
    const sectionTop = scrollTop + rect.top;
    const sectionBot = sectionTop + sectionH;

    if (scrollTop < sectionTop) {
      sticky.classList.remove('is-fixed', 'is-bottom');
      sticky.style.top = '0';
    } else if (scrollTop + vh > sectionBot) {
      sticky.classList.remove('is-fixed');
      sticky.classList.add('is-bottom');
      sticky.style.top = '';
    } else {
      sticky.classList.add('is-fixed');
      sticky.classList.remove('is-bottom');
      sticky.style.top = '0';
    }

    // ── Single-card X-axis flip (Stateless) ────────────────
    const total = sectionH - vh;
    if (total <= 0) return;
    const scrolled = Math.max(0, Math.min(scrollTop - sectionTop, total));
    const progress = scrolled / total;   // 0 → 1

    const rawSlot = progress * COUNT;
    let currentSlot = Math.floor(rawSlot);
    let localT = rawSlot - currentSlot;

    // Handle exact end of scroll (progress = 1.0)
    if (currentSlot >= COUNT) {
      currentSlot = COUNT - 1;
      localT = 1;
    }

    // Thresholds: spread the flip across the entire scroll slice for continuous smooth feeling
    const FLIP_START = 0.05;
    const MID = 0.50;
    const FLIP_END = 0.95;

    let angle = 0;
    let projectIdx = currentSlot;

    if (currentSlot < COUNT - 1) {
      if (localT < FLIP_START) {
        // Slight deadzone at top so user can see it flat for a moment
        angle = 0;
        projectIdx = currentSlot;
      } else if (localT < MID) {
        // Flipping out: reversed 0 -> 90
        const t = (localT - FLIP_START) / (MID - FLIP_START);
        angle = (t * 90);
        projectIdx = currentSlot;
      } else if (localT < FLIP_END) {
        // Flipping in: reversed -90 -> 0 
        const t = (localT - MID) / (FLIP_END - MID);
        angle = -90 + (t * 90);
        projectIdx = currentSlot + 1;
      } else {
        // Flat before next transition
        angle = 0;
        projectIdx = currentSlot + 1;
      }
    } else {
      // Last card slot
      angle = 0;
      projectIdx = COUNT - 1;
    }

    // Load project safely (checks against lastLoadedIdx internally)
    loadProject(projectIdx);

    card.style.transform = `perspective(1200px) rotateX(${angle}deg)`;
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();





/* ─────────────────────────────────────────────
   8. SCROLL JOURNEY — ALTERNATING TIMELINE
───────────────────────────────────────────── */
(function initScrollJourney() {
  const track = document.getElementById('journey-track');
  const progressLine = document.getElementById('journey-progress');
  if (!track || !progressLine) return;

  const items = track.querySelectorAll('.tl-item');
  const checkpoints = track.querySelectorAll('.tl-checkpoint');

  function update() {
    const trackRect = track.getBoundingClientRect();
    const vh = window.innerHeight;

    // We want the line to grow as the track scrolled past the middle of the screen
    // The "active" point on screen is vertically at 50% of viewport
    const triggerY = vh * 0.5;

    // How far down the track is the active trigger point?
    const progressPx = triggerY - trackRect.top;

    if (progressPx < 0) {
      // Not yet reached the top of track
      progressLine.style.height = '0%';
    } else if (progressPx > trackRect.height) {
      // Scrolled past the track
      progressLine.style.height = '100%';
    } else {
      // Inside the track
      const percentage = (progressPx / trackRect.height) * 100;
      progressLine.style.height = percentage + '%';
    }

    // Toggle checkpoints active state based on whether they are above the trigger point
    checkpoints.forEach((dot, index) => {
      // Using the parent .tl-item to determine position
      const itemRect = items[index].getBoundingClientRect();
      // Center of the item
      const itemCenterY = itemRect.top + (itemRect.height / 2);

      if (itemCenterY < triggerY) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();


/* ─────────────────────────────────────────────
   8.5. SCROLL HIGHLIGHT QUOTE
───────────────────────────────────────────── */
(function initScrollQuote() {
  const quoteSection = document.getElementById('quote-section');
  const quoteText = document.getElementById('quote-text');
  if (!quoteSection || !quoteText) return;

  // Split text into words and wrap in spans
  const textContent = quoteText.innerText;
  const words = textContent.split(' ');
  quoteText.innerHTML = '';

  words.forEach(word => {
    const span = document.createElement('span');
    span.className = 'quote-word';
    span.innerText = word + ' ';
    quoteText.appendChild(span);
  });

  const wordSpans = quoteText.querySelectorAll('.quote-word');

  function update() {
    const rect = quoteSection.getBoundingClientRect();
    const vh = window.innerHeight;

    // We want the effect to start when the top of the section enters the bottom of the viewport
    // and end when the bottom of the section leaves the top of the viewport
    const startY = vh;
    const endY = -(rect.height * 0.5); // finish when section is mostly scrolled past

    let progress = (startY - rect.top) / (startY - endY);
    progress = Math.max(0, Math.min(1, progress));

    const revealCount = Math.floor(progress * wordSpans.length * 1.5);

    wordSpans.forEach((span, index) => {
      if (index < revealCount) {
        span.style.opacity = '1';
      } else {
        span.style.opacity = '0.15';
      }
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();


/* ─────────────────────────────────────────────
   9. LIVE CLOCK (IST)
───────────────────────────────────────────── */
(function initClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function tick() {
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const h = String(ist.getHours()).padStart(2, '0');
    const m = String(ist.getMinutes()).padStart(2, '0');
    const s = String(ist.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;
  }
  tick();
  setInterval(tick, 1000);
})();


/* ─────────────────────────────────────────────
   10. ANIMATED COUNTER (stats)
───────────────────────────────────────────── */
function animateCounter(el, target, suffix = '', duration = 1600) {
  const start = performance.now();
  const startVal = 0;

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(startVal + (target - startVal) * eased);
    el.textContent = value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();


/* ─────────────────────────────────────────────
   11. SMOOTH HERO PARALLAX ON SCROLL
───────────────────────────────────────────── */
(function initHeroParallax() {
  if (window.innerWidth <= 768) return;
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroContent.style.transform = `translateY(${y * 0.12}px)`;
  }, { passive: true });
})();


/* ─────────────────────────────────────────────
   12. WORK CARD STAGGER
───────────────────────────────────────────── */
(function initWorkCardStagger() {
  const cards = document.querySelectorAll('.work-card');
  cards.forEach((c, i) => {
    c.style.transitionDelay = (i * 0.07) + 's';
  });
})();


/* ─────────────────────────────────────────────
   13. INIT PAGE-SPECIFIC FEATURES
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Home page typing
  initTyping('typed-role', [
    'Backend Developer',
    'Software Engineer',
    'Systems Enthusiast',
    'Cloud & Automation Builder',
    'Always Learning'
  ]);

  // Work page typing
  initTyping('typed-work', [
    'Backend Engineering',
    'Cloud Infrastructure',
    'Automation Platforms',
    'Distributed Systems',
  ]);

  // About page typing
  initTyping('typed-about', [
    'Curious Builder',
    'Backend Engineer',
    'Hackathon Winner',
    'Systems Learner'
  ]);
});
