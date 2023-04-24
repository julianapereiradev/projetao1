axios.defaults.headers.common['Authorization'] = 'ylQIQq1xH2RbNTiDYd7ky2cm';
let todosQuizzes = [];

function mudaTela1() {
    const t1 = document.querySelector('.corpo-t1');
    const t3 = document.querySelector('.primeiraTela-t3');
    t1.classList.remove('escondido');
    t3.classList.add('escondido');
}

function mudaTela3() {
    const t1 = document.querySelector('.corpo-t1');
    const t3 = document.querySelector('.primeiraTela-t3');
    t1.classList.add('escondido');
    t3.classList.remove('escondido');
}

function decideLayout() {
    const idsSerializados = localStorage.getItem('ids');
    const idsDeserializados = JSON.parse(idsSerializados);
    console.log(idsSerializados, idsDeserializados);
    const semQuiz = document.querySelector('.usuario-sem-quiz-t1');
    const comQuiz = document.querySelector('.usuario-com-quiz-t1');
    const addQuiz = document.querySelector('.caixa-quiz-usuario-t1');
    //if (idsDeserializados.length === 0 || idsDeserializados.length === null || idsDeserializados.length === undefined) {
    //semQuiz.classList.remove('escondido');
    //comQuiz.classList.add('escondido');
    //} else {
    // semQuiz.classList.add('escondido');
    // comQuiz.classList.remove('escondido');
    //  for (let i = 0; i < idsDeserializados.length; i++) {
    //    const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/' + idsDeserializados[i]);
    //     promise.then( function(render) {
    //       addQuiz.innerHTML += `<div class="caixinha-quiz-usuario-t1">
    //                            <img src="${render.image}" alt="">
    //                             <p>${render.title}</p>
    //                        </div>`
    //    });
    //     promise.catch(() => alert('erro'));
    // }
    //   }


}

function chamaQuiz(id) {
    getQuizz(id);
    const t1 = document.querySelector('.corpo-t1');
    t1.classList.add('escondido');
}

function renderizaQuizzes() {
    const layout = document.querySelector('.caixas-quizzes-t1');
    layout.innerHTML = '';
    todosQuizzes.forEach(function (render) {
        layout.innerHTML += `<div data-test="others-quiz" class="caixinha-quiz-t1" onclick=chamaQuiz(${render.id})>
                                <img src="${render.image}" alt="">
                                <p>${render.title}</p>
                            </div>`;

    });
    decideLayout();
}

const sucessoQuizzes = quizzes => { todosQuizzes = quizzes.data; renderizaQuizzes(); };

const erroQuizzes = () => { alert('Erro ao carregar quizzes. Tente novamente mais tarde.'); };

function pegaQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
    promise.then(sucessoQuizzes);
    promise.catch(erroQuizzes);
}

pegaQuizzes();
