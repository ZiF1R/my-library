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

  volume() {
    return this.books.length;
  }

  sortBy(column) {
    switch(column) {
    case "number": this.books.sort((a, b) => a.number - b.number); break;
    case "title": this.books.sort((a, b) => {
      if (a.title[0] > b.title[0]) return 1;
      else if (a.title[0] === b.title[0]) return 0;
      else return -1;
    }); break;
    case "author": this.books.sort((a, b) => {
      if (a.author[0] > b.author[0]) return 1;
      else if (a.author[0] === b.author[0]) return 0;
      else return -1;
    }); break;
    case "description": this.books.sort((a, b) => {
      if (a.description[0] > b.description[0]) return 1;
      else if (a.description[0] === b.description[0]) return 0;
      else return -1;
    }); break;
    case "status": this.books.sort((a, b) => {
      if (a.status && !b.status) return -1;
      else if ((a.status && b.status) || (!a.status && !b.status)) return 0;
      else return 1;
    }); break;
    }
    app.getElementsByClassName("table__content")[0].innerHTML = "";
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
    </div>`;

  let readButton = bookNode.querySelector(".column__status > button");
  readButton.addEventListener("click", (e) => {
    let button = e.target;
    button.innerHTML =
      button.classList.contains("button_primary") ? "Not read" : "read";
    button.classList.toggle("button_primary");
    button.classList.toggle("button_danger");
    book.status =
      button.classList.contains("button_primary") ? true : false;
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
      
      myLibrary.addBook(titleField.value, authorField.value, descriptionField.value);
      titleField.value = authorField.value = descriptionField.value = "";
      e.preventDefault();
    }
  });

  // handler for sort by column header
  let tableLegend = app.querySelector(".table__legend");
  tableLegend.addEventListener("click", (e) => {
    let target = e.target;
    if (target === tableLegend) return;

    let columns = tableLegend.children;
    let bookNumber = tableLegend.querySelector(".column__number");
    for (let column of columns)
      if (column !== target)
        column.classList.remove("column__active");
    target !== bookNumber && target.classList.toggle("column__active");

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
    "«Преступление и наказание» — социально-психологический и социально-философский роман Фёдора Михайловича Достоевского, над которым писатель работал в 1865—1866 годах."
  );
  myLibrary.addBook(
    "Война и мир",
    "Лев Николаевич Толстой",
    "«Война́ и мир» — роман-эпопея Льва Николаевича Толстого, описывающий русское общество в эпоху войн против Наполеона в 1805—1812 годах. Эпилог романа доводит повествование до 1820 года."
  );
};