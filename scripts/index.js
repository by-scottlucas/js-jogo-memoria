/* ----------------------------------------------------------------------------------------------- */
/*----------------------- SCRIPT DE FUNCIONALIDADES DA PÁGINA DE NICKNAME -----------------------*/
/* ------------------------------------------------------------------------------------------- */


const nicknameInput = document.getElementById('nickinput'); // Obtém o nome do jogador
const startButton = document.getElementById('start-button'); // botao de envio
const formLogin = document.getElementById('form-login') // formulario


const validarInput = ({ target }) => {

    if (target.value.length > 2) {
        startButton.removeAttribute('disabled');
        return;
    }

    startButton.setAttribute('disabled', '');
}

const savePlayer = (event) => {
    event.preventDefault();
    localStorage.setItem('player', input.value);
    location = './pages/game/game.html'
}

nicknameInput.addEventListener('input', validarInput);
formLogin.addEventListener('submit', savePlayer);