import './sources.css';
import {
  NewsSourceResponse
} from '../../../index';

class Sources {
  public draw(data: Readonly<NewsSourceResponse[]>) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

      (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
      (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const target = document.querySelector('.sources') as HTMLElement;

    if (target) {
      target.replaceChildren(fragment);
    } else {
      (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
  }
}

export default Sources;
