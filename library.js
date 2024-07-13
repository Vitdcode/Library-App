const author = document.querySelector("#author");
const title = document.querySelector("#title");
const numberPages = document.querySelector("#number-pages");
const addBookButton = document.querySelector("#add-book-button");

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
    addBooktoHtml(book)
  });

}

function addBooktoHtml(book) {
  library.forEach((book, index) => {
    const libraryWrapper = document.querySelector(".library-wrapper");

   

    const bookWrapper = document.createElement("div");
    const authorDiv = document.createElement("div");
    const titleDiv = document.createElement("div");
    const numberPagesDiv = document.createElement("div");

    /* book = new Book(author.value, title.value, numberPagesDiv.value); */

    authorDiv.classList.add("book");
    authorDiv.id.add = index;

    /*  authorDiv.textContent = author.value;
  titleDiv.textContent = title.value;
  numberPages.textContent = numberPages.value;
 */
    authorDiv.textContent = author.value;
    titleDiv.textContent = title.value;
    numberPages.textContent = numberPages.value;

    /* addBookButton.addEventListener("click", () => {
    libraryWrapper.appendChild(authorDiv);
    libraryWrapper.appendChild(titleDiv);
    libraryWrapper.appendChild(numberPagesDiv);
  }); */
  });
}

addBookToLibrary();
