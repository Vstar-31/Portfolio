// Vijay Shankar Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Main element selectors
    const navbar = document.querySelector('.navbar') || document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link, .nav__link');
    const mobileToggle = document.querySelector('.hamburger') || document.querySelector('.nav__mobile-toggle');
    const navMenu = document.querySelector('.nav-menu') || document.querySelector('.nav__links');
    const sections = document.querySelectorAll('section[id]');

    // Responsive Navbar
    function updateNavbarStyle() {
        if(window.scrollY > 50) {
            navbar.style.background = 'rgba(252,252,249,0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(29,116,128,0.13)';
        } else {
            navbar.style.background = '';
            navbar.style.boxShadow = '';
        }
    }

    // Mobile menu toggle logic
    let mobileMenuOpen = false;
    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
        mobileToggle.classList.toggle('is-active');
        navMenu.classList.toggle('active');
        if(mobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
    }
    if(mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);

    // Smooth navigation scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                if(mobileMenuOpen) toggleMobileMenu();
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Section highlighting
    function updateActiveNav() {
        const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    // Animate entry on scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                if(entry.target.classList.contains('skills')) animateSkillTags();
                if(entry.target.classList.contains('projects')) animateProjectCards();
                if(entry.target.classList.contains('achievements')) animateAchievementCards();
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Skill tags animation
    const skillTags = document.querySelectorAll('.skill-tag');
    function animateSkillTags() {
        skillTags.forEach((tag, i) => {
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, i*100);
        });
    }
    skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'all 0.3s ease';
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.07)';
            this.style.boxShadow = '0 4px 12px rgba(33,128,141,0.18)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Projects animation
    const projectCards = document.querySelectorAll('.project-card');
    function animateProjectCards() {
        projectCards.forEach((card, i) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i*200);
        });
    }
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.4s ease';
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Achievements animation
    const achievementCards = document.querySelectorAll('.achievement-card');
    function animateAchievementCards() {
        achievementCards.forEach((card, i) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, i*200);
        });
    }
    achievementCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = 'all 0.5s ease';
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(0) translateY(-4px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) translateY(0)';
        });
    });

    // Hero typing effect
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title, .hero__title-text');
        if(!heroTitle) return;
        const titleSpan = heroTitle.querySelector('.highlight');
        if(!titleSpan) return;
        const text = titleSpan.textContent;
        titleSpan.textContent = '';
        titleSpan.style.borderRight = '3px solid #21808d';
        let i = 0;
        const typeInterval = setInterval(() => {
            titleSpan.textContent += text.charAt(i);
            i++;
            if(i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => { titleSpan.style.borderRight = 'none'; }, 1000);
            }
        }, 120);
    }
    setTimeout(() => {initTypingEffect();}, 500);

    // Responsive events
    window.addEventListener('scroll', () => {
        updateNavbarStyle();
        updateActiveNav();
    });
    window.addEventListener('resize', () => {
        if(mobileMenuOpen && window.innerWidth > 768) toggleMobileMenu();
    });
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 350);

    // For legacy compatibility with old forms if needed
    const contactForm = document.getElementById('contactForm');
    if(contactForm){
        contactForm.addEventListener('submit', function(e){
            e.preventDefault();
            alert("Form submission is currently disabled on this demo portfolio."); // Change as needed
            contactForm.reset();
        });
    }

    console.log('💻 Portfolio JS loaded & working!');
});
