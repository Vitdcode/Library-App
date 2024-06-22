const inputFieldTitle = document.querySelector('#input-field-title');
const inputFieldAuthor = document.querySelector('#input-field-author');
const inputFieldNumPages = document.querySelector('#input-field-number-pages');
const AddNewBookButton = document.querySelector('.add-book-button');
const mainContainer = document.querySelector('.main-container');
const bookContainer = document.querySelector('.book-container');
const dialog = document.querySelector('dialog');
const openDialogBtn = document.querySelector('.open-dialog-btn');
const closeDialogBtn = document.querySelector('.close-dialog-btn');


openDialogBtn.addEventListener('click', () => {
    dialog.showModal();
})

closeDialogBtn.addEventListener('click', () => {
    dialog.close();
})

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
}

function addBookToLibrary(array) {
    
    array.forEach(book => {
        
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.dataset.read = 'false';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');

        const readButton = document.createElement('button');
        readButton.classList.add('readButton');

        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');

        const backgroundImg = document.createElement('img');
        backgroundImg.classList.add('backroundImg');
        backgroundImg.src = "../Library-App/images/newBook.jpg"; 
        backgroundImg.alt = "Image from Henry Be on Unsplash";
  

        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Number of Pages: ${book.pageNum}`;
        deleteButton.textContent = 'Delete';
        readButton.textContent = 'Read';

        bookDiv.appendChild(backgroundImg);
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(deleteButton);
        bookDiv.appendChild(readButton);

        bookContainer.appendChild(bookDiv);

        })

    }


  
    bookContainer.addEventListener('click', (event) => {
        if(event.target.classList.contains('deleteButton')) {
            const bookDiv = event.target.parentElement;
            bookContainer.removeChild(bookDiv);
        }

        if(event.target.classList.contains('readButton')) {
            const bookDiv = event.target.parentElement;
            const readBookTag = bookDiv.querySelector('.readBookImg');
            const isRead = bookDiv.dataset.read === 'true';
    
            if(isRead && readBookTag) {
                bookDiv.removeChild(readBookTag)
                bookDiv.dataset.read = 'false';
            } else if(!isRead && !readBookTag) {
                const readBookImg = document.createElement('img');
                readBookImg.classList.add('readBookImg');
                readBookImg.src = '../Library-App/images/checked.png'
                readBookImg.alt = 'Image by Freepic';
                bookDiv.appendChild(readBookImg);
                bookDiv.dataset.read = 'true';
            }
        }
  

        
    })

    

 