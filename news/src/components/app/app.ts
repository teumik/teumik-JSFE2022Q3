import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import {
  IApp,
  IAppController,
  IAppView,
  IResponse,
  NewsItems
} from '../../index';

class App implements IApp {
  controller: IAppController;
  view: IAppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    (document.querySelector('.sources') as HTMLElement)
      .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data as NewsItems)));
    this.controller.getSources((data) => {
      this.view.drawSources(data as IResponse);
    });
  }
}

export default App;
