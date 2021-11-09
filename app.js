'use strict'

let optionTotal = 3; // let optionTotal = parseInt(prompt("how many options?"));

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
  let rando = Math.floor(Math.random() * (max - min) + min);
  return rando;
}

function randomIndex(arrLength) {
  // generates random index from array.length
  return randomInRange(0, arrLength);
}

function renderImage(id, imgPaths, name) {
  let productElem = document.getElementById(id);
  productElem.setAttribute('src', imgPaths);
  productElem.setAttribute('alt', name);
  
}

function renderProdOptions() {   // TODO: make this function a method of Object, use this.all[] instead of imgNames

  let optionGenArr = [...ProductOption.all]; // creates copy of imgName[] values so that original remains unchanged

  for (let i = 1; i <= optionTotal; i++) { // generates one option per pass
    let id = `product-${i}`;
    debugger;
    let newOptionIndex = randomIndex(optionGenArr.length);
    let newOption = optionGenArr[newOptionIndex];
    renderImage(id, newOption.imgPaths, newOption.name); // RENDERS INDIVIDUAL IMAGE
    optionGenArr.splice(newOptionIndex, 1); // REMOVES THIS ITEM FROM TEMP ARRAY TO PRECLUDE REPEATS when it loops back
  }
}

function compileProductOptions(namesArray, pathsArray) { // BUILDS PRODUCT OBJECTS (which get pushed to )
  if (namesArray.length === pathsArray.length) {
    for (let i = 0; i < pathsArray.length; i++) {
      new ProductOption(namesArray[i], pathsArray[i]);
    }
  } else console.error("name and path arrays are different lengths")
}

compileProductOptions(imgNames, imgPaths);
renderProdOptions();

function selectionHandler(event) {
  renderProdOptions();
  console.log(event.target);
}

// These could be packaged into a function that creates the event targets
const product1 = document.getElementById("product-1");
const product2 = document.getElementById("product-2");
const product3 = document.getElementById("product-3");


// product1.setAttribute("class", "redflag");
product1.addEventListener('click', selectionHandler);
product2.addEventListener('click', selectionHandler);
product3.addEventListener('click', selectionHandler);