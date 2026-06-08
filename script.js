document.addEventListener('DOMContentLoaded', () => {
  const phone = window.PHONE || '50258453733';

  // Botones de contacto: llamada directa, no WhatsApp
  document.querySelectorAll('.whatsapp-link, .nav-cta').forEach(link => {
    link.href = `tel:+${phone}`;
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });
});

// Scroll corregido para submenús: deja cada sección exactamente debajo del header
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.topbar');

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    link.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const extraSpace = 18;

      const top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        extraSpace;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: 'smooth'
      });

      history.pushState(null, '', href);
    });
  });

  // Corrige si la página abre con un #servicios, #pagos, etc.
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (!target) return;

      const headerHeight = header ? header.offsetHeight : 0;
      const extraSpace = 18;

      const top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        extraSpace;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: 'auto'
      });
    }, 80);
  }
});