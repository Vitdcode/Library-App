const inputFieldTitle = document.querySelector('#input-field-title');
const inputFieldAuthor = document.querySelector('#input-field-author');
const inputFieldNumPages = document.querySelector('#input-field-number-pages');
const AddNewBookButton = document.querySelector('.add-book-button');
const mainContainer = document.querySelector('.main-container');
const bookContainer = document.querySelector('.book-container');


let myLibrary = [];

    AddNewBookButton.addEventListener('click', () => {

        const title = inputFieldTitle.value;
        const author = inputFieldAuthor.value;
        const pages = inputFieldNumPages.value;

        myLibrary.push(new Book(title, author, pages));
        addBookToLibrary(myLibrary);

        inputFieldTitle.value = '';
        inputFieldAuthor.value = '';
        inputFieldNumPages.value = '';
        myLibrary = [];

    });


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


function addBookToLibrary(array) {
    
    array.forEach(book => {
        
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
       
        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Number of Pages: ${book.pageNum}`

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);

        bookContainer.appendChild(bookDiv);

       
        })

    }

  


