document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    const updateCartDisplay = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        for (const bookId in cart) {
            const item = cart[bookId];
            total += item.price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="image/book-${bookId}.png" alt="${item.title}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                    <div class="cart-item-quantity">
                        <input type="number" value="${item.quantity}" min="1" data-book-id="${bookId}" class="quantity-input">
                        <button class="remove-btn" data-book-id="${bookId}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        }

        totalAmount.innerText = total.toFixed(2);
        attachEventListeners();
    }

    const attachEventListeners = () => {
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const bookId = e.target.dataset.bookId;
                delete cart[bookId];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const bookId = e.target.dataset.bookId;
                const newQuantity = parseInt(e.target.value);
                cart[bookId].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    checkoutBtn.addEventListener('click', () => {
        alert('Checkout process not implemented');
    });

    updateCartDisplay();
});
