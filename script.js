// ============================================
// SMOOTH SCROLLING FOR NAVIGATION
// ============================================

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

// ============================================
// BOOKING MODAL (LeadConnector / GoHighLevel calendar)
// ============================================

const bookingModal = document.getElementById('bookingModal');
const bookingModalClose = document.getElementById('bookingModalClose');

function openBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Header Book Button
const headerBookBtn = document.getElementById('headerBookBtn');
if (headerBookBtn) {
    headerBookBtn.addEventListener('click', openBookingModal);
}

// Hero Book Button
const heroBookBtn = document.getElementById('heroBookBtn');
if (heroBookBtn) {
    heroBookBtn.addEventListener('click', openBookingModal);
}

// Hero Contact Button
const heroContactBtn = document.getElementById('heroContactBtn');
if (heroContactBtn) {
    heroContactBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Close button
if (bookingModalClose) {
    bookingModalClose.addEventListener('click', closeBookingModal);
}

// Click outside the modal content closes it
if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });
}

// Escape key closes the modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && !bookingModal.classList.contains('hidden')) {
        closeBookingModal();
    }
});

// ============================================
// ADDITIONAL ENHANCEMENTS
// ============================================

// Add active state to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth button interaction feedback
document.querySelectorAll('.btn, .cta-button').forEach(button => {
    button.addEventListener('mousedown', function () {
        this.style.transform = 'translateY(2px)';
    });

    button.addEventListener('mouseup', function () {
        this.style.transform = '';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// ============================================
// CONSOLE MESSAGE (OPTIONAL)
// ============================================

console.log('%c🧘 ABC Marketing 🧘', 'color: #d98b6a; font-size: 16px; font-weight: bold;');
