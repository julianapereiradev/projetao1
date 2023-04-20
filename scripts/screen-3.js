axios.defaults.headers.common['Authorization'] = 'ylQIQq1xH2RbNTiDYd7ky2cm';


let urlBase = 'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes';
let tituloDoQuizz;
let imagemDoQuizz
let qtdePerguntas;
let qtdeNiveis;
let tituloNovo;
let imagemNova;
let qntPergunta;
let qntNivel;
let pergunta;
let objetoDoPost;


function criarQuizz() {

  let criaQuizz = document.querySelector('.telaZeroHome-t3');
  criaQuizz.classList.add('escondido-t3');

  let primeiraTela = document.querySelector('.primeiraTela-t3');
  primeiraTela.classList.remove('escondido-t3');
}

function criarPerguntas() {
  tituloDoQuizz = document.querySelector('.tituloDoQuizz-t3').value;
  imagemDoQuizz = document.querySelector('.imagemDoQUizz-t3').value
  qtdePerguntas = document.querySelector('.qtdePerguntas-t3').value;
  qtdeNiveis = document.querySelector('.qtdeNiveis-t3').value;


  // validacao da primeira tela
  if (tituloDoQuizz.length < 20 || tituloDoQuizz.length > 65) {
    alert("O título deve ter entre 20 a 65 letras");
  }
  else {
    tituloNovo = tituloDoQuizz;
    if (validacaoURL(imagemDoQuizz) === false) {
      alert('deve ter formato de URL');
    } else {
      imagemNova = imagemDoQuizz
      if (qtdePerguntas < 3) {
        alert('Você precisa ter pelo menos 3 perguntas');
      } else {
        qntPergunta = qtdePerguntas;
        if (qtdeNiveis < 2) {
          alert('O nível mínimo é 2');
        } else {
          qntNivel = qtdeNiveis;

          // fim validacao da primeira tela
          let criaPerguntas = document.querySelector('.primeiraTela-t3');
          criaPerguntas.classList.add('escondido-t3');

          const segundaTela = document.querySelector('.segundaTela-t3');
          segundaTela.classList.remove('escondido-t3');

          renderizarPerguntasQuizz()
        }
      }
    }
  }
}

function validacaoURL(str) {
  let pattern = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i');
  return !!pattern.test(str);
} //ver depois

function validaCor(str) {
  let pattern = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
  return !!pattern.test(str);
} //ver depois


function renderizarPerguntasQuizz() {

  const renderizaPerguntas = document.querySelector('.renderizaPerguntas');


  for (let i = 0; i < qntPergunta; i++) {
    renderizaPerguntas.innerHTML += `
    <div class="container-pergunta">
    <div class="textoECorPergunta">
      <a>Pergunta ${i + 1}</a>
      <input class ="tituloPergunta1" type="text" placeholder="Texto da pergunta">
      <input class="corDaPergunta" type="text" placeholder="Cor de fundo da pergunta">
    </div>
    <div class="respostaCorreta">
      <a>Resposta Correta</a>
      <input class="respostaCorretaTexto" type="text" placeholder="Resposta correta">
      <input class="respostaCorretaImg" type="text" placeholder="URL da imagem">
    </div>
    <div class="respostasIncorretas">
      <a>Respostas Incorretas</a>
      <input class="respostaIncorreta1" type="text" placeholder="Resposta incorreta 1">
      <input class="imagemIncorreta1" type="text" placeholder="URL da imagem 1">
      <input class="respostaIncorreta2 marginTop" type="text" placeholder="Resposta incorreta 2">
      <input class="imagemIncorreta2" type="text" placeholder="URL da imagem 2">
      <input class="respostaIncorreta3 marginTop" type="text" placeholder="Resposta incorreta 3">
      <input class="imagemIncorreta3" type="text" placeholder="URL da imagem 3">
    </div>
  </div>
    `
  }

}

function criarNiveis() {
  const containerPergunta = document.querySelectorAll('.container-pergunta');

  pergunta = {
    title: tituloDoQuizz,
    image: imagemDoQuizz,
    questions: [],
    levels: []
  }


  for (i = 0; i < containerPergunta.length; i++) {

    let tituloDaPergunta = containerPergunta[i].querySelector('.tituloPergunta1').value;
    let colorDaPergunta = containerPergunta[i].querySelector('.corDaPergunta').value;
    let respostaCerta = containerPergunta[i].querySelector('.respostaCorretaTexto').value;
    let imagemDaRespostaCerta = containerPergunta[i].querySelector('.respostaCorretaImg').value;
    let respostaIncorreta1 = containerPergunta[i].querySelector('.respostaIncorreta1').value;
    let imagemIncorreta1 = containerPergunta[i].querySelector('.imagemIncorreta1').value;
    let respostaIncorreta2 = containerPergunta[i].querySelector('.respostaIncorreta2').value;
    let imagemIncorreta2 = containerPergunta[i].querySelector('.imagemIncorreta2').value;
    let respostaIncorreta3 = containerPergunta[i].querySelector('.respostaIncorreta3').value;
    let imagemIncorreta3 = containerPergunta[i].querySelector('.imagemIncorreta3').value;

    if (tituloDaPergunta.length < 20) {
      alert("Título contém entre 20 à 65 caracteres");
      return;
    }
    if (validaCor(colorDaPergunta) === false) {
      alert("Colocar formato correto da cor");
      return;
    }
    if (respostaCerta === '') {
      alert("Resposta correta precisa estar preeenchida");
      return;
    }
    if (validacaoURL(imagemDaRespostaCerta) === false) {
      alert("Colocar formato correto da URL de resposta correta");
      return;
    }
    if (respostaIncorreta1 === '') {
      alert("Você tem que ter pelo menos uma resposta incorreta em cada pergunta");
      return;
    }
    if (validacaoURL(imagemIncorreta1) === '') {
      alert("Colocar formato correto da URL de resposta incorreta");
      return;
    }

    let pergContinuacao = {
      title: tituloDaPergunta,
      color: colorDaPergunta,
      answers: [
        {
          text: respostaCerta,
          image: imagemDaRespostaCerta,
          isCorrectAnswer: true
        },
        {
          text: respostaIncorreta1,
          image: imagemIncorreta1,
          isCorrectAnswer: false
        },
        {
          text: respostaIncorreta2,
          image: imagemIncorreta2,
          isCorrectAnswer: false
        },
        {
          text: respostaIncorreta3,
          image: imagemIncorreta3,
          isCorrectAnswer: false
        }
      ]
    }
    pergunta.questions = [...pergunta.questions, pergContinuacao]
    console.log('pergunta.questions aqui::', pergunta.questions)
  }
  renderizarNiveisQuizz();
}

function renderizarNiveisQuizz() {

  const segundaTela = document.querySelector('.segundaTela-t3');
  const niveis = document.querySelector('.box-niveis-t3');

  segundaTela.classList.add('escondido-t3');
  niveis.classList.remove('escondido-t3');

  const renderizaNiveis = document.querySelector('.renderizaNiveis');

  for (let i = 0; i < qntNivel; i++) {
    renderizaNiveis.innerHTML += `
    <div class="nivel container-niveis">
    <a>Nível ${i + 1}</a>
    <input class="tituloNivel1" type="text" placeholder="Título do nível">
    <input class="porcentagNivel1" type="text" placeholder="% de acerto mínima">
    <input class="imagemNivel1" type="text" placeholder="URL da imagem do nível">
    <input class="descricaoNivel1" type="text" placeholder="Descrição do nível">
  </div>
    `;
  }
}


function finalizarQuizz() {
  const containerNivel = document.querySelectorAll('.nivel');


  for (i = 0; i < containerNivel.length; i++) {

    let tituloDoNivel = containerNivel[i].querySelector('.tituloNivel1').value;
    let imagemDoNivel = containerNivel[i].querySelector('.imagemNivel1').value;
    let descricaoDoNivel = containerNivel[i].querySelector('.descricaoNivel1').value;
    let porcentagemDoNivel = containerNivel[i].querySelector('.porcentagNivel1').value;

    if (tituloDoNivel.length < 10) {
      alert("Título precisa ter no mín 10 caracteres");
      return;
    }
    if (porcentagemDoNivel < 0 || porcentagemDoNivel > 100) {
      alert("% é um número entr 0 e 100");
      return;
    }
    if (validacaoURL(imagemDoNivel) === false) {
      alert("Colocar formato correto da URL");
      return;
    }
    if (descricaoDoNivel.length < 30) {
      alert("A descrição precisa de no mínimo 30 caracteres");
      return;
    }


    let levelsData = {
      title: tituloDoNivel,
      image: imagemDoNivel,
      text: descricaoDoNivel,
      minValue: porcentagemDoNivel,
    };

    pergunta.levels = [...pergunta.levels, levelsData]
  }
  console.log('pergunta.levels', pergunta.levels)
  console.log('como ta pergunta agora dps que cliquei em finalizar levels', pergunta)
  postCriarQuizz();
}

//

function postCriarQuizz() {
  objetoDoPost = pergunta;
  console.log('objetoDoPost::', objetoDoPost)

  let promisse = axios.post("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes", objetoDoPost);
  promisse.then(sucessoAoPostarQuizz)
  promisse.catch(erroAoPostarQuizz)
}

function sucessoAoPostarQuizz(respostaSucessoAoPostarQuizz) {
  console.log('respostaSucessoAoPostarQuizz aqui:', respostaSucessoAoPostarQuizz)
  finalizaQuizz();
}

function erroAoPostarQuizz(respostaErroAoPostarQuizz) {
  console.log('respostaErroAoPostarQuizz aqui:', respostaErroAoPostarQuizz)
}

function finalizaQuizz() {
  let criaNiveis = document.querySelector('.segundaTela-t3');
  criaNiveis.classList.add('escondido-t3');

  let esconderTelaNiveis = document.querySelector('.box-niveis-t3');
  esconderTelaNiveis.classList.add('escondido-t3');

  let aparecerUltimaTela = document.querySelector('.ultimaTela-t3');
  aparecerUltimaTela.classList.remove('escondido-t3');

  let imgQuizzDoInicio = objetoDoPost.image;
  let titleQuizDoInicio = objetoDoPost.title;
  console.log('imgQuizzDoInicio do final:', imgQuizzDoInicio)

  renderizaUltimaTela(imgQuizzDoInicio, titleQuizDoInicio);
}

function renderizaUltimaTela(imgQuizzDoInicio, titleQuizDoInicio) {
  const renderizaImagemQuiz = document.querySelector('.renderizaImgQuizz');

  renderizaImagemQuiz.innerHTML += `
  <div>
  <img class="imgQuizzDoInicio" src="${imgQuizzDoInicio}">
  <p>${titleQuizDoInicio}</p>
  <div class="degradeQuizzFinal">
  </div>
  `
}

function acessarOQuizTela2() {
  alert("Clicou para acessar o quizz")
}
function voltarInicioTela1() {
  alert("Clicou para voltar ao inicio")
}