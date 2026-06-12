// Cortexia - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background transition on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 255, 136, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Waitlist form submission
    const waitlistForm = document.querySelector('.waitlist-form');
    waitlistForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = waitlistForm.querySelector('input');
        const email = emailInput.value;
        
        // API Calls go here
        console.log('Cortexia Erken Erişim Kaydı:', email);
        
        // Success feedback
        alert('🎉 Cortexia evrenine ilk adımı attınız! Erken erişim sıranız e-posta adresinize gönderilecektir.');
        waitlistForm.reset();
    });

    // Intersection Observer for scroll-driven animations
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animasyon bittikten sonra izlemeyi bırak
            }
        });
    }, observerOptions);

    document.querySelectorAll('.vision-card, .eco-node, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Stats counter animation
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const stepTime = 16; // Yaklaşık 60 FPS
        const increment = target / (duration / stepTime);
        
        const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            }
        }, stepTime);
    };

    // Trigger counter when stats section is visible
    const heroStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-number').forEach((stat) => {
                    const text = stat.textContent;
                    if (text !== '∞') {
                        const number = parseInt(text.replace(/\D/g, ''));
                        animateCounter(stat, number);
                    }
                });
                heroStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStatsObserver.observe(heroStats);
    }

    console.log('%c🚀 Cortexia - Zihnindeki dünyayı kodla ve sinemaya dönüştür.', 'font-size: 16px; font-weight: bold; color: #00ff88;');
});
