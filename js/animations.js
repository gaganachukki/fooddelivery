// ============================================================
// Stackly Advanced Animations — GSAP + Particles
// ============================================================

// Wait for GSAP + ScrollTrigger to load
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // --- HERO TEXT ENTRANCE ---
    const heroH1 = document.querySelector('.hero h1, .about-hero h1, .menu-hero h1, .blog-hero h1, .services-hero h1, .contact-hero h1');
    const heroP = document.querySelector('.hero p, .about-hero p, .menu-hero p, .blog-hero p, .services-hero p, .contact-hero p');

    if (heroH1) {
        gsap.from(heroH1, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.3
        });
    }
    if (heroP) {
        gsap.from(heroP, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.6
        });
    }

    // STAGGER ANIMATIONS REMOVED - Conflicted with native CSS transitions

    // GSAP Parallax removed - conflicts with native background-attachment: fixed

    // --- HEADLINE TAG SLIDE-IN ---
    document.querySelectorAll('.headline-tag').forEach(tag => {
        gsap.from(tag, {
            scrollTrigger: {
                trigger: tag,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: -30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    // --- SECTION HEADINGS SCALE-UP ---
    document.querySelectorAll('section h2').forEach(h2 => {
        gsap.from(h2, {
            scrollTrigger: {
                trigger: h2,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.7,
            ease: 'back.out(1.5)'
        });
    });

    // --- STAT COUNTERS SCALE-BOUNCE ---
    document.querySelectorAll('.stat').forEach(stat => {
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(2)'
        });
    });

    // --- TIMELINE ITEMS ALTERNATE SLIDE ---
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: i % 2 === 0 ? -80 : 80,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // --- REWARDS / SOURCING / BUSINESS SPLIT PANELS ---
    const splitSections = ['.rewards-container', '.sourcing-content', '.business-content'];
    splitSections.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            const children = el.children;
            if (children[0]) {
                gsap.from(children[0], {
                    scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
                    x: -60, opacity: 0, duration: 0.9, ease: 'power3.out'
                });
            }
            if (children[1]) {
                gsap.from(children[1], {
                    scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
                    x: 60, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.2
                });
            }
        }
    });

    // --- FOOTER SLIDE-UP ---
    const footer = document.querySelector('.footer');
    if (footer) {
        gsap.from(footer, {
            scrollTrigger: {
                trigger: footer,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    }

    // --- SMOOTH NAVBAR SHADOW ON SCROLL ---
    ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (self.direction === 1) {
                    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
                } else {
                    navbar.style.boxShadow = 'none';
                }
            }
        }
    });
}

// ============================================================
// PARTICLES.JS CONFIGURATION — Hero Sections
// ============================================================
function initParticles() {
    if (typeof particlesJS === 'undefined') return;

    // Find the first hero section on the page
    const heroSection = document.querySelector('.hero, .about-hero, .menu-hero, .blog-hero, .services-hero, .contact-hero');
    if (!heroSection) return;

    // Create particles container inside the hero
    const particlesDiv = document.createElement('div');
    particlesDiv.id = 'particles-js';
    particlesDiv.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;';
    heroSection.style.position = 'relative';
    heroSection.insertBefore(particlesDiv, heroSection.firstChild);

    // Make sure hero content is above particles
    Array.from(heroSection.children).forEach(child => {
        if (child.id !== 'particles-js') {
            child.style.position = 'relative';
            child.style.zIndex = '1';
        }
    });

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: { enable: true, value_area: 800 }
            },
            color: { value: '#f87e0a' },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 4,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#f87e0a',
                opacity: 0.15,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
            }
        },
        retina_detect: true
    });
}

// ============================================================
// MAGNETIC BUTTON EFFECT
// ============================================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .view-all-btn, .deal-content button');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.3s ease';
        });
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'none';
        });
    });
}

// ============================================================
// SMOOTH CURSOR GLOW EFFECT
// ============================================================
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    glow.style.cssText = `
        position: fixed; top: 0; left: 0; width: 300px; height: 300px;
        background: radial-gradient(circle, rgba(248, 126, 10, 0.06) 0%, transparent 70%);
        border-radius: 50%; pointer-events: none; z-index: 9998;
        transform: translate(-50%, -50%); transition: opacity 0.3s;
        opacity: 0;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.opacity = '1';
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
}

// ============================================================
// TILT EFFECT ON CARDS
// ============================================================
function initTiltCards() {
    const cards = document.querySelectorAll('.step-card, .value-card, .deal-card, .trending-card, .pricing-card, .service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

// ============================================================
// INITIALIZE EVERYTHING ON DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initGSAPAnimations();
    initParticles();
    initMagneticButtons();
    initCursorGlow();
    initTiltCards();
});
