axios.defaults.headers.common['Authorization'] = 'ylQIQq1xH2RbNTiDYd7ky2cm';

const quizz = document.querySelector('.quizz-t2');
const quizz_content = document.querySelector('.quizz-content-t2');
const buttons = document.querySelector('.buttons-t2');
const level = document.createElement('div');


const createButtons = () => {
  const restart = document.createElement('button');
  const go_home = document.createElement('button');
  restart.setAttribute('data-test', 'restart');
  go_home.setAttribute('data-test', 'go-home');
  restart.classList.add('btn-t2', 'restart-t2');
  go_home.classList.add('btn-t2', 'go-home-t2');
  restart.onclick = restartQuizz;
  go_home.onclick = backToHome;
  `
  <button data-test="restart" class="btn-t2 restart-t2" onclick="restartQuizz()">
    Reiniciar Quizz
  </button>
  <button data-test="go-home" class="btn-t2 go-home-t2" onclick="backToHome()">
    Voltar pra home
  </button>`;
};


const getQuizz = id => {
  axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/' + id)
    .then(response => {
      let { questions, levels, ...data } = response.data;
      levels = levels.map(({ minValue, ...level }) => [minValue, level]);
      createBanner(data);

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

        answers.sort(() => Math.random() - 0.5).forEach(({ text, image, isCorrectAnswer }) => {
          const answer = document.createElement('div');
          answer.isCorrectAnswer = isCorrectAnswer;
          answer.onclick = function () {
            if (!(this.classList.contains('whitish-t2') || this.classList.contains('pressed-t2'))) {
              console.log('Click');
              /* Define se a resposta está correta ou não */
              this.classList.add(this.isCorrectAnswer, 'pressed-t2');
              document.querySelectorAll(`.q${index}-t2 .answer-t2:not(.pressed-t2)`)
                .forEach(element => element.classList.add(element.isCorrectAnswer, 'whitish-t2'));
              const get_answer_presseds = document.querySelectorAll('.pressed-t2');
              if (get_answer_presseds !== null && questions.length === get_answer_presseds.length) {
                let correct = document.querySelectorAll('.true.pressed-t2');
                let precision = Math.round((100 * correct.length / questions.length));

                test = getLevel(precision, levels);
                console.log(test, 'aqui o test de obtenção do level pela precision');

                // title, image, text, 
                // const {title, image, text} = levels

                const level_title = document.createElement('h3');
                level_title.setAttribute('data-test', 'level-title');
                level_title.textContent = `${precision}% de acerto: ${title}`;

                const level_image = document.createElement('img');
                level_image.setAttribute('data-test', 'level-image');
                level_image.setAttribute('src', image);

                const level_text = document.createElement('p');
                level_text.setAttribute('data-test', 'level-text');
                level_text.textContent = text;
                [level_title, level_image, level_text].forEach(element => level.appendChild(element));

                level.classList.add('level-t2');
                quizz_content.appendChild(level);
                buttons.classList.remove('hidden-t2');
              }
              if (questions.length >= index + 1) {
                /* Pula o banner +1, Pula a Question Atual +1 */
                setTimeout(() => quizz_content.childNodes[index + 2].scrollIntoView(), 2000);
              }
            };
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
        quizz_content.appendChild(question);
      });

    })
    .catch(error => console.error(error));
  quizz.classList.remove('hidden-t2');

};

const restartQuizz = () => {
  console.log('Por que alguém reiniciaria isso?');
  document.body.scrollIntoView();
  level.innerHTML = '';
  quizz_content.removeChild(level);
  document.querySelectorAll('.answer-t2').forEach(
    element => element.classList.remove('true', 'false', 'whitish-t2', 'pressed-t2'));
  buttons.classList.add('hidden-t2');
};

const backToHome = () => {
  console.log('Feche logo a página, ao inves de volta por home');
  quizz.classList.add('hidden-t2');
  console.log(document.querySelectorAll('.answer-t2'));
  voltarInicioTela1();

};


// getQuizz(55);



/* Funções de Criação */

const createBanner = ({ title, image }) => {
  const banner = document.createElement('div');
  banner.classList.add('banner-t2', 'center-t2');
  banner.setAttribute('data-test', 'banner');
  banner.innerHTML += `<h2>${title}</h2><img src="${image}">`;
  quizz_content.appendChild(banner);
};

const createQuestion = ({ }) => {

};

const createAnswer = () => {

};

/* Funções de Utilidade */

const getLevel = (precision, levels) => {
  /* 
  Faz um array com os minValues de levels
  Adiciona à cópia a precision, e ordena na forma: a - b
  */
  array = [...levels.map(level => level[0])];
  array.push(precision);
  array.sort((a, b) => a - b);
  return levels[array.lastIndexOf(precision) - 1];
};
























