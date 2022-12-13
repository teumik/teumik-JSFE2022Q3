import AppLoader from './appLoader';
import {
  Callback,
  NewsResponse
} from '../../index';

class AppController extends AppLoader {
  public getSources(callback: Callback<NewsResponse>, lang = '') {
    super.getResp(
      {
        endpoint: 'sources',
        options: {
          language: lang,
        },
      },
      callback
    );
  }

  public getNews(e: MouseEvent, callback: Callback<NewsResponse>) {
    let { target } = e;
    const newsContainer = e.currentTarget as HTMLDivElement;

    while (target !== newsContainer) {
      if ((target as HTMLDivElement).classList.contains('source__item')) {
        const sourceId = String((target as HTMLDivElement).getAttribute('data-source-id'));
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
      target = (target as HTMLDivElement).parentNode;
    }
  }
}

export default AppController;
