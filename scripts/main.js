import {Game} from './models/Game.js';

const playarea_div = document.querySelector('#playarea');
const numbers_div = document.querySelector('#numbers');
const dices_div = document.querySelector('#dices');
const roll_btn = document.querySelector('#roll');

let game = null;

roll_btn.addEventListener('click', () => {
  if (game == null) {
    game = new Game(roll_btn);
    game.initializeNumbers(numbers_div);
    roll_btn.textContent = "Lancer les dés";

  } else if (game.status != Game.STATES["IN_PROGRESS"]) {
    numbers_div.innerHTML = '';
    dices_div.innerHTML = '';
    game = new Game(roll_btn);
    game.initializeNumbers(numbers_div);
    roll_btn.textContent = "Lancer les dés";

  } else if (game.game_over) {
    game = null;

  } else if (!game.turn_state) {
    // Must roll dices
    game.rollDices(dices_div);
    game.checkWinLose();
  } else {}
})
