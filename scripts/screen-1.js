axios.defaults.headers.common['Authorization'] = 'ylQIQq1xH2RbNTiDYd7ky2cm'; 
let todosQuizzes = [];

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