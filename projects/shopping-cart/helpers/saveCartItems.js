const saveCartItems = (cartItems = document.querySelector('.cart__items').innerHTML) => {
  localStorage.setItem('cartItems', cartItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
