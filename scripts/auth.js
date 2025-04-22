// scripts/auth.js

// Hard‑coded admin credentials
const ADMIN_EMAIL = 'admin@quiz.com';
const ADMIN_PASS  = 'admin123';

/**
 * Safely load the users array from localStorage.
 * If there’s no data, invalid JSON, or it isn’t an Array,
 * this will clear the bad data and return [].
 */
function loadUsers() {
  const raw = localStorage.getItem('users');
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn('users data was not an array—resetting to empty array.');
      localStorage.removeItem('users');
      return [];
    }
    return parsed;
  } catch (e) {
    console.warn('Error parsing users JSON—resetting to empty array.', e);
    localStorage.removeItem('users');
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

const loginTab    = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm   = document.getElementById('login-form');
const regForm     = document.getElementById('register-form');

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

// Registration handler
regForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const pass  = document.getElementById('reg-password').value;
  const users = loadUsers();

  if (users.some(u => u.email === email)) {
    return alert('Email already registered.');
  }

  users.push({ email, password: pass, isAdmin: false, scores: [] });
  saveUsers(users);
  alert('Registration successful! Please log in.');
  toggleTab('login');
});

// Login handler
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass  = document.getElementById('login-password').value;

  // Admin login
  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    setCurrentUser({ email, isAdmin: true, scores: [] });
    return window.location.href = './dashboard.html';
  }

  // Regular user login
  const users = loadUsers();
  const user  = users.find(u => u.email === email && u.password === pass);
  if (!user) {
    return alert('Invalid email or password.');
  }

  setCurrentUser(user);
  window.location.href = './home.html';
});
