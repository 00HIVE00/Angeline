// Wait until the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // Select the necessary elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];

    // 1. Toggle mobile menu visibility
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Toggles the 'active' class to show/hide the menu (controlled by CSS)
            navMenu.classList.toggle('active');
        });
    }

    // 2. Hide the menu when a link is clicked (crucial for mobile UX)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only remove the 'active' class if it is present (i.e., on mobile)
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // 3. Page transition animations for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply transition if it's a page link (not anchor link)
            if (href && (href.includes('.html') || href === 'index.html' || href === '/' || href.startsWith('http'))) {
                // Add fade-out effect to body
                document.body.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                document.body.style.opacity = '0';
                document.body.style.transform = 'translateY(20px)';
                
                // Add animation to main content
                const main = document.querySelector('main');
                if (main) {
                    main.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                    main.style.opacity = '0';
                    main.style.transform = 'translateY(30px)';
                }
            }
        });
    });

    // 4. Animate elements on scroll (Intersection Observer)
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

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.project-card, .skills-category, .project-detail, .contact-info-card, .contact-form-container, .seo-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 5. Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
