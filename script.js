// ==================== ATTENDRE QUE LA PAGE SOIT CHARGÉE ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== ANIMATION DE PARTICULES ====================
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 5 + 2;
            const startX = Math.random() * window.innerWidth;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = startX + 'px';
            particle.style.bottom = '0';
            particle.style.animationDelay = delay + 's';
            particle.style.animationDuration = duration + 's';
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, (duration + delay) * 1000);
        }
        
        // Créer des particules régulièrement
        setInterval(createParticle, 500);
        
        // Créer des particules initiales
        for (let i = 0; i < 10; i++) {
            setTimeout(createParticle, i * 100);
        }
    }

    // ==================== BOUTON RETOUR EN HAUT ====================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== CHANGEMENT DE MODE (3 MODES) ====================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('.icon');
        
        // Les 3 modes disponibles
        const modes = ['gold', 'logo', 'silver'];
        let currentModeIndex = 0;
        
        // Charger le mode sauvegardé
        const savedMode = localStorage.getItem('colorMode');
        if (savedMode) {
            currentModeIndex = modes.indexOf(savedMode);
            if (currentModeIndex === -1) currentModeIndex = 0;
            applyMode(savedMode);
        }

        // Fonction pour appliquer un mode
        function applyMode(mode) {
            // Retirer tous les modes
            body.classList.remove('logo-mode', 'silver-mode');
            
            // Appliquer le mode sélectionné
            switch(mode) {
                case 'logo':
                    body.classList.add('logo-mode');
                    if (themeIcon) themeIcon.textContent = '🔷'; // Icône cyan
                    break;
                case 'silver':
                    body.classList.add('silver-mode');
                    if (themeIcon) themeIcon.textContent = '💎'; // Icône argent
                    break;
                case 'gold':
                default:
                    if (themeIcon) themeIcon.textContent = '✨'; // Icône or
                    break;
            }
        }

        // Changer de mode au clic (cycle entre les 3)
        themeToggle.addEventListener('click', () => {
            currentModeIndex = (currentModeIndex + 1) % modes.length;
            const newMode = modes[currentModeIndex];
            
            applyMode(newMode);
            localStorage.setItem('colorMode', newMode);
        });
    }

    // ==================== MENU HAMBURGER ====================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Fermer le menu mobile au clic sur un lien
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Fermer le menu mobile au clic en dehors
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // ==================== SMOOTH SCROLL POUR LES ANCRES ====================
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
});

// ==================== GESTION DES CARTES INTERACTIVES (INDEX) ====================
// Cette fonction doit être globale car elle est appelée depuis onclick dans le HTML
function toggleCard(card) {
    // Fermer toutes les autres cartes
    const allCards = document.querySelectorAll('.feature-card');
    allCards.forEach(c => {
        if (c !== card && c.classList.contains('active')) {
            c.classList.remove('active');
        }
    });

    // Toggle la carte cliquée
    card.classList.toggle('active');
}

// Fermer la carte si on clique en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('.feature-card')) {
        const allCards = document.querySelectorAll('.feature-card');
        allCards.forEach(card => {
            card.classList.remove('active');
        });
    }
});