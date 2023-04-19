axios.defaults.headers.common['Authorization'] = 'ylQIQq1xH2RbNTiDYd7ky2cm';

let obj

let objectValidatedInfoQuiz

function primeiraTelaT3() {
    document.querySelector(".principal").remove();

    renderizarPrimeiraTelaT3();
}
primeiraTelaT3()


function renderizarPrimeiraTelaT3() {
    let main = document.querySelector(".main-t3");

    main.innerHTML += `
      <div class="primeiraTela-t3">
        <h3 class="h1-main-t3">Comece pelo começo</h3>
          <div class="box-main-t3">
            <div class="input">
              <input class="input-main-t3 input-title" type="text" placeholder="Título do quizz">
            </div>
            <div class="input">
              <input class="input-main-t3 input-image" type="text"  placeholder="URL da imagem do seu quizz">
            </div>
            <div class="input">
              <input class="input-main-t3 input-question" type="number" placeholder="Quantidade de pergutas do quizz">
            </div>
            <div class="input">
              <input class="input-main-t3 input-level" type="number" placeholder="Quantidade de níveis do quizz">
            </div>
          </div>
          <button type="submit" class="button-main-t3" onClick="enviarPrimeiraTelaT3(${JSON.stringify(obj)})">Prosseguir pra criar perguntas</button>
        </form>
      </div>
    `;
}

function enviarPrimeiraTelaT3(obj) {

    const inputTitle = document.querySelector(".input-title").value;
    const inputImage = document.querySelector(".input-image").value;
    const inputQtdeQuestion = document.querySelector(".input-question").value;
    const inputQtdeLevel = document.querySelector(".input-level").value;

    if (inputTitle.length < 20 || inputTitle.length >= 65 || inputTitle == null || inputTitle == undefined) {
        return alert("O título deve conter entre 20 e 65 caracteres")
    } else if (inputImage == null || inputImage == undefined) {
       return alert("Coloque o formato certo da URL")
    } else if (inputQtdeQuestion < 3) {
        return alert("Deve haver pelo menos 3 perguntas por quizz")
    } else if (inputQtdeLevel < 2) {
        return alert("Deve haver pelo menos 2 níveis por quizz")
    }
    else {
    obj = {
        title: inputTitle,
        image: inputImage,
        numbersQuestion: inputQtdeQuestion, 
        numberLevels: inputQtdeLevel
    }
    console.log(obj)
    
}

}