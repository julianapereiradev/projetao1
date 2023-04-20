axios.defaults.headers.common['Authorization'] = 'ylQIQq1xH2RbNTiDYd7ky2cm'; 
let todosQuizzes = [];

function decideLayout() {
    const idsSerializados = localStorage.getItem('ids');
    const idsDeserializados = JSON.parse(idsSerializados);
    const semQuiz = document.querySelector('.usuario-sem-quiz-t1');
    const comQuiz = document.querySelector('.usuario-com-quiz-t1');
    if (idsDeserializados.length === 0 || idsDeserializados.length === null || idsDeserializados.length === undefined) {
        semQuiz.classList.remove('escondido');
        comQuiz.classList.add('escondido');
    } else {
        semQuiz.classList.add('escondido');
        comQuiz.classList.remove('escondido');
    }
}

function renderizaQuizzes() {
    const layout = document.querySelector('.caixas-quizzes-t1');
    layout.innerHTML = '';
    todosQuizzes.forEach( function(render){
        layout.innerHTML += `<div class="caixinha-quiz-t1">
                                <img src="${render.image}" alt="">
                                <p>${render.title}</p>
                            </div>`
    });
}

const sucessoQuizzes = quizzes => {todosQuizzes = quizzes.data; renderizaQuizzes();}

const erroQuizzes = () => {alert('Erro ao carregar quizzes. Tente novamente mais tarde.')};

function pegaQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
    promise.then(sucessoQuizzes);
    promise.catch(erroQuizzes);
}

pegaQuizzes();
decideLayout();