const cartContainer = document.querySelector('.cart-items');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  cartContainer.innerHTML = ''; 
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="product-img/${item.image}" alt="${item.name}">
      <div class="item-details">
        <h3 class="product-name">${item.name}</h3>
        <p class="price-unit">${item.price}</p>
        <div class="quantity-control">
          <button class="qty-btn decrease">−</button>
          <input type="number" class="qty-input" value="${item.quantity}" min="1">
          <button class="qty-btn increase">+</button>
        </div>
        <button class="remove-btn">Remove</button>
      </div>
    `;
    cartContainer.appendChild(div);


    const unitPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    total += unitPrice * item.quantity;

    const qtyInput = div.querySelector('.qty-input');
    div.querySelector('.decrease').addEventListener('click', () => {
      if (qtyInput.value > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
        item.quantity = parseInt(qtyInput.value);
        updateCart();
      }
    });
    div.querySelector('.increase').addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
      item.quantity = parseInt(qtyInput.value);
      updateCart();
    });

    div.querySelector('.remove-btn').addEventListener('click', () => {
      cart.splice(index, 1);
      updateCart();
    });
  });

  document.getElementById('total-price').textContent = total.toFixed(2);
}


function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}


renderCart();
