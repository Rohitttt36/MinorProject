document.addEventListener('DOMContentLoaded', function () {
  // Contact form validation
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert('Thank you for contacting us, ' + name + '! We will get back to you soon.');
    form.reset();
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Login form handling
  const loginLink = document.getElementById('login-link');
  const loginModal = document.getElementById('login-modal');
  const loginForm = document.getElementById('login-form');
  const loginCancel = document.getElementById('login-cancel');
  const loginMessage = document.getElementById('login-message');
  const registerForm = document.getElementById('register-form');
  const registerCancel = document.getElementById('register-cancel');
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  const modalTitle = document.getElementById('modal-title');

  // Helper function to get users from localStorage
  function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  }

  // Helper function to save users to localStorage
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  loginLink.addEventListener('click', function (e) {
    e.preventDefault();
    loginModal.style.display = 'block';
    loginMessage.style.display = 'none';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    modalTitle.textContent = 'Login';
  });

  loginCancel.addEventListener('click', function () {
    loginModal.style.display = 'none';
  });

  registerCancel.addEventListener('click', function () {
    loginModal.style.display = 'none';
  });

  showRegisterLink.addEventListener('click', function (e) {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    modalTitle.textContent = 'Register';
  });

  showLoginLink.addEventListener('click', function (e) {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    modalTitle.textContent = 'Login';
  });

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    const users = getUsers();

    if (users[username] && users[username] === password) {
      loginModal.style.display = 'none';
      alert('Thank you for signing in, ' + username + '!');
      loginMessage.style.display = 'none';
      loginForm.reset();
    } else {
      alert('Invalid username or password.');
    }
  });

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = registerForm['reg-username'].value.trim();
    const password = registerForm['reg-password'].value.trim();
    const passwordConfirm = registerForm['reg-password-confirm'].value.trim();

    if (!username || !password || !passwordConfirm) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('Passwords do not match.');
      return;
    }

    const users = getUsers();

    if (users[username]) {
      alert('Username already exists. Please choose another.');
      return;
    }

    users[username] = password;
    saveUsers(users);

    alert('Registration successful! You can now log in.');

    registerForm.reset();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    modalTitle.textContent = 'Login';
  });



// dark mode function 


let btn = document.getElementById("btn");
btn.addEventListener("click", ()=>{

  document.body.classList.toggle("dark-mode");
})

  // Back to Top button
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }

    // Highlight nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__links li a');
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 60;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Hamburger menu toggle
  const menu = document.querySelector('.menu');
  const navLinks = document.getElementById('nav-links');

  menu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});
