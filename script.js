// Sistema de Cache Local y Funcionalidades Principales
class VocesPacasmayo {
    constructor() {
        this.init();
        this.loadUserData();
        this.loadForumPosts();
        this.setupEventListeners();
        this.updateProgress();
    }

    init() {
        // Inicializar datos por defecto si no existen
        if (!localStorage.getItem('vocesPacasmayoData')) {
            const defaultData = {
                userName: 'Ciudadano',
                progress: 0,
                campaigns: [],
                forumPosts: [],
                userPosts: [],
                aiChatHistory: [],
                resources: {
                    downloaded: [],
                    viewed: []
                },
                plan: 'gratuito'
            };
            localStorage.setItem('vocesPacasmayoData', JSON.stringify(defaultData));
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem('vocesPacasmayoData'));
    }

    saveData(data) {
        localStorage.setItem('vocesPacasmayoData', JSON.stringify(data));
    }

    loadUserData() {
        const data = this.getData();
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = data.userName;
        }
    }

    updateProgress() {
        const data = this.getData();
        const progress = Math.min(data.progress, 100);
        
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const progressDescription = document.getElementById('progressDescription');
        
        if (progressFill && progressText && progressDescription) {
            // Actualizar círculo de progreso
            progressFill.style.background = `conic-gradient(#4CAF50 0deg, #4CAF50 ${progress * 3.6}deg, #e0e0e0 ${progress * 3.6}deg)`;
            progressText.textContent = `${progress}%`;
            progressDescription.textContent = `${progress}% de campañas completadas`;
        }
    }

    // Funciones de navegación
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Sistema de Foro Ciudadano
    loadForumPosts() {
        const data = this.getData();
        const forumPostsContainer = document.getElementById('forumPosts');
        
        if (forumPostsContainer) {
            forumPostsContainer.innerHTML = '';
            
            // Posts de ejemplo
            const examplePosts = [
                {
                    id: 1,
                    type: 'denuncia',
                    title: 'Basura acumulada en la playa',
                    content: 'Hace una semana que no recogen la basura en la playa principal. Es urgente que las autoridades actúen.',
                    date: new Date().toLocaleDateString('es-ES'),
                    author: 'María González'
                },
                {
                    id: 2,
                    type: 'propuesta',
                    title: 'Propuesta: Talleres de reciclaje',
                    content: 'Sugiero organizar talleres de reciclaje para niños y adultos en el parque central.',
                    date: new Date().toLocaleDateString('es-ES'),
                    author: 'Carlos Mendoza'
                },
                {
                    id: 3,
                    type: 'opinion',
                    title: 'La importancia de la unión comunitaria',
                    content: 'Creo que necesitamos más actividades que unan a la comunidad. La unión hace la fuerza.',
                    date: new Date().toLocaleDateString('es-ES'),
                    author: 'Ana Torres'
                }
            ];

            // Agregar posts del usuario
            const allPosts = [...examplePosts, ...data.userPosts];
            
            allPosts.forEach(post => {
                const postElement = this.createPostElement(post);
                forumPostsContainer.appendChild(postElement);
            });
        }
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post-item';
        
        const typeLabels = {
            'opinion': 'Opinión',
            'denuncia': 'Denuncia',
            'propuesta': 'Propuesta'
        };

        postDiv.innerHTML = `
            <div class="post-header">
                <span class="post-type">${typeLabels[post.type] || post.type}</span>
                <span class="post-date">${post.date}</span>
            </div>
            <h4 class="post-title">${post.title}</h4>
            <p class="post-content">${post.content}</p>
            <div class="post-author">Por: ${post.author}</div>
        `;
        
        return postDiv;
    }

    // Asistente IA
    sendAIMessage() {
        const input = document.getElementById('aiInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Agregar mensaje del usuario
        this.addUserMessage(message);
        
        // Simular respuesta de IA
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.addAIMessage(response);
        }, 1000);
        
        input.value = '';
    }

    addUserMessage(message) {
        const chatMessages = document.getElementById('aiChatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    addAIMessage(message) {
        const chatMessages = document.getElementById('aiChatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Respuestas predefinidas basadas en palabras clave
        if (message.includes('violencia') || message.includes('violencia familiar')) {
            return `Para denunciar violencia familiar, puedes contactar:
            • Línea 100 (24 horas): 100
            • Comisaría de Pacasmayo: (044) 555-1234
            • Centro de Emergencia Mujer: (044) 555-5678
            • También puedes acudir al Centro de Salud más cercano.
            
            Recuerda que no estás sola/o y que hay ayuda disponible.`;
        }
        
        if (message.includes('campaña') || message.includes('ambiental') || message.includes('limpieza')) {
            return `Para participar en campañas ambientales:
            • Inscríbete en nuestra sección de Campañas
            • Únete al grupo "Pacasmayo Verde" en Facebook
            • Contacta al coordinador: (044) 555-9999
            • Las próximas actividades son los sábados a las 8:00 AM
            
            ¡Tu participación es muy importante para cuidar nuestro medio ambiente!`;
        }
        
        if (message.includes('familia') || message.includes('convivencia') || message.includes('consejo')) {
            return `Consejos para mejorar la convivencia familiar:
            • Establece horarios para actividades familiares
            • Practica la comunicación asertiva
            • Dedica tiempo de calidad sin dispositivos
            • Resuelve conflictos con diálogo y respeto
            • Busca ayuda profesional si es necesario
            
            La familia es el pilar de nuestra sociedad. ¡Cuidémosla!`;
        }
        
        if (message.includes('empleo') || message.includes('trabajo') || message.includes('cv')) {
            return `Para mejorar tus oportunidades laborales:
            • Actualiza tu CV con nuestros recursos
            • Participa en talleres de capacitación
            • Visita el Centro de Empleo de Pacasmayo
            • Únete a grupos de networking local
            • Considera emprendimiento con apoyo municipal
            
            ¡El futuro laboral está en tus manos!`;
        }
        
        if (message.includes('recursos') || message.includes('descargar') || message.includes('pdf')) {
            return `Tenemos varios recursos disponibles:
            • Guías de reciclaje y medio ambiente
            • Manuales de denuncia y apoyo
            • Plantillas de CV y empleo
            • Videos educativos
            • Infografías descargables
            
            Visita nuestra sección de Recursos para acceder a todo el material.`;
        }
        
        // Respuesta por defecto
        return `Gracias por tu consulta. Puedo ayudarte con información sobre:
        • Denuncias y violencia familiar
        • Campañas ambientales y participación
        • Consejos de convivencia familiar
        • Recursos educativos y empleo
        • Información sobre la comunidad
        
        ¿Hay algo específico en lo que pueda ayudarte?`;
    }

    // Funciones de formularios
    setupEventListeners() {
        // Formulario del foro
        const forumForm = document.getElementById('forumForm');
        if (forumForm) {
            forumForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitForumPost();
            });
        }

        // Formulario de contacto
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitContactForm();
            });
        }

        // Formulario de unirse
        const joinForm = document.getElementById('joinForm');
        if (joinForm) {
            joinForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitJoinForm();
            });
        }

        // Formulario de solución
        const solutionForm = document.getElementById('solutionForm');
        if (solutionForm) {
            solutionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitSolutionForm();
            });
        }

        // Input de IA
        const aiInput = document.getElementById('aiInput');
        if (aiInput) {
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendAIMessage();
                }
            });
        }
    }

    submitForumPost() {
        const postType = document.getElementById('postType').value;
        const postTitle = document.getElementById('postTitle').value;
        const postContent = document.getElementById('postContent').value;
        
        if (!postType || !postTitle || !postContent) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        const data = this.getData();
        const newPost = {
            id: Date.now(),
            type: postType,
            title: postTitle,
            content: postContent,
            date: new Date().toLocaleDateString('es-ES'),
            author: data.userName
        };
        
        data.userPosts.push(newPost);
        this.saveData(data);
        
        // Recargar posts
        this.loadForumPosts();
        
        // Limpiar formulario
        document.getElementById('forumForm').reset();
        
        // Mostrar confirmación
        this.showNotification('¡Tu publicación ha sido enviada exitosamente!', 'success');
    }

    submitContactForm() {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const type = document.getElementById('contactType').value;
        const message = document.getElementById('contactMessage').value;
        
        if (!name || !email || !type || !message) {
            alert('Por favor completa los campos obligatorios');
            return;
        }
        
        // Simular envío
        this.showNotification('¡Gracias por tu interés! Te contactaremos pronto.', 'success');
        document.getElementById('contactForm').reset();
    }

    submitJoinForm() {
        this.showNotification('¡Bienvenido a Voces de Pacasmayo!', 'success');
        this.closeModal('joinModal');
        
        // Actualizar progreso
        const data = this.getData();
        data.progress = Math.min(data.progress + 10, 100);
        this.saveData(data);
        this.updateProgress();
    }

    submitSolutionForm() {
        this.showNotification('¡Tu propuesta ha sido enviada! La revisaremos pronto.', 'success');
        this.closeModal('solutionModal');
    }

    // Funciones de campañas
    joinCampaign(campaignType) {
        const data = this.getData();
        
        if (!data.campaigns.includes(campaignType)) {
            data.campaigns.push(campaignType);
            data.progress = Math.min(data.progress + 15, 100);
            this.saveData(data);
            this.updateProgress();
            
            this.showNotification(`¡Te has inscrito en la campaña ${campaignType}!`, 'success');
        } else {
            this.showNotification('Ya estás inscrito en esta campaña', 'info');
        }
    }

    // Funciones de recursos
    downloadResource(resourceType) {
        const data = this.getData();
        
        if (!data.resources.downloaded.includes(resourceType)) {
            data.resources.downloaded.push(resourceType);
            this.saveData(data);
        }
        
        // Simular descarga
        this.showNotification('Descarga iniciada...', 'info');
        
        // Actualizar progreso
        data.progress = Math.min(data.progress + 5, 100);
        this.saveData(data);
        this.updateProgress();
    }

    showVideos() {
        this.showNotification('Abriendo galería de videos...', 'info');
    }

    // Funciones de planes
    selectPlan(planType) {
        const data = this.getData();
        data.plan = planType;
        this.saveData(data);
        
        if (planType === 'premium') {
            this.showNotification('¡Plan Premium activado! Accede a todas las funciones avanzadas.', 'success');
        } else {
            this.showNotification('Plan Gratuito activado. ¡Disfruta de todas las funciones básicas!', 'success');
        }
    }

    // Funciones de modales
    showJoinModal() {
        document.getElementById('joinModal').style.display = 'block';
    }

    showSolutionModal(problemType) {
        document.getElementById('solutionModal').style.display = 'block';
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    showProblemDetails(problemType) {
        const details = {
            'ambiente': 'Problemas ambientales incluyen contaminación de playas, acumulación de basura en calles, y falta de campañas de limpieza regulares.',
            'familia': 'Problemas familiares incluyen violencia doméstica, bullying escolar, y pérdida de valores tradicionales en la comunidad.',
            'juventud': 'Problemas juveniles incluyen falta de oportunidades de empleo, abandono escolar, y poca capacitación técnica.',
            'participacion': 'Problemas de participación incluyen desinterés social, falta de unión comunitaria, y baja participación en actividades cívicas.'
        };
        
        alert(details[problemType] || 'Información no disponible');
    }

    // Sistema de notificaciones
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Funciones globales para los botones HTML
function scrollToSection(sectionId) {
    app.scrollToSection(sectionId);
}

function showJoinModal() {
    app.showJoinModal();
}

function showSolutionModal(problemType) {
    app.showSolutionModal(problemType);
}

function showProblemDetails(problemType) {
    app.showProblemDetails(problemType);
}

function joinCampaign(campaignType) {
    app.joinCampaign(campaignType);
}

function downloadResource(resourceType) {
    app.downloadResource(resourceType);
}

function showVideos() {
    app.showVideos();
}

function selectPlan(planType) {
    app.selectPlan(planType);
}

function sendAIMessage() {
    app.sendAIMessage();
}

function closeModal(modalId) {
    app.closeModal(modalId);
}

// Cerrar modales al hacer clic fuera
window.addEventListener('click', (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;

document.head.appendChild(style);

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.app = new VocesPacasmayo();
    
    // Efecto de scroll suave para los enlaces de navegación
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
    
    // Efecto parallax sutil en el header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Animación de entrada para las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas
    document.querySelectorAll('.problem-card, .campaign-card, .news-card, .resource-card, .plan-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Funciones adicionales para mejorar la experiencia
function updateUserName() {
    const newName = prompt('Ingresa tu nombre:');
    if (newName && newName.trim()) {
        const data = app.getData();
        data.userName = newName.trim();
        app.saveData(data);
        app.loadUserData();
        app.showNotification(`¡Hola ${newName}! Bienvenido a Voces de Pacasmayo`, 'success');
    }
}

// Agregar funcionalidad de búsqueda en el foro
function searchForum() {
    const searchTerm = prompt('Buscar en el foro:');
    if (searchTerm) {
        const posts = document.querySelectorAll('.post-item');
        posts.forEach(post => {
            const content = post.textContent.toLowerCase();
            if (content.includes(searchTerm.toLowerCase())) {
                post.style.display = 'block';
                post.style.border = '2px solid #4CAF50';
            } else {
                post.style.display = 'none';
            }
        });
        
        app.showNotification(`Mostrando resultados para: "${searchTerm}"`, 'info');
    }
}

// Función para compartir en redes sociales
function shareOnSocial(platform) {
    const url = window.location.href;
    const title = 'Voces de Pacasmayo - Cambiando nuestra realidad juntos';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

console.log('🎉 Voces de Pacasmayo - Sistema cargado exitosamente');
console.log('📱 Funcionalidades disponibles:');
console.log('   • Foro ciudadano con localStorage');
console.log('   • Asistente IA interactivo');
console.log('   • Sistema de progreso personalizado');
console.log('   • Gestión de campañas y recursos');
console.log('   • Planes de acceso (Gratuito/Premium)');
console.log('   • Notificaciones y modales');
console.log('   • Cache local para persistencia de datos');
