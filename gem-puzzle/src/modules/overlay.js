import { BasicNode } from "../index";

const overlay = new BasicNode('div', 'overlay', undefined);

export { overlay };
// export class Overlay {
//   constructor(tag = 'div', className = '', content = '') {
//     this.node = document.createElement(tag);
//     if (!className) {

//     } else if (Array.isArray(className)) {
//       this.node.classList.add(...className);
//     } else {
//       this.node.classList.add(className);
//     }

//     this.node.innerHTML = content;

//     this.node.addEventListener('click', close)

//     return this.node;
//   }

//   close(event) {
//     this.classList.toggle('overlay_open');
//   }
// }
