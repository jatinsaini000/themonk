import './style.css'

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('nav');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isHidden = navLinks.classList.contains('hidden');
    if (isHidden) {
      navLinks.classList.remove('hidden');
      navLinks.classList.add('flex', 'flex-col', 'absolute', 'top-20', 'left-0', 'w-full', 'bg-[#0F0F0F]', 'p-6', 'border-b', 'border-white/10', 'gap-4', 'shadow-2xl');
    } else {
      navLinks.classList.add('hidden');
      navLinks.classList.remove('flex', 'flex-col', 'absolute', 'top-20', 'left-0', 'w-full', 'bg-[#0F0F0F]', 'p-6', 'border-b', 'border-white/10', 'gap-4', 'shadow-2xl');
    }
  });
}

// Package Selection Auto-Sync
const packageSelectButtons = document.querySelectorAll('.package-select-btn');
const packageDropdown = document.getElementById('package-select');

packageSelectButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const selectedPkg = btn.getAttribute('data-select-package');
    if (packageDropdown && selectedPkg) {
      packageDropdown.value = selectedPkg;
      
      // Pulse animation on the dropdown to draw the user's attention
      packageDropdown.classList.add('ring-2', 'ring-primary');
      setTimeout(() => {
        packageDropdown.classList.remove('ring-2', 'ring-primary');
      }, 1500);
    }
  });
});

// Intersection Observer for Reveal Animations
const observerOptions = {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('section > div').forEach(el => {
  observer.observe(el);
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || !targetId) return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });

      // Close mobile menu if open
      if (navLinks && !navLinks.classList.contains('hidden') && window.innerWidth < 1024) {
        navLinks.classList.add('hidden');
        navLinks.classList.remove('flex', 'flex-col', 'absolute', 'top-20', 'left-0', 'w-full', 'bg-[#0F0F0F]', 'p-6', 'border-b', 'border-white/10', 'gap-4', 'shadow-2xl');
      }
    }
  });
});

// Form Submission State Handling
const contactForm = document.getElementById('campaign-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">⟳</span>
        <span>Transmitting Request...</span>
      `;
      submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
    }
  });
}
