'use strict'
let optionTotal = 3; 
// let optionTotal = parseInt(prompt("how many options?"));

let imgPath = [
  "img/boots.jpg",
  "img/breakfast.jpg",
  "img/bubblegum.jpg",
  "img/chair.jpg",
  "img/cthulhu.jpg",
  "img/dog-duck.jpg",
  "img/dragon.jpg",
  "img/pen.jpg",
  "img/pet-sweep.jpg",
  "img/scissors.jpg",
  "img/shark.jpg",
  "img/sweep.png",
  "img/tauntaun.jpg",
  "img/unicorn.jpg",
  "img/water-can.jpg",
  "img/wine-glass.jpg"
];



function renderProdOptions() {
  for (let i = 1; i <= optionTotal; i++) {
    let id = `product-${i}`;
    // let imgPath = productPathsArray[randIndex()];
    renderImage(id, imgPath[i]); // imgPath[i] is just for testing
  }
}

function renderImage(id, imgPath) {
  let productElem = document.getElementById(id);
  productElem.setAttribute('src', imgPath);
}

// renderProdOptions();