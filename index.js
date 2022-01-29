class Library {
  constructor(books = []) {
    this.books = books;
  }

  addBook(title, author, description) {
    let newBook = new Book(title, author, description);
    this.books.push(newBook);
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