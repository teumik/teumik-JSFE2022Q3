import './search.css';

export default class Search {
  input;
  source;
  button;

  constructor() {
    this.input = document.querySelector('.search__input') as HTMLInputElement;
    this.source = document.getElementsByClassName('source__item') as HTMLCollection;
    this.button = document.querySelector('.search__button') as HTMLButtonElement;
  }

  onInput(event: InputEvent) {
    const { value } = event.target as HTMLInputElement;
    Array.from(this.source).forEach((el) => {
      const collectionElement = el as HTMLElement;
      collectionElement.hidden = true;
      if ((collectionElement.innerText).toLocaleUpperCase().trim()
        .includes(value.trim().toLocaleUpperCase())) {
        collectionElement.hidden = false;
      }
    });
  }

  onReset() {
    this.input.value = '';
    Array.from(this.source).forEach((el) => {
      const collectionElement = el;
      (collectionElement as HTMLElement).hidden = false;
    });
  }
}
