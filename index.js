class Library {
  constructor(books = []) {
    this.books = books;
  }

  addBook(title, author, description) {
    let newBook = new Book(title, author, description);
    this.books.push(newBook);
    printNewBook(newBook);
  }

  volume() {
    return this.books.length;
  }
}
class Book {
  constructor(title, author, description) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.status = false;
  }
}

let myLibrary = new Library();

function printNewBook(book) {
  let bookNode = document.createElement("td");
  bookNode.classList.add("table__item");
  bookNode.innerHTML = `<div class="table__column column__number">${myLibrary.volume()}</div>
    <div class="table__column column__title">${book.title}</div>
    <div class="table__column column__author">${book.author}</div>
    <div class="table__column column__description">${book.description}</div>
    <div class="table__column column__status">
      <button class="button button_primary">Read</button>
    </div>`;

  let readButton = bookNode.querySelector(".column__status > button");
  readButton.addEventListener("click", (e) => {
    let button = e.target;
    button.innerHTML =
      button.classList.contains("button_primary") ? "Not read" : "read";
    button.classList.toggle("button_primary");
    button.classList.toggle("button_danger");
    book.status = !book.status;
  });

  document.body.querySelector("table.books .table__content").appendChild(bookNode);
}

window.onload = () => {
  document.body.querySelector(".book-form button").addEventListener("click", (e) => {
    if (document.forms[0].checkValidity()) {
      let titleField = document.body.querySelector(".form__fields .field__title");
      let authorField = document.body.querySelector(".form__fields .field__author");
      let descriptionField = document.body.querySelector(".form__fields .field__description");
      
      myLibrary.addBook(titleField.value, authorField.value, descriptionField.value);
      titleField.value = authorField.value = descriptionField.value = "";
      e.preventDefault();
    }
  });

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