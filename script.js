document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // IntersectionObserver for fade-in and reveal animations
    const observerOptions = { threshold: 0.2 };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // Observe elements that should animate
    // Observe elements that should animate
    document.querySelectorAll('.fade-in, .reveal-horizontal, .reveal-vertical, .staggered > *, .parallax-item, .fade-in-footer, .package-card, .portfolio-item, .about-image-container').forEach(el => {
        // Staggered list: set index for delay via CSS variable
        if (el.parentElement && el.parentElement.classList.contains('staggered')) {
            const idx = Array.from(el.parentElement.children).indexOf(el) + 1;
            el.style.setProperty('--stagger-index', idx);
        }
        revealObserver.observe(el);
    });

    // Typewriter effect for .typewriter elements
    document.querySelectorAll('.typewriter').forEach(el => {
        const fullText = el.textContent.trim();
        el.textContent = '';
        let i = 0;
        const speed = 80; // ms per character
        const type = () => {
            if (i < fullText.length) {
                el.textContent += fullText.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        type();
    });

    // Parallax effect based on data-parallax-speed attribute
    const parallaxEls = document.querySelectorAll('[data-parallax-speed]');
    const handleParallax = () => {
        const windowHeight = window.innerHeight;
        parallaxEls.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed'));
            // Use parent position to avoid feedback loop from getBoundingClientRect on transformed element
            const parent = el.parentElement;
            if (parent) {
                const parentRect = parent.getBoundingClientRect();
                const elCenterY = parentRect.top + el.offsetTop + (el.offsetHeight / 2);
                const viewportCenter = windowHeight / 2;
                // Calculate offset: 0 when centered, moves based on distance from center
                const offset = (elCenterY - viewportCenter) * speed * 0.1;
                el.style.transform = `translateY(${offset}px)`;
            }
        });
    };
    window.addEventListener('scroll', () => {
        requestAnimationFrame(handleParallax);
    });

    // Mobile Portfolio Scroll Arrow Logic
    const scrollArrowRight = document.getElementById('scroll-arrow-right');
    const scrollArrowLeft = document.getElementById('scroll-arrow-left');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    if (portfolioGrid) {
        const getScrollAmount = () => {
            const item = portfolioGrid.querySelector('.portfolio-item');
            return item ? item.offsetWidth + 20 : window.innerWidth * 0.85 + 20; // item width + gap
        };

        if (scrollArrowRight) {
            scrollArrowRight.addEventListener('click', () => {
                portfolioGrid.scrollBy({
                    left: getScrollAmount(),
                    behavior: 'smooth'
                });
            });
        }

        if (scrollArrowLeft) {
            scrollArrowLeft.addEventListener('click', () => {
                portfolioGrid.scrollBy({
                    left: -getScrollAmount(),
                    behavior: 'smooth'
                });
            });
        }
    }
});
