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
  