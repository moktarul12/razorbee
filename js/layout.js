(function () {
  const file = (location.pathname.split("/").pop() || "index.html") || "index.html";
  const page = file === "" ? "index.html" : file;

  const items = [
    { href: "index.html", label: "Home", id: "home" },
    { href: "software.html", label: "Software", id: "software" },
    { href: "ai.html", label: "AI & ML", id: "ai" },
    { href: "products.html", label: "Products", id: "products" },
    { href: "clients.html", label: "Clients", id: "clients" },
    { href: "about.html", label: "About", id: "about" },
    { href: "contact.html", label: "Contact", id: "contact" },
  ];

  const active = (href) => (page === href ? " active" : "");

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <div class="nav-inner">
        <a class="brand" href="index.html" aria-label="Razorbee home">
          <img src="assets/logo.svg" alt="Razorbee" width="200" height="42">
        </a>
        <nav class="nav-links" id="nav" aria-label="Primary">
          ${items.map((i) => `<a href="${i.href}" class="${active(i.href).trim()}">${i.label}</a>`).join("")}
        </nav>
        <a href="contact.html" class="btn btn-solid hide-sm">Start a project</a>
        <button class="menu-btn" id="menuBtn" aria-label="Menu" type="button">☰</button>
      </div>`;
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="wrap">
        <div class="foot-grid">
          <div>
            <a class="brand" href="index.html"><img src="assets/logo-light.svg" alt="Razorbee" width="180" height="38"></a>
            <p>Razorbee Online Solutions Pvt Ltd — software development, AI/ML, and products. Excellent · Innovative · Elegant.</p>
          </div>
          <div class="col">
            <h4>Services</h4>
            <a href="software.html">Software development</a>
            <a href="ai.html">AI &amp; machine learning</a>
            <a href="products.html">Products</a>
          </div>
          <div class="col">
            <h4>Company</h4>
            <a href="clients.html">Clients</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="col">
            <h4>Featured</h4>
            <a href="clients.html#capitcap">CapItCap</a>
            <a href="https://capitcap.com/" target="_blank" rel="noopener">capitcap.com</a>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© <span id="year"></span> Razorbee Online Solutions Pvt Ltd</span>
          <span>Bangalore, India</span>
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
        alert("Thanks — on Netlify this form will send. Local preview only.");
        form.reset();
      }
    });
  }
})();
