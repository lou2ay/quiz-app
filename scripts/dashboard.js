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

  document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    if (!user || !user.isAdmin) return window.location.href = 'auth.html';
  
    document.getElementById('logout-btn').addEventListener('click', logout);

    const list = document.getElementById('user-list');
    loadUsers().forEach(u => {
      const block = document.createElement('div');
      block.className = 'user-block';
      block.innerHTML = `<h3>${u.email}</h3>`;
      if (u.scores && u.scores.length) {
        const ul = document.createElement('ul');
        u.scores.forEach(s => {
          const date = new Date(s.date).toLocaleString();
          ul.innerHTML += `<li>Quiz ${s.quizId}: ${s.score} (${date})</li>`;
        });
        block.append(ul);
      } else {
        block.innerHTML += `<p>No scores yet.</p>`;
      }
      list.append(block);
    });
  });