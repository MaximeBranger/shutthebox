import { Utils } from "./Utils.js";
import { Dice } from "./Dice.js";
import { Number } from "./Number.js";

export class Game {
  static STATES = {
    WIN: "win",
    LOSE: "lose",
    IN_PROGRESS: "in-progress",
  };

  constructor(btn_div) {
    this.dices_sum = 0;
    this.last_number = 0;
    this.turn_state = false;
    this.numbers = {};
    this.btn_div = btn_div;
    this.status = Game.STATES["IN_PROGRESS"];
  }

  initializeNumbers(parent) {
    for (let i = 1; i <= 12; i++) {
      const number = new Number(i);
      const number_element = number.buildElement(this.toggleNumber.bind(this), number);
      parent.appendChild(number_element);

      this.numbers[i] = number;
    }
  }

  rollDices(parent) {
    this.canRollDices()

    parent.innerHTML = '';

    for (let i = 1; i <= 2; i++) {
      const value = Utils.getRandomInt();
      const dice = new Dice(value);
      this.dices_sum += value;
      parent.appendChild(dice.buildElement())
    }

    this.turn_state = true;
    
    this.btn_div.textContent = "Attribuer le score : " + this.dices_sum;
  }

  toggleNumber(event, numberInstance) {
    this.canCloseNumber();

    const element = event.target;
    const value = element.value;

    if(numberInstance.status == Number.STATES['LAST-CLOSED']) {
      numberInstance.reOpenElement();
      this.last_number = 0;
      this.dices_sum += value;
      this.btn_div.textContent = "Attribuer le score : " + this.dices_sum;
      return
    }

    this.canCloseThisNumber(value);

    this.clearLastClosed();

    numberInstance.closeElement();

    this.dices_sum -= value;

    if (this.dices_sum == 0) {
      this.turn_state = false;
      this.last_number = 0;
      this.clearLastClosed();
      this.btn_div.textContent = "Lancer les dés";
      this.checkWinLose();
    } else {
      this.last_number = value;
      this.btn_div.textContent = "Attribuer le score : " + this.dices_sum;
    }
  }

  getRemainingValues() {
    const numbers = document.querySelectorAll('.open');
    const values = Array.from(numbers).map(number => number.value);
    values.sort((a,b) => a - b);
    return values
  }

  clearLastClosed(numberInstance) {
    const element = document.querySelector('.last-closed');
    if (element != null) {
      element.classList.remove('last-closed');

      const value = element.textContent;
      const number = this.numbers[value];
      number.status = Number.STATES['CLOSED'];
      element.removeEventListener('click', number.toggleNumber);
    }
  }

  canCloseNumber() {
    if (!this.turn_state) {
      alert('Vous lancer les dés avant jouer un nombre.')
      throw Exception('Vous devez attribuer les valeurs des dés avant de relancer.')
    }
  }

  canRollDices() {
    if (this.turn_state) {
      alert('Vous devez attribuer les valeurs des dés avant de relancer.')
      throw Exception('Vous devez attribuer les valeurs des dés avant de relancer.')
    }
  }

  canCloseThisNumber(value) {
    if (this.last_number == 0 &&this.dices_sum < value) {
      alert('Vous devez sélectionner une valeur inférieure ou égale à ' + this.dices_sum)
      throw Exception('Vous devez sélectionner une valeur inférieure ou égale à ' + this.dices_sum)
    } else if (this.last_number != 0 &&this.dices_sum != value) {
      alert('Vous devez sélectionner une valeur inférieure ou égale à ' + this.dices_sum)
      throw Exception('Vous devez sélectionner une valeur inférieure ou égale à ' + this.dices_sum)
    } else {
      return true;
    }
    
  }

  canObtainGivenNumber(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === target) {
                return true;
            }
        }
    }
  
    if (numbers.includes(target)) {
        return true;
    }
  
    return false;
  }

  checkWinLose() {
    const remainingValues = this.getRemainingValues();
    if (remainingValues.length == 0 ) {
      alert('Bravo ! Vous avez gagnez !');
      this.status = Game.STATES["WIN"];
      this.btn_div.textContent = "Commencer une nouvelle partie";
      return
    }
  
    if (this.dices_sum == 0) {
      return
    }
    
    if (!this.canObtainGivenNumber(remainingValues, this.dices_sum)) {
      alert('Perdu ! Vous avez perdu !');
      this.status = Game.STATES["LOSE"];
      this.btn_div.textContent = "Commencer une nouvelle partie";
      return
    }
  
  }

}