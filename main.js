// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {

}
// Add book to list
UI.prototype.addBookToList = function (book) {

  const list = document.getElementById('book-list')
  // Crate tr element
  const row = document.createElement('tr');
  // Insert tds
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">x</a></td>
  `;

  list.appendChild(row);

}
// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`
  // Add Text
  div.appendChild(document.createTextNode(`${message}`));
  //Get parent
  const container = document.querySelector('.container')
  // Get form
  const form = document.querySelector('#book-form')
  // Insert alert
  container.insertBefore(div, form)

  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector('.alert').remove()
  }, 2000);

}
// Clear Fields
UI.prototype.clearFields = function () {
  title.value = '';
  author.value = '';
  isbn.value = '';
}
//Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function (e) {

  // Get Form Values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {

    // Error Alert
    ui.showAlert('Please fill in all fields', 'error');

  } else {

    // Add book to list
    ui.addBookToList(book);
    // Show Success
    ui.showAlert('Book Added!', 'success')

    // Clear Fields
    ui.clearFields();
    console.log(ui)
    console.log(book)


  }

  e.preventDefault();
})

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();
  // Delete book
  ui.deleteBook(e.target);

  //Show message
  ui.showAlert('Book Removed!', 'success')

  e.preventDefault();
})