/* ================================================================
   SELENA GUPTA — PORTFOLIO  |  main.js
   ================================================================ */

'use strict';

// ── Year in footer ─────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Sticky header ──────────────────────────────────────────────
const header = document.getElementById('header');

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveSection();
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile nav toggle ──────────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ── Active section highlight ───────────────────────────────────
function highlightActiveSection() {
  const sections = document.querySelectorAll('main section[id]');
  const links    = navLinks.querySelectorAll('a');
  let currentId  = '';

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) currentId = section.id;
  });

  links.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${currentId}`
    );
  });
}

// ── Intersection Observer — fade-in ───────────────────────────
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.about-grid, .skill-category, .project-card, .timeline-item, .contact-form, .contact-links'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ── Contact form ───────────────────────────────────────────────
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  // Basic client-side validation
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate sending (replace with real endpoint / EmailJS / Formspree, etc.)
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  await new Promise(r => setTimeout(r, 1200));

  form.reset();
  btn.disabled = false;
  btn.textContent = 'Send Message';
  showStatus('Message sent! I\'ll get back to you soon. 🎉', 'success');
});

function showStatus(msg, type) {
  status.textContent = msg;
  status.className   = `form-status ${type}`;
  setTimeout(() => {
    status.textContent = '';
    status.className   = 'form-status';
  }, 5000);
}
