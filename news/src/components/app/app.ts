import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import {
  Response,
  NewsResponse
} from '../../index';

class App {
  private readonly controller: AppController;
  private readonly view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start() {
    (document.querySelector('.sources') as HTMLElement)
      .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data as NewsResponse)));
    this.controller.getSources((data) => {
      this.view.drawSources(data as Response);
    });
  }
}

export default App;
