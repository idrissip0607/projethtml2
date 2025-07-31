// JavaScript pour les animations générales du site

document.addEventListener('DOMContentLoaded', function() {
    
    // Animation de chargement de la page
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    // Animation des cartes de menu au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observer toutes les cartes de menu
    document.querySelectorAll('.menu-item').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
        cardObserver.observe(card);
    });
    
    // Animation des titres de section
    document.querySelectorAll('.menu-title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateX(-30px)';
        title.style.transition = 'all 0.8s ease';
        
        const titleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.5 });
        
        titleObserver.observe(title);
    });
    
    // Animation de l'image hero
    const heroImg = document.querySelector('.imghero');
    if (heroImg) {
        heroImg.style.opacity = '0';
        heroImg.style.transform = 'translateY(20px)';
        heroImg.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            heroImg.style.opacity = '1';
            heroImg.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Animation des boutons au survol
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // Animation des cartes de menu au survol
    document.querySelectorAll('.menu-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(184, 92, 56, 0.15)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Animation du titre
            const title = this.querySelector('.card-title');
            if (title) {
                title.style.color = '#d86c41';
                title.style.transform = 'scale(1.05)';
                title.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            
            // Réinitialiser le titre
            const title = this.querySelector('.card-title');
            if (title) {
                title.style.color = '';
                title.style.transform = 'scale(1)';
            }
        });
    });
    
    // Animation de typing pour le titre principal
    const mainTitle = document.querySelector('h1');
    if (mainTitle && mainTitle.textContent.includes('Menu de délicieuses bouchées')) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.style.borderRight = '2px solid #b85c38';
        mainTitle.style.animation = 'blink 1s infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    mainTitle.style.borderRight = 'none';
                    mainTitle.style.animation = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Animation de compteur pour les éléments numériques (si présents)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Animation de pulsation pour les éléments importants
    function addPulseAnimation(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.animation = 'pulse 0.6s ease-in-out';
            });
            
            el.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });
    }
    
    // Appliquer l'animation de pulsation aux éléments spéciaux
    addPulseAnimation('.btn-primary');
    
    // Effet de particules léger (optionnel)
    function createFloatingElements() {
        const container = document.body;
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(184, 92, 56, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: float ${5 + Math.random() * 5}s infinite linear;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }
    }
    
    // Créer les éléments flottants après un délai
    setTimeout(createFloatingElements, 2000);
});

// Keyframes CSS pour les animations
const animationStyles = `
@keyframes blink {
    0%, 50% { border-color: transparent; }
    51%, 100% { border-color: #b85c38; }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@keyframes float {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

/* Animation de chargement globale */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(184, 92, 56, 0.3);
    border-top: 4px solid #b85c38;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Ajouter les styles d'animation au document
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);