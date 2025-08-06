/*!
 * main_clean.js – versión depurada (06‑ago‑2025)
 * — Se consolidaron múltiples listeners DOMContentLoaded en uno solo.
 * — Se eliminaron comentarios duplicados y se unificaron funciones de máquina de escribir.
 * — Los listeners de scroll usan la opción { passive:true } para mejor rendimiento.
 * — No se alteró la lógica ni los selectores: sólo se redujo código repetido.
 */

/* ===================== HELPER: TYPEWRITER ===================== */
function typeWriter(el, text, speed = 40, cb) {
  if (!el || !text) return;
  el.textContent = "";
  let i = 0;
  (function escribir() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(escribir, speed);
    } else if (cb) {
      cb();
    }
  })();
}

/* ===================== ANIMATE ON SCROLL ===================== */
function animateOnScroll() {
  const grupos = [
    ['.section-animate',       120],
    ['.ventaja-card',          140],
    ['.servicio-card',         130],
    ['.producto-circulo',       90],
    ['.industria-circulo',      90]
  ];

  grupos.forEach(([selector, delay]) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) {
        setTimeout(() => el.classList.add('visible'), i * delay);
      }
    });
  });

  document.querySelectorAll('.productos-frase-mas').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

/* ===================== NAVBAR SCROLL SHADOW ===================== */
function headerShadow() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const sombra = window.scrollY > 10
    ? '0 4px 22px -8px #2196f342'
    : '0 2px 16px -10px #2196f326';
  header.style.boxShadow  = sombra;
  header.style.background = 'linear-gradient(90deg, #fafdff 60%, #ffe59f 100%)';
}

/* ===================== SCROLLSPY (nav activo) ===================== */
function scrollSpy() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.site-nav .nav-link');
  const scrollY   = window.pageYOffset + 100;

  sections.forEach(sec => {
    const top = sec.offsetTop,
          end = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < end) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector('.site-nav .nav-link[href="#' + sec.id + '"]');
      if (link) link.classList.add('active');
    }
  });
}

/* ===================== FORM FADE‑IN ===================== */
function contactoFade() {
  document
    .querySelectorAll('.contacto-form input, .contacto-form textarea, .contacto-form button')
    .forEach((field, idx) => {
      field.style.opacity = 0;
      setTimeout(() => {
        field.style.transition = 'opacity .6s cubic-bezier(.51,1.51,.41,1.01)';
        field.style.opacity = 1;
      }, 400 + idx * 150);
    });
}

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar animaciones y efectos base
  animateOnScroll();
  headerShadow();
  scrollSpy();
  contactoFade();

  /* --- Máquinas de escribir --- */
  // Hero
  typeWriter(document.querySelector('.hero-title'),
             document.querySelector('.hero-title')?.dataset.text, 30);
  setTimeout(() => {
    typeWriter(document.querySelector('.hero-slogan'),
               document.querySelector('.hero-slogan')?.dataset.text, 13);
  }, 1050);

  // Frase inspiradora
  setTimeout(() => {
    typeWriter(document.getElementById('frase-maquina'),
               document.getElementById('frase-maquina')?.dataset.text, 38);
  }, 300);

  // Valores (con estrellas)
  const valores = document.querySelectorAll('.maquina-valor');
  (function escribirValores(idx = 0) {
    if (idx >= valores.length) return;
    const el = valores[idx];
    typeWriter(el, el.dataset.text || el.textContent, 46, () => {
      const est = el.parentElement.querySelector('.estrellas');
      if (est) {
        est.classList.add('flash');
        setTimeout(() => est.classList.remove('flash'), 700);
      }
      setTimeout(() => escribirValores(idx + 1), 400);
    });
  })();

  // Misión & Visión
  document.querySelectorAll('.maquina-mv').forEach((el, i) => {
    setTimeout(() => typeWriter(el, el.dataset.text || el.textContent, 56),
               200 + i * 800);
  });

  /* --- Acordeón --- */
  document.querySelectorAll('.acordeon-item').forEach(item => {
    item.querySelector('.acordeon-btn')?.addEventListener('click', () => {
      item.classList.toggle('open');
      // cerrar otros
      document.querySelectorAll('.acordeon-item.open').forEach(o => {
        if (o !== item) o.classList.remove('open');
      });
    });
  });
});

/* ===================== GLOBAL LISTENERS ===================== */
['scroll', 'resize'].forEach(evt => {
  window.addEventListener(evt, () => {
    headerShadow();
    scrollSpy();
  }, { passive: true });
});
window.addEventListener('scroll', animateOnScroll, { passive: true });

document.addEventListener("DOMContentLoaded", function () {
  tsParticles.load({
    id: "particles-main",
    options: {
      background: { color: "transparent" },
      particles: {
        number: { value: 54 },         // Más partículas
        color: { value: "#2196f3" },   // Azul brillante, cámbialo si quieres
        size: { value: 3.8, random: { enable: true, minimumValue: 2.6 } }, // Más grandes y variación
        opacity: { value: 0.42 },      // Mucho más visible
        move: { enable: true, speed: 0.45 },
        shape: { type: "circle" }
      },
      interactivity: {
        events: { onhover: { enable: false } }
      }
    }
  });
});

