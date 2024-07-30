document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');
    console.log('Book ID:', bookId);
    
    if (bookId) {    
        fetch(`http://localhost:7890/Books/${bookId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(book => {
                console.log('Fetched book:', book);
                document.getElementById('title').value = book.title;
                document.getElementById('author').value = book.author;
                document.getElementById('isbn').value = book.isbn;
                document.getElementById('publisher').value = book.publisher;
                document.getElementById('pages').value = book.pages;
                document.getElementById('quantity').value = book.quantity;
                document.getElementById('price').value = parseFloat(book.price).toFixed(2); // Ensure price is displayed as a decimal
                document.getElementById('image').value = book.image;
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
                pages: parseInt(document.getElementById('pages').value, 10),
                quantity: parseInt(document.getElementById('quantity').value, 10),
                price: parseFloat(document.getElementById('price').value).toFixed(2),
                image: document.getElementById('image').value,
            };

            console.log('Updated Book:', updatedBook);
            
            fetch(`http://localhost:7890/Books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBook)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Updated book data:', data);
                alert('Book updated successfully!');
                window.location.href = 'admin.html#list-content';
            })
            .catch(error => console.error('Error updating book:', error));
        });
    } else {
        console.error('Form not found');
    }
});
