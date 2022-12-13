import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import LangMenu from '../view/languages/languages';
import Search from '../view/search/search';
import {
  Response,
  NewsResponse
} from '../../index';

class App {
  private readonly controller: AppController;
  private readonly view: AppView;
  private readonly lang: LangMenu;
  private readonly search: Search;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.lang = new LangMenu();
    this.search = new Search();
  }

  public start() {
    (document.querySelector('.sources') as HTMLElement)
      .addEventListener('click', (e) => this.controller.getNews(e, (data: NewsResponse) => {
        this.view.drawNews(data);
      }));
    this.controller.getSources((data: Response) => {
      this.lang.drawMenuItems(data);
      this.view.drawSources(data);
    });
    this.lang.container.addEventListener('click', (event) => {
      const { target } = event;
      const { langId } = (target as HTMLDivElement).dataset;
      if (langId) {
        this.lang.lang = langId;
        this.lang.changeStateItem(target as HTMLDivElement, langId);
        this.search.onReset();
        this.controller.getSources((data: Response) => {
          this.view.drawSources(data);
        }, this.lang.lang);
      } else {
        this.lang.changeStateMenu();
      }
    });
    document.addEventListener('click', (event) => {
      const { target } = event;
      const close = (target as HTMLElement).closest('.languages');
      const menu = document.querySelector('.languages__items_visible');
      if (menu && !close) {
        this.lang.changeStateMenu();
      }
    });
    globalThis.addEventListener('load', () => {
      (this.lang.container.lastElementChild as HTMLElement).hidden = false;
    });
    this.search.input.addEventListener('input', (event: Event) => {
      this.search.onInput(event);
    });
    this.search.button.addEventListener('click', () => {
      this.search.onReset();
    });
  }
}

export default App;
