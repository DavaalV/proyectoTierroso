document.addEventListener('DOMContentLoaded', function() {
  // Navegación responsive
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
  });
  
  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
    });
  });
  
  // Cambiar navbar al hacer scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      navbar.style.backgroundColor = 'rgba(26, 42, 58, 0.95)';
      navbar.style.padding = '0.5rem 2rem';
    } else {
      navbar.classList.remove('scrolled');
      navbar.style.backgroundColor = 'var(--light-color)';
      navbar.style.padding = '1rem 2rem';
    }
  });
  
  // Botón volver arriba
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });
  
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========== CARRUSEL FUNCIONAL ==========
  function initCarousel() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (!portfolioItems.length) return;
    
    let currentIndex = 0;
    
    // Crear indicadores
    portfolioItems.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('carousel-indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
      indicatorsContainer.appendChild(indicator);
    });
    
    // Mostrar el primer slide
    updateCarousel();
    
    // Función para actualizar el carrusel
    function updateCarousel() {
      portfolioItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIndex) {
          setTimeout(() => {
            item.classList.add('active');
          }, 10);
        }
      });
      
      // Actualizar indicadores
      document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
      
      // Deshabilitar botones cuando sea necesario
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === portfolioItems.length - 1;
    }
    
    // Función para ir a un slide específico
    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }
    
    // Event listeners para los botones
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    nextButton.addEventListener('click', () => {
      if (currentIndex < portfolioItems.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
  }
  
  // Inicializar el carrusel al cargar la página
  initCarousel();
  
  // Animaciones al hacer scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature, .service-card, .portfolio-container, .about-content, .contact-container, .catalog-grid');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Inicializar elementos con opacidad 0 para la animación
  document.querySelectorAll('.feature, .service-card, .portfolio-container, .about-content, .contact-container, .catalog-grid').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Ejecutar una vez al cargar la página



// Añade esto al final del archivo
function handleBlogNavigation() {
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }, 300); // Pequeño delay para asegurar que la página se cargó
    }
  }
}

// Ejecutar al cargar blog.html
if (document.querySelector('body').classList.contains('blog-page')) {
  handleBlogNavigation();
}
  // Toggle del panel lateral del blog
  const toggleBlogBtn = document.getElementById('toggle-blog-sidebar');
  const blogSidebarContainer = document.querySelector('.blog-sidebar-container');
  const blogSidebar = document.querySelector('.blog-sidebar');

  if (toggleBlogBtn && blogSidebar) {
    // Estado inicial: oculto
    blogSidebarContainer.classList.add('hidden');
    toggleBlogBtn.querySelector('i').classList.remove('fa-chevron-left');
    toggleBlogBtn.querySelector('i').classList.add('fa-chevron-right');

    toggleBlogBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Evitar que el clic se propague
      blogSidebarContainer.classList.toggle('hidden');
      
      // Cambiar icono según estado
      const icon = this.querySelector('i');
      if (blogSidebarContainer.classList.contains('hidden')) {
        icon.classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      } else {
        icon.classList.remove('fa-chevron-right');
        icon.classList.add('fa-chevron-left');
      }
    });

    // Ocultar al hacer clic fuera del panel
    document.addEventListener('click', function(e) {
      if (!blogSidebarContainer.contains(e.target) && !blogSidebarContainer.classList.contains('hidden')) {
        blogSidebarContainer.classList.add('hidden');
        toggleBlogBtn.querySelector('i').classList.remove('fa-chevron-left');
        toggleBlogBtn.querySelector('i').classList.add('fa-chevron-right');
      }
    });
  }
});
// Funciones fuera del DOMContentLoaded
function handleBlogNavigation() {
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }
}

// Ejecutar al cargar blog.html
if (document.querySelector('body').classList.contains('blog-page')) {
  handleBlogNavigation();
}
