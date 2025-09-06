const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElem = document.querySelector('.cart-total');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <p>${item.name}</p>
      <p>A$${item.price.toFixed(2)} x 
        <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="item-qty">
      </p>
      <button data-index="${index}" class="remove-btn">Remove</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotalElem.textContent = `Total: A$${total.toFixed(2)}`;

  document.querySelectorAll('.item-qty').forEach(input => {
    input.addEventListener('change', (e) => {
      const idx = e.target.dataset.index;
      cart[idx].quantity = Math.max(1, parseInt(e.target.value));
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      cart.splice(idx, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });
}

renderCart();

document.querySelector('.checkout-btn').addEventListener('click', () => {
  alert('Proceeding to checkout!');
  localStorage.removeItem('cart');
  renderCart();
});
