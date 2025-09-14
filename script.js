document.addEventListener('DOMContentLoaded', function() {
  
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // 1. Navegación móvil
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // 2. Cerrar menú al hacer clic en un enlace (para móviles)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // 3. Scroll suave para todos los enlaces ancla
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Altura del navbar fijo para compensar
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Cambiar apariencia del navbar al hacer scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 5. Botón "Volver arriba"
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });
});