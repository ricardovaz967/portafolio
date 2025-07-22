// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Flecha de scroll
document.querySelector('.scroll-arrow').addEventListener('click', function() {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Animación de entrada al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Aplicar animación de entrada a elementos
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-item, .stat, .about-text, .contact-info');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Animación de barras de habilidades
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Observar sección de habilidades
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Contador animado para estadísticas
const stats = document.querySelectorAll('.stat h3');
const aboutSection = document.querySelector('.about');

const animateCounters = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
};

// Observar sección about para animar contadores
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validación básica
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Simular envío
        showNotification('Enviando mensaje...', 'info');
        
        setTimeout(() => {
            showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Efecto de parallax en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Navegación activa según scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Efecto de typing en el título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efecto typing al título principal
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
    
    // Efecto de ejecución secuencial para la terminal
    function executeTerminalSequence() {
        const sequence = [
            { element: 'line1', delay: 500 },
            { element: 'output1', delay: 1000 },
            { element: 'line2', delay: 800 },
            { element: 'output2', delay: 1000 },
            { element: 'line3', delay: 800 },
            { element: 'output3', delay: 1000 },
            { element: 'line4', delay: 800 },
            { element: 'output4', delay: 1000 },
            { element: 'line5', delay: 800 }
        ];

        let currentIndex = 0;

        function showNextElement() {
            if (currentIndex < sequence.length) {
                const { element, delay } = sequence[currentIndex];
                const elementToShow = document.getElementById(element);
                
                if (elementToShow) {
                    elementToShow.style.display = 'flex';
                    setTimeout(() => {
                        elementToShow.classList.add('visible');
                    }, 100);
                }
                
                currentIndex++;
                setTimeout(showNextElement, delay);
            } else {
                // Iniciar el cursor parpadeante
                const typingElement = document.querySelector('.typing');
                if (typingElement) {
                    typingElement.textContent = '_';
                }
            }
        }

        // Iniciar la secuencia después de un pequeño delay
        setTimeout(showNextElement, 1000);
    }

    // Ejecutar la secuencia de la terminal
    executeTerminalSequence();
});

// Cargar animaciones cuando la página esté completamente cargada
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Función para cambiar tema (opcional)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Agregar botón de tema si se desea
// const themeToggle = document.createElement('button');
// themeToggle.innerHTML = '🌙';
// themeToggle.className = 'theme-toggle';
// themeToggle.onclick = toggleTheme;
// document.querySelector('.nav-container').appendChild(themeToggle);

// Estimador de Costos
const projectPrices = {
    landing: 500,
    corporate: 800,
    ecommerce: 1500,
    blog: 600,
    portfolio: 400,
    custom: 2000
};

const featurePrices = {
    responsive: 200,
    seo: 150,
    cms: 400,
    forms: 100,
    analytics: 80,
    ssl: 50,
    hosting: 120,
    domain: 15,
    maintenance: 300
};

const urgencyMultipliers = {
    normal: 1,
    urgent: 1.3,
    express: 1.5
};

const deliveryTimes = {
    normal: '2-3 semanas',
    urgent: '1 semana',
    express: '3-5 días'
};

// Elementos del DOM
const projectTypeSelect = document.getElementById('projectType');
const additionalPagesInput = document.getElementById('additionalPages');
const deliveryTimeSelect = document.getElementById('deliveryTime');
const featureCheckboxes = document.querySelectorAll('.feature-checkbox');

// Elementos de resultado
const basePriceElement = document.getElementById('basePrice');
const featuresPriceElement = document.getElementById('featuresPrice');
const pagesPriceElement = document.getElementById('pagesPrice');
const urgencyPriceElement = document.getElementById('urgencyPrice');
const totalPriceElement = document.getElementById('totalPrice');
const deliveryEstimateElement = document.getElementById('deliveryEstimate');

// Botones de acción
const getQuoteButton = document.getElementById('getQuote');
const downloadPDFButton = document.getElementById('downloadPDF');

// Función para calcular el estimado
function calculateEstimate() {
    let basePrice = 0;
    let featuresPrice = 0;
    let pagesPrice = 0;
    let urgencyPrice = 0;
    
    // Precio base del proyecto
    const selectedProject = projectTypeSelect.value;
    if (selectedProject && projectPrices[selectedProject]) {
        basePrice = projectPrices[selectedProject];
    }
    
    // Precio de características adicionales
    featureCheckboxes.forEach(checkbox => {
        if (checkbox.checked && featurePrices[checkbox.id]) {
            featuresPrice += featurePrices[checkbox.id];
        }
    });
    
    // Precio de páginas adicionales
    const additionalPages = parseInt(additionalPagesInput.value) || 0;
    pagesPrice = additionalPages * 80;
    
    // Multiplicador de urgencia
    const deliveryTime = deliveryTimeSelect.value;
    const urgencyMultiplier = urgencyMultipliers[deliveryTime] || 1;
    const subtotal = basePrice + featuresPrice + pagesPrice;
    urgencyPrice = subtotal * (urgencyMultiplier - 1);
    
    // Total
    const total = basePrice + featuresPrice + pagesPrice + urgencyPrice;
    
    // Actualizar elementos en pantalla
    basePriceElement.textContent = `$${basePrice}`;
    featuresPriceElement.textContent = `$${featuresPrice}`;
    pagesPriceElement.textContent = `$${pagesPrice}`;
    urgencyPriceElement.textContent = `$${Math.round(urgencyPrice)}`;
    totalPriceElement.textContent = `$${Math.round(total)}`;
    
    // Actualizar tiempo de entrega
    deliveryEstimateElement.textContent = deliveryTimes[deliveryTime] || '2-3 semanas';
}

// Event listeners para el estimador
if (projectTypeSelect) {
    projectTypeSelect.addEventListener('change', calculateEstimate);
}

if (additionalPagesInput) {
    additionalPagesInput.addEventListener('input', calculateEstimate);
}

if (deliveryTimeSelect) {
    deliveryTimeSelect.addEventListener('change', calculateEstimate);
}

featureCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculateEstimate);
});

// Función para solicitar cotización
if (getQuoteButton) {
    getQuoteButton.addEventListener('click', () => {
        const selectedProject = projectTypeSelect.value;
        if (!selectedProject) {
            showNotification('Por favor, selecciona un tipo de proyecto', 'error');
            return;
        }
        
        // Recopilar información del proyecto
        const projectInfo = {
            type: projectTypeSelect.options[projectTypeSelect.selectedIndex].text,
            features: [],
            additionalPages: additionalPagesInput.value,
            deliveryTime: deliveryTimeSelect.options[deliveryTimeSelect.selectedIndex].text,
            totalPrice: totalPriceElement.textContent
        };
        
        featureCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                projectInfo.features.push(checkbox.nextElementSibling.textContent);
            }
        });
        
        // Mostrar modal de cotización
        showQuoteModal(projectInfo);
    });
}

// Función para mostrar modal de cotización
function showQuoteModal(projectInfo) {
    const modal = document.createElement('div');
    modal.className = 'quote-modal';
    modal.innerHTML = `
        <div class="quote-modal-content">
            <div class="quote-modal-header">
                <h3>Cotización de Proyecto</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="quote-modal-body">
                <h4>Resumen del Proyecto</h4>
                <div class="quote-details">
                    <p><strong>Tipo de Proyecto:</strong> ${projectInfo.type}</p>
                    <p><strong>Páginas Adicionales:</strong> ${projectInfo.additionalPages}</p>
                    <p><strong>Tiempo de Entrega:</strong> ${projectInfo.deliveryTime}</p>
                    <p><strong>Precio Total:</strong> ${projectInfo.totalPrice}</p>
                    ${projectInfo.features.length > 0 ? `
                        <p><strong>Características Incluidas:</strong></p>
                        <ul>
                            ${projectInfo.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                <p>Te contactaré en las próximas 24 horas para discutir los detalles de tu proyecto.</p>
            </div>
            <div class="quote-modal-footer">
                <button class="btn btn-primary" onclick="window.location.href='#contact'">Contactar Ahora</button>
                <button class="btn btn-secondary modal-close">Cerrar</button>
            </div>
        </div>
    `;
    
    // Estilos del modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    const modalContent = modal.querySelector('.quote-modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar modal
    const closeButtons = modal.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.remove();
        });
    });
    
    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Función para descargar PDF (simulación)
if (downloadPDFButton) {
    downloadPDFButton.addEventListener('click', () => {
        showNotification('Función de descarga PDF en desarrollo', 'info');
    });
} 