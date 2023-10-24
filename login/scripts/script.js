/* ----------------------------------------------------------------------------------------------- */
/*----------------------- SCRIPT DE FUNCIONALIDADES DA PÁGINA DE NICKNAME -----------------------*/
/* ------------------------------------------------------------------------------------------- */


const input = document.getElementById('nick'); // Obtém o nome do jogador
const botao = document.getElementById('btn'); // botao de envio
const login = document.getElementById('login-form') // formulario


const validarInput = ({ target }) => {
    if(target.value.length > 2) {
        botao.removeAttribute('disabled');
        return;
    }

    botao.setAttribute('disabled', '');
}

const savePlayer = (event) =>{
    event.preventDefault();
    localStorage.setItem('player', input.value);
    location = '../game/index.html'
}

input.addEventListener('input', validarInput);
login.addEventListener('submit', savePlayer);

