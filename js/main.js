/* ============================================================
   DEATHANDDIALS — Main JS
   ============================================================ */

// ── Theme toggle ──────────────────────────────────────────
(function () {
  const html = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  function updateIcon() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark'
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
  updateIcon();
  toggle && toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', theme);
    updateIcon();
  });
})();

// ── Scroll nav ────────────────────────────────────────────
(function () {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Active nav link ───────────────────────────────────────
(function () {
  const links = document.querySelectorAll('.site-nav__links a, .mobile-menu__links a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Mobile menu ───────────────────────────────────────────
(function () {
  const open  = document.querySelector('[data-menu-open]');
  const close = document.querySelector('[data-menu-close]');
  const menu  = document.querySelector('.mobile-menu');
  if (!open || !menu) return;
  open.addEventListener('click',  () => { menu.classList.add('open');    document.body.style.overflow = 'hidden'; });
  close && close.addEventListener('click', () => { menu.classList.remove('open'); document.body.style.overflow = ''; });
})();

// ── FAQ accordion ─────────────────────────────────────────
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ── Scroll-reveal ─────────────────────────────────────────
(function () {
  if (!('IntersectionObserver' in window)) return;
  const els = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
})();

// ── Filter bar (inventory) ────────────────────────────────
(function () {
  const filters = document.querySelectorAll('[data-filter]');
  if (!filters.length) return;
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-filter-group]');
      if (group) group.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();
