const Addingbook = (() => {
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const numberPages = document.querySelector("#number-pages");
  const bookForm = document.querySelector("#book-form");
  const booksWrapper = document.querySelector(".books-wrapper");

  const library = [];

  class Book {
    constructor(author, title, pages, favorite, readStatus) {
      this.author = author;
      this.title = title;
      this.pages = pages;
      this.favorite = favorite;
      this.readStatus = readStatus;
    }

    switchFavoriteImg() {
      this.favorite = this.favorite === false ? true : false;
    }

    switchReadStatus() {
      this.readStatus = this.readStatus === false ? true : false;
    }
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
    // remove all books from the DOM
    document.querySelectorAll(".book").forEach((e) => e.remove());

    // render each book in library
    library.forEach((book, index) => {
      const bookWrapper = document.createElement("div");
      const authorDiv = document.createElement("p");
      const titleDiv = document.createElement("p");
      const numberPagesDiv = document.createElement("p");
      const bookBlurBackground = document.createElement("div");
      const favorite = document.createElement("img");
      const readStatusDiv = document.createElement("div");
      const bookReadCheckbox = document.createElement("img");
      const deleteBookButton = document.createElement("img");

      bookWrapper.classList.add("book");
      bookWrapper.id = index;

      readStatusDiv.classList.add("read-status");
      bookBlurBackground.classList.add("book-blur-background");
      favorite.classList.add("favoriteIcon");
      bookReadCheckbox.classList.add("checkbox");
      deleteBookButton.classList.add("delete-book");
      authorDiv.textContent = `Author: ${book.author}`;
      numberPagesDiv.textContent = `Number of Pages: ${book.pages}`;
      titleDiv.textContent = book.title;

      bookWrapper.appendChild(bookBlurBackground);
      bookWrapper.appendChild(titleDiv);
      bookWrapper.appendChild(favorite);
      bookWrapper.appendChild(readStatusDiv);
      bookWrapper.appendChild(bookReadCheckbox);
      bookWrapper.appendChild(deleteBookButton);

      booksWrapper.appendChild(bookWrapper);

      //call all Book Feature functions with the needed elements
      BookFeatures.favorites(book, favorite, bookWrapper);
      BookFeatures.bookReadStatus(book, readStatusDiv, bookReadCheckbox);
      BookFeatures.deleteBook(booksWrapper, bookWrapper, deleteBookButton, library); //prettier-ignore
      BookFeatures.bookDisplay(
        bookWrapper,
        bookBlurBackground,
        authorDiv,
        numberPagesDiv,
        titleDiv
      );
    });
  }

  return { addBookToLibrary, addBooktoHtml };
})();

const BookFeatures = (() => {
  //declaring "global" variables inside of BookFeatures so they are available for all functions inside BookFeatures
  const closeDialogBookDisplayButtonWrapper = document.createElement("div");
  const closeDialogBookDisplayButton = document.createElement("button");
  const bookInfoWrapper = document.createElement("div");
  bookInfoWrapper.classList.add("book-display-information");
  const loremParagraph = document.createElement("p");
  loremParagraph.textContent = `Exploring the Cosmos: The Wonders of the Universe" takes readers on a journey through the vast expanse of the universe, uncovering the mysteries that have fascinated humanity for centuries. The book begins by exploring the historical perspectives of ancient civilizations, highlighting how early astronomers charted the stars and planets, setting the foundation for modern astronomy.

The narrative then shifts to the birth of the universe, explaining the Big Bang theory and the formation of fundamental particles, atoms, and the first light that illuminated the cosmos. The book vividly describes the life cycle of stars, from their formation in nebulae to their dramatic deaths in supernova explosions, providing a comprehensive understanding of stellar evolution.

Black holes, one of the most enigmatic phenomena in the universe, are explored in detail. The author explains their nature, the theories proposed by Einstein and Hawking, and recent discoveries made using advanced telescopes. The Milky Way galaxy is also examined, with insights into its structure, components, and the supermassive black hole at its center.

The search for exoplanets and the possibility of extraterrestrial life are recurring themes. The book covers the methods used to detect distant worlds and highlights some of the most intriguing discoveries. It discusses the conditions necessary for life and the ongoing efforts to find signs of life beyond Earth, including the study of extremophiles on our planet.

Dark matter and dark energy, which make up most of the universe's mass-energy content, are discussed extensively. The author explains the evidence for their existence and the current research aimed at understanding their nature and influence on cosmic evolution. Readers are taken to the edge of the observable universe, exploring the concept of the cosmic horizon and the multiverse theory.

The book emphasizes the role of technology in advancing our knowledge of the cosmos. From Galileo's telescope to the Hubble Space Telescope and the upcoming James Webb Space Telescope, readers learn how these instruments have revolutionized our understanding of the universe. The solar system is explored in detail, with each planet receiving its own spotlight.

The narrative also addresses the big questions about the universe's fate, exploring theories such as the Big Freeze, Big Crunch, and Big Rip. Time travel is examined through theoretical physics, discussing wormholes, Einstein's theory of relativity, and the challenges of faster-than-light travel. The book combines scientific rigor with engaging storytelling, making complex topics accessible to all readers.

"Exploring the Cosmos" concludes with a look at the future of space exploration, discussing upcoming missions, the potential for human colonization of other planets, and the quest to understand the origins of life. The book leaves readers with a sense of wonder and excitement about the endless possibilities that lie ahead, inspiring a renewed curiosity about the universe and our place within it.`;

  function bookDisplay(
    bookWrapper,
    bookBlurBackground,
    authorDiv,
    numberPagesDiv,
    titleDiv
  ) {
    /* const bookInfo = document.querySelector(".book-display-information"); */
    const dialogBookDisplay = document.querySelector(".book-display-dialog");
    let clonedBook = bookWrapper.cloneNode(true);
    const dialogWrapperBookDisplay = document.querySelector('.dialog-wrapper-book-display'); //prettier-ignore

    const cleanedBook = clonedBook.querySelectorAll('.favoriteIcon, .checkbox, .read-status, .delete-book, .book-blur-background'); //prettier-ignore

    cleanedBook.forEach((element) => {
      element.remove("img", "div");
    });

    closeDialogBookDisplayButton.textContent = "Close";
    closeDialogBookDisplayButtonWrapper.appendChild(closeDialogBookDisplayButton); //prettier-ignore
    closeDialogBookDisplayButtonWrapper.classList.add('book-display-close-button-wrapper'); //prettier-ignore

    dialogBookDisplay.appendChild(closeDialogBookDisplayButtonWrapper);

    bookBlurBackground.addEventListener("click", () => {
      bookInfoWrapper.appendChild(titleDiv);
      bookInfoWrapper.appendChild(authorDiv);
      bookInfoWrapper.appendChild(numberPagesDiv);
      bookInfoWrapper.appendChild(loremParagraph);
      dialogWrapperBookDisplay.appendChild(clonedBook);
      dialogWrapperBookDisplay.appendChild(bookInfoWrapper);

      dialogBookDisplay.showModal();
    });

    closeDialogBookDisplayButton.addEventListener("click", () => {
      dialogWrapperBookDisplay.innerHTML = "";
      bookInfoWrapper.innerHTML = "";
      dialogBookDisplay.close();
    });
  }

  function deleteBook(booksWrapper, bookWrapper, deleteBookButton, library) {
    deleteBookButton.src = "./images/delete.png";

    deleteBookButton.addEventListener("click", () => {
      booksWrapper.removeChild(bookWrapper);
      const bookId = bookWrapper.id;
      library.splice(bookId, 1);
      Addingbook.addBooktoHtml();
    });
  }
  function bookReadStatus(book, readStatusDiv, bookReadCheckbox) {
    if (book.readStatus == false) {
      readStatusDiv.textContent = "Mark as Read";
      bookReadCheckbox.src = "./images/check_unchecked.png";
    } else if (book.readStatus == true) {
      readStatusDiv.textContent = "Mark as Unread";
      bookReadCheckbox.src = "./images/check_checked.png";
    }

    readStatusDiv.addEventListener("click", () => {
      if (book.readStatus == false) {
        readStatusDiv.textContent = "Mark as Unread";
        bookReadCheckbox.src = "./images/check_checked.png";
        book.switchReadStatus();
      } else if (book.readStatus == true) {
        readStatusDiv.textContent = "Mark as Read";
        bookReadCheckbox.src = "./images/check_unchecked.png";
        book.switchReadStatus();
      }
    });
  }

  const favoritesCloseButtonWrapper = document.createElement("div");
  const closeDialog = document.createElement("button");
  function favorites(book, favorite, bookWrapper) {
    const favoritesMenu = document.querySelector("#favorites-menu-button");
    const dialogWrapper = document.querySelector(".dialog-wrapper-favorites");

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
      const deleteBookClass = clonedBookWrapper.querySelector(".delete-book");
      deleteBookClass.classList.remove("delete-book");

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

  return {
    favorites,
    bookReadStatus,
    deleteBook,
    bookDisplay,
  };
})();
