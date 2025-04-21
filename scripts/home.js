function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  // Load quizzes from localStorage
  function loadQuizzes() {
    return JSON.parse(localStorage.getItem('quizzes') || '[]');
  }