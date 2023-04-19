axios.defaults.headers.common['Authorization'] = 'ylQIQq1xH2RbNTiDYd7ky2cm';

const getQuizz = id => {
  const quizz = document.querySelector('.quizz-t2');
  axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/' + id)
    .then(response => {
      const { title, image, questions } = response.data;
      const banner = document.createElement('div');
      banner.classList.add('banner-t2', 'center-t2');
      banner.setAttribute('data-test', 'banner');
      banner.innerHTML += `<img src="${image}"><h2>${title}</h2>`;
      quizz.appendChild(banner);
      questions.forEach(({ title, color, answers }, index) => {
        const question = document.createElement('div');
        const question_title = document.createElement('h3');
        question_title.setAttribute('data-test', 'question-title');
        question_title.classList.add('center-t2');
        question_title.style.backgroundColor = color;
        question_title.textContent = title;

        question.setAttribute('data-test', 'question');
        question.classList.add('question-t2', `q${index}-t2`);
        question.appendChild(question_title);
        [...answers, ...answers].sort(() => Math.random() - 0.5).forEach(({ text, image, isCorrectAnswer }) => {
          const answer = document.createElement('div');
          answer.onclick = function () {
            if (!this.classList.contains('whitish-t2', 'pressed-t2')) {
              this.classList.add(isCorrectAnswer, 'pressed-t2');
              document.querySelectorAll(`.q${index}-t2 .answer-t2:not(.pressed-t2)`)
                .forEach(element => element.classList.add('whitish-t2'));
              if (questions.length >= index + 1) {
                setTimeout(() => Array.from(quizz.childNodes).slice(1)[index + 1].scrollIntoView(), 2000);
              }
            }
          };
          const answer_text = document.createElement('p');
          answer_text.setAttribute('data-test', 'answer-text');
          answer_text.textContent = text;

          answer.setAttribute('data-test', 'answer');
          answer.classList.add('answer-t2');

          answer.innerHTML = `<img src="${image}">`;
          answer.appendChild(answer_text);
          question.appendChild(answer);
        });
        quizz.appendChild(question);
      });

    }).catch(error => console.error(error));
};

getQuizz(6);


























