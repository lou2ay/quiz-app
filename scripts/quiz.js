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

  document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    if (!user) return window.location.href = 'auth.html';
  
    document.getElementById('logout-btn').addEventListener('click', logout);
    if (user.isAdmin) document.getElementById('dashboard-link').classList.remove('hidden');
  
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('quizId');
    const quiz = loadQuizzes().find(q => q.id === quizId);
    if (!quiz) {
      document.body.innerHTML = '<p>Quiz not found.</p>';
      return;
    }
  
    document.getElementById('quiz-title').textContent = quiz.title;
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
  
    quiz.questions.forEach((q, i) => {
      const fieldset = document.createElement('fieldset');
      fieldset.innerHTML = `<legend>${q.text}</legend>` +
        q.options.map((opt, idx) =>
          `<label><input type="radio" name="q${i}" value="${idx}"> ${opt}</label>`
        ).join('');
      form.append(fieldset);
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        let score = 0;
        quiz.questions.forEach((q, i) => {
          const sel = form[`q${i}`].value;
          if (parseInt(sel, 10) === q.correctIndex) score++;
        });
    
        user.scores = user.scores || [];
        user.scores.push({ quizId, score, date: new Date().toISOString() });
        updateUser(user);
    
        form.classList.add('hidden');
        resultDiv.textContent = `You scored ${score} out of ${quiz.questions.length}.`;
        resultDiv.classList.remove('hidden');
      });
    });
    