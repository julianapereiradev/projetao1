axios.defaults.headers.common['Authorization'] = 'ylQIQq1xH2RbNTiDYd7ky2cm';

let tituloDoQuizz;
let imagemDoQuizz;
let qtdePerguntas;
let qtdeNiveis;
let tituloNovo;
let imagemNova;
let qntPergunta;
let qntNivel;
let pergunta;
let objetoDoPost;
let tituloDaPergunta;
let colorDaPergunta; let respostaCerta; let imagemDaRespostaCerta;
let respostaIncorreta1; let imagemIncorreta1; let respostaIncorreta2; let imagemIncorreta2; let respostaIncorreta3; let imagemIncorreta3;
let tituloDoNivel; let imagemDoNivel; let descricaoDoNivel; let porcentagemDoNivel;
let idsQuizzesUsuario = [];


function criarPerguntas() {
  tituloDoQuizz = document.querySelector('.tituloDoQuizz-t3').value;
  imagemDoQuizz = document.querySelector('.imagemDoQUizz-t3').value;
  qtdePerguntas = document.querySelector('.qtdePerguntas-t3').value;
  qtdeNiveis = document.querySelector('.qtdeNiveis-t3').value;


  if (tituloDoQuizz.length < 20 || tituloDoQuizz.length > 65) {
    alert("O título deve ter entre 20 a 65 letras");
  }
  else {
    tituloNovo = tituloDoQuizz;
    if (validacaoURL(imagemDoQuizz) === false) {
      alert('deve ter formato de URL');
    } else {
      imagemNova = imagemDoQuizz;
      if (qtdePerguntas < 3) {
        alert('Você precisa ter pelo menos 3 perguntas');
      } else {
        qntPergunta = qtdePerguntas;
        if (qtdeNiveis < 2) {
          alert('O nível mínimo é 2');
        } else {
          qntNivel = qtdeNiveis;

          const criaPerguntas = document.querySelector('.primeiraTela-t3');
          criaPerguntas.classList.add('escondido');
          const segundaTela = document.querySelector('.segundaTela-t3');
          segundaTela.classList.remove('escondido');

          renderizarPerguntasQuizz();
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
}

function validacaoDaCor(str) {
  let pattern = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
  return !!pattern.test(str);
}


function renderizarPerguntasQuizz() {

  const renderizaPerguntas = document.querySelector('.renderizaPerguntas');

  renderizaPerguntas.innerHTML = ""
  for (let i = 0; i < qntPergunta; i++) {
    renderizaPerguntas.innerHTML += `
<div data-test="question-ctn" class="container-pergunta box-perguntas-t3">
  <div class="pergunta-t3">
    <p>Pergunta ${i + 1}</p>
    <button data-test="toggle" onclick="alternar('.conteudo-pergunta-t3', ${i})"></button>
  </div>
  <div class="conteudo-pergunta-t3 escondido">
    <div class="textoECorPergunta">
      <input data-test="question-input" class="tituloPergunta1" type="text" placeholder="Texto da pergunta" name="Título das Perguntas">
      <input data-test="question-color-input" class="corDaPergunta" type="text" placeholder="Cor de fundo da pergunta" name="Cor da Perguntas">
    </div>
    <div class="respostaCorreta">
      <p>Resposta Correta</p>
      <input data-test="correct-answer-input" class="respostaCorretaTexto" type="text" placeholder="Resposta correta" name="Respostas Corretas">
      <input data-test="correct-img-input" class="respostaCorretaImg" type="text" placeholder="URL da imagem" name="Imagens">
    </div>
    <div class="respostasIncorretas">
      <p>Respostas Incorretas</p>
      <input data-test="wrong-answer-input" class="respostaIncorreta1" type="text" placeholder="Resposta incorreta 1" name="Respostas Incorretas">
      <input data-test="wrong-img-input" class="imagemIncorreta1" type="text" placeholder="URL da imagem 1" name="Imagens">
      <input data-test="wrong-answer-input" class="respostaIncorreta2 marginTop" type="text" placeholder="Resposta incorreta 2" name="Respostas Incorretas">
      <input data-test="wrong-img-input" class="imagemIncorreta2" type="text" placeholder="URL da imagem 2" name="Imagens">
      <input data-test="wrong-answer-input" class="respostaIncorreta3 marginTop" type="text" placeholder="Resposta incorreta 3" name="Respostas Incorretas">
      <input data-test="wrong-img-input" class="imagemIncorreta3" type="text" placeholder="URL da imagem 3" name="Imagens">
    </div>
  </div>
</div>`;
  }
  alternar('.conteudo-pergunta-t3', 0);
}

function criarNiveis() {
  const containerPergunta = document.querySelectorAll('.container-pergunta');

  pergunta = {
    title: tituloDoQuizz,
    image: imagemDoQuizz,
    questions: [],
    levels: []
  };

  console.log('respostaIncorreta1 antes do for', respostaIncorreta1);
  console.log('respostaIncorreta1 antes do for', imagemIncorreta1);

  for (let i = 0; i < containerPergunta.length; i++) {

    tituloDaPergunta = containerPergunta[i].querySelector('.tituloPergunta1').value;
    colorDaPergunta = containerPergunta[i].querySelector('.corDaPergunta').value;
    respostaCerta = containerPergunta[i].querySelector('.respostaCorretaTexto').value;
    imagemDaRespostaCerta = containerPergunta[i].querySelector('.respostaCorretaImg').value;
    respostaIncorreta1 = containerPergunta[i].querySelector('.respostaIncorreta1').value;
    imagemIncorreta1 = containerPergunta[i].querySelector('.imagemIncorreta1').value;
    respostaIncorreta2 = containerPergunta[i].querySelector('.respostaIncorreta2').value;
    imagemIncorreta2 = containerPergunta[i].querySelector('.imagemIncorreta2').value;
    respostaIncorreta3 = containerPergunta[i].querySelector('.respostaIncorreta3').value;
    imagemIncorreta3 = containerPergunta[i].querySelector('.imagemIncorreta3').value;

    console.log('respostaIncorreta1 dentro do for', respostaIncorreta1);
    console.log('respostaIncorreta1 dentro do for', imagemIncorreta1);

    if (tituloDaPergunta.length < 20) {
      alert("Título contém entre 20 à 65 caracteres");
      return;
    }
    if (validacaoDaCor(colorDaPergunta) === false) {
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
      alert("Você tem que ter pelo menos uma resposta incorreta em cada pergunta 1");
      return;
    }
    if (validacaoURL(imagemIncorreta1) === false) {
      alert("Colocar formato correto da URL de resposta incorreta 1");
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
      ]
    };
    if (respostaIncorreta2 !== '' && respostaIncorreta2 !== undefined && respostaIncorreta2 !== null) {
      if (validacaoURL(imagemIncorreta2) === false) {
        alert("Colocar formato correto da URL de resposta incorreta 2");
        return;
      }
      pergContinuacao.answers.push(
        {
          text: respostaIncorreta2,
          image: imagemIncorreta2,
          isCorrectAnswer: false
        });
    }
    if (respostaIncorreta3 !== '' && respostaIncorreta3 !== undefined && respostaIncorreta3 !== null) {
      if (validacaoURL(imagemIncorreta3) === false) {
        alert("Colocar formato correto da URL de resposta incorreta 3");
        return;
      }
      pergContinuacao.answers.push(
        {
          text: respostaIncorreta3,
          image: imagemIncorreta3,
          isCorrectAnswer: false
        });
    }
    pergunta.questions = [...pergunta.questions, pergContinuacao];
    console.log('pergunta.questions aqui::', pergunta.questions);
  }
  console.log('respostaIncorreta1 fora do for', respostaIncorreta1);
  console.log('respostaIncorreta1 fora do for', imagemIncorreta1);
  renderizarNiveisQuizz();
}

function renderizarNiveisQuizz() {

  const segundaTela = document.querySelector('.segundaTela-t3');
  const niveis = document.querySelector('.box-niveis-t3');
  tituloDaPergunta = '';
  colorDaPergunta = '';
  respostaCerta = '';
  imagemDaRespostaCerta = '';
  respostaIncorreta1 = '';
  imagemIncorreta1 = '';
  respostaIncorreta2 = '';
  imagemIncorreta2 = '';
  respostaIncorreta3 = '';
  imagemIncorreta3 = '';
  segundaTela.classList.add('escondido');
  niveis.classList.remove('escondido');

  const renderizaNiveis = document.querySelector('.renderizaNiveis');

  renderizaNiveis.innerHTML = ""
  for (let i = 0; i < qntNivel; i++) {
    renderizaNiveis.innerHTML += `
    <div data-test="level-ctn" class="nivel container-niveis">
    <div class="nivel-t3">
      <p>Nível ${i + 1}</p>
      <button data-test="toggle" onclick="alternar('.conteudo-nivel-t3', ${i})"></button>
    </div>
    <div class="conteudo-nivel-t3">
      <input data-test="level-input" class="tituloNivel1" type="text" placeholder="Título do nível" name="Nivel Titulo">
      <input data-test="level-percent-input" class="porcentagNivel1" type="text" placeholder="% de acerto mínima" name="Nivel Valor">
      <input data-test="level-img-input" class="imagemNivel1" type="text" placeholder="URL da imagem do nível" name="Imagens">
      <input data-test="level-description-input" class="descricaoNivel1" type="text" placeholder="Descrição do nível" name="Nivel Texto">
    </div>
  </div>
    `;
  }
  alternar('.conteudo-nivel-t3', 0);
}


function finalizarQuizz() {
  const containerNivel = document.querySelectorAll('.nivel');

  let porcentagemDosNiveis = [];

  for (i = 0; i < containerNivel.length; i++) {

    tituloDoNivel = containerNivel[i].querySelector('.tituloNivel1').value;
    imagemDoNivel = containerNivel[i].querySelector('.imagemNivel1').value;
    descricaoDoNivel = containerNivel[i].querySelector('.descricaoNivel1').value;
    porcentagemDoNivel = containerNivel[i].querySelector('.porcentagNivel1').value;

    porcentagemDosNiveis.push(porcentagemDoNivel);

    if (tituloDoNivel.length < 10) {
      alert("Título precisa ter no mín 10 caracteres");
      return;
    }
    if (porcentagemDoNivel < 0 || porcentagemDoNivel > 100 || porcentagemDoNivel == '') {
      alert("% é um número entre 0 e 100");
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
    if (!porcentagemDosNiveis.includes("0")) {
      alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%");
      return;
    }


    let levelsData = {
      title: tituloDoNivel,
      image: imagemDoNivel,
      text: descricaoDoNivel,
      minValue: Number(porcentagemDoNivel),
    };

    pergunta.levels = [...pergunta.levels, levelsData];
  }
  console.log('pergunta.levels', pergunta.levels);
  console.log('como ta pergunta agora dps que cliquei em finalizar levels', pergunta);
  postCriarQuizz();
}


function postCriarQuizz() {
  objetoDoPost = pergunta;
  console.log('objetoDoPost::', objetoDoPost);

  tituloDoNivel = '';
  imagemDoNivel = '';
  descricaoDoNivel = '';
  porcentagemDoNivel = '';

  let promisse = axios.post("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes", objetoDoPost);
  promisse.then(sucessoAoPostarQuizz);
  promisse.catch(erroAoPostarQuizz);
}

function sucessoAoPostarQuizz(respostaSucessoAoPostarQuizz) {
  console.log('respostaSucessoAoPostarQuizz aqui:', respostaSucessoAoPostarQuizz);
  if (idsDeserializados) {
    idsQuizzesUsuario = idsDeserializados
  }
  idsQuizzesUsuario.push({"id": respostaSucessoAoPostarQuizz.data.id});
  const idsSerializados = JSON.stringify(idsQuizzesUsuario);
  localStorage.setItem('ids', idsSerializados);
  finalizaQuizz();
}

function erroAoPostarQuizz(respostaErroAoPostarQuizz) {
  console.log('respostaErroAoPostarQuizz aqui:', respostaErroAoPostarQuizz);
}

function finalizaQuizz() {
  let criaNiveis = document.querySelector('.segundaTela-t3');
  criaNiveis.classList.add('escondido');

  let esconderTelaNiveis = document.querySelector('.box-niveis-t3');
  esconderTelaNiveis.classList.add('escondido');

  let aparecerUltimaTela = document.querySelector('.ultimaTela-t3');
  aparecerUltimaTela.classList.remove('escondido');

  let imgQuizzDoInicio = objetoDoPost.image;
  let titleQuizDoInicio = objetoDoPost.title;
  console.log('imgQuizzDoInicio do final:', imgQuizzDoInicio);

  renderizaUltimaTela(imgQuizzDoInicio, titleQuizDoInicio);
}

function renderizaUltimaTela(imgQuizzDoInicio, titleQuizDoInicio) {
  const renderizaImagemQuiz = document.querySelector('.renderizaImgQuizz');

  renderizaImagemQuiz.innerHTML = `
  <div data-test="success-banner">
  <img class="imgQuizzDoInicio" src="${imgQuizzDoInicio}">
  <p>${titleQuizDoInicio}</p>
  <div class="degradeQuizzFinal">
  </div>
  `;
}

function acessarOQuizTela2() {
  const t3 = document.querySelector('.ultimaTela-t3');
  t3.classList.add('escondido');

  getQuizz(idsQuizzesUsuario[idsQuizzesUsuario.length - 1]["id"]);
  console.log("o que tá vindo idsQuizzesUsuario:", idsQuizzesUsuario);
  console.log('idsQuizzesUsuario[idsQuizzesUsuario.length - 1]', idsQuizzesUsuario[idsQuizzesUsuario.length - 1]);
}
function voltarInicioTela1() {
  limpaCampos();
  const t1 = document.querySelector('.corpo-t1');
  const t3 = document.querySelector('.ultimaTela-t3');
  t1.classList.remove('escondido');
  t3.classList.add('escondido');
  tituloDoQuizz = '';
  imagemDoQuizz = '';
  qtdePerguntas = '';
  qtdeNiveis = '';
  decideLayout()
}

function limpaCampos() {
  document.querySelectorAll('input').forEach(campo => campo.value = "");
}

function alternar(classNome, index) {
  elemento = document.querySelectorAll(classNome);
  elemento.forEach(element => {
    console.log(element.classList.contains('escondido'));
    if (!element.classList.contains('escondido')) {
      element.classList.add('escondido');
    }
  });
  elemento[index].classList.toggle('escondido');
  elemento[index].scrollIntoView();
}