export class Dice {

  constructor(value) {
    this.value = value;
  }

  buildElement() {
    const element = document.createElement('div');
    element.className = `dice dice_${this.value}`;
    if (this.value == 5) {
      this.value = 4;
    }
    for (let i = 1; i <= this.value; i++) {
      const dotElement = document.createElement('span');
      dotElement.className = 'dot';
      element.appendChild(dotElement);
    }
    return element;
  }
}