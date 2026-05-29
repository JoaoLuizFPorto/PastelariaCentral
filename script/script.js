const esteira = document.querySelector('.mainCardImagens');
const btnProximo = document.querySelector('.mainCardBotaoProximo');
const btnAnterior = document.querySelector('.mainCardBotaoAnterior');

let indiceAtual = 0; 
const totalImagens = document.querySelectorAll('.mainCardImagensSlide').length;
let intervaloAutoplay; 

function atualizarCarrossel() {
  const deslocamento = -indiceAtual * 100;
  esteira.style.transform = `translateX(${deslocamento}%)`;
}

function proximoSlide() {
  if (indiceAtual < totalImagens - 1) {
    indiceAtual++;
  } else {
    indiceAtual = 0; 
  }
  atualizarCarrossel();
}

function anteriorSlide() {
  if (indiceAtual > 0) {
    indiceAtual--;
  } else {
    indiceAtual = totalImagens - 1; 
  }
  atualizarCarrossel();
}

function iniciarAutoplay() {
  intervaloAutoplay = setInterval(proximoSlide, 3000);
}

function resetarAutoplay() {
  clearInterval(intervaloAutoplay); 
  iniciarAutoplay(); 
}

btnProximo.addEventListener('click', () => {
  proximoSlide();
  resetarAutoplay();
});

btnAnterior.addEventListener('click', () => {
  anteriorSlide();
  resetarAutoplay();
});

iniciarAutoplay();