// FireWave — shared site header
// Usage: <script src="/header.js"></script> anywhere in <body>
// Injects the logo + nav bar at the very top of the page.

(function () {
  const CSS = `
    .fw-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 300;
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 0 24px;
      height: 52px;
      background: rgba(10,8,6,.93);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid #3d3225;
      box-shadow: 0 2px 20px rgba(0,0,0,.5);
    }
    .fw-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .fw-logo-ship {
      font-size: 1.2rem;
      filter: drop-shadow(0 0 6px rgba(240,184,64,.5));
    }
    .fw-logo-text {
      font-family: 'Uncial Antiqua', Georgia, serif;
      font-size: .95rem;
      color: #f0b840;
      letter-spacing: .06em;
      text-shadow: 0 0 14px rgba(240,184,64,.35);
      white-space: nowrap;
    }
    .fw-logo-sub {
      font-family: 'Share Tech Mono', monospace;
      font-size: .55rem;
      color: #7a6a50;
      letter-spacing: .14em;
      display: block;
      margin-top: -2px;
    }
    .fw-divider {
      width: 1px;
      height: 24px;
      background: #3d3225;
      flex-shrink: 0;
    }
    .fw-nav {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      overflow: hidden;
      max-height: 52px;
    }
    .fw-nav a {
      color: #7a6a50;
      text-decoration: none;
      font-family: 'Share Tech Mono', monospace;
      font-size: .62rem;
      letter-spacing: .1em;
      padding: 4px 10px;
      border: 1px solid #3d3225;
      border-radius: 3px;
      transition: all .2s;
      white-space: nowrap;
    }
    .fw-nav a:hover {
      color: #f0b840;
      border-color: #7a5518;
      background: rgba(200,146,42,.08);
    }
    .fw-nav a.fw-active {
      color: #f0b840;
      border-color: #c8922a;
    }
    /* Push page content down so it doesn't hide under the fixed bar */
    .fw-spacer {
      height: 52px;
      display: block;
    }
    @media (max-width: 600px) {
      .fw-nav { display: none; }
    }
  `;

  const NAV_LINKS = [
    { href: '/',            label: '⚓ Home'       },
    { href: '/search.html', label: '🔍 Search'     },
  ];

  function inject () {
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Build header
    const header = document.createElement('header');
    header.className = 'fw-header';

    // Logo
    const logo = document.createElement('a');
    logo.className = 'fw-logo';
    logo.href = '/';
    logo.innerHTML = `
      <span class="fw-logo-ship">🏴‍☠️</span>
      <span>
        <span class="fw-logo-text">FireWave</span>
        <span class="fw-logo-sub">JUT RESULTS</span>
      </span>`;
    header.appendChild(logo);

    // Divider
    const div = document.createElement('span');
    div.className = 'fw-divider';
    header.appendChild(div);

    // Nav
    const nav = document.createElement('nav');
    nav.className = 'fw-nav';
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    NAV_LINKS.forEach(({ href, label }) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      const linkPath = href.replace(/\/$/, '') || '/';
      if (currentPath === linkPath) a.classList.add('fw-active');
      nav.appendChild(a);
    });
    header.appendChild(nav);

    // Insert header + spacer at top of body
    const spacer = document.createElement('span');
    spacer.className = 'fw-spacer';
    document.body.insertBefore(spacer, document.body.firstChild);
    document.body.insertBefore(header, document.body.firstChild);
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
