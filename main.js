document.addEventListener('DOMContentLoaded', () => {
  // ====== NAVBAR: Sticky y Hamburguesa ======
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    // Hide/show header al hacer scroll
    if (current > lastScroll && current > 100) header.classList.add('hidden');
    else header.classList.remove('hidden');
    // Scrolled state para fondo opaco
    header.classList.toggle('scrolled', current > 50);
    lastScroll = current;
  });

  // Hamburguesa para menú móvil
  const toggleBtn = document.getElementById('hamburger-toggle');
  const navList = document.querySelector('.main-nav ul');
  if (toggleBtn && navList) {
    toggleBtn.addEventListener('click', () => {
      navList.classList.toggle('open');
      toggleBtn.classList.toggle('open');
    });
    // Cierra menú al dar clic en un enlace
    navList.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navList.classList.remove('open');
        toggleBtn.classList.remove('open');
      })
    );
  }

  // ====== TYPEWRITER EFFECT EN HERO (Opcional, remueve si no lo necesitas) ======
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) typeWriterEffect(heroTitle, 'Textilera Fleece', 100);

  // ====== PARTICLES EN MAIN CONTENT (NO EN HERO NI FOOTER) ======
  const particlesBg = document.getElementById('particles-js');
  if (particlesBg) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 700 } },
        color: { value: '#c8a970' },
        shape: { type: ['circle','edge'], stroke: { width: 0, color: '#000' } },
        opacity: {
          value: 0.5,
          anim: { enable: true, speed: 0.4, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 4,
          random: true,
          anim: { enable: true, speed: 3, size_min: 1, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 100,
          color: '#c8a970',
          opacity: 0.25,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          random: true,
          straight: false,
          out_mode: 'out',
          attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' }
        },
        modes: {
          grab: { distance: 150, line_linked: { opacity: 0.35 } }
        }
      },
      retina_detect: true
    });
  }

  // ====== ANIMACIÓN SCROLL-REVEAL PARA TARJETAS E ICONOS ======
  const aboutCards = document.querySelectorAll('.about-card');
  function revealOnScroll() {
    aboutCards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        setTimeout(() => {
          card.classList.add('visible');
        }, idx * 120);
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Ejecuta por si ya están en pantalla
});

// ====== TYPEWRITER EFFECT (puedes eliminar si no lo necesitas) ======
function typeWriterEffect(element, text, speed = 80) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
