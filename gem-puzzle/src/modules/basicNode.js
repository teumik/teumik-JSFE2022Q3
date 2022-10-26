class BasicNode {
  constructor(tag = 'div', className = '', content = '') {
    this.node = document.createElement(tag);
    if (!className) {
      this.node.className = '';
    } else if (Array.isArray(className)) {
      this.node.classList.add(...className);
    } else {
      this.node.classList.add(className);
    }

    this.node.innerHTML = content;
    return this.node;
  }
}

export { BasicNode };
