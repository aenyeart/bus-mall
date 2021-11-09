'use strict'

// function renderProdOptions()

function renderImage(id, imgPath) {
  let productElem = document.getElementById(id);
  productElem.setAttribute('src', imgPath);
}
renderImage("product-1", "assets/boots.jpg");
renderImage("product-2", "assets/dragon.jpg");
renderImage("product-3", "assets/chair.jpg");
