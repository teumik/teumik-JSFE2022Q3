import './sources.css';
import {
  NewsSourceResponse
} from '../../../index';

class Sources {
  public draw(data: Readonly<NewsSourceResponse[]>) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);
      if (sourceClone instanceof DocumentFragment) {
        (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
        sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
      }
      fragment.append(sourceClone);
    });

    const target = document.querySelector('.sources');

    if (target) {
      if (target.childElementCount !== 0) {
        target.replaceChildren(fragment);
      } else {
        target.append(fragment);
      }
    }
  }
}

export default Sources;
