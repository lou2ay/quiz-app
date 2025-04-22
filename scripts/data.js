(function() {
    const defaultQuizzes = [
      {
        id: 'html-basics',
        title: 'Basics of HTML',
        questions: [
            {
              text: 'What does HTML stand for?',
              options: [
                'Hyper Text Markup Language',
                'Home Tool Markup Language',
                'Hyperlinks and Text Markup Language'
              ],
              correctIndex: 0
            },
            {
              text: 'Which tag is used to insert an image?',
              options: ['<img>', '<image>', '<picture>'],
              correctIndex: 0
            },
            {
              text: 'How do you create a hyperlink to example.com?',
              options: [
                '<a href="https://example.com">Link</a>',
                '<link url=":https//example.com">Link</link>',
                '<hyperlink src="https://example.com">Link</hyperlink>'
              ],
              correctIndex: 0
            }
          ]
        },
        {
            id: 'css-basics',
            title: 'Basics of CSS',
            questions: [
              {
                text: 'What does CSS stand for?',
                options: [
                  'Cascading Style Sheets',
                  'Computer Style Sheets',
                  'Creative Style System'
                ],
                correctIndex: 0
              },
              {
                text: 'Which property is used to change the background color?',
                options: ['background-color', 'color', 'bgcolor'],
                correctIndex: 0
              },
              {
                text: 'How do you select an element with id "header" in CSS?',
                options: ['#header', '.header', 'header'],
                correctIndex: 0
              }
            ]
          },
          {id: 'js-basics',
            title: 'Basics of JavaScript',
            questions: [
              {
                text: 'Which symbol starts a single-line comment in JavaScript?',
                options: ['//', '/*', '<!--'],
                correctIndex: 0
              },
              {
                text: 'How do you declare a variable in ES6?',
                options: ['var x = 5;', 'let x = 5;', 'int x = 5;'],
                correctIndex: 1
              },
              {
                text: 'Which method outputs text to the browser console?',
                options: ['console.warn()', 'console.log()', 'print()'],
                correctIndex: 1
              }
            ]
          }
        ];
        let existing = [];
        try {
          existing = JSON.parse(localStorage.getItem('quizzes')) || [];
        } catch {
          existing = [];
        }
      
        // Merge defaults and existing, then dedupe by id
        const quizMap = {};
        defaultQuizzes.concat(existing).forEach(q => {
          quizMap[q.id] = q;
        });
        const merged = Object.values(quizMap);
      
        localStorage.setItem('quizzes', JSON.stringify(merged));
      })();