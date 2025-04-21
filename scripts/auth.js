// Hard‑coded admin credentials
const ADMIN_EMAIL = 'admin@quiz.com';
const ADMIN_PASS  = 'admin123';

// Load users safely
function loadUsers() {
    const raw = localStorage.getItem('users');
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      console.warn('Clearing malformed users data.');
      localStorage.removeItem('users');
      return [];
    }
  }
  
  // Save the users array back to localStorage
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Store the current session user
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Tab & form references
const loginTab    = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm   = document.getElementById('login-form');
const regForm     = document.getElementById('register-form');

// Switch between Login and Register tabs
function toggleTab(tab) {
    if (tab === 'login') {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.classList.remove('hidden');
      regForm.classList.add('hidden');
    } else {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      regForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    }
  }
  
  loginTab.addEventListener('click', () => toggleTab('login'));
  registerTab.addEventListener('click', () => toggleTab('register'));