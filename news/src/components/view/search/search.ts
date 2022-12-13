import './search.css';

export default class Search {
  input: HTMLInputElement;
  source: HTMLCollection;
  button: HTMLButtonElement;

  constructor() {
    this.input = document.querySelector('.search__input') as HTMLInputElement;
    this.source = document.getElementsByClassName('source__item') as HTMLCollection;
    this.button = document.querySelector('.search__button') as HTMLButtonElement;
  }

  onInput(event: Event) {
    if (!(event instanceof InputEvent)) return;
    const { value } = event.target as HTMLInputElement;
    Array.from(this.source).forEach((el) => {
      if (el instanceof HTMLDivElement) {
        const collectionElement = el;
        collectionElement.hidden = true;
        if ((collectionElement.innerText).toLocaleUpperCase().trim()
          .includes(value.trim().toLocaleUpperCase())) {
          collectionElement.hidden = false;
        }
      }
    });
  }

  onReset() {
    this.input.value = '';
    Array.from(this.source).forEach((el) => {
      if (el instanceof HTMLDivElement) {
        const collectionElement = el;
        collectionElement.hidden = false;
      }
    });
  }
}
