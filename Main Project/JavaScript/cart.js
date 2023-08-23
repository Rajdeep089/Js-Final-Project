function updateCartCount() {
  var productList = JSON.parse(localStorage.getItem("product-list")) || [];
  var totalCartCount = productList.reduce(
    (total, product) => total + product.count,
    0
  );
  
  var cartCountElement = document.querySelector(".num-cart-product");
  cartCountElement.textContent = totalCartCount;

  // Set cart icon count to zero after placing order
  if (window.location.pathname.includes("order-placed.html")) {
    cartCountElement.textContent = 0;
  }
}

updateCartCount();

