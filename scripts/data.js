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
                '<link url="https://example.com">Link</link>',
                '<hyperlink src="https://example.com">Link</hyperlink>'
              ],
              correctIndex: 0
            }
          ]
        },