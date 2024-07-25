/* --------------------------------------------------------------------------------------------- */
/* --------------------------- SCRIPT DE FUNCIONALIDADES DA PÁGINA DO JOGO ---------------------- */
/* --------------------------------------------------------------------------------------------- */

// Elementos da página
const playerElement = document.getElementById('player');
const boardElement = document.querySelector('.tabuleiro');
const timerElement = document.getElementById('timer');

// Arte das cartas
const cardArts = ['01', '02', '03', '04', '05', '06'];

// Variáveis de controle do jogo
let firstCard = '';
let secondCard = '';
let gameInterval;

// Função utilitária para criar elementos
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

// Função para criar uma carta
const createCard = (art) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../.src/${art}.png)`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', flipCard);
    card.setAttribute('data-art', art);

    return card;
};

// Função para virar uma carta
const flipCard = ({ target }) => {
    if (target.parentNode.classList.contains('flipped')) {
        return;
    }

    if (!firstCard) {
        target.parentNode.classList.add('flipped');
        firstCard = target.parentNode;
    } else if (!secondCard) {
        target.parentNode.classList.add('flipped');
        secondCard = target.parentNode;

        checkCards();
    }
};

// Função para verificar se as cartas são iguais
const checkCards = () => {
    const firstArt = firstCard.getAttribute('data-art');
    const secondArt = secondCard.getAttribute('data-art');

    if (firstArt === secondArt) {
        firstCard.firstChild.classList.add('matched');
        secondCard.firstChild.classList.add('matched');

        resetCards();

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetCards();
        }, 500);
    }
};

// Função para resetar as cartas selecionadas
const resetCards = () => {
    firstCard = '';
    secondCard = '';
};

// Função para carregar o jogo
const loadGame = () => {
    const doubledArts = [...cardArts, ...cardArts];
    const shuffledArts = doubledArts.sort(() => Math.random() - 0.5);

    shuffledArts.forEach((art) => {
        const card = createCard(art);
        boardElement.appendChild(card);
    });
};

// Função para iniciar o timer do jogo
const startTimer = () => {
    gameInterval = setInterval(() => {
        const elapsedTime = +timerElement.innerHTML;
        timerElement.innerHTML = elapsedTime + 1;
    }, 1000);
};

// Função para verificar se o jogo terminou
const checkEndGame = () => {
    const matchedCards = document.querySelectorAll('.matched');

    if (matchedCards.length === cardArts.length * 2) {
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
