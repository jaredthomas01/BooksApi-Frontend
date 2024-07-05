document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:7890/Books')  
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      data.forEach(book => {
        Book.createCard(new Book(book.title, book.author, book.isbn, book.publisher, book.pages, book.quantity, book.price, book.id, book.image));
      });
    })
    .catch(error => console.error('Error fetching books:', error));

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    Book.add();
  });
});

class Book {
  constructor(title, author, isbn, publisher, pages, quantity, price, id, image) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publisher = publisher;
    this.pages = pages;
    this.quantity = quantity;
    this.price = price;
    this.id = id;
    this.image = image;
  }

  static createCard(book) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const cardContent = `
      <p><strong></strong> <img src="${book.image}" alt="${book.title}" style="max-width: 100%; height: auto;" /></p>  
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>ISBN:</strong> ${book.isbn}</p>
      <p><strong>Publisher:</strong> ${book.publisher}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Quantity:</strong> ${book.quantity}</p>
      <p><strong>price:</strong> ${book.price}</p>
      <button class="edit-button">Edit</button>
      <button class="remove-button">Remove</button>
    `;

    card.innerHTML = cardContent;

    card.querySelector('.remove-button').addEventListener('click', () => {
      fetch(`http://localhost:7890/Books/${book.id}`, { 
        method: 'DELETE',
      }).then(() => {
        card.remove();
      }).catch(error => console.error('Error deleting book:', error));
    });

    card.querySelector('.edit-button').addEventListener('click', () => {
      window.location.href = `edit.html?bookId=${book.id}`;
    });

    const container = document.getElementById('bookList');
    container.appendChild(card);
  }

  static add() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const publisher = document.getElementById('publisher').value;
    const pages = document.getElementById('pages').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;
    const book = new Book(title, author, isbn, publisher, pages, quantity, price,image);

    fetch('http://localhost:7890/Books', { // Replace with the backend URL for posting books
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        Book.createCard(new Book(data.title, data.author, data.isbn, data.publisher, data.pages, data.quantity, data.price, data.id, data.image));
        alert('Book added successfully!');
        window.location.href = 'admin.html#list-content'; // Redirect to books list section
      })
      .catch(error => console.error('Error adding book:', error));
  }
}

const style = document.createElement('style');
style.innerHTML = `
  #bookList {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    padding: 16px;
  }

  .card {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;
  }

  .card h2 {
    margin-top: 0;
  }

  .card p {
    margin: 8px 0;
  }

  .card button {
    margin-top: 8px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .edit-button {
    background-color: #4CAF50;
    color: white;
  }

  .remove-button {
    background-color: #f44336;
    color: white;
  }
`;
document.head.appendChild(style);
