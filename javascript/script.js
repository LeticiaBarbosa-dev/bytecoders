/* 1. DARK / LIGHT TOGGLE */
const html = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('bc-theme', theme);
  if (theme === 'dark') {
    themeIcon.textContent = '☀';
    themeLabel.textContent = 'light';
  } else {
    themeIcon.textContent = '☾';
    themeLabel.textContent = 'dark';
  }
}

const saved = localStorage.getItem('bc-theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(saved);

toggleBtn.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* 2. CURSOR PERSONALIZADO */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function loop() {
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button, .service-card, .why-item').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('expand'));
  el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
});

/* 3. SCROLL REVEAL */
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 90);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* 4. EFEITO DE DIGITAÇÃO */
const phrases = ['sites profissionais.', 'sistemas e APIs.', 'apps mobile.', 'automações inteligentes.', 'código de qualidade.'];
const heroP = document.getElementById('heroP');
heroP.innerHTML = 'Transformamos sua ideia em <span id="typed"></span><span class="typed-cursor"></span>';
const typedEl = document.getElementById('typed');
let pi = 0, ci = 0, del = false;
function type() {
  const w = phrases[pi];
  typedEl.textContent = del ? w.slice(0, --ci) : w.slice(0, ++ci);
  if (!del && ci === w.length) { del = true; setTimeout(type, 1800); return; }
  if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, del ? 42 : 88);
}
setTimeout(type, 900);

/* 5. NAV ATIVA */
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => navObs.observe(s));

/* 6. SOMBRA NAV */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 8 ? 'var(--shadow-nav)' : 'none';
}, { passive: true });