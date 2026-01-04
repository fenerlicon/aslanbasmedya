document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active'); // Turn hamburger to X (CSS)
        });
    }

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu on click
            if (mobileToggle) mobileToggle.classList.remove('active');

            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Sticky Navbar & Scroll Animations
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Simple Reveal on Scroll (Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.service-card, .hero-content, .about-content, .contact-wrapper');
    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });
    // 5. Testimonial Slider Cloning (Seamless Loop)
    const track = document.querySelector('.testimonials-track');
    if (track) {
        const items = track.innerHTML;
        track.innerHTML += items;
    }

    // 6. 3D Tilt Effect
    const cards = document.querySelectorAll('.service-card, .testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Remove transition for transform to prevent lag (Realtime feel)
            // But keep other transitions if needed, or just set to none for maximum snap
            card.style.transition = 'none';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation range (e.g., -10deg to 10deg)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Invert Y for correct tilt
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Restore smooth transition for the reset
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';

            // Clear inline transition after animation to revert to CSS file rules
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });
});
