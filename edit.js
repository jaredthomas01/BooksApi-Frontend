document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');
    console.log('Book ID:', bookId);
    
    if (bookId) {    
        fetch(`http://localhost:7890/Books/${bookId}`)
            .then(response => response.json())
            .then(book => {
                console.log('Fetched book:', book);
                document.getElementById('title').value = book.title;
                document.getElementById('author').value = book.author;
                document.getElementById('isbn').value = book.isbn;
                document.getElementById('publisher').value = book.publisher;
                document.getElementById('pages').value = book.pages;
                document.getElementById('quantity').value = book.quantity;
                document.getElementById('price').value = book.price;
            })
            .catch(error => console.error('Error fetching book details:', error));
    }

    const form = document.getElementById('edit-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const updatedBook = {
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                isbn: document.getElementById('isbn').value,
                publisher: document.getElementById('publisher').value,
                pages: document.getElementById('pages').value,
                quantity: document.getElementById('quantity').value,
                price: document.getElementById('price').value,
            };

            console.log('Updated Book:', updatedBook);

            fetch(`http://localhost:7890/Books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBook)
            })
            .then(response => response.json())
            .then(() => {
                alert('Book updated successfully!');
                window.location.href = 'index.html#list-content';
            })
            .catch(error => console.error('Error updating book:', error));
        });
    } else {
        console.error('Form not found');
    }
});
