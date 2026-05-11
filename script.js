document.addEventListener('DOMContentLoaded', () => {
    /* =======================================
       Theme Toggle (Modo Claro / Oscuro)
    ======================================= */
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeBtn.querySelector('i');

    // Revisar localStorage o preferencia del sistema
    const currentTheme = localStorage.getItem('portfolio-theme');

    if (currentTheme) {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(currentTheme);
        updateThemeIcon(currentTheme);
    } else {
        // Fallback a preferencia del OS
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.replace('light-mode', 'dark-mode');
            updateThemeIcon('dark-mode');
        }
    }

    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('portfolio-theme', 'dark-mode');
            updateThemeIcon('dark-mode');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('portfolio-theme', 'light-mode');
            updateThemeIcon('light-mode');
        }
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark-mode') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun'); // Icono de sol cuando está en oscuroro para volver a claro
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    /* =======================================
       Mobile Menu Toggle
    ======================================= */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            // Animar el ícono
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show-menu')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    /* =======================================
       Header Background on Scroll
    ======================================= */
    const header = document.querySelector('.header');

    const scrollHeader = () => {
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }

    window.addEventListener('scroll', scrollHeader);

    /* =======================================
       Active Link on Scroll
    ======================================= */
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 100,
                sectionId = current.getAttribute('id'),
                sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (sectionsClass) sectionsClass.classList.add('active');
            } else {
                if (sectionsClass) sectionsClass.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    /* =======================================
       Scroll Reveal Animation
    ======================================= */
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    // Trigger on load
    revealOnScroll();
    /* =======================================
       Portfolio Filter + Contador Dinámico
    ====================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const filterCount = document.querySelector('.filter-count');

    // Función para actualizar el contador
    const updateFilterCount = () => {
        const visibleProjects = document.querySelectorAll('.portfolio-card:not(.hide)').length;
        const totalProjects = portfolioCards.length;

        if (filterCount) {
            filterCount.innerHTML = `Mostrando <strong>${visibleProjects}</strong> de ${totalProjects} proyectos`;
        }
    };

    // Función principal de filtrado
    const filterProjects = (filterValue) => {
        portfolioCards.forEach(card => {
            // Remover animación previa
            card.style.animation = 'none';

            if (filterValue === 'all' || card.classList.contains(filterValue.substring(1))) {
                card.classList.remove('hide');
                card.classList.add('show');

                // Re-trigger animación con delay para que se note
                setTimeout(() => {
                    card.style.animation = '';
                }, 10);
            } else {
                card.classList.add('hide');
                card.classList.remove('show');
            }
        });

        // Actualizar contador después de filtrar
        updateFilterCount();
    };

    // Event listeners para botones
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover activo de todos los botones
            filterBtns.forEach(b => b.classList.remove('active-filter'));
            // Añadir activo al botón clickeado
            btn.classList.add('active-filter');

            // Obtener valor del filtro
            const filterValue = btn.getAttribute('data-filter');

            // Aplicar filtro
            filterProjects(filterValue);
        });
    });

    // Inicializar: mostrar todos y actualizar contador al cargar
    document.addEventListener('DOMContentLoaded', () => {
        updateFilterCount();
    });

});

/* =======================================
   Contact Form Handling
====================================== */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const messageTextarea = document.getElementById('message');
const messageCounter = document.getElementById('message-counter');

// Character counter
if (messageTextarea && messageCounter) {
    messageTextarea.addEventListener('input', () => {
        const length = messageTextarea.value.length;
        messageCounter.textContent = `${length}/500`;
        
        if (length > 500) {
            messageCounter.style.color = '#ef4444';
        } else {
            messageCounter.style.color = 'var(--clr-text-light)';
        }
    });
}

// Form validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const showError = (inputId, message) => {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(`${inputId}-error`);
    
    if (input && errorSpan) {
        input.classList.add('error');
        input.classList.remove('success');
        errorSpan.textContent = message;
    }
};

const showSuccess = (inputId) => {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(`${inputId}-error`);
    
    if (input && errorSpan) {
        input.classList.remove('error');
        input.classList.add('success');
        errorSpan.textContent = '';
    }
};

const validateForm = () => {
    let isValid = true;
    
    // Name
    const name = document.getElementById('name').value.trim();
    if (name.length < 3) {
        showError('name', 'Por favor ingresa tu nombre completo');
        isValid = false;
    } else {
        showSuccess('name');
    }
    
    // Email
    const email = document.getElementById('email').value.trim();
    if (!validateEmail(email)) {
        showError('email', 'Por favor ingresa un email válido');
        isValid = false;
    } else {
        showSuccess('email');
    }
    
    // Message
    const message = messageTextarea.value.trim();
    if (message.length < 10) {
        showError('message', 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    } else if (message.length > 500) {
        showError('message', 'El mensaje no puede exceder 500 caracteres');
        isValid = false;
    } else {
        showSuccess('message');
    }
    
    // Privacy
    const privacy = document.querySelector('input[name="privacy"]');
    if (!privacy.checked) {
        const privacyError = document.getElementById('privacy-error');
        if (privacyError) {
            privacyError.textContent = 'Debes aceptar la política de privacidad';
        }
        isValid = false;
    } else {
        const privacyError = document.getElementById('privacy-error');
        if (privacyError) {
            privacyError.textContent = '';
        }
    }
    
    return isValid;
};

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validar honeypot (anti-spam)
        const honeypot = document.getElementById('website').value;
        if (honeypot) {
            console.warn('Spam detected');
            return;
        }
        
        if (!validateForm()) {
            return;
        }
        
        // Loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Recopilar datos
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            projectType: document.getElementById('project-type').value,
            message: messageTextarea.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        try {
            // AQUÍ: Integrar con tu backend o servicio (Formspree, EmailJS, etc.)
            // Ejemplo con fetch:
            /*
            const response = await fetch('https://tu-api.com/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) throw new Error('Error al enviar');
            */
            
            // Simular envío (remover en producción)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Guardar en localStorage (opcional - para analytics)
            localStorage.setItem('contactFormSubmitted', 'true');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo o envíame un email directo.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
    
    // Validación en tiempo real
    ['name', 'email', 'message'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => {
                if (field.value.trim()) {
                    validateForm();
                }
            });
        }
    });
}