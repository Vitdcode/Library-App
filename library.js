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

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addBookToLibrary() {
  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const book = new Book(author.value, title.value, numberPages.value);
    library.push(book);
    addBooktoHtml();
    author.value = "";
    /*  title.value = ""; */
    numberPages.value = "";
  });
}

function addBooktoHtml() {
  let rgbValue1 = Math.floor(Math.random() * 255);
  let rgbValue2 = Math.floor(Math.random() * 255);
  let rgbValue3 = Math.floor(Math.random() * 255);
  document.querySelectorAll(".book").forEach((e) => e.remove());
  library.forEach((book, index) => {
    const bookWrapper = document.createElement("div");
    const authorDiv = document.createElement("p");
    const titleDiv = document.createElement("p");
    const numberPagesDiv = document.createElement("p");
    const favoriteNotSelected = document.createElement("img");
    const bookBlurBackground = document.createElement("div");

    bookWrapper.classList.toggle("book");
    bookWrapper.id = index;

    bookBlurBackground.classList.add("book-blur-background");

    /* authorDiv.textContent = `Author: ${book.author}`;
    numberPagesDiv.textContent = `Number of Pages: ${book.pages}`; */
    titleDiv.textContent = book.title;
    /* titleDiv.style.backgroundColor = `rgba(${Math.floor(Math.random() * randomIntFromInterval(150, 255))}, ${Math.floor(Math.random() * randomIntFromInterval(150, 255))}, ${Math.floor(Math.random() * randomIntFromInterval(150, 255))}, 0.5)`; //prettier-ignore */
    favoriteNotSelected.src = "./images/favorite_not_selected.png";
    favoriteNotSelected.alt = "Book Icon by Pixel perfect on freepik.com";

    bookWrapper.appendChild(bookBlurBackground);
    bookWrapper.appendChild(authorDiv);
    bookWrapper.appendChild(titleDiv);
    bookWrapper.appendChild(numberPagesDiv);
    bookWrapper.appendChild(favoriteNotSelected);

    booksWrapper.appendChild(bookWrapper);
  });
}

addBookToLibrary();
