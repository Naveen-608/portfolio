// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

// Skill bars
const bars = document.querySelectorAll('.skill-bar');
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.getAttribute('data-width') + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
bars.forEach(b => barObs.observe(b));

// Nav shrink on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.padding = window.scrollY > 60 ? '0.9rem 4rem' : '';
});

// Contact form — sends email via EmailJS
// SETUP STEPS:
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail recommended) → copy your SERVICE ID
// 3. Create an Email Template → copy your TEMPLATE ID
//    In the template use these variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Go to Account → copy your PUBLIC KEY
// 5. Replace the three placeholder values below

const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← paste here
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← paste here
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← paste here

// Load EmailJS SDK
(function () {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = () => emailjs.init(EMAILJS_PUBLIC_KEY);
  document.head.appendChild(script);
})();

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const btn     = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const status  = document.getElementById('formStatus');

  btnText.textContent = 'Sending…';
  btn.disabled = true;
  status.textContent = '';
  status.className = 'form-status';

  const params = {
    from_name:  document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    subject:    document.getElementById('subject').value,
    message:    document.getElementById('message').value,
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(() => {
      status.textContent = '✓ Message sent! I will get back to you soon.';
      status.classList.add('success');
      this.reset();
    })
    .catch((err) => {
      console.error(err);
      status.textContent = '✗ Something went wrong. Please try again.';
      status.classList.add('error');
    })
    .finally(() => {
      btnText.textContent = 'Send Message →';
      btn.disabled = false;
    });
});