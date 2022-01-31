class Alert {
  /**
   * @constructor
   * @param {HTMLElement} container - the parent element in which will appear Alert, by default - document.body
   * @param {string} type - affect on Alert style, the posible values - "success", "danger", "info", "warning"
   * @param {string} position - position of Alert, the posible values - "top-left", "top-right", "bottom-left", "bottom-right"
   * @param {string} content - content of Alert, can contain html tags
   */
  constructor(container = document.body, type, position, content) {
    this.container = container;
    this.type = type;
    this.position = position;
    this.content = content;

    // create div-element and append in to this.container
    this.createPopupElement();
  }

  createPopupElement() {
    let popup = document.createElement("div");
    popup.id = "v-popup";
    popup.classList.add(
      this.type,
      this.position,
      "before-add"
    );
    popup.innerHTML = `<p>${this.content}</p>`;

    this.container.appendChild(popup);

    // after 2.9 seconds alert will start disappearing
    // and after 3.5 seconds alert will be removed from DOM
    setTimeout(() => popup.classList.add("before-remove"), 2900);
    setTimeout(() => this.container.removeChild(popup), 3500);
  }
}

export default Alert;