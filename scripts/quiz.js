function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
  function loadQuizzes() {
    return JSON.parse(localStorage.getItem('quizzes') || '[]');
  }
  function loadUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  function updateUser(user) {
    const users = loadUsers();
    const idx = users.findIndex(u => u.email === user.email);
    if (idx > -1) {
      users[idx] = user;
      saveUsers(users);
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'auth.html';
  }