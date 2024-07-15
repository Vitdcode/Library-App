const author = document.querySelector("#author");
const title = document.querySelector("#title");
const numberPages = document.querySelector("#number-pages");
const bookForm = document.querySelector("#book-form");
const booksWrapper = document.querySelector(".books-wrapper");

const library = [];

const Addingbook = (() => {
  Book.prototype.switchFavoriteImg = function () {
    this.favorite = this.favorite === false ? true : false;
  };

  function Book(author, title, pages, favorite) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.favorite = favorite;
  }

  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary();
  });

  function addBookToLibrary() {
    const book = new Book(author.value, title.value, numberPages.value, false);
    library.push(book);
    addBooktoHtml();
    author.value = "";
    /*  title.value = ""; */
    numberPages.value = "";
  }

  function addBooktoHtml() {
    document.querySelectorAll(".book").forEach((e) => e.remove());
    library.forEach((book, index) => {
      const bookWrapper = document.createElement("div");
      const authorDiv = document.createElement("p");
      const titleDiv = document.createElement("p");
      const numberPagesDiv = document.createElement("p");
      const bookBlurBackground = document.createElement("div");
      const favorite = document.createElement("img");

      bookWrapper.classList.add("book");
      bookWrapper.id = index;

      bookBlurBackground.classList.add("book-blur-background");

      /* authorDiv.textContent = `Author: ${book.author}`;
    numberPagesDiv.textContent = `Number of Pages: ${book.pages}`; */
      titleDiv.textContent = book.title;

      bookWrapper.appendChild(bookBlurBackground);
      bookWrapper.appendChild(authorDiv);
      bookWrapper.appendChild(titleDiv);
      bookWrapper.appendChild(numberPagesDiv);
      bookWrapper.appendChild(favorite);

      booksWrapper.appendChild(bookWrapper);

      BookFeatures.favorites(book, favorite);
    });
  }

  return { addBookToLibrary, addBooktoHtml };
})();

const BookFeatures = (() => {
  function favorites(book, favorite) {
    if (book.favorite == false) {
      favorite.src = "./images/favorite_not_selected.png";
      favorite.alt = "Book Icon by Pixel perfect on freepik.com";
    } else if (book.favorite == true) {
      favorite.src = "./images/favorite_selected.png";
      favorite.alt = "Book Icon by Pixel perfect on freepik.com";
    }

    favorite.addEventListener("click", () => {
      if (book.favorite == false) {
        favorite.src = "./images/favorite_selected.png";
        book.switchFavoriteImg();
      } else if (book.favorite == true) {
        favorite.src = "./images/favorite_not_selected.png";
        book.switchFavoriteImg();
      }
    });
  }

  return { favorites };
})();
