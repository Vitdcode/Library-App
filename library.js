const author = document.querySelector("#author");
const title = document.querySelector("#title");
const numberPages = document.querySelector("#number-pages");
const bookForm = document.querySelector("#book-form");
const booksWrapper = document.querySelector(".books-wrapper");

const library = [];

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
}

function addBookToLibrary() {
  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const book = new Book(author.value, title.value, numberPages.value);
    library.push(book);
    addBooktoHtml();
    author.value = "";
    title.value = "";
    numberPages.value = "";
  });
}

function addBooktoHtml() {
  document.querySelectorAll(".book").forEach((e) => e.remove());
  library.forEach((book, index) => {
    const bookWrapper = document.createElement("div");
    const authorDiv = document.createElement("p");
    const titleDiv = document.createElement("p");
    const numberPagesDiv = document.createElement("p");
    const bookIcon = document.createElement("img");
    const bookBlurBackground = document.createElement("div");

    bookWrapper.classList.toggle("book");
    bookWrapper.id = index;

    bookBlurBackground.classList.add("book-blur-background");

    authorDiv.textContent = `Author: ${book.author}`;
    titleDiv.textContent = `Title: ${book.title}`;
    numberPagesDiv.textContent = `Number of Pages: ${book.pages}`;
    bookIcon.src = "./images/book_icon.png";
    bookIcon.alt = "Book Icon by Pixel perfect on freepik.com";

    bookWrapper.appendChild(bookBlurBackground);
    bookWrapper.appendChild(authorDiv);
    bookWrapper.appendChild(titleDiv);
    bookWrapper.appendChild(numberPagesDiv);
    bookWrapper.appendChild(bookIcon);

    booksWrapper.appendChild(bookWrapper);
  });
}

addBookToLibrary();
