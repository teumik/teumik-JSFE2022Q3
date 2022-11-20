import { getLang, setLang } from './langSettings';

function setLocalStorage(name, prop) {
  globalThis.localStorage.setItem(name, prop);
}

function getLocalStorage(name) {
  const storage = globalThis.localStorage.getItem(name);
  return storage;
}

function saveLang() {
  setLocalStorage('lang', getLang());
}

function loadLang() {
  const storageLang = getLocalStorage('lang');
  const node = document.querySelector(`[data-lang-id="${storageLang}"]`);
  const toggle = node.parentElement;
  setLang(storageLang);

  if (toggle) {
    if (storageLang === 'ru') {
      toggle.classList.toggle('toggle_active');
    }
    [...toggle.children].forEach((el) => {
      el.classList.remove('toggle__lang_active');
    });
    node.classList.add('toggle__lang_active');
  }
}

globalThis.addEventListener('beforeunload', saveLang);
globalThis.addEventListener('DOMContentLoaded', loadLang);
