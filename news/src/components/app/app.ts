import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import LangMenu from '../view/languages/languages';
import {
  Response,
  NewsResponse
} from '../../index';

class App {
  private readonly controller: AppController;
  private readonly view: AppView;
  private readonly lang: LangMenu;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.lang = new LangMenu();
  }

  public start() {
    (document.querySelector('.sources') as HTMLElement)
      .addEventListener('click', (e) => this.controller.getNews(e, (data) => {
        this.view.drawNews(data as NewsResponse);
      }));
    this.controller.getSources((data) => {
      this.lang.drawMenuItems(data as Response);
      this.view.drawSources(data as Response);
    });
    this.lang.container.addEventListener('click', (event) => {
      this.lang.changeState(event);
      this.controller.getSources((data) => {
        this.view.drawSources(data as Response);
      }, LangMenu.lang);
    });
    document.addEventListener('click', (event) => {
      const { target } = event;
      const close = (target as HTMLElement).closest('.languages');
      const menu = document.querySelector('.languages__items_visible');
      if (menu && !close) {
        this.lang.changeState(event);
      }
    });

    globalThis.addEventListener('load', () => {
      (this.lang.container.lastElementChild as HTMLElement).hidden = false;
    });
  }
}

export default App;
