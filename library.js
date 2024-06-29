const bookForm = document.querySelector(".new-book-form");
const inputFieldTitle = document.querySelector("#input-field-title");
const inputFieldAuthor = document.querySelector("#input-field-author");
const inputFieldNumPages = document.querySelector("#input-field-number-pages");
const AddNewBookButton = document.querySelector("add-book-to-library-btn");
const mainContainer = document.querySelector(".main-container");
const bookContainer = document.querySelector(".book-container");
const dialog = document.querySelector("dialog");
const openDialogBtn = document.querySelector(".open-dialog-btn");
const closeDialogBtn = document.querySelector(".close-dialog-btn");

openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

let myLibrary = [];

function Book(title, author, numberPages, read = false) {
  this.title = title;
  this.author = author;
  this.numberPages = numberPages;
  this.read = read;
}

Book.prototype.readNotReadToggle = function () {
  this.read = !this.read;
};

bookForm.addEventListener("submit", preventSubmit, false);
function preventSubmit(event) {
  event.preventDefault();

  const title = inputFieldTitle.value;
  const author = inputFieldAuthor.value;
  const numOfPages = inputFieldNumPages.value;

  myLibrary.push(new Book(title, author, numOfPages));

  addBookToLibrary(myLibrary);

  inputFieldTitle.value = "";
  inputFieldAuthor.value = "";
  inputFieldNumPages.value = "";
}

function addBookToLibrary() {
  bookContainer.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.index = index;
    deleteButton.addEventListener("click", deleteBook);

    const readButtonToggle = document.createElement("button");
    readButtonToggle.classList.add("read-button-toggle");
    readButtonToggle.dataset.index = index;
    readButtonToggle.addEventListener("click", readBookToggle);
    readButtonToggle.textContent = book.read ? "Read" : "Unread";

    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");

    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Number of Pages: ${book.numberPages}`;
    deleteButton.textContent = "Delete";

    const backgroundImg = document.createElement("img");
    backgroundImg.classList.add("backroundImg");
    backgroundImg.src = "../Library-App/images/newBook.jpg";
    backgroundImg.alt = "Image from Henry Be on Unsplash";

    bookDiv.appendChild(backgroundImg);
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(deleteButton);
    bookDiv.appendChild(readButtonToggle);

    bookContainer.appendChild(bookDiv);
  });
}

function deleteBook(event) {
  const index = event.target.dataset.index;
  myLibrary.splice(index, 1);
  addBookToLibrary();
}

function readBookToggle(event) {
  const index = event.target.dataset.index;
  myLibrary[index].readNotReadToggle();
  addBookToLibrary();
}
