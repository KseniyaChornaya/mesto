export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItems(items){
    this._initialArray = items;
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();

    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element){
    this._container.prepend(element);
  }
}

