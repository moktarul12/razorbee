(function () {
  const raw = (location.pathname.replace(/\/+$/, "") || "/").replace(/\.html$/, "");
  const page = raw === "/" ? "index" : raw.split("/").pop();

  const items = [
    { href: "/services", id: "services", label: "Services" },
    { href: "/clients", id: "clients", label: "Clients" },
    { href: "/about", id: "about", label: "About" },
    { href: "/contact", id: "contact", label: "Contact" },
  ];

  const active = (id) => (page === id ? " active" : "");

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <div class="nav-inner">
        <a class="brand" href="/" aria-label="Razorbee home">
          <img src="/assets/logo-white.png" alt="Razorbee" width="200" height="60">
        </a>
        <nav class="nav-links" id="nav" aria-label="Primary">
          ${items.map((i) => `<a href="${i.href}" class="${active(i.id).trim()}">${i.label}</a>`).join("")}
        </nav>
        <a href="/contact" class="btn btn-solid hide-sm">Start a brief</a>
        <button class="menu-btn" id="menuBtn" aria-label="Menu" type="button">☰</button>
      </div>`;
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="wrap">
        <div class="foot-grid">
          <div>
            <a class="brand" href="/"><img src="/assets/logo-white.png" alt="Razorbee" width="180" height="54"></a>
            <p>Global software company — mobile, DevOps, consulting, crypto. Excellent · Innovative · Elegant.</p>
            <p class="foot-addr"><strong style="color:#c5cad6;font-weight:600">Registered office</strong><br>Kolkata, West Bengal, India</p>
            <p class="foot-addr"><strong style="color:#c5cad6;font-weight:600">Studio</strong><br>#415 KHB Colony, Koramangala 5th Block<br>Bangalore 560095, Karnataka</p>
            <p class="foot-addr"><a href="mailto:anam@razorbee.com">anam@razorbee.com</a></p>
          </div>
          <div class="col">
            <h4>Services</h4>
            <a href="/services#mobile">Mobile apps</a>
            <a href="/services#devops">DevOps</a>
            <a href="/services#consulting">Software consulting</a>
            <a href="/services#crypto">Cryptocurrency</a>
          </div>
          <div class="col">
            <h4>Company</h4>
            <a href="/clients">Clients</a>
            <a href="/clients#testimonials">Testimonials</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
          <div class="col">
            <h4>Global</h4>
            <a href="/about">Kolkata · Bangalore</a>
            <a href="/clients">Sydney · Singapore</a>
            <a href="/clients">Dubai · London · NY</a>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© <span id="year"></span> Razorbee Online Solutions Pvt Ltd</span>
          <span>Global · Kolkata · Bangalore</span>
        </div>
      </div>`;
  }

  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", () => nav.classList.toggle("open"));
  }

  window.addEventListener(
    "scroll",
    () => {
      if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
    },
    { passive: true }
  );

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      if (["localhost", "127.0.0.1"].includes(location.hostname) || location.protocol === "file:") {
        e.preventDefault();
        alert("Thanks — message preview only on local. Email anam@razorbee.com to reach us.");
        form.reset();
      }
    });
  }
})();
