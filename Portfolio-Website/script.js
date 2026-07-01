document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu on clicking any navigation link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // Typewriter Animation for Roles
  const roles = ['Java Developer', 'Frontend Developer', 'MERN Stack Developer', 'Problem Solver'];
  const typeElement = document.getElementById('typing-text');
  let roleIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    if (!typeElement) return;
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      typeElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typeElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      speed = 1800; // Pause at end of role
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400; // Delay before typing next role
    }

    setTimeout(type, speed);
  }
  
  if (typeElement) setTimeout(type, 800);

  // Certifications dynamic preview modal controls
  const modal = document.getElementById('cert-modal');
  const modalIframe = document.getElementById('modal-iframe');
  const modalClose = document.getElementById('modal-close');
  const certItems = document.querySelectorAll('.cert-item');

  certItems.forEach(item => {
    item.addEventListener('click', () => {
      const docPath = item.getAttribute('data-cert');
      if (docPath && modalIframe && modal) {
        modalIframe.src = docPath;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modal && modalClose) {
    const closeModal = () => {
      modal.classList.remove('active');
      modalIframe.src = '';
      document.body.style.overflow = '';
    };
    
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});
