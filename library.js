const Addingbook = (() => {
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const numberPages = document.querySelector("#number-pages");
  const bookForm = document.querySelector("#book-form");
  const booksWrapper = document.querySelector(".books-wrapper");

  const library = [];

  Book.prototype.switchFavoriteImg = function () {
    this.favorite = this.favorite === false ? true : false;
  };

  Book.prototype.switchReadStatus = function () {
    this.readStatus = this.readStatus === false ? true : false;
  };

  function Book(author, title, pages, favorite, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.favorite = favorite;
    this.readStatus = readStatus;
  }

  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary();
  });

  function addBookToLibrary() {
    const book = new Book(
      author.value,
      title.value,
      numberPages.value,
      false,
      false
    );
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
      const readStatusDiv = document.createElement("div");

      bookWrapper.classList.add("book");
      bookWrapper.id = index;

      readStatusDiv.classList.add("read-status");

      bookBlurBackground.classList.add("book-blur-background");

      /* authorDiv.textContent = `Author: ${book.author}`;
    numberPagesDiv.textContent = `Number of Pages: ${book.pages}`; */
      titleDiv.textContent = book.title;

      bookWrapper.appendChild(bookBlurBackground);
      bookWrapper.appendChild(authorDiv);
      bookWrapper.appendChild(titleDiv);
      bookWrapper.appendChild(numberPagesDiv);
      bookWrapper.appendChild(favorite);
      bookWrapper.appendChild(readStatusDiv);

      booksWrapper.appendChild(bookWrapper);

      BookFeatures.favorites(book, favorite, bookWrapper);
      BookFeatures.bookReadStatus(book, readStatusDiv);
    });
  }

  return { addBookToLibrary, addBooktoHtml };
})();

const BookFeatures = (() => {
  const closeDialog = document.createElement("button");

  function bookReadStatus(book, readStatusDiv) {
    if (book.readStatus == false) {
      readStatusDiv.textContent = "Mark as Read";
    } else if (book.readStatus == true) {
      readStatusDiv.textContent = "Mark as Unread";
    }

    readStatusDiv.addEventListener("click", () => {
      if (book.readStatus == false) {
        readStatusDiv.textContent = "Mark as Unread";
        book.switchReadStatus();
      } else if (book.readStatus == true) {
        readStatusDiv.textContent = "Mark as Read";
        book.switchReadStatus();
      }
    });
  }

  function favorites(book, favorite, bookWrapper) {
    const favoritesMenu = document.querySelector("#favorites-menu-button");
    const dialogWrapper = document.querySelector(".dialog-wrapper");
    const favoritesCloseButtonWrapper = document.createElement("div");

    const dialog = document.querySelector("dialog");

    closeDialog.textContent = "Close";
    closeDialog.classList.add("close-dialog-button");
    favoritesCloseButtonWrapper.classList.add("favoritesCloseButtonWrapper");
    favoritesCloseButtonWrapper.appendChild(closeDialog);
    dialog.appendChild(favoritesCloseButtonWrapper);

    favoritesMenu.addEventListener("click", () => {
      dialog.showModal();
    });

    closeDialog.addEventListener("click", () => {
      dialog.close();
    });

    let clonedBookWrapper = bookWrapper.cloneNode(true);
    attachEventListenerToFavorites(book, favorite);
    if (book.favorite == false) {
      favorite.src = "./images/favorite_not_selected.png";
      favorite.alt = "favorites Icon by Freepik on freepik.com";
    } else if (book.favorite == true) {
      favorite.src = "./images/favorite_selected.png";
      favorite.alt = "favorites Icon by Freepik on freepik.com";
      clonedBookWrapper = bookWrapper.cloneNode(true);
      dialogWrapper.appendChild(clonedBookWrapper);
      const favoriteImgListener = clonedBookWrapper.querySelector("img");
      attachEventListenerToFavorites(book, favoriteImgListener); // prettier-ignore
    }

    function attachEventListenerToFavorites(book, favorite) {
      favorite.addEventListener("click", () => {
        if (book.favorite == false) {
          book.switchFavoriteImg();
          favorite.src = "./images/favorite_selected.png";

          Addingbook.addBooktoHtml();
        } else if (book.favorite == true) {
          favorite.src = "./images/favorite_not_selected.png";
          book.switchFavoriteImg();
          Addingbook.addBooktoHtml();
        }
      });
    }
  }

  return { favorites, bookReadStatus };
})();
