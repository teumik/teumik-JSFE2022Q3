import './languages.css';
import {
  NewsSourceResponse,
  Response,
  LanguagesDictionary
} from '../../../index';

class LangMenu {
  private langValue: string;
  public container: HTMLDivElement;

  constructor() {
    this.container = document.querySelector('.languages') as HTMLDivElement;
    this.langValue = '';
  }

  set lang(value: string) {
    this.langValue = value;
  }

  get lang() {
    return this.langValue;
  }

  public changeStateMenu() {
    this.container.querySelector('.languages__items')?.classList.toggle('languages__items_visible');
  }

  public changeStateItem(target: HTMLDivElement, langId: string) {
    if (langId && target) {
      this.container.querySelectorAll('.languages__item').forEach((el) => el.classList.remove('languages__item_active'));
      target.classList.add('languages__item_active');
    }
    this.changeStateMenu();
  }

  public drawMenuItems(data: Response): void {
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
