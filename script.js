// Interactive Script for Portfolio Showcase
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dynamic navbar border transition on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.borderBottomColor = 'rgba(56, 189, 248, 0.2)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
            navbar.style.boxShadow = 'none';
        }
    });
});

// Function to switch slides in Sicily Palermo Tour Presentation
function switchSptSlide(index) {
    const slides = document.querySelectorAll('.spt-slide');
    const tabs = document.querySelectorAll('.spt-tab-btn');
    const thumbs = document.querySelectorAll('.spt-thumb-card');

    if (slides.length === 0) return;

    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    thumbs.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// ==========================================================================
// Poster Modal & Interactive Booking Simulator Logic
// ==========================================================================

function openPosterModal() {
    const modal = document.getElementById('poster-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }
}

function closePosterModal() {
    const modal = document.getElementById('poster-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal if user clicks outside container
window.addEventListener('click', (e) => {
    const modal = document.getElementById('poster-modal');
    if (e.target === modal) {
        closePosterModal();
    }
});

// Update Passengers Stepper & Price Calculation
function updateSimPassengers(delta) {
    const input = document.getElementById('sim-passengers');
    const priceDisplay = document.getElementById('sim-price-display');
    const btnPriceDisplay = document.getElementById('btn-price-display');

    if (!input) return;

    let currentVal = parseInt(input.value) || 1;
    currentVal = Math.max(1, Math.min(10, currentVal + delta));

    input.value = currentVal;

    const totalPrice = (currentVal * 30).toFixed(2);
    if (priceDisplay) priceDisplay.textContent = `€${totalPrice}`;
    if (btnPriceDisplay) btnPriceDisplay.textContent = `€${totalPrice}`;
}

// Handle Simulated Booking Form Submit
function handleSimulatedBooking(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('sim-submit-btn');
    const form = document.getElementById('simulated-booking-form');
    const resultBox = document.getElementById('sim-result-box');

    if (!submitBtn || !form || !resultBox) return;

    // Show loading state on button
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Elaborazione con Gateway Stripe...';
    submitBtn.disabled = true;

    // Simulate 1 second network/gateway delay
    setTimeout(() => {
        const nameVal = document.getElementById('sim-name')?.value || 'Mario Rossi';
        const pickupVal = document.getElementById('sim-pickup')?.value || 'Piazzale Giotto';
        const passVal = document.getElementById('sim-passengers')?.value || '1';
        const totalPrice = (parseInt(passVal) * 30).toFixed(2);

        // Update Ticket Confirmation Details
        const ticketId = '#SPT-' + Math.floor(10000 + Math.random() * 90000);
        document.getElementById('ticket-id-display').textContent = ticketId;
        document.getElementById('ticket-name').textContent = nameVal;
        document.getElementById('ticket-pickup').textContent = pickupVal;
        document.getElementById('ticket-count').textContent = `${passVal} Passeggero/i (€${totalPrice})`;

        // Hide form, show success result
        form.style.display = 'none';
        resultBox.style.display = 'block';

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

// Reset Simulation
function resetSimulatedBooking() {
    const form = document.getElementById('simulated-booking-form');
    const resultBox = document.getElementById('sim-result-box');

    if (form) {
        form.reset();
        form.style.display = 'block';
    }
    if (resultBox) {
        resultBox.style.display = 'none';
    }

    updateSimPassengers(0); // Reset price display to €30.00
}

// Copy Email Address to Clipboard Function
function copyEmailToClipboard() {
    const email = 'neosdeveloper1344@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById('copy-email-btn');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check" style="color: #00E676;"></i> Copiata negli Appunti!';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2500);
        }
    }).catch(err => {
        alert('Indirizzo Email: ' + email);
    });
}
