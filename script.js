// ── Hamburger Menu ──
const menuIcon = document.getElementById('menu-icon');
const navLink = document.querySelector('.nav-link');

menuIcon.addEventListener('click', () => {
    navLink.classList.toggle('open');
});
navLink.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLink.classList.remove('open'));
});

// ── Typing Effect ──
const typingEl = document.getElementById('typing-text');
const roles = ['AI Engineer', 'ML Developer', 'Python Developer', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => { isDeleting = true; }, 1800);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(type, isDeleting ? 55 : 110);
}
if (typingEl) type();

// ── Scroll Animations ──
const animateEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15 });

// Stagger skill tags and project cards
document.querySelectorAll('.skill-tag').forEach((tag, i) => {
    tag.style.transitionDelay = `${i * 0.04}s`;
});
document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
});

animateEls.forEach(el => observer.observe(el));

// ── Active Nav on Scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.nav-link a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ── EmailJS Contact Form ──
// 1. Sign up at https://www.emailjs.com
// 2. Replace the three placeholder strings below with your keys
emailjs.init('YOUR_PUBLIC_KEY');

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.send-btn');
        btn.textContent = 'Sending…';
        btn.disabled = true;

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name:  contactForm.querySelector('#name').value,
            reply_to:   contactForm.querySelector('#email').value,
            message:    contactForm.querySelector('#message').value,
        }).then(() => {
            btn.innerHTML = 'Sent! <i class="fa-solid fa-check"></i>';
            contactForm.reset();
            setTimeout(() => {
                btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                btn.disabled = false;
            }, 3000);
        }).catch(() => {
            btn.innerHTML = 'Error — try again';
            btn.disabled = false;
        });
    });
}
