
document.addEventListener("DOMContentLoaded", function () {
const params = new URLSearchParams(window.location.search);
console.log(params)
const productId = params.get('p');
console.log('productId:', productId);


fetch(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productId}`)
  .then((response) => response.json())
  .then((productData) => {

    var mainSection = document.getElementById("mainSection");

    var leftColumn = document.createElement("div");
    leftColumn.className = "left-column";
    mainSection.appendChild(leftColumn);

    var productImg = document.createElement("img");
    productImg.className = "productImg";
    productImg.src = productData.preview;
    leftColumn.appendChild(productImg);

    var rightColumn = document.createElement("div");
    rightColumn.className = "right-column";
    mainSection.appendChild(rightColumn);

    var productDes = document.createElement("div");
    productDes.className = "product-description";
    rightColumn.appendChild(productDes);

    var productName = document.createElement("h1");
    productName.setAttribute("id", "name");
    productName.innerHTML = productData.name;

    var productBrand = document.createElement("h4");
    productBrand.setAttribute("id", "brand");
    productBrand.innerHTML = productData.brand;

    var productPrice = document.createElement("h3");
    productPrice.innerHTML = "Price: Rs ";

    var productAmount = document.createElement("span");
    productAmount.setAttribute("id", "price");
    productAmount.innerHTML = productData.price;
    productPrice.appendChild(productAmount);

    var detailsDiv = document.createElement("div");
    detailsDiv.className = "description";

    var description = document.createElement("h3");
    description.innerHTML = "Description";

    var productDetail = document.createElement("p");
    productDetail.setAttribute("id", "description");
    productDetail.innerHTML = productData.description;

    detailsDiv.appendChild(description);
    detailsDiv.appendChild(productDetail);

    var productPreview = document.createElement("div");
    productPreview.className = "product-preview";

    var previewDes = document.createElement("h3");
    previewDes.innerHTML = "Product Preview";

    productDes.appendChild(productName);
    productDes.appendChild(productBrand);
    productDes.appendChild(productPrice);
    productDes.appendChild(detailsDiv);

    var previewImg = document.createElement("div");
    previewImg.className = "previewImg";

    for (var i = 0; i < productData.photos.length; i++) {
      var imgThumb = document.createElement("img");
      imgThumb.src = productData.photos[i];
      previewImg.appendChild(imgThumb);
    }

    productPreview.appendChild(previewDes);
    productPreview.appendChild(previewImg);

    rightColumn.appendChild(productPreview);

    var firstImage = document.querySelector(".previewImg img:first-child");
    firstImage.classList.add("active");
    productImg.src = firstImage.src;

    function handleImageClick(event) {
      var clickedImage = event.target;
      var imageUrl = clickedImage.src;
      productImg.src = imageUrl;

      var allImages = document.querySelectorAll(".previewImg img");
      allImages.forEach(function (img) {
        img.classList.remove("active");
      });
      clickedImage.classList.add("active");
    }

    var previewImages = document.querySelectorAll(".previewImg img");
    previewImages.forEach(function (img) {
      img.addEventListener("click", handleImageClick);
    });

    var btnDiv = document.createElement("div")
btnDiv.className = "btn"
rightColumn.appendChild(btnDiv)

var addToCartButton = document.createElement("button");
addToCartButton.textContent = "Add to Cart";

btnDiv.appendChild(addToCartButton)


addToCartButton.addEventListener("click", function () {
  var productList = JSON.parse(localStorage.getItem("product-list")) || [];
  
  var selectedProduct = {
    id: productData.id,
    name: productData.name,
    preview: productData.preview,
    price: productData.price,
    count: 1
  };

  var existingProduct = productList.find(
    (product) => product.id === selectedProduct.id
  );

  if (!existingProduct) {
    productList.push(selectedProduct);
  } else {
    existingProduct.count++;
  }

  localStorage.setItem("product-list", JSON.stringify(productList));
  updateCartCount();
});


  })
  .catch((error) => {
    console.error('Error fetching product details:', error);
  });})
