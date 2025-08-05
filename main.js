document.addEventListener('DOMContentLoaded', () => {
  // ========== 1. HERO: PARALLAX & MÁQUINA DE ESCRIBIR ==========
  const hero = document.querySelector('.hero');
  const video = document.querySelector('.hero-bg-video');
  const banner = document.querySelector('.hero-banner');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (video) video.style.transform = `translateY(${scrollY * 0.12}px) scale(1.02)`;
    if (banner) banner.style.transform = `translateY(${scrollY * 0.06}px)`;
    handleHeaderScroll();
    revealSectionsOnScroll();
  });

  // Máquina de escribir para título y slogan
  function typeWriterEffect(element, text, speed = 48, callback) {
    element.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  const heroTitle = document.querySelector('.hero-title');
  const heroSlogan = document.querySelector('.hero-slogan');
  if (heroTitle && heroSlogan) {
    const titleText = heroTitle.dataset.text || heroTitle.textContent;
    const sloganText = heroSlogan.dataset.text || heroSlogan.textContent;
    typeWriterEffect(heroTitle, titleText, 38, () => {
      setTimeout(() => typeWriterEffect(heroSlogan, sloganText, 42), 350);
    });
  }

  // ========== 2. HEADER: STICKY Y TRANSFORMACIÓN AL SCROLL ==========
  const siteHeader = document.querySelector('.site-header');
  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 70) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  handleHeaderScroll();

  // ========== 3. ANIMACIÓN UNIVERSAL DE TODAS LAS SECCIONES ==========
  function revealSectionsOnScroll() {
    // TODAS las secciones modernas
    document.querySelectorAll('.section-animate').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        section.classList.add('visible');
      }
    });

    // Compatibilidad para secciones legacy
    const about = document.querySelector('#empresa.fancy-bg');
    if (about) {
      const title = about.querySelector('.about-title');
      const desc = about.querySelector('.about-desc');
      if (title) {
        const rect = title.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) title.classList.add('visible');
      }
      if (desc) {
        const rect = desc.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) setTimeout(() => desc.classList.add('visible'), 160);
      }
    }
    const valores = document.querySelector('#valores.fancy-bg');
    if (valores) {
      const title = valores.querySelector('.about-title, .valores-title');
      const desc = valores.querySelector('.about-desc, .valores-desc');
      const grid = valores.querySelector('.about-grid, .valores-grid');
      if (title) {
        const rect = title.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) title.classList.add('visible');
      }
      if (desc) {
        const rect = desc.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) setTimeout(() => desc.classList.add('visible'), 160);
      }
      if (grid) {
        const rect = grid.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) setTimeout(() => grid.classList.add('visible'), 300);
      }
    }
  }
  // Ejecuta al cargar y con scroll
  revealSectionsOnScroll();
  window.addEventListener('scroll', revealSectionsOnScroll);

  // ========== 4. ACORDEÓN OBJETO SOCIAL ==========
  const acordeonItems = document.querySelectorAll('.acordeon-objeto-social .acordeon-item');
  acordeonItems.forEach(item => {
    const btn = item.querySelector('.acordeon-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      // Solo uno abierto a la vez
      acordeonItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });

  // ========== 5. PARTICLES.JS (opcional) ==========
  particlesJS('particles-js', {
  "particles": {
    "number": { "value": 45, "density": { "enable": true, "value_area": 900 } },
    "color": { "value": "#c8e6f7" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.70 },
    "size": { "value": 4 },
    "move": { "enable": true, "speed": 2.5 }
  }
})
});
