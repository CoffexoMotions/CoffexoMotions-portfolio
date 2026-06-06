// Create animated particles background
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
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

// Update active nav link based on current page
function updateActiveNavLink() {
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === '../index.html' || link.getAttribute('href') === 'index.html') {
            if (currentLocation.includes('index.html') || currentLocation.endsWith('/')) {
                link.classList.add('active');
            }
        } else if (currentLocation.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
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
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
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

const elementsToObserve = document.querySelectorAll('.experience-card, .portfolio-card, .review-card, .stat, .about-text, .contact-info');
elementsToObserve.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize particles on page load
window.addEventListener('load', () => {
    createParticles();
    updateActiveNavLink();
});

// Logo placeholder update (user can add their image URL)
const logoImage = document.getElementById('logoImage');
if (logoImage) {
    logoImage.addEventListener('error', () => {
        logoImage.style.display = 'none';
        const placeholder = document.querySelector('.logo-placeholder');
        if (placeholder) {
            placeholder.style.display = 'block';
        }
    });
}
