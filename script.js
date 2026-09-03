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
// BOOKING BUTTON HANDLERS
// ============================================

// Header Book Button
const headerBookBtn = document.getElementById('headerBookBtn');
if (headerBookBtn) {
    headerBookBtn.addEventListener('click', () => {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Hero Book Button
const heroBookBtn = document.getElementById('heroBookBtn');
if (heroBookBtn) {
    heroBookBtn.addEventListener('click', () => {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
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

// ============================================
// BOOKING FORM HANDLING
// ============================================

const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('successMessage');
const successDetails = document.getElementById('successDetails');

if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Validate form
        if (!fullName || !email || !phone || !date || !time) {
            alert('Please fill in all fields.');
            return;
        }

        // Format date for display
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create booking details object
        const bookingDetails = {
            name: fullName,
            email: email,
            phone: phone,
            date: formattedDate,
            time: time,
            bookedAt: new Date().toISOString()
        };

        // Store booking in localStorage (optional - for persistence)
        try {
            const existingBookings = JSON.parse(localStorage.getItem('yogaBookings')) || [];
            existingBookings.push(bookingDetails);
            localStorage.setItem('yogaBookings', JSON.stringify(existingBookings));
        } catch (err) {
            console.log('localStorage not available, skipping storage');
        }

        // Log booking to console (for verification)
        console.log('Booking Submitted:', bookingDetails);

        // Show success message
        successDetails.textContent = `Booked for ${formattedDate} at ${time}. We've sent confirmation to ${email}`;
        successMessage.classList.remove('hidden');

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        // Reset form
        bookingForm.reset();

        // Auto-close success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
            overlay.remove();
        }, 5000);

        // Close on overlay click
        overlay.addEventListener('click', () => {
            successMessage.classList.add('hidden');
            overlay.remove();
        });

        // Close on success message click
        successMessage.addEventListener('click', (e) => {
            if (e.target === successMessage) {
                successMessage.classList.add('hidden');
                overlay.remove();
            }
        });
    });
}

// ============================================
// ADDITIONAL ENHANCEMENTS
// ============================================

// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Phone number validation (India format)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function () {
        // Remove non-numeric characters
        this.value = this.value.replace(/[^\d]/g, '');
        
        // Limit to 10 digits
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });
}

// Add active state to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
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
// FORM FIELD FOCUS EFFECTS
// ============================================

document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.01)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ============================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Close success message on Escape
    if (e.key === 'Escape' && !successMessage.classList.contains('hidden')) {
        successMessage.classList.add('hidden');
        const overlay = document.querySelector('.overlay');
        if (overlay) overlay.remove();
    }
});

// ============================================
// CONSOLE MESSAGE (OPTIONAL)
// ============================================

console.log('%c🧘 ZenFlow Yoga Studio 🧘', 'color: #66bb6a; font-size: 16px; font-weight: bold;');
console.log('%cWelcome! Check out your bookings with: JSON.parse(localStorage.getItem("yogaBookings"))', 'color: #a5d6a7; font-size: 12px;');
