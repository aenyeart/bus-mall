'use strict'

let optionTotal = 3;
// let optionTotal = parseInt(prompt("how many options?"));

let imgNames = [
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "sweep",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass"
];
let imgPaths = [
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


function ProductOption(name, imgPaths) {
  this.name = name;
  this.imgPaths = imgPaths;
  this.displayCounter = 0;
  ProductOption.all.push(this); // ADDS THIS OBJECT TO ARRAY OF PRODUCTS
}

ProductOption.all = []; 



function randomInRange(min, max) {
  return Math.floor(Math.random(max - min) + min);
}
function randomIndex(arrLength){
  // generates random index from array.length
  return randomInRange(0, arrLength)
}
// function randomProduct() {
//   // return array.pop(randomIndex)
// }

function renderImage(id, imgPaths) {
  let productElem = document.getElementById(id);
  productElem.setAttribute('src', imgPaths);
}

function renderProdOptions() {
  let optionGenArr = [];
  debugger
  // creates copy of imgName[] values so that original remains unchanged
  imgNames.forEach(()=>optionGenArr.push()); 

  for (let i = 1; i <= optionTotal; i++) { // generates one option per pass
    let id = `product-${i}`;
    let newProdOption = productPathsArray.pop(randomIndex(optionGenArr.length));
    // 
    renderImage(id, newProdOption); // imgPaths[i] is just for testing
  }
}

function compileProductOptions(namesArray, pathsArray) { // BUILDS PRODUCT OBJECTS 
  if (namesArray.length === pathsArray.length) {
    for (let i = 0; i < pathsArray.length; i++) {
      new ProductOption(namesArray[i], pathsArray[i]);
    }
  } else console.error("name and path arrays are different lengths")
}

compileProductOptions(imgNames, imgPaths);