document.addEventListener('DOMContentLoaded', () => {

    const phone = window.PHONE || '50258453733';

    // Convierte todos los botones en llamada telefónica
    document.querySelectorAll('.whatsapp-link, .nav-cta').forEach(link => {
        link.href = `tel:+${phone}`;
        link.removeAttribute('target');
        link.removeAttribute('rel');
    });

    // Scroll suave para navegación interna
    const header = document.querySelector('.topbar');

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        const href = link.getAttribute('href');

        if (!href || href === '#') return;

        link.addEventListener('click', (e) => {

            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;
            const extraSpace = 20;

            const position =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                extraSpace;

            window.scrollTo({
                top: Math.max(position, 0),
                behavior: 'smooth'
            });

            history.pushState(null, '', href);

        });

    });

    // Corrige posición cuando se abre con #servicios, #pagos, etc.
    if (window.location.hash) {

        setTimeout(() => {

            const target = document.querySelector(window.location.hash);

            if (!target) return;

            const headerHeight = header ? header.offsetHeight : 0;
            const extraSpace = 20;

            const position =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                extraSpace;

            window.scrollTo({
                top: Math.max(position, 0),
                behavior: 'auto'
            });

        }, 100);

    }

    // Efecto visual al hacer scroll
    window.addEventListener('scroll', () => {

        if (window.scrollY > 60) {
            document.body.classList.add('scrolling');
        } else {
            document.body.classList.remove('scrolling');
        }

    });

    // Animación de aparición suave
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll(
        '.service-card, .image-panel, .copy-panel, .section-head, .payment-section, .cta-final'
    ).forEach(el => {
        observer.observe(el);
    });

    // Precarga de imágenes para una carga más fluida
    document.querySelectorAll('img').forEach(img => {

        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }

    });

});