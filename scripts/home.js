function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  // Load quizzes from localStorage
  function loadQuizzes() {
    return JSON.parse(localStorage.getItem('quizzes') || '[]');
  }

  // Logout helper
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'auth.html';
  }

   // Render the Home page
   document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    if (!user) {
      window.location.href = 'auth.html';
      return;
    }
  
    // Greeting and navigation
    const welcomeEl = document.getElementById('welcome-msg');
    welcomeEl.textContent = `Welcome, ${user.email}!`;
  
    if (user.isAdmin) {
      document.getElementById('dashboard-link').classList.remove('hidden');
    }
    document.getElementById('logout-btn').addEventListener('click', logout);

     // Display quizzes in fixed order
     const quizListEl = document.getElementById('quiz-list');
     const allQuizzes = loadQuizzes();
     const order = ['html-basics', 'css-basics', 'js-basics'];
     const quizzesToShow = order
       .map(id => allQuizzes.find(q => q.id === id))
       .filter(q => q);
   
     if (quizzesToShow.length === 0) {
       quizListEl.textContent = 'No quizzes available.';
       return;
     }
   
     quizzesToShow.forEach(quiz => {
       const card = document.createElement('div');
       card.className = 'quiz-card';
   
       const title = document.createElement('h3');
       title.textContent = quiz.title;
   
       const btn = document.createElement('button');
       btn.textContent = 'Start Quiz';
       btn.addEventListener('click', () => {
         window.location.href = `quiz.html?quizId=${quiz.id}`;
       });
   
       card.append(title, btn);
       quizListEl.append(card);
     });
   });