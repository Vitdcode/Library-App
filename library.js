const author = document.querySelector("#author");
const title = document.querySelector("#title");
const numberPages = document.querySelector("#number-pages");
const addBookButton = document.querySelector("#add-book-button");
const libraryWrapper = document.querySelector(".library-wrapper");

const library = [];

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
}

function addBookToLibrary() {
  addBookButton.addEventListener("click", () => {
    const book = new Book(author.value, title.value, numberPages.value);
    library.push(book);
    addBooktoHtml();
  });
}

function addBooktoHtml() {
  document.querySelectorAll(".book").forEach((e) => e.remove());
  library.forEach((book, index) => {
    const bookWrapper = document.createElement("div");
    const authorDiv = document.createElement("p");
    const titleDiv = document.createElement("p");
    const numberPagesDiv = document.createElement("p");

    bookWrapper.classList.toggle("book");
    bookWrapper.id = index;

    authorDiv.textContent = book.author;
    titleDiv.textContent = book.title;
    numberPagesDiv.textContent = book.pages;

    bookWrapper.appendChild(authorDiv);
    bookWrapper.appendChild(titleDiv);
    bookWrapper.appendChild(numberPagesDiv);

    libraryWrapper.appendChild(bookWrapper);
  });
}

addBookToLibrary();
