/* Razorbee site interactions */
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');

const onScroll = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
  });
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

const y = document.getElementById('y');
if (y) y.textContent = String(new Date().getFullYear());

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    // Allow Netlify native handling when hosted; for local preview show confirm
    if (!window.location.hostname.includes('netlify') && window.location.protocol === 'file:') {
      e.preventDefault();
      alert('Thanks — your message is ready. Deploy on Netlify to enable form delivery.');
      form.reset();
      return;
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      e.preventDefault();
      alert('Thanks! We will get back to you shortly. (Local preview — form posts on Netlify.)');
      form.reset();
    }
  });
}
