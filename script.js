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

  // Asynchronous AJAX Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      const formData = new FormData(contactForm);
      const action = contactForm.getAttribute('action');
      
      let statusDiv = document.getElementById('form-status');
      if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'form-status';
        contactForm.appendChild(statusDiv);
      }
      
      if (action.includes('placeholder')) {
        statusDiv.className = 'form-status error active';
        statusDiv.textContent = 'Contact form is in demo mode. Please replace "placeholder" in the form action with your Formspree Endpoint ID!';
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        return;
      }
      
      try {
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          statusDiv.className = 'form-status success active';
          statusDiv.textContent = 'Thank you! Your message was sent successfully.';
          contactForm.reset();
        } else {
          const data = await response.json();
          statusDiv.className = 'form-status error active';
          statusDiv.textContent = data.errors ? data.errors.map(err => err.message).join(', ') : 'Oops! There was a problem submitting your message.';
        }
      } catch (error) {
        statusDiv.className = 'form-status error active';
        statusDiv.textContent = 'Oops! There was a problem connecting to the server.';
      } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Hide message after 8 seconds
        setTimeout(() => {
          statusDiv.classList.remove('active');
        }, 8000);
      }
    });
  }
});
