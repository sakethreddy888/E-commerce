// script.js
document.addEventListener('DOMContentLoaded', function () {
    const cartItems = [];
    const messageBox = document.getElementById('message-box');

    // Function to show messages
    function showMessage(message, isError = false) {
        messageBox.textContent = message;
        messageBox.style.backgroundColor = isError ? '#ff4d4d' : '#4CAF50';
        messageBox.style.display = 'block';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000); // Hide message after 3 seconds
    }

    // Add to Cart functionality for both Home and Shop sections
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productElement = this.closest('.product, .offer');
            const product = {
                name: productElement.querySelector('h2, h3, h4').textContent, // Get product name
                price: parseFloat(productElement.querySelector('p').textContent.replace('$', '')), // Get product price
                image: productElement.querySelector('img').src // Get product image
            };
            cartItems.push(product);
            updateCartDisplay();
            showMessage('Item added to cart!');
        });
    });

    // Update Cart Display
    function updateCartDisplay() {
        const cartItemsList = document.getElementById('cart-items');
        cartItemsList.innerHTML = ''; // Clear the list
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');

            // Add product image to the cart item
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.style.width = '50px'; // Adjust image size as needed
            img.style.height = 'auto';
            li.appendChild(img);

            // Add product name and price
            const itemDetails = document.createElement('div');
            itemDetails.className = 'cart-item-details';
            itemDetails.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            `;
            li.appendChild(itemDetails);

            // Add a delete button for each item
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                cartItems.splice(index, 1); // Remove the item from the cart
                updateCartDisplay();
                showMessage('Item removed from cart!', true); // Show error-style message
            });

            li.appendChild(deleteButton);
            cartItemsList.appendChild(li);
        });
    }

    // Navigation functionality
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // Show Home section by default
    document.getElementById('home').style.display = 'block';
});