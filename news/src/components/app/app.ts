import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import {
  IResponse,
  NewsItems
} from '../../index';

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start() {
    (document.querySelector('.sources') as HTMLElement)
      .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data as NewsItems)));
    this.controller.getSources((data) => {
      this.view.drawSources(data as IResponse);
    });
  }
}

export default App;
