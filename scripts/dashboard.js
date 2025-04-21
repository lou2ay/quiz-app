function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
  function loadUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'auth.html';
  }