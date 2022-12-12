import './languages.css';
import {
  NewsSourceResponse,
  Response,
  LanguagesDictionary
} from '../../../index';

class LangMenu {
  static lang: string;
  container: HTMLDivElement;

  constructor() {
    this.container = document.querySelector('.languages') as HTMLDivElement;
  }

  toggle() {
    document.querySelector('.languages__items')?.classList.toggle('languages__items_visible');
  }

  draw(data: Response): void {
    if (data.sources) {
      const frag = document.createDocumentFragment();
      [...new Set(data.sources.map((el: NewsSourceResponse) => el.language))].forEach((el) => {
        const div = document.createElement('div');
        div.dataset.langId = el;
        div.classList.add('languages__item');
        div.innerHTML = LanguagesDictionary[el as keyof typeof LanguagesDictionary];
        frag.append(div);
      });
      const target = this.container.lastElementChild as HTMLElement;
      if (target.children.length) {
        target.replaceChildren(frag);
      } else {
        target.append(frag);
      }
    }
  }
}

export default LangMenu;
