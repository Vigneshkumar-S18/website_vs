/* ============================================
   VS BIKES — Website Interactivity
   ============================================ */

// ---- Vehicle Data for Test Ride Form ----
const vehicleData = {
  honda: [
    'Activa 6G', 'Activa 125', 'Dio', 'Shine', 'SP 125',
    'Unicorn', 'Hornet 2.0', 'CB200X', 'CB300R', 'Livo',
    'Dream', 'CD 110 Dream'
  ],
  hero: [
    'Splendor Plus', 'HF Deluxe', 'Glamour', 'Passion Plus',
    'Xpulse 200', 'Xpulse 200T', 'Xtreme 160R', 'Destini 125',
    'Pleasure Plus', 'Maestro Edge 125', 'Super Splendor', 'Karizma XMR'
  ],
  bajaj: [
    'Pulsar 125', 'Pulsar 150', 'Pulsar NS160', 'Pulsar NS200',
    'Pulsar RS200', 'Pulsar N250', 'Pulsar F250', 'CT 110',
    'Platina 110', 'Dominar 250', 'Dominar 400', 'Avenger 160',
    'Avenger 220 Cruise'
  ],
  royal_enfield: [
    'Classic 350', 'Bullet 350', 'Hunter 350', 'Meteor 350',
    'Super Meteor 650', 'Continental GT 650', 'Interceptor 650',
    'Himalayan', 'Scram 411', 'Shotgun 650'
  ],
  suzuki: [
    'Access 125', 'Burgman Street 125', 'Avenis 125',
    'Gixxer 150', 'Gixxer 250', 'Gixxer SF 150', 'Gixxer SF 250',
    'V-Strom SX', 'Intruder 150', 'Hayabusa'
  ],
  tvs: [
    'Jupiter 125', 'Jupiter Classic', 'NTORQ 125', 'XL100',
    'Apache RTR 160', 'Apache RTR 160 4V', 'Apache RTR 200 4V',
    'Apache RR 310', 'Raider 125', 'Ronin', 'Star City Plus',
    'Sport', 'Radeon', 'iQube Electric'
  ],
  ktm: [
    'Duke 125', 'Duke 200', 'Duke 250', 'Duke 390',
    'RC 125', 'RC 200', 'RC 390',
    'Adventure 250', 'Adventure 390'
  ],
  yamaha: [
    'MT-15 V2', 'R15 V4', 'FZ-S FI', 'FZ FI', 'FZ-X',
    'RayZR 125', 'Fascino 125', 'Aerox 155'
  ]
};

// ---- WhatsApp Number ----
const WHATSAPP_NUMBER = '916381547511';

// ---- Google Apps Script URL ----
// IMPORTANT: Paste your published Web App URL below between the quotes!
const GOOGLE_SCRIPT_URL = '';

// ---- Database Submission Utility ----
function submitToGoogleSheet(data) {
  if (!GOOGLE_SCRIPT_URL) return;
  try {
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Error submitting to Google Sheet:', error);
  }
}

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initGiftCards();
  initTestRideForm();
  initEnquiryForm();
  initSmoothScroll();
  initActiveNavHighlight();
});

/* ---- NAVBAR ---- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close menu on overlay click
  if (overlay) {
    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ---- SCROLL REVEAL ---- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---- SMOOTH SCROLL ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ---- ACTIVE NAV HIGHLIGHT ---- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

/* ---- GIFT CARDS ---- */
function initGiftCards() {
  const giftCards = document.querySelectorAll('.gift-item-new');
  giftCards.forEach(card => {
    card.addEventListener('click', () => {
      giftCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
}

/* ---- TEST RIDE FORM ---- */
function initTestRideForm() {
  const brandSelect = document.getElementById('tr-brand');
  const vehicleSelect = document.getElementById('tr-vehicle');
  const form = document.getElementById('test-ride-form');
  const formContainer = document.getElementById('test-ride-form-container');
  const successMsg = document.getElementById('test-ride-success');

  if (!brandSelect || !vehicleSelect) return;

  // Populate vehicles on brand change
  brandSelect.addEventListener('change', function () {
    const brand = this.value;
    vehicleSelect.innerHTML = '<option value="">Select Vehicle</option>';

    if (brand && vehicleData[brand]) {
      vehicleData[brand].forEach(vehicle => {
        const option = document.createElement('option');
        option.value = vehicle;
        option.textContent = vehicle;
        vehicleSelect.appendChild(option);
      });
      vehicleSelect.disabled = false;
    } else {
      vehicleSelect.disabled = true;
    }
  });

  // Form submission
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('tr-name').value.trim();
      const mobile = document.getElementById('tr-mobile').value.trim();
      const brand = brandSelect.options[brandSelect.selectedIndex]?.text || '';
      const vehicle = vehicleSelect.value;
      const branch = document.getElementById('tr-branch').value;
      const date = document.getElementById('tr-date').value;

      // Validate
      if (!name || !mobile || !brand || !vehicle || !branch || !date) {
        shakeButton(form.querySelector('.btn'));
        return;
      }

      if (!/^[6-9]\d{9}$/.test(mobile)) {
        shakeButton(form.querySelector('.btn'));
        return;
      }

      // Send to Google Sheets
      submitToGoogleSheet({
        formType: 'Test Ride',
        name: name,
        mobile: mobile,
        brand: brand,
        vehicle: vehicle,
        branch: branch,
        prefDate: date,
        prefTime: document.getElementById('tr-time')?.value || '',
        message: ''
      });

      // Send via WhatsApp
      const message = `🏍️ *TEST RIDE BOOKING*%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Mobile:* ${mobile}%0A` +
        `*Brand:* ${brand}%0A` +
        `*Vehicle:* ${vehicle}%0A` +
        `*Branch:* ${branch}%0A` +
        `*Preferred Date:* ${date}%0A%0A` +
        `Booked via VS BIKES Website`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

      // Show success
      formContainer.style.display = 'none';
      successMsg.classList.add('show');

      // Reset after 5 seconds
      setTimeout(() => {
        form.reset();
        vehicleSelect.innerHTML = '<option value="">Select Vehicle</option>';
        vehicleSelect.disabled = true;
        formContainer.style.display = 'flex';
        successMsg.classList.remove('show');
      }, 5000);
    });
  }
}

/* ---- ENQUIRY FORM ---- */
function initEnquiryForm() {
  const brandSelect = document.getElementById('eq-brand');
  const vehicleSelect = document.getElementById('eq-vehicle');
  const form = document.getElementById('enquiry-form');
  const formEl = document.getElementById('enquiry-form-el');
  const successMsg = document.getElementById('enquiry-success');

  if (!brandSelect || !vehicleSelect) return;

  brandSelect.addEventListener('change', function () {
    const brand = this.value;
    vehicleSelect.innerHTML = '<option value="">Select Vehicle (Optional)</option>';

    if (brand && vehicleData[brand]) {
      vehicleData[brand].forEach(vehicle => {
        const option = document.createElement('option');
        option.value = vehicle;
        option.textContent = vehicle;
        vehicleSelect.appendChild(option);
      });
      vehicleSelect.disabled = false;
    } else {
      vehicleSelect.disabled = true;
    }
  });

  if (formEl) {
    formEl.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('eq-name').value.trim();
      const mobile = document.getElementById('eq-mobile').value.trim();
      const brand = brandSelect.options[brandSelect.selectedIndex]?.text || '';
      const vehicle = vehicleSelect.value || 'Not specified';
      const branch = document.getElementById('eq-branch')?.value || 'Not specified';
      const msg = document.getElementById('eq-message')?.value?.trim() || '';

      if (!name || !mobile) {
        shakeButton(formEl.querySelector('.btn'));
        return;
      }

      if (!/^[6-9]\d{9}$/.test(mobile)) {
        shakeButton(formEl.querySelector('.btn'));
        return;
      }

      // Send to Google Sheets
      submitToGoogleSheet({
        formType: 'Contact / Enquiry',
        name: name,
        mobile: mobile,
        brand: brand,
        vehicle: vehicle,
        branch: branch,
        prefDate: '',
        prefTime: '',
        message: msg
      });

      const message = `📝 *NEW ENQUIRY*%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Mobile:* ${mobile}%0A` +
        `*Interested Brand:* ${brand}%0A` +
        `*Interested Vehicle:* ${vehicle}%0A` +
        `*Preferred Branch:* ${branch}%0A` +
        `*Message:* ${msg || 'N/A'}%0A%0A` +
        `Enquiry from VS BIKES Website`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

      form.style.display = 'none';
      successMsg.classList.add('show');

      setTimeout(() => {
        formEl.reset();
        vehicleSelect.innerHTML = '<option value="">Select Vehicle (Optional)</option>';
        vehicleSelect.disabled = true;
        form.style.display = 'block';
        successMsg.classList.remove('show');
      }, 5000);
    });
  }
}

/* ---- BOOK NOW (Offers section) ---- */
function bookNow() {
  const selectedGift = document.querySelector('.gift-item-new.selected');
  const giftName = selectedGift ? selectedGift.querySelector('span').innerText : 'Not selected';

  submitToGoogleSheet({
    formType: 'Offer Booking',
    message: 'Interested in booking via website. Selected Gift: ' + giftName
  });

  const message = `🎁 *WEBSITE BOOKING ENQUIRY*%0A%0A` +
    `I'd like to book through the website and claim the offers!%0A%0A` +
    `*Selected Gift:* ${giftName}%0A%0A` +
    `Please share vehicle availability and pricing details.%0A%0A` +
    `Sent from VS BIKES Website`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
}

/* ---- SERVICE GUIDANCE ---- */
function serviceGuidance() {
  submitToGoogleSheet({
    formType: 'Service Guidance',
    message: 'User clicked Get Service Guidance button'
  });

  const message = `🔧 *SERVICE SUPPORT REQUEST*%0A%0A` +
    `I need guidance for servicing/maintenance of my two-wheeler.%0A%0A` +
    `Sent from VS BIKES Website`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
}

/* ---- FINANCE CHECK ---- */
function checkFinance() {
  submitToGoogleSheet({
    formType: 'Finance Check',
    message: 'User clicked Check Finance Options button'
  });

  const message = `💳 *FINANCE ENQUIRY*%0A%0A` +
    `I'd like to check my two-wheeler finance options and eligibility.%0A%0A` +
    `Sent from VS BIKES Website`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
}

/* ---- UTILITY ---- */
function shakeButton(btn) {
  if (!btn) return;
  btn.style.animation = 'shake 0.4s ease';
  setTimeout(() => { btn.style.animation = ''; }, 400);
}

// Shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);
