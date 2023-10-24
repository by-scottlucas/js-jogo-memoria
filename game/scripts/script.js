/* ----------------------------------------------------------------------------------------------- */
/*----------------------- SCRIPT DE FUNCIONALIDADES DAPÁGINA DO GAME GAME -----------------------*/
/* ------------------------------------------------------------------------------------------- */


//Obtém o nome do jogador salvo no armazenamento local do navegador

const Player = document.getElementById('player');


// Selecionar o tabuleiro do jogo

const tabuleiro = document.querySelector('.tabuleiro');


// Array que seleciona cada arte de carta do jogo

const artes = ['01', '02', '03', '04', '05', '06']

// Função que cria as artes das cartas do jogo

const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Função que cria as cartas

const createCard = (artes) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../.src/${artes}.png)`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', virarCarta);
    card.setAttribute('data-arts', artes)

    return card;

}


// Função para virar carta ao clicar nela

const virarCarta = ({target}) => {

    if(target.parentNode.className.includes('virar-carta')){
        return;
    }

    if(primeiraCarta == ''){
        target.parentNode.classList.add('virar-carta');
        primeiraCarta = target.parentNode;
    } else if (segundaCarta == '') {
        target.parentNode.classList.add('virar-carta');
        segundaCarta = target.parentNode;

        checarCartas();
    }

}


// Variáveis da primeira e da segunda carta pegada no jogo

let primeiraCarta= '';
let segundaCarta = '';


// Função que checa e compara as cartas pegadas, se são iguais

const checarCartas = () => {
    const primeraArte = primeiraCarta.getAttribute('data-arts');
    const segundaArte = segundaCarta.getAttribute('data-arts');

    if( primeraArte == segundaArte){

        primeiraCarta.firstChild.classList.add('dstv-carta');
        segundaCarta.firstChild.classList.add('dstv-carta');

        primeiraCarta = '';
        segundaCarta = '';

        checkEndGame();

    } else {
        setTimeout(() => {
        primeiraCarta.classList.remove('virar-carta');
        segundaCarta.classList.remove('virar-carta');

        primeiraCarta = '';
        segundaCarta = '';

        }, 500);
    }

}

// Função que carrega o jogo

const loadGame = () =>{

    const duplicarArtes = [ ... artes, ... artes]

    const sortear = duplicarArtes.sort( () => Math.random() - 0.5);

    duplicarArtes.forEach((arte) => {
        const card = createCard(arte);
        tabuleiro.appendChild(card);
    })
}


// Variável que obtém o id do span que exibe o timer

const timer = document.getElementById('timer');


// Função que realiza a contagem do tempo de jogo

const startTimer = () => {

    this.loop = setInterval(() => {

        const tempoCorrido = +timer.innerHTML;
        timer.innerHTML = tempoCorrido + 1;

    }, 1000);
}


// Função que Carrega o jogo, inicia o timer e exibe o nick do jogador

window.onload = () => {

    Player.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}

// Função que checa se o jogo acabou

const checkEndGame = () =>{
    const dstvCards = document.querySelectorAll('.dstv-carta');

    if(dstvCards.length == 12) {
        clearInterval(this.loop);
        alert('Fim do Jogo! Seu tempo foi: '+ timer.innerHTML + 's')
    }

}