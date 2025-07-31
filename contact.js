// JavaScript pour la page contact

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    
    // Animation des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.contact-item, .opening-hours').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Validation et soumission du formulaire
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation des champs requis
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });
        
        // Validation de l'email
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.classList.add('is-invalid');
            isValid = false;
        }
        
        if (isValid) {
            // Animation du bouton de soumission
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulation d'envoi (remplacer par vraie logique d'envoi)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Afficher le message de succès
                successMessage.classList.remove('d-none');
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    successMessage.style.transition = 'all 0.5s ease';
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 100);
                
                // Réinitialiser le formulaire
                contactForm.reset();
                contactForm.querySelectorAll('.is-valid').forEach(field => {
                    field.classList.remove('is-valid');
                });
                
                // Masquer le message après 5 secondes
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.classList.add('d-none');
                    }, 500);
                }, 5000);
                
            }, 2000);
        } else {
            // Animation de secousse pour les champs invalides
            const invalidFields = contactForm.querySelectorAll('.is-invalid');
            invalidFields.forEach(field => {
                field.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
            });
        }
    });
    
    // Suppression des classes de validation lors de la saisie
    contactForm.addEventListener('input', function(e) {
        if (e.target.classList.contains('is-invalid') || e.target.classList.contains('is-valid')) {
            e.target.classList.remove('is-invalid', 'is-valid');
        }
    });
    
    // Animation des liens de contact au survol
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Animation de secousse pour les champs invalides
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// Ajouter les keyframes au document
const styleSheet = document.createElement('style');
styleSheet.textContent = shakeKeyframes;
document.head.appendChild(styleSheet);