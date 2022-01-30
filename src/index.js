import Alert from "./plugins/alert/index.js";

class Library {
  constructor(books = []) {
    this.books = books;
  }

  addBook(title, author, description) {
    let newBook = new Book(title, author, description, this.books.length + 1);
    this.books.push(newBook);
    printNewBook(newBook);

    return this.books.length;
  }

  removeBook(book) {
    let removeIndex = this.books.indexOf(book);
    if (removeIndex !== this.books.length - 1) {
      for (let i = removeIndex; i < this.books.length - 1; i++) {
        this.books[i + 1].number--;
        this.books[i] = this.books[i + 1];
      }
    }
    this.books.pop();
    this.renderLibrary();

    return this.books.length;
  }

  volume() {
    return this.books.length;
  }

  sortBy(column) {
    switch(column) {
    case "number": this.books.sort((a, b) => a.number - b.number); break;
    case "title": case "author": case "description":
      this.books.sort((a, b) => {
        if (a[column][0] > b[column][0]) return 1;
        else if (a[column][0] === b[column][0]) return 0;
        else return -1;
      }); break;
    case "status": this.books.sort((a, b) => {
      if (a.status && !b.status) return -1;
      else if ((a.status && b.status) || (!a.status && !b.status)) return 0;
      else return 1;
    }); break;
    }
    this.renderLibrary();
  }

  renderLibrary() {
    app.querySelector(".table__content").innerHTML = "";
    for (let book of this.books)
      printNewBook(book);
  }
}

class Book {
  constructor(title, author, description, number) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.number = number;
    this.status = false;
  }
}

let myLibrary = new Library();
let app = null;

window.library = myLibrary;

function printNewBook(book) {
  let bookNode = document.createElement("td");
  bookNode.classList.add("table__item");
  bookNode.innerHTML = `<div class="table__column column__number">${book.number}</div>
    <div class="table__column column__title">${book.title}</div>
    <div class="table__column column__author">${book.author}</div>
    <div class="table__column column__description">${book.description}</div>
    <div class="table__column column__status">
      <button class="button ${book.status ? "button_primary" : "button_danger"}">
        ${book.status ? "read" : "Not read"}
      </button>
    </div>
    <div class="table__column column__remove">
      <button class="button button_danger">Remove</button>
    </div>`;

  let readButton = bookNode.querySelector(".column__status > button");
  let removeButton = bookNode.querySelector(".column__remove > button");
  readButton.addEventListener("click", (e) => {
    let button = e.target;
    button.innerHTML =
      button.classList.contains("button_primary") ? "Not read" : "read";
    button.classList.toggle("button_primary");
    button.classList.toggle("button_danger");
    book.status =
      button.classList.contains("button_primary") ? true : false;
  });
  removeButton.addEventListener("click", () => {
    app.querySelector("table.books .table__content").removeChild(bookNode);
    myLibrary.removeBook(book);

    new Alert(
      app,
      "danger",
      "bottom-right",
      "Attention",
      "The book was removed!"
    );
  });

  app.querySelector("table.books .table__content").appendChild(bookNode);
}

function setDefaultEventListeners() {
  // book-form submit button handler with preventDefault
  app.querySelector(".book-form button").addEventListener("click", (e) => {
    if (document.forms[0].checkValidity()) {
      let titleField = document.body.querySelector(".form__fields .field__title");
      let authorField = document.body.querySelector(".form__fields .field__author");
      let descriptionField = document.body.querySelector(".form__fields .field__description");
      
      myLibrary.addBook(
        titleField.value.trim(),
        authorField.value.trim(),
        descriptionField.value.trim()
      );
      titleField.value = authorField.value = descriptionField.value = "";
      e.preventDefault();

      new Alert(
        app,
        "success",
        "bottom-right",
        "Success",
        "The book added successfully!"
      );
    }
  });

  // handler for sort by column header
  let tableLegend = app.querySelector(".table__legend");
  tableLegend.addEventListener("click", (e) => {
    let target = e.target;
    if (target === tableLegend) return;

    let columns = tableLegend.children;
    for (let column of columns)
      if (column !== target)
        column.classList.remove("column__active");
    if (
      !target.classList.contains("column__number") &&
      !target.classList.contains("column__remove")
    )
      target.classList.toggle("column__active");

    if (target.classList.contains("column__active")) {
      myLibrary.sortBy(target.innerHTML.toLowerCase());
    } else myLibrary.sortBy("number");
  });
}

window.onload = () => {
  app = document.getElementById("app");
  setDefaultEventListeners();

  myLibrary.addBook(
    "Преступление и наказание",
    "Фёдор Михайлович Достоевский",
    "Преступление и наказание — социально-психологический и социально-философский роман Фёдора Михайловича Достоевского, над которым писатель работал в 1865—1866 годах."
  );
  myLibrary.addBook(
    "Война и мир",
    "Лев Николаевич Толстой",
    "Война́ и мир — роман-эпопея Льва Николаевича Толстого, описывающий русское общество в эпоху войн против Наполеона в 1805—1812 годах. Эпилог романа доводит повествование до 1820 года."
  );
};