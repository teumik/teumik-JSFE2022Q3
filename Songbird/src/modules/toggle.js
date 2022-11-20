import { setLang } from './langSettings';

function toggleLang(event) {
  const toggle = event.target.closest('.toggle');
  if (toggle) {
    toggle.classList.toggle('toggle_active');
    [...toggle.children].forEach((el) => {
      if (!el.classList.contains('toggle__lang_active')) {
        // console.log(el.dataset.langId);
        setLang(el.dataset.langId);
      }
      el.classList.toggle('toggle__lang_active');
    });
  }
}

globalThis.addEventListener('click', toggleLang);
