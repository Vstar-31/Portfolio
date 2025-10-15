// Vijay Shankar Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav__link');
    const mobileToggle = document.querySelector('.nav__mobile-toggle');
    const navLinksContainer = document.querySelector('.nav__links');
    const heroTitle = document.querySelector('.hero__title-text');
    const skillBars = document.querySelectorAll('.skill-progress');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section[id]');
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.backdropFilter = 'blur(25px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Mobile navigation toggle
    let mobileMenuOpen = false;
    
    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
        
        if (mobileMenuOpen) {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '100%';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.right = '0';
            navLinksContainer.style.background = 'rgba(10, 10, 10, 0.98)';
            navLinksContainer.style.padding = 'var(--space-16)';
            navLinksContainer.style.backdropFilter = 'blur(20px)';
            navLinksContainer.style.borderTop = '1px solid var(--color-border)';
            navLinksContainer.style.zIndex = '1001';
            
            // Animate toggle icon
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            navLinksContainer.style.display = '';
            navLinksContainer.style.flexDirection = '';
            navLinksContainer.style.position = '';
            navLinksContainer.style.top = '';
            navLinksContainer.style.left = '';
            navLinksContainer.style.right = '';
            navLinksContainer.style.background = '';
            navLinksContainer.style.padding = '';
            navLinksContainer.style.backdropFilter = '';
            navLinksContainer.style.borderTop = '';
            navLinksContainer.style.zIndex = '';
            
            // Reset toggle icon
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fixed smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // Use scrollIntoView for better compatibility
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenuOpen) {
                    toggleMobileMenu();
                }
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skills') || entry.target.closest('.skills')) {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 300);
                }
                
                // Trigger achievement animations
                if (entry.target.classList.contains('achievement-item')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const elementsToAnimate = document.querySelectorAll('.about__content, .skills__content, .project-card, .contact__content');
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Observe sections for skill bar animation
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Observe achievement items individually
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Animate skill bars
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, index * 150);
        });
    }
    
    // Typing effect for hero title
    function initTypingEffect() {
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--color-primary)';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typeInterval);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }, 120);
    }
    
    // Parallax effect for hero section
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const particles = document.querySelectorAll('.particle');
        
        if (heroSection && scrolled < window.innerHeight) {
            const rate = scrolled * -0.2;
            heroSection.style.transform = `translateY(${rate}px)`;
            
            // Animate particles differently
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.3;
                particle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        }
    }
    
    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const formInputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            formInputs.forEach(input => {
                if (!validateField({ target: input })) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
        
        // Form validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidation);
        });
    }
    
    // Form validation functions
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        clearValidation.call(field);
        
        if (!value && field.hasAttribute('required')) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }
    
    function clearValidation() {
        this.style.borderColor = '';
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.color = '#ef4444';
        errorMsg.style.fontSize = 'var(--font-size-sm)';
        errorMsg.style.marginTop = 'var(--space-4)';
        errorMsg.textContent = message;
        
        field.parentNode.appendChild(errorMsg);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            font-family: var(--font-family-base);
            font-size: 14px;
            max-width: 300px;
        `;
        
        // Set colors based on type
        const colors = {
            success: { bg: '#10b981', color: 'white' },
            error: { bg: '#ef4444', color: 'white' },
            info: { bg: '#3b82f6', color: 'white' }
        };
        
        notification.style.background = colors[type].bg;
        notification.style.color = colors[type].color;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Smooth reveal animation for hero content
    function initHeroAnimation() {
        const heroContent = document.querySelector('.hero__content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
                
                // Start typing effect after hero animation
                setTimeout(() => {
                    initTypingEffect();
                }, 800);
            }, 300);
        }
    }
    
    // Project card hover effects
    function initProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Skill tag hover effects
    function initSkillTagEffects() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.3)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Performance optimization: throttle scroll events
    let ticking = false;
    function throttleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                updateActiveNav();
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape' && mobileMenuOpen) {
            toggleMobileMenu();
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });
    
    // Initialize all effects
    function initializePortfolio() {
        initHeroAnimation();
        initProjectCardEffects();
        initSkillTagEffects();
        
        // Add focus styles for accessibility
        const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--color-primary)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
        
        console.log('🚀 Vijay Shankar Portfolio initialized successfully!');
    }
    
    // Event listeners
    window.addEventListener('scroll', throttleScroll);
    window.addEventListener('resize', () => {
        // Close mobile menu on resize
        if (mobileMenuOpen && window.innerWidth > 768) {
            toggleMobileMenu();
        }
    });
    
    // Initialize everything
    initializePortfolio();
    
    // Preload animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});