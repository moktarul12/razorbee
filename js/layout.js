/* Shared header/footer inject + interactions */
(function () {
  const path = (location.pathname.split('/').pop() || 'index.html').replace(/^\//, '') || 'index.html';
  const page = path === '' || path === '/' ? 'index.html' : path;

  const links = [
    { href: 'index.html', id: 'home', label: 'Studio', hint: 'Home' },
    { href: 'software.html', id: 'software', label: 'Engineering', hint: 'Software' },
    { href: 'ai.html', id: 'ai', label: 'Intelligence', hint: 'AI & ML' },
    { href: 'products.html', id: 'products', label: 'Products', hint: 'Platforms' },
    { href: 'clients.html', id: 'clients', label: 'Clients', hint: 'CapItCap &' },
    { href: 'about.html', id: 'about', label: 'Company', hint: 'About' },
    { href: 'contact.html', id: 'contact', label: 'Contact', hint: 'Talk' },
  ];

  function isActive(href) {
    if (page === href) return true;
    if (page === 'index.html' && href === 'index.html') return true;
    return false;
  }

  const headerMount = document.getElementById('site-header');
  if (headerMount) {
    headerMount.innerHTML = `
      <div class="container nav-row">
        <a href="index.html" class="logo" aria-label="Razorbee home">
          <img src="assets/logo.svg" alt="Razorbee" class="logo-img logo-svg" width="200" height="44"
               onerror="this.style.display='none';this.nextElementSibling.style.display='inline-flex'">
          <span class="logo-fallback" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="36" height="36"><path d="M12 8a14 14 0 0 0 0 24" stroke="#1d6fd8" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M16 11a10 10 0 0 0 0 18" stroke="#1db954" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M20 14a6 6 0 0 0 0 12" stroke="#e4283a" stroke-width="4" fill="none" stroke-linecap="round"/></svg>
            <span class="logo-word"><b>RAZOR</b><em>BEE</em></span>
          </span>
        </a>
        <nav class="nav" id="nav" aria-label="Primary">
          ${links
            .map(
              (l) =>
                `<a href="${l.href}" class="nav-link${isActive(l.href) ? ' is-active' : ''}" data-hint="${l.hint}"><span>${l.label}</span></a>`
            )
            .join('')}
        </nav>
        <a href="contact.html" class="btn btn-red desktop-only">Start a project <i class="fas fa-arrow-right"></i></a>
        <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false">
          <i class="fas fa-bars"></i>
        </button>
      </div>`;
  }

  const footerMount = document.getElementById('site-footer');
  if (footerMount) {
    footerMount.innerHTML = `
      <div class="container">
        <div class="foot-top">
          <div class="foot-brand">
            <img src="assets/logo.svg" alt="Razorbee" class="logo-img logo-svg" width="170" height="38">
            <p>Razorbee Online Solutions — software engineering, AI/ML, and products with an edge. Excellent · Innovative · Elegant.</p>
          </div>
          <div class="foot-cols">
            <div>
              <h4>Practice</h4>
              <a href="software.html">Engineering</a>
              <a href="ai.html">Intelligence</a>
              <a href="products.html">Products</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="clients.html">Clients</a>
              <a href="about.html">About</a>
              <a href="contact.html">Contact</a>
            </div>
            <div>
              <h4>Spotlight</h4>
              <a href="clients.html#capitcap">CapItCap</a>
              <a href="https://capitcap.com/" target="_blank" rel="noopener">capitcap.com</a>
              <a href="contact.html">Work with us</a>
            </div>
          </div>
        </div>
        <div class="foot-copy">
          <span>&copy; <span id="y"></span> Razorbee Online Solutions Pvt Ltd · Bangalore</span>
          <span>Software · AI · Products</span>
        </div>
      </div>`;
  }

  const header = document.getElementById('site-header');
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 16);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
    });
  }

  const y = document.getElementById('y');
  if (y) y.textContent = String(new Date().getFullYear());

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
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        let t0 = null;
        const dur = 1400;
        const step = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min(1, (ts - t0) / dur);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    io.observe(el);
  });

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:') {
        e.preventDefault();
        alert('Thanks! On Netlify this form delivers to the inbox. Local preview only.');
        form.reset();
      }
    });
  }
})();
