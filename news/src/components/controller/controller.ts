import AppLoader from './appLoader';
import {
  Callback,
  IAppController
} from '../../index';

class AppController extends AppLoader implements IAppController {
  getSources(callback: Callback) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews(e: MouseEvent, callback: Callback) {
    let { target } = e;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if ((target as HTMLElement).classList.contains('source__item')) {
        const sourceId = (target as HTMLElement).getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = (target as HTMLElement).parentNode;
    }
  }
}

export default AppController;
