// Elementos da página
const playerElement = document.getElementById('player-name');
const boardElement = document.querySelector('.board');
const timerElement = document.getElementById('game-timer');

// Arte das cartas
const cardArts = ['01', '02', '03', '04', '05', '06'];

// Variáveis de controle do jogo
let firstCard = '';
let secondCard = '';
let gameInterval;

// Função utilitária para criar elementos
function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

// Função para criar uma carta
function createCard(cardArts) {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../../assets/${cardArts}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', flipCard);
    card.setAttribute('data-art', cardArts);

    return card;

};

// Função para virar uma carta
function flipCard({ target }) {

    if (target.parentNode.classList.contains('turn-card')) {
        return;
    }

    if (!firstCard) {
        target.parentNode.classList.add('turn-card');
        firstCard = target.parentNode;

    } else if (!secondCard) {
        target.parentNode.classList.add('turn-card');
        secondCard = target.parentNode;

        checkCards();
    }

};

// Função para verificar se as cartas são iguais
function checkCards() {

    const firstArt = firstCard.getAttribute('data-art');
    const secondArt = secondCard.getAttribute('data-art');

    if (firstArt === secondArt) {
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        resetCards();

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('turn-card');
            secondCard.classList.remove('turn-card');

            resetCards();
        }, 500);
    }
};

// Função para resetar as cartas selecionadas
function resetCards() {
    firstCard = '';
    secondCard = '';
};

// Função para carregar o jogo
function loadGame() {

    const doubledArts = [...cardArts, ...cardArts];
    const shuffledArts = doubledArts.sort(() => Math.random() - 0.5);

    shuffledArts.forEach((art) => {
        const card = createCard(art);
        boardElement.appendChild(card);
    });

};

// Função para iniciar o timer do jogo
function startTimer() {

    gameInterval = setInterval(() => {
        const elapsedTime = +timerElement.innerHTML;
        timerElement.innerHTML = elapsedTime + 1;
    }, 1000);

};

// Função para verificar se o jogo terminou
function checkEndGame() {

    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length === cardArts.length * 2) {
        clearInterval(gameInterval);
        alert(`Fim do Jogo! Seu tempo foi: ${timerElement.innerHTML}s`);
    }

};

// Inicialização do jogo
window.onload = () => {
    playerElement.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
};
