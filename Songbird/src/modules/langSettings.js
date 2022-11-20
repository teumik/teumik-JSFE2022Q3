import langs from '../libs/langs';

const langState = {
  lang: 'en',
  get propName() {
    return this.lang;
  },

  set propName(dataset) {
    this.lang = dataset;
  },
};

export function changeLang() {
  const dictionary = langs[langState.lang];
  for (const block in dictionary) {
    for (const prop in dictionary[block]) {
      const attribite = prop;
      const inner = dictionary[block][prop];
      const node = document.querySelector(`[data-lang="${attribite}"]`);

      if (node) {
        if (typeof inner === 'string') {
          node.innerHTML = inner;
        } else {
          [...node.children].forEach((el, i) => {
            el.innerHTML = inner[i];
          });
        }
      }
    }
  }
}

export function setLang(dataset) {
  langState.propName = dataset;
  changeLang();
}

export function getLang() {
  return langState.propName;
}
