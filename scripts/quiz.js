// scripts/quiz.js

// --- Helpers --------------------------------------------------

// Get the currently‑logged‑in user (or null)
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
  
  // Load all quizzes from localStorage
  function loadQuizzes() {
    return JSON.parse(localStorage.getItem('quizzes') || '[]');
  }
  
  // Load all users from localStorage
  function loadUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  
  // Save the users array back to localStorage
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  // Update both the currentUser key and the matching user in the users array
  function updateUser(user) {
    const users = loadUsers();
    const idx = users.findIndex(u => u.email === user.email);
    if (idx > -1) {
      users[idx] = user;
      saveUsers(users);
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  // Clear session and go back to login
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'auth.html';
  }
  
  // --- Main Logic -----------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    if (!user) {
      // Not logged in
      return window.location.href = 'auth.html';
    }
  
    // Hook up logout button
    document.getElementById('logout-btn').addEventListener('click', logout);
  
    // Show Dashboard link if admin
    if (user.isAdmin) {
      document.getElementById('dashboard-link').classList.remove('hidden');
    }
  
    // Determine which quiz we're taking
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('quizId');
    const quiz = loadQuizzes().find(q => q.id === quizId);
  
    if (!quiz) {
      document.querySelector('.container').innerHTML =
        '<p>Quiz not found.</p>';
      return;
    }
  
    // Render quiz title
    document.getElementById('quiz-title').textContent = quiz.title;
  
    // Render questions
    const form = document.getElementById('quiz-form');
    quiz.questions.forEach((q, i) => {
      const fieldset = document.createElement('fieldset');
      fieldset.innerHTML = `<legend>${q.text}</legend>` +
        q.options.map((opt, idx) =>
          `<label><input type="radio" name="q${i}" value="${idx}"> ${opt}</label>`
        ).join('');
      form.appendChild(fieldset);
    });
  
    // Add Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Submit';
    form.appendChild(submitBtn);
  
    // Handle submission
    form.addEventListener('submit', e => {
      e.preventDefault();
      let score = 0;
  
      quiz.questions.forEach((q, i) => {
        const selected = form[`q${i}`].value;
        if (parseInt(selected, 10) === q.correctIndex) {
          score++;
        }
      });
  
      // Save score to user record
      user.scores = user.scores || [];
      user.scores.push({
        quizId,
        score,
        date: new Date().toISOString()
      });
      updateUser(user);
  
      // Show result
      form.classList.add('hidden');
      const resultDiv = document.getElementById('result');
      resultDiv.textContent =
        `You scored ${score} out of ${quiz.questions.length}.`;
      resultDiv.classList.remove('hidden');
    });
  });