export class Number {

  static STATES = {
    OPEN: "open",
    CLOSED: "closed",
    LAST_CLOSED: "last-closed"
  }
  
  constructor(value) {
    this.value = value;
    this.status = Number.STATES['OPEN'];
    this.element = null;
  }

  buildElement(callback, selfInstance) {
    if (this.element != null) {
      return this.element;
    }

    const element = document.createElement('div');

    element.className = 'number open';
    element.value = this.value;
    element.textContent = this.value;
  
    element.addEventListener('click', (event) => {
      callback(event, selfInstance);
    })
  
    this.element = element;
    return this.element;
  }

  closeElement() {
    if (this.element == null) {
      return False;
    }

    this.element.classList.remove('open');
    this.element.classList.add('last-closed')

    this.status = Number.STATES['LAST-CLOSED'];
  }

  reOpenElement() {
    if (this.element == null) {
      return False;
    }

    this.element.classList.add('open')
    this.element.classList.remove('last-closed');
    this.status = Number.STATES['OPEN'];
  }

}