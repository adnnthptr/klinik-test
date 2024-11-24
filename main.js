document.addEventListener('DOMContentLoaded', function() {
    const inputForm = document.getElementById('input-form');
    const incompleteBooks = document.getElementById('incomplete-books');
    const completeBooks = document.getElementById('complete-books');
  
    const STORAGE_KEY = 'bookshelf_data';
  
    function isStorageExist() {
        return typeof(Storage) !== 'undefined';
    }
  
    function saveBooksToStorage(books) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  
    function getBooksFromStorage() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
  
    function renderBooks() {
        incompleteBooks.innerHTML = '';
        completeBooks.innerHTML = '';
  
        const books = getBooksFromStorage();
        
        books.forEach(function(book, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>ID: ${book.id}</span><br>
                <span>${book.title} - ${book.author} (${book.year})</span><br>
                <button class="move-btn" data-index="${index}">Move to ${book.isComplete ? 'Incomplete' : 'Complete'}</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            if (book.isComplete) {
                li.classList.add('complete');
                completeBooks.appendChild(li);
            } else {
                li.classList.add('incomplete'); 
                incompleteBooks.appendChild(li);
            }
        });
    }
  
    function addBook(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = parseInt(document.getElementById('inputBookYear').value, 10);
        const isComplete = document.getElementById('isComplete').value === 'true';
        
        const newBook = {
            id: +new Date(),
            title: title,
            author: author,
            isComplete: isComplete,
            year: year, // Now this is a number
            date: new Date().toISOString() 
        };
        const bookshelf_data = getBooksFromStorage();
        bookshelf_data.push(newBook);
        saveBooksToStorage(bookshelf_data);
        renderBooks();
        event.target.reset();
    }
    
    function removeBook(index) {
        const books = getBooksFromStorage();
        books.splice(index, 1);
        saveBooksToStorage(books);
        renderBooks();
    }
  
    function moveBook(index) {
        const books = getBooksFromStorage();
        books[index].isComplete = !books[index].isComplete;
        saveBooksToStorage(books);
        renderBooks();
    }
  
    inputForm.addEventListener('submit', addBook);
  
    incompleteBooks.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.dataset.index;
            removeBook(index);
        } else if (event.target.classList.contains('move-btn')) {
            const index = event.target.dataset.index;
            moveBook(index);
        }
    });
  
    completeBooks.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.dataset.index;
            removeBook(index);
        } else if (event.target.classList.contains('move-btn')) {
            const index = event.target.dataset.index;
            moveBook(index);
        }
    });
  
    if (isStorageExist()) {
        renderBooks();
    }
  });