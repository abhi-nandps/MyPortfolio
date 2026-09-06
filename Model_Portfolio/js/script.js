// ------------------------------
// Project Data
// ------------------------------
const projects = [
  {
    id: 1,
    title: '🤖 Zyra AI Assistant',
    description:
      'AI-powered Website Development Assistant using LLMs, RAG and MERN Stack.',
    details:
      'AI-powered Website Development Assistant using LLMs, RAG and MERN Stack.',
    technologies: ['React', 'Node', 'MongoDB', 'OpenAI'],
    image: 'images/chatbot.png',
    demo: '#',
    repo: 'https://github.com/'
  },

  {
    id: 2,
    title: '📚 Library Management System',
    description:
      'A MERN Stack Library Management System with Authentication, Book Issue/Return, Membership Management and Dashboard.',
    details:
      'A complete MERN Stack Library Management System designed to manage books, users, memberships and issue/return operations.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    image: 'images/library.png',
    demo: '#',
    repo: 'https://github.com/'
  },

  {
    id: 3,
    title: '🎓 College Alumni Management System',
    description:
      'An innovative and purpose-driven platform that aims to establish and nurture a strong bond between the educational institution and its alumni community.',
    details:
      'A platform designed to establish and nurture a strong connection between the educational institution and its alumni community.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    image: 'images/alumni.png',
    demo: '#',
    repo: 'https://github.com/'
  }
];


// ------------------------------
// Project Elements
// ------------------------------
const projectsGrid = document.getElementById('projectsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');


// ------------------------------
// Create Project Card
// ------------------------------
const createProjectCard = ({
  id,
  title,
  description,
  technologies,
  image,
  demo,
  repo
}) => `
  <article class="project-card">

    <!-- Project Image -->
    <div class="project-image">
      <img
        src="${image}"
        alt="${title}"
        loading="lazy"
        onerror="this.parentElement.classList.add('image-error')"
      >
    </div>

    <!-- Project Content -->
    <div class="project-body">

      <h3>${title}</h3>

      <p>${description}</p>

      <!-- Technologies -->
      <div class="project-tags">
        ${technologies
          .map(tech => `<span class="tag">${tech}</span>`)
          .join('')}
      </div>

      <!-- Project Links -->
      <div class="project-links">

        <a
          href="${demo}"
          aria-label="Open ${title} demo">
          Live Demo
        </a>

        <a
          href="${repo}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open ${title} repository">
          Repository
        </a>

        <button
          class="details-btn"
          data-id="${id}">
          Details
        </button>

      </div>

    </div>

  </article>
`;


// ------------------------------
// Render Projects
// ------------------------------
const renderProjects = (filter = 'all') => {

  if (!projectsGrid) return;

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter(({ technologies }) =>
          technologies.includes(filter)
        );

  projectsGrid.innerHTML = filteredProjects
    .map(createProjectCard)
    .join('');

  // Details buttons
  document.querySelectorAll('.details-btn').forEach(button => {

    button.addEventListener('click', () => {
      openProjectModal(Number(button.dataset.id));
    });

  });
};


// ------------------------------
// Project Filters
// ------------------------------
filterButtons.forEach(button => {

  button.addEventListener('click', () => {

    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    renderProjects(button.dataset.filter);

  });

});


// ------------------------------
// Project Details Modal
// ------------------------------
const openProjectModal = (id) => {

  const project = projects.find(item => item.id === id);

  if (!project || !projectModal) return;

  const {
    title,
    details,
    technologies
  } = project;

  if (modalTitle) {
    modalTitle.textContent = title;
  }

  if (modalDescription) {
    modalDescription.textContent = details;
  }

  if (modalTags) {
    modalTags.innerHTML = technologies
      .map(tech => `<span class="tag">${tech}</span>`)
      .join('');
  }

  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
};


// ------------------------------
// Close Project Modal
// ------------------------------
const closeProjectModal = () => {

  if (!projectModal) return;

  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');

};


if (modalClose) {

  modalClose.addEventListener(
    'click',
    closeProjectModal
  );

}


if (projectModal) {

  projectModal.addEventListener('click', event => {

    if (event.target === projectModal) {
      closeProjectModal();
    }

  });

}


// ------------------------------
// Escape Key
// ------------------------------
document.addEventListener('keydown', event => {

  if (event.key === 'Escape') {
    closeProjectModal();
  }

});


// ------------------------------
// Mobile Navigation
// ------------------------------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {

  navToggle.addEventListener('click', () => {

    const isOpen =
      navLinks.classList.toggle('open');

    navToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

  });

}


document.querySelectorAll('.nav-links a').forEach(link => {

  link.addEventListener('click', () => {

    if (navLinks) {
      navLinks.classList.remove('open');
    }

    if (navToggle) {
      navToggle.setAttribute(
        'aria-expanded',
        'false'
      );
    }

  });

});


// ------------------------------
// Dark / Light Theme
// ------------------------------
const themeToggle =
  document.getElementById('themeToggle');

const savedTheme =
  localStorage.getItem('portfolioTheme') || 'light';

document.documentElement.setAttribute(
  'data-theme',
  savedTheme
);

if (themeToggle) {

  themeToggle.textContent =
    savedTheme === 'dark'
      ? '☀️'
      : '🌙';

  themeToggle.addEventListener('click', () => {

    const currentTheme =
      document.documentElement.getAttribute(
        'data-theme'
      );

    const nextTheme =
      currentTheme === 'dark'
        ? 'light'
        : 'dark';

    document.documentElement.setAttribute(
      'data-theme',
      nextTheme
    );

    localStorage.setItem(
      'portfolioTheme',
      nextTheme
    );

    themeToggle.textContent =
      nextTheme === 'dark'
        ? '☀️'
        : '🌙';

  });

}


// ------------------------------
// Contact Form Regex Validation
// ------------------------------
const contactForm =
  document.getElementById('contactForm');

const nameInput =
  document.getElementById('name');

const emailInput =
  document.getElementById('email');

const messageInput =
  document.getElementById('message');

const formStatus =
  document.getElementById('formStatus');


const patterns = {

  name: /^[A-Za-z][A-Za-z .'-]{2,49}$/,

  email:
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,

  message:
    /^.{10,500}$/s

};


const setError = (field, message) => {

  const errorElement =
    document.getElementById(`${field}Error`);

  if (errorElement) {
    errorElement.textContent = message;
  }

};


const validateName = () => {

  if (!nameInput) return true;

  const value =
    nameInput.value.trim();

  const valid =
    patterns.name.test(value);

  setError(
    'name',
    valid
      ? ''
      : 'Enter a valid name using at least 3 characters.'
  );

  return valid;

};


const validateEmail = () => {

  if (!emailInput) return true;

  const value =
    emailInput.value.trim();

  const valid =
    patterns.email.test(value);

  setError(
    'email',
    valid
      ? ''
      : 'Enter a valid email address.'
  );

  return valid;

};


const validateMessage = () => {

  if (!messageInput) return true;

  const value =
    messageInput.value.trim();

  const valid =
    patterns.message.test(value);

  setError(
    'message',
    valid
      ? ''
      : 'Message must contain 10 to 500 characters.'
  );

  return valid;

};


if (nameInput) {
  nameInput.addEventListener(
    'input',
    validateName
  );
}

if (emailInput) {
  emailInput.addEventListener(
    'input',
    validateEmail
  );
}

if (messageInput) {
  messageInput.addEventListener(
    'input',
    validateMessage
  );
}


if (contactForm) {

  contactForm.addEventListener(
    'submit',
    event => {

      event.preventDefault();

      const validations = [
        validateName(),
        validateEmail(),
        validateMessage()
      ];

      const isValid =
        validations.every(Boolean);

      if (!isValid) {

        if (formStatus) {
          formStatus.textContent =
            'Please correct the highlighted fields.';

          formStatus.style.color =
            '#dc2626';
        }

        return;

      }


      const messageData = {

        name:
          nameInput.value.trim(),

        email:
          emailInput.value.trim(),

        message:
          messageInput.value.trim(),

        submittedAt:
          new Date().toISOString()

      };


      localStorage.setItem(
        'lastPortfolioMessage',
        JSON.stringify(messageData)
      );


      if (formStatus) {

        formStatus.textContent =
          'Message validated successfully. Demo submission completed without reloading the page.';

        formStatus.style.color =
          '#16a34a';

      }


      contactForm.reset();

    }
  );

}


// ------------------------------
// Scroll To Top
// ------------------------------
const scrollTopButton =
  document.getElementById('scrollTop');

if (scrollTopButton) {

  window.addEventListener('scroll', () => {

    scrollTopButton.classList.toggle(
      'visible',
      window.scrollY > 450
    );

  });


  scrollTopButton.addEventListener(
    'click',
    () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }
  );

}


// ------------------------------
// Current Year
// ------------------------------
const yearElement =
  document.getElementById('year');

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


// ------------------------------
// Initial Project Rendering
// ------------------------------
renderProjects();