/**
 * Script principal para Los Tierrosos
 * Contiene todas las interacciones, animaciones y funcionalidades
 */

document.addEventListener('DOMContentLoaded', function() {
  // ==========================================================================
  // Preloader
  // ==========================================================================
  const loader = document.querySelector('.loader');
  
  // Ocultar preloader cuando la página esté cargada
  window.addEventListener('load', function() {
    // Animación de salida
    gsap.to(loader, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: function() {
        loader.style.display = 'none';
        document.body.classList.remove('is-preload');
      }
    });
  });

  // Forzar la carga después de 4 segundos (fallback)
  setTimeout(function() {
    if (loader.style.display !== 'none') {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.6,
        onComplete: function() {
          loader.style.display = 'none';
          document.body.classList.remove('is-preload');
        }
      });
    }
  }, 4000);

  // ==========================================================================
  // Cursor personalizado
  // ==========================================================================
  // Configuración del cursor (versión simplificada)
    const cursor = document.querySelector('.cursor');
    let mouseX = 0, mouseY = 0;

    // Actualizar posición del cursor
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(cursor, {
        css: {
          left: mouseX,
          top: mouseY
        }
      });
    });

    // Efectos hover (solo para el cursor principal)
    const hoverElements = [
      'a', 'button', '.service-card-3d', '.catalog-item', 
      '.nav-link', '.cta-button', 'input', 'textarea', 'select'
    ];

    hoverElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.addEventListener('mouseenter', function() {
          cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', function() {
          cursor.classList.remove('active');
        });
      });
    });

  // ==========================================================================
  // Navegación
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  // Cambiar navbar al hacer scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle del menú móvil
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
      gsap.from(navItems, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }
  });

  // Cerrar menú al hacer clic en un enlace
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Usa el método nativo como fallback
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Actualiza la URL sin recargar (opcional)
      history.pushState(null, null, targetId);
    }
  });
});

  // ==========================================================================
  // Animaciones al aparecer (ScrollTrigger)
  // ==========================================================================
  gsap.registerPlugin(ScrollTrigger);

  // Animación para las secciones
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      ease: 'power2.out'
    });
  });

  // Animación para los títulos de sección
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach(title => {
    gsap.from(title, {
      opacity: 0,
      x: -50,
      duration: 0.8,
      scrollTrigger: {
        trigger: title,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      ease: 'power2.out'
    });
  });

  // Animación para las tarjetas de servicios
  const serviceCards = document.querySelectorAll('.service-card-3d');
  serviceCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      ease: 'power2.out'
    });
  });

  // Animación para los items del catálogo
  const catalogItems = document.querySelectorAll('.catalog-item');
  catalogItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      ease: 'power2.out'
    });
  });

  // ==========================================================================
  // Botón "Volver arriba"
  // ==========================================================================
  const backToTop = document.getElementById('back-to-top');

  // Mostrar/ocultar botón al hacer scroll
    window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

    // Scroll suave al hacer clic
    backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================================================
  // Filtros del catálogo
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const catalogItemsAll = document.querySelectorAll('.catalog-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Cambiar botón activo
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Filtrar items
      catalogItemsAll.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            display: 'block',
            duration: 0.4,
            ease: 'power2.out'
          });
        } else {
          gsap.to(item, {
            opacity: 0,
            scale: 0.8,
            display: 'none',
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    });
  });

  // ==========================================================================
  // Formulario de contacto
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      
      // Simular envío (en producción usar fetch o XMLHttpRequest)
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      
      setTimeout(() => {
        // Aquí iría la lógica real de envío
        console.log('Formulario enviado:', Object.fromEntries(formData));
        
        // Mostrar mensaje de éxito
        submitButton.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
        
        // Resetear formulario después de 2 segundos
        setTimeout(() => {
          contactForm.reset();
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
          
          // Mostrar notificación
          showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
        }, 2000);
      }, 1500);
    });
  }
  
  // Función para mostrar notificaciones
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    gsap.from(notification, {
      y: 50,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
      gsap.to(notification, {
        y: 50,
        opacity: 0,
        duration: 0.4,
        onComplete: () => notification.remove()
      });
    }, 3000);
  }

  // ==========================================================================
  // Contadores animados (Estadísticas)
  // ==========================================================================
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.getAttribute('data-count'));
          const duration = 2000; // 2 segundos
          const startTime = Date.now();
          
          const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * finalValue);
            
            target.textContent = value.toLocaleString();
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };
          
          updateCounter();
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      observer.observe(counter);
    });
  }


  // ==========================================================================
  // Efecto de escritura en el tagline
  // ==========================================================================
  const tagline = document.querySelector('.tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 50);
  }

  // ==========================================================================
  // Google Analytics (reemplaza con tu ID de seguimiento)
  // ==========================================================================
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TUCODIGO');

  // ==========================================================================
  // Inicialización de tooltips (si los hay)
  // ==========================================================================
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(el => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = el.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    el.addEventListener('mouseenter', (e) => {
      const rect = el.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 40}px`;
      tooltip.style.opacity = '1';
    });
    
    el.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });
});


// ==========================================================================
// FAQ - Acordeón interactivo
// ==========================================================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    // Cerrar otros items abiertos
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle el item actual
    item.classList.toggle('active');
  });
});


// Panel de Blog
const blogPanelToggle = document.createElement('div');
blogPanelToggle.className = 'blog-panel-toggle';
blogPanelToggle.innerHTML = '<i class="fas fa-arrow-left"></i>';

const blogPanel = document.createElement('div');
blogPanel.className = 'blog-panel';
blogPanel.innerHTML = `
  <h3>Guías de Mantenimiento</h3>
  <ul>
    <li><a href="blog.html#herramientas-limpieza"><i class="fas fa-broom"></i> Limpieza Profunda</a></li>
    <li><a href="blog.html#optimizacion"><i class="fas fa-tachometer-alt"></i> Optimización Avanzada</a></li>
  </ul>
`;

const blogPanelContainer = document.createElement('div');
blogPanelContainer.className = 'blog-panel-container';
blogPanelContainer.appendChild(blogPanelToggle);
blogPanelContainer.appendChild(blogPanel);

document.body.appendChild(blogPanelContainer);

// Toggle functionality
blogPanelToggle.addEventListener('click', function() {
  blogPanelContainer.classList.toggle('active');
  this.querySelector('i').classList.toggle('fa-arrow-left');
  this.querySelector('i').classList.toggle('fa-arrow-right');
});