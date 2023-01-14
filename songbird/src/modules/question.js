import langs from '../libs/langs';
import { getLang } from './langSettings';

function setQuestion(node, level) {
  const questions = node.querySelectorAll('.questions__level');

  [...questions].forEach((el, i) => {
    el.innerHTML = langs[getLang()].quiz.suborders[i];
    el.classList.remove('questions__level_active');
    if (i === level) {
      el.classList.add('questions__level_active');
    }
  });
}

export default setQuestion;
