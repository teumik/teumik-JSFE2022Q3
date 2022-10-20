class AppNavbar extends HTMLElement {
  constructor(value = 'Betch') {
    super();
    this.className = 'nav';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<h2>Fuck you ${value}!</h2>`;
  }
}

globalThis.customElements.define('app-navbar', AppNavbar);

document.body.append(new AppNavbar('Jhon'));
document.body.append(new AppNavbar());

class Cell extends HTMLElement {
  constructor(inner) {
    super();
    this.render(inner);
  }

  connectedCallback() {
  }

  render(inner) {
    console.log('my component is connected!');

    this.innerHTML = `${inner}`;
    this.classList.add('cell');
  }
}

globalThis.customElements.define('my-cell', Cell);
const myCell = new Cell('look what ive done');
const myCell2 = new Cell('i fucked up');

document.body.append(myCell);
myCell.classList.add('blue')
document.body.append(myCell2);
myCell2.innerHTML = 'dont fucked up';


class Elem {
  constructor(v) {
    this.el = document.createElement('div');
    if (v) {
      this.el.innerHTML = `I am text #${v}`;
    } else {
      this.el.innerHTML = '';
      this.el.style.height = '16px';
    }
    this.el.className = 'ex';

    // this.el.onclick = function () {
    //   console.log(this.innerHTML);
    //   this.style.backgroundColor = 'orangered';
    // }

    // this.el.ondblclick = function () {
    //   this.remove();
    // }

    this.el.addEventListener('click', (event) => {
      console.log(this.el.innerHTML);
      this.el.style.backgroundColor = 'orangered';
    })

    this.el.addEventListener('dblclick', (event) => {
      console.log(this.el);
      this.el.remove();
    })

    return this.el;
  }
}

for (let i = 1; i < 19; i++) {
  if (i === 13) {
    document.body.append(new Elem());
    continue;
  }
  document.body.append(new Elem(i));
}
