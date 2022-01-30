class Alert {
  constructor(container = document.body, type, position, title, content = "") {
    this.container = container;
    this.type = type;
    this.position = position;
    this.title = title;
    this.content = content;

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
    popup.innerHTML = `<h3>${this.title}</h3>
    ${this.content !== "" ? "<p>"+this.content+"</p>" : ""}`;

    this.container.appendChild(popup);
    setTimeout(() => popup.classList.add("before-remove"), 2900);
    setTimeout(() => this.container.removeChild(popup), 3500);
  }
}

export default Alert;