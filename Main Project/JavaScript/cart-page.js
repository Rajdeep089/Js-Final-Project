document.addEventListener("DOMContentLoaded", function () {
    var totalItemsCountElement = document.getElementById("number-of-item");
    var productContainer = document.querySelector(".product-list");
    var totalAmountElement = document.getElementById("total-amount");
    var placeOrderButton = document.getElementById("place-order-btn");
  
    var productList = JSON.parse(localStorage.getItem("product-list")) || [];
  

 function updateTotalItemsCount() {
    var totalItemsCount = productList.reduce(
      (total, product) => total + product.count,
      0
    );
    totalItemsCountElement.textContent = totalItemsCount;
  }



    function calculateTotalAmount() {
      var totalAmount = productList.reduce(
        (total, product) => total + product.price * product.count,
        0
      );
      totalAmountElement.textContent = "Rs " + totalAmount;
    }

    productList.forEach((product) => {
      var productCard = document.createElement("div");
      productCard.className = "product-card";
  
      var productImage = document.createElement("img");
      productImage.src = product.preview;
      productImage.alt = product.name;
      productCard.appendChild(productImage);
  
      var productDetails = document.createElement("div");
      productDetails.className = "product-details";
  
      var productName = document.createElement("h3");
      productName.textContent = product.name;
      productDetails.appendChild(productName);
  
      var productPrice = document.createElement("p");
      productPrice.textContent = "Price: Rs " + product.price;
      productDetails.appendChild(productPrice);
  
      var productCount = document.createElement("p");
      productCount.textContent = "Count: " + product.count;
      productDetails.appendChild(productCount);
  
      productCard.appendChild(productDetails);
      productContainer.appendChild(productCard);
    });
  

    calculateTotalAmount();
    updateTotalItemsCount();
  
 
    placeOrderButton.addEventListener("click", function () {

      localStorage.removeItem("product-list");
      productList = [];
      productContainer.innerHTML = "";
      calculateTotalAmount();

  window.location.href = "order-placed.html";
    });
  });
  