$(document).ready(function () {
  $("#adaptive").lightSlider({
    adaptiveHeight: true,
    auto: true,
    item: 1,
    slideMargin: 0,
    loop: true,
  });
});



let cloth = document.getElementsByClassName("cloth-sec")[0];
let accessories = document.getElementsByClassName("accessories-sec")[0];


let p = fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
p.then((value) =>{
  return value.json();
}).then((response)=> {
      for (let i = 0; i < response.length; i++) {
          let productCard = `
          <div class="card">
          <a href="product.html?p=${response[i].id}"
            ><div class="img">
              <img
                class="preview-image"
                src= ${response[i].preview}
              />
            </div>
            <div class="details-sec">
              <h3 class="product-des">${response[i].name}</h3>
              <h4 class="Brand">${response[i].brand}</h4>
              <h5 class="Price">${"Rs " + response[i].price}</h5>
            </div></a
          >
        </div>
          `;
          if (response[i].isAccessory === false) {
            cloth.innerHTML += productCard
          }else if (response[i].isAccessory === true){
          accessories.innerHTML += productCard
        }
      }
    }
  );


