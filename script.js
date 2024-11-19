document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarList = document.querySelector('.navbar-list');
  const reduceMotionBtn = document.getElementById('reduce-motion');
  let isReducedMotion = false;

  menuToggle.addEventListener('click', () => {
    navbarList.classList.toggle('active');
  });

  // Scrolling animation
  const animateOnScroll = () => {
    const sections = document.querySelectorAll('main > *');
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      if (sectionTop < window.innerHeight * 0.75 && sectionBottom > 0) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  };

  // Initial setup
  const setupSections = () => {
    const sections = document.querySelectorAll('main > *');
    sections.forEach((section) => {
      section.classList.add('hidden');
    });
  };

  setupSections();
  animateOnScroll();

  if (!isReducedMotion) {
    window.addEventListener('scroll', animateOnScroll);
  }

  // Reduce motion button
  reduceMotionBtn.addEventListener('click', () => {
    isReducedMotion = !isReducedMotion;
    if (isReducedMotion) {
      window.removeEventListener('scroll', animateOnScroll);
      document.querySelectorAll('.hidden, .visible').forEach((el) => {
        el.classList.remove('hidden', 'visible');
      });
      reduceMotionBtn.innerHTML = '<i class="fas fa-running"></i><span>Enable Motion</span>';
    } else {
      setupSections();
      window.addEventListener('scroll', animateOnScroll);
      animateOnScroll();
      reduceMotionBtn.innerHTML = '<i class="fas fa-running"></i><span>Reduce Motion</span>';
    }
  });

  // Petition form submission and modal
  const petitionForm = document.getElementById('petition-form');
  if (petitionForm) {
    petitionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const city = document.getElementById('city').value;

      showModal(name, email, city);
    });
  }

  function showModal(name, email, city) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img src="mental_health.png" alt="Thank you" class="modal-image">
        <h2>Thank you, ${name}!</h2>
        <p>Your support from ${city} means a lot to us.</p>
        <p>We'll keep you updated at ${email}.</p>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Image animation
    const modalImage = modal.querySelector('.modal-image');
    setTimeout(() => {
      modalImage.style.transform = 'rotate(360deg) scale(1.2)';
    }, 100);

    // Close button
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
      modal.style.display = 'none';
      document.body.removeChild(modal);
    };

    // Auto-close after 5 seconds
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.removeChild(modal);
    }, 5000);
  }
});