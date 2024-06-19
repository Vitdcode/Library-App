const inputFieldTitle = document.querySelector('.input-field-title');
const inputFieldAuthor = document.querySelector('.input-field-author');
const inputFieldNumPages = document.querySelector('.input-field-number-pages');
const AddNewBookButton = document.querySelector('.add-book');
const mainContainer = document.querySelector('.main-container');



function addBookToLibrary(array) {
    array.forEach(book => {
        const bookDiv = document.createElement('div');
        const book1 = document.createElement('p');
        book1.textContent = `Title: ${book.title} Author: ${book.author} Number of Pages: ${book.pages}`;
        bookDiv.appendChild(book1);
        mainContainer.appendChild(bookDiv);
    });
}


const myLibrary = [
    {
        title: 'The Hobbit',
        author: 'JRR Tolkien',
        pages: 295
    },
    {
        title: 'The Coder part 3',
        author: 'Great Artist',
        pages: 300
    }

];

console.log(addBookToLibrary(myLibrary));


function Book(title, author, pageNum) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.readMarker = function() {
        return 'Not read yet';
    }
    this.info = function () {
        return `${title} by ${author}, ${pageNum} pages, ${this.readMarker()}`
    }
  
}







  /* const theHobbit = new Book(title, author, numberPages); */
/* const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295'); */
/* let div = document.createElement('div'); */