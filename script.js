// Create animated particles background
function createParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 100 + 50;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = xPos + '%';
        particle.style.top = yPos + '%';
        particle.style.setProperty('--duration', duration + 's');
        particle.style.animation = `particleFloat ${duration}s ease-in-out ${delay}s infinite`;
        
        container.appendChild(particle);
    }
}

// Filter portfolio by category
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        portfolioCards.forEach(card => {
            const matches = filter === 'all' || card.getAttribute('data-category') === filter;
            if (matches) {
                card.style.display = '';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

// Smooth scroll for navigation links
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

// Contact form submission - opens the visitor's email client with a prefilled message
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const subject = encodeURIComponent(`New project inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:coffexo.motions@gmail.com?subject=${subject}&body=${body}`;

        const status = document.getElementById('formStatus');
        if (status) {
            status.textContent = `Thanks ${name}! Your email app should open to send the message. I'll reply to ${email} soon.`;
            status.classList.add('visible');
        }
        this.reset();
    });
}

// Add scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-card, .portfolio-card, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize particles on page load
window.addEventListener('load', () => {
    createParticles();
});

// Logo placeholder fallback - show text if the logo image fails to load
const logoImage = document.getElementById('logoImage');
if (logoImage) {
    logoImage.addEventListener('error', () => {
        logoImage.style.display = 'none';
        const placeholder = document.querySelector('.logo-placeholder');
        if (placeholder) placeholder.style.display = 'block';
    });
}
