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

  changeState(event: MouseEvent) {
    document.querySelector('.languages__items')?.classList.toggle('languages__items_visible');
    const { target } = event;
    const { langId } = (target as HTMLElement).dataset;
    if (langId) {
      document.querySelectorAll('.languages__item').forEach((el) => el.classList.remove('languages__item_active'));
      (target as HTMLElement).classList.add('languages__item_active');
      LangMenu.lang = langId;
    }
  }

  drawMenuItems(data: Response): void {
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
